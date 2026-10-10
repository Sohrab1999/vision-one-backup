"use client";

/**
 * همگام‌سازی سروری وضعیت SRS (فاز ۲ نقشه راه جامع) — لایهٔ ساختاریافتهٔ ReviewState.
 *
 * - کاربر مهمان: همه‌چیز محلی می‌ماند — هیچ درخواستی زده نمی‌شود (صفر رگرسیون).
 * - کاربر وارد‌شده:
 *     ۱) هنگام ورود: captureSrsLocal() «قبل از» ادغام کلیِ فاز ۱ صدا زده می‌شود تا
 *        نسخهٔ محلیِ کارت‌ها حفظ شود (ادغام کلی، شیءها را با سرور جایگزین می‌کند)؛
 *        سپس srsPullMergePush() ادغام در سطح هر کارت انجام می‌دهد
 *        (برنده: reps بیشتر → فاصلهٔ بزرگ‌تر → سررسید جدیدتر) و نتیجه به سرور برمی‌گردد.
 *     ۲) در طول استفاده: هر نوشتنِ srs از srs-store اطلاع داده می‌شود و با debounce
 *        به PUT /api/srs می‌رود (فقط کتاب‌های تغییریافته).
 */

import { BOOKS } from "@/data/books/registry";
import type { BookId } from "@/data/books/types";
import { mergeStates, sanitize, type SrsGrade, type SrsState } from "./srs-engine";
import { enqueueOffline } from "./offline-queue";

const PUSH_DEBOUNCE_MS = 2500;
const MAX_CARDS_PER_BOOK = 4000;

export function todayKey(now: number = Date.now()): string {
  const d = new Date(now);
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

// ─── وضعیت ماژول ───

let authed = false;
/** اسنپ‌شات محلی هر ۶ کتاب در لحظهٔ ورود — برای ادغام در سطح کارت */
let captured: Map<string, Record<string, SrsState>> | null = null;
let dirty = new Set<string>();
let pushTimer: ReturnType<typeof setTimeout> | null = null;

function srsKeyOf(bookId: string): string {
  return `visionone:book:${bookId}:srs`;
}

function readBookSrs(bookId: string): Record<string, SrsState> {
  try {
    const raw = localStorage.getItem(srsKeyOf(bookId));
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, Record<string, unknown>>;
    const out: Record<string, SrsState> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (!value || typeof value !== "object") continue;
      const st = sanitize(value as unknown as SrsState);
      if (st) out[key] = st;
    }
    return out;
  } catch {
    return {};
  }
}

function writeBookSrs(bookId: string, data: Record<string, SrsState>) {
  try {
    localStorage.setItem(srsKeyOf(bookId), JSON.stringify(data));
  } catch {
    /* noop */
  }
}

/** شکل یک ردیف سروری (هماهنگ با /api/srs) */
interface SrsRow {
  book: string;
  cardKey: string;
  cardType: "word" | "verb";
  chapter: number;
  ease: number;
  interval: number;
  reps: number;
  lapses: number;
  streak: number;
  dueAt: string; // ISO
  lastGrade: SrsGrade | null;
}

const BOOK_IDS: string[] = BOOKS.map((b) => b.id as string);

function rowToState(row: SrsRow): SrsState | undefined {
  const dueAt = Date.parse(row.dueAt);
  return sanitize({
    ease: row.ease,
    interval: row.interval,
    reps: row.reps,
    lapses: row.lapses,
    streak: row.streak,
    dueAt: Number.isFinite(dueAt) ? dueAt : Date.now(),
    lastGrade: row.lastGrade ?? null,
  });
}

function stateToRow(bookId: string, cardKey: string, st: SrsState): SrsRow {
  return {
    book: bookId,
    cardKey,
    cardType: cardKey.startsWith("v:") ? "verb" : "word",
    chapter: 0,
    ease: st.ease,
    interval: st.interval,
    reps: st.reps,
    lapses: st.lapses,
    streak: st.streak,
    dueAt: new Date(st.dueAt).toISOString(),
    lastGrade: st.lastGrade ?? null,
  };
}

// ─── ورود: ضبط → ادغام → پس‌دادن ───

/** قبل از pullMergePush (فاز ۱) صدا زده شود تا نسخهٔ محلی کارت‌ها از دست نرود */
export function captureSrsLocal(): void {
  captured = new Map();
  for (const id of BOOK_IDS) {
    captured.set(id, readBookSrs(id));
  }
}

/** ادغام ساختاریافتهٔ سرور (ReviewState) با محلی — تعداد کارت‌های تغییریافته */
export async function srsPullMergePush(): Promise<number> {
  if (!authed) return 0;
  let changed = 0;
  try {
    const res = await fetch("/api/srs", { cache: "no-store" });
    if (!res.ok) return 0;
    const json = (await res.json()) as { states?: SrsRow[] };
    const rows = json.states ?? [];

    // ردیف‌های سرور به تفکیک کتاب
    const serverByBook = new Map<string, Record<string, SrsState>>();
    for (const row of rows) {
      if (!BOOK_IDS.includes(row.book) || !row.cardKey) continue;
      const st = rowToState(row);
      if (!st) continue;
      const bucket = serverByBook.get(row.book) ?? {};
      bucket[row.cardKey] = st;
      serverByBook.set(row.book, bucket);
    }

    const mergedAll = new Map<string, Record<string, SrsState>>();
    for (const bookId of BOOK_IDS) {
      const current = readBookSrs(bookId); // بعد از ادغام کلی فاز ۱ = اسنپ‌شات سرور قدیمی
      const before = captured?.get(bookId) ?? {}; // نسخهٔ محلی قبل از ورود
      const server = serverByBook.get(bookId) ?? {};
      const keys = new Set([...Object.keys(current), ...Object.keys(before), ...Object.keys(server)]);
      const merged: Record<string, SrsState> = { ...current };
      for (const key of keys) {
        const winner = mergeStates(mergeStates(before[key], current[key]), server[key]);
        if (!winner) continue;
        if (JSON.stringify(winner) !== JSON.stringify(current[key])) {
          merged[key] = winner;
          changed++;
        }
      }
      mergedAll.set(bookId, merged);
    }

    if (changed > 0) {
      for (const [bookId, data] of mergedAll) writeBookSrs(bookId, data);
      try {
        window.dispatchEvent(new Event("storage")); // تازگی استورهای scoped
      } catch {
        /* noop */
      }
    }

    // پس‌دادن وضعیت نهایی به سرور (ادغام = اجتماع دوطرفه)
    await pushAllBooks(mergedAll.size ? mergedAll : undefined);
  } catch {
    /* خطای شبکه: محلی می‌مانیم */
  } finally {
    captured = null; // ادغام ورود یک‌بارمصرف است
  }
  return changed;
}

// ─── Push ───

async function pushStates(rows: SrsRow[]): Promise<boolean> {
  const payload = { states: rows };
  try {
    const res = await fetch("/api/srs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.status === 401) {
      authed = false; // سشن منقضی — بی‌صدا به حالت محلی برگرد
      return false;
    }
    return res.ok;
  } catch {
    // فقط خطای شبکه (نه 4xx) → در صف آفلاین می‌ماند تا با برگشت اینترنت ارسال شود
    enqueueOffline({ url: "/api/srs", method: "PUT", body: payload });
    return false;
  }
}

async function pushAllBooks(only?: Map<string, Record<string, SrsState>>): Promise<boolean> {
  if (!authed) return false;
  let ok = true;
  for (const bookId of BOOK_IDS) {
    const data = only?.get(bookId) ?? readBookSrs(bookId);
    const keys = Object.keys(data);
    if (!keys.length) continue;
    const rows = keys.slice(0, MAX_CARDS_PER_BOOK).map((k) => stateToRow(bookId, k, data[k]));
    const done = await pushStates(rows);
    if (!done) ok = false;
  }
  return ok;
}

function schedulePush() {
  if (pushTimer) return;
  pushTimer = setTimeout(async () => {
    pushTimer = null;
    if (!authed || dirty.size === 0) return;
    const books = [...dirty];
    dirty = new Set();
    for (const bookId of books) {
      const data = readBookSrs(bookId);
      const keys = Object.keys(data);
      if (!keys.length) continue;
      const rows = keys.slice(0, MAX_CARDS_PER_BOOK).map((k) => stateToRow(bookId, k, data[k]));
      await pushStates(rows);
    }
  }, PUSH_DEBOUNCE_MS);
}

/** اطلاع از نوشتن جدید در srs کتاب فعال — از srs-store صدا زده می‌شود */
export function notifySrsChanged(bookId: BookId | string): void {
  if (!authed) return;
  dirty.add(String(bookId));
  schedulePush();
}

/** تغییر وضعیت ورود — از account-provider صدا زده می‌شود */
export function setSrsAuthed(value: boolean): void {
  authed = value;
  if (!value) {
    dirty = new Set();
    captured = null;
    if (pushTimer) {
      clearTimeout(pushTimer);
      pushTimer = null;
    }
  }
}

export function isSrsAuthed(): boolean {
  return authed;
}
