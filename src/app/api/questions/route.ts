import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export interface QuizQuestionDto {
  id: string;
  category: string;
  lesson: number;
  scope: string;
  text: string;
  options: string[];
  answer: number;
  level: string;
  explanation: string | null;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") ?? "all";
    const lesson = searchParams.get("lesson") ?? "all";
    const count = Math.min(
      Math.max(parseInt(searchParams.get("count") ?? "10", 10) || 10, 1),
      100,
    );
    const idsParam = searchParams.get("ids");
    const ids = idsParam
      ? idsParam
          .split(",")
          .map((s) => s.trim())
          .filter((s) => /^[a-z0-9]{10,40}$/i.test(s))
          .slice(0, 100)
      : [];

    const where: { category?: string; lesson?: number } = {};
    if (category !== "all") where.category = category;
    if (lesson !== "all") where.lesson = Number(lesson);

    const pool = ids.length
      ? await db.question.findMany({ where: { id: { in: ids } } })
      : await db.question.findMany({ where });
    if (pool.length === 0) {
      return NextResponse.json({ questions: [], pool: 0 });
    }

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, Math.min(count, pool.length));
    if (ids.length && picked.length < pool.length) {
      // keep review order stable-ish: show missed questions first by original ids order
      picked.sort(
        (a, b) => ids.indexOf(a.id) - ids.indexOf(b.id),
      );
    }

    const questions: QuizQuestionDto[] = picked.map((q) => {
      let options: string[] = [];
      try {
        options = JSON.parse(q.options) as string[];
      } catch {
        options = [];
      }
      return {
        id: q.id,
        category: q.category,
        lesson: q.lesson,
        scope: q.scope,
        text: q.text,
        options,
        answer: q.answer,
        level: q.level,
        explanation: q.explanation,
      };
    });

    return NextResponse.json({ questions, pool: pool.length });
  } catch (e) {
    console.error("GET /api/questions error:", e);
    return NextResponse.json(
      { error: "خطا در دریافت سؤالات" },
      { status: 500 },
    );
  }
}
