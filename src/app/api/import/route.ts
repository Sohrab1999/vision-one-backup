import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { normalizeBookId } from "../_lib/book";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkRate, rateLimited } from "../_lib/rate-limit";
import { logEvent } from "../_lib/logger";

export const dynamic = "force-dynamic";

/**
 * ایمپورت سمت سرور — فاز ۱۰ نقشه راه جامع.
 * POST {server: {progress?, attempts?, reviewStates?, wordNotes?}}
 * فایل پشتیبانِ خروجی /api/export (version 2) را برمی‌گرداند روی حساب فعلی.
 * دادهٔ فایل همیشه برنده است (کاربر عمداً ایمپورت می‌کند) — همه‌چیز upsert.
 * سقف‌ها: progress ۲۰۰۰ · attempts ۵۰۰ (آخرِ فایل) · reviewStates ۳۰۰۰ · wordNotes ۵۰۰
 */

const BOOKS = ["vision-one", "grade-7", "grade-8", "grade-9", "grade-11", "grade-12"] as const;
const CATEGORIES = ["grammar", "vocabulary", "all"] as const;

const MAX_PROGRESS = 2000;
const MAX_ATTEMPTS = 500;
const MAX_STATES = 3000;
const MAX_NOTES = 500;

const KEY_MAX = 120;
const VALUE_MAX = 512 * 1024;
const WORD_MAX = 40;
const NOTE_MAX = 500;
const NAME_MAX = 40;
const DETAIL_MAX = 64 * 1024;
const CHUNK = 60;

type IncomingProgress = { key?: unknown; value?: unknown };
type IncomingState = {
  book?: unknown;
  cardKey?: unknown;
  cardType?: unknown;
  chapter?: unknown;
  ease?: unknown;
  interval?: unknown;
  reps?: unknown;
  lapses?: unknown;
  streak?: unknown;
  dueAt?: unknown;
  lastGrade?: unknown;
};
type IncomingNote = { book?: unknown; word?: unknown; note?: unknown };
type IncomingAttempt = {
  book?: unknown;
  category?: unknown;
  lesson?: unknown;
  total?: unknown;
  correct?: unknown;
  duration?: unknown;
  name?: unknown;
  detail?: unknown;
  createdAt?: unknown;
};

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

/** تبدیل به عدد صحیح؛ ورودی نامعتبر = مقدار پیش‌فرض */
function toInt(v: unknown, fallback: number) {
  const n = typeof v === "number" ? v : typeof v === "string" && v.trim() !== "" ? Number(v) : NaN;
  if (!Number.isFinite(n)) return fallback;
  return Math.trunc(n);
}

/** تبدیل به عدد اعشاری؛ ورودی نامعتبر = مقدار پیش‌فرض */
function toNum(v: unknown, fallback: number) {
  const n = typeof v === "number" ? v : typeof v === "string" && v.trim() !== "" ? Number(v) : NaN;
  return Number.isFinite(n) ? n : fallback;
}

/** رشتهٔ تریم‌شدهٔ ۱..max نویسه یا null */
function cleanText(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  if (t.length < 1 || t.length > max) return null;
  return t;
}

/** تاریخ معتبر یا اکنون */
function toDate(v: unknown): Date {
  if (typeof v === "string" || typeof v === "number") {
    const d = new Date(v);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return new Date();
}

export async function POST(req: NextRequest) {
  const rl = checkRate(req, "import:post", 30, 60_000);
  if (!rl.ok) { logEvent("import", "rate-limited"); return rateLimited(rl.retryAfter); }
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "ابتدا وارد شو" }, { status: 401 });
    }
    const userId = session.user.id;

    let body: { server?: unknown };
    try {
      body = (await req.json()) as { server?: unknown };
    } catch {
      return NextResponse.json({ error: "فایل پشتیبان معتبر نیست" }, { status: 400 });
    }
    const rawServer = body?.server;
    if (!rawServer || typeof rawServer !== "object" || Array.isArray(rawServer)) {
      return NextResponse.json({ error: "فایل پشتیبان معتبر نیست" }, { status: 400 });
    }
    const server = rawServer as {
      progress?: unknown;
      attempts?: unknown;
      reviewStates?: unknown;
      wordNotes?: unknown;
    };

    const imported = { progress: 0, attempts: 0, reviewStates: 0, wordNotes: 0 };

    // ── ۱) progress: کلید ≤۱۲۰ نویسه، مقدار ≤۵۱۲KB — آپ‌سل با unique(userId,key) ──
    if (Array.isArray(server.progress)) {
      const rows: { key: string; value: string }[] = [];
      for (const item of server.progress.slice(0, MAX_PROGRESS)) {
        if (!item || typeof item !== "object") continue;
        const p = item as IncomingProgress;
        const key = cleanText(p.key, KEY_MAX);
        if (!key || typeof p.value !== "string" || p.value.length > VALUE_MAX) continue;
        rows.push({ key, value: p.value });
      }
      if (rows.length) {
        await db.$transaction(
          async (tx) => {
            for (const row of rows) {
              await tx.progress.upsert({
                where: { userId_key: { userId, key: row.key } },
                update: { value: row.value },
                create: { userId, key: row.key, value: row.value },
              });
            }
          },
          { timeout: 60000, maxWait: 10000 },
        );
      }
      imported.progress = rows.length;
    }

    // ── ۲) reviewStates: همان اعتبارسنجی/clamp مسیر srs — فایل برنده است (آپ‌سل) ──
    if (Array.isArray(server.reviewStates)) {
      const rows: {
        book: string;
        cardKey: string;
        cardType: string;
        chapter: number;
        ease: number;
        interval: number;
        reps: number;
        lapses: number;
        streak: number;
        dueAt: Date;
        lastGrade: number | null;
      }[] = [];
      for (const item of server.reviewStates.slice(0, MAX_STATES)) {
        if (!item || typeof item !== "object") continue;
        const s = item as IncomingState;

        if (typeof s.book !== "string" || !(BOOKS as readonly string[]).includes(s.book)) continue;
        if (typeof s.cardKey !== "string") continue;
        const cardKey = s.cardKey.trim();
        if (cardKey.length < 1 || cardKey.length > 128) continue;

        const cardType = s.cardType === "verb" ? "verb" : "word";
        const chapter = clamp(toInt(s.chapter, 0), 0, 99);
        const ease = clamp(toNum(s.ease, 2.5), 1.3, 3.5);
        const interval = clamp(toNum(s.interval, 0), 0, 365);
        const reps = clamp(toInt(s.reps, 0), 0, 99999);
        const lapses = clamp(toInt(s.lapses, 0), 0, 99999);
        const streak = clamp(toInt(s.streak, 0), 0, 99999);
        const lastGrade =
          s.lastGrade === 0 || s.lastGrade === 1 || s.lastGrade === 2 ? s.lastGrade : null;
        const dueAt = toDate(s.dueAt);

        rows.push({
          book: s.book,
          cardKey,
          cardType,
          chapter,
          ease,
          interval,
          reps,
          lapses,
          streak,
          dueAt,
          lastGrade,
        });
      }
      if (rows.length) {
        await db.$transaction(
          async (tx) => {
            for (let i = 0; i < rows.length; i += CHUNK) {
              for (const st of rows.slice(i, i + CHUNK)) {
                await tx.reviewState.upsert({
                  where: {
                    userId_book_cardKey: { userId, book: st.book, cardKey: st.cardKey },
                  },
                  update: {
                    cardType: st.cardType,
                    chapter: st.chapter,
                    ease: st.ease,
                    interval: st.interval,
                    reps: st.reps,
                    lapses: st.lapses,
                    streak: st.streak,
                    dueAt: st.dueAt,
                    lastGrade: st.lastGrade,
                  },
                  create: {
                    userId,
                    book: st.book,
                    cardKey: st.cardKey,
                    cardType: st.cardType,
                    chapter: st.chapter,
                    ease: st.ease,
                    interval: st.interval,
                    reps: st.reps,
                    lapses: st.lapses,
                    streak: st.streak,
                    dueAt: st.dueAt,
                    lastGrade: st.lastGrade,
                  },
                });
              }
            }
          },
          { timeout: 60000, maxWait: 10000 },
        );
      }
      imported.reviewStates = rows.length;
    }

    // ── ۳) wordNotes: word ≤۴۰، note ≤۵۰۰، book معتبر — آپ‌سل ──
    if (Array.isArray(server.wordNotes)) {
      const rows: { book: string; word: string; note: string }[] = [];
      for (const item of server.wordNotes.slice(0, MAX_NOTES)) {
        if (!item || typeof item !== "object") continue;
        const n = item as IncomingNote;
        if (typeof n.book !== "string" || !(BOOKS as readonly string[]).includes(n.book)) continue;
        const word = cleanText(n.word, WORD_MAX);
        const note = cleanText(n.note, NOTE_MAX);
        if (!word || !note) continue;
        rows.push({ book: n.book, word, note });
      }
      if (rows.length) {
        await db.$transaction(
          async (tx) => {
            for (const row of rows) {
              await tx.wordNote.upsert({
                where: { userId_book_word: { userId, book: row.book, word: row.word } },
                update: { note: row.note },
                create: { userId, book: row.book, word: row.word, note: row.note },
              });
            }
          },
          { timeout: 60000, maxWait: 10000 },
        );
      }
      imported.wordNotes = rows.length;
    }

    // ── ۴) attempts: آخرین ۵۰۰ ردیف فایل — create ساده (id/userId فایل نادیده) ──
    if (Array.isArray(server.attempts)) {
      const rows: {
        book: string;
        category: string;
        lesson: number;
        total: number;
        correct: number;
        duration: number;
        name: string | null;
        detail: string | null;
        createdAt: Date;
      }[] = [];
      for (const item of server.attempts.slice(-MAX_ATTEMPTS)) {
        if (!item || typeof item !== "object") continue;
        const a = item as IncomingAttempt;

        // book نامعتبر → ویژن وان (رفتار قدیمی)
        const book = normalizeBookId(a.book);
        // category خارج فهرست → "all"
        const category =
          typeof a.category === "string" && (CATEGORIES as readonly string[]).includes(a.category)
            ? a.category
            : "all";
        const total = clamp(toInt(a.total, 0), 0, 200);
        const correct = clamp(toInt(a.correct, 0), 0, total);
        const name = typeof a.name === "string" && a.name.trim() !== "" ? a.name.trim().slice(0, NAME_MAX) : null;
        const detail = typeof a.detail === "string" ? a.detail.slice(0, DETAIL_MAX) : null;

        rows.push({
          book,
          category,
          lesson: clamp(toInt(a.lesson, 0), 0, 30),
          total,
          correct,
          duration: clamp(toInt(a.duration, 0), 0, 7200),
          name,
          detail,
          createdAt: toDate(a.createdAt),
        });
      }
      if (rows.length) {
        await db.$transaction(
          async (tx) => {
            for (let i = 0; i < rows.length; i += CHUNK) {
              await tx.attempt.createMany({
                data: rows.slice(i, i + CHUNK).map((row) => ({ ...row, userId })),
              });
            }
          },
          { timeout: 60000, maxWait: 10000 },
        );
      }
      imported.attempts = rows.length;
    }

    logEvent("import", "completed", {
      progress: imported.progress,
      attempts: imported.attempts,
      states: imported.reviewStates,
      notes: imported.wordNotes,
    });
    return NextResponse.json({ ok: true, imported });
  } catch (e) {
    console.error("POST /api/import error:", e);
    return NextResponse.json({ error: "ایمپورت داده ممکن نشد" }, { status: 500 });
  }
}
