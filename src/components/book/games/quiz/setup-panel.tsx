"use client";

/**
 * پنل تنظیم آزمون (فاز setup) — تفکیک مکانیکی گام ۴ نقشهٔ refactor-2.
 * کامپوننت presentational: وضعیت و توابع از موتور (index.tsx) با props هم‌نام می‌آید؛
 * JSX بایت‌به‌بایت از quiz-game.tsx منتقل شده است (کارت‌های روزانه/هفتگی/تمرین/مرور + ۵ ردیف تنظیم).
 */

import {
  CalendarCheck,
  CalendarRange,
  CheckCircle2,
  ClipboardList,
  Download,
  Gauge,
  Hourglass,
  Layers,
  ListChecks,
  Loader2,
  NotebookPen,
  Play,
  Star,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { DailyInfo } from "@/lib/daily-store";
import type { WeeklyInfo } from "@/lib/weekly-store";
import type { Pulse } from "@/lib/use-daily-pulse";
import { CATEGORY_OPTIONS, COUNT_OPTIONS, LEVEL_OPTIONS, TIMED_OPTIONS, levelBadgeClass } from "./constants";
import type { Mode, PoolMeta } from "./types";

/** همان شکل Pulses استور نبض اجتماعی (use-daily-pulse) — فقط خواندنی برای نمایش */
type PulseInfo = { daily: Pulse | null; weekly: Pulse | null };

export interface SetupPanelProps {
  lessonOptions: { value: string; label: string }[];
  daily: DailyInfo;
  weekly: WeeklyInfo;
  pulses: PulseInfo;
  practiceIds: string[];
  starredQIds: string[];
  starredQCount: number;
  mistakeCount: number;
  combinedIds: string[];
  poolMeta: PoolMeta | null;
  loading: boolean;
  exporting: boolean;
  category: string;
  setCategory: (v: string) => void;
  lesson: string;
  setLesson: (v: string) => void;
  count: number;
  setCount: (c: number) => void;
  level: string;
  setLevel: (v: string) => void;
  timed: number;
  setTimed: (v: number) => void;
  startDaily: () => void;
  startWeekly: () => void;
  startPracticeRound: (ids: string[], nextMode?: Mode) => void;
  startQuiz: (nextMode?: Mode) => void;
  exportMistakesCsv: () => void;
  clearMistakes: () => void;
}

export function SetupPanel({
  lessonOptions,
  daily,
  weekly,
  pulses,
  practiceIds,
  starredQIds,
  starredQCount,
  mistakeCount,
  combinedIds,
  poolMeta,
  loading,
  exporting,
  category,
  setCategory,
  lesson,
  setLesson,
  count,
  setCount,
  level,
  setLevel,
  timed,
  setTimed,
  startDaily,
  startWeekly,
  startPracticeRound,
  startQuiz,
  exportMistakesCsv,
  clearMistakes,
}: SetupPanelProps) {
  return (
      <Card className="mx-auto max-w-xl rise-in lg:max-w-2xl xl:max-w-3xl">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ClipboardList size={22} />
            </span>
            <div>
              <h2 className="text-lg font-black">آزمون تعاملی</h2>
              <p className="text-xs text-muted-foreground">
                بانک سؤال واقعی جزوه — سطح: آموزشی تا کنکوری
              </p>
            </div>
          </div>

          {/* چالش روزانه — ۵ سؤال قطعی امروز */}
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-l from-amber-500/12 via-amber-500/5 to-transparent p-4">
            <div className="flex items-center gap-3">
              <span className="daily-pulse flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                <CalendarCheck size={19} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-2 text-[13px] font-black">
                  چالش روزانه
                  <Badge className="border-amber-500/40 bg-amber-500/15 text-[10px] text-amber-700 dark:text-amber-300">
                    ۵ سؤال · بدون زمان
                  </Badge>
                  {daily.doneToday ? (
                    <Badge variant="outline" className="gap-1 border-primary/40 bg-primary/10 text-[10px] text-primary">
                      <CheckCircle2 size={10} />
                      امروز: {daily.bestToday?.toLocaleString("fa-IR")}٪
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-[10px]">امروز انجام نشده</Badge>
                  )}
                </p>
                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                  {daily.doneToday
                    ? `امروز انجامش دادی — می‌تونی دوباره امتحان کنی و رکوردت رو بهتر کنی (${daily.totalDone.toLocaleString("fa-IR")} چالش کامل‌شده)`
                    : "۵ سؤال امروز برای همه یکسان است — با یک بار انجام، زنجیره‌ات هم شارژ می‌شود."}
                </p>
                {pulses.daily && pulses.daily.players > 0 && (
                  <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[10.5px] font-bold text-amber-700 dark:text-amber-300">
                    <span className="soft-ping relative inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    امروز {pulses.daily.players.toLocaleString("fa-IR")} نفر چالش دادند
                    {pulses.daily.avg !== null && (
                      <> — میانگین دقت {pulses.daily.avg.toLocaleString("fa-IR")}٪</>
                    )}
                    {pulses.daily.best !== null && pulses.daily.best > 0 && (
                      <span className="text-muted-foreground">· بهترین {pulses.daily.best.toLocaleString("fa-IR")}٪</span>
                    )}
                  </p>
                )}
              </div>
              <Button
                size="sm"
                onClick={startDaily}
                disabled={loading}
                className="shrink-0 gap-1.5 bg-amber-500 text-white hover:bg-amber-600"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <CalendarCheck size={14} />}
                {daily.doneToday ? "دوباره" : "شروع چالش"}
              </Button>
            </div>
          </div>

          {/* چالش هفتگی — ۱۰ سؤال قطعی این هفته */}
          <div className="relative overflow-hidden rounded-2xl border border-violet-500/40 bg-gradient-to-l from-violet-500/12 via-violet-500/5 to-transparent p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-400">
                <CalendarRange size={19} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-2 text-[13px] font-black">
                  چالش هفتگی
                  <Badge className="border-violet-500/40 bg-violet-500/15 text-[10px] text-violet-700 dark:text-violet-300">
                    هفتهٔ {weekly.weekIndex.toLocaleString("fa-IR")} · ۱۰ سؤال
                  </Badge>
                  {weekly.doneThisWeek ? (
                    <Badge variant="outline" className="gap-1 border-primary/40 bg-primary/10 text-[10px] text-primary">
                      <CheckCircle2 size={10} />
                      این هفته: {weekly.bestThisWeek?.toLocaleString("fa-IR")}٪
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-[10px]">این هفته انجام نشده</Badge>
                  )}
                </p>
                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                  {weekly.doneThisWeek
                    ? `این هفته انجامش دادی — رکورد ${weekly.bestThisWeek?.toLocaleString("fa-IR")}٪ (${weekly.totalDone.toLocaleString("fa-IR")} هفته چالش داده‌ای)`
                    : "۱۰ سؤال این هفته برای همه یکسان است — رقابهٔ هفتگی کلاس تا شنبهٔ بعد."}
                </p>
                {pulses.weekly && pulses.weekly.players > 0 && (
                  <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[10.5px] font-bold text-violet-700 dark:text-violet-300">
                    <span className="soft-ping relative inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                    این هفته {pulses.weekly.players.toLocaleString("fa-IR")} نفر چالش دادند
                    {pulses.weekly.avg !== null && (
                      <> — میانگین دقت {pulses.weekly.avg.toLocaleString("fa-IR")}٪</>
                    )}
                    {pulses.weekly.best !== null && pulses.weekly.best > 0 && (
                      <span className="text-muted-foreground">· بهترین {pulses.weekly.best.toLocaleString("fa-IR")}٪</span>
                    )}
                  </p>
                )}
              </div>
              <Button
                size="sm"
                onClick={startWeekly}
                disabled={loading}
                className="shrink-0 gap-1.5 bg-violet-600 text-white hover:bg-violet-700"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <CalendarRange size={14} />}
                {weekly.doneThisWeek ? "دوباره" : "شروع چالش"}
              </Button>
            </div>
          </div>

          {/* دور تمرین سؤال‌های پراشتباه (ارسالی از آمار) */}
          {practiceIds.length > 0 && (
            <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-gradient-to-l from-primary/10 via-primary/5 to-transparent p-4 rise-in">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <ListChecks size={19} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-[13px] font-black">
                    دور تمرین سؤال‌های پراشتباه
                    <Badge className="bg-primary text-[10px] text-primary-foreground">
                      {practiceIds.length.toLocaleString("fa-IR")} سؤال
                    </Badge>
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                    سؤال‌هایی که بیشترین اشتباه را داشتی — از بخش آمار انتخاب شده‌اند.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => startPracticeRound(practiceIds)}
                  disabled={loading}
                  className="shrink-0 gap-1.5"
                >
                  {loading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
                  شروع تمرین
                </Button>
              </div>
            </div>
          )}

          {/* تمرین سؤال‌های ستاره‌دار */}
          {starredQCount > 0 && (
            <div className="relative overflow-hidden rounded-2xl border border-yellow-500/40 bg-gradient-to-l from-yellow-500/10 via-yellow-500/5 to-transparent p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-500/15 text-yellow-600 dark:text-yellow-400">
                  <Star size={19} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-[13px] font-black">
                    تمرین سؤال‌های ستاره‌دار
                    <Badge className="border-yellow-500/40 bg-yellow-500/15 text-[10px] text-yellow-700 dark:text-yellow-300">
                      {starredQCount.toLocaleString("fa-IR")} سؤال
                    </Badge>
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                    نکته‌هایی که خودت حین آزمون ستاره زدی — مرور هدفمند سؤال‌های سخت.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => startPracticeRound(starredQIds.slice(0, 60), "starred")}
                  disabled={loading}
                  className="shrink-0 gap-1.5 bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  {loading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
                  شروع تمرین
                </Button>
              </div>
            </div>
          )}

          {/* مرور ترکیبی — اشتباهات + ستاره‌دارها */}
          {mistakeCount > 0 && starredQCount > 0 && combinedIds.length > Math.max(mistakeCount, 0) && (
            <div className="relative overflow-hidden rounded-2xl border border-teal-500/40 bg-gradient-to-l from-teal-500/10 via-teal-500/5 to-transparent p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400">
                  <Layers size={19} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-[13px] font-black">
                    مرور ترکیبی
                    <Badge className="border-teal-500/40 bg-teal-500/15 text-[10px] text-teal-700 dark:text-teal-300">
                      {combinedIds.length.toLocaleString("fa-IR")} سؤال
                    </Badge>
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                    اشتباه‌های دفتر + سؤال‌های ستاره‌دار در یک دور — پاسخ درست از دفتر اشتباهات حذف می‌کند.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => startPracticeRound(combinedIds, "combined")}
                  disabled={loading}
                  className="shrink-0 gap-1.5 bg-teal-600 text-white hover:bg-teal-700"
                >
                  {loading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
                  شروع مرور
                </Button>
              </div>
            </div>
          )}

          {/* مرور هوشمند اشتباهات */}
          {mistakeCount > 0 && (
            <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-l from-amber-500/10 via-amber-500/5 to-transparent p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  <NotebookPen size={19} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-[13px] font-black">
                    مرور هوشمند اشتباهات
                    <Badge className="border-amber-500/40 bg-amber-500/15 text-[10px] text-amber-700 dark:text-amber-300">
                      {mistakeCount.toLocaleString("fa-IR")} سؤال
                    </Badge>
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                    فقط سؤال‌هایی که قبلاً اشتباه جواب دادی — با هر پاسخ درست از دفتر اشتباهات حذف می‌شوند.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => startQuiz("review")}
                  disabled={loading}
                  className="shrink-0 gap-1.5 bg-amber-500 text-white hover:bg-amber-600"
                >
                  {loading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
                  شروع مرور
                </Button>
              </div>
              <div className="absolute bottom-1.5 left-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={exportMistakesCsv}
                  disabled={exporting}
                  className="flex items-center gap-1 text-[10px] text-muted-foreground/70 transition-colors hover:text-primary disabled:opacity-50"
                >
                  {exporting ? <Loader2 size={11} className="animate-spin" /> : <Download size={11} />}
                  خروجی CSV
                </button>
                <button
                  type="button"
                  onClick={() => {
                    clearMistakes();
                    toast.info("دفتر اشتباهات پاک شد.");
                  }}
                  className="flex items-center gap-1 text-[10px] text-muted-foreground/70 transition-colors hover:text-destructive"
                >
                  <Trash2 size={11} />
                  پاک‌کردن دفتر
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <p className="mb-2 text-[13px] font-bold">۱. دسته سؤال</p>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORY_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setCategory(o.value)}
                    className={cn(
                      "rounded-xl border p-2.5 text-[12px] font-bold transition-all",
                      category === o.value
                        ? "border-primary bg-primary/10 text-primary shadow-sm"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[13px] font-bold">۲. محدوده درس</p>
              <div className="flex flex-wrap gap-2">
                {lessonOptions.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setLesson(o.value)}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
                      lesson === o.value
                        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[13px] font-bold">۳. تعداد سؤال</p>
              <div className="grid grid-cols-4 gap-2">
                {COUNT_OPTIONS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCount(c)}
                    className={cn(
                      "rounded-xl border p-2.5 text-sm font-black transition-all",
                      count === c
                        ? "border-primary bg-primary/10 text-primary shadow-sm"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {c.toLocaleString("fa-IR")}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-1.5 text-[13px] font-bold">
                ۴. سطح دشواری
                <Gauge size={13} className="text-muted-foreground" />
              </p>
              <div className="grid grid-cols-4 gap-2">
                {LEVEL_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setLevel(o.value)}
                    aria-pressed={level === o.value}
                    className={cn(
                      "flex flex-col items-center gap-0.5 rounded-xl border p-2.5 text-[12px] font-black transition-all",
                      level === o.value
                        ? levelBadgeClass(o.value) + " shadow-sm ring-1 ring-current/30"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {o.label}
                    {poolMeta && o.value !== "all" && (
                      <span className="text-[9px] font-bold opacity-70">
                        {(poolMeta.byLevel[o.value] ?? 0).toLocaleString("fa-IR")} سؤال
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-1.5 text-[13px] font-bold">
                ۵. حالت زمان‌دار (کنکوری)
                {timed > 0 && (
                  <Badge className="gap-1 border-amber-500/40 bg-amber-500/15 text-[9.5px] text-amber-700 dark:text-amber-300">
                    <Hourglass size={10} />
                    فعال
                  </Badge>
                )}
              </p>
              <div className="grid grid-cols-4 gap-2">
                {TIMED_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setTimed(o.value)}
                    aria-pressed={timed === o.value}
                    className={cn(
                      "rounded-xl border p-2.5 text-[12px] font-black transition-all",
                      timed === o.value
                        ? "border-amber-500 bg-amber-500/10 text-amber-600 shadow-sm dark:text-amber-400"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              {timed > 0 && (
                <p className="mt-2 flex items-start gap-1.5 rounded-xl bg-amber-500/10 p-2.5 text-[11px] leading-5 text-amber-700 dark:text-amber-300">
                  <Hourglass size={13} className="mt-0.5 shrink-0" />
                  برای هر سؤال فقط {timed.toLocaleString("fa-IR")} ثانیه وقت داری؛ وقت که تمام شود، سؤال بدون پاسخ در دفتر اشتباهات ثبت می‌شود و پاسخ درست نمایش داده می‌شود.
                </p>
              )}
            </div>
          </div>

          <Button size="lg" className="w-full gap-2 h-12 text-base" onClick={() => startQuiz()} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} />}
            شروع آزمون
          </Button>
          <p className="text-center text-[10.5px] text-muted-foreground/70">
            میان‌بر کیبورد حین آزمون: کلیدهای ۱ تا ۴ برای انتخاب گزینه و Enter برای سؤال بعدی
          </p>
        </CardContent>
      </Card>
  );
}
