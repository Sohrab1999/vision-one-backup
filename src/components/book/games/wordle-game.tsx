"use client";

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
import {
  Keyboard,
  Sun,
  Infinity as InfinityIcon,
  Play,
  Trophy,
  CheckCircle2,
  Sparkles,
  Clock,
  Target,
  Timer,
  Pause,
  Palette,
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
  fmtTime,
  loadBest,
  notifyGameData,
  saveAttempt,
  saveBest,
  subscribeGameData,
} from "./shared";
// ─── فاز G2-d — کیت GameKit v2 (قرارداد API سند §۴) ───
import { playSound, toggleSoundMuted, isSoundMuted } from "./kit/sound-engine";
import { buzz } from "./kit/haptics";
import { useGamePause } from "./kit/use-pause";
import { GameExitGuard } from "./kit/exit-guard";
import { GameShell } from "./kit/game-shell";
import { ResultScreen } from "./kit/result-screen";
import { TutorialOverlay, useAutoTutorial, type TutorialStep } from "./kit/tutorial-overlay";
import { createGameSession, type GameSessionTracker } from "./kit/telemetry";
// G5-01 — مدرس بازی با LLM (راهنمای خودکار بعد از ۳ خطا)
import { useHintCoach } from "./kit/hint-coach";

type Phase = "setup" | "playing" | "done";
type Mode = "daily" | "infinite";
/** فاز G2-d — طول واژهٔ حالت بی‌نهایت (روزانه همیشه ۵) */
type WordLevel = 4 | 5 | 6;
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

/** اسنپ‌شات رکوردها برای نماها — اسکوپ ۵حرفی همان "infinite" قبلی است (سازگاری کلیدها) */
interface MetaSnapshot {
  infBest: BestMoves | null;
  infBest4: BestMoves | null;
  infBest6: BestMoves | null;
  dailyBest: BestScore | null;
  streak: DailyStreakState | null;
}

const GAME_KEY = "wordle";
/** طول واژهٔ روزانه — ثابت و دست‌نخورده (seed روزانه به همین استخر ۵حرفی وابسته است) */
const WORD_LEN = 5;
const MAX_ROWS = 6;
/** فاصلهٔ پله‌ای فلیپ بین ستون‌ها (ms) */
const FLIP_STAGGER_MS = 200;
/** مکث بعد از آخرین فلیپ تا آزادشدن ورودی/نمایش نتیجه (ms) */
const FLIP_SETTLE_MS = 450;
/** حداقل واژهٔ استخر برای شروع */
const MIN_POOL = 10;

/** فاز G2-d — سطح‌های طول واژهٔ حالت بی‌نهایت */
const LEVELS: readonly WordLevel[] = [4, 5, 6];

/** فقط واژه‌های لاتین دقیقاً ۵حرفی وارد بازی روزانه می‌شوند (بازیابی وضعیت روز) */
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
 * فاز G2-d — طول پارامتری شد (۴/۵/۶ حرفی).
 */
function judgeVerdicts(guess: string, answer: string, len: number): Verdict[] {
  const res: Verdict[] = Array<Verdict>(len).fill("absent");
  const remaining: Record<string, number> = {};
  for (let i = 0; i < len; i++) {
    if (guess[i] === answer[i]) {
      res[i] = "correct";
    } else {
      remaining[answer[i]] = (remaining[answer[i]] ?? 0) + 1;
    }
  }
  for (let i = 0; i < len; i++) {
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

/** ستاره‌بندی وردل (فاز G2-d — طبق تسک): برد در ≤۳ حدس = ۳، ≤۵ = ۲، دیرتر = ۱، باخت = ۱ */
function starsFor(win: boolean, rowsUsed: number): number {
  if (!win) return 1;
  return rowsUsed <= 3 ? 3 : rowsUsed <= 5 ? 2 : 1;
}

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

/** آموزش ۳-گامی استاندارد (فاز G2-d) — هدف / رنگ‌ها / حالت‌ها و سطح‌ها */
const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <Target size={24} />,
    title: "واژهٔ پنهان را حدس بزن",
    text: "در ۶ حدس، واژهٔ پنهان را پیدا کن: هر حدس باید واژه‌ای واقعی از واژگان همین کتاب باشد.",
  },
  {
    icon: <Palette size={24} />,
    title: "رنگ حروف راهنمای توست",
    text: "سبز یعنی حرف در جای درست است؛ زرد یعنی حرف هست ولی جای دیگری؛ خاکستری یعنی در واژه نیست.",
  },
  {
    icon: <InfinityIcon size={24} />,
    title: "دو حالت، سه سطح",
    text: "«روزانه» هر روز یک واژهٔ ۵حرفی برای همه دارد. در «بی‌نهایت» طول واژه را انتخاب کن: ۴، ۵ یا ۶ حرفی — رکورد هر سطح جدا ثبت می‌شود.",
  },
];

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
  if (dailyDoneView) {
    const won = dailyToday.status === "won";
    const rowsUsed = dailyToday.guesses.length;
    const streakNow = meta.streak?.streak ?? 0;
    return (
      <>
        <ResultScreen
          title={won ? `کلمه ${dailyAnswer.toUpperCase()} بود! 🎉` : `کلمه این بود: ${dailyAnswer.toUpperCase()}`}
          stars={starsFor(won, rowsUsed)}
          isRecord={isRecord}
          stats={[
            {
              label: "حدس‌ها",
              value: `${faNum(rowsUsed)} از ${faNum(MAX_ROWS)}`,
              icon: <Target size={16} className="text-primary" />,
            },
            {
              label: "زمان",
              value: fmtTime(finalSecs),
              icon: <Timer size={16} className="text-teal-500" />,
            },
            {
              label: "زنجیرهٔ برد",
              value: `${faNum(streakNow)} روز`,
              icon: <Trophy size={16} className="text-amber-500" />,
            },
          ]}
          onReplay={startInfinite}
          onExit={backToSetup}
          exitLabel="بازگشت"
        />

        {/* کارت واژهٔ دور — معنی و درس (تکمیل ResultScreen؛ SRS در finishGame ثبت شد) */}
        {answerEntry && (
          <div className="mx-auto mt-3 max-w-xl space-y-2 rounded-2xl border bg-muted/40 p-4 text-center">
            <p dir="ltr" className="font-en text-2xl font-black tracking-wider">
              {activeAnswer.toUpperCase()}
            </p>
            <p className="text-[13px] font-bold leading-6">{answerEntry.meaning}</p>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <Badge variant="secondary" className="text-[10px]">
                {answerEntry.lessonLabel}
              </Badge>
              {answerEntry.pos && (
                <Badge variant="outline" dir="ltr" className="font-en text-[10px]">
                  {answerEntry.pos}
                </Badge>
              )}
              {!won && (
                <Badge
                  variant="outline"
                  className="gap-1 border-emerald-500/40 text-[10px] text-emerald-600 dark:text-emerald-400"
                >
                  <CheckCircle2 size={10} />
                  به مرور اضافه شد
                </Badge>
              )}
            </div>
            {/* شمارش معکوس متنی — بدون تایمر زنده */}
            <p className="flex items-center justify-center gap-1.5 pt-1 text-[12px] font-bold text-muted-foreground">
              <Clock size={14} className="text-teal-500" />
              واژهٔ بعدی فردا آماده می‌شود
            </p>
          </div>
        )}

        <p role="status" aria-live="polite" className="sr-only">
          {liveMsg}
        </p>
        <TutorialOverlay
          game={GAME_KEY}
          steps={TUTORIAL_STEPS}
          open={tutorialOpen}
          onOpenChange={handleTutorialOpenChange}
        />
      </>
    );
  }

  if (dailyPlayingView || infinitePlaying) {
    // ── Playing: گرید ۶×N + کیبورد (مشترک بین دو حالت) — فاز G2-d: GameShell ──
    const isDaily = dailyPlayingView;
    const gridColsClass = activeLen === 4 ? "grid-cols-4" : activeLen === 5 ? "grid-cols-5" : "grid-cols-6";
    return (
      <>
        <GameShell
          title="وردل ویژن"
          icon={<Keyboard size={18} />}
          stats={
            <>
              <Badge variant="secondary" className="gap-1 text-[11px]">
                {isDaily ? (
                  <Sun size={11} className="text-amber-500" />
                ) : (
                  <InfinityIcon size={11} className="text-teal-500" />
                )}
                {isDaily ? "واژهٔ امروز" : `بی‌نهایت · ${faNum(activeLen)}حرفی`}
              </Badge>
              <Badge variant="secondary" className="gap-1 text-[11px]">
                <Target size={11} className="text-primary" />
                حدس {faNum(Math.min(activeCommitted.length + 1, MAX_ROWS))} از {faNum(MAX_ROWS)}
              </Badge>
              {meta.streak && meta.streak.streak > 0 && (
                <Badge variant="secondary" className="gap-1 text-[11px]">
                  <Trophy size={11} className="text-amber-500" />
                  زنجیره {faNum(meta.streak.streak)}
                </Badge>
              )}
            </>
          }
          liveMsg={liveMsg}
          progress={
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-l from-primary to-emerald-400 transition-all duration-500"
                style={{ width: `${Math.round((activeCommitted.length / MAX_ROWS) * 100)}%` }}
              />
            </div>
          }
          paused={paused}
          onPauseToggle={togglePause}
          muted={muted}
          onMuteToggle={() => setMuted(toggleSoundMuted())}
          onHelp={handleHelp}
          onExit={handleExitClick}
        >
          <div className="relative mx-auto w-full max-w-sm md:max-w-lg xl:max-w-xl">
            <div
              className={cn("space-y-3", paused && "pointer-events-none select-none blur-sm")}
              aria-hidden={paused}
            >
              {/* گرید ۶×N */}
              <div dir="ltr" className="space-y-1.5" aria-label="جدول حدس‌ها">
                {Array.from({ length: MAX_ROWS }, (_, r) => {
                  const isJudged = r < activeCommitted.length;
                  const isActiveRow = r === activeCommitted.length;
                  const verdicts = isJudged ? judgeVerdicts(activeCommitted[r], activeAnswer, activeLen) : null;
                  return (
                    <div
                      key={isActiveRow ? `active-${r}-${shakeKey}` : r}
                      className={cn("grid gap-1.5", gridColsClass, isActiveRow && shakeKey > 0 && "match-shake")}
                    >
                      {Array.from({ length: activeLen }, (_, c) => {
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
                کیبورد فیزیکی هم کار می‌کند — تایپ کن، Enter بفرست، Backspace پاک کن. حدس باید واژه‌ای از واژگان{" "}
                {faNum(activeLen)}حرفی کتاب باشد.
              </p>
            </div>

            {/* فاز G2-d — اورلی توقف: گرید و کیبورد تار و غیرقابل‌کلیک؛ اعلام در liveMsg شِل */}
            {paused && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl bg-background/80 backdrop-blur-sm">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Pause size={26} />
                </span>
                <p className="text-sm font-black">بازی متوقف شد</p>
                <Button onClick={resume} className="h-11 gap-2">
                  <Play size={16} />
                  ادامهٔ بازی
                </Button>
              </div>
            )}
          </div>

          {/* G5-01 — کارت مدرس بازی */}
          {hint.element}
        </GameShell>

        {/* فاز G2-d — نگهبان خروج استاندارد کیت؛ روزانه: متن مخصوص استریک نیمه‌کاره */}
        <GameExitGuard
          open={exitAsk}
          onOpenChange={setExitAsk}
          onConfirm={confirmExit}
          description={
            isDaily
              ? "استریک امروز ثبت نمی‌شود مگر برد یا باخت را ببینی — پیشرفت روزانهٔ تو ذخیره می‌ماند و بعداً می‌توانی ادامه دهی."
              : undefined
          }
        />
        <TutorialOverlay
          game={GAME_KEY}
          steps={TUTORIAL_STEPS}
          open={tutorialOpen}
          onOpenChange={handleTutorialOpenChange}
        />
      </>
    );
  }

  if (phase === "done") {
    // ── Done: بی‌نهایت — فاز G2-d: ResultScreen ──
    const won = guesses[guesses.length - 1] === answer;
    const rowsUsed = guesses.length;
    const streakNow = meta.streak?.streak ?? 0;
    return (
      <>
        <ResultScreen
          title={won ? `کلمه ${answer.toUpperCase()} بود! 🎉` : `کلمه این بود: ${answer.toUpperCase()}`}
          stars={starsFor(won, rowsUsed)}
          isRecord={isRecord}
          stats={[
            {
              label: "حدس‌ها",
              value: `${faNum(rowsUsed)} از ${faNum(MAX_ROWS)}`,
              icon: <Target size={16} className="text-primary" />,
            },
            {
              label: "زمان",
              value: fmtTime(finalSecs),
              icon: <Timer size={16} className="text-teal-500" />,
            },
            {
              label: "زنجیرهٔ برد",
              value: `${faNum(streakNow)} روز`,
              icon: <Trophy size={16} className="text-amber-500" />,
            },
          ]}
          onReplay={startInfinite}
          onExit={() => setPhase("setup")}
          exitLabel="تنظیمات"
        />

        {/* کارت واژهٔ دور — معنی و درس (تکمیل ResultScreen؛ SRS در finishGame ثبت شد) */}
        {answerEntry && (
          <div className="mx-auto mt-3 max-w-xl space-y-2 rounded-2xl border bg-muted/40 p-4 text-center">
            <p dir="ltr" className="font-en text-2xl font-black tracking-wider">
              {activeAnswer.toUpperCase()}
            </p>
            <p className="text-[13px] font-bold leading-6">{answerEntry.meaning}</p>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <Badge variant="secondary" className="text-[10px]">
                {answerEntry.lessonLabel}
              </Badge>
              {answerEntry.pos && (
                <Badge variant="outline" dir="ltr" className="font-en text-[10px]">
                  {answerEntry.pos}
                </Badge>
              )}
              {!won && (
                <Badge
                  variant="outline"
                  className="gap-1 border-emerald-500/40 text-[10px] text-emerald-600 dark:text-emerald-400"
                >
                  <CheckCircle2 size={10} />
                  به مرور اضافه شد
                </Badge>
              )}
            </div>
          </div>
        )}

        <p role="status" aria-live="polite" className="sr-only">
          {liveMsg}
        </p>
        <TutorialOverlay
          game={GAME_KEY}
          steps={TUTORIAL_STEPS}
          open={tutorialOpen}
          onOpenChange={handleTutorialOpenChange}
        />
      </>
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
  const dailyPoolOk = poolsByLen[5].length >= MIN_POOL;
  const infinitePoolOk = poolsByLen[wordLen].length >= MIN_POOL || dailyPoolOk;
  const setupPoolLen: WordLevel = mode === "daily" ? 5 : wordLen;
  const setupBest = bestForLen(setupPoolLen);
  return (
    <>
      <Card className="mx-auto max-w-xl rise-in lg:max-w-2xl">
        <CardContent className="space-y-6 p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400">
            <Keyboard size={22} />
          </span>
          <div>
            <h2 className="text-lg font-black">وردل ویژن</h2>
            <p className="text-xs text-muted-foreground">
              واژه‌ای از واژگان کتاب را در ۶ حدس پیدا کن — روزانه یا بی‌نهایت با واژه‌های ۴ تا ۶ حرفی!
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
          <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
          <div className="flex-1 space-y-2">
            <p>
              هر حدس باید یک واژهٔ واقعی از واژگان همین کتاب باشد. بعد از هر حدس رنگ حروف راهنمایت می‌کند:
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
              <span className="mt-1.5 block text-[11px] leading-5">هر روز یک واژهٔ ۵حرفی برای همه — فقط یک فرصت!</span>
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
              <span className="mt-1.5 block text-[11px] leading-5">
                هر دور یک واژهٔ تصادفی تازه — با واژه‌های ۴ تا ۶ حرفی.
              </span>
              <span className="mt-1 block text-[10px] font-bold text-muted-foreground">
                {setupBest
                  ? `کمترین حدسِ برد تو (${faNum(setupPoolLen)}حرفی): ${faNum(setupBest.moves)}`
                  : "رکوردی ثبت نشده"}
              </span>
            </button>
          </div>
        </div>

        {/* فاز G2-d — انتخاب طول واژه — فقط حالت بی‌نهایت (روزانه همیشه ۵حرفی است) */}
        {mode === "infinite" && (
          <div>
            <p className="mb-2 text-[13px] font-bold">طول واژه؟</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب طول واژهٔ حالت بی‌نهایت">
              {LEVELS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setWordLen(n)}
                  aria-pressed={wordLen === n}
                  className={cn(
                    "min-h-11 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
                    wordLen === n
                      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {faNum(n)} حرفی
                </button>
              ))}
            </div>
            {poolsByLen[wordLen].length < MIN_POOL && (
              <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
                این کتاب {faNum(poolsByLen[wordLen].length)} واژهٔ {faNum(wordLen)}حرفی دارد — با شروع، دور با
                واژه‌های ۵حرفی ادامه می‌یابد.
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="gap-1 text-[11px]">
            <Keyboard size={11} />
            استخر واژگان {faNum(setupPoolLen)}حرفی: {faNum(poolsByLen[setupPoolLen].length)} واژه
          </Badge>
          {mode === "infinite" && setupBest && (
            <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
              <Trophy size={12} />
              بهترین برد {faNum(setupPoolLen)}حرفی: {faNum(setupBest.moves)} حدس
            </Badge>
          )}
          {meta.dailyBest && (
            <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
              <Trophy size={12} />
              بهترین زنجیرهٔ روزانه: {faNum(meta.dailyBest.score)} روز
            </Badge>
          )}
        </div>

        {!(mode === "daily" ? dailyPoolOk : infinitePoolOk) && (
          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
            <p>
              این کتاب فقط {faNum(poolsByLen[5].length)} واژهٔ ۵حرفی دارد — برای بازی حداقل {faNum(MIN_POOL)} واژه
              لازم است.
            </p>
          </div>
        )}

        <Button
          size="lg"
          className="h-12 w-full gap-2 text-base"
          onClick={mode === "daily" ? startDaily : startInfinite}
          disabled={mode === "daily" ? !dailyPoolOk : !infinitePoolOk}
        >
          <Play size={18} />
          {mode === "daily" ? (dailyToday ? "نمایش بازی امروز" : "شروع واژهٔ امروز") : "شروع دور بی‌نهایت"}
        </Button>
      </CardContent>
      </Card>
      {/* فاز G2-d — آموزش یک‌بارنمایش در اولین ورود (الگوی memory) */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
