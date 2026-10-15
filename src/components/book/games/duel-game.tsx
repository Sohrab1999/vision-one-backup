"use client";

/**
 * بازی «دوئل دونفره» (Same-device Duel) — فاز ۴ نقشه راه ویژن‌وان.
 *
 * یک صفحه، دو بازیکن، همان سؤال‌ها — رو در رو:
 * - Setup: نام دو بازیکن + تعداد دور (۵/۷/۹) + دسته + محدودهٔ درس + Badge رکورد
 *   «بیشترین برد دور بازیکن ۱» (اسکوپ درس|all:تعداد دور).
 * - نیمهٔ بالا = بازیکن ۱ (emerald)، نیمهٔ پایین = بازیکن ۲ (amber)؛ وسط، کارت سؤال
 *   مشترک. تایمر ۱۰ ثانیه‌ای هر دور: بج ثانیه + نوار width در قاب شِل.
 * - هر نیمه ۴ دکمهٔ گزینه دارد؛ ترتیب گزینه‌ها بین دو نیمه shuffle متفاوت است تا
 *   رقیب نتواند از جای انگشت دیگری تقلب کند.
 * - هر بازیکن یک‌بار پاسخ می‌دهد؛ دور وقتی داوری می‌شود که هر دو پاسخ بدهند یا وقت
 *   تمام شود (بی‌پاسخ = غلط). هر دو درست → سریع‌تر برنده؛ یکی درست → همان؛ هیچ‌کدام
 *   → تساوی بدون امتیاز. نتیجهٔ دور ~۱.۲ ثانیه نمایش داده می‌شود و دور بعد می‌آید.
 * - واژه‌های غلط‌زدهٔ واژگانی (فقط وقتی بازیکن واقعاً گزینه‌ای زده باشد) با
 *   seedReviewFromQuiz — متن گزینهٔ درست = خود واژهٔ انگلیسی — حین بازی به صف مرور
 *   برمی‌گردند (دوئل در صفحهٔ نتیجه reviewItem/SRS ندارد — مسیر فعلی حفظ شد).
 * - پایان: touchStreak + recordStudySession + bumpPlays + saveAttempt (total = تعداد دور،
 *   correct = دورهای بردهٔ بازیکن ۱، detail {p1,p2,p1Name,p2Name,winner}) + saveBest
 *   {score} = بیشترین برد دور بازیکن ۱ با اسکوپ `${درس|all}:${تعداد دور}` — امضا و
 *   کلیدهای localStorage یک‌بایت تغییر نکرده‌اند (قرارداد §۳-۴ سند).
 *
 * ─── فاز G2-d — مهاجرت کامل به کیت GameKit v2 + کار اختصاصی دوئل ───
 *
 * ۱) توقف امن دو-نیمه (کار اختصاصی): دوئل hot-seat است و مبدأهای زمانی Date.now دارد —
 *    roundStartRef = مبدأ سرعت پاسخ هر بازیکن و ملاک تساوی‌شکنی «هر دو درست»؛
 *    startAtRef = مبدأ مدت کل مسابقه در Attempt. وقتی توقف وسط دور یک بازیکن فعال
 *    می‌شود (دستی از شِل یا خودکارِ تب مخفی از useGamePause)، در بازگشت (onChange
 *    هوک با false) مدت توقف (gap) به هر دو مبدأ «افزوده» می‌شود — دقیقاً الگوی جبران
 *    gap مخفی G0-05، تعمیم‌یافته به توقف دستی: سرعت پاسخ بازیکنی که بعد از ادامه جواب
 *    می‌دهد و duration کل منصفانه می‌ماند و توقف وسط دور بازیکن ۱ به نفع/ضرر بازیکن ۲
 *    تمام نمی‌شود.
 *    - تایمر کاهشی هر دور گیت روی paused است (interval حین توقف اصلاً وجود ندارد).
 *    - زنجیرهٔ «نمایش نتیجه → دور بعد» (later) حالا با «ساعت بی‌توقف» (pauseAccumRef)
 *      کار می‌کند و حین توقف کاملاً فریز می‌شود — ریسک ثبت‌شدهٔ G0-05 (پیشروی زنجیره در
 *      تب مخفی با throttle) بسته شد؛ بعد از ادامه با همان زمان باقی‌مانده مسلح می‌شود.
 *    - اورلی توقف روی کل صحنه می‌آید و متن عمومی «دوئل متوقف شد» دارد — بج زمان هدر و
 *      نوار دور حین توقف ثابت می‌مانند و وضعیت هیچ بازیکنی لو نمی‌رود (بدنهٔ بازی
 *      blur + pointer-events-none + aria-hidden و گزینه‌ها disabled؛ گیت paused در pick).
 *
 * ۲) صدای per-بازیکن (کار اختصاصی): کیت ۸ افکت دارد و ترکیب زیر بدون هیچ فایل صوتی
 *    جدید، تفکیک‌پذیری شنیداری دو بازیکن را می‌دهد (pitch/طیف/الگو کاملاً متفاوت):
 *      بازیکن ۱: درست = playSound("correct") + buzz("success")  — دو نت صعودی ملایم sine
 *                غلط  = playSound("wrong")   + buzz("error")    — سویپ نزولی square
 *      بازیکن ۲: درست = playSound("win")     + buzz("success")  — فانفار ۴نتی triangle
 *                غلط  = playSound("shoot")  + buzz("error")    — سویپ تیز sawtooth
 *    بی‌پاسخ = غلط است و صدای غلط همان بازیکن را می‌گیرد. لرزش الگوهای success/error
 *    برای هر دو بازیکن مشترک است (Vibration API هر فراخوانی الگوی قبلی را جایگزین
 *    می‌کند — تفکیک per-بازیکن عمدتاً روی کانال صدا حمل می‌شود و بازخورد رنگی/متنی
 *    هر نیمه سه‌کاناله کامل است).
 *    پایان مسابقه = playSound("finish") + buzz("success") و در شاخهٔ رکوردِ بازیکن ۱
 *    = playSound("record") + buzz("record") — الگوی پایلوت memory.
 *
 * ۳) مهاجرت ۵گانه: GameShell (هدر یکنواخت: بج دور/زمان/امتیاز دو بازیکن در stats +
 *    liveMsg مرکزی + کنترل‌های راهنما/توقف/صدا/انصراف + نوار زمان دور در progress)
 *    · ResultScreen (جایگزین نمای done — بدون reviewItems) · GameExitGuard (انصراف
 *    حین playing = ≥۱ دور در جریان است → تأیید؛ خروج از setup/done مستقیم است)
 *    · آموزش ۳گامی (نوبتی / سرعت-دقت ملاک برد / توقف امن) با useAutoTutorial —
 *    راهنمای حین بازی = توقف با pausedForHelpRef · تله‌متری جلسه (level =
 *    `rounds:{تعداد دور}` — start در شروع مسابقه، end("finish") در پایان،
 *    abandon("exit") در نگهبان و abandon("unmount") در unmount).
 *
 * ۴) ستاره‌بندی per-game صفحهٔ نتیجه: دوئل رتبهٔ ۱..۱۵ ندارد؛ ستاره = «کیفیت مسابقه»:
 *    اختلاف برد دور دو بازیکن ≤۱ → ۳ ستاره (مسابقهٔ نزدیک) · ≤۳ → ۲ ستاره (رقابتی)
 *    · بقیه → ۱ ستاره (قاطع).
 *
 * نکتهٔ تایمر: interval هر دور مالک شمارش است؛ مقدار واقعی در timeRef (با شروع هر دور
 * ریست می‌شود) و setTimeLeft فقط نمایش را همگام نگه می‌دارد. داوریِ هر دور دقیقاً
 * یک‌بار با judgedRef قفل می‌شود (الگوی react-hooks v6: صفر setState در بدنهٔ effect).
 */

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  Check,
  Clock,
  Pause,
  Play,
  Sparkles,
  Swords,
  Timer,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { QuizQuestionSeed } from "@/data/types";
import { useBook, useBookData } from "@/lib/book-context";
import { seedReviewFromQuiz } from "@/lib/srs-store";
import { touchStreak } from "@/lib/streak-store";
import { recordStudySession } from "@/lib/goal-store";
import {
  faNum,
  fmtTime,
  loadBest,
  saveBest,
  bumpPlays,
  saveAttempt,
  pickUnique,
  shuffle,
  subscribeGameData,
} from "./shared";
// فاز G2-d — کیت GameKit v2 (قرارداد API سند — همان الگوی پایلوت memory و گروه‌های a/b/c)
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

// ─── ثابت‌ها و کمکی‌ها ───

const GAME_KEY = "duel";
const ALL_LESSON = -1;
/** ثانیهٔ وقت هر دور */
const ROUND_TIME = 10;
const ROUNDS = [5, 7, 9] as const;
/** مدت نمایش نتیجهٔ هر دور (میلی‌ثانیه) */
const RESULT_MS = 1200;
/** ترتیب پایهٔ گزینه‌ها — برای هر نیمه جداگانه شافل می‌شود */
const BASE_ORDER = [0, 1, 2, 3];

type Phase = "setup" | "playing" | "done";
type CatKey = "all" | "vocabulary" | "grammar";
/** برندهٔ دور: ۰ = بازیکن ۱، ۱ = بازیکن ۲، ‎-۱ = تساوی */
type RoundWinner = 0 | 1 | -1;

/** شکل رکورد شخصی این بازی — اسکوپ: درس|all:تعداد دور */
interface BestRecord {
  score: number;
}

/** نتیجهٔ داوری یک دور */
interface RoundOutcome {
  c1: boolean;
  c2: boolean;
  winner: RoundWinner;
}

/** پیکربندی مسابقه — آینهٔ ref برای callbackهای تایمر */
interface DuelConfig {
  lesson: number;
  rounds: number;
  p1: string;
  p2: string;
}

function lessonLabel(l: number): string {
  return l === 0 ? "جمع‌بندی" : `درس ${faNum(l)}`;
}

/** فاز G2-d — آموزش ۳-گامی استاندارد (نوبتی / سرعت-دقت ملاک برد / توقف امن) */
const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <Swords size={24} />,
    title: "دو نفر، یک صفحه",
    text: "بازیکن ۱ نیمهٔ بالا (سبز) و بازیکن ۲ نیمهٔ پایین (زرد) همان سؤال را می‌بینند — ولی ترتیب گزینه‌ها برای هر نیمه فرق دارد تا کسی از جای انگشت دیگری تقلب نکند.",
  },
  {
    icon: <Zap size={24} />,
    title: "سرعت و دقت ملاک برد است",
    text: `هر دور ${faNum(ROUND_TIME)} ثانیه وقت دارید و هر بازیکن یک‌بار جواب می‌دهد. اگر هر دو درست جواب بدهید، سریع‌تر برندهٔ دور است — بی‌پاسخ یعنی غلط.`,
  },
  {
    icon: <Pause size={24} />,
    title: "توقف امن هر لحظه",
    text: "دکمهٔ توقف، دوئل را وسط دورِ هر بازیکن هم امن متوقف می‌کند: زمان هیچ‌کس نمی‌سوزد و سرعت‌سنجی منصفانه می‌ماند. صدای درست/غلط دو بازیکن هم متفاوت است تا هرکس نتیجهٔ خودش را بشناسد.",
  },
];

export function DuelGame() {
  const data = useBookData();
  const { bookId } = useBook();
  // بازی فقط داخل کتاب فعال رندر می‌شود (useBookData بالا گارد است) — bookId عملاً هرگز null نیست
  const activeBookId: string = bookId ?? "";

  const [phase, setPhase] = useState<Phase>("setup");
  const [p1Name, setP1Name] = useState("بازیکن ۱");
  const [p2Name, setP2Name] = useState("بازیکن ۲");
  const [rounds, setRounds] = useState<number>(7);
  const [lesson, setLesson] = useState<number>(ALL_LESSON);
  const [cat, setCat] = useState<CatKey>("all");

  // ── stateهای حین بازی ──
  const [q, setQ] = useState<QuizQuestionSeed | null>(null);
  const [roundNum, setRoundNum] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [p1Order, setP1Order] = useState<number[]>(BASE_ORDER);
  const [p2Order, setP2Order] = useState<number[]>(BASE_ORDER);
  /** گزینهٔ انتخابی هر بازیکن بر اساس اندیس اصلی q.options (null = هنوز پاسخ نداده) */
  const [p1Pick, setP1Pick] = useState<number | null>(null);
  const [p2Pick, setP2Pick] = useState<number | null>(null);
  /** نتیجهٔ داوری دور جاری — null یعنی هنوز در حال بازی */
  const [result, setResult] = useState<RoundOutcome | null>(null);
  const [wins1, setWins1] = useState(0);
  const [wins2, setWins2] = useState(0);
  /** پیام باکس aria-live مرکزی شِل — نوبت/نتیجهٔ دور/توقف (فاز G1-05) */
  const [liveMsg, setLiveMsg] = useState("");
  /** مدت مسابقه برای صفحهٔ نتیجه (ثانیه — در finish قفل می‌شود) */
  const [matchSecs, setMatchSecs] = useState(0);

  // ── stateهای فاز done ──
  const [winner, setWinner] = useState<RoundWinner>(-1);
  const [isRecord, setIsRecord] = useState(false);

  // ── refs — منبع حقیقت منطق بازی (همهٔ callbackهای تایمر از این‌ها می‌خوانند) ──
  const qRef = useRef<QuizQuestionSeed | null>(null);
  const deckRef = useRef<QuizQuestionSeed[]>([]);
  const qiRef = useRef(0);
  /** شمارهٔ دور نمایشی (۱-مبنا) */
  const roundNoRef = useRef(0);
  /** تایمر دور — مالک واقعی زمان (با شروع هر دور ریست می‌شود) */
  const timeRef = useRef(ROUND_TIME);
  /**
   * شروع دور برای محاسبهٔ سرعت پاسخ هر بازیکن (ملاک تساوی‌شکنی «هر دو درست»).
   * فاز G2-d — مبدأ real-time است و حین هر توقف (دستی/خودکار) با مدت توقف جبران می‌شود
   * (تعمیم الگوی جبران gap مخفی G0-05 — در onChange هوک توقف پایین‌تر).
   */
  const roundStartRef = useRef(0);
  const p1PickRef = useRef<number | null>(null);
  const p2PickRef = useRef<number | null>(null);
  /** زمان پاسخ (میلی‌ثانیه از شروع دور) — ملاک برنده در «هر دو درست» */
  const p1MsRef = useRef(0);
  const p2MsRef = useRef(0);
  const p1OrderRef = useRef<number[]>(BASE_ORDER);
  const p2OrderRef = useRef<number[]>(BASE_ORDER);
  /** قفل داوری — هر دور دقیقاً یک‌بار داوری می‌شود */
  const judgedRef = useRef(false);
  /** مسابقه تمام/لغو شده؟ */
  const overRef = useRef(false);
  const wins1Ref = useRef(0);
  const wins2Ref = useRef(0);
  const configRef = useRef<DuelConfig>({ lesson: ALL_LESSON, rounds: 7, p1: "بازیکن ۱", p2: "بازیکن ۲" });
  /** لحظهٔ شروع مسابقه برای محاسبهٔ duration — فاز G2-d: حین هر توقف جبران می‌شود */
  const startAtRef = useRef(0);
  // ── فاز G2-d — ساعت بی‌توقف زنجیرهٔ «نمایش نتیجه → دور بعد» ──
  /** جمع مدت توقف‌های این مسابقه (ms) */
  const pauseAccumRef = useRef(0);
  /** شروع توقف جاری (۰ = در حال بازی) */
  const pauseStartRef = useRef(0);
  /** تایمر زندهٔ زنجیره (null = چیزی برنامه‌ریزی نشده یا فریز است) */
  const chainTimerRef = useRef<number | null>(null);
  /** برنامهٔ معلق زنجیره — due در ساعت بی‌توقف (حین توقف دست‌نخورده می‌ماند) */
  const chainPendingRef = useRef<{ due: number; fn: () => void } | null>(null);
  /** آینهٔ همگام paused برای گاردهای داخل callback تایمر/رویداد (الگوی flappy) */
  const pausedRef = useRef(false);
  /** آخرین نسخهٔ judge برای فراخوانی تازه از تایمر (الگوی latest-ref) */
  const judgeRef = useRef<(() => void) | null>(null);
  // فاز G1-10 — تله‌متری جلسه (بدون PII: بازی/اسکوپ/مدت رُند/دلیل)
  const sessionRef = useRef<GameSessionTracker | null>(null);

  // ── مدیریت زنجیرهٔ تایمرها (فاز G2-d — ساعت بی‌توقف) ──
  // (قبل از هوک توقف تعریف می‌شود چون callback آن scheduleChain را صدا می‌زند)

  /**
   * زمان «بازی» بدون توقف‌ها — مبنای زنجیرهٔ نتیجه→دور بعد.
   * حین توقف (pauseStartRef فعال) ثابت می‌ماند و بعد از ادامه با جبران
   * pauseAccum دوباره ۱:۱ با ساعت واقعی جلو می‌رود.
   */
  function gameNow(): number {
    const live = pauseStartRef.current > 0 ? Date.now() - pauseStartRef.current : 0;
    return Date.now() - pauseAccumRef.current - live;
  }

  /**
   * فاز G2-d — مسلح‌کردن زنجیرهٔ «نمایش نتیجه → دور بعد».
   * حین توقف کاملاً فریز می‌شود (هیچ setTimeout زنده‌ای نیست) و بعد از ادامه با
   * همان زمان باقی‌مانده دوباره مسلح می‌شود — بستن ریسک ثبت‌شدهٔ G0-05.
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

  // ── فاز G2-d — توقف/ادامهٔ استاندارد کیت + نگهبان خروج + کلید صدا ──
  // هوک auto-pause در تب مخفی می‌دهد (سطح بالاتر از گارد حداقلی G0-05: کاربر هنگام
  // بازگشت اورلی «دوئل متوقف شد» می‌بیند و خودش ادامه می‌دهد — هیچ زمانی پشت‌سرِ
  // کاربر نمی‌گذرد)؛ جبران دو-نیمهٔ امن مبدأهای Date.now و فریز/احیای زنجیرهٔ
  // نتیجه→دور بعد در همین callback انجام می‌شود.
  const { paused, resume, pause: pauseGame, toggle: togglePause } = useGamePause((p) => {
    pausedRef.current = p;
    if (p) {
      pauseStartRef.current = Date.now();
    } else if (pauseStartRef.current > 0) {
      // فاز G2-d — جبران دو-نیمهٔ امن: الگوی جبران gap مخفی G0-05، تعمیم‌یافته به
      // توقف دستی. مدت توقف به مبدأ سرعت پاسخ (roundStartRef — ملاک تساوی‌شکنی) و
      // مبدأ مدت مسابقه (startAtRef) افزوده می‌شود تا توقف وسط دور بازیکن ۱ به
      // نفع/ضرر بازیکن ۲ تمام نشود و duration درست بماند.
      const gap = Date.now() - pauseStartRef.current;
      pauseStartRef.current = 0;
      if (gap > 0) {
        pauseAccumRef.current += gap;
        if (roundStartRef.current > 0) roundStartRef.current += gap;
        if (startAtRef.current > 0) startAtRef.current += gap;
      }
    }
    // فریز/احیای زنجیرهٔ «نمایش نتیجه → دور بعد» — بستن ریسک ثبت‌شدهٔ G0-05
    scheduleChain();
    if (phase === "playing") setLiveMsg(p ? "دوئل متوقف شد ⏸" : "ادامهٔ دوئل ▶");
  });
  const [exitAsk, setExitAsk] = useState(false);
  // الگوی دارباز/جای خالی/شکار صدا: state بی‌صدا + همگام‌سازی با کلید سراسری (storage بین-تب)
  const [muted, setMuted] = useState(isSoundMuted());
  useEffect(() => {
    const sync = () => setMuted(isSoundMuted());
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
  const countFor = (l: number) =>
    data.quiz.seed.filter(
      (item) => (l === ALL_LESSON || item.lesson === l) && (cat === "all" || item.category === cat),
    ).length;

  // رکورد «بیشترین برد دور بازیکن ۱» این اسکوپ — اسنپ‌شات عددی پایدار (الگوی match-game)
  const bestScope = `${lesson === ALL_LESSON ? "all" : lesson}:${rounds}`;
  const best = useSyncExternalStore(
    subscribeGameData,
    () => loadBest<BestRecord>(activeBookId, GAME_KEY, bestScope)?.score ?? null,
    () => null,
  );

  // نام‌های نهایی (پیش‌فرض اگر خالی باشند) — محاسبهٔ خالص در رندر
  const name1 = p1Name.trim() || "بازیکن ۱";
  const name2 = p2Name.trim() || "بازیکن ۲";

  // ── جریان بازی ──

  /** شروع یک دور: سؤال بعدی + دو ترتیب گزینهٔ متفاوت + ریست تایمر و قفل‌ها */
  function startRound(idx: number): void {
    let deck = deckRef.current;
    let i = idx;
    if (i >= deck.length) {
      // استخر تمام شد → از نو شافل و ادامه (چرخهٔ بی‌پایان مثل speed-quiz)
      deck = shuffle(deck);
      deckRef.current = deck;
      i = 0;
    }
    qiRef.current = i;
    const nq = deck[i];
    qRef.current = nq;
    // ترتیب گزینه‌ها بین دو نیمه باید متفاوت باشد
    const o1 = shuffle(BASE_ORDER);
    let o2 = shuffle(BASE_ORDER);
    let tries = 0;
    while (o2.join(",") === o1.join(",") && tries < 8) {
      o2 = shuffle(BASE_ORDER);
      tries += 1;
    }
    p1OrderRef.current = o1;
    p2OrderRef.current = o2;
    p1PickRef.current = null;
    p2PickRef.current = null;
    p1MsRef.current = 0;
    p2MsRef.current = 0;
    judgedRef.current = false;
    timeRef.current = ROUND_TIME;
    roundStartRef.current = Date.now();
    roundNoRef.current += 1;
    setQ(nq);
    setP1Order(o1);
    setP2Order(o2);
    setP1Pick(null);
    setP2Pick(null);
    setResult(null);
    setTimeLeft(ROUND_TIME);
    setRoundNum(roundNoRef.current);
    // اعلام شروع دور برای فناوری‌های کمکی (فاز G1-05 — aria-live مرکزی)
    setLiveMsg(
      `دور ${faNum(roundNoRef.current)} از ${faNum(configRef.current.rounds)} شروع شد — هر دو بازیکن جواب بدهید`,
    );
  }

  /** داوری دور — دقیقاً یک‌بار (قفل judgedRef): هر دو درست → سریع‌تر، یکی درست → همان، هیچ‌کدام → تساوی */
  function judge(): void {
    if (judgedRef.current || !qRef.current) return;
    judgedRef.current = true;
    const nq = qRef.current;
    const a1 = p1PickRef.current;
    const a2 = p2PickRef.current;
    const c1 = a1 !== null && a1 === nq.answer;
    const c2 = a2 !== null && a2 === nq.answer;
    let w: RoundWinner;
    if (c1 && c2) w = p1MsRef.current <= p2MsRef.current ? 0 : 1;
    else if (c1) w = 0;
    else if (c2) w = 1;
    else w = -1;
    // واژه‌های غلط‌زدهٔ واژگانی به صف مرور برمی‌گردند (گزینهٔ درست = خود واژهٔ انگلیسی)
    if (nq.category === "vocabulary") {
      if (a1 !== null && !c1) seedReviewFromQuiz(nq.options[nq.answer]);
      if (a2 !== null && !c2) seedReviewFromQuiz(nq.options[nq.answer]);
    }
    if (w === 0) wins1Ref.current += 1;
    else if (w === 1) wins2Ref.current += 1;
    setWins1(wins1Ref.current);
    setWins2(wins2Ref.current);
    setResult({ c1, c2, winner: w });
    // فاز G2-d — بازخورد صوتی/لرزشی per-بازیکن (طرح تفکیک شنیداری در سربرگ فایل):
    // بازیکن ۱: درست=correct/غلط=wrong · بازیکن ۲: درست=win/غلط=shoot — بی‌پاسخ = غلط
    playSound(c1 ? "correct" : "wrong");
    buzz(c1 ? "success" : "error");
    playSound(c2 ? "win" : "shoot");
    buzz(c2 ? "success" : "error");
    // اعلام نتیجهٔ دور برای فناوری‌های کمکی (فاز G1-05 — قانون سه‌کاناله)
    setLiveMsg(
      w === -1
        ? `دور ${faNum(roundNoRef.current)}: تساوی — هیچ‌کدام درست جواب نداد`
        : `دور ${faNum(roundNoRef.current)}: ${w === 0 ? configRef.current.p1 : configRef.current.p2} برندهٔ دور شد`,
    );
    // نمایش نتیجه ~۱.۲ ثانیه → دور بعد یا پایان مسابقه (زنجیرهٔ بی‌توقف — فریز حین توقف)
    later(() => {
      if (overRef.current) return;
      if (qiRef.current + 1 >= configRef.current.rounds) finish();
      else startRound(qiRef.current + 1);
    }, RESULT_MS);
  }

  /** ثبت پاسخ یک بازیکن (displayIdx = جای گزینه در نیمهٔ او؛ به اندیس اصلی ترجمه می‌شود) */
  function pick(player: 0 | 1, displayIdx: number): void {
    // فاز G2-d — گیت توقف: حین «دوئل متوقف شد» هیچ پاسخی ثبت نمی‌شود
    if (overRef.current || pausedRef.current || judgedRef.current || !qRef.current) return;
    const order = player === 0 ? p1OrderRef.current : p2OrderRef.current;
    const orig = order[displayIdx];
    if (orig === undefined) return;
    if (player === 0) {
      if (p1PickRef.current !== null) return;
      p1PickRef.current = orig;
      p1MsRef.current = Math.max(0, Date.now() - roundStartRef.current);
      setP1Pick(orig);
    } else {
      if (p2PickRef.current !== null) return;
      p2PickRef.current = orig;
      p2MsRef.current = Math.max(0, Date.now() - roundStartRef.current);
      setP2Pick(orig);
    }
    // اعلام نوبت برای فناوری‌های کمکی — فقط تا وقتی حریف جواب نداده (بعدش پیام داوری می‌آید)
    const other = player === 0 ? p2PickRef.current : p1PickRef.current;
    if (other === null) {
      setLiveMsg(
        `${player === 0 ? configRef.current.p1 : configRef.current.p2} جواب داد — منتظر حریف…`,
      );
    }
    // هر دو پاسخ دادند؟ دور همان‌جا داوری می‌شود
    if (p1PickRef.current !== null && p2PickRef.current !== null) judge();
  }

  /** پایان مسابقه: آمار، Attempt، رکورد و صفحهٔ نتیجهٔ کیت */
  function finish(): void {
    if (overRef.current) return;
    overRef.current = true;
    judgedRef.current = true;
    clearTimers();
    const cf = configRef.current;
    const w1 = wins1Ref.current;
    const w2 = wins2Ref.current;
    const finalWinner: RoundWinner = w1 > w2 ? 0 : w2 > w1 ? 1 : -1;
    // مدت مسابقه — مبدأ startAtRef حین هر توقف جبران شده (دو-نیمهٔ امن — فاز G2-d)
    const spent = Math.max(1, Math.round((Date.now() - startAtRef.current) / 1000));
    touchStreak();
    recordStudySession();
    bumpPlays(activeBookId, GAME_KEY);
    // فاز G1-10 — پایان عادی جلسهٔ تله‌متری
    sessionRef.current?.end("finish");
    // فاز G2-d — بازخورد سه‌کانالهٔ پایان مسابقه (صدا + لرزش + صفحهٔ نتیجه)
    playSound("finish");
    buzz("success");
    saveAttempt(activeBookId, GAME_KEY, {
      lesson: cf.lesson === ALL_LESSON ? 0 : cf.lesson,
      total: cf.rounds,
      correct: w1,
      duration: spent,
      detail: { p1: w1, p2: w2, p1Name: cf.p1, p2Name: cf.p2, winner: finalWinner },
    });
    // رکورد: بیشترین برد دور بازیکن ۱ — اسکوپ درس|all:تعداد دور (امضا دست‌نخورده)
    const scope = `${cf.lesson === ALL_LESSON ? "all" : cf.lesson}:${cf.rounds}`;
    const prev = loadBest<BestRecord>(activeBookId, GAME_KEY, scope);
    const rec = w1 > 0 && (prev === null || w1 > prev.score);
    if (rec) {
      saveBest(activeBookId, GAME_KEY, scope, { score: w1 });
      // فاز G2-d — صدای رکورد (افزون بر پایان — الگوی پایلوت memory)
      playSound("record");
      buzz("record");
    }
    setIsRecord(rec);
    setMatchSecs(spent);
    setWinner(finalWinner);
    setPhase("done");
  }

  /** شروع مسابقه — گارد استخر سؤال یکتا < تعداد دور */
  function start(): void {
    const uniq = pickUnique(pool, pool.length, (item) => item.text);
    if (uniq.length < rounds) {
      toast.error("سؤال یکتای کافی در این محدوده نیست — محدودهٔ دیگری را انتخاب کن");
      return;
    }
    clearTimers();
    deckRef.current = uniq;
    qiRef.current = 0;
    roundNoRef.current = 0;
    overRef.current = false;
    judgedRef.current = false;
    wins1Ref.current = 0;
    wins2Ref.current = 0;
    configRef.current = { lesson, rounds, p1: name1, p2: name2 };
    startAtRef.current = Date.now();
    timeRef.current = ROUND_TIME;
    // فاز G2-d — ساعت‌های توقف از نو (مسابقهٔ تازه بدون توقف معوق) + ادامه از هر توقف قبلی
    pauseAccumRef.current = 0;
    pauseStartRef.current = 0;
    resume();
    setExitAsk(false);
    // فاز G1-10 — جلسهٔ تازهٔ تله‌متری برای این مسابقه (level = تعداد دورها — قرارداد تسک)
    sessionRef.current = createGameSession({ game: GAME_KEY, level: `rounds:${rounds}` });
    sessionRef.current.start();
    setWins1(0);
    setWins2(0);
    setResult(null);
    setWinner(-1);
    setIsRecord(false);
    setMatchSecs(0);
    setPhase("playing");
    startRound(0);
  }

  // انصراف — دوئل از لحظهٔ شروع، دور ۱ در جریان است؛ هر انصراف حین playing یعنی
  // ≥۱ دور بازی شده → نگهبان خروج تأیید می‌گیرد (خروج از setup/done مستقیم است).
  function handleExitClick(): void {
    setExitAsk(true);
  }
  function confirmExit(): void {
    overRef.current = true;
    clearTimers();
    // فاز G1-10 — رهاکردن مسابقهٔ نیمه‌کاره
    sessionRef.current?.abandon("exit");
    setExitAsk(false);
    resume();
    setPhase("setup");
  }

  // ── effectها ──

  // آخرین نسخهٔ judge برای فراخوانی تازه از تایمر (الگوی latest-ref —
  // قاعدهٔ react-hooks/refs نوشتن ref در رندر را نمی‌پذیرد)
  useEffect(() => {
    judgeRef.current = judge;
  });

  // تایمر هر دور — صفر شدن یعنی داوری فوری (بی‌پاسخ = غلط)؛ بدون setState مستقیم
  // در بدنهٔ effect (react-hooks v6) — شمارش واقعی در timeRef که با شروع هر دور ریست می‌شود.
  // فاز G0-05 — گارد visibilitychange/pageshow: در تب مخفی interval پاک می‌شود و
  // بازگشت از bfcache هم پوشش داده می‌شود؛ unmount همیشه پاک می‌کند.
  // فاز G2-d — گیت روی paused (توقف دستی یا auto-pause هوک): حین توقف interval وجود
  // ندارد و بج زمان/نوار ثابت می‌مانند؛ این شنونده فقط «کمربند» است — توقف اصلی از
  // هوک می‌آید و اگر آینهٔ pausedRef گرفته باشد، اینجا دست به resume نمی‌زند.
  useEffect(() => {
    if (phase !== "playing" || paused) return;
    let iv: number | null = null;
    const startTimer = () => {
      if (iv !== null) return;
      iv = window.setInterval(() => {
        if (timeRef.current > 0 && !judgedRef.current) {
          timeRef.current -= 1;
          setTimeLeft((t) => Math.max(0, t - 1));
        }
        if (timeRef.current <= 0) {
          judgeRef.current?.();
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
      else if (!pausedRef.current) startTimer();
    };
    const onPageshow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      stopTimer(); // interval تازه می‌شود تا تیک معوقِ دورهٔ انجماد یک‌جا نپرد
      if (document.visibilityState === "visible") onVis();
    };
    startTimer();
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pageshow", onPageshow);
    return () => {
      stopTimer();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pageshow", onPageshow);
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

  const chipCls = (active: boolean) =>
    cn(
      "flex min-h-11 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
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
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <Swords size={22} />
              </span>
              <div>
                <h2 className="text-lg font-black">دوئل دونفره</h2>
                <p className="text-xs text-muted-foreground">
                  رو در رو روی یک صفحه — هر دو هم‌زمان جواب می‌دهید!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
              <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
              <p>
                هر دور {faNum(ROUND_TIME)} ثانیه وقت دارید؛ دور وقتی داوری می‌شود که هر دو جواب بدهید یا وقت تمام شود
                (بی‌پاسخ = غلط). اگر هر دو درست جواب بدهید، سریع‌تر برندهٔ دور است. ترتیب گزینه‌ها برای دو بازیکن فرق دارد!
              </p>
            </div>

            <div>
              <p className="mb-2 text-[13px] font-bold">اسم بازیکن‌ها؟</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-3">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                  <Input
                    value={p1Name}
                    onChange={(e) => setP1Name(e.target.value)}
                    aria-label="نام بازیکن ۱"
                    maxLength={18}
                    className="h-11 border-0 bg-transparent px-0 text-base font-bold shadow-none focus-visible:ring-0"
                  />
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/5 px-3">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                  <Input
                    value={p2Name}
                    onChange={(e) => setP2Name(e.target.value)}
                    aria-label="نام بازیکن ۲"
                    maxLength={18}
                    className="h-11 border-0 bg-transparent px-0 text-base font-bold shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="mb-2 text-[13px] font-bold">چند دور؟</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب تعداد دور">
                {ROUNDS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    aria-pressed={rounds === r}
                    onClick={() => setRounds(r)}
                    className={chipCls(rounds === r)}
                  >
                    {faNum(r)} دور
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

            {best !== null && (
              <Badge variant="outline" className="gap-1.5 border-emerald-500/40 text-emerald-600 dark:text-emerald-400">
                <Trophy size={12} />
                رکورد — بیشترین برد دور بازیکن ۱: {faNum(best)}
              </Badge>
            )}

            <Button size="lg" className="h-12 w-full gap-2 text-base" onClick={start}>
              <Swords size={18} />
              شروع دوئل
            </Button>
          </CardContent>
        </Card>
        {/* فاز G2-d — آموزش یک‌بارنمایش در اولین ورود */}
        <TutorialOverlay
          game={GAME_KEY}
          steps={TUTORIAL_STEPS}
          open={tutorialOpen}
          onOpenChange={handleTutorialOpenChange}
        />
      </>
    );
  }

  // ── Done — فاز G2-d: صفحهٔ نتیجهٔ استاندارد کیت جایگزین نمای دستی قبلی ──
  if (phase === "done") {
    // ستاره‌بندی per-game: دوئل رتبه ندارد — ستاره = کیفیت مسابقه (سربرگ فایل):
    // اختلاف برد دور ≤۱ = مسابقهٔ نزدیک (۳) · ≤۳ = رقابتی (۲) · بقیه = قاطع (۱)
    const diff = Math.abs(wins1 - wins2);
    const stars = diff <= 1 ? 3 : diff <= 3 ? 2 : 1;
    return (
      <ResultScreen
        title={winner === -1 ? "مساوی!" : `${winner === 0 ? name1 : name2} برد! 🏆`}
        stars={stars}
        isRecord={isRecord}
        stats={[
          {
            label: `امتیاز ${name1}`,
            value: faNum(wins1),
            icon: <Swords size={16} className="text-emerald-600 dark:text-emerald-400" />,
          },
          {
            label: `امتیاز ${name2}`,
            value: faNum(wins2),
            icon: <Swords size={16} className="text-amber-500" />,
          },
          {
            label: "مدت",
            value: fmtTime(matchSecs),
            icon: <Timer size={16} className="text-teal-500" />,
          },
        ]}
        onReplay={start}
        onExit={() => setPhase("setup")}
        exitLabel="تنظیمات"
      />
    );
  }

  // ── Playing ──
  if (!q) return null;
  const urgent = timeLeft <= 3;
  const pct = Math.max(0, Math.min(100, Math.round((timeLeft / ROUND_TIME) * 100)));
  const halves = [
    {
      player: 0 as const,
      name: name1,
      order: p1Order,
      pick: p1Pick,
      wins: wins1,
      avatarCls: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
      pickCls: "border-emerald-500/60 bg-emerald-500/10",
      numCls: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    },
    {
      player: 1 as const,
      name: name2,
      order: p2Order,
      pick: p2Pick,
      wins: wins2,
      avatarCls: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
      pickCls: "border-amber-500/60 bg-amber-500/10",
      numCls: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    },
  ];
  return (
    <>
      {/* فاز G2-d — هدر یکنواخت از کیت: دور/زمان/امتیاز دو بازیکن + کنترل‌های استاندارد */}
      <GameShell
        title="دوئل دونفره"
        icon={<Swords size={18} />}
        stats={
          <>
            <Badge variant="secondary" className="gap-1 text-[11px] font-black">
              دور {faNum(roundNum)} از {faNum(rounds)}
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                "gap-1 text-[11px] font-black",
                urgent && "border-destructive/60 bg-destructive/10 text-destructive",
              )}
            >
              <Clock size={11} />
              {faNum(timeLeft)} ثانیه
            </Badge>
            <Badge
              variant="outline"
              className="gap-1 border-emerald-500/40 text-[11px] font-black text-emerald-600 dark:text-emerald-400"
            >
              {name1}: {faNum(wins1)}
            </Badge>
            <Badge
              variant="outline"
              className="gap-1 border-amber-500/40 text-[11px] font-black text-amber-600 dark:text-amber-400"
            >
              {name2}: {faNum(wins2)}
            </Badge>
          </>
        }
        liveMsg={liveMsg}
        progress={
          /* تایمر ۱۰ ثانیه‌ای هر دور — از کارت وسط به قاب زیر هدر منتقل شد (فاز G2-d)؛
             حین توقف ثابت می‌ماند و وضعیت هیچ بازیکنی را لو نمی‌دهد */
          <div
            className="h-1.5 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-label="زمان باقی‌ماندهٔ دور"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={cn(
                "h-full rounded-full transition-all duration-1000 ease-linear",
                urgent ? "bg-destructive" : "bg-teal-500",
              )}
              style={{ width: `${pct}%` }}
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
        <div className="relative">
          {/* فاز G2-d — بدنهٔ بازی حین توقف تار/بی‌اثر/aria-hidden؛ اورلی متن عمومی
              «دوئل متوقف شد» دارد و بج زمان هدر/نوار لو نمی‌دهند (توقف دو-نیمهٔ امن) */}
          <div
            aria-hidden={paused}
            className={cn(
              "flex flex-col gap-2.5",
              paused && "pointer-events-none blur-sm select-none",
            )}
          >
            {halves.map((h) => {
              const isCorrectOpt = (orig: number) => result !== null && orig === q.answer;
              const isMyWrongPick = (orig: number) =>
                result !== null && h.pick === orig && orig !== q.answer;
              return (
                <Card
                  key={h.player}
                  className={cn(
                    "transition-colors",
                    result?.winner === h.player && "border-emerald-500/60",
                    result !== null &&
                      result.winner !== h.player &&
                      result.winner !== -1 &&
                      "border-destructive/40",
                  )}
                >
                  <CardContent className="space-y-2.5 p-3.5">
                    {/* سربرگ نیمه: نام + برد دورها + نتیجهٔ دور */}
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[12px] font-black",
                          h.avatarCls,
                        )}
                        aria-hidden="true"
                      >
                        {faNum(h.player + 1)}
                      </span>
                      <p className="truncate text-[13px] font-black">{h.name}</p>
                      <Badge variant="secondary" className="shrink-0 px-2 py-0.5 text-[10px] font-black">
                        {faNum(h.wins)} برد
                      </Badge>
                      <span className="mr-auto shrink-0">
                        {result &&
                          (result.winner === -1 ? (
                            <Badge
                              variant="outline"
                              className="border-muted-foreground/40 text-[10px] text-muted-foreground"
                            >
                              تساوی
                            </Badge>
                          ) : result.winner === h.player ? (
                            <Badge
                              variant="outline"
                              className="border-emerald-500/50 bg-emerald-500/10 text-[10px] text-emerald-600 dark:text-emerald-400"
                            >
                              دور را برد
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="text-[10px]">
                              باخت
                            </Badge>
                          ))}
                      </span>
                    </div>

                    {/* چهار گزینه — ترتیب مخصوص همین نیمه */}
                    <div className="grid grid-cols-2 gap-2">
                      {h.order.map((orig, i) => {
                        const pickedWaiting = result === null && h.pick === orig;
                        const dim = result !== null && !isCorrectOpt(orig) && !isMyWrongPick(orig);
                        const done = result !== null;
                        return (
                          <button
                            key={`${roundNum}-${h.player}-${i}`}
                            type="button"
                            disabled={done || h.pick !== null || paused}
                            aria-label={`${h.name} — گزینهٔ ${faNum(i + 1)}`}
                            aria-pressed={pickedWaiting}
                            onClick={() => pick(h.player, i)}
                            className={cn(
                              "flex min-h-11 items-center gap-2 rounded-xl border bg-card px-3 py-1.5 text-right transition-all",
                              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                              !done && "hover:border-primary/50 hover:bg-muted/40",
                              pickedWaiting && h.pickCls,
                              isCorrectOpt(orig) && "border-emerald-500/60 bg-emerald-500/10",
                              isMyWrongPick(orig) && "border-destructive/60 bg-destructive/10",
                              dim && "opacity-50",
                            )}
                          >
                            <span
                              className={cn(
                                "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-black",
                                h.numCls,
                              )}
                            >
                              {faNum(i + 1)}
                            </span>
                            <span dir="ltr" className="flex-1 font-en text-[13px] font-bold leading-6">
                              {q.options[orig]}
                            </span>
                            {isCorrectOpt(orig) && (
                              <Check size={15} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                            )}
                            {isMyWrongPick(orig) && <X size={15} className="shrink-0 text-destructive" />}
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* کارت سؤال مشترک — وسط صفحه (بج‌های دور/زمان به هدر شِل منتقل شد) */}
            <Card className="border-teal-500/30">
              <CardContent className="space-y-2.5 p-3.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant="outline" className="text-[10px] text-muted-foreground">
                    {lessonLabel(q.lesson)}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] text-muted-foreground">
                    {q.level}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] text-muted-foreground">
                    {q.category === "vocabulary" ? "واژگان" : "گرامر"}
                  </Badge>
                </div>

                <p dir="ltr" className="font-en text-[14px] font-bold leading-7">
                  {q.text.replace(/_{3,}/g, ".....")}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* فاز G2-d — اورلی توقف: متن عمومی بدون نشت وضعیت/زمان بازیکن‌ها */}
          {paused && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl bg-background/80 backdrop-blur-sm">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Pause size={26} />
              </span>
              <p className="text-sm font-black">دوئل متوقف شد</p>
              <p className="max-w-64 text-center text-[11px] leading-5 text-muted-foreground">
                زمان هیچ بازیکنی نمی‌سوزد — با ادامه، دقیقاً از همین‌جا
              </p>
              <Button onClick={resume} className="h-11 gap-2">
                <Play size={16} />
                ادامهٔ دوئل
              </Button>
            </div>
          )}
        </div>

        {/* فاز G2-d — نگهبان خروج استاندارد کیت (هر انصراف حین playing = ≥۱ دور در جریان) */}
        <GameExitGuard open={exitAsk} onOpenChange={setExitAsk} onConfirm={confirmExit} />
      </GameShell>
      {/* فاز G2-d — راهنمای دکمهٔ شِل (حین بازی با توقف باز می‌شود) */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
