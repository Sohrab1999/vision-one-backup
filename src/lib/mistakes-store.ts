"use client";

import { useSyncExternalStore } from "react";
import { readScoped, writeScoped, registerScopedReset } from "./book-storage";

/**
 * External store for the "mistake notebook" — v2 (dated entries).
 * Shape: Array<{ id: string; at: string }> — `at` is the ISO timestamp of the
 * mistake; legacy rows (plain string ids from v1) migrate to { id, at: "" }.
 * Persisted in localStorage scoped per book, consumed via useSyncExternalStore
 * (React-idiomatic, no effect-setState).
 *
 * - recordMistake(id): called when an answer is wrong (dedup, newest first, cap 300, stamps now)
 * - resolveMistake(id): called when the same question is answered correctly in review mode
 * - clearMistakes(): empty the notebook
 */

export interface MistakeEntry {
  /** question id */
  id: string;
  /** ISO timestamp of the mistake — "" for legacy (pre-v2) rows */
  at: string;
}

const STORE_NAME = "mistakes";
const MAX_MISTAKES = 300;
const EMPTY: MistakeEntry[] = [];

let cache: MistakeEntry[] | null = null;
const listeners = new Set<() => void>();
registerScopedReset(() => {
  cache = null;
});

/** Read + migrate: legacy string rows become { id, at: "" }. */
function read(): MistakeEntry[] {
  if (cache) return cache;
  try {
    const raw = readScoped(STORE_NAME);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    cache = Array.isArray(parsed)
      ? parsed
          .map((x): MistakeEntry | null => {
            if (typeof x === "string") return { id: x, at: "" };
            if (typeof x === "object" && x !== null && typeof (x as { id?: unknown }).id === "string") {
              const o = x as { id: string; at?: unknown };
              return { id: o.id, at: typeof o.at === "string" ? o.at : "" };
            }
            return null;
          })
          .filter((x): x is MistakeEntry => x !== null)
      : [];
  } catch {
    cache = [];
  }
  return cache;
}

function persist(next: MistakeEntry[]) {
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
  const rest = read().filter((x) => x.id !== id);
  const next: MistakeEntry[] = [{ id, at: new Date().toISOString() }, ...rest];
  persist(next.slice(0, MAX_MISTAKES));
}

export function resolveMistake(id: string) {
  if (!read().some((x) => x.id === id)) return;
  persist(read().filter((x) => x.id !== id));
}

export function clearMistakes() {
  persist([]);
}

export function useMistakes(): {
  entries: MistakeEntry[];
  count: number;
  clear: () => void;
} {
  const entries = useSyncExternalStore(
    subscribe,
    () => read(),
    () => EMPTY,
  );
  return { entries, count: entries.length, clear: clearMistakes };
}
