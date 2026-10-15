"use client";

/**
 * موتور آزمون تعاملی (QuizGame) — امضای عمومی دست‌نخورده: QuizGame({ lessonFilter? })
 * تفکیک مکانیکی گام ۴ نقشهٔ docs/refactor-roadmap-2.md از quiz-game.tsx (پلی‌بوک games/fps/README.md):
 * وضعیت/افکت‌ها/منطق پاسخ/ماندگاری (روزانه/هفتگی/زنجیره/اشتباهات/SRS/گیمیفیکیشن) همین‌جاست؛
 * نمایش سه فاز به SetupPanel / ResultView / QuestionCard (+ BonusCard) منتقل شده است.
 * پذیرش کیت بازی‌ها: kit/sound-engine + kit/haptics + kit/telemetry (فاز G1-10).
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useUserName } from "@/lib/name-store";
import { touchStreak } from "@/lib/streak-store";
import { awardQuizActivity } from "@/lib/gamification";
import { useMistakes, recordMistake, resolveMistake } from "@/lib/mistakes-store";
import { usePracticeIds, clearPracticeIds } from "@/lib/practice-store";
import { useQuestionStars } from "@/lib/question-star-store";
import { recordStudySession } from "@/lib/goal-store";
import { recordDailyResult, useDailyInfo, todayKey } from "@/lib/daily-store";
import { useWeeklyInfo, recordWeeklyResult, weekKeyOf } from "@/lib/weekly-store";
import { recordCombinedRound } from "@/lib/round-counters";
import { usePulses } from "@/lib/use-daily-pulse";
import { useBook } from "@/lib/book-context";
import { seedReviewFromQuiz } from "@/lib/srs-store";
import { enqueueOffline } from "@/lib/offline-queue";
// کیت بازی‌ها — پذیرش گام ۴ نقشهٔ refactor-2 (صدا/لرزش/تله‌متری)
import { playSound } from "../kit/sound-engine";
import { buzz } from "../kit/haptics";
import { createGameSession, type GameSessionTracker } from "../kit/telemetry";
import { BASE_LESSON_OPTIONS, GAME_KEY } from "./constants";
import type { Mode, Phase, PoolMeta, Question, SimilarBonus } from "./types";
import { SetupPanel } from "./setup-panel";
import { ResultView } from "./result-view";
import { QuestionCard } from "./question-card";

export function QuizGame({ lessonFilter }: { lessonFilter?: number }) {
  const { bookId, meta, data: bookData } = useBook();
  const [phase, setPhase] = useState<Phase>("setup");
  const [mode, setMode] = useState<Mode>("normal");
  const [category, setCategory] = useState("all");
  const [lesson, setLesson] = useState(lessonFilter !== undefined ? String(lessonFilter) : "all");
  const [count, setCount] = useState(10);
  const [level, setLevel] = useState("all");
  const [poolMeta, setPoolMeta] = useState<PoolMeta | null>(null);

  /** گزینه‌های محدوده درس — به‌صورت خودکار از واژگان کتاب فعال ساخته می‌شوند (پشتیبانی از هر تعداد درس) */
  const lessonOptions = useMemo(() => {
    if (!bookData) return BASE_LESSON_OPTIONS;
    return [
      ...BASE_LESSON_OPTIONS,
      ...bookData.vocab.lessons
        .filter((l) => l.lesson > 0)
        .map((l) => ({ value: String(l.lesson), label: `درس ${l.lesson}` })),
    ];
  }, [bookData]);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [aiExplaining, setAiExplaining] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  /** کارت بونس «سؤال مشابه» — تمرین بی‌پایان از روی سؤال جاری */
  const [bonus, setBonus] = useState<SimilarBonus | null>(null);
  const [bonusSelected, setBonusSelected] = useState<number | null>(null);
  const [bonusLoading, setBonusLoading] = useState(false);
  const [bonusRegen, setBonusRegen] = useState(0); // کلید ری‌انیمیشن کارت بونس
  const [elapsed, setElapsed] = useState(0);
  const [timed, setTimed] = useState(0);
  const [, setQTick] = useState(0);
  const [exporting, setExporting] = useState(false);
  const pulses = usePulses(phase === "setup");
  const userName = useUserName();
  const { entries: mistakeEntries, count: mistakeCount, clear: clearMistakes } = useMistakes();
  const mistakeIds = useMemo(() => mistakeEntries.map((e) => e.id), [mistakeEntries]);
  const { ids: practiceIds } = usePracticeIds();
  const { ids: starredQIds, count: starredQCount, has: hasQStar, toggle: toggleQStar } = useQuestionStars();
  const daily = useDailyInfo();
  const weekly = useWeeklyInfo();
  /** مرور ترکیبی: اشتباهات + ستاره‌دارها (بدون تکرار، حداکثر ۸۰ سؤال) */
  const combinedIds = useMemo(
    () => Array.from(new Set([...mistakeIds, ...starredQIds])).slice(0, 80),
    [mistakeIds, starredQIds],
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const deadlineRef = useRef(0);
  const answeredLeftRef = useRef(0);
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // کیت بازی‌ها (G1-10) — ردیاب جلسهٔ تله‌متری؛ هر دور یک نمونهٔ تازه (هنگام شروع دور ساخته می‌شود)
  const sessionRef = useRef<GameSessionTracker | null>(null);

  async function startPracticeRound(ids: string[], nextMode: Mode = "normal") {
    setLoading(true);
    setMode(nextMode);
    try {
      const params = new URLSearchParams({ count: String(Math.max(ids.length, 1)) });
      params.set("ids", ids.join(","));
      params.set("book", String(bookId));
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
      setBonus(null);
      setBonusSelected(null);
      setElapsed(0);
      deadlineRef.current = Date.now() + timed * 1000;
      if (advanceRef.current) clearTimeout(advanceRef.current);
      // کیت بازی‌ها (G1-10) — جلسهٔ تازهٔ تله‌متری برای این دور
      sessionRef.current = createGameSession({ game: GAME_KEY, level: lesson === "all" ? "all" : lesson });
      sessionRef.current.start();
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

  // شمارنده‌های بانک سؤال برای چیپ‌های سطح — با تغییر کتاب دوباره دریافت می‌شود
  useEffect(() => {
    let cancelled = false;
    fetch(`/api/questions?meta=1&book=${bookId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && d && typeof d.total === "number") setPoolMeta(d as PoolMeta);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [bookId]);

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
      params.set("book", String(bookId));
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
      setBonus(null);
      setBonusSelected(null);
      setElapsed(0);
      deadlineRef.current = Date.now() + timed * 1000;
      if (advanceRef.current) clearTimeout(advanceRef.current);
      // کیت بازی‌ها (G1-10) — جلسهٔ تازهٔ تله‌متری برای این دور
      sessionRef.current = createGameSession({ game: GAME_KEY, level: lesson === "all" ? "all" : lesson });
      sessionRef.current.start();
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
      const res = await fetch(`/api/questions?daily=1&count=5&book=${bookId}`);
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
      setBonus(null);
      setBonusSelected(null);
      setElapsed(0);
      deadlineRef.current = 0;
      if (advanceRef.current) clearTimeout(advanceRef.current);
      // کیت بازی‌ها (G1-10) — جلسهٔ تازهٔ تله‌متری برای این دور
      sessionRef.current = createGameSession({ game: GAME_KEY, level: lesson === "all" ? "all" : lesson });
      sessionRef.current.start();
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
      const res = await fetch(`/api/questions?weekly=1&count=10&book=${bookId}`);
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
      setBonus(null);
      setBonusSelected(null);
      setElapsed(0);
      deadlineRef.current = 0;
      if (advanceRef.current) clearTimeout(advanceRef.current);
      // کیت بازی‌ها (G1-10) — جلسهٔ تازهٔ تله‌متری برای این دور
      sessionRef.current = createGameSession({ game: GAME_KEY, level: lesson === "all" ? "all" : lesson });
      sessionRef.current.start();
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
    // کیت بازی‌ها — بازخورد صوتی/لرزشی اتمام وقت (هم‌تراز پاسخ غلط)
    playSound("wrong");
    buzz("error");
    recordMistake(current.id);
    if (current.category === "vocabulary") seedVocabReview(current.options[current.answer]);
    setSelected(-1);
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = -1;
      return next;
    });
    setAiExplanation(null);
    setBonus(null);
    setBonusSelected(null);
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

  /** یکپارچگی آزمون با SRS (فاز ۲): واژهٔ غلط‌زدهٔ واژگانی به صف مرور برمی‌گردد */
  function seedVocabReview(correctOption: string | undefined) {
    if (!correctOption || !bookData) return;
    const exact = bookData.vocab.all.find((v) => v.word === correctOption);
    const loose = exact ?? bookData.vocab.all.find((v) => correctOption.includes(v.word));
    if (loose) seedReviewFromQuiz(loose.word);
  }

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
        // کیت بازی‌ها — بازخورد صوتی/لرزشی پاسخ درست
        playSound("correct");
        buzz("success");
        // در مرور اشتباهات و مرور ترکیبی، پاسخ درست سؤال را از دفتر اشتباهات حذف می‌کند
        if (mode === "review" || mode === "combined") resolveMistake(current.id);
      } else {
        // کیت بازی‌ها — بازخورد صوتی/لرزشی پاسخ غلط
        playSound("wrong");
        buzz("error");
        recordMistake(current.id);
        if (current.category === "vocabulary") seedVocabReview(current.options[current.answer]);
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
          book: {
            id: bookId,
            title: bookData?.info.title ?? "",
            grade: meta?.gradeLabel ?? "",
          },
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

  /** ساخت یک تست مشابه از سؤال جاری با هوش مصنوعی — نمایش به‌صورت کارت بونس */
  async function generateSimilar(fromBonus = false) {
    if (!current || bonusLoading) return;
    // «سؤال مشابه بعدی» از روی سؤالِ مشابهٔ فعلی زنجیر می‌شود (تولید بی‌نهایت)؛
    // دکمهٔ اصلی همیشه از سؤال اصلی منبع می‌گیرد (تکرار همان سؤال → پاسخ کش‌شده).
    const src = fromBonus && bonus ? bonus : current;
    setBonusLoading(true);
    try {
      const res = await fetch("/api/similar-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: src.text,
          options: src.options,
          answer: src.answer,
          category: current.category,
          book: {
            id: bookId,
            title: bookData?.info.title ?? "",
            grade: meta?.gradeLabel ?? "",
          },
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.question) {
        toast.error(data.error ?? "سؤال مشابه ساخته نشد — دوباره تلاش کن");
        return;
      }
      setBonus(data.question as SimilarBonus);
      setBonusSelected(null);
      setBonusRegen((n) => n + 1);
    } catch {
      toast.error("خطا در ارتباط با هوش مصنوعی");
    } finally {
      setBonusLoading(false);
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
    setBonus(null);
    setBonusSelected(null);
    deadlineRef.current = mode === "daily" || mode === "weekly" ? 0 : Date.now() + timed * 1000;
  }

  // میان‌برهای کیبورد حین آزمون: ۱-۴ (فارسی/انگلیسی) انتخاب گزینه، Enter سؤال بعدی
  // الگوی latest-ref: شنونده فقط یک‌بار ثبت می‌شود و همیشه آخرین وضعیت/توابع را می‌بیند
  const kbChooseRef = useRef<(i: number) => void>(() => {});
  const kbNextRef = useRef<() => void>(() => {});
  const kbStateRef = useRef({ playing: false, selected: null as number | null, options: 0 });
  useEffect(() => {
    kbChooseRef.current = chooseOption;
    kbNextRef.current = nextQuestion;
    kbStateRef.current = { playing: phase === "playing", selected, options: current?.options.length ?? 0 };
  });
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      const kb = kbStateRef.current;
      if (!kb.playing) return;
      // وقتی دیالوگ/مودالی باز است میان‌بر فعال نماند
      if (document.querySelector('[role="dialog"], [role="alertdialog"]')) return;
      if (e.key === "Enter" && kb.selected !== null) {
        e.preventDefault();
        kbNextRef.current();
        return;
      }
      if (kb.selected !== null) return;
      const fa = "۱۲۳۴".indexOf(e.key);
      const en = "1234".indexOf(e.key);
      const digit = fa >= 0 ? fa : en;
      if (digit >= 0 && digit < kb.options) {
        e.preventDefault();
        kbChooseRef.current(digit);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // کیت بازی‌ها (G1-10) — دورِ باز در unmount «رهاشده» ثبت می‌شود (اگر قبلاً گزارش شده باشد no-op)
  useEffect(
    () => () => {
      sessionRef.current?.abandon("unmount");
    },
    [],
  );

  function finish() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (advanceRef.current) clearTimeout(advanceRef.current);
    setPhase("result");
    // کیت بازی‌ها (G1-10) — پایان عادی جلسهٔ تله‌متری + بازخورد پایان دور
    sessionRef.current?.end("finish");
    playSound("finish");
    buzz("success");
    recordStudySession();
    const streak = touchStreak();
    awardQuizActivity(correctCount, questions.length); // فاز ۶ — XP/ماموریت/نشان
    if (mode === "daily") recordDailyResult(todayKey(), scorePct, questions.length);
    if (mode === "weekly") recordWeeklyResult(weekKeyOf(), scorePct, questions.length);
    if (mode === "combined") recordCombinedRound();
    const detail = questions.map((q, i) => ({ id: q.id, chosen: answers[i], answer: q.answer }));
    const attemptBody = {
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
      book: bookId,
    };
    fetch("/api/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attemptBody),
    })
      .then((res) => {
        // 5xx مثل خطای شبکه به صف آفلاین می‌رود؛ موفق/4xx (مهمان، اعتبارسنجی) = همان رفتار قبلی
        if (!res.ok && res.status >= 500) throw new Error("server");
        try {
          window.dispatchEvent(new CustomEvent("visionone:attempt-saved"));
        } catch {
          /* noop */
        }
        return toast.success(
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
        );
      })
      .catch(() => {
        // آفلاین/خطای سرور — آزمون در صف می‌ماند و با برگشت اینترنت خودکار ارسال می‌شود
        // (شمارش محلی درست است؛ امتیاز و نتیجه همین‌جا نشان داده می‌شود)
        enqueueOffline({ url: "/api/attempts", method: "POST", body: attemptBody });
        toast("آزمونت ذخیره شد — وقتی اینترنت برگشت ارسال می‌شود 📴→📡");
      });
  }

  /** خروجی CSV از دفتر اشتباهات — فایل UTF-8 با BOM برای اکسل */
  async function exportMistakesCsv() {
    if (!mistakeIds.length || exporting) return;
    setExporting(true);
    try {
      const res = await fetch(`/api/questions?count=${mistakeIds.length}&ids=${mistakeIds.join(",")}&book=${bookId}`);
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
    setBonus(null);
    setBonusSelected(null);
    setElapsed(0);
  }

  // ─────────── Setup — پنل تنظیم (ماژول presentational با props هم‌نام) ───────────
  if (phase === "setup") {
    return (
      <SetupPanel
        lessonOptions={lessonOptions}
        daily={daily}
        weekly={weekly}
        pulses={pulses}
        practiceIds={practiceIds}
        starredQIds={starredQIds}
        starredQCount={starredQCount}
        mistakeCount={mistakeCount}
        combinedIds={combinedIds}
        poolMeta={poolMeta}
        loading={loading}
        exporting={exporting}
        category={category}
        setCategory={setCategory}
        lesson={lesson}
        setLesson={setLesson}
        count={count}
        setCount={setCount}
        level={level}
        setLevel={setLevel}
        timed={timed}
        setTimed={setTimed}
        startDaily={startDaily}
        startWeekly={startWeekly}
        startPracticeRound={startPracticeRound}
        startQuiz={startQuiz}
        exportMistakesCsv={exportMistakesCsv}
        clearMistakes={clearMistakes}
      />
    );
  }

  // ─────────── Result — صفحهٔ نتیجه (ماژول presentational) ───────────
  if (phase === "result") {
    return (
      <ResultView
        questions={questions}
        answers={answers}
        correctCount={correctCount}
        scorePct={scorePct}
        elapsed={elapsed}
        mode={mode}
        level={level}
        timed={timed}
        userName={userName}
        loading={loading}
        hasQStar={hasQStar}
        toggleQStar={toggleQStar}
        reset={reset}
        startQuiz={startQuiz}
      />
    );
  }

  // ─────────── Playing — کارت سؤال (ماژول presentational) ───────────
  if (!current) return null;
  return (
    <QuestionCard
      current={current}
      index={index}
      questions={questions}
      answers={answers}
      selected={selected}
      shownLeft={shownLeft}
      elapsed={elapsed}
      timed={timed}
      mode={mode}
      weekly={weekly}
      correctCount={correctCount}
      aiExplanation={aiExplanation}
      aiExplaining={aiExplaining}
      bonus={bonus}
      bonusLoading={bonusLoading}
      bonusSelected={bonusSelected}
      bonusRegen={bonusRegen}
      setBonus={setBonus}
      setBonusSelected={setBonusSelected}
      hasQStar={hasQStar}
      toggleQStar={toggleQStar}
      chooseOption={chooseOption}
      nextQuestion={nextQuestion}
      askAiExplanation={askAiExplanation}
      generateSimilar={generateSimilar}
    />
  );
}
