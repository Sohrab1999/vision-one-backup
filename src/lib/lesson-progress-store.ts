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

/**
 * شناسهٔ مراحل الگوی آموزشی مشترک (مأموریت مالک VIU-LEARNING-EXPERIENCE-UPGRADE-01 —
 * ساختار ۶-مرحله‌ای Discover/Learn/Context/Practice/Use/Review) — افزودنی صرف؛
 * قرارداد قدیمی (words/quizDone) بایت‌به‌بیت پابرجا می‌ماند و سازگاری عقب حفظ می‌شود.
 */
export const LESSON_STAGES = ["discover", "learn", "context", "practice", "use", "review"] as const;
export type LessonStageId = (typeof LESSON_STAGES)[number];

const MAX_WORD_LIST = 120;

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
  /** [افزودنی v2] زمان تکمیل هر مرحله (epoch ms) — کلیدها فقط از LESSON_STAGES */
  stages?: Partial<Record<LessonStageId, number>>;
  /** [افزودنی v2] واژه‌های دیده‌شده در مرحلهٔ یادگیری (مشاهده) */
  seen?: string[];
  /** [افزودنی v2] واژه‌های با پاسخ درست در تمرین */
  correctWords?: string[];
  /** [افزودنی v2] واژه‌های به‌کار‌رفته در ساخت جمله (مرحلهٔ کاربرد) */
  usedWords?: string[];
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
      // فیلدهای افزودنی v2 — هرگز رکورد دارای v2 را دور نمی‌ریزیم
      const stagesRaw = (value.stages ?? null) as Record<string, unknown> | null;
      const stages = sanitizeStages(stagesRaw);
      const seen = sanitizeWordList(value.seen);
      const correctWords = sanitizeWordList(value.correctWords);
      const usedWords = sanitizeWordList(value.usedWords);
      if (!words && !quizDone && !stages && !seen && !correctWords && !usedWords) continue; // رکورد بی‌معنا هرگز نگه داشته نمی‌شود
      out[key] = {
        words,
        quizDone,
        correct: Math.max(0, Math.floor(Number(value.correct ?? 0)) || 0),
        total: Math.max(0, Math.floor(Number(value.total ?? 0)) || 0),
        at: Math.max(0, Math.floor(Number(value.at ?? 0)) || 0),
        ...(stages ? { stages } : {}),
        ...(seen ? { seen } : {}),
        ...(correctWords ? { correctWords } : {}),
        ...(usedWords ? { usedWords } : {}),
      };
    }
    cache = out;
  } catch {
    cache = {};
  }
  return cache;
}

function sanitizeStages(raw: Record<string, unknown> | null): Partial<Record<LessonStageId, number>> | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const out: Partial<Record<LessonStageId, number>> = {};
  let any = false;
  for (const stage of LESSON_STAGES) {
    const v = raw[stage];
    if (typeof v === "number" && Number.isFinite(v) && v > 0) {
      out[stage] = Math.floor(v);
      any = true;
    }
  }
  return any ? out : undefined;
}

function sanitizeWordList(raw: unknown): string[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const out: string[] = [];
  const seen = new Set<string>();
  for (const item of raw) {
    if (typeof item !== "string") continue;
    const t = item.trim();
    if (!t || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
    if (out.length >= MAX_WORD_LIST) break;
  }
  return out.length > 0 ? out : undefined;
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

/** ثبت اتمام گام ۱ (معرفی واژه‌ها) — idempotent — فیلدهای v2 حفظ می‌شوند */
export function markLessonWords(lesson: number) {
  const key = String(lesson);
  const data = read();
  const cur = data[key];
  if (cur?.words) return;
  persist({
    ...data,
    [key]: {
      words: true,
      quizDone: cur?.quizDone ?? false,
      correct: cur?.correct ?? 0,
      total: cur?.total ?? 0,
      at: Date.now(),
      ...(cur?.stages ? { stages: cur.stages } : {}),
      ...(cur?.seen ? { seen: cur.seen } : {}),
      ...(cur?.correctWords ? { correctWords: cur.correctWords } : {}),
      ...(cur?.usedWords ? { usedWords: cur.usedWords } : {}),
    },
  });
}

/** ثبت اتمام گام تمرین — total=0 یعنی «بدون تمرین» — فیلدهای v2 حفظ می‌شوند */
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
      ...(cur?.stages ? { stages: cur.stages } : {}),
      ...(cur?.seen ? { seen: cur.seen } : {}),
      ...(cur?.correctWords ? { correctWords: cur.correctWords } : {}),
      ...(cur?.usedWords ? { usedWords: cur.usedWords } : {}),
    },
  });
}

/** [v2] ثبت تکمیل یک مرحله از الگوی مشترک — idempotent */
export function markLessonStage(lesson: number, stage: LessonStageId) {
  const key = String(lesson);
  const data = read();
  const cur = data[key];
  if (cur?.stages?.[stage]) return;
  persist({
    ...data,
    [key]: {
      words: cur?.words ?? false,
      quizDone: cur?.quizDone ?? false,
      correct: cur?.correct ?? 0,
      total: cur?.total ?? 0,
      at: Date.now(),
      stages: { ...(cur?.stages ?? {}), [stage]: Date.now() },
      ...(cur?.seen ? { seen: cur.seen } : {}),
      ...(cur?.correctWords ? { correctWords: cur.correctWords } : {}),
      ...(cur?.usedWords ? { usedWords: cur.usedWords } : {}),
    },
  });
}

/** [v2] ثبت وضعیت واژه‌های درس (مشاهده/پاسخ‌درست/به‌کار‌رفته) — ادغام یکتا با سقف */
export function recordLessonWordStates(
  lesson: number,
  patch: { seen?: string[]; correct?: string[]; used?: string[] },
) {
  const key = String(lesson);
  const data = read();
  const cur = data[key];
  const merge = (base: string[] | undefined, add: string[] | undefined) => {
    if (!add || add.length === 0) return base;
    const set = new Set(base ?? []);
    for (const w of add) {
      const t = w.trim();
      if (t) set.add(t);
    }
    return [...set].slice(0, MAX_WORD_LIST);
  };
  const seen = merge(cur?.seen, patch.seen);
  const correctWords = merge(cur?.correctWords, patch.correct);
  const usedWords = merge(cur?.usedWords, patch.used);
  if (seen === cur?.seen && correctWords === cur?.correctWords && usedWords === cur?.usedWords) return;
  persist({
    ...data,
    [key]: {
      words: cur?.words ?? false,
      quizDone: cur?.quizDone ?? false,
      correct: cur?.correct ?? 0,
      total: cur?.total ?? 0,
      at: Date.now(),
      ...(cur?.stages ? { stages: cur.stages } : {}),
      ...(seen ? { seen } : {}),
      ...(correctWords ? { correctWords } : {}),
      ...(usedWords ? { usedWords } : {}),
    },
  });
}

/** وضعیت هر درس — قرارداد گزینهٔ ⑤: نه‌شروع / در جریان / تکمیل (سازگار با عقب) */
export type LessonStatus = "none" | "ongoing" | "done";

export function lessonStatusOf(entry: LessonProgressEntry | undefined): LessonStatus {
  if (!entry) return "none";
  if (entry.words && entry.quizDone) return "done";
  if (entry.words || entry.quizDone) return "ongoing";
  return "none";
}

/**
 * [v2] تکمیل صادقانهٔ درس با توجه به محتوای واقعی آن — مأموریت مالک: «نباید وضعیت
 * درس‌های فاقد محتوای آموزشی را به‌اشتباه Completed نشان بدهی».
 *  - درس با واژه (مسیر عادی): words && quizDone — قرارداد قدیمی بایت‌به‌بیت.
 *  - درس بی‌واژه اما دارای متن/تمرین (مثل درس ۲۰ viu-elem): quizDone + انجام واقعی
 *    بافت و تمرین — هرگز صرفِ کلیک، درس بی‌محتوا را «تکمیل» نمی‌کند.
 */
export function lessonCompletionOf(
  entry: LessonProgressEntry | undefined,
  content: { hasVocab: boolean },
): LessonStatus {
  if (!entry) return "none";
  if (content.hasVocab) return lessonStatusOf(entry);
  const contextDone = Boolean(entry.stages?.context);
  const practiceDone = Boolean(entry.stages?.practice);
  if (entry.quizDone && contextDone && practiceDone) return "done";
  if (entry.quizDone || contextDone || practiceDone) return "ongoing";
  return "none";
}

/** [v2] شمار مراحل تکمیل‌شده (برای نوار پیشرفت مرحله‌ای نقشهٔ کتاب) */
export function completedStageCount(entry: LessonProgressEntry | undefined): number {
  if (!entry?.stages) return 0;
  let n = 0;
  for (const stage of LESSON_STAGES) {
    if (entry.stages[stage]) n++;
  }
  return n;
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
