import { db } from "../src/lib/db";
async function main() {
  const rows = await db.attempt.findMany({ where: { category: "fps-shooter" }, orderBy: { createdAt: "desc" }, take: 3 });
  for (const r of rows) {
    let d: Record<string, unknown> = {};
    try { d = JSON.parse(r.detail || "{}"); } catch {}
    console.log(JSON.stringify({ id: r.id, correct: r.correct, total: r.total, diff: d.difficulty, cageThrown: d.cageThrown, cageHits: d.cageHits, enemyStalks: d.enemyStalks, enemyCharges: d.enemyCharges, enemyFlees: d.enemyFlees, enemyLost: d.enemyLost, enemyHiddenS: d.enemyHiddenS, bossInterrupts: d.bossInterrupts, survive: d.survive, hasScore: typeof d.score === "number", wave: d.wave, map: d.map }));
  }
  await db.$disconnect();
}
main();
