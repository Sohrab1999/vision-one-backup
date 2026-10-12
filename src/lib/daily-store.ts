"use client";

import { useSyncExternalStore } from "react";
import { readScoped, writeScoped, registerScopedReset } from "./book-storage";

/**
 * Daily Challenge store — بهترین نتیجهٔ هر روز را در localStorage نگه می‌دارد (scoped هر کتاب).
 * کلید: visionone:book:<id>:daily — ساختار: { [date]: { pct, total } }
 * plus یک شمارندهٔ کل چالش‌های کامل‌شده برای نشان «چالش‌باز».
 */

export interface DailyResult {
  pct: number;
  total: number;
}

interface DailyStore {
  map: Record<string, DailyResult>;
}

const STORE_NAME = "daily";
const KEEP_DAYS = 400;

const EMPTY: DailyStore = { map: {} };

let cache: DailyStore | null = null;
const listeners = new Set<() => void>();
registerScopedReset(() => {
  cache = null;
});

/** تاریخ امروز به وقت محلی کاربر به شکل YYYY-MM-DD (هماهنگ با seed سرور) */
export function todayKey(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function read(): DailyStore {
  if (cache) return cache;
  try {
    const raw = readScoped(STORE_NAME);
    const parsed = raw ? (JSON.parse(raw) as DailyStore) : EMPTY;
    cache = parsed && typeof parsed === "object" && parsed.map ? parsed : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function persist(next: DailyStore) {
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

/** ثبت نتیجهٔ چالش روزانه — بهترین درصد هر روز حفظ می‌شود؛ رکوردهای کهنه پاک می‌شوند */
export function recordDailyResult(date: string, pct: number, total: number) {
  const cur = read();
  const prev = cur.map[date];
  const best = prev ? { pct: Math.max(prev.pct, pct), total } : { pct, total };
  const entries = Object.entries({ ...cur.map, [date]: best })
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .slice(0, KEEP_DAYS);
  persist({ map: Object.fromEntries(entries) });
}

export interface DailyInfo {
  today: string;
  doneToday: boolean;
  bestToday: number | null;
  totalDone: number;
  bestEver: number;
}

export function useDailyInfo(): DailyInfo {
  const store = useSyncExternalStore(
    subscribe,
    () => read(),
    () => EMPTY,
  );
  const today = todayKey();
  const entry = store.map[today];
  const pcts = Object.values(store.map).map((r) => r.pct);
  return {
    today,
    doneToday: !!entry,
    bestToday: entry ? entry.pct : null,
    totalDone: Object.keys(store.map).length,
    bestEver: pcts.length ? Math.max(...pcts) : 0,
  };
}
