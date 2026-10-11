"use client";

import { DIFFICULTY_ORDER, DIFFICULTY_PRESETS, type DifficultyKey } from "./difficulty";
import { cn } from "@/lib/utils";

/**
 * انتخاب‌گر سطح دشواری مشترک — فاز G3-01 نقشه راه بازی‌ها.
 *
 * سه چیپ «آسان / عادی / سخت» با همان الگوی بصری چیپ‌های setup بازی‌ها
 * (min-h-11 · rounded-full · aria-pressed) تا در هر ۸ بازی واژگانی یکدست باشد.
 *
 * قرارداد:
 * - «عادی» پیش‌فرض است و دقیقاً رفتار قبلی بازی را می‌دهد
 * - بازی مقدار را با loadLevelPref/saveLevelPref خودش نگه می‌دارد
 * - aria-label گروه قابل بازنویسی است (پیش‌فرض: «انتخاب سطح دشواری»)
 */
export function DifficultyPicker({
  value,
  onChange,
  label = "انتخاب سطح دشواری",
  className,
}: {
  value: DifficultyKey;
  onChange: (level: DifficultyKey) => void;
  /** برچسب بالای چیپ‌ها */
  label?: string;
  /** aria-label گروه (پیش‌فرض: انتخاب سطح دشواری) */
  className?: string;
}) {
  const chipCls = (active: boolean) =>
    cn(
      "flex min-h-11 items-center rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
      active
        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
        : "text-muted-foreground hover:bg-muted",
    );
  return (
    <div>
      <p className="mb-2 text-[13px] font-bold">{label}</p>
      <div className={cn("flex flex-wrap gap-2")} role="group" aria-label={className ?? label}>
        {DIFFICULTY_ORDER.map((key) => {
          const preset = DIFFICULTY_PRESETS[key];
          return (
            <button
              key={key}
              type="button"
              aria-pressed={value === key}
              title={preset.hint}
              onClick={() => onChange(key)}
              className={chipCls(value === key)}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
      <p className="mt-1.5 text-[11px] leading-5 text-muted-foreground" aria-live="polite">
        {DIFFICULTY_PRESETS[value].hint}
      </p>
    </div>
  );
}
