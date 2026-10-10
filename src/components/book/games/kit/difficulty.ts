"use client";

/**
 * پیش‌تنظیم دشواری و فرمول امتیاز مشترک بازی‌ها — فاز G1-07 نقشه راه بازی‌ها.
 *
 * ★ فرمول واحد امتیاز (تنها راه امتیازدهی مجاز در همهٔ بازی‌ها) ★
 *
 *     score = base × level × combo
 *
 *   - base  : امتیاز خام هر پاسخ درست — مالِ خود بازی است (مثلاً تست برقی ۱۰، شوتر ۵)
 *   - level : ضریب دشواری از DIFFICULTY_PRESETS (آسان ۱ / عادی ۱٫۵ / سخت ۲٫۲۵)
 *   - combo : ضریب کمبو (۱ / ۲ / ۳) از موتور کمبو (فاز G1-09) — بدون کمبو = ۱
 *
 * قاعده‌ها:
 * - خروجی همیشه Math.round و عدد صحیح نامنفی است
 * - هیچ بازی نباید مستقیم ضرب کند — همیشه از computeScore استفاده شود تا
 *   توازن امتیاز بین بازی‌ها و درستی رده‌بندی به‌هم نخورد
 * - بازی‌هایی که «بهتر = کمتر» دارند (زمان/حرکت) امتیاز عددی نمی‌سازند و
 *   فقط از سطح دشواری برای تنظیم گیم‌پلی استفاده می‌کنند
 */

export type DifficultyKey = "easy" | "normal" | "hard";

export interface DifficultyPreset {
  key: DifficultyKey;
  /** برچسب فارسی دکمه */
  label: string;
  /** ضریب امتیاز این سطح (ورودی level در فرمول) */
  multiplier: number;
  /** توضیح یک‌خطی برای زیرنویس/aria-label */
  hint: string;
}

/** پیش‌تنظیم‌های رسمی دشواری — همه بازی‌ها فقط از همین استفاده می‌کنند */
export const DIFFICULTY_PRESETS: Record<DifficultyKey, DifficultyPreset> = {
  easy: {
    key: "easy",
    label: "آسان",
    multiplier: 1,
    hint: "زمان بیشتر و گزینه‌های کمتر — برای شروع",
  },
  normal: {
    key: "normal",
    label: "عادی",
    multiplier: 1.5,
    hint: "همان تجربهٔ اصلی بازی",
  },
  hard: {
    key: "hard",
    label: "سخت",
    multiplier: 2.25,
    hint: "زمان کمتر و امتیاز بیشتر — برای قهرمان‌ها",
  },
};

/** ترتیب نمایش در UI (آسان → سخت) */
export const DIFFICULTY_ORDER: DifficultyKey[] = ["easy", "normal", "hard"];

/**
 * فرمول واحد امتیاز — base × level × combo
 * ورودی‌های غیرمعتبر (صفر/منفی/NaN) خنثی می‌شوند تا یک پاسخ خراب امتیاز کل را نسوزاند.
 */
export function computeScore(
  base: number,
  levelMultiplier: number,
  comboMultiplier = 1,
): number {
  const safe = (n: number, fallback: number): number =>
    Number.isFinite(n) && n > 0 ? n : fallback;
  return Math.round(safe(base, 0) * safe(levelMultiplier, 1) * safe(comboMultiplier, 1));
}
