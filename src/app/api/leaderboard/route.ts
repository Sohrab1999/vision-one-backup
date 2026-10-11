import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { normalizeBookId } from "../_lib/book";
import { checkRate, rateLimited } from "../_lib/rate-limit";
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
 *
 * G4-01 — رده‌بندی هر بازی:
 * با پارامتر اختیاری `category` (کلید بازی = همان Attempt.category که
 * saveAttempt می‌نویسد؛ صفر تغییر اسکیما) فقط تلاش‌های همان بازی فیلتر و
 * تاپ ۱۰ (به‌جای ۲۰) برگردانده می‌شود. ردیف‌های حالت بازی علاوه بر XP،
 * `bestScore` را هم دارند (بیشینهٔ score داخل detail JSON تلاش‌ها — اگر
 * بازیِ امتیاز عددی نداشته باشد ۰). شکل پاسخ آزمون (بدون category) دست‌نخورده
 * می‌ماند و «جای تو» در هر دو حالت با همان منطق قبلی کار می‌کند.
 */

interface Row {
  name: string;
  avatar: string | null;
  xp: number;
  quizzes: number;
  answered: number;
  accuracy: number;
  /** فقط حالت بازی (category) — بیشترین امتیاز ثبت‌شدهٔ این بازیکن در این بازی */
  bestScore?: number;
}

/** G4-01 — استخراج امن score عددی از detail (رشتهٔ JSON ذخیره‌شده در Attempt) */
function extractBestScore(detail: string | null): number {
  if (!detail) return 0;
  try {
    const num = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
    const parsed: unknown = JSON.parse(detail);
    // score ممکن است در شیء سطح اول باشد (speed-quiz/flappy/fps) یا داخل
    // آیتم‌های آرایه (چند بازی آرایهٔ ریزدانه می‌نویسند) — بیشینه گرفته می‌شود.
    if (Array.isArray(parsed)) {
      let best = 0;
      for (const item of parsed) {
        const s = (item as { score?: unknown } | null)?.score;
        if (num(s)) best = Math.max(best, s);
      }
      return best;
    }
    if (parsed && typeof parsed === "object") {
      const s = (parsed as { score?: unknown }).score;
      return num(s) ? s : 0;
    }
    return 0;
  } catch {
    return 0; // detail خراب/غیر JSON → بی‌خطر رد می‌شود
  }
}

export async function GET(req: NextRequest) {
  const rl = checkRate(req, "leaderboard:get", 90, 60_000);
  if (!rl.ok) return rateLimited(rl.retryAfter);
  try {
    const { searchParams } = new URL(req.url);
    const book = normalizeBookId(searchParams.get("book"));

    // G4-01 — category اختیاری: کلید بازی (trim + lowercase؛ بدون allowlist)
    const rawCategory = searchParams.get("category") ?? "";
    const category = rawCategory.trim().toLowerCase();
    const gameMode = category.length > 0;

    const now = new Date();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 1) % 7)); // شنبه

    // جلسهٔ کاربر برای «جای تو»
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ?? null;

    const rows = await db.attempt.findMany({
      where: {
        book,
        ...(gameMode ? { category } : {}),
        createdAt: { gte: weekStart },
      },
      select: { name: true, userId: true, total: true, correct: true, detail: true },
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
      best: number;
    }
    const groups = new Map<string, Agg>();
    for (const r of rows) {
      const u = r.userId ? userMap.get(r.userId) : undefined;
      const name = (u?.username ?? r.name ?? "").trim();
      if (!name) continue;
      const g =
        groups.get(name) ?? { name, avatar: u?.avatar ?? null, xp: 0, quizzes: 0, answered: 0, correct: 0, best: 0 };
      g.quizzes += 1;
      g.answered += r.total;
      g.correct += r.correct;
      g.xp += r.correct * 10 + 25;
      if (gameMode) g.best = Math.max(g.best, extractBestScore(r.detail)); // فقط حالت بازی — آزمون مثل قبل بدون parse
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
        ...(gameMode ? { bestScore: g.best } : {}),
      }))
      .sort((a, b) => b.xp - a.xp || b.accuracy - a.accuracy)
      .slice(0, gameMode ? 10 : 20); // G4-01 — تاپ ۱۰ هر بازی؛ آزمون همان ۲۰ تای قبلی

    // جای تو (فقط حساب‌دار — مهمان‌ها نام سروری ندارند)
    let me: { xp: number; rank: number } | null = null;
    if (userId && userMap.has(userId)) {
      const myName = userMap.get(userId)!.username.trim();
      const idx = leaderboard.findIndex((r) => r.name === myName);
      if (idx >= 0) {
        me = { xp: leaderboard[idx]!.xp, rank: idx + 1 };
      } else {
        // شاید خارج از سقف (۲۰ آزمون / ۱۰ بازی) باشد — جمع دستی روی همان فیلتر
        const mine = rows
          .filter((r) => r.userId === userId)
          .reduce((s, r) => s + r.correct * 10 + 25, 0);
        me = { xp: mine, rank: 0 }; // ۰ = خارج از برترها (نمایش محترمانه)
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
