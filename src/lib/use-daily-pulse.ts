"use client";

import { useEffect, useState } from "react";

/**
 * نبض اجتماعی چالش روزانه — میانگین/بهترین دقت و تعداد پاسخ‌دهندگان امروز از سرور.
 * سبک و یک‌بار مصرف: فقط یک GET به /api/attempts.
 */

export interface DailyPulse {
  players: number;
  avg: number | null;
  best: number | null;
}

export function useDailyPulse(enabled = true): DailyPulse | null {
  const [pulse, setPulse] = useState<DailyPulse | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    fetch("/api/attempts")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && d?.dailyPulse && typeof d.dailyPulse.players === "number") {
          setPulse(d.dailyPulse as DailyPulse);
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return pulse;
}
