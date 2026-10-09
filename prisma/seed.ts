// Seed script: populates the Question table from extracted data files.
// Run with: bun run prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import { QUIZ_SEED } from "../src/data/quiz-seed";

const db = new PrismaClient();

async function main() {
  const existing = await db.question.count();
  if (existing > 0) {
    await db.question.deleteMany();
    console.log(`Cleared ${existing} existing questions.`);
  }

  const rows = QUIZ_SEED.map((q) => ({
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
  console.log(`✅ Seeded ${rows.length} questions.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
