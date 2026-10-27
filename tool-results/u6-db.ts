import { db } from "../src/lib/db";
async function main() {
  const rows = await db.attempt.findMany({ where: { category: "fps-shooter" }, orderBy: { createdAt: "desc" }, take: 4 });
  for (const r of rows) {
    let d: Record<string, unknown> = {};
    try { d = JSON.parse(r.detail || "{}"); } catch {}
    console.log(JSON.stringify({ id: r.id, correct: r.correct, total: r.total, map: d.map, diff: d.difficulty, cage: d.cageThrown, down: d.cageDowned, hits: d.cageHits, boss: d.bossStage }));
  }
  await db.$disconnect();
}
main();
