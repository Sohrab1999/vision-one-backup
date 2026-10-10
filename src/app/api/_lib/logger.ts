/**
 * لاگر ساختاریافتهٔ سرور (فاز ۱۱ — مانیتورینگ) — یک خط JSON به console سرور.
 *
 * قواعد:
 * - هیچ PII ثبت نمی‌شود (بدون نام کاربری، ایمیل، محتوای یادداشت/واژه…)
 * - فقط رویدادهای مهم: خطاها، خوردن rate-limit، ایمپورت، حذف حساب و…
 * - خروجی قابل grep برای مانیتور: {"t":"ISO","route":"...","event":"..."}
 */

export function logEvent(route: string, event: string, data?: Record<string, unknown>): void {
  try {
    const line = JSON.stringify({ t: new Date().toISOString(), route, event, ...(data ?? {}) });
    console.log(line);
  } catch {
    /* لاگ هرگز نباید جریان درخواست را بشکند */
  }
}
