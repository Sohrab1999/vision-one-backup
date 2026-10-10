"use client";

/**
 * بازی «وردل ویژن» (Vision Wordle) — فاز ۴ نقشه راه جامع ۲۰۲۶.
 *
 * حدس زدن یک واژهٔ ۵حرفی از واژگان ۵حرفی خود کتاب در ۶ تلاش، با رنگ‌بندی
 * دو-گذرهٔ حروف (سبز/زرد/خاکستری — دقیقاً با احترام به حروف تکراری):
 * - «روزانه»: واژهٔ روز با seed پایدار = hash(`${bookId}:${YYYY-MM-DD}`) روی
 *   استخر مرتب‌شده؛ وضعیت روز در localStorage (`visionone:wordle-daily:{book}`)
 *   ذخیره و در mount (حتی بعد از رفرش) بازیابی می‌شود.
 * - «بی‌نهایت»: هر دور یک واژهٔ تصادفی تازه.
 * - رکوردها: بی‌نهایت = کمترین حدسِ برد (scope "infinite")؛
 *   روزانه = طولانی‌ترین زنجیرهٔ برد پیاپی (scope "daily-streak").
 * - پایان برد: تلفظ + SRS(✓) — پایان باخت: واژهٔ درست + SRS(✗) + صف مرور.
 */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  Keyboard,
  Sun,
  Infinity as InfinityIcon,
  Play,
  RotateCcw,
  Trophy,
  PartyPopper,
  CheckCircle2,
  XCircle,
  Sparkles,
  Clock,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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
  notifyGameData,
  saveAttempt,
  saveBest,
  subscribeGameData,
} from "./shared";

type Phase = "setup" | "playing" | "done";
type Mode = "daily" | "infinite";
/** حکم یک حرف بعد از ارسال حدس */
type Verdict = "correct" | "present" | "absent";

/** وضعیت بازی روزانهٔ یک کتاب — در `visionone:wordle-daily:{bookId}` */
interface DailyState {
  date: string;
  guesses: string[];
  status: "playing" | "won" | "lost";
}

/** زنجیرهٔ برد پیاپی روزانه — در `visionone:wordle-streak:{bookId}` */
interface DailyStreakState {
  /** تاریخ آخرین برد روزانه */
  date: string;
  streak: number;
}

/** رکورد بی‌نهایت — کمترین حدسِ برد */
interface BestMoves {
  moves: number;
}

/** رکورد روزانه — طولانی‌ترین زنجیرهٔ برد پیاپی */
interface BestScore {
  score: number;
}

const GAME_KEY = "wordle";
const WORD_LEN = 5;
const MAX_ROWS = 6;
/** فاصلهٔ پله‌ای فلیپ بین ستون‌ها (ms) */
const FLIP_STAGGER_MS = 200;
/** مکث بعد از آخرین فلیپ تا آزادشدن ورودی/نمایش نتیجه (ms) */
const FLIP_SETTLE_MS = 450;
/** حداقل واژهٔ ۵حرفی استخر برای شروع */
const MIN_POOL = 10;

/** فقط واژه‌های لاتین دقیقاً ۵حرفی وارد بازی می‌شوند */
const WORD_RE = /^[a-zA-Z]{5}$/;

// ─── توابع خالص (module-scope) ───

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

/** تاریخ امروز به شکل YYYY-MM-DD (تقویم محلی — پایدار بین رفرش‌ها) */
function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

/** جابه‌جایی تقویمی تاریخ YYYY-MM-DD (بدون وابستگی به منطقهٔ زمانی) */
function shiftDate(date: string, days: number): string {
  const parts = date.split("-").map(Number);
  const t = new Date(Date.UTC(parts[0], (parts[1] ?? 1) - 1, parts[2] ?? 1) + days * 86400000);
  return `${t.getUTCFullYear()}-${pad2(t.getUTCMonth() + 1)}-${pad2(t.getUTCDate())}`;
}

/** هش ساده و پایدار (djb2) برای انتخاب واژهٔ روز */
function hashStr(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * رنگ‌بندی دو-گذرهٔ وردل — گذر اول فقط سبزها را می‌شمارد، گذر دوم
 * زرد/خاکستری را با شمارش حروف باقی‌ماندهٔ پاسخ تعیین می‌کند
 * (پاسخ کلاسیک: answer "speed" × guess "erase" → Eسبز، Rخاکستری، Aخاکستری، Sسبز، Eزرد).
 */
function judgeVerdicts(guess: string, answer: string): Verdict[] {
  const res: Verdict[] = Array<Verdict>(WORD_LEN).fill("absent");
  const remaining: Record<string, number> = {};
  for (let i = 0; i < WORD_LEN; i++) {
    if (guess[i] === answer[i]) {
      res[i] = "correct";
    } else {
      remaining[answer[i]] = (remaining[answer[i]] ?? 0) + 1;
    }
  }
  for (let i = 0; i < WORD_LEN; i++) {
    if (res[i] === "correct") continue;
    const ch = guess[i];
    if ((remaining[ch] ?? 0) > 0) {
      res[i] = "present";
      remaining[ch] -= 1;
    }
  }
  return res;
}

const VERDICT_RANK: Record<Verdict, number> = { absent: 1, present: 2, correct: 3 };

/** کلاس رنگ هر حکم — سبز = emerald، زرد = amber، خاکستری = muted */
const VERDICT_FACE: Record<Verdict, string> = {
  correct: "border-emerald-600 bg-emerald-600 text-white",
  present: "border-amber-500 bg-amber-500 text-amber-950",
  absent: "border-muted bg-muted text-muted-foreground",
};

/** توضیح فارسی هر حکم — برای aria-label سلول‌ها */
const VERDICT_FA: Record<Verdict, string> = {
  correct: "سبز — جای درست",
  present: "زرد — حرف هست ولی جای دیگر",
  absent: "خاکستری — در واژه نیست",
};

/** چیدمان QWERTY کیبورد روی صفحه (dir=ltr) */
const KEY_ROWS: string[][] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "back"],
];

// ─── localStorage روزانه ───

function dailyKeyOf(bookId: string): string {
  return `visionone:wordle-daily:${bookId}`;
}

function streakKeyOf(bookId: string): string {
  return `visionone:wordle-streak:${bookId}`;
}

function loadDailyState(bookId: string): DailyState | null {
  try {
    const raw = localStorage.getItem(dailyKeyOf(bookId));
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<DailyState> | null;
    if (!p || typeof p.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(p.date)) return null;
    if (p.status !== "playing" && p.status !== "won" && p.status !== "lost") return null;
    if (!Array.isArray(p.guesses)) return null;
    const guesses = p.guesses
      .filter((g): g is string => typeof g === "string" && WORD_RE.test(g))
      .slice(0, MAX_ROWS);
    return { date: p.date, guesses, status: p.status };
  } catch {
    return null;
  }
}

function writeDailyState(bookId: string, s: DailyState): void {
  try {
    localStorage.setItem(dailyKeyOf(bookId), JSON.stringify(s));
  } catch {
    /* noop */
  }
  notifyGameData();
}

function loadDailyStreak(bookId: string): DailyStreakState | null {
  try {
    const raw = localStorage.getItem(streakKeyOf(bookId));
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<DailyStreakState> | null;
    if (!p || typeof p.date !== "string" || typeof p.streak !== "number") return null;
    return { date: p.date, streak: p.streak };
  } catch {
    return null;
  }
}

function saveDailyStreak(bookId: string, s: DailyStreakState): void {
  try {
    localStorage.setItem(streakKeyOf(bookId), JSON.stringify(s));
  } catch {
    /* noop */
  }
  notifyGameData();
}

export function WordleGame() {
  const data = useBookData();
  const { bookId } = useBook();
  // بازی فقط داخل کتاب فعال رندر می‌شود (useBookData بالا گارد است) — bookId عملاً هرگز null نیست
  const activeBookId: string = bookId ?? "";

  const [phase, setPhase] = useState<Phase>("setup");
  const [mode, setMode] = useState<Mode>("daily");

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

  /** بازی روزانه بسته شده (کاربر به تنظیمات برگشته)؟ — بازیابی خودکار mount مستقل از این است */
  const [dailyClosed, setDailyClosed] = useState(false);

  const { speed } = useVoiceSpeed();
  const locked = useRef(false);
  const timers = useRef<number[]>([]);
  const startedAt = useRef(0);

  // ── استخر واژگان ۵حرفی — یکتا (lowercase) و مرتب (seed پایدار روزانه) ──
  const pool = useMemo<VocabEntry[]>(() => {
    const seen = new Set<string>();
    const out: VocabEntry[] = [];
    for (const w of data.vocab.all) {
      if (!WORD_RE.test(w.word)) continue;
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
  }, [data.vocab]);

  const poolSet = useMemo(() => new Set(pool.map((w) => w.word.toLowerCase())), [pool]);

  /** واژهٔ روز — hash پایدار از `${bookId}:${YYYY-MM-DD}` روی استخر مرتب‌شده */
  const dailyAnswer = useMemo(() => {
    if (pool.length === 0) return "";
    return pool[hashStr(`${activeBookId}:${todayKey()}`) % pool.length].word.toLowerCase();
  }, [pool, activeBookId]);

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
    if (pool.length === 0 || !dailyAnswer) return null;
    if (dailyRaw.status === "playing") {
      if (dailyRaw.guesses.some((g) => g === dailyAnswer)) return { ...dailyRaw, status: "won" };
      if (dailyRaw.guesses.length >= MAX_ROWS) return { ...dailyRaw, status: "lost" };
    }
    return dailyRaw;
  }, [dailyRaw, pool.length, dailyAnswer]);

  // ── رکوردها و زنجیره — اسنپ‌شات رشته‌ای پایدار (الگوی match-game) ──
  const metaJson = useSyncExternalStore(
    subscribeGameData,
    () =>
      JSON.stringify({
        infBest: loadBest<BestMoves>(activeBookId, GAME_KEY, "infinite"),
        dailyBest: loadBest<BestScore>(activeBookId, GAME_KEY, "daily-streak"),
        streak: loadDailyStreak(activeBookId),
      }),
    () => "null",
  );
  const meta = useMemo<{ infBest: BestMoves | null; dailyBest: BestScore | null; streak: DailyStreakState | null }>(
    () =>
      metaJson === "null"
        ? { infBest: null, dailyBest: null, streak: null }
        : (JSON.parse(metaJson) as { infBest: BestMoves | null; dailyBest: BestScore | null; streak: DailyStreakState | null }),
    [metaJson],
  );

  // ── تفکیک نماها ──
  /** روزانهٔ امروز فعال است (بازیابی mount یا شروع دستی) */
  const dailyLive = mode === "daily" && !dailyClosed && dailyToday !== null;
  /** نمای بازی روزانه — حتی حین انیمیشن حدس آخر (وضعیت استور هنوز «playing» یا فلیپ تمام‌نشده) */
  const dailyPlayingView = dailyLive && (dailyToday.status === "playing" || revealRow !== -1);
  const dailyDoneView = dailyLive && !dailyPlayingView;
  const infinitePlaying = phase === "playing" && !dailyLive;

  const activeAnswer = dailyLive ? dailyAnswer : answer;
  const activeCommitted = dailyPlayingView ? dailyToday.guesses : guesses;

  const answerEntry = useMemo<VocabEntry | null>(
    () => pool.find((w) => w.word.toLowerCase() === activeAnswer) ?? null,
    [pool, activeAnswer],
  );

  /** بهترین وضعیت هر حرف روی کیبورد — از همهٔ حدس‌های ثبت‌شده */
  const keyStatus = useMemo(() => {
    const map = new Map<string, Verdict>();
    for (const g of activeCommitted) {
      const vs = judgeVerdicts(g, activeAnswer);
      for (let i = 0; i < WORD_LEN; i++) {
        const prev = map.get(g[i]);
        if (!prev || VERDICT_RANK[vs[i]] > VERDICT_RANK[prev]) map.set(g[i], vs[i]);
      }
    }
    return map;
  }, [activeCommitted, activeAnswer]);

  // ── تایمرهای پله‌ای فلیپ — همیشه پاک‌شونده ──
  const clearTimers = useCallback(() => {
    for (const t of timers.current) window.clearTimeout(t);
    timers.current = [];
  }, []);

  useEffect(() => {
    return () => {
      stopSpeaking();
      for (const t of timers.current) window.clearTimeout(t);
    };
  }, []);

  // ── پایان دور — استریک/جلسه/Attempt/SRS/رکورد ──
  const finishGame = useCallback(
    (win: boolean, rowsUsed: number, gameMode: Mode, word: string) => {
      touchStreak();
      recordStudySession();
      bumpPlays(activeBookId, GAME_KEY);
      const started = startedAt.current || Date.now();
      startedAt.current = 0;
      const duration = Math.max(1, Math.round((Date.now() - started) / 1000));
      saveAttempt(activeBookId, GAME_KEY, {
        lesson: 0, // وردل کتاب‌محور است (بدون انتخاب درس)
        total: 1,
        correct: win ? 1 : 0,
        duration,
        detail: { word, rows: rowsUsed, mode: gameMode },
      });
      recordSRS(word, win);
      if (win) {
        speak(word, { speed });
        if (gameMode === "infinite") {
          const prev = loadBest<BestMoves>(activeBookId, GAME_KEY, "infinite");
          if (!prev || rowsUsed < prev.moves) {
            saveBest<BestMoves>(activeBookId, GAME_KEY, "infinite", { moves: rowsUsed });
            setIsRecord(true);
            toast.success(`رکورد جدید! برد با ${faNum(rowsUsed)} حدس 🏆`);
          } else {
            toast.success(`واژه را با ${faNum(rowsUsed)} حدس پیدا کردی! 🎉`);
          }
        } else {
          // زنجیرهٔ برد پیاپی روزانه — از localStorage خود بازی
          const today = todayKey();
          const prevStreak = loadDailyStreak(activeBookId);
          const streak = prevStreak && prevStreak.date === shiftDate(today, -1) ? prevStreak.streak + 1 : 1;
          saveDailyStreak(activeBookId, { date: today, streak });
          const prevBest = loadBest<BestScore>(activeBookId, GAME_KEY, "daily-streak");
          if (!prevBest || streak > prevBest.score) {
            saveBest<BestScore>(activeBookId, GAME_KEY, "daily-streak", { score: streak });
            setIsRecord(true);
            toast.success(`رکورد زنجیره! ${faNum(streak)} برد پیاپی 🏆`);
          } else {
            toast.success(`واژهٔ امروز پیدا شد — زنجیرهٔ ${faNum(streak)} روزه! 🎉`);
          }
        }
      } else {
        toast.error("این‌بار پیدا نشد — واژهٔ درست را ببین");
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
    if (guess.length < WORD_LEN) {
      setShakeKey((k) => k + 1);
      toast.error("حدس باید ۵ حرف باشد");
      return;
    }
    if (!poolSet.has(guess)) {
      setShakeKey((k) => k + 1);
      toast.error("این واژه در واژگان کتاب نیست");
      return;
    }
    const gameMode: Mode = dailyPlayingView ? "daily" : "infinite";
    const nextCommitted = [...activeCommitted, guess];
    const win = guess === activeAnswer;
    const rowsUsed = nextCommitted.length;
    const finished = win || rowsUsed >= MAX_ROWS;

    // اعلام زندهٔ نتیجهٔ حدس برای فناوری‌های کمکی (WCAG 4.1.3) — رنگ به‌تنهایی کافی نیست
    const verdicts = judgeVerdicts(guess, activeAnswer);
    const greens = verdicts.filter((v) => v === "correct").length;
    const yellows = verdicts.filter((v) => v === "present").length;
    setLiveMsg(
      win
        ? `«${guess.toUpperCase()}» درست بود! 🎉`
        : `حدس ${faNum(rowsUsed)}: ${faNum(greens)} حرف سبز، ${faNum(yellows)} زرد، ${faNum(WORD_LEN - greens - yellows)} خاکستری`,
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
    for (let c = 0; c < WORD_LEN; c++) {
      timers.current.push(window.setTimeout(() => setFlipCols((f) => f + 1), FLIP_STAGGER_MS * (c + 1)));
    }
    timers.current.push(
      window.setTimeout(
        () => {
          setRevealRow(-1);
          setFlipCols(0);
          locked.current = false;
          if (finished) finishGame(win, rowsUsed, gameMode, guess);
        },
        FLIP_STAGGER_MS * WORD_LEN + FLIP_SETTLE_MS,
      ),
    );
  }, [input, activeCommitted, activeAnswer, dailyPlayingView, activeBookId, poolSet, finishGame]);

  const typeLetter = useCallback((letter: string) => {
    if (locked.current) return;
    setInput((prev) => (prev.length < WORD_LEN ? prev + letter : prev));
  }, []);

  const eraseLetter = useCallback(() => {
    if (locked.current) return;
    setInput((prev) => prev.slice(0, -1));
  }, []);

  // ── شروع‌ها ──
  const startDaily = useCallback(() => {
    if (pool.length < MIN_POOL) {
      toast.error(`استخر واژگان ۵حرفی این کتاب کم است — حداقل ${faNum(MIN_POOL)} واژه لازم است`);
      return;
    }
    clearTimers();
    locked.current = false;
    setInput("");
    setRevealRow(-1);
    setFlipCols(0);
    setIsRecord(false);
    if (!dailyToday && dailyAnswer) {
      writeDailyState(activeBookId, { date: todayKey(), guesses: [], status: "playing" });
    }
    setDailyClosed(false);
    setMode("daily");
    startedAt.current = Date.now();
  }, [pool.length, dailyToday, dailyAnswer, activeBookId, clearTimers]);

  const startInfinite = useCallback(() => {
    if (pool.length < MIN_POOL) {
      toast.error(`استخر واژگان ۵حرفی این کتاب کم است — حداقل ${faNum(MIN_POOL)} واژه لازم است`);
      return;
    }
    clearTimers();
    locked.current = false;
    const picked = pool[Math.floor(Math.random() * pool.length)];
    setAnswer(picked.word.toLowerCase());
    setGuesses([]);
    setInput("");
    setRevealRow(-1);
    setFlipCols(0);
    setIsRecord(false);
    setMode("infinite");
    setPhase("playing");
    startedAt.current = Date.now();
  }, [pool, clearTimers]);

  /** بازگشت به تنظیمات — پیشرفت روزانه در localStorage می‌ماند */
  const backToSetup = useCallback(() => {
    clearTimers();
    locked.current = false;
    stopSpeaking();
    setInput("");
    setRevealRow(-1);
    setFlipCols(0);
    setDailyClosed(true);
    setPhase("setup");
  }, [clearTimers]);

  // ── کیبورد فیزیکی — در effect با cleanup ──
  useEffect(() => {
    if (!dailyPlayingView && !infinitePlaying) return;
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
  }, [dailyPlayingView, infinitePlaying, submitGuess, eraseLetter, typeLetter]);

  // ── Setup ──
  if (dailyDoneView) {
    // ── Done: روزانه (نمای مشتق‌شده از استور — رفرش‌پذیر) ──
    const won = dailyToday.status === "won";
    const rowsUsed = dailyToday.guesses.length;
    return (
      <Card className={cn("mx-auto max-w-xl rise-in", won ? "border-emerald-500/30" : "border-amber-500/30")}>
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <span
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-full",
              won ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/15 text-amber-600 dark:text-amber-400",
            )}
          >
            {won ? <PartyPopper size={30} /> : <XCircle size={30} />}
          </span>
          <h2 className="text-xl font-black">{won ? "واژهٔ امروز پیدا شد!" : "امروز پیدا نشد"}</h2>
          {won && isRecord && (
            <Badge className="gap-1.5 bg-amber-500 text-amber-950 shadow-md shadow-amber-500/30">
              <Trophy size={13} />
              رکورد جدید! 🏆
            </Badge>
          )}

          <div className="w-full space-y-2 rounded-xl border bg-muted/40 p-4">
            <p dir="ltr" className="font-en text-2xl font-black tracking-wider">
              {dailyAnswer.toUpperCase()}
            </p>
            {answerEntry && <p className="text-[13px] font-bold leading-6">{answerEntry.meaning}</p>}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {answerEntry && <Badge variant="secondary" className="text-[10px]">{answerEntry.lessonLabel}</Badge>}
              {answerEntry?.pos && (
                <Badge variant="outline" dir="ltr" className="font-en text-[10px]">
                  {answerEntry.pos}
                </Badge>
              )}
              <Badge variant="secondary" className="gap-1 text-[10px]">
                <Target size={10} />
                {faNum(rowsUsed)} از {faNum(MAX_ROWS)} حدس
              </Badge>
            </div>
            {!won && (
              <div className="flex justify-center">
                <Badge
                  variant="outline"
                  className="gap-1 border-emerald-500/40 text-[10px] text-emerald-600 dark:text-emerald-400"
                >
                  <CheckCircle2 size={10} />
                  به مرور اضافه شد
                </Badge>
              </div>
            )}
          </div>

          {won && meta.streak && meta.streak.streak > 1 && (
            <Badge variant="outline" className="gap-1.5 border-emerald-500/40 text-emerald-600 dark:text-emerald-400">
              <Trophy size={12} />
              زنجیرهٔ برد فعلی: {faNum(meta.streak.streak)} روز
            </Badge>
          )}

          {/* شمارش معکوس متنی — بدون تایمر زنده */}
          <p className="flex items-center gap-1.5 text-[12px] font-bold text-muted-foreground">
            <Clock size={14} className="text-teal-500" />
            واژهٔ بعدی فردا آماده می‌شود
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            <Button className="min-h-11 gap-2" onClick={startInfinite}>
              <InfinityIcon size={16} />
              حالت بی‌نهایت
            </Button>
            <Button variant="outline" className="min-h-11" onClick={backToSetup}>
              بازگشت
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (dailyPlayingView || infinitePlaying) {
    // ── Playing: گرید ۶×۵ + کیبورد (مشترک بین دو حالت) ──
    const isDaily = dailyPlayingView;
    return (
      <div role="group" aria-label="بازی وردل ویژن" className="mx-auto max-w-sm space-y-4 rise-in">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="gap-1 text-[11px]">
            {isDaily ? (
              <Sun size={11} className="text-amber-500" />
            ) : (
              <InfinityIcon size={11} className="text-teal-500" />
            )}
            {isDaily ? "واژهٔ امروز" : "بی‌نهایت"}
          </Badge>
          <Badge variant="secondary" className="gap-1 text-[11px]">
            <Target size={11} className="text-primary" />
            حدس {faNum(Math.min(activeCommitted.length + 1, MAX_ROWS))} از {faNum(MAX_ROWS)}
          </Badge>
          <div className="mr-auto">
            <Button variant="ghost" size="sm" className="h-11 text-[11px] text-muted-foreground" onClick={backToSetup}>
              انصراف
            </Button>
          </div>
        </div>

        {/* گرید ۶×۵ */}
        <div dir="ltr" className="space-y-1.5" aria-label="جدول حدس‌ها">
          {Array.from({ length: MAX_ROWS }, (_, r) => {
            const isJudged = r < activeCommitted.length;
            const isActiveRow = r === activeCommitted.length;
            const verdicts = isJudged ? judgeVerdicts(activeCommitted[r], activeAnswer) : null;
            return (
              <div
                key={isActiveRow ? `active-${r}-${shakeKey}` : r}
                className={cn("grid grid-cols-5 gap-1.5", isActiveRow && shakeKey > 0 && "match-shake")}
              >
                {Array.from({ length: WORD_LEN }, (_, c) => {
                  const letter = isJudged
                    ? activeCommitted[r][c]
                    : isActiveRow
                      ? (input[c] ?? "")
                      : "";
                  const v = verdicts ? verdicts[c] : null;
                  const flipped = isJudged && (r !== revealRow || c < flipCols);
                  const label = isJudged && v
                    ? `ردیف ${faNum(r + 1)} حرف ${faNum(c + 1)}: ${letter.toUpperCase()} — ${VERDICT_FA[v]}`
                    : `ردیف ${faNum(r + 1)} حرف ${faNum(c + 1)}${letter ? `: ${letter.toUpperCase()}` : " — خالی"}`;
                  return (
                    <div key={c} aria-label={label} className="flip-scene aspect-square">
                      <div className={cn("flip-inner", flipped && "flipped")}>
                        {/* روی سلول — حرف روی زمینهٔ خالی */}
                        <div
                          className={cn(
                            "flip-face flex h-full w-full items-center justify-center rounded-lg border-2",
                            letter ? "border-foreground/40 bg-card" : "border-muted-foreground/25 bg-card",
                          )}
                        >
                          {letter && (
                            <span className="font-en text-xl font-black uppercase sm:text-2xl">
                              {letter.toUpperCase()}
                            </span>
                          )}
                        </div>
                        {/* پشت سلول — رنگ حکم */}
                        <div
                          className={cn(
                            "flip-face flip-back flex h-full w-full items-center justify-center rounded-lg border-2",
                            v ? VERDICT_FACE[v] : "border-muted bg-card",
                          )}
                        >
                          {letter && (
                            <span className="font-en text-xl font-black uppercase sm:text-2xl">
                              {letter.toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* اعلام زندهٔ نتیجهٔ حدس برای فناوری‌های کمکی (WCAG 4.1.3) */}
        <p role="status" aria-live="polite" className="sr-only">
          {liveMsg}
        </p>

        {/* کیبورد QWERTY */}
        <div dir="ltr" role="group" aria-label="کیبورد حدس" className="space-y-1.5">
          {KEY_ROWS.map((row, ri) => (
            <div key={ri} className="flex justify-center gap-1 sm:gap-1.5">
              {row.map((k) => {
                if (k === "enter" || k === "back") {
                  const isEnter = k === "enter";
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={isEnter ? submitGuess : eraseLetter}
                      aria-label={isEnter ? "ارسال حدس" : "حذف حرف آخر"}
                      className="flex min-h-11 flex-[1.6] items-center justify-center rounded-lg border border-border bg-muted/60 px-1 font-en text-[11px] font-black text-foreground transition-all hover:bg-muted active:scale-95"
                    >
                      {isEnter ? "ENTER" : "⌫"}
                    </button>
                  );
                }
                const st = keyStatus.get(k) ?? null;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => typeLetter(k)}
                    aria-label={`حرف ${k.toUpperCase()}`}
                    className={cn(
                      "flex min-h-11 flex-1 items-center justify-center rounded-lg border font-en text-[13px] font-black uppercase transition-all active:scale-95",
                      !st && "border-border bg-muted/50 text-foreground hover:bg-muted",
                      st === "correct" && VERDICT_FACE.correct,
                      st === "present" && VERDICT_FACE.present,
                      st === "absent" && VERDICT_FACE.absent,
                    )}
                  >
                    {k.toUpperCase()}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] leading-5 text-muted-foreground">
          کیبورد فیزیکی هم کار می‌کند — تایپ کن، Enter بفرست، Backspace پاک کن. حدس باید واژه‌ای از واژگان ۵حرفی کتاب باشد.
        </p>
      </div>
    );
  }

  if (phase === "done") {
    // ── Done: بی‌نهایت ──
    const won = guesses[guesses.length - 1] === answer;
    return (
      <Card className={cn("mx-auto max-w-xl rise-in", won ? "border-emerald-500/30" : "border-amber-500/30")}>
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <span
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-full",
              won ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/15 text-amber-600 dark:text-amber-400",
            )}
          >
            {won ? <PartyPopper size={30} /> : <XCircle size={30} />}
          </span>
          <h2 className="text-xl font-black">{won ? "واژه پیدا شد!" : "این‌بار پیدا نشد"}</h2>
          {won && isRecord && (
            <Badge className="gap-1.5 bg-amber-500 text-amber-950 shadow-md shadow-amber-500/30">
              <Trophy size={13} />
              رکورد جدید! 🏆
            </Badge>
          )}

          <div className="w-full space-y-2 rounded-xl border bg-muted/40 p-4">
            <p dir="ltr" className="font-en text-2xl font-black tracking-wider">
              {answer.toUpperCase()}
            </p>
            {answerEntry && <p className="text-[13px] font-bold leading-6">{answerEntry.meaning}</p>}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {answerEntry && <Badge variant="secondary" className="text-[10px]">{answerEntry.lessonLabel}</Badge>}
              {answerEntry?.pos && (
                <Badge variant="outline" dir="ltr" className="font-en text-[10px]">
                  {answerEntry.pos}
                </Badge>
              )}
              <Badge variant="secondary" className="gap-1 text-[10px]">
                <Target size={10} />
                {faNum(guesses.length)} از {faNum(MAX_ROWS)} حدس
              </Badge>
            </div>
            {!won && (
              <div className="flex justify-center">
                <Badge
                  variant="outline"
                  className="gap-1 border-emerald-500/40 text-[10px] text-emerald-600 dark:text-emerald-400"
                >
                  <CheckCircle2 size={10} />
                  به مرور اضافه شد
                </Badge>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button className="min-h-11 gap-2" onClick={startInfinite}>
              <RotateCcw size={16} />
              دور جدید
            </Button>
            <Button variant="outline" className="min-h-11" onClick={() => setPhase("setup")}>
              تنظیمات
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ── Setup ──
  const dailyStatusText = !dailyToday
    ? "واژهٔ امروز منتظر توست"
    : dailyToday.status === "playing"
      ? `نیمه‌کاره — ${faNum(dailyToday.guesses.length)} حدس`
      : dailyToday.status === "won"
        ? "امروز پیدا شد ✓"
        : "امروز پیدا نشد";
  return (
    <Card className="mx-auto max-w-xl rise-in">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400">
            <Keyboard size={22} />
          </span>
          <div>
            <h2 className="text-lg font-black">وردل ویژن</h2>
            <p className="text-xs text-muted-foreground">
              واژهٔ ۵حرفی از واژگان کتاب را در ۶ حدس پیدا کن — با رنگ‌بندی حروف!
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
          <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
          <div className="flex-1 space-y-2">
            <p>
              هر حدس باید یک واژهٔ واقعی ۵حرفی از واژگان همین کتاب باشد. بعد از هر حدس رنگ حروف راهنمایت می‌کند:
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <span className="flex items-center gap-1.5">
                <span aria-hidden className="h-3.5 w-3.5 rounded border border-emerald-600 bg-emerald-600" />
                سبز — جای درست
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden className="h-3.5 w-3.5 rounded border border-amber-500 bg-amber-500" />
                زرد — هست ولی جابه‌جا
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden className="h-3.5 w-3.5 rounded border border-muted bg-muted" />
                خاکستری — در واژه نیست
              </span>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-2 text-[13px] font-bold">کدام حالت؟</p>
          <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label="انتخاب حالت بازی">
            <button
              type="button"
              onClick={() => setMode("daily")}
              aria-pressed={mode === "daily"}
              className={cn(
                "min-h-11 rounded-2xl border p-3 text-right transition-all",
                mode === "daily"
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  <Sun size={16} />
                </span>
                <span className="text-[13px] font-black text-foreground">روزانه</span>
              </span>
              <span className="mt-1.5 block text-[11px] leading-5">هر روز یک واژه برای همه — فقط یک فرصت!</span>
              <span className="mt-1 block text-[10px] font-bold text-muted-foreground">{dailyStatusText}</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("infinite")}
              aria-pressed={mode === "infinite"}
              className={cn(
                "min-h-11 rounded-2xl border p-3 text-right transition-all",
                mode === "infinite"
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-500/15 text-teal-600 dark:text-teal-400">
                  <InfinityIcon size={16} />
                </span>
                <span className="text-[13px] font-black text-foreground">بی‌نهایت</span>
              </span>
              <span className="mt-1.5 block text-[11px] leading-5">هر دور یک واژهٔ تصادفی تازه — بدون محدودیت.</span>
              <span className="mt-1 block text-[10px] font-bold text-muted-foreground">
                {meta.infBest ? `کمترین حدسِ برد تو: ${faNum(meta.infBest.moves)}` : "رکوردی ثبت نشده"}
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="gap-1 text-[11px]">
            <Keyboard size={11} />
            استخر واژگان ۵حرفی: {faNum(pool.length)} واژه
          </Badge>
          {meta.infBest && (
            <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
              <Trophy size={12} />
              بهترین برد بی‌نهایت: {faNum(meta.infBest.moves)} حدس
            </Badge>
          )}
          {meta.dailyBest && (
            <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
              <Trophy size={12} />
              بهترین زنجیرهٔ روزانه: {faNum(meta.dailyBest.score)} روز
            </Badge>
          )}
        </div>

        {pool.length < MIN_POOL && (
          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
            <p>
              این کتاب فقط {faNum(pool.length)} واژهٔ ۵حرفی دارد — برای بازی حداقل {faNum(MIN_POOL)} واژه لازم است.
            </p>
          </div>
        )}

        <Button
          size="lg"
          className="h-12 w-full gap-2 text-base"
          onClick={mode === "daily" ? startDaily : startInfinite}
          disabled={pool.length < MIN_POOL}
        >
          <Play size={18} />
          {mode === "daily" ? (dailyToday ? "نمایش بازی امروز" : "شروع واژهٔ امروز") : "شروع دور بی‌نهایت"}
        </Button>
      </CardContent>
    </Card>
  );
}
