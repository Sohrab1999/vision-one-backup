"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  BookOpenText,
  CheckCircle2,
  ClipboardList,
  Compass,
  Lightbulb,
  Link2,
  ListChecks,
  Loader2,
  MessagesSquare,
  PartyPopper,
  PenLine,
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
import {
  useLessonProgress,
  markLessonWords,
  markLessonQuiz,
  markLessonStage,
  recordLessonWordStates,
  lessonCompletionOf,
  LESSON_STAGES,
} from "@/lib/lesson-progress-store";
import { setReviewLessonIntent } from "@/lib/review-lesson-intent";
import { recordMistake, resolveMistake } from "@/lib/mistakes-store";
import { gradeSrs, seedReviewFromQuiz, useSRSData } from "@/lib/srs-store";
import { boxFromState } from "@/lib/srs-engine";
import { recordStudySession } from "@/lib/goal-store";
import { touchStreak } from "@/lib/streak-store";
import { awardQuizActivity } from "@/lib/gamification";
import { requestView } from "@/lib/nav-store";
import { lookupSentencesInActiveBook, hasValidFa } from "@/lib/word-in-context";
import { lookupCrossBook } from "@/lib/cross-book-vocab";
import type { CrossBookHit } from "@/lib/cross-book-vocab";
import {
  buildLessonExercises,
  splitExercises,
  SENTENCE_MINING_CAP,
  type ExerciseSentence,
} from "@/lib/viu-exercise-engine";
import { LessonExerciseRunner } from "./lesson-exercise-runner";
import { SpeakButton } from "./speak-button";
import { ReadingCard } from "./texts-view";
import { ChevronDown, ChevronUp } from "lucide-react";

/**
 * «مسیر یادگیری درس‌محور» — الگوی آموزشی مشترک سه‌کتابی (مأموریت مالک
 * `VIU-LEARNING-EXPERIENCE-UPGRADE-01` — ارتقای پایلوت مصوب ①②④۵ به ساختار ۶-مرحله‌ای
 * Discover/Learn/Understand-in-Context/Practice/Use/Review — بند ۴-الف مأموریت:
 * «ساختار هدف طراحی است؛ لزوماً هر مرحله یک صفحهٔ جداگانه نیست»).
 *
 *   ۰. آشنایی (Discover)        — موضوع درس، نقل قول کتاب، موجودی واقعی محتوا.
 *   ۱. واژه‌ها (Learn)           — کارت غنی واژه (معنی/تلفظ/IPA و تعریف EN فقط از منبع
 *                                  tracked بین‌کتابی/جمله‌های واقعی درس/هم‌آیندها/فعل بی‌قاعده).
 *   ۲. در بافت (Context)        — متن درس با واژه‌های قابل کلیک (پاپ‌آپ موجود).
 *   ۳. تمرین (Practice)         — تمرین‌های داده‌محور موتور (تطبیق/معنی در بافت/جای خالی/
 *                                  تکمیل جمله) + آزمون بانکی کتاب (عین قبلی).
 *   ۴. کاربرد (Use)             — ساخت جمله از قطعه‌های واقعی + یادآوری فعال با خودارزیابی
 *                                  سه‌درجه‌ای متصل به SRS (gradeSrs — عین فلش‌کارت).
 *   ۵. مرور (Review)            — جمع‌بندی + جدول وضعیت یادگیری واژه‌ها + CTA مرور درس‌پایه.
 *
 * قیود پابرجا: صفر تغییر دادهٔ متنی · صفر Prisma/db (localStorage فقط) · D7/O4/O5/O6 پابرجا
 * · صفر تصویر (پایلوت تصاویر با رأی مالک رد شد) · RTL بدون آبی/ایندیگو · ثبت Attempt سروری
 * انجام نمی‌شود (آمار آزمون رسمی دست‌نخورده — مصوبهٔ پایلوت).
 * صداقت داده: درسِ بی‌محتوا هرگز «تکمیل» نمی‌شود؛ بخش‌های بی‌داده وضعیت صادقانه دارند.
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

const STAGE_TITLES = ["آشنایی", "واژه‌ها", "در بافت", "تمرین", "کاربرد", "مرور"] as const;
const STAGE_ICONS = [Lightbulb, BookOpenText, MessagesSquare, ClipboardList, PenLine, PartyPopper];

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
  const srs = useSRSData();

  const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [sentences, setSentences] = useState<ExerciseSentence[] | null>(null);
  const [sentencesDegraded, setSentencesDegraded] = useState(false);

  // تمرین داده‌محور (موتور)
  const [engineCorrect, setEngineCorrect] = useState(0);
  const [engineTotal, setEngineTotal] = useState(0);
  const [practiceDone, setPracticeDone] = useState(false);
  const [useDone, setUseDone] = useState(false);
  const correctWordsRef = useRef<Set<string>>(new Set());
  const usedWordsRef = useRef<Set<string>>(new Set());

  // آزمون بانکی کتاب — عین پیاده‌سازی قبلی
  const [quizRequested, setQuizRequested] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const startedAtRef = useRef(0);

  // کارت واژهٔ غنی
  const [expandedWord, setExpandedWord] = useState<string | null>(null);
  const [wordDictInfo, setWordDictInfo] = useState<Record<string, CrossBookHit | null>>({});
  const seenMarkedRef = useRef(false);
  const reviewMarkedRef = useRef(false);

  const lessonWords = useMemo(() => data.vocab.ofLesson(lesson), [data, lesson]);
  const lessonReadings = useMemo(() => data.readings.filter((r) => r.lesson === lesson), [data, lesson]);
  const chapter = data.chapters.find((c) => c.id === lesson);
  const entry = progress[String(lesson)];
  const learnedInLesson = lessonWords.filter((w) => learned.has(w.word)).length;
  const hasVocab = lessonWords.length > 0;
  const hasReadings = lessonReadings.length > 0;
  const hasBank = data.quiz.seed.some((q) => q.lesson === lesson);
  const contentless = !hasVocab && !hasReadings && !hasBank;
  const completion = lessonCompletionOf(entry, { hasVocab });

  // معدن‌کاری جمله‌های بافت واقعی درس (word-in-context — عین متن کتاب با گیت D7)
  useEffect(() => {
    if (sentences !== null || !bookId) return;
    let cancelled = false;
    (async () => {
      const words = data.vocab
        .ofLesson(lesson)
        .slice(0, SENTENCE_MINING_CAP)
        .map((w) => w.word);
      const results = await Promise.all(
        words.map((w) =>
          lookupSentencesInActiveBook(bookId, w).catch(() => ({
            sentences: [],
            degraded: true,
          })),
        ),
      );
      if (cancelled) return;
      const list: ExerciseSentence[] = [];
      let degraded = false;
      results.forEach((r, i) => {
        const word = words[i];
        if (!word) return;
        if (r.degraded) degraded = true;
        for (const s of r.sentences) {
          if (!hasValidFa(s.fa)) continue;
          list.push({ word, en: s.en, fa: s.fa, spanStart: s.spanStart, spanEnd: s.spanEnd });
        }
      });
      setSentences(list);
      setSentencesDegraded(degraded && list.length === 0);
    })();
    return () => {
      cancelled = true;
    };
  }, [sentences, data, lesson, bookId]);

  // موتور تمرین — فقط با دادهٔ واقعی؛ قطعی با بذر درس
  const engine = useMemo(() => {
    if (sentences === null) return null;
    return buildLessonExercises({ lesson, words: lessonWords, sentences, seed: lesson });
  }, [sentences, lessonWords, lesson]);
  const { practice: practiceItems, use: useItems } = useMemo(
    () => (engine ? splitExercises(engine) : { practice: [], use: [] }),
    [engine],
  );
  const hasPracticeContent = practiceItems.length > 0 || hasBank;
  const hasUseContent = useItems.length > 0;
  /** بخش تمرین داده‌محور تمام شده (یا اصلاً آیتمی نداشته) — مشتق‌شده، بدون setState در effect */
  const practiceFinished = practiceDone || (engine !== null && practiceItems.length === 0);

  // ثبت «مشاهدهٔ واژه‌ها» یک‌بار به‌ازای هر درس — وضعیت یادگیری (بند ۴-د مأموریت)
  useEffect(() => {
    if (stage !== 1 || seenMarkedRef.current || lessonWords.length === 0) return;
    seenMarkedRef.current = true;
    recordLessonWordStates(lesson, { seen: lessonWords.map((w) => w.word) });
  }, [stage, lesson, lessonWords]);

  // ثبت مرحلهٔ مرور هنگام ورود به جمع‌بندی
  useEffect(() => {
    if (stage !== 5 || reviewMarkedRef.current) return;
    reviewMarkedRef.current = true;
    markLessonStage(lesson, "review");
  }, [stage, lesson]);

  // دریافت سؤال‌های بانک quiz — از همان /api/questions
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

  /** پایان تمرین (بانکی + داده‌محور) — آمار ترکیبی صادقانه */
  function finishPractice() {
    const total = engineTotal + quizTotal;
    const correct = engineCorrect + correctCount;
    markLessonQuiz(lesson, correct, total);
    markLessonStage(lesson, "practice");
    if (correctWordsRef.current.size > 0) {
      recordLessonWordStates(lesson, { correct: [...correctWordsRef.current] });
    }
    recordStudySession();
    if (total > 0) {
      touchStreak();
      awardQuizActivity(correct, total);
    }
    setStage(4);
  }

  /** نتیجهٔ تمرین داده‌محور از runner */
  function onPracticeResult(kind: string, word: string | undefined, correct: boolean) {
    setEngineTotal((t) => t + 1);
    if (correct) {
      setEngineCorrect((c) => c + 1);
      if (word && kind !== "active-recall") correctWordsRef.current.add(word);
    }
  }

  /** نتیجهٔ کاربرد (مرحلهٔ ۴) — فقط ساخت جملهٔ درست = «به‌کار‌رفته در جمله» */
  function onUseResult(kind: string, word: string | undefined, correct: boolean) {
    if (correct && word && kind === "sentence-construction") usedWordsRef.current.add(word);
  }

  function onUseGrade(word: string, grade: 0 | 1 | 2) {
    gradeSrs(word, grade);
  }

  function finishUse() {
    markLessonStage(lesson, "use");
    if (usedWordsRef.current.size > 0) {
      recordLessonWordStates(lesson, { used: [...usedWordsRef.current] });
    }
    setStage(5);
  }

  function nextQuestion() {
    const qs = questions ?? [];
    if (qIndex + 1 >= qs.length) {
      finishPractice();
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

  /** اطلاعات بین‌کتابی معتبر برای کارت واژهٔ غنی — فقط منبع tracked (دیکشنری کتاب‌های دیگر) */
  async function expandWord(word: string) {
    const next = expandedWord === word ? null : word;
    setExpandedWord(next);
    if (!next || !bookId || wordDictInfo[word] !== undefined) return;
    try {
      const hits = await lookupCrossBook(bookId, word);
      const dictHit = hits.find((h) => h.kind === "dict" && (h.phonetic || h.definition)) ?? null;
      setWordDictInfo((m) => ({ ...m, [word]: dictHit }));
    } catch {
      setWordDictInfo((m) => ({ ...m, [word]: null }));
    }
  }

  const wordSentences = useMemo(() => {
    if (!expandedWord || sentences === null) return [];
    return sentences.filter((s) => s.word === expandedWord).slice(0, 2);
  }, [expandedWord, sentences]);

  /** هم‌آیندها — فقط مدخل‌های چندواژه‌ای واقعی همان کتاب که این واژه را دارند */
  const wordCollocations = useMemo(() => {
    if (!expandedWord) return [];
    const norm = expandedWord.toLowerCase();
    return data.vocab.all
      .filter((v) => v.word.includes(" ") && v.word.toLowerCase().includes(norm) && v.word.toLowerCase() !== norm)
      .slice(0, 4);
  }, [expandedWord, data.vocab.all]);

  const wordVerbForm = useMemo(() => {
    if (!expandedWord) return null;
    return data.verbs.find((v) => v.base === expandedWord) ?? null;
  }, [expandedWord, data.verbs]);

  const current = questions?.[qIndex];
  const combinedTotal = engineTotal + quizTotal;
  const combinedCorrect = engineCorrect + correctCount;
  const bankAnswered = questions === null ? 0 : qIndex + (selected !== null ? 1 : 0);
  const practiceProgress =
    combinedTotal > 0 ? ((engineTotal + bankAnswered) / combinedTotal) * 100 : 0;
  const combinedAccuracy =
    entry?.total && entry.total > 0 ? Math.round(((entry.correct ?? 0) / entry.total) * 100) : null;

  // شمارش‌های وضعیت یادگیری واژه (بند ۴-د مأموریت — همه از استورهای موجود، بدون سیستم موازی)
  const stateCounts = useMemo(() => {
    const inSrs = lessonWords.filter((w) => (srs[w.word]?.reps ?? 0) > 0).length;
    const mastered = lessonWords.filter((w) => boxFromState(srs[w.word]) >= 4).length;
    return {
      seen: entry?.seen?.length ?? 0,
      learned: learnedInLesson,
      correct: entry?.correctWords?.length ?? 0,
      srs: inSrs,
      used: entry?.usedWords?.length ?? 0,
      mastered,
    };
  }, [entry, lessonWords, srs, learnedInLesson]);

  const stageContentless: Record<number, boolean> = {
    1: !hasVocab,
    2: !hasReadings,
    3: !hasPracticeContent,
    4: !hasUseContent,
  };

  return (
    <section
      className="rounded-2xl border border-primary/25 bg-card p-4 sm:p-5"
      aria-label={`مسیر یادگیری درس ${lesson}`}
    >
      {/* سربرگ جریان */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="flex items-center gap-2 text-[15px] font-black">
            <Compass size={17} className="shrink-0 text-primary" />
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

      {/* مراحل — نمایشی (جریان فقط رو به جلو است) */}
      <ol className="mt-3 flex items-center gap-1" aria-label="مراحل جریان درس">
        {STAGE_TITLES.map((t, i) => {
          const Icon = STAGE_ICONS[i];
          return (
            <li key={t} className="flex min-w-0 flex-1 flex-col items-center gap-1">
              <span
                aria-current={stage === i ? "step" : undefined}
                title={t}
                className={cn(
                  "flex min-h-9 w-full items-center justify-center gap-1 rounded-full border px-1.5 text-[10px] font-black transition-colors",
                  stage === i
                    ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                    : stage > i
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border bg-muted/40 text-muted-foreground",
                )}
              >
                {stage > i ? <CheckCircle2 size={10} aria-hidden /> : <Icon size={11} aria-hidden className="shrink-0" />}
                <span className="hidden truncate sm:inline">{t}</span>
                <span className="sm:hidden" aria-hidden>
                  {fa(i + 1)}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      {/* ── درسِ بی‌محتوا — وضعیت صادقانه، هرگز تکمیل نمی‌شود ── */}
      {contentless ? (
        <div className="mt-4 space-y-3 rounded-2xl border border-dashed border-amber-500/40 bg-amber-500/8 p-5 text-center">
          <SearchX size={22} className="mx-auto text-amber-600 dark:text-amber-400" aria-hidden />
          <p className="text-[13px] font-black leading-6">
            این درس در اسکن کتاب محتوای آموزشی ندارد.
          </p>
          <p className="text-[11.5px] leading-6 text-muted-foreground">
            نه واژه‌ای در بانک واژگان دارد، نه متن درس و نه تمرین بانکی — به‌جای نمایش ناقص،
            صادقانه «بدون محتوا» ثبت می‌شود (هیچ محتوایی از نسخهٔ دیگر بازسازی نشده است).
          </p>
          <Button variant="outline" className="h-10 w-full text-[12.5px]" onClick={onClose}>
            بستن مسیر یادگیری
          </Button>
        </div>
      ) : (
        <>
          {/* ── مرحلهٔ ۰: آشنایی (Discover) ── */}
          {stage === 0 && (
            <div className="mt-4 space-y-3 rise-in">
              <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4">
                <p className="flex items-center gap-1.5 text-[12px] font-black text-muted-foreground">
                  <Lightbulb size={13} className="text-primary" />
                  موضوع این درس
                </p>
                <p className="mt-1 text-[15px] font-black">{chapter?.titleFa ?? chapter?.title ?? `درس ${fa(lesson)}`}</p>
                {chapter?.quote && (
                  <div className="mt-2.5 rounded-xl border bg-card p-3">
                    <p dir="ltr" className="font-en text-left text-[13px] font-bold leading-6 text-foreground/85">
                      «{chapter.quote.en}»
                    </p>
                    <p className="mt-1 text-[11.5px] leading-6 text-muted-foreground">{chapter.quote.fa}</p>
                    <p className="mt-1 text-[10px] font-bold text-muted-foreground/70">
                      نقل قول عین کتاب — {chapter.quote.source}
                    </p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl border bg-muted/30 p-3 text-center" role="status">
                  <p className="text-lg font-black text-primary">{fa(lessonWords.length)}</p>
                  <p className="mt-0.5 text-[10px] font-bold text-muted-foreground">واژهٔ درس</p>
                </div>
                <div className="rounded-xl border bg-muted/30 p-3 text-center" role="status">
                  <p className="text-lg font-black text-amber-600 dark:text-amber-400">{fa(lessonReadings.length)}</p>
                  <p className="mt-0.5 text-[10px] font-bold text-muted-foreground">متن درس</p>
                </div>
                <div className="rounded-xl border bg-muted/30 p-3 text-center" role="status">
                  <p className="text-lg font-black">{hasBank ? fa(data.quiz.seed.filter((q) => q.lesson === lesson).length) : "—"}</p>
                  <p className="mt-0.5 text-[10px] font-bold text-muted-foreground">
                    {hasBank ? "سؤال بانکی" : "بدون سؤال بانکی"}
                  </p>
                </div>
              </div>
              <Button
                size="lg"
                className="h-12 w-full gap-2 text-[14px]"
                onClick={() => {
                  markLessonStage(lesson, "discover");
                  setStage(1);
                }}
              >
                شروع یادگیری
                <ArrowLeft size={16} />
              </Button>
            </div>
          )}

          {/* ── مرحلهٔ ۱: واژه‌ها (Learn) — کارت غنی ── */}
          {stage === 1 && (
            <div className="mt-4 space-y-3 rise-in">
              {lessonWords.length === 0 ? (
                <p className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4 text-center text-[12px] font-bold leading-6 text-muted-foreground" role="status">
                  برای این درس ردیف واژه در بانک واژگان ثبت نشده است — مستقیم به در بافت برو.
                </p>
              ) : (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="flex items-center gap-1.5 text-[12px] font-bold text-muted-foreground">
                      <Volume2 size={13} className="text-primary" />
                      روی هر کارت می‌توانی تلفظ را بشنوی، «یاد گرفتم» بزنی و با فلش، جزئیات غنی را باز کنی.
                    </p>
                    <Badge variant="secondary" className="text-[10.5px]">
                      {fa(learnedInLesson)} از {fa(lessonWords.length)} واژه یاد گرفتم
                    </Badge>
                  </div>
                  <div className="grid max-h-96 gap-2 overflow-y-auto pl-1 sm:grid-cols-2" role="list" aria-label="واژه‌های این درس">
                    {lessonWords.map((w) => {
                      const isLearned = learned.has(w.word);
                      const isOpen = expandedWord === w.word;
                      const dictInfo = wordDictInfo[w.word];
                      return (
                        <div
                          key={w.word}
                          role="listitem"
                          className={cn(
                            // min-w-0 — آیتم گرید باید بتواند زیر عرض min-content جمع شود (رفع سرریز افقی موبایل)
                            "min-w-0 rounded-xl border bg-muted/30 transition-colors",
                            isLearned && "border-primary/40 bg-primary/5",
                          )}
                        >
                          <div className="flex items-center gap-2 p-2.5">
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
                            <button
                              type="button"
                              onClick={() => expandWord(w.word)}
                              aria-expanded={isOpen}
                              aria-label={isOpen ? `بستن جزئیات ${w.word}` : `جزئیات غنی ${w.word}`}
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary/40 hover:text-primary active:scale-90"
                            >
                              {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                            </button>
                          </div>
                          {isOpen && (
                            <div className="space-y-2.5 border-t px-3 pb-3 pt-2.5 rise-in">
                              {/* IPA و تعریف EN — فقط از منبع tracked بین‌کتابی؛ نبود = بدون ادعا */}
                              {dictInfo === undefined ? (
                                <p className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground" role="status">
                                  <Loader2 size={12} className="animate-spin" />
                                  جست‌وجوی منابع واژه‌نامه‌ای…
                                </p>
                              ) : dictInfo ? (
                                <div className="space-y-1.5 rounded-xl border bg-card p-2.5">
                                  {dictInfo.phonetic && (
                                    <p dir="ltr" className="font-en text-left text-[12.5px] font-bold text-foreground/85">
                                      /{dictInfo.phonetic.replace(/^\/|\/$/g, "")}/
                                    </p>
                                  )}
                                  {dictInfo.definition && (
                                    <p dir="ltr" className="font-en text-left text-[12px] leading-5 text-muted-foreground">
                                      {dictInfo.definition}
                                    </p>
                                  )}
                                  <p className="text-[10px] font-bold text-muted-foreground/70">
                                    منبع: {dictInfo.bookTitle} (دیکشنری tracked همین برنامه)
                                  </p>
                                </div>
                              ) : (
                                <p className="text-[10.5px] font-bold text-muted-foreground/70">
                                  IPA و تعریف انگلیسی در منابع tracked یافت نشد — بدون ادعا.
                                </p>
                              )}
                              {/* جمله‌های واقعی درس */}
                              {wordSentences.length > 0 && (
                                <div className="space-y-1.5">
                                  <p className="flex items-center gap-1 text-[10.5px] font-black text-primary">
                                    <MessagesSquare size={11} />
                                    جمله‌های واقعی این درس
                                  </p>
                                  {wordSentences.map((s, i) => (
                                    <div key={i} className="rounded-xl border bg-card p-2.5">
                                      <p dir="ltr" className="font-en text-left text-[12.5px] font-bold leading-6">
                                        {s.en.slice(0, s.spanStart)}
                                        <span className="rounded bg-primary/15 px-1 font-black text-primary">{s.en.slice(s.spanStart, s.spanEnd)}</span>
                                        {s.en.slice(s.spanEnd)}
                                      </p>
                                      <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{s.fa}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {/* هم‌آیندها — فقط مدخل واقعی چندواژه‌ای */}
                              {wordCollocations.length > 0 && (
                                <div className="space-y-1.5">
                                  <p className="flex items-center gap-1 text-[10.5px] font-black text-primary">
                                    <Link2 size={11} />
                                    ترکیب‌های واقعی کتاب با این واژه
                                  </p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {wordCollocations.map((c) => (
                                      <span
                                        key={c.word}
                                        dir="ltr"
                                        className="font-en rounded-full border bg-muted/40 px-2 py-0.5 text-[11px] font-bold"
                                        title={c.meaning}
                                      >
                                        {c.word}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {/* شکل‌های فعل بی‌قاعده — فقط از جدول واقعی کتاب */}
                              {wordVerbForm && (
                                <div className="space-y-1">
                                  <p className="text-[10.5px] font-black text-primary">شکل‌های فعل بی‌قاعده</p>
                                  <p dir="ltr" className="font-en text-left text-[12px] font-bold text-foreground/85">
                                    {wordVerbForm.base} — {wordVerbForm.past} — {wordVerbForm.participle}
                                  </p>
                                  <p className="text-[11px] text-muted-foreground">{wordVerbForm.meaning}</p>
                                </div>
                              )}
                            </div>
                          )}
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
                  if (hasVocab) markLessonWords(lesson);
                  markLessonStage(lesson, "learn");
                  setStage(2);
                }}
              >
                <MessagesSquare size={17} />
                برو به در بافت
                <ArrowLeft size={16} />
              </Button>
            </div>
          )}

          {/* ── مرحلهٔ ۲: در بافت (Understand in Context) ── */}
          {stage === 2 && (
            <div className="mt-4 space-y-3 rise-in">
              <p className="flex items-center gap-1.5 text-[12px] font-bold text-muted-foreground">
                <MessagesSquare size={13} className="text-primary" />
                متن درس با واژه‌های قابل کلیک — روی هر واژه بزن تا معنی، مثال‌های درس و واژه‌های هم‌درس را ببینی.
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
                  markLessonStage(lesson, "context");
                  if (hasBank) setQuizRequested(true);
                  setStage(3);
                }}
              >
                <ClipboardList size={17} />
                برو به تمرین همین درس
                <ArrowLeft size={16} />
              </Button>
            </div>
          )}

          {/* ── مرحلهٔ ۳: تمرین (Practice) — موتور داده‌محور + بانک کتاب ── */}
          {stage === 3 && (
            <div className="mt-4 space-y-3 rise-in">
              {!hasPracticeContent ? (
                <div className="space-y-3 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-5 text-center">
                  <SearchX size={22} className="mx-auto text-muted-foreground" aria-hidden />
                  <p className="text-[12.5px] font-bold leading-6 text-foreground/85">
                    برای این درس هیچ دادهٔ تمرینی ثبت نشده است.
                  </p>
                  <p className="text-[11px] leading-5 text-muted-foreground">
                    نه تمرین بانکی دارد و نه دادهٔ کافی برای تمرین‌های داده‌محور — وضعیت صادقانهٔ دادهٔ کتاب.
                  </p>
                  <Button className="h-11 w-full gap-2" onClick={finishPractice}>
                    <ListChecks size={16} />
                    ثبت و ادامه به کاربرد
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <Progress value={Math.min(100, practiceProgress)} className="h-2 flex-1" />
                    <span className="shrink-0 text-[12px] font-bold text-muted-foreground">
                      درست {fa(combinedCorrect)} از {fa(combinedTotal || 0)}
                    </span>
                  </div>

                  {/* بخش ۱ — تمرین‌های داده‌محور موتور */}
                  {sentences === null && practiceItems.length === 0 && hasBank && (
                    <div className="flex flex-col items-center gap-3 rounded-2xl border bg-muted/30 p-8" role="status" aria-live="polite">
                      <Loader2 size={22} className="animate-spin text-primary" aria-hidden />
                      <p className="text-[12.5px] font-bold text-muted-foreground">در حال آماده‌سازی تمرین درس…</p>
                    </div>
                  )}
                  {engine && practiceItems.length > 0 && !practiceDone && (
                    <LessonExerciseRunner
                      items={practiceItems}
                      onResult={onPracticeResult}
                      onComplete={() => setPracticeDone(true)}
                    />
                  )}
                  {engine && practiceItems.length > 0 && practiceFinished && (
                    <p className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-[12px] font-black text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 size={14} />
                      تمرین‌های داده‌محور تمام شد — {fa(engineCorrect)} درست از {fa(engineTotal)}.
                    </p>
                  )}
                  {engine && practiceItems.length === 0 && !hasBank && (
                    <p className="rounded-xl border bg-muted/40 p-3 text-[11.5px] font-bold leading-5 text-muted-foreground" role="status">
                      تمرین داده‌محور برای این درس ساخته نشد — علت صادقانه: {engine.skipped[0]?.reason ?? "دادهٔ کافی نیست"}
                      {sentencesDegraded ? " (ایندکس جمله‌های کتاب بارگذاری نشد — شاید حالت آفلاین)" : ""}.
                    </p>
                  )}

                  {/* بخش ۲ — آزمون بانکی کتاب (عین قبلی) */}
                  {practiceFinished && hasBank && questions === null && (
                    <div className="flex flex-col items-center gap-3 rounded-2xl border bg-muted/30 p-8" role="status" aria-live="polite">
                      <Loader2 size={22} className="animate-spin text-primary" aria-hidden />
                      <p className="text-[12.5px] font-bold text-muted-foreground">در حال آماده‌سازی آزمون بانکی…</p>
                    </div>
                  )}
                  {practiceFinished && hasBank && questions !== null && questions.length === 0 && (
                    <div className="space-y-3 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-5 text-center">
                      <SearchX size={22} className="mx-auto text-muted-foreground" aria-hidden />
                      <p className="text-[12.5px] font-bold leading-6 text-foreground/85">
                        سؤال بانکی این درس در دسترس نیست.
                      </p>
                      <Button className="h-11 w-full gap-2" onClick={finishPractice}>
                        <ListChecks size={16} />
                        ثبت و ادامه به کاربرد
                      </Button>
                    </div>
                  )}
                  {practiceFinished && hasBank && questions !== null && questions.length > 0 && current && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Progress value={((qIndex + 1) / questions.length) * 100} className="h-2 flex-1" />
                        <span className="shrink-0 text-[12px] font-bold text-muted-foreground">
                          آزمون بانکی {fa(qIndex + 1)} / {fa(questions.length)}
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
                              {qIndex + 1 >= questions.length ? "دیدن مرحلهٔ کاربرد" : "سؤال بعدی"}
                              <ArrowLeft size={15} />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* پایان بخش تمرین وقتی بانک ندارد */}
                  {practiceFinished && !hasBank && (
                    <Button size="lg" className="h-12 w-full gap-2 text-[14px]" onClick={finishPractice}>
                      <PenLine size={17} />
                      ثبت نتیجه و برو به کاربرد
                      <ArrowLeft size={16} />
                    </Button>
                  )}
                </>
              )}
            </div>
          )}

          {/* ── مرحلهٔ ۴: کاربرد (Use) — ساخت جمله + یادآوری فعال ── */}
          {stage === 4 && (
            <div className="mt-4 space-y-3 rise-in">
              {!hasUseContent ? (
                <div className="space-y-3 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-5 text-center">
                  <SearchX size={22} className="mx-auto text-muted-foreground" aria-hidden />
                  <p className="text-[12.5px] font-bold leading-6 text-foreground/85">
                    برای این درس دادهٔ کاربرد فعال یافت نشد.
                  </p>
                  <p className="text-[11px] leading-5 text-muted-foreground">
                    ساخت جمله به جمله‌های واقعی کتاب نیاز دارد و یادآوری فعال به واژهٔ درس — دادهٔ کافی نیست.
                  </p>
                  <Button className="h-11 w-full gap-2" onClick={finishUse}>
                    <ListChecks size={16} />
                    ثبت و ادامه به مرور
                  </Button>
                </div>
              ) : (
                <>
                  <p className="flex items-center gap-1.5 text-[12px] font-bold text-muted-foreground">
                    <PenLine size={13} className="text-primary" />
                    واژه را در جمله به‌کار ببر و یادآوری فعال را با خودارزیابی صادقانه تثبیت کن.
                  </p>
                  <LessonExerciseRunner
                    items={useItems}
                    onResult={onUseResult}
                    onGrade={onUseGrade}
                    onComplete={() => setUseDone(true)}
                  />
                  {useDone && (
                    <div className="space-y-3 rise-in">
                      <p className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-[12px] font-black text-emerald-700 dark:text-emerald-300">
                        <CheckCircle2 size={14} />
                        مرحلهٔ کاربرد تمام شد — واژه‌های به‌کار‌رفته ثبت شدند و خودارزیابی‌ها در SRS اعمال شدند.
                      </p>
                      <Button size="lg" className="h-12 w-full gap-2 text-[14px]" onClick={finishUse}>
                        <PartyPopper size={17} />
                        برو به مرور و جمع‌بندی
                        <ArrowLeft size={16} />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ── مرحلهٔ ۵: مرور (Review) ── */}
          {stage === 5 && (
            <div className="mt-4 space-y-3 rise-in">
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-primary/30 bg-primary/5 p-5 text-center">
                <PartyPopper size={26} className="text-primary" aria-hidden />
                <p className="text-[15px] font-black">
                  درس {fa(lesson)} {completion === "done" ? "تکمیل شد" : "ثبت شد"}!
                </p>
                <p className="text-[11.5px] text-muted-foreground">
                  {completion === "done"
                    ? "وضعیت این درس در نقشهٔ پیشرفت کتاب سبز شد."
                    : "پیشرفت این درس ثبت شد — ادامهٔ جریان، درس را تکمیل می‌کند."}
                </p>
              </div>

              {/* نوار مراحل — وضعیت صادقانهٔ هر ۶ مرحله */}
              <div className="grid grid-cols-6 gap-1.5" aria-label="وضعیت مراحل">
                {LESSON_STAGES.map((s, i) => {
                  const done = Boolean(entry?.stages?.[s]);
                  const noContent = stageContentless[i] ?? false;
                  return (
                    <div
                      key={s}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-xl border p-2 text-center",
                        done
                          ? "border-emerald-500/50 bg-emerald-500/10"
                          : noContent
                            ? "border-border border-dashed bg-muted/30"
                            : "border-border bg-muted/40",
                      )}
                    >
                      {done ? (
                        <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400" aria-hidden />
                      ) : (
                        <span className="text-[10px] font-black text-muted-foreground" aria-hidden>
                          {noContent ? "—" : fa(i + 1)}
                        </span>
                      )}
                      <span className="truncate text-[9px] font-bold text-muted-foreground" title={noContent && !done ? "بدون محتوا" : undefined}>
                        {STAGE_TITLES[i]}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-xl border bg-muted/30 p-3.5 text-center" role="status">
                  <p className="text-xl font-black text-primary">{fa(learnedInLesson)} از {fa(lessonWords.length)}</p>
                  <p className="mt-0.5 text-[11px] font-bold text-muted-foreground">واژه‌های علامت‌خوردهٔ درس</p>
                </div>
                <div className="rounded-xl border bg-muted/30 p-3.5 text-center" role="status">
                  {combinedAccuracy !== null ? (
                    <>
                      <p className="text-xl font-black text-amber-600 dark:text-amber-400">{fa(combinedAccuracy)}٪</p>
                      <p className="mt-0.5 text-[11px] font-bold text-muted-foreground">
                        دقت تمرین — {fa(entry?.correct ?? 0)} از {fa(entry?.total ?? 0)}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-xl font-black text-muted-foreground">—</p>
                      <p className="mt-0.5 text-[11px] font-bold text-muted-foreground">تمرین نمره‌داری ثبت نشده</p>
                    </>
                  )}
                </div>
              </div>

              {/* جدول وضعیت یادگیری واژه‌ها — همه از استورهای موجود (بدون سیستم موازی) */}
              <div className="rounded-2xl border p-3.5" role="status" aria-label="وضعیت یادگیری واژه‌ها">
                <p className="mb-2 text-[12px] font-black">وضعیت یادگیری واژه‌های درس</p>
                <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
                  <div className="rounded-lg bg-muted/40 p-2 text-center">
                    <p className="text-[13px] font-black">{fa(stateCounts.seen)}</p>
                    <p className="text-[9px] font-bold leading-3.5 text-muted-foreground">دیده‌شده</p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-2 text-center">
                    <p className="text-[13px] font-black text-primary">{fa(stateCounts.learned)}</p>
                    <p className="text-[9px] font-bold leading-3.5 text-muted-foreground">یاد گرفتم</p>
                  </div>
                  <div className="rounded-lg bg-emerald-500/10 p-2 text-center">
                    <p className="text-[13px] font-black text-emerald-700 dark:text-emerald-300">{fa(stateCounts.correct)}</p>
                    <p className="text-[9px] font-bold leading-3.5 text-muted-foreground">پاسخ درست</p>
                  </div>
                  <div className="rounded-lg bg-amber-500/10 p-2 text-center">
                    <p className="text-[13px] font-black text-amber-700 dark:text-amber-300">{fa(stateCounts.srs)}</p>
                    <p className="text-[9px] font-bold leading-3.5 text-muted-foreground">در SRS</p>
                  </div>
                  <div className="rounded-lg bg-muted/40 p-2 text-center">
                    <p className="text-[13px] font-black">{fa(stateCounts.used)}</p>
                    <p className="text-[9px] font-bold leading-3.5 text-muted-foreground">به‌کار‌رفته</p>
                  </div>
                  <div className="rounded-lg bg-emerald-500/10 p-2 text-center">
                    <p className="text-[13px] font-black text-emerald-700 dark:text-emerald-300">{fa(stateCounts.mastered)}</p>
                    <p className="text-[9px] font-bold leading-3.5 text-muted-foreground">تسلط SRS</p>
                  </div>
                </div>
                <p className="mt-2 text-[10px] leading-4 text-muted-foreground">
                  «تسلط SRS» = واژه در جعبهٔ ۴+ مرور فاصله‌دار است؛ این وضعیت‌ها از استورهای موجود
                  (learned/SRS/lesson-progress) خوانده می‌شوند — سیستم پیشرفت موازی‌ای ساخته نشده است.
                </p>
              </div>

              {learnedInLesson < lessonWords.length && (
                <p className="rounded-xl border border-amber-500/30 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
                  {fa(lessonWords.length - learnedInLesson)} واژه هنوز «یاد گرفتم» نشده — می‌توانی مرحلهٔ واژه‌ها را دوباره مرور کنی یا به مرور SRS بسپاری.
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
        </>
      )}
    </section>
  );
}

/** تشخیص دارد درس تمرین بانکی دارد؟ (برای وضعیت صادقانهٔ نقشهٔ پیشرفت) — دادهٔ محلی seed */
export function lessonHasBankQuiz(seed: QuizQuestionSeed[], lesson: number): boolean {
  return seed.some((q) => q.lesson === lesson);
}
