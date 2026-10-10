"use client";

/**
 * بازی «تست برقی» (Speed Quiz) — فاز ۳ نقشه راه جامع ۲۰۲۶.
 *
 * همان بانک تست خود جزوه (data.quiz.seed) با تایمر شمارش معکوس:
 * - هر پاسخ درست پیاپی کمبو می‌سازد — از دومین پاسخ پیاپی ×۲ و از پنجمی ×۳ امتیاز (پایه ۱۰).
 * - اشتباه یا رد کردن کمبو را صفر می‌کند؛ سؤال بعدی «برقی» و فوری می‌آید.
 * - سؤال‌ها تمام شوند؟ دوباره شافل و ادامه تا پایان تایمر (چرخه بی‌پایان).
 * - واژه‌های غلط‌زدهٔ واژگانی با seedReviewFromQuiz به صف «مرور هوشمند» برمی‌گردند (گرامر: هیچ).
 * - پایان: رتبهٔ شخصی بر اساس امتیاز + رکورد per-scope (درس:دسته:مدت) در localStorage.
 *
 * نکتهٔ تایمر: چون finish به stateهای زیادی وابسته است، آخرین نسخهٔ آن در finishRef نگه داشته
 * می‌شود که بعد از هر کامیت (effect بدون آرایه وابستگی — الگوی latest-ref) تازه می‌شود و
 * callback ست‌اینتروال آن را صدا می‌زند؛ شمارندهٔ واقعی ثانیه در timeRef است (تایمر مالکش است)
 * و setTimeLeft فقط نمایش را همگام نگه می‌دارد. چون پیشروی سؤال آنی است، بازخورد بصری
 * «غلط» به فلاش کارت (match-shake) و بازخورد «درست» به پاپ نشان امتیاز (match-pop با key)
 * منتقل شده است.
 */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  Zap,
  Play,
  RotateCcw,
  Trophy,
  Timer,
  Clock,
  Star,
  Target,
  Flame,
  Wind,
  Sprout,
  SkipForward,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { QuizQuestionSeed } from "@/data/types";
import { useBook, useBookData } from "@/lib/book-context";
import { seedReviewFromQuiz } from "@/lib/srs-store";
import { touchStreak } from "@/lib/streak-store";
import { recordStudySession } from "@/lib/goal-store";
import { speak, stopSpeaking } from "@/lib/speak";
import { useVoiceSpeed } from "@/lib/voice-store";
import {
  faNum,
  fmtTime,
  loadBest,
  saveBest,
  bumpPlays,
  saveAttempt,
  shuffle,
  subscribeGameData,
} from "./shared";

// ─── ثابت‌ها و کمکی‌ها ───

const GAME_KEY = "speed-quiz";
const ALL_LESSON = -1;
const MIN_POOL = 5;
const DURATIONS = [30, 60, 90] as const;

type Phase = "setup" | "playing" | "done";
type CatKey = "all" | "vocabulary" | "grammar";

/** شکل رکورد شخصی این بازی — اسکوپ: درس:دسته:مدت */
interface BestRecord {
  score: number;
}

function scopeOf(lesson: number, cat: CatKey, duration: number): string {
  return `${lesson === ALL_LESSON ? "all" : lesson}:${cat}:${duration}`;
}

/** ضریب کمبو: از پاسخ پیاپی دوم ×۲ و از پنجمی ×۳ */
function multiplierOf(combo: number): 1 | 2 | 3 {
  return combo >= 5 ? 3 : combo >= 2 ? 2 : 1;
}

interface Rank {
  label: string;
  icon: LucideIcon;
  cls: string;
}

/** رتبهٔ شخصی بر اساس امتیاز نهایی */
function rankOf(score: number): Rank {
  if (score >= 250) return { label: "اسطورهٔ برق", icon: Trophy, cls: "text-amber-600 dark:text-amber-400" };
  if (score >= 150) return { label: "تندباد", icon: Zap, cls: "text-emerald-600 dark:text-emerald-400" };
  if (score >= 70) return { label: "چابک", icon: Wind, cls: "text-teal-600 dark:text-teal-400" };
  return { label: "تازه‌کار", icon: Sprout, cls: "text-muted-foreground" };
}

function lessonLabel(l: number): string {
  return l === 0 ? "جمع‌بندی" : `درس ${faNum(l)}`;
}

export function SpeedQuizGame() {
  const data = useBookData();
  const { bookId } = useBook();
  // بازی فقط داخل کتاب فعال رندر می‌شود؛ گارد تایپی برای bookId nullable
  const id = bookId ?? "vision-one";
  const { speed } = useVoiceSpeed();

  const [phase, setPhase] = useState<Phase>("setup");
  const [lesson, setLesson] = useState<number>(ALL_LESSON);
  const [cat, setCat] = useState<CatKey>("all");
  const [duration, setDuration] = useState<number>(60);

  // ── stateهای حین بازی ──
  const [timeLeft, setTimeLeft] = useState(0);
  const [q, setQ] = useState<QuizQuestionSeed | null>(null);
  const [qNum, setQNum] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [correct, setCorrect] = useState(0);
  /** فلاش لحظه‌ای بازخورد — «bad» کارت را می‌لرزاند (پیشروی سؤال آنی است) */
  const [flash, setFlash] = useState<"bad" | null>(null);

  // ── stateهای فاز done ──
  const [prevBest, setPrevBest] = useState<number | null>(null);
  const [isRecord, setIsRecord] = useState(false);

  // ── refs ──
  const deckRef = useRef<QuizQuestionSeed[]>([]);
  const qiRef = useRef(0);
  const comboRef = useRef(0);
  /** سؤال جاری هنوز پاسخ/رد نشده؟ (گارد دوبار-شلیک در همان تیک) */
  const pendingRef = useRef(false);
  /** آیا مسابقه تمام/لغو شده؟ */
  const overRef = useRef(false);
  /** آینهٔ تازهٔ timeLeft برای callback تایمر — مالک واقعی: تایمر (با start ریست می‌شود) */
  const timeRef = useRef(0);
  const flashTimer = useRef<number | null>(null);
  const finishRef = useRef<(() => void) | null>(null);
  const answerRef = useRef<((idx: number) => void) | null>(null);

  // ── داده‌های مشتق ──
  const pool = useMemo(
    () =>
      data.quiz.seed.filter(
        (item) =>
          (lesson === ALL_LESSON || item.lesson === lesson) &&
          (cat === "all" || item.category === cat),
      ),
    [data.quiz.seed, lesson, cat],
  );

  const lessons = useMemo(
    () => [...new Set(data.quiz.seed.map((item) => item.lesson))].sort((a, b) => a - b),
    [data.quiz.seed],
  );

  /** تعداد واقعی سؤال هر چیپ محدوده (با اعمال دستهٔ فعال) */
  const countFor = useCallback(
    (l: number) =>
      data.quiz.seed.filter(
        (item) => (l === ALL_LESSON || item.lesson === l) && (cat === "all" || item.category === cat),
      ).length,
    [data.quiz.seed, cat],
  );

  // رکورد شخصی این اسکوپ — الگوی match-game (بدون mismatch؛ سرور null)
  const best = useSyncExternalStore(
    subscribeGameData,
    () => {
      const rec = loadBest<BestRecord>(id, GAME_KEY, scopeOf(lesson, cat, duration));
      return rec ? rec.score : null;
    },
    () => null,
  );

  // ── جریان بازی ──

  const drawNext = useCallback(() => {
    let deck = deckRef.current;
    let next = qiRef.current + 1;
    if (next >= deck.length) {
      // سؤال‌ها تمام شد و هنوز وقت هست → از نو شافل و ادامه (چرخهٔ بی‌پایان)
      deck = shuffle(deck);
      deckRef.current = deck;
      next = 0;
    }
    qiRef.current = next;
    setQ(deck[next]);
    pendingRef.current = true;
  }, []);

  const start = useCallback(() => {
    if (pool.length < MIN_POOL) {
      toast.error("سؤال کافی در این محدوده نیست");
      return;
    }
    if (flashTimer.current !== null) {
      window.clearTimeout(flashTimer.current);
      flashTimer.current = null;
    }
    const deck = shuffle(pool);
    deckRef.current = deck;
    qiRef.current = 0;
    pendingRef.current = true;
    overRef.current = false;
    comboRef.current = 0;
    timeRef.current = duration;
    setQ(deck[0]);
    setQNum(1);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setAnswered(0);
    setCorrect(0);
    setFlash(null);
    setTimeLeft(duration);
    setPrevBest(loadBest<BestRecord>(id, GAME_KEY, scopeOf(lesson, cat, duration))?.score ?? null);
    setIsRecord(false);
    setPhase("playing");
  }, [pool, duration, lesson, cat, id]);

  const finish = useCallback(() => {
    if (overRef.current) return;
    overRef.current = true;
    pendingRef.current = false;
    // elapsedSecs = مدت − باقی‌مانده؛ پایان همیشه از تایمر است (باقی‌مانده اینجا صفر است)
    const spent = Math.max(0, duration - timeRef.current);
    touchStreak();
    recordStudySession();
    bumpPlays(id, GAME_KEY);
    if (answered > 0) {
      saveAttempt(id, GAME_KEY, {
        lesson: lesson === ALL_LESSON ? 0 : lesson,
        total: answered,
        correct,
        duration: spent,
        detail: { score, maxCombo },
      });
    }
    const prev = prevBest;
    if (score > 0 && score > (prev ?? 0)) {
      saveBest(id, GAME_KEY, scopeOf(lesson, cat, duration), { score });
      // نشان «رکورد جدید» فقط وقتی رکورد قبلی وجود داشت
      setIsRecord(prev !== null);
    } else {
      setIsRecord(false);
    }
    setTimeLeft(0);
    setPhase("done");
  }, [answered, correct, score, maxCombo, duration, lesson, cat, id, prevBest]);

  const answer = useCallback(
    (idx: number) => {
      if (overRef.current || !q || !pendingRef.current) return;
      pendingRef.current = false;
      if (idx === q.answer) {
        // درست — کمبو و امتیاز (توضیح: ضریب از کمبوی تازه محاسبه می‌شود)
        comboRef.current += 1;
        const mult = multiplierOf(comboRef.current);
        setCombo(comboRef.current);
        setMaxCombo((m) => Math.max(m, comboRef.current));
        setScore((s) => s + 10 * mult);
        setCorrect((c) => c + 1);
        // تلفظ گزینهٔ درست فقط برای واژگان — بدون await تا جریان بازی کند نشود
        if (q.category === "vocabulary") void speak(q.options[idx], { speed });
      } else {
        // غلط — کمبو صفر؛ واژهٔ واژگانیِ غلط‌زده به صف مرور برمی‌گردد (گرامر: هیچ)
        comboRef.current = 0;
        setCombo(0);
        if (q.category === "vocabulary") seedReviewFromQuiz(q.options[q.answer]);
        setFlash("bad");
        if (flashTimer.current !== null) window.clearTimeout(flashTimer.current);
        flashTimer.current = window.setTimeout(() => setFlash(null), 480);
      }
      setAnswered((a) => a + 1);
      setQNum((n) => n + 1);
      drawNext(); // فوراً — «برقی»!
    },
    [q, speed, drawNext],
  );

  const skip = useCallback(() => {
    if (overRef.current || !pendingRef.current) return;
    pendingRef.current = false;
    comboRef.current = 0;
    setCombo(0);
    setQNum((n) => n + 1);
    drawNext();
  }, [drawNext]);

  const quit = useCallback(() => {
    overRef.current = true;
    setPhase("setup");
  }, []);

  // ── effectها ──

  // آخرین نسخهٔ finish/answer برای فراخوانی تازه از تایمر/کیبورد (الگوی latest-ref —
  // بعد از هر کامیت اجرا می‌شود؛ قاعدهٔ react-hooks/refs نوشتن ref در رندر را نمی‌پذیرد)
  useEffect(() => {
    finishRef.current = finish;
    answerRef.current = answer;
  });

  // تایمر شمارش معکوس — صفر شدن یعنی پایان مسابقه (finish از طریق ref تازه)
  // فاز G0-05 — گارد visibilitychange: در تب مخفی interval پاک می‌شود (شمارش می‌ایستد و
  // زمان کاربر نمی‌سوزد) و در بازگشت با همان timeRef از سر گرفته می‌شود — نه پرش به زمان قدیمی.
  // بازگشت از bfcache هم با pageshow پوشش داده می‌شود؛ unmount همیشه پاک می‌کند.
  useEffect(() => {
    if (phase !== "playing") return;
    let iv: number | null = null;
    const startTimer = () => {
      if (iv !== null) return;
      iv = window.setInterval(() => {
        // اول کم‌کن، بعد صفر را تشخیص بده — بازی دقیقاً «duration» ثانیه طول می‌کشد
        if (timeRef.current > 0) {
          timeRef.current -= 1;
          setTimeLeft((t) => Math.max(0, t - 1));
        }
        if (timeRef.current <= 0) {
          finishRef.current?.();
        }
      }, 1000);
    };
    const stopTimer = () => {
      if (iv !== null) {
        window.clearInterval(iv);
        iv = null;
      }
    };
    const onVis = () => {
      if (document.visibilityState === "hidden") stopTimer();
      else startTimer();
    };
    const onPageshow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      stopTimer(); // interval تازه می‌شود تا تیک معوقِ دورهٔ انجماد یک‌جا نپرد
      if (document.visibilityState === "visible") startTimer();
    };
    startTimer();
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pageshow", onPageshow);
    return () => {
      stopTimer();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pageshow", onPageshow);
    };
  }, [phase]);

  // میان‌بر کیبورد ۱..۴ (فارسی/انگلیسی) برای انتخاب گزینه — setState داخل callback رویداد
  useEffect(() => {
    if (phase !== "playing") return;
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      const fa = "۱۲۳۴".indexOf(e.key);
      const en = "1234".indexOf(e.key);
      const digit = fa >= 0 ? fa : en;
      if (digit >= 0) {
        e.preventDefault();
        answerRef.current?.(digit);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  useEffect(
    () => () => {
      stopSpeaking();
      if (flashTimer.current !== null) window.clearTimeout(flashTimer.current);
    },
    [],
  );

  const chipCls = (active: boolean) =>
    cn(
      "rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
      active
        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
        : "text-muted-foreground hover:bg-muted",
    );

  // ── Setup ──
  if (phase === "setup") {
    return (
      <Card className="mx-auto max-w-xl rise-in">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Zap size={22} />
            </span>
            <div>
              <h2 className="text-lg font-black">تست برقی</h2>
              <p className="text-xs text-muted-foreground">تایمر روشن است — هر ثانیه مهم است!</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
            <p>
              پاسخ درست پیاپی کمبو می‌سازد: از دومی ×۲، از پنجمی ×۳ امتیاز. اشتباه یا رد کردن کمبو را صفر می‌کند.
            </p>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">محدوده؟</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                aria-pressed={lesson === ALL_LESSON}
                onClick={() => setLesson(ALL_LESSON)}
                className={chipCls(lesson === ALL_LESSON)}
              >
                کل بانک ({faNum(countFor(ALL_LESSON))} سؤال)
              </button>
              {lessons.map((l) => (
                <button
                  key={l}
                  type="button"
                  aria-pressed={lesson === l}
                  onClick={() => setLesson(l)}
                  className={chipCls(lesson === l)}
                >
                  {lessonLabel(l)} ({faNum(countFor(l))})
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">کدام دسته؟</p>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["all", "همه"],
                  ["vocabulary", "واژگان"],
                  ["grammar", "گرامر"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={cat === key}
                  onClick={() => setCat(key)}
                  className={chipCls(cat === key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[13px] font-bold">
              <Timer size={14} className="text-amber-500" />
              چند ثانیه؟
            </p>
            <div className="flex flex-wrap gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={duration === d}
                  onClick={() => setDuration(d)}
                  className={chipCls(duration === d)}
                >
                  {faNum(d)} ثانیه
                </button>
              ))}
            </div>
          </div>

          {best !== null && (
            <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
              <Trophy size={12} />
              بهترین امتیاز: {faNum(best)}
            </Badge>
          )}

          <Button size="lg" className="h-12 w-full gap-2 text-base" onClick={start}>
            <Play size={18} />
            شروع مسابقه
          </Button>
        </CardContent>
      </Card>
    );
  }

  // ── Done ──
  if (phase === "done") {
    const rank = rankOf(score);
    const acc = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    const pctOfBest = prevBest !== null && prevBest > 0 ? Math.round((score / prevBest) * 100) : null;
    return (
      <Card className="mx-auto max-w-xl rise-in border-amber-500/30">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <Zap size={30} />
          </span>
          <h2 className="text-xl font-black">زمان تمام شد!</h2>
          {isRecord && (
            <Badge className="gap-1.5 bg-amber-500 text-amber-950 shadow-md shadow-amber-500/30">
              <Trophy size={13} />
              رکورد جدید! 🏆
            </Badge>
          )}

          {/* رتبهٔ شخصی */}
          <div className="w-full rounded-2xl bg-gradient-to-bl from-primary/10 to-amber-500/10 p-5">
            <rank.icon size={28} className={cn("mx-auto", rank.cls)} />
            <p className={cn("mt-1.5 text-lg font-black", rank.cls)}>{rank.label}</p>
            <p className="mt-1 font-black text-3xl">{faNum(score)}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">امتیاز این دور</p>
          </div>

          <div className="grid w-full grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-muted/60 p-3">
              <Star size={16} className="mx-auto text-amber-500" />
              <p className="mt-1.5 text-lg font-black leading-none">{faNum(score)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">امتیاز</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <Target size={16} className="mx-auto text-teal-500" />
              <p className="mt-1.5 text-lg font-black leading-none">{faNum(acc)}٪</p>
              <p className="mt-1 text-[10px] text-muted-foreground">دقت</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <Flame size={16} className="mx-auto text-amber-500" />
              <p className="mt-1.5 text-lg font-black leading-none">×{faNum(maxCombo)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">بیشترین کمبو</p>
            </div>
          </div>

          {pctOfBest !== null && prevBest !== null && (
            <p className="text-[11px] text-muted-foreground">
              بهترین رکورد تو: {faNum(prevBest)} — {faNum(pctOfBest)}٪ از رکوردت
            </p>
          )}

          <div className="flex gap-2">
            <Button onClick={start} className="gap-2">
              <RotateCcw size={16} />
              مسابقهٔ جدید
            </Button>
            <Button variant="outline" onClick={() => setPhase("setup")}>
              تنظیمات
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ── Playing ──
  if (!q) return null;
  const pct = Math.max(0, Math.min(100, Math.round((timeLeft / duration) * 100)));
  const mult = multiplierOf(combo);
  const urgent = timeLeft <= 5;
  return (
    <div className="mx-auto max-w-2xl space-y-4 rise-in">
      {/* نوار بالا */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge
          variant="outline"
          className={cn(
            "gap-1.5 px-2.5 py-1 text-[13px] font-black",
            urgent && "border-destructive/60 bg-destructive/10 text-destructive",
          )}
        >
          <Clock size={13} />
          {fmtTime(timeLeft)}
        </Badge>
        <Badge key={score} variant="secondary" className="match-pop gap-1.5 px-2.5 py-1 text-[13px] font-black">
          <Star size={13} className="text-amber-500" />
          {faNum(score)}
        </Badge>
        {combo >= 2 ? (
          <Badge
            variant="outline"
            className="gap-1.5 border-amber-500/50 bg-amber-500/10 px-2.5 py-1 text-[13px] font-black text-amber-600 dark:text-amber-400"
          >
            <Flame size={13} />
            ×{faNum(mult)}
          </Badge>
        ) : (
          <Badge variant="secondary" className="gap-1.5 px-2.5 py-1 text-[12px] text-muted-foreground">
            <Flame size={12} />
            کمبو ×۱
          </Badge>
        )}
        <Badge variant="secondary" className="px-2.5 py-1 text-[12px] font-bold">
          سؤال {faNum(qNum)}
        </Badge>
        <div className="mr-auto">
          <Button variant="ghost" size="sm" onClick={quit} className="text-[11px] text-muted-foreground">
            انصراف
          </Button>
        </div>
      </div>

      {/* نوار زمان */}
      <div
        className="h-1.5 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-label="زمان باقی‌مانده"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-linear",
            urgent ? "bg-destructive" : "bg-primary",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* کارت سؤال */}
      <div
        className={cn(
          "rounded-2xl border bg-card p-5 space-y-4 sm:p-6",
          flash === "bad" && "match-shake border-destructive/60",
        )}
      >
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="secondary" className="text-[10px]">
            {lessonLabel(q.lesson)}
          </Badge>
          <Badge variant="outline" className="border-amber-500/40 text-[10px] text-amber-600 dark:text-amber-400">
            {q.level}
          </Badge>
          <Badge variant="secondary" className="text-[10px]">
            {q.category === "vocabulary" ? "واژگان" : "گرامر"}
          </Badge>
        </div>

        <p dir="ltr" className="font-en text-[15px] font-bold leading-8 sm:text-base">
          {q.text}
        </p>

        <div className="grid gap-2 sm:grid-cols-2">
          {q.options.map((opt, i) => (
            <button
              key={`${qNum}-${i}`}
              type="button"
              onClick={() => answer(i)}
              className={cn(
                "flex min-h-12 items-center gap-2 rounded-xl border bg-card px-4 py-2 text-right transition-all",
                "hover:border-primary/50 hover:bg-muted/40",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              )}
            >
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-[11px] font-black">
                {faNum(i + 1)}
              </span>
              <span dir="ltr" className="flex-1 font-en text-[14px] font-bold leading-6">
                {opt}
              </span>
            </button>
          ))}
        </div>

        <div className="flex justify-center pt-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={skip}
            className="gap-1.5 text-[11px] text-muted-foreground"
          >
            <SkipForward size={13} />
            رد کردن
          </Button>
        </div>
      </div>
    </div>
  );
}
