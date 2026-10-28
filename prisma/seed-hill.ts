// Seed script: populates the Question table for the Hill story books only.
// Run with: bun run prisma/seed-hill.ts
//
// فقط سؤال‌های کتاب‌های داستانی Steps to Understanding جایگزین می‌شوند تا
// سؤال‌ها/شناسه‌های سایر جزوه‌ها (و ستاره‌ها و خطاهای کاربران) دست‌نخورده بمانند.
// (اسکریپت کامل prisma/seed.ts همهٔ جزوه‌ها را بازسازی می‌کند — برای کتاب‌های
// قدیمی هرگز اجراش نکنید چون شناسهٔ سؤال‌ها عوض می‌شود.)

import { PrismaClient } from "@prisma/client";
import { QUIZ_SEED as HILL_INTRO_QUIZ } from "../src/data/hill-intro/quiz-seed";
import { QUIZ_SEED as HILL_ELEM_QUIZ } from "../src/data/hill-elem/quiz-seed";
import { QUIZ_SEED as HILL_INTER_QUIZ } from "../src/data/hill-inter/quiz-seed";
import { QUIZ_SEED as HILL_ADV_QUIZ } from "../src/data/hill-adv/quiz-seed";

const db = new PrismaClient();

const SOURCES: { book: string; rows: typeof HILL_INTRO_QUIZ }[] = [
  { book: "hill-intro", rows: HILL_INTRO_QUIZ },
  { book: "hill-elem", rows: HILL_ELEM_QUIZ as typeof HILL_INTRO_QUIZ },
  { book: "hill-inter", rows: HILL_INTER_QUIZ as typeof HILL_INTRO_QUIZ },
  { book: "hill-adv", rows: HILL_ADV_QUIZ as typeof HILL_INTRO_QUIZ },
];

async function main() {
  for (const src of SOURCES) {
    const existing = await db.question.count({ where: { book: src.book } });
    if (existing > 0) {
      await db.question.deleteMany({ where: { book: src.book } });
      console.log(`Cleared ${existing} existing questions of "${src.book}".`);
    }

    const rows = src.rows.map((q) => ({
      book: src.book,
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
    console.log(`✅ Seeded ${rows.length} questions for "${src.book}".`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
