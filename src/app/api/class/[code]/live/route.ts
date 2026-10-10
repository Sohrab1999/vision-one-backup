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

/** گزینه‌های سؤال از JSON — خطا = آرایهٔ خالی */
function parseOptions(json: string): string[] {
  try {
    const arr = JSON.parse(json) as unknown;
    return Array.isArray(arr) ? arr.map(String) : [];
  } catch {
    return [];
  }
}

/** آرایهٔ شناسه سؤال‌های آزمون از JSON */
function parseQuestionIds(json: string): string[] {
  try {
    const arr = JSON.parse(json) as unknown;
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/**
 * نمای زندهٔ معلم: وضعیت آزمون + سؤال جاری (با پاسخ) + شمار پاسخ‌دهندگان سؤال جاری
 * + جدول برنده‌ها (correct نزولی، سپس سریع‌تر، سپس پاسخ‌های بیشتر) — سقف ۵۰ ردیف.
 */
async function teacherLivePayload(quiz: {
  id: string;
  status: string;
  currentIndex: number;
  questionIds: string;
}) {
  const ids = parseQuestionIds(quiz.questionIds);
  const answers = await db.liveAnswer.findMany({
    where: { quizId: quiz.id },
    select: { studentKey: true, displayName: true, correct: true, ms: true, index: true },
  });

  const qid = ids[quiz.currentIndex] ?? null;
  const question = qid ? await db.question.findUnique({ where: { id: qid } }) : null;

  const byStudent = new Map<
    string,
    { displayName: string; correct: number; answered: number; totalMs: number }
  >();
  for (const a of answers) {
    let row = byStudent.get(a.studentKey);
    if (!row) {
      row = { displayName: a.displayName, correct: 0, answered: 0, totalMs: 0 };
      byStudent.set(a.studentKey, row);
    }
    if (a.correct) row.correct += 1;
    row.answered += 1;
    row.totalMs += a.ms;
  }
  const leaderboard = [...byStudent.values()]
    .sort(
      (x, y) => y.correct - x.correct || x.totalMs - y.totalMs || y.answered - x.answered,
    )
    .slice(0, 50);

  return {
    live: {
      id: quiz.id,
      status: quiz.status,
      currentIndex: quiz.currentIndex,
      questionCount: ids.length,
    },
    question: question
      ? { text: question.text, options: parseOptions(question.options), answer: question.answer }
      : null,
    answeredCount: answers.filter((a) => a.index === quiz.currentIndex).length,
    leaderboard,
  };
}

/**
 * آزمون زندهٔ کلاسی — فاز ۹ نقشه راه جامع.
 * POST  (معلم): شروع آزمون با count سؤال تصادفی از بانک سؤال کلاس.
 * GET   ?key=&role=: سؤال جاری (بدون پاسخ برای دانش‌آموز — ضدتقلب) + جدول برنده‌ها برای معلم.
 * PUT   (دانش‌آموز): ثبت پاسخ لحظه‌ای — فقط برای سؤال جاری و فقط بار اول.
 * PATCH (معلم): سؤال بعدی / پایان آزمون.
 */
export async function POST(req: NextRequest, ctx: Ctx) {
  try {
    const { code } = await ctx.params;
    if (!isValidCode(code)) {
      return NextResponse.json({ error: "کد کلاس باید ۶ رقم باشد" }, { status: 400 });
    }

    let body: { teacherKey?: unknown; count?: unknown };
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

    const count = toIntOrNull(body.count);
    if (count === null || count < 3 || count > 20) {
      return NextResponse.json(
        { error: "تعداد سؤال‌ها باید بین ۳ تا ۲۰ باشد" },
        { status: 400 },
      );
    }

    // پایان آزمون فعال قبلی (در هر لحظه فقط یک آزمون فعال)
    await db.liveQuiz.updateMany({
      where: { classroomId: classroom.id, status: "active" },
      data: { status: "finished", endedAt: new Date() },
    });

    const pool = await db.question.findMany({
      where: { book: classroom.book },
      select: { id: true },
    });
    if (pool.length === 0) {
      return NextResponse.json(
        { error: "بانک سؤال این جزوه خالی است — آزمون زنده ممکن نیست" },
        { status: 400 },
      );
    }

    // انتخاب تصادفی در JS (shuffle + slice)
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, Math.min(count, pool.length));

    const quiz = await db.liveQuiz.create({
      data: {
        classroomId: classroom.id,
        status: "active",
        questionIds: JSON.stringify(picked.map((p) => p.id)),
        currentIndex: 0,
      },
    });

    // اعلان خودکار برای همهٔ اعضا
    await db.notification.create({
      data: { classroomId: classroom.id, targetKey: "*", text: "🔴 آزمون زنده شروع شد!" },
    });

    return NextResponse.json(
      { quizId: quiz.id, questionCount: picked.length },
      { status: 201 },
    );
  } catch (e) {
    console.error("POST /api/class/[code]/live error:", e);
    return NextResponse.json({ error: "شروع آزمون زنده ممکن نشد" }, { status: 500 });
  }
}

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

    /** نام نمایشی عضو — در شاخهٔ دانش‌آموز پر می‌شود (برای me.displayName) */
    let memberDisplayName = "";
    if (role === "teacher") {
      if (key !== classroom.teacherKey) {
        return NextResponse.json({ error: "دسترسی معلم تأیید نشد" }, { status: 403 });
      }
    } else {
      const member = await db.classMember.findUnique({
        where: { classroomId_studentKey: { classroomId: classroom.id, studentKey: key } },
        select: { id: true, displayName: true },
      });
      if (!member) {
        return NextResponse.json({ error: "اول عضو کلاس شو" }, { status: 404 });
      }
      memberDisplayName = member.displayName;
      // به‌روزرسانی خاموشِ آخرین فعالیت
      db.classMember
        .update({ where: { id: member.id }, data: { lastActiveAt: new Date() } })
        .catch(() => undefined);
    }

    const quiz = await db.liveQuiz.findFirst({
      where: { classroomId: classroom.id, status: "active" },
      orderBy: { startedAt: "desc" },
    });

    // اگر آزمون فعالی نیست
    if (!quiz) {
      return role === "teacher"
        ? NextResponse.json({ live: null, question: null, answeredCount: 0, leaderboard: [] })
        : NextResponse.json({ live: null, question: null, answered: null, me: { displayName: memberDisplayName } });
    }

    const ids = parseQuestionIds(quiz.questionIds);
    const live = {
      id: quiz.id,
      status: quiz.status,
      currentIndex: quiz.currentIndex,
      questionCount: ids.length,
    };

    if (role === "teacher") {
      const payload = await teacherLivePayload(quiz);
      return NextResponse.json(payload);
    }

    // دانش‌آموز: سؤال جاری فقط وقتی آزمون فعال است — بدون فیلد answer (ضدتقلب)
    let question: { text: string; options: string[] } | null = null;
    if (quiz.status === "active") {
      const qid = ids[quiz.currentIndex] ?? null;
      const q = qid ? await db.question.findUnique({ where: { id: qid } }) : null;
      if (q) question = { text: q.text, options: parseOptions(q.options) };
    }

    // پاسخ قبلی خود دانش‌آموز برای همین index
    const mine = await db.liveAnswer.findUnique({
      where: {
        quizId_studentKey_index: {
          quizId: quiz.id,
          studentKey: key,
          index: quiz.currentIndex,
        },
      },
      select: { index: true, choice: true, correct: true },
    });

    return NextResponse.json({
      live,
      question,
      answered: mine ? { index: mine.index, choice: mine.choice, correct: mine.correct } : null,
      // نام نمایشی واقعی عضو — UI باید برای ثبت پاسخ از همین استفاده کند نه نام کلاس
      me: { displayName: memberDisplayName },
    });
  } catch (e) {
    console.error("GET /api/class/[code]/live error:", e);
    return NextResponse.json({ error: "دریافت وضعیت آزمون زنده ممکن نشد" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  try {
    const { code } = await ctx.params;
    if (!isValidCode(code)) {
      return NextResponse.json({ error: "کد کلاس باید ۶ رقم باشد" }, { status: 400 });
    }

    let body: {
      studentKey?: unknown;
      displayName?: unknown;
      quizId?: unknown;
      index?: unknown;
      choice?: unknown;
      ms?: unknown;
    };
    try {
      body = (await req.json()) as typeof body;
    } catch {
      return NextResponse.json({ error: "داده ارسالی نامعتبر است" }, { status: 400 });
    }

    const studentKey = cleanKey(typeof body.studentKey === "string" ? body.studentKey : "");
    if (!isValidKey(studentKey)) {
      return NextResponse.json({ error: "کلید دانش‌آموز نامعتبر است" }, { status: 400 });
    }
    const displayName = typeof body.displayName === "string" ? body.displayName.trim() : "";
    if (displayName.length < 2 || displayName.length > 30) {
      return NextResponse.json(
        { error: "نام نمایشی باید بین ۲ تا ۳۰ نویسه باشد" },
        { status: 400 },
      );
    }
    const quizId =
      typeof body.quizId === "string" && body.quizId.trim().length >= 1 && body.quizId.trim().length <= 64
        ? body.quizId.trim()
        : null;
    if (!quizId) {
      return NextResponse.json({ error: "شناسه آزمون نامعتبر است" }, { status: 400 });
    }
    const index = toIntOrNull(body.index);
    if (index === null || index < 0 || index > 1000) {
      return NextResponse.json({ error: "شماره سؤال نامعتبر است" }, { status: 400 });
    }
    // clamp سخت choice 0..3 و ms 0..60000
    const rawChoice = toIntOrNull(body.choice);
    const choice = rawChoice === null ? -1 : Math.min(3, Math.max(0, rawChoice));
    const rawMs = toIntOrNull(body.ms);
    const ms = rawMs === null ? 0 : Math.min(60000, Math.max(0, rawMs));

    const classroom = await db.classroom.findUnique({ where: { code: code.trim() } });
    if (!classroom) {
      return NextResponse.json({ error: "کلاسی با این کد پیدا نشد" }, { status: 404 });
    }

    const quiz = await db.liveQuiz.findUnique({ where: { id: quizId } });
    if (!quiz || quiz.classroomId !== classroom.id) {
      return NextResponse.json({ error: "آزمون پیدا نشد" }, { status: 404 });
    }
    if (quiz.status !== "active") {
      return NextResponse.json({ error: "آزمون فعال نیست" }, { status: 400 });
    }
    if (index !== quiz.currentIndex) {
      return NextResponse.json({ error: "هنوز وقت این سؤال نیست" }, { status: 400 });
    }

    const member = await db.classMember.findUnique({
      where: { classroomId_studentKey: { classroomId: classroom.id, studentKey } },
      select: { id: true },
    });
    if (!member) {
      return NextResponse.json({ error: "اول عضو کلاس شو" }, { status: 403 });
    }

    const ids = parseQuestionIds(quiz.questionIds);
    const qid = ids[quiz.currentIndex] ?? null;
    const question = qid ? await db.question.findUnique({ where: { id: qid } }) : null;
    if (!question) {
      return NextResponse.json({ error: "سؤال این مرحله پیدا نشد" }, { status: 400 });
    }

    // پاسخ قبلی؟ همان رکورد اول برگردد — بدون دوباره‌نویسی
    const existing = await db.liveAnswer.findUnique({
      where: { quizId_studentKey_index: { quizId: quiz.id, studentKey, index } },
      select: { correct: true },
    });
    if (existing) {
      const answeredCount = await db.liveAnswer.count({
        where: { quizId: quiz.id, index },
      });
      return NextResponse.json({ correct: existing.correct, answeredCount });
    }

    const correct = choice === question.answer;
    await db.liveAnswer.create({
      data: {
        quizId: quiz.id,
        studentKey,
        displayName,
        index,
        correct,
        ms,
        choice,
        content: question.text,
      },
    });

    const answeredCount = await db.liveAnswer.count({
      where: { quizId: quiz.id, index },
    });

    return NextResponse.json({ correct, answeredCount });
  } catch (e) {
    console.error("PUT /api/class/[code]/live error:", e);
    return NextResponse.json({ error: "ثبت پاسخ ممکن نشد" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  try {
    const { code } = await ctx.params;
    if (!isValidCode(code)) {
      return NextResponse.json({ error: "کد کلاس باید ۶ رقم باشد" }, { status: 400 });
    }

    let body: { teacherKey?: unknown; action?: unknown };
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

    const action = body.action === "next" || body.action === "finish" ? body.action : null;
    if (!action) {
      return NextResponse.json({ error: "عملکرد باید next یا finish باشد" }, { status: 400 });
    }

    const quiz = await db.liveQuiz.findFirst({
      where: { classroomId: classroom.id, status: "active" },
      orderBy: { startedAt: "desc" },
    });
    if (!quiz) {
      return NextResponse.json({ error: "آزمون فعالی وجود ندارد" }, { status: 400 });
    }

    const ids = parseQuestionIds(quiz.questionIds);
    const shouldFinish = action === "finish" || quiz.currentIndex + 1 >= ids.length;

    let updated;
    if (shouldFinish) {
      updated = await db.liveQuiz.update({
        where: { id: quiz.id },
        data: { status: "finished", endedAt: new Date() },
      });
      // اعلان پایان آزمون برای همهٔ اعضا
      await db.notification.create({
        data: { classroomId: classroom.id, targetKey: "*", text: "🏁 آزمون زنده تمام شد" },
      });
    } else {
      updated = await db.liveQuiz.update({
        where: { id: quiz.id },
        data: { currentIndex: quiz.currentIndex + 1 },
      });
    }

    const payload = await teacherLivePayload(updated);
    return NextResponse.json(payload);
  } catch (e) {
    console.error("PATCH /api/class/[code]/live error:", e);
    return NextResponse.json({ error: "به‌روزرسانی آزمون زنده ممکن نشد" }, { status: 500 });
  }
}
