import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cleanKey, isValidCode, isValidKey } from "../../_lib/state";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ code: string }> };

/**
 * اعلان‌های داخل اپ کلاس — فاز ۹ نقشه راه جامع (بدون پیامک/ایمیل).
 * POST: معلم اعلان می‌فرستد (targetKey خالی = همهٔ اعضا).
 * PUT: علامت‌گذاری همهٔ اعلان‌های خوانده‌نشدهٔ یک کلید به‌عنوان خوانده‌شده.
 */
export async function POST(req: NextRequest, ctx: Ctx) {
  try {
    const { code } = await ctx.params;
    if (!isValidCode(code)) {
      return NextResponse.json({ error: "کد کلاس باید ۶ رقم باشد" }, { status: 400 });
    }

    let body: { teacherKey?: unknown; text?: unknown; targetKey?: unknown };
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

    const text = typeof body.text === "string" ? body.text.trim() : "";
    if (text.length < 2 || text.length > 200) {
      return NextResponse.json(
        { error: "متن اعلان باید بین ۲ تا ۲۰۰ نویسه باشد" },
        { status: 400 },
      );
    }

    // targetKey خالی = "*" برای همهٔ اعضا
    let targetKey = "*";
    if (typeof body.targetKey === "string" && body.targetKey.trim() !== "") {
      const t = cleanKey(body.targetKey);
      if (!isValidKey(t)) {
        return NextResponse.json({ error: "کلید گیرنده نامعتبر است" }, { status: 400 });
      }
      targetKey = t;
    }

    const notification = await db.notification.create({
      data: { classroomId: classroom.id, targetKey, text },
    });

    return NextResponse.json(
      {
        notification: {
          id: notification.id,
          text: notification.text,
          targetKey: notification.targetKey,
          createdAt: notification.createdAt.toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (e) {
    console.error("POST /api/class/[code]/notifications error:", e);
    return NextResponse.json({ error: "ارسال اعلان ممکن نشد" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  try {
    const { code } = await ctx.params;
    if (!isValidCode(code)) {
      return NextResponse.json({ error: "کد کلاس باید ۶ رقم باشد" }, { status: 400 });
    }

    let body: { key?: unknown };
    try {
      body = (await req.json()) as typeof body;
    } catch {
      return NextResponse.json({ error: "داده ارسالی نامعتبر است" }, { status: 400 });
    }

    const key = cleanKey(typeof body.key === "string" ? body.key : "");
    if (!isValidKey(key)) {
      return NextResponse.json({ error: "کلید نامعتبر است" }, { status: 400 });
    }

    const classroom = await db.classroom.findUnique({
      where: { code: code.trim() },
      select: { id: true },
    });
    if (!classroom) {
      return NextResponse.json({ error: "کلاسی با این کد پیدا نشد" }, { status: 404 });
    }

    const result = await db.notification.updateMany({
      where: {
        classroomId: classroom.id,
        readAt: null,
        OR: [{ targetKey: key }, { targetKey: "*" }],
      },
      data: { readAt: new Date() },
    });

    return NextResponse.json({ ok: true, marked: result.count });
  } catch (e) {
    console.error("PUT /api/class/[code]/notifications error:", e);
    return NextResponse.json({ error: "علامت‌گذاری اعلان‌ها ممکن نشد" }, { status: 500 });
  }
}
