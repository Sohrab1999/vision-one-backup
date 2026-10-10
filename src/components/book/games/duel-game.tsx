"use client";

/**
 * بازی «دوئل دونفره» (Same-device Duel) — فاز ۴ نقشه راه ویژن‌وان.
 *
 * یک صفحه، دو بازیکن، همان سؤال‌ها — رو در رو:
 * - Setup: نام دو بازیکن + تعداد دور (۵/۷/۹) + دسته + محزودهٔ درس + Badge رکورد
 *   «بیشترین برد دور بازیکن ۱» (اسکوپ درس|all:تعداد دور).
 * - نیمهٔ بالا = بازیکن ۱ (emerald)، نیمهٔ پایین = بازیکن ۲ (amber)؛ وسط، نوار سؤال
 *   مشترک با Badge شمارهٔ دور و تایمر ۱۰ ثانیه‌ای هر دور (نوار width).
 * - هر نیمه ۴ دکمهٔ گزینه دارد؛ ترتیب گزینه‌ها بین دو نیمه shuffle متفاوت است تا
 *   رقیب نتواند از جای انگشت دیگری تقلب کند.
 * - هر بازیکن یک‌بار پاسخ می‌دهد؛ دور وقتی داوری می‌شود که هر دو پاسخ بدهند یا وقت
 *   تمام شود (بی‌پاسخ = غلط). هر دو درست → سریع‌تر برنده؛ یکی درست → همان؛ هیچ‌کدام
 *   → تساوی بدون امتیاز. نتیجهٔ دور ~۱.۲ ثانیه نمایش داده می‌شود و دور بعد می‌آید.
 * - واژه‌های غلط‌زدهٔ واژگانی (فقط وقتی بازیکن واقعاً گزینه‌ای زده باشد) با
 *   seedReviewFromQuiz — متن گزینهٔ درست = خود واژهٔ انگلیسی — به صف مرور برمی‌گردند.
 * - پایان دورها: صفحهٔ برنده + جدول امتیاز (برد دور / پاسخ درست / دقت) + «دوئل جدید» و «تنظیمات».
 * - پایان: touchStreak + recordStudySession + bumpPlays + saveAttempt (total = تعداد دور،
 *   correct = دورهای بردهٔ بازیکن ۱، detail {p1,p2,p1Name,p2Name,winner}) + saveBest
 *   {score} = بیشترین برد دور بازیکن ۱ با اسکوپ `${درس|all}:${تعداد دور}`.
 *
 * نکتهٔ تایمر: interval هر دور مالک شمارش است؛ مقدار واقعی در timeRef (با شروع هر دور
 * ریست می‌شود) و setTimeLeft فقط نمایش را همگام نگه می‌دارد. داوریِ هر دور دقیقاً
 * یک‌بار با judgedRef قفل می‌شود؛ زنجیرهٔ «نمایش نتیجه → دور بعد» در timersRef است و
 * در انصراف/unmount کامل پاک می‌شود (الگوی react-hooks v6: صفر setState در بدنهٔ effect).
 */

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  Check,
  Clock,
  Crown,
  Play,
  RotateCcw,
  Sparkles,
  Swords,
  Trophy,
  X,
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
  loadBest,
  saveBest,
  bumpPlays,
  saveAttempt,
  pickUnique,
  shuffle,
  subscribeGameData,
} from "./shared";

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
  /** پاسخ‌های درست هر بازیکن (برای دقت — با تعداد بردها یکی نیست) */
  const [correct1, setCorrect1] = useState(0);
  const [correct2, setCorrect2] = useState(0);

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
  /** شروع دور برای محاسبهٔ سرعت پاسخ هر بازیکن */
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
  const corr1Ref = useRef(0);
  const corr2Ref = useRef(0);
  const configRef = useRef<DuelConfig>({ lesson: ALL_LESSON, rounds: 7, p1: "بازیکن ۱", p2: "بازیکن ۲" });
  /** لحظهٔ شروع مسابقه برای محاسبهٔ duration */
  const startAtRef = useRef(0);
  /** زنجیرهٔ همهٔ setTimeoutها (نمایش نتیجه → دور بعد) — در انصراف/unmount پاک می‌شود */
  const timersRef = useRef<number[]>([]);
  /** آخرین نسخهٔ judge برای فراخوانی تازه از تایمر (الگوی latest-ref) */
  const judgeRef = useRef<(() => void) | null>(null);

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

  // ── مدیریت تایمرها ──

  /** زمان‌بندی داخل زنجیرهٔ ref‌شده — بعد از اجرا خودش را از فهرست حذف می‌کند */
  function later(fn: () => void, ms: number): void {
    const t = window.setTimeout(() => {
      timersRef.current = timersRef.current.filter((x) => x !== t);
      fn();
    }, ms);
    timersRef.current.push(t);
  }

  function clearTimers(): void {
    for (const t of timersRef.current) window.clearTimeout(t);
    timersRef.current = [];
  }

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
    if (c1) corr1Ref.current += 1;
    if (c2) corr2Ref.current += 1;
    setWins1(wins1Ref.current);
    setWins2(wins2Ref.current);
    setCorrect1(corr1Ref.current);
    setCorrect2(corr2Ref.current);
    setResult({ c1, c2, winner: w });
    // نمایش نتیجه ~۱.۲ ثانیه → دور بعد یا پایان مسابقه
    later(() => {
      if (overRef.current) return;
      if (qiRef.current + 1 >= configRef.current.rounds) finish();
      else startRound(qiRef.current + 1);
    }, RESULT_MS);
  }

  /** ثبت پاسخ یک بازیکن (displayIdx = جای گزینه در نیمهٔ او؛ به اندیس اصلی ترجمه می‌شود) */
  function pick(player: 0 | 1, displayIdx: number): void {
    if (overRef.current || judgedRef.current || !qRef.current) return;
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
    // هر دو پاسخ دادند؟ دور همان‌جا داوری می‌شود
    if (p1PickRef.current !== null && p2PickRef.current !== null) judge();
  }

  /** پایان مسابقه: آمار، Attempt، رکورد و صفحهٔ نتیجه */
  function finish(): void {
    if (overRef.current) return;
    overRef.current = true;
    judgedRef.current = true;
    clearTimers();
    const cf = configRef.current;
    const w1 = wins1Ref.current;
    const w2 = wins2Ref.current;
    const finalWinner: RoundWinner = w1 > w2 ? 0 : w2 > w1 ? 1 : -1;
    const spent = Math.max(1, Math.round((Date.now() - startAtRef.current) / 1000));
    touchStreak();
    recordStudySession();
    bumpPlays(activeBookId, GAME_KEY);
    saveAttempt(activeBookId, GAME_KEY, {
      lesson: cf.lesson === ALL_LESSON ? 0 : cf.lesson,
      total: cf.rounds,
      correct: w1,
      duration: spent,
      detail: { p1: w1, p2: w2, p1Name: cf.p1, p2Name: cf.p2, winner: finalWinner },
    });
    // رکورد: بیشترین برد دور بازیکن ۱ — اسکوپ درس|all:تعداد دور
    const scope = `${cf.lesson === ALL_LESSON ? "all" : cf.lesson}:${cf.rounds}`;
    const prev = loadBest<BestRecord>(activeBookId, GAME_KEY, scope);
    const rec = w1 > 0 && (prev === null || w1 > prev.score);
    if (rec) saveBest(activeBookId, GAME_KEY, scope, { score: w1 });
    setIsRecord(rec);
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
    corr1Ref.current = 0;
    corr2Ref.current = 0;
    configRef.current = { lesson, rounds, p1: name1, p2: name2 };
    startAtRef.current = Date.now();
    timeRef.current = ROUND_TIME;
    setWins1(0);
    setWins2(0);
    setCorrect1(0);
    setCorrect2(0);
    setResult(null);
    setWinner(-1);
    setIsRecord(false);
    setPhase("playing");
    startRound(0);
  }

  function quit(): void {
    overRef.current = true;
    clearTimers();
    setPhase("setup");
  }

  // ── effectها ──

  // آخرین نسخهٔ judge برای فراخوانی تازه از تایمر (الگوی latest-ref —
  // قاعدهٔ react-hooks/refs نوشتن ref در رندر را نمی‌پذیرد)
  useEffect(() => {
    judgeRef.current = judge;
  });

  // تایمر هر دور — صفر شدن یعنی داوری فوری (بی‌پاسخ = غلط)؛ بدون setState مستقیم
  // در بدنهٔ effect (react-hooks v6) — شمارش واقعی در timeRef که با شروع هر دور ریست می‌شود
  // فاز G0-05 — گارد visibilitychange: در تب مخفی interval پاک می‌شود (شمارش دور می‌ایستد)
  // و در بازگشت با همان timeRef ادامه می‌یابد؛ زمانِ مخفی‌بودن به مبدأ سنجش سرعت پاسخ
  // (roundStartRef) و مدت کل مسابقه (startAtRef) هم اضافه نمی‌شود تا داوری «سریع‌تر» و
  // duration دست نخورد. بازگشت از bfcache با pageshow پوشش داده می‌شود؛ unmount همیشه پاک می‌کند.
  useEffect(() => {
    if (phase !== "playing") return;
    let iv: number | null = null;
    let hiddenAt = 0;
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
      if (document.visibilityState === "hidden") {
        stopTimer();
        hiddenAt = Date.now();
      } else {
        startTimer();
        if (hiddenAt > 0) {
          const gap = Date.now() - hiddenAt;
          hiddenAt = 0;
          if (gap > 0) {
            // جبران زمان مخفی — فقط با تب‌سوییچ فعال می‌شود (کاربر عادی: بدون تغییر)
            roundStartRef.current += gap;
            startAtRef.current += gap;
          }
        }
      }
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
  }, [phase]);

  // پاک‌سازی کامل زنجیرهٔ تایمرها در unmount
  useEffect(
    () => () => {
      for (const t of timersRef.current) window.clearTimeout(t);
      timersRef.current = [];
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
      <Card className="mx-auto max-w-xl rise-in">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Swords size={22} />
            </span>
            <div>
              <h2 className="text-lg font-black">دوئل دونفره</h2>
              <p className="text-xs text-muted-foreground">رو در رو روی یک صفحه — هر دو هم‌زمان جواب می‌دهید!</p>
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
                  className="h-11 border-0 bg-transparent px-0 text-[13px] font-bold shadow-none focus-visible:ring-0"
                />
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/5 px-3">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                <Input
                  value={p2Name}
                  onChange={(e) => setP2Name(e.target.value)}
                  aria-label="نام بازیکن ۲"
                  maxLength={18}
                  className="h-11 border-0 bg-transparent px-0 text-[13px] font-bold shadow-none focus-visible:ring-0"
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
    );
  }

  // ── Done ──
  if (phase === "done") {
    const acc1 = rounds > 0 ? Math.round((correct1 / rounds) * 100) : 0;
    const acc2 = rounds > 0 ? Math.round((correct2 / rounds) * 100) : 0;
    const rows = [
      {
        name: name1,
        wins: wins1,
        correct: correct1,
        acc: acc1,
        isWin: winner === 0,
        avatarCls: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
        rowCls: winner === 0 ? "border-emerald-500/50 bg-emerald-500/8" : "",
      },
      {
        name: name2,
        wins: wins2,
        correct: correct2,
        acc: acc2,
        isWin: winner === 1,
        avatarCls: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
        rowCls: winner === 1 ? "border-amber-500/50 bg-amber-500/8" : "",
      },
    ];
    return (
      <Card className="mx-auto max-w-xl rise-in border-emerald-500/30">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <Swords size={30} />
          </span>
          {winner === -1 ? (
            <h2 className="text-xl font-black">مساوی!</h2>
          ) : (
            <h2
              className={cn(
                "flex items-center gap-2 text-xl font-black",
                winner === 0 && "text-emerald-600 dark:text-emerald-400",
                winner === 1 && "text-amber-600 dark:text-amber-400",
              )}
            >
              <Crown size={22} className="text-amber-500" />
              {winner === 0 ? name1 : name2} برنده شد!
            </h2>
          )}
          {isRecord && (
            <Badge className="gap-1.5 bg-emerald-500 text-emerald-950 shadow-md shadow-emerald-500/30">
              <Trophy size={13} />
              رکورد جدید! بیشترین برد بازیکن ۱ 🏆
            </Badge>
          )}
          <p className="text-[11px] text-muted-foreground">نتیجهٔ {faNum(rounds)} دور دوئل</p>

          {/* جدول امتیاز دو بازیکن */}
          <div className="w-full space-y-2">
            {rows.map((row, i) => (
              <div
                key={row.name + String(i)}
                className={cn("flex items-center gap-3 rounded-xl border bg-card p-3 text-right", row.rowCls)}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[12px] font-black",
                    row.avatarCls,
                  )}
                >
                  {faNum(i + 1)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1 truncate text-[13px] font-black">
                    {row.name}
                    {row.isWin && <Crown size={13} className="shrink-0 text-amber-500" aria-label="برنده" />}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {faNum(row.correct)} پاسخ درست از {faNum(rounds)} دور
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-base font-black leading-none">{faNum(row.wins)}</p>
                  <p className="mt-1 text-[9px] text-muted-foreground">برد دور</p>
                </div>
                <div className="text-center">
                  <p className="text-base font-black leading-none">{faNum(row.acc)}٪</p>
                  <p className="mt-1 text-[9px] text-muted-foreground">دقت</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={start} className="gap-2">
              <Play size={16} />
              دوئل جدید
            </Button>
            <Button variant="outline" onClick={() => setPhase("setup")}>
              <RotateCcw size={16} />
              تنظیمات
            </Button>
          </div>
        </CardContent>
      </Card>
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
    <div className="mx-auto flex max-w-xl flex-col gap-2.5 rise-in">
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
              result !== null && result.winner !== h.player && result.winner !== -1 && "border-destructive/40",
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
                      disabled={done || h.pick !== null}
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

      {/* نوار سؤال مشترک — وسط صفحه */}
      <Card className="border-teal-500/30">
        <CardContent className="space-y-2.5 p-3.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="secondary" className="text-[11px] font-black">
              دور {faNum(roundNum)} از {faNum(rounds)}
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                "gap-1 px-2 py-0.5 text-[11px] font-black",
                urgent && "border-destructive/60 bg-destructive/10 text-destructive",
              )}
            >
              <Clock size={12} />
              {faNum(timeLeft)} ثانیه
            </Badge>
            <Badge variant="outline" className="text-[10px] text-muted-foreground">
              {lessonLabel(q.lesson)}
            </Badge>
            <Badge variant="outline" className="text-[10px] text-muted-foreground">
              {q.level}
            </Badge>
            <Badge variant="outline" className="text-[10px] text-muted-foreground">
              {q.category === "vocabulary" ? "واژگان" : "گرامر"}
            </Badge>
            <div className="mr-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={quit}
                className="h-7 px-2 text-[11px] text-muted-foreground"
              >
                انصراف
              </Button>
            </div>
          </div>

          <p dir="ltr" className="font-en text-[14px] font-bold leading-7">
            {q.text.replace(/_{3,}/g, ".....")}
          </p>

          {/* تایمر ۱۰ ثانیه‌ای هر دور */}
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
        </CardContent>
      </Card>
    </div>
  );
}
