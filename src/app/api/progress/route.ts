import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * همگام‌سازی پیشرفت (فاز ۱) — اسنپ‌شات کامل کلیدهای visionone:* کاربر.
 * GET: خواندن اسنپ‌شات سرور · PUT: جایگزینی کامل با اسنپ‌شات کلاینت (ادغام سمت کلاینت انجام شده).
 * سقف‌ها: ۴MB کل، ۵۱۲KB هر مقدار، ۳۰۰۰ کلید.
 */

const MAX_TOTAL = 4 * 1024 * 1024;
const MAX_VALUE = 512 * 1024;
const MAX_KEYS = 3000;

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "ابتدا وارد شو" }, { status: 401 });
  }
  const rows = await db.progress.findMany({
    where: { userId: session.user.id },
    select: { key: true, value: true },
  });
  const data: Record<string, string> = {};
  for (const r of rows) data[r.key] = r.value;
  return NextResponse.json({ ok: true, data, count: rows.length });
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "ابتدا وارد شو" }, { status: 401 });
    }
    const userId = session.user.id;

    const body = (await req.json()) as { data?: Record<string, string> };
    const raw = body.data;
    if (!raw || typeof raw !== "object") {
      return NextResponse.json({ error: "داده نامعتبر" }, { status: 400 });
    }

    const entries = Object.entries(raw).filter(
      ([k, v]) => k.startsWith("visionone:") && typeof v === "string" && v.length <= MAX_VALUE,
    );
    if (entries.length > MAX_KEYS) {
      return NextResponse.json({ error: "تعداد کلیدها بیش از حد مجاز" }, { status: 413 });
    }
    if (entries.reduce((s, [, v]) => s + v.length, 0) > MAX_TOTAL) {
      return NextResponse.json({ error: "حجم داده بیش از حد مجاز" }, { status: 413 });
    }

    await db.$transaction(async (tx) => {
      await tx.progress.deleteMany({ where: { userId } });
      if (entries.length) {
        // درج دسته‌ای تکه‌تکه برای جلوگیری از محدودیت پارامتر SQLite
        const CHUNK = 80;
        for (let i = 0; i < entries.length; i += CHUNK) {
          await tx.progress.createMany({
            data: entries.slice(i, i + CHUNK).map(([key, value]) => ({ userId, key, value })),
          });
        }
      }
    });

    return NextResponse.json({ ok: true, count: entries.length });
  } catch (e) {
    console.error("PUT /api/progress error:", e);
    return NextResponse.json({ error: "ذخیره پیشرفت ممکن نشد" }, { status: 500 });
  }
}
