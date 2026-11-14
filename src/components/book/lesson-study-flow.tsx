"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  BookOpenText,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  ListChecks,
  Loader2,
  PartyPopper,
  SearchX,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useBook, useBookData } from "@/lib/book-context";
import type { QuizQuestionSeed } from "@/data/types";
import { useLearnedWords } from "@/lib/learned-store";
import { useLessonProgress, markLessonWords, markLessonQuiz } from "@/lib/lesson-progress-store";
import { setReviewLessonIntent } from "@/lib/review-lesson-intent";
import { recordMistake, resolveMistake } from "@/lib/mistakes-store";
import { seedReviewFromQuiz } from "@/lib/srs-store";
import { recordStudySession } from "@/lib/goal-store";
import { touchStreak } from "@/lib/streak-store";
import { awardQuizActivity } from "@/lib/gamification";
import { requestView } from "@/lib/nav-store";
import { SpeakButton } from "./speak-button";
import { ReadingCard } from "./texts-view";

/**
 * «مسیر یادگیری درس‌محور» — گزینهٔ ① سند پیشنهاد آموزش (مصوب مالک ۲۰۲۶-۱۱-۱۴:
 * «همه گزینه‌ها به جز گزینه ۳» — گزینهٔ ③ تصویرسازی AI رد شد ⇒ O2 بدون تغییر).
 *
 * جریان راهنماشدهٔ ۴-گامی برای هر درس (عین §D سند):
 *   ۱. معرفی واژه‌ها   — کارت واژه‌های همان درس + تلفظ (SpeakButton موجود) + علامت‌گذاری
 *                       learned (استور موجود) + شمارش پیشرفت.
 *   ۲. درسنامه         — همان متن درس (readings درس N) با واژه‌های قابل کلیک (پاپ‌آپ موجود).
 *   ۳. تمرین همان درس  — سؤال‌های بانک quiz با lesson درس N + خطاها خودکار به دفتر خطا/SRS
 *                       (الگوی عین quiz-game). درسِ بدون تمرین بانکی = وضعیت صادقانه، هرگز
 *                       «دقت ۰٪» القا نمی‌شود.
 *   ۴. جمع‌بندی        — وضعیت درس (X از Y واژه · دقت تمرین) + CTA «درس بعدی» +
 *                       CTA «مرور فقط همین درس» (گزینهٔ ④).
 *
 * قیود §G سند: صفر تغییر دادهٔ متنی — فقط اتصال افزودنی به استورهای موجود ·
 * localStorage فقط (بدون Prisma/db) · D7/O4/O5/O6 پابرجا · RTL بدون آبی/ایندیگو.
 * ثبت Attempt سروری در پایلوت انجام نمی‌شود (آمار آزمون رسمی دست‌نخورده می‌ماند —
 * در گسترش با رأی مالک) — مصوبهٔ پایلوت در سند تصمیم ثبت شده است.
 */

const fa = (n: number) => n.toLocaleString("fa-IR");
const LETTERS = ["A", "B", "C", "D"];

interface QuizQuestion {
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

const STEP_TITLES = ["واژه‌ها", "درسنامه", "تمرین", "جمع‌بندی"] as const;

export function LessonStudyFlow({
  lesson,
  pilotLessons,
  onLessonChange,
  onClose,
}: {
  lesson: number;
  /** درس‌های مجاز پایلوت (۱ تا ۵) — برای CTA «درس بعدی» */
  pilotLessons: number[];
  onLessonChange: (lesson: number) => void;
  onClose: () => void;
}) {
  const data = useBookData();
  const { bookId } = useBook();
  const { learned, toggle: toggleLearnedWord } = useLearnedWords();
  const progress = useLessonProgress();

  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [quizRequested, setQuizRequested] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const startedAtRef = useRef(0);

  const lessonWords = data.vocab.ofLesson(lesson);
  const lessonReadings = data.readings.filter((r) => r.lesson === lesson);
  const chapter = data.chapters.find((c) => c.id === lesson);
  const entry = progress[String(lesson)];
  const learnedInLesson = lessonWords.filter((w) => learned.has(w.word)).length;

  // دریافت سؤال‌های بانک quiz فقط پس از ورود به گام ۳ — از همان /api/questions
  // (آیدی پایدار = سازگاری دفتر خطا/ستاره/مرور — الگوی عین quiz-game)
  useEffect(() => {
    if (!quizRequested || questions !== null) return;
    let cancelled = false;
    fetch(`/api/questions?lesson=${lesson}&count=50&book=${bookId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled) return;
        const qs = Array.isArray(d?.questions) ? (d.questions as QuizQuestion[]) : [];
        setQuestions(qs);
        setQuizTotal(qs.length);
        startedAtRef.current = Date.now();
      })
      .catch(() => {
        if (!cancelled) setQuestions([]);
      });
    return () => {
      cancelled = true;
    };
  }, [quizRequested, questions, lesson, bookId]);

  /** یکپارچگی با SRS — عین seedVocabReview در quiz-game: واژهٔ غلط‌زدهٔ واژگانی به صف مرور برمی‌گردد */
  function seedVocabReview(correctOption: string | undefined) {
    if (!correctOption) return;
    const exact = data.vocab.all.find((v) => v.word === correctOption);
    const loose = exact ?? data.vocab.all.find((v) => correctOption.includes(v.word));
    if (loose) seedReviewFromQuiz(loose.word);
  }

  function chooseAnswer(idx: number) {
    if (selected !== null) return;
    const q = questions?.[qIndex];
    if (!q) return;
    setSelected(idx);
    if (idx === q.answer) {
      setCorrectCount((c) => c + 1);
      // پاسخ درست سؤال را از دفتر اشتباهات حذف می‌کند (الگوی notebook-view)
      resolveMistake(q.id);
    } else {
      recordMistake(q.id);
      if (q.category === "vocabulary") seedVocabReview(q.options[q.answer]);
    }
  }

  function finishQuiz() {
    markLessonQuiz(lesson, correctCount, quizTotal);
    recordStudySession();
    if (quizTotal > 0) {
      touchStreak();
      awardQuizActivity(correctCount, quizTotal);
    }
    setStep(3);
  }

  function nextQuestion() {
    const qs = questions ?? [];
    if (qIndex + 1 >= qs.length) {
      finishQuiz();
    } else {
      setQIndex((i) => i + 1);
      setSelected(null);
    }
  }

  function goToReview() {
    setReviewLessonIntent(lesson);
    onClose();
    requestView("review");
  }

  function goNextLesson() {
    const idx = pilotLessons.indexOf(lesson);
    const next = pilotLessons[idx + 1];
    if (next === undefined) {
      toast.info("این آخرین درس پایلوت است — گسترش پس از ارزیابی مالک انجام می‌شود.");
      return;
    }
    onLessonChange(next);
  }

  const current = questions?.[qIndex];
  const quizAccuracy = quizTotal > 0 && entry?.total ? Math.round(((entry.correct ?? 0) / entry.total) * 100) : null;

  return (
    <section
      className="rounded-2xl border border-primary/25 bg-card p-4 sm:p-5"
      aria-label={`مسیر یادگیری درس ${lesson}`}
    >
      {/* سربرگ جریان */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="flex items-center gap-2 text-[15px] font-black">
            <GraduationCap size={17} className="shrink-0 text-primary" />
            مسیر یادگیری — {chapter?.number ?? `درس ${fa(lesson)}`}
          </h3>
          <p className="mt-0.5 truncate text-[11.5px] font-bold text-muted-foreground">
            {chapter?.titleFa ?? chapter?.title ?? ""}
          </p>
        </div>
        <Badge variant="secondary" className="shrink-0 text-[10px]">
          پایلوت — درس‌های {fa(pilotLessons[0])} تا {fa(pilotLessons[pilotLessons.length - 1])}
        </Badge>
      </div>

      {/* گام‌ها — نمایشی (جریان فقط رو به جلو است) */}
      <ol className="mt-3 flex items-center gap-1.5" aria-label="گام‌های جریان درس">
        {STEP_TITLES.map((t, i) => (
          <li key={t} className="flex min-w-0 flex-1 items-center gap-1.5">
            <span
              aria-current={step === i ? "step" : undefined}
              className={cn(
                "flex min-h-8 flex-1 items-center justify-center gap-1 rounded-full border px-2 text-[10.5px] font-black transition-colors",
                step === i
                  ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                  : step > i
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border bg-muted/40 text-muted-foreground",
              )}
            >
              {step > i ? <CheckCircle2 size={11} aria-hidden /> : <span aria-hidden>{fa(i + 1)}</span>}
              <span className="truncate">{t}</span>
            </span>
          </li>
        ))}
      </ol>

      {/* ── گام ۱: معرفی واژه‌ها ── */}
      {step === 0 && (
        <div className="mt-4 space-y-3 rise-in">
          {lessonWords.length === 0 ? (
            <p className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4 text-center text-[12px] font-bold leading-6 text-muted-foreground" role="status">
              برای این درس ردیف واژه در بانک واژگان ثبت نشده است — مستقیم به درسنامه برو.
            </p>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="flex items-center gap-1.5 text-[12px] font-bold text-muted-foreground">
                  <Volume2 size={13} className="text-primary" />
                  اول واژه‌ها را بشناس — روی هر کارت می‌توانی تلفظ را بشنوی و «یاد گرفتم» بزنی.
                </p>
                <Badge variant="secondary" className="text-[10.5px]">
                  {fa(learnedInLesson)} از {fa(lessonWords.length)} واژه یاد گرفتم
                </Badge>
              </div>
              <div className="grid max-h-96 gap-2 overflow-y-auto pl-1 sm:grid-cols-2" role="list" aria-label="واژه‌های این درس">
                {lessonWords.map((w) => {
                  const isLearned = learned.has(w.word);
                  return (
                    <div
                      key={w.word}
                      role="listitem"
                      className={cn(
                        // min-w-0 — آیتم گرید باید بتواند زیر عرض min-content جمع شود (رفع سرریز افقی موبایل)
                        "flex min-w-0 items-center gap-2 rounded-xl border bg-muted/30 p-2.5 transition-colors",
                        isLearned && "border-primary/40 bg-primary/5",
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <p dir="ltr" className="font-en truncate text-left text-[14px] font-black text-primary">
                          {w.word}
                        </p>
                        <p className="truncate text-[12px] font-bold text-foreground/85">{w.meaning}</p>
                      </div>
                      {w.pos && (
                        <Badge variant="outline" dir="ltr" className="font-en shrink-0 text-[9.5px]">
                          {w.pos}
                        </Badge>
                      )}
                      <SpeakButton text={w.word} size="md" />
                      <button
                        type="button"
                        onClick={() => toggleLearnedWord(w.word)}
                        aria-pressed={isLearned}
                        aria-label={isLearned ? `حذف علامت یاد گرفتم برای ${w.word}` : `علامت یاد گرفتم برای ${w.word}`}
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all active:scale-90",
                          isLearned
                            ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                            : "border border-primary/40 text-primary hover:bg-primary/10",
                        )}
                      >
                        <CheckCircle2 size={15} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          <Button
            size="lg"
            className="h-12 w-full gap-2 text-[14px]"
            onClick={() => {
              markLessonWords(lesson);
              setStep(1);
            }}
          >
            <BookOpenText size={17} />
            برو به درسنامه
            <ArrowLeft size={16} />
          </Button>
        </div>
      )}

      {/* ── گام ۲: درسنامه ── */}
      {step === 1 && (
        <div className="mt-4 space-y-3 rise-in">
          <p className="flex items-center gap-1.5 text-[12px] font-bold text-muted-foreground">
            <BookOpenText size={13} className="text-primary" />
            متن درس با واژه‌های قابل کلیک — روی هر واژه بزن تا معنی و مثال‌هایش را ببینی.
          </p>
          {lessonReadings.length > 0 ? (
            lessonReadings.map((r) => <ReadingCard key={r.id} reading={r} showFa />)
          ) : (
            <p className="rounded-xl border bg-muted/40 p-4 text-center text-[12px] font-bold text-muted-foreground">
              برای این درس متن درسنامه ثبت نشده است.
            </p>
          )}
          <Button
            size="lg"
            className="h-12 w-full gap-2 text-[14px]"
            onClick={() => {
              setQuizRequested(true);
              setStep(2);
            }}
          >
            <ClipboardList size={17} />
            برو به تمرین همین درس
            <ArrowLeft size={16} />
          </Button>
        </div>
      )}

      {/* ── گام ۳: تمرین همان درس ── */}
      {step === 2 && (
        <div className="mt-4 space-y-3 rise-in">
          {questions === null && (
            <div className="flex flex-col items-center gap-3 rounded-2xl border bg-muted/30 p-8" role="status" aria-live="polite">
              <Loader2 size={22} className="animate-spin text-primary" aria-hidden />
              <p className="text-[12.5px] font-bold text-muted-foreground">در حال آماده‌سازی تمرین درس…</p>
            </div>
          )}
          {questions !== null && questions.length === 0 && (
            <div className="space-y-3 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-5 text-center">
              <SearchX size={22} className="mx-auto text-muted-foreground" aria-hidden />
              <p className="text-[12.5px] font-bold leading-6 text-foreground/85">
                برای این درس تمرین چهارگزینه‌ای در بانک سؤال ثبت نشده است.
              </p>
              <p className="text-[11px] leading-5 text-muted-foreground">
                این وضعیت صادقانهٔ دادهٔ کتاب است — تمرین‌های چاپی این درس به بانک MCQ تبدیل نشده‌اند.
              </p>
              <Button className="h-11 w-full gap-2" onClick={finishQuiz}>
                <ListChecks size={16} />
                ثبت و ادامه به جمع‌بندی
              </Button>
            </div>
          )}
          {questions !== null && questions.length > 0 && current && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Progress value={((qIndex + 1) / questions.length) * 100} className="h-2 flex-1" />
                <span className="shrink-0 text-[12px] font-bold text-muted-foreground">
                  {fa(qIndex + 1)} / {fa(questions.length)}
                </span>
                <Badge className="shrink-0 gap-1 border-emerald-500/40 bg-emerald-500/12 text-[11px] text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 size={11} />
                  درست {fa(correctCount)}
                </Badge>
              </div>
              <div className="rounded-2xl border bg-card p-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="secondary" className="text-[10px]">{current.scope}</Badge>
                  <SpeakButton text={current.text.replace("________", "")} size="md" label="روخوانی سؤال" />
                </div>
                <p dir="ltr" className="font-en mt-3 whitespace-pre-wrap text-left text-[15px] font-bold leading-7 text-foreground">
                  {current.text}
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2" role="group" aria-label="گزینه‌ها">
                  {current.options.map((opt, i) => {
                    const isCorrect = i === current.answer;
                    const isChosen = selected === i;
                    return (
                      <button
                        key={i}
                        type="button"
                        disabled={selected !== null}
                        onClick={() => chooseAnswer(i)}
                        aria-label={`گزینه ${LETTERS[i]}`}
                        className={cn(
                          "flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-right transition-all",
                          selected === null && "hover:border-primary/50 hover:bg-primary/5 active:scale-[0.99]",
                          selected !== null && isCorrect && "border-emerald-500/60 bg-emerald-500/10",
                          selected !== null && isChosen && !isCorrect && "border-destructive/60 bg-destructive/10",
                          selected !== null && !isChosen && !isCorrect && "opacity-55",
                          selected === null && "border-border",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-black",
                            selected !== null && isCorrect
                              ? "bg-emerald-500 text-white"
                              : selected !== null && isChosen
                                ? "bg-destructive text-white"
                                : "bg-muted text-foreground/70",
                          )}
                          aria-hidden
                        >
                          {LETTERS[i]}
                        </span>
                        <span dir="ltr" className="font-en min-w-0 flex-1 text-left text-[13.5px] font-bold leading-6">
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {selected !== null && (
                  <div className="mt-3 space-y-2 rise-in">
                    {selected === current.answer ? (
                      <p className="flex items-center gap-1.5 text-[12px] font-black text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 size={14} />
                        درست بود! آفرین.
                      </p>
                    ) : (
                      <p className="text-[12px] font-black text-destructive">
                        پاسخ درست: <span dir="ltr" className="font-en">{LETTERS[current.answer]}. {current.options[current.answer]}</span>
                      </p>
                    )}
                    {current.explanation && (
                      <p className="rounded-xl bg-muted/60 p-3 text-[11.5px] leading-6 text-muted-foreground">
                        {current.explanation}
                      </p>
                    )}
                    <Button className="h-11 w-full gap-2" onClick={nextQuestion}>
                      {qIndex + 1 >= questions.length ? "دیدن جمع‌بندی" : "سؤال بعدی"}
                      <ArrowLeft size={15} />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── گام ۴: جمع‌بندی ── */}
      {step === 3 && (
        <div className="mt-4 space-y-3 rise-in">
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-primary/30 bg-primary/5 p-5 text-center">
            <PartyPopper size={26} className="text-primary" aria-hidden />
            <p className="text-[15px] font-black">
              درس {fa(lesson)} {entry?.words && entry?.quizDone ? "تکمیل شد" : "ثبت شد"}!
            </p>
            <p className="text-[11.5px] text-muted-foreground">
              {entry?.words && entry?.quizDone
                ? "وضعیت این درس در نقشهٔ پیشرفت کتاب سبز شد."
                : "پیشرفت این درس در نقشهٔ کتاب ثبت شد — ادامهٔ جریان، درس را تکمیل می‌کند."}
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl border bg-muted/30 p-3.5 text-center" role="status">
              <p className="text-xl font-black text-primary">{fa(learnedInLesson)} از {fa(lessonWords.length)}</p>
              <p className="mt-0.5 text-[11px] font-bold text-muted-foreground">واژه‌های علامت‌خوردهٔ درس</p>
            </div>
            <div className="rounded-xl border bg-muted/30 p-3.5 text-center" role="status">
              {quizAccuracy !== null ? (
                <>
                  <p className="text-xl font-black text-amber-600 dark:text-amber-400">{fa(quizAccuracy)}٪</p>
                  <p className="mt-0.5 text-[11px] font-bold text-muted-foreground">
                    دقت تمرین — {fa(entry?.correct ?? 0)} از {fa(entry?.total ?? 0)}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xl font-black text-muted-foreground">—</p>
                  <p className="mt-0.5 text-[11px] font-bold text-muted-foreground">تمرین بانکی برای این درس ثبت نشده</p>
                </>
              )}
            </div>
          </div>
          {learnedInLesson < lessonWords.length && (
            <p className="rounded-xl border border-amber-500/30 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
              {fa(lessonWords.length - learnedInLesson)} واژه هنوز «یاد گرفتم» نشده — می‌توانی گام واژه‌ها را دوباره مرور کنی یا به مرور SRS بسپاری.
            </p>
          )}
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button size="lg" className="h-12 flex-1 gap-2 text-[14px]" onClick={goNextLesson}>
              درس بعدی
              <ArrowLeft size={16} />
            </Button>
            <Button size="lg" variant="outline" className="h-12 flex-1 gap-2 text-[13.5px]" onClick={goToReview}>
              <ListChecks size={16} />
              مرور فقط همین درس (SRS)
            </Button>
          </div>
          <Button variant="ghost" className="h-10 w-full text-[12px]" onClick={onClose}>
            بستن مسیر یادگیری
          </Button>
        </div>
      )}
    </section>
  );
}

/** تشخیص دارد درس تمرین بانکی دارد؟ (برای وضعیت صادقانهٔ نقشهٔ پیشرفت) — دادهٔ محلی seed */
export function lessonHasBankQuiz(seed: QuizQuestionSeed[], lesson: number): boolean {
  return seed.some((q) => q.lesson === lesson);
}
