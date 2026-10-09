import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      category?: string;
      lesson?: number;
      total?: number;
      correct?: number;
      duration?: number;
      name?: string;
      detail?: unknown;
    };

    const total = Number(body.total ?? 0);
    const correct = Number(body.correct ?? 0);
    if (!total || total <= 0) {
      return NextResponse.json({ error: "داده نامعتبر" }, { status: 400 });
    }

    const attempt = await db.attempt.create({
      data: {
        category: body.category ?? "all",
        lesson: Number(body.lesson ?? 0),
        total,
        correct,
        duration: Number(body.duration ?? 0),
        name: body.name ? String(body.name).slice(0, 40) : null,
        detail: body.detail ? JSON.stringify(body.detail) : null,
      },
    });

    return NextResponse.json({ ok: true, id: attempt.id });
  } catch (e) {
    console.error("POST /api/attempts error:", e);
    return NextResponse.json({ error: "خطا در ذخیره نتیجه" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const [recent, agg, last60, chart] = await Promise.all([
      db.attempt.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
      db.attempt.aggregate({
        _count: { _all: true },
        _sum: { total: true, correct: true },
      }),
      db.attempt.findMany({ orderBy: { createdAt: "desc" }, take: 60 }),
      db.attempt.findMany({
        orderBy: { createdAt: "desc" },
        take: 20,
        select: { id: true, correct: true, total: true, category: true, createdAt: true },
      }),
    ]);

    const sumTotal = agg._sum.total ?? 0;
    const sumCorrect = agg._sum.correct ?? 0;

    const bestPercent = last60.reduce((max, a) => {
      const p = a.total > 0 ? (a.correct / a.total) * 100 : 0;
      return Math.max(max, p);
    }, 0);

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
