// Seed script: populates the Question table for VIU Advanced (فاز A5 — کتاب چهارم VIU) only.
// Run with: bun run prisma/seed-viu-advanced.ts
//
// فقط سؤال‌های کتاب «English Vocabulary in Use — Advanced» جایگزین می‌شوند تا
// سؤال‌ها/شناسه‌های سایر جزوه‌ها (و ستاره‌ها و خطاهای کاربران) دست‌نخورده بمانند.
// الگوی امن prisma/seed-hill.ts و seed-viu-elem.ts و seed-viu-preint.ts و seed-viu-upper.ts.
//
// پاسخ هر سؤال = عین Answer key چاپی کتاب (رأی‌نامهٔ گیت G3 — فقط تمرین‌های کلیددار تبدیل‌پذیر مکانیکی؛
// صفر پاسخ ساخته‌شده) · level = «استاندارد» عین الگوی فاز ۵ سه‌کتابی.

import { PrismaClient } from "@prisma/client";
import { QUIZ_SEED as VIU_ADVANCED_QUIZ } from "../src/data/viu-advanced/quiz-seed";

const db = new PrismaClient();

async function main() {
  const existing = await db.question.count({ where: { book: "viu-advanced" } });
  if (existing > 0) {
    await db.question.deleteMany({ where: { book: "viu-advanced" } });
    console.log(`Cleared ${existing} existing questions of "viu-advanced".`);
  }

  const rows = VIU_ADVANCED_QUIZ.map((q) => ({
    book: "viu-advanced",
    category: q.category,
    lesson: q.lesson,
    scope: q.scope,
    text: q.text,
    options: JSON.stringify(q.options),
    answer: q.answer,
    level: q.level,
    explanation: q.explanation ?? null,
  }));

  await db.question.createMany({ data: rows });
  console.log(`✅ Seeded ${rows.length} questions for "viu-advanced".`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
