"use client";

/**
 * گام ۹ نقشهٔ docs/refactor-roadmap-2.md — تفکیک مکانیکی از flappy-quiz-game.tsx (پلی‌بوک fps/)؛
 * JSX بایت‌به‌بایت منتقل شده است — نقشهٔ ماژول‌ها: types/helpers/render/use-flappy-data +
 * setup-panel/playing-view/done-view و این فایل (موتور: state، حلقهٔ rAF، جریان دور و ارکستراسیون نماها).
 */

/**
 * بازی «فلپی گزینش» (Flappy Quiz) — فاز ۴ نقشه راه جامع ۲۰۲۶ + فاز G2-c نقشه راه بازی‌ها.
 *
 * پرندهٔ فلپی‌برد روی بانک واژگان خود جزوه پرواز می‌کند (data.quiz.seed فقط category === "vocabulary"):
 * - به‌جای لوله‌ها «دروازهٔ گزینه» می‌آید: نوار عمودی emerald با ۲ تا ۴ دهانه که روی هر دهانه
 *   یک گزینهٔ انگلیسی نوشته شده — پرنده باید دقیقاً از گزینهٔ درستِ سؤال رد شود.
 * - عبور درست: امتیاز ۱۰ + بونوس کمبو، کمبو++ و سرعت = پایه + کمبو × گام (با سقف) + پخش تلفظ گزینه.
 * - دهانهٔ غلط یا برخورد با بدنهٔ دیوار: یک ❤ کم، کمبو صفر، فلاش قرمز، واژهٔ درست با
 *   seedReviewFromQuiz به صف «مرور هوشمند» برمی‌گردد و ۱ ثانیه مصونیت دارد.
 * - زمین/سقف: یک ❤ کم و پرنده به میانه برمی‌گردد. صفر قلب = پایان دور.
 * - اتمام استخر سؤال → reshuffle و ادامه (چرخهٔ بی‌پایان، الگوی speed-quiz).
 *
 * فاز G2-c (کیت GameKit v2 — الگوی پایلوت memory / جای خالی):
 * - کمبو به موتور مشترک منتقل شد (G1-09): useCombo({ mode: "bonus", base: 10, bonusCap: 5,
 *   bonusStep: 2 }) — فرمول امتیاز مو‌به‌مو همان قبل است: ۱۰ + min(کمبو−۱, ۵) × ۲
 *   (عبور اول ۱۰، دوم ۱۲، … تا سقف ۲۰). refs هوک (comboRef/maxComboRef) مستقیم در حلقهٔ
 *   rAF مصرف می‌شوند و state کمبو دوبل نگه‌داشته نمی‌شود.
 * - بازخورد سه‌کاناله: عبور درست = correct + لرزش سبک، خطای دیوار/زمین = wrong + error
 *   (هر دو فقط در لحظهٔ resolve رویداد داخل rAF، نه هر فریم)؛ پایان = finish؛ رکورد = record.
 * - GameShell (هدر یکنواخت: امتیاز/کمبو با کلاس واحد combo-fire/قلب + سؤال دیوار در progress
 *   + liveMsg) + Pause با گیت روی زنجیرهٔ rAF (اورلی «متوقف شد»؛ auto-pause تب مخفی از هوک
 *   و منطق توقف همان مسیر G0-05) + نگهبان خروج حین پرواز + ResultScreen (ستاره‌بندی per-game
 *   و مرور خطاها با معنی واژه) + آموزش ۳گامی (useAutoTutorial) + تله‌متری جلسه.
 *
 * فاز G3-05 (تمرین بی‌پایان — نقشه راه بازی‌ها؛ فقط فلپی — speed-quiz عامل دیگری):
 * - دکمهٔ جدا «تمرین بی‌پایان ∞» کنار «شروع پرواز» در setup (پذیرش: دکمهٔ جدا).
 * - در این حالت هیچ‌چیز دور را تمام نمی‌کند: پاسخ غلط/برخورد قلب کم نمی‌کند — فقط کمبو
 *   صفر و جریمهٔ فعلی همان است (ریست سرعت، فلاش، مصونیت، صف مرور SRS، صدا/لرزش).
 *   حلقهٔ rAF و توقف/نگهبان خروج/آموزش/صدا/لرزش همان مسیرهای فعلی کیت می‌مانند.
 * - پایان فقط با خروج صریح: دکمهٔ «پایان پرواز» در اورلی توقف (تله‌متری end reason=finish)
 *   یا تأیید نگهبان خروج کیت (همان قرارداد فعلی خروج وسط دور = abandon reason=exit) —
 *   در لحظهٔ خروج Attempt با پیشرفت فعلی ثبت می‌شود (امضای saveAttempt عیناً موجود؛
 *   detail فقط افزودنی endless=true) + ResultScreen کیت با آمار امتیاز/بیشترین کمبو/زمان پرواز.
 * - رکورد scope افزودنی (الگوی تأییدشدهٔ وردل infinite:4): easy:endless / normal:endless
 *   با همان loadBest/saveBest. Attempt بی‌پایان هرگز جز با خروج صریح ثبت نمی‌شود.
 * - استخر سؤال بی‌پایان با smartPick کیت (G3-02) چیده می‌شود — اولویت کارت‌های SRS
 *   ضعیف/سررسید + countWeak برای خط «🎯 مرکز این دور: N واژهٔ ضعیف تو» در setup.
 *   حالت عادی بازی: صفر تغییر رفتار (قلب‌ها/پایان/رکورد/Attempt/استخر عین قبل).
 *
 * نکتهٔ فنی: کل دنیای بازی (پرنده، دیوارها، سرعت، کمبو، قلب‌ها) در useRef زندگی می‌کند و حلقهٔ
 * requestAnimationFrame مالک آن است — setState فقط روی رویدادهای گسسته (عبور/برخورد/پایان)
 * صدا می‌زند، نه در هر فریم. فیزیک dt-based است (مستقل از نرخ فریم) با clamp dt≤۵۰ms و
 * rAF/شنونده‌ها در cleanup پاک می‌شوند. رکورد شخصی per-scope ("easy" | "normal") و Attempt
 * سروری فقط پس از پایان. امضاهای saveAttempt/saveBest/bumpPlays و کلیدهای localStorage
 * دست‌نخورده — قانون حفظ‌شوندگی §۳-۴ سند بازی‌ها.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import type { QuizQuestionSeed } from "@/data/types";
import { useBook, useBookData } from "@/lib/book-context";
import { seedReviewFromQuiz } from "@/lib/srs-store";
import { touchStreak } from "@/lib/streak-store";
import { recordStudySession } from "@/lib/goal-store";
import { speak, stopSpeaking } from "@/lib/speak";
import { useVoiceSpeed } from "@/lib/voice-store";
import { bumpPlays, faNum, loadBest, pickUnique, saveAttempt, saveBest, shuffle } from "../shared";
// فاز G2-c — کیت GameKit v2 (قرارداد API سند)
import { playSound, isSoundMuted } from "../kit/sound-engine";
import { buzz } from "../kit/haptics";
import { useGamePause } from "../kit/use-pause";
import { useAutoTutorial } from "../kit/tutorial-overlay";
import { createGameSession, type GameSessionTracker } from "../kit/telemetry";
import { useCombo } from "../kit/combo-engine";
// فاز G3-05 — انتخاب هوشمند واژهٔ کیت (G3-02) — فقط برای استخر سؤال «تمرین بی‌پایان»
import { smartPick } from "../kit/smart-pick";
import {
  ALL_LESSONS, BIRD_R, EASY_CFG, FLASH_MS, GAME_KEY, GROUND_H, H, HEARTS, INVULN_MS,
  MIN_POOL, NORMAL_CFG, WALL_FLASH_MS, WALL_W, type BestRecord, type BirdState, type Cfg,
  type FlappyWall, type Phase, type Popup,
} from "./types";
import { layoutGaps } from "./helpers";
import { drawBird, drawGround, drawSky, drawWall } from "./render";
import { ENDLESS_TUTORIAL_STEP, SetupPanel, TUTORIAL_STEPS } from "./setup-panel";
import { PlayingView } from "./playing-view";
import { DoneView } from "./done-view";
import { useFlappyData } from "./use-flappy-data";

export function FlappyQuizGame() {
  const data = useBookData();
  const { bookId } = useBook();
  // بازی‌ها فقط داخل کتاب فعال رندر می‌شوند (useBookData بالا گارد است) — bookId عملاً هرگز null نیست
  const activeBookId: string = bookId ?? "";
  const { speed } = useVoiceSpeed();

  const [phase, setPhase] = useState<Phase>("setup");
  const [lesson, setLesson] = useState<number>(ALL_LESSONS);
  const [easy, setEasy] = useState(false);
  /** فاز G3-05 — حالت «تمرین بی‌پایان» (state برای UI، ref برای حلقهٔ rAF) */
  const [endless, setEndless] = useState(false);
  const endlessRef = useRef(false);

  // ── HUD حین بازی (فقط روی رویدادهای گسسته به‌روز می‌شود) ──
  const [hudQ, setHudQ] = useState<QuizQuestionSeed | null>(null);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(HEARTS);
  /** فاز G2-c — پیام باکس aria-live شِل (عبور/خطا/توقف) برای فناوری‌های کمکی */
  const [liveMsg, setLiveMsg] = useState("");

  // ── فاز G2-c — موتور کمبو مشترک کیت (G1-09) ──
  // حالت bonus = دقیقاً قانون فعلی فلپی: gained = ۱۰ + min(کمبو−۱, ۵) × ۲ (امتیاز یکسان می‌ماند)
  const {
    combo,
    maxCombo,
    comboRef: comboCountRef,
    maxComboRef: bestComboRef,
    registerCorrect,
    registerMiss,
    reset: resetCombo,
  } = useCombo({ mode: "bonus", base: 10, bonusCap: 5, bonusStep: 2 });

  // ── stateهای فاز done ──
  const [isRecord, setIsRecord] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongWords, setWrongWords] = useState<string[]>([]);
  /** فاز G3-05 — زمان پرواز دور بی‌پایان برای ResultScreen (بدون احتساب توقف‌ها) */
  const [flightTime, setFlightTime] = useState(0);

  // ── فاز G2-c — توقف/ادامهٔ استاندارد کیت + نگهبان خروج + کلید صدا ──
  // هوک فقط state توقف را می‌دهد؛ منطق توقف/ادامهٔ حلقهٔ rAF همان مسیر G0-05 است:
  // onChange → pausedRef (آینه برای حلقه) + loopCtl (cancel/resume زنجیرهٔ فعلی).
  // auto-pause در تب مخفی هم از خود هوک می‌آید — در بازگشت اورلی «متوقف شد» دیده می‌شود.
  const pausedRef = useRef(false);
  const loopCtlRef = useRef<((p: boolean) => void) | null>(null);
  /** جمع زمان‌های توقف — مدت Attempt نباید توقف‌ها را حساب کند (تایمر گیت روی paused) */
  const pausedAccumRef = useRef(0);
  const pauseStartRef = useRef(0);
  const { paused, resume, pause: pauseGame, toggle: togglePause } = useGamePause((p) => {
    pausedRef.current = p;
    if (p) {
      pauseStartRef.current = performance.now();
    } else if (pauseStartRef.current > 0) {
      pausedAccumRef.current += performance.now() - pauseStartRef.current;
      pauseStartRef.current = 0;
    }
    loopCtlRef.current?.(p);
    if (phase === "playing") setLiveMsg(p ? "بازی متوقف شد ⏸" : "ادامهٔ بازی ▶");
  });
  const [exitAsk, setExitAsk] = useState(false);
  /** آینهٔ exitAsk برای گارد پرش با کیبورد حین باز بودن دیالوگ */
  const exitAskRef = useRef(false);
  const setExitAskSafe = useCallback((v: boolean) => {
    exitAskRef.current = v;
    setExitAsk(v);
  }, []);
  // الگوی دارباز: state بی‌صدا + همگام‌سازی با کلید سراسری (storage بین-تب) و toggle در هندلر
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
  // فاز G3-05 — آموزش بی‌پایان = گام‌های عادی + گام چهارم (فقط حین دور بی‌پایان)
  const tutorialSteps = useMemo(
    () => (endless ? [...TUTORIAL_STEPS, ENDLESS_TUTORIAL_STEP] : TUTORIAL_STEPS),
    [endless],
  );
  // فاز G2-c — تله‌متری جلسه (بدون PII: بازی/اسکوپ/مدت رُند/دلیل)
  const sessionRef = useRef<GameSessionTracker | null>(null);

  // ── دنیای بازی — مالک: حلقهٔ rAF ──
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dimRef = useRef<{ w: number }>({ w: 640 });
  const birdRef = useRef<BirdState>({ y: H / 2, vy: 0 });
  const wallsRef = useRef<FlappyWall[]>([]);
  const popupsRef = useRef<Popup[]>([]);
  const hudWallRef = useRef<FlappyWall | null>(null);
  const deckRef = useRef<QuizQuestionSeed[]>([]);
  const deckIdxRef = useRef(0);
  const cfgRef = useRef<Cfg>(NORMAL_CFG);
  const speedRef = useRef(NORMAL_CFG.base);
  const scoreRef = useRef(0);
  const heartsRef = useRef(HEARTS);
  const totalRef = useRef(0);
  const correctRef = useRef(0);
  const wrongRef = useRef<string[]>([]);
  const invulnUntilRef = useRef(0);
  const flashUntilRef = useRef(0);
  const lastFlapAtRef = useRef(0);
  const startedAtRef = useRef(0);
  const overRef = useRef(false);
  const finishRef = useRef<() => void>(() => {});
  const voiceSpeedRef = useRef(speed);

  // ── داده‌های مشتق — استخراج مکانیکی گام ۹: بدنهٔ این بلوک بایت‌به‌بایت در use-flappy-data.ts منتقل شده است ──
  const { vocabSeed, lessons, countFor, pool, meaningOf, best, bestEndless, weakCount } = useFlappyData({
    data,
    easy,
    lesson,
    activeBookId,
  });

  // ── جریان بازی ──

  /** سؤال بعدی از دستهٔ یکتا — اتمام استخر → reshuffle و ادامه */
  const nextQuestion = useCallback((): QuizQuestionSeed => {
    if (deckIdxRef.current >= deckRef.current.length) {
      deckRef.current = shuffle(deckRef.current);
      deckIdxRef.current = 0;
    }
    const q = deckRef.current[deckIdxRef.current];
    deckIdxRef.current += 1;
    return q;
  }, []);

  /** ساخت یک دروازهٔ گزینه: ۲ تا ۴ دهانه (گزینهٔ درست + حواس‌پرتی‌ها، شافل) */
  const makeWall = useCallback(
    (x: number): FlappyWall => {
      const q = nextQuestion();
      const correctText = q.options[q.answer];
      const k = 2 + Math.floor(Math.random() * 3);
      const distractors = shuffle(q.options.filter((_, i) => i !== q.answer)).slice(0, k - 1);
      const texts = shuffle([correctText, ...distractors]);
      const slots = layoutGaps(k);
      return {
        x,
        gaps: slots.map((s, i) => ({
          y0: s.y0,
          y1: s.y1,
          text: texts[i],
          correct: texts[i] === correctText,
        })),
        q,
        resolved: false,
        ok: false,
        flashUntil: 0,
      };
    },
    [nextQuestion],
  );

  const start = useCallback(() => {
    if (pool.length < MIN_POOL) {
      toast.error(`سؤال واژگانی کافی در این محدوده نیست — دست‌کم ${faNum(MIN_POOL)} سؤال لازم است`);
      return;
    }
    // فاز G2-c — بازخورد کلیک شروع دور (از setup و «دور جدید» نتیجه)
    playSound("click");
    buzz("light");
    const cfg = easy ? EASY_CFG : NORMAL_CFG;
    cfgRef.current = cfg;
    speedRef.current = cfg.base;
    birdRef.current = { y: H / 2, vy: 0 };
    wallsRef.current = [];
    popupsRef.current = [];
    hudWallRef.current = null;
    scoreRef.current = 0;
    heartsRef.current = HEARTS;
    totalRef.current = 0;
    correctRef.current = 0;
    wrongRef.current = [];
    invulnUntilRef.current = 0;
    flashUntilRef.current = 0;
    lastFlapAtRef.current = 0;
    startedAtRef.current = performance.now();
    pausedAccumRef.current = 0;
    pauseStartRef.current = 0;
    overRef.current = false;
    // فاز G3-05 — شروع عادی حالت بی‌پایان را قطعاً خاموش می‌کند (رفتار عادی عین قبل)
    endlessRef.current = false;
    setEndless(false);
    // فاز G2-c — کمبوی تازه از موتور مشترک کیت
    resetCombo();
    const deck = pickUnique(pool, pool.length, (q) => q.text);
    deckRef.current = deck;
    deckIdxRef.current = 0;
    // سؤال دیوار اول — دیوار واقعی در effect «playing» با nextQuestion از همین سرِ دسته زده می‌شود
    setHudQ(deck.length > 0 ? deck[0] : null);
    setScore(0);
    setHearts(HEARTS);
    setIsRecord(false);
    setCorrectCount(0);
    setWrongWords([]);
    setLiveMsg("");
    resume();
    setExitAskSafe(false);
    // فاز G2-c — جلسهٔ تازهٔ تله‌متری برای این دور
    sessionRef.current = createGameSession({
      game: GAME_KEY,
      level: `${lesson === ALL_LESSONS ? "all" : lesson}:${easy ? "easy" : "normal"}`,
    });
    sessionRef.current.start();
    setPhase("playing");
  }, [pool, easy, lesson, resetCombo, resume, setExitAskSafe]);

  /** پایان دور — فقط یک‌بار (overRef قفل)؛ ثبت streak/session/plays/attempt/best */
  const finish = useCallback(() => {
    if (overRef.current) return;
    overRef.current = true;
    const total = totalRef.current;
    const finalScore = scoreRef.current;
    // مدت دور بدون احتساب زمان توقف (گیت paused روی «تایمر»)
    const elapsed = Math.max(
      1,
      Math.round((performance.now() - startedAtRef.current - pausedAccumRef.current) / 1000),
    );
    touchStreak();
    recordStudySession();
    bumpPlays(activeBookId, GAME_KEY);
    // فاز G2-c — پایان عادی جلسهٔ تله‌متری
    sessionRef.current?.end("finish");
    // فاز G2-c — بازخورد سه‌کانالهٔ پایان دور
    playSound("finish");
    buzz("success");
    if (total > 0) {
      saveAttempt(activeBookId, GAME_KEY, {
        lesson: lesson === ALL_LESSONS ? 0 : lesson,
        total,
        correct: correctRef.current,
        duration: elapsed,
        detail: { score: finalScore, maxCombo: bestComboRef.current },
      });
    }
    const scope = easy ? "easy" : "normal";
    const prev = loadBest<BestRecord>(activeBookId, GAME_KEY, scope);
    if (finalScore > 0 && finalScore > (prev?.score ?? 0)) {
      saveBest(activeBookId, GAME_KEY, scope, { score: finalScore });
      setIsRecord(prev !== null);
      if (prev !== null) {
        // فاز G2-c — رکورد جدید: صدا + لرزش رکورد (الگوی پایلوت)
        playSound("record");
        buzz("record");
        toast.success(`رکورد جدید! ${faNum(finalScore)} امتیاز 🏆`);
      }
    } else {
      setIsRecord(false);
    }
    setCorrectCount(correctRef.current);
    setWrongWords([...wrongRef.current]);
    setScore(finalScore);
    setPhase("done");
  }, [activeBookId, lesson, easy, bestComboRef]);

  // ── فاز G3-05 — شروع «تمرین بی‌پایان» ──
  // همان resetهای شروع عادی؛ دو تفاوت: حالت بی‌پایان روشن می‌شود (قلب دیگر پایان‌دهنده نیست)
  // و استخر سؤال با smartPick کیت (G3-02 — اولویت کارت‌های SRS ضعیف/سررسید) چیده می‌شود.
  const startEndless = useCallback(() => {
    if (pool.length < MIN_POOL) {
      toast.error(`سؤال واژگانی کافی در این محدوده نیست — دست‌کم ${faNum(MIN_POOL)} سؤال لازم است`);
      return;
    }
    playSound("click");
    buzz("light");
    const cfg = easy ? EASY_CFG : NORMAL_CFG;
    cfgRef.current = cfg;
    speedRef.current = cfg.base;
    birdRef.current = { y: H / 2, vy: 0 };
    wallsRef.current = [];
    popupsRef.current = [];
    hudWallRef.current = null;
    scoreRef.current = 0;
    heartsRef.current = HEARTS;
    totalRef.current = 0;
    correctRef.current = 0;
    wrongRef.current = [];
    invulnUntilRef.current = 0;
    flashUntilRef.current = 0;
    lastFlapAtRef.current = 0;
    startedAtRef.current = performance.now();
    pausedAccumRef.current = 0;
    pauseStartRef.current = 0;
    overRef.current = false;
    endlessRef.current = true;
    setEndless(true);
    setFlightTime(0);
    resetCombo();
    // فاز G3-05 — استخر بی‌پایان با انتخاب هوشمند کیت (شروع سرد: شافل خالص مثل قبل)
    const deck = smartPick(pool, pool.length, (q) => q.text);
    deckRef.current = deck;
    deckIdxRef.current = 0;
    setHudQ(deck.length > 0 ? deck[0] : null);
    setScore(0);
    setHearts(HEARTS);
    setIsRecord(false);
    setCorrectCount(0);
    setWrongWords([]);
    setLiveMsg("تمرین بی‌پایان شروع شد — هیچ‌چیز دور را تمام نمی‌کند ∞");
    resume();
    setExitAskSafe(false);
    // جلسهٔ تازهٔ تله‌متری — level افزودنی با پسوند :endless (بدون PII)
    sessionRef.current = createGameSession({
      game: GAME_KEY,
      level: `${lesson === ALL_LESSONS ? "all" : lesson}:${easy ? "easy" : "normal"}:endless`,
    });
    sessionRef.current.start();
    setPhase("playing");
  }, [pool, easy, lesson, resetCombo, resume, setExitAskSafe]);

  // ── فاز G3-05 — پایان «تمرین بی‌پایان»: فقط با خروج صریح ──
  // دو مسیر: دکمهٔ «پایان پرواز» در اورلی توقف (reason=finish) و تأیید نگهبان خروج کیت
  // (reason=exit — همان قرارداد فعلی فایل برای خروج وسط دور). هر دو در لحظهٔ خروج:
  // Attempt با پیشرفت فعلی (امضای عیناً موجود؛ detail فقط افزودنی endless=true) + تله‌متری
  // + ResultScreen کیت. رکورد: scope افزودنی easy:endless / normal:endless.
  const finishEndless = useCallback(
    (reason: "finish" | "exit") => {
      if (overRef.current) return;
      overRef.current = true;
      // اگر حین توقف پایان داده شد (اورلی توقف/نگهبان)، همین قطعهٔ توقف هم از زمان پرواز کسر شود
      if (pausedRef.current && pauseStartRef.current > 0) {
        pausedAccumRef.current += performance.now() - pauseStartRef.current;
        pauseStartRef.current = 0;
      }
      const total = totalRef.current;
      const finalScore = scoreRef.current;
      // مدت پرواز بدون احتساب زمان توقف (همان فرمول finish عادی)
      const elapsed = Math.max(
        1,
        Math.round((performance.now() - startedAtRef.current - pausedAccumRef.current) / 1000),
      );
      touchStreak();
      recordStudySession();
      bumpPlays(activeBookId, GAME_KEY);
      stopSpeaking();
      // تله‌متری — پایان با دکمه = end(finish)؛ خروج با نگهبان = abandon(exit) مثل قبل
      if (reason === "finish") sessionRef.current?.end("finish");
      else sessionRef.current?.abandon("exit");
      playSound("finish");
      buzz("success");
      // Attempt فقط در همین خروج صریح و فقط با پیشرفت (گارد total — عین finish عادی)
      if (total > 0) {
        saveAttempt(activeBookId, GAME_KEY, {
          lesson: lesson === ALL_LESSONS ? 0 : lesson,
          total,
          correct: correctRef.current,
          duration: elapsed,
          detail: { score: finalScore, maxCombo: bestComboRef.current, endless: true },
        });
      }
      const scope = easy ? "easy:endless" : "normal:endless";
      const prev = loadBest<BestRecord>(activeBookId, GAME_KEY, scope);
      if (finalScore > 0 && finalScore > (prev?.score ?? 0)) {
        saveBest(activeBookId, GAME_KEY, scope, { score: finalScore });
        setIsRecord(prev !== null);
        if (prev !== null) {
          playSound("record");
          buzz("record");
          toast.success(`رکورد جدید! ${faNum(finalScore)} امتیاز 🏆`);
        }
      } else {
        setIsRecord(false);
      }
      setFlightTime(elapsed);
      setCorrectCount(correctRef.current);
      setWrongWords([...wrongRef.current]);
      setScore(finalScore);
      setExitAskSafe(false);
      setPhase("done");
    },
    [activeBookId, lesson, easy, bestComboRef, setExitAskSafe],
  );

  // انصراف حین پرواز — فاز G2-c (نگهبان خروج): با هر پیشرفت، GameExitGuard؛
  // پیش از اولین دیوار، خروج مستقیم + تله‌متری abandon
  const handleExitClick = useCallback(() => {
    stopSpeaking();
    if (totalRef.current > 0 || scoreRef.current > 0) {
      // پرواز حین خواندن دیالوگ فریز شود (بازی فیزیکی است — پشت دیالوگ نمی‌میرد)
      pauseGame();
      setExitAskSafe(true);
    } else {
      overRef.current = true;
      // دور بدون پیشرفت هم یک جلسه است؛ همین‌جا رهاشده ثبت می‌شود
      sessionRef.current?.abandon("exit");
      resume();
      setExitAskSafe(false);
      setPhase("setup");
    }
  }, [pauseGame, resume, setExitAskSafe]);

  // آخرین نسخهٔ finish + سرعت صدا برای حلقهٔ rAF (الگوی latest-ref — effect بدون dep)
  useEffect(() => {
    finishRef.current = finish;
    voiceSpeedRef.current = speed;
  });

  // فاز G2-c — دورِ باز در unmount «رهاشده» ثبت می‌شود (اگر قبلاً گزارش شده باشد no-op)
  useEffect(
    () => () => {
      sessionRef.current?.abandon("unmount");
      stopSpeaking();
    },
    [],
  );

  // ── حلقهٔ بازی: اندازه‌گیری بوم، ورودی‌ها، فیزیک dt-based و رسم ──
  useEffect(() => {
    if (phase !== "playing") return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // اندازه و وضوح — یک‌بار در شروع دور
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dimRef.current = { w: Math.round(rect.width) || 640 };

    // نخستین دیوار (سؤالش همان deck[0] است که در start به HUD داده شده)
    if (wallsRef.current.length === 0) {
      wallsRef.current.push(makeWall(dimRef.current.w + 40));
      hudWallRef.current = wallsRef.current[0];
    }

    const flap = () => {
      if (overRef.current || pausedRef.current || exitAskRef.current) return;
      birdRef.current.vy = cfgRef.current.flap;
      lastFlapAtRef.current = performance.now();
    };

    const syncHud = () => {
      setScore(scoreRef.current);
      setHearts(heartsRef.current);
    };

    const showWallQ = (wl: FlappyWall) => {
      hudWallRef.current = wl;
      setHudQ(wl.q);
    };

    const step = (now: number, dt: number) => {
      const cfg = cfgRef.current;
      const bird = birdRef.current;
      const { w } = dimRef.current;
      const birdX = Math.min(w * 0.28, 190);

      // فیزیک پرنده (dt-based)
      bird.vy = Math.min(bird.vy + cfg.gravity * dt, 640);
      bird.y += bird.vy * dt;

      // حرکت دیوارها به چپ + حذف خارج‌شده‌ها
      const walls = wallsRef.current;
      for (const wl of walls) wl.x -= speedRef.current * dt;
      while (walls.length > 0 && walls[0].x < -WALL_W - 40) walls.shift();

      // زادن دیوار بعدی
      const spacing = Math.max(280, w * 0.62);
      const lastW = walls[walls.length - 1];
      if (!lastW || lastW.x < w - spacing) {
        const nw = makeWall(w + 30);
        walls.push(nw);
        if (!hudWallRef.current || hudWallRef.current.resolved) showWallQ(nw);
      }

      // عبور از دیوار — لحظه‌ای که مرکز دیوار از پرنده رد می‌شود
      for (const wl of walls) {
        if (wl.resolved || wl.x + WALL_W / 2 > birdX) continue;
        wl.resolved = true;
        totalRef.current += 1;
        const gap = wl.gaps.find((g) => bird.y >= g.y0 && bird.y <= g.y1) ?? null;
        if (gap !== null && gap.correct) {
          // عبور درست — فاز G2-c: امتیاز از موتور کمبو کیت (فرمول مو‌به‌مو یکسان) + شتاب + تلفظ
          const gained = registerCorrect();
          scoreRef.current += gained;
          speedRef.current = Math.min(cfg.cap, cfg.base + comboCountRef.current * cfg.step);
          wl.ok = true;
          wl.flashUntil = now + WALL_FLASH_MS;
          popupsRef.current.push({
            x: wl.x + WALL_W / 2,
            y: bird.y - 26,
            text: `+${faNum(gained)}`,
            born: now,
          });
          correctRef.current += 1;
          void speak(gap.text, { speed: voiceSpeedRef.current });
          // فاز G2-c — بازخورد سه‌کانالهٔ عبور درست (لرزش سبک — فقط در لحظهٔ resolve دیوار)
          playSound("correct");
          buzz("light");
          setLiveMsg(`+${faNum(gained)} امتیاز — کمبو ×${faNum(comboCountRef.current)} 🔥`);
        } else {
          // دهانهٔ غلط یا برخورد با بدنهٔ دیوار — کمبو صفر (کیت)، فلاش، صف مرور، مصونیت ۱ث
          // فاز G3-05 — در تمرین بی‌پایان قلب کم نمی‌شود (دور با خطا تمام نمی‌شود)؛ بقیهٔ جریمه همان است
          if (!endlessRef.current) heartsRef.current -= 1;
          registerMiss();
          speedRef.current = cfg.base;
          wl.ok = false;
          wl.flashUntil = now + WALL_FLASH_MS;
          flashUntilRef.current = now + FLASH_MS;
          invulnUntilRef.current = now + INVULN_MS;
          const word = wl.q.options[wl.q.answer];
          if (!wrongRef.current.includes(word)) wrongRef.current.push(word);
          seedReviewFromQuiz(word);
          // فاز G2-c — بازخورد سه‌کانالهٔ خطای دیوار
          playSound("wrong");
          buzz("error");
          setLiveMsg(
            endlessRef.current
              ? `دهانهٔ غلط — پاسخ درست «${word}» بود — کمبو ریست شد`
              : `دهانهٔ غلط — پاسخ درست «${word}» بود — یک ❤ کم شد`,
          );
        }
        syncHud();
        if (hudWallRef.current === wl) {
          const nxt = walls.find((c) => !c.resolved);
          if (nxt) showWallQ(nxt);
          else {
            hudWallRef.current = null;
            setHudQ(null);
          }
        }
      }

      // زمین/سقف — یک ❤ کم و پرنده به میانه برمی‌گردد
      if (bird.y + BIRD_R >= H - GROUND_H || bird.y - BIRD_R <= 0) {
        if (now >= invulnUntilRef.current) {
          // فاز G3-05 — در تمرین بی‌پایان قلب کم نمی‌شود؛ فلاش/مصونیت/صدا همان مسیر عادی
          if (!endlessRef.current) heartsRef.current -= 1;
          flashUntilRef.current = now + FLASH_MS;
          invulnUntilRef.current = now + 700;
          syncHud();
          // فاز G2-c — بازخورد سه‌کانالهٔ برخورد با زمین/سقف (لحظهٔ رویداد، نه هر فریم)
          playSound("wrong");
          buzz("error");
          setLiveMsg(
            endlessRef.current
              ? "برخورد با زمین/سقف — ادامه بده ∞"
              : "برخورد با زمین/سقف — یک ❤ کم شد",
          );
        }
        bird.y = H / 2;
        bird.vy = 0;
      }
    };

    const draw = (c: CanvasRenderingContext2D, now: number) => {
      const { w } = dimRef.current;
      const bird = birdRef.current;
      const birdX = Math.min(w * 0.28, 190);
      c.clearRect(0, 0, w, H);
      drawSky(c, now, w);
      for (const wl of wallsRef.current) drawWall(c, wl, now);
      drawGround(c, now, w, speedRef.current);
      popupsRef.current = popupsRef.current.filter((p) => now - p.born < 700);
      c.textAlign = "center";
      c.textBaseline = "middle";
      for (const p of popupsRef.current) {
        const t = now - p.born;
        c.globalAlpha = Math.max(0, 1 - t / 700);
        c.fillStyle = "#047857";
        c.font = "800 15px system-ui, sans-serif";
        c.fillText(p.text, p.x, p.y - t * 0.04);
        c.globalAlpha = 1;
      }
      drawBird(c, now, bird.y, bird.vy, birdX, invulnUntilRef.current, lastFlapAtRef.current);
      if (now < flashUntilRef.current) {
        c.fillStyle = "rgba(239, 68, 68, 0.16)";
        c.fillRect(0, 0, w, H);
      }
    };

    const onPointer = (e: PointerEvent) => {
      e.preventDefault();
      flap();
    };
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        flap();
      }
    };
    canvas.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);

    let raf = 0;
    let last = performance.now();
    // فاز G0-05 + G2-c — فلگ توقف زنجیرهٔ rAF: هم onChange هوک Pause و هم گارد
    // visibilitychange از همین مسیر توقف/ادامه می‌کنند (توقف = cancelAnimationFrame،
    // ادامه = resumeLoop با last تازه تا پرنده وسط پرواز نپرد — dt از قبل ≤۵۰ms clamp است)
    let paused = false;
    const resumeLoop = () => {
      paused = false;
      last = performance.now();
      cancelAnimationFrame(raf); // گارد لبه: زنجیرهٔ معوق دوباره زده نشود (شروع دور در تب مخفی)
      raf = requestAnimationFrame(tick);
    };
    const applyLoopPause = (p: boolean) => {
      if (p === paused) return; // idempotent — هوک و onVis هر دو ممکن است صدا بزنند
      paused = p;
      if (p) {
        cancelAnimationFrame(raf);
      } else if (!overRef.current) {
        resumeLoop();
      }
    };
    loopCtlRef.current = applyLoopPause;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (overRef.current || paused) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      step(now, dt);
      draw(ctx, now);
      // فاز G3-05 — در تمرین بی‌پایان قلب‌ها پایان‌دهنده نیستند (پایان فقط با خروج صریح)
      if (!endlessRef.current && heartsRef.current <= 0) finishRef.current();
    };
    raf = requestAnimationFrame(tick);

    // فاز G0-05 — گارد visibilitychange/pageshow: در تب مخفی حلقهٔ rAF متوقف می‌شود.
    // فاز G2-c — توقف خودکارِ «ادامه‌دار» اکنون از هوک Pause می‌آید (کاربر در بازگشت
    // اورلی «متوقف شد» می‌بیند و خودش ادامه می‌دهد)؛ همین مسیر فقط در حالتی که هوک
    // متوقفش نکرده (pausedRef=false) بی‌صدا از سر می‌گیرد — دو مکانیزم تداخل ندارند.
    const onVis = () => {
      if (document.visibilityState === "hidden") {
        applyLoopPause(true);
      } else if (!overRef.current && !pausedRef.current) {
        applyLoopPause(false);
      }
    };
    const onPageshow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      cancelAnimationFrame(raf);
      if (!overRef.current && !pausedRef.current) resumeLoop();
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pageshow", onPageshow);

    return () => {
      cancelAnimationFrame(raf);
      loopCtlRef.current = null;
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pageshow", onPageshow);
      canvas.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [phase, makeWall, registerCorrect, registerMiss, comboCountRef]);

  // ── Setup ──
  if (phase === "setup") {
    return (
      <SetupPanel
        lesson={lesson}
        setLesson={setLesson}
        easy={easy}
        setEasy={setEasy}
        lessons={lessons}
        countFor={countFor}
        vocabSeed={vocabSeed}
        best={best}
        bestEndless={bestEndless}
        weakCount={weakCount}
        start={start}
        startEndless={startEndless}
        tutorialSteps={tutorialSteps}
        tutorialOpen={tutorialOpen}
        handleTutorialOpenChange={handleTutorialOpenChange}
      />
    );
  }

  // ── Done — فاز G2-c: صفحهٔ نتیجهٔ استاندارد کیت ──
  if (phase === "done") {
    return (
      <DoneView
        endless={endless}
        score={score}
        isRecord={isRecord}
        wrongWords={wrongWords}
        meaningOf={meaningOf}
        maxCombo={maxCombo}
        flightTime={flightTime}
        correctCount={correctCount}
        start={start}
        startEndless={startEndless}
        setEndless={setEndless}
        endlessRef={endlessRef}
        setPhase={setPhase}
      />
    );
  }

  // ── Playing ──
  return (
    <PlayingView
      score={score}
      combo={combo}
      hearts={hearts}
      endless={endless}
      endlessRef={endlessRef}
      liveMsg={liveMsg}
      hudQ={hudQ}
      paused={paused}
      muted={muted}
      setMuted={setMuted}
      exitAsk={exitAsk}
      setExitAskSafe={setExitAskSafe}
      canvasRef={canvasRef}
      tutorialSteps={tutorialSteps}
      tutorialOpen={tutorialOpen}
      handleTutorialOpenChange={handleTutorialOpenChange}
      handleHelp={handleHelp}
      handleExitClick={handleExitClick}
      togglePause={togglePause}
      resume={resume}
      finishEndless={finishEndless}
      sessionRef={sessionRef}
      overRef={overRef}
      setPhase={setPhase}
    />
  );
}
