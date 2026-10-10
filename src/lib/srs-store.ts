"use client";

import { useSyncExternalStore } from "react";
import { readScoped, writeScoped, registerScopedReset, getActiveBookSnapshot } from "./book-storage";
import {
  applyGrade,
  boxFromState,
  newState,
  sanitize,
  type SrsGrade,
  type SrsState,
  DAY_MS,
} from "./srs-engine";
import { notifySrsChanged, todayKey } from "./srs-sync";

/**
 * موتور SRS واژگان (فاز ۲ نقشه راه جامع) — SM-2 سه‌درجه‌ای روی هر کارت.
 *
 * هر واژه/فعل یک وضعیت کامل دارد (ease، فاصله، سررسید، فراموشی‌ها…)
 * علاوه بر فیلدهای قدیمی box/seen/wrong که برای سازگاری نگه داشته می‌شوند:
 *   - «بلد بودم»  → grade 2 (رشد نمایی فاصله)
 *   - «سخت»       → grade 1 (فاصله ×۱.۲)
 *   - «نمی‌دونم»   → grade 0 (بازآموزی ۱۰ دقیقه‌ای)
 * مهاجرت خودکار دادهٔ قدیمی (box 0..5) در اولین خواندن انجام می‌شود.
 * Persisted در localStorage scoped: visionone:book:<id>:srs
 * کلیدهای کارت: واژه = متن واژه · فعل = "v:<base>"
 */

export const SRS_MAX_BOX = 5;

const STORE_NAME = "srs";
const SETTINGS_NAME = "srs-settings";
const DAILY_NAME = "srs-daily";

/** وضعیت ذخیره‌شدهٔ یک کارت = حالت SM-2 + فیلدهای سازگاری قدیمی */
export interface SrsItem extends SrsState {
  /** جعبه نمایشی ۰..۵ (از فاصله مشتق می‌شود — سازگار با نوارهای رشد) */
  box: number;
  /** نام قدیمی reps */
  seen: number;
  /** نام قدیمی lapses */
  wrong: number;
}

type SrsData = Record<string, SrsItem>;

const EMPTY: SrsData = {};
let cache: SrsData | null = null;
const listeners = new Set<() => void>();
registerScopedReset(() => {
  cache = null;
});

/** فاصله‌های اولیه متناظر با جعبه‌های قدیمی (روز) — مهاجرت دادهٔ قبل از فاز ۲ */
const LEGACY_BOX_INTERVALS = [0, 1, 3, 7, 14, 30];

/** مهاجرت آیتم قدیمی {box,seen,wrong} به وضعیت کامل SM-2 */
function migrateItem(raw: Record<string, unknown>): SrsItem {
  const legacy = raw as { box?: number; seen?: number; wrong?: number };
  const box = Math.min(5, Math.max(0, Math.floor(Number(legacy.box ?? 0)) || 0));
  const seen = Math.max(0, Math.floor(Number(legacy.seen ?? 0)) || 0);
  const wrong = Math.max(0, Math.floor(Number(legacy.wrong ?? 0)) || 0);
  const interval = LEGACY_BOX_INTERVALS[box] ?? 0;
  const now = Date.now();
  const item = sanitize({
    ease: 2.5,
    interval,
    reps: seen,
    lapses: wrong,
    streak: box >= 2 ? box : 0,
    // کارت‌های قدیمی به‌جای سیل امروز، در آینده زمان‌بندی می‌شوند تا سیل مرور از هم نپاشد
    dueAt: now + interval * DAY_MS,
    lastGrade: null,
  })!;
  return finalizeItem(item);
}

/** افزودن فیلدهای سازگاری (box/seen/wrong) به وضعیت خالص */
function finalizeItem(state: SrsState): SrsItem {
  return {
    ...state,
    box: boxFromState(state),
    seen: state.reps,
    wrong: state.lapses,
  };
}

function read(): SrsData {
  if (cache) return cache;
  try {
    const raw = readScoped(STORE_NAME);
    if (!raw) {
      cache = {};
      return cache;
    }
    const parsed = JSON.parse(raw) as Record<string, Record<string, unknown>>;
    const out: SrsData = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (!value || typeof value !== "object") continue;
      // مهاجرت خودکار نسخهٔ قدیمی (بدون dueAt)
      out[key] = "dueAt" in value ? finalizeItem(sanitize(value as unknown as SrsState)!) : migrateItem(value);
    }
    cache = out;
  } catch {
    cache = {};
  }
  return cache;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = () => {
    cache = null; // نوشتهٔ بیرونی (همگام‌سازی/تب دیگر) → کَش نامعتبر
    cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function persist(next: SrsData) {
  cache = next;
  try {
    writeScoped(STORE_NAME, JSON.stringify(next));
  } catch {
    /* noop */
  }
  listeners.forEach((l) => l());
  // همگام‌سازی سروری (فاز ۲) — فقط برای کاربر وارد‌شده اثر دارد
  notifySrsChanged(getActiveBookSnapshot() ?? "vision-one");
}

/** ثبت پاسخ کارت با درجهٔ کامل SRS — نقطهٔ ورود اصلی فاز ۲ */
export function gradeSrs(key: string, grade: SrsGrade) {
  const data = read();
  const prev = data[key];
  const next = applyGrade(prev, grade);
  persist({
    ...data,
    [key]: finalizeItem(next),
  });
}

/**
 * بذر کارت از آزمون (فاز ۲ — یکپارچگی با آزمون‌ها):
 * پاسخ غلط در آزمون واژگان، واژه را به صف مرور برمی‌گرداند:
 *   کارت نو   → سررسید فردا (کارت در «مرور فردا» ظاهر می‌شود)
 *   کارت قدیم → بازآموزی ۱۰ دقیقه‌ای (grade 0)
 */
export function seedReviewFromQuiz(word: string) {
  const data = read();
  const prev = data[word];
  if (!prev || prev.reps === 0) {
    const fresh = newState(Date.now());
    fresh.reps = 1;
    fresh.dueAt = Date.now() + DAY_MS; // فردا
    persist({ ...data, [word]: finalizeItem(fresh) });
  } else {
    gradeSrs(word, 0);
  }
}

/** ثبت پاسخ قدیمی فلش‌کارت (سازگار با بازی تطبیق و نمای‌های موجود) */
export function recordSRS(word: string, known: boolean) {
  gradeSrs(word, known ? 2 : 0);
}

/** وزن انتخاب در دور تمرین — واژهٔ نو/ضعیف شانس بیشتر */
export function srsWeight(item: SrsItem | undefined): number {
  if (!item) return SRS_MAX_BOX + 1; // نو → بیشترین اولویت
  return SRS_MAX_BOX - item.box + 1;
}

export function useSRSData(): Record<string, SrsItem> {
  return useSyncExternalStore(
    subscribe,
    () => read(),
    () => EMPTY,
  );
}

// ─── تنظیمات مرور (سقف کارت نو روزانه) ───

export const NEW_LIMIT_OPTIONS = [5, 10, 15, 20, 30] as const;
export const DEFAULT_NEW_LIMIT = 15;

export function getDailyNewLimit(): number {
  try {
    const raw = readScoped(SETTINGS_NAME);
    if (raw) {
      const p = JSON.parse(raw) as { newLimit?: number };
      const n = Number(p.newLimit);
      if ((NEW_LIMIT_OPTIONS as readonly number[]).includes(n)) return n;
    }
  } catch {
    /* noop */
  }
  return DEFAULT_NEW_LIMIT;
}

export function setDailyNewLimit(limit: number) {
  if (!(NEW_LIMIT_OPTIONS as readonly number[]).includes(limit)) return;
  writeScoped(SETTINGS_NAME, JSON.stringify({ newLimit: limit }));
  // تنظیمات و شمارندهٔ روزانه از راه اسنپ‌شات کلی فاز ۱ (کلید visionone:*) همگام می‌شوند
}

// ─── شمارندهٔ روزانهٔ مرور ───

export interface SrsDaily {
  day: string;
  done: number;
  newDone: number;
}

export function getTodayReview(): SrsDaily {
  const today = todayKey();
  try {
    const raw = readScoped(DAILY_NAME);
    if (raw) {
      const p = JSON.parse(raw) as SrsDaily;
      if (p.day === today) {
        return { day: p.day, done: Number(p.done) || 0, newDone: Number(p.newDone) || 0 };
      }
    }
  } catch {
    /* noop */
  }
  return { day: today, done: 0, newDone: 0 };
}

export function bumpTodayReview(newCards: number) {
  const cur = getTodayReview();
  writeScoped(
    DAILY_NAME,
    JSON.stringify({ day: cur.day, done: cur.done + 1, newDone: cur.newDone + (newCards ? 1 : 0) }),
  );
}

// ─── خواندن وضعیت سایر کتاب‌ها (نشان قفسه) — بدون کَش، مستقیم از localStorage ───

export function getBookSrsCounts(bookId: string, now: number = Date.now()): { due: number; total: number } {
  try {
    const raw = localStorage.getItem(`visionone:book:${bookId}:srs`);
    if (!raw) return { due: 0, total: 0 };
    const parsed = JSON.parse(raw) as Record<string, Record<string, unknown>>;
    let due = 0;
    let total = 0;
    for (const value of Object.values(parsed)) {
      if (!value || typeof value !== "object") continue;
      const st = "dueAt" in value ? sanitize(value as unknown as SrsState) : undefined;
      if (!st) continue;
      total++;
      if (st.dueAt <= now && st.reps > 0) due++;
    }
    return { due, total };
  } catch {
    return { due: 0, total: 0 };
  }
}
