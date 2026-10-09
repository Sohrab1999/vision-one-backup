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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  { view: "flashcards", title: "تمرین فلاش‌کارت", desc: "دور ۱۲ واژه‌ای با میان‌بر کیبورد و مرور هوشمند", icon: Layers, stat: "SRS" },
  { view: "grammar", title: "درسنامه گرامر", desc: "۱۱ درسنامه با جدول‌ها و مثال‌های ترجمه‌شده", icon: GraduationCap, stat: "۱۱ درسنامه" },
  { view: "quiz", title: "آزمون تعاملی", desc: "بانک سؤال واقعی جزوه با توضیح هوشمند", icon: ClipboardList, stat: `${BOOK_STATS.questions} تست` },
  { view: "stats", title: "آمار و نشان‌ها", desc: "کارنامه یادگیری، نمودار دقت و ۱۳ نشان افتخار", icon: TrendingUp, stat: "۱۳ نشان" },
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
