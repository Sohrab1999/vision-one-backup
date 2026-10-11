import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cleanKey, isValidCode, isValidKey } from "../../_lib/state";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ code: string }> };

/**
 * چالش بازی کلاس — G4-03 نقشه راه بازی‌ها.
 *
 * معلم یک بازی (category) + حداقل امتیاز تعیین می‌کند؛ رده‌بندی کلاس از
 * Attempt (book=classroom.book، category=بازی، بعد از شروع چالش) ساخته می‌شود.
 * گروه‌بندی مثل /api/leaderboard: نام نمایشی مهمان یا نام کاربری حساب‌دار.
 * بدون PII: فقط نام نمایشی برمی‌گردد — هرگز userId/email.
 *
 * GET  ?key=&role=teacher|student → چالش فعال (آخرین) + جدول رده‌بندی
 * PUT  ?key=&role=teacher  body { category, minScore } → غیرفعال‌سازی قبلی‌ها + ساخت چالش جدید
 */

/** امتیاز هر Attempt — همان فرمول XP رده‌بندی سراسری (۱۰×پاسخ درست + ۲۵ پاداش کامل‌کردن) */
function attemptScore(correct: number): number {
  return correct * 10 + 25;
}

/** کلید بازی معتبر: kebab-case لاتین ۲ تا ۴۰ نویسه (مثل "speed-quiz") */
function isValidCategory(cat: unknown): cat is string {
  return typeof cat === "string" && /^[a-z0-9][a-z0-9-]{1,39}$/.test(cat.trim());
}

/** حداقل امتیاز معتبر: عدد صحیح ۱ تا ۱۰۰۰۰ */
function isValidMinScore(v: unknown): v is number {
  return typeof v === "number" && Number.isInteger(v) && v >= 1 && v <= 10000;
}

// ─────────────────────────── GET ───────────────────────────

export async function GET(req: NextRequest, ctx: Ctx) {
  try {
    const { code } = await ctx.params;
    if (!isValidCode(code)) {
      return NextResponse.json({ error: "کد کلاس باید ۶ رقم باشد" }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const roleParam = searchParams.get("role");
    const role = roleParam === "teacher" ? "teacher" : roleParam === "student" ? "student" : null;
    if (!role) {
      return NextResponse.json({ error: "نقش باید teacher یا student باشد" }, { status: 400 });
    }
    const key = cleanKey(searchParams.get("key") ?? "");
    if (!isValidKey(key)) {
      return NextResponse.json({ error: "کلید نامعتبر است" }, { status: 400 });
    }

    const classroom = await db.classroom.findUnique({ where: { code: code.trim() } });
    if (!classroom) {
      return NextResponse.json({ error: "کلاسی با این کد پیدا نشد" }, { status: 404 });
    }

    if (role === "teacher") {
      if (key !== classroom.teacherKey) {
        return NextResponse.json({ error: "دسترسی معلم تأیید نشد" }, { status: 403 });
      }
    } else {
      const member = await db.classMember.findUnique({
        where: { classroomId_studentKey: { classroomId: classroom.id, studentKey: key } },
        select: { id: true },
      });
      if (!member) {
        return NextResponse.json({ error: "اول عضو کلاس شو" }, { status: 404 });
      }
    }

    const challenge = await db.classChallenge.findFirst({
      where: { classroomId: classroom.id, active: true },
      orderBy: { createdAt: "desc" },
      select: { category: true, minScore: true, createdAt: true },
    });
    if (!challenge) {
      return NextResponse.json({ challenge: null, rows: [] });
    }

    // تلاش‌های همین بازی در این جزوه، از لحظهٔ شروع چالش به بعد
    const rows = await db.attempt.findMany({
      where: {
        book: classroom.book,
        category: challenge.category,
        createdAt: { gte: challenge.createdAt },
      },
      select: { name: true, userId: true, correct: true },
      take: 2000,
    });

    // نام کاربران حساب‌دار — گروه‌بندی مثل /api/leaderboard (بدون لو دادن شناسه)
    const userIds = [...new Set(rows.map((r) => r.userId).filter((u): u is string => !!u))];
    const users = userIds.length
      ? await db.user.findMany({
          where: { id: { in: userIds } },
          select: { id: true, username: true },
        })
      : [];
    const userMap = new Map(users.map((u) => [u.id, u.username]));

    interface Agg {
      name: string;
      plays: number;
      bestScore: number;
    }
    const groups = new Map<string, Agg>();
    for (const r of rows) {
      const name = ((r.userId ? userMap.get(r.userId) : undefined) ?? r.name ?? "").trim();
      if (!name) continue;
      const score = attemptScore(r.correct);
      const g = groups.get(name);
      if (g) {
        g.plays += 1;
        if (score > g.bestScore) g.bestScore = score;
      } else {
        groups.set(name, { name, plays: 1, bestScore: score });
      }
    }

    const leaderboard = [...groups.values()]
      .map((g) => ({
        name: g.name,
        plays: g.plays,
        bestScore: g.bestScore,
        reachedGoal: g.bestScore >= challenge.minScore,
      }))
      .sort((a, b) => b.bestScore - a.bestScore || b.plays - a.plays)
      .slice(0, 50);

    return NextResponse.json({
      challenge: {
        category: challenge.category,
        minScore: challenge.minScore,
        createdAt: challenge.createdAt.toISOString(),
      },
      rows: leaderboard,
    });
  } catch (e) {
    console.error("GET /api/class/[code]/challenge error:", e);
    return NextResponse.json({ error: "دریافت چالش کلاس ممکن نشد" }, { status: 500 });
  }
}

// ─────────────────────────── PUT ───────────────────────────

export async function PUT(req: NextRequest, ctx: Ctx) {
  try {
    const { code } = await ctx.params;
    if (!isValidCode(code)) {
      return NextResponse.json({ error: "کد کلاس باید ۶ رقم باشد" }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const key = cleanKey(searchParams.get("key") ?? "");
    if (!key) {
      return NextResponse.json({ error: "کلید معلم ارسال نشده است" }, { status: 401 });
    }
    if (!isValidKey(key)) {
      return NextResponse.json({ error: "کلید نامعتبر است" }, { status: 400 });
    }
    if (searchParams.get("role") !== "teacher") {
      return NextResponse.json({ error: "فقط معلم می‌تواند چالش تعیین کند" }, { status: 403 });
    }

    const classroom = await db.classroom.findUnique({ where: { code: code.trim() } });
    if (!classroom) {
      return NextResponse.json({ error: "کلاسی با این کد پیدا نشد" }, { status: 404 });
    }
    if (key !== classroom.teacherKey) {
      return NextResponse.json({ error: "دسترسی معلم تأیید نشد" }, { status: 403 });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "بدنهٔ درخواست نامعتبر است" }, { status: 400 });
    }
    const { category, minScore } = (body ?? {}) as {
      category?: unknown;
      minScore?: unknown;
    };
    if (!isValidCategory(category)) {
      return NextResponse.json({ error: "بازی چالش را از فهرست انتخاب کن" }, { status: 400 });
    }
    if (!isValidMinScore(minScore)) {
      return NextResponse.json(
        { error: "حداقل امتیاز باید عددی بین ۱ تا ۱۰۰۰۰ باشد" },
        { status: 400 },
      );
    }

    // چالش‌های قبلی غیرفعال — فقط یک چالش فعال در هر لحظه
    await db.classChallenge.updateMany({
      where: { classroomId: classroom.id, active: true },
      data: { active: false },
    });
    const created = await db.classChallenge.create({
      data: {
        classroomId: classroom.id,
        category: category.trim(),
        minScore,
      },
      select: { category: true, minScore: true, createdAt: true },
    });

    return NextResponse.json(
      {
        challenge: {
          category: created.category,
          minScore: created.minScore,
          createdAt: created.createdAt.toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (e) {
    console.error("PUT /api/class/[code]/challenge error:", e);
    return NextResponse.json({ error: "تعیین چالش ممکن نشد" }, { status: 500 });
  }
}
