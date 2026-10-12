"use client";

import { useSyncExternalStore } from "react";
import { readScoped, writeScoped, registerScopedReset } from "./book-storage";

/**
 * Weekly Challenge store — بهترین نتیجهٔ هر هفته را در localStorage نگه می‌دارد (scoped هر کتاب).
 * کلید: visionone:book:<id>:weekly — ساختار: { [weekKey]: { pct, total } }
 * هفتهٔ ایرانی: از شنبه شروع می‌شود؛ weekKey = تاریخِ شنبهٔ آغازین (YYYY-MM-DD)
 * — هماهنگ با weekStart/weekKeyOf در /api/questions (seed قطعی هفتگی).
 */

export interface WeeklyResult {
  pct: number;
  total: number;
}

interface WeeklyStore {
  map: Record<string, WeeklyResult>;
}

const STORE_NAME = "weekly";
const KEEP_WEEKS = 120;

const EMPTY: WeeklyStore = { map: {} };

let cache: WeeklyStore | null = null;
const listeners = new Set<() => void>();
registerScopedReset(() => {
  cache = null;
});

/** شنبهٔ آغازین هفتهٔ جاری (هفتهٔ ایرانی از شنبه) */
export function weekStartOf(now = new Date()): Date {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  d.setDate(d.getDate() - ((d.getDay() + 1) % 7));
  return d;
}

/** کلید هفته = تاریخ شنبهٔ آغازین به شکل YYYY-MM-DD */
export function weekKeyOf(now = new Date()): string {
  const s = weekStartOf(now);
  const mm = String(s.getMonth() + 1).padStart(2, "0");
  const dd = String(s.getDate()).padStart(2, "0");
  return `${s.getFullYear()}-${mm}-${dd}`;
}

/** شمارهٔ هفته برای نمایش (فاصله از اولین شنبهٔ سال) */
export function weekIndexOf(now = new Date()): number {
  const s = weekStartOf(now);
  const dayOfYear = Math.floor(
    (s.getTime() - new Date(s.getFullYear(), 0, 1).getTime()) / 86400000,
  );
  return Math.floor(dayOfYear / 7) + 1;
}

function read(): WeeklyStore {
  if (cache) return cache;
  try {
    const raw = readScoped(STORE_NAME);
    const parsed = raw ? (JSON.parse(raw) as WeeklyStore) : EMPTY;
    cache = parsed && typeof parsed === "object" && parsed.map ? parsed : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function persist(next: WeeklyStore) {
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

/** ثبت نتیجهٔ چالش هفتگی — بهترین درصد هر هفته حفظ می‌شود؛ هفته‌های کهنه پاک می‌شوند */
export function recordWeeklyResult(weekKey: string, pct: number, total: number) {
  const cur = read();
  const prev = cur.map[weekKey];
  const best = prev ? { pct: Math.max(prev.pct, pct), total } : { pct, total };
  const entries = Object.entries({ ...cur.map, [weekKey]: best })
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .slice(0, KEEP_WEEKS);
  persist({ map: Object.fromEntries(entries) });
}

export interface WeeklyInfo {
  weekKey: string;
  weekIndex: number;
  doneThisWeek: boolean;
  bestThisWeek: number | null;
  totalDone: number;
  bestEver: number;
}

export function useWeeklyInfo(): WeeklyInfo {
  const store = useSyncExternalStore(
    subscribe,
    () => read(),
    () => EMPTY,
  );
  const weekKey = weekKeyOf();
  const entry = store.map[weekKey];
  const pcts = Object.values(store.map).map((r) => r.pct);
  return {
    weekKey,
    weekIndex: weekIndexOf(),
    doneThisWeek: !!entry,
    bestThisWeek: entry ? entry.pct : null,
    totalDone: Object.keys(store.map).length,
    bestEver: pcts.length ? Math.max(...pcts) : 0,
  };
}
