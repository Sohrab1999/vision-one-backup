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
  Keyboard,
  Pause,
  Play,
  Sparkles,
  Timer,
  TrendingDown,
  TrendingUp,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { QuizQuestionSeed } from "@/data/types";
import { useBook, useBookData } from "@/lib/book-context";
import { touchStreak } from "@/lib/streak-store";
import { recordStudySession } from "@/lib/goal-store";
// فاز SL0-01 نقشه راه مار و پله — حلقهٔ یادگیری: خطا → کارت مرور، درست → ارتقای کارت (الگوی cloze)
import { recordSRS, seedReviewFromQuiz } from "@/lib/srs-store";
// فاز G5-03 — getter شمارندهٔ برد کامل (`visionone:game-wins`) برای نرخ برد ربات تطبیقی
import { readGameWins } from "@/lib/badge-store";
import {
  bumpPlays,
  faNum,
  fmtTime,
  getPlays,
  loadBest,
  pickUnique,
  saveAttempt,
  saveBest,
  shuffle,
  subscribeGameData,
} from "./shared";
// فاز G2-e-1 — کیت GameKit v2 (قرارداد API سند — همان الگوی پایلوت memory و دوئل G2-d-3)
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
// فاز SL0-02 نقشه راه مار و پله — مدرس بازی (همان الگوی ۸ بازی واژگانی G5-01)
import { useHintCoach } from "./kit/hint-coach";

// ─── ثابت‌ها و نقشهٔ تخته ───

const GAME_KEY = "snakes-ladders";
const ALL_LESSON = -1;
const MIN_POOL = 5;
/** مدت هر پلهٔ حرکت مهره (ms) — هم‌زمان با transition هر گام */
const STEP_MS = 120;
/** مدت سُرش واحد مار/پله (ms) — یک transition طولانی به مقصد */
const JUMP_MS = 520;
/** تأخیر «فکر کردن» ربات (ms) */
const BOT_DELAY = 900;
/** احتمال پاسخ درست ربات (۶۵٪ — پیش‌فرض G5-03 وقتی دادهٔ تطبیقی کافی نیست) */
const BOT_SKILL = 0.65;
/**
 * فاز G5-03 — ربات تطبیقی (قاعده‌محور، بدون AI):
 * نرخ برد کاربر w ∈ [0,1] → مهارت ربات s = clamp(0.35, 0.9, 0.65 + (w − 0.5) × 0.6)
 * بازیکنی که همیشه می‌برد ربات قوی‌تر (تا ۰٫۹) و بازیکنی که همیشه می‌بازد ربات ضعیف‌تر
 * (تا ۰٫۳۵) می‌گیرد — کشش برد/باخت کاربر به ~۵۰٪. دادهٔ <۳ دور → همان BOT_SKILL.
 */
const BOT_SKILL_MIN = 0.35;
const BOT_SKILL_MAX = 0.9;
/** حداقل دورهای دارای داده برای فعال‌شدن تطبیق */
const ADAPTIVE_MIN_ROUNDS = 3;

/**
 * فاز G5-03 — برد/باخت دورهای «مقابل ربات» در همین نشست مرورگر (متغیر ماژول —
 * بدون کلید localStorage جدید؛ با reload صفر می‌شود؛ اسکوپ رکورد vs-bot دست‌نخورده).
 */
const vsBotSession = { wins: 0, losses: 0 };

/** بستن مهارت ربات در بازهٔ مجاز */
function clampBotSkill(s: number): number {
  return Math.min(BOT_SKILL_MAX, Math.max(BOT_SKILL_MIN, s));
}

/**
 * فاز G5-03 — ثبت نتیجهٔ دور «مقابل ربات» در شمارندهٔ نشست مرورگر؛
 * تابع ماژول-اسکوپ (بیرون از کامپوننت) تا تنها نقطهٔ نوشتن شمارنده همین‌جا باشد.
 */
function recordVsBotSessionResult(humanWon: boolean): void {
  if (humanWon) vsBotSession.wins += 1;
  else vsBotSession.losses += 1;
}

/**
 * فاز G5-03 — مهارت ربات تطبیقی مار و پله برای دور تازه (فقط mode="bot").
 * منبع نرخ برد w (بدون ساخت هیچ کلید/امضای جدید):
 *  ۱) برد/باخت دورهای مقابل رباتِ همین نشست مرورگر (vsBotSession) — اگر ≥۳ دور؛
 *  ۲) وگرنه تخمین محافظه‌کارانه از دادهٔ موجود: wins («visionone:game-wins» کلید
 *     "snakes-ladders" — دور کامل بی‌نقص به‌عنوان پروکسی برد) ÷ plays (کل دورهای
 *     این کتاب از شمارندهٔ مشترک — هر دو اسکوپ)؛
 *  ۳) دادهٔ <۳ دور → BOT_SKILL (رفتار قبلی بایت‌به‌بایت).
 */
function computeAdaptiveBotSkill(bookId: string): number {
  const rounds = vsBotSession.wins + vsBotSession.losses;
  if (rounds >= ADAPTIVE_MIN_ROUNDS) {
    return clampBotSkill(BOT_SKILL + (vsBotSession.wins / rounds - 0.5) * 0.6);
  }
  try {
    const wins = readGameWins()[GAME_KEY] ?? 0;
    const plays = getPlays(bookId)[GAME_KEY] ?? 0;
    if (plays >= ADAPTIVE_MIN_ROUNDS) {
      return clampBotSkill(BOT_SKILL + (Math.min(1, wins / plays) - 0.5) * 0.6);
    }
  } catch {
    /* localStorage در دسترس نیست — پیش‌فرض */
  }
  return BOT_SKILL;
}
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

/** سفر یک بازیکن روی تخته — مبنای ستاره‌بندی صفحهٔ نتیجه (پله ‎+۱، مار ‎−۱) */
interface Journey {
  up: number;
  down: number;
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

/** فاز G2-e-1 — آموزش ۳-گامی استاندارد (تاس = پاداش پاسخ درست / مار و پله / توقف امن) */
const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <Dices size={24} />,
    title: "پاسخ درست = تاس",
    text: "برای انداختن تاس اول باید سؤال واژگانی را درست جواب بدهی؛ بعد تاس می‌افتد و مهره‌ات خانه‌به‌خانه جلو می‌رود. تاس ۶ یک نوبت اضافه می‌دهد!",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "پله‌ها بالا می‌برند، مارها پایین",
    text: "روی بعضی خانه‌ها پله هست که تو را چند خانه بالا می‌برد و بعضی خانه‌ها مار دارند که برگشتت می‌دهند. نشانِ گوشهٔ خانه، مقصد را نشان می‌دهد.",
  },
  {
    icon: <Pause size={24} />,
    title: "توقف امن و رکورد",
    text: "هر لحظه بخواهی بازی را متوقف کن — ساعت دور هم می‌ایستد و تاس و حرکت مهره فریز می‌شود. سریع‌ترین پیروزی‌ات رکورد شخصی می‌شود.",
  },
];

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
          afterJump(p, d);
        }, JUMP_MS);
      }, 60);
    } else if (ladderTo !== undefined) {
      // فاز G2-e-1 — پله = صعود: صدای صعودی + لرزش موفقیت
      playSound("correct");
      buzz("success");
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
    const chipCls = (active: boolean) =>
      cn(
        "flex min-h-11 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
          : "text-muted-foreground hover:bg-muted",
      );
    return (
      <>
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
                  <span className="mr-auto text-[10px] text-muted-foreground">ربات تطبیقی — سختی بر اساس نتایج تو تنظیم می‌شود</span>
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
        {/* فاز G2-e-1 — آموزش یک‌بارنمایش در اولین ورود */}
        <TutorialOverlay
          game={GAME_KEY}
          steps={TUTORIAL_STEPS}
          open={tutorialOpen}
          onOpenChange={handleTutorialOpenChange}
        />
      </>
    );
  }

  // ── Done — فاز G2-e-1: صفحهٔ نتیجهٔ استاندارد کیت جایگزین نمای دستی قبلی ──
  if (phase === "done") {
    const wp = winner !== null ? players[winner] : undefined;
    // ستاره‌بندی per-game (سربرگ فایل): «سفر برنده» — هر پله ‎+۱ و هر مار ‎−۱؛
    // امتیاز سفر ≥۳ → ۳ ستاره · ≥۱ → ۲ ستاره · بقیه → ۱ ستاره
    const journeyScore = journey.up - journey.down;
    const stars = journeyScore >= 3 ? 3 : journeyScore >= 1 ? 2 : 1;
    return (
      <div className="mx-auto max-w-xl space-y-3">
        <ResultScreen
          title={wp ? `${wp.name} برد! 🏆` : "بازی تمام شد!"}
          stars={stars}
          isRecord={isRecord}
          stats={[
            {
              label: "نوبت‌ها",
              value: faNum(qNum),
              icon: <Users size={16} className="text-emerald-600 dark:text-emerald-400" />,
            },
            {
              label: "تاس‌ها",
              value: faNum(rolls),
              icon: <Dices size={16} className="text-amber-500" />,
            },
            {
              label: "مدت",
              value: fmtTime(secs),
              icon: <Timer size={16} className="text-teal-500" />,
            },
          ]}
          onReplay={start}
          onExit={() => setPhase("setup")}
          exitLabel="تنظیمات"
        />

        {/* کارنامهٔ بازیکن‌ها — مکمل نتیجهٔ استاندارد: نتیجهٔ تک‌تک بازیکن‌های چندنفره */}
        <Card>
          <CardContent className="space-y-1.5 p-4">
            <p className="mb-2 text-[12px] font-black text-muted-foreground">کارنامهٔ بازیکن‌ها</p>
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
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Playing ──
  if (!q || players.length === 0) return null;
  const cp = players[cur] ?? players[0];
  const locked = reveal !== null || diceFace !== null || cp.isBot || paused;
  const DiceFace = diceFace !== null ? (DICE_ICONS[diceFace] ?? Dices) : Dices;
  return (
    <>
      {/* فاز G2-e-1 — هدر یکنواخت از کیت: زمان/سؤال/نوبت/تاس/حالت + کنترل‌های استاندارد */}
      <GameShell
        title="مار و پله"
        icon={<Dices size={18} />}
        stats={
          <>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <Timer size={11} />
              {fmtTime(secs)}
            </Badge>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <Dices size={11} className="text-amber-500" />
              سؤال {faNum(qNum)}
            </Badge>
            <Badge variant="outline" className="gap-1.5 border-primary/40 text-[11px] font-black">
              <span className={cn("h-2.5 w-2.5 rounded-full", TOKEN_BG[cp.ci])} aria-hidden />
              نوبت: {cp.name}
            </Badge>
            {diceFace !== null && (
              <Badge variant="outline" className="gap-1 border-amber-500/40 text-[11px] font-black text-amber-600 dark:text-amber-400">
                تاس: {faNum(diceFace)}
              </Badge>
            )}
            <Badge variant="outline" className="gap-1 border-amber-500/40 text-[11px] text-amber-600 dark:text-amber-400">
              {mode === "bot" ? <Bot size={11} /> : <Users size={11} />}
              {mode === "bot" ? "مقابل ربات" : "روی یک دستگاه"}
            </Badge>
          </>
        }
        liveMsg={liveMsg}
        progress={
          /* چیپ موقعیت بازیکن‌ها («موقعیت» در قاب شِل — زیر هدر) */
          <div className="flex flex-wrap items-center gap-1.5" aria-label="موقعیت مهره‌ها">
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
        }
        paused={paused}
        onPauseToggle={togglePause}
        muted={muted}
        onMuteToggle={() => setMuted(toggleSoundMuted())}
        onHelp={handleHelp}
        onExit={handleExitClick}
      >
        <div className="relative">
          {/* فاز G2-e-1 — بدنهٔ بازی حین توقف تار/بی‌اثر/aria-hidden + اورلی «بازی متوقف شد» */}
          <div
            aria-hidden={paused}
            className={cn("space-y-3", paused && "pointer-events-none blur-sm select-none")}
          >
            {/* کارت سؤال — گذرگاه انداختن تاس */}
            <div
              className={cn(
                "space-y-3 rounded-2xl border bg-card p-4 sm:p-5",
                reveal && !reveal.ok && "match-shake border-destructive/60",
              )}
            >
              <div className="flex flex-wrap items-center gap-1.5">
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

            {/* تاس — فقط بعد از پاسخ درست دیده می‌شود (ارتفاع رزرو شده تا تخته نلرزد)؛
                عدد تاس به‌صورت بج در هدر شِل هم می‌آید */}
            <div className="flex h-12 items-center justify-center gap-2">
              {diceFace !== null && (
                <span
                  key={dicePop}
                  className="match-pop flex h-11 w-11 items-center justify-center rounded-xl border-2 border-primary/30 bg-primary/10 text-primary shadow-md shadow-primary/15"
                >
                  <DiceFace size={26} />
                </span>
              )}
            </div>

            {/* تختهٔ ۱۰×۱۰ مارپیچی */}
            <Card className="mx-auto w-full max-w-lg">
              <CardContent className="p-2 sm:p-3">
                {/* فاز G2-e-1 — سبک transition مهره‌ها + گارد prefers-reduced-motion */}
                <style>{`
                  .sl-token { transition-property: transform; transition-timing-function: ease; will-change: transform; }
                  @media (prefers-reduced-motion: reduce) {
                    .sl-token { transition: none !important; }
                  }
                `}</style>
                <div className="relative">
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
                        </div>
                      );
                    })}
                  </div>

                  {/* فاز G2-e-1 — لایهٔ مهره‌های متحرک (aria-hidden — خانه‌ها نام مهره‌ها را
                      در aria-label دارند). موقعیت با translate درصدی + transition: transform */}
                  <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
                    {players.map((pl, pi) => {
                      const pos = positions[pi] ?? 0;
                      if (pos === 0) return null; // مهرهٔ منتظر — پیش از اولین حرکت روی تخته نیست
                      const cpos = CELL_POS[pos - 1];
                      // پخش افقی مهره‌های هم‌خانه (±۲۲٪ به‌ازای هر هم‌خانه)
                      const mates = players.map((_, pj) => pj).filter((pj) => (positions[pj] ?? 0) === pos);
                      const k = mates.indexOf(pi);
                      const dx = (k - (mates.length - 1) / 2) * 22;
                      const x = (10 - cpos.col) * 100 + dx;
                      const y = (cpos.row - 1) * 100;
                      return (
                        <span
                          key={pi}
                          className="sl-token absolute left-0 top-0 flex h-[10%] w-[10%] items-center justify-center"
                          style={{ transform: `translate(${x}%, ${y}%)`, transitionDuration: `${slideMs}ms` }}
                        >
                          <span
                            className={cn(
                              "block rounded-full ring-1 ring-background sm:ring-[1.5px]",
                              TOKEN_BG[pl.ci],
                              pi === cur
                                ? "h-3 w-3 shadow-md shadow-foreground/20 sm:h-3.5 sm:w-3.5"
                                : "h-2.5 w-2.5 sm:h-3 sm:w-3",
                            )}
                          />
                        </span>
                      );
                    })}
                  </div>
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
                  <span className="flex items-center gap-1">
                    <Keyboard size={11} />
                    کلید ۱ تا ۴ = پاسخ سریع
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* فاز G2-e-1 — اورلی توقف: ساعت دور ایستاده و زنجیرهٔ تاس/حرکت فریز است */}
          {paused && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-2xl bg-background/80 backdrop-blur-sm">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Pause size={26} />
              </span>
              <p className="text-sm font-black">مار و پله متوقف شد</p>
              <p className="max-w-64 text-center text-[11px] leading-5 text-muted-foreground">
                ساعت دور ایستاده و هیچ حرکتی جلو نمی‌رود — با ادامه دقیقاً از همین‌جا
              </p>
              <Button onClick={resume} className="h-11 gap-2">
                <Play size={16} />
                ادامهٔ بازی
              </Button>
            </div>
          )}
        </div>

        {/* فاز G2-e-1 — نگهبان خروج استاندارد کیت (رفتار G0-06: فقط حین playing) */}
        <GameExitGuard
          open={exitAsk}
          onOpenChange={setExitAsk}
          onConfirm={confirmExit}
          description="دور مار و پله هنوز تمام نشده — با خروج، پیشرفت این دور از دست می‌رود."
        />
        {/* فاز SL0-02 — کارت مدرس بازی (کاملاً مثل ۸ بازی G5-01) */}
        {hint.element}
      </GameShell>
      {/* فاز G2-e-1 — راهنمای دکمهٔ شِل (حین بازی با توقف باز می‌شود) */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
