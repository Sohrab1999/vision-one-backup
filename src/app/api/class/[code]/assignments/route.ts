import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cleanKey, isValidCode, isValidKey } from "../../_lib/state";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ code: string }> };

/** تبدیل به عدد صحیح؛ ورودی نامعتبر = null */
function toIntOrNull(v: unknown): number | null {
  const n = typeof v === "number" ? v : typeof v === "string" && v.trim() !== "" ? Number(v) : NaN;
  return Number.isFinite(n) ? Math.trunc(n) : null;
}

/**
 * تکلیف‌های کلاس — فاز ۹ نقشه راه جامع.
 * POST: معلم تکلیف می‌سازد (مرور واژگان یا آزمون N سؤالی) + اعلان خودکار برای همه.
 * PUT: دانش‌آموز تکلیف را انجام‌شده علامت می‌زند (نمره فقط بار اول ثبت می‌شود).
 */
export async function POST(req: NextRequest, ctx: Ctx) {
  try {
    const { code } = await ctx.params;
    if (!isValidCode(code)) {
      return NextResponse.json({ error: "کد کلاس باید ۶ رقم باشد" }, { status: 400 });
    }

    let body: {
      teacherKey?: unknown;
      title?: unknown;
      kind?: unknown;
      lesson?: unknown;
      questionCount?: unknown;
      dueAt?: unknown;
    };
    try {
      body = (await req.json()) as typeof body;
    } catch {
      return NextResponse.json({ error: "داده ارسالی نامعتبر است" }, { status: 400 });
    }

    const teacherKey = cleanKey(typeof body.teacherKey === "string" ? body.teacherKey : "");
    if (!isValidKey(teacherKey)) {
      return NextResponse.json({ error: "کلید معلم نامعتبر است" }, { status: 400 });
    }

    const classroom = await db.classroom.findUnique({ where: { code: code.trim() } });
    if (!classroom) {
      return NextResponse.json({ error: "کلاسی با این کد پیدا نشد" }, { status: 404 });
    }
    if (teacherKey !== classroom.teacherKey) {
      return NextResponse.json({ error: "دسترسی معلم تأیید نشد" }, { status: 403 });
    }

    const title = typeof body.title === "string" ? body.title.trim() : "";
    if (title.length < 3 || title.length > 80) {
      return NextResponse.json(
        { error: "عنوان تکلیف باید بین ۳ تا ۸۰ نویسه باشد" },
        { status: 400 },
      );
    }
    const kind = body.kind === "quiz" ? "quiz" : body.kind === "review" ? "review" : null;
    if (!kind) {
      return NextResponse.json(
        { error: "نوع تکلیف باید review یا quiz باشد" },
        { status: 400 },
      );
    }

    // lesson: عدد صحیح اختیاری ۰..۱۲
    let lesson: number | null = null;
    if (body.lesson !== undefined && body.lesson !== null && body.lesson !== "") {
      const n = toIntOrNull(body.lesson);
      if (n === null || n < 0 || n > 12) {
        return NextResponse.json({ error: "شماره درس باید بین ۰ تا ۱۲ باشد" }, { status: 400 });
      }
      lesson = n;
    }

    // questionCount: فقط برای quiz، ۵..۵۰
    let questionCount: number | null = null;
    if (kind === "quiz" && body.questionCount !== undefined && body.questionCount !== null && body.questionCount !== "") {
      const n = toIntOrNull(body.questionCount);
      if (n === null || n < 5 || n > 50) {
        return NextResponse.json(
          { error: "تعداد سؤال آزمون باید بین ۵ تا ۵۰ باشد" },
          { status: 400 },
        );
      }
      questionCount = n;
    }

    // dueAt: ISO اختیاری
    let dueAt: Date | null = null;
    if (typeof body.dueAt === "string" && body.dueAt.trim() !== "") {
      const d = new Date(body.dueAt);
      if (Number.isNaN(d.getTime())) {
        return NextResponse.json({ error: "تاریخ موعد نامعتبر است" }, { status: 400 });
      }
      dueAt = d;
    }

    const assignment = await db.assignment.create({
      data: {
        classroomId: classroom.id,
        title,
        kind,
        lesson,
        questionCount,
        dueAt,
      },
    });

    // اعلان خودکار برای همهٔ اعضا
    await db.notification.create({
      data: { classroomId: classroom.id, targetKey: "*", text: `📋 تکلیف جدید: ${title}` },
    });

    return NextResponse.json(
      {
        assignment: {
          id: assignment.id,
          title: assignment.title,
          kind: assignment.kind,
          lesson: assignment.lesson,
          questionCount: assignment.questionCount,
          dueAt: assignment.dueAt ? assignment.dueAt.toISOString() : null,
          createdAt: assignment.createdAt.toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (e) {
    console.error("POST /api/class/[code]/assignments error:", e);
    return NextResponse.json({ error: "ساخت تکلیف ممکن نشد" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  try {
    const { code } = await ctx.params;
    if (!isValidCode(code)) {
      return NextResponse.json({ error: "کد کلاس باید ۶ رقم باشد" }, { status: 400 });
    }

    let body: { studentKey?: unknown; assignmentId?: unknown; score?: unknown };
    try {
      body = (await req.json()) as typeof body;
    } catch {
      return NextResponse.json({ error: "داده ارسالی نامعتبر است" }, { status: 400 });
    }

    const studentKey = cleanKey(typeof body.studentKey === "string" ? body.studentKey : "");
    if (!isValidKey(studentKey)) {
      return NextResponse.json({ error: "کلید دانش‌آموز نامعتبر است" }, { status: 400 });
    }
    const assignmentId =
      typeof body.assignmentId === "string" && body.assignmentId.trim().length >= 1 && body.assignmentId.trim().length <= 64
        ? body.assignmentId.trim()
        : null;
    if (!assignmentId) {
      return NextResponse.json({ error: "شناسه تکلیف نامعتبر است" }, { status: 400 });
    }

    const classroom = await db.classroom.findUnique({ where: { code: code.trim() } });
    if (!classroom) {
      return NextResponse.json({ error: "کلاسی با این کد پیدا نشد" }, { status: 404 });
    }

    const assignment = await db.assignment.findUnique({ where: { id: assignmentId } });
    if (!assignment || assignment.classroomId !== classroom.id) {
      return NextResponse.json({ error: "تکلیف پیدا نشد" }, { status: 404 });
    }

    const member = await db.classMember.findUnique({
      where: { classroomId_studentKey: { classroomId: classroom.id, studentKey } },
      select: { id: true },
    });
    if (!member) {
      return NextResponse.json({ error: "اول عضو کلاس شو" }, { status: 403 });
    }

    // score: صحیح اختیاری ۰..۱۰۰ (clamp)
    let score: number | null = null;
    if (body.score !== undefined && body.score !== null && body.score !== "") {
      const n = toIntOrNull(body.score);
      if (n !== null) score = Math.min(100, Math.max(0, n));
    }

    // آپ‌سل: نمره فقط در نخستین ثبت ذخیره می‌شود — انجام دوباره بازنویسی نمی‌کند
    await db.assignmentDone.upsert({
      where: { assignmentId_studentKey: { assignmentId: assignment.id, studentKey } },
      update: {},
      create: { assignmentId: assignment.id, studentKey, score },
    });

    const doneCount = await db.assignmentDone.count({
      where: { assignmentId: assignment.id },
    });

    return NextResponse.json({ ok: true, doneCount });
  } catch (e) {
    console.error("PUT /api/class/[code]/assignments error:", e);
    return NextResponse.json({ error: "ثبت انجام تکلیف ممکن نشد" }, { status: 500 });
  }
}
