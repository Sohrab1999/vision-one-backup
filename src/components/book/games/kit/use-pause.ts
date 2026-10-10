"use client";

/**
 * هوک توقف/ادامهٔ استاندارد بازی‌ها — فاز G1-03 نقشه راه بازی‌ها.
 *
 * قراردادها:
 * - این هوک فقط «state توقف» استاندارد می‌دهد؛ مدیریت تایمر با خود بازی است
 *   (تایمر بازی باید روی `paused` شرط شود یا در onPausedChange متوقف/روشن شود)
 * - توقف خودکار در تب مخفی (autoPauseOnHidden — پیش‌فرض روشن): برخلاف گارد حداقلی
 *   G0-05 که بی‌صدا از سر می‌گیرد، اینجا کاربر هنگام بازگشت اورلی «متوقف شد» می‌بیند
 *   و خودش ادامه می‌دهد — هیچ زمانی پشت‌سرِ کاربر نمی‌گذرد
 * - روشن/خاموش idempotent است و در unmount نیازی به پاک‌سازی ندارد (فقط state)
 */

import { useCallback, useEffect, useRef, useState } from "react";

export interface GamePauseApi {
  paused: boolean;
  pause: () => void;
  resume: () => void;
  toggle: () => void;
}

export function useGamePause(
  onChange?: (paused: boolean) => void,
  opts?: { autoPauseOnHidden?: boolean },
): GamePauseApi {
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const cbRef = useRef(onChange);
  // نوشتن ref فقط در effect (قاعدهٔ react-hooks/refs — نه هنگام رندر)
  useEffect(() => {
    cbRef.current = onChange;
  });

  const apply = useCallback((p: boolean) => {
    if (pausedRef.current === p) return; // idempotent
    pausedRef.current = p;
    setPaused(p);
    cbRef.current?.(p);
  }, []);

  const pause = useCallback(() => apply(true), [apply]);
  const resume = useCallback(() => apply(false), [apply]);
  const toggle = useCallback(() => apply(!pausedRef.current), [apply]);

  const auto = opts?.autoPauseOnHidden ?? true;
  useEffect(() => {
    if (!auto) return;
    const onVis = (): void => {
      if (document.visibilityState === "hidden") apply(true);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [auto, apply]);

  return { paused, pause, resume, toggle };
}
