// R0-1 نقشه راه VIU — همگام‌سازی جراحی سؤال‌های درس ۴۲ کتاب viu-preint با دادهٔ منبع (۲۰۲۶-۱۱-۱۷)
// Run with: bun run prisma/fix-viu-preint-l42-duplicate-options.ts
//
// پس‌زمینه (ممیزی کیفیت استخراج ۲۰۲۶-۱۱-۱۶ — تنها باگ واقعی یافته‌شده):
//   ۴ سؤال تمرین 42.3 گزینهٔ تکراری case-variant داشتند («unless» و «Unless» در یک سؤال) چون
//   مخزن تمرین ۴۲٫۳ کتاب دقیقاً سه توکن است (as long as / unless / otherwise) و برای ساختن
//   ۴ گزینه، همان توکن با حرف بزرگ تکرار شده بود.
// تعمیر صادقانه مصوب مالک (فاز R0): حذف گزینهٔ تکراری → سؤال ۳-گزینه‌ایِ هم‌ارز مخزن تمرین ۴۲٫۳
//   — هیچ گزینهٔ جدیدی ساخته نمی‌شود؛ پاسخ درست (از Answer key چاپی) دست‌نخورده می‌ماند.
//
// این اسکریپت «جراحی» است: فقط سؤال‌های book="viu-preint" و lesson=42 را با رکوردهای
//   دادهٔ منبع (src/data/viu-preint/quiz-part-3.ts) تطبیق می‌دهد و فقط سؤال‌هایی را به‌روز
//   می‌کند که options/answer/explanation آن‌ها با منبع فرق داشته باشد.
//   ⇒ شناسهٔ سؤال‌ها (cuid) دست‌نخورده می‌ماند ⇒ دفتر خطاها/SRS کاربران سالم می‌ماند.
//   ⇒ هیچ سؤالی حذف یا ساخته نمی‌شود؛ هیچ کتاب دیگری بازسازی نمی‌شود.
// idempotent: اجرای دوباره = صفر تغییر.

import { PrismaClient } from "@prisma/client";
import { QUIZ_SEED as VIU_PREINT_QUIZ } from "../src/data/viu-preint/quiz-seed";

const db = new PrismaClient();

async function main() {
  const source = VIU_PREINT_QUIZ.filter((q) => q.lesson === 42);
  const rows = await db.question.findMany({ where: { book: "viu-preint", lesson: 42 } });
  console.log(`source lesson-42 questions: ${source.length} · db lesson-42 questions: ${rows.length}`);
  if (source.length !== rows.length) {
    console.error("⚠️ شمار سؤال‌های درس ۴۲ در db با دادهٔ منبع برابر نیست — بدون تغییر متوقف شد (بدون بازسازی خودکار).");
    process.exit(1);
  }

  const byText = new Map(source.map((q) => [q.text, q]));
  let updated = 0, alreadyOk = 0, unmatched = 0;
  for (const row of rows) {
    const src = byText.get(row.text);
    if (!src) { unmatched++; console.log(`no source match for db id=${row.id} text="${row.text.slice(0, 50)}…"`); continue; }
    const srcOptions = JSON.stringify(src.options);
    if (row.options === srcOptions && row.answer === src.answer && row.explanation === (src.explanation ?? null)) {
      alreadyOk++;
      continue;
    }
    await db.question.update({
      where: { id: row.id },
      data: {
        options: srcOptions,
        answer: src.answer,
        explanation: src.explanation ?? null,
      },
    });
    updated++;
    console.log(`updated id=${row.id} text="${row.text.slice(0, 50)}…"`);
  }
  console.log(`✅ done — updated=${updated} · alreadyOk=${alreadyOk} · unmatched=${unmatched} (id ثابت ماند — صفر حذف/ساخت)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
