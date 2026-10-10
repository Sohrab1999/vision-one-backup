import { createRequire } from "module";
import { PrismaClient } from "@prisma/client";
import type { PrismaClient as PrismaClientType } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prismaV9: PrismaClientType | undefined;
};

/**
 * ساخت کلاینت پرisma مستقیم از دیسک (Node Module Loader — خارج از باندل توربوپک).
 * چرا؟ سرور dev طولانی‌عمر پس از `prisma db push`/`generate` همچنان باندل کهنهٔ
 * node_modules را سرو می‌کند و مدل‌های تازه (مثل کلاس مجازی فاز ۹) را نمی‌بیند.
 * با این روش بدون ری‌استارت سرور، همیشه کلاینت تازهٔ دیسک ساخته می‌شود؛
 * پس از ری‌استارت کامل هم همین مسیر درست کار می‌کند.
 */
function loadFreshPrismaClient(): PrismaClientType | null {
  try {
    const nodeRequire = createRequire(process.cwd() + "/package.json");
    // پاک‌سازی کش require برای پکیج‌های پرisma — وگرنه نمونهٔ کهنهٔ لودشده در
    // لحظهٔ استارت سرور (پیش از db push) دوباره برمی‌گردد
    for (const key of Object.keys(nodeRequire.cache)) {
      if (key.includes(".prisma") || key.includes("@prisma")) {
        delete nodeRequire.cache[key];
      }
    }
    const mod = nodeRequire("@prisma/client") as {
      PrismaClient: new (options: { log: string[] }) => PrismaClientType;
    };
    return new mod.PrismaClient({ log: ["query"] });
  } catch (e) {
    console.error("[db] fresh prisma client load failed:", e);
    return null;
  }
}

function makeDb(): PrismaClientType {
  // ۱) کلاینت تازهٔ دیسک — همیشه دارای آخرین مدل‌های schema.prisma
  const fresh = loadFreshPrismaClient();
  // گارد self-heal: هر مدل تازه باید اینجا OR شود تا پس از db push بدون ری‌استارت لود شود
  if (fresh && ("classroom" in fresh || "wordNote" in fresh)) return fresh;
  // ۲) راه بازگشتی: کلاینت باندل‌شده (اگر دیسک موقتاً در دسترس نبود)
  if (fresh) return fresh;
  return new PrismaClient({ log: ["query"] });
}

function getDb(): PrismaClientType {
  const cached = globalForPrisma.prismaV9;
  // نمونهٔ کش‌شده فقط وقتی معتبر است که مدل‌های فاز ۹/۱۰ را داشته باشد
  if (cached && ("classroom" in cached || "wordNote" in cached)) return cached;
  const created = makeDb();
  globalForPrisma.prismaV9 = created;
  return created;
}

export const db = getDb();
