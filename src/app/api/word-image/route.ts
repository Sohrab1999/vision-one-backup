import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { NextRequest, NextResponse } from "next/server";
import { consumeDailyQuota, sha1Of, userKeyOf } from "../_lib/ai-guard";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

// ── کنترل هزینه ──
const DAILY_LIMIT = 10; // سقف روزانهٔ تصویرسازی به‌ازای هر کاربر
const CACHE_DIR = "/tmp/vision-wordimg"; // کش تصویر روی دیسک — کلید sha1(word)
const MAX_BASE64_CHARS = 6 * 1024 * 1024; // سقف حجم پاسخ (کاراکتر base64)

/** پاک‌سازی واژه: نرمال‌سازی آپاستروف + فشردن فاصله + trim + سقف ۴۰ نویسه */
function cleanWord(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
}

/** معنی اختیاری فارسی — فقط برای غنی‌سازی پرامپت */
function cleanMeaning(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.replace(/\s+/g, " ").trim().slice(0, 80);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      word?: unknown;
      meaning?: unknown;
      book?: { id?: string; title?: string; grade?: string };
    };

    // ── اعتبارسنجی سخت ورودی ──
    const word = cleanWord(body.word);
    if (!word || !/^[A-Za-z][A-Za-z' \-]*$/.test(word)) {
      return NextResponse.json(
        { error: "واژه را درست بنویس — فقط حروف انگلیسی، فاصله، خط تیره و آپاستروف مجاز است" },
        { status: 400 },
      );
    }
    const meaning = cleanMeaning(body.meaning);

    // ── ۱) کش روی دیسک — همان واژه بدون فراخوانی مدل تصویرساز ──
    try {
      mkdirSync(CACHE_DIR, { recursive: true });
      const cachePath = `${CACHE_DIR}/${sha1Of(word.toLowerCase())}.png`;
      if (existsSync(cachePath)) {
        const base64 = readFileSync(cachePath).toString("base64");
        if (base64.length > 0 && base64.length <= MAX_BASE64_CHARS) {
          return NextResponse.json({ image: base64, cached: true });
        }
      }
    } catch (fsErr) {
      // خرابی کش هرگز مسیر اصلی را نبندد
      console.error("word-image disk cache read failed:", fsErr);
    }

    // ── ۲) سقف روزانه — فقط برای تولید واقعی تصویر ──
    if (!consumeDailyQuota(userKeyOf(req, "word-image"), DAILY_LIMIT)) {
      return NextResponse.json(
        { error: "سقف روزانهٔ تصویرسازی حافظه پر شد (۱۰ تصویر) — فردا دوباره بیا! 🎨" },
        { status: 429 },
      );
    }

    // ── ۳) تولید تصویر با مدل تصویرساز ──
    // متن روی تصویر مطلقاً ممنوع — مدل حروف را خراب می‌کشد؛ واژه فقط به‌عنوان برچسب زیر تصویر در UI می‌آید
    const meaningLine = meaning ? ` (${meaning})` : "";
    const prompt = `Simple cute flat illustration for the English word "${word}"${meaningLine}, cheerful educational style for teenagers, bright green amber and teal color palette, clean minimal composition, no text, no letters, no watermark, high quality`;

    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();
    const response = await zai.images.generations.create({
      prompt,
      size: "1024x1024",
    });
    const base64 = response.data?.[0]?.base64 ?? "";

    if (!base64) {
      return NextResponse.json(
        { error: "تصویر حافظه ساخته نشد — چند لحظه بعد دوباره تلاش کن" },
        { status: 502 },
      );
    }
    if (base64.length > MAX_BASE64_CHARS) {
      return NextResponse.json(
        { error: "تصویر ساخته‌شده بیش از حد بزرگ بود — دوباره تلاش کن" },
        { status: 502 },
      );
    }

    // ── ۴) نوشتن در کش دیسک برای درخواست‌های بعدی ──
    try {
      writeFileSync(`${CACHE_DIR}/${sha1Of(word.toLowerCase())}.png`, Buffer.from(base64, "base64"));
    } catch (fsErr) {
      console.error("word-image disk cache write failed:", fsErr);
    }

    return NextResponse.json({ image: base64 });
  } catch (e) {
    console.error("POST /api/word-image error:", e);
    return NextResponse.json(
      { error: "خطا در ارتباط با تصویرساز حافظه — کمی بعد دوباره تلاش کن" },
      { status: 500 },
    );
  }
}
