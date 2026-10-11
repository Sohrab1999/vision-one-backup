"use client";

/**
 * موتور کمبو مشترک بازی‌ها (ComboEngine) — فاز G1-09 نقشه راه بازی‌ها.
 *
 * قرارداد فرمول (مهاجرت با نتایج امتیاز «کاملاً یکسان»):
 *  - حالت "multiplier" (قانون speed-quiz): امتیاز هر پاسخ درست = base × ضریب کمبو
 *      ضریب: کمبو ≥ ۵ → ×۳ ، کمبو ≥ ۲ → ×۲ ، بقیه ×۱  (comboMultiplier)
 *  - حالت "bonus" (قانون flappy): امتیاز هر عبور درست = base + min(کمبو−۱، cap) × step
 *      پیش‌فرض: ۱۰ + min(کمبو−۱, ۵) × ۲  (comboBonus)
 *  - کمبو با اولین پاسخ غلط/ردشده صفر می‌شود (رفتار فعلی هر دو بازی)
 *  - «پنجرهٔ زمانی» اختیاری است (windowMs) — پیش‌فرض خاموش تا امتیاز مهاجرت‌شده
 *    مو‌به‌مو با قبل یکی بماند؛ بازی‌های آینده می‌توانند روشن کنند (انقضای کمبو)
 *
 * افکت بصری واحد: کلاس `combo-fire` (تعریف در همین فایل به‌صورت رشته، بازی روی
 * بج کمبو می‌گذارد) + هپتیک/صدا مال خود بازی است (کیت: buzz/playSound).
 *
 * مصرف با refs برای حلقه‌های rAF (flappy): comboRef/maxComboRef همیشه همگام.
 */

import { useCallback, useRef, useState } from "react";

export type ComboMode = "multiplier" | "bonus";

export interface ComboOptions {
  /** فرمول امتیاز — پیش‌فرض multiplier */
  mode?: ComboMode;
  /** امتیاز پایهٔ هر پاسخ درست — پیش‌فرض ۱۰ */
  base?: number;
  /** فقط حالت bonus: سقف شمارندهٔ بونوس — پیش‌فرض ۵ */
  bonusCap?: number;
  /** فقط حالت bonus: پلکانی هر کمبو — پیش‌فرض ۲ */
  bonusStep?: number;
  /** پنجرهٔ زمانی کمبو به میلی‌ثانیه — ۰ = خاموش (پیش‌فرض؛ امتیاز مهاجرت یکی می‌ماند) */
  windowMs?: number;
}

/** ضریب کمبو سبک speed-quiz — ≥۵→۳ ، ≥۲→۲ ، بقیه ۱ */
export function comboMultiplier(combo: number): 1 | 2 | 3 {
  return combo >= 5 ? 3 : combo >= 2 ? 2 : 1;
}

/** امتیاز بونوس سبک flappy — base + min(کمبو−۱, cap) × step */
export function comboBonus(combo: number, base = 10, cap = 5, step = 2): number {
  return base + Math.min(Math.max(combo - 1, 0), cap) * step;
}

/** کلاس افکت بصری واحد بج کمبو — بازی مشروط می‌گذارد */
export const COMBO_FIRE_CLASS = "combo-fire";

export interface ComboApi {
  /** کمبوی فعلی (reactive برای هدر/بج) */
  combo: number;
  /** بهترین کمبوی دور (reactive) */
  maxCombo: number;
  /** ضریب فعلی (حالت multiplier) */
  multiplier: 1 | 2 | 3;
  /** refs برای حلقه‌های rAF — همیشه همگام با state */
  comboRef: { current: number };
  maxComboRef: { current: number };
  /** پاسخ درست: کمبو++ و برگرداندن «امتیاز این پاسخ» طبق فرمول حالت */
  registerCorrect: () => number;
  /** پاسخ غلط/ردشده: کمبو صفر */
  registerMiss: () => void;
  /** ریست کامل ابتدای دور */
  reset: () => void;
}

export function useCombo(opts: ComboOptions = {}): ComboApi {
  const mode = opts.mode ?? "multiplier";
  const base = opts.base ?? 10;
  const cap = opts.bonusCap ?? 5;
  const step = opts.bonusStep ?? 2;
  const windowMs = opts.windowMs ?? 0;

  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const comboRef = useRef(0);
  const maxComboRef = useRef(0);
  const lastHitRef = useRef(0);

  const registerCorrect = useCallback((): number => {
    // پنجرهٔ زمانی: اگر از آخرین پاسخِ درست بیشتر گذشته، کمبو از صفر شمرده می‌شود
    if (windowMs > 0) {
      const now = Date.now();
      if (lastHitRef.current !== 0 && now - lastHitRef.current > windowMs) comboRef.current = 0;
      lastHitRef.current = now;
    }
    comboRef.current += 1;
    maxComboRef.current = Math.max(maxComboRef.current, comboRef.current);
    setCombo(comboRef.current);
    setMaxCombo(maxComboRef.current);
    return mode === "multiplier"
      ? base * comboMultiplier(comboRef.current)
      : comboBonus(comboRef.current, base, cap, step);
  }, [mode, base, cap, step, windowMs]);

  const registerMiss = useCallback((): void => {
    comboRef.current = 0;
    if (windowMs > 0) lastHitRef.current = 0;
    setCombo(0);
  }, [windowMs]);

  const reset = useCallback((): void => {
    comboRef.current = 0;
    maxComboRef.current = 0;
    lastHitRef.current = 0;
    setCombo(0);
    setMaxCombo(0);
  }, []);

  return {
    combo,
    maxCombo,
    multiplier: comboMultiplier(combo),
    comboRef,
    maxComboRef,
    registerCorrect,
    registerMiss,
    reset,
  };
}
