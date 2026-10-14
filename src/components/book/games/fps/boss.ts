"use client";

/**
 * boss — هستهٔ خالص «رئیس واژه» (فاز U4-00 — نقشهٔ docs/fps-upgrade-roadmap.md §U4).
 *
 * مانند enemy.ts و cage.ts: صفر وابستگی به React/THREE — فقط ریاضیات حرکت و چرخهٔ
 * حمله. رئیس یک پهپاد فرماندهٔ بزرگ با سه سپر است که در انتهای مأموریت (موج ≥
 * BOSS_WAVE) ظاهر می‌شود؛ سپرهایش فقط با پاسخ درست چالش واژه‌ای هر مرحله می‌شکنند
 * (تصمیم مرحله‌ها در index است — اینجا فقط «حرکت صحنه» است) و در عادی/سخت به‌طور
 * دوره‌ای قفس واژه پرتاب می‌کند (همان پرتابهٔ U2 — سرنوشتش با cage.ts حل می‌شود).
 * رندر و اثرهای جانبی در scene/boss.tsx. جهش in-place بدون تخصیص فریمی.
 *
 * قوانین سخت §U4 اینجا: ③ آسان = منفعل (strafeAmp=0 و chargeS=0) · ④ تپ = نصف
 * سرعت‌ها · ⑧ فریز واقعی (گام فقط با dt فریم — هیچ تایمر جانبی — ADR-004).
 */

import type { Difficulty } from "./constants";

// ── پیش‌فرض‌های تیون (مرکزیت اینجا — سند §U4) ──
/** موج تریگر رئیس — پس از ورود به این موج، سؤال بعدی عادی نمی‌آید (۱۵ پاسخ با قاعدهٔ F8) */
export const BOSS_WAVE = 4;
/** تعداد مراحل/سپرهای رئیس — هر مرحله یک چالش واژه‌ای متفاوت (سند §U4 قانون ۲) */
export const BOSS_STAGES = 3;
/** ضریب زمان چالش رئیس نسبت به سؤال عادی (هجی چند شلیک پیاپی می‌خواهد) */
export const BOSS_TIME_MULT = 1.5;
/** موقعیت صحنهٔ رئیس — عمق میدان، بالای سر هدف‌ها */
export const BOSS_Z = -10.5;
export const BOSS_Y = 2.9;
export const BOSS_BOB_AMP = 0.24;
/** دامنهٔ سرگردانی جانبی (متر) و سرعت آن (متر بر ثانیه × speedMult) */
export const BOSS_STRAFE_AMP = 4.5;
export const BOSS_STRAFE_SPD = 0.85;
/** فاز U4 — شارژ تله‌گراف پیش از پرتاب قفس (ثانیه — آسان هرگز شارژ نمی‌شود) */
export const BOSS_CHARGE_S: Record<Exclude<Difficulty, "easy">, number> = {
  normal: 0.9,
  hard: 0.6,
};
export function bossChargeS(difficulty: Difficulty): number {
  return difficulty === "hard" ? BOSS_CHARGE_S.hard : BOSS_CHARGE_S.normal;
}
/** فاز U4 — cooldown پرتاب قفس رئیس پس از هر پرتاب (ثانیه — شمارش در فریم‌های FSM) */
export const BOSS_CAGE_CD: Record<Exclude<Difficulty, "easy">, number> = {
  normal: 7.5,
  hard: 4.8,
};
export function bossCageCd(difficulty: Difficulty): number {
  return difficulty === "hard" ? BOSS_CAGE_CD.hard : BOSS_CAGE_CD.normal;
}
/** ضریب سرعت رئیس بر حسب دشواری × سبک کنترل — قانون ③ و ④ §U4 (همان فلسفهٔ enemySpeedMult) */
export function bossSpeedMult(difficulty: Difficulty, tap: boolean): number {
  if (difficulty === "easy") return 0; // آسان = رئیس منفعل
  if (tap) return 0.5; // تپ ساده × عادی/سخت = نصف سرعت
  return difficulty === "hard" ? 1.22 : 1;
}

/** وضعیت لحظه‌ای رئیس — جهش in-place در hot path (بدون تخصیص فریمی) */
export interface BossState {
  /** موقعیت جهانی (متر) — z ثابت عمق میدان */
  x: number;
  y: number;
  z: number;
  /** جهت سرگردانی جانبی (۱ = راست) */
  dir: 1 | -1;
  /** زمان سپری‌شده (ثانیه — برای نوسان شناوری) */
  t: number;
  /** شارژ جاری (−۱ = بی‌شارژ؛ ۰..chargeS = در حال شارژ تله‌گراف) */
  chargeT: number;
  /** cooldown تا پرتاب بعدی قفس (ثانیه) */
  cd: number;
  /** پرچم یک‌بارمصرف «قفس پرتاب شد» — مصرف‌کننده: scene/boss در همان فریم */
  justThrew: boolean;
  /** پرچم یک‌بارمصرف «شارژ لغو شد» (شلیک بازیکن حین شارژ — قانون ۴ §U4) */
  justInterrupted: boolean;
}

/** رئیس از عمق میدان، بالای سر هدف‌ها وارد می‌شود */
export function createBossState(): BossState {
  return {
    x: 0,
    y: BOSS_Y,
    z: BOSS_Z,
    dir: Math.random() > 0.5 ? 1 : -1,
    t: 0,
    chargeT: -1,
    cd: 2.2, // نفس اول پس از ورود — تله‌گراف بی‌درنگ نیست
    justThrew: false,
    justInterrupted: false,
  };
}

/** لغو شارژ با شلیک بازیکن (قانون ۴ §U4 — عادلانه مثل §U2) — true = واقعاً شارژی در جریان بود */
export function bossInterrupt(st: BossState): boolean {
  if (st.chargeT < 0) return false;
  st.chargeT = -1;
  st.cd = Math.max(st.cd, 2.4); // نفس کوتاه پس از لغو — رگبار لغو بی‌معنا نمی‌شود
  st.justInterrupted = true;
  return true;
}

/** ورودی گام — ضرایب توسط scene/boss از difficulty × tap محاسبه می‌شود */
export interface BossInput {
  dt: number;
  /** ضریب سرعت (bossSpeedMult — آسان = ۰، تپ = نصف) */
  speedMult: number;
  /** دامنهٔ سرگردانی جانبی (۰ = منفعل — آسان) */
  strafeAmp: number;
  /** مدت شارژ پرتاب (۰ = قفس خاموش — آسان) */
  chargeS: number;
  /** cooldown پس از هر پرتاب (ثانیه) */
  cdS: number;
}

/**
 * گام رئیس — جهش in-place روی st (فراخوانی هر فریم از useFrame رئیس).
 * ترتیب: سرگردانی خطی رفت‌وبرگشتی (قابل پیش‌بینی برای نشانه‌گیری) → چرخهٔ قفس
 * (آماده → شارژ تله‌گراف → پرتاب) → شناوری عمودی.
 */
export function stepBoss(st: BossState, inp: BossInput): void {
  const dt = Math.min(inp.dt, 0.05);
  st.t += dt;
  if (st.cd > 0) st.cd = Math.max(0, st.cd - dt); // cooldown در فریم‌های FSM (فریز رایگان)

  // سرگردانی جانبی — رفت‌وبرگشتی خطی با برگشت از لبه (بدون پرش ناگهانی)
  if (inp.strafeAmp > 0) {
    st.x += st.dir * BOSS_STRAFE_SPD * inp.speedMult * dt;
    if (st.x > inp.strafeAmp) {
      st.x = inp.strafeAmp;
      st.dir = -1;
    } else if (st.x < -inp.strafeAmp) {
      st.x = -inp.strafeAmp;
      st.dir = 1;
    }
  }

  // چرخهٔ قفس — آماده → شارژ تله‌گراف (رندر تندچشمک می‌زند) → پرتاب
  if (inp.chargeS > 0) {
    if (st.chargeT >= 0) {
      st.chargeT += dt;
      if (st.chargeT >= inp.chargeS) {
        st.chargeT = -1;
        st.cd = inp.cdS;
        st.justThrew = true; // مصرف‌کننده: scene/boss در همان فریم
      }
    } else if (st.cd <= 0) {
      st.chargeT = 0; // شروع شارژ تله‌گراف
    }
  }

  // شناوری عمودی مشترک — حتی منفعل زنده است
  st.y = BOSS_Y + Math.sin(st.t * 1.5) * BOSS_BOB_AMP;
}
