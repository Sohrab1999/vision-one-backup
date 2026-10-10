import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

const GRADES = ["هفتم", "هشتم", "نهم", "دهم", "یازدهم", "دوازدهم"];
const AVATARS = ["🦁", "🐼", "🦊", "🐧", "🐢", "🦉", "🐬", "🌟", "⚡", "🎯", "📚", "🚀"];

/** پروفایل کاربر: خواندن حساب + ویرایش آواتار/پایه */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "ابتدا وارد شو" }, { status: 401 });
  }
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { username: true, avatar: true, grade: true, createdAt: true },
  });
  if (!user) return NextResponse.json({ error: "کاربر پیدا نشد" }, { status: 404 });

  // آمار شخصی: تعداد آزمون‌های ثبت‌شده با این حساب
  const attempts = await db.attempt.count({ where: { userId: session.user.id } });

  return NextResponse.json({ ok: true, user, attempts });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "ابتدا وارد شو" }, { status: 401 });
  }
  const body = (await req.json()) as { avatar?: string; grade?: string };
  const data: { avatar?: string | null; grade?: string | null } = {};
  if (body.avatar !== undefined) data.avatar = AVATARS.includes(body.avatar) ? body.avatar : null;
  if (body.grade !== undefined) data.grade = GRADES.includes(body.grade) ? body.grade : null;

  const user = await db.user.update({
    where: { id: session.user.id },
    data,
    select: { username: true, avatar: true, grade: true },
  });
  return NextResponse.json({ ok: true, user });
}
