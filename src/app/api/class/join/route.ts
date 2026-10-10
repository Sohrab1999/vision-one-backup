import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { buildClassState, cleanKey, isValidCode, isValidKey } from "../_lib/state";

export const dynamic = "force-dynamic";

/**
 * پیوستن دانش‌آموز به کلاس با کد ۶ رقمی — بدون ایمیل، فقط با کلید دستگاه.
 * پاسخ: state کامل کلاس مثل GET /api/class/[code] با نقش student.
 */
export async function POST(req: NextRequest) {
  try {
    let body: { code?: unknown; studentKey?: unknown; displayName?: unknown };
    try {
      body = (await req.json()) as typeof body;
    } catch {
      return NextResponse.json({ error: "داده ارسالی نامعتبر است" }, { status: 400 });
    }

    const code = typeof body.code === "string" ? body.code.trim() : "";
    const studentKey = cleanKey(typeof body.studentKey === "string" ? body.studentKey : "");
    const displayName = typeof body.displayName === "string" ? body.displayName.trim() : "";

    if (!isValidCode(code)) {
      return NextResponse.json({ error: "کد کلاس باید ۶ رقم باشد" }, { status: 400 });
    }
    if (!isValidKey(studentKey)) {
      return NextResponse.json({ error: "کلید دانش‌آموز نامعتبر است" }, { status: 400 });
    }
    if (displayName.length < 2 || displayName.length > 30) {
      return NextResponse.json(
        { error: "نام نمایشی باید بین ۲ تا ۳۰ نویسه باشد" },
        { status: 400 },
      );
    }

    const classroom = await db.classroom.findUnique({ where: { code } });
    if (!classroom) {
      return NextResponse.json({ error: "کلاسی با این کد پیدا نشد" }, { status: 404 });
    }

    // آپ‌سل عضو: joinedAt فقط در ورود اول ثبت می‌شود، lastActiveAt همیشه تازه می‌شود
    await db.classMember.upsert({
      where: {
        classroomId_studentKey: { classroomId: classroom.id, studentKey },
      },
      update: { lastActiveAt: new Date() },
      create: { classroomId: classroom.id, studentKey, displayName },
    });

    const state = await buildClassState(classroom, "student", studentKey);
    return NextResponse.json(state);
  } catch (e) {
    console.error("POST /api/class/join error:", e);
    return NextResponse.json({ error: "پیوستن به کلاس ممکن نشد" }, { status: 500 });
  }
}
