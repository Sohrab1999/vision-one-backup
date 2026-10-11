import { NextRequest, NextResponse } from "next/server";
import { checkRate, rateLimited } from "../_lib/rate-limit";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * G5-01 — «مدرس بازی» با LLM (فاز G5 نقشه راه بازی‌ها — docs/games-roadmap.md).
 *
 * بعد از ۳ خطا در یک بازی، کلاینت این مسیر را با فهرست خطاها صدا می‌زند و یک
 * توضیح کوتاه فارسی (حداکثر ۲ جمله) دربارهٔ همان واژه/نکتهٔ گرامری می‌گیرد.
 *
 * قراردادها:
 * - اعتبارسنجی سخت با پیام فارسی ۴۰۰ (الگوی بقیهٔ APIها)
 * - rate-limit با قرارداد مشترک rate-limit.ts (۸ درخواست در دقیقه برای هر IP)
 * - حریم خصوصی نوجوان: هیچ محتوای کاربر (خطاها/متن‌ها) لاگ نمی‌شود
 * - هر شکست SDK / پاسخ خالی → ۵۰۳ با متن ثابت «راهنما آفلاین در دسترس نیست»
 */

/** پیام ثابت آفلاین — متن دقیق پذیرش سند؛ کلاینت هم همین را نمایش می‌دهد */
const OFFLINE_MSG = "راهنما آفلاین در دسترس نیست";

const SYSTEM_PROMPT = `تو یک معلم زبان انگلیسی مهربان برای دانش‌آموز نوجوان ایرانی هستی. دانش‌آموز در یک بازی آموزشی زبان، واژه یا نکتهٔ گرامری را اشتباه جواب داده است. فقط به فارسی و در حداکثر ۲ جملهٔ کوتاه، همان واژه یا نکتهٔ گرامری را ساده و دلگرم‌کننده توضیح بده تا دفعهٔ بعد درست جواب بدهد. فهرست ننویس، از markdown استفاده نکن، حداکثر یک ایموجی. اگر اطلاعات کافی در درخواست نیست، یک نکتهٔ کلی و مفید دربارهٔ همان واژه بگو.`;

/** اگر پاسخ LLM خیلی طولانی شد → فقط ۲ جملهٔ اول (شکستن روی «.» یا «!» یا «؟») */
function shortenHint(raw: string): string {
  const text = raw.replace(/\s+/g, " ").trim();
  if (!text) return "";
  if (text.length <= 400) return text;
  const parts = text
    .split(/(?<=[.!?؟])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const two = parts.slice(0, 2).join(" ").trim();
  return two || text.slice(0, 400);
}

export async function POST(req: NextRequest) {
  const rl = checkRate(req, "game-hint:post", 8, 60_000);
  if (!rl.ok) return rateLimited(rl.retryAfter);
  try {
    let body: { game?: unknown; mistakes?: unknown };
    try {
      body = (await req.json()) as typeof body;
    } catch {
      return NextResponse.json({ error: "بدنهٔ درخواست JSON معتبر نیست" }, { status: 400 });
    }

    // ── اعتبارسنجی سخت — پیام فارسی ۴۰۰ (الگوی بقیهٔ APIها) ──
    const game = typeof body.game === "string" ? body.game.trim() : "";
    if (game.length < 1 || game.length > 40) {
      return NextResponse.json({ error: "نام بازی باید متنی بین ۱ تا ۴۰ کاراکتر باشد" }, { status: 400 });
    }
    if (!Array.isArray(body.mistakes) || body.mistakes.length < 1 || body.mistakes.length > 3) {
      return NextResponse.json({ error: "خطاها باید آرایه‌ای با ۱ تا ۳ خطا باشند" }, { status: 400 });
    }

    interface Mistake {
      prompt?: string;
      answer?: string;
      chosen?: string;
    }
    const mistakes: Mistake[] = [];
    for (const raw of body.mistakes) {
      if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
        return NextResponse.json({ error: "هر خطا باید یک شیء باشد" }, { status: 400 });
      }
      const item: Mistake = {};
      for (const key of ["prompt", "answer", "chosen"] as const) {
        const v = (raw as Record<string, unknown>)[key];
        if (v === undefined || v === null) continue;
        if (typeof v !== "string") {
          return NextResponse.json({ error: `فیلد ${key} باید متن باشد` }, { status: 400 });
        }
        const t = v.trim();
        if (t.length > 160) {
          return NextResponse.json({ error: "متن هر فیلد حداکثر ۱۶۰ کاراکتر است" }, { status: 400 });
        }
        if (t) item[key] = t;
      }
      mistakes.push(item);
    }

    // پرامپت کاربر — JSON فشردهٔ بازی + خطاها (فیلدهای خالی حذف می‌شوند)
    const clean = mistakes.map((m) => {
      const o: Record<string, string> = {};
      if (m.prompt) o.prompt = m.prompt;
      if (m.answer) o.answer = m.answer;
      if (m.chosen) o.chosen = m.chosen;
      return o;
    });
    const userPrompt = JSON.stringify({ game, mistakes: clean });

    // ── LLM با SDK بک‌اند (فقط سرور) — الگوی بقیهٔ مسیرهای AI پروژه ──
    try {
      const ZAI = (await import("z-ai-web-dev-sdk")).default;
      const zai = await ZAI.create();
      const completion = await zai.chat.completions.create({
        messages: [
          { role: "assistant", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        thinking: { type: "disabled" },
      });
      const hint = shortenHint(completion.choices[0]?.message?.content?.trim() ?? "");
      if (!hint) {
        return NextResponse.json({ error: OFFLINE_MSG }, { status: 503 });
      }
      return NextResponse.json({ hint });
    } catch {
      // خطای شبکه/SDK — بدون لاگ محتوای کاربر (حریم خصوصی نوجوان)
      return NextResponse.json({ error: OFFLINE_MSG }, { status: 503 });
    }
  } catch (e) {
    console.error("POST /api/game-hint error:", e);
    return NextResponse.json({ error: "خطا در ساختن راهنمای مدرس بازی" }, { status: 500 });
  }
}
