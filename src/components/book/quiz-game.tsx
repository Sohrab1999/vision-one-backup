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

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toLocaleString("fa-IR")}:${sec.toString().padStart(2, "0")}`;
}

export function QuizGame({ lessonFilter }: { lessonFilter?: number }) {
  const [phase, setPhase] = useState<Phase>("setup");
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
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  async function startQuiz() {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        category: category === "all" ? "all" : category,
        lesson: lesson === "all" ? "all" : lesson,
        count: String(count),
      });
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
    fetch("/api/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category,
        lesson: lesson === "all" ? 0 : Number(lesson),
        total: questions.length,
        correct: correctCount,
        duration: elapsed,
        name: userName || undefined,
      }),
    })
      .then(() => toast.success(`نتیجه آزمون ذخیره شد ${userName ? `— موفق باشی ${userName}!` : "🎉"}`))
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

          <Button size="lg" className="w-full gap-2 h-12 text-base" onClick={startQuiz} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} />}
            شروع آزمون
          </Button>
        </CardContent>
      </Card>
    );
  }

  // ─────────── Result ───────────
  if (phase === "result") {
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
        <Card className="border-primary/30">
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
            <div className="flex gap-2">
              <Button onClick={reset} className="gap-2">
                <RotateCcw size={16} />
                آزمون جدید
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* مرور خطاها */}
        {correctCount < questions.length && (
          <Card>
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
                    <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-md bg-muted text-[10px] font-black">
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
