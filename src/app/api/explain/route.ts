import { NextRequest, NextResponse } from "next/server";
import { bookPromptLine } from "../_lib/book";
import { checkRate, rateLimited } from "../_lib/rate-limit";
import { consumeDailyQuota, userKeyOf } from "../_lib/ai-guard";
import { logEvent } from "../_lib/logger";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// ── محافظ مصوب N1-2 فاز ۳-الف (سند: «نقشه راه ها/نقشه-راه-فاز-۳-N1-2.md») ──
const RATE_LIMIT = 30; // درخواست در دقیقه — مصوب مالک ۱۴۰۵/۸/۱ (۲۰۲۶-۱۰-۲۳)
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

export async function POST(req: NextRequest) {
  // ۱) محافظ نرخ — اولین دستور، پیش از خواندن بدنه (قرارداد فاز ۱/E، الگوی tutor)
  const rl = checkRate(req, "explain:post", RATE_LIMIT, RATE_WINDOW_MS);
  if (!rl.ok) {
    logEvent("explain", "rate-limited");
    return rateLimited(rl.retryAfter);
  }

  try {
    const { text, options, answer, book } = (await req.json()) as {
      text?: string;
      options?: string[];
      answer?: number;
      book?: { id?: string; title?: string; grade?: string };
    };

    if (!text || !options || typeof answer !== "number") {
      return NextResponse.json({ error: "داده نامعتبر" }, { status: 400 });
    }

    const correctOption = options[answer] ?? "";
    const system = `تو معلم باتجربه زبان انگلیسی پایه دهم دبیرستان ایران هستی. برای تست گرامر/واژگان داده‌شده، به فارسی ساده توضیح بده:
- یک نکته گرامری یا واژگانی کلیدی که حل تست به آن وابسته است (مطابق سرفصل‌های کتاب Vision 1 پایه دهم: آینده ساده، انواع صفت، گذشته استمراری، ضمایر انعکاسی، افعال ناقص، حروف اضافه، قید حالت یا واژگان درس‌ها)
- یک مثال کوتاه انگلیسی با ترجمه فارسی
قوانین: حداکثر ۶۰ کلمه فارسی. گزینه‌های غلط را لیست نکن و درباره آن‌ها توضیح نده. فقط نکته اصلی + مثال. بدون مقدمه‌چینی.
${bookPromptLine(book)}`;

    const user = `Question: ${text}
Options: ${options.map((o, i) => `${"abcd"[i]}) ${o}`).join(" | ")}
Correct answer: ${correctOption}`;

    // ۲) سقف روزانه — فقط روی مسیر فراخوانی واقعی LLM (این مسیر کش ندارد؛
    //    تصمیم مصوب U1: خطای upstream بازپرداخت ندارد؛ 429 با Retry-After طبق U3)
    if (!consumeDailyQuota(userKeyOf(req, "explain"), DAILY_LIMIT)) {
      return NextResponse.json(
        { error: "سقف روزانهٔ توضیح هوشمند پر شد — فردا دوباره بیا! 🌱" },
        { status: 429, headers: { "Retry-After": String(secondsToTehranMidnight()) } },
      );
    }

    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: system },
        { role: "user", content: user },
      ],
      thinking: { type: "disabled" },
    });

    const explanation =
      completion.choices[0]?.message?.content?.trim() ?? "";

    if (!explanation) {
      return NextResponse.json(
        { error: "توضیحی تولید نشد" },
        { status: 502 },
      );
    }

    return NextResponse.json({ explanation });
  } catch (e) {
    console.error("POST /api/explain error:", e);
    return NextResponse.json(
      { error: "خطا در تولید توضیح" },
      { status: 500 },
    );
  }
}
