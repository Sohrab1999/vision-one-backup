"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ClipboardList,
  Play,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  Loader2,
  Trophy,
  Timer,
  ListChecks,
  BookMarked,
  NotebookPen,
  Printer,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useUserName } from "@/lib/name-store";
import { touchStreak } from "@/lib/streak-store";
import { useMistakes, recordMistake, resolveMistake } from "@/lib/mistakes-store";
import { usePracticeIds, clearPracticeIds } from "@/lib/practice-store";
import type { ViewId } from "./app-header";

interface Question {
  id: string;
  category: string;
  lesson: number;
  scope: string;
  text: string;
  options: string[];
  answer: number;
  level: string;
  explanation: string | null;
}

type Phase = "setup" | "playing" | "result";
type Mode = "normal" | "review";

const CATEGORY_OPTIONS = [
  { value: "all", label: "همه سؤال‌ها" },
  { value: "grammar", label: "فقط گرامر" },
  { value: "vocabulary", label: "فقط واژگان" },
];

const LESSON_OPTIONS = [
  { value: "all", label: "همه بخش‌ها" },
  { value: "0", label: "جمع‌بندی کل کتاب" },
  { value: "1", label: "درس ۱" },
  { value: "2", label: "درس ۲" },
  { value: "3", label: "درس ۳" },
  { value: "4", label: "درس ۴" },
];

const COUNT_OPTIONS = [5, 10, 20, 40];

const LETTERS = ["A", "B", "C", "D"];

const CONFETTI_COLORS = ["#10b981", "#f59e0b", "#f97316", "#14b8a6", "#84cc16", "#eab308"];

/** Lightweight CSS confetti — shown when the quiz score is ۸۰٪ or higher. */
function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.2,
        duration: 2.4 + Math.random() * 1.6,
        size: 6 + Math.random() * 6,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        drift: Math.round((Math.random() - 0.5) * 120),
        round: Math.random() > 0.5,
      })),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece absolute top-[-14px] block"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * (p.round ? 1 : 0.45),
            background: p.color,
            borderRadius: p.round ? "50%" : 2,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            "--confetti-drift": `${p.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toLocaleString("fa-IR")}:${sec.toString().padStart(2, "0")}`;
}

export function QuizGame({ lessonFilter }: { lessonFilter?: number }) {
  const [phase, setPhase] = useState<Phase>("setup");
  const [mode, setMode] = useState<Mode>("normal");
  const [category, setCategory] = useState("all");
  const [lesson, setLesson] = useState(lessonFilter !== undefined ? String(lessonFilter) : "all");
  const [count, setCount] = useState(10);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [aiExplaining, setAiExplaining] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const userName = useUserName();
  const { mistakes: mistakeIds, count: mistakeCount, clear: clearMistakes } = useMistakes();
  const { ids: practiceIds } = usePracticeIds();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  async function startPracticeRound(ids: string[], nextMode: Mode = "normal") {
    setLoading(true);
    setMode(nextMode);
    try {
      const params = new URLSearchParams({ count: String(Math.max(ids.length, 1)) });
      params.set("ids", ids.join(","));
      const res = await fetch(`/api/questions?${params.toString()}`);
      const data = await res.json();
      if (!res.ok || !data.questions?.length) {
        toast.error("سؤالی برای تمرین یافت نشد.");
        return;
      }
      setQuestions(data.questions as Question[]);
      setAnswers(new Array(data.questions.length).fill(null));
      setIndex(0);
      setSelected(null);
      setAiExplanation(null);
      setElapsed(0);
      setPhase("playing");
      clearPracticeIds();
    } catch {
      toast.error("خطا در دریافت سؤالات");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (lessonFilter !== undefined) setLesson(String(lessonFilter));
  }, [lessonFilter]);

  useEffect(() => {
    if (phase === "playing") {
      timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  const current = questions[index];
  const correctCount = useMemo(
    () => questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0),
    [questions, answers],
  );
  const scorePct = questions.length
    ? Math.round((correctCount / questions.length) * 100)
    : 0;

  async function startQuiz(nextMode: Mode = "normal") {
    setLoading(true);
    setMode(nextMode);
    try {
      const params = new URLSearchParams({
        category: category === "all" ? "all" : category,
        lesson: lesson === "all" ? "all" : lesson,
        count: String(count),
      });
      if (nextMode === "review") params.set("ids", mistakeIds.join(","));
      const res = await fetch(`/api/questions?${params.toString()}`);
      const data = await res.json();
      if (!res.ok || !data.questions?.length) {
        toast.error("سؤالی یافت نشد — تنظیمات دیگری را امتحان کنید.");
        return;
      }
      setQuestions(data.questions as Question[]);
      setAnswers(new Array(data.questions.length).fill(null));
      setIndex(0);
      setSelected(null);
      setAiExplanation(null);
      setElapsed(0);
      setPhase("playing");
    } catch {
      toast.error("خطا در دریافت سؤالات");
    } finally {
      setLoading(false);
    }
  }

  function chooseOption(optIdx: number) {
    if (selected !== null) return;
    setSelected(optIdx);
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = optIdx;
      return next;
    });
    if (current) {
      if (optIdx === current.answer) {
        if (mode === "review") resolveMistake(current.id);
      } else {
        recordMistake(current.id);
      }
    }
  }

  async function askAiExplanation() {
    if (!current) return;
    setAiExplaining(true);
    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: current.text,
          options: current.options,
          answer: current.answer,
        }),
      });
      const data = await res.json();
      if (res.ok) setAiExplanation(data.explanation);
      else toast.error(data.error ?? "خطا در توضیح هوشمند");
    } catch {
      toast.error("خطا در ارتباط با هوش مصنوعی");
    } finally {
      setAiExplaining(false);
    }
  }

  function nextQuestion() {
    if (index + 1 >= questions.length) {
      finish();
      return;
    }
    setIndex((i) => i + 1);
    setSelected(answers[index + 1]);
    setAiExplanation(null);
  }

  function finish() {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("result");
    const streak = touchStreak();
    const detail = questions.map((q, i) => ({ id: q.id, chosen: answers[i], answer: q.answer }));
    fetch("/api/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: mode === "review" ? "review" : category,
        lesson: lesson === "all" ? 0 : Number(lesson),
        total: questions.length,
        correct: correctCount,
        duration: elapsed,
        name: userName || undefined,
        detail,
      }),
    })
      .then(() =>
        toast.success(
          mode === "review"
            ? `دور مرور تمام شد! ${mistakeCount.toLocaleString("fa-IR")} سؤال دیگر در دفتر اشتباهات مانده`
            : `نتیجه آزمون ذخیره شد ${userName ? `— موفق باشی ${userName}!` : "🎉"}${streak.count > 1 ? ` 🔥 زنجیره ${streak.count.toLocaleString("fa-IR")} روزه` : ""}`,
        ),
      )
      .catch(() => undefined);
  }

  function reset() {
    setPhase("setup");
    setQuestions([]);
    setAnswers([]);
    setIndex(0);
    setSelected(null);
    setElapsed(0);
  }

  // ─────────── Setup ───────────
  if (phase === "setup") {
    return (
      <Card className="mx-auto max-w-xl rise-in">
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
              <button
                type="button"
                onClick={() => {
                  clearMistakes();
                  toast.info("دفتر اشتباهات پاک شد.");
                }}
                className="absolute bottom-1.5 left-2 flex items-center gap-1 text-[10px] text-muted-foreground/70 transition-colors hover:text-destructive"
              >
                <Trash2 size={11} />
                پاک‌کردن دفتر
              </button>
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
                {LESSON_OPTIONS.map((o) => (
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
          </div>

          <Button size="lg" className="w-full gap-2 h-12 text-base" onClick={() => startQuiz()} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} />}
            شروع آزمون
          </Button>
        </CardContent>
      </Card>
    );
  }

  // ─────────── Result ───────────
  if (phase === "result") {
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
            <div className="flex gap-3 text-[12px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Timer size={13} /> {fmtTime(elapsed)}
              </span>
              <span className="flex items-center gap-1">
                <ListChecks size={13} /> {questions.length.toLocaleString("fa-IR")} سؤال
              </span>
              <span className="flex items-center gap-1">
                <Trophy size={13} /> {correctCount.toLocaleString("fa-IR")} صحیح
              </span>
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
                      <p dir="ltr" className="font-en text-[12px] font-semibold leading-6">
                        {q.text}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px]">
                        <Badge variant="destructive" className="text-[10px]">
                          پاسخ شما: {answers[i] !== null ? q.options[answers[i] as number] : "—"}
                        </Badge>
                        <Badge className="text-[10px] bg-primary">
                          صحیح: {q.options[q.answer]}
                        </Badge>
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
                      {answers[i] !== null && (
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

  // ─────────── Playing ───────────
  if (!current) return null;
  const answered = selected !== null;

  return (
    <div className="mx-auto max-w-2xl space-y-4 rise-in">
      {/* نوار پیشرفت */}
      <div className="flex items-center gap-3">
        <Progress value={((index + 1) / questions.length) * 100} className="h-2 flex-1" />
        <span className="shrink-0 text-[12px] font-bold text-muted-foreground">
          سؤال {(index + 1).toLocaleString("fa-IR")} از {questions.length.toLocaleString("fa-IR")}
        </span>
        <Badge variant="secondary" className="gap-1 shrink-0 text-[11px]">
          <Timer size={11} />
          {fmtTime(elapsed)}
        </Badge>
      </div>

      <Card>
        <CardContent className="space-y-5 p-5">
          <div className="flex flex-wrap items-center gap-2">
            {mode === "review" && (
              <Badge className="border-amber-500/40 bg-amber-500/15 text-[11px] text-amber-700 dark:text-amber-300">
                <NotebookPen size={11} />
                دور مرور
              </Badge>
            )}
            <Badge variant="outline" className="text-[11px]">
              {current.scope}
            </Badge>
            <Badge variant="secondary" className="text-[11px]">
              سطح: {current.level}
            </Badge>
            <Badge variant="secondary" className="text-[11px]">
              {current.category === "grammar" ? "گرامر" : "واژگان"}
            </Badge>
            <span className="mr-auto flex items-center gap-1 text-[12px] font-bold text-primary">
              <CheckCircle2 size={13} />
              {correctCount.toLocaleString("fa-IR")} صحیح
            </span>
          </div>

          <p dir="ltr" className="font-en rounded-xl bg-muted/50 p-4 text-[15px] font-semibold leading-8">
            {current.text}
          </p>

          <RadioGroup value={selected !== null ? String(selected) : ""} className="gap-2">
            {current.options.map((opt, i) => {
              const isCorrect = i === current.answer;
              const isChosen = i === selected;
              return (
                <Label
                  key={i}
                  htmlFor={`opt-${index}-${i}`}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all",
                    !answered && "hover:border-primary/50 hover:bg-primary/5",
                    answered && isCorrect && "border-primary bg-primary/10 shadow-sm",
                    answered && isChosen && !isCorrect && "border-destructive bg-destructive/10",
                    answered && !isChosen && !isCorrect && "opacity-55",
                  )}
                >
                  <RadioGroupItem
                    id={`opt-${index}-${i}`}
                    value={String(i)}
                    disabled={answered}
                    onClick={() => chooseOption(i)}
                    className={cn(
                      answered && isCorrect && "border-primary text-primary",
                      answered && isChosen && !isCorrect && "border-destructive text-destructive",
                    )}
                  />
                  <span
                    dir="ltr"
                    className={cn(
                      "font-en flex-1 text-[14px] leading-6",
                      answered && isCorrect && "font-bold text-primary",
                      answered && isChosen && !isCorrect && "text-destructive",
                    )}
                  >
                    <span
                      className={cn(
                        "mr-2 inline-flex h-5.5 w-5.5 translate-y-1 items-center justify-center rounded-lg text-[10px] font-black transition-colors",
                        answered && isCorrect
                          ? "bg-primary text-primary-foreground"
                          : answered && isChosen && !isCorrect
                            ? "bg-destructive text-destructive-foreground"
                            : "bg-primary/10 text-primary",
                      )}
                    >
                      {LETTERS[i]}
                    </span>
                    {opt}
                  </span>
                  {answered && isCorrect && <CheckCircle2 size={17} className="text-primary shrink-0" />}
                  {answered && isChosen && !isCorrect && <XCircle size={17} className="text-destructive shrink-0" />}
                </Label>
              );
            })}
          </RadioGroup>

          {answered && (
            <div className="space-y-3 rise-in">
              {aiExplanation && (
                <div className="rounded-xl border border-accent/50 bg-accent/25 p-3 text-[12.5px] leading-7">
                  <p className="mb-1 flex items-center gap-1.5 text-[11px] font-black text-accent-foreground">
                    <Sparkles size={12} className="text-amber-500" />
                    توضیح هوشمند
                  </p>
                  {aiExplanation}
                </div>
              )}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={askAiExplanation}
                  disabled={aiExplaining}
                  className="gap-1.5 text-[12px]"
                >
                  {aiExplaining ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} className="text-amber-500" />}
                  توضیح با هوش مصنوعی
                </Button>
                <Button onClick={nextQuestion} className="gap-2">
                  {index + 1 >= questions.length ? "دیدن نتیجه" : "سؤال بعدی"}
                  <ArrowLeft size={15} />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
