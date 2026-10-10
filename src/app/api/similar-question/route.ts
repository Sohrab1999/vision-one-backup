import { NextRequest, NextResponse } from "next/server";
import { bookPromptLine } from "../_lib/book";
import { BoundedCache, consumeDailyQuota, sha1Of, userKeyOf } from "../_lib/ai-guard";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// ── کنترل هزینه ──
const DAILY_LIMIT = 25; // سقف روزانهٔ فراخوانی LLM به‌ازای هر کاربر
const SIMILAR_CACHE = new BoundedCache(200); // کش حافظه — کلید sha1(text|answer|bookId)؛ اگر کاربر همان سؤال را دوباره امتحان کند بدون فراخوانی LLM پاسخ می‌گیرد

const SYSTEM_PROMPT = `تو طراح تست زبان انگلیسی پایهٔ دهم دبیرستان ایران هستی. از روی تست نمونه، دقیقاً یک تست جدید با همان نکتهٔ گرامری/واژگانی بساز، ولی محتوای متفاوت:
- جملهٔ سؤال جدید باید کاملاً متفاوت از نمونه باشد (واژه‌ها و موقعیت جدید، همان الگو).
- گزینهٔ درستِ تست جدید یکتا باشد و متن آن نباید عین گزینهٔ درست نمونه باشد — معادل یا شکلی دیگر از همان نکته.
- سه گزینهٔ دیگر غلطِ منطقی و هم‌خانوادهٔ گزینهٔ درست باشند (هم‌ردهٔ گرامری/واژگانی که آزمون‌گیرنده را واقعاً درگیر کند) و هیچ دو گزینه‌ای عین هم نباشند.
- سطح دشواری تقریباً برابر نمونه و مناسب پایهٔ دانش‌آموز باشد.
- «note» یک جملهٔ فارسی کوتاه است: چه نکته‌ای در این تست سنجیده می‌شود.
خروجی فقط JSON خالص: {"text":"...","options":["...","...","...","..."],"answer":0,"note":"یک جمله فارسی: چه نکته‌ای تست می‌شود"} — همیشه دقیقاً ۴ گزینه و «answer» عدد ۰ تا ۳ (ایندکس گزینهٔ درست). هیچ متن اضافه‌ای خارج از JSON ننویس.`;

interface SimilarPayload {
  text: string;
  options: string[];
  answer: number;
  note: string;
}

/** اعتبارسنجی سخت خروجی LLM — تست باید واقعاً «مشابه ولی متفاوت» باشد (بدون any) */
function isSimilarPayload(v: unknown, srcText: string, srcOptions: string[]): v is SimilarPayload {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  if (typeof o.text !== "string") return false;
  const text = o.text.trim();
  if (text.length < 5 || text.length > 400) return false;
  if (text.toLowerCase() === srcText.trim().toLowerCase()) return false; // متن سؤال نباید عین نمونه باشد
  if (!Array.isArray(o.options) || o.options.length !== 4) return false;
  if (!o.options.every((x) => typeof x === "string" && x.trim().length > 0)) return false;
  const opts = o.options.map((x) => (x as string).trim().toLowerCase());
  if (new Set(opts).size !== 4) return false; // گزینه‌ها باید یکتا باشند
  if (typeof o.answer !== "number" || !Number.isInteger(o.answer) || o.answer < 0 || o.answer > 3) return false;
  // کل آرایهٔ گزینه‌ها نباید عین نمونه باشد — هم‌خانواده بودن «گزینهٔ درست» با نمونه مجاز است (نقطهٔ تست یکی است)
  const srcSet = new Set(srcOptions.map((x) => x.trim().toLowerCase()));
  if (opts.every((x) => srcSet.has(x))) return false;
  if (typeof o.note !== "string" || o.note.trim().length < 2) return false;
  return true;
}

/** حذف پیشوندهای حرفی مدل‌مانند «a)» / «b.» / «c -» از ابتدای گزینه‌ها */
function stripOptionPrefix(x: string): string {
  return x.replace(/^\s*[a-dA-D][).\-:]\s*/, "").trim();
}

/** استخراج JSON با regex {...} از متن خام LLM + پارس در try/catch */
function extractSimilar(raw: string, srcText: string, srcOptions: string[]): SimilarPayload | null {
  const m = /\{[\s\S]*\}/.exec(raw);
  if (!m) return null;
  try {
    const parsed: unknown = JSON.parse(m[0]);
    if (!isSimilarPayload(parsed, srcText, srcOptions)) return null;
    return {
      text: parsed.text.trim().slice(0, 400),
      options: parsed.options.map((x) => stripOptionPrefix(x).slice(0, 200)),
      answer: parsed.answer,
      note: parsed.note.trim().slice(0, 300),
    };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    let body: {
      text?: unknown;
      options?: unknown;
      answer?: unknown;
      category?: unknown;
      book?: { id?: string; title?: string; grade?: string };
    };
    try {
      body = (await req.json()) as typeof body;
    } catch {
      return NextResponse.json({ error: "بدنهٔ درخواست JSON معتبر نیست" }, { status: 400 });
    }

    // ── اعتبارسنجی مثل explain — با پیام‌های فارسی دقیق ──
    const text = typeof body.text === "string" ? body.text.replace(/\s+/g, " ").trim().slice(0, 400) : "";
    if (!text) {
      return NextResponse.json({ error: "متن سؤال نمونه را بفرست" }, { status: 400 });
    }
    if (
      !Array.isArray(body.options) ||
      body.options.length < 2 ||
      body.options.length > 6 ||
      !body.options.every((x) => typeof x === "string" && x.trim().length > 0)
    ) {
      return NextResponse.json(
        { error: "گزینه‌ها باید آرایه‌ای با ۲ تا ۶ گزینهٔ غیرخالی باشند" },
        { status: 400 },
      );
    }
    const options = (body.options as string[]).map((x) => x.replace(/\s+/g, " ").trim().slice(0, 200));
    if (
      typeof body.answer !== "number" ||
      !Number.isInteger(body.answer) ||
      body.answer < 0 ||
      body.answer >= options.length
    ) {
      return NextResponse.json({ error: "شمارهٔ پاسخ درست نامعتبر است" }, { status: 400 });
    }
    const answer = body.answer;
    const category =
      typeof body.category === "string" && body.category.trim()
        ? body.category.trim().slice(0, 40)
        : "";
    const bookId = typeof body.book?.id === "string" ? body.book.id.slice(0, 40) : "";

    const cacheKey = sha1Of(`${text}|${answer}|${bookId}`);

    // ۱) کش — کاربر همان سؤال را دوباره امتحان کند بدون فراخوانی LLM پاسخ می‌گیرد
    const cached = SIMILAR_CACHE.get(cacheKey);
    if (cached) {
      try {
        const payload: unknown = JSON.parse(cached);
        if (isSimilarPayload(payload, text, options)) {
          return NextResponse.json({ question: payload, cached: true });
        }
      } catch {
        /* کش خراب — مسیر عادی ادامه می‌یابد */
      }
    }

    // ۲) سقف روزانه — فقط روی مسیر فراخوانی واقعی LLM
    if (!consumeDailyQuota(userKeyOf(req, "similar-question"), DAILY_LIMIT)) {
      return NextResponse.json(
        { error: "سقف روزانهٔ سؤال‌ساز مشابه پر شد — فردا دوباره تلاش کن! 🌱" },
        { status: 429 },
      );
    }

    const system = `${SYSTEM_PROMPT}\n\n${bookPromptLine(body.book)}`;
    const categoryLine =
      category === "grammar" ? "نوع تست: گرامر" : category === "vocabulary" ? "نوع تست: واژگان" : "";
    const user = [
      "تست نمونه:",
      `Question: ${text}`,
      `Options: ${options.map((o, i) => `${"abcd"[i]}) ${o}`).join(" | ")}`,
      `Correct answer: ${options[answer]}`,
      categoryLine,
      "حالا دقیقاً یک تست مشابهِ متفاوت بساز و فقط JSON بده.",
    ]
      .filter(Boolean)
      .join("\n");

    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    // حداکثر ۳ تلاش — LLM گاهی خالی/خراب برمی‌گرداند؛ تلاش‌های بعدی با پیام تصحیح هدفمند
    const baseMessages: { role: "assistant" | "user"; content: string }[] = [
      { role: "assistant", content: system },
      { role: "user", content: user },
    ];
    const NUDGE =
      "پاسخ قبلی معتبر نبود. فقط JSON خالص بده: دقیقاً ۴ گزینهٔ یکتا، «answer» عدد ۰ تا ۳، متن سؤال و گزینهٔ درست حتماً متفاوت از تست نمونه، و «note» یک جملهٔ فارسی.";
    let payload: SimilarPayload | null = null;
    let rawHistory = "";
    for (let attempt = 0; attempt < 3 && !payload; attempt++) {
      try {
        const completion = await zai.chat.completions.create({
          messages:
            attempt === 0
              ? baseMessages
              : [
                  ...baseMessages,
                  ...(rawHistory ? [{ role: "assistant" as const, content: rawHistory.slice(0, 2000) }] : []),
                  { role: "user", content: NUDGE },
                ],
          thinking: { type: "disabled" },
        });
        const raw = completion.choices[0]?.message?.content ?? "";
        rawHistory = raw;
        payload = extractSimilar(raw, text, options);
      } catch {
        // خطای شبکه/SDK در این تلاش — تلاش بعدی
      }
    }

    // هر ۳ تلاش شکست → 502 فارسی
    if (!payload) {
      return NextResponse.json(
        { error: "سؤال مشابه ساخته نشد — چند لحظه بعد دوباره تلاش کن" },
        { status: 502 },
      );
    }

    SIMILAR_CACHE.set(cacheKey, JSON.stringify(payload));
    return NextResponse.json({ question: payload });
  } catch (e) {
    console.error("POST /api/similar-question error:", e);
    return NextResponse.json(
      { error: "خطا در ارتباط با سؤال‌ساز مشابه" },
      { status: 500 },
    );
  }
}
