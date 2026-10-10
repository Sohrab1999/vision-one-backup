"use client";

import { useSyncExternalStore } from "react";
import { readScoped, writeScoped, registerScopedReset } from "./book-storage";

/**
 * Starred words store — واژه‌های نشان‌شدهٔ کاربر (ستاره‌دار) در localStorage.
 * کلید scoped هر کتاب: visionone:book:<id>:starred — مستقل از «یاد گرفتم» برای مرور هدفمند.
 */

const STORE_NAME = "starred";
const MAX_STARS = 600;
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

export function toggleStar(word: string) {
  const cur = read();
  const next = cur.includes(word) ? cur.filter((w) => w !== word) : [word, ...cur].slice(0, MAX_STARS);
  persist(next);
}

export function clearStars() {
  persist([]);
}

export function useStarredWords(): { starred: string[]; has: (w: string) => boolean; toggle: (w: string) => void; count: number; clear: () => void } {
  const starred = useSyncExternalStore(
    subscribe,
    () => read(),
    () => EMPTY,
  );
  const set = new Set(starred);
  return {
    starred,
    has: (w: string) => set.has(w),
    toggle: toggleStar,
    count: starred.length,
    clear: clearStars,
  };
}
