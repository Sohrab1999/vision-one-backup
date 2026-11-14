"use client";

import { useSyncExternalStore } from "react";
import { readScoped, writeScoped, registerScopedReset } from "./book-storage";

/**
 * استور «پیشرفت درس‌محور» (گزینهٔ ① سند پیشنهاد آموزش مصوب مالک ۲۰۲۶-۱۱-۱۴ —
 * docs/decisions/viu-teaching-presentation-owner-proposal-2026-11-14.md §D-①).
 *
 * قرارداد قطعی (عین سند):
 *  - فقط localStorage scoped به کتاب فعال (الگوی SCOPED_STORE_NAMES) — صفر Prisma/db (پ۵: پیشنهاد سند).
 *  - کلید: visionone:book:<bookId>:lesson-progress — ساختار: { [درس]: { words, quizDone, correct, total, at } }
 *  - «words» = گام ۱ (معرفی واژه‌ها) انجام شد؛ «quizDone» = گام ۳ (تمرین همان درس) جمع‌بندی شد
 *    (برای درسِ بدون تمرین بانکی، پایان گام ۳ با total=0 ثبت می‌شود — وضعیت صادقانهٔ
 *    «بدون تمرین بانکی» در UI نمایش داده می‌شود، هرگز «دقت ۰٪» القا نمی‌شود).
 *  - تکمیل درس (گزینهٔ ⑤) = words && quizDone.
 *  - صفر تغییر دادهٔ متنی سه کتاب — فقط نوشتن پیشرفت یادگیری کاربر.
 *  - ری‌اکتیو با useSyncExternalStore — الگوی srs-store/learned-store؛ هیچ setState در effect.
 */

const STORE_NAME = "lesson-progress";

/** وضعیت پیشرفت یک درس */
export interface LessonProgressEntry {
  /** گام ۱ (معرفی واژه‌ها) کامل شده */
  words: boolean;
  /** گام ۳ (تمرین همان درس) جمع‌بندی شده — درس بی‌تمرین بانکی هم با total=0 بسته می‌شود */
  quizDone: boolean;
  /** پاسخ درست تمرین (وقتی تمرین بانکی وجود داشت) */
  correct: number;
  /** تعداد کل سؤال‌های تمرین (0 = بدون تمرین بانکی) */
  total: number;
  /** آخرین به‌روزرسانی (epoch ms) */
  at: number;
}

type LessonProgressData = Record<string, LessonProgressEntry>;

const EMPTY: LessonProgressData = {};
let cache: LessonProgressData | null = null;
const listeners = new Set<() => void>();
registerScopedReset(() => {
  cache = null;
});

function read(): LessonProgressData {
  if (cache) return cache;
  try {
    const raw = readScoped(STORE_NAME);
    if (!raw) {
      cache = {};
      return cache;
    }
    const parsed = JSON.parse(raw) as Record<string, Record<string, unknown>>;
    const out: LessonProgressData = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (!value || typeof value !== "object") continue;
      const words = value.words === true;
      const quizDone = value.quizDone === true;
      if (!words && !quizDone) continue; // رکورد بی‌معنا هرگز نگه داشته نمی‌شود
      out[key] = {
        words,
        quizDone,
        correct: Math.max(0, Math.floor(Number(value.correct ?? 0)) || 0),
        total: Math.max(0, Math.floor(Number(value.total ?? 0)) || 0),
        at: Math.max(0, Math.floor(Number(value.at ?? 0)) || 0),
      };
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
    cache = null; // نوشتهٔ بیرونی (تب دیگر) → کَش نامعتبر — الگوی srs-store
    cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function persist(next: LessonProgressData) {
  cache = next;
  try {
    writeScoped(STORE_NAME, JSON.stringify(next));
  } catch {
    /* noop */
  }
  listeners.forEach((l) => l());
}

/** ثبت اتمام گام ۱ (معرفی واژه‌ها) — idempotent */
export function markLessonWords(lesson: number) {
  const key = String(lesson);
  const data = read();
  const cur = data[key];
  if (cur?.words) return;
  persist({ ...data, [key]: { words: true, quizDone: cur?.quizDone ?? false, correct: cur?.correct ?? 0, total: cur?.total ?? 0, at: Date.now() } });
}

/** ثبت اتمام گام ۳ (تمرین همان درس) — total=0 یعنی «بدون تمرین بانکی» */
export function markLessonQuiz(lesson: number, correct: number, total: number) {
  const key = String(lesson);
  const data = read();
  const cur = data[key];
  persist({
    ...data,
    [key]: {
      words: cur?.words ?? false,
      quizDone: true,
      correct: Math.max(0, Math.floor(correct) || 0),
      total: Math.max(0, Math.floor(total) || 0),
      at: Date.now(),
    },
  });
}

/** وضعیت هر درس — قرارداد گزینهٔ ⑤: نه‌شروع / در جریان / تکمیل */
export type LessonStatus = "none" | "ongoing" | "done";

export function lessonStatusOf(entry: LessonProgressEntry | undefined): LessonStatus {
  if (!entry) return "none";
  if (entry.words && entry.quizDone) return "done";
  if (entry.words || entry.quizDone) return "ongoing";
  return "none";
}

export function useLessonProgress(): LessonProgressData {
  return useSyncExternalStore(
    subscribe,
    () => read(),
    () => EMPTY,
  );
}

/** خواندن همگام (برای محاسبات غیرهوکی) */
export function readLessonProgress(): LessonProgressData {
  return read();
}
