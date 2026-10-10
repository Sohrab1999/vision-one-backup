"use client";

import { useEffect, useState } from "react";
import { useBook } from "./book-context";

/**
 * نبض اجتماعی چالش‌ها — تعداد پاسخ‌دهندگان، میانگین و بهترین دقت از سرور.
 * daily: آزمون‌های dailyِ امروز · weekly: آزمون‌های weekly از شنبهٔ آغازین هفته.
 * سبک و یک‌بار مصرف: فقط یک GET به /api/attempts — scoped به کتاب فعال.
 */

export interface Pulse {
  players: number;
  avg: number | null;
  best: number | null;
}

interface Pulses {
  daily: Pulse | null;
  weekly: Pulse | null;
}

const IDLE: Pulses = { daily: null, weekly: null };

export function usePulses(enabled = true): Pulses {
  const { bookId } = useBook();
  const [pulses, setPulses] = useState<Pulses>(IDLE);

  useEffect(() => {
    if (!enabled || !bookId) return;
    let cancelled = false;
    fetch(`/api/attempts?book=${encodeURIComponent(bookId)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled || !d) return;
        const next: Pulses = { daily: null, weekly: null };
        if (d.dailyPulse && typeof d.dailyPulse.players === "number") {
          next.daily = d.dailyPulse as Pulse;
        }
        if (d.weeklyPulse && typeof d.weeklyPulse.players === "number") {
          next.weekly = d.weeklyPulse as Pulse;
        }
        setPulses(next);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [enabled, bookId]);

  return pulses;
}

/** سازگاری با کدهای قبلی — فقط نبض چالش روزانه */
export function useDailyPulse(enabled = true): Pulse | null {
  return usePulses(enabled).daily;
}
