import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * کلاس مجازی — فاز ۹ نقشه راه جامع.
 * POST: معلم کلاس می‌سازد — کد ۶ رقمی یکتا تولید و teacherKey (uuid) یک‌بار تحویل می‌شود.
 * بدون نیاز به لاگین؛ هویت معلم فقط با teacherKey دستگاه حفظ می‌شود.
 */

const MAX_CODE_ATTEMPTS = 10;

function randomCode(): string {
  // کد ۶ رقمی از ۱۰۰۰۰۰ تا ۹۹۹۹۹۹ — همیشه ۶ رقم
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function POST(req: NextRequest) {
  try {
    let body: { name?: unknown; teacherName?: unknown; book?: unknown };
    try {
      body = (await req.json()) as typeof body;
    } catch {
      return NextResponse.json({ error: "داده ارسالی نامعتبر است" }, { status: 400 });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const teacherName = typeof body.teacherName === "string" ? body.teacherName.trim() : "";
    const book = typeof body.book === "string" && body.book.trim() !== "" ? body.book.trim() : "vision-one";

    if (name.length < 2 || name.length > 60) {
      return NextResponse.json(
        { error: "نام کلاس باید بین ۲ تا ۶۰ نویسه باشد" },
        { status: 400 },
      );
    }
    if (teacherName.length < 2 || teacherName.length > 40) {
      return NextResponse.json(
        { error: "نام معلم باید بین ۲ تا ۴۰ نویسه باشد" },
        { status: 400 },
      );
    }

    // تولید کد ۶ رقمی یکتا — حداکثر ۱۰ تلاش با چک db
    let code: string | null = null;
    for (let i = 0; i < MAX_CODE_ATTEMPTS; i++) {
      const candidate = randomCode();
      const exists = await db.classroom.findUnique({ where: { code: candidate }, select: { id: true } });
      if (!exists) {
        code = candidate;
        break;
      }
    }
    if (!code) {
      return NextResponse.json(
        { error: "ساخت کلاس ممکن نشد — لطفاً دوباره تلاش کنید" },
        { status: 500 },
      );
    }

    const teacherKey = crypto.randomUUID();

    const classroom = await db.classroom.create({
      data: { code, name, teacherName, teacherKey, book },
    });

    return NextResponse.json(
      { code: classroom.code, teacherKey: classroom.teacherKey, name: classroom.name },
      { status: 201 },
    );
  } catch (e) {
    console.error("POST /api/class error:", e);
    return NextResponse.json({ error: "ساخت کلاس ممکن نشد" }, { status: 500 });
  }
}
