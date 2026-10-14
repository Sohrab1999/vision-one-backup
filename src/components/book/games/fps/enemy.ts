"use client";

/**
 * enemy — موتور تصمیم «پهپاد تعقیب‌گر» (فاز U1→U3 — نقشهٔ docs/fps-upgrade-roadmap.md).
 *
 * ماژول خالص: صفر وابستگی به React/THREE — فقط ریاضیات و FSM چهارحالته
 * «گشت (patrol) → تعقیب (stalk) → شارژ (charge، فاز U2) → گریز (flee)». مانند
 * chain.ts، اینجا فقط «تصمیم و انتگرال حرکت» گرفته می‌شود؛ رندر و اثرهای جانبی
 * در scene/drone.tsx و index.tsx می‌ماند (پلی‌بوک games/fps/README.md).
 *
 * قوانین سخت سند:
 * §U1: ① آسان = دشمن خاموش (enemyConfig) · ② تپ ساده × عادی/سخت = نصف سرعت
 *      ③ تعقیب فقط هنگام سکون بازیکن؛ حرکت = بازگشت به مدار گشت
 * §U2: ④ شارژ متعهد (حرکت بازیکن لغو نمی‌کند) · cooldown پرتاب در فریم‌های FSM
 * §U3: ④bis شروع تعقیب فقط با دید (los)؛ قطع دید حین تعقیب = گرِیس lostS → عقب‌نشینی
 *      (فریز واقعی حین توقف بر عهدهٔ frameloop کیت است — ADR-004)
 */

import { clamp } from "./helpers";
import type { Difficulty } from "./constants";

/** حالت‌های FSM پهپاد — فاز U2: «charge» = شارژ تله‌گراف پرتاب قفس واژه */
export type EnemyPhase = "patrol" | "stalk" | "charge" | "flee";

// ── پیش‌فرض‌های تیون (مرکزیت اینجا — سند §U1) ──
/** شعاع مدار گشت دور بازیکن (متر) */
export const ENEMY_ORBIT_R = 5.2;
/** ارتفاع پایهٔ پرواز + دامنهٔ نوسان (متر) */
export const ENEMY_FLY_Y = 2.35;
export const ENEMY_BOB_AMP = 0.3;
/** سرعت زاویه‌ای گشت (رادیان بر ثانیه × speedMult) */
export const ENEMY_ORBIT_SPD = 0.55;
/** سرعت نزدیک‌شدن در تعقیب و گریز (متر بر ثانیه × speedMult) */
export const ENEMY_STALK_SPD = 1.7;
export const ENEMY_FLEE_SPD = 3.2;
/** فاصلهٔ توقف تعقیب — نزدیک‌تر از این نمی‌آید (متر) */
export const ENEMY_STOP_DIST = 2.6;
/** آستانهٔ «سکون» بازیکن برای شروع تعقیب (متر بر ثانیه) */
export const ENEMY_CALM_SPD = 0.35;
/** آستانهٔ «حرکت واقعی» برای شکستن تعقیب (متر بر ثانیه) */
export const ENEMY_MOVE_SPD = 0.9;
/** تأخیر سکون تا شروع تعقیب بر حسب دشواری (ثانیه) */
export const ENEMY_STALK_DELAY: Record<Exclude<Difficulty, "easy">, number> = {
  normal: 2.6,
  hard: 1.7,
};

/** فاز U2 — شارژ/cooldown پرتاب بر حسب دشواری (آسان هرگز نمی‌رسد — پهپاد خاموش) */
export function enemyChargeS(difficulty: Difficulty): number {
  return difficulty === "hard" ? ENEMY_CHARGE_S.hard : ENEMY_CHARGE_S.normal;
}
export function enemyThrowCd(difficulty: Difficulty): number {
  return difficulty === "hard" ? ENEMY_THROW_CD.hard : ENEMY_THROW_CD.normal;
}
/** مدت گریز پس از برخورد گلوله (ثانیه) */
export const ENEMY_FLEE_S = 2.8;
/** فاز U2 — مدت شارژ تله‌گراف پیش از پرتاب قفس (ثانیه) */
export const ENEMY_CHARGE_S: Record<Exclude<Difficulty, "easy">, number> = {
  normal: 1.1,
  hard: 0.75,
};
/** فاز U2 — cooldown پرتاب قفس پس از هر پرتاب (ثانیه — شمارش در فریم‌های FSM) */
export const ENEMY_THROW_CD: Record<Exclude<Difficulty, "easy">, number> = {
  normal: 9,
  hard: 6,
};
/** فاز U3 — گرِیس گم‌کردن رد: قطع خط دید حین تعقیب این‌قدر شناور می‌ماند پیش از عقب‌نشینی (ثانیه) */
export const ENEMY_LOST_S: Record<Exclude<Difficulty, "easy">, number> = {
  normal: 0.9,
  hard: 0.6,
};
/** فاز U3 — گرِیس گم‌کردن رد بر حسب دشواری */
export function enemyLostS(difficulty: Difficulty): number {
  return difficulty === "hard" ? ENEMY_LOST_S.hard : ENEMY_LOST_S.normal;
}

/** ضریب سرعت FSM بر حسب دشواری × سبک کنترل — قانون سخت ① و ② سند */
export function enemySpeedMult(difficulty: Difficulty, tap: boolean): number {
  if (difficulty === "easy") return 0; // آسان = دشمن خاموش
  if (tap) return 0.5; // تپ ساده × عادی/سخت = نصف سرعت
  return difficulty === "hard" ? 1.28 : 1;
}

/** وضعیت لحظه‌ای پهپاد — جهش in-place در hot path (بدون تخصیص فریمی) */
export interface EnemyState {
  phase: EnemyPhase;
  /** موقعیت جهانی (متر) */
  x: number;
  y: number;
  z: number;
  /** زاویهٔ مدار فعلی حول بازیکن — فقط در patrol معنا دارد */
  orbitAngle: number;
  /** جهت چرخش مدار (برای تنوع ورود) */
  orbitDir: 1 | -1;
  /** زمان سپری‌شده در فاز فعلی (ثانیه) */
  t: number;
  /** جمع سکون بازیکن (ثانیه) — شرط گذار patrol → stalk */
  calmT: number;
  /** زمان باقی‌ماندهٔ گریز (ثانیه) */
  fleeT: number;
  /** فاز U2 — cooldown تا پرتاب بعدی قفس (ثانیه؛ صفر = آمادهٔ پرتاب) */
  throwCd: number;
  /** فاز U2 — پرچم یک‌بارمصرف «قفس پرتاب شد» — مصرف‌کننده: scene/drone در همان فریم */
  justThrew: boolean;
  /** فاز U3 — زمان انباشته‌شدهٔ «بدون دید» حین تعقیب (ثانیه — گرِیس پیش از عقب‌نشینی) */
  lostT: number;
  /** فاز U3 — پرچم یک‌بارمصرف «رد گم شد» (شکست تعقیب با پنهانی — مصرف‌کننده: scene/drone در همان فریم) */
  justLost: boolean;
  /** زاویهٔ رو به بازیکن (رادیان — برای رندر) */
  face: number;
}

/** ورودی گام — موقعیت/سرعت بازیکن در فضای جهان + کران‌های نقشه */
export interface EnemyInput {
  px: number;
  pz: number;
  playerSpeed: number;
  speedMult: number;
  stalkDelay: number;
  /** فاز U2 — مدت شارژ پرتاب (۰ = پرتاب خاموش — آسان هرگز نمی‌رسد) */
  chargeS: number;
  /** فاز U2 — cooldown پس از هر پرتاب (ثانیه) */
  throwCd: number;
  /** فاز U3 — گرِیس گم‌کردن رد (ثانیه) */
  lostS: number;
  /** فاز U3 — بازیکن از پهپاد دیده می‌شود؟ (تست خالص los.ts — فراخوانی‌کننده: scene/drone هر فریم) */
  los: boolean;
  dt: number;
  bounds: { minX: number; maxX: number; minZ: number; maxZ: number };
}

/** پهپاد از پشت مدار، دور از بازیکن به میدان می‌آید */
export function createEnemyState(px: number, pz: number): EnemyState {
  return {
    phase: "patrol",
    x: px + ENEMY_ORBIT_R * Math.cos(Math.PI),
    y: ENEMY_FLY_Y,
    z: pz + ENEMY_ORBIT_R * Math.sin(Math.PI),
    orbitAngle: Math.PI,
    orbitDir: Math.random() > 0.5 ? 1 : -1,
    t: 0,
    calmT: 0,
    fleeT: 0,
    throwCd: 0,
    justThrew: false,
    lostT: 0,
    justLost: false,
    face: 0,
  };
}

/** فاز U2 — بازگشت تمیز به مدار گشت از موقعیت فعلی (بدون پرش ناگهانی) — الگوی مشترک سه گذار */
export function enemyReturnToOrbit(st: EnemyState, px: number, pz: number): void {
  st.phase = "patrol";
  st.orbitAngle = Math.atan2(st.z - pz, st.x - px);
  st.t = 0;
  st.calmT = 0;
}

/** درخواست گریز فوری (برخورد گلوله — از index به‌واسطهٔ api پهپاد) */
export function enemyFlee(st: EnemyState): void {
  st.phase = "flee";
  st.fleeT = ENEMY_FLEE_S;
  st.t = 0;
}

/**
 * گام FSM — جهش in-place روی st (فراخوانی هر فریم از useFrame پهپاد).
 * ترتیب تصمیم: گریز (تا تمام شود) → تعقیب (سکون) → شارژ پرتاب قفس (U2) → گشت (مدار).
 */
export function stepEnemy(st: EnemyState, inp: EnemyInput): void {
  const dt = Math.min(inp.dt, 0.05);
  const m = inp.speedMult;
  st.t += dt;
  if (st.throwCd > 0) st.throwCd = Math.max(0, st.throwCd - dt); // فاز U2 — cooldown در فریم‌های FSM (فریز رایگان)
  const dx = st.x - inp.px;
  const dz = st.z - inp.pz;
  const dist = Math.hypot(dx, dz) || 0.0001;
  st.face = Math.atan2(-dx, -dz); // رو به بازیکن (محور +z جلو مدل)

  if (st.phase === "flee") {
    st.fleeT -= dt;
    // دورشدن مستقیم از بازیکن + کمی چرخش جانبی برای حس گریز واقعی
    const dirX = dx / dist;
    const dirZ = dz / dist;
    const sweep = Math.sin(st.t * 2.2) * 0.35;
    const vx = (dirX * Math.cos(sweep) - dirZ * Math.sin(sweep)) * ENEMY_FLEE_SPD * m;
    const vz = (dirZ * Math.cos(sweep) + dirX * Math.sin(sweep)) * ENEMY_FLEE_SPD * m;
    st.x += vx * dt;
    st.z += vz * dt;
    if (st.fleeT <= 0) {
      // بازگشت به مدار — زاویهٔ مدار از موقعیت فعلی ادامه می‌یابد (پرش ناگهانی ندارد)
      enemyReturnToOrbit(st, inp.px, inp.pz);
    }
  } else if (st.phase === "stalk") {
    if (inp.playerSpeed > ENEMY_MOVE_SPD) {
      // بازیکن راه افتاد — تعقیب شکست خورد؛ به مدار برمی‌گردد (تداوم ③ U1 — حرکت قوی‌تر از پنهانی)
      st.lostT = 0;
      enemyReturnToOrbit(st, inp.px, inp.pz);
    } else if (!inp.los) {
      // فاز U3 — بازیکن در پناهگاه: شناور می‌ماند تا گرِیس تمام شود؛ گذر زودهنگام دید = ادامهٔ تعقیب
      st.lostT += dt;
      if (st.lostT >= inp.lostS) {
        st.lostT = 0;
        st.justLost = true; // مصرف‌کننده: scene/drone در همان فریم — اعلام «رد گم شد»
        enemyReturnToOrbit(st, inp.px, inp.pz); // enemyReturnToOrbit صفر می‌کند calmT را — پنهانی کامل، رد پاک
      }
    } else if (dist > ENEMY_STOP_DIST) {
      const spd = Math.min(ENEMY_STALK_SPD * m, (dist - ENEMY_STOP_DIST) / dt || 0);
      st.x -= (dx / dist) * spd * dt;
      st.z -= (dz / dist) * spd * dt;
      st.lostT = 0; // دید برقرار — گرِیس پاک
    } else if (inp.chargeS > 0 && st.throwCd <= 0) {
      // فاز U2 — به فاصلهٔ توقف رسید و آمادهٔ پرتاب است: شارژ تله‌گراف شروع می‌شود
      st.phase = "charge";
      st.t = 0;
    } else {
      st.lostT = 0; // نزدیکِ توقف با دید — شناور می‌ماند (فقط bob رندر)؛ شارژ متعهد می‌ماند حتی بی‌دید (قانون ۵ §U3)
    }
  } else if (st.phase === "charge") {
    // فاز U2 — شارژ متعهد: شناور می‌ماند (حتی اگر بازیکن راه افتاد — قانون ۴ §U2)
    if (st.t >= inp.chargeS) {
      st.justThrew = true; // مصرف‌کننده: scene/drone در همان فریم — پرتاب قفس
      st.throwCd = inp.throwCd;
      enemyReturnToOrbit(st, inp.px, inp.pz);
    }
  } else {
    // patrol — مدار حول بازیکن + شمارش سکون
    st.orbitAngle += st.orbitDir * ENEMY_ORBIT_SPD * m * dt;
    st.x = inp.px + Math.cos(st.orbitAngle) * ENEMY_ORBIT_R;
    st.z = inp.pz + Math.sin(st.orbitAngle) * ENEMY_ORBIT_R;
    if (inp.playerSpeed < ENEMY_CALM_SPD) {
      // فاز U3 — سکون فقط با دید انباشته می‌شود؛ بدون دید freeze (نه صفر — تحمل فلیکر درز دید)
      if (inp.los) {
        st.calmT += dt;
        if (st.calmT >= inp.stalkDelay && m > 0) {
          st.phase = "stalk";
          st.t = 0;
        }
      }
    } else {
      st.calmT = 0;
    }
  }

  // نوسان عمودی مشترک (حتی در گریز — پرواز زنده)
  st.y = ENEMY_FLY_Y + Math.sin(st.t * 1.9) * ENEMY_BOB_AMP;
  // کران نقشه — پهپاد از میدان بیرون نمی‌زند
  st.x = clamp(st.x, inp.bounds.minX, inp.bounds.maxX);
  st.z = clamp(st.z, inp.bounds.minZ, inp.bounds.maxZ);
}

/** تأخیر تعقیب بر حسب دشواری (آسان هرگز به تعقیب نمی‌رسد — پهپاد خاموش است) */
export function enemyStalkDelay(difficulty: Difficulty): number {
  return difficulty === "hard" ? ENEMY_STALK_DELAY.hard : ENEMY_STALK_DELAY.normal;
}
