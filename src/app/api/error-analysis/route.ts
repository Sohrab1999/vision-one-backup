import { NextRequest, NextResponse } from "next/server";
import { bookPromptLine } from "../_lib/book";
import {
  BoundedCache,
  consumeDailyQuota,
  sha1Of,
  userKeyOf,
} from "../_lib/ai-guard";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// ── کنترل هزینه ──
const DAILY_LIMIT = 12; // سقف روزانهٔ فراخوانی LLM به‌ازای هر کاربر
const MAX_QUESTIONS = 8; // حداکثر سؤال‌های غلط ورودی برای تحلیل
const ANALYSIS_CACHE = new BoundedCache(120); // کش حافظه — کلید sha1(سؤال‌ها|bookId)

const SYSTEM_PROMPT = `تو تحلیلگر خطای آزمون زبان انگلیسی برای دانش‌آموز نوجوان ایرانی هستی. فهرستی از سؤال‌هایی که کاربر در آزمون اشتباه جواب داده را می‌بینی. وظیفه‌ات:
۱) الگوی مشترک اشتباهات را پیدا کن (مثلاً «زمان گذشته فعل»، «حرف اضافه»، «واژگان موضوع مدرسه») — اگر چند الگو هست، پرتکرارترین یا بنیادی‌ترین را انتخاب کن.
۲) آن الگو را با فارسی ساده و نوجوان‌پسند توضیح بده: کاربر دقیقاً چه چیزی را اشتباه می‌کند و چرا.
۳) یک نکتهٔ طلایی کوتاه و حفظ‌کردنی بده.
۴) دقیقاً ۴ سؤال تمرینی انگلیسی مشابه سبک تست‌های جزوه (۴ گزینه‌ای) بساز که همه از همان نقطهٔ ضعف باشند ولی محتوایشان با سؤال‌های اصلی متفاوت باشد.

ساختار پاسخ دقیقاً این JSON معتبر است — هیچ متن اضافه‌ای خارج از JSON ننویس:
{"pattern":"عنوان کوتاه الگوی خطا (حداکثر ۶ کلمه، فارسی)","summary":"۲ تا ۳ جمله فارسی ساده نوجوان‌پسند: چه چیزی را اشتباه می‌کندی و چرا","tip":"یک نکتهٔ طلایی حفظ‌کردنی (فارسی)","drill":[{"text":"سؤال انگلیسی مشابه سبک تست‌های جزوه","options":["a","b","c","d"],"answer":0,"explain":"یک جمله فارسی چرا این غلط/درست است"}]}
قواعد drill: دقیقاً ۴ عضو؛ هر عضو دقیقاً ۴ گزینه؛ answer عدد ۰ تا ۳؛ متن سؤال انگلیسی، explain فارسی.`;

interface DrillItem {
  text: string;
  options: string[];
  answer: number;
  explain: string;
}

interface AnalysisPayload {
  pattern: string;
  summary: string;
  tip: string;
  drill: DrillItem[];
}

/** اعتبارسنجی دستی شکل drill — عضو نامعتبر دور ریخته می‌شود */
function cleanDrill(v: unknown): DrillItem[] {
  if (!Array.isArray(v)) return [];
  const out: DrillItem[] = [];
  for (const raw of v) {
    if (typeof raw !== "object" || raw === null) continue;
    const o = raw as Record<string, unknown>;
    if (typeof o.text !== "string" || !o.text.trim()) continue;
    if (!Array.isArray(o.options)) continue;
    const options = o.options
      .filter((x): x is string => typeof x === "string" && x.trim().length > 0)
      .map((x) => x.trim().slice(0, 120));
    if (options.length !== 4) continue;
    if (typeof o.answer !== "number" || !Number.isInteger(o.answer)) continue;
    if (o.answer < 0 || o.answer > 3) continue;
    out.push({
      text: o.text.trim().slice(0, 400),
      options,
      answer: o.answer,
      explain:
        typeof o.explain === "string" && o.explain.trim()
          ? o.explain.trim().slice(0, 400)
          : "",
    });
    if (out.length >= 6) break;
  }
  return out;
}

/** اعتبارسنجی دستی ساختار کل خروجی — نامعتبر → null */
function extractAnalysis(raw: string): AnalysisPayload | null {
  const m = /\{[\s\S]*\}/.exec(raw);
  if (!m) return null;
  try {
    const parsed: unknown = JSON.parse(m[0]);
    if (typeof parsed !== "object" || parsed === null) return null;
    const o = parsed as Record<string, unknown>;
    if (typeof o.pattern !== "string" || !o.pattern.trim()) return null;
    if (typeof o.summary !== "string" || !o.summary.trim()) return null;
    if (typeof o.tip !== "string" || !o.tip.trim()) return null;
    const drill = cleanDrill(o.drill);
    if (drill.length === 0) return null;
    return {
      pattern: o.pattern.trim().slice(0, 120),
      summary: o.summary.trim().slice(0, 700),
      tip: o.tip.trim().slice(0, 400),
      drill,
    };
  } catch {
    return null;
  }
}

interface CleanQuestion {
  text: string;
  options: string[];
  answer: number;
  category?: string;
}

/** پاک‌سازی و اعتبارسنجی سخت سؤال‌های ورودی — نامعتبر → null */
function cleanQuestions(input: unknown): CleanQuestion[] | null {
  if (!Array.isArray(input)) return null;
  const out: CleanQuestion[] = [];
  for (const raw of input.slice(0, MAX_QUESTIONS)) {
    if (typeof raw !== "object" || raw === null) return null;
    const o = raw as Record<string, unknown>;

    if (typeof o.text !== "string") return null;
    const text = o.text.replace(/\s+/g, " ").trim().slice(0, 400);
    if (!text) return null;

    if (!Array.isArray(o.options)) return null;
    const options: string[] = [];
    for (const rawOpt of o.options.slice(0, 6)) {
      if (typeof rawOpt !== "string") return null;
      const opt = rawOpt.replace(/\s+/g, " ").trim().slice(0, 80);
      if (!opt) return null;
      options.push(opt);
    }
    if (options.length < 2 || options.length > 6) return null;

    if (typeof o.answer !== "number" || !Number.isFinite(o.answer)) return null;
    const answer = Math.max(
      0,
      Math.min(options.length - 1, 5, Math.trunc(o.answer)),
    );

    const category =
      typeof o.category === "string" && o.category.trim()
        ? o.category.trim().slice(0, 60)
        : undefined;

    out.push({ text, options, answer, category });
  }
  return out.length > 0 ? out : null;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      questions?: unknown;
      book?: { id?: string; title?: string; grade?: string };
    };

    // ۱) اعتبارسنجی سخت ورودی
    const questions = cleanQuestions(body.questions);
    if (!questions) {
      return NextResponse.json(
        { error: "سؤال‌های غلط ارسالی معتبر نیست — حداقل ۱ سؤال با متن، گزینه‌ها و پاسخ درست لازم است" },
        { status: 400 },
      );
    }

    const bookId =
      typeof body.book?.id === "string" ? body.book.id.slice(0, 40) : "";
    const cacheKey = sha1Of(
      `error-analysis|${questions
        .map((q) => `${q.text}|${q.options.join(",")}|${q.answer}|${q.category ?? ""}`)
        .join(";;")}|${bookId}`,
    );

    // ۲) کش — تکرار بدون فراخوانی LLM
    const cached = ANALYSIS_CACHE.get(cacheKey);
    if (cached) {
      try {
        const payload: unknown = JSON.parse(cached);
        if (payload && typeof payload === "object") {
          return NextResponse.json({ analysis: payload, cached: true });
        }
      } catch {
        /* کش خراب — مسیر عادی ادامه می‌یابد */
      }
    }

    // ۳) سقف روزانه — فقط برای مسیر فراخوانی واقعی LLM
    if (!consumeDailyQuota(userKeyOf(req, "error-analysis"), DAILY_LIMIT)) {
      return NextResponse.json(
        { error: "سقف روزانهٔ تحلیل خطاها پر شد — فردا بیا، فعلاً با تمرین‌های خود آزمون ادامه بده! 🌱" },
        { status: 429 },
      );
    }

    // ۴) ساخت پیام کاربر از سؤال‌های غلط
    const faDigits = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸"];
    const questionLines = questions.map((q, i) => {
      const opts = q.options
        .map((opt, j) => `${j + 1}) ${opt}${j === q.answer ? " ← پاسخ درست" : ""}`)
        .join("   ");
      return `${faDigits[i] ?? i + 1}) متن: ${q.text}\n   گزینه‌ها: ${opts}\n   دسته: ${q.category ?? "نامشخص"}`;
    });
    const user = [
      "سؤال‌هایی که کاربر در آزمون اشتباه جواب داده (از جدیدترین):",
      ...questionLines,
      "",
      "الگوی مشترک این اشتباه‌ها را تحلیل کن و دقیقاً ۴ سؤال تمرینی از همان نقطهٔ ضعف بساز.",
      bookPromptLine(body.book),
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
    let payload = extractAnalysis(raw);

    // شکست پارس → retry یک‌بار با «فقط JSON خالص»
    if (!payload && raw.trim()) {
      const second = await zai.chat.completions.create({
        messages: [
          { role: "assistant", content: SYSTEM_PROMPT },
          { role: "user", content: user },
          { role: "assistant", content: raw.slice(0, 2000) },
          {
            role: "user",
            content: "پاسخ قبلی JSON معتبر نبود. فقط JSON خالص بده — بدون هیچ متن اضافه‌ای.",
          },
        ],
        thinking: { type: "disabled" },
      });
      payload = extractAnalysis(second.choices[0]?.message?.content ?? "");
    }

    // دوباره شکست → 502 فارسی
    if (!payload) {
      return NextResponse.json(
        { error: "تحلیل خطاها ساخته نشد — چند لحظه بعد دوباره تلاش کن" },
        { status: 502 },
      );
    }

    ANALYSIS_CACHE.set(cacheKey, JSON.stringify(payload));
    return NextResponse.json({ analysis: payload });
  } catch (e) {
    console.error("POST /api/error-analysis error:", e);
    return NextResponse.json(
      { error: "خطا در ارتباط با تحلیلگر خطاها — کمی بعد دوباره تلاش کن" },
      { status: 500 },
    );
  }
}
