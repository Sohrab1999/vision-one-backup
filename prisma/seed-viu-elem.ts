// Seed script: populates the Question table for VIU Elementary (فاز ۳) only.
// Run with: bun run prisma/seed-viu-elem.ts
//
// فقط سؤال‌های کتاب «English Vocabulary in Use — Elementary» جایگزین می‌شوند تا
// سؤال‌ها/شناسه‌های سایر جزوه‌ها (و ستاره‌ها و خطاهای کاربران) دست‌نخورده بمانند.
// الگوی امن prisma/seed-hill.ts — هیچ کتاب دیگری در این اسکریپت بازسازی نمی‌شود.
//
// پاسخ هر سؤال = عین Answer key چاپی کتاب (قاعدهٔ طلایی فاز ۳ — سند طراحی فاز ۲ §E-۳).

import { PrismaClient } from "@prisma/client";
import { QUIZ_SEED as VIU_ELEM_QUIZ } from "../src/data/viu-elem/quiz-seed";

const db = new PrismaClient();

async function main() {
  const existing = await db.question.count({ where: { book: "viu-elem" } });
  if (existing > 0) {
    await db.question.deleteMany({ where: { book: "viu-elem" } });
    console.log(`Cleared ${existing} existing questions of "viu-elem".`);
  }

  const rows = VIU_ELEM_QUIZ.map((q) => ({
    book: "viu-elem",
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
  console.log(`✅ Seeded ${rows.length} questions for "viu-elem".`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
