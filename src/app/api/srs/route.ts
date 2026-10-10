import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * همگام‌سازی وضعیت مرور فاصله‌دار (SRS) — فاز ۲ نقشه راه جامع.
 * GET: خواندن همهٔ ردیف‌های ReviewState کاربر · PUT: آپ‌سل دسته‌ای وضعیت کارت‌ها.
 * سقف: ۳۰۰۰ کارت در هر درخواست · اعتبارسنجی و clamp سخت سمت سرور.
 */

const BOOKS = ["vision-one", "grade-7", "grade-8", "grade-9", "grade-11", "grade-12"] as const;
const MAX_STATES = 3000;
const CHUNK = 60;

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

type SanitizedState = {
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

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "ابتدا وارد شو" }, { status: 401 });
  }
  const rows = await db.reviewState.findMany({
    where: { userId: session.user.id },
    select: {
      book: true,
      cardKey: true,
      cardType: true,
      chapter: true,
      ease: true,
      interval: true,
      reps: true,
      lapses: true,
      streak: true,
      dueAt: true,
      lastGrade: true,
    },
  });
  const states = rows.map((r) => ({ ...r, dueAt: r.dueAt.toISOString() }));
  return NextResponse.json({ ok: true, states, count: states.length });
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "ابتدا وارد شو" }, { status: 401 });
    }
    const userId = session.user.id;

    let body: { states?: unknown };
    try {
      body = (await req.json()) as { states?: unknown };
    } catch {
      return NextResponse.json({ error: "داده نامعتبر" }, { status: 400 });
    }
    const raw = body?.states;
    if (!Array.isArray(raw)) {
      return NextResponse.json({ error: "داده نامعتبر" }, { status: 400 });
    }
    if (raw.length > MAX_STATES) {
      return NextResponse.json({ error: "تعداد وضعیت‌ها بیش از حد مجاز (سقف ۳۰۰۰)" }, { status: 413 });
    }

    // اعتبارسنجی و clamp سخت هر عضو — عضو نامعتبر رد می‌شود
    const states: SanitizedState[] = [];
    for (const item of raw) {
      if (!item || typeof item !== "object") continue;
      const s = item as IncomingState;

      // book باید یکی از جزوه‌های شناخته‌شده باشد — نامعتبر = skip
      if (typeof s.book !== "string" || !(BOOKS as readonly string[]).includes(s.book)) continue;

      // cardKey: رشتهٔ ۱ تا ۱۲۸ نویسه (trim شده) — خالی/بلند = skip
      if (typeof s.cardKey !== "string") continue;
      const cardKey = s.cardKey.trim();
      if (cardKey.length < 1 || cardKey.length > 128) continue;

      // cardType ∈ {"word","verb"} وگرنه "word"
      const cardType = s.cardType === "verb" ? "verb" : "word";

      // chapter: عدد صحیح 0..99
      const chapter = clamp(toInt(s.chapter, 0), 0, 99);

      // ease: ضریب سهولت SM-2 در بازهٔ 1.3..3.5 (خارج = clamp)
      const ease = clamp(toNum(s.ease, 2.5), 1.3, 3.5);

      // interval: فاصلهٔ مرور 0..365 روز (clamp)
      const interval = clamp(toNum(s.interval, 0), 0, 365);

      // reps/lapses/streak: صحیح 0..99999 (clamp)
      const reps = clamp(toInt(s.reps, 0), 0, 99999);
      const lapses = clamp(toInt(s.lapses, 0), 0, 99999);
      const streak = clamp(toInt(s.streak, 0), 0, 99999);

      // lastGrade ∈ {0,1,2,null}
      const lastGrade =
        s.lastGrade === 0 || s.lastGrade === 1 || s.lastGrade === 2 ? s.lastGrade : null;

      // dueAt: تاریخ معتبر وگرنه اکنون
      let dueAt = new Date();
      if (typeof s.dueAt === "string" || typeof s.dueAt === "number") {
        const d = new Date(s.dueAt);
        if (!Number.isNaN(d.getTime())) dueAt = d;
      }

      states.push({
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

    await db.$transaction(async (tx) => {
      // آپ‌سل تکه‌تکه (۶۰تایی) برای جلوگیری از محدودیت پارامتر SQLite
      for (let i = 0; i < states.length; i += CHUNK) {
        for (const st of states.slice(i, i + CHUNK)) {
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
    });

    return NextResponse.json({ ok: true, count: states.length });
  } catch (e) {
    console.error("PUT /api/srs error:", e);
    return NextResponse.json({ error: "ذخیره وضعیت مرور ممکن نشد" }, { status: 500 });
  }
}
