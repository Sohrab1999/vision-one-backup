/**
 * ثابت‌ها و انواع «فلپی گزینش» — تفکیک مکانیکی از flappy-quiz-game.tsx
 * (گام ۹ نقشهٔ docs/refactor-roadmap-2.md — پلی‌بوک games/fps/README.md)
 * کلیدهای مقدس: GAME_KEY / اسکوپ‌های رکورد / امضای Attempt — بدون تغییر.
 */

import type { QuizQuestionSeed } from "@/data/types";

// ─── ثابت‌ها و انواع ───

export const GAME_KEY = "flappy-quiz";
export const ALL_LESSONS = -1;
/** گارد استخر سؤال (تسک: استخر < ۳ → خطا) */
export const MIN_POOL = 3;
/** ارتفاع منطقی بوم (پیکسل) — عرض از اندازهٔ واقعی خوانده می‌شود */
export const H = 480;
export const WALL_W = 84;
export const BIRD_R = 13;
export const GROUND_H = 24;
export const HEARTS = 3;
/** مصونیت پس از عبور غلط (تسک: ۱ ثانیه) */
export const INVULN_MS = 1000;
/** فلاش قرمز کل بوم پس از خطا */
export const FLASH_MS = 320;
/** ماندگاری هایلایت سبز/قرمز روی دیوارِ تازه‌حل‌شده */
export const WALL_FLASH_MS = 700;

export type Phase = "setup" | "playing" | "done";

/** پیکربندی فیزیک — حالت آسان جاذبه/سرعت ملایم‌تری دارد */
export interface Cfg {
  base: number;
  cap: number;
  step: number;
  gravity: number;
  flap: number;
}

export const NORMAL_CFG: Cfg = { base: 150, cap: 330, step: 13, gravity: 1400, flap: -380 };
export const EASY_CFG: Cfg = { base: 112, cap: 235, step: 10, gravity: 1150, flap: -345 };

export interface FlappyGap {
  y0: number;
  y1: number;
  text: string;
  correct: boolean;
}

export interface FlappyWall {
  x: number;
  gaps: FlappyGap[];
  q: QuizQuestionSeed;
  resolved: boolean;
  ok: boolean;
  flashUntil: number;
}

export interface BirdState {
  y: number;
  vy: number;
}

export interface Popup {
  x: number;
  y: number;
  text: string;
  born: number;
}

/** شکل رکورد شخصی این بازی — بهتر = امتیاز بیشتر */
export interface BestRecord {
  score: number;
}
