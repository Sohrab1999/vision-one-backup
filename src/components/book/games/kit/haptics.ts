"use client";

/**
 * لرزش الگو-دار بازی‌ها (Vibration API) — فاز G1-02 نقشه راه بازی‌ها.
 *
 * قراردادها:
 * - بهبود تدریجی: در مرورگرهای بدون navigator.vibrate (مثل iOS Safari) ساکت رد می‌شود
 * - زیر «همان کلید بی‌صدای» موتور صدا است (visionone:sound-muted) — یک کلید، دو بازخورد
 * - الگوها کوتاه‌اند (≤ ۱۴۶ms) تا حواس‌پرتی نسازد
 */

import { isSoundMuted } from "./sound-engine";

export type BuzzPattern = "light" | "success" | "error" | "record";

const PATTERNS: Record<BuzzPattern, number | number[]> = {
  light: 10,
  success: [18, 40, 18],
  error: [60],
  record: [18, 40, 18, 40, 30],
};

/** لرزش الگو-دار — بی‌پشتیبانی/بی‌صدا/خطا = ساکت و بی‌اثر */
export function buzz(p: BuzzPattern): void {
  if (isSoundMuted()) return;
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return;
  try {
    navigator.vibrate(PATTERNS[p]);
  } catch {
    /* noop */
  }
}
