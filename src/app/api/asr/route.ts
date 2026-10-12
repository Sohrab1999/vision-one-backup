import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_BASE64 = 10 * 1024 * 1024; // ~7.5MB audio

/**
 * POST /api/asr — تبدیل گفتار کاربر به متن (Speech-to-Text)
 * ورودی: { audioBase64: string; mime?: string }
 * خروجی: { text: string } یا { error: string }
 *
 * موتور: z-ai-web-dev-sdk سمت سرور — هیچ کلیدی در کلاینت نیست.
 */
export async function POST(req: NextRequest) {
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
