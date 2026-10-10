import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRate, rateLimited } from "../_lib/rate-limit";
import { logEvent } from "../_lib/logger";

export const dynamic = "force-dynamic";

/**
 * نظرسنجی ۱۰ جلسه — فاز ۱۲ (رشد): امتیاز ۱..۵ بدون حساب، با حداقل داده (حریم خصوصی نوجوان).
 *
 * POST {score, text?, userKey} → ثبت پاسخ (سقف ۵ در روز برای هر IP)
 * GET → آمار تجمیعی {count, avg, dist} با groupBy — بدون هیچ متن کاربران
 *
 * سقف‌ها: score عدد صحیح ۱..۵ (خارج بازه ۴۰۰ — clamp نمی‌شود) ·
 *         text تریم‌شده ≤ ۲۰۰ نویسه یا null · userKey ۸..۶۴ نویسه
 */

const KEY_MIN = 8;
const KEY_MAX = 64;
const TEXT_MAX = 200;

/** کلید دستگاه معتبر: رشتهٔ تریم‌شدهٔ ۸..۶۴ نویسه (UUID از localStorage کلاینت) */
function cleanKey(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const k = v.trim();
  if (k.length < KEY_MIN || k.length > KEY_MAX) return null;
  return k;
}

export async function POST(req: NextRequest) {
  // سقف ۵ در روز برای هر IP — نظرسنجی هر دستگاه عملاً یک‌بار
  const rl = checkRate(req, "survey:post", 5, 86_400_000);
  if (!rl.ok) { logEvent("survey", "rate-limited"); return rateLimited(rl.retryAfter); }
  try {
    let body: { score?: unknown; text?: unknown; userKey?: unknown };
    try {
      body = (await req.json()) as typeof body;
    } catch {
      return NextResponse.json({ error: "داده ارسالی نامعتبر است" }, { status: 400 });
    }

    const userKey = cleanKey(body.userKey);
    if (!userKey) {
      return NextResponse.json({ error: "کلید دستگاه نامعتبر است" }, { status: 400 });
    }

    // امتیاز: عدد صحیح ۱..۵ — خارج از بازه رد می‌شود (بدون clamp)
    if (
      typeof body.score !== "number" ||
      !Number.isInteger(body.score) ||
      body.score < 1 ||
      body.score > 5
    ) {
      return NextResponse.json({ error: "امتیاز باید ۱ تا ۵ باشد" }, { status: 400 });
    }
    const score = body.score;

    // توضیح اختیاری: خالی → null؛ بیش از ۲۰۰ نویسه → 400
    let text: string | null = null;
    if (body.text !== undefined && body.text !== null) {
      if (typeof body.text !== "string") {
        return NextResponse.json({ error: "توضیح نامعتبر است" }, { status: 400 });
      }
      const t = body.text.trim();
      if (t.length > TEXT_MAX) {
        return NextResponse.json(
          { error: "توضیح حداکثر ۲۰۰ نویسه است" },
          { status: 400 },
        );
      }
      if (t.length > 0) text = t;
    }

    await db.surveyResponse.create({ data: { score, text, userKey } });
    logEvent("survey", "submitted", { score, withText: text !== null });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error("POST /api/survey error:", e);
    return NextResponse.json({ error: "ثبت نظرسنجی ممکن نشد" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const rl = checkRate(req, "survey:get", 60, 60_000);
  if (!rl.ok) { logEvent("survey", "rate-limited"); return rateLimited(rl.retryAfter); }
  try {
    // فقط آمار تجمیعی — متن کاربران هرگز از دیتابیس بیرون نمی‌رود
    const grouped = await db.surveyResponse.groupBy({
      by: ["score"],
      _count: { score: true },
    });

    const dist: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let count = 0;
    let weighted = 0;
    for (const g of grouped) {
      const n = g._count.score;
      if (g.score >= 1 && g.score <= 5) {
        dist[g.score as 1 | 2 | 3 | 4 | 5] = n;
        count += n;
        weighted += n * g.score;
      }
    }

    // میانگین با یک رقم اعشار (۰ اگر رأیی نباشد)
    const avg = count > 0 ? Math.round((weighted / count) * 10) / 10 : 0;
    return NextResponse.json({ ok: true, count, avg, dist });
  } catch (e) {
    console.error("GET /api/survey error:", e);
    return NextResponse.json({ error: "دریافت آمار نظرسنجی ممکن نشد" }, { status: 500 });
  }
}
