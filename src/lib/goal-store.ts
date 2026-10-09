"use client";

import { useSyncExternalStore } from "react";
import { touchStreak } from "./streak-store";

/**
 * Daily goal store — user picks a daily word-learning goal (e.g. 10 words)
 * and every word marked as "learned" is logged per epoch-day.
 * Persisted in localStorage: visionone:goal
 */

const GOAL_KEY = "visionone:goal";
/** keep only the last N days of the log */
const LOG_KEEP = 30;

export interface GoalData {
  /** target words per day (default 10) */
  goal: number;
  /** epochDay -> words marked learned that day */
  log: Record<number, string[]>;
}

const EMPTY: GoalData = { goal: 10, log: {} };

let cache: GoalData | null = null;
const listeners = new Set<() => void>();

function epochDay(): number {
  return Math.floor(Date.now() / 86400000);
}

function read(): GoalData {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(GOAL_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<GoalData>;
      cache = {
        goal: typeof parsed.goal === "number" && parsed.goal > 0 ? parsed.goal : 10,
        log: parsed.log && typeof parsed.log === "object" ? parsed.log : {},
      };
    } else {
      cache = EMPTY;
    }
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(next: GoalData) {
  cache = next;
  try {
    localStorage.setItem(GOAL_KEY, JSON.stringify(next));
  } catch {
    /* noop */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function setDailyGoal(n: number) {
  const cur = read();
  if (cur.goal === n) return;
  write({ ...cur, goal: n });
}

/** Register a word as learned "today" for the daily-goal counter. */
export function recordWordLearned(word: string) {
  const day = epochDay();
  const cur = read();
  const today = cur.log[day] ?? [];
  if (today.includes(word)) return;
  let nextLog: Record<number, string[]> = { ...cur.log, [day]: [...today, word] };
  // trim old days
  const entries = Object.entries(nextLog);
  if (entries.length > LOG_KEEP) {
    entries.sort((a, b) => Number(b[0]) - Number(a[0]));
    nextLog = Object.fromEntries(entries.slice(0, LOG_KEEP));
  }
  const next: GoalData = { ...cur, log: nextLog };
  write(next);
  // reaching the daily goal keeps the streak alive too (fires once per day)
  if (next.log[day].length === next.goal) touchStreak();
}

export function useDailyGoal() {
  const data = useSyncExternalStore(
    subscribe,
    () => read(),
    () => EMPTY,
  );
  const day = epochDay();
  const todayWords = data.log[day] ?? [];
  const goal = data.goal;
  const todayCount = todayWords.length;
  // last 7 days (oldest → newest) for the mini activity strip
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = day - (6 - i);
    return { day: d, count: data.log[d]?.length ?? 0 };
  });
  return {
    goal,
    todayCount,
    todayWords,
    pct: Math.min(100, Math.round((todayCount / Math.max(goal, 1)) * 100)),
    week,
    setGoal: setDailyGoal,
  };
}
