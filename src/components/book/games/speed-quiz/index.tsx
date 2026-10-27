"use client";

/**
 * گام ۹ نقشهٔ docs/refactor-roadmap-2.md — تفکیک مکانیکی از speed-quiz-game.tsx (پلی‌بوک fps/)؛
 * JSX بایت‌به‌بایت منتقل شده است (صحه‌گذاری: tool-results/t9-a/verify.ts).
 * index.tsx = فقط موتور/ارکستراسیون — نمای‌ها: setup-panel/done-view/playing-view؛
 * منطق خالص: helpers.ts + ai.ts؛ ثابت‌ها و تایپ‌های مشترک: types.ts.
 */

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
 *
 * فاز G5-02 — سؤال‌های هوشمند ✨: سوییچ setup (پیش‌فرض خاموش) → پیش از شروع دور تا ۳
 * سؤال معنی‌محور از /api/game-questions (سؤال‌ساز AI) گرفته و سرِ deck می‌نشیند — فقط
 * از واژگان همان محدودهٔ دور (همان منبع واژگانی بازی) با والیدیشن دوطرفه سرور+کلاینت؛
 * هر خطا/تایم‌اوت = توست و دور کاملاً عادی (بازی هرگز بلاک نمی‌شود). پاسخ درست/غلط
 * سؤال هوشمند روی همان مسیر SRS/تلفظ/مرور خطاها می‌رود (aiWord = واژهٔ انگلیسی خود
 * جزوه). دورِ دارای سؤال هوشمند detail را با پرچم source:"ai" ثبت می‌کند. هیچ کلید
 * localStorage جدیدی و هیچ تغییری در امضای saveAttempt/saveBest/bumpPlays ندارد.
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
import { toast } from "sonner";
import type { QuizQuestionSeed } from "@/data/types";
import { useBook, useBookData } from "@/lib/book-context";
import { recordStudySession } from "@/lib/goal-store";
import { speak, stopSpeaking } from "@/lib/speak";
import { seedReviewFromQuiz } from "@/lib/srs-store";
import { touchStreak } from "@/lib/streak-store";
import { useVoiceSpeed } from "@/lib/voice-store";
import {
  bumpPlays,
  faNum,
  loadBest,
  saveAttempt,
  saveBest,
  shuffle,
  subscribeGameData,
} from "../shared";
import { useCombo } from "../kit/combo-engine";
import {
  LEVEL_KNOBS,
  levelScore,
  loadLevelPref,
  saveLevelPref,
  scopeWithLevel,
  type DifficultyKey,
} from "../kit/difficulty";
import { buzz } from "../kit/haptics";
import { isSoundMuted, playSound } from "../kit/sound-engine";
import { countWeak } from "../kit/smart-pick";
import { createGameSession, type GameSessionTracker } from "../kit/telemetry";
import { useAutoTutorial } from "../kit/tutorial-overlay";
import { useGamePause } from "../kit/use-pause";
import {
  AI_MIN_POOL,
  AI_POOL_SAMPLE,
  aiQuestionsToSeeds,
  fetchAiQuestions,
  isAiSeed,
} from "./ai";
import { scopeFor, scopeOf, quizKeyOf, shapeOptions, smartOrderDeck } from "./helpers";
import {
  ALL_LESSON,
  GAME_KEY,
  MIN_POOL,
  type BestRecord,
  type CatKey,
  type Phase,
  type RoundMode,
  type WrongItem,
} from "./types";
import { DoneView } from "./done-view";
import { PlayingView } from "./playing-view";
import { SetupPanel } from "./setup-panel";

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
  // فاز G5-02 — سوییچ «سؤال‌های هوشمند»: state محلی، پیش‌فرض خاموش (بدون کلید localStorage جدید)
  const [aiOn, setAiOn] = useState(false);
  /** فاز G5-02 — دکمه‌ای که سؤال‌ساز را منتظر است (اسپینر روی همان دکمه) */
  const [pendingMode, setPendingMode] = useState<RoundMode | null>(null);
  const aiBusyRef = useRef(false);
  const aiAbortRef = useRef<AbortController | null>(null);
  /** فاز G5-02 — دورِ جاری دست‌کم یک سؤال هوشمند دارد؟ (پرچم detail.source) */
  const aiRoundRef = useRef(false);
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

  // فاز G5-02 — استخر واژهٔ سؤال‌ساز هوشمند: واژگان همان محدودهٔ دور (word/meaning خود جزوه؛
  // فقط اعضای در سقف ۸۰ نویسهٔ قرارداد API)
  const aiVocabPool = useMemo(() => {
    const entries =
      lesson === ALL_LESSON ? data.vocab.all : data.vocab.all.filter((v) => v.lesson === lesson);
    const seen = new Set<string>();
    const out: { word: string; meaning: string }[] = [];
    for (const v of entries) {
      const word = v.word
        .replace(/\s*\([^)]*\)\s*/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      const meaning = v.meaning.replace(/\s+/g, " ").trim();
      const key = word.toLowerCase();
      if (!word || !meaning || word.length > 80 || meaning.length > 80 || seen.has(key)) continue;
      seen.add(key);
      out.push({ word, meaning });
    }
    return out;
  }, [data.vocab.all, lesson]);

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
   * مسیر عادی (level=normal, timed, بدون سؤال هوشمند) دقیقاً همان ثابت‌های قبلی را
   * مصرف می‌کند: shapeOptions در عادی خودش early-return می‌کند و totalSecs = همان مدت
   * انتخابی است. فاز G5-02 — سؤال‌های هوشمند (اگرAi بودند) سرِ deck می‌نشینند.
   */
  const startRound = useCallback(
    (roundMode: RoundMode, aiSeeds: QuizQuestionSeed[]) => {
      if (pool.length < MIN_POOL) {
        toast.error("سؤال کافی در این محدوده نیست");
        return;
      }
      if (flashTimer.current !== null) {
        window.clearTimeout(flashTimer.current);
        flashTimer.current = null;
      }
      // (بازخورد کلیک به beginRound منتقل شد — فاز G5-02: قبل از انتظار سؤال‌ساز)
      // فاز G3-01 — گزینه‌های سطح (عادی: سؤال‌ها خام و بدون تغییر — همان رفتار قبلی)
      const trapPool =
        level === "normal" ? [] : shuffle([...new Set(pool.flatMap((q) => q.options))]);
      const base =
        level === "normal" ? shuffle(pool) : pool.map((q) => shapeOptions(q, level, trapPool));
      // فاز G3-02 — ترتیب هوشمند دور بر اساس SRS ضعیف (شروع سرد = همان شافل قبلی)
      // فاز G5-02 — سؤال‌های هوشمند سرِ دور؛ ترتیب هوشمند فقط روی سؤال‌های عادی (کلید SRS
      // سؤال هوشمند داخل این تابع استفاده نمی‌شود تا با واژهٔ خود جزوه قاطی نشود)
      const deck = [...aiSeeds, ...smartOrderDeck(base, quizKeyOf)];
      // فاز G5-02 — پرچم «دور دارای سؤال هوشمند» برای detail.source
      aiRoundRef.current = aiSeeds.length > 0;
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

  /**
   * فاز G5-02 — شروع دور: اگر سوییچ هوشمند روشن است، اول سؤال‌ساز صدا زده می‌شود
   * (نمونهٔ تا ۲۰ واژه از واژگان همان محدوده؛ مهلت ۸ث + AbortController) و بازخورد
   * کلیک بلافاصله پخش می‌شود. هر خطا/تایم‌اوت/پاسخ نامعتبر = توست و دور کاملاً عادی —
   * بازی هرگز بلاک نمی‌شود.
   */
  const beginRound = useCallback(
    async (roundMode: RoundMode) => {
      if (pool.length < MIN_POOL) {
        toast.error("سؤال کافی در این محدوده نیست");
        return;
      }
      if (aiBusyRef.current) return; // نگهبان دوبار-کلیک حین آماده‌سازی
      // فاز G2-c — بازخورد کلیک شروع دور (از setup و «دور جدید» نتیجه)
      playSound("click");
      buzz("light");
      let aiSeeds: QuizQuestionSeed[] = [];
      if (aiOn && aiVocabPool.length >= AI_MIN_POOL) {
        aiBusyRef.current = true;
        setPendingMode(roundMode);
        const ctrl = new AbortController();
        aiAbortRef.current = ctrl;
        const sample = shuffle(aiVocabPool).slice(0, AI_POOL_SAMPLE);
        const questions = await fetchAiQuestions("speed-quiz", sample, ctrl);
        aiBusyRef.current = false;
        aiAbortRef.current = null;
        setPendingMode(null);
        if (questions) {
          aiSeeds = aiQuestionsToSeeds(
            questions,
            aiVocabPool,
            lesson === ALL_LESSON ? 0 : lesson,
            level,
          );
        }
        if (aiSeeds.length === 0) {
          toast.error("سؤال هوشمند آماده نشد — با سؤال‌های عادی ادامه می‌دهیم");
        }
      }
      startRound(roundMode, aiSeeds);
    },
    [pool, aiOn, aiVocabPool, lesson, level, startRound],
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
        // فاز G5-02 — دورِ دارای دست‌کم یک سؤال هوشمند → پرچم source:"ai" (بدون سؤال
        // هوشمند = دقیقاً همان شیء قبلی). امضای saveAttempt تغییر نکرده.
        detail: {
          score: finalScore,
          maxCombo,
          level,
          ...(aiRoundRef.current ? { source: "ai" as const } : {}),
        },
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
        // فاز G3-05 — detail.level + detail.endless افزودنی
        // فاز G5-02 — پرچم source:"ai" برای دورِ دارای سؤال هوشمند
        detail: {
          score,
          maxCombo,
          level,
          endless: true,
          ...(aiRoundRef.current ? { source: "ai" as const } : {}),
        },
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
        // فاز G5-02 — سؤال هوشمند: گزینه‌ها معنی فارسی‌اند؛ واژهٔ انگلیسی خود جزوه تلفظ می‌شود
        if (q.category === "vocabulary") void speak(isAiSeed(q) ? q.aiWord : q.options[idx], { speed });
      } else {
        // غلط — کمبو صفر (registerMiss)؛ واژهٔ واژگانیِ غلط‌زده به صف مرور برمی‌گردد (گرامر: هیچ)
        registerMiss();
        playSound("wrong");
        buzz("error");
        if (q.category === "vocabulary") {
          // فاز G5-02 — سؤال هوشمند: کلید SRS = واژهٔ انگلیسیِ خود جزوه (نه معنی فارسی گزینه)
          const word = isAiSeed(q) ? q.aiWord : q.options[q.answer];
          seedReviewFromQuiz(word);
          // فاز G2-c — برای «مرور خطاها»ی صفحهٔ نتیجه (معنی از بانک واژگان کتاب)
          // فاز G5-02 — سؤال هوشمند: معنی درست همان گزینهٔ درست خودش است
          const back = isAiSeed(q)
            ? q.options[q.answer]
            : (meaningMap.get(word.trim().toLowerCase()) ?? "—");
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
  // فاز G5-02 — درخواست معلق سؤال‌ساز هوشمند هم لغو می‌شود
  useEffect(
    () => () => {
      sessionRef.current?.abandon("unmount");
      stopSpeaking();
      if (flashTimer.current !== null) window.clearTimeout(flashTimer.current);
      aiAbortRef.current?.abort();
    },
    [],
  );

  // ── Setup ──
  if (phase === "setup") {
    return (
      <SetupPanel
        lesson={lesson}
        setLesson={setLesson}
        cat={cat}
        setCat={setCat}
        duration={duration}
        setDuration={setDuration}
        lessons={lessons}
        countFor={countFor}
        level={level}
        changeLevel={changeLevel}
        totalSecs={totalSecs}
        weakCount={weakCount}
        best={best}
        aiOn={aiOn}
        setAiOn={setAiOn}
        beginRound={beginRound}
        pendingMode={pendingMode}
        tutorialOpen={tutorialOpen}
        handleTutorialOpenChange={handleTutorialOpenChange}
      />
    );
  }

  // ── Done — فاز G2-c: صفحهٔ نتیجهٔ استاندارد کیت (رتبهٔ شخصی در عنوان حفظ شد) ──
  // فاز G3-05 — نتیجهٔ بی‌پایان: عنوان و امتیاز ×۱ مخصوص خودش (بدون levelScore)
  if (phase === "done") {
    return (
      <DoneView
        score={score}
        mode={mode}
        level={level}
        answered={answered}
        correct={correct}
        wrongList={wrongList}
        isRecord={isRecord}
        maxCombo={maxCombo}
        levelTag={scopeFor(lesson, cat, duration, level, mode)}
        beginRound={beginRound}
        setPhase={setPhase}
      />
    );
  }

  // ── Playing ──
  if (!q) return null;
  return (
    <PlayingView
      q={q}
      mode={mode}
      timeLeft={timeLeft}
      totalSecs={totalSecs}
      elapsed={elapsed}
      score={score}
      combo={combo}
      multiplier={multiplier}
      qNum={qNum}
      liveMsg={liveMsg}
      paused={paused}
      resume={resume}
      togglePause={togglePause}
      muted={muted}
      setMuted={setMuted}
      exitAsk={exitAsk}
      setExitAsk={setExitAsk}
      finishEndless={finishEndless}
      sessionRef={sessionRef}
      overRef={overRef}
      setPhase={setPhase}
      answer={answer}
      skip={skip}
      flash={flash}
      handleHelp={handleHelp}
      handleExitClick={handleExitClick}
      tutorialOpen={tutorialOpen}
      handleTutorialOpenChange={handleTutorialOpenChange}
    />
  );
}
