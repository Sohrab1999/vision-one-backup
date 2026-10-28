// Seed script: populates the Question table from extracted data files.
// Run with: bun run prisma/seed.ts
//
// چندکتابی امن: فقط سؤال‌های همان جزوه جایگزین می‌شوند تا
// نتایج آزمون (Attempt) و سؤال‌های سایر جزوه‌ها دست‌نخورده بمانند.

import { PrismaClient } from "@prisma/client";
import { QUIZ_SEED as VISION_ONE_QUIZ } from "../src/data/vision-one/quiz-seed";
import { QUIZ_SEED as GRADE_SEVEN_QUIZ } from "../src/data/grade-7/quiz-seed";
import { QUIZ_SEED as GRADE_EIGHT_QUIZ } from "../src/data/grade-8/quiz-seed";
import { QUIZ_SEED as GRADE_NINE_QUIZ } from "../src/data/grade-9/quiz-seed";
import { QUIZ_SEED as GRADE_ELEVEN_QUIZ } from "../src/data/grade-11/quiz-seed";
import { QUIZ_SEED as GRADE_TWELVE_QUIZ } from "../src/data/grade-12/quiz-seed";
import { QUIZ_SEED as HILL_INTRO_QUIZ } from "../src/data/hill-intro/quiz-seed";
import { QUIZ_SEED as HILL_ELEM_QUIZ } from "../src/data/hill-elem/quiz-seed";
import { QUIZ_SEED as HILL_INTER_QUIZ } from "../src/data/hill-inter/quiz-seed";
import { QUIZ_SEED as HILL_ADV_QUIZ } from "../src/data/hill-adv/quiz-seed";

const db = new PrismaClient();

const SOURCES: { book: string; rows: typeof VISION_ONE_QUIZ }[] = [
  { book: "vision-one", rows: VISION_ONE_QUIZ },
  { book: "grade-7", rows: GRADE_SEVEN_QUIZ as typeof VISION_ONE_QUIZ },
  { book: "grade-8", rows: GRADE_EIGHT_QUIZ as typeof VISION_ONE_QUIZ },
  { book: "grade-9", rows: GRADE_NINE_QUIZ as typeof VISION_ONE_QUIZ },
  { book: "grade-11", rows: GRADE_ELEVEN_QUIZ as typeof VISION_ONE_QUIZ },
  { book: "grade-12", rows: GRADE_TWELVE_QUIZ as typeof VISION_ONE_QUIZ },
  // کتاب‌های داستانی Steps to Understanding — سؤال‌های درست/نادرست از خود داستان‌ها
  // (برای اجرای امنِ فقط همین‌ها: prisma/seed-hill.ts)
  { book: "hill-intro", rows: HILL_INTRO_QUIZ as typeof VISION_ONE_QUIZ },
  { book: "hill-elem", rows: HILL_ELEM_QUIZ as typeof VISION_ONE_QUIZ },
  { book: "hill-inter", rows: HILL_INTER_QUIZ as typeof VISION_ONE_QUIZ },
  { book: "hill-adv", rows: HILL_ADV_QUIZ as typeof VISION_ONE_QUIZ },
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
