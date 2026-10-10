"use client";

/**
 * بازی «مار و پله واژگانی» (Snakes & Ladders) — فاز ۴ نقشه راه جامع ۲۰۲۶.
 *
 * تختهٔ کلاسیک ۱۰۰ خانه با شماره‌گذاری مارپیچی (۱ پایین-چپ، زیگزاگ تا ۱۰۰ بالا):
 * برای انداختن تاس باید اول سؤال واژگانی خود جزوه (data.quiz.seed) را درست جواب بدهی.
 * - حالت‌ها: «روی یک دستگاه» (۲ تا ۴ بازیکن hot-seat با رنگ‌های emerald/amber/teal/muted)
 *   یا «مقابل ربات» (تو + ربات با ۶۵٪ احتمال پاسخ درست).
 * - پاسخ درست → انیمیشن تاس (Dice* با match-pop) + حرکت مهره خانه‌به‌خانه (~۱۲۰ms)؛
 *   خانه‌های مار/پله نشان کوچک مقصد دارند (TrendingDown destructive / TrendingUp primary)
 *   و انتقال با toast اعلام می‌شود؛ تاس ۶ = نوبت اضافه.
 * - پاسخ غلط → toast «بند شدی!» و نوبت به بازیکن بعدی می‌رسد.
 * - سؤال‌ها با pickUnique روی text یکتا انتخاب می‌شوند؛ استخر تمام شد؟ reshuffle و ادامه.
 * - برنده: رسیدن به خانهٔ ≥۱۰۰ → فاز done با ستایش برنده و آمار هر بازیکن.
 * - رکورد «سریع‌ترین پیروزی» با اسکوپ hotseat | vs-bot در localStorage.
 */

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  Bot,
  Crown,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Dices,
  PartyPopper,
  Play,
  RotateCcw,
  Sparkles,
  Timer,
  TrendingDown,
  TrendingUp,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { QuizQuestionSeed } from "@/data/types";
import { useBook, useBookData } from "@/lib/book-context";
import { touchStreak } from "@/lib/streak-store";
import { recordStudySession } from "@/lib/goal-store";
import {
  bumpPlays,
  faNum,
  fmtTime,
  loadBest,
  pickUnique,
  saveAttempt,
  saveBest,
  shuffle,
  subscribeGameData,
} from "./shared";

// ─── ثابت‌ها و نقشهٔ تخته ───

const GAME_KEY = "snakes-ladders";
const ALL_LESSON = -1;
const MIN_POOL = 5;
/** مدت هر پلهٔ حرکت مهره (ms) */
const STEP_MS = 120;
/** تأخیر «فکر کردن» ربات (ms) */
const BOT_DELAY = 900;
/** احتمال پاسخ درست ربات (۶۵٪ — همان عددی که در setup نمایش داده می‌شود) */
const BOT_SKILL = 0.65;
/** تعداد چرخش تصادفی تاس قبل از ثابت‌شدن عدد نهایی */
const DICE_FLIPS = 5;

/** مارها: سر → دُم */
const SNAKES: Record<number, number> = { 16: 6, 48: 30, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
/** پله‌ها: پایین → بالا */
const LADDERS: Record<number, number> = { 4: 14, 9: 31, 20: 38, 28: 84, 40: 59, 51: 67, 63: 81, 71: 91 };

type Phase = "setup" | "playing" | "done";
type Mode = "hotseat" | "bot";
type CatKey = "all" | "vocabulary" | "grammar";

interface Player {
  name: string;
  isBot: boolean;
  /** اندیس رنگ مهره در TOKEN_BG */
  ci: number;
}

interface PStats {
  asked: number;
  correct: number;
  wrong: number;
}

/** شکل رکورد شخصی — سریع‌ترین پیروزی (ثانیه؛ کمتر = بهتر) */
interface BestRecord {
  time: number;
}

/** رنگ مهرهٔ هر بازیکن — بازیکن چهارم muted-foreground (قاعدهٔ پالت پروژه) */
const TOKEN_BG = ["bg-emerald-500", "bg-amber-500", "bg-teal-500", "bg-muted-foreground"] as const;

const DICE_ICONS: Record<number, LucideIcon> = { 1: Dice1, 2: Dice2, 3: Dice3, 4: Dice4, 5: Dice5, 6: Dice6 };

/**
 * موقعیت شبکهٔ هر خانه — شماره‌گذاری مارپیچی کلاسیک:
 * ردیف پایین (b = 0) از چپ بالا می‌رود، ردیف‌های فرد از راست (زیگزاگ).
 * چیدمان RTL است، پس ستون شبکه = ۱۰ − فاصله از چپ؛
 * مثلاً خانهٔ ۱ → col 10/row 10 (پایین-چپ) و خانهٔ ۱۰۰ → col 10/row 1 (بالا-چپ).
 */
const CELL_POS: { col: number; row: number }[] = Array.from({ length: 100 }, (_, i) => {
  const n = i + 1;
  const b = Math.floor((n - 1) / 10);
  const fromLeft = b % 2 === 0 ? (n - 1) % 10 : 9 - ((n - 1) % 10);
  return { col: 10 - fromLeft, row: 9 - b + 1 };
});

function lessonLabel(l: number): string {
  return l === 0 ? "جمع‌بندی" : `درس ${faNum(l)}`;
}

/** یک گزینهٔ غلط تصادفی برای جواب ربات */
function wrongIndexOf(q: QuizQuestionSeed): number {
  const wrongs = [0, 1, 2, 3].filter((i) => i !== q.answer);
  return wrongs[Math.floor(Math.random() * wrongs.length)] ?? q.answer;
}

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
  /** نگهبان خروج (فاز G0-06) — دیالوگ تأیید وقتی دور شروع شده و هنوز به پایان نرسیده */
  const [exitAsk, setExitAsk] = useState(false);

  // ── stateهای فاز done ──
  const [winner, setWinner] = useState<number | null>(null);
  const [isRecord, setIsRecord] = useState(false);

  // ── refs — منبع حقیقت منطق بازی (همهٔ callbackهای تایمر از این‌ها می‌خوانند) ──
  const playersRef = useRef<Player[]>([]);
  const posRef = useRef<number[]>([]);
  const statsRef = useRef<PStats[]>([]);
  const curRef = useRef(0);
  const qRef = useRef<QuizQuestionSeed | null>(null);
  const deckRef = useRef<QuizQuestionSeed[]>([]);
  const qiRef = useRef(-1);
  const secsRef = useRef(0);
  /** قفل نوبت تا پایان کامل جریان (پاسخ → تاس → حرکت → مار/پله) */
  const turnLockRef = useRef(false);
  /** زنجیرهٔ همهٔ setTimeoutهای جریان نوبت — در انصراف/unmount پاک می‌شود */
  const timersRef = useRef<number[]>([]);

  // اسکوپ رکورد طبق نقشه راه: hotseat | vs-bot
  const modeScope = mode === "bot" ? "vs-bot" : "hotseat";

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
    if (playersRef.current[p]?.isBot) {
      later(() => botAnswer(p), BOT_DELAY);
    }
  }

  /** تاس: چند چرخش نمایشی → عدد قطعی → شروع حرکت مهره */
  function proceedAfterCorrect(p: number): void {
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
        later(() => hop(p, d), 420);
      }
    }
    later(cycle, 350);
  }

  /** حرکت مهره خانه‌به‌خانه با زنجیرهٔ setTimeout پله‌ای (~۱۲۰ms) */
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

  /** بررسی مار/پله در خانهٔ فرود و اعلام انتقال با toast */
  function land(p: number, d: number): void {
    const pos = posRef.current[p];
    const snakeTo = SNAKES[pos];
    const ladderTo = LADDERS[pos];
    if (snakeTo !== undefined) {
      toast.error(`مار! برگشتی به خانهٔ ${faNum(snakeTo)}`);
      later(() => {
        posRef.current[p] = snakeTo;
        setPositions([...posRef.current]);
        afterJump(p, d);
      }, 550);
    } else if (ladderTo !== undefined) {
      toast.success(`پله! رفتی به خانهٔ ${faNum(ladderTo)}`);
      later(() => {
        posRef.current[p] = ladderTo;
        setPositions([...posRef.current]);
        afterJump(p, d);
      }, 550);
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
      beginTurn(p);
    } else {
      beginTurn((p + 1) % playersRef.current.length);
    }
  }

  /** پاسخ ربات — نمایش گزینهٔ انتخابی‌اش و طی همان جریان بازیکن انسانی */
  function botAnswer(p: number): void {
    const cq = qRef.current;
    if (!cq) return;
    const ok = Math.random() < BOT_SKILL;
    const idx = ok ? cq.answer : wrongIndexOf(cq);
    setReveal({ picked: idx, ok, byBot: true });
    bumpStats(p, ok);
    if (ok) {
      later(() => proceedAfterCorrect(p), 600);
    } else {
      toast.error(`${playersRef.current[p]?.name ?? "ربات"} بند شد!`);
      later(() => beginTurn((p + 1) % playersRef.current.length), 1100);
    }
  }

  function answerHuman(idx: number): void {
    if (turnLockRef.current || !q) return;
    const p = curRef.current;
    if (playersRef.current[p]?.isBot) return;
    turnLockRef.current = true;
    const ok = idx === q.answer;
    setReveal({ picked: idx, ok, byBot: false });
    bumpStats(p, ok);
    if (ok) {
      later(() => proceedAfterCorrect(p), 350);
    } else {
      toast.error("بند شدی!");
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
    setWinner(null);
    setIsRecord(false);
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
    const ps = playersRef.current;
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
    // رکورد سریع‌ترین پیروزی — فقط برندهٔ انسانی رکورد می‌سازد
    if (!ps[winnerIdx]?.isBot) {
      const prev = loadBest<BestRecord>(activeBookId, GAME_KEY, modeScope);
      if (!prev || spent < prev.time) {
        saveBest(activeBookId, GAME_KEY, modeScope, { time: spent });
        setIsRecord(true);
      }
    }
    setWinner(winnerIdx);
    setPhase("done");
  }

  function cancel(): void {
    clearTimers();
    turnLockRef.current = false;
    setExitAsk(false);
    setPhase("setup");
  }

  /**
   * نگهبان خروج (فاز G0-06) — «انصراف» وقتی دورِ شروع‌شده و نه‌تمام‌شده در جریان است
   * (فاز playing) فقط با تأیید AlertDialog اجرا می‌شود؛ در فازهای setup/done خروج مستقیم است.
   */
  function requestExit(): void {
    if (phase === "playing") setExitAsk(true);
    else cancel();
  }

  // ── effectها ──

  // تایمر زمان بازی — بدون setState مستقیم در بدنهٔ effect (react-hooks v6)
  // گارد visibilitychange (فاز G0-05 واگذارشده به همین فایل): شمارش زمان در تب مخفی
  // متوقف و در بازگشت از سر گرفته می‌شود. زنجیره‌های یک‌بارهٔ نوبت (timersRef — تاس،
  // حرکت مهره، تأخیر ربات) عمداً دست‌نخورده‌اند: بخشی از جریان پاسخ‌اند، در تب مخفی
  // فقط throttle می‌شوند و اثری روی زمان/امتیاز بازیکن ندارند.
  const secsIvRef = useRef<number | null>(null);
  useEffect(() => {
    if (phase !== "playing") return;
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
      else startClock();
    };
    startClock();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      stopClock();
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

  // ── Setup ──
  if (phase === "setup") {
    const chipCls = (active: boolean) =>
      cn(
        "flex min-h-11 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
          : "text-muted-foreground hover:bg-muted",
      );
    return (
      <Card className="mx-auto max-w-xl rise-in">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Dices size={22} />
            </span>
            <div>
              <h2 className="text-lg font-black">مار و پله واژگانی</h2>
              <p className="text-xs text-muted-foreground">برای تاس انداختن اول باید سؤال را درست جواب بدهی!</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
            <p>
              هر بازیکن برای حرکت باید یک سؤال را درست جواب دهد؛ بعد تاس می‌آید و مهره خانه‌به‌خانه جلو می‌رود.
              تاس ۶ یک نوبت اضافه می‌دهد — مراقب مارها باش و دعا کن پله‌ها سر راهت باشند!
            </p>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">حالت بازی؟</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب حالت بازی">
              <button
                type="button"
                onClick={() => setMode("hotseat")}
                aria-pressed={mode === "hotseat"}
                className={chipCls(mode === "hotseat")}
              >
                <Users size={14} />
                روی یک دستگاه
              </button>
              <button
                type="button"
                onClick={() => setMode("bot")}
                aria-pressed={mode === "bot"}
                className={chipCls(mode === "bot")}
              >
                <Bot size={14} />
                مقابل ربات
              </button>
            </div>
          </div>

          {mode === "hotseat" ? (
            <div className="space-y-3">
              <div>
                <p className="mb-2 text-[13px] font-bold">چند بازیکن؟</p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="تعداد بازیکن‌ها">
                  {[2, 3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setCount(n)}
                      aria-pressed={count === n}
                      className={chipCls(count === n)}
                    >
                      {faNum(n)} بازیکن
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[13px] font-bold">نام بازیکن‌ها (اختیاری)</p>
                {Array.from({ length: count }, (_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={cn("h-3 w-3 shrink-0 rounded-full", TOKEN_BG[i])} aria-hidden />
                    <Input
                      value={names[i] ?? ""}
                      onChange={(e) => setNames((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))}
                      placeholder={`بازیکن ${faNum(i + 1)}`}
                      maxLength={18}
                      aria-label={`نام بازیکن ${faNum(i + 1)}`}
                      className="h-11 text-[13px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-[13px] font-bold">بازیکن‌ها</p>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                <Input
                  value={names[0] ?? ""}
                  onChange={(e) => setNames((prev) => prev.map((v, j) => (j === 0 ? e.target.value : v)))}
                  placeholder="تو"
                  maxLength={18}
                  aria-label="نام تو"
                  className="h-11 text-[13px]"
                />
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-muted/40 px-3 py-2.5 text-[12px]">
                <span className="h-3 w-3 shrink-0 rounded-full bg-amber-500" aria-hidden />
                <Bot size={14} className="shrink-0 text-muted-foreground" />
                <span className="font-bold">ربات</span>
                <span className="mr-auto text-[10px] text-muted-foreground">۶۵٪ احتمال پاسخ درست</span>
              </div>
            </div>
          )}

          <div>
            <p className="mb-2 text-[13px] font-bold">محدودهٔ سؤال‌ها؟</p>
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

          {best !== null && (
            <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
              <Trophy size={12} />
              سریع‌ترین پیروزی ({mode === "bot" ? "مقابل ربات" : "روی یک دستگاه"}): {fmtTime(best)}
            </Badge>
          )}

          <Button size="lg" className="h-12 w-full gap-2 text-base" onClick={start}>
            <Play size={18} />
            شروع بازی ({faNum(pool.length)} سؤال)
          </Button>
        </CardContent>
      </Card>
    );
  }

  // ── Done ──
  if (phase === "done") {
    const wp = winner !== null ? players[winner] : undefined;
    return (
      <Card className="mx-auto max-w-xl rise-in border-amber-500/30">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <PartyPopper size={30} />
          </span>
          <h2 className="text-xl font-black">{wp ? `${wp.name} برنده شد!` : "بازی تمام شد!"} 🎉</h2>
          <p className="text-[12px] leading-5 text-muted-foreground">
            {wp?.isBot
              ? "این‌بار ربات برد — جواب‌هایت را دقیق‌تر بده و انتقام بگیر!"
              : "آفرین! با هر پاسخ درست پله بالا رفتی و از دست مارها فرار کردی."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <Timer size={11} />
              {fmtTime(secs)}
            </Badge>
            {isRecord && (
              <Badge className="gap-1.5 bg-amber-500 text-amber-950 shadow-md shadow-amber-500/30">
                <Trophy size={13} />
                رکورد جدید! سریع‌ترین پیروزی 🏆
              </Badge>
            )}
          </div>

          <div className="w-full space-y-1.5">
            {players.map((pl, i) => (
              <div key={i} className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2 text-[12px]">
                <span className={cn("h-3 w-3 shrink-0 rounded-full", TOKEN_BG[pl.ci])} aria-hidden />
                <span className="font-bold">{pl.name}</span>
                {pl.isBot && <Badge variant="outline" className="px-1 py-0 text-[9px]">ربات</Badge>}
                {winner === i && (
                  <Badge className="gap-1 bg-amber-500 px-1.5 py-0 text-[9px] text-amber-950">
                    <Crown size={10} />
                    برنده
                  </Badge>
                )}
                <span className="mr-auto flex items-center gap-2.5 text-[11px] text-muted-foreground">
                  <span>سؤال: {faNum(stats[i]?.asked ?? 0)}</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    درست: {faNum(stats[i]?.correct ?? 0)}
                  </span>
                  <span className="font-bold text-destructive">غلط: {faNum(stats[i]?.wrong ?? 0)}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={start} className="h-11 gap-2">
              <RotateCcw size={16} />
              بازی جدید
            </Button>
            <Button variant="outline" className="h-11" onClick={() => setPhase("setup")}>
              تنظیمات
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ── Playing ──
  if (!q || players.length === 0) return null;
  const cp = players[cur] ?? players[0];
  const locked = reveal !== null || diceFace !== null || cp.isBot;
  const DiceFace = diceFace !== null ? (DICE_ICONS[diceFace] ?? Dices) : Dices;
  return (
    <div role="group" aria-label="بازی مار و پله واژگانی" className="mx-auto max-w-2xl space-y-3 rise-in">
      {/* نوار بالا */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="gap-1 text-[11px]">
          <Timer size={11} />
          {fmtTime(secs)}
        </Badge>
        <Badge variant="secondary" className="gap-1 text-[11px]">
          <Dices size={11} className="text-amber-500" />
          سؤال {faNum(qNum)}
        </Badge>
        <Badge variant="outline" className="gap-1 border-amber-500/40 text-[11px] text-amber-600 dark:text-amber-400">
          {mode === "bot" ? <Bot size={11} /> : <Users size={11} />}
          {mode === "bot" ? "مقابل ربات" : "روی یک دستگاه"}
        </Badge>
        <div className="mr-auto">
          <Button variant="ghost" size="sm" className="h-11 text-[11px] text-muted-foreground" onClick={requestExit}>
            انصراف
          </Button>
        </div>
      </div>

      {/* وضعیت زندهٔ مهره‌ها */}
      <div className="flex flex-wrap items-center gap-1.5">
        {players.map((pl, i) => (
          <span
            key={i}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold",
              i === cur ? "border-primary/50 bg-muted/50 text-foreground" : "border-border text-muted-foreground",
            )}
          >
            <span className={cn("h-2.5 w-2.5 rounded-full", TOKEN_BG[pl.ci])} aria-hidden />
            {pl.name}
            <span className="text-[10px] font-normal text-muted-foreground">
              {positions[i] === 0 ? "شروع" : `خانهٔ ${faNum(positions[i] ?? 0)}`}
            </span>
          </span>
        ))}
      </div>

      {/* کارت سؤال — گذرگاه انداختن تاس */}
      <div
        className={cn(
          "space-y-3 rounded-2xl border bg-card p-4 sm:p-5",
          reveal && !reveal.ok && "match-shake border-destructive/60",
        )}
      >
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="outline" className="gap-1.5 border-primary/40 text-[11px] font-black">
            <span className={cn("h-2.5 w-2.5 rounded-full", TOKEN_BG[cp.ci])} aria-hidden />
            نوبت: {cp.name}
          </Badge>
          {cp.isBot && (
            <Badge variant="secondary" className="gap-1 text-[10px]">
              <Bot size={11} />
              {reveal ? "انتخاب ربات" : "دارم فکر می‌کنم…"}
            </Badge>
          )}
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

        <p dir="ltr" className="font-en text-[14px] font-bold leading-7 sm:text-[15px] sm:leading-8">
          {q.text}
        </p>

        <div className="grid gap-2 sm:grid-cols-2">
          {q.options.map((opt, i) => {
            const isPicked = reveal?.picked === i;
            const showCorrect = reveal !== null && i === q.answer;
            return (
              <button
                key={`${qNum}-${i}`}
                type="button"
                onClick={() => answerHuman(i)}
                disabled={locked}
                aria-label={`گزینهٔ ${faNum(i + 1)}`}
                className={cn(
                  "flex min-h-11 items-center gap-2 rounded-xl border bg-card px-3 py-2 text-right transition-all",
                  !locked &&
                    "hover:border-primary/50 hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  showCorrect && "border-emerald-500/70 bg-emerald-500/10",
                  isPicked && !reveal?.ok && "border-destructive/60 bg-destructive/10",
                  reveal !== null && !showCorrect && !isPicked && "opacity-50",
                )}
              >
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-[11px] font-black">
                  {faNum(i + 1)}
                </span>
                <span dir="ltr" className="flex-1 font-en text-[13px] font-bold leading-6 sm:text-[14px]">
                  {opt}
                </span>
                {reveal?.byBot === true && isPicked && (
                  <Badge className="shrink-0 bg-amber-500 px-1.5 py-0 text-[9px] text-amber-950">ربات</Badge>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* تاس — فقط بعد از پاسخ درست دیده می‌شود (ارتفاع رزرو شده تا تخته نلرزد) */}
      <div className="flex h-12 items-center justify-center gap-2">
        {diceFace !== null && (
          <>
            <span
              key={dicePop}
              className="match-pop flex h-11 w-11 items-center justify-center rounded-xl border-2 border-primary/30 bg-primary/10 text-primary shadow-md shadow-primary/15"
            >
              <DiceFace size={26} />
            </span>
            <Badge variant="secondary" className="text-[13px] font-black">
              تاس: {faNum(diceFace)}
            </Badge>
          </>
        )}
      </div>

      {/* تختهٔ ۱۰×۱۰ مارپیچی */}
      <Card className="mx-auto w-full max-w-lg">
        <CardContent className="p-2 sm:p-3">
          <div dir="rtl" role="group" aria-label="تختهٔ مار و پله — ۱۰۰ خانه" className="grid grid-cols-10 gap-[3px]">
            {CELL_POS.map((cpos, i) => {
              const n = i + 1;
              const snakeTo = SNAKES[n];
              const ladderTo = LADDERS[n];
              const riders = players.map((pl, pi) => ({ pl, pi })).filter((r) => positions[r.pi] === n);
              const label = [`خانهٔ ${faNum(n)}`];
              if (snakeTo !== undefined) label.push(`مار — برگشت به خانهٔ ${faNum(snakeTo)}`);
              if (ladderTo !== undefined) label.push(`پله — رفتن به خانهٔ ${faNum(ladderTo)}`);
              if (riders.length > 0) label.push(`مهره: ${riders.map((r) => r.pl.name).join("، ")}`);
              return (
                <div
                  key={n}
                  style={{ gridColumnStart: cpos.col, gridRowStart: cpos.row }}
                  aria-label={label.join(" — ")}
                  className={cn(
                    "relative aspect-square rounded-[4px] border border-border/70",
                    n === 1
                      ? "bg-amber-500/15"
                      : n === 100
                        ? "bg-primary/15"
                        : (cpos.row + cpos.col) % 2 === 0
                          ? "bg-muted/40"
                          : "bg-card",
                  )}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-foreground/75 sm:text-[11px]">
                    {faNum(n)}
                  </span>
                  {snakeTo !== undefined && (
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 flex items-center gap-px rounded-br-[4px] bg-destructive/10 px-0.5 text-[7px] font-black leading-[11px] text-destructive sm:text-[8px]"
                    >
                      <TrendingDown size={8} />
                      {faNum(snakeTo)}
                    </span>
                  )}
                  {ladderTo !== undefined && (
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 flex items-center gap-px rounded-br-[4px] bg-primary/10 px-0.5 text-[7px] font-black leading-[11px] text-primary sm:text-[8px]"
                    >
                      <TrendingUp size={8} />
                      {faNum(ladderTo)}
                    </span>
                  )}
                  {riders.length > 0 && (
                    <span className="absolute inset-x-0 bottom-0 flex flex-wrap-reverse items-end justify-center gap-0.5 p-0.5">
                      {riders.map((r) => (
                        <span
                          key={r.pi}
                          className={cn(
                            "h-2 w-2 rounded-full ring-1 ring-background sm:h-2.5 sm:w-2.5",
                            TOKEN_BG[r.pl.ci],
                            r.pi === cur && "h-2.5 w-2.5 sm:h-3 sm:w-3",
                          )}
                        />
                      ))}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <TrendingDown size={11} className="text-destructive" />
              مار: برگشت
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp size={11} className="text-primary" />
              پله: پیشروی
            </span>
            <span className="flex items-center gap-1">
              <Dices size={11} />
              تاس ۶ = نوبت اضافه
            </span>
          </div>
        </CardContent>
      </Card>

      {/* نگهبان خروج (فاز G0-06) — تأیید خروج وسط دورِ نیمه‌کاره؛ Esc/کلیک بیرون = ادامهٔ بازی */}
      <AlertDialog open={exitAsk} onOpenChange={setExitAsk}>
        <AlertDialogContent>
          <AlertDialogHeader className="text-center sm:text-right">
            <AlertDialogTitle>برگردم به آزمایشگاه؟ 🎮</AlertDialogTitle>
            <AlertDialogDescription>
              دور مار و پله هنوز تمام نشده — با خروج، پیشرفت این دور از دست می‌رود.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-start">
            <AlertDialogCancel className="min-h-11">نه، ادامه می‌دهم</AlertDialogCancel>
            <AlertDialogAction
              className="min-h-11 bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80"
              onClick={cancel}
            >
              آره، خروج
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
