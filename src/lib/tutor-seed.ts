"use client";

/**
 * tutor-seed — فاز F10-c «گزارش پایان دور به دستیار»
 *
 * سازوکار سبک برای تحویل یک متن آماده (مثل گزارش خطاهای بازی) به دستیار هوشمند:
 * بازی متن را در sessionStorage می‌نویسد و به نمای «دستیار» ناوبری می‌کند؛
 * FreeChat هنگام سوار شدن seed را مصرف می‌کند و در ورودی چت می‌گذارد.
 *
 * - sessionStorage (نه localStorage): گزارشِ یک دورِ بازی زودگذر است و نباید
 *   در باز شدن بعدی دستیار دوباره ظاهر شود؛ با بستن تب هم خودبه‌خود پاک می‌شود.
 * - مصرف‌کننده seed را حذف می‌کند (consume) تا دوباره‌کاری نشود.
 * - هر خطای حافظه بی‌صدا نادیده گرفته می‌شود — هرگز نباید جریان بازی را بشکند.
 */

const KEY = "visionone:tutor-seed";

/** ثبت متن آماده برای ورودی چت دستیار (فرستنده: صفحهٔ نتیجهٔ بازی‌ها) */
export function seedTutorPrompt(text: string): void {
  try {
    sessionStorage.setItem(KEY, text);
  } catch {
    /* noop */
  }
}

/** خواندن و مصرف یک‌بارهٔ seed — فقط FreeChat در mount صدا می‌زند */
export function consumeTutorSeed(): string | null {
  try {
    const v = sessionStorage.getItem(KEY);
    if (v !== null) sessionStorage.removeItem(KEY);
    return v;
  } catch {
    return null;
  }
}
