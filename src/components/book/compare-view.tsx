"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  CalendarRange,
  Info,
  LineChart as LineChartIcon,
  RefreshCw,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 * نمای «مقایسه پایه‌ها» — آمار مقایسه‌ای شش جزوه کتابخانه کنار هم (فاز ۷).
 * مستقل از رجیستری: BOOK_META به‌صورت محلی تعریف شده تا این فایل بدون وابستگی باشد.
 * منبع داده: GET /api/compare (گروه‌بندی کل تاریخچه + heatmap ۹۰ روزه + روند دقت ۳۰ روزه).
 */

// ── شناسنامه محلی کتاب‌ها — پالت emerald/amber/teal/violet/orange/rose (بدون آبی/ایندیگو) ──
interface BookMetaRow {
  id: string;
  emoji: string;
  title: string;
  gradeLabel: string;
  /** برچسب کوتاه محور نمودار */
  short: string;
  /** متن رنگی (روشن/تاریک) */
  text: string;
  /** پس‌زمینهٔ ملایم */
  soft: string;
  /** نوار پیشرفت */
  bar: string;
  /** رنگ hex برای recharts */
  hex: string;
}

const BOOK_META: BookMetaRow[] = [
  { id: "vision-one", emoji: "📗", title: "ویژن وان", gradeLabel: "پایه دهم", short: "دهم", text: "text-emerald-600 dark:text-emerald-400", soft: "bg-emerald-500/10", bar: "bg-emerald-500", hex: "#10b981" },
  { id: "grade-7", emoji: "📙", title: "زبان انگلیسی هفتم", gradeLabel: "پایه هفتم", short: "هفتم", text: "text-amber-600 dark:text-amber-400", soft: "bg-amber-500/10", bar: "bg-amber-500", hex: "#f59e0b" },
  { id: "grade-8", emoji: "📘", title: "زبان انگلیسی هشتم", gradeLabel: "پایه هشتم", short: "هشتم", text: "text-teal-600 dark:text-teal-400", soft: "bg-teal-500/10", bar: "bg-teal-500", hex: "#14b8a6" },
  { id: "grade-9", emoji: "📕", title: "زبان انگلیسی نهم", gradeLabel: "پایه نهم", short: "نهم", text: "text-violet-600 dark:text-violet-400", soft: "bg-violet-500/10", bar: "bg-violet-500", hex: "#8b5cf6" },
  { id: "grade-11", emoji: "📒", title: "زبان انگلیسی یازدهم", gradeLabel: "پایه یازدهم", short: "یازدهم", text: "text-orange-600 dark:text-orange-400", soft: "bg-orange-500/10", bar: "bg-orange-500", hex: "#f97316" },
  { id: "grade-12", emoji: "📓", title: "زبان انگلیسی دوازدهم", gradeLabel: "پایه دوازدهم", short: "دوازدهم", text: "text-rose-600 dark:text-rose-400", soft: "bg-rose-500/10", bar: "bg-rose-500", hex: "#f43f5e" },
];

// ── شکل پاسخ API ──
interface BookRow {
  book: string;
  attempts: number;
  answered: number;
  correct: number;
  accuracy: number | null;
  best: number | null;
  lastActivity: string | null;
}

interface TrendPoint {
  date: string;
  accuracy: number;
}

interface ComparePayload {
  books: BookRow[];
  heatmap: Record<string, Record<string, number>>;
  trend: Record<string, TrendPoint[]>;
  rangeDays: number;
}

type Phase = "loading" | "ready" | "error";

const TOOLTIP_STYLE = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  fontSize: 12,
  fontFamily: "inherit",
} as const;

const faNum = (v: number): string => v.toLocaleString("fa-IR");

function localDateKey(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

/** "2025-10-02" → "10/2" — برچسب کوتاه محور روند */
function shortDate(key: string): string {
  const parts = key.split("-");
  return `${Number(parts[1])}/${Number(parts[2])}`;
}

/** شدت رنگ خانه‌های heatmap بر اساس تعداد آزمون آن روز */
function heatClass(n: number): string {
  if (n <= 0) return "bg-muted";
  if (n <= 2) return "bg-emerald-200 dark:bg-emerald-900";
  if (n <= 4) return "bg-emerald-400 dark:bg-emerald-700";
  return "bg-emerald-600 dark:bg-emerald-500";
}

const HEAT_LEGEND = [0, 2, 4, 6]; // نمونه‌های کم‌به‌زیاد برای چهار پلهٔ رنگ

export function CompareView({ onNavigate }: { onNavigate?: (view: string) => void }) {
  // پارامتر onNavigate برای سیم‌کشی بعدی ناوبری توسط اورکستراتور رزرو شده است
  void onNavigate;

  const [phase, setPhase] = useState<Phase>("loading");
  const [payload, setPayload] = useState<ComparePayload | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/compare");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as ComparePayload;
        if (cancelled) return;
        setPayload(json);
        setPhase("ready");
      } catch {
        if (!cancelled) setPhase("error");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const retry = () => {
    setPhase("loading");
    setPayload(null);
    setReloadKey((k) => k + 1);
  };

  const rangeDays = payload?.rangeDays ?? 90;

  // ── ردیف هر کتاب: متادیتای محلی + دادهٔ API ──
  const rows = useMemo(() => {
    const byBook = new Map((payload?.books ?? []).map((b) => [b.book, b]));
    return BOOK_META.map((meta) => ({ meta, row: byBook.get(meta.id) ?? null }));
  }, [payload]);

  const totalAttempts = rows.reduce((s, r) => s + (r.row?.attempts ?? 0), 0);

  // ── دادهٔ نمودار ستونی — فقط پایه‌های دارای دقت ──
  const barData = useMemo(
    () =>
      rows.flatMap(({ meta, row }) =>
        row?.accuracy != null
          ? [{ short: meta.short, gradeLabel: meta.gradeLabel, accuracy: row.accuracy, hex: meta.hex }]
          : [],
      ),
    [rows],
  );

  // ── روند: یکدست‌سازی تاریخ‌های همهٔ کتاب‌ها برای چندخطی شدن نمودار ──
  const trendMeta = useMemo(
    () => (payload ? BOOK_META.filter((m) => (payload.trend[m.id]?.length ?? 0) > 0) : []),
    [payload],
  );

  const trendData = useMemo(() => {
    if (!payload) return [];
    const dateKeys = new Set<string>();
    for (const m of BOOK_META) {
      for (const p of payload.trend[m.id] ?? []) dateKeys.add(p.date);
    }
    const pointsByBook = new Map(
      BOOK_META.map((m) => [m.id, new Map((payload.trend[m.id] ?? []).map((p) => [p.date, p.accuracy]))]),
    );
    return [...dateKeys]
      .sort()
      .map((d) => {
        const point: Record<string, number | string> = { date: shortDate(d) };
        for (const m of BOOK_META) {
          const v = pointsByBook.get(m.id)?.get(d);
          if (v != null) point[m.id] = v;
        }
        return point;
      });
  }, [payload]);

  // ── ۹۰ روز اخیر صعودی برای سلول‌های heatmap ──
  const dayKeys = useMemo(() => {
    const today = new Date();
    const keys: string[] = [];
    for (let i = rangeDays - 1; i >= 0; i--) {
      keys.push(localDateKey(new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)));
    }
    return keys;
  }, [rangeDays]);

  // ── حالت بارگذاری ──
  if (phase === "loading") {
    return (
      <div className="space-y-6" aria-busy="true" aria-label="در حال بارگذاری آمار مقایسه‌ای">
        <div className="space-y-2">
          <Skeleton className="h-7 w-44 rounded-lg" />
          <Skeleton className="h-3.5 w-72 max-w-full rounded-md" />
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="mt-3 h-4 w-2/3 rounded-md" />
                <Skeleton className="mt-2 h-3 w-1/2 rounded-md" />
                <Skeleton className="mt-2.5 h-1.5 w-full rounded-full" />
                <Skeleton className="mt-2 h-2.5 w-1/2 rounded-md" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="p-5">
            <Skeleton className="mb-4 h-4 w-40 rounded-md" />
            <Skeleton className="h-[280px] w-full rounded-lg" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <Skeleton className="mb-4 h-4 w-40 rounded-md" />
            <Skeleton className="h-44 w-full rounded-lg" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── حالت خطا ──
  if (phase === "error") {
    return (
      <Alert variant="destructive" aria-label="خطا در دریافت آمار مقایسه‌ای">
        <RefreshCw size={16} />
        <AlertTitle>خطا در دریافت آمار مقایسه‌ای</AlertTitle>
        <AlertDescription>
          <p>اتصال را بررسی کنید و دوباره تلاش کنید.</p>
          <Button
            type="button"
            onClick={retry}
            className="mt-2 h-11 min-w-11 px-5 font-black focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <RefreshCw size={15} />
            تلاش دوباره
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // ── نمای اصلی ──
  return (
    <div className="space-y-6">
      {/* ── هدر ── */}
      <div className="rise-in">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="flex items-center gap-2 text-xl font-black">
            <BarChart3 size={20} className="text-primary" />
            مقایسه پایه‌ها
          </h1>
          <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-[11px] font-black">
            <Users size={13} />
            {faNum(totalAttempts)} آزمون در کل کتابخانه
          </Badge>
        </div>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          کارنامه شش جزوه کتابخانه کنار هم — دقت، فعالیت و روند پیشرفت هر پایه در یک نگاه.
        </p>
      </div>

      {/* ── کارت‌های KPI هر پایه ── */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-6" aria-label="خلاصهٔ آمار هر پایه">
        {rows.map(({ meta, row }, i) => {
          const acc = row?.accuracy ?? null;
          const best = row?.best ?? null;
          return (
            <Card
              key={meta.id}
              className={`rise-in rise-in-${(i % 4) + 1} overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl text-xl leading-none", meta.soft)} aria-hidden>
                    {meta.emoji}
                  </span>
                  {row != null && row.attempts > 0 ? (
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-black", meta.soft, meta.text)}>
                      {faNum(row.attempts)} آزمون
                    </span>
                  ) : null}
                </div>
                <p className="mt-2.5 truncate text-[13px] font-black">{meta.gradeLabel}</p>
                <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                  دقت: {acc != null ? `${faNum(acc)}٪` : "—"}
                </p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn("h-full rounded-full transition-all duration-500", meta.bar)}
                    style={{ width: `${acc ?? 0}%` }}
                  />
                </div>
                <p className="mt-1.5 text-[10px] text-muted-foreground">
                  بهترین رکورد: {best != null ? `${faNum(best)}٪` : "—"}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* ── نمودار ستونی دقت ── */}
      <Card className="rise-in" aria-label="نمودار ستونی میانگین دقت هر پایه">
        <CardContent className="p-5">
          <p className="mb-3 flex items-center gap-2 text-sm font-bold">
            <Target size={15} className="text-primary" />
            میانگین دقت هر پایه (٪)
          </p>
          {barData.length > 0 ? (
            <div className="h-[280px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 6, right: 6, bottom: 0, left: -18 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="short"
                    tick={{ fontSize: 10.5, fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <ChartTooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(v: number | string) => [`${Number(v).toLocaleString("fa-IR")}٪`, "میانگین دقت"]}
                  />
                  <Bar dataKey="accuracy" radius={[8, 8, 0, 0]} maxBarSize={52} isAnimationActive={false}>
                    {barData.map((d, i) => (
                      <Cell key={`${d.short}-${i}`} fill={d.hex} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-[280px] items-center justify-center text-center text-xs text-muted-foreground">
              <div>
                <Target size={26} className="mx-auto mb-2 opacity-40" />
                هنوز در هیچ پایه‌ای آزمون ثبت نشده است.
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── heatmap فعالیت ۹۰ روزه ── */}
      <Card className="rise-in" aria-label={`نقشه حرارتی فعالیت ${faNum(rangeDays)} روز اخیر به تفکیک پایه`}>
        <CardContent className="p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="flex items-center gap-2 text-sm font-bold">
              <CalendarRange size={15} className="text-primary" />
              فعالیت {faNum(rangeDays)} روز اخیر
            </p>
            <div className="flex items-center gap-1.5 text-[10.5px] text-muted-foreground">
              <span>کم</span>
              {HEAT_LEGEND.map((n) => (
                <span
                  key={n}
                  aria-hidden
                  className={cn("h-2.5 w-2.5 rounded-[3px] border border-black/5 dark:border-white/5", heatClass(n))}
                />
              ))}
              <span>زیاد</span>
            </div>
          </div>

          <div className="space-y-4">
            {rows.map(({ meta, row }) => {
              const heat = payload?.heatmap[meta.id];
              const hasHeat = !!heat && Object.keys(heat).length > 0;
              const activeDays = hasHeat ? Object.values(heat).filter((n) => n > 0).length : 0;
              return (
                <div key={meta.id} className="flex items-start gap-3">
                  <div className="flex w-28 shrink-0 items-center gap-1.5 pt-0.5">
                    <span className="text-base leading-none" aria-hidden>
                      {meta.emoji}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-bold">{meta.gradeLabel}</p>
                      {hasHeat ? (
                        <p className="text-[9.5px] text-muted-foreground">{faNum(activeDays)} روز فعال</p>
                      ) : row != null && row.attempts > 0 ? (
                        <p className="text-[9.5px] text-muted-foreground">{faNum(row.attempts)} آزمون (قدیمی)</p>
                      ) : null}
                    </div>
                  </div>
                  {hasHeat ? (
                    <div dir="ltr" className="flex min-w-0 flex-1 flex-wrap gap-[3px]">
                      {dayKeys.map((k) => {
                        const n = heat[k] ?? 0;
                        const tip = `${k} — ${n > 0 ? `${faNum(n)} آزمون` : "بدون فعالیت"}`;
                        return (
                          <span
                            key={k}
                            title={tip}
                            aria-label={tip}
                            className={cn(
                              "block h-2.5 w-2.5 rounded-[3px] border border-black/5 dark:border-white/5",
                              heatClass(n),
                            )}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <p className="flex-1 self-center text-[11px] text-muted-foreground">بدون فعالیت اخیر</p>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* ── روند دقت ۳۰ روزه ── */}
      <Card className="rise-in" aria-label="نمودار خطی روند دقت ۳۰ روز اخیر به تفکیک پایه">
        <CardContent className="p-5">
          <p className="mb-3 flex items-center gap-2 text-sm font-bold">
            <TrendingUp size={15} className="text-primary" />
            روند دقت ۳۰ روز اخیر (٪)
          </p>
          {trendData.length > 0 && trendMeta.length > 0 ? (
            <div className="h-[260px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 6, right: 6, bottom: 0, left: -18 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <ChartTooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(v: number | string) => [`${Number(v).toLocaleString("fa-IR")}٪`, "دقت"]}
                  />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} iconType="plainline" />
                  {trendMeta.map((m) => (
                    <Line
                      key={m.id}
                      type="monotone"
                      dataKey={m.id}
                      name={m.gradeLabel}
                      stroke={m.hex}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                      connectNulls
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-44 items-center justify-center text-center text-xs text-muted-foreground">
              <div>
                <LineChartIcon size={26} className="mx-auto mb-2 opacity-40" />
                برای رسم روند، در ۳۰ روز اخیر آزمون برگزار کنید.
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── پانویس ── */}
      <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Info size={12} className="shrink-0" />
        نتایج از آزمون‌های انجام‌شده در همین دستگاه جمع‌آوری می‌شود.
      </p>
    </div>
  );
}
