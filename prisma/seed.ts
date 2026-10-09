// Seed script: populates the Question table from extracted data files.
// Run with: bun run prisma/seed.ts
//
// چندکتابی امن: فقط سؤال‌های همان جزوه جایگزین می‌شوند تا
// نتایج آزمون (Attempt) و سؤال‌های سایر جزوه‌ها دست‌نخورده بمانند.

import { PrismaClient } from "@prisma/client";
import { QUIZ_SEED as VISION_ONE_QUIZ } from "../src/data/vision-one/quiz-seed";
import { QUIZ_SEED as GRADE_SEVEN_QUIZ } from "../src/data/grade-7/quiz-seed";
import { QUIZ_SEED as GRADE_NINE_QUIZ } from "../src/data/grade-9/quiz-seed";

const db = new PrismaClient();

const SOURCES: { book: string; rows: typeof VISION_ONE_QUIZ }[] = [
  { book: "vision-one", rows: VISION_ONE_QUIZ },
  { book: "grade-7", rows: GRADE_SEVEN_QUIZ as typeof VISION_ONE_QUIZ },
  { book: "grade-9", rows: GRADE_NINE_QUIZ as typeof VISION_ONE_QUIZ },
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
