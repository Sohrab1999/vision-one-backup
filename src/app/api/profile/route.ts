import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkRate, rateLimited } from "../_lib/rate-limit";
import { logEvent } from "../_lib/logger";

export const dynamic = "force-dynamic";

const GRADES = ["هفتم", "هشتم", "نهم", "دهم", "یازدهم", "دوازدهم"];
const AVATARS = ["🦁", "🐼", "🦊", "🐧", "🐢", "🦉", "🐬", "🌟", "⚡", "🎯", "📚", "🚀"];

/** پروفایل کاربر: خواندن حساب + ویرایش آواتار/پایه */
export async function GET(req: NextRequest) {
  const rl = checkRate(req, "profile:get", 90, 60_000);
  if (!rl.ok) { logEvent("profile", "rate-limited"); return rateLimited(rl.retryAfter); }
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
  const rl = checkRate(req, "profile:patch", 30, 60_000);
  if (!rl.ok) { logEvent("profile", "rate-limited"); return rateLimited(rl.retryAfter); }
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

/** حذف کامل حساب (فاز ۱۱ — حریم خصوصی) — با عبارت تأیید دقیق؛ کسکید همه داده‌ها در اسکیما */
export async function DELETE(req: NextRequest) {
  const rl = checkRate(req, "profile:delete", 5, 3_600_000);
  if (!rl.ok) { logEvent("profile", "rate-limited"); return rateLimited(rl.retryAfter); }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "ابتدا وارد شو" }, { status: 401 });
  }

  let body: { confirm?: unknown };
  try {
    body = (await req.json()) as { confirm?: unknown };
  } catch {
    return NextResponse.json({ error: "برای تأیید، عبارت دقیق را وارد کن" }, { status: 400 });
  }
  if (body?.confirm !== "حسابم را پاک کن") {
    return NextResponse.json({ error: "برای تأیید، عبارت دقیق را وارد کن" }, { status: 400 });
  }

  try {
    await db.user.delete({ where: { id: session.user.id } });
  } catch (e) {
    console.error("DELETE /api/profile error:", e);
    return NextResponse.json({ error: "حذف حساب ممکن نشد" }, { status: 500 });
  }

  logEvent("profile", "account-deleted");
  return NextResponse.json({ ok: true });
}
