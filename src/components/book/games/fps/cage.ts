"use client";

/**
 * cage — هستهٔ خالص «قفس واژه» (فاز U2-00 — نقشهٔ docs/fps-upgrade-roadmap.md §U2).
 *
 * مانند enemy.ts و chain.ts: صفر وابستگی به React/THREE — فقط ریاضیات پرواز و
 * تشخیص رویداد گسسته. قفس یک پرتابهٔ خطی قابل پیش‌بینی است: به «موقعیت بازیکن در
 * لحظهٔ پرتاب» می‌رود (قانون ۳ §U2) — جابه‌جایی از نقطهٔ هدف = خطا رفتن بدون جریمه،
 * ماندن در مسیر یا شکارش در هوا تنها دفاع‌ها. رندر و اثرهای جانبی در scene/cage.tsx.
 *
 * قوانین سخت §U2 اینجا: ② سرعت پرواز × speedMult (تپ = نصف) · ⑧ فریز واقعی
 * (گام فقط با dt فریم جلو می‌رود — هیچ تایمر جانبی).
 */

/** بردار سه‌بعدی سبک (بدون وابستگی THREE) */
export interface CageVec3 {
  x: number;
  y: number;
  z: number;
}

// ── پیش‌فرض‌های تیون (مرکزیت اینجا — سند §U2) ──
/** سرعت پایهٔ پرواز قفس (متر بر ثانیه — × speedMult؛ تپ ساده = نصف) */
export const CAGE_SPD = 4.6;
/** حداقل سرعت پرواز — قفس هرگز معلق نمی‌ماند (متر بر ثانیه) */
export const CAGE_SPD_MIN = 1.4;
/** شعاع برخورد قفس با بازیکن (متر) */
export const CAGE_HIT_R = 1.15;

/** وضعیت لحظه‌ای قفس — جهش in-place در hot path (بدون تخصیص فریمی) */
export interface CageState {
  /** در پرواز؟ (false = منفدم/خطا رفته/پرتاب نشده) */
  active: boolean;
  /** موقعیت لحظه‌ای (متر) */
  x: number;
  y: number;
  z: number;
  /** نقطهٔ پرتاب */
  sx: number;
  sy: number;
  sz: number;
  /** نقطهٔ هدف = موقعیت بازیکن در لحظهٔ پرتاب (قانون ۳) */
  tx: number;
  ty: number;
  tz: number;
  /** مدت کل پرواز (ثانیه) */
  T: number;
  /** زمان سپری‌شده (ثانیه) */
  t: number;
  /** چرخش نمایشی (رادیان — رندر فقط می‌خواند و جمع می‌زند) */
  spin: number;
}

/**
 * ساخت وضعیت پرواز: از «from» (پهپاد) به «to» (بازیکن در لحظهٔ پرتاب).
 * speedMult همان ضریب دشمن است — تپ ساده × عادی/سخت = نصف سرعت (قانون ۲ §U2).
 */
export function createCageState(from: CageVec3, to: CageVec3, speedMult: number): CageState {
  const dist = Math.hypot(to.x - from.x, to.y - from.y, to.z - from.z) || 0.001;
  const spd = Math.max(CAGE_SPD * Math.max(speedMult, 0), CAGE_SPD_MIN);
  return {
    active: true,
    x: from.x,
    y: from.y,
    z: from.z,
    sx: from.x,
    sy: from.y,
    sz: from.z,
    tx: to.x,
    ty: to.y,
    tz: to.z,
    T: dist / spd,
    t: 0,
    spin: Math.random() * Math.PI,
  };
}

/** ثانیه تا برخورد با نقطهٔ هدف — صفر = قفسی در پرواز نیست (چیپ HUD خاموش) */
export function cageEta(st: CageState | null): number {
  if (!st || !st.active) return 0;
  return Math.max(0, st.T - st.t);
}

/**
 * گام پرواز — جهش in-place روی st (فراخوانی هر فریم از useFrame قفس).
 * خروجی رویداد گسستهٔ فریم: «hit» = برخورد شعاعی با بازیکن (هر لحظهٔ پرواز یا
 * رسیدن به هدف) · «whiff» = رسید به نقطهٔ هدف و بازیکن آنجا نبود · «none» = ادامه.
 */
export function stepCage(
  st: CageState,
  px: number,
  py: number,
  pz: number,
  dt: number,
): "none" | "hit" | "whiff" {
  if (!st.active) return "none";
  st.t += Math.min(dt, 0.05);
  st.spin += Math.min(dt, 0.05) * 5.5;
  const k = st.T > 0 ? Math.min(1, st.t / st.T) : 1;
  st.x = st.sx + (st.tx - st.sx) * k;
  st.y = st.sy + (st.ty - st.sy) * k;
  st.z = st.sz + (st.tz - st.sz) * k;
  // برخورد شعاعی با موقعیت «فعلی» بازیکن در هر فریم (قانون ۳ — ماندن در مسیر هم برخورد است)
  if (Math.hypot(st.x - px, st.y - py, st.z - pz) <= CAGE_HIT_R) {
    st.active = false;
    return "hit";
  }
  if (st.t >= st.T) {
    st.active = false;
    // رسید به نقطهٔ هدف — بازیکن آنجا بود؟ (گارد پایانی؛ عمدتاً چک فریمی گرفته)
    return Math.hypot(st.tx - px, st.ty - py, st.tz - pz) <= CAGE_HIT_R ? "hit" : "whiff";
  }
  return "none";
}
