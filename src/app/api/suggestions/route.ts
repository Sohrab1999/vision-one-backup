import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRate, rateLimited } from "../_lib/rate-limit";
import { logEvent } from "../_lib/logger";

export const dynamic = "force-dynamic";

/**
 * تختهٔ پیشنهادها — فاز ۱۲ (رشد): پیشنهاد و رأی بدون حساب، فقط با کلید دستگاه.
 *
 * GET  → ۳۰ پیشنهاد برتر (رأی نزولی، سپس تازه‌ترین) — ownerKey هرگز در پاسخ نمی‌آید
 * POST {text, voterKey} → پیشنهاد تازه (سقف سخت ۳ در ساعت برای هر IP)
 * PUT  {id, voterKey} → رأی دادن؛ رأی تکراری idempotent است (بدون افزایش)
 *
 * سقف‌ها: text ۳..۱۴۰ نویسه (فارسی/انگلیسی) · voterKey ۸..۶۴ نویسه
 * حریم خصوصی: در پاسخ‌ها فقط متن/رأی/زمان می‌آید — هیچ کلید دستگاهی دیگران لوح نمی‌شود.
 */

const TEXT_MIN = 3;
const TEXT_MAX = 140;
const KEY_MIN = 8;
const KEY_MAX = 64;
const TOP_LIMIT = 30;

/** کلید دستگاه معتبر: رشتهٔ تریم‌شدهٔ ۸..۶۴ نویسه (UUID از localStorage کلاینت) */
function cleanKey(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const k = v.trim();
  if (k.length < KEY_MIN || k.length > KEY_MAX) return null;
  return k;
}

/** شکل عمومی آیتم پیشنهاد در پاسخ‌ها — بدون ownerKey */
type SuggestionItem = {
  id: string;
  text: string;
  votes: number;
  createdAt: string;
};

function toItem(r: { id: string; text: string; votes: number; createdAt: Date }): SuggestionItem {
  return { id: r.id, text: r.text, votes: r.votes, createdAt: r.createdAt.toISOString() };
}

export async function GET(req: NextRequest) {
  const rl = checkRate(req, "suggestions:get", 60, 60_000);
  if (!rl.ok) { logEvent("suggestions", "rate-limited"); return rateLimited(rl.retryAfter); }
  try {
    const rows = await db.suggestion.findMany({
      orderBy: [{ votes: "desc" }, { createdAt: "desc" }],
      take: TOP_LIMIT,
      select: { id: true, text: true, votes: true, createdAt: true },
    });
    return NextResponse.json({ ok: true, items: rows.map(toItem) });
  } catch (e) {
    console.error("GET /api/suggestions error:", e);
    return NextResponse.json({ error: "دریافت پیشنهادها ممکن نشد" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  // سقف سخت ۳ در ساعت — جلوگیری از پر شدن تخته با اسپم
  const rl = checkRate(req, "suggestions:post", 3, 3_600_000);
  if (!rl.ok) { logEvent("suggestions", "rate-limited"); return rateLimited(rl.retryAfter); }
  try {
    let body: { text?: unknown; voterKey?: unknown };
    try {
      body = (await req.json()) as typeof body;
    } catch {
      return NextResponse.json({ error: "داده ارسالی نامعتبر است" }, { status: 400 });
    }

    const voterKey = cleanKey(body.voterKey);
    if (!voterKey) {
      return NextResponse.json({ error: "کلید دستگاه نامعتبر است" }, { status: 400 });
    }

    const text = typeof body.text === "string" ? body.text.trim() : "";
    if (text.length < TEXT_MIN || text.length > TEXT_MAX) {
      return NextResponse.json(
        { error: "متن پیشنهاد باید بین ۳ تا ۱۴۰ نویسه باشد" },
        { status: 400 },
      );
    }

    const row = await db.suggestion.create({ data: { text, ownerKey: voterKey } });
    logEvent("suggestions", "created", { len: text.length });
    return NextResponse.json({ ok: true, item: toItem(row) }, { status: 201 });
  } catch (e) {
    console.error("POST /api/suggestions error:", e);
    return NextResponse.json({ error: "ثبت پیشنهاد ممکن نشد" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const rl = checkRate(req, "suggestions:put", 30, 60_000);
  if (!rl.ok) { logEvent("suggestions", "rate-limited"); return rateLimited(rl.retryAfter); }
  try {
    let body: { id?: unknown; voterKey?: unknown };
    try {
      body = (await req.json()) as typeof body;
    } catch {
      return NextResponse.json({ error: "داده ارسالی نامعتبر است" }, { status: 400 });
    }

    const id = typeof body.id === "string" ? body.id.trim() : "";
    if (!id) {
      return NextResponse.json({ error: "شناسه پیشنهاد نامعتبر است" }, { status: 400 });
    }
    const voterKey = cleanKey(body.voterKey);
    if (!voterKey) {
      return NextResponse.json({ error: "کلید دستگاه نامعتبر است" }, { status: 400 });
    }

    const suggestion = await db.suggestion.findUnique({ where: { id } });
    if (!suggestion) {
      return NextResponse.json({ error: "پیشنهاد پیدا نشد" }, { status: 404 });
    }

    // رأی قبلی موجود است → بدون تغییر (idempotent)، فقط وضعیت فعلی برگردد
    const existing = await db.suggestionVote.findUnique({
      where: { suggestionId_voterKey: { suggestionId: id, voterKey } },
    });
    if (existing) {
      return NextResponse.json({ ok: true, votes: suggestion.votes });
    }

    try {
      // رأی تازه: ثبت رأی + افزایش شمارنده در یک تراکنش اتمیک
      const [, updated] = await db.$transaction([
        db.suggestionVote.create({ data: { suggestionId: id, voterKey } }),
        db.suggestion.update({ where: { id }, data: { votes: { increment: 1 } } }),
      ]);
      return NextResponse.json({ ok: true, votes: updated.votes });
    } catch (err) {
      // دو رأی هم‌زمان از یک دستگاه: نقض یکتایی (suggestionId, voterKey) → idempotent
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        (err as { code?: unknown }).code === "P2002"
      ) {
        const fresh = await db.suggestion.findUnique({
          where: { id },
          select: { votes: true },
        });
        return NextResponse.json({ ok: true, votes: fresh?.votes ?? suggestion.votes });
      }
      throw err;
    }
  } catch (e) {
    console.error("PUT /api/suggestions error:", e);
    return NextResponse.json({ error: "ثبت رأی ممکن نشد" }, { status: 500 });
  }
}
