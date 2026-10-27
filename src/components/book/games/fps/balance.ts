"use client";

/**
 * balance — ماتریس تعادل نهایی «میدان زنده» (فاز U9 — نقشهٔ docs/fps-upgrade-roadmap.md §۵٫۹).
 *
 * ماژول خالص: صفر وابستگی به React/THREE — فقط ثابت و فرمول. این ماژول «آینهٔ مستند»
 * ضرایب تیون است؛ **منبع اجرا همان‌جا که بود می‌ماند** (enemy.ts/boss.ts/constants.ts —
 * مرکزیت پارامتر §U1/§U4 به‌هم نمی‌خورد). تنها رفتار تازهٔ فاز، درجه‌بندی محور
 * زمان سؤال است: تا U9 این محور روی هر سه درجه «تخت» بود و دادهٔ میدانی U8 نشان داد
 * تایم‌اوتِ سؤالِ بی‌پاسخ هم ❤ می‌سوزاند — پس آسان زمان بیشتر و سخت زمان کمتر می‌گیرد.
 *
 * قوانین سخت سند §U9:
 * ① صفر تغییر در موتور — ضرایب U1..U7 دست‌نخورده؛ فقط qTime درجه‌بندی می‌شود
 * ④ آسانِ آموزشی، نه آسانِ کاذب — ضریب فقط زمان می‌دهد (ADR-005)
 * ⑤ رکوردها/امتیاز دست‌نخورده — صفر ضریب امتیاز اینجاست
 */

import type { Difficulty } from "./constants";
import {
  ENEMY_CHARGE_S,
  ENEMY_LOST_S,
  ENEMY_STALK_DELAY,
  ENEMY_THROW_CD,
} from "./enemy";
import { BOSS_CAGE_CD, BOSS_CHARGE_S } from "./boss";

/** مُهر نسخهٔ بازی — فاز U9 قانون ۶ (قفل نسخه) */
export const FIELD_VERSION = "میدان زنده ۱٫۰";

// ── محور درجه‌بندی‌شدهٔ U9 — زمان سؤال بر حسب دشواری ──

/** ضریب زمان سؤال بر حسب دشواری — تنها ضریب تازهٔ فاز (آسان ۳۰٪ بیشتر / سخت ۱۵٪ کمتر) */
export const Q_TIME_MULT: Record<Difficulty, number> = {
  easy: 1.3,
  normal: 1,
  hard: 0.85,
};

/** زمان مؤثر سؤال (ثانیه) — رُند صحیح؛ ورودی = تایمر پایهٔ حالت (شلیکی ۱۲ / تپی ۱۵) */
export function qTime(base: number, difficulty: Difficulty): number {
  return Math.round(base * Q_TIME_MULT[difficulty]);
}

// ── ماتریس تعادل — آینهٔ مستند منابع اجرا (ستون «شاخص فشار» مشتق خالص است) ──

/** سطر ماتریس برای یک درجه — همهٔ مقادیر از منابع اجرا می‌خوانند (دو مرجع، نه دو منبع) */
export interface BalanceRow {
  difficulty: Difficulty;
  /** برچسب فارسی گزارش/سند */
  label: string;
  /** ضریب سرعت FSM پهپاد (تپ‌ساده جدا اعمال می‌شود — enemySpeedMult) */
  enemySpeed: number;
  /** تأخیر سکون تا شروع تعقیب (ثانیه — آسان: پهپاد خاموش) */
  stalkDelayS: number | null;
  /** شارژ تله‌گراف قفس (ثانیه) */
  chargeS: number | null;
  /** cooldown پرتاب قفس (ثانیه) */
  throwCdS: number | null;
  /** گرِیس گم‌کردن رد (ثانیه) */
  lostS: number | null;
  /** ضریب سرعت رئیس (bossSpeedMult) */
  bossSpeed: number;
  /** شارژ تله‌گراف رئیس (ثانیه) */
  bossChargeS: number | null;
  /** cd قفس رئیس (ثانیه) */
  bossCageCdS: number | null;
  /** ضریب زمان سؤال + اعداد مؤثر شلیکی/تپی */
  qTimeMult: number;
  qShootS: number;
  qTapS: number;
  /** شاخص فشار مشتق ۰..۱۰۰ — فقط سند/شبیه‌سازی (قانون ⑦ §U9: در اجرا مصرف نمی‌شود) */
  pressure: number;
}

/** مؤلفه‌های شاخص فشار — نرمال‌سازی روی بیشینه‌های سخت (§U9 مشخصات فنی) */
const PRESSURE_SPEED_REF = 1.28; // سرعت FSM سخت
const PRESSURE_CD_REF = 1.5; // نسبت cd عادی↔سخت (9/6)
const BASE_THROW_CD = 9; // cd عادی — مخرج نسبت

/** شاخص فشار یک درجه — آسان ۰ (پهپاد خاموش)؛ سخت ۱۰۰ */
function pressureOf(difficulty: Difficulty): number {
  if (difficulty === "easy") return 0;
  const speed = difficulty === "hard" ? 1.28 : 1;
  const cd = difficulty === "hard" ? 6 : 9;
  return Math.round(100 * (0.55 * (speed / PRESSURE_SPEED_REF) + 0.45 * (BASE_THROW_CD / cd / PRESSURE_CD_REF)));
}

/** ردیف ماتریس یک درجه — مقادیر مستقیماً از ثابت‌های منبع اجرا (انطباق ساختاری در sim) */
function rowOf(difficulty: Difficulty, label: string, baseShoot: number, baseTap: number): BalanceRow {
  const off = difficulty === "easy";
  return {
    difficulty,
    label,
    enemySpeed: off ? 0 : difficulty === "hard" ? 1.28 : 1,
    stalkDelayS: off ? null : difficulty === "hard" ? ENEMY_STALK_DELAY.hard : ENEMY_STALK_DELAY.normal,
    chargeS: off ? null : difficulty === "hard" ? ENEMY_CHARGE_S.hard : ENEMY_CHARGE_S.normal,
    throwCdS: off ? null : difficulty === "hard" ? ENEMY_THROW_CD.hard : ENEMY_THROW_CD.normal,
    lostS: off ? null : difficulty === "hard" ? ENEMY_LOST_S.hard : ENEMY_LOST_S.normal,
    bossSpeed: off ? 0 : difficulty === "hard" ? 1.22 : 1,
    bossChargeS: off ? null : difficulty === "hard" ? BOSS_CHARGE_S.hard : BOSS_CHARGE_S.normal,
    bossCageCdS: off ? null : difficulty === "hard" ? BOSS_CAGE_CD.hard : BOSS_CAGE_CD.normal,
    qTimeMult: Q_TIME_MULT[difficulty],
    qShootS: qTime(baseShoot, difficulty),
    qTapS: qTime(baseTap, difficulty),
    pressure: pressureOf(difficulty),
  };
}

/** ماتریس تعادل نهایی — سه سطر به ترتیب ملایم → متعادل → شدید (اعداد پایه: ۱۲/۱۵) */
export const BALANCE_MATRIX: BalanceRow[] = [
  rowOf("easy", "آسان", 12, 15),
  rowOf("normal", "عادی", 12, 15),
  rowOf("hard", "سخت", 12, 15),
];

/** برچسب فارسی درجه — گزارش نتیجه و ماتریس (کارکرد یکسان با سطر label) */
export function difficultyLabel(difficulty: Difficulty): string {
  return difficulty === "easy" ? "آسان" : difficulty === "hard" ? "سخت" : "عادی";
}
