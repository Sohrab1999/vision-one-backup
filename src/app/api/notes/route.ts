import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * یادداشت شخصی روی واژه — فاز ۱۰ نقشه راه جامع.
 * GET    ?book=<bookId> → همهٔ یادداشت‌های آن جزوه (مرتب بر اساس updatedAt نزولی)
 * PUT    {book, word, note} → آپ‌سل با کلید یکتا (userId, book, word)
 * DELETE ?id=<id> → حذف فقط اگر مالِ همان کاربر باشد
 * سقف‌ها: word ۱..۴۰ نویسه · note ۱..۵۰۰ نویسه · book از فهرست شناخته‌شده
 */

const BOOKS = ["vision-one", "grade-7", "grade-8", "grade-9", "grade-11", "grade-12"] as const;
const WORD_MIN = 1;
const WORD_MAX = 40;
const NOTE_MIN = 1;
const NOTE_MAX = 500;

/** پاک‌سازی متن: رشتهٔ تریم‌شده در بازهٔ طولی یا null */
function cleanText(v: unknown, min: number, max: number): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  if (t.length < min || t.length > max) return null;
  return t;
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "ابتدا وارد شو" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const book = (searchParams.get("book") ?? "").trim();
  if (!(BOOKS as readonly string[]).includes(book)) {
    return NextResponse.json({ error: "شناسه جزوه نامعتبر است" }, { status: 400 });
  }

  const rows = await db.wordNote.findMany({
    where: { userId: session.user.id, book },
    orderBy: { updatedAt: "desc" },
    select: { id: true, book: true, word: true, note: true, updatedAt: true },
  });

  return NextResponse.json({
    ok: true,
    notes: rows.map((r) => ({ ...r, updatedAt: r.updatedAt.toISOString() })),
  });
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "ابتدا وارد شو" }, { status: 401 });
    }
    const userId = session.user.id;

    let body: { book?: unknown; word?: unknown; note?: unknown };
    try {
      body = (await req.json()) as { book?: unknown; word?: unknown; note?: unknown };
    } catch {
      return NextResponse.json({ error: "داده نامعتبر" }, { status: 400 });
    }

    // book باید یکی از جزوه‌های شناخته‌شده باشد
    if (typeof body.book !== "string" || !(BOOKS as readonly string[]).includes(body.book)) {
      return NextResponse.json({ error: "شناسه جزوه نامعتبر است" }, { status: 400 });
    }
    const book = body.book;

    // word تریم‌شدهٔ ۱..۴۰ نویسه
    const word = cleanText(body.word, WORD_MIN, WORD_MAX);
    if (!word) {
      return NextResponse.json({ error: "واژه نامعتبر است" }, { status: 400 });
    }

    // note تریم‌شدهٔ ۱..۵۰۰ نویسه — خالی مطلقاً پذیرفته نیست
    if (typeof body.note !== "string" || body.note.trim().length === 0) {
      return NextResponse.json({ error: "یادداشت خالی است" }, { status: 400 });
    }
    const note = cleanText(body.note, NOTE_MIN, NOTE_MAX);
    if (!note) {
      return NextResponse.json({ error: "یادداشت نامعتبر است (سقف ۵۰۰ نویسه)" }, { status: 400 });
    }

    const row = await db.wordNote.upsert({
      where: { userId_book_word: { userId, book, word } },
      update: { note },
      create: { userId, book, word, note },
    });

    return NextResponse.json({
      ok: true,
      note: { ...row, createdAt: row.createdAt.toISOString(), updatedAt: row.updatedAt.toISOString() },
    });
  } catch (e) {
    console.error("PUT /api/notes error:", e);
    return NextResponse.json({ error: "ذخیره یادداشت ممکن نشد" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "ابتدا وارد شو" }, { status: 401 });
    }
    const userId = session.user.id;

    const { searchParams } = new URL(req.url);
    const id = (searchParams.get("id") ?? "").trim();
    if (!id) {
      return NextResponse.json({ error: "شناسه یادداشت نامعتبر است" }, { status: 400 });
    }

    const existing = await db.wordNote.findUnique({ where: { id } });
    if (!existing || existing.userId !== userId) {
      return NextResponse.json({ error: "یادداشت پیدا نشد" }, { status: 404 });
    }

    await db.wordNote.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/notes error:", e);
    return NextResponse.json({ error: "حذف یادداشت ممکن نشد" }, { status: 500 });
  }
}
