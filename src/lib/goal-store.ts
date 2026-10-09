"use client";

import { useSyncExternalStore } from "react";
import { touchStreak } from "./streak-store";
import { readScoped, writeScoped, registerScopedReset } from "./book-storage";

/**
 * Daily goal + activity store — user picks a daily word-learning goal (e.g. 10 words)
 * and every word marked as "learned" is logged per epoch-day.
 * Quiz/match sessions are logged too, feeding the activity heatmap.
 * Persisted in localStorage scoped per book: visionone:book:<id>:goal
 */

const STORE_NAME = "goal";
/** keep only the last N days of the log (۱۲ هفته + حاشیه) */
const LOG_KEEP = 90;

export interface GoalData {
  /** target words per day (default 10) */
  goal: number;
  /** epochDay -> words marked learned that day */
  log: Record<number, string[]>;
  /** epochDay -> number of study sessions (quiz / match game) that day */
  sessionLog: Record<number, number>;
}

const EMPTY: GoalData = { goal: 10, log: {}, sessionLog: {} };

let cache: GoalData | null = null;
const listeners = new Set<() => void>();
registerScopedReset(() => {
  cache = null;
});

function epochDay(): number {
  return Math.floor(Date.now() / 86400000);
}

function read(): GoalData {
  if (cache) return cache;
  try {
    const raw = readScoped(STORE_NAME);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<GoalData>;
      cache = {
        goal: typeof parsed.goal === "number" && parsed.goal > 0 ? parsed.goal : 10,
        log: parsed.log && typeof parsed.log === "object" ? parsed.log : {},
        sessionLog: parsed.sessionLog && typeof parsed.sessionLog === "object" ? parsed.sessionLog : {},
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
    writeScoped(STORE_NAME, JSON.stringify(next));
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

/** Trim any log-shaped object to the newest LOG_KEEP days. */
function trimLog<T>(obj: Record<number, T>): Record<number, T> {
  const entries = Object.entries(obj);
  if (entries.length <= LOG_KEEP) return obj;
  entries.sort((a, b) => Number(b[0]) - Number(a[0]));
  return Object.fromEntries(entries.slice(0, LOG_KEEP));
}

/** Register a word as learned "today" for the daily-goal counter. */
export function recordWordLearned(word: string) {
  const day = epochDay();
  const cur = read();
  const today = cur.log[day] ?? [];
  if (today.includes(word)) return;
  const nextLog = trimLog({ ...cur.log, [day]: [...today, word] });
  const next: GoalData = { ...cur, log: nextLog };
  write(next);
  // reaching the daily goal keeps the streak alive too (fires once per day)
  if (next.log[day].length === next.goal) touchStreak();
}

/** Register a finished study session (quiz / match game) for today. */
export function recordStudySession() {
  const day = epochDay();
  const cur = read();
  const sessionLog = trimLog({ ...cur.sessionLog, [day]: (cur.sessionLog[day] ?? 0) + 1 });
  write({ ...cur, sessionLog });
}

/** Raw goal-data hook — consumed by the activity heatmap in stats view. */
export function useGoalData(): GoalData {
  return useSyncExternalStore(
    subscribe,
    () => read(),
    () => EMPTY,
  );
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
