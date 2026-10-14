import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const rows = await db.attempt.findMany({
  where: { category: "fps-shooter" },
  orderBy: { createdAt: "desc" },
  take: 3,
  select: { createdAt: true, detail: true, total: true, correct: true },
});
for (const r of rows) console.log(r.createdAt?.toISOString(), "total=", r.total, "detail=", r.detail);
await db.$disconnect();
