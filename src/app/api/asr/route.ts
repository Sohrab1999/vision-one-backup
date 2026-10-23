import { NextRequest, NextResponse } from "next/server";
import { checkRate, rateLimited } from "../_lib/rate-limit";
import { consumeDailyQuota, userKeyOf } from "../_lib/ai-guard";
import { logEvent } from "../_lib/logger";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_BASE64 = 10 * 1024 * 1024; // ~7.5MB audio

// ── محافظ مصوب N1-2 فاز ۳-ج (سند: «نقشه راه ها/نقشه-راه-فاز-۳-N1-2.md») ──
const RATE_LIMIT = 20; // درخواست در دقیقه — مصوب مالک ۱۴۰۵/۸/۱ (۲۰۲۶-۱۰-۲۳)
const RATE_WINDOW_MS = 60_000;
const DAILY_LIMIT = 30; // درخواست در شبانه‌روز تهران — مصوب مالک ۱۴۰۵/۸/۱ (۲۰۲۶-۱۰-۲۳)

/**
 * ثانیه تا نیمه‌شب بعدی تهران — قرارداد مصوب U3 (فاز ۱/B): عدد صحیح ≥ ۱.
 * محاسبهٔ محلی با همان ثابت آفست ai-guard؛ بدون تغییر helper مشترک.
 */
function secondsToTehranMidnight(): number {
  const TEHRAN_UTC_OFFSET_MS = 3.5 * 60 * 60 * 1000; // UTC+3:30
  const msIntoDay = (Date.now() + TEHRAN_UTC_OFFSET_MS) % 86_400_000;
  return Math.max(1, Math.ceil((86_400_000 - msIntoDay) / 1000));
}

/**
 * POST /api/asr — تبدیل گفتار کاربر به متن (Speech-to-Text)
 * ورودی: { audioBase64: string; mime?: string }
 * خروجی: { text: string } یا { error: string }
 *
 * موتور: z-ai-web-dev-sdk سمت سرور — هیچ کلیدی در کلاینت نیست.
 */
export async function POST(req: NextRequest) {
  // ۱) محافظ نرخ — اولین دستور، پیش از خواندن بدنهٔ بزرگ (تا ~۱۰MB — ردِ ارزان پیش از parse مهم‌تر است؛ قرارداد فاز ۱/E)
  const rl = checkRate(req, "asr:post", RATE_LIMIT, RATE_WINDOW_MS);
  if (!rl.ok) {
    logEvent("asr", "rate-limited");
    return rateLimited(rl.retryAfter);
  }

  try {
    const body = (await req.json()) as { audioBase64?: string; mime?: string };
    const audioBase64 = body.audioBase64?.trim();

    if (!audioBase64) {
      return NextResponse.json({ error: "صدایی ارسال نشد" }, { status: 400 });
    }
    if (audioBase64.length > MAX_BASE64) {
      return NextResponse.json(
        { error: "حجم ضبط خیلی زیاد است — کوتاه‌تر صحبت کن" },
        { status: 413 },
      );
    }

    // ۲) سقف روزانه — فقط روی مسیر فراخوانی واقعی سرویس گفتار (این مسیر کش ندارد؛
    //    422 «متن خالی» پس از upstream است و سقف را قبلاً مصرف کرده — تصمیم مصوب U1:
    //    بدون بازپرداخت؛ 429 روزانه با Retry-After طبق U3)
    if (!consumeDailyQuota(userKeyOf(req, "asr"), DAILY_LIMIT)) {
      return NextResponse.json(
        { error: "سقف روزانهٔ تبدیل گفتار پر شد — فردا دوباره بیا! 🌱" },
        { status: 429, headers: { "Retry-After": String(secondsToTehranMidnight()) } },
      );
    }

    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    const response = await zai.audio.asr.create({ file_base64: audioBase64 });
    const text = (response?.text ?? "").trim();

    if (!text) {
      return NextResponse.json(
        { error: "صدای واضحی شنیده نشد — نزدیک‌تر به میکروفن و بلندتر تلاش کن" },
        { status: 422 },
      );
    }

    return NextResponse.json({ text });
  } catch (e) {
    console.error("POST /api/asr error:", e);
    return NextResponse.json(
      { error: "اتصال به سرویس گفتار برقرار نشد — کمی بعد دوباره تلاش کن" },
      { status: 502 },
    );
  }
}
