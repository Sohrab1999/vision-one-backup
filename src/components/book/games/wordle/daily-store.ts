/**
 * وضعیت روزانه/زنجیرهٔ «وردل ویژن» در localStorage — تفکیک مکانیکی از wordle-game.tsx
 * (گام ۹ نقشهٔ docs/refactor-roadmap-2.md — پلی‌بوک games/fps/README.md)
 *
 * کلیدها: «visionone:wordle-daily:{bookId}» و «visionone:wordle-streak:{bookId}» —
 * هر نوشتن با notifyGameData به استور بیرونی (useSyncExternalStore در index) اعلان می‌دهد.
 * dailyKeyOf/streakKeyOf خصوصی می‌مانند.
 */

import { notifyGameData } from "../shared";
import { MAX_ROWS, WORD_RE } from "./constants";
import type { DailyState, DailyStreakState } from "./types";

// ─── localStorage روزانه ───

function dailyKeyOf(bookId: string): string {
  return `visionone:wordle-daily:${bookId}`;
}

function streakKeyOf(bookId: string): string {
  return `visionone:wordle-streak:${bookId}`;
}

export function loadDailyState(bookId: string): DailyState | null {
  try {
    const raw = localStorage.getItem(dailyKeyOf(bookId));
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<DailyState> | null;
    if (!p || typeof p.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(p.date)) return null;
    if (p.status !== "playing" && p.status !== "won" && p.status !== "lost") return null;
    if (!Array.isArray(p.guesses)) return null;
    const guesses = p.guesses
      .filter((g): g is string => typeof g === "string" && WORD_RE.test(g))
      .slice(0, MAX_ROWS);
    return { date: p.date, guesses, status: p.status };
  } catch {
    return null;
  }
}

export function writeDailyState(bookId: string, s: DailyState): void {
  try {
    localStorage.setItem(dailyKeyOf(bookId), JSON.stringify(s));
  } catch {
    /* noop */
  }
  notifyGameData();
}

export function loadDailyStreak(bookId: string): DailyStreakState | null {
  try {
    const raw = localStorage.getItem(streakKeyOf(bookId));
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<DailyStreakState> | null;
    if (!p || typeof p.date !== "string" || typeof p.streak !== "number") return null;
    return { date: p.date, streak: p.streak };
  } catch {
    return null;
  }
}

export function saveDailyStreak(bookId: string, s: DailyStreakState): void {
  try {
    localStorage.setItem(streakKeyOf(bookId), JSON.stringify(s));
  } catch {
    /* noop */
  }
  notifyGameData();
}
