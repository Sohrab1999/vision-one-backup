import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPin, USERNAME_RE, PIN_RE, rateLimit, clientIp } from "@/lib/auth";

export const dynamic = "force-dynamic";

const AVATARS = ["🦁", "🐼", "🦊", "🐧", "🐢", "🦉", "🐬", "🌟", "⚡", "🎯", "📚", "🚀"];
const GRADES = ["هفتم", "هشتم", "نهم", "دهم", "یازدهم", "دوازدهم"];

/** ساخت حساب: نام کاربری + کد ۴ رقمی (+ پایه و آواتار اختیاری) */
export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(`register:${clientIp(req)}`, 6, 60_000)) {
      return NextResponse.json({ error: "تلاش‌های زیاد — کمی صبر کن" }, { status: 429 });
    }

    const body = (await req.json()) as {
      username?: string;
      pin?: string;
      grade?: string;
      avatar?: string;
    };

    const username = body.username?.trim() ?? "";
    const pin = body.pin ?? "";

    if (!USERNAME_RE.test(username)) {
      return NextResponse.json(
        { error: "نام کاربری باید ۳ تا ۲۰ نویسه باشد (حروف، عدد یا _)" },
        { status: 400 },
      );
    }
    if (!PIN_RE.test(pin)) {
      return NextResponse.json({ error: "کد باید دقیقاً ۴ رقم باشد" }, { status: 400 });
    }

    const exists = await db.user.findUnique({ where: { username } });
    if (exists) {
      return NextResponse.json({ error: "این نام کاربری قبلاً گرفته شده" }, { status: 409 });
    }

    const grade = GRADES.includes(body.grade ?? "") ? body.grade : null;
    const avatar = AVATARS.includes(body.avatar ?? "") ? body.avatar : null;

    const user = await db.user.create({
      data: { username, pinHash: hashPin(pin), grade, avatar },
    });

    return NextResponse.json({ ok: true, id: user.id });
  } catch (e) {
    console.error("POST /api/auth/register error:", e);
    return NextResponse.json({ error: "ساخت حساب ممکن نشد" }, { status: 500 });
  }
}
