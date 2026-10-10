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
const DAILY_LIMIT = 20; // سقف روزانهٔ فراخوانی LLM به‌ازای هر کاربر
const MIN_WORDS = 3; // حداقل سمت سرور — قرارداد ۶..۱۲ در UI اعمال می‌شود (تست API با ۳ واژه هم باید پاس شود)
const MAX_WORDS = 12; // حداکثر واژه
const STORY_CACHE = new BoundedCache(300); // کش حافظه — کلید sha1(words)

const SYSTEM_PROMPT = `تو داستان‌نویس نوجوان‌پسند هستی. یک داستان کوتاه سرگرم‌کننده (۸۰ تا ۱۴۰ کلمه انگلیسی، سطح A2) بنویس که همهٔ واژه‌های داده‌شده را در دلش داشته باشد. هر واژه باید حداقل یک بار دقیقاً به شکل داده‌شده (بدون تصریف که هایلایت بشکند — تصریف مجاز است اما حداقل یک بار شکل اصلی بیاید) در داستان بیاید. در پایان داستان یک سؤال فهم مطلب انگلیسی ساده با ۳ گزینه بنویس. فرمت خروجی دقیقاً JSON: {"story": "...", "question": "...", "options": ["..","..",".."], "answer": 0..2} — هیچ متن اضافه‌ای خارج از JSON ننویس.`;

interface StoryPayload {
  story: string;
  question: string;
  options: string[];
  answer: number;
}

/** اعتبارسنجی سخت شکل خروجی — بدون any */
function isStoryPayload(v: unknown): v is StoryPayload {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.story === "string" &&
    o.story.trim().length >= 40 &&
    typeof o.question === "string" &&
    o.question.trim().length > 0 &&
    Array.isArray(o.options) &&
    o.options.length === 3 &&
    o.options.every((x) => typeof x === "string" && x.trim().length > 0) &&
    typeof o.answer === "number" &&
    Number.isInteger(o.answer) &&
    o.answer >= 0 &&
    o.answer <= 2
  );
}

/** استخراج JSON با regex {...} از متن خام LLM + پارس در try/catch */
function extractStory(raw: string): StoryPayload | null {
  const m = /\{[\s\S]*\}/.exec(raw);
  if (!m) return null;
  try {
    const parsed: unknown = JSON.parse(m[0]);
    if (!isStoryPayload(parsed)) return null;
    return {
      story: parsed.story.trim().slice(0, 4000),
      question: parsed.question.trim().slice(0, 300),
      options: parsed.options.map((x) => x.trim().slice(0, 200)),
      answer: parsed.answer,
    };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      words?: unknown;
      lesson?: unknown;
      book?: { id?: string; title?: string; grade?: string };
    };

    const words = cleanWordList(body.words, MAX_WORDS);
    if (words.length < MIN_WORDS) {
      return NextResponse.json(
        { error: `حداقل ${MIN_WORDS} و حداکثر ${MAX_WORDS} واژه انتخاب کن تا داستان ساخته شود` },
        { status: 400 },
      );
    }

    const lesson =
      typeof body.lesson === "number" && Number.isFinite(body.lesson)
        ? Math.max(0, Math.min(12, Math.trunc(body.lesson)))
        : 0;
    const book = body.book ?? {};

    // (الف) کش حافظه — کلید sha1(words) با مرتب‌سازی تا ترتیبِ انتخاب بی‌اثر باشد
    const cacheKey = sha1Of(
      `ai-story|${words.map((w) => w.toLowerCase()).sort().join(",")}`,
    );
    const cached = STORY_CACHE.get(cacheKey);
    if (cached !== undefined) {
      try {
        const payload: unknown = JSON.parse(cached);
        if (isStoryPayload(payload)) {
          return NextResponse.json({ ...payload, cached: true });
        }
      } catch {
        /* کش خراب — مسیر عادی ادامه می‌یابد */
      }
    }

    // (ب) سقف روزانهٔ فراخوانی LLM به‌ازای هر کاربر (نام مهمان یا IP)
    if (!consumeDailyQuota(userKeyOf(req, "ai-story"), DAILY_LIMIT)) {
      return NextResponse.json(
        { error: "سقف روزانهٔ داستان‌ساز پر شد — فردا بیا! 🌱" },
        { status: 429 },
      );
    }

    const lessonLine =
      lesson > 0 ? `شمارهٔ درس جزوه: ${lesson}` : "واژه‌های مرور پایه‌های قبل";
    const user = [
      `واژه‌ها (هر واژه حداقل یک بار دقیقاً به همین شکل در داستان بیاید): ${words.join(", ")}`,
      lessonLine,
      bookPromptLine(book),
    ].join("\n");

    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    const first = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: SYSTEM_PROMPT },
        { role: "user", content: user },
      ],
      thinking: { type: "disabled" },
    });
    const raw = first.choices[0]?.message?.content ?? "";
    let payload = extractStory(raw);

    // شکست پارس → retry یک‌بار با «فقط JSON بده»
    if (!payload && raw.trim()) {
      const second = await zai.chat.completions.create({
        messages: [
          { role: "assistant", content: SYSTEM_PROMPT },
          { role: "user", content: user },
          { role: "assistant", content: raw.slice(0, 2000) },
          {
            role: "user",
            content: "پاسخ قبلی JSON معتبر نبود. فقط JSON بده — بدون هیچ متن اضافه‌ای.",
          },
        ],
        thinking: { type: "disabled" },
      });
      payload = extractStory(second.choices[0]?.message?.content ?? "");
    }

    // دوباره شکست → 502 فارسی
    if (!payload) {
      return NextResponse.json(
        { error: "داستان ساخته نشد — چند لحظه بعد دوباره تلاش کن" },
        { status: 502 },
      );
    }

    STORY_CACHE.set(cacheKey, JSON.stringify(payload));
    return NextResponse.json({ ...payload });
  } catch (e) {
    console.error("POST /api/ai-story error:", e);
    return NextResponse.json(
      { error: "خطا در ارتباط با داستان‌ساز هوشمند" },
      { status: 500 },
    );
  }
}
