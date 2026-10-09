import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { text, options, answer } = (await req.json()) as {
      text?: string;
      options?: string[];
      answer?: number;
    };

    if (!text || !options || typeof answer !== "number") {
      return NextResponse.json({ error: "داده نامعتبر" }, { status: 400 });
    }

    const correctOption = options[answer] ?? "";
    const system = `تو معلم باتجربه زبان انگلیسی پایه دهم دبیرستان ایران هستی. برای تست گرامر/واژگان داده‌شده، به فارسی ساده توضیح بده:
- یک نکته گرامری یا واژگانی کلیدی که حل تست به آن وابسته است (مطابق سرفصل‌های کتاب Vision 1 پایه دهم: آینده ساده، انواع صفت، گذشته استمراری، ضمایر انعکاسی، افعال ناقص، حروف اضافه، قید حالت یا واژگان درس‌ها)
- یک مثال کوتاه انگلیسی با ترجمه فارسی
قوانین: حداکثر ۶۰ کلمه فارسی. گزینه‌های غلط را لیست نکن و درباره آن‌ها توضیح نده. فقط نکته اصلی + مثال. بدون مقدمه‌چینی.`;

    const user = `Question: ${text}
Options: ${options.map((o, i) => `${"abcd"[i]}) ${o}`).join(" | ")}
Correct answer: ${correctOption}`;

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
