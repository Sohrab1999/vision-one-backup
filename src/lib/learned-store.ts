"use client";

import { useSyncExternalStore } from "react";
import { recordWordLearned } from "./goal-store";

/**
 * External store for "learned words" persisted in localStorage.
 * React-idiomatic: consumed via useSyncExternalStore (no effect-setState).
 */

const LEARNED_KEY = "visionone:learned";
const EMPTY: Set<string> = new Set();

let cache: Set<string> | null = null;
const listeners = new Set<() => void>();

function read(): Set<string> {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(LEARNED_KEY);
    cache = new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    cache = new Set();
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

export function toggleLearned(word: string) {
  const next = new Set(read());
  const wasNew = !next.has(word);
  if (next.has(word)) next.delete(word);
  else next.add(word);
  cache = next;
  try {
    localStorage.setItem(LEARNED_KEY, JSON.stringify([...next]));
  } catch {
    /* noop */
  }
  if (wasNew) recordWordLearned(word); // feed the daily-goal counter
  listeners.forEach((l) => l());
}

export function useLearnedWords(): { learned: Set<string>; toggle: (w: string) => void; count: number } {
  const learned = useSyncExternalStore(
    subscribe,
    () => read(),
    () => EMPTY,
  );
  return { learned, toggle: toggleLearned, count: learned.size };
}
