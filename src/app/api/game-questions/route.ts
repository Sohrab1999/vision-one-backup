import { NextRequest, NextResponse } from "next/server";
import { checkRate, rateLimited } from "../_lib/rate-limit";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * G5-02 — تولید سؤال دینامیک AI برای بازی‌های «جای خالی» (cloze) و «تست برقی» (speed-quiz).
 *
 * قرارداد قالب امن (پذیرش سند games-roadmap فاز G5):
 * - سؤال فقط از واژگانی ساخته می‌شود که کلاینت از واژگان خود کتاب فرستاده (pool)؛
 *   هرگز واژه/معنی ساختگی بیرون از جزوه به کاربر نمایش داده نمی‌شود.
 * - والیدیشن سمت سرور قلب پذیرش است: هر سؤالِ خروجی LLM قبل از پاسخ دادن
 *   سنجیده می‌شود و کوچک‌ترین تخلف (واژهٔ بیرون از استخر، گزینهٔ ساخته، جملهٔ
 *   نامعتبر) → آن سؤال دور ریخته می‌شود.
 * - خطا/بی‌نتیجه بودن هرگز سؤال جعلی برنمی‌گرداند — 503 با پیام فارسی؛
 *   کلاینت با سؤال‌های عادی دور را شروع می‌کند (بازی هرگز بلاک نمی‌شود).
 *
 * محتوای سؤال‌ها هیچ‌جا لاگ نمی‌شود (بدون console.log محتوا).
 */

/** پیام استاندارد نبودِ سؤال هوشمند (خطا/فیلتر کامل/خرابی SDK — همیشه همین) */
const UNAVAILABLE = "سؤال هوشمند همین حالا آماده نشد — بعداً تلاش کن";

interface PoolItem {
  word: string;
  meaning: string;
}

/** شکل اکید سؤال تولیدی — همان چیزی که کلاینت مصرف می‌کند */
interface AiQuestion {
  word: string;
  sentence: string;
  options: string[];
  answerIndex: number;
}

type GameKey = "cloze" | "speed-quiz";

const WORD_MAX = 80;
const SENTENCE_MAX = 200;

/** نرمال‌سازی مقایسه‌ای: نیم‌فاصله/ی/ک عربی/فاصله‌ها/بزرگی حرف — فقط برای سنجش عضویت */
function normKey(s: string): string {
  return s
    .replace(/\u200c/g, "")
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/** حذف پیشوند حرفی/عددی مدل‌مانند «a)» / «1.» از ابتدای گزینه (اگر هست) */
function stripOptionPrefix(x: string): string {
  return x.replace(/^\s*(?:[a-eA-E]|[1-6])[).\-:]\s*/, "").trim();
}

/** نمای استخر بعد از پاکسازی — نگاشت‌های مقایسه‌ای یکتا */
interface PoolIndex {
  items: PoolItem[];
  /** normWord → واژهٔ مرجع (اولین تکرار حفظ می‌شود) */
  wordOf: Map<string, string>;
  /** normMeaning → واژهٔ مرجعِ صاحب آن معنی */
  meaningOwnerOf: Map<string, string>;
}

function buildPoolIndex(raw: PoolItem[]): PoolIndex {
  const wordOf = new Map<string, string>();
  const meaningOwnerOf = new Map<string, string>();
  const items: PoolItem[] = [];
  for (const it of raw) {
    const wk = normKey(it.word);
    if (!wk || wordOf.has(wk)) continue; // تکراری/خالی → نادیده
    wordOf.set(wk, it.word);
    const mk = normKey(it.meaning);
    if (mk && !meaningOwnerOf.has(mk)) meaningOwnerOf.set(mk, it.word);
    items.push(it);
  }
  return { items, wordOf, meaningOwnerOf };
}

/** آیا این گزینه عضو واژه‌های استخر است؟ (پیشوند حرفی مدل هم پاک می‌شود) */
function asPoolWord(opt: string, pool: PoolIndex): string | null {
  const direct = pool.wordOf.get(normKey(opt));
  if (direct) return direct;
  return pool.wordOf.get(normKey(stripOptionPrefix(opt))) ?? null;
}

/** آیا این گزینه عضو معنی‌های استخر است؟ → واژهٔ صاحب معنی */
function asPoolMeaning(opt: string, pool: PoolIndex): string | null {
  const direct = pool.meaningOwnerOf.get(normKey(opt));
  if (direct) return direct;
  return pool.meaningOwnerOf.get(normKey(stripOptionPrefix(opt))) ?? null;
}

/**
 * والیدیشن سخت یک سؤال تولیدی — قلب پذیرش سند.
 * رد می‌شود اگر: (الف) word دقیقاً (case-insensitive) عضو pool نیست ·
 * (ب) گزینه‌ها کاملاً از همان ستون استخر نیایند (word برای cloze، meaning برای
 * speed-quiz — هیچ واژه/معنی ساختگی نباید به کاربر نمایش داده شود) ·
 * (ج) sentence خالی یا بلندتر از سقف باشد. گزینهٔ درست هم باید دقیقاً به همان
 * واژهٔ سؤال تعلق داشته باشد تا سؤالِ «درست‌نما» رد شود.
 */
function validateQuestion(v: unknown, game: GameKey, pool: PoolIndex): AiQuestion | null {
  if (typeof v !== "object" || v === null) return null;
  const o = v as Record<string, unknown>;

  // شکل پایه
  if (typeof o.word !== "string") return null;
  const word = o.word.replace(/\s+/g, " ").trim();
  if (!word || word.length > WORD_MAX) return null;
  if (typeof o.sentence !== "string") return null;
  const sentence = o.sentence.replace(/\s+/g, " ").trim();
  if (!sentence || sentence.length > SENTENCE_MAX) return null; // (ج)
  if (!Array.isArray(o.options) || o.options.length < 2 || o.options.length > 6) return null;
  const options: string[] = [];
  for (const raw of o.options) {
    if (typeof raw !== "string") return null;
    const opt = raw.replace(/\s+/g, " ").trim();
    if (!opt || opt.length > WORD_MAX) return null;
    options.push(opt);
  }
  if (
    typeof o.answerIndex !== "number" ||
    !Number.isInteger(o.answerIndex) ||
    o.answerIndex < 0 ||
    o.answerIndex >= options.length
  ) {
    return null;
  }

  // گزینه‌های یکتا (مقایسه‌ای) — گزینهٔ تکراری بازی را می‌شکند
  const seenOpt = new Set<string>();
  for (const opt of options) {
    const k = normKey(opt);
    if (seenOpt.has(k)) return null;
    seenOpt.add(k);
  }

  // (الف) واژهٔ هدف دقیقاً عضو استخر باشد → به شکل مرجع استخر نرمال می‌شود
  const canonical = pool.wordOf.get(normKey(word));
  if (!canonical) return null;

  if (game === "cloze") {
    // همهٔ گزینه‌ها باید واژه‌های واقعی استخر باشند
    const words = options.map((opt) => asPoolWord(opt, pool));
    if (words.some((w) => w === null)) return null;
    // گزینهٔ درست باید خودِ واژهٔ هدف باشد
    if (words[o.answerIndex] !== canonical) return null;
    // جمله باید جای خالی ___ داشته باشد و خود واژه را لو ندهد
    if (!/_{3,}/.test(sentence)) return null;
    const leak = new RegExp("\\b" + word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i");
    if (leak.test(sentence)) return null;
  } else {
    // speed-quiz — همهٔ گزینه‌ها باید معنی‌های واقعی استخر باشند
    const meanings = options.map((opt) => asPoolMeaning(opt, pool));
    if (meanings.some((m) => m === null)) return null;
    // گزینهٔ درست باید معنیِ همان واژهٔ سؤال باشد (نه معنی واژهٔ دیگر)
    if (meanings[o.answerIndex] !== canonical) return null;
  }

  return { word: canonical, sentence, options, answerIndex: o.answerIndex };
}

/** استخراج اولین آرایهٔ JSON از متن خام مدل + پارس امن */
function extractQuestions(raw: string): unknown[] | null {
  const m = /\[[\s\S]*\]/.exec(raw);
  if (!m) return null;
  try {
    const parsed: unknown = JSON.parse(m[0]);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function systemPromptFor(game: GameKey): string {
  const shape =
    game === "cloze"
      ? `- «sentence» یک جملهٔ انگلیسی ساده و طبیعی (۶ تا ۱۸ واژه، مناسب دانش‌آموز ایرانی) است که واژهٔ هدف در آن حذف و به‌جایش دقیقاً ___ (سه زیرخط) گذاشته شده؛ جمله هرگز نباید خودِ واژهٔ هدف را داشته باشد.
- «options» دقیقاً ۴ واژهٔ انگلیسی است که عیناً از ستون word استخر کپی شده‌اند: ۱ واژهٔ درست + ۳ واژهٔ دیگر از استخر به‌عنوان مزاحم.`
      : `- «sentence» یک سؤال کوتاه انگلیسی دربارهٔ معنی واژهٔ هدف است، مثلاً: What is the meaning of "forest"? — واژهٔ هدف داخل سؤال آمده.
- «options» دقیقاً ۴ معنی فارسی است که عیناً از ستون meaning استخر کپی شده‌اند: ۱ معنیِ درستِ همان واژه + ۳ معنیِ دیگر از استخر به‌عنوان مزاحم.`;
  return `تو طراح سؤال زبان انگلیسی اپ آموزشی «ویژن‌وان» هستی و فقط از واژه‌های داده‌شده سؤال می‌سازی.
EN: Use ONLY the exact entries of the given pool. Never invent or use any word/meaning outside the pool. Copy option texts verbatim from the pool (no spelling or spacing changes).
قواعد الزامی:
- فقط از واژه‌های داده‌شده در استخر استفاده کن؛ هیچ واژه یا معنی بیرون از لیست نساز.
- options باید از meanings/words همان pool انتخاب شوند و عیناً کپی شوند؛ هیچ واژهٔ بیرون از لیست نساز.
- هر سؤال واژهٔ متفاوتی از استخر را بپرسد (بدون تکرار واژه).
${shape}
- «answerIndex» اندیس صفر-مبنای گزینهٔ درست است.
خروجی فقط JSON خالص: آرایه‌ای از {"word":"...","sentence":"...","options":["...","...","...","..."],"answerIndex":0} — بدون markdown، بدون هیچ متن اضافه.`;
}

export async function POST(req: NextRequest) {
  // G5-02 — سقف ۱۰ درخواست در دقیقه (الگوی leaderboard؛ LLM هزینه‌بر است)
  const rl = checkRate(req, "game-questions:post", 10, 60_000);
  if (!rl.ok) return rateLimited(rl.retryAfter);

  try {
    // ── اعتبارسنجی بدنه — خطاها ۴۰۰ با پیام فارسی ──
    let body: { game?: unknown; pool?: unknown; count?: unknown };
    try {
      body = (await req.json()) as typeof body;
    } catch {
      return NextResponse.json({ error: "بدنهٔ درخواست JSON معتبر نیست" }, { status: 400 });
    }

    if (body.game !== "cloze" && body.game !== "speed-quiz") {
      return NextResponse.json(
        { error: "نوع بازی فقط cloze یا speed-quiz می‌تواند باشد" },
        { status: 400 },
      );
    }
    const game = body.game;

    if (!Array.isArray(body.pool) || body.pool.length < 4 || body.pool.length > 40) {
      return NextResponse.json(
        { error: "استخر واژه‌ها باید آرایه‌ای با ۴ تا ۴۰ عضو باشد" },
        { status: 400 },
      );
    }
    const rawPool: PoolItem[] = [];
    for (const item of body.pool) {
      if (typeof item !== "object" || item === null) {
        return NextResponse.json(
          { error: "هر عضو استخر باید شیءای با word و meaning باشد" },
          { status: 400 },
        );
      }
      const o = item as Record<string, unknown>;
      if (typeof o.word !== "string" || typeof o.meaning !== "string") {
        return NextResponse.json(
          { error: "هر عضو استخر باید word و meaning رشته‌ای غیرخالی داشته باشد" },
          { status: 400 },
        );
      }
      const word = o.word.replace(/\s+/g, " ").trim().slice(0, WORD_MAX);
      const meaning = o.meaning.replace(/\s+/g, " ").trim().slice(0, WORD_MAX);
      if (!word || !meaning) {
        return NextResponse.json(
          { error: "word و meaning هر عضو استخر باید غیرخالی باشند" },
          { status: 400 },
        );
      }
      rawPool.push({ word, meaning });
    }

    const count = body.count === undefined ? 3 : body.count;
    if (typeof count !== "number" || !Number.isInteger(count) || count < 1 || count > 5) {
      return NextResponse.json(
        { error: "تعداد سؤال باید عدد صحیح بین ۱ تا ۵ باشد" },
        { status: 400 },
      );
    }

    const pool = buildPoolIndex(rawPool);
    if (pool.items.length < 4) {
      return NextResponse.json(
        { error: "استخر واژه‌ها باید حداقل ۴ واژهٔ یکتا داشته باشد" },
        { status: 400 },
      );
    }

    // ── پرامپت — فقط واژه‌های pool؛ درخواست count+۲ تا بعد از فیلتر حاشیه داشته باشیم ──
    const askFor = Math.min(count + 2, 7);
    const list = pool.items
      .map((it, i) => `${i + 1}. word: "${it.word}" — meaning: "${it.meaning}"`)
      .join("\n");
    const user = [
      "استخر واژه‌های همین جزوه (فقط از همین‌ها استفاده کن):",
      list,
      `حالا دقیقاً ${askFor} سؤال از واژه‌های بالا بساز و فقط آرایهٔ JSON بده.`,
    ].join("\n");

    // ── فراخوانی LLM — حداکثر ۲ تلاش؛ بدون لاگ محتوا ──
    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    let questions: AiQuestion[] = [];
    for (let attempt = 0; attempt < 2 && questions.length === 0; attempt++) {
      try {
        const completion = await zai.chat.completions.create({
          messages: [
            { role: "assistant", content: systemPromptFor(game) },
            {
              role: "user",
              content:
                attempt === 0
                  ? user
                  : `${user}\n(پاسخ قبلی معتبر نبود — فقط آرایهٔ JSON خالص با قالب خواسته‌شده بده.)`,
            },
          ],
          thinking: { type: "disabled" },
        });
        const raw = completion.choices[0]?.message?.content ?? "";
        const parsed = extractQuestions(raw);
        if (!parsed) continue;
        // فیلتر سخت سند — هر سؤالِ تخلف‌کار دور ریخته می‌شود
        const valid = parsed
          .map((q) => validateQuestion(q, game, pool))
          .filter((q): q is AiQuestion => q !== null);
        // تنوع: هر واژه حداکثر یک سؤال
        const seenWord = new Set<string>();
        questions = valid.filter((q) => {
          const k = normKey(q.word);
          if (seenWord.has(k)) return false;
          seenWord.add(k);
          return true;
        });
      } catch {
        // خطای شبکه/SDK در این تلاش — بدون لاگ محتوا
      }
    }

    if (questions.length === 0) {
      return NextResponse.json({ error: UNAVAILABLE }, { status: 503 });
    }

    return NextResponse.json({ questions: questions.slice(0, count) });
  } catch (e) {
    console.error("POST /api/game-questions error:", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: UNAVAILABLE }, { status: 503 });
  }
}
