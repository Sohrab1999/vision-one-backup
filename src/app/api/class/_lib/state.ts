import { db } from "@/lib/db";

/**
 * منطق مشترک «کلاس مجازی» — فاز ۹ نقشه راه جامع.
 * ساخت state کامل کلاس برای GET و join + اعتبارسنجی کلیدها.
 */

export type ClassRole = "teacher" | "student";

export interface ClassroomRow {
  id: string;
  code: string;
  name: string;
  teacherName: string;
  teacherKey: string;
  book: string;
  createdAt: Date;
}

export interface LiveSummary {
  id: string;
  status: string;
  currentIndex: number;
  questionCount: number;
}

/** کلید معتبر (معلم/دانش‌آموز): ۸ تا ۶۴ نویسه پس از trim */
export function isValidKey(key: unknown): key is string {
  return (
    typeof key === "string" && key.trim().length >= 8 && key.trim().length <= 64
  );
}

/** کلید تمیزشده (trim) */
export function cleanKey(key: string): string {
  return key.trim();
}

/** کد کلاس معتبر: دقیقاً ۶ رقم */
export function isValidCode(code: unknown): code is string {
  return typeof code === "string" && /^\d{6}$/.test(code.trim());
}

/** خلاصهٔ آخرین آزمون کلاس (هر وضعیتی) یا null */
export async function getLatestQuizSummary(
  classroomId: string,
): Promise<LiveSummary | null> {
  const quiz = await db.liveQuiz.findFirst({
    where: { classroomId },
    orderBy: { startedAt: "desc" },
    select: { id: true, status: true, currentIndex: true, questionIds: true },
  });
  if (!quiz) return null;
  let questionCount = 0;
  try {
    const ids = JSON.parse(quiz.questionIds) as unknown;
    if (Array.isArray(ids)) questionCount = ids.length;
  } catch {
    questionCount = 0;
  }
  return {
    id: quiz.id,
    status: quiz.status,
    currentIndex: quiz.currentIndex,
    questionCount,
  };
}

/**
 * state کامل کلاس برای نقش فعلی — قرارداد مشترک UI:
 * { classroom, role, members? (فقط معلم), assignments, notifications, unreadCount, problem? (فقط معلم), live }
 */
export async function buildClassState(
  classroom: ClassroomRow,
  role: ClassRole,
  key: string,
) {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [memberRows, assignmentRows, notificationRows, unreadCount, live] =
    await Promise.all([
      db.classMember.findMany({
        where: { classroomId: classroom.id },
        orderBy: { joinedAt: "asc" },
      }),
      db.assignment.findMany({
        where: { classroomId: classroom.id },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          kind: true,
          lesson: true,
          questionCount: true,
          dueAt: true,
          createdAt: true,
          dones: { select: { studentKey: true } },
        },
      }),
      db.notification.findMany({
        where: {
          classroomId: classroom.id,
          OR: [{ targetKey: key }, { targetKey: "*" }],
        },
        orderBy: { createdAt: "desc" },
        take: 50,
        select: { id: true, text: true, createdAt: true, readAt: true },
      }),
      db.notification.count({
        where: {
          classroomId: classroom.id,
          readAt: null,
          OR: [{ targetKey: key }, { targetKey: "*" }],
        },
      }),
      getLatestQuizSummary(classroom.id),
    ]);

  let members:
    | Array<{
        studentKey: string;
        displayName: string;
        joinedAt: string;
        lastActiveAt: string;
        attempts7d: number;
        avgScore7d: number | null;
        assignmentsDone: number;
      }>
    | undefined;
  let problem:
    | {
        liveWrong: Array<{ content: string; count: number }>;
        weekSummary: {
          attempts: number;
          avgPercent: number | null;
          activeMembers: number;
        };
      }
    | undefined;

  if (role === "teacher") {
    const names = memberRows.map((m) => m.displayName);
    const [attempts, wrongAgg] = await Promise.all([
      db.attempt.findMany({
        where: {
          book: classroom.book,
          name: { in: names },
          createdAt: { gte: weekAgo },
        },
        select: { name: true, total: true, correct: true },
      }),
      db.liveAnswer.groupBy({
        by: ["content"],
        where: {
          correct: false,
          content: { not: "" },
          quiz: { classroomId: classroom.id },
        },
        _count: true,
        orderBy: { _count: { content: "desc" } },
        take: 8,
      }),
    ]);

    // تجمیع تلاش‌های ۷ روز اخیر به تفکیک نام دانش‌آموز
    const byName = new Map<string, { attempts: number; percents: number[] }>();
    for (const a of attempts) {
      const nm = a.name ?? "";
      if (!nm) continue;
      let agg = byName.get(nm);
      if (!agg) {
        agg = { attempts: 0, percents: [] };
        byName.set(nm, agg);
      }
      agg.attempts += 1;
      if (a.total > 0) agg.percents.push((a.correct / a.total) * 100);
    }

    // شمار تکلیف‌های انجام‌شدهٔ هر عضو
    const doneByStudent = new Map<string, number>();
    for (const a of assignmentRows) {
      for (const d of a.dones) {
        doneByStudent.set(d.studentKey, (doneByStudent.get(d.studentKey) ?? 0) + 1);
      }
    }

    members = memberRows.map((m) => {
      const agg = byName.get(m.displayName);
      return {
        studentKey: m.studentKey,
        displayName: m.displayName,
        joinedAt: m.joinedAt.toISOString(),
        lastActiveAt: m.lastActiveAt.toISOString(),
        attempts7d: agg?.attempts ?? 0,
        avgScore7d:
          agg && agg.percents.length
            ? Math.round(
                agg.percents.reduce((s, p) => s + p, 0) / agg.percents.length,
              )
            : null,
        assignmentsDone: doneByStudent.get(m.studentKey) ?? 0,
      };
    });

    // خلاصهٔ هفتگی کل کلاس
    const totalAttempts = attempts.length;
    const percentSum = attempts.reduce(
      (s, a) => s + (a.total > 0 ? (a.correct / a.total) * 100 : 0),
      0,
    );
    problem = {
      liveWrong: wrongAgg.map((w) => ({ content: w.content, count: w._count })),
      weekSummary: {
        attempts: totalAttempts,
        avgPercent:
          totalAttempts > 0 ? Math.round(percentSum / totalAttempts) : null,
        activeMembers: new Set(
          attempts.map((a) => a.name).filter((n): n is string => Boolean(n)),
        ).size,
      },
    };
  }

  const assignments = assignmentRows.map((a) => ({
    id: a.id,
    title: a.title,
    kind: a.kind,
    lesson: a.lesson,
    questionCount: a.questionCount,
    dueAt: a.dueAt ? a.dueAt.toISOString() : null,
    createdAt: a.createdAt.toISOString(),
    doneCount: a.dones.length,
    done: a.dones.some((d) => d.studentKey === key),
  }));

  const notifications = notificationRows.map((n) => ({
    id: n.id,
    text: n.text,
    createdAt: n.createdAt.toISOString(),
    read: n.readAt !== null,
  }));

  return {
    classroom: {
      code: classroom.code,
      name: classroom.name,
      teacherName: classroom.teacherName,
      book: classroom.book,
      createdAt: classroom.createdAt.toISOString(),
    },
    role,
    ...(role === "teacher" ? { members } : {}),
    assignments,
    notifications,
    unreadCount,
    ...(role === "teacher" ? { problem } : {}),
    live,
  };
}
