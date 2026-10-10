import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { buildClassState, cleanKey, isValidCode, isValidKey } from "../_lib/state";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ code: string }> };

/**
 * state کامل کلاس — فاز ۹ نقشه راه جامع.
 * GET  ?key=&role=teacher|student → داشبورد معلم / نمای دانش‌آموز
 * DELETE ?key=teacherKey → حذف کامل کلاس (Cascade)
 */
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
      // به‌روزرسانی خاموشِ آخرین فعالیت — پاسخ را مسدود نمی‌کند
      db.classMember
        .update({ where: { id: member.id }, data: { lastActiveAt: new Date() } })
        .catch(() => undefined);
    }

    const state = await buildClassState(classroom, role, key);
    return NextResponse.json(state);
  } catch (e) {
    console.error("GET /api/class/[code] error:", e);
    return NextResponse.json({ error: "دریافت وضعیت کلاس ممکن نشد" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  try {
    const { code } = await ctx.params;
    if (!isValidCode(code)) {
      return NextResponse.json({ error: "کد کلاس باید ۶ رقم باشد" }, { status: 400 });
    }
    const key = cleanKey(new URL(req.url).searchParams.get("key") ?? "");
    if (!isValidKey(key)) {
      return NextResponse.json({ error: "کلید نامعتبر است" }, { status: 400 });
    }

    const classroom = await db.classroom.findUnique({ where: { code: code.trim() } });
    if (!classroom) {
      return NextResponse.json({ error: "کلاسی با این کد پیدا نشد" }, { status: 404 });
    }
    if (key !== classroom.teacherKey) {
      return NextResponse.json({ error: "دسترسی معلم تأیید نشد" }, { status: 403 });
    }

    await db.classroom.delete({ where: { id: classroom.id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/class/[code] error:", e);
    return NextResponse.json({ error: "حذف کلاس ممکن نشد" }, { status: 500 });
  }
}
