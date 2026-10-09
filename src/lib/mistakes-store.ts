"use client";

import { useSyncExternalStore } from "react";
import { readScoped, writeScoped, registerScopedReset } from "./book-storage";

/**
 * External store for the "mistake notebook" — IDs of quiz questions
 * the user answered wrong. Persisted in localStorage scoped per book,
 * consumed via useSyncExternalStore (React-idiomatic, no effect-setState).
 *
 * - recordMistake(id): called when an answer is wrong (dedup, newest first, cap 300)
 * - resolveMistake(id): called when the same question is answered correctly in review mode
 * - clearMistakes(): empty the notebook
 */

const STORE_NAME = "mistakes";
const MAX_MISTAKES = 300;
const EMPTY: string[] = [];

let cache: string[] | null = null;
const listeners = new Set<() => void>();
registerScopedReset(() => {
  cache = null;
});

function read(): string[] {
  if (cache) return cache;
  try {
    const raw = readScoped(STORE_NAME);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    cache = Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    cache = [];
  }
  return cache;
}

function persist(next: string[]) {
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

export function recordMistake(id: string) {
  const next = read().filter((x) => x !== id);
  next.unshift(id);
  persist(next.slice(0, MAX_MISTAKES));
}

export function resolveMistake(id: string) {
  if (!read().includes(id)) return;
  persist(read().filter((x) => x !== id));
}

export function clearMistakes() {
  persist([]);
}

export function useMistakes(): { mistakes: string[]; count: number; clear: () => void } {
  const mistakes = useSyncExternalStore(
    subscribe,
    () => read(),
    () => EMPTY,
  );
  return { mistakes, count: mistakes.length, clear: clearMistakes };
}
