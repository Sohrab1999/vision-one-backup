"use client";

/**
 * رسم نمودارهای آمار — فاز ۸ (عملکرد، ۸-ب):
 * recharts (~۱.۹MB decoded در dev) از بستهٔ اولیهٔ chunk آمار خارج شد و به یک
 * chunk جداگانهٔ lazy منتقل شد. این فایل فقط «رسم» را دارد؛ شرط‌های رندر
 * (chart.length >= 2 و byCategory.length > 0) و اسکلت‌ها همان‌جا در stats-view
 * می‌مانند و با React.lazy + Suspense (اسکلت هم‌ارتفاع h-56 → CLS صفر) لود می‌شود.
 * هر دو نمودار (Area دقت + Bar دسته‌ها) داخل همین یک فایل‌اند تا فقط یک chunk
 * اضافه شود. شکل props عیناً همان داده‌های قبلی است — هیچ تغییری در داده.
 */

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Cell,
} from "recharts";
import { faNum } from "@/components/book/games/shared";

/** یک نقطهٔ روند دقت — عیناً همان شکل ChartPoint در stats-view (ساختاری) */
export interface ChartPoint {
  id: string;
  accuracy: number;
  category: string;
  createdAt: string;
  idx: number;
}

/** یک ستون میانگین دقتِ دسته — خروجی byCategory در stats-view */
export interface CategoryPoint {
  category: string;
  accuracy: number;
}

/** یک روز از «بار مرور ۷ روز آینده» — خروجی summarize در srs-stats-section */
export interface SrsLoadPoint {
  name: string;
  count: number;
}

/** یک روز از «منحنی فراموشی شخصی» — خروجی summarize در srs-stats-section */
export interface SrsCurvePoint {
  t: number;
  r: number;
}

// الگوی تولتیپ SRS — همان کپی قبلی از compare-view (توکن‌های تیره/روشن)
const SRS_TOOLTIP_STYLE = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  fontSize: 12,
  fontFamily: "inherit",
} as const;

/** نمودار سطح روند دقت آزمون‌ها (٪) — رسمِ شاخهٔ chart.length >= 2 */
export function AccuracyAreaChart({ data }: { data: ChartPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 6, right: 6, bottom: 0, left: -18 }}>
        <defs>
          <linearGradient id="statsAcc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0.03} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="idx" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <ChartTooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            fontSize: 12,
            fontFamily: "inherit",
          }}
          formatter={(v: number) => [`${v.toLocaleString("fa-IR")}٪`, "دقت"]}
          labelFormatter={(l: number) => `آزمون شماره ${l.toLocaleString("fa-IR")}`}
        />
        <Area type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2.5} fill="url(#statsAcc)" dot={{ r: 3, fill: "#10b981" }} activeDot={{ r: 5 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/** نمودار ستونی میانگین دقت به تفکیک دسته — رسمِ شاخهٔ byCategory.length > 0 */
export function CategoryBarChart({ data }: { data: CategoryPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 6, right: 6, bottom: 0, left: -18 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="category" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
        <ChartTooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            fontSize: 12,
            fontFamily: "inherit",
          }}
          formatter={(v: number) => [`${v.toLocaleString("fa-IR")}٪`, "میانگین دقت"]}
        />
        <Bar dataKey="accuracy" radius={[8, 8, 0, 0]} maxBarSize={64}>
          {data.map((_, i) => (
            <Cell key={i} fill={i % 2 === 0 ? "#10b981" : "#f59e0b"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ── فاز ۸ (تکمیل): نمودارهای SRS هم به همین chunk lazy منتقل شدند —
 * srs-stats-section استاتیک recharts را در گراف اولیهٔ آمار می‌کشید (شاهد:
 * تایم‌لاین منابع، chunk جداگانهٔ recharts در بستهٔ اولیهٔ کلیک آمار) —
 * رسم منتقل شد؛ شرط‌ها و سربرگ‌ها همان‌جا در srs-stats-section می‌مانند. */

/** نمودار ستونی «بار مرور ۷ روز آینده» — رسمِ شاخهٔ s.inCycle > 0 */
export function SrsLoadBarChart({ data }: { data: SrsLoadPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 6, right: 6, bottom: 0, left: -18 }}>
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
          contentStyle={SRS_TOOLTIP_STYLE}
          formatter={(v: number | string) => [`${Number(v).toLocaleString("fa-IR")} کارت`, "مرور"]}
        />
        <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} maxBarSize={44} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/** نمودار سطحی «منحنی فراموشی شخصی» — رسمِ شاخهٔ s.inCycle > 0 */
export function SrsCurveAreaChart({ data }: { data: SrsCurvePoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 6, right: 6, bottom: 0, left: -12 }}>
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
          contentStyle={SRS_TOOLTIP_STYLE}
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
  );
}
