"use client";

/**
 * موتور صدای سینتِتیک بازی‌ها — فاز G1-01 نقشه راه بازی‌ها (docs/games-roadmap.md).
 *
 * قراردادها (بخش ۲ سند):
 * - صفر فایل صوتی؛ همهٔ افکت‌ها با WebAudio oscillator سنتز می‌شوند (~۲KB کد)
 * - AudioContext فقط در اولین فراخوانی playSound (همیشه داخل هندلر رویداد کاربر)
 *   ساخته می‌شود → سیاست autoplay مرورگرها رعایت است؛ قبل از ژست کاربر هیچ صوتی نیست
 * - کلید بی‌صدا سراسری: `visionone:sound-muted` (۱ = بی‌صدا) — هپتیک هم زیر همین کلید است
 * - شکست صدا هرگز نباید بازی را بشکند — هر مسیر try/catch ساکت دارد
 */

export type GameSound =
  | "correct" // جفت/پاسخ درست
  | "wrong" // پاسخ غلط
  | "click" // بازکردن کارت/کلیک خنثی
  | "record" // رکورد شخصی
  | "finish" // پایان دور
  | "tick" // تیک‌تاک تایمر
  | "shoot" // شلیک (شوتر)
  | "hit" // برخورد گلوله به هدف (شوتر)
  | "reload" // تعویض خشاب (شوتر)
  | "win"; // برد نهایی (فینال/ماجراجویی)

const MUTE_KEY = "visionone:sound-muted";
const CHANGE_EVENT = "visionone:sound-change";

let cachedMuted: boolean | null = null;

function readMuted(): boolean {
  if (typeof window === "undefined") return false;
  if (cachedMuted !== null) return cachedMuted;
  try {
    cachedMuted = window.localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    cachedMuted = false;
  }
  return cachedMuted;
}

function writeMuted(v: boolean): void {
  cachedMuted = v;
  try {
    window.localStorage.setItem(MUTE_KEY, v ? "1" : "0");
  } catch {
    /* noop */
  }
  try {
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  } catch {
    /* noop */
  }
}

export function isSoundMuted(): boolean {
  return readMuted();
}

export function setSoundMuted(v: boolean): void {
  writeMuted(v);
}

/** toggles و حالت تازه را برمی‌گرداند (برای setState در هندلر) */
export function toggleSoundMuted(): boolean {
  const v = !readMuted();
  writeMuted(v);
  return v;
}

/** اشتراک تغییر بی‌صدا — الگوی استورهای پروژه (storage بین-تب + رویداد محلی) */
export function subscribeSound(cb: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CHANGE_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

// ── WebAudio ──

let ctx: AudioContext | null = null;

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

/** یک نت: آفست شروع، فرکانس (با گلیساندو اختیاری)، مدت، شکل موج و پیک گین */
interface ToneSpec {
  at: number;
  freq: number;
  to?: number;
  dur: number;
  type?: OscillatorType;
  gain?: number;
}

/** دستور پخت هر افکت — نُت‌ها پشت‌سرهم ملودی می‌سازند */
const RECIPES: Record<GameSound, ToneSpec[]> = {
  correct: [
    { at: 0, freq: 523.25, dur: 0.09, type: "sine", gain: 0.16 },
    { at: 0.09, freq: 784.99, dur: 0.14, type: "sine", gain: 0.16 },
  ],
  wrong: [{ at: 0, freq: 220, to: 150, dur: 0.18, type: "square", gain: 0.08 }],
  click: [{ at: 0, freq: 660, dur: 0.04, type: "sine", gain: 0.07 }],
  record: [
    { at: 0, freq: 523.25, dur: 0.1, type: "triangle", gain: 0.15 },
    { at: 0.1, freq: 659.25, dur: 0.1, type: "triangle", gain: 0.15 },
    { at: 0.2, freq: 880, dur: 0.22, type: "triangle", gain: 0.17 },
  ],
  finish: [
    { at: 0, freq: 523.25, dur: 0.09, type: "sine", gain: 0.13 },
    { at: 0.09, freq: 587.33, dur: 0.09, type: "sine", gain: 0.13 },
    { at: 0.18, freq: 659.25, dur: 0.09, type: "sine", gain: 0.13 },
    { at: 0.27, freq: 783.99, dur: 0.2, type: "sine", gain: 0.15 },
  ],
  tick: [{ at: 0, freq: 1000, dur: 0.02, type: "sine", gain: 0.05 }],
  shoot: [{ at: 0, freq: 420, to: 80, dur: 0.1, type: "sawtooth", gain: 0.1 }],
  // فاز F4 شوتر — برخورد توپر «تاک» به بدنهٔ هدف
  hit: [
    { at: 0, freq: 190, to: 62, dur: 0.09, type: "triangle", gain: 0.15 },
    { at: 0.012, freq: 880, to: 210, dur: 0.05, type: "sawtooth", gain: 0.045 },
  ],
  // فاز F4 شوتر — کلانک-کلانک مکانیکی تعویض خشاب
  reload: [
    { at: 0, freq: 540, to: 330, dur: 0.06, type: "square", gain: 0.07 },
    { at: 0.16, freq: 660, to: 430, dur: 0.09, type: "square", gain: 0.09 },
    { at: 0.34, freq: 740, to: 520, dur: 0.05, type: "square", gain: 0.06 },
  ],
  win: [
    { at: 0, freq: 523.25, dur: 0.12, type: "triangle", gain: 0.15 },
    { at: 0.12, freq: 659.25, dur: 0.12, type: "triangle", gain: 0.15 },
    { at: 0.24, freq: 783.99, dur: 0.12, type: "triangle", gain: 0.15 },
    { at: 0.36, freq: 1046.5, dur: 0.3, type: "triangle", gain: 0.18 },
  ],
};

function playTone(c: AudioContext, spec: ToneSpec, base: number): void {
  const osc = c.createOscillator();
  const g = c.createGain();
  const t0 = base + spec.at;
  const peak = spec.gain ?? 0.12;
  osc.type = spec.type ?? "sine";
  osc.frequency.setValueAtTime(spec.freq, t0);
  if (spec.to) osc.frequency.exponentialRampToValueAtTime(spec.to, t0 + spec.dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(peak, t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + spec.dur);
  osc.connect(g).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + spec.dur + 0.02);
}

/**
 * پخش افکت — فقط از داخل هندلر رویداد کاربر صدا زده شود (سیاست autoplay).
 * بی‌صدا بودن، نبود WebAudio و هر خطای دیگر = ساکت و بی‌اثر.
 */
export function playSound(name: GameSound): void {
  if (readMuted()) return;
  const c = getCtx();
  if (!c) return;
  try {
    const base = Math.max(c.currentTime, 0.01);
    for (const spec of RECIPES[name]) playTone(c, spec, base);
  } catch {
    /* noop — صدا هرگز بازی را نشکند */
  }
}
