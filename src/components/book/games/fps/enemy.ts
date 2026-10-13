"use client";

/**
 * enemy — موتور تصمیم «پهپاد تعقیب‌گر» (فاز U1 — نقشهٔ docs/fps-upgrade-roadmap.md §U1).
 *
 * ماژول خالص: صفر وابستگی به React/THREE — فقط ریاضیات و FSM سه‌حالته
 * «گشت (patrol) → تعقیب (stalk) → گریز (flee)». مانند chain.ts، اینجا فقط
 * «تصمیم و انتگرال حرکت» گرفته می‌شود؛ رندر و اثرهای جانبی در scene/drone.tsx
 * و index.tsx می‌ماند (پلی‌بوک games/fps/README.md — تک‌مسئولیتی).
 *
 * قوانین سخت سند §U1:
 * ① آسان = دشمن خاموش (enemyConfig) · ② تپ ساده × عادی/سخت = نصف سرعت
 * ③ تعقیب فقط هنگام سکون بازیکن؛ حرکت = بازگشت به مدار گشت
 * ④ گریز با برخورد گلوله (فریز واقعی حین توقف بر عهدهٔ frameloop کیت است — ADR-004)
 */

import { clamp } from "./helpers";
import type { Difficulty } from "./constants";

/** حالت‌های FSM پهپاد */
export type EnemyPhase = "patrol" | "stalk" | "flee";

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
/** مدت گریز پس از برخورد گلوله (ثانیه) */
export const ENEMY_FLEE_S = 2.8;

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
    face: 0,
  };
}

/** درخواست گریز فوری (برخورد گلوله — از index به‌واسطهٔ api پهپاد) */
export function enemyFlee(st: EnemyState): void {
  st.phase = "flee";
  st.fleeT = ENEMY_FLEE_S;
  st.t = 0;
}

/**
 * گام FSM — جهش in-place روی st (فراخوانی هر فریم از useFrame پهپاد).
 * ترتیب تصمیم: گریز (تا تمام شود) → تعقیب (سکون) → گشت (مدار).
 */
export function stepEnemy(st: EnemyState, inp: EnemyInput): void {
  const dt = Math.min(inp.dt, 0.05);
  const m = inp.speedMult;
  st.t += dt;
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
      st.phase = "patrol";
      st.orbitAngle = Math.atan2(st.z - inp.pz, st.x - inp.px);
      st.t = 0;
      st.calmT = 0;
    }
  } else if (st.phase === "stalk") {
    if (inp.playerSpeed > ENEMY_MOVE_SPD) {
      // بازیکن راه افتاد — تعقیب شکست خورد؛ به مدار برمی‌گردد
      st.phase = "patrol";
      st.orbitAngle = Math.atan2(st.z - inp.pz, st.x - inp.px);
      st.t = 0;
      st.calmT = 0;
    } else if (dist > ENEMY_STOP_DIST) {
      const spd = Math.min(ENEMY_STALK_SPD * m, (dist - ENEMY_STOP_DIST) / dt || 0);
      st.x -= (dx / dist) * spd * dt;
      st.z -= (dz / dist) * spd * dt;
    }
    // نزدیکِ توقف: شناور می‌ماند (فقط bob رندر) — تهدید حاضر ولی بدون برخورد بدنی
  } else {
    // patrol — مدار حول بازیکن + شمارش سکون
    st.orbitAngle += st.orbitDir * ENEMY_ORBIT_SPD * m * dt;
    st.x = inp.px + Math.cos(st.orbitAngle) * ENEMY_ORBIT_R;
    st.z = inp.pz + Math.sin(st.orbitAngle) * ENEMY_ORBIT_R;
    if (inp.playerSpeed < ENEMY_CALM_SPD) {
      st.calmT += dt;
      if (st.calmT >= inp.stalkDelay && m > 0) {
        st.phase = "stalk";
        st.t = 0;
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
