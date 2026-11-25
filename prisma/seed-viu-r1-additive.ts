// R1-c نقشه راه کیفیت استخراج VIU — seed «افزودنی» سؤال‌های موج R1 در db (۲۰۲۶-۱۱-۱۷)
// Run with: bun run prisma/seed-viu-r1-additive.ts
//
// تفاوت بنیادی با seed-viu-*.ts فازهای ۳-۵: این اسکریپت «افزودنی» است —
//   هیچ سؤالِ موجودی حذف یا بازنویسی نمی‌شود ⇒ شناسه‌های cuid سؤال‌های قبلی
//   (و ارجاع دفتر خطاها/SRS/آزمون‌های کاربران) بایت‌به‌بیت سالم می‌مانند.
// فقط سؤال‌های جدید QUIZ_R1 هر کتاب درج می‌شوند؛ تشخیص تکرار با
//   (book, lesson, text, scope) — اجرای دوباره = صفر تغییر (idempotent).
//
// منبع سؤال‌ها: src/data/viu-*/quiz-r1.ts — تولید ماشینی بازتولیدپذیر
//   bun scripts/viu-r1-quiz-convert.mjs convert (فقط تمرین‌های دارای کلید چاپی — قاعدهٔ طلایی §E-۳)

import { PrismaClient } from "@prisma/client";
import { QUIZ_R1 as VIU_ELEM_R1 } from "../src/data/viu-elem/quiz-r1";
import { QUIZ_R1 as VIU_PREINT_R1 } from "../src/data/viu-preint/quiz-r1";
import { QUIZ_R1 as VIU_UPPER_R1 } from "../src/data/viu-upper/quiz-r1";

const db = new PrismaClient();

const WAVES = [
  { book: "viu-elem", seeds: VIU_ELEM_R1 },
  { book: "viu-preint", seeds: VIU_PREINT_R1 },
  { book: "viu-upper", seeds: VIU_UPPER_R1 },
];

async function main() {
  let insertedTotal = 0, skippedTotal = 0;
  for (const { book, seeds } of WAVES) {
    const existingRows = await db.question.findMany({
      where: { book },
      select: { id: true, lesson: true, text: true, scope: true },
    });
    const existingKeys = new Set(existingRows.map((r) => `${r.lesson}|${r.text}|${r.scope}`));
    const rows = seeds
      .map((q) => ({
        book,
        category: q.category,
        lesson: q.lesson,
        scope: q.scope,
        text: q.text,
        options: JSON.stringify(q.options),
        answer: q.answer,
        level: q.level,
        explanation: q.explanation ?? null,
      }))
      .filter((r) => !existingKeys.has(`${r.lesson}|${r.text}|${r.scope}`));
    const skipped = seeds.length - rows.length;
    if (rows.length > 0) await db.question.createMany({ data: rows });
    console.log(`${book}: seeds=${seeds.length} · inserted=${rows.length} · skipped(already)=${skipped}`);
    insertedTotal += rows.length;
    skippedTotal += skipped;
  }
  const after = await db.question.groupBy({ by: ["book"], _count: true, where: { book: { startsWith: "viu-" } } });
  console.log(`✅ R1 additive seed done — inserted=${insertedTotal} · skipped=${skippedTotal}`);
  console.log(`db viu-* totals: ${after.map((a) => `${a.book}=${a._count}`).join(" · ")}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
