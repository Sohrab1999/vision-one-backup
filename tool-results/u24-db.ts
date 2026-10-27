// Task 24-QA — DB verification for U9 (difficulty balance & version seal)
// Pattern: u8-db.ts — prisma on db/custom.db via src/lib/db
import { db } from "../src/lib/db";

async function main() {
  const rows = await db.attempt.findMany({
    where: { category: "fps-shooter" },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
  for (const r of rows) {
    let d: Record<string, unknown> = {};
    try { d = JSON.parse(r.detail || "{}"); } catch {}
    console.log(
      JSON.stringify({
        id: r.id,
        createdAt: r.createdAt,
        correct: r.correct,
        total: r.total,
        diff: d.difficulty,
        tap: d.tap,
        qTimeS: d.qTimeS,
        quality: d.quality,
        score: d.score,
        rank: d.rank,
        wave: d.wave,
        map: d.map,
        survive: d.survive,
        cageThrown: d.cageThrown,
        cageHits: d.cageHits,
        enemyStalks: d.enemyStalks,
        enemyCharges: d.enemyCharges,
        enemyFlees: d.enemyFlees,
        enemyLost: d.enemyLost,
        enemyHiddenS: d.enemyHiddenS,
        bossInterrupts: d.bossInterrupts,
      })
    );
  }
  // full raw detail of the latest attempt
  const last = rows[0];
  if (last) {
    console.log("RAW_DETAIL_LAST=" + (last.detail || "{}"));
  }
  await db.$disconnect();
}
main();
