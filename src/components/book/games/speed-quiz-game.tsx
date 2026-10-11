"use client";

/**
 * بازی «تست برقی» (Speed Quiz) — فاز ۳ نقشه راه جامع ۲۰۲۶ + فاز G2-c نقشه راه بازی‌ها.
 *
 * همان بانک تست خود جزوه (data.quiz.seed) با تایمر شمارش معکوس:
 * - هر پاسخ درست پیاپی کمبو می‌سازد — از دومین پاسخ پیاپی ×۲ و از پنجمی ×۳ امتیاز (پایه ۱۰).
 *   فاز G2-c: منطق کمبو به موتور مشترک کیت منتقل شد (useCombo mode:"multiplier" base:10،
 *   همان comboMultiplier سابق) — امتیاز مو‌به‌مو همان قبلی است: base × ضریب یعنی ۱۰/۲۰/۳۰.
 * - اشتباه یا رد کردن کمبو را صفر می‌کند؛ سؤال بعدی «برقی» و فوری می‌آید.
 * - سؤال‌ها تمام شوند؟ دوباره شافل و ادامه تا پایان تایمر (چرخهٔ بی‌پایان).
 * - فاز G2-c: در ۱۰ ثانیهٔ آخر هر ثانیه یک‌بار «تیک‌تاک» شنیده می‌شود (زیر کلید بی‌صدای
 *   کیت — موتور صدا خودش گارد دارد) و یک‌بار «۱۰ ثانیه مانده!» اعلام می‌شود.
 * - واژه‌های غلط‌زدهٔ واژگانی با seedReviewFromQuiz به صف «مرور هوشمند» برمی‌گردند (گرامر: هیچ)
 *   و در «مرور خطاها»ی صفحهٔ نتیجهٔ کیت هم می‌آیند.
 * - پایان: رتبهٔ شخصی بر اساس امتیاز + رکورد per-scope (درس:دسته:مدت) در localStorage.
 *
 * فاز G2-c (کیت GameKit v2 — الگوی پایلوت memory / دارباز / جای خالی):
 * - GameShell + ResultScreen + آموزش ۳گامی (useAutoTutorial) + Pause (تایمر گیت روی paused،
 *   اورلی «برق قطع شد! ⏸») + نگهبان خروج (≥۱ پاسخ) + تله‌متری جلسه + صدا/لرزش.
 *
 * فاز G3 (نقشه راه بازی‌ها — G3-01/G3-02/G3-05):
 * - دشواری ۳سطحی با کیت difficulty: گزینه‌ها optionsFor(3..5) — آسان ۳ گزینه (حذف گزینهٔ
 *   انحرافی)، سخت ۵ گزینه (یک مزاحم از استخر گزینه‌های سایر سؤال‌ها)؛ تایمر ۶۰ث ×timeScale
 *   (آسان ۷۵ / سخت ۴۵)؛ امتیاز نهایی levelScore (عادی = دقیقاً همان عدد قبلی)؛ اسکوپ رکورد
 *   و تله‌متری scopeWithLevel (عادی = همان کلید قدیمی)؛ detail.level افزودنی.
 * - G3-02: ترتیب ورود سؤال‌ها با اولویت SRS ضعیف/سررسید (smartOrderDeck — نیمهٔ اول استخر
 *   وزن‌دار، شروع سرد = همان شافل قبلی) + پیام «مرکز این دور: N واژهٔ ضعیف تو» در setup.
 * - G3-05 تمرین بی‌پایان: دکمهٔ جدا در setup؛ بدون تایمر پایان (شمارندهٔ زمان صعودی)؛
 *   پایان فقط با خروج صریح (نگهبان کیت) — در لحظهٔ تأیید، Attempt با پیشرفت فعلی ثبت
 *   (امتیاز ×۱ بدون levelScore؛ detail.endless=true) + telemetry end + ResultScreen کیت.
 *   رکورد scope افزودنی «درس:دسته:endless» (الگوی وردل بی‌نهایت).
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
  Pause,
  Infinity as InfinityIcon,
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
// فاز G2-c — کیت GameKit v2 (قرارداد API سند)
import { playSound, toggleSoundMuted, isSoundMuted } from "./kit/sound-engine";
import { buzz } from "./kit/haptics";
import { useGamePause } from "./kit/use-pause";
import { GameExitGuard } from "./kit/exit-guard";
import { GameShell } from "./kit/game-shell";
import { ResultScreen } from "./kit/result-screen";
import {
  TutorialOverlay,
  useAutoTutorial,
  type TutorialStep,
} from "./kit/tutorial-overlay";
import { createGameSession, type GameSessionTracker } from "./kit/telemetry";
import { useCombo, COMBO_FIRE_CLASS } from "./kit/combo-engine";
// فاز G3 — دشواری ۳سطحی + انتخاب هوشمند واژه (کیت GameKit v2 — فقط مصرف)
import {
  LEVEL_KNOBS,
  levelScore,
  loadLevelPref,
  optionsFor,
  saveLevelPref,
  scopeWithLevel,
  type DifficultyKey,
} from "./kit/difficulty";
import { DifficultyPicker } from "./kit/difficulty-picker";
import { countWeak, smartPick } from "./kit/smart-pick";

// ─── ثابت‌ها و کمکی‌ها ───

const GAME_KEY = "speed-quiz";
const ALL_LESSON = -1;
const MIN_POOL = 5;
const DURATIONS = [30, 60, 90] as const;

type Phase = "setup" | "playing" | "done";
type CatKey = "all" | "vocabulary" | "grammar";
/** فاز G3-05 — حالت دور: مسابقهٔ تایم‌دار عادی یا تمرین بی‌پایان */
type RoundMode = "timed" | "endless";

/** شکل رکورد شخصی این بازی — اسکوپ: درس:دسته:مدت */
interface BestRecord {
  score: number;
}

function scopeOf(lesson: number, cat: CatKey, duration: number): string {
  return `${lesson === ALL_LESSON ? "all" : lesson}:${cat}:${duration}`;
}

/**
 * فاز G3 — اسکوپ رکورد/تله‌متری دور: عادی = دقیقاً همان scopeOf قدیمی
 * (scopeWithLevel در سطح عادی دست‌نخورده)؛ بی‌پایان = پسوند :endless به‌جای مدت
 * (الگوی بی‌نهایت وردل — امتیاز بی‌پایان ×۱ است و به مدت وابسته نیست).
 */
function scopeFor(
  lesson: number,
  cat: CatKey,
  duration: number,
  level: DifficultyKey,
  roundMode: RoundMode,
): string {
  if (roundMode === "endless") {
    return `${lesson === ALL_LESSON ? "all" : lesson}:${cat}:endless`;
  }
  return scopeWithLevel(scopeOf(lesson, cat, duration), level);
}

/**
 * فاز G3-02 — کلید SRS یک سؤال: واژهٔ پاسخ سؤال واژگانی، دقیقاً با همان رشته‌ای که
 * seedReviewFromQuiz همین بازی در مرور هوشمند می‌نویسد؛ سؤال‌های گرامر کلید مستقل دارند.
 */
function quizKeyOf(q: QuizQuestionSeed): string {
  return q.category === "vocabulary" ? q.options[q.answer] : `gq:${q.text}`;
}

/**
 * فاز G3-01 — شکل‌دهی گزینه‌های یک سؤال به تعداد سطح:
 * آسان ۳ گزینه (حذف گزینهٔ انحرافی اضافه — پاسخ هرگز حذف نمی‌شود) · عادی ۴ گزینه
 * (بدون هیچ دخل‌و‌تصرفی — همان سؤال خام بانک تست) · سخت ۵ گزینه (مزاحم از استخر
 * گزینه‌های سایر سؤال‌ها، هرگز برابر گزینه‌های موجود). اگر استخر اجازهٔ افزودن
 * ندهد، سؤال بدون تغییر می‌ماند (شکنندگی صفر).
 */
function shapeOptions(
  q: QuizQuestionSeed,
  level: DifficultyKey,
  trapPool: string[],
): QuizQuestionSeed {
  const target = optionsFor(level, 3, 5);
  const opts = [...q.options];
  const ans = opts[q.answer];
  if (!ans || opts.length === target) return q;
  if (opts.length > target) {
    // آسان — حذف گزینه‌های غلط اضافه
    const wrongIdx = opts.map((_, i) => i).filter((i) => i !== q.answer);
    const removed = new Set(shuffle(wrongIdx).slice(0, opts.length - target));
    const next = opts.filter((_, i) => !removed.has(i));
    return { ...q, options: next, answer: Math.max(0, next.indexOf(ans)) };
  }
  // سخت — افزودن گزینهٔ مزاحم از استخر مشترک (شافل عادی — همان الگوی قبلی traps)
  const taken = new Set(opts.map((o) => o.trim().toLowerCase()));
  const extra: string[] = [];
  for (const cand of trapPool) {
    if (extra.length >= target - opts.length) break;
    const key = cand.trim().toLowerCase();
    if (!key || taken.has(key)) continue;
    taken.add(key);
    extra.push(cand);
  }
  if (extra.length === 0) return q; // استخر اجازه نداد — بدون تغییر
  const next = shuffle([...opts, ...extra]);
  return { ...q, options: next, answer: Math.max(0, next.indexOf(ans)) };
}

/**
 * فاز G3-02 — چیدن کارت دور با اولویت SRS ضعیف/سررسید/نو: نیمهٔ اول از smartPick
 * (نمونه‌گیری وزن‌دار کیت) و بقیه با شافل عادی — هیچ سؤالی حذف نمی‌شود و چرخهٔ
 * بی‌پایان دست‌نخورده است؛ فقط ترتیب ورود هوشمندتر است. شروع سرد (SRS خالی) =
 * دقیقاً همان شافل قبلی. فیلتر بر اساس هویت شیء است تا تکراری‌های کلید‌دار از دست نروند.
 */
function smartOrderDeck<T>(pool: T[], keyOf: (item: T) => string): T[] {
  if (pool.length <= 1) return shuffle(pool);
  const n = Math.max(1, Math.min(pool.length - 1, Math.ceil(pool.length / 2)));
  const head = smartPick(pool, n, keyOf);
  const inHead = new Set<T>(head);
  const tail = shuffle(pool.filter((x) => !inHead.has(x)));
  return [...head, ...tail];
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

/** آموزش ۳-گامی استاندارد (فاز G1-08) — هدف / کمبو ×۲ و ×۳ / تیک‌تاک آخر */
const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <Zap size={24} />,
    title: "مسابقه با تایمر!",
    text: "سؤال‌ها از بانک تست خود جزوه پشت‌سرهم می‌آیند — قبل از تمام‌شدن زمان بیشترین امتیاز را بگیر.",
  },
  {
    icon: <Flame size={24} />,
    title: "کمبو امتیازت را چند برابر می‌کند",
    text: "پاسخ درست پیاپی کمبو می‌سازد: از دومی ×۲ و از پنجمی ×۳ امتیاز. اشتباه یا رد کردن کمبو را صفر می‌کند.",
  },
  {
    icon: <Timer size={24} />,
    title: "تیک‌تاک ۱۰ ثانیهٔ آخر",
    text: "در ۱۰ ثانیهٔ آخر صدای تیک‌تاک می‌شنوی — تا آخرین ثانیه فرصت داری! با کلیدهای ۱ تا ۵ هم می‌توانی جواب بدهی.",
  },
];

/**
 * فاز G2-c — CSS افکت بصری واحد بج کمبو (کلاس مشترک کیت «combo-fire» — رشتهٔ آن از
 * combo-engine می‌آید) روی بج ضریب. کلیدفریمز محلیِ این فایل است تا وقتی کیت CSS مرکزی
 * ندارد (الگوی hangman) — نام یکتا تا با بازی‌های دیگر تداخل نکند.
 * reduced-motion: هم media query محلی و هم motion-reduce:animate-none روی خود بج.
 */
const COMBO_FIRE_CSS = `
@keyframes speedquiz-combo-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.12); }
}
.combo-fire { animation: speedquiz-combo-pulse 0.9s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .combo-fire { animation: none; }
}
`;

/** یک خطای واژگانی دور — برای «مرور خطاها»ی صفحهٔ نتیجهٔ کیت */
interface WrongItem {
  front: string;
  back: string;
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
  // ── فاز G3 — سطح دشواری ماندگار + حالت دور + شمارندهٔ صعودی بی‌پایان ──
  const [level, setLevel] = useState<DifficultyKey>(() => loadLevelPref(GAME_KEY));
  const [mode, setMode] = useState<RoundMode>("timed");
  /** فاز G3-05 — ثانیه‌های سپری‌شدهٔ دور بی‌پایان (شمارندهٔ صعودی؛ مالک: تایمر) */
  const [elapsed, setElapsed] = useState(0);

  // ── stateهای حین بازی ──
  const [timeLeft, setTimeLeft] = useState(0);
  const [q, setQ] = useState<QuizQuestionSeed | null>(null);
  const [qNum, setQNum] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [correct, setCorrect] = useState(0);
  /** فلاش لحظه‌ای بازخورد — «bad» کارت را می‌لرزاند (پیشروی سؤال آنی است) */
  const [flash, setFlash] = useState<"bad" | null>(null);
  /** فاز G2-c — پیام باکس aria-live شِل (درست/غلط/ردشده/۱۰ ثانیه مانده/توقف) */
  const [liveMsg, setLiveMsg] = useState("");
  /** فاز G2-c — واژه‌های واژگانیِ غلط‌زدهٔ این دور (برای «مرور خطاها»ی نتیجه) */
  const [wrongList, setWrongList] = useState<WrongItem[]>([]);
  /** فاز G3-05 — آینهٔ ثانیه‌های سپری‌شدهٔ بی‌پایان برای Attempt لحظهٔ خروج */
  const elapsedRef = useRef(0);

  // ── stateهای فاز done ──
  const [prevBest, setPrevBest] = useState<number | null>(null);
  const [isRecord, setIsRecord] = useState(false);

  // فاز G2-c — توقف/ادامهٔ استاندارد کیت + نگهبان خروج + کلید صدا (الگوی پایلوت memory/جای خالی)
  // توقف خودکار در تب مخفی از خود هوک می‌آید — در بازگشت اورلی «برق قطع شد» دیده می‌شود
  const { paused, resume, pause: pauseGame, toggle: togglePause } = useGamePause((p) => {
    if (phase === "playing") setLiveMsg(p ? "برق قطع شد — بازی متوقف شد ⏸" : "برق وصل شد — ادامه! ▶");
  });
  const [exitAsk, setExitAsk] = useState(false);
  // الگوی دارباز/جای خالی: state بی‌صدا + همگام‌سازی با کلید سراسری (storage بین-تب) و toggle در هندلر
  const [muted, setMuted] = useState(isSoundMuted());
  useEffect(() => {
    const sync = () => setMuted(isSoundMuted());
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  // فاز G2-c — آموزش یک‌بارنمایش (خودکار در setup) + راهنمای شِل حین بازی (با توقف)
  const {
    open: tutorialOpen,
    openHelp: openTutorial,
    close: closeTutorial,
  } = useAutoTutorial(GAME_KEY, phase === "setup");
  const pausedForHelpRef = useRef(false);
  const handleHelp = useCallback(() => {
    if (phase === "playing") {
      pausedForHelpRef.current = true;
      pauseGame();
    }
    openTutorial();
  }, [openTutorial, pauseGame, phase]);
  const handleTutorialClose = useCallback(() => {
    closeTutorial();
    if (pausedForHelpRef.current) {
      pausedForHelpRef.current = false;
      resume();
    }
  }, [closeTutorial, resume]);
  const handleTutorialOpenChange = useCallback(
    (o: boolean) => {
      if (!o) handleTutorialClose();
    },
    [handleTutorialClose],
  );
  // فاز G2-c — تله‌متری جلسه (بدون PII: بازی/اسکوپ/مدت رُند/دلیل)
  const sessionRef = useRef<GameSessionTracker | null>(null);

  // فاز G2-c (G1-09) — موتور کمبو مشترک کیت: حالت multiplier با base=10 دقیقاً قانون فعلی
  // این بازی است (≥۵→×۳ ، ≥۲→×۲ ، بقیه ×۱) — امتیاز مو‌به‌مو همان قبلی: ۱۰ × ضریب
  const {
    combo,
    maxCombo,
    multiplier,
    comboRef,
    registerCorrect,
    registerMiss,
    reset: resetCombo,
  } = useCombo({ mode: "multiplier", base: 10 });

  // ── refs ──
  const deckRef = useRef<QuizQuestionSeed[]>([]);
  const qiRef = useRef(0);
  /** سؤال جاری هنوز پاسخ/رد نشده؟ (گارد دوبار-شلیک در همان تیک) */
  const pendingRef = useRef(false);
  /** آیا مسابقه تمام/لغو شده؟ */
  const overRef = useRef(false);
  /** آینهٔ تازهٔ timeLeft برای callback تایمر — مالک واقعی: تایمر (با start ریست می‌شود) */
  const timeRef = useRef(0);
  /** فاز G2-c — «۱۰ ثانیه مانده!» فقط یک‌بار در هر دور اعلام شود */
  const tenWarnedRef = useRef(false);
  const flashTimer = useRef<number | null>(null);
  const finishRef = useRef<(() => void) | null>(null);
  const answerRef = useRef<((idx: number) => void) | null>(null);

  // ── فاز G3 — انتخاب سطح ماندگار (قرارداد کیت: saveLevelPref در onChange) ──
  const changeLevel = useCallback((l: DifficultyKey) => {
    setLevel(l);
    saveLevelPref(GAME_KEY, l);
  }, []);

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

  // ── فاز G3-01 — ثانیهٔ کل دور با مقیاس سطح (عادی: Math.round(مدت × ۱) = همان مدت) ──
  const totalSecs = Math.round(duration * LEVEL_KNOBS[level].timeScale);

  // ── فاز G3-02 — شمارش واژه‌های ضعیف/سررسید/نوی استخر واژگانی برای پیام setup ──
  const weakCount = useMemo(
    () => countWeak(pool.filter((q) => q.category === "vocabulary"), quizKeyOf),
    [pool],
  );

  // ── فاز G3 — اسکوپ رکورد عادی setup (بی‌پایان اسکوپ جدا دارد — الگوی وردل) ──
  const bestScope = scopeWithLevel(scopeOf(lesson, cat, duration), level);

  // فاز G2-c — معنی فارسی واژهٔ غلط‌زده از بانک واژگان کتاب (برای «مرور خطاها»ی نتیجه)
  // کلید = واژهٔ پایه بدون نشانهٔ دستوری پرانتزی، نرمال‌شده به حروف کوچک
  const meaningMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const v of data.vocab.all) {
      const base = v.word.replace(/\s*\([^)]*\)\s*/g, " ").trim().toLowerCase();
      if (base && !map.has(base)) map.set(base, v.meaning);
    }
    return map;
  }, [data.vocab.all]);

  // رکورد شخصی این اسکوپ — الگوی match-game (بدون mismatch؛ سرور null)
  const best = useSyncExternalStore(
    subscribeGameData,
    () => {
      const rec = loadBest<BestRecord>(id, GAME_KEY, bestScope);
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

  /**
   * شروع دور — فاز G3: مسابقهٔ تایم‌دار یا تمرین بی‌پایان.
   * مسیر عادی (level=normal, timed) دقیقاً همان ثابت‌های قبلی را مصرف می‌کند:
   * shapeOptions در عادی خودش early-return می‌کند و totalSecs = همان مدت انتخابی است.
   */
  const startRound = useCallback(
    (roundMode: RoundMode) => {
      if (pool.length < MIN_POOL) {
        toast.error("سؤال کافی در این محدوده نیست");
        return;
      }
      if (flashTimer.current !== null) {
        window.clearTimeout(flashTimer.current);
        flashTimer.current = null;
      }
      // فاز G2-c — بازخورد کلیک شروع دور (از setup و «دور جدید» نتیجه)
      playSound("click");
      buzz("light");
      // فاز G3-01 — گزینه‌های سطح (عادی: سؤال‌ها خام و بدون تغییر — همان رفتار قبلی)
      const trapPool =
        level === "normal" ? [] : shuffle([...new Set(pool.flatMap((q) => q.options))]);
      const base =
        level === "normal" ? shuffle(pool) : pool.map((q) => shapeOptions(q, level, trapPool));
      // فاز G3-02 — ترتیب هوشمند دور بر اساس SRS ضعیف (شروع سرد = همان شافل قبلی)
      const deck = smartOrderDeck(base, quizKeyOf);
      deckRef.current = deck;
      qiRef.current = 0;
      pendingRef.current = true;
      overRef.current = false;
      tenWarnedRef.current = false;
      if (roundMode === "endless") {
        // فاز G3-05 — بی‌پایان: بدون تایمر معکوس؛ شمارندهٔ زمان صعودی
        elapsedRef.current = 0;
        setElapsed(0);
      } else {
        timeRef.current = totalSecs;
        setTimeLeft(totalSecs);
      }
      setMode(roundMode);
      setQ(deck[0]);
      setQNum(1);
      setScore(0);
      resetCombo();
      setAnswered(0);
      setCorrect(0);
      setWrongList([]);
      setFlash(null);
      setPrevBest(
        loadBest<BestRecord>(id, GAME_KEY, scopeFor(lesson, cat, duration, level, roundMode))
          ?.score ?? null,
      );
      setIsRecord(false);
      setLiveMsg(roundMode === "endless" ? "تمرین بی‌پایان شروع شد — تا هر وقت بخواهی! ∞" : "");
      resume();
      setExitAsk(false);
      // فاز G2-c — جلسهٔ تازهٔ تله‌متری (فاز G3: اسکوپ سطح‌دار / بی‌پایان)
      sessionRef.current = createGameSession({
        game: GAME_KEY,
        level: scopeFor(lesson, cat, duration, level, roundMode),
      });
      sessionRef.current.start();
      setPhase("playing");
    },
    [pool, duration, lesson, cat, id, level, totalSecs, resetCombo, resume],
  );

  /** پایان مسابقهٔ تایم‌دار — فاز G3-01: امتیاز نهایی = levelScore (عادی = همان عدد قبلی) */
  const finish = useCallback(() => {
    if (overRef.current) return;
    overRef.current = true;
    pendingRef.current = false;
    // elapsedSecs = مدت − باقی‌مانده؛ پایان همیشه از تایمر است (باقی‌مانده اینجا صفر است)
    const spent = Math.max(0, totalSecs - timeRef.current);
    touchStreak();
    recordStudySession();
    bumpPlays(id, GAME_KEY);
    // فاز G2-c — پایان عادی جلسهٔ تله‌متری
    sessionRef.current?.end("finish");
    // فاز G2-c — بازخورد صوتی پایان: بهترین کمبوی دور ≥۵ = win (جایگزین finish — الگوی جای خالی)
    playSound(maxCombo >= 5 ? "win" : "finish");
    buzz("success");
    // فاز G3-01 — امتیاز نهایی با ضریب سطح (فقط یک‌بار روی خام — عادی دست‌نخورده)
    const finalScore = levelScore(score, level);
    if (answered > 0) {
      saveAttempt(id, GAME_KEY, {
        lesson: lesson === ALL_LESSON ? 0 : lesson,
        total: answered,
        correct,
        duration: spent,
        detail: { score: finalScore, maxCombo, level },
      });
    }
    const prev = prevBest;
    if (finalScore > 0 && finalScore > (prev ?? 0)) {
      saveBest(id, GAME_KEY, scopeFor(lesson, cat, duration, level, "timed"), {
        score: finalScore,
      });
      // نشان «رکورد جدید» فقط وقتی رکورد قبلی وجود داشت
      setIsRecord(prev !== null);
      // فاز G2-c — رکورد جدید: صدا + لرزش رکورد (الگوی پایلوت memory)
      playSound("record");
      buzz("record");
    } else {
      setIsRecord(false);
    }
    setTimeLeft(0);
    setLiveMsg("زمان تمام شد!");
    setPhase("done");
  }, [answered, correct, score, maxCombo, totalSecs, duration, lesson, cat, id, level, prevBest]);

  /**
   * فاز G3-05 — پایان دور بی‌پایان: فقط با خروج صریح (تأیید نگهبان کیت) صدا زده
   * می‌شود — Attempt با پیشرفت فعلی و همان امضای قبلی ثبت (امتیاز ×۱ بدون
   * levelScore؛ detail.level + detail.endless افزودنی)، جلسهٔ تله‌متری بسته و
   * ResultScreen کیت با آمار فعلی باز می‌شود. رکورد scope «…:endless».
   */
  const finishEndless = useCallback(() => {
    if (overRef.current) return;
    overRef.current = true;
    pendingRef.current = false;
    touchStreak();
    recordStudySession();
    bumpPlays(id, GAME_KEY);
    sessionRef.current?.end("finish");
    playSound(maxCombo >= 5 ? "win" : "finish");
    buzz("success");
    if (answered > 0) {
      saveAttempt(id, GAME_KEY, {
        lesson: lesson === ALL_LESSON ? 0 : lesson,
        total: answered,
        correct,
        duration: elapsedRef.current,
        detail: { score, maxCombo, level, endless: true },
      });
    }
    const scope = scopeFor(lesson, cat, duration, level, "endless");
    const prev = loadBest<BestRecord>(id, GAME_KEY, scope);
    if (score > 0 && score > (prev?.score ?? 0)) {
      saveBest(id, GAME_KEY, scope, { score });
      setIsRecord(prev !== null);
      playSound("record");
      buzz("record");
    } else {
      setIsRecord(false);
    }
    setElapsed(elapsedRef.current);
    setLiveMsg("تمرین بی‌پایان تمام شد!");
    setPhase("done");
  }, [answered, correct, score, maxCombo, lesson, cat, duration, id, level]);

  const answer = useCallback(
    (idx: number) => {
      if (overRef.current || paused || !q || !pendingRef.current) return;
      // فاز G3-01 — کلید بیرون از تعداد گزینهٔ سطح (۳/۴/۵) بی‌اثر است؛ در عادی هرگز رخ نمی‌دهد
      if (idx < 0 || idx >= q.options.length) return;
      pendingRef.current = false;
      if (idx === q.answer) {
        // درست — کمبو و امتیاز از موتور مشترک کیت (فاز G2-c): base(۱۰) × ضریب کمبوی تازه
        // = دقیقاً همان 10 * multiplierOf(combo+1) قبلی
        const gained = registerCorrect();
        setScore((s) => s + gained);
        setCorrect((c) => c + 1);
        playSound("correct");
        buzz("success");
        setLiveMsg(`درست بود! کمبو ${faNum(comboRef.current)} — +${faNum(gained)} امتیاز 🎉`);
        // تلفظ گزینهٔ درست فقط برای واژگان — بدون await تا جریان بازی کند نشود
        if (q.category === "vocabulary") void speak(q.options[idx], { speed });
      } else {
        // غلط — کمبو صفر (registerMiss)؛ واژهٔ واژگانیِ غلط‌زده به صف مرور برمی‌گردد (گرامر: هیچ)
        registerMiss();
        playSound("wrong");
        buzz("error");
        if (q.category === "vocabulary") {
          const word = q.options[q.answer];
          seedReviewFromQuiz(word);
          // فاز G2-c — برای «مرور خطاها»ی صفحهٔ نتیجه (معنی از بانک واژگان کتاب)
          const back = meaningMap.get(word.trim().toLowerCase()) ?? "—";
          setWrongList((prevList) =>
            prevList.some((w) => w.front === word) ? prevList : [...prevList, { front: word, back }],
          );
        }
        setFlash("bad");
        if (flashTimer.current !== null) window.clearTimeout(flashTimer.current);
        flashTimer.current = window.setTimeout(() => setFlash(null), 480);
        setLiveMsg(`غلط بود — پاسخ «${q.options[q.answer]}» بود`);
      }
      setAnswered((a) => a + 1);
      setQNum((n) => n + 1);
      drawNext(); // فوراً — «برقی»!
    },
    [q, speed, drawNext, paused, registerCorrect, registerMiss, comboRef, meaningMap],
  );

  const skip = useCallback(() => {
    if (overRef.current || paused || !pendingRef.current) return;
    pendingRef.current = false;
    registerMiss();
    setLiveMsg("رد شد — کمبو صفر شد");
    setQNum((n) => n + 1);
    drawNext();
  }, [drawNext, paused, registerMiss]);

  // انصراف حین دور — فاز G2-c (نگهبان خروج): با حداقل یک پاسخ، GameExitGuard؛
  // بدون هیچ پاسخی، خروج مستقیم + تله‌متری abandon.
  // توجه: پایان زمان (done) خودش Attempt ثبت کرده — خروج از حالت نتیجه از مسیر ResultScreen
  // است نه نگهبان؛ نگهبان فقط حین دورِ در جریان باز می‌شود.
  // فاز G3-05 — در دور بی‌پایان، تأیید همین نگهبان = پایان صریح دور (Attempt با پیشرفت فعلی
  // ثبت و ResultScreen باز می‌شود) — see finishEndless؛ بدون پاسخ، همان خروج مستقیم قبلی.
  const handleExitClick = useCallback(() => {
    stopSpeaking();
    if (answered > 0) {
      setExitAsk(true);
    } else {
      // دور بدون پیشرفت هم یک جلسه است؛ همین‌جا رهاشده ثبت می‌شود
      sessionRef.current?.abandon("exit");
      overRef.current = true;
      resume();
      setPhase("setup");
    }
  }, [answered, resume]);

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
  // فاز G2-c — گیت روی paused: توقف دستی یا خودکارِ تب مخفی هیچ تیکی جلو نمی‌برد؛
  // + تیک‌تاک صوتی ۱۰ ثانیهٔ آخر (هر ثانیه یک‌بار — موتور صدا گارد بی‌صدا دارد) و
  // اعلام یک‌بارهٔ «۱۰ ثانیه مانده!» در aria-live.
  // فاز G3-05 — دور بی‌پایان: به‌جای معکوس، شمارندهٔ صعودی زمان با همان گاردهای visibility
  useEffect(() => {
    if (phase !== "playing" || paused) return;
    if (mode === "endless") {
      let ivUp: number | null = null;
      const startUp = () => {
        if (ivUp !== null) return;
        ivUp = window.setInterval(() => {
          elapsedRef.current += 1;
          setElapsed(elapsedRef.current);
        }, 1000);
      };
      const stopUp = () => {
        if (ivUp !== null) {
          window.clearInterval(ivUp);
          ivUp = null;
        }
      };
      const onVisUp = () => {
        if (document.visibilityState === "hidden") stopUp();
        else startUp();
      };
      const onPageshowUp = (e: PageTransitionEvent) => {
        if (!e.persisted) return;
        stopUp();
        if (document.visibilityState === "visible") startUp();
      };
      startUp();
      document.addEventListener("visibilitychange", onVisUp);
      window.addEventListener("pageshow", onPageshowUp);
      return () => {
        stopUp();
        document.removeEventListener("visibilitychange", onVisUp);
        window.removeEventListener("pageshow", onPageshowUp);
      };
    }
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
        } else if (timeRef.current <= 10) {
          // فاز G2-c — تیک‌تاک ۱۰ ثانیهٔ آخر + اعلام یک‌بارهٔ aria در لحظهٔ رسیدن به ۱۰
          if (timeRef.current === 10 && !tenWarnedRef.current) {
            tenWarnedRef.current = true;
            setLiveMsg("۱۰ ثانیه مانده! ⏱");
          }
          playSound("tick");
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
  }, [phase, paused, mode]);

  // میان‌بر کیبورد ۱..۴ (فارسی/انگلیسی) برای انتخاب گزینه — setState داخل callback رویداد
  // فاز G2-c — گارد توقف/پنجرهٔ باز نگهبان (سطح effect) + گارد تکرار کلید و میان‌برهای مرورگر
  useEffect(() => {
    if (phase !== "playing" || paused || exitAsk) return;
    function onKey(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.repeat) return; // نگه‌داشتن کلید نباید چند سؤال را پشت‌سرهم پاسخ دهد
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      // فاز G3-01 — کلیدهای ۱ تا ۵ (سخت ۵ گزینه دارد؛ بیرون از گزینه‌ها در answer گارد می‌شود)
      const fa = "۱۲۳۴۵".indexOf(e.key);
      const en = "12345".indexOf(e.key);
      const digit = fa >= 0 ? fa : en;
      if (digit >= 0) {
        e.preventDefault();
        answerRef.current?.(digit);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, paused, exitAsk]);

  // فاز G2-c — دورِ باز در unmount «رهاشده» ثبت می‌شود (اگر قبلاً گزارش شده باشد no-op)
  useEffect(
    () => () => {
      sessionRef.current?.abandon("unmount");
      stopSpeaking();
      if (flashTimer.current !== null) window.clearTimeout(flashTimer.current);
    },
    [],
  );

  const chipCls = (active: boolean) =>
    cn(
      "flex min-h-11 items-center rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
      active
        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
        : "text-muted-foreground hover:bg-muted",
    );

  // ── Setup ──
  if (phase === "setup") {
    return (
      <>
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
              <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب محدودهٔ سؤال">
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
              <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب دستهٔ سؤال">
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
              <div className="flex flex-wrap gap-2" role="group" aria-label="مدت مسابقه">
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

            {/* فاز G3-01 — انتخاب سطح دشواری ماندگار (کیت difficulty) */}
            <DifficultyPicker value={level} onChange={changeLevel} />
            <p className="-mt-3 text-[11px] leading-5 text-muted-foreground">
              {level === "easy"
                ? `در این سطح: ${faNum(optionsFor(level, 3, 5))} گزینه · مدت ${faNum(duration)} ثانیه‌ای = ${faNum(totalSecs)} ثانیه · امتیاز ×۰٫۷`
                : level === "hard"
                  ? `در این سطح: ${faNum(optionsFor(level, 3, 5))} گزینه (یک مزاحم اضافه) · مدت ${faNum(duration)} ثانیه‌ای = ${faNum(totalSecs)} ثانیه · امتیاز ×۱٫۶`
                  : "در این سطح: همان تجربهٔ اصلی — ۴ گزینه و تایمر کامل"}
            </p>
            {/* فاز G3-02 — تمرکز هوشمند دور روی کارت‌های ضعیف/سررسید SRS */}
            {weakCount > 0 && (
              <p
                role="status"
                aria-live="polite"
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400"
              >
                🎯 مرکز این دور: {faNum(weakCount)} واژهٔ ضعیف تو
              </p>
            )}

            {best !== null && (
              <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
                <Trophy size={12} />
                بهترین امتیاز: {faNum(best)}
              </Badge>
            )}

            {/* فاز G3-05 — شروع تایم‌دار یا تمرین بی‌پایان (دکمهٔ جدا — هر دو min-h-11+) */}
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                size="lg"
                className="h-12 w-full gap-2 text-base sm:flex-1"
                onClick={() => startRound("timed")}
              >
                <Play size={18} />
                شروع مسابقه
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 w-full gap-2 text-base sm:flex-1"
                onClick={() => startRound("endless")}
              >
                <InfinityIcon size={18} />
                تمرین بی‌پایان ∞
              </Button>
            </div>
            <p className="text-center text-[11px] leading-5 text-muted-foreground">
              تمرین بی‌پایان: بدون تایمر پایان — تا هر وقت بخواهی؛ با «انصراف» آمار همین لحظه ثبت و
              صفحهٔ نتیجه باز می‌شود (رکورد جدا).
            </p>
          </CardContent>
        </Card>
        {/* فاز G2-c — آموزش یک‌بارنمایش در اولین ورود */}
        <TutorialOverlay
          game={GAME_KEY}
          steps={TUTORIAL_STEPS}
          open={tutorialOpen}
          onOpenChange={handleTutorialOpenChange}
        />
      </>
    );
  }

  // ── Done — فاز G2-c: صفحهٔ نتیجهٔ استاندارد کیت (رتبهٔ شخصی در عنوان حفظ شد) ──
  // فاز G3-05 — نتیجهٔ بی‌پایان: عنوان و امتیاز ×۱ مخصوص خودش (بدون levelScore)
  if (phase === "done") {
    const rank = rankOf(score);
    const acc = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    // ستاره‌بندی per-game (پیشنهاد تسک): دقت ≥۹۰٪ = ۳ ستاره، ≥۷۰٪ = ۲ ستاره، بقیه ۱
    const stars = acc >= 90 ? 3 : acc >= 70 ? 2 : 1;
    const finalScore = mode === "endless" ? score : levelScore(score, level);
    return (
      <ResultScreen
        title={mode === "endless" ? "تمرین بی‌پایان تمام شد!" : `زمان تمام شد — ${rank.label}!`}
        stars={stars}
        isRecord={isRecord}
        errorCount={wrongList.length}
        reviewItems={wrongList}
        stats={[
          { label: "امتیاز", value: faNum(finalScore), icon: <Star size={16} className="text-amber-500" /> },
          { label: "دقت", value: `${faNum(acc)}٪`, icon: <Target size={16} className="text-teal-500" /> },
          { label: "بهترین کمبو", value: `×${faNum(maxCombo)}`, icon: <Flame size={16} className="text-amber-500" /> },
        ]}
        onReplay={() => startRound(mode)}
        onExit={() => setPhase("setup")}
        exitLabel="تنظیمات"
      />
    );
  }

  // ── Playing ──
  if (!q) return null;
  // فاز G3-05 — در بی‌پایان: بج زمان صعودی است، فوریت قرمز و نوار پیشرفت معنی ندارد
  const isEndless = mode === "endless";
  const pct = Math.max(0, Math.min(100, Math.round((timeLeft / totalSecs) * 100)));
  const urgent = !isEndless && timeLeft <= 5;
  return (
    <>
      {/* فاز G2-c — CSS افکت combo-fire (کلاس مشترک کیت؛ کلیدفریمز محلی + reduced-motion) */}
      <style>{COMBO_FIRE_CSS}</style>
      {/* فاز G2-c — هدر یکنواخت از کیت: نام + بج‌ها + راهنما/توقف/صدا/انصراف */}
      <GameShell
        title={isEndless ? "تست برقی — تمرین بی‌پایان" : "تست برقی"}
        icon={isEndless ? <InfinityIcon size={18} /> : <Zap size={18} />}
        stats={
          <>
            <Badge
              variant="outline"
              className={cn(
                "gap-1.5 px-2.5 py-1 text-[13px] font-black",
                urgent && "border-destructive/60 bg-destructive/10 text-destructive",
              )}
            >
              <Clock size={13} />
              {isEndless ? fmtTime(elapsed) : fmtTime(timeLeft)}
            </Badge>
            <Badge key={score} variant="secondary" className="match-pop gap-1.5 px-2.5 py-1 text-[13px] font-black">
              <Star size={13} className="text-amber-500" />
              {faNum(score)}
            </Badge>
            {combo >= 2 ? (
              <Badge
                variant="outline"
                className={cn(
                  "gap-1.5 border-amber-500/50 bg-amber-500/10 px-2.5 py-1 text-[13px] font-black text-amber-600 dark:text-amber-400",
                  // فاز G2-c — افکت بصری واحد کیت وقتی ضریب > ۱ (با احترام به reduced-motion)
                  multiplier > 1 && COMBO_FIRE_CLASS,
                  "motion-reduce:animate-none",
                )}
              >
                <Flame size={13} />
                ×{faNum(multiplier)}
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
          </>
        }
        liveMsg={liveMsg}
        progress={
          isEndless ? undefined : (
          /* نوار زمان — همان پیشرفت قبلی (فوریت رنگ در ۵ ثانیهٔ آخر حفظ شد) */
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
          )
        }
        paused={paused}
        onPauseToggle={togglePause}
        muted={muted}
        onMuteToggle={() => setMuted(toggleSoundMuted())}
        onHelp={handleHelp}
        onExit={handleExitClick}
      >
        <div className="relative">
          <div className={cn("space-y-4", paused && "pointer-events-none blur-sm")} aria-hidden={paused}>
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

          {/* فاز G2-c — اورلی توقف (الگوی کیت): در تست برقی «برق» موقتاً قطع می‌شود */}
          {paused && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl bg-background/80 backdrop-blur-sm">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                <Pause size={26} />
              </span>
              <p className="text-sm font-black">برق قطع شد! ⏸</p>
              <Button onClick={resume} className="h-11 gap-2">
                <Play size={16} />
                ادامهٔ بازی
              </Button>
            </div>
          )}
        </div>

        {/* فاز G2-c — نگهبان خروج استاندارد کیت · فاز G3-05 — در بی‌پایان تأیید = پایان صریح دور */}
        <GameExitGuard
          open={exitAsk}
          onOpenChange={setExitAsk}
          title={isEndless ? "تمرین بی‌پایان را تمام کنم؟ ⏹" : undefined}
          description={
            isEndless
              ? "آمار همین لحظهٔ دور ثبت می‌شود و صفحهٔ نتیجه باز می‌شود."
              : undefined
          }
          confirmLabel={isEndless ? "آره، تمام کن" : undefined}
          onConfirm={() => {
            if (isEndless) {
              // فاز G3-05 — خروج صریح = Attempt با پیشرفت فعلی + ResultScreen
              setExitAsk(false);
              resume();
              finishEndless();
              return;
            }
            // رهاکردن دور نیمه‌کاره + تله‌متری
            sessionRef.current?.abandon("exit");
            overRef.current = true;
            stopSpeaking();
            setExitAsk(false);
            resume();
            setPhase("setup");
          }}
        />
      </GameShell>
      {/* فاز G2-c — راهنمای دکمهٔ شِل (حین بازی با توقف باز می‌شود) */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
