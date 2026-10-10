import { NextRequest, NextResponse } from "next/server";
import { bookPromptLine } from "../_lib/book";
import {
  BoundedCache,
  cleanWordList,
  consumeDailyQuota,
  sha1Of,
  userKeyOf,
} from "../_lib/ai-guard";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// ── کنترل هزینه ──
const DAILY_LIMIT = 30; // سقف روزانهٔ فراخوانی LLM به‌ازای هر کاربر
const MAX_WORDS = 15; // حداکثر واژه‌های دانش‌آموز در هر توضیح
const TEACHER_CACHE = new BoundedCache(300); // کش حافظه — کلید sha1(topic|words|level|book)

const SYSTEM_PROMPT = `تو «معلم خصوصی» زبان انگلیسی برای دانش‌آموز ایرانی هستی. موضوع گرامری داده‌شده را با حداکثر ۳ مثال انگلیسی توضیح بده که در هر مثال حتماً از واژه‌های خود دانش‌آموز استفاده شود.

سطح‌بندی:
- A2: جمله‌های کوتاه و ساده (فعل + فاعل + مفعول)
- B1: کمی پیچیده‌تر (بندهای وابسته، اتصال جمله‌ها)

ساختار پاسخ فارسی (حداکثر ۱۲۰ کلمه، نوجوان‌پسند، بدون مقدمه‌چینی):
نکتهٔ اصلی: (یک تا دو جمله توضیح ساده)
مثال‌ها:
۱) (مثال انگلیسی با واژه‌های او) — (ترجمه فارسی)
۲) (مثال انگلیسی با واژه‌های او) — (ترجمه فارسی)
۳) (مثال انگلیسی با واژه‌های او) — (ترجمه فارسی)
نکتهٔ طلایی: (یک نکتهٔ کوتاه برای حفظ کردن)`;

/** سطح معتبر — A2 پیش‌فرض */
function cleanLevel(input: unknown): "A2" | "B1" {
  return input === "B1" ? "B1" : "A2";
}

/** موضوع گرامری: trim + سقف طول + عدم خالی بودن */
function cleanTopic(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.replace(/\s+/g, " ").trim().slice(0, 80);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      topic?: unknown;
      words?: unknown;
      level?: unknown;
      book?: { id?: string; title?: string; grade?: string };
    };

    const topic = cleanTopic(body.topic);
    const words = cleanWordList(body.words, MAX_WORDS);
    const level = cleanLevel(body.level);

    if (!topic) {
      return NextResponse.json(
        { error: "موضوع گرامری را انتخاب کن" },
        { status: 400 },
      );
    }
    if (words.length === 0) {
      return NextResponse.json(
        { error: "حداقل یک واژه انتخاب کن تا مثال‌ها با واژه‌های خودت ساخته شود" },
        { status: 400 },
      );
    }

    const bookId = typeof body.book?.id === "string" ? body.book.id.slice(0, 40) : "";
    const cacheKey = sha1Of(`${topic}|${words.join(",").toLowerCase()}|${level}|${bookId}`);

    // ۱) کش — تکرار بدون فراخوانی LLM
    const cached = TEACHER_CACHE.get(cacheKey);
    if (cached) {
      return NextResponse.json({ reply: cached, cached: true });
    }

    // ۲) سقف روزانه — فقط برای مسیر فراخوانی واقعی LLM
    const userKey = userKeyOf(req, "ai-teacher");
    if (!consumeDailyQuota(userKey, DAILY_LIMIT)) {
      return NextResponse.json(
        { error: "سقف روزانهٔ معلم خصوصی پر شد — فردا بیا، یا فعلاً با داستان‌ساز تمرین کن! 🌱" },
        { status: 429 },
      );
    }

    const system = `${SYSTEM_PROMPT}\n\n${bookPromptLine(body.book)}`;
    const user = `موضوع گرامری: ${topic}
سطح: ${level}
واژه‌های خود دانش‌آموز (مثال‌ها باید با این‌ها ساخته شود): ${words.join("، ")}`;

    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: system },
        { role: "user", content: user },
      ],
      thinking: { type: "disabled" },
    });

    const reply = completion.choices[0]?.message?.content?.trim() ?? "";
    if (!reply) {
      return NextResponse.json(
        { error: "توضیحی ساخته نشد — دوباره تلاش کن" },
        { status: 502 },
      );
    }

    TEACHER_CACHE.set(cacheKey, reply);
    return NextResponse.json({ reply });
  } catch (e) {
    console.error("POST /api/ai-teacher error:", e);
    return NextResponse.json(
      { error: "خطا در ارتباط با معلم خصوصی — کمی بعد دوباره تلاش کن" },
      { status: 500 },
    );
  }
}
