// Seed script: populates the Question table for VIU Upper-intermediate (فاز ۵) only.
// Run with: bun run prisma/seed-viu-upper.ts
//
// فقط سؤال‌های کتاب «English Vocabulary in Use — Upper-intermediate» جایگزین می‌شوند تا
// سؤال‌ها/شناسه‌های سایر جزوه‌ها (و ستاره‌ها و خطاهای کاربران) دست‌نخورده بمانند.
// الگوی امن prisma/seed-hill.ts و prisma/seed-viu-elem.ts و prisma/seed-viu-preint.ts — هیچ کتاب دیگری در این اسکریپت بازسازی نمی‌شود.
//
// پاسخ هر سؤال = عین Answer key چاپی کتاب (قاعدهٔ طلایی فاز ۵ — سند طراحی فاز ۲ §E-۳).
// level = «استاندارد» عین §E-۲ سند فاز ۲ برای viu-upper.

import { PrismaClient } from "@prisma/client";
import { QUIZ_SEED as VIU_UPPER_QUIZ } from "../src/data/viu-upper/quiz-seed";

const db = new PrismaClient();

async function main() {
  const existing = await db.question.count({ where: { book: "viu-upper" } });
  if (existing > 0) {
    await db.question.deleteMany({ where: { book: "viu-upper" } });
    console.log(`Cleared ${existing} existing questions of "viu-upper".`);
  }

  const rows = VIU_UPPER_QUIZ.map((q) => ({
    book: "viu-upper",
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
  console.log(`✅ Seeded ${rows.length} questions for "viu-upper".`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
