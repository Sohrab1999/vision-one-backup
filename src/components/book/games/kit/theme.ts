"use client";

/**
 * فصلی‌سازی بازی‌ها — تم فصل روی کیت — فاز G3-06 نقشه راه بازی‌ها.
 *
 * قرارداد «پارامتر تم در GameShell» (سند §۵-G3-06) بدون prop تأمین می‌شود:
 * شِل خودش در mount داخلی `getSeasonTheme()` را می‌خواند — هیچ‌یک از ۱۵ بازی
 * prop یا کد تغییری نمی‌دهد و تم خودکار روی همهٔ شِل‌ها می‌نشیند.
 * پذیرش سند «پیش‌فرض بدون تغییر»: در تم "default" خروجی شِل بایت‌به‌بایت قبل است؛
 * الحاق تزئینی فقط با الگوی `cn("کلاس قبلی", season === "mehregan" && "افزودنی")`.
 *
 * منبع تم (به ترتیب اولویت):
 * 1. کلید افزودنی `visionone:game-theme` در localStorage — فقط "default"/"mehregan"
 *    معتبر است (نوشتن با setSeasonTheme — برای QA/پیش‌نمایش؛ UI عمومی ندارد)
 * 2. تقویم شمسی: ماه ۷ (مهر) → "mehregan" — بقیهٔ سال "default"
 * 3. هر خطا/حافظهٔ ناموجود/SSR → "default" (ساکت)
 *
 * پالت مهرگان فقط عنابی/نارنجی/کهربایی (rose/orange/amber تیلویند) — آبی/ایندیگو ممنوع.
 */

/** کلید افزودنی تم فصلی — QA/پیش‌نمایش؛ در نبودش تقویم شمسی تصمیم می‌گیرد */
export const SEASON_THEME_STORAGE_KEY = "visionone:game-theme";

/** ماه مهر در تقویم شمسی — جشن مهرگان */
const MEHREGAN_MONTH = 7;

export type SeasonTheme = "default" | "mehregan";

function isSeasonTheme(v: unknown): v is SeasonTheme {
  return v === "default" || v === "mehregan";
}

/** شمارهٔ ماه تقویم شمسی (۱..۱۲) یا null در خطا — ارقام فارسی/عربی نرمال می‌شوند */
function persianMonthOf(date: Date): number | null {
  try {
    const parts = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { month: "numeric" }).formatToParts(date);
    const raw = parts.find((p) => p.type === "month")?.value ?? "";
    // «۷» (ارقام فارسی U+06F0..) یا «٧» (عربی U+0660..) → لاتین → عدد
    const latin = raw
      .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
      .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
    const n = Number(latin.trim());
    return n >= 1 && n <= 12 ? n : null;
  } catch {
    return null;
  }
}

/**
 * تم فصل فعلی — یک‌بار در mount شِل (useMemo) خوانده می‌شود.
 * ترتیب: کلید افزودنی localStorage → تقویم شمسی (مهر = ۷) → "default".
 */
export function getSeasonTheme(): SeasonTheme {
  // ۱) کلید افزودنی QA/پیش‌نمایش — مقدار نامعتبر نادیده گرفته می‌شود
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const raw = window.localStorage.getItem(SEASON_THEME_STORAGE_KEY);
      if (isSeasonTheme(raw)) return raw;
    }
  } catch {
    /* حافظهٔ محلی مسدود/ناموجود — ساکت به تقویم می‌رویم */
  }
  // ۲) تقویم شمسی — فقط مهر (ماه ۷) جشن مهرگان است
  const month = persianMonthOf(new Date());
  if (month === MEHREGAN_MONTH) return "mehregan";
  // ۳) پیش‌فرض بدون تغییر
  return "default";
}

/** نوشتن/حذف کلید تم — فقط برای QA/پیش‌نمایش؛ null = بازگشت به تصمیم تقویم */
export function setSeasonTheme(t: SeasonTheme | null): void {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    if (t === null) window.localStorage.removeItem(SEASON_THEME_STORAGE_KEY);
    else window.localStorage.setItem(SEASON_THEME_STORAGE_KEY, t);
  } catch {
    /* ساکت — حافظهٔ محلی مسدود */
  }
}

/**
 * کلاس‌های تزئینی مهرگان برای آیکون/هدر شِل — عنابی/کهربایی.
 * با الحاق شرطی مصرف می‌شود؛ twMerge جای پس‌زمینه/متن زمردی قبلی را
 * با گرادیان عنابی و متن عنابی عوض می‌کند (فقط در تم mehregan).
 */
export function mehreganHeaderCls(): string {
  return "bg-gradient-to-br from-rose-500/20 to-amber-500/20 text-rose-600 dark:text-rose-400";
}
