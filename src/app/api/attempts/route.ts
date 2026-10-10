import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { normalizeBookId } from "../_lib/book";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      book?: string;
      category?: string;
      lesson?: number;
      total?: number;
      correct?: number;
      duration?: number;
      name?: string;
      detail?: unknown;
    };

    // ── شناسه کتاب از body: نامعتبر/خالی → ویژن وان (رفتار قدیمی) ──
    const book = normalizeBookId(body.book);

    const total = Number(body.total ?? 0);
    const correct = Number(body.correct ?? 0);
    if (!total || total <= 0) {
      return NextResponse.json({ error: "داده نامعتبر" }, { status: 400 });
    }

    // ── فاز ۱: آزمون کاربر وارد‌شده به حسابش گره می‌خورد (مهمان = null) ──
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ?? null;

    const attempt = await db.attempt.create({
      data: {
        book,
        category: body.category ?? "all",
        lesson: Number(body.lesson ?? 0),
        total,
        correct,
        duration: Number(body.duration ?? 0),
        name: body.name ? String(body.name).slice(0, 40) : null,
        detail: body.detail ? JSON.stringify(body.detail) : null,
        userId,
      },
    });

    return NextResponse.json({ ok: true, id: attempt.id });
  } catch (e) {
    console.error("POST /api/attempts error:", e);
    return NextResponse.json({ error: "خطا در ذخیره نتیجه" }, { status: 500 });
  }
}

interface LeaderRow {
  name: string;
  quizzes: number;
  answered: number;
  accuracy: number;
  best: number;
  lastPlayed: string;
}

export async function GET(req: NextRequest) {
  try {
    // ── فیلتر کتاب: همهٔ آمار/لیدربورد/نبض‌ها per-book است — نامعتبر/خالی → ویژن وان ──
    const { searchParams } = new URL(req.url);
    const book = normalizeBookId(searchParams.get("book"));

    // ── نبض چالش روزانه: آزمون‌های dailyِ امروز (مقایسهٔ اجتماعی) ──
    // ── نبض چالش هفتگی: آزمون‌های weekly از شنبهٔ آغازین هفته (هفتهٔ ایرانی از شنبه) ──
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 1) % 7));

    const [recent, agg, last60, chart, detailRows, dailyToday, weeklyThisWeek] = await Promise.all([
      db.attempt.findMany({ where: { book }, orderBy: { createdAt: "desc" }, take: 8 }),
      db.attempt.aggregate({
        where: { book },
        _count: { _all: true },
        _sum: { total: true, correct: true },
      }),
      db.attempt.findMany({ where: { book }, orderBy: { createdAt: "desc" }, take: 60 }),
      db.attempt.findMany({
        where: { book },
        orderBy: { createdAt: "desc" },
        take: 20,
        select: { id: true, correct: true, total: true, category: true, createdAt: true },
      }),
      db.attempt.findMany({
        where: { book },
        orderBy: { createdAt: "desc" },
        take: 150,
        select: { id: true, detail: true, createdAt: true },
      }),
      db.attempt.findMany({
        where: { book, category: "daily", createdAt: { gte: startOfToday } },
        select: { correct: true, total: true },
        orderBy: { createdAt: "desc" },
        take: 300,
      }),
      db.attempt.findMany({
        where: { book, category: "weekly", createdAt: { gte: weekStart } },
        select: { correct: true, total: true },
        orderBy: { createdAt: "desc" },
        take: 300,
      }),
    ]);

    const sumTotal = agg._sum.total ?? 0;
    const sumCorrect = agg._sum.correct ?? 0;

    const bestPercent = last60.reduce((max, a) => {
      const p = a.total > 0 ? (a.correct / a.total) * 100 : 0;
      return Math.max(max, p);
    }, 0);

    // ── لیدربورد محلی: گروه‌بندی بر اساس نام دانش‌آموز (per-book) ──
    const namedRows = await db.attempt.findMany({
      where: { book, name: { not: null } },
      orderBy: { createdAt: "desc" },
      take: 500,
      select: { name: true, total: true, correct: true, createdAt: true },
    });
    const groups = new Map<string, { quizzes: number; answered: number; correct: number; best: number; last: Date }>();
    for (const row of namedRows) {
      const key = (row.name ?? "").trim();
      if (!key) continue;
      const g = groups.get(key) ?? { quizzes: 0, answered: 0, correct: 0, best: 0, last: row.createdAt };
      g.quizzes += 1;
      g.answered += row.total;
      g.correct += row.correct;
      g.best = Math.max(g.best, row.total > 0 ? Math.round((row.correct / row.total) * 100) : 0);
      if (row.createdAt > g.last) g.last = row.createdAt;
      groups.set(key, g);
    }
    const leaderboard: LeaderRow[] = [...groups.entries()]
      .map(([name, g]) => ({
        name,
        quizzes: g.quizzes,
        answered: g.answered,
        accuracy: g.answered > 0 ? Math.round((g.correct / g.answered) * 100) : 0,
        best: g.best,
        lastPlayed: g.last.toISOString(),
      }))
      .sort((a, b) => b.best - a.best || b.accuracy - a.accuracy || b.quizzes - a.quizzes)
      .slice(0, 20);

    // ── پرتکرارترین اشتباه‌ها: تجمیع detail از آزمون‌های اخیر ──
    const missCount = new Map<string, number>();
    for (const row of detailRows) {
      if (!row.detail) continue;
      try {
        const parsed = JSON.parse(row.detail) as unknown;
        if (!Array.isArray(parsed)) continue;
        for (const item of parsed) {
          const it = item as { id?: unknown; chosen?: unknown; answer?: unknown };
          if (
            typeof it.id === "string" &&
            typeof it.chosen === "number" &&
            typeof it.answer === "number" &&
            it.chosen !== it.answer
          ) {
            missCount.set(it.id, (missCount.get(it.id) ?? 0) + 1);
          }
        }
      } catch {
        /* skip malformed detail */
      }
    }
    const topIds = [...missCount.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
    let topMisses: {
      id: string;
      text: string;
      options: string[];
      answer: number;
      category: string;
      misses: number;
    }[] = [];
    if (topIds.length) {
      const qRows = await db.question.findMany({
        where: { id: { in: topIds.map(([id]) => id) }, book },
      });
      const qMap = new Map(qRows.map((q) => [q.id, q]));
      topMisses = topIds
        .filter(([id]) => qMap.has(id))
        .map(([id, misses]) => {
          const q = qMap.get(id)!;
          let options: string[] = [];
          try {
            options = JSON.parse(q.options) as string[];
          } catch {
            options = [];
          }
          return {
            id: q.id,
            text: q.text,
            options,
            answer: q.answer,
            category: q.category,
            misses,
          };
        });
    }

    // ── نبض اجتماعی چالش امروز: میانگین و بهترین دقتِ پاسخ‌دهندگان امروز ──
    const dailyPulse = {
      players: dailyToday.length,
      avg:
        dailyToday.length > 0
          ? Math.round(
              dailyToday.reduce((s, a) => s + (a.total > 0 ? (a.correct / a.total) * 100 : 0), 0) /
                dailyToday.length,
            )
          : null,
      best:
        dailyToday.length > 0
          ? Math.round(
              dailyToday.reduce(
                (m, a) => Math.max(m, a.total > 0 ? (a.correct / a.total) * 100 : 0),
                0,
              ),
            )
          : null,
    };

    // ── نبض اجتماعی چالش هفتگی: پاسخ‌دهندگان چالش هفتگی از شنبه ──
    const weeklyPulse = {
      players: weeklyThisWeek.length,
      avg:
        weeklyThisWeek.length > 0
          ? Math.round(
              weeklyThisWeek.reduce((s, a) => s + (a.total > 0 ? (a.correct / a.total) * 100 : 0), 0) /
                weeklyThisWeek.length,
            )
          : null,
      best:
        weeklyThisWeek.length > 0
          ? Math.round(
              weeklyThisWeek.reduce(
                (m, a) => Math.max(m, a.total > 0 ? (a.correct / a.total) * 100 : 0),
                0,
              ),
            )
          : null,
    };

    return NextResponse.json({
      recent: recent.map((a) => ({
        id: a.id,
        category: a.category,
        lesson: a.lesson,
        total: a.total,
        correct: a.correct,
        duration: a.duration,
        name: a.name,
        createdAt: a.createdAt,
      })),
      chart: chart
        .map((a) => ({
          id: a.id,
          accuracy: a.total > 0 ? Math.round((a.correct / a.total) * 100) : 0,
          category: a.category,
          createdAt: a.createdAt,
        }))
        .reverse(),
      leaderboard,
      topMisses,
      dailyPulse,
      weeklyPulse,
      stats: {
        attempts: agg._count._all,
        sumTotal,
        sumCorrect,
        accuracy: sumTotal > 0 ? Math.round((sumCorrect / sumTotal) * 100) : 0,
        best: Math.round(bestPercent),
      },
    });
  } catch (e) {
    console.error("GET /api/attempts error:", e);
    return NextResponse.json({ error: "خطا در دریافت نتایج" }, { status: 500 });
  }
}
