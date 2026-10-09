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
  Download,
  Hourglass,
  CalendarCheck,
  CalendarRange,
  Gauge,
  Star,
  Layers,
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
import { useQuestionStars, toggleQuestionStar } from "@/lib/question-star-store";
import { recordStudySession } from "@/lib/goal-store";
import { recordDailyResult, useDailyInfo, todayKey } from "@/lib/daily-store";
import { useWeeklyInfo, recordWeeklyResult, weekKeyOf } from "@/lib/weekly-store";
import { useCombinedRounds, recordCombinedRound } from "@/lib/round-counters";
import { usePulses } from "@/lib/use-daily-pulse";
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
type Mode = "normal" | "review" | "daily" | "weekly" | "starred" | "combined";

const CATEGORY_OPTIONS = [
  { value: "all", label: "همه سؤال‌ها" },
  { value: "grammar", label: "فقط گرامر" },
  { value: "vocabulary", label: "فقط واژگان" },
];

const LEVEL_OPTIONS = [
  { value: "all", label: "همه سطوح" },
  { value: "آموزشی", label: "آموزشی" },
  { value: "متوسط", label: "متوسط" },
  { value: "کنکوری", label: "کنکوری" },
];

/** رنگ نشان سطح روی کارت سؤال و چیپ فعال سطح */
function levelBadgeClass(level: string): string {
  if (level === "all") return "border-primary bg-primary/10 text-primary";
  if (level === "آموزشی") return "border-primary/40 bg-primary/10 text-primary";
  if (level === "کنکوری") return "border-destructive/40 bg-destructive/10 text-destructive";
  return "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400";
}

const LESSON_OPTIONS = [
  { value: "all", label: "همه بخش‌ها" },
  { value: "0", label: "جمع‌بندی کل کتاب" },
  { value: "1", label: "درس ۱" },
  { value: "2", label: "درس ۲" },
  { value: "3", label: "درس ۳" },
  { value: "4", label: "درس ۴" },
];

const COUNT_OPTIONS = [5, 10, 20, 40];

const TIMED_OPTIONS = [
  { value: 0, label: "بدون زمان" },
  { value: 15, label: "۱۵ ثانیه" },
  { value: 30, label: "۳۰ ثانیه" },
  { value: 60, label: "۶۰ ثانیه" },
];

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

interface PoolMeta {
  total: number;
  byLevel: Record<string, number>;
  byCategory: Record<string, number>;
}

export function QuizGame({ lessonFilter }: { lessonFilter?: number }) {
  const [phase, setPhase] = useState<Phase>("setup");
  const [mode, setMode] = useState<Mode>("normal");
  const [category, setCategory] = useState("all");
  const [lesson, setLesson] = useState(lessonFilter !== undefined ? String(lessonFilter) : "all");
  const [count, setCount] = useState(10);
  const [level, setLevel] = useState("all");
  const [poolMeta, setPoolMeta] = useState<PoolMeta | null>(null);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [aiExplaining, setAiExplaining] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [timed, setTimed] = useState(0);
  const [, setQTick] = useState(0);
  const [exporting, setExporting] = useState(false);
  const pulses = usePulses(phase === "setup");
  const userName = useUserName();
  const { mistakes: mistakeIds, count: mistakeCount, clear: clearMistakes } = useMistakes();
  const { ids: practiceIds } = usePracticeIds();
  const { ids: starredQIds, count: starredQCount, has: hasQStar, toggle: toggleQStar } = useQuestionStars();
  const daily = useDailyInfo();
  const weekly = useWeeklyInfo();
  const combinedRounds = useCombinedRounds();
  /** مرور ترکیبی: اشتباهات + ستاره‌دارها (بدون تکرار، حداکثر ۸۰ سؤال) */
  const combinedIds = useMemo(
    () => Array.from(new Set([...mistakeIds, ...starredQIds])).slice(0, 80),
    [mistakeIds, starredQIds],
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const deadlineRef = useRef(0);
  const answeredLeftRef = useRef(0);
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      deadlineRef.current = Date.now() + timed * 1000;
      if (advanceRef.current) clearTimeout(advanceRef.current);
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

  // شمارنده‌های بانک سؤال برای چیپ‌های سطح — یک‌بار در ورود به تنظیمات
  useEffect(() => {
    if (poolMeta) return;
    let cancelled = false;
    fetch("/api/questions?meta=1")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && d && typeof d.total === "number") setPoolMeta(d as PoolMeta);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [poolMeta]);

  useEffect(() => {
    if (phase === "playing") {
      timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  const current = questions[index];
  /** ثانیه‌های باقی‌ماندهٔ سؤال جاری در حالت زمان‌دار — پس از پاسخ‌دادن منجمد می‌شود */
  const qLeft =
    timed > 0 && phase === "playing" && deadlineRef.current > 0
      ? Math.max(0, Math.ceil((deadlineRef.current - Date.now()) / 1000))
      : 0;
  const shownLeft = selected === null ? qLeft : selected === -1 ? 0 : answeredLeftRef.current;
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
      if (level !== "all") params.set("level", level);
      if (nextMode === "review") params.set("ids", mistakeIds.join(","));
      const res = await fetch(`/api/questions?${params.toString()}`);
      const data = await res.json();
      if (!res.ok || !data.questions?.length) {
        toast.error(
          level !== "all"
            ? "با این تنظیمات سؤالی یافت نشد — سطح دیگری را امتحان کنید."
            : "سؤالی یافت نشد — تنظیمات دیگری را امتحان کنید.",
        );
        return;
      }
      setQuestions(data.questions as Question[]);
      setAnswers(new Array(data.questions.length).fill(null));
      setIndex(0);
      setSelected(null);
      setAiExplanation(null);
      setElapsed(0);
      deadlineRef.current = Date.now() + timed * 1000;
      if (advanceRef.current) clearTimeout(advanceRef.current);
      setPhase("playing");
    } catch {
      toast.error("خطا در دریافت سؤالات");
    } finally {
      setLoading(false);
    }
  }

  /** شروع چالش روزانه — ۵ سؤال قطعی امروز، بدون زمان‌سنج */
  async function startDaily() {
    setLoading(true);
    setMode("daily");
    try {
      const res = await fetch("/api/questions?daily=1&count=5");
      const data = await res.json();
      if (!res.ok || !data.questions?.length) {
        toast.error("چالش امروز آماده نیست — بعداً دوباره امتحان کن.");
        return;
      }
      setQuestions(data.questions as Question[]);
      setAnswers(new Array(data.questions.length).fill(null));
      setIndex(0);
      setSelected(null);
      setAiExplanation(null);
      setElapsed(0);
      deadlineRef.current = 0;
      if (advanceRef.current) clearTimeout(advanceRef.current);
      setPhase("playing");
      toast.info("چالش روزانه شروع شد — ۵ سؤال امروز همه یکسان است! 🎯", { duration: 3200 });
    } catch {
      toast.error("خطا در دریافت چالش روزانه");
    } finally {
      setLoading(false);
    }
  }

  /** شروع چالش هفتگی — ۱۰ سؤال قطعی این هفته، بدون زمان‌سنج */
  async function startWeekly() {
    setLoading(true);
    setMode("weekly");
    try {
      const res = await fetch("/api/questions?weekly=1&count=10");
      const data = await res.json();
      if (!res.ok || !data.questions?.length) {
        toast.error("چالش این هفته آماده نیست — بعداً دوباره امتحان کن.");
        return;
      }
      setQuestions(data.questions as Question[]);
      setAnswers(new Array(data.questions.length).fill(null));
      setIndex(0);
      setSelected(null);
      setAiExplanation(null);
      setElapsed(0);
      deadlineRef.current = 0;
      if (advanceRef.current) clearTimeout(advanceRef.current);
      setPhase("playing");
      toast.info(`چالش هفتگی شروع شد — ۱۰ سؤال هفتهٔ ${weekly.weekIndex.toLocaleString("fa-IR")} برای همه یکسان است! 📅`, { duration: 3200 });
    } catch {
      toast.error("خطا در دریافت چالش هفتگی");
    } finally {
      setLoading(false);
    }
  }

  /** هنگام اتمام زمان یک سؤال: بدون پاسخ ثبت و اشتباه، سپس نمایش پاسخ و رفتن خودکار */
  function handleTimeout() {
    if (!current || selected !== null) return;
    toast.info("وقت این سؤال تمام شد ⏰", { duration: 1900 });
    recordMistake(current.id);
    setSelected(-1);
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = -1;
      return next;
    });
    setAiExplanation(null);
    advanceRef.current = setTimeout(() => nextQuestion(), 1900);
  }

  // شمارش معکوس حالت زمان‌دار — دی‌دلاین هر سؤال با تغییر سؤال/فاز بازنشانی می‌شود (در چالش روزانه/هفتگی غیرفعال)
  useEffect(() => {
    if (phase !== "playing" || timed <= 0 || selected !== null || mode === "daily" || mode === "weekly") return;
    if (deadlineRef.current === 0 || deadlineRef.current < Date.now() - timed * 1000) {
      deadlineRef.current = Date.now() + timed * 1000;
    }
    const iv = setInterval(() => {
      if (Date.now() >= deadlineRef.current) {
        clearInterval(iv);
        handleTimeout();
      } else {
        setQTick((t) => t + 1);
      }
    }, 1000);
    return () => clearInterval(iv);
  }, [phase, timed, selected, index]);

  function chooseOption(optIdx: number) {
    if (selected !== null) return;
    if (timed > 0 && deadlineRef.current > 0) {
      answeredLeftRef.current = Math.max(0, Math.ceil((deadlineRef.current - Date.now()) / 1000));
    }
    setSelected(optIdx);
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = optIdx;
      return next;
    });
    if (current) {
      if (optIdx === current.answer) {
        // در مرور اشتباهات و مرور ترکیبی، پاسخ درست سؤال را از دفتر اشتباهات حذف می‌کند
        if (mode === "review" || mode === "combined") resolveMistake(current.id);
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
    if (advanceRef.current) clearTimeout(advanceRef.current);
    if (index + 1 >= questions.length) {
      finish();
      return;
    }
    setIndex((i) => i + 1);
    setSelected(answers[index + 1]);
    setAiExplanation(null);
    deadlineRef.current = mode === "daily" || mode === "weekly" ? 0 : Date.now() + timed * 1000;
  }

  // میان‌برهای کیبورد حین آزمون: ۱-۴ (فارسی/انگلیسی) انتخاب گزینه، Enter سؤال بعدی
  useEffect(() => {
    if (phase !== "playing") return;
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (e.key === "Enter" && selected !== null) {
        e.preventDefault();
        nextQuestion();
        return;
      }
      if (selected !== null) return;
      const fa = "۱۲۳۴".indexOf(e.key);
      const en = "1234".indexOf(e.key);
      const digit = fa >= 0 ? fa : en;
      if (digit >= 0 && digit < (current?.options.length ?? 0)) {
        e.preventDefault();
        chooseOption(digit);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, selected, index, questions]);

  function finish() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (advanceRef.current) clearTimeout(advanceRef.current);
    setPhase("result");
    recordStudySession();
    const streak = touchStreak();
    if (mode === "daily") recordDailyResult(todayKey(), scorePct, questions.length);
    if (mode === "weekly") recordWeeklyResult(weekKeyOf(), scorePct, questions.length);
    if (mode === "combined") recordCombinedRound();
    const detail = questions.map((q, i) => ({ id: q.id, chosen: answers[i], answer: q.answer }));
    fetch("/api/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category:
          mode === "review"
            ? "review"
            : mode === "daily"
              ? "daily"
              : mode === "weekly"
                ? "weekly"
                : mode === "starred"
                  ? "starred"
                  : mode === "combined"
                    ? "combined"
                    : category,
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
          mode === "daily"
            ? `چالش امروز ثبت شد — ${scorePct.toLocaleString("fa-IR")}٪ ${scorePct >= 80 ? "🏆" : "💪"}`
            : mode === "weekly"
              ? `چالش هفتگی ثبت شد — ${scorePct.toLocaleString("fa-IR")}٪ 📅 ${scorePct >= 80 ? "🏆" : "💪"}`
            : mode === "review"
              ? `دور مرور تمام شد! ${mistakeCount.toLocaleString("fa-IR")} سؤال دیگر در دفتر اشتباهات مانده`
              : mode === "starred"
                ? `تمرین ستاره‌دارها ثبت شد — ${scorePct.toLocaleString("fa-IR")}٪ ⭐`
                : mode === "combined"
                  ? `مرور ترکیبی ثبت شد — ${scorePct.toLocaleString("fa-IR")}٪ 🧩`
                  : `نتیجه آزمون ذخیره شد ${userName ? `— موفق باشی ${userName}!` : "🎉"}${streak.count > 1 ? ` 🔥 زنجیره ${streak.count.toLocaleString("fa-IR")} روزه` : ""}`,
        ),
      )
      .catch(() => undefined);
  }

  /** خروجی CSV از دفتر اشتباهات — فایل UTF-8 با BOM برای اکسل */
  async function exportMistakesCsv() {
    if (!mistakeIds.length || exporting) return;
    setExporting(true);
    try {
      const res = await fetch(`/api/questions?count=${mistakeIds.length}&ids=${mistakeIds.join(",")}`);
      const data = await res.json();
      const qs = (data.questions ?? []) as Question[];
      if (!qs.length) {
        toast.error("سؤالی برای خروجی یافت نشد.");
        return;
      }
      const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
      const rows = [
        ["ردیف", "متن سؤال", "پاسخ صحیح", "دسته", "مبحث", "سطح"].join(","),
        ...qs.map((q, i) =>
          [
            i + 1,
            esc(q.text),
            esc(q.options[q.answer] ?? ""),
            q.category === "grammar" ? "گرامر" : "واژگان",
            esc(q.scope),
            esc(q.level),
          ].join(","),
        ),
      ];
      const blob = new Blob(["\uFEFF" + rows.join("\r\n")], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "vision-one-mistakes.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success(`فایل CSV با ${qs.length.toLocaleString("fa-IR")} سؤال دانلود شد.`);
    } catch {
      toast.error("خطا در ساخت فایل CSV");
    } finally {
      setExporting(false);
    }
  }

  function reset() {
    if (advanceRef.current) clearTimeout(advanceRef.current);
    deadlineRef.current = 0;
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
        {timed > 0 ? (
          <Badge
            variant="outline"
            className={cn(
              "gap-1 shrink-0 text-[11px] font-black tabular-nums",
              selected === -1
                ? "border-destructive/50 bg-destructive/10 text-destructive"
                : shownLeft <= 5
                  ? "timer-urgent border-destructive/50 bg-destructive/10 text-destructive"
                  : shownLeft <= 10
                    ? "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    : "border-primary/40 bg-primary/10 text-primary",
            )}
          >
            {selected === -1 ? <Hourglass size={11} /> : <Timer size={11} />}
            {selected === -1 ? "وقت تمام" : `${shownLeft.toLocaleString("fa-IR")} ثانیه`}
          </Badge>
        ) : (
          <Badge variant="secondary" className="gap-1 shrink-0 text-[11px]">
            <Timer size={11} />
            {fmtTime(elapsed)}
          </Badge>
        )}
      </div>

      {/* نوار زمان باقی‌ماندهٔ سؤال در حالت زمان‌دار */}
      {timed > 0 && (
        <div aria-hidden className="h-1 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-[width] duration-1000 ease-linear",
              selected === -1
                ? "bg-destructive/60"
                : shownLeft <= 5
                  ? "bg-destructive"
                  : shownLeft <= 10
                    ? "bg-amber-500"
                    : "bg-primary",
            )}
            style={{ width: `${Math.min(100, (shownLeft / timed) * 100)}%` }}
          />
        </div>
      )}

      <Card>
        <CardContent className="space-y-5 p-5">
          <div className="flex flex-wrap items-center gap-2">
            {mode === "review" && (
              <Badge className="border-amber-500/40 bg-amber-500/15 text-[11px] text-amber-700 dark:text-amber-300">
                <NotebookPen size={11} />
                دور مرور
              </Badge>
            )}
            {mode === "starred" && (
              <Badge className="border-yellow-500/40 bg-yellow-500/15 text-[11px] text-yellow-700 dark:text-yellow-300">
                <Star size={11} />
                تمرین ستاره‌دارها
              </Badge>
            )}
            {mode === "combined" && (
              <Badge className="border-teal-500/40 bg-teal-500/15 text-[11px] text-teal-700 dark:text-teal-300">
                <Layers size={11} />
                مرور ترکیبی
              </Badge>
            )}
            {mode === "daily" && (
              <Badge className="border-amber-500/40 bg-amber-500/15 text-[11px] text-amber-700 dark:text-amber-300">
                <CalendarCheck size={11} />
                چالش روزانه
              </Badge>
            )}
            {mode === "weekly" && (
              <Badge className="border-violet-500/40 bg-violet-500/15 text-[11px] text-violet-700 dark:text-violet-300">
                <CalendarRange size={11} />
                چالش هفتگی · هفتهٔ {weekly.weekIndex.toLocaleString("fa-IR")}
              </Badge>
            )}
            <Badge variant="outline" className="text-[11px]">
              {current.scope}
            </Badge>
            <Badge variant="outline" className={cn("text-[11px]", levelBadgeClass(current.level))}>
              سطح: {current.level}
            </Badge>
            <Badge variant="secondary" className="text-[11px]">
              {current.category === "grammar" ? "گرامر" : "واژگان"}
            </Badge>
            {timed > 0 && mode !== "daily" && mode !== "weekly" && (
              <Badge variant="outline" className="gap-1 border-amber-500/40 text-[10.5px] text-amber-600 dark:text-amber-400">
                <Hourglass size={10} />
                زمان‌دار
              </Badge>
            )}
            {/* ستاره‌دار کردن سؤال جاری — حتی قبل از پاسخ */}
            <button
              type="button"
              onClick={() => toggleQStar(current.id)}
              aria-label={hasQStar(current.id) ? "حذف ستاره سؤال" : "ستاره‌دار کردن این سؤال"}
              aria-pressed={hasQStar(current.id)}
              title={hasQStar(current.id) ? "حذف از سؤال‌های ستاره‌دار" : "این سؤال را برای مرور بعدی ستاره‌دار کن"}
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all hover:scale-110",
                hasQStar(current.id) ? "text-yellow-500" : "text-muted-foreground/50 hover:text-yellow-500",
              )}
            >
              <Star size={15} className={cn(hasQStar(current.id) && "fill-yellow-500 star-pop")} />
            </button>
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
                  {!answered && (
                    <kbd className="hidden h-5 min-w-5 shrink-0 items-center justify-center rounded-md border bg-muted/70 px-1 font-en text-[10px] font-bold text-muted-foreground sm:inline-flex" title="میان‌بر کیبورد">
                      {i + 1}
                    </kbd>
                  )}
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
                  <kbd className="hidden rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 font-en text-[10px] font-bold sm:inline">↵</kbd>
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
