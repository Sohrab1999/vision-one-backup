import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * اکسپورت کامل دادهٔ کاربر لاگین‌شده — فاز ۱۰ نقشه راه جامع.
 * بدون پارامتر؛ خروجی همان چیزی است که مسیر ایمپورت می‌پذیرد (version: 2).
 * سقف‌ها: progress ۲۰۰۰ · attempts ۵۰۰ (آخر) · reviewStates ۳۰۰۰ · wordNotes ۵۰۰
 */

const MAX_PROGRESS = 2000;
const MAX_ATTEMPTS = 500;
const MAX_STATES = 3000;
const MAX_NOTES = 500;

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "برای دریافت خروجی کامل ابتدا وارد شو" },
        { status: 401 },
      );
    }
    const userId = session.user.id;

    const [user, progressRows, attemptRows, stateRows, noteRows] = await Promise.all([
      db.user.findUnique({
        where: { id: userId },
        select: { username: true, avatar: true, grade: true, createdAt: true },
      }),
      db.progress.findMany({
        where: { userId },
        select: { key: true, value: true },
        orderBy: { key: "asc" },
        take: MAX_PROGRESS,
      }),
      db.attempt.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: MAX_ATTEMPTS,
        select: {
          book: true,
          category: true,
          lesson: true,
          total: true,
          correct: true,
          duration: true,
          name: true,
          detail: true,
          createdAt: true,
        },
      }),
      db.reviewState.findMany({
        where: { userId },
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
          updatedAt: true,
        },
      }),
      db.wordNote.findMany({
        where: { userId },
        select: { book: true, word: true, note: true, createdAt: true, updatedAt: true },
      }),
    ]);

    return NextResponse.json({
      ok: true,
      exportedAt: new Date().toISOString(),
      version: 2,
      server: {
        profile: user
          ? { ...user, createdAt: user.createdAt.toISOString() }
          : null,
        progress: progressRows.map((r) => ({ key: r.key, value: r.value })).slice(0, MAX_PROGRESS),
        attempts: attemptRows
          .map((a) => ({ ...a, createdAt: a.createdAt.toISOString() }))
          .slice(0, MAX_ATTEMPTS),
        reviewStates: stateRows
          .map((s) => ({
            ...s,
            dueAt: s.dueAt.toISOString(),
            updatedAt: s.updatedAt.toISOString(),
          }))
          .slice(0, MAX_STATES),
        wordNotes: noteRows
          .map((n) => ({
            ...n,
            createdAt: n.createdAt.toISOString(),
            updatedAt: n.updatedAt.toISOString(),
          }))
          .slice(0, MAX_NOTES),
      },
    });
  } catch (e) {
    console.error("GET /api/export error:", e);
    return NextResponse.json({ error: "ساخت خروجی ممکن نشد" }, { status: 500 });
  }
}
