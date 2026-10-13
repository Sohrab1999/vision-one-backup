"use client";

/**
 * صفحهٔ نتیجهٔ آزمون (فاز result) — تفکیک مکانیکی گام ۴ نقشهٔ refactor-2.
 * شامل دایرهٔ درصد، کارنامهٔ قابل چاپ، مرور پاسخ‌های نادرست و پیشنهاد مرور اشتباهات؛
 * JSX بایت‌به‌بایت از quiz-game.tsx منتقل شده است.
 */

import {
  BookMarked,
  CalendarCheck,
  CalendarRange,
  Gauge,
  Hourglass,
  Layers,
  ListChecks,
  Loader2,
  NotebookPen,
  Play,
  Printer,
  RotateCcw,
  Star,
  Timer,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Confetti, fmtTime } from "./helpers";
import type { Mode, Question } from "./types";

export interface ResultViewProps {
  questions: Question[];
  answers: (number | null)[];
  correctCount: number;
  scorePct: number;
  elapsed: number;
  mode: Mode;
  level: string;
  timed: number;
  userName: string;
  loading: boolean;
  hasQStar: (id: string) => boolean;
  toggleQStar: (id: string) => void;
  reset: () => void;
  startQuiz: (nextMode?: Mode) => void;
}

export function ResultView({
  questions,
  answers,
  correctCount,
  scorePct,
  elapsed,
  mode,
  level,
  timed,
  userName,
  loading,
  hasQStar,
  toggleQStar,
  reset,
  startQuiz,
}: ResultViewProps) {
    const wrongCount = questions.length - correctCount;
    const message =
      scorePct >= 90
        ? "فوق‌العاده بود! تو آماده‌ی کنکوری 🏆"
        : scorePct >= 70
          ? "خیلی خوب! فقط کمی تمرین بیشتر 💪"
          : scorePct >= 50
            ? "قابل قبول؛ درسنامه‌ها را یک مرور کن 📖"
            : "نگران نباش! از واژگان و گرامر شروع کن و دوباره امتحان بده ✨";

    return (
      <div className="mx-auto max-w-2xl space-y-4 rise-in">
        <Card className="result-pop relative overflow-hidden border-primary/30 no-print">
          {scorePct >= 80 && <Confetti />}
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="relative h-36 w-36">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" strokeWidth="12" className="stroke-muted" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  strokeWidth="12"
                  strokeLinecap="round"
                  className={cn(
                    "transition-all duration-1000",
                    scorePct >= 70 ? "stroke-primary" : scorePct >= 50 ? "stroke-amber-500" : "stroke-destructive",
                  )}
                  strokeDasharray={`${(scorePct / 100) * 326.7} 326.7`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-black">{scorePct.toLocaleString("fa-IR")}٪</p>
                <p className="text-[11px] text-muted-foreground">
                  {correctCount.toLocaleString("fa-IR")} از {questions.length.toLocaleString("fa-IR")}
                </p>
              </div>
            </div>
            <p className="text-sm font-bold">{message}</p>
            <div className="flex flex-wrap justify-center gap-3 text-[12px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Timer size={13} /> {fmtTime(elapsed)}
              </span>
              <span className="flex items-center gap-1">
                <ListChecks size={13} /> {questions.length.toLocaleString("fa-IR")} سؤال
              </span>
              <span className="flex items-center gap-1">
                <Trophy size={13} /> {correctCount.toLocaleString("fa-IR")} صحیح
              </span>
              {mode === "daily" && (
                <span className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                  <CalendarCheck size={13} /> چالش روزانه {new Date().toLocaleDateString("fa-IR", { month: "short", day: "numeric" })}
                </span>
              )}
              {mode === "weekly" && (
                <span className="flex items-center gap-1 font-bold text-violet-600 dark:text-violet-400">
                  <CalendarRange size={13} /> چالش هفتگی {new Date().toLocaleDateString("fa-IR", { month: "short", day: "numeric" })}
                </span>
              )}
              {mode === "starred" && (
                <span className="flex items-center gap-1 font-bold text-yellow-600 dark:text-yellow-400">
                  <Star size={13} /> تمرین ستاره‌دارها
                </span>
              )}
              {mode === "combined" && (
                <span className="flex items-center gap-1 font-bold text-teal-600 dark:text-teal-400">
                  <Layers size={13} /> مرور ترکیبی
                </span>
              )}
              {mode === "normal" && level !== "all" && (
                <span className="flex items-center gap-1 font-bold">
                  <Gauge size={13} /> سطح {level}
                </span>
              )}
              {timed > 0 && mode !== "daily" && mode !== "weekly" && (
                <span className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                  <Hourglass size={13} /> حالت زمان‌دار ({timed.toLocaleString("fa-IR")} ثانیه‌ای)
                </span>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-2 no-print">
              <Button onClick={reset} className="gap-2">
                <RotateCcw size={16} />
                آزمون جدید
              </Button>
              <Button onClick={() => window.print()} variant="outline" className="gap-2">
                <Printer size={16} />
                چاپ کارنامه
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* پیشنهاد مرور اشتباهات همین آزمون */}
        {mode === "normal" && wrongCount > 0 && (
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-gradient-to-l from-amber-500/10 via-amber-500/5 to-transparent p-4 no-print rise-in">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                <NotebookPen size={19} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-black">
                  {wrongCount.toLocaleString("fa-IR")} سؤال در دفتر اشتباهات ثبت شد
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  همین حالا فقط اشتباه‌هایت را مرور کن؛ با هر پاسخ درست از دفتر حذف می‌شوند.
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => startQuiz("review")}
                disabled={loading}
                className="shrink-0 gap-1.5 bg-amber-500 text-white hover:bg-amber-600"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
                مرور اشتباهات
              </Button>
            </div>
          </div>
        )}

        {/* مرور خطاها */}
        {correctCount < questions.length && (
          <Card className="no-print">
            <CardContent className="p-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-black">
                <BookMarked size={16} className="text-amber-500" />
                مرور پاسخ‌های نادرست
              </h3>
              <div className="space-y-3">
                {questions.map((q, i) =>
                  answers[i] === q.answer ? null : (
                    <div key={q.id} className="rounded-xl border bg-card p-3">
                      <div className="flex items-start justify-between gap-2">
                        <p dir="ltr" className="font-en flex-1 text-[12px] font-semibold leading-6">
                          {q.text}
                        </p>
                        <button
                          type="button"
                          onClick={() => toggleQStar(q.id)}
                          aria-label={hasQStar(q.id) ? "حذف ستاره سؤال" : "ستاره‌دار کردن سؤال"}
                          aria-pressed={hasQStar(q.id)}
                          title={hasQStar(q.id) ? "حذف از سؤال‌های ستاره‌دار" : "ستاره‌دار کن تا در تمرین بعدی بیاید"}
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all hover:scale-110",
                            hasQStar(q.id) ? "text-yellow-500" : "text-muted-foreground/50 hover:text-yellow-500",
                          )}
                        >
                          <Star size={14} className={cn(hasQStar(q.id) && "fill-yellow-500 star-pop")} />
                        </button>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px]">
                        <Badge variant="destructive" className="text-[10px]">
                          پاسخ شما:
                          {answers[i] === -1
                            ? " وقت تمام شد ⏰"
                            : answers[i] !== null
                              ? ` ${q.options[answers[i] as number]}`
                              : " —"}
                        </Badge>
                        <Badge className="text-[10px] bg-primary">صحیح: {q.options[q.answer]}</Badge>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        )}
        {/* کارنامه قابل چاپ — فقط در حالت چاپ دیده می‌شود */}
        <div className="print-area hidden">
          <div className="print-card rounded-xl bg-white p-6 text-right">
            <div className="mb-4 flex items-center justify-between border-b pb-3">
              <p dir="ltr" className="font-en text-sm font-black">Vision One — Report Card</p>
              <p className="text-[12px] print-muted">
                {new Date().toLocaleDateString("fa-IR")} — {new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
            <div className="mb-4 grid grid-cols-4 gap-3 text-center">
              <div className="print-card rounded-lg border p-3">
                <p className="text-lg font-black">{scorePct.toLocaleString("fa-IR")}٪</p>
                <p className="text-[10px] print-muted">دقت</p>
              </div>
              <div className="print-card rounded-lg border p-3">
                <p className="text-lg font-black">{correctCount.toLocaleString("fa-IR")}</p>
                <p className="text-[10px] print-muted">صحیح</p>
              </div>
              <div className="print-card rounded-lg border p-3">
                <p className="text-lg font-black">{(questions.length - correctCount).toLocaleString("fa-IR")}</p>
                <p className="text-[10px] print-muted">نادرست</p>
              </div>
              <div className="print-card rounded-lg border p-3">
                <p className="text-lg font-black">{fmtTime(elapsed)}</p>
                <p className="text-[10px] print-muted">زمان</p>
              </div>
            </div>
            {userName && (
              <p className="mb-2 text-[12px] print-muted">دانش‌آموز: {userName}</p>
            )}
            <p className="mb-1 text-[13px] font-black">پاسخ‌های نادرست برای مرور:</p>
            <ol className="list-decimal space-y-2 pr-5">
              {questions.map((q, i) =>
                answers[i] === q.answer ? null : (
                  <li key={q.id} className="text-[11.5px] leading-6">
                    <span dir="ltr" className="font-en block font-semibold">{q.text}</span>
                    <span className="print-muted">
                      پاسخ درست: <b dir="ltr" className="font-en">{q.options[q.answer]}</b>
                      {answers[i] === -1
                        ? " — بدون پاسخ (وقت تمام شد)"
                        : answers[i] !== null && (
                            <> — پاسخ شما: <span dir="ltr" className="font-en">{q.options[answers[i] as number]}</span></>
                          )}
                    </span>
                  </li>
                ),
              )}
            </ol>
            <p className="mt-4 text-center text-[10px] print-muted">
              جزوه جامع زبان انگلیسی پایه دهم — ویژن وان | vision-one.web
            </p>
          </div>
        </div>
      </div>
    );
}
