// Seed script: populates the Question table for VIU Pre-intermediate & intermediate (فاز ۴) only.
// Run with: bun run prisma/seed-viu-preint.ts
//
// فقط سؤال‌های کتاب «English Vocabulary in Use — Pre-intermediate & intermediate» جایگزین می‌شوند تا
// سؤال‌ها/شناسه‌های سایر جزوه‌ها (و ستاره‌ها و خطاهای کاربران) دست‌نخورده بمانند.
// الگوی امن prisma/seed-hill.ts و prisma/seed-viu-elem.ts — هیچ کتاب دیگری در این اسکریپت بازسازی نمی‌شود.
//
// پاسخ هر سؤال = عین Answer key چاپی کتاب (قاعدهٔ طلایی فاز ۴ — سند طراحی فاز ۲ §E-۳).
// level = «متوسط» عین §E-۲ سند فاز ۲ برای viu-preint.

import { PrismaClient } from "@prisma/client";
import { QUIZ_SEED as VIU_PREINT_QUIZ } from "../src/data/viu-preint/quiz-seed";

const db = new PrismaClient();

async function main() {
  const existing = await db.question.count({ where: { book: "viu-preint" } });
  if (existing > 0) {
    await db.question.deleteMany({ where: { book: "viu-preint" } });
    console.log(`Cleared ${existing} existing questions of "viu-preint".`);
  }

  const rows = VIU_PREINT_QUIZ.map((q) => ({
    book: "viu-preint",
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
  console.log(`✅ Seeded ${rows.length} questions for "viu-preint".`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
