export type Phase = "setup" | "playing" | "done";

/** شکل رکورد شخصی — بهتر = زمان کمتر (فقط بدون راهنما) */
export interface BestRecord {
  time: number;
}

export const ALL_LESSONS = -1;
export const GAME_KEY = "crossword";
export const COUNT_OPTIONS = [6, 8, 10];
/** گارد کیفیت جدول — کمتر از این تعداد واژهٔ جاگرفته پذیرفته نمی‌شود */
export const MIN_PLACED = 5;
/** طول انیمیشن لرزش حروف غلط تا پاک‌شدن (ms) */
export const SHAKE_MS = 650;
/** طول انیمیشن pop واژهٔ حل‌شده (ms) */
export const POP_MS = 700;
/** مکث پیش از رفتن به فاز done تا pop واژهٔ آخر دیده شود (ms) */
export const FINISH_MS = 900;
