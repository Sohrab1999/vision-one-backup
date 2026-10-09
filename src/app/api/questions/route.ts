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

/** PRNG قطعی (mulberry32) برای انتخاب چالش روزانه — همه کاربران یک روز، همان سؤال‌ها */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const rand = mulberry32(seed);
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** امروز به وقت سرور به شکل YYYY-MM-DD برای seed چالش روزانه */
function todayKey(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

/** شنبهٔ آغازین هفتهٔ جاری (هفتهٔ ایرانی از شنبه شروع می‌شود) — هماهنگ با weekly-store سمت کلاینت */
function weekStart(now = new Date()): Date {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  d.setDate(d.getDate() - ((d.getDay() + 1) % 7));
  return d;
}

/** کلید هفته به شکل YYYY-MM-DDِ شنبهٔ آغازین — برای seed چالش هفتگی */
function weekKeyOf(now = new Date()): string {
  const s = weekStart(now);
  const mm = String(s.getMonth() + 1).padStart(2, "0");
  const dd = String(s.getDate()).padStart(2, "0");
  return `${s.getFullYear()}-${mm}-${dd}`;
}

/** شمارهٔ هفته برای نمایش (از شنبهٔ آغازین سال) */
function weekIndexOf(now = new Date()): number {
  const s = weekStart(now);
  const dayOfYear = Math.floor((s.getTime() - new Date(s.getFullYear(), 0, 1).getTime()) / 86400000);
  return Math.floor(dayOfYear / 7) + 1;
}

const LEVEL_KEYS = ["آموزشی", "متوسط", "کنکوری"] as const;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") ?? "all";
    const lesson = searchParams.get("lesson") ?? "all";
    const level = searchParams.get("level") ?? "all";
    const count = Math.min(
      Math.max(parseInt(searchParams.get("count") ?? "10", 10) || 10, 1),
      100,
    );
    const idsParam = searchParams.get("ids");
    const daily = searchParams.get("daily") === "1";
    const weekly = searchParams.get("weekly") === "1";
    const meta = searchParams.get("meta") === "1";

    // ── متادیتای بانک سؤال (شمارنده‌ها برای تنظیمات آزمون)
    if (meta) {
      const [byLevel, byCategory, total] = await Promise.all([
        db.question.groupBy({ by: ["level"], _count: true }),
        db.question.groupBy({ by: ["category"], _count: true }),
        db.question.count(),
      ]);
      return NextResponse.json({
        total,
        byLevel: Object.fromEntries(byLevel.map((l) => [l.level, l._count])),
        byCategory: Object.fromEntries(byCategory.map((c) => [c.category, c._count])),
      });
    }

    const where: { category?: string; lesson?: number; level?: string } = {};
    if (category !== "all") where.category = category;
    if (lesson !== "all") where.lesson = Number(lesson);
    if (!daily && !weekly && level !== "all" && (LEVEL_KEYS as readonly string[]).includes(level)) {
      where.level = level;
    }

    const ids = idsParam
      ? idsParam
          .split(",")
          .map((s) => s.trim())
          .filter((s) => /^[a-z0-9]{10,40}$/i.test(s))
          .slice(0, 100)
      : [];

    const pool = ids.length
      ? await db.question.findMany({ where: { id: { in: ids } } })
      : await db.question.findMany({ where });
    if (pool.length === 0) {
      return NextResponse.json({ questions: [], pool: 0 });
    }

    let picked;
    if (daily) {
      // چالش روزانه: ۵ سؤال قطعی بر اساس تاریخ — ترکیبی از گرامر و واژگان
      const seed = Number(todayKey().replace(/-/g, "")) % 2147483647;
      picked = seededShuffle(pool, seed).slice(0, Math.min(count, pool.length));
    } else if (weekly) {
      // چالش هفتگی: ۱۰ سؤال قطعی بر اساس شنبهٔ آغازین هفته — همهٔ کاربرانِ یک هفته، همان سؤال‌ها
      const seed = Number(weekKeyOf().replace(/-/g, "")) % 2147483647;
      picked = seededShuffle(pool, seed).slice(0, Math.min(count, pool.length));
    } else {
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      picked = shuffled.slice(0, Math.min(count, pool.length));
    }
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

    return NextResponse.json({
      questions,
      pool: pool.length,
      daily: daily ? todayKey() : undefined,
      weekly: weekly ? { week: weekKeyOf(), index: weekIndexOf() } : undefined,
    });
  } catch (e) {
    console.error("GET /api/questions error:", e);
    return NextResponse.json(
      { error: "خطا در دریافت سؤالات" },
      { status: 500 },
    );
  }
}
