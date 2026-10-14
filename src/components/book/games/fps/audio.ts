"use client";

/**
 * audio — موتور «هوش صوتی میدان» (فاز U5-00 — نقشهٔ docs/fps-upgrade-roadmap.md §U5).
 *
 * ماژول خالص: صفر وابستگی به React/THREE — هم‌خانوادهٔ chain.ts/cage.ts/enemy.ts.
 * دو مسئولیت: ① ریاضیات پن استریو از هندسهٔ yaw (قرارداد physics.ts: جلو =
 * (−sin yaw, −cos yaw) و راست = (cos yaw, −sin yaw)) و ② کاتالوگ افکت‌های میدان
 * سنتزشده با WebAudio + StereoPannerNode (صفر فایل صوتی — قرارداد کیت G2-e).
 *
 * قراردادها (§U5):
 * - صدا فقط روی رویداد گسسته فراخوانی می‌شود (interval ۲۰۰ms index — هیچ صدای فریمی)؛
 *   فریز حین توقف رایگان است چون interval گارد pausedRef دارد (ADR-004).
 * - دو گیت بی‌صدا: کلید سراسری کیت «visionone:sound-muted» (حاکم) + کلید افزودنی
 *   «visionone:game-pref:fps-field-sfx» (ADR-003 — فقط لایهٔ میدان را خاموش می‌کند).
 * - شکست صدا هرگز بازی را نمی‌شکند: try/catch ساکت + فال‌بک بدون پنر اگر
 *   createStereoPanner در دسترس نبود (قانون ۴ §U5).
 * - صدا سیگنال جهت/وضعیت است و هرگز حامل واژه نیست (تداوم ADR-005).
 */

import { clamp } from "./helpers";
import { isSoundMuted } from "../kit/sound-engine";

/** افکت‌های میدان — امضای شنیداری گذارهای FSM و رویدادهای قفس/رئیس (§U5) */
export type FieldSound =
  | "detected" // شروع تعقیب — دو بیپ تهاجمی بالارونده
  | "charge" // شارژ تله‌گراف — سوت سینوسی بالارونده
  | "throw" // پرتاب قفس — سوت نزولی
  | "lost" // گم‌کردن رد — دو نت نزولی
  | "retreat" // گریز — استامپ نزولی
  | "thud" // قفس خطا رفت — برخورد نرم به زمین
  | "cageDown" // قفس منهدم — کلانک فلزی
  | "bossWarn" // ورود رئیس — شیپور بم فرماندهی
  | "shieldBreak" // شکستن سپر رئیس — دو نت شیشه‌ای + تُمپا
  | "bossDown"; // فروپاشی رئیس — انفجار بم کشیده

/** یک نت میدانی — همان شکل ToneSpec کیت (فرکانس با گلیساندو اختیاری) */
interface FieldToneSpec {
  at: number;
  freq: number;
  to?: number;
  dur: number;
  type?: OscillatorType;
  gain?: number;
}

/** دستور پخت افکت‌های میدان — هر افکت ۱ تا ۳ نت؛ گین‌ها در محدودهٔ محتاط کیت (عمومی برای شبیه‌سازی) */
export const FIELD_RECIPES: Record<FieldSound, FieldToneSpec[]> = {
  // شروع تعقیب: دو بیپ تند بالارونده — هشدار «رد تو گرفته شد»
  detected: [
    { at: 0, freq: 620, to: 900, dur: 0.09, type: "square", gain: 0.08 },
    { at: 0.12, freq: 620, to: 980, dur: 0.1, type: "square", gain: 0.09 },
  ],
  // شارژ تله‌گراف: سوت سینوسی بالارونده — هم‌خانوادهٔ چشمک تند هسته
  charge: [{ at: 0, freq: 220, to: 980, dur: 0.5, type: "sine", gain: 0.1 }],
  // پرتاب قفس: سوت نزولی دویسته — هوای جابه‌جاشده
  throw: [
    { at: 0, freq: 520, to: 140, dur: 0.26, type: "sawtooth", gain: 0.07 },
    { at: 0.02, freq: 900, to: 300, dur: 0.18, type: "triangle", gain: 0.045 },
  ],
  // گم‌کردن رد: دو نت نزولی ملال‌آور — «جست‌وجو پایان یافت»
  lost: [
    { at: 0, freq: 880, to: 660, dur: 0.12, type: "sine", gain: 0.085 },
    { at: 0.14, freq: 660, to: 430, dur: 0.16, type: "sine", gain: 0.08 },
  ],
  // گریز: استامپ نزولی سه‌تایی — موتور دور می‌شود
  retreat: [
    { at: 0, freq: 700, to: 180, dur: 0.07, type: "sawtooth", gain: 0.075 },
    { at: 0.09, freq: 600, to: 160, dur: 0.07, type: "sawtooth", gain: 0.065 },
    { at: 0.18, freq: 500, to: 140, dur: 0.08, type: "sawtooth", gain: 0.055 },
  ],
  // برخورد نرم قفس به زمین (خطا رفت) — بم کوتاه بی‌درد
  thud: [
    { at: 0, freq: 130, to: 60, dur: 0.16, type: "triangle", gain: 0.13 },
    { at: 0.01, freq: 92, to: 50, dur: 0.12, type: "sine", gain: 0.08 },
  ],
  // منهدم قفس: کلانک فلزی + تُمپای پایین
  cageDown: [
    { at: 0, freq: 820, to: 210, dur: 0.07, type: "square", gain: 0.085 },
    { at: 0.02, freq: 1240, to: 300, dur: 0.12, type: "triangle", gain: 0.075 },
    { at: 0.04, freq: 110, to: 55, dur: 0.15, type: "triangle", gain: 0.1 },
  ],
  // ورود رئیس: شیپور بم فرماندهی — دو موج‌ مربعی بم هم‌پوشان
  bossWarn: [
    { at: 0, freq: 130, dur: 0.34, type: "square", gain: 0.085 },
    { at: 0.02, freq: 98, dur: 0.36, type: "square", gain: 0.075 },
    { at: 0.38, freq: 130, dur: 0.3, type: "square", gain: 0.09 },
  ],
  // شکستن سپر: دو نت شیشه‌ای + تُمپا — حس ترکیدن حلقهٔ توری
  shieldBreak: [
    { at: 0, freq: 1567.98, dur: 0.07, type: "sine", gain: 0.095 },
    { at: 0.07, freq: 1174.66, to: 880, dur: 0.1, type: "sine", gain: 0.085 },
    { at: 0.08, freq: 180, to: 70, dur: 0.14, type: "triangle", gain: 0.1 },
  ],
  // فروپاشی رئیس: انفجار بم کشیده — سه لایهٔ نزولی
  bossDown: [
    { at: 0, freq: 95, to: 32, dur: 0.7, type: "sawtooth", gain: 0.14 },
    { at: 0.02, freq: 60, to: 28, dur: 0.6, type: "square", gain: 0.09 },
    { at: 0.04, freq: 500, to: 90, dur: 0.3, type: "triangle", gain: 0.085 },
  ],
};

/** شعاع مرجع افت فاصله (متر — عمق/پهنای نقشه‌ها ~۱۴م) */
export const FIELD_DIST_MAX = 16;

/** خروجی fieldPan — پن محدود به ±۰٫۸۵ (هیچ‌وقت تمام‌چپ/تمام‌راست نمی‌شود) */
export interface FieldPan {
  /** −۰٫۸۵ (چپ) تا +۰٫۸۵ (راست) — صفر = مرکز */
  pan: number;
  /** ضریب فاصله ۰٫۳۵ (دور) تا ۱ (نزدیک) — در gainMultiplyer صدای میدان ضرب می‌شود */
  gain: number;
}

/**
 * پن استریو خالص منبع نسبت به بازیکن — ریاضیات ماژول‌خالص (الگوی los.ts).
 * yaw همان b.aim.yaw است؛ قرارداد راست از بردار حرکت «d» در physics.ts می‌آید.
 */
export function fieldPan(srcX: number, srcZ: number, px: number, pz: number, yaw: number): FieldPan {
  const dx = srcX - px;
  const dz = srcZ - pz;
  const dist = Math.hypot(dx, dz);
  if (dist < 0.35) return { pan: 0, gain: 1 }; // روی سر بازیکن — مرکز و تمام‌قد
  // پروجکشن روی بردار راست (cos yaw, −sin yaw) — نرمال به بردار جهت
  const right = (dx * Math.cos(yaw) - dz * Math.sin(yaw)) / dist;
  return {
    pan: clamp(right * 1.2, -0.85, 0.85),
    gain: 0.35 + 0.65 * clamp(1 - dist / FIELD_DIST_MAX, 0, 1),
  };
}

// ── WebAudio میدان — همان سیاست autoplay کیت (ساخت/Resume فقط داخل فراخوانی رویداد) ──

let ctx: AudioContext | null = null;
/** لایهٔ میدان فعال؟ — sync با prefs در index (U5-02)؛ پیش‌فرض روشن */
let fieldEnabled = true;

type ACtor = new () => AudioContext;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!ctx) {
      const AC: ACtor | undefined =
        window.AudioContext ??
        (window as Window & { webkitAudioContext?: ACtor }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") void ctx.resume().catch(() => {});
    return ctx;
  } catch {
    return null;
  }
}

/** sync ترجیح کاربر (فراخوانی از index روی تغییر state — U5-02) */
export function setFieldSfxEnabled(v: boolean): void {
  fieldEnabled = v;
}

/** یک نت میدانی با پن — فال‌بک بدون پنر اگر createStereoPanner نبود (قانون ۴ §U5) */
function playFieldTone(c: AudioContext, spec: FieldToneSpec, base: number, pan: number, gainMult: number): void {
  const osc = c.createOscillator();
  const g = c.createGain();
  const t0 = base + spec.at;
  const peak = Math.max(0.001, (spec.gain ?? 0.12) * gainMult);
  osc.type = spec.type ?? "sine";
  osc.frequency.setValueAtTime(spec.freq, t0);
  if (spec.to) osc.frequency.exponentialRampToValueAtTime(spec.to, t0 + spec.dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(peak, t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + spec.dur);
  osc.connect(g);
  let panned = false;
  try {
    const p = c.createStereoPanner();
    p.pan.setValueAtTime(clamp(pan, -1, 1), t0);
    g.connect(p);
    p.connect(c.destination);
    panned = true;
  } catch {
    panned = false; // پنر در دسترس نیست — مسیر بدون پن
  }
  if (!panned) g.connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + spec.dur + 0.02);
}

/**
 * پخش افکت میدان جهت‌دار — فقط از رویداد گسسته صدا زده شود (قرارداد G2-e).
 * pan/gain معمولاً از fieldPan می‌آید؛ رویدادهای تمام‌صفحه (ورود رئیس) مرکزی پخش می‌شوند.
 * هر دو گیت بی‌صدا اینجا اعمال می‌شود — شکست هر مسیر ساکت است.
 */
export function playFieldSound(name: FieldSound, pan: number, gainMult = 1): void {
  if (!fieldEnabled) return;
  if (isSoundMuted()) return; // کلید سراسری کیت روی میدان هم حاکم است (قانون ۳ §U5)
  const c = getCtx();
  if (!c) return;
  try {
    const base = Math.max(c.currentTime, 0.01);
    const gm = clamp(gainMult, 0.2, 1.4);
    for (const spec of FIELD_RECIPES[name]) playFieldTone(c, spec, base, pan, gm);
  } catch {
    /* noop — صدا هرگز بازی را نشکند */
  }
}
