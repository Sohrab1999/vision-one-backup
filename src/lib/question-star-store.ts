"use client";

import { useSyncExternalStore } from "react";

/**
 * Starred questions store — سؤال‌هایی که کاربر حین آزمون ستاره می‌زند
 * (نکته‌های سخت برای مرور هدفمند). Persisted in localStorage: visionone:qstars
 *
 * - toggleQuestionStar(id): ستاره/حذف ستاره
 * - useQuestionStars(): خواندن واکنشی با useSyncExternalStore
 */

const QSTAR_KEY = "visionone:qstars";
const MAX_QSTARS = 400;
const EMPTY: string[] = [];

let cache: string[] | null = null;
const listeners = new Set<() => void>();

function read(): string[] {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(QSTAR_KEY);
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
    localStorage.setItem(QSTAR_KEY, JSON.stringify(next));
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

export function toggleQuestionStar(id: string) {
  const cur = read();
  const next = cur.includes(id) ? cur.filter((x) => x !== id) : [id, ...cur].slice(0, MAX_QSTARS);
  persist(next);
}

export function clearQuestionStars() {
  persist([]);
}

export function useQuestionStars(): {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  count: number;
  clear: () => void;
} {
  const ids = useSyncExternalStore(
    subscribe,
    () => read(),
    () => EMPTY,
  );
  const set = new Set(ids);
  return {
    ids,
    has: (id: string) => set.has(id),
    toggle: toggleQuestionStar,
    count: ids.length,
    clear: clearQuestionStars,
  };
}
