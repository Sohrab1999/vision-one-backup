"use client";

/**
 * بازی «نقشه ماجراجویی» (Adventure Map) — فاز ۴ نقشه راه ویژن‌وان.
 *
 * مسیری مارپیچ با ۸ گره؛ هر گره یک مینی‌چالش کوتاه از واژگان درس جاری است:
 * (۱) آزمون واژه — ۳ سؤال چهارگزینه‌ای؛ (۲) حروف جابه‌جا — ۱ واژه با tiles لمسی؛
 * (۳) جفت‌سازی — ۲ جفت انگلیسی↔فارسی؛ (۴) شنیداری — ۱ واژه با تلفظ.
 * ترتیب چهار نوع چالش در هر دور تصادفی است و چرخه دو بار تکرار می‌شود.
 * داوری هر مرحله: صفر خطا = ۳ ستاره، یک خطا = ۲ ستاره، بیشتر = ۱ ستاره؛
 * مرحله در هر حالت کامل می‌شود و فقط گرهٔ بعدی آزاد می‌شود.
 * پیشرفت (ستاره‌ها + گره‌های تمام‌شده + ترتیب چالش‌ها) در localStorage ذخیره
 * می‌شود تا با رفرش وسط ماجراجویی از دست نرود.
 *
 * فاز G2-e (مهاجرت کامل به کیت GameKit v2) — فقط پوسته؛ منطق ۸ مرحله/ستاره/جان
 * و امضاهای saveAttempt/saveBest/bumpPlays و کلیدهای localStorage دست‌نخورده:
 * - GameShell روی هر سه نما: نقشه (stats=ستارهٔ جمع/مرحلهٔ فعلی)، مرحلهٔ فعال
 *   (title=«مرحلهٔ N — نوع» + بج‌های خطا/ستاره/پیشرفت مرحله) و مراسم پایان.
 * - نتیجهٔ استاندارد per-مرحله روی ResultScreen کیت — برد/باخت هر دو نتیجه
 *   می‌گیرند (title مناسب)، ستارهٔ همان مرحله از starsOf موجود، stats مرحله؛
 *   دکمهٔ اصلی (onReplay) = «رفتن به مرحلهٔ بعد» و «نقشه» برای خروج (exitLabel).
 *   لیبل دکمهٔ اصلی در کیت ثابت است و طبق قرارداد این تسک کیت ویرایش نمی‌شود.
 *   کانفتی/اعلام رکورد از مسیر موجود saveBest می‌آید (اینجا دوباره شلیک نمی‌شود).
 * - صدا/لرزش: درست=correct+success · غلط=wrong+error · کلیک=click(+light) ·
 *   برد مرحله=win+record · ستارهٔ کامل (۳)=record · باخت مرحله (۱ ستاره)=wrong.
 * - توقف فقط حین مرحلهٔ فعال: useGamePause + اورلی «بازی متوقف شد» + گیت تایمر +
 *   autoPauseOnHidden (بدنه blur+pointer-events-none+aria-hidden).
 * - نگهبان خروج G0-06 («مرحله را رها کنم؟ 🗺️» حین مرحلهٔ فعال) روی GameExitGuard
 *   کیت — همان متن و همان رفتار (Esc/کلیک بیرون = ادامهٔ مرحله).
 * - آموزش ۳گامی (نقشهٔ ۸ مرحله/گیم‌پلی مرحله/ستاره‌ها) — نمایش خودکار فقط در
 *   نمای نقشه (اولین بار)؛ راهنمای شِل حین مرحله = توقف (pausedForHelpRef).
 * - تله‌متری per-مرحله: level="stage:N" — start در شروع مرحله، end("finish") در
 *   برد/باخت مرحله، abandon در نگهبان/unmount؛ دور نقشه کل session جدا نمی‌خواهد.
 */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  CheckCircle2,
  Compass,
  Headphones,
  Link2,
  ListChecks,
  Lock,
  Map,
  PartyPopper,
  Pause,
  Play,
  RotateCcw,
  Shuffle,
  Sparkles,
  Sprout,
  Star,
  Timer,
  Trophy,
  Volume2,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
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
  pickUnique,
  saveAttempt,
  saveBest,
  shuffle,
  subscribeGameData,
} from "./shared";
import { playSound, toggleSoundMuted, isSoundMuted } from "./kit/sound-engine";
import { buzz } from "./kit/haptics";
import { useGamePause } from "./kit/use-pause";
import { GameExitGuard } from "./kit/exit-guard";
import { GameShell } from "./kit/game-shell";
import { ResultScreen } from "./kit/result-screen";
import { TutorialOverlay, useAutoTutorial, type TutorialStep } from "./kit/tutorial-overlay";
import { createGameSession, type GameSessionTracker } from "./kit/telemetry";

type Phase = "setup" | "map" | "challenge" | "done";

/** انواع مینی‌چالش — چرخهٔ ۴تایی که هر دور با ترتیب تصادفی دو بار تکرار می‌شود */
type StageType = 0 | 1 | 2 | 3;

const GAME_KEY = "adventure-map";
const ALL_LESSONS = -1;
const TOTAL_STAGES = 8;
const MAX_STARS = 24;
/** ترتیب پیش‌فرض چرخه — فقط برای ذخیره‌های قدیمی بدون «order» */
const DEFAULT_ORDER: StageType[] = [0, 1, 2, 3, 0, 1, 2, 3];

const STAGE_META: { label: string; icon: LucideIcon }[] = [
  { label: "آزمون واژه", icon: ListChecks },
  { label: "حروف جابه‌جا", icon: Shuffle },
  { label: "جفت‌سازی", icon: Link2 },
  { label: "شنیداری", icon: Headphones },
];

/** فقط واژه‌های تک‌کلمه‌ای لاتینِ ۳ تا ۱۲ حرفی وارد چالش حروف جابه‌جا می‌شوند */
const WORD_RE = /^[A-Za-z]{3,12}$/;

/** آموزش ۳-گامی استاندارد (فاز G2-e) — نقشهٔ ۸ مرحله / گیم‌پلی مرحله / ستاره‌ها */
const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <Map size={24} />,
    title: "هشت گره روی نقشه",
    text: "هر گره یک مینی‌بازی کوتاه است؛ گرهٔ روشن را بزن تا مرحله شروع شود — فقط گرهٔ بعدی آزاد می‌شود.",
  },
  {
    icon: <Sparkles size={24} />,
    title: "چهار نوع چالش",
    text: "آزمون واژه، حروف جابه‌جا، جفت‌سازی و شنیداری — با ترتیب تازه در هر دور؛ خطاها را کم کن.",
  },
  {
    icon: <Star size={24} />,
    title: "ستاره‌ها رکورد می‌شوند",
    text: "صفر خطا = ۳ ستاره، یک خطا = ۲ ستاره، بیشتر = ۱ ستاره — مجموع ستاره‌های ۸ مرحله رکورد توست!",
  },
];

interface QuizQ {
  word: string;
  meaning: string;
  options: string[];
  answer: number;
}

/** حرف با شناسه یکتا — حروف تکراری مستقل مدیریت می‌شوند (ایندکس‌محور) */
interface Tile {
  id: number;
  letter: string;
}

interface MatchCard {
  id: number;
  side: "en" | "fa";
  word: string;
  meaning: string;
}

/** شکل رکورد شخصی — مجموع ستارهٔ دور کامل (از ۲۴) */
interface BestRec {
  score: number;
}

/** پیشرفت ذخیره‌شدهٔ ماجراجویی در localStorage */
interface AdventureProgress {
  stars: number[];
  done: boolean[];
  /** ترتیب چالش‌های این دور — برای سازگاری نقشه بعد از رفرش */
  order?: StageType[] | null;
}

/** وضعیت مینی‌چالش جاری — هر نوع، فیلدهای خودش را پر می‌کند */
interface ChallengeState {
  idx: number;
  type: StageType;
  errors: number;
  questions: QuizQ[];
  qIdx: number;
  picked: number | null;
  word: string;
  meaning: string;
  tiles: Tile[];
  slots: (number | null)[];
  shake: boolean;
  cards: MatchCard[];
  sel: number | null;
  matchedIds: number[];
  wrongIds: number[];
  saidIds: number[];
  resultStars: number | null;
  /** فاز G2-e — زمان همین مرحله (ثانیه) برای stats نتیجهٔ per-مرحله (افزودنی) */
  timeSecs: number;
  /** فاز G2-e — واژه‌های خطاخوردهٔ همین مرحله برای «مرور خطاها»ی ResultScreen (افزودنی) */
  missed: { front: string; back: string }[];
}

/** واژهٔ پایه — حذف نشانه‌های دستوری داخل پرانتز: "dry (adj.)" → "dry" */
function baseWord(w: string): string {
  return w.replace(/\s*\([^)]*\)\s*/g, " ").trim();
}

/** ستارهٔ مرحله بر اساس تعداد خطا */
function starsOf(errors: number): number {
  return errors === 0 ? 3 : errors === 1 ? 2 : 1;
}

function blankChallenge(idx: number, type: StageType): ChallengeState {
  return {
    idx,
    type,
    errors: 0,
    questions: [],
    qIdx: 0,
    picked: null,
    word: "",
    meaning: "",
    tiles: [],
    slots: [],
    shake: false,
    cards: [],
    sel: null,
    matchedIds: [],
    wrongIds: [],
    saidIds: [],
    resultStars: null,
    timeSecs: 0,
    missed: [],
  };
}

/** خواندن پیشرفت از localStorage با اعتبارسنجی کامل شکل داده */
function readProgress(key: string): AdventureProgress | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<AdventureProgress>;
    if (
      !Array.isArray(p.stars) ||
      p.stars.length !== TOTAL_STAGES ||
      !p.stars.every((s) => typeof s === "number")
    ) {
      return null;
    }
    if (
      !Array.isArray(p.done) ||
      p.done.length !== TOTAL_STAGES ||
      !p.done.every((d) => typeof d === "boolean")
    ) {
      return null;
    }
    const order =
      Array.isArray(p.order) &&
      p.order.length === TOTAL_STAGES &&
      p.order.every((n) => typeof n === "number" && n >= 0 && n <= 3)
        ? (p.order as StageType[])
        : null;
    return { stars: p.stars, done: p.done, order };
  } catch {
    return null;
  }
}

function writeProgress(key: string, p: AdventureProgress): void {
  try {
    localStorage.setItem(key, JSON.stringify(p));
  } catch {
    /* noop */
  }
  notifyGameData();
}

/** ترتیب چالش‌های این دور — با بازگشت به چرخهٔ پیش‌فرض برای ذخیره‌های قدیمی */
function orderOf(p: AdventureProgress): StageType[] {
  return p.order && p.order.length === TOTAL_STAGES ? p.order : DEFAULT_ORDER;
}

export function AdventureMapGame() {
  const data = useBookData();
  const { bookId } = useBook();
  // بازی‌ها فقط داخل کتاب فعال رندر می‌شوند (useBookData بالا گارد است) — bookId عملاً هرگز null نیست
  const activeBookId: string = bookId ?? "";
  const { speed } = useVoiceSpeed();

  const [phase, setPhase] = useState<Phase>("setup");
  const [lesson, setLesson] = useState<number>(ALL_LESSONS);
  const [challenge, setChallenge] = useState<ChallengeState | null>(null);
  const [isRecord, setIsRecord] = useState(false);
  /** نگهبان خروج (G0-06 → کیت G1-04) — دیالوگ تأیید حین مرحلهٔ فعال */
  const [exitAsk, setExitAsk] = useState(false);
  /** فاز G2-e — پیام باکس aria-live: اعلام نتیجهٔ پاسخ‌ها/توقف/پایان مرحله */
  const [liveMsg, setLiveMsg] = useState("");
  /** فاز G2-e — کلید بی‌صدای کیت (الگوی دارباز: شنوندهٔ storage بین-تب) */
  const [muted, setMuted] = useState(isSoundMuted());

  const secsRef = useRef(0);
  /** فاز G2-e — زمان مرحلهٔ جاری (برای stats نتیجهٔ per-مرحله) */
  const stageSecsRef = useRef(0);
  /** واژه‌های مصرف‌شدهٔ این دور — تا مراحل مختلف واژهٔ تکراری نگیرند */
  const usedWords = useRef<Set<string>>(new Set());
  const timersRef = useRef<Set<number>>(new Set());

  // فاز G2-e — توقف/ادامهٔ استاندارد کیت (توقف فقط حین مرحلهٔ فعال معنا دارد؛
  // autoPauseOnHidden شمارش را در تب مخفی هم می‌ایستاند — بازگشت با اورلی/ادامه است)
  const { paused, resume, pause: pauseGame, toggle: togglePause } = useGamePause((p) => {
    if (p) stopSpeaking();
    setLiveMsg(p ? "بازی متوقف شد ⏸" : "ادامهٔ بازی ▶");
  });

  // فاز G2-e — آموزش ۳گامی: نمایش خودکار فقط در نمای نقشه (اولین بار) + راهنمای شِل
  const {
    open: tutorialOpen,
    openHelp: openTutorial,
    close: closeTutorial,
  } = useAutoTutorial(GAME_KEY, phase === "map");
  const pausedForHelpRef = useRef(false);
  const handleHelp = useCallback(() => {
    // راهنما حین مرحلهٔ فعال = توقف هنگام بازشدن، ادامه هنگام بستن
    if (phase === "challenge") {
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

  // فاز G2-e — تله‌متری per-مرحله (بدون PII: بازی/level=stage:N/مدت رُند/دلیل)
  const sessionRef = useRef<GameSessionTracker | null>(null);

  const progressKey = `visionone:adventure:${activeBookId}:${lesson === ALL_LESSONS ? "all" : lesson}`;
  const bestScope = lesson === ALL_LESSONS ? "all" : String(lesson);

  // پیشرفت ذخیره‌شده — اسنپ‌شات رشته‌ای (پایدار برای useSyncExternalStore؛ الگوی memory-game)
  const progressRaw = useSyncExternalStore(
    subscribeGameData,
    () => {
      const p = readProgress(progressKey);
      return p ? JSON.stringify(p) : null;
    },
    () => null,
  );
  const progress = useMemo<AdventureProgress | null>(() => {
    if (!progressRaw) return null;
    try {
      return JSON.parse(progressRaw) as AdventureProgress;
    } catch {
      return null;
    }
  }, [progressRaw]);

  // رکورد «بیشترین ستاره» این اسکوپ
  const bestRaw = useSyncExternalStore(
    subscribeGameData,
    () => {
      const b = loadBest<BestRec>(activeBookId, GAME_KEY, bestScope);
      return b ? JSON.stringify(b) : null;
    },
    () => null,
  );
  const best = useMemo<BestRec | null>(
    () => (bestRaw ? (JSON.parse(bestRaw) as BestRec) : null),
    [bestRaw],
  );

  const doneCount = progress ? progress.done.filter(Boolean).length : 0;
  const totalStars = progress ? progress.stars.reduce((a, b) => a + b, 0) : 0;
  const allDone = progress ? progress.done.every(Boolean) : false;

  // همگام‌سازی بی‌صدا بین تب‌ها (الگوی دارباز — شنونده، نه setState در effect)
  useEffect(() => {
    const sync = () => setMuted(isSoundMuted());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  // تایمر کل ماجراجویی + زمان مرحله — فقط ref (بدون setState → بدون رندر هر ثانیه)
  // فاز G2-e — گیت توقف (paused) + گارد visibility/pageshow (الگوی پایلوت memory):
  // در تب مخفی شمارش می‌ایستد و در بازگشت از همان‌جا ادامه می‌یابد
  useEffect(() => {
    if ((phase !== "map" && phase !== "challenge") || paused) return;
    let t: number | null = null;
    const startTimer = () => {
      if (t !== null) return;
      t = window.setInterval(() => {
        secsRef.current += 1;
        stageSecsRef.current += 1;
      }, 1000);
    };
    const stopTimer = () => {
      if (t !== null) {
        window.clearInterval(t);
        t = null;
      }
    };
    const onVis = () => {
      if (document.visibilityState === "hidden") stopTimer();
      else startTimer();
    };
    const onPageshow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      stopTimer(); // تیک معوقِ دورهٔ انجماد bfcache یک‌جا شمرده نشود
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
  }, [phase, paused]);

  // فاز G2-e — پاک‌سازی نهایی: تلفظ + همهٔ تایمرهای معلق + جلسهٔ تله‌متری باز مرحله
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      stopSpeaking();
      sessionRef.current?.abandon("unmount");
    };
  }, []);

  /** setTimeout با ثبت در ref — همیشه در unmount پاک می‌شود */
  const later = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      timersRef.current.delete(id);
      fn();
    }, ms);
    timersRef.current.add(id);
  }, []);

  // ── شروع/ادامه/ریست ماجراجویی ──

  const beginAdventure = useCallback(
    (mode: "fresh" | "continue") => {
      if (mode === "fresh") {
        const pool = lesson === ALL_LESSONS ? data.vocab.all : data.vocab.ofLesson(lesson);
        if (new Set(pool.map((w) => w.meaning)).size < 4) {
          toast.error("واژهٔ کافی برای ماجراجویی در این بخش نیست — درس دیگری را انتخاب کن");
          return;
        }
        const cyc = shuffle<StageType>([0, 1, 2, 3]);
        writeProgress(progressKey, {
          stars: Array<number>(TOTAL_STAGES).fill(0),
          done: Array<boolean>(TOTAL_STAGES).fill(false),
          order: [...cyc, ...cyc],
        });
        usedWords.current.clear();
        secsRef.current = 0;
        setIsRecord(false);
      }
      stopSpeaking();
      setLiveMsg("");
      setChallenge(null);
      setPhase("map");
    },
    [data.vocab, lesson, progressKey],
  );

  // ── فاز G2-e — ورود به یک مرحله: جلسهٔ تله‌متری تازه + ریست زمان مرحله ──
  const beginChallenge = useCallback(
    (state: ChallengeState) => {
      sessionRef.current = createGameSession({
        game: GAME_KEY,
        level: `stage:${state.idx + 1}`,
      });
      sessionRef.current.start();
      stageSecsRef.current = 0;
      setExitAsk(false);
      resume(); // هر مرحله همیشه از حالت «ادامه» شروع می‌شود
      setChallenge(state);
      setPhase("challenge");
    },
    [resume],
  );

  // ── ساخت و شروع یک مرحله ──

  const startStage = useCallback(
    (idx: number) => {
      if (!progress) return;
      // فاز G2-e — کلیک گرهٔ نقشه: بازخورد کلیک + لرزش سبک (حتی اگر اعتبارسنجی خطا بدهد)
      playSound("click");
      buzz("light");
      const pool = lesson === ALL_LESSONS ? data.vocab.all : data.vocab.ofLesson(lesson);
      const distinctMeanings = new Set(pool.map((w) => w.meaning));
      const type = orderOf(progress)[idx];
      const used = usedWords.current;
      // واژه‌های مصرف‌نشدهٔ این دور در اولویت‌اند؛ اگر تمام شد از کل استخر
      const fresh = pool.filter((w) => !used.has(baseWord(w.word)));
      const src = fresh.length > 0 ? fresh : pool;
      const draw = (n: number) => {
        const got = pickUnique(src, n, (w) => w.meaning);
        return got.length >= n ? got : pickUnique(pool, n, (w) => w.meaning);
      };

      if (type === 0) {
        // آزمون واژه — ۳ سؤال چهارگزینه‌ای معنی
        if (distinctMeanings.size < 4) {
          toast.error("برای «آزمون واژه» حداقل ۴ معنی متمایز لازم است — درس دیگری را انتخاب کن");
          return;
        }
        const picks = draw(3);
        if (picks.length < 3) {
          toast.error("برای «آزمون واژه» حداقل ۴ معنی متمایز لازم است — درس دیگری را انتخاب کن");
          return;
        }
        const questions: QuizQ[] = picks.map((w) => {
          const distractors = pickUnique(
            pool.filter((d) => d.meaning !== w.meaning),
            3,
            (d) => d.meaning,
          ).map((d) => d.meaning);
          const options = shuffle([w.meaning, ...distractors]);
          return { word: baseWord(w.word), meaning: w.meaning, options, answer: options.indexOf(w.meaning) };
        });
        picks.forEach((w) => used.add(baseWord(w.word)));
        beginChallenge({ ...blankChallenge(idx, type), questions });
        return;
      }

      if (type === 1) {
        // حروف جابه‌جا — ۱ واژه با tiles لمسی
        const latin = src.filter((w) => WORD_RE.test(baseWord(w.word)));
        const source = latin.length > 0 ? latin : pool.filter((w) => WORD_RE.test(baseWord(w.word)));
        const pick = pickUnique(source, 1, (w) => baseWord(w.word))[0];
        if (!pick) {
          toast.error("واژهٔ انگلیسی مناسبی برای «حروف جابه‌جا» پیدا نشد");
          return;
        }
        const base = baseWord(pick.word);
        used.add(base);
        const tiles = shuffle(base.split("").map((letter, i) => ({ id: i, letter })));
        // جلوگیری از چیدمان اولیهٔ تصادفیِ درست
        if (base.length > 1 && tiles.map((t) => t.letter).join("") === base) {
          const first = tiles[0];
          tiles[0] = tiles[1];
          tiles[1] = first;
        }
        beginChallenge({
          ...blankChallenge(idx, type),
          word: base,
          meaning: pick.meaning,
          tiles,
          slots: Array.from({ length: base.length }, () => null as number | null),
        });
        return;
      }

      if (type === 2) {
        // جفت‌سازی — ۲ جفت انگلیسی↔فارسی
        if (distinctMeanings.size < 2) {
          toast.error("برای «جفت‌سازی» حداقل ۲ واژهٔ متمایز لازم است");
          return;
        }
        const picks = draw(2);
        if (picks.length < 2) {
          toast.error("برای «جفت‌سازی» حداقل ۲ واژهٔ متمایز لازم است");
          return;
        }
        const built: MatchCard[] = [];
        picks.forEach((w) => {
          built.push({ id: built.length, side: "en", word: baseWord(w.word), meaning: w.meaning });
          built.push({ id: built.length, side: "fa", word: baseWord(w.word), meaning: w.meaning });
          used.add(baseWord(w.word));
        });
        beginChallenge({ ...blankChallenge(idx, type), cards: shuffle(built) });
        return;
      }

      // شنیداری — ۱ واژه با تلفظ و ۴ گزینهٔ معنی
      if (distinctMeanings.size < 4) {
        toast.error("برای «شنیداری» حداقل ۴ معنی متمایز لازم است — درس دیگری را انتخاب کن");
        return;
      }
      const pick = draw(1)[0];
      if (!pick) {
        toast.error("برای «شنیداری» حداقل ۴ معنی متمایز لازم است — درس دیگری را انتخاب کن");
        return;
      }
      const distractors = pickUnique(
        pool.filter((d) => d.meaning !== pick.meaning),
        3,
        (d) => d.meaning,
      ).map((d) => d.meaning);
      const options = shuffle([pick.meaning, ...distractors]);
      used.add(baseWord(pick.word));
      const word = baseWord(pick.word);
      beginChallenge({
        ...blankChallenge(idx, type),
        word,
        meaning: pick.meaning,
        questions: [{ word, meaning: pick.meaning, options, answer: options.indexOf(pick.meaning) }],
      });
      speak(word, { speed });
    },
    [progress, data.vocab, lesson, speed, beginChallenge],
  );

  // ── پایان مرحله — ستاره‌گذاری + ذخیرهٔ پیشرفت (+ مراسم پایان دور کامل) ──

  const completeStage = useCallback(
    (finalErrors: number) => {
      if (!challenge || !progress) return;
      const stars = starsOf(finalErrors);
      const idx = challenge.idx;
      // فاز G2-e — پایان جلسهٔ تله‌متری این مرحله (برد/باخت هر دو finish)
      sessionRef.current?.end("finish");
      // فاز G2-e — بازخورد صوتی/لرزشی پایان مرحله:
      // ۳ ستاره = record · ۲ ستاره (برد با یک خطا) = win + record · ۱ ستاره (باخت) = wrong
      if (stars === 3) {
        playSound("record");
        buzz("record");
      } else if (stars === 2) {
        playSound("win");
        buzz("record");
      } else {
        playSound("wrong");
      }
      setLiveMsg(`مرحلهٔ ${faNum(idx + 1)} تمام شد — ${faNum(stars)} ستاره از ${faNum(3)}`);
      const nextStars = progress.stars.slice();
      nextStars[idx] = stars;
      const nextDone = progress.done.slice();
      nextDone[idx] = true;
      writeProgress(progressKey, {
        stars: nextStars,
        done: nextDone,
        order: progress.order ?? null,
      });
      setChallenge((c) =>
        c ? { ...c, errors: finalErrors, resultStars: stars, timeSecs: stageSecsRef.current } : c,
      );

      if (idx >= TOTAL_STAGES - 1) {
        // پایان دور کامل — ثبت استریک/جلسه/Attempt/رکورد و مراسم پایان
        touchStreak();
        recordStudySession();
        bumpPlays(activeBookId, GAME_KEY);
        const perfect = nextStars.filter((s) => s === 3).length;
        const total = nextStars.reduce((a, b) => a + b, 0);
        saveAttempt(activeBookId, GAME_KEY, {
          lesson: lesson === ALL_LESSONS ? 0 : lesson,
          total: TOTAL_STAGES,
          correct: perfect,
          duration: secsRef.current,
          detail: { stars: nextStars },
        });
        const prev = loadBest<BestRec>(activeBookId, GAME_KEY, bestScope);
        if (!prev || total > prev.score) {
          saveBest(activeBookId, GAME_KEY, bestScope, { score: total });
          setIsRecord(true);
          toast.success(`رکورد جدید! ${faNum(total)} ستاره از ${faNum(MAX_STARS)} 🏆`);
        }
      }
    },
    [challenge, progress, progressKey, activeBookId, lesson, bestScope],
  );

  const backToMap = useCallback(() => {
    stopSpeaking();
    setChallenge(null);
    setPhase("map");
  }, []);

  // فاز G2-e — تأیید نگهبان خروج: رهاکردن مرحلهٔ نیمه‌کاره (تله‌متری + تلفظ + توقف)
  const confirmExitToMap = useCallback(() => {
    setExitAsk(false);
    sessionRef.current?.abandon("exit");
    stopSpeaking();
    setLiveMsg("به نقشه برگشتی — مرحلهٔ نیمه‌کاره رها شد");
    resume();
    backToMap();
  }, [backToMap, resume]);

  // ── پاسخ‌دهی مینی‌چالش‌ها ──

  /** آزمون واژه — هر سؤال یک بار پاسخ داده می‌شود؛ غلط = خطا + صفحهٔ مرور */
  const answerQuiz = useCallback(
    (choice: number) => {
      if (!challenge || challenge.type !== 0 || challenge.picked !== null || paused) return;
      const q = challenge.questions[challenge.qIdx];
      if (!q) return;
      const ok = choice === q.answer;
      if (ok) {
        recordSRS(q.word, true);
        speak(q.word, { speed });
        // فاز G2-e — بازخورد سه‌کانالهٔ پاسخ درست (صدا + لرزش + اعلام زنده)
        playSound("correct");
        buzz("success");
        setLiveMsg(`«${q.word}» — درست بود! 🎉`);
      } else {
        recordSRS(q.word, false);
        playSound("wrong");
        buzz("error");
        setLiveMsg(`غلط بود — پاسخ درست: ${q.meaning}`);
      }
      const errors = challenge.errors + (ok ? 0 : 1);
      const isLast = challenge.qIdx >= challenge.questions.length - 1;
      setChallenge((c) =>
        c
          ? {
              ...c,
              picked: choice,
              errors,
              missed:
                ok || c.missed.some((m) => m.front === q.word)
                  ? c.missed
                  : [...c.missed, { front: q.word, back: q.meaning }],
            }
          : c,
      );
      later(
        () => {
          if (isLast) {
            completeStage(errors);
          } else {
            setChallenge((c) => (c ? { ...c, qIdx: c.qIdx + 1, picked: null } : c));
          }
        },
        ok ? 900 : 1500,
      );
    },
    [challenge, speed, later, completeStage, paused],
  );

  /** شنیداری — انتخاب تا رسیدن به پاسخ درست ادامه دارد؛ هر غلط یک خطا */
  const answerListen = useCallback(
    (choice: number) => {
      if (!challenge || challenge.type !== 3 || challenge.picked !== null || paused) return;
      const q = challenge.questions[0];
      if (!q || challenge.saidIds.includes(choice)) return;
      if (choice === q.answer) {
        recordSRS(challenge.word, true);
        speak(challenge.word, { speed });
        playSound("correct");
        buzz("success");
        setLiveMsg(`«${challenge.word}» — درست بود! 🎉`);
        setChallenge((c) => (c ? { ...c, picked: choice } : c));
        later(() => completeStage(challenge.errors), 900);
      } else {
        recordSRS(challenge.word, false);
        playSound("wrong");
        buzz("error");
        setLiveMsg("گزینه غلط — دوباره گوش کن و انتخاب کن");
        setChallenge((c) =>
          c
            ? {
                ...c,
                saidIds: [...c.saidIds, choice],
                errors: c.errors + 1,
                missed: c.missed.some((m) => m.front === c.word)
                  ? c.missed
                  : [...c.missed, { front: c.word, back: c.meaning }],
              }
            : c,
        );
      }
    },
    [challenge, speed, later, completeStage, paused],
  );

  /** حروف جابه‌جا — گذاشتن حرف در اولین خانهٔ خالی + سنجش وقتی همه پر شد */
  const placeTile = useCallback(
    (tileId: number) => {
      if (
        !challenge ||
        challenge.type !== 1 ||
        challenge.shake ||
        challenge.resultStars !== null ||
        paused
      ) {
        return;
      }
      const empty = challenge.slots.indexOf(null);
      if (empty === -1) return;
      const tile = challenge.tiles.find((t) => t.id === tileId);
      if (!tile) return;
      // فاز G2-e — کلیک خنثای گذاشتن حرف
      playSound("click");
      buzz("light");
      const nextSlots = challenge.slots.slice();
      nextSlots[empty] = tileId;
      if (nextSlots.every((s) => s !== null)) {
        const attempt = nextSlots
          .map((s) => challenge.tiles.find((t) => t.id === s)?.letter ?? "")
          .join("");
        if (attempt === challenge.word) {
          recordSRS(challenge.word, true);
          speak(challenge.word, { speed });
          setChallenge((c) => (c ? { ...c, slots: nextSlots } : c));
          later(() => completeStage(challenge.errors), 850);
        } else {
          recordSRS(challenge.word, false);
          playSound("wrong");
          buzz("error");
          setLiveMsg("ترتیب غلط بود — خانه‌ها خالی شدند، دوباره تلاش کن");
          setChallenge((c) =>
            c
              ? {
                  ...c,
                  slots: nextSlots,
                  shake: true,
                  errors: c.errors + 1,
                  missed: c.missed.some((m) => m.front === c.word)
                    ? c.missed
                    : [...c.missed, { front: c.word, back: c.meaning }],
                }
              : c,
          );
          later(
            () =>
              setChallenge((c) =>
                c
                  ? { ...c, slots: Array<number | null>(c.word.length).fill(null), shake: false }
                  : c,
              ),
            750,
          );
        }
      } else {
        setChallenge((c) => (c ? { ...c, slots: nextSlots } : c));
      }
    },
    [challenge, speed, later, completeStage, paused],
  );

  /** پس گرفتن حرف از یک خانهٔ پر (کلیک روی خانه) */
  const pullTile = useCallback(
    (slotIdx: number) => {
      if (!challenge || challenge.type !== 1 || challenge.shake || paused) return;
      playSound("click");
      buzz("light");
      setChallenge((c) =>
        c && c.slots[slotIdx] !== null
          ? { ...c, slots: c.slots.map((s, i) => (i === slotIdx ? null : s)) }
          : c,
      );
    },
    [challenge, paused],
  );

  /** جفت‌سازی — دو کارت پشت‌سرهم؛ جفت درست می‌ماند، غلط لرزش می‌گیرد */
  const tapCard = useCallback(
    (card: MatchCard) => {
      if (!challenge || challenge.type !== 2 || challenge.resultStars !== null || paused) return;
      if (challenge.matchedIds.includes(card.id) || challenge.wrongIds.length > 0) return;
      if (challenge.sel === null) {
        playSound("click");
        buzz("light");
        setChallenge((c) => (c ? { ...c, sel: card.id } : c));
        return;
      }
      if (challenge.sel === card.id) {
        setChallenge((c) => (c ? { ...c, sel: null } : c));
        return;
      }
      const first = challenge.cards.find((c) => c.id === challenge.sel);
      if (!first) {
        setChallenge((c) => (c ? { ...c, sel: card.id } : c));
        return;
      }
      if (first.side !== card.side && first.word === card.word) {
        recordSRS(first.word, true);
        speak(first.word, { speed });
        playSound("correct");
        buzz("success");
        setLiveMsg(`«${first.word}» جفت شد — درست بود! 🎉`);
        const nextMatched = [...challenge.matchedIds, first.id, card.id];
        setChallenge((c) => (c ? { ...c, matchedIds: nextMatched, sel: null } : c));
        if (nextMatched.length >= challenge.cards.length) {
          later(() => completeStage(challenge.errors), 750);
        }
      } else {
        const wrongWord = first.side === "en" ? first.word : card.word;
        const wrongBack = first.side === "en" ? first.meaning : card.meaning;
        recordSRS(wrongWord, false);
        playSound("wrong");
        buzz("error");
        setLiveMsg("جفت غلط — کارت‌ها برمی‌گردند");
        setChallenge((c) =>
          c
            ? {
                ...c,
                wrongIds: [first.id, card.id],
                sel: null,
                errors: c.errors + 1,
                missed: c.missed.some((m) => m.front === wrongWord)
                  ? c.missed
                  : [...c.missed, { front: wrongWord, back: wrongBack }],
              }
            : c,
        );
        later(() => setChallenge((c) => (c ? { ...c, wrongIds: [] } : c)), 800);
      }
    },
    [challenge, speed, later, completeStage, paused],
  );

  // ── Setup ──
  if (phase === "setup") {
    return (
      <Card className="mx-auto max-w-lg rise-in">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Map size={22} />
            </span>
            <div>
              <h2 className="text-lg font-black">نقشه ماجراجویی</h2>
              <p className="text-xs text-muted-foreground">
                هشت مرحله روی یک نقشهٔ مارپیچ — گره‌به‌گره جلو برو!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/10 p-3 text-[11px] leading-5 text-muted-foreground">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
            <p>
              هر گره یک مینی‌بازی کوتاه است: آزمون واژه، حروف جابه‌جا، جفت‌سازی یا شنیداری —
              با ترتیب تازه در هر دور. صفر خطا = ۳ ستاره، یک خطا = ۲ ستاره، بیشتر = ۱ ستاره.
              پیشرفتت ذخیره می‌شود تا با بستن صفحه از دست نرود.
            </p>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">کدام درس؟</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب درس">
              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  buzz("light");
                  setLesson(ALL_LESSONS);
                }}
                aria-pressed={lesson === ALL_LESSONS}
                className={cn(
                  "min-h-11 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
                  lesson === ALL_LESSONS
                    ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                کل کتاب ({faNum(data.vocab.all.length)} واژه)
              </button>
              {data.vocab.lessons.filter((l) => l.lesson > 0).map((l) => (
                <button
                  key={l.lesson}
                  type="button"
                  onClick={() => {
                    playSound("click");
                    buzz("light");
                    setLesson(l.lesson);
                  }}
                  aria-pressed={lesson === l.lesson}
                  className={cn(
                    "min-h-11 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
                    lesson === l.lesson
                      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {best && (
            <Badge
              variant="outline"
              className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400"
            >
              <Trophy size={12} />
              بیشترین ستاره: {faNum(best.score)} از {faNum(MAX_STARS)}
            </Badge>
          )}

          {progress && (
            <div className="space-y-2 rounded-xl border bg-muted/40 p-3">
              <div className="flex items-center justify-between text-[12px] font-bold">
                <span>پیشرفت ذخیره‌شده</span>
                <span className="text-muted-foreground">
                  {faNum(doneCount)} از {faNum(TOTAL_STAGES)} مرحله — {faNum(totalStars)} ستاره
                </span>
              </div>
              <div className="flex gap-1.5">
                {progress.stars.map((s, i) => (
                  <div
                    key={`prog-${i}`}
                    className={cn(
                      "flex h-8 flex-1 items-center justify-center gap-0.5 rounded-lg border text-[11px] font-black",
                      progress.done[i]
                        ? "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : "border-dashed border-muted-foreground/30 text-muted-foreground/50",
                    )}
                  >
                    {progress.done[i] ? (
                      <>
                        <Star size={10} className="fill-amber-500 text-amber-500" />
                        {faNum(s)}
                      </>
                    ) : (
                      <Lock size={10} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {progress && !allDone && (
            <Button
              size="lg"
              className="h-12 w-full gap-2 text-base"
              onClick={() => {
                playSound("click");
                beginAdventure("continue");
              }}
            >
              <Play size={18} />
              ادامه ماجراجویی
            </Button>
          )}
          {progress && (
            <Button
              size="lg"
              variant={allDone ? "default" : "outline"}
              className="h-12 w-full gap-2 text-base"
              onClick={() => {
                playSound("click");
                beginAdventure("fresh");
              }}
            >
              <RotateCcw size={17} />
              از اول
            </Button>
          )}
          {progress && allDone && (
            <Button
              variant="outline"
              className="h-12 w-full gap-2 text-base"
              onClick={() => {
                playSound("click");
                setPhase("map");
              }}
            >
              <Map size={17} />
              نمایش نقشه
            </Button>
          )}
          {!progress && (
            <Button
              size="lg"
              className="h-12 w-full gap-2 text-base"
              onClick={() => {
                playSound("click");
                beginAdventure("fresh");
              }}
            >
              <Play size={18} />
              شروع ماجراجویی
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  // گارد دفاعی — نقشه/چالش بدون پیشرفت ذخیره‌شده نباید رخ دهد
  if (!progress && (phase === "map" || phase === "challenge")) {
    return (
      <Card className="mx-auto max-w-lg rise-in">
        <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
          <Map size={26} className="text-muted-foreground" />
          <p className="text-[13px] font-bold text-muted-foreground">ماجراجویی فعالی پیدا نشد</p>
          <Button className="h-11" onClick={() => setPhase("setup")}>
            بازگشت به راه‌اندازی
          </Button>
        </CardContent>
      </Card>
    );
  }
  if (phase === "challenge" && !challenge) {
    return (
      <Card className="mx-auto max-w-lg rise-in">
        <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
          <Map size={26} className="text-muted-foreground" />
          <p className="text-[13px] font-bold text-muted-foreground">مرحله‌ای در جریان نیست</p>
          <Button className="h-11" onClick={() => setPhase("map")}>
            بازگشت به نقشه
          </Button>
        </CardContent>
      </Card>
    );
  }

  // ── نقشه — ستون مارپیچ ۸ گره با آفست افقی متناوب + خط‌چین میانی ──
  if (phase === "map" && progress) {
    const order = orderOf(progress);
    const openIdx = progress.done.findIndex((d) => !d);
    const mapLive = allDone
      ? "ماجراجویی کامل شد — همهٔ گره‌ها روشن است 🎉"
      : openIdx >= 0
        ? `مرحلهٔ ${faNum(openIdx + 1)} باز است — گرهٔ روشن نقشه را بزن`
        : "";
    return (
      <>
        {/* فاز G2-e — هدر یکنواخت کیت روی نمای نقشه هم (stats=ستارهٔ جمع/مرحلهٔ فعلی) */}
        <GameShell
          title="نقشهٔ ماجراجویی"
          icon={<Map size={18} />}
          stats={
            <>
              <Badge variant="secondary" className="gap-1.5 text-[11px]">
                <Star size={11} className="fill-amber-400 text-amber-500" />
                {faNum(totalStars)} ستاره
              </Badge>
              <Badge variant="secondary" className="gap-1.5 text-[11px]">
                <CheckCircle2 size={11} className="text-primary" />
                {allDone ? "کامل شد 🎉" : `مرحلهٔ فعلی: ${faNum(openIdx + 1)}`}
              </Badge>
            </>
          }
          liveMsg={mapLive}
          progress={
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-l from-primary to-emerald-400 transition-all duration-500"
                style={{ width: `${(doneCount / TOTAL_STAGES) * 100}%` }}
              />
            </div>
          }
          muted={muted}
          onMuteToggle={() => setMuted(toggleSoundMuted())}
          onHelp={handleHelp}
          onExit={() => {
            stopSpeaking();
            setPhase("setup");
          }}
          exitLabel="تنظیمات"
        >
          <div
            role="group"
            aria-label="گره‌های ماجراجویی"
            className="relative rounded-2xl border bg-card/60 p-4"
          >
            <div
              aria-hidden
              className="absolute inset-y-6 left-1/2 -translate-x-1/2 border-r-2 border-dashed border-primary/25"
            />
            <div className="relative space-y-6">
              {progress.done.map((isDone, i) => {
                const meta = STAGE_META[order[i]];
                const TypeIcon = meta.icon;
                const isOpen = i === openIdx;
                const stars = progress.stars[i] ?? 0;
                return (
                  <div
                    key={`node-${i}`}
                    className={cn(
                      "flex w-1/2 flex-col items-center gap-1.5",
                      i % 2 === 1 && "ms-auto",
                    )}
                  >
                    {isOpen ? (
                      <button
                        type="button"
                        onClick={() => startStage(i)}
                        aria-label={`مرحلهٔ ${faNum(i + 1)} — ${meta.label} — شروع`}
                        className="group flex flex-col items-center gap-1.5"
                      >
                        <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform group-hover:scale-105 group-active:scale-95">
                          <TypeIcon size={24} />
                        </span>
                      </button>
                    ) : (
                      <span
                        className={cn(
                          "flex h-16 w-16 items-center justify-center rounded-full border-2",
                          isDone
                            ? "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "border-border bg-muted text-muted-foreground/60",
                        )}
                      >
                        <TypeIcon size={22} />
                      </span>
                    )}
                    <span
                      className={cn(
                        "text-[11px] font-black",
                        isDone
                          ? "text-amber-600 dark:text-amber-400"
                          : isOpen
                            ? "text-primary"
                            : "text-muted-foreground",
                      )}
                    >
                      مرحلهٔ {faNum(i + 1)}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{meta.label}</span>
                    {isDone ? (
                      <span className="flex gap-0.5" aria-label={`${faNum(stars)} ستاره از ۳`}>
                        {[0, 1, 2].map((s) => (
                          <Star
                            key={`st-${i}-${s}`}
                            size={11}
                            className={s < stars ? "fill-amber-400 text-amber-500" : "text-muted-foreground/25"}
                          />
                        ))}
                      </span>
                    ) : isOpen ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-primary">
                        <Sparkles size={11} />
                        شروع
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground/70">
                        <Lock size={10} />
                        قفل
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {allDone ? (
            <div className="flex flex-col items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-center">
              <p className="text-[13px] font-black text-amber-600 dark:text-amber-400">
                همهٔ گره‌ها روشن شد — ماجراجویی کامل شد! 🎉
              </p>
              <Button
                size="sm"
                className="h-11 gap-2"
                onClick={() => {
                  playSound("click");
                  setPhase("done");
                }}
              >
                <PartyPopper size={15} />
                مراسم پایان
              </Button>
            </div>
          ) : (
            <p className="text-center text-[11px] text-muted-foreground">
              گرهٔ روشنِ نقشه را بزن تا مرحلهٔ بعدی شروع شود
            </p>
          )}
        </GameShell>
        {/* فاز G2-e — آموزش یک‌بارنمایش در نمای نقشه + راهنمای دکمهٔ شِل */}
        <TutorialOverlay
          game={GAME_KEY}
          steps={TUTORIAL_STEPS}
          open={tutorialOpen}
          onOpenChange={handleTutorialOpenChange}
        />
      </>
    );
  }

  // ── چالش جاری ──
  if (phase === "challenge" && challenge) {
    const meta = STAGE_META[challenge.type];
    const TypeIcon = meta.icon;

    // ── فاز G2-e — نتیجهٔ استاندارد per-مرحله روی ResultScreen کیت ──
    // برد/باخت هر دو نتیجه می‌گیرند (title مناسب)؛ ستاره از starsOf موجود؛
    // رکورد/کانفتی از مسیر موجود saveBest می‌آید (اینجا celebrate شلیک نمی‌شود)
    if (challenge.resultStars !== null) {
      const stars = challenge.resultStars;
      const isLastStage = challenge.idx >= TOTAL_STAGES - 1;
      const title =
        stars === 3
          ? "بی‌نقص! بدون حتی یک خطا"
          : stars === 2
            ? "خیلی خوب — فقط یک خطا"
            : "مرحله تمام شد — گرهٔ بعدی باز شد!";
      return (
        <>
          <ResultScreen
            title={title}
            stars={stars}
            isRecord={isRecord}
            errorCount={challenge.errors}
            reviewItems={challenge.missed}
            stats={[
              {
                label: "مرحله",
                value: `${faNum(challenge.idx + 1)} از ${faNum(TOTAL_STAGES)}`,
                icon: <Map size={16} className="text-primary" />,
              },
              {
                label: "خطا",
                value: faNum(challenge.errors),
                icon: <XCircle size={16} className="text-destructive" />,
              },
              {
                label: "زمان مرحله",
                value: fmtTime(challenge.timeSecs),
                icon: <Timer size={16} className="text-teal-500" />,
              },
            ]}
            onReplay={
              isLastStage
                ? () => {
                    playSound("click");
                    setChallenge(null);
                    setPhase("done");
                  }
                : () => startStage(challenge.idx + 1)
            }
            onExit={backToMap}
            exitLabel="نقشه"
          />
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

    // نوار پیشرفت و بج پیشرفتِ مرحله — درصد بر اساس نوع چالش
    const stageTotal =
      challenge.type === 0
        ? challenge.questions.length
        : challenge.type === 1
          ? challenge.word.length
          : challenge.type === 2
            ? challenge.cards.length
            : 1;
    const stageDone =
      challenge.type === 0
        ? challenge.qIdx + (challenge.picked !== null ? 1 : 0)
        : challenge.type === 1
          ? challenge.slots.filter((s) => s !== null).length
          : challenge.type === 2
            ? challenge.matchedIds.length
            : challenge.picked !== null
              ? 1
              : 0;
    const stagePct = Math.min(100, Math.round((stageDone / Math.max(stageTotal, 1)) * 100));
    const stageStep =
      challenge.type === 0
        ? `سؤال ${faNum(challenge.qIdx + 1)} از ${faNum(challenge.questions.length)}`
        : challenge.type === 1
          ? `حرف ${faNum(challenge.slots.filter((s) => s !== null).length)} از ${faNum(challenge.word.length)}`
          : challenge.type === 2
            ? `جفت ${faNum(challenge.matchedIds.length / 2)} از ${faNum(challenge.cards.length / 2)}`
            : `۱ سؤال`;

    return (
      <>
        {/* فاز G2-e — هدر یکنواخت کیت: title=«مرحلهٔ N — نوع» + بج‌های خطا/ستاره/پیشرفت */}
        <GameShell
          title={`مرحلهٔ ${faNum(challenge.idx + 1)} — ${meta.label}`}
          icon={<TypeIcon size={18} />}
          stats={
            <>
              <Badge
                variant="outline"
                className={cn(
                  "gap-1.5 text-[11px]",
                  challenge.errors > 0 && "border-destructive/40 text-destructive",
                )}
              >
                <XCircle size={11} />
                {faNum(challenge.errors)} خطا
              </Badge>
              <Badge variant="secondary" className="gap-1.5 text-[11px]">
                <Star size={11} className="fill-amber-400 text-amber-500" />
                {faNum(totalStars)} ستاره
              </Badge>
              <Badge variant="secondary" className="gap-1.5 text-[11px]">
                <CheckCircle2 size={11} className="text-primary" />
                {stageStep}
              </Badge>
            </>
          }
          liveMsg={liveMsg}
          progress={
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-l from-primary to-emerald-400 transition-all duration-500"
                style={{ width: `${stagePct}%` }}
              />
            </div>
          }
          paused={paused}
          onPauseToggle={togglePause}
          muted={muted}
          onMuteToggle={() => setMuted(toggleSoundMuted())}
          onHelp={handleHelp}
          onExit={() => setExitAsk(true)}
          exitLabel="نقشه"
        >
          <div className="relative">
            <div
              className={cn("space-y-5", paused && "pointer-events-none blur-sm")}
              aria-hidden={paused}
            >
              {challenge.type === 0 && challenge.questions[challenge.qIdx]
                ? (() => {
                    const q = challenge.questions[challenge.qIdx];
                    const locked = challenge.picked !== null;
                    return (
                      <div className="space-y-4">
                        <div className="rounded-xl border bg-muted/40 p-6 text-center">
                          <p className="text-[11px] text-muted-foreground">
                            سؤال {faNum(challenge.qIdx + 1)} از {faNum(challenge.questions.length)} —
                            معنی این واژه چیست؟
                          </p>
                          <p dir="ltr" className="font-en mt-2 text-2xl font-black">
                            {q.word}
                          </p>
                        </div>
                        <div className="grid gap-2">
                          {q.options.map((opt, oi) => {
                            const isCorrect = oi === q.answer;
                            const isPicked = challenge.picked === oi;
                            return (
                              <button
                                key={`opt-${oi}`}
                                type="button"
                                disabled={locked}
                                onClick={() => answerQuiz(oi)}
                                aria-pressed={isPicked}
                                className={cn(
                                  "flex min-h-11 items-center justify-between gap-2 rounded-xl border-2 px-4 py-2.5 text-right text-[13px] font-bold transition-all",
                                  !locked && "border-border bg-card hover:border-primary/50 hover:bg-muted/60",
                                  locked && isCorrect && "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
                                  locked && isPicked && !isCorrect && "border-destructive bg-destructive/10",
                                  locked && !isCorrect && !isPicked && "opacity-50",
                                )}
                              >
                                <span>{opt}</span>
                                {locked && isCorrect && (
                                  <CheckCircle2 size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                                )}
                                {locked && isPicked && !isCorrect && (
                                  <XCircle size={16} className="shrink-0 text-destructive" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()
                : null}

              {challenge.type === 1 && (
                <div className="space-y-4">
                  <div className="rounded-xl border bg-muted/40 p-5 text-center">
                    <p className="text-[11px] text-muted-foreground">این واژه را با حروف پایین بساز:</p>
                    <p className="mt-1.5 text-lg font-black leading-7">{challenge.meaning}</p>
                  </div>
                  <div dir="ltr" className="flex flex-wrap justify-center gap-1.5">
                    {challenge.slots.map((tid, si) => {
                      const letter =
                        tid !== null
                          ? challenge.tiles.find((t) => t.id === tid)?.letter ?? null
                          : null;
                      return (
                        <button
                          key={`slot-${si}`}
                          type="button"
                          disabled={tid === null || challenge.shake}
                          onClick={() => pullTile(si)}
                          aria-label={`خانهٔ ${faNum(si + 1)}${letter ? ` — حرف ${letter}` : " — خالی"}`}
                          className={cn(
                            "flex h-11 w-10 items-center justify-center rounded-lg border-2 border-dashed font-en text-lg font-black transition-all",
                            letter
                              ? "border-primary/60 bg-primary/10 text-primary"
                              : "border-muted-foreground/25 text-muted-foreground/30",
                            challenge.shake && "match-shake border-destructive/60 bg-destructive/10",
                          )}
                        >
                          {letter ?? "·"}
                        </button>
                      );
                    })}
                  </div>
                  <div dir="ltr" className="flex flex-wrap justify-center gap-1.5">
                    {challenge.tiles.map((t) => {
                      const placed = challenge.slots.includes(t.id);
                      return (
                        <button
                          key={`tile-${t.id}`}
                          type="button"
                          disabled={placed || challenge.shake}
                          onClick={() => placeTile(t.id)}
                          aria-label={`حرف ${t.letter}`}
                          className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-lg border-2 font-en text-lg font-black transition-all",
                            placed
                              ? "border-transparent bg-muted/50 text-muted-foreground/25"
                              : "border-primary/40 bg-card text-foreground shadow-sm hover:border-primary hover:bg-primary/10 active:scale-95",
                          )}
                        >
                          {t.letter}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-center text-[10px] text-muted-foreground">
                    حرف‌ها را به ترتیب بزن؛ برای پس گرفتن یک حرف، روی خانه‌اش بزن
                  </p>
                </div>
              )}

              {challenge.type === 2 && (
                <div className="space-y-4">
                  <p className="text-center text-[11px] text-muted-foreground">
                    دو کارت را بزن — واژه و معنی‌اش باید جور شوند
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {challenge.cards.map((card) => {
                      const isMatched = challenge.matchedIds.includes(card.id);
                      const isSelected = challenge.sel === card.id;
                      const isWrong = challenge.wrongIds.includes(card.id);
                      return (
                        <button
                          key={`card-${card.id}`}
                          type="button"
                          disabled={isMatched || challenge.wrongIds.length > 0}
                          onClick={() => tapCard(card)}
                          aria-pressed={isSelected}
                          aria-label={
                            card.side === "en"
                              ? `کارت واژه ${card.word}`
                              : `کارت معنی ${card.meaning}`
                          }
                          className={cn(
                            "flex min-h-20 items-center justify-center rounded-xl border-2 p-3 text-center transition-all",
                            isMatched && "match-pop border-emerald-500/60 bg-emerald-500/10 opacity-70",
                            !isMatched && isSelected && "border-primary bg-primary/10 ring-2 ring-primary/25",
                            isWrong && "match-shake border-destructive bg-destructive/10",
                            !isMatched && !isSelected && !isWrong && "border-border bg-card hover:border-primary/40",
                          )}
                        >
                          {card.side === "en" ? (
                            <span dir="ltr" className="font-en text-sm font-black">
                              {card.word}
                            </span>
                          ) : (
                            <span className="text-[13px] font-bold leading-6">{card.meaning}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {challenge.type === 3 && challenge.questions[0]
                ? (() => {
                    const q = challenge.questions[0];
                    const win = challenge.picked !== null;
                    return (
                      <div className="space-y-4">
                        <div className="rounded-xl border bg-muted/40 p-6 text-center">
                          <p className="text-[11px] text-muted-foreground">
                            گوش کن و معنی درست را پیدا کن
                          </p>
                          <button
                            type="button"
                            onClick={() => speak(challenge.word, { speed })}
                            aria-label="پخش دوبارهٔ تلفظ"
                            className="mx-auto mt-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
                          >
                            <Volume2 size={26} />
                          </button>
                        </div>
                        <div className="grid gap-2">
                          {q.options.map((opt, oi) => {
                            const isCorrect = oi === q.answer;
                            const said = challenge.saidIds.includes(oi);
                            return (
                              <button
                                key={`lopt-${oi}`}
                                type="button"
                                disabled={said || win}
                                onClick={() => answerListen(oi)}
                                className={cn(
                                  "min-h-11 rounded-xl border-2 px-4 py-2.5 text-right text-[13px] font-bold transition-all",
                                  !said && !win && "border-border bg-card hover:border-primary/50 hover:bg-muted/60",
                                  win && isCorrect && "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
                                  said && !isCorrect && "border-destructive/50 bg-destructive/5 text-destructive/70 line-through",
                                  win && !isCorrect && !said && "opacity-50",
                                )}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()
                : null}
            </div>

            {/* فاز G2-e — اورلی توقف: بدنه تار و غیرقابل‌کلیک؛ اعلام در liveMsg سراسری */}
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
        </GameShell>
        {/* فاز G2-e — نگهبان خروج (G0-06) روی کیت: همان متن و همان رفتار؛
            Esc/کلیک بیرون = ادامهٔ مرحله */}
        <GameExitGuard
          open={exitAsk}
          onOpenChange={setExitAsk}
          onConfirm={confirmExitToMap}
          title="مرحله را رها کنم؟ 🗺️"
          description="مرحلهٔ فعال هنوز تمام نشده — با برگشتن به نقشه، پیشرفت این دور از دست می‌رود و مرحله از اول شروع می‌شود."
          confirmLabel="آره، برو به نقشه"
          cancelLabel="نه، ادامه می‌دهم"
        />
        {/* فاز G2-e — راهنمای دکمهٔ شِل حین مرحله (با توقف باز می‌شود) */}
        <TutorialOverlay
          game={GAME_KEY}
          steps={TUTORIAL_STEPS}
          open={tutorialOpen}
          onOpenChange={handleTutorialOpenChange}
        />
      </>
    );
  }

  // ── مراسم پایان دور کامل ──
  if (phase === "done" && progress) {
    const rank =
      totalStars >= 21
        ? {
            icon: Trophy as LucideIcon,
            label: "کاشف افسانه‌ای!",
            cls: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
          }
        : totalStars >= 15
          ? {
              icon: Compass as LucideIcon,
              label: "کاشف ماهر!",
              cls: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
            }
          : totalStars >= 9
            ? {
                icon: Compass as LucideIcon,
                label: "کاشف کوشا",
                cls: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
              }
            : {
                icon: Sprout as LucideIcon,
                label: "تازه‌کار — دوباره امتحان کن",
                cls: "bg-muted text-muted-foreground",
              };
    const RankIcon = rank.icon;
    return (
      <GameShell
        title="پایان ماجراجویی"
        icon={<PartyPopper size={18} />}
        stats={
          <>
            <Badge variant="secondary" className="gap-1.5 text-[11px]">
              <Star size={11} className="fill-amber-400 text-amber-500" />
              {faNum(totalStars)} از {faNum(MAX_STARS)} ستاره
            </Badge>
            <Badge variant="secondary" className="gap-1.5 text-[11px]">
              <CheckCircle2 size={11} className="text-primary" />
              {faNum(TOTAL_STAGES)} از {faNum(TOTAL_STAGES)} مرحله
            </Badge>
          </>
        }
        liveMsg="ماجراجویی کامل شد — همهٔ گره‌ها روشن شد 🎉"
        muted={muted}
        onMuteToggle={() => setMuted(toggleSoundMuted())}
        onExit={() => {
          stopSpeaking();
          setPhase("setup");
        }}
        exitLabel="تنظیمات"
      >
        <Card className="mx-auto max-w-xl border-amber-500/30">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <PartyPopper size={30} />
            </span>
            <h2 className="text-xl font-black">ماجراجویی کامل شد!</h2>
            {isRecord && (
              <Badge className="gap-1.5 bg-amber-500 text-amber-950 shadow-md shadow-amber-500/30">
                <Trophy size={13} />
                رکورد جدید! بیشترین ستاره 🏆
              </Badge>
            )}
            <div
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-black",
                rank.cls,
              )}
            >
              <RankIcon size={15} />
              {rank.label}
            </div>
            <p className="text-4xl font-black">
              {faNum(totalStars)}
              <span className="mr-2 text-base font-bold text-muted-foreground">
                از {faNum(MAX_STARS)} ستاره
              </span>
            </p>
            <div className="grid w-full grid-cols-4 gap-2">
              {progress.stars.map((s, i) => (
                <div key={`fin-${i}`} className="rounded-xl bg-muted/60 p-2.5">
                  <p className="text-[10px] font-bold text-muted-foreground">مرحلهٔ {faNum(i + 1)}</p>
                  <div className="mt-1 flex justify-center gap-0.5">
                    {[0, 1, 2].map((k) => (
                      <Star
                        key={`fin-${i}-${k}`}
                        size={10}
                        className={k < s ? "fill-amber-400 text-amber-500" : "text-muted-foreground/25"}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
              <Button
                className="h-12 gap-2"
                onClick={() => {
                  playSound("click");
                  beginAdventure("fresh");
                }}
              >
                <RotateCcw size={16} />
                ماجراجویی جدید
              </Button>
              <Button
                variant="outline"
                className="h-12"
                onClick={() => {
                  playSound("click");
                  setPhase("map");
                }}
              >
                نقشه
              </Button>
            </div>
          </CardContent>
        </Card>
      </GameShell>
    );
  }

  // گارد نهایی — حالت‌های ترکیبی غیرممکن به نقشه برمی‌گردند
  return (
    <Card className="mx-auto max-w-lg rise-in">
      <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
        <Map size={26} className="text-muted-foreground" />
        <Button className="h-11" onClick={() => setPhase("map")}>
          بازگشت به نقشه
        </Button>
      </CardContent>
    </Card>
  );
}
