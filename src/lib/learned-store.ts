"use client";

import { useSyncExternalStore } from "react";
import { recordWordLearned } from "./goal-store";
import { readScoped, writeScoped, registerScopedReset } from "./book-storage";

/**
 * External store for "learned words" persisted in localStorage (scoped per book).
 * React-idiomatic: consumed via useSyncExternalStore (no effect-setState).
 */

const STORE_NAME = "learned";
const EMPTY: Set<string> = new Set();

let cache: Set<string> | null = null;
const listeners = new Set<() => void>();
registerScopedReset(() => {
  cache = null;
});

function read(): Set<string> {
  if (cache) return cache;
  try {
    const raw = readScoped(STORE_NAME);
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
    writeScoped(STORE_NAME, JSON.stringify([...next]));
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
