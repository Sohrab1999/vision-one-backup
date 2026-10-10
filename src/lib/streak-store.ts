"use client";

import { useSyncExternalStore } from "react";

/**
 * Daily streak store — fires whenever the user completes a learning activity
 * (quiz finished, flashcard round done, words marked learned).
 * Persisted in localStorage: visionone:streak
 *
 * فاز ۶: یخ‌زنندهٔ زنجیره (Streak Freeze) — با سکه از نمای جایزه‌ها خریده
 * می‌شود و در روزهای غیبت، زنجیره را ذوب می‌کند (هر یخ یک روز).
 */

const STREAK_KEY = "visionone:streak";

export interface StreakData {
  count: number;
  best: number;
  /** epoch-day of last activity */
  lastDay: number;
  /** تعداد یخ‌های انبارشده */
  freezes: number;
}

const EMPTY: StreakData = { count: 0, best: 0, lastDay: 0, freezes: 0 };

let cache: StreakData | null = null;
const listeners = new Set<() => void>();

function epochDay(): number {
  return Math.floor(Date.now() / 86400000);
}

function read(): StreakData {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    cache = raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<StreakData>) } : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

/**
 * Register activity for "today". Consecutive days increment the streak;
 * a skipped day burns one stored freeze instead of resetting (فاز ۶).
 */
export function touchStreak(): StreakData {
  const today = epochDay();
  const cur = read();
  let next: StreakData;
  if (cur.lastDay === today) {
    next = cur; // already counted today
  } else if (cur.lastDay === today - 1) {
    next = { ...cur, count: cur.count + 1, best: Math.max(cur.best, cur.count + 1), lastDay: today };
  } else {
    // روز(های) غیبت — اگر یخ در انبار هست، پل زده می‌شود
    const gap = today - cur.lastDay - 1; // روزهای خالی بین آخرین فعالیت و امروز
    const hadStreak = cur.count > 0;
    const useFreeze = hadStreak && gap > 0 && cur.freezes > 0;
    if (useFreeze) {
      const burned = Math.min(gap, cur.freezes);
      next = {
        ...cur,
        freezes: cur.freezes - burned,
        count: cur.count + 1,
        best: Math.max(cur.best, cur.count + 1),
        lastDay: today,
      };
    } else {
      next = { ...cur, count: 1, best: Math.max(cur.best, 1), lastDay: today };
    }
  }
  if (next !== cur) {
    cache = next;
    try {
      localStorage.setItem(STREAK_KEY, JSON.stringify(next));
    } catch {
      /* noop */
    }
    listeners.forEach((l) => l());
  }
  return next;
}

/** افزودن یخ به انبار (خرید از فروشگاه جایزه‌ها) */
export function grantFreeze(): StreakData {
  const cur = read();
  const next = { ...cur, freezes: Math.min(7, cur.freezes + 1) };
  cache = next;
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(next));
  } catch {
    /* noop */
  }
  listeners.forEach((l) => l());
  return next;
}

/** خواندن همگام برای موتور نشان‌ها */
export function readStreak(): StreakData {
  return read();
}

export function useStreak(): StreakData {
  return useSyncExternalStore(
    subscribe,
    () => read(),
    () => EMPTY,
  );
}
