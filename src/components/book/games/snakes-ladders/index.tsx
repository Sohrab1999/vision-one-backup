"use client";
/**
 * بازی «مار و پله واژگانی» (Snakes & Ladders) — فاز ۴ نقشه راه جامع ۲۰۲۶.
 *
 * تختهٔ کلاسیک ۱۰۰ خانه با شماره‌گذاری مارپیچی (۱ پایین-چپ، زیگزاگ تا ۱۰۰ بالا):
 * برای انداختن تاس باید اول سؤال واژگانی خود جزوه (data.quiz.seed) را درست جواب بدهی.
 * - حالت‌ها: «روی یک دستگاه» (۲ تا ۴ بازیکن hot-seat با رنگ‌های emerald/amber/teal/muted)
 *   یا «مقابل ربات» (تو + ربات — فاز G5-03: مهارت ربات تطبیقی است؛ بدون داده کافی همان ۶۵٪).
 * - پاسخ درست → انیمیشن تاس (Dice* با match-pop) + حرکت مهره خانه‌به‌خانه (~۱۲۰ms)؛
 *   خانه‌های مار/پله نشان کوچک مقصد دارند (TrendingDown destructive / TrendingUp primary)
 *   و انتقال با toast اعلام می‌شود؛ تاس ۶ = نوبت اضافه.
 * - پاسخ غلط → toast «بند شدی!» و نوبت به بازیکن بعدی می‌رسد.
 * - سؤال‌ها با pickUnique روی text یکتا انتخاب می‌شوند؛ استخر تمام شد؟ reshuffle و ادامه.
 * - برنده: رسیدن به خانهٔ ≥۱۰۰ → صفحهٔ نتیجهٔ کیت با ستایش برنده و آمار هر بازیکن.
 * - رکورد «سریع‌ترین پیروزی» با اسکوپ hotseat | vs-bot در localStorage.
 *
 * ─── فاز G2-e-1 — مهاجرت کامل به کیت GameKit v2 + کار اختصاصی گروه e ───
 *
 * ۱) تاس صوتی/لرزشی (کار اختصاصی) — نقشهٔ سه‌کانالهٔ صدا/لرزش/متن:
 *      لحظهٔ رول تاس  = playSound("click")   + buzz("light")   — هر رول دقیقاً یک‌بار
 *      پاسخ درست       = playSound("correct") + buzz("success")  (انسان و ربات)
 *      پاسخ غلط        = playSound("wrong")   + buzz("error")
 *      پله (صعود)      = playSound("correct") + buzz("success")
 *      مار (سقوط)      = playSound("wrong")   + buzz("error")
 *      برد بازیکن      = playSound("win")     + buzz("success")  — برد ربات = "finish" (پایان خنثی)
 *      رکورد           = playSound("record")  + buzz("record")
 *    کانال متن = toast (بینایی) + liveMsg مرکزی شِل (صفحه‌خوان) — قانون سه‌کاناله.
 *
 * ۲) حرکت انیمیشنی مهره (کار اختصاصی): مهره‌ها از داخل خانه‌ها به «لایهٔ مهره»
 *    (absolute روی تخته، aria-hidden) منتقل شدند؛ موقعیت هر مهره با
 *    transform: translate(درصدی از CELL_POS) و حرکت با transition: transform:
 *      - قدم‌به‌قدم: زنجیرهٔ hop قبلی حفظ شد (هر خانه ~۱۲۰ms — STEP_MS) و هر گام
 *        یک transition ۱۲۰ms است → سُرش پیوستهٔ خانه‌به‌خانه (بدون کتابخانه).
 *      - مار/پله: یک سُرش واحد ۵۲۰ms (JUMP_MS) به مقصد — الگوی دو-فازی: اول مدت
 *        طولانی ست می‌شود، بعد موقعیت عوض می‌شود، بعد از پایان بازگشت به مدت پله‌ای.
 *      - هم‌نشینی: مهره‌های هم‌خانه به‌ازای هر هم‌خانه ±۲۲٪ پخش افقی می‌شوند.
 *      - prefers-reduced-motion: transition حذف → جابه‌جایی فوری بدون انیمیشن.
 *      - مهرهٔ خانهٔ ۰ (پیش از اولین حرکت) مثل قبل روی تخته نمایش داده نمی‌شود.
 *    انحراف مرکز لایهٔ درصدی از مرکز خانهٔ گپ‌دار حداکثر ~۱.۵px است (نامرئی).
 *
 * ۳) مهاجرت ۵گانه به کیت: GameShell (هدر یکنواخت: زمان/سؤال/نوبت/تاس/حالت در stats +
 *    چیپ موقعیت بازیکن‌ها در progress + liveMsg مرکزی) · Pause استاندارد (useGamePause
 *    با autoPauseOnHidden + گیت ساعت دور روی paused + زنجیرهٔ بی‌توقف duel-سبک برای
 *    تاس/حرکت مهره/تأخیر ربات — حین توقف فریز کامل و بعد از ادامه با زمان باقی‌مانده)
 *    · GameExitGuard (رفتار G0-06: فقط حین playing تأیید می‌گیرد + abandon("exit"))
 *    · ResultScreen (جایگزین نمای done — ستاره‌بندی per-game + آمار نوبت/تاس/مدت +
 *    کارنامهٔ بازیکن‌ها) · آموزش ۳گامی (useAutoTutorial — راهنمای حین بازی = توقف با
 *    pausedForHelpRef) · تله‌متری جلسه (level = players:{n} | players:2+bot).
 *
 * ۴) ستاره‌بندی per-game صفحهٔ نتیجه: «سفر برنده» — هر پلهٔ برنده ‎+۱ و هر مار ‎−۱؛
 *    امتیاز سفر ≥۳ → ۳ ستاره (سفر رو به بالا) · ≥۱ → ۲ ستاره · بقیه → ۱ ستاره.
 *
 * ۵) دکمه‌های صفحهٔ نتیجه: «دور جدید» = شروع فوری دور تازه با همان تنظیمات (start) و
 *    «تنظیمات» = بازگشت به setup — همان دو مسیر نمای done قبلی، این‌بار با کیت.
 *
 * نکتهٔ توقف: ساعت دور (secsRef شمارشی) گیت روی paused دارد؛ گارد visibilitychange/
 * pageshow حداقلی G0-05 به‌عنوان کمربند حفظ شد (توقف اصلی از هوک می‌آید — الگوی دوئل
 * G2-d-3)؛ جبران مبدأ Date.now لازم نیست چون تنها ساعت بازی شمارشی است (۱/ثانیه).
 */

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";
import type { QuizQuestionSeed } from "@/data/types";
import { useBook, useBookData } from "@/lib/book-context";
import { touchStreak } from "@/lib/streak-store";
import { recordStudySession } from "@/lib/goal-store";
// فاز SL0-01 نقشه راه مار و پله — حلقهٔ یادگیری: خطا → کارت مرور، درست → ارتقای کارت (الگوی cloze)
import { recordSRS, seedReviewFromQuiz } from "@/lib/srs-store";
import {
  bumpPlays,
  faNum,
  loadBest,
  pickUnique,
  saveAttempt,
  saveBest,
  shuffle,
  subscribeGameData,
} from "../shared";
// فاز G2-e-1 — کیت GameKit v2 (قرارداد API سند — همان الگوی پایلوت memory و دوئل G2-d-3)
import { isSoundMuted, playSound } from "../kit/sound-engine";
import { buzz } from "../kit/haptics";
import { useGamePause } from "../kit/use-pause";
import { useAutoTutorial } from "../kit/tutorial-overlay";
import { createGameSession, type GameSessionTracker } from "../kit/telemetry";
// فاز SL0-02 نقشه راه مار و پله — مدرس بازی (همان الگوی ۸ بازی واژگانی G5-01)
import { useHintCoach } from "../kit/hint-coach";
import { computeAdaptiveBotSkill, recordVsBotSessionResult, wrongIndexOf } from "./helpers";
import {
  ALL_LESSON,
  BOT_DELAY,
  BOT_SKILL,
  DICE_FLIPS,
  GAME_KEY,
  JUMP_MS,
  LADDERS,
  MIN_POOL,
  SNAKES,
  STEP_MS,
  type BestRecord,
  type CatKey,
  type Journey,
  type Mode,
  type Phase,
  type Player,
  type PStats,
} from "./types";
import { SetupPanel } from "./setup-panel";
import { DoneView } from "./done-view";
import { PlayingView } from "./playing-view";

export function SnakesLaddersGame() {
  const data = useBookData();
  const { bookId } = useBook();
  // بازی‌ها فقط داخل کتاب فعال رندر می‌شوند (useBookData بالا گارد است) — bookId عملاً هرگز null نیست
  const activeBookId: string = bookId ?? "";

  const [phase, setPhase] = useState<Phase>("setup");
  const [mode, setMode] = useState<Mode>("hotseat");
  const [count, setCount] = useState(2);
  const [names, setNames] = useState<string[]>(["", "", "", ""]);
  const [lesson, setLesson] = useState<number>(ALL_LESSON);
  const [cat, setCat] = useState<CatKey>("all");

  // ── stateهای حین بازی ──
  const [players, setPlayers] = useState<Player[]>([]);
  const [positions, setPositions] = useState<number[]>([]);
  const [stats, setStats] = useState<PStats[]>([]);
  const [cur, setCur] = useState(0);
  const [q, setQ] = useState<QuizQuestionSeed | null>(null);
  const [qNum, setQNum] = useState(0);
  const [secs, setSecs] = useState(0);
  /** بازخورد پاسخ — گزینهٔ انتخابی + درست/غلط (ربات یا انسان) */
  const [reveal, setReveal] = useState<{ picked: number; ok: boolean; byBot: boolean } | null>(null);
  const [diceFace, setDiceFace] = useState<number | null>(null);
  /** key انیمیشن match-pop تاس */
  const [dicePop, setDicePop] = useState(0);
  /** پیام باکس aria-live مرکزی شِل — نوبت/تاس/مار و پله/توقف (فاز G1-05) */
  const [liveMsg, setLiveMsg] = useState("");
  /** فاز SL1-02 — پالس خانهٔ مبدأ+مقصد حین انتقال مار/پله (صرفاً بصری — متن/صدا از قبل سه‌کاناله) */
  const [pulse, setPulse] = useState<{ cells: number[]; kind: "snake" | "ladder" } | null>(null);
  /** تعداد رول تاس این دور — آمار صفحهٔ نتیجه */
  const [rolls, setRolls] = useState(0);
  /** مدت transition مهره‌ها (ms) — پله‌ای STEP_MS یا سُرش مار/پله JUMP_MS (فاز G2-e) */
  const [slideMs, setSlideMs] = useState(STEP_MS);
  /** نگهبان خروج (رفتار G0-06) — دیالوگ تأیید فقط وقتی دور شروع شده و نه‌تمام‌شده است */
  const [exitAsk, setExitAsk] = useState(false);

  // ── stateهای فاز done ──
  const [winner, setWinner] = useState<number | null>(null);
  const [isRecord, setIsRecord] = useState(false);
  /** سفر برنده برای ستاره‌بندی (mirror state از jumpsRef — بدون خواندن ref در رندر) */
  const [journey, setJourney] = useState<Journey>({ up: 0, down: 0 });

  // ── refs — منبع حقیقت منطق بازی (همهٔ callbackهای تایمر از این‌ها می‌خوانند) ──
  const playersRef = useRef<Player[]>([]);
  const posRef = useRef<number[]>([]);
  const statsRef = useRef<PStats[]>([]);
  /** سفر هر بازیکن (پله/مار) — در finish به journey state منعکس می‌شود */
  const jumpsRef = useRef<Journey[]>([]);
  const curRef = useRef(0);
  const qRef = useRef<QuizQuestionSeed | null>(null);
  const deckRef = useRef<QuizQuestionSeed[]>([]);
  const qiRef = useRef(-1);
  const secsRef = useRef(0);
  const rollsRef = useRef(0);
  /** قفل نوبت تا پایان کامل جریان (پاسخ → تاس → حرکت → مار/پله) */
  const turnLockRef = useRef(false);

  // ── فاز G2-e-1 — ساعت بی‌توقف زنجیرهٔ نوبت (تاس/حرکت/ربات — الگوی دوئل G2-d-3) ──
  /** جمع مدت توقف‌های این دور (ms) */
  const pauseAccumRef = useRef(0);
  /** شروع توقف جاری (۰ = در حال بازی) */
  const pauseStartRef = useRef(0);
  /** تایمر زندهٔ زنجیره (null = چیزی برنامه‌ریزی نشده یا فریز است) */
  const chainTimerRef = useRef<number | null>(null);
  /** برنامهٔ معلق زنجیره — due در ساعت بی‌توقف (حین توقف دست‌نخورده می‌ماند) */
  const chainPendingRef = useRef<{ due: number; fn: () => void } | null>(null);
  /** آینهٔ همگام paused برای گاردهای داخل callback تایمر/رویداد (الگوی flappy/duel) */
  const pausedRef = useRef(false);
  /** فاز G5-03 — مهارت ربات این دور (در start برای mode="bot" محاسبه می‌شود؛ پیش‌فرض BOT_SKILL) */
  const botSkillRef = useRef<number>(BOT_SKILL);
  // فاز G1-10 — تله‌متری جلسه (بدون PII: بازی/اسکوپ/مدت رُند/دلیل)
  const sessionRef = useRef<GameSessionTracker | null>(null);
  // فاز SL0-02 — مدرس بازی (کارت شناور داخل GameShell) — دسترسی در callbackهای پایدار با latest-ref (الگوی کیت)
  const hint = useHintCoach(GAME_KEY);
  const hintRef = useRef(hint);
  useEffect(() => {
    hintRef.current = hint;
  });

  // اسکوپ رکورد طبق نقشه راه: hotseat | vs-bot
  const modeScope = mode === "bot" ? "vs-bot" : "hotseat";

  // ── مدیریت زنجیرهٔ تایمرها (فاز G2-e-1 — ساعت بی‌توقف) ──
  // (قبل از هوک توقف تعریف می‌شود چون callback آن scheduleChain را صدا می‌زند)

  /**
   * زمان «بازی» بدون توقف‌ها — مبنای کل زنجیرهٔ نوبت.
   * حین توقف (pauseStartRef فعال) ثابت می‌ماند و بعد از ادامه با جبران
   * pauseAccum دوباره ۱:۱ با ساعت واقعی جلو می‌رود.
   */
  function gameNow(): number {
    const live = pauseStartRef.current > 0 ? Date.now() - pauseStartRef.current : 0;
    return Date.now() - pauseAccumRef.current - live;
  }

  /**
   * فاز G2-e-1 — مسلح‌کردن زنجیرهٔ یک‌بارهٔ نوبت (تاس → حرکت → مار/پله → نوبت بعد).
   * حین توقف کاملاً فریز می‌شود (هیچ setTimeout زنده‌ای نیست) و بعد از ادامه با
   * همان زمان باقی‌مانده دوباره مسلح می‌شود — الگوی دوئل G2-d-3.
   */
  function scheduleChain(): void {
    if (chainTimerRef.current !== null) {
      window.clearTimeout(chainTimerRef.current);
      chainTimerRef.current = null;
    }
    if (pausedRef.current) return;
    const pend = chainPendingRef.current;
    if (!pend) return;
    chainTimerRef.current = window.setTimeout(() => {
      chainTimerRef.current = null;
      const cur = chainPendingRef.current;
      chainPendingRef.current = null;
      cur?.fn();
    }, Math.max(0, pend.due - gameNow()));
  }

  /** زمان‌بندی داخل زنجیرهٔ بی‌توقف — جایگزین setTimeout خام الگوی قبلی */
  function later(fn: () => void, ms: number): void {
    chainPendingRef.current = { due: gameNow() + ms, fn };
    scheduleChain();
  }

  function clearTimers(): void {
    chainPendingRef.current = null;
    if (chainTimerRef.current !== null) {
      window.clearTimeout(chainTimerRef.current);
      chainTimerRef.current = null;
    }
  }

  // ── فاز G2-e-1 — توقف/ادامهٔ استاندارد کیت + یکپارچه با ساعت دور G0-05 ──
  // هوک auto-pause در تب مخفی می‌دهد (سطح بالاتر از گارد حداقلی G0-05: کاربر هنگام
  // بازگشت اورلی «بازی متوقف شد» می‌بیند و خودش ادامه می‌دهد)؛ ساعت دور (secsRef)
  // در effect پایین‌تر با deps [phase, paused] گیت می‌شود: paused → stopClock،
  // resume → startClock — بدون دو-مکانیزم. زنجیرهٔ نوبت هم همین‌جا فریز/احیا می‌شود.
  const { paused, resume, pause: pauseGame, toggle: togglePause } = useGamePause((p) => {
    pausedRef.current = p;
    if (p) {
      pauseStartRef.current = Date.now();
    } else if (pauseStartRef.current > 0) {
      pauseAccumRef.current += Date.now() - pauseStartRef.current;
      pauseStartRef.current = 0;
    }
    // فریز/احیای زنجیرهٔ نوبت (تاس/حرکت/ربات)
    scheduleChain();
    if (phase === "playing") setLiveMsg(p ? "بازی متوقف شد ⏸" : "ادامهٔ بازی ▶");
  });
  // الگوی دارباز/دوئل: state بی‌صدا + همگام‌سازی با کلید سراسری (storage بین-تب)
  const [muted, setMuted] = useState(isSoundMuted());
  useEffect(() => {
    const sync = (): void => setMuted(isSoundMuted());
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  // فاز G1-08 — آموزش یک‌بارنمایش (خودکار در setup) + راهنمای شِل حین بازی (با توقف)
  const {
    open: tutorialOpen,
    openHelp: openTutorial,
    close: closeTutorial,
  } = useAutoTutorial(GAME_KEY, phase === "setup");
  const pausedForHelpRef = useRef(false);
  function handleHelp(): void {
    if (phase === "playing") {
      pausedForHelpRef.current = true;
      pauseGame();
    }
    openTutorial();
  }
  function handleTutorialClose(): void {
    closeTutorial();
    if (pausedForHelpRef.current) {
      pausedForHelpRef.current = false;
      resume();
    }
  }
  function handleTutorialOpenChange(o: boolean): void {
    if (!o) handleTutorialClose();
  }

  // ── داده‌های مشتق ──
  const pool = useMemo(
    () =>
      data.quiz.seed.filter(
        (s) => (lesson === ALL_LESSON || s.lesson === lesson) && (cat === "all" || s.category === cat),
      ),
    [data.quiz.seed, lesson, cat],
  );

  const lessons = useMemo(
    () => [...new Set(data.quiz.seed.map((s) => s.lesson))].sort((a, b) => a - b),
    [data.quiz.seed],
  );

  /** تعداد واقعی سؤال هر چیپ محدوده (با اعمال دستهٔ فعال) */
  const countFor = (l: number) =>
    data.quiz.seed.filter(
      (s) => (l === ALL_LESSON || s.lesson === l) && (cat === "all" || s.category === cat),
    ).length;

  // رکورد «سریع‌ترین پیروزی» این حالت — اسنپ‌شات عددی پایدار (الگوی match-game)
  const best = useSyncExternalStore(
    subscribeGameData,
    () => loadBest<BestRecord>(activeBookId, GAME_KEY, modeScope)?.time ?? null,
    () => null,
  );

  // ── جریان بازی ──

  function drawNext(): void {
    let deck = deckRef.current;
    let next = qiRef.current + 1;
    if (next >= deck.length) {
      // استخر سؤال‌ها تمام شد → از نو شافل و ادامه
      deck = shuffle(deck);
      deckRef.current = deck;
      next = 0;
    }
    qiRef.current = next;
    qRef.current = deck[next];
    setQ(deck[next]);
    setQNum((n) => n + 1);
  }

  function bumpStats(p: number, ok: boolean): void {
    const s = statsRef.current[p];
    s.asked += 1;
    if (ok) s.correct += 1;
    else s.wrong += 1;
    setStats(statsRef.current.map((x) => ({ ...x })));
  }

  function beginTurn(p: number): void {
    curRef.current = p;
    setCur(p);
    setReveal(null);
    setDiceFace(null);
    turnLockRef.current = false;
    drawNext();
    const pl = playersRef.current[p];
    // اعلام نوبت برای فناوری‌های کمکی (فاز G1-05 — aria-live مرکزی)
    setLiveMsg(`نوبت ${pl?.name ?? ""}${pl?.isBot ? " — ربات دارد فکر می‌کند…" : ""}`);
    if (pl?.isBot) {
      later(() => botAnswer(p), BOT_DELAY);
    }
  }

  /** تاس: چند چرخش نمایشی → عدد قطعی → شروع حرکت مهره */
  function proceedAfterCorrect(p: number): void {
    // فاز G2-e-1 — لحظهٔ رول: کلیک خنثی + لرزش سبک (هر رول دقیقاً یک‌بار)
    playSound("click");
    buzz("light");
    rollsRef.current += 1;
    setRolls(rollsRef.current);
    setLiveMsg("تاس انداخته شد…");
    const d = 1 + Math.floor(Math.random() * 6);
    let flips = 0;
    function cycle(): void {
      flips += 1;
      if (flips <= DICE_FLIPS) {
        setDiceFace(1 + Math.floor(Math.random() * 6));
        setDicePop((k) => k + 1);
        later(cycle, 90);
      } else {
        setDiceFace(d);
        setDicePop((k) => k + 1);
        setLiveMsg(`تاس ${faNum(d)} آمد — مهره ${playersRef.current[p]?.name ?? ""} حرکت می‌کند`);
        later(() => hop(p, d), 420);
      }
    }
    later(cycle, 350);
  }

  /** حرکت مهره خانه‌به‌خانه با زنجیرهٔ پله‌ای (~۱۲۰ms) — هر گام یک transition است (فاز G2-e) */
  function hop(p: number, d: number): void {
    const from = posRef.current[p];
    const to = Math.min(100, from + d);
    let at = from;
    function step(): void {
      if (at < to) {
        at += 1;
        posRef.current[p] = at;
        setPositions([...posRef.current]);
        later(step, STEP_MS);
      } else {
        land(p, d);
      }
    }
    step();
  }

  /** بررسی مار/پله در خانهٔ فرود و اعلام انتقال سه‌کاناله (toast + صدا/لرزش + liveMsg) */
  function land(p: number, d: number): void {
    const pos = posRef.current[p];
    const snakeTo = SNAKES[pos];
    const ladderTo = LADDERS[pos];
    const name = playersRef.current[p]?.name ?? "";
    if (snakeTo !== undefined) {
      // فاز G2-e-1 — مار = سقوط: صدای نزولی + لرزش خطا
      playSound("wrong");
      buzz("error");
      // فاز SL1-02 — پالس سرِ مار (خانهٔ فرود) و دُم (مقصد) هم‌زمان با سُرش
      setPulse({ cells: [pos, snakeTo], kind: "snake" });
      const jr = jumpsRef.current[p];
      if (jr) jr.down += 1;
      toast.error(`مار! برگشتی به خانهٔ ${faNum(snakeTo)}`);
      setLiveMsg(`مار! ${name} به خانهٔ ${faNum(snakeTo)} برگشت`);
      // سُرش واحد ۵۲۰ms به مقصد — الگوی دو-فازی مدت transition (فاز G2-e)
      setSlideMs(JUMP_MS);
      later(() => {
        posRef.current[p] = snakeTo;
        setPositions([...posRef.current]);
        later(() => {
          setSlideMs(STEP_MS);
          setPulse(null);
          afterJump(p, d);
        }, JUMP_MS);
      }, 60);
    } else if (ladderTo !== undefined) {
      // فاز G2-e-1 — پله = صعود: صدای صعودی + لرزش موفقیت
      playSound("correct");
      buzz("success");
      // فاز SL1-02 — پالس پایهٔ پله (فرود) و بالای پله (مقصد) هم‌زمان با سُرش
      setPulse({ cells: [pos, ladderTo], kind: "ladder" });
      const jr = jumpsRef.current[p];
      if (jr) jr.up += 1;
      toast.success(`پله! رفتی به خانهٔ ${faNum(ladderTo)}`);
      setLiveMsg(`پله! ${name} به خانهٔ ${faNum(ladderTo)} رفت`);
      setSlideMs(JUMP_MS);
      later(() => {
        posRef.current[p] = ladderTo;
        setPositions([...posRef.current]);
        later(() => {
          setSlideMs(STEP_MS);
          setPulse(null);
          afterJump(p, d);
        }, JUMP_MS);
      }, 60);
    } else {
      afterJump(p, d);
    }
  }

  /** بعد از مار/پله: پایان بازی یا نوبت بعدی (تاس ۶ = نوبت اضافه) */
  function afterJump(p: number, d: number): void {
    if (posRef.current[p] >= 100) {
      finish(p);
      return;
    }
    if (d === 6) {
      toast.success(`تاس ${faNum(6)} — نوبت اضافه برای ${playersRef.current[p]?.name ?? ""}!`);
      setLiveMsg(`تاس ${faNum(6)} — نوبت اضافه برای ${playersRef.current[p]?.name ?? ""}`);
      beginTurn(p);
    } else {
      beginTurn((p + 1) % playersRef.current.length);
    }
  }

  /** پاسخ ربات — نمایش گزینهٔ انتخابی‌اش و طی همان جریان بازیکن انسانی */
  function botAnswer(p: number): void {
    const cq = qRef.current;
    if (!cq) return;
    // G5-03 — ربات تطبیقی: احتمال پاسخ درست = مهارت محاسبه‌شدهٔ این دور (پیش‌فرض BOT_SKILL)
    const ok = Math.random() < botSkillRef.current;
    const idx = ok ? cq.answer : wrongIndexOf(cq);
    setReveal({ picked: idx, ok, byBot: true });
    bumpStats(p, ok);
    // فاز G2-e-1 — بازخورد سه‌کانالهٔ پاسخ ربات (هم‌مسو با بازیکن انسانی)
    if (ok) {
      playSound("correct");
      buzz("success");
      setLiveMsg("ربات پاسخ درست داد — تاس می‌افتد");
      later(() => proceedAfterCorrect(p), 600);
    } else {
      playSound("wrong");
      buzz("error");
      toast.error(`${playersRef.current[p]?.name ?? "ربات"} بند شد!`);
      setLiveMsg(`${playersRef.current[p]?.name ?? "ربات"} بند شد — نوبت بعدی`);
      later(() => beginTurn((p + 1) % playersRef.current.length), 1100);
    }
  }

  function answerHuman(idx: number, viaKey?: number): void {
    // فاز G2-e-1 — گیت توقف: حین «بازی متوقف شد» هیچ پاسخی ثبت نمی‌شود
    if (turnLockRef.current || pausedRef.current || !q) return;
    const p = curRef.current;
    if (playersRef.current[p]?.isBot) return;
    turnLockRef.current = true;
    const ok = idx === q.answer;
    setReveal({ picked: idx, ok, byBot: false });
    bumpStats(p, ok);
    // فاز SL0-01 — کلید SRS = گزینهٔ درست سؤال (واژهٔ انگلیسی خود جزوه — کتاب فعال خودکار)
    const srsWord = q.options[q.answer] ?? "";
    // فاز SL0-03 — پیشوند کیبورد برای فناوری‌های کمکی (الگوی cloze G2-b)
    const keyPrefix = viaKey !== undefined ? `گزینه ${faNum(viaKey)} — ` : "";
    // فاز G2-e-1 — بازخورد سه‌کانالهٔ پاسخ انسان
    if (ok) {
      playSound("correct");
      buzz("success");
      // فاز SL0-01 — ارتقای کارت واژه در مرور هوشمند (فقط انسان — ربات از این مسیر نمی‌گذرد)
      recordSRS(srsWord, true);
      setLiveMsg(`${keyPrefix}پاسخ درست — تاس می‌افتد`);
      later(() => proceedAfterCorrect(p), 350);
    } else {
      playSound("wrong");
      buzz("error");
      // فاز SL0-01 — خطا → کارت مرور هوشمند (کارت نو: سررسید فردا؛ کارت قدیم: بازآموزی ۱۰ دقیقه‌ای)
      seedReviewFromQuiz(srsWord);
      // فاز SL0-02 — شمارش خطا برای مدرس (خطای سوم کارت LLM را خودکار باز می‌کند)
      hintRef.current.recordMistake({ prompt: q.text, answer: srsWord, chosen: q.options[idx] ?? "" });
      toast.error("بند شدی!");
      setLiveMsg(`${keyPrefix}پاسخ غلط — بند شدی! نوبت بعدی`);
      later(() => beginTurn((p + 1) % playersRef.current.length), 1100);
    }
  }

  function buildPlayers(): Player[] {
    if (mode === "bot") {
      return [
        { name: names[0]?.trim() || "تو", isBot: false, ci: 0 },
        { name: "ربات", isBot: true, ci: 1 },
      ];
    }
    return Array.from({ length: count }, (_, i) => ({
      name: names[i]?.trim() || `بازیکن ${faNum(i + 1)}`,
      isBot: false,
      ci: i,
    }));
  }

  function start(): void {
    if (pool.length < MIN_POOL) {
      toast.error("سؤال کافی در این محدوده نیست — محدودهٔ دیگری را انتخاب کن");
      return;
    }
    clearTimers();
    const ps = buildPlayers();
    playersRef.current = ps;
    setPlayers(ps);
    posRef.current = ps.map(() => 0);
    setPositions([...posRef.current]);
    statsRef.current = ps.map(() => ({ asked: 0, correct: 0, wrong: 0 }));
    setStats(statsRef.current.map((x) => ({ ...x })));
    jumpsRef.current = ps.map(() => ({ up: 0, down: 0 }));
    setJourney({ up: 0, down: 0 });
    rollsRef.current = 0;
    setRolls(0);
    setSlideMs(STEP_MS);
    setPulse(null);
    // سؤال یکتا روی متن — کل استخر شافل‌شده؛ تمام شد؟ در drawNext از نو شافل می‌شود
    deckRef.current = pickUnique(pool, pool.length, (item) => item.text);
    qiRef.current = -1;
    curRef.current = 0;
    secsRef.current = 0;
    setSecs(0);
    setQNum(0);
    setReveal(null);
    setDiceFace(null);
    setDicePop(0);
    setLiveMsg("");
    setWinner(null);
    setIsRecord(false);
    // فاز G2-e-1 — توقف‌های معوق از نو (دور تازه بدون توقف قبلی) + ادامه از هر توقف
    pauseAccumRef.current = 0;
    pauseStartRef.current = 0;
    resume();
    setExitAsk(false);
    // فاز SL0-02 — شمارندهٔ مدرس از نو (دور تازه — الگوی hangman G5-01)
    hintRef.current.reset();
    // فاز G5-03 — مهارت ربات تطبیقی در شروع دور mode="bot" (ref — منبع حقیقت منطق)
    botSkillRef.current = mode === "bot" ? computeAdaptiveBotSkill(activeBookId) : BOT_SKILL;
    // فاز G1-10 — جلسهٔ تازهٔ تله‌متری (level = ترکیب بازیکن‌ها — قرارداد تسک G2-e)
    sessionRef.current = createGameSession({
      game: GAME_KEY,
      level: mode === "bot" ? "players:2+bot" : `players:${count}`,
    });
    sessionRef.current.start();
    setPhase("playing");
    beginTurn(0);
  }

  function finish(winnerIdx: number): void {
    clearTimers();
    turnLockRef.current = true;
    const spent = secsRef.current;
    setSecs(spent);
    touchStreak();
    recordStudySession();
    bumpPlays(activeBookId, GAME_KEY);
    // فاز G1-10 — پایان عادی جلسهٔ تله‌متری
    sessionRef.current?.end("finish");
    const ps = playersRef.current;
    // فاز G5-03 — آمار نشست مرورگر برای ربات تطبیقی (برد انسان / برد ربات) — بدون کلید جدید
    if (mode === "bot") {
      recordVsBotSessionResult(ps[winnerIdx]?.isBot !== true);
    }
    // آمار Attempt فقط از بازیکن‌های انسانی (total = سؤال‌های پرسیده‌شده از انسان‌ها)
    const humanIdxs = ps.map((_, i) => i).filter((i) => !ps[i]?.isBot);
    const total = humanIdxs.reduce((a, i) => a + (statsRef.current[i]?.asked ?? 0), 0);
    const correct = humanIdxs.reduce((a, i) => a + (statsRef.current[i]?.correct ?? 0), 0);
    if (total > 0) {
      saveAttempt(activeBookId, GAME_KEY, {
        lesson: lesson === ALL_LESSON ? 0 : lesson,
        total,
        correct,
        duration: spent,
        detail: {
          winner: ps[winnerIdx]?.name ?? "",
          players: ps.map((pl, i) => ({
            name: pl.name,
            isBot: pl.isBot,
            asked: statsRef.current[i]?.asked ?? 0,
            correct: statsRef.current[i]?.correct ?? 0,
            wrong: statsRef.current[i]?.wrong ?? 0,
            position: posRef.current[i] ?? 0,
          })),
        },
      });
    }
    // رکورد سریع‌ترین پیروزی — فقط برندهٔ انسانی رکورد می‌سازد (امضا دست‌نخورده)
    let rec = false;
    if (!ps[winnerIdx]?.isBot) {
      const prev = loadBest<BestRecord>(activeBookId, GAME_KEY, modeScope);
      if (!prev || spent < prev.time) {
        saveBest(activeBookId, GAME_KEY, modeScope, { time: spent });
        rec = true;
      }
    }
    setIsRecord(rec);
    setJourney(jumpsRef.current[winnerIdx] ?? { up: 0, down: 0 });
    // فاز G2-e-1 — بازخورد سه‌کانالهٔ پایان: برد بازیکن=win · برد ربات=finish · رکورد=record
    if (ps[winnerIdx]?.isBot) {
      playSound("finish");
      buzz("success");
    } else {
      playSound("win");
      buzz("success");
    }
    if (rec) {
      playSound("record");
      buzz("record");
    }
    setLiveMsg(`${ps[winnerIdx]?.name ?? ""} برنده شد!`);
    setWinner(winnerIdx);
    setPhase("done");
  }

  /**
   * نگهبان خروج (رفتار G0-06) — «انصراف» وقتی دورِ شروع‌شده و نه‌تمام‌شده در جریان است
   * (فاز playing) فقط با تأیید GameExitGuard کیت اجرا می‌شود؛ در فازهای setup/done
   * خروج مستقیم است (این تابع فقط از نمای playing صدا زده می‌شود — گارد فاز حفظ شد).
   */
  function handleExitClick(): void {
    if (phase === "playing") setExitAsk(true);
  }

  /** تأیید نگهبان خروج — رهاکردن دور نیمه‌کاره + abandon تله‌متری (الگوی دوئل) */
  function confirmExit(): void {
    clearTimers();
    turnLockRef.current = false;
    sessionRef.current?.abandon("exit");
    setExitAsk(false);
    resume();
    setPhase("setup");
  }

  // ── effectها ──

  // تایمر زمان بازی — بدون setState مستقیم در بدنهٔ effect (react-hooks v6).
  // فاز G2-e-1 — گیت توقف: paused (دستی از شِل یا auto-pause هوک) → ساعت دور می‌ایستد
  // و در ادامه از همان‌جا می‌شمارد (secsRef شمارشی است — بدون پرش). شنونده‌های
  // visibility/pageshow گارد حداقلی G0-05 به‌عنوان «کمربند» حفظ شدند — توقف اصلی از
  // هوک useGamePause می‌آید و اگر pausedRef گرفته باشد، اینجا دست به resume نمی‌زند.
  const secsIvRef = useRef<number | null>(null);
  useEffect(() => {
    if (phase !== "playing" || paused) return;
    const stopClock = (): void => {
      if (secsIvRef.current !== null) {
        window.clearInterval(secsIvRef.current);
        secsIvRef.current = null;
      }
    };
    const startClock = (): void => {
      if (secsIvRef.current === null && document.visibilityState === "visible") {
        secsIvRef.current = window.setInterval(() => {
          secsRef.current += 1;
          setSecs((s) => s + 1);
        }, 1000);
      }
    };
    const onVis = (): void => {
      if (document.visibilityState === "hidden") stopClock();
      else if (!pausedRef.current) startClock();
    };
    const onPageshow = (e: PageTransitionEvent): void => {
      if (!e.persisted) return;
      stopClock(); // interval تازه می‌شود تا تیک معوقِ دورهٔ انجماد bfcache یک‌جا نپرد
      if (document.visibilityState === "visible" && !pausedRef.current) startClock();
    };
    startClock();
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pageshow", onPageshow);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pageshow", onPageshow);
      stopClock();
    };
  }, [phase, paused]);

  // پاک‌سازی کامل زنجیرهٔ تایمرها در unmount + ثبت رهاشدگی جلسهٔ باز (فاز G1-10)
  useEffect(
    () => () => {
      clearTimers();
      sessionRef.current?.abandon("unmount");
    },
    [],
  );

  // فاز SL0-03 — کیبورد: کلیدهای ۱..۴ (فارسی/عربی/انگلیسی) پاسخ گزینه‌ها.
  // گاردهای نوبت/توقف/ربات داخل answerHuman است؛ اینجا فقط فاز playing و دیالوگ خروجِ باز گیت می‌شود.
  const answerRef = useRef(answerHuman);
  useEffect(() => {
    answerRef.current = answerHuman;
  });
  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.repeat || e.altKey || e.ctrlKey || e.metaKey) return;
      let i = Number(e.key) - 1;
      if (!Number.isInteger(i) || i < 0 || i > 3) {
        const f = "۱۲۳۴".indexOf(e.key);
        i = f >= 0 ? f : "١٢٣٤".indexOf(e.key);
      }
      if (i < 0 || i > 3) return;
      if (exitAsk) return; // دیالوگ خروج باز است — پاسخ ثبت نشود
      answerRef.current(i, i + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, exitAsk]);

  // ── Setup ──
  if (phase === "setup") {
    return (
      <SetupPanel
        mode={mode}
        setMode={setMode}
        count={count}
        setCount={setCount}
        names={names}
        setNames={setNames}
        lesson={lesson}
        setLesson={setLesson}
        cat={cat}
        setCat={setCat}
        lessons={lessons}
        countFor={countFor}
        pool={pool}
        best={best}
        start={start}
        tutorialOpen={tutorialOpen}
        handleTutorialOpenChange={handleTutorialOpenChange}
      />
    );
  }

  // ── Done — فاز G2-e-1: صفحهٔ نتیجهٔ استاندارد کیت جایگزین نمای دستی قبلی ──
  if (phase === "done") {
    return (
      <DoneView
        winner={winner}
        players={players}
        stats={stats}
        journey={journey}
        isRecord={isRecord}
        qNum={qNum}
        rolls={rolls}
        secs={secs}
        start={start}
        setPhase={setPhase}
      />
    );
  }

  // ── Playing ──
  if (!q || players.length === 0) return null;
  return (
    <PlayingView
      q={q}
      players={players}
      positions={positions}
      cur={cur}
      reveal={reveal}
      diceFace={diceFace}
      dicePop={dicePop}
      slideMs={slideMs}
      pulse={pulse}
      mode={mode}
      liveMsg={liveMsg}
      qNum={qNum}
      secs={secs}
      paused={paused}
      resume={resume}
      togglePause={togglePause}
      muted={muted}
      setMuted={setMuted}
      exitAsk={exitAsk}
      setExitAsk={setExitAsk}
      confirmExit={confirmExit}
      handleHelp={handleHelp}
      handleExitClick={handleExitClick}
      answerHuman={answerHuman}
      tutorialOpen={tutorialOpen}
      handleTutorialOpenChange={handleTutorialOpenChange}
      hint={hint}
    />
  );
}
