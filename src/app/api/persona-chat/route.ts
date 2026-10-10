import { NextRequest, NextResponse } from "next/server";
import { bookPromptLine } from "../_lib/book";
import { consumeDailyQuota, userKeyOf } from "../_lib/ai-guard";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// ── کنترل هزینه ──
const DAILY_LIMIT = 40; // سقف روزانهٔ ردوبدل شخصیت‌ها به‌ازای هر کاربر
const MAX_MESSAGES = 12; // فقط آخرین ۱۲ پیام گفتگو به مدل می‌رود
const MAX_CHARS = 600; // سقف نویسهٔ هر پیام

type PersonaId = "stranger" | "classmate" | "traveler";
type Level = "A2" | "B1";

const PERSONA_IDS: readonly PersonaId[] = ["stranger", "classmate", "traveler"];

/** قاعدهٔ سطح واژگان — در هر پرامپت شخصیت تزریق می‌شود */
function levelRule(level: Level): string {
  return level === "B1"
    ? "- The student's level is B1: you may build slightly longer sentences with one dependent clause (because / when / if), but stay clear and simple."
    : "- The student's level is A2: write very simple sentences only (subject + verb + object). One idea per sentence, no long clauses.";
}

/** قواعد مشترک هر سه شخصیت — ماندن در نقش، طول پاسخ، سطح واژگان و خط 💡 فارسی */
const COMMON_RULES = (level: Level) => `RULES (very important):
- Always stay in character. Never say or hint that you are an AI or a language model.
- Reply with ONLY 1 to 3 short English sentences per message — never more.
- Use ONLY vocabulary and grammar that a teenage Iranian student at this level knows.
${levelRule(level)}
- End most replies with a short, friendly question so the conversation keeps going.
- NEVER write Persian anywhere in your reply, EXCEPT: if the student made a clear grammar or vocabulary mistake, add exactly one short Persian line starting with "💡" that gives a kind, gentle correction (or a tiny tip). If the student made no clear mistake, add NO Persian line at all.
- Be warm, playful and encouraging — talking to you should feel easy and fun.`;

// ── ۱) سام «غریبهٔ مهربان» 🚏 — small talk در ایستگاه اتوبوس / صف نانوایی / پارک ──
const STRANGER_PROMPT = (level: Level) => `You are Sam, a kind and curious stranger who chats with an Iranian high-school student learning English.
You meet by chance in everyday places: at a bus stop, in line at the bakery, or in a park.
You love small talk: the weather, music, sports, weekend plans, snacks, pets and funny everyday things.
You are always positive and curious — you react warmly to everything and ask friendly follow-up questions.
${COMMON_RULES(level)}`;

// ── ۲) میا «هم‌کلاسی» 🎒 — تکالیف، امتحان فردا، درس انگلیسی، برنامهٔ پروژه ──
const CLASSMATE_PROMPT = (level: Level) => `You are Mia, a friendly classmate of an Iranian high-school student. You sit in the same English class and often study together.
You talk about school life: homework, tomorrow's exam, the English lesson, planning a class project, school clubs, the cafeteria and the next break.
Sometimes you ask the student for help too — you make them feel useful and confident, and you celebrate small wins together.
${COMMON_RULES(level)}`;

// ── ۳) لئو «مسافر» ✈️ — اولین سفر به ایران: جهت‌ها، غذا، جاذبه‌ها، فرودگاه و هتل ──
const TRAVELER_PROMPT = (level: Level) => `You are Leo, a cheerful young traveler visiting Iran (the student's city) for the very first time.
You ask about everything a tourist needs: directions, local foods, famous places, the airport, the hotel, buses and taxis, shopping and souvenirs.
You are excited about every little thing and love getting tips from a local — you thank the student warmly for every answer.
${COMMON_RULES(level)}`;

const SYSTEM_OF: Record<PersonaId, (level: Level) => string> = {
  stranger: STRANGER_PROMPT,
  classmate: CLASSMATE_PROMPT,
  traveler: TRAVELER_PROMPT,
};

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/** سطح معتبر — A2 پیش‌فرض */
function cleanLevel(input: unknown): Level {
  return input === "B1" ? "B1" : "A2";
}

/** پاک‌سازی پیام‌های گفتگو: نقش معتبر، trim، سقف ۶۰۰ نویسه، آخرین ۱۲ پیام */
function cleanMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];
  const out: ChatMessage[] = [];
  for (const raw of input) {
    if (typeof raw !== "object" || raw === null) continue;
    const m = raw as { role?: unknown; content?: unknown };
    if (m.role !== "user" && m.role !== "assistant") continue;
    const content = typeof m.content === "string" ? m.content.trim().slice(0, MAX_CHARS) : "";
    if (!content) continue;
    out.push({ role: m.role, content });
  }
  return out.slice(-MAX_MESSAGES);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      persona?: unknown;
      messages?: unknown;
      level?: unknown;
      book?: { id?: string; title?: string; grade?: string };
    };

    // ── اعتبارسنجی شخصیت ──
    const persona = body.persona;
    if (typeof persona !== "string" || !PERSONA_IDS.includes(persona as PersonaId)) {
      return NextResponse.json(
        { error: "شخصیت انتخاب‌شده معتبر نیست — یکی از سه شخصیت را انتخاب کن" },
        { status: 400 },
      );
    }

    // ── اعتبارسنجی پیام‌ها ──
    const messages = cleanMessages(body.messages);
    if (messages.length === 0) {
      return NextResponse.json(
        { error: "پیامی برای گفتگو پیدا نشد — اول یک پیام انگلیسی بنویس" },
        { status: 400 },
      );
    }
    if (!messages.some((m) => m.role === "user")) {
      return NextResponse.json(
        { error: "حداقل یک پیام از طرف تو لازم است تا شخصیت جواب بدهد" },
        { status: 400 },
      );
    }

    const level = cleanLevel(body.level);

    // ── سقف روزانه ──
    const userKey = userKeyOf(req, "persona-chat");
    if (!consumeDailyQuota(userKey, DAILY_LIMIT)) {
      return NextResponse.json(
        { error: "سقف روزانهٔ چت با شخصیت‌ها پر شد — فردا دوباره سر بزن! 🌱" },
        { status: 429 },
      );
    }

    // ── پرامپت سیستم: نقش شخصیت + قواعد + زمینهٔ کتاب فعلی ──
    const system = `${SYSTEM_OF[persona as PersonaId](level)}\n\n${bookPromptLine(body.book)}`;

    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: system },
        ...messages,
      ],
      thinking: { type: "disabled" },
    });

    const reply = completion.choices[0]?.message?.content?.trim() ?? "";
    if (!reply) {
      return NextResponse.json(
        { error: "شخصیت جواب نداد — یک بار دیگر پیامت را بفرست" },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch (e) {
    console.error("POST /api/persona-chat error:", e);
    return NextResponse.json(
      { error: "خطا در ارتباط با شخصیت‌ها — کمی بعد دوباره تلاش کن" },
      { status: 500 },
    );
  }
}
