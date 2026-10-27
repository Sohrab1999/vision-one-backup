/**
 * types — ثابت‌ها و تایپ‌های مشترک بازی «تست برقی» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).
 * تفکیک مکانیکی از speed-quiz-game.tsx (پلی‌بوک fps/) — محتوا عیناً از فایل اصلی؛
 * تنها دلتا: پسوند export. قراردادهای مقدس: GAME_KEY/اسکوپ رکورد/کلیدهای localStorage.
 */

export const GAME_KEY = "speed-quiz";
export const ALL_LESSON = -1;
export const MIN_POOL = 5;
export const DURATIONS = [30, 60, 90] as const;

export type Phase = "setup" | "playing" | "done";
export type CatKey = "all" | "vocabulary" | "grammar";
/** فاز G3-05 — حالت دور: مسابقهٔ تایم‌دار عادی یا تمرین بی‌پایان */
export type RoundMode = "timed" | "endless";

/** شکل رکورد شخصی این بازی — اسکوپ: درس:دسته:مدت */
export interface BestRecord {
  score: number;
}

/** یک خطای واژگانی دور — برای «مرور خطاها»ی صفحهٔ نتیجهٔ کیت */
export interface WrongItem {
  front: string;
  back: string;
}
