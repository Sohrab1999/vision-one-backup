"use client";

/**
 * گام ۹ نقشهٔ docs/refactor-roadmap-2.md — تفکیک مکانیکی از wordle-game.tsx (پلی‌بوک fps/)؛
 * JSX بایت‌به‌بایت منتقل شده است.
 *
 * این فایل فقط موتور/ارکستراسیون WordleGame است (state/refs/استورهای بیرونی/فلیپ پله‌ای/
 * ثبت نتیجه/SRS/رکورد/تله‌متری جلسه/توقف/نگهبان خروج/کیبورد فیزیکی)؛ نماها:
 * setup-panel.tsx / playing-view.tsx / done-view.tsx — تایپ‌ها types.ts، ثابت‌ها constants.ts،
 * منطق خالص helpers.ts، وضعیت روزانهٔ localStorage در daily-store.ts.
 * props بین ماژول‌ها هم‌نام شناسه‌های فایل اصلی‌اند تا JSX منتقل‌شده صفر تغییر شناسه داشته باشد.
 */

/**
 * بازی «وردل ویژن» (Vision Wordle) — فاز ۴ نقشه راه جامع ۲۰۲۶ + مهاجرت GameKit v2 (فاز G2-d).
 *
 * حدس زدن یک واژه از واژگان خود کتاب در ۶ تلاش، با رنگ‌بندی دو-گذرهٔ حروف
 * (سبز/زرد/خاکستری — دقیقاً با احترام به حروف تکراری):
 * - «روزانه»: واژهٔ روز با seed پایدار = hash(`${bookId}:${YYYY-MM-DD}`) روی
 *   استخر مرتب‌شدهٔ ۵حرفی؛ وضعیت روز در localStorage (`visionone:wordle-daily:{book}`)
 *   ذخیره و در mount (حتی بعد از رفرش) بازیابی می‌شود. منطق/seed روزانه دست‌نخورده.
 * - «بی‌نهایت»: هر دور یک واژهٔ تصادفی تازه — فاز G2-d: با انتخاب طول واژه
 *   (۴/۵/۶ حرفی؛ پیش‌فرض ۵) از استخر واژگان همان کتاب. اگر استخر طول انتخابی
 *   کم باشد، دور با واژه‌های ۵حرفی ادامه می‌یابد (fallback با پیام زنده).
 * - رکوردها (کلیدها فقط افزودنی — سازگاری رکوردهای قبلی):
 *   بی‌نهایت ۵حرفی = scope "infinite" (کمترین حدسِ برد — همان کلید قبلی)؛
 *   بی‌نهایت ۴/۶حرفی = scope "infinite:4" / "infinite:6"؛
 *   روزانه = طولانی‌ترین زنجیرهٔ برد پیاپی (scope "daily-streak").
 * - پایان برد: تلفظ + SRS(✓) — پایان باخت: واژهٔ درست + SRS(✗).
 * - کیت (فاز G2-d): GameShell + ResultScreen + آموزش ۳گامی + توقف/ادامهٔ
 *   استاندارد + نگهبان خروج + تله‌متری جلسه + صدا/لرزش سه‌کاناله —
 *   سطر ارزیابی‌شده = click، برد = win، باخت = wrong، رکورد = record؛
 *   حروف تایپی عمداً صدا نمی‌گیرند (سرعت تایپ).
 */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";
import type { VocabEntry } from "@/data/types";
import { useBook, useBookData } from "@/lib/book-context";
import { recordSRS } from "@/lib/srs-store";
import { touchStreak } from "@/lib/streak-store";
import { recordStudySession } from "@/lib/goal-store";
import { speak, stopSpeaking } from "@/lib/speak";
import { useVoiceSpeed } from "@/lib/voice-store";
import {
  bumpPlays,
  faNum,
  loadBest,
  saveAttempt,
  saveBest,
  subscribeGameData,
} from "../shared";
// ─── فاز G2-d — کیت GameKit v2 (قرارداد API سند §۴) ───
import { isSoundMuted, playSound } from "../kit/sound-engine";
import { buzz } from "../kit/haptics";
import { useGamePause } from "../kit/use-pause";
import { useAutoTutorial } from "../kit/tutorial-overlay";
import { createGameSession, type GameSessionTracker } from "../kit/telemetry";
// G5-01 — مدرس بازی با LLM (راهنمای خودکار بعد از ۳ خطا)
import { useHintCoach } from "../kit/hint-coach";
// ─── ماژول‌های تفکیک‌شدهٔ wordle/ (گام ۹) ───
import { hashStr, judgeVerdicts, shiftDate, todayKey, VERDICT_RANK } from "./helpers";
import { FLIP_SETTLE_MS, FLIP_STAGGER_MS, GAME_KEY, MAX_ROWS, MIN_POOL, WORD_LEN } from "./constants";
import { loadDailyState, loadDailyStreak, saveDailyStreak, writeDailyState } from "./daily-store";
import type {
  BestMoves,
  BestScore,
  DailyState,
  MetaSnapshot,
  Mode,
  Phase,
  Verdict,
  WordLevel,
} from "./types";
import { SetupPanel } from "./setup-panel";
import { DailyDoneView, InfiniteDoneView } from "./done-view";
import { PlayingView } from "./playing-view";

export function WordleGame() {
  const data = useBookData();
  const { bookId } = useBook();
  // بازی فقط داخل کتاب فعال رندر می‌شود (useBookData بالا گارد است) — bookId عملاً هرگز null نیست
  const activeBookId: string = bookId ?? "";

  const [phase, setPhase] = useState<Phase>("setup");
  const [mode, setMode] = useState<Mode>("daily");
  // فاز G2-d — طول واژهٔ حالت بی‌نهایت (پیش‌فرض ۵ = رفتار فعلی)
  const [wordLen, setWordLen] = useState<WordLevel>(5);

  // وضعیت دور «بی‌نهایت»
  const [guesses, setGuesses] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");

  // ورودی جاری + انیمیشن‌ها (مشترک بین دو حالت)
  const [input, setInput] = useState("");
  /** ردیف در حال فلیپ (-1 = هیچ) */
  const [revealRow, setRevealRow] = useState(-1);
  /** چند ستونِ ردیف در حال فلیپ برگشته‌اند */
  const [flipCols, setFlipCols] = useState(0);
  /** کلید لرزش ردیف جاری — با تغییر key انیمیشن دوباره اجرا می‌شود */
  const [shakeKey, setShakeKey] = useState(0);
  const [isRecord, setIsRecord] = useState(false);
  /** پیام باکس aria-live — اعلام نتیجهٔ هر حدس برای فناوری‌های کمکی */
  const [liveMsg, setLiveMsg] = useState("");
  /** فاز G2-d — مدت نهایی دور (ثانیه) برای آمار صفحهٔ نتیجه */
  const [finalSecs, setFinalSecs] = useState(0);

  /** بازی روزانه بسته شده (کاربر به تنظیمات برگشته)؟ — بازیابی خودکار mount مستقل از این است */
  const [dailyClosed, setDailyClosed] = useState(false);

  const { speed } = useVoiceSpeed();
  const locked = useRef(false);
  const timers = useRef<number[]>([]);
  const startedAt = useRef(0);
  // فاز G2-d — زمان توقف‌ها (دستی/تب مخفی) از مدت Attempt کسر می‌شود (الگوی flappy)
  const pausedAccumRef = useRef(0);
  const pauseStartedRef = useRef(0);

  // ── استخرهای واژگان بر حسب طول — یکتا (lowercase) و مرتب (فاز G2-d) ──
  // ساخت استخر ۵حرفی عیناً همان مسیر قبلی است تا seed روزانه (hash روی آرایهٔ مرتب)
  // بایت‌به‌بایت یکسان بماند.
  const poolsByLen = useMemo<Record<WordLevel, VocabEntry[]>>(() => {
    const build = (len: WordLevel): VocabEntry[] => {
      const re = new RegExp(`^[a-zA-Z]{${len}}$`);
      const seen = new Set<string>();
      const out: VocabEntry[] = [];
      for (const w of data.vocab.all) {
        if (!re.test(w.word)) continue;
        const key = w.word.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        out.push(w);
      }
      out.sort((a, b) => {
        const x = a.word.toLowerCase();
        const y = b.word.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
      return out;
    };
    return { 4: build(4), 5: build(5), 6: build(6) };
  }, [data.vocab]);

  /** واژهٔ روز — hash پایدار از `${bookId}:${YYYY-MM-DD}` روی استخر مرتب‌شدهٔ ۵حرفی (دست‌نخورده) */
  const dailyAnswer = useMemo(() => {
    if (poolsByLen[5].length === 0) return "";
    return poolsByLen[5][hashStr(`${activeBookId}:${todayKey()}`) % poolsByLen[5].length].word.toLowerCase();
  }, [poolsByLen, activeBookId]);

  // ── وضعیت روزانه از localStorage — استور بیرونی (بازیابی mount بدون setState در effect) ──
  const dailyJson = useSyncExternalStore(
    subscribeGameData,
    () => {
      const s = loadDailyState(activeBookId);
      return s ? JSON.stringify(s) : "null";
    },
    () => "null",
  );
  const dailyRaw = useMemo<DailyState | null>(
    () => (dailyJson === "null" ? null : (JSON.parse(dailyJson) as DailyState)),
    [dailyJson],
  );

  /** وضعیت روزانهٔ «امروز» — با نرمال‌سازی (رفرش وسط انیمیشن حدس آخر = وضعیت نهایی) */
  const dailyToday = useMemo<DailyState | null>(() => {
    if (!dailyRaw || dailyRaw.date !== todayKey()) return null;
    if (poolsByLen[5].length === 0 || !dailyAnswer) return null;
    if (dailyRaw.status === "playing") {
      if (dailyRaw.guesses.some((g) => g === dailyAnswer)) return { ...dailyRaw, status: "won" };
      if (dailyRaw.guesses.length >= MAX_ROWS) return { ...dailyRaw, status: "lost" };
    }
    return dailyRaw;
  }, [dailyRaw, dailyAnswer, poolsByLen]);

  // ── رکوردها و زنجیره — اسنپ‌شات رشته‌ای پایدار (فاز G2-d: رکورد هر سطح جدا) ──
  const metaJson = useSyncExternalStore(
    subscribeGameData,
    () =>
      JSON.stringify({
        infBest: loadBest<BestMoves>(activeBookId, GAME_KEY, "infinite"),
        infBest4: loadBest<BestMoves>(activeBookId, GAME_KEY, "infinite:4"),
        infBest6: loadBest<BestMoves>(activeBookId, GAME_KEY, "infinite:6"),
        dailyBest: loadBest<BestScore>(activeBookId, GAME_KEY, "daily-streak"),
        streak: loadDailyStreak(activeBookId),
      }),
    () => "null",
  );
  const meta = useMemo<MetaSnapshot>(
    () =>
      metaJson === "null"
        ? { infBest: null, infBest4: null, infBest6: null, dailyBest: null, streak: null }
        : (JSON.parse(metaJson) as MetaSnapshot),
    [metaJson],
  );

  /** رکورد بی‌نهایت هر سطح — ۵حرفی همان scope "infinite" قبلی */
  const bestForLen = useCallback(
    (n: WordLevel): BestMoves | null => (n === 4 ? meta.infBest4 : n === 5 ? meta.infBest : meta.infBest6),
    [meta.infBest, meta.infBest4, meta.infBest6],
  );

  // ── تفکیک نماها ──
  /** روزانهٔ امروز فعال است (بازیابی mount یا شروع دستی) */
  const dailyLive = mode === "daily" && !dailyClosed && dailyToday !== null;
  /** نمای بازی روزانه — حتی حین انیمیشن حدس آخر (وضعیت استور هنوز «playing» یا فلیپ تمام‌نشده) */
  const dailyPlayingView = dailyLive && (dailyToday.status === "playing" || revealRow !== -1);
  const dailyDoneView = dailyLive && !dailyPlayingView;
  const infinitePlaying = phase === "playing" && !dailyLive;
  /** فاز G2-d — هر نمای بازی فعال (روزانه یا بی‌نهایت) — گیت توقف/کیبورد/راهنما */
  const playingActive = dailyPlayingView || infinitePlaying;

  /** طول واژهٔ دور جاری — روزانه همیشه ۵، بی‌نهایت = طول واژهٔ انتخابی */
  const activeLen: WordLevel = dailyLive ? WORD_LEN : ((answer.length || wordLen) as WordLevel);
  const activePool = useMemo(() => poolsByLen[activeLen], [poolsByLen, activeLen]);
  const poolSet = useMemo(() => new Set(activePool.map((w) => w.word.toLowerCase())), [activePool]);

  const activeAnswer = dailyLive ? dailyAnswer : answer;
  const activeCommitted = dailyPlayingView ? dailyToday.guesses : guesses;

  const answerEntry = useMemo<VocabEntry | null>(
    () => activePool.find((w) => w.word.toLowerCase() === activeAnswer) ?? null,
    [activePool, activeAnswer],
  );

  /** بهترین وضعیت هر حرف روی کیبورد — از همهٔ حدس‌های ثبت‌شده */
  const keyStatus = useMemo(() => {
    const map = new Map<string, Verdict>();
    for (const g of activeCommitted) {
      const vs = judgeVerdicts(g, activeAnswer, activeLen);
      for (let i = 0; i < activeLen; i++) {
        const prev = map.get(g[i]);
        if (!prev || VERDICT_RANK[vs[i]] > VERDICT_RANK[prev]) map.set(g[i], vs[i]);
      }
    }
    return map;
  }, [activeCommitted, activeAnswer, activeLen]);

  // ── فاز G2-d — توقف/ادامهٔ استاندارد کیت (حالت روزانه هم قابل توقف است) ──
  // وردل تایمر شمارشی ندارد؛ تنها «زمان Attempt» اندازه‌گیری می‌شود — جمع زمان
  // توقف‌ها (دستی + تب مخفی از خود هوک) در پایان از مدت کسر می‌شود.
  const { paused, resume, pause: pauseGame, toggle: togglePause } = useGamePause((p) => {
    if (p) {
      pauseStartedRef.current = Date.now();
    } else if (pauseStartedRef.current) {
      pausedAccumRef.current += Date.now() - pauseStartedRef.current;
      pauseStartedRef.current = 0;
    }
    if (playingActive) setLiveMsg(p ? "بازی متوقف شد ⏸" : "ادامهٔ بازی ▶");
  });

  // فاز G2-d — نگهبان خروج
  const [exitAsk, setExitAsk] = useState(false);
  // فاز G2-d — کلید صدا/لرزش (الگوی دارباز/جای خالی: state + شنوندهٔ storage — نه setState خام)
  const [muted, setMuted] = useState(isSoundMuted());
  useEffect(() => {
    const sync = (): void => setMuted(isSoundMuted());
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  // فاز G2-d — آموزش یک‌بارنمایش (خودکار در setup) + راهنمای شِل حین بازی (با توقف)
  const {
    open: tutorialOpen,
    openHelp: openTutorial,
    close: closeTutorial,
  } = useAutoTutorial(GAME_KEY, phase === "setup");
  const pausedForHelpRef = useRef(false);
  const handleHelp = useCallback(() => {
    if (playingActive) {
      pausedForHelpRef.current = true;
      pauseGame();
    }
    openTutorial();
  }, [openTutorial, pauseGame, playingActive]);
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

  // فاز G2-d — تله‌متری جلسه (بدون PII: بازی/سطح/مدت رُند/دلیل) — level مثل daily یا endless:5
  const sessionRef = useRef<GameSessionTracker | null>(null);
  // G5-01 — مدرس بازی (کارت شناور داخل GameShell) — دسترسی در callbackهای پایدار با latest-ref (الگوی کیت)
  const hint = useHintCoach(GAME_KEY);
  const hintRef = useRef(hint);
  useEffect(() => {
    hintRef.current = hint;
  });

  // ── تایمرهای پله‌ای فلیپ — همیشه پاک‌شونده ──
  const clearTimers = useCallback(() => {
    for (const t of timers.current) window.clearTimeout(t);
    timers.current = [];
  }, []);

  // فاز G2-d — دورِ باز در unmount «رهاشده» ثبت می‌شود (اگر قبلاً گزارش شده باشد no-op)
  useEffect(() => {
    return () => {
      sessionRef.current?.abandon("unmount");
      stopSpeaking();
      for (const t of timers.current) window.clearTimeout(t);
    };
  }, []);

  // ── پایان دور — استریک/جلسه/Attempt/SRS/رکورد (فاز G2-d: صدا/لرزش + مدت بدون توقف‌ها) ──
  const finishGame = useCallback(
    (win: boolean, rowsUsed: number, gameMode: Mode, answerWord: string) => {
      touchStreak();
      recordStudySession();
      bumpPlays(activeBookId, GAME_KEY);
      // فاز G2-d — پایان عادی جلسهٔ تله‌متری
      sessionRef.current?.end("finish");
      const started = startedAt.current || Date.now();
      startedAt.current = 0;
      const duration = Math.max(1, Math.round((Date.now() - started - pausedAccumRef.current) / 1000));
      setFinalSecs(duration);
      saveAttempt(activeBookId, GAME_KEY, {
        lesson: 0, // وردل کتاب‌محور است (بدون انتخاب درس)
        total: 1,
        correct: win ? 1 : 0,
        duration,
        // فاز G2-d — detail افزودنی: level (۴|۵|۶) بدون تغییر ساختار فعلی
        detail: { word: answerWord, rows: rowsUsed, mode: gameMode, level: answerWord.length as WordLevel },
      });
      // فاز G2-d — واژهٔ هدف به SRS می‌رود: برد=✓، باخت=✗ (طبق سربرگ فایل و تسک)
      recordSRS(answerWord, win);
      if (win) {
        speak(answerWord, { speed });
        // فاز G2-d — بازخورد سه‌کانالهٔ برد
        playSound("win");
        buzz("record");
        if (gameMode === "infinite") {
          // رکورد هر سطح جدا — ۵حرفی همان scope "infinite" قبلی (سازگاری رکوردها)
          const len = answerWord.length as WordLevel;
          const scope = len === 5 ? "infinite" : `infinite:${len}`;
          const prev = loadBest<BestMoves>(activeBookId, GAME_KEY, scope);
          if (!prev || rowsUsed < prev.moves) {
            saveBest<BestMoves>(activeBookId, GAME_KEY, scope, { moves: rowsUsed });
            setIsRecord(true);
            playSound("record");
            buzz("record");
            toast.success(`رکورد جدید! برد با ${faNum(rowsUsed)} حدس 🏆`);
          } else {
            toast.success(`واژه را با ${faNum(rowsUsed)} حدس پیدا کردی! 🎉`);
          }
        } else {
          // زنجیرهٔ برد پیاپی روزانه — از localStorage خود بازی (منطق دست‌نخورده)
          const today = todayKey();
          const prevStreak = loadDailyStreak(activeBookId);
          const streak = prevStreak && prevStreak.date === shiftDate(today, -1) ? prevStreak.streak + 1 : 1;
          saveDailyStreak(activeBookId, { date: today, streak });
          const prevBest = loadBest<BestScore>(activeBookId, GAME_KEY, "daily-streak");
          if (!prevBest || streak > prevBest.score) {
            saveBest<BestScore>(activeBookId, GAME_KEY, "daily-streak", { score: streak });
            setIsRecord(true);
            playSound("record");
            buzz("record");
            toast.success(`رکورد زنجیره! ${faNum(streak)} برد پیاپی 🏆`);
          } else {
            toast.success(`واژهٔ امروز پیدا شد — زنجیرهٔ ${faNum(streak)} روزه! 🎉`);
          }
        }
        setLiveMsg(`کلمه ${answerWord.toUpperCase()} بود! 🎉`);
      } else {
        // فاز G2-d — بازخورد سه‌کانالهٔ باخت
        playSound("wrong");
        buzz("error");
        // G5-01 — مدرس بازی: باخت دور یک خطا است (واژهٔ درست برای توضیح مدرس)
        hintRef.current.recordMistake({ answer: answerWord });
        toast.error("این‌بار پیدا نشد — واژهٔ درست را ببین");
        setLiveMsg(`کلمه این بود: ${answerWord.toUpperCase()}`);
      }
      if (gameMode === "infinite") setPhase("done"); // روزانه: نما از استور مشتق می‌شود
    },
    [activeBookId, speed],
  );

  // ── ارسال حدس ──
  const submitGuess = useCallback(() => {
    if (locked.current || !activeAnswer) return;
    const rowIdx = activeCommitted.length;
    if (rowIdx >= MAX_ROWS) return;
    const guess = input.toLowerCase();
    if (guess.length < activeLen) {
      setShakeKey((k) => k + 1);
      toast.error(`حدس باید ${faNum(activeLen)} حرف باشد`);
      return;
    }
    if (!poolSet.has(guess)) {
      setShakeKey((k) => k + 1);
      toast.error(`این واژه در واژگان ${faNum(activeLen)}حرفی کتاب نیست`);
      return;
    }
    // فاز G2-d — بازخورد per-submit: سطر ارزیابی شد (حروف تایپی عمداً صدا نمی‌گیرند)
    playSound("click");
    buzz("light");
    const gameMode: Mode = dailyPlayingView ? "daily" : "infinite";
    const nextCommitted = [...activeCommitted, guess];
    const win = guess === activeAnswer;
    const rowsUsed = nextCommitted.length;
    const finished = win || rowsUsed >= MAX_ROWS;

    // اعلام زندهٔ نتیجهٔ حدس برای فناوری‌های کمکی (WCAG 4.1.3) — رنگ به‌تنهایی کافی نیست
    const verdicts = judgeVerdicts(guess, activeAnswer, activeLen);
    const greens = verdicts.filter((v) => v === "correct").length;
    const yellows = verdicts.filter((v) => v === "present").length;
    setLiveMsg(
      win
        ? `«${guess.toUpperCase()}» درست بود! 🎉`
        : `حدس ${faNum(rowsUsed)}: ${faNum(greens)} حرف سبز، ${faNum(yellows)} زرد، ${faNum(activeLen - greens - yellows)} خاکستری`,
    );

    locked.current = true;
    setInput("");
    setRevealRow(rowIdx);
    setFlipCols(0);
    if (dailyPlayingView) {
      // ثبت فوری در localStorage — رفرش وسط بازی پیشرفت را از دست نمی‌دهد
      writeDailyState(activeBookId, {
        date: todayKey(),
        guesses: nextCommitted,
        status: finished ? (win ? "won" : "lost") : "playing",
      });
    } else {
      setGuesses(nextCommitted);
    }

    // فلیپ پله‌ای ستون‌ها — ۲۰۰ms فاصله
    for (let c = 0; c < activeLen; c++) {
      timers.current.push(window.setTimeout(() => setFlipCols((f) => f + 1), FLIP_STAGGER_MS * (c + 1)));
    }
    timers.current.push(
      window.setTimeout(
        () => {
          setRevealRow(-1);
          setFlipCols(0);
          locked.current = false;
          if (finished) finishGame(win, rowsUsed, gameMode, activeAnswer);
        },
        FLIP_STAGGER_MS * activeLen + FLIP_SETTLE_MS,
      ),
    );
  }, [input, activeCommitted, activeAnswer, activeLen, activeBookId, dailyPlayingView, finishGame, poolSet]);

  const typeLetter = useCallback(
    (letter: string) => {
      if (locked.current) return;
      setInput((prev) => (prev.length < activeLen ? prev + letter : prev));
    },
    [activeLen],
  );

  const eraseLetter = useCallback(() => {
    if (locked.current) return;
    setInput((prev) => prev.slice(0, -1));
  }, []);

  // ── شروع‌ها ──
  const startDaily = useCallback(() => {
    if (poolsByLen[5].length < MIN_POOL) {
      toast.error(`استخر واژگان ۵حرفی این کتاب کم است — حداقل ${faNum(MIN_POOL)} واژه لازم است`);
      return;
    }
    // فاز G2-d — بازخورد کلیک شروع (الگوی جای خالی)
    playSound("click");
    buzz("light");
    clearTimers();
    locked.current = false;
    setInput("");
    setRevealRow(-1);
    setFlipCols(0);
    setIsRecord(false);
    setFinalSecs(0);
    setLiveMsg("");
    hintRef.current.reset(); // G5-01 — دور تازه
    pausedAccumRef.current = 0;
    pauseStartedRef.current = 0;
    if (!dailyToday && dailyAnswer) {
      writeDailyState(activeBookId, { date: todayKey(), guesses: [], status: "playing" });
    }
    setDailyClosed(false);
    setMode("daily");
    resume();
    // فاز G2-d — جلسهٔ تازهٔ تله‌متری (level = daily)
    sessionRef.current = createGameSession({ game: GAME_KEY, level: "daily" });
    sessionRef.current.start();
    startedAt.current = Date.now();
  }, [poolsByLen, dailyToday, dailyAnswer, activeBookId, clearTimers, resume]);

  const startInfinite = useCallback(() => {
    // فاز G2-d — استخر سطح انتخابی؛ اگر کم بود، fallback به ۵حرفی با پیام زنده
    let len: WordLevel = wordLen;
    let fellBack = false;
    if (poolsByLen[len].length < MIN_POOL) {
      if (len !== 5) {
        toast.message(`استخر واژگان ${faNum(len)}حرفی این کتاب کم است — با ۵حرفی ادامه می‌دهیم`);
        len = 5;
        fellBack = true;
      }
      if (poolsByLen[len].length < MIN_POOL) {
        toast.error(`استخر واژگان ۵حرفی این کتاب کم است — حداقل ${faNum(MIN_POOL)} واژه لازم است`);
        return;
      }
    }
    const p = poolsByLen[len];
    playSound("click");
    buzz("light");
    clearTimers();
    locked.current = false;
    const picked = p[Math.floor(Math.random() * p.length)];
    setAnswer(picked.word.toLowerCase());
    setGuesses([]);
    setInput("");
    setRevealRow(-1);
    setFlipCols(0);
    setIsRecord(false);
    setFinalSecs(0);
    setLiveMsg(fellBack ? `استخر ${faNum(wordLen)}حرفی کم بود — دور با واژه‌های ۵حرفی شروع شد` : "");
    hintRef.current.reset(); // G5-01 — دور تازه
    pausedAccumRef.current = 0;
    pauseStartedRef.current = 0;
    setMode("infinite");
    setPhase("playing");
    resume();
    // فاز G2-d — جلسهٔ تازهٔ تله‌متری (level = endless:{طول واقعی دور})
    sessionRef.current = createGameSession({ game: GAME_KEY, level: `endless:${len}` });
    sessionRef.current.start();
    startedAt.current = Date.now();
  }, [wordLen, poolsByLen, clearTimers, resume]);

  /** بازگشت به تنظیمات — پیشرفت روزانه در localStorage می‌ماند */
  const backToSetup = useCallback(() => {
    clearTimers();
    locked.current = false;
    stopSpeaking();
    setInput("");
    setRevealRow(-1);
    setFlipCols(0);
    setDailyClosed(true);
    resume();
    setPhase("setup");
  }, [clearTimers, resume]);

  // فاز G2-d — تأیید نگهبان خروج: رهاکردن دور نیمه‌کاره (تله‌متری) + بازگشت
  const confirmExit = useCallback(() => {
    sessionRef.current?.abandon("exit");
    setExitAsk(false);
    backToSetup();
  }, [backToSetup]);

  // فاز G2-d — انصراف حین بازی: حداقل ۱ حدس ثبت‌شده → نگهبان؛ بدون حدس → خروج مستقیم
  const handleExitClick = useCallback(() => {
    stopSpeaking();
    if (activeCommitted.length > 0) {
      setExitAsk(true);
    } else {
      sessionRef.current?.abandon("exit");
      backToSetup();
    }
  }, [activeCommitted.length, backToSetup]);

  // ── کیبورد فیزیکی — در effect با cleanup (فاز G2-d: گیت paused/نگهبان خروج) ──
  useEffect(() => {
    if (!playingActive || paused || exitAsk) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "Enter") {
        e.preventDefault();
        submitGuess();
        return;
      }
      if (e.key === "Backspace") {
        e.preventDefault();
        eraseLetter();
        return;
      }
      if (/^[a-zA-Z]$/.test(e.key)) typeLetter(e.key.toLowerCase());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playingActive, paused, exitAsk, submitGuess, eraseLetter, typeLetter]);

  // ── Done: روزانه (نمای مشتق‌شده از استور — رفرش‌پذیر) — فاز G2-d: ResultScreen ──
  // (گارد && dailyToday فقط برای narrow کردن نوع prop است — dailyDoneView خودش مستلزم non-null بودن dailyToday است)
  if (dailyDoneView && dailyToday) {
    return (
      <DailyDoneView
        dailyToday={dailyToday}
        dailyAnswer={dailyAnswer}
        answerEntry={answerEntry}
        activeAnswer={activeAnswer}
        isRecord={isRecord}
        finalSecs={finalSecs}
        meta={meta}
        liveMsg={liveMsg}
        startInfinite={startInfinite}
        backToSetup={backToSetup}
        tutorialOpen={tutorialOpen}
        handleTutorialOpenChange={handleTutorialOpenChange}
      />
    );
  }

  // ── Playing — بدنهٔ شاخه به PlayingView منتقل شد (اصل ۸۸۳..۱۰۷۹ — props هم‌نام) ──
  if (dailyPlayingView || infinitePlaying) {
    return (
      <PlayingView
        dailyPlayingView={dailyPlayingView}
        activeLen={activeLen}
        activeCommitted={activeCommitted}
        activeAnswer={activeAnswer}
        input={input}
        keyStatus={keyStatus}
        shakeKey={shakeKey}
        revealRow={revealRow}
        flipCols={flipCols}
        meta={meta}
        liveMsg={liveMsg}
        paused={paused}
        togglePause={togglePause}
        muted={muted}
        setMuted={setMuted}
        handleHelp={handleHelp}
        handleExitClick={handleExitClick}
        submitGuess={submitGuess}
        eraseLetter={eraseLetter}
        typeLetter={typeLetter}
        resume={resume}
        exitAsk={exitAsk}
        setExitAsk={setExitAsk}
        confirmExit={confirmExit}
        hint={hint}
        tutorialOpen={tutorialOpen}
        handleTutorialOpenChange={handleTutorialOpenChange}
      />
    );
  }

  // ── Done: بی‌نهایت — بدنهٔ شاخه به InfiniteDoneView منتقل شد (اصل ۱۰۸۳..۱۱۵۴) ──
  if (phase === "done") {
    return (
      <InfiniteDoneView
        guesses={guesses}
        answer={answer}
        isRecord={isRecord}
        finalSecs={finalSecs}
        meta={meta}
        liveMsg={liveMsg}
        startInfinite={startInfinite}
        setPhase={setPhase}
        answerEntry={answerEntry}
        activeAnswer={activeAnswer}
        tutorialOpen={tutorialOpen}
        handleTutorialOpenChange={handleTutorialOpenChange}
      />
    );
  }

  // ── Setup — بدنهٔ پایانی به SetupPanel منتقل شد (اصل ۱۱۵۷..۱۳۳۹ — props هم‌نام) ──
  return (
    <SetupPanel
      mode={mode}
      setMode={setMode}
      wordLen={wordLen}
      setWordLen={setWordLen}
      dailyToday={dailyToday}
      poolsByLen={poolsByLen}
      bestForLen={bestForLen}
      meta={meta}
      startDaily={startDaily}
      startInfinite={startInfinite}
      tutorialOpen={tutorialOpen}
      handleTutorialOpenChange={handleTutorialOpenChange}
    />
  );
}
