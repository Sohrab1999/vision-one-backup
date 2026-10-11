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

// ─── فاز G3-01 — دشواری ۳سطحی بازی‌های مهاجرت‌شده (کناره‌های گیم‌پلی) ───
//
// بازی‌های قدیمی که در G2 روی کیت سوار شدند، امتیاز/گیم‌پلی ثابت خودشان را
// دارند. برای اینکه رکورد کاربران نسوزد، قاعده این است:
//
//   ★ «عادی» دقیقاً همان رفتار قبلی بازی است (ضریب ۱ — صفر مهاجرت) ★
//
//   آسان  = گزینهٔ کمتر (۳) / زمان ۱٫۲۵× / امتیاز ×۰٫۷ / راهنما نصف
//   سخت   = گزینهٔ بیشتر (۵) / زمان ۰٫۷۵× / امتیاز ×۱٫۶ (≥ ۱٫۵× عادی —
//           معیار پذیرش G3-01) / راهنما ۱٫۵×
//
// و فقط در سطح‌های آسان/سخت، scope رکورد پسوند سطح می‌گیرد (الگوی
// بی‌نهایت وردل در G2-d) تا کلیدهای عادی بایت‌به‌بایت دست‌نخورده بمانند.

export interface LevelKnobs {
  /** تعداد گزینهٔ پیشنهادی هر سؤال — بازی با min/max خودش محدود می‌کند */
  options: number;
  /** مقیاس زمان تایمر نسبت به رفتار قبلی (۱ = بدون تغییر) */
  timeScale: number;
  /** ضریب امتیاز نسبت به امتیاز قبلی بازی (عادی = ۱) */
  scoreMultiplier: number;
  /** هزینهٔ راهنما نسبت به قبل (۱ = بدون تغییر) */
  hintCostScale: number;
}

/** کناره‌های گیم‌پلی رسمی هر سطح — بازی‌های مهاجرت‌شده فقط از همین می‌خوانند */
export const LEVEL_KNOBS: Record<DifficultyKey, LevelKnobs> = {
  easy: { options: 3, timeScale: 1.25, scoreMultiplier: 0.7, hintCostScale: 0.5 },
  normal: { options: 4, timeScale: 1, scoreMultiplier: 1, hintCostScale: 1 },
  hard: { options: 5, timeScale: 0.75, scoreMultiplier: 1.6, hintCostScale: 1.5 },
};

/**
 * scope رکورد سطح‌دار — «عادی» دقیقاً همان scope قدیمی برمی‌گردد
 * (کلیدهای localStorage موجود دست‌نخورده؛ آسان/سخت کلید افزودنی می‌گیرند)
 */
export function scopeWithLevel(scope: string, level: DifficultyKey): string {
  return level === "normal" ? scope : `${scope}:${level}`;
}

/**
 * اعمال ضریب سطح روی امتیاز خام بازی — فقط یک‌بار روی امتیاز نهایی
 * (تا رفتار گردکردن تک‌مرحله‌ای حفظ شود). عادی = همان عدد قبلی.
 */
export function levelScore(rawScore: number, level: DifficultyKey): number {
  if (!Number.isFinite(rawScore) || rawScore <= 0) return 0;
  return Math.max(0, Math.round(rawScore * LEVEL_KNOBS[level].scoreMultiplier));
}

/** تعداد گزینه برای این سطح — با کف/سقف خود بازی مهار می‌شود */
export function optionsFor(level: DifficultyKey, min: number, max: number): number {
  const o = LEVEL_KNOBS[level].options;
  return Math.min(Math.max(min, o), Math.max(min, max));
}

// ─── کلید ترجیح سطح (افزودنی) — انتخاب سطح بین جلسه‌ها حفظ می‌شود ───

const LEVEL_PREF_PREFIX = "visionone:game-pref:level:";

export function loadLevelPref(game: string): DifficultyKey {
  try {
    const raw = localStorage.getItem(`${LEVEL_PREF_PREFIX}${game}`);
    if (raw === "easy" || raw === "normal" || raw === "hard") return raw;
  } catch {
    /* noop */
  }
  return "normal";
}

export function saveLevelPref(game: string, level: DifficultyKey): void {
  try {
    localStorage.setItem(`${LEVEL_PREF_PREFIX}${game}`, level);
  } catch {
    /* noop */
  }
}
