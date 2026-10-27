/**
 * ثابت‌های «وردل ویژن» — تفکیک مکانیکی از wordle-game.tsx
 * (گام ۹ نقشهٔ docs/refactor-roadmap-2.md — پلی‌بوک games/fps/README.md)
 *
 * کلیدهای localStorage روزانه/زنجیره در daily-store.ts ساخته می‌شوند؛
 * WORD_LEN ثابت روزانه دست‌نخورده (seed روزانه به استخر ۵حرفی وابسته است).
 */

import type { WordLevel } from "./types";

export const GAME_KEY = "wordle";
/** طول واژهٔ روزانه — ثابت و دست‌نخورده (seed روزانه به همین استخر ۵حرفی وابسته است) */
export const WORD_LEN = 5;
export const MAX_ROWS = 6;
/** فاصلهٔ پله‌ای فلیپ بین ستون‌ها (ms) */
export const FLIP_STAGGER_MS = 200;
/** مکث بعد از آخرین فلیپ تا آزادشدن ورودی/نمایش نتیجه (ms) */
export const FLIP_SETTLE_MS = 450;
/** حداقل واژهٔ استخر برای شروع */
export const MIN_POOL = 10;

/** فاز G2-d — سطح‌های طول واژهٔ حالت بی‌نهایت */
export const LEVELS: readonly WordLevel[] = [4, 5, 6];

/** فقط واژه‌های لاتین دقیقاً ۵حرفی وارد بازی روزانه می‌شوند (بازیابی وضعیت روز) */
export const WORD_RE = /^[a-zA-Z]{5}$/;
