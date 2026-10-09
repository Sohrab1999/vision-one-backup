"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  ClipboardList,
  FileText,
  Library,
  Repeat,
  Bot,
  ListOrdered,
  Sparkles,
  Quote,
  BadgeCheck,
  Volume2,
  ArrowLeft,
  Trophy,
  Target,
  Flame,
  Layers,
  TrendingUp,
  NotebookPen,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
} from "recharts";
import { BOOK_INFO, BOOK_STATS, CHAPTERS } from "@/data/book-meta";
import { ALL_VOCAB } from "@/data/vocab";
import { useLearnedWords } from "@/lib/learned-store";
import { useUserName } from "@/lib/name-store";
import { useStreak } from "@/lib/streak-store";
import { useMistakes } from "@/lib/mistakes-store";
import { useDailyGoal } from "@/lib/goal-store";
import type { ViewId } from "./app-header";
import { SpeakButton } from "./speak-button";

interface AttemptStats {
  attempts: number;
  accuracy: number;
  best: number;
}

interface ChartPoint {
  id: string;
  accuracy: number;
  category: string;
  idx: number;
}

const FEATURE_CARDS: {
  view: ViewId;
  title: string;
  desc: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  stat?: string;
}[] = [
  { view: "contents", title: "فهرست فصل‌ها", desc: "مسیر یادگیری گام‌به‌گام کتاب", icon: ListOrdered },
  { view: "vocab", title: "واژگان تعاملی", desc: "جستجو، کارت فلپ و علامت‌گذاری واژه‌های یادگرفته", icon: BookOpen, stat: `${BOOK_STATS.words} واژه` },
  { view: "flashcards", title: "تمرین واژه‌ها", desc: "فلاش‌کارت SRS و بازی تطبیق واژه و معنی", icon: Layers, stat: "SRS" },
  { view: "grammar", title: "درسنامه گرامر", desc: "۱۱ درسنامه با جدول‌ها و مثال‌های ترجمه‌شده", icon: GraduationCap, stat: "۱۱ درسنامه" },
  { view: "quiz", title: "آزمون تعاملی", desc: "بانک سؤال واقعی جزوه با توضیح هوشمند", icon: ClipboardList, stat: `${BOOK_STATS.questions} تست` },
  { view: "stats", title: "آمار و نشان‌ها", desc: "کارنامه یادگیری، نمودار دقت و ۱۴ نشان افتخار", icon: TrendingUp, stat: "۱۴ نشان" },
  { view: "texts", title: "متن و مکالمه", desc: "ریدینگ‌ها و مکالمه‌ها با روایت صوتی", icon: FileText, stat: `${BOOK_STATS.readings + BOOK_STATS.conversations} متن` },
  { view: "dict", title: "دیکشنری", desc: "تعریف انگلیسی به انگلیسی با تلفظ و مثال", icon: Library, stat: `${BOOK_STATS.dictionary} مدخل` },
  { view: "verbs", title: "افعال بی‌قاعده", desc: "جدول کامل افعال با جستجو", icon: Repeat, stat: `${BOOK_STATS.verbs} فعل` },
  { view: "tutor", title: "دستیار هوشمند", desc: "تمرین مکالمه با معلم AI فارسی‌زبان", icon: Bot, stat: "۲۴/۷" },
];

function useWordOfDay() {
  return useMemo(() => {
    const day = Math.floor(Date.now() / 86400000);
    return ALL_VOCAB[day % ALL_VOCAB.length];
  }, []);
}

export function HomeView({ onNavigate }: { onNavigate: (v: ViewId) => void }) {
  const wordOfDay = useWordOfDay();
  const { count: learned } = useLearnedWords();
  const userName = useUserName();
  const streak = useStreak();
  const { count: mistakeCount } = useMistakes();
  const daily = useDailyGoal();
  const [stats, setStats] = useState<AttemptStats | null>(null);
  const [chart, setChart] = useState<ChartPoint[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/attempts")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled || !d) return;
        if (d.stats) setStats(d.stats);
        if (Array.isArray(d.chart)) {
          setChart(
            d.chart.map((c: Omit<ChartPoint, "idx">, i: number) => ({
              ...c,
              idx: i + 1,
            })),
          );
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const learnedPct = Math.round((learned / BOOK_STATS.words) * 100);

  return (
    <div className="space-y-8 pb-4">
      {/* ── جلد کتاب ─────────────────────────────── */}
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-bl from-primary/15 via-card to-accent/25 dot-grid">
        <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="hero-ring pointer-events-none absolute -left-24 top-1/2 hidden h-72 w-72 -translate-y-1/2 md:block" />
        <div className="hero-ring-reverse pointer-events-none absolute -right-28 -top-28 hidden h-80 w-80 md:block" />

        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:py-16 text-center space-y-5">
          <div className="rise-in flex flex-wrap items-center justify-center gap-2">
            <Badge className="gap-1 bg-accent text-accent-foreground border-accent/40 text-[12px]">
              <BadgeCheck size={13} />
              {BOOK_INFO.price}
            </Badge>
            <Badge variant="outline" className="text-[12px]">
              {BOOK_INFO.edition}
            </Badge>
            <Badge variant="secondary" className="font-en text-[11px]">
              Vision One
            </Badge>
          </div>

          <p className="rise-in text-[12px] font-bold text-primary">
            {userName ? `سلام ${userName}! 👋 خوش برگشتی` : "به کتاب وب ویژن وان خوش آمدی 👋"}
            {streak.count > 0 && (
              <span className="mr-2 inline-flex translate-y-px items-center gap-1 rounded-full border border-orange-500/40 bg-orange-500/10 px-2 py-0.5 text-[10px] font-black text-orange-500">
                <Flame size={11} className="streak-flame" />
                زنجیره {streak.count.toLocaleString("fa-IR")} روزه
              </span>
            )}
          </p>

          <h1 className="rise-in rise-in-1 text-3xl sm:text-5xl font-black leading-[1.25] tracking-tight">
            جزوه جامع{" "}
            <span className="bg-gradient-to-l from-primary via-emerald-400 to-accent-foreground bg-clip-text text-transparent">
              زبان انگلیسی
            </span>{" "}
            پایه دهم
          </h1>

          <p className="rise-in rise-in-2 mx-auto max-w-2xl text-sm sm:text-base text-muted-foreground leading-7">
            حالا به شکل یک کتاب وب تعاملی؛ با روایت صوتی واژه‌ها و متن‌ها، درسنامه‌های گرامر،
            بانک {BOOK_STATS.questions} تست واقعی جزوه و دستیار هوشمند مکالمه — همه در یک‌جا.
          </p>

          <p className="rise-in rise-in-2 text-[12px] text-muted-foreground/80">
            {BOOK_INFO.author}
          </p>

          <div className="rise-in rise-in-3 flex flex-wrap items-center justify-center gap-3 pt-1">
            <Button size="lg" onClick={() => onNavigate("contents")} className="gap-2 shadow-lg shadow-primary/30 text-base h-12 px-6">
              <BookOpen size={19} />
              شروع مطالعه
              <ArrowLeft size={17} />
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNavigate("quiz")} className="gap-2 h-12 px-6 text-base">
              <ClipboardList size={18} />
              آزمون بده
            </Button>
          </div>
        </div>
      </section>

      {/* ── هدف روزانه ─────────────────────────────── */}
      <section>
        <Card
          className={`rise-in overflow-hidden border transition-colors ${
            daily.todayCount >= daily.goal
              ? "border-primary/45 bg-gradient-to-l from-primary/12 via-card to-accent/15"
              : "border-primary/20 bg-gradient-to-l from-primary/6 via-card to-accent/8"
          }`}
        >
          <CardContent className="flex flex-wrap items-center gap-5 p-5">
            {/* حلقه پیشرفت */}
            <div className="relative h-24 w-24 shrink-0">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" strokeWidth="11" className="stroke-muted" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  strokeWidth="11"
                  strokeLinecap="round"
                  className={daily.todayCount >= daily.goal ? "stroke-amber-500" : "stroke-primary"}
                  strokeDasharray={`${(daily.pct / 100) * 326.7} 326.7`}
                  style={{ transition: "stroke-dasharray 0.7s cubic-bezier(0.22,1,0.36,1)" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-black leading-none">
                  {daily.todayCount.toLocaleString("fa-IR")}
                  <span className="text-[11px] font-bold text-muted-foreground"> / {daily.goal.toLocaleString("fa-IR")}</span>
                </span>
                <span className="mt-0.5 text-[9px] font-bold text-muted-foreground">واژه امروز</span>
              </div>
            </div>

            <div className="min-w-0 flex-1 space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="flex items-center gap-2 text-sm font-black">
                  <Target size={16} className="text-primary" />
                  هدف روزانه
                </h2>
                {daily.todayCount >= daily.goal ? (
                  <Badge className="gap-1 bg-primary text-primary-foreground text-[10px] shadow-sm shadow-primary/25">
                    <CheckCircle2 size={11} />
                    امروز انجام شد! 🎉
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-[10px]">
                    {(daily.goal - daily.todayCount).toLocaleString("fa-IR")} واژه تا هدف
                  </Badge>
                )}
              </div>
              <p className="text-[11.5px] leading-5 text-muted-foreground">
                {daily.todayCount >= daily.goal
                  ? "آفرین! هدف امروز کامل شد — زنجیره یادگیری‌ات هم شارژ شد 🔥"
                  : "هر واژه‌ای که علامت بزنی این‌جا شمرده می‌شود؛ هدف را انتخاب کن و روزانه برس."}
              </p>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="ml-0.5 text-[11px] font-bold text-muted-foreground">هدف:</span>
                {[5, 10, 15, 20].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => daily.setGoal(n)}
                    aria-pressed={daily.goal === n}
                    className={cn(
                      "h-7 min-w-9 rounded-full border px-2 text-[11px] font-black transition-all",
                      daily.goal === n
                        ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {n.toLocaleString("fa-IR")}
                  </button>
                ))}
                {/* نوار ۷ روز اخیر */}
                <span className="mr-2 hidden items-center gap-1 sm:flex" title="فعالیت ۷ روز اخیر">
                  {daily.week.map((d) => (
                    <span
                      key={d.day}
                      className={cn(
                        "h-2.5 w-2.5 rounded-full border",
                        d.count >= daily.goal
                          ? "border-amber-500/60 bg-amber-500"
                          : d.count > 0
                            ? "border-primary/50 bg-primary/60"
                            : "bg-muted",
                      )}
                    />
                  ))}
                </span>
              </div>
            </div>

            <Button onClick={() => onNavigate("vocab")} className="shrink-0 gap-2">
              <BookOpen size={16} />
              یادگیری واژه‌ها
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* ── نوار آمار ─────────────────────────────── */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { icon: BookOpen, label: "واژه", value: BOOK_STATS.words, color: "text-primary" },
          { icon: ClipboardList, label: "تست", value: BOOK_STATS.questions, color: "text-amber-500" },
          { icon: FileText, label: "متن و مکالمه", value: BOOK_STATS.readings + BOOK_STATS.conversations, color: "text-teal-500" },
          { icon: Library, label: "مدخل دیکشنری", value: BOOK_STATS.dictionary, color: "text-orange-500" },
        ].map((s, i) => (
          <Card key={s.label} className={`rise-in rise-in-${i + 1} border/60`}>
            <CardContent className="flex items-center gap-3 p-4">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-muted ${s.color}`}>
                <s.icon size={19} />
              </span>
              <div>
                <p className="text-xl font-black leading-none">{s.value.toLocaleString("fa-IR")}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* ── پیشرفت من + واژه روز ─────────────────────────────── */}
      <section className="grid gap-3 md:grid-cols-2">
        <Card className="rise-in">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-bold">
                <Flame size={16} className="text-orange-500" />
                پیشرفت من
              </h2>
              <Badge variant="secondary" className="text-[11px]">
                {learned.toLocaleString("fa-IR")} از {BOOK_STATS.words.toLocaleString("fa-IR")} واژه
              </Badge>
            </div>
            <Progress value={learnedPct} className="h-2.5" />
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-muted/60 p-3">
                <Trophy size={16} className="mx-auto text-amber-500" />
                <p className="mt-1.5 text-lg font-black leading-none">
                  {stats ? `${stats.best}٪` : "—"}
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground">بهترین رکورد آزمون</p>
              </div>
              <div className="rounded-xl bg-muted/60 p-3">
                <Target size={16} className="mx-auto text-primary" />
                <p className="mt-1.5 text-lg font-black leading-none">
                  {stats ? `${stats.accuracy}٪` : "—"}
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground">دقت کل پاسخ‌ها</p>
              </div>
              <div className="rounded-xl bg-muted/60 p-3">
                <ClipboardList size={16} className="mx-auto text-teal-500" />
                <p className="mt-1.5 text-lg font-black leading-none">
                  {stats ? stats.attempts.toLocaleString("fa-IR") : "۰"}
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground">آزمون برگزارشده</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate("vocab")}>
              ادامه یادگیری واژه‌ها
            </Button>

            {/* نمودار روند دقت */}
            {chart.length >= 2 && (
              <div className="rounded-xl border bg-card/60 p-3">
                <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground">
                  <TrendingUp size={12} className="text-primary" />
                  روند دقت {chart.length.toLocaleString("fa-IR")} آزمون آخر (٪)
                </p>
                <div className="h-28" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chart} margin={{ top: 4, right: 4, bottom: 0, left: -22 }}>
                      <defs>
                        <linearGradient id="acc" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity={0.45} />
                          <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="idx"
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
                        contentStyle={{
                          background: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: 12,
                          fontSize: 12,
                          fontFamily: "inherit",
                        }}
                        formatter={(v: number) => [`${v}٪`, "دقت"]}
                        labelFormatter={(l: number) => `آزمون ${l}`}
                      />
                      <Area
                        type="monotone"
                        dataKey="accuracy"
                        stroke="#10b981"
                        strokeWidth={2.5}
                        fill="url(#acc)"
                        dot={{ r: 3, fill: "#10b981" }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rise-in rise-in-1 border-primary/25 bg-gradient-to-bl from-primary/8 to-transparent">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-bold">
                <Sparkles size={16} className="text-amber-500" />
                واژه‌ی امروز
              </h2>
              <Badge variant="secondary" className="text-[11px]">
                {wordOfDay.lessonLabel}
              </Badge>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-background/60 p-4 border">
              <SpeakButton text={wordOfDay.word} size="lg" />
              <div className="min-w-0">
                <p dir="ltr" className="font-en text-2xl font-black text-primary truncate">
                  {wordOfDay.word}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground truncate">{wordOfDay.meaning}</p>
              </div>
            </div>
            <p className="text-[11px] leading-5 text-muted-foreground">
              هر روز یک واژه از {BOOK_STATS.words.toLocaleString("fa-IR")} واژه کتاب را بشناس. روی دکمه بلندگو بزن تا تلفظش را بشنوی.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* ── دفتر اشتباهات ─────────────────────────────── */}
      {mistakeCount > 0 && (
        <button
          type="button"
          onClick={() => onNavigate("quiz")}
          className="rise-in group flex w-full flex-wrap items-center gap-3 rounded-2xl border border-amber-500/40 bg-gradient-to-l from-amber-500/12 via-amber-500/5 to-transparent p-4 text-right transition-all hover:border-amber-500/70 hover:shadow-lg hover:shadow-amber-500/10"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 transition-transform group-hover:scale-105 dark:text-amber-400">
            <NotebookPen size={20} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2 text-[13.5px] font-black">
              دفتر اشتباهات تو
              <Badge className="border-amber-500/40 bg-amber-500/15 text-[10px] text-amber-700 dark:text-amber-300">
                {mistakeCount.toLocaleString("fa-IR")} سؤال
              </Badge>
            </span>
            <span className="mt-0.5 block truncate text-[11.5px] text-muted-foreground">
              {mistakeCount.toLocaleString("fa-IR")} سؤال منتظر مروره — با حالت «مرور هوشمند» هر کدوم رو درست جواب بدی، از دفتر حذف می‌شه.
            </span>
          </span>
          <ArrowLeft size={17} className="shrink-0 text-amber-600 transition-transform group-hover:-translate-x-1 dark:text-amber-400" />
        </button>
      )}

      {/* ── بخش‌های کتاب ─────────────────────────────── */}
      <section className="space-y-3">
        <h2 className="text-lg font-black flex items-center gap-2">
          <Volume2 size={18} className="text-primary" />
          بخش‌های کتاب وب
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_CARDS.map((f, i) => (
            <button
              key={f.view}
              type="button"
              onClick={() => onNavigate(f.view)}
              className={`rise-in rise-in-${(i % 4) + 1} group text-right rounded-2xl border bg-card p-4 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon size={21} />
                </span>
                {f.stat && (
                  <Badge variant="secondary" className="text-[10px] font-bold">
                    {f.stat}
                  </Badge>
                )}
              </div>
              <h3 className="mt-3 font-bold">{f.title}</h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{f.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ── نقل قول ─────────────────────────────── */}
      <section>
        <Card className="border-accent/40 bg-accent/30">
          <CardContent className="p-6 text-center space-y-3">
            <Quote size={22} className="mx-auto text-accent-foreground/60" />
            <p dir="ltr" className="font-en mx-auto max-w-xl text-sm sm:text-[15px] font-semibold leading-7">
              Failure is a part of life. If you don&apos;t fail, you won&apos;t learn. If you don&apos;t learn, you will never succeed.
            </p>
            <p className="text-xs text-muted-foreground leading-5">
              شکست بخشی از زندگی است؛ اگر شکست نخوری یاد نمی‌گیری و اگر یاد نگیری هرگز موفق نمی‌شوی.
            </p>
            <p className="text-[11px] font-bold text-accent-foreground">— صفحه ۳ جزوه، {BOOK_INFO.author.replace("تألیف و گردآوری: ", "")}</p>
          </CardContent>
        </Card>
      </section>

      {/* فصل‌ها پیش‌نمایش سریع */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {CHAPTERS.map((ch) => (
          <button
            key={ch.id}
            type="button"
            onClick={() => onNavigate("contents")}
            className="rounded-2xl border bg-card p-4 text-right transition-all hover:border-primary/40 hover:shadow-lg"
          >
            <p className="text-[10px] font-bold text-primary">{ch.number}</p>
            <p dir="ltr" className="mt-1 font-en text-[13px] font-bold truncate">
              {ch.title}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{ch.titleFa}</p>
          </button>
        ))}
      </section>
    </div>
  );
}
