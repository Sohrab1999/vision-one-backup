"use client";

/**
 * بخش «مرور فاصله‌دار (SRS)» در نمای آمار — فاز ۲ نقشه راه.
 *
 * منابع داده: استور ری‌اکتیو کتاب فعال (useSRSData) — واژه و فعل با هم در یک استور
 * (کلید فعل‌ها با پیشوند "v:") و واحد شمارش کل استور کافی است.
 * محتوا: سربرگ + دکمهٔ «شروع مرور امروز» · KPI چهارگانه · نمودار ستونی «بار مرور
 * ۷ روز آینده» · نمودار سطحی «منحنی فراموشی شخصی» · حالت خالی صفر کارت.
 *
 * قواعد: همهٔ محاسبات خالص در useMemo (بدون setState در effect)؛ نمودارهای recharts
 * داخل پوشهٔ dir="ltr"؛ اعداد فارسی؛ پالت فقط emerald/amber/teal + توکن‌های معنایی.
 */

import { useMemo } from "react";
import {
  AlertTriangle,
  Brain,
  CalendarClock,
  CalendarDays,
  Gauge,
  Play,
  Repeat,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSRSData, type SrsItem } from "@/lib/srs-store";
import { DAY_MS, boxFromState, isLeech } from "@/lib/srs-engine";
import { faNum } from "@/components/book/games/shared";

// الگوی تولتیپ — کپی از compare-view (توکن‌های تیره/روشن)
const TOOLTIP_STYLE = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  fontSize: 12,
  fontFamily: "inherit",
} as const;

interface SrsSummary {
  /** سررسید امروز (reps>0 و dueAt<=now — عقب‌افتاده‌ها هم شمرده می‌شوند) */
  due: number;
  /** کارت در چرخه (reps>0) */
  inCycle: number;
  /** کارت دردسرساز (isLeech) */
  leech: number;
  /** میانگین جعبه ÷۵ به درصد (۰..۱۰۰) */
  mastery: number;
  /** بار مرور ۷ روز آینده */
  load: { name: string; count: number }[];
  /** منحنی فراموشی شخصی — ۱۵ روز */
  curve: { t: number; r: number }[];
}

/** خلاصهٔ وضعیت کل استور SRS — تابع خالص (فقط ورودی‌اش را می‌خواند) */
function summarize(srs: Record<string, SrsItem>): SrsSummary {
  const now = Date.now();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const day0 = start.getTime();
  const weekday = new Intl.DateTimeFormat("fa-IR", { weekday: "short" });

  let due = 0;
  let inCycle = 0;
  let leech = 0;
  let boxSum = 0;
  let intervalSum = 0;
  let intervalN = 0;
  const buckets = [0, 0, 0, 0, 0, 0, 0];

  for (const st of Object.values(srs)) {
    if (st.reps <= 0) continue; // کارت‌های نو هنوز وارد چرخه نشده‌اند
    inCycle++;
    if (st.dueAt <= now) due++;
    if (isLeech(st)) leech++;
    boxSum += boxFromState(st);
    if (st.interval > 0) {
      intervalSum += st.interval;
      intervalN++;
    }
    // کارت‌های عقب‌افتاده (dueAt قبل از امروز) در ستون «امروز» جمع می‌شوند
    const idx = Math.floor((st.dueAt - day0) / DAY_MS);
    if (idx < 0) buckets[0] += 1;
    else if (idx < 7) buckets[idx] += 1;
  }

  const load = buckets.map((count, i) => ({
    name: i === 0 ? "امروز" : i === 1 ? "فردا" : weekday.format(new Date(day0 + i * DAY_MS)),
    count,
  }));

  // ثابت زمانی منحنی فراموشی = میانگین فاصلهٔ مرور (روز) کارت‌های در چرخه — خالی → ۱ روز
  const s = intervalN > 0 ? intervalSum / intervalN : 1;
  const curve = Array.from({ length: 15 }, (_, t) => ({
    t,
    r: Math.round(100 * Math.exp(-t / s)),
  }));

  return {
    due,
    inCycle,
    leech,
    mastery: inCycle > 0 ? Math.round((boxSum / inCycle / 5) * 100) : 0,
    load,
    curve,
  };
}

/**
 * بخش SRS نمای آمار — onNavigate اختیاری و بی‌استفاده-امن
 * («مرور امروز» یک ViewId معتبر است؛ در stats-view با آداپتور ViewId پاس داده می‌شود).
 */
export function SrsStatsSection({ onNavigate }: { onNavigate?: (v: string) => void }) {
  const srs = useSRSData();
  const s = useMemo(() => summarize(srs), [srs]);

  return (
    <section className="space-y-3" aria-label="مرور فاصله‌دار (SRS)">
      {/* ── سربرگ ── */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="flex items-center gap-2 text-base font-black">
            <Brain size={17} className="text-emerald-500" />
            مرور فاصله‌دار (SRS)
          </h2>
          <Badge variant="secondary" className="text-[11px]">
            {faNum(s.inCycle)} کارت در چرخه
          </Badge>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => onNavigate?.("review")}>
          <Play size={14} />
          شروع مرور امروز
        </Button>
      </div>

      {/* ── KPI چهارگانه ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="list" aria-label="خلاصهٔ وضعیت مرور فاصله‌دار">
        <div className="rounded-xl border p-3" role="listitem">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xl font-black leading-none text-primary">{faNum(s.due)}</p>
            <CalendarClock size={15} className="shrink-0 text-primary/70" aria-hidden />
          </div>
          <p className="mt-1.5 text-[11px] leading-4 text-muted-foreground">سررسید امروز</p>
        </div>
        <div className="rounded-xl border p-3" role="listitem">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xl font-black leading-none text-teal-500">{faNum(s.inCycle)}</p>
            <Repeat size={15} className="shrink-0 text-teal-500/70" aria-hidden />
          </div>
          <p className="mt-1.5 text-[11px] leading-4 text-muted-foreground">کارت در چرخه</p>
        </div>
        <div className="rounded-xl border p-3" role="listitem">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xl font-black leading-none text-amber-500">{faNum(s.leech)}</p>
            <AlertTriangle size={15} className="shrink-0 text-amber-500/70" aria-hidden />
          </div>
          <p className="mt-1.5 text-[11px] leading-4 text-muted-foreground">دردسرساز</p>
        </div>
        <div className="rounded-xl border p-3" role="listitem">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xl font-black leading-none text-emerald-500">{faNum(s.mastery)}٪</p>
            <Gauge size={15} className="shrink-0 text-emerald-500/70" aria-hidden />
          </div>
          <p className="mt-1.5 text-[11px] leading-4 text-muted-foreground">میانگین تسلط</p>
        </div>
      </div>

      {s.inCycle === 0 ? (
        /* ── حالت خالی — هنوز هیچ کارتی وارد چرخهٔ مرور نشده ── */
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-2.5 p-8 text-center">
            <Brain size={26} className="text-muted-foreground opacity-40" aria-hidden />
            <p className="text-xs leading-5 text-muted-foreground">
              هنوز کارتی در چرخهٔ مرور نیست — با فلش‌کارت‌ها یا «مرور امروز» شروع کن.
            </p>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => onNavigate?.("review")}>
              <Play size={14} />
              رفتن به مرور امروز
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {/* ── نمودار ستونی: بار مرور ۷ روز آینده ── */}
          <Card className="rise-in" aria-label="نمودار ستونی بار مرور ۷ روز آینده">
            <CardContent className="p-5">
              <p className="mb-3 flex items-center gap-2 text-sm font-bold">
                <CalendarDays size={15} className="text-emerald-500" />
                بار مرور ۷ روز آینده
              </p>
              <div dir="ltr">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={s.load} margin={{ top: 6, right: 6, bottom: 0, left: -18 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                      interval={0}
                    />
                    <YAxis
                      allowDecimals={false}
                      width={28}
                      tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <ChartTooltip
                      contentStyle={TOOLTIP_STYLE}
                      formatter={(v: number | string) => [`${Number(v).toLocaleString("fa-IR")} کارت`, "مرور"]}
                    />
                    <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} maxBarSize={44} isAnimationActive={false} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* ── نمودار سطحی: منحنی فراموشی شخصی ── */}
          <Card className="rise-in rise-in-1" aria-label="نمودار سطحی منحنی فراموشی شخصی">
            <CardContent className="p-5">
              <p className="mb-3 flex items-center gap-2 text-sm font-bold">
                <TrendingDown size={15} className="text-amber-500" />
                منحنی فراموشی شخصی
              </p>
              <div dir="ltr">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={s.curve} margin={{ top: 6, right: 6, bottom: 0, left: -12 }}>
                    <defs>
                      <linearGradient id="fc-fade" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis
                      dataKey="t"
                      tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                      interval={2}
                      tickFormatter={(t: number) => faNum(t)}
                      label={{
                        value: "روز",
                        position: "insideBottom",
                        offset: -2,
                        fontSize: 10,
                        fill: "var(--muted-foreground)",
                      }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      width={34}
                      tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v: number) => `${faNum(v)}٪`}
                    />
                    <ChartTooltip
                      contentStyle={TOOLTIP_STYLE}
                      formatter={(v: number | string) => [
                        `ماندگاری تقریبی: ${Number(v).toLocaleString("fa-IR")}٪`,
                        "",
                      ]}
                      labelFormatter={(t: number) => `روز ${Number(t).toLocaleString("fa-IR")}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="r"
                      stroke="#f59e0b"
                      strokeWidth={2.5}
                      fill="url(#fc-fade)"
                      fillOpacity={1}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-2 text-center text-[10.5px] leading-4 text-muted-foreground">
                بر مبنای فاصلهٔ میانگین مرورهای فعلی تو — هرچه مرورها فاصله‌دارتر، افت کندتر.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}
