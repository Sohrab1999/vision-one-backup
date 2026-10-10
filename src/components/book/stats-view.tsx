"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Trophy,
  Target,
  ClipboardList,
  BookOpen,
  Flame,
  Timer,
  TrendingUp,
  Medal,
  Lock,
  Sparkles,
  History,
  Crown,
  Users,
  Play,
  Crosshair,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
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
import { useLearnedWords } from "@/lib/learned-store";
import { useStreak } from "@/lib/streak-store";
import { useUserName } from "@/lib/name-store";
import { useDailyGoal } from "@/lib/goal-store";
import { useDailyInfo } from "@/lib/daily-store";
import { useQuestionStars } from "@/lib/question-star-store";
import { useCombinedRounds } from "@/lib/round-counters";
import { setPracticeIds } from "@/lib/practice-store";
import { useBook } from "@/lib/book-context";
import { ActivityHeatmap } from "./activity-heatmap";
import { SrsStatsSection } from "./srs-stats-section";
import { ProgressCardGenerator } from "./progress-card-generator";
import { toast } from "sonner";
import type { ViewId } from "./app-header";

interface AttemptStats {
  attempts: number;
  sumTotal: number;
  sumCorrect: number;
  accuracy: number;
  best: number;
}

interface ChartPoint {
  id: string;
  accuracy: number;
  category: string;
  createdAt: string;
  idx: number;
}

interface RecentAttempt {
  id: string;
  category: string;
  total: number;
  correct: number;
  duration: number;
  name: string | null;
  createdAt: string;
}

interface LeaderRow {
  name: string;
  quizzes: number;
  answered: number;
  accuracy: number;
  best: number;
  lastPlayed: string;
}

interface TopMiss {
  id: string;
  text: string;
  options: string[];
  answer: number;
  category: string;
  misses: number;
}

const CATEGORY_FA: Record<string, string> = {
  grammar: "گرامر",
  vocabulary: "واژگان",
  all: "ترکیبی",
  review: "مرور اشتباهات",
  daily: "چالش روزانه",
  weekly: "چالش هفتگی",
  starred: "تمرین ستاره‌دار",
  combined: "مرور ترکیبی",
};

const ACHIEVEMENTS: {
  id: string;
  icon: string;
  title: string;
  desc: string;
  check: (c: AchContext) => boolean;
  progress?: (c: AchContext) => [number, number];
}[] = [
  {
    id: "first-quiz",
    icon: "🎯",
    title: "اولین قدم",
    desc: "اولین آزمون را کامل کن",
    check: (c) => c.attempts >= 1,
    progress: (c) => [Math.min(c.attempts, 1), 1],
  },
  {
    id: "quiz-5",
    icon: "📚",
    title: "پنج‌تایی",
    desc: "۵ آزمون برگزار کن",
    check: (c) => c.attempts >= 5,
    progress: (c) => [Math.min(c.attempts, 5), 5],
  },
  {
    id: "quiz-10",
    icon: "🏆",
    title: "ده‌تایی",
    desc: "۱۰ آزمون برگزار کن",
    check: (c) => c.attempts >= 10,
    progress: (c) => [Math.min(c.attempts, 10), 10],
  },
  {
    id: "quiz-25",
    icon: "👑",
    title: "کهربایی",
    desc: "۲۵ آزمون برگزار کن",
    check: (c) => c.attempts >= 25,
    progress: (c) => [Math.min(c.attempts, 25), 25],
  },
  {
    id: "acc-60",
    icon: "⭐",
    title: "تیرانداز",
    desc: "رکورد ۶۰٪ یا بالاتر بگیر",
    check: (c) => c.best >= 60,
    progress: (c) => [Math.min(c.best, 60), 60],
  },
  {
    id: "acc-80",
    icon: "🌟",
    title: "عالی",
    desc: "رکورد ۸۰٪ یا بالاتر بگیر",
    check: (c) => c.best >= 80,
    progress: (c) => [Math.min(c.best, 80), 80],
  },
  {
    id: "acc-100",
    icon: "💯",
    title: "بی‌نقص",
    desc: "یک آزمون را ۱۰۰٪ جواب بزن",
    check: (c) => c.best >= 100,
    progress: (c) => [Math.min(c.best, 100), 100],
  },
  {
    id: "q-100",
    icon: "🧠",
    title: "پرسش‌پرداز",
    desc: "به ۱۰۰ سؤال پاسخ بده",
    check: (c) => c.sumTotal >= 100,
    progress: (c) => [Math.min(c.sumTotal, 100), 100],
  },
  {
    id: "w-50",
    icon: "🌱",
    title: "واژه‌آغاز",
    desc: "۵۰ واژه را یاد بگیر",
    check: (c) => c.learned >= 50,
    progress: (c) => [Math.min(c.learned, 50), 50],
  },
  {
    id: "w-150",
    icon: "🌿",
    title: "واژه‌ران",
    desc: "۱۵۰ واژه را یاد بگیر",
    check: (c) => c.learned >= 150,
    progress: (c) => [Math.min(c.learned, 150), 150],
  },
  {
    id: "w-500",
    icon: "🌳",
    title: "واژه‌استاد",
    desc: "۵۰۰ واژه را یاد بگیر",
    check: (c) => c.learned >= 500,
    progress: (c) => [Math.min(c.learned, 500), 500],
  },
  {
    id: "streak-3",
    icon: "🔥",
    title: "سه‌روز پیاپی",
    desc: "۳ روز متوالی فعال باش",
    check: (c) => c.streakBest >= 3,
    progress: (c) => [Math.min(c.streakBest, 3), 3],
  },
  {
    id: "streak-7",
    icon: "⚡",
    title: "هفت‌روز پیاپی",
    desc: "۷ روز متوالی فعال باش",
    check: (c) => c.streakBest >= 7,
    progress: (c) => [Math.min(c.streakBest, 7), 7],
  },
  {
    id: "daily-goal",
    icon: "🌱",
    title: "هدف‌مند",
    desc: "به هدف روزانه واژگان برس",
    check: (c) => c.goalHit,
    progress: (c) => [c.goalHit ? 1 : 0, 1],
  },
  {
    id: "daily-challenge-3",
    icon: "🎯",
    title: "چالش‌باز",
    desc: "۳ چالش روزانه را کامل کن",
    check: (c) => c.dailyDone >= 3,
    progress: (c) => [Math.min(c.dailyDone, 3), 3],
  },
  {
    id: "combined-review",
    icon: "🧩",
    title: "مرورگر",
    desc: "یک مرور ترکیبی کامل کن",
    check: (c) => c.combinedRounds >= 1,
    progress: (c) => [Math.min(c.combinedRounds, 1), 1],
  },
];

interface AchContext {
  attempts: number;
  best: number;
  sumTotal: number;
  learned: number;
  streakBest: number;
  goalHit: boolean;
  dailyDone: number;
  combinedRounds: number;
}

function fmtDuration(sec: number): string {
  if (!sec) return "—";
  const fa = (v: number | string) => String(v).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  if (m === 0) return `${fa(s)} ثانیه`;
  return `${fa(m)}:${fa(String(s).padStart(2, "0"))}`;
}

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("fa-IR", { month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

export function StatsView({ onNavigate }: { onNavigate?: (v: ViewId) => void }) {
  const { bookId, data: bookData } = useBook();
  const { count: learned } = useLearnedWords();
  const streak = useStreak();
  const userName = useUserName();
  const daily = useDailyGoal();
  const dailyInfo = useDailyInfo();
  const { count: starredQCount } = useQuestionStars();
  const combinedRounds = useCombinedRounds();
  const [stats, setStats] = useState<AttemptStats | null>(null);
  const [chart, setChart] = useState<ChartPoint[]>([]);
  const [recent, setRecent] = useState<RecentAttempt[]>([]);
  const [leaders, setLeaders] = useState<LeaderRow[]>([]);
  const [leaderSort, setLeaderSort] = useState<"best" | "avg" | "quizzes">("best");
  const [topMisses, setTopMisses] = useState<TopMiss[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/attempts?book=${bookId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled || !d) return;
        if (d.stats) setStats(d.stats);
        if (Array.isArray(d.chart)) {
          setChart(d.chart.map((c: Omit<ChartPoint, "idx">, i: number) => ({ ...c, idx: i + 1 })));
        }
        if (Array.isArray(d.recent)) setRecent(d.recent);
        if (Array.isArray(d.leaderboard)) setLeaders(d.leaderboard);
        if (Array.isArray(d.topMisses)) setTopMisses(d.topMisses);
      })
      .catch(() => undefined)
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [bookId]);

  const achContext: AchContext = useMemo(
    () => ({
      attempts: stats?.attempts ?? 0,
      best: stats?.best ?? 0,
      sumTotal: stats?.sumTotal ?? 0,
      learned,
      streakBest: streak.best,
      goalHit: daily.goal > 0 && daily.todayCount >= daily.goal,
      dailyDone: dailyInfo.totalDone,
      combinedRounds,
    }),
    [stats, learned, streak.best, daily.goal, daily.todayCount, dailyInfo.totalDone, combinedRounds],
  );

  const unlocked = useMemo(
    () => ACHIEVEMENTS.filter((a) => a.check(achContext)).length,
    [achContext],
  );

  const byCategory = useMemo(() => {
    const groups: Record<string, { sum: number; n: number }> = {};
    for (const p of chart) {
      const g = (groups[p.category] ??= { sum: 0, n: 0 });
      g.sum += p.accuracy;
      g.n += 1;
    }
    return Object.entries(groups).map(([cat, g]) => ({
      category: CATEGORY_FA[cat] ?? cat,
      accuracy: g.n ? Math.round(g.sum / g.n) : 0,
    }));
  }, [chart]);

  const totalMinutes = Math.round(
    recent.reduce((acc, a) => acc + a.duration, 0) / 60,
  );

  const sortedLeaders = useMemo(() => {
    const arr = [...leaders];
    if (leaderSort === "best") arr.sort((a, b) => b.best - a.best || b.accuracy - a.accuracy);
    else if (leaderSort === "avg") arr.sort((a, b) => b.accuracy - a.accuracy || b.best - a.best);
    else arr.sort((a, b) => b.quizzes - a.quizzes || b.best - a.best);
    return arr;
  }, [leaders, leaderSort]);

  const leaderMetric = (row: LeaderRow): { value: string; label: string } => {
    if (leaderSort === "avg") return { value: `${row.accuracy.toLocaleString("fa-IR")}٪`, label: "میانگین دقت" };
    if (leaderSort === "quizzes") return { value: row.quizzes.toLocaleString("fa-IR"), label: "آزمون برگزارشده" };
    return { value: `${row.best.toLocaleString("fa-IR")}٪`, label: "بهترین رکورد" };
  };

  const kpis = [
    { icon: ClipboardList, label: "آزمون برگزارشده", value: (stats?.attempts ?? 0).toLocaleString("fa-IR"), color: "text-primary", bg: "bg-primary/10" },
    { icon: Target, label: "دقت کل پاسخ‌ها", value: `${(stats?.accuracy ?? 0).toLocaleString("fa-IR")}٪`, color: "text-teal-500", bg: "bg-teal-500/10" },
    { icon: Trophy, label: "بهترین رکورد", value: `${(stats?.best ?? 0).toLocaleString("fa-IR")}٪`, color: "text-amber-500", bg: "bg-amber-500/10" },
    { icon: BookOpen, label: "واژه یادگرفته", value: learned.toLocaleString("fa-IR"), color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { icon: Star, label: "سؤال ستاره‌دار", value: starredQCount.toLocaleString("fa-IR"), color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { icon: Flame, label: "زنجیره فعال", value: streak.count.toLocaleString("fa-IR") + " روز", color: "text-orange-500", bg: "bg-orange-500/10" },
    { icon: Medal, label: "نشان‌های باز‌شده", value: `${unlocked.toLocaleString("fa-IR")} از ${ACHIEVEMENTS.length.toLocaleString("fa-IR")}`, color: "text-violet-500", bg: "bg-violet-500/10" },
  ];

  return (
    <div className="space-y-6">
      {/* ── هدر ── */}
      <div className="rise-in">
        <h1 className="flex items-center gap-2 text-xl font-black">
          <BarChart3 size={20} className="text-primary" />
          آمار و نشان‌ها
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          کارنامه کامل یادگیری‌ات — روند آزمون‌ها، نشان‌های افتخار و پیشرفت واژگان در یک نگاه.
        </p>
      </div>

      {loading && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          {Array.from({ length: 7 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-10 w-10 rounded-xl bg-muted" />
                <div className="mt-3 h-5 w-2/3 rounded bg-muted" />
                <div className="mt-2 h-3 w-1/2 rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && (
        <>
          {/* ── کارت‌های آمار ── */}
          <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {kpis.map((k, i) => (
              <Card key={k.label} className={`rise-in rise-in-${(i % 4) + 1} overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5`}>
                <CardContent className="p-4">
                  <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", k.bg, k.color)}>
                    <k.icon size={19} />
                  </span>
                  <p className="mt-2.5 text-lg font-black leading-none">{k.value}</p>
                  <p className="mt-1 text-[11px] leading-4 text-muted-foreground">{k.label}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* ── کارت پیشرفت اشتراکی (فاز ۱۰) ── */}
          <ProgressCardGenerator activeVocabTotal={bookData?.vocab.all.length ?? null} />

          {/* ── نمودارها ── */}
          <section className="grid gap-3 lg:grid-cols-5">
            <Card className="rise-in lg:col-span-3">
              <CardContent className="p-5">
                <p className="mb-3 flex items-center gap-2 text-sm font-bold">
                  <TrendingUp size={15} className="text-primary" />
                  روند دقت آزمون‌ها (٪)
                </p>
                {chart.length >= 2 ? (
                  <div className="h-56" dir="ltr">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chart} margin={{ top: 6, right: 6, bottom: 0, left: -18 }}>
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
                  </div>
                ) : (
                  <div className="flex h-56 items-center justify-center text-center text-xs text-muted-foreground">
                    <div>
                      <BarChart3 size={26} className="mx-auto mb-2 opacity-40" />
                      برای دیدن روند، حداقل ۲ آزمون برگزار کن.
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rise-in rise-in-1 lg:col-span-2">
              <CardContent className="p-5">
                <p className="mb-3 flex items-center gap-2 text-sm font-bold">
                  <Target size={15} className="text-amber-500" />
                  میانگین دقت به تفکیک دسته
                </p>
                {byCategory.length > 0 ? (
                  <div className="h-56" dir="ltr">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={byCategory} margin={{ top: 6, right: 6, bottom: 0, left: -18 }}>
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
                          {byCategory.map((_, i) => (
                            <Cell key={i} fill={i % 2 === 0 ? "#10b981" : "#f59e0b"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="flex h-56 items-center justify-center text-center text-xs text-muted-foreground">
                    <div>
                      <Target size={26} className="mx-auto mb-2 opacity-40" />
                      هنوز آزمونی ثبت نشده است.
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* ── تقویم حرارتی فعالیت ── */}
          <ActivityHeatmap />

          {/* ── لیدربورد محلی ── */}
          <section className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-base font-black">
                <Users size={17} className="text-primary" />
                لیدربورد کلاس
              </h2>
              <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="ترتیب لیدربورد">
                {([
                  { id: "best", label: "بهترین رکورد" },
                  { id: "avg", label: "میانگین دقت" },
                  { id: "quizzes", label: "تعداد آزمون" },
                ] as const).map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setLeaderSort(s.id)}
                    aria-pressed={leaderSort === s.id}
                    className={cn(
                      "h-7 rounded-full border px-2.5 text-[11px] font-black transition-all",
                      leaderSort === s.id
                        ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {sortedLeaders.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center gap-2 p-6 text-center text-xs text-muted-foreground">
                  <Users size={24} className="opacity-40" />
                  هنوز کسی با نام ثبت نکرده — از دکمه «نام من» در هدر اسمت را وارد کن تا در جدول جای بگیری.
                </CardContent>
              </Card>
            ) : (
              <>
                {/* سکوی قهرمانی — سه نفر اول */}
                <div className="grid grid-cols-3 items-end gap-2 sm:gap-3">
                  {[1, 0, 2].map((slot) => {
                    const row = sortedLeaders[slot];
                    if (!row) return <div key={slot} />;
                    const place = slot + 1;
                    const heights = ["sm:pb-0", "sm:pb-6", "sm:pb-2"];
                    const styles =
                      place === 1
                        ? {
                            ring: "ring-2 ring-amber-400/60",
                            grad: "from-amber-500/20 via-amber-500/5 to-transparent",
                            chip: "bg-amber-500 text-amber-950",
                            medal: "🥇",
                            h: "text-2xl",
                          }
                        : place === 2
                          ? {
                              ring: "ring-1 ring-slate-400/40",
                              grad: "from-slate-400/15 via-slate-400/5 to-transparent",
                              chip: "bg-slate-400 text-slate-950",
                              medal: "🥈",
                              h: "text-xl",
                            }
                          : {
                              ring: "ring-1 ring-orange-700/40",
                              grad: "from-orange-700/15 via-orange-700/5 to-transparent",
                              chip: "bg-orange-700 text-white",
                              medal: "🥉",
                              h: "text-xl",
                            };
                    const isMe = userName && row.name === userName;
                    const metric = leaderMetric(row);
                    return (
                      <Card
                        key={row.name}
                        className={cn(
                          `rise-in rise-in-${place} relative overflow-hidden bg-gradient-to-b ${styles.grad} ${styles.ring} podium-card ${heights[slot]}`,
                          isMe && "border-primary/60",
                        )}
                      >
                        {place === 1 && (
                          <Crown size={15} className="absolute left-2.5 top-2.5 text-amber-500 podium-crown" />
                        )}
                        <CardContent className="p-3 text-center">
                          <span className={cn("mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm", styles.chip)}>
                            {styles.medal}
                          </span>
                          <p className="mt-1.5 flex items-center justify-center gap-1 truncate text-[13px] font-black">
                            {row.name}
                            {isMe && <span className="text-[9px] font-bold text-primary">(تو)</span>}
                          </p>
                          <p className={cn("mt-1 font-black leading-none", styles.h)}>
                            {metric.value}
                          </p>
                          <p className="mt-1 text-[10px] text-muted-foreground">
                            {metric.label} • {row.quizzes.toLocaleString("fa-IR")} آزمون
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* بقیه جدول */}
                {sortedLeaders.length > 3 && (
                  <Card>
                    <CardContent className="p-0">
                      <ul className="divide-y">
                        {sortedLeaders.slice(3).map((row, i) => {
                          const isMe = userName && row.name === userName;
                          return (
                            <li
                              key={row.name}
                              className={cn(
                                "flex items-center gap-3 px-4 py-2.5 text-[12px]",
                                isMe && "bg-primary/5",
                              )}
                            >
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-[11px] font-black">
                                {(i + 4).toLocaleString("fa-IR")}
                              </span>
                              <p className="min-w-0 flex-1 truncate font-bold">
                                {row.name}
                                {isMe && <span className="mr-1 text-[9px] font-bold text-primary">(تو)</span>}
                              </p>
                              <span className={cn("shrink-0", leaderSort === "quizzes" ? "font-black text-primary" : "text-muted-foreground")}>
                                {row.quizzes.toLocaleString("fa-IR")} آزمون
                              </span>
                              <span className={cn("hidden shrink-0 sm:inline", leaderSort === "avg" ? "font-black text-primary" : "text-muted-foreground")}>
                                میانگین {row.accuracy.toLocaleString("fa-IR")}٪
                              </span>
                              <span
                                className={cn(
                                  "w-12 shrink-0 text-left font-black",
                                  leaderSort === "best" || leaderSort === "avg"
                                    ? row.best >= 80
                                      ? "text-primary"
                                      : row.best >= 50
                                        ? "text-amber-500"
                                        : "text-muted-foreground"
                                    : "text-muted-foreground",
                                )}
                              >
                                {row.best.toLocaleString("fa-IR")}٪
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </section>

          {/* ── پرتکرارترین اشتباه‌ها ── */}
          {topMisses.length > 0 && (
            <section className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="flex items-center gap-2 text-base font-black">
                  <Crosshair size={17} className="text-destructive" />
                  سؤال‌های پراشتباه تو
                </h2>
                <Button
                  size="sm"
                  className="gap-1.5"
                  onClick={() => {
                    setPracticeIds(topMisses.map((m) => m.id));
                    toast.success("دور تمرین آماده شد — در صفحه آزمون شروع کن.");
                    onNavigate?.("quiz");
                  }}
                >
                  <Play size={14} />
                  تمرین این سؤال‌ها
                </Button>
              </div>
              <Card>
                <CardContent className="p-0">
                  <ul className="divide-y">
                    {topMisses.map((m, i) => (
                      <li key={m.id} className="flex items-start gap-3 px-4 py-3">
                        <span
                          className={cn(
                            "mt-0.5 flex h-7 shrink-0 items-center justify-center rounded-lg px-2 text-[11px] font-black",
                            m.misses >= 3
                              ? "bg-destructive/15 text-destructive"
                              : "bg-amber-500/15 text-amber-600 dark:text-amber-400",
                          )}
                        >
                          ×{m.misses.toLocaleString("fa-IR")}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p dir="ltr" className="font-en text-left text-[12px] font-semibold leading-6">
                            {m.text}
                          </p>
                          <p className="mt-1 text-[10.5px] text-muted-foreground">
                            {m.category === "grammar" ? "گرامر" : "واژگان"} — پاسخ درست:{" "}
                            <span dir="ltr" className="font-en font-bold text-primary">
                              {m.options[m.answer]}
                            </span>
                          </p>
                        </div>
                        <span className="shrink-0 text-[10px] text-muted-foreground">
                          {(i + 1).toLocaleString("fa-IR")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <p className="text-center text-[11px] text-muted-foreground">
                بر اساس ۱۵۰ آزمون آخر — با هر مرور، شانس ظاهرشدن این سؤال‌ها بیشتر می‌شود.
              </p>
            </section>
          )}

          {/* ── مرور فاصله‌دار (SRS — فاز ۲) ── */}
          <SrsStatsSection onNavigate={(v) => onNavigate?.(v as ViewId)} />

          {/* ── نشان‌ها ── */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-base font-black">
                <Medal size={17} className="text-amber-500" />
                نشان‌های افتخار
              </h2>
              <Badge variant="secondary" className="text-[11px]">
                {unlocked.toLocaleString("fa-IR")} از {ACHIEVEMENTS.length.toLocaleString("fa-IR")} باز شده
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {ACHIEVEMENTS.map((a, i) => {
                const done = a.check(achContext);
                const [cur, max] = a.progress ? a.progress(achContext) : [1, 1];
                return (
                  <Card
                    key={a.id}
                    className={cn(
                      `rise-in rise-in-${(i % 4) + 1} relative overflow-hidden transition-all`,
                      done
                        ? "border-amber-500/40 bg-gradient-to-bl from-amber-500/10 to-transparent achievement-glow"
                        : "opacity-80",
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <span className={cn("text-3xl leading-none", !done && "grayscale opacity-40")}>
                          {a.icon}
                        </span>
                        {done ? (
                          <Badge className="gap-1 bg-amber-500 text-amber-950 text-[10px] border-amber-400/50">
                            <Sparkles size={10} />
                            کسب شد
                          </Badge>
                        ) : (
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                            <Lock size={12} />
                          </span>
                        )}
                      </div>
                      <h3 className={cn("mt-2.5 text-[13px] font-black", !done && "text-muted-foreground")}>
                        {a.title}
                      </h3>
                      <p className="mt-0.5 text-[11px] leading-4 text-muted-foreground">{a.desc}</p>
                      {!done && max > 1 && (
                        <div className="mt-2.5 space-y-1">
                          <Progress value={(cur / max) * 100} className="h-1.5" />
                          <p className="text-[10px] text-muted-foreground">
                            {cur.toLocaleString("fa-IR")} از {max.toLocaleString("fa-IR")}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* ── تاریخچه ── */}
          <section className="space-y-3">
            <h2 className="flex items-center gap-2 text-base font-black">
              <History size={17} className="text-primary" />
              تاریخچه آزمون‌ها
            </h2>
            {recent.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center text-xs text-muted-foreground">
                  هنوز آزمونی ثبت نشده — از بخش «آزمون» شروع کن!
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <ul className="divide-y">
                    {recent.map((a, i) => {
                      const acc = a.total ? Math.round((a.correct / a.total) * 100) : 0;
                      return (
                        <li
                          key={a.id}
                          className={cn(
                            "flex flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-3 text-[12px]",
                            i === 0 && "bg-primary/5",
                          )}
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted font-black">
                            {(recent.length - i).toLocaleString("fa-IR")}
                          </span>
                          <div className="min-w-24">
                            <p className="font-bold">{CATEGORY_FA[a.category] ?? a.category}</p>
                            <p className="text-[10px] text-muted-foreground">{fmtDate(a.createdAt)}</p>
                          </div>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <ClipboardList size={12} />
                            {a.correct.toLocaleString("fa-IR")} از {a.total.toLocaleString("fa-IR")}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Timer size={12} />
                            {fmtDuration(a.duration)}
                          </span>
                          <div className="mr-auto flex w-28 items-center gap-2">
                            <Progress value={acc} className="h-1.5 flex-1" />
                            <span
                              className={cn(
                                "shrink-0 text-[11px] font-black",
                                acc >= 80 ? "text-primary" : acc >= 50 ? "text-amber-500" : "text-destructive",
                              )}
                            >
                              {acc.toLocaleString("fa-IR")}٪
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            )}
            {totalMinutes > 0 && (
              <p className="text-center text-[11px] text-muted-foreground">
                مجموع زمان {recent.length.toLocaleString("fa-IR")} آزمون آخر: حدود {totalMinutes.toLocaleString("fa-IR")} دقیقه
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
}
