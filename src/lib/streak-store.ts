"use client";

import { useSyncExternalStore } from "react";

/**
 * Daily streak store — fires whenever the user completes a learning activity
 * (quiz finished, flashcard round done, words marked learned).
 * Persisted in localStorage: visionone:streak
 */

const STREAK_KEY = "visionone:streak";

export interface StreakData {
  count: number;
  best: number;
  /** epoch-day of last activity */
  lastDay: number;
}

const EMPTY: StreakData = { count: 0, best: 0, lastDay: 0 };

let cache: StreakData | null = null;
const listeners = new Set<() => void>();

function epochDay(): number {
  return Math.floor(Date.now() / 86400000);
}

function read(): StreakData {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    cache = raw ? (JSON.parse(raw) as StreakData) : EMPTY;
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
 * Register activity for "today". Consecutive days increment the streak,
 * skipping days resets it to 1.
 */
export function touchStreak(): StreakData {
  const today = epochDay();
  const cur = read();
  let next: StreakData;
  if (cur.lastDay === today) {
    next = cur; // already counted today
  } else if (cur.lastDay === today - 1) {
    next = { count: cur.count + 1, best: Math.max(cur.best, cur.count + 1), lastDay: today };
  } else {
    next = { count: 1, best: Math.max(cur.best, 1), lastDay: today };
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

export function useStreak(): StreakData {
  return useSyncExternalStore(
    subscribe,
    () => read(),
    () => EMPTY,
  );
}
