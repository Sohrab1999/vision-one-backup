/**
 * ثابت‌های تنظیمی آزمون — تفکیک مکانیکی از quiz-game.tsx
 */

export const CATEGORY_OPTIONS = [
  { value: "all", label: "همه سؤال‌ها" },
  { value: "grammar", label: "فقط گرامر" },
  { value: "vocabulary", label: "فقط واژگان" },
];

export const LEVEL_OPTIONS = [
  { value: "all", label: "همه سطوح" },
  { value: "آموزشی", label: "آموزشی" },
  { value: "متوسط", label: "متوسط" },
  { value: "استاندارد", label: "استاندارد" },
  { value: "کنکوری", label: "کنکوری" },
];

/** رنگ نشان سطح روی کارت سؤال و چیپ فعال سطح */
export function levelBadgeClass(level: string): string {
  if (level === "all") return "border-primary bg-primary/10 text-primary";
  if (level === "آموزشی") return "border-primary/40 bg-primary/10 text-primary";
  if (level === "کنکوری") return "border-destructive/40 bg-destructive/10 text-destructive";
  return "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400";
}

export const BASE_LESSON_OPTIONS = [
  { value: "all", label: "همه بخش‌ها" },
  { value: "0", label: "جمع‌بندی کل کتاب" },
];

export const COUNT_OPTIONS = [5, 10, 20, 40];

export const TIMED_OPTIONS = [
  { value: 0, label: "بدون زمان" },
  { value: 15, label: "۱۵ ثانیه" },
  { value: 30, label: "۳۰ ثانیه" },
  { value: 60, label: "۶۰ ثانیه" },
];

export const LETTERS = ["A", "B", "C", "D"];

export const CONFETTI_COLORS = ["#10b981", "#f59e0b", "#f97316", "#14b8a6", "#84cc16", "#eab308"];

/** کلید بازی برای تله‌متری کیت (kit/telemetry — رویدادهای game_session_*) */
export const GAME_KEY = "quiz";
