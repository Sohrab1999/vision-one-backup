import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { normalizeBookId } from "../_lib/book";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * فاز ۶ — رده‌بندی هفتگی دوستانه (از شنبهٔ آغازین هفتهٔ ایرانی).
 *
 * XP هر آزمون = ۱۰ × پاسخ درست + ۲۵ (پاداش کامل‌کردن) — همان‌قدر که
 * موتور سمت کلاینت می‌دهد ولی از دادهٔ واقعی Attempt محاسبه می‌شود.
 * گروه‌بندی بر اساس نام نمایشی (مهمان‌ها) یا نام کاربری (کاربران حساب‌دار).
 * بدون فشار روانی: فقط مشارکت‌کنندگان هفته، بدون تحقیر ته‌جدولی.
 */

interface Row {
  name: string;
  avatar: string | null;
  xp: number;
  quizzes: number;
  answered: number;
  accuracy: number;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const book = normalizeBookId(searchParams.get("book"));

    const now = new Date();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 1) % 7)); // شنبه

    // جلسهٔ کاربر برای «جای تو»
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ?? null;

    const rows = await db.attempt.findMany({
      where: { book, createdAt: { gte: weekStart } },
      select: { name: true, userId: true, total: true, correct: true },
      take: 2000,
    });

    // نام کاربران حساب‌دار (برای گروه‌بندی + آواتار)
    const userIds = [...new Set(rows.map((r) => r.userId).filter((u): u is string => !!u))];
    const users = userIds.length
      ? await db.user.findMany({
          where: { id: { in: userIds } },
          select: { id: true, username: true, avatar: true },
        })
      : [];
    const userMap = new Map(users.map((u) => [u.id, u]));

    interface Agg {
      name: string;
      avatar: string | null;
      xp: number;
      quizzes: number;
      answered: number;
      correct: number;
    }
    const groups = new Map<string, Agg>();
    for (const r of rows) {
      const u = r.userId ? userMap.get(r.userId) : undefined;
      const name = (u?.username ?? r.name ?? "").trim();
      if (!name) continue;
      const g =
        groups.get(name) ?? { name, avatar: u?.avatar ?? null, xp: 0, quizzes: 0, answered: 0, correct: 0 };
      g.quizzes += 1;
      g.answered += r.total;
      g.correct += r.correct;
      g.xp += r.correct * 10 + 25;
      groups.set(name, g);
    }

    const leaderboard: Row[] = [...groups.values()]
      .map((g) => ({
        name: g.name,
        avatar: g.avatar,
        xp: g.xp,
        quizzes: g.quizzes,
        answered: g.answered,
        accuracy: g.answered > 0 ? Math.round((g.correct / g.answered) * 100) : 0,
      }))
      .sort((a, b) => b.xp - a.xp || b.accuracy - a.accuracy)
      .slice(0, 20);

    // جای تو (فقط حساب‌دار — مهمان‌ها نام سروری ندارند)
    let me: { xp: number; rank: number } | null = null;
    if (userId && userMap.has(userId)) {
      const myName = userMap.get(userId)!.username.trim();
      const idx = leaderboard.findIndex((r) => r.name === myName);
      if (idx >= 0) {
        me = { xp: leaderboard[idx]!.xp, rank: idx + 1 };
      } else {
        // شاید خارج از ۲۰ باشد — جمع دستی
        const mine = rows
          .filter((r) => r.userId === userId)
          .reduce((s, r) => s + r.correct * 10 + 25, 0);
        me = { xp: mine, rank: 0 }; // ۰ = خارج از ۲۰ برتر (نمایش محترمانه)
      }
    }

    return NextResponse.json({
      weekStart: weekStart.toISOString(),
      rows: leaderboard,
      me,
    });
  } catch (e) {
    console.error("GET /api/leaderboard error:", e);
    return NextResponse.json({ error: "خطا در دریافت رده‌بندی" }, { status: 500 });
  }
}
