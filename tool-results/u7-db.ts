import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const rows = await db.attempt.findMany({
  where: { category: "fps-shooter" },
  orderBy: { createdAt: "desc" },
  take: 3,
  select: { id: true, detail: true, total: true, correct: true, createdAt: true },
});
for (const r of rows) {
  const d = JSON.parse(r.detail || "{}");
  console.log(JSON.stringify({ at: r.createdAt?.toISOString?.(), total: r.total, correct: r.correct, survive: d.survive, wave: d.wave, mode: d.mode, difficulty: d.difficulty, score: d.score }));
}
await db.$disconnect();
