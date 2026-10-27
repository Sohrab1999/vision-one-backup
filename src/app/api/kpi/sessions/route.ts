/**
 * GET /api/kpi/sessions?days=7[&rotate=1] — داشبورد KPI بازی‌ها (docs/games-kpi.md).
 *
 * تجمیع K1 (بازگشت روزانه) / K2 (تکمیل جلسه) / K3 (حلقهٔ یادگیری) از رویدادهای
 * client-log در dev.log و آرشیوهای چرخش. بدون PII — فقط شمارش و مدت رُند.
 *
 * - `days` (۱..۹۰، پیش‌فرض ۷): پنجرهٔ تجمیع
 * - `rotate=1`: پیش از تجمیع، اگر dev.log از آستانهٔ ۸MB گذشت چرخش copytruncate شود
 *   (الگوی اسکریپت scripts/rotate-devlog.sh — برای فراخوانی دستی/زمان‌بندی‌شده)
 */

import { NextResponse } from "next/server";
import { aggregateKpi, rotateLogIfNeeded } from "@/lib/kpi-log";

export const dynamic = "force-dynamic";

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const daysParam = Number(url.searchParams.get("days") ?? "7");
    const rotated =
      url.searchParams.get("rotate") === "1" ? rotateLogIfNeeded() : null;
    const data = aggregateKpi(Number.isFinite(daysParam) ? daysParam : 7);
    return NextResponse.json({ ...data, rotated });
  } catch (err) {
    return NextResponse.json(
      { error: "kpi-aggregate-failed", message: err instanceof Error ? err.message : "unknown" },
      { status: 500 },
    );
  }
}
