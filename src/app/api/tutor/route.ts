import { NextRequest, NextResponse } from "next/server";
import { bookPromptLine } from "../_lib/book";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SYSTEM_PROMPT = `تو «دستیار زبان» جزوه «ویژن وان» هستی؛ یک معلم زبان انگلیسی صمیمی و حوصله‌سر‌حال برای دانش‌آموز پایه دهم دبیرستان ایران.

وظیفه‌ات: کمک به تمرین مکالمه انگلیسی، توضیح واژه‌ها و گرامر کتاب Vision 1 پایه دهم (درس‌ها: Saving Nature، Wonders of Creation، The Value of Knowledge، Traveling the World).

قوانین پاسخ‌دهی (بسیار مهم):
1. پاسخ را با یک یا دو جمله انگلیسی ساده (سطح A2) شروع کن.
2. بلافاصله در خط بعد، ترجمه فارسی آن را داخل پرانتز بیاور: (ترجمه: ...)
3. اگر دانش‌آموز اشتباه گرامری یا املایی کرد، به‌آرامی اصلاحش کن و در یک جمله کوتاه نکته گرامری مربوط به کتاب را یادآوری کن.
4. واژه‌های تازه‌ی درس‌ها را در مکالمه به‌کار ببر و در پایان یک سؤال کوتاه انگلیسی بپرس تا مکالمه ادامه پیدا کند.
5. پاسخ‌ها کوتاه، دوستانه و تشویق‌کننده باشند (حداکثر ۴ خط).
6. اگر درباره موضوع کاملاً نامرتبط پرسید، مؤدبانه او را به تمرین زبان انگلیسی برگردان.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, book } = (await req.json()) as {
      messages?: ChatMessage[];
      book?: { id?: string; title?: string; grade?: string };
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "پیامی ارسال نشده" }, { status: 400 });
    }

    // ── خط «کتاب فعلی کاربر» به پرامپت سیستم افزوده می‌شود (دستورهای قبلی حفظ می‌شوند) ──
    const systemPrompt = `${SYSTEM_PROMPT}\n\n${bookPromptLine(book)}`;

    const trimmed = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-12)
      .map((m) => ({ role: m.role, content: String(m.content).slice(0, 1500) }));

    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: systemPrompt },
        ...trimmed,
      ],
      thinking: { type: "disabled" },
    });

    const reply = completion.choices[0]?.message?.content ?? "";
    if (!reply.trim()) {
      return NextResponse.json(
        { error: "پاسخی دریافت نشد، دوباره تلاش کنید" },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch (e) {
    console.error("POST /api/tutor error:", e);
    return NextResponse.json(
      { error: "خطا در ارتباط با دستیار هوشمند" },
      { status: 500 },
    );
  }
}
