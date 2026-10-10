"use client";

import { useSyncExternalStore } from "react";
import { readScoped, writeScoped, registerScopedReset } from "./book-storage";

/**
 * شمارندهٔ دورهای کامل‌شدهٔ ویژه — فعلاً فقط «مرور ترکیبی» برای نشان «مرورگر».
 * کلید scoped هر کتاب: visionone:book:<id>:rounds — ساختار: { combined: number }
 */

interface RoundStore {
  combined: number;
}

const STORE_NAME = "rounds";

const EMPTY: RoundStore = { combined: 0 };

let cache: RoundStore | null = null;
const listeners = new Set<() => void>();
registerScopedReset(() => {
  cache = null;
});

function read(): RoundStore {
  if (cache) return cache;
  try {
    const raw = readScoped(STORE_NAME);
    const parsed = raw ? (JSON.parse(raw) as RoundStore) : EMPTY;
    cache = parsed && typeof parsed === "object" && typeof parsed.combined === "number" ? parsed : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function persist(next: RoundStore) {
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

/** ثبت یک دور کامل‌شدهٔ مرور ترکیبی */
export function recordCombinedRound() {
  persist({ ...read(), combined: read().combined + 1 });
}

export function useCombinedRounds(): number {
  const store = useSyncExternalStore(
    subscribe,
    () => read(),
    () => EMPTY,
  );
  return store.combined;
}
