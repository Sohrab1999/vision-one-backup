"use client";

/**
 * بازی «شکار صدا» (Listening Hunt) — فاز ۴ نقشه راه ویژن‌وان + فاز G2-c نقشه راه بازی‌ها.
 *
 * تمرین شنیداری خالص: واژهٔ انگلیسی با TTS خوانده می‌شود ولی هرگز نوشته نمی‌شود —
 * بازیکن باید از میان ۴ معنی فارسی، معنی درست را شکار کند.
 * پاسخ درست → تلفظ دوباره + ثبت در SRS؛ پاسخ غلط → آشکارسازی واژه + صف مرور.
 * رکورد شخصی: بیشترین امتیاز — اسکوپ: درس × تعداد سؤال × سرعت پخش.
 *
 * فاز G2-c (کیت GameKit v2 — الگوی پایلوت memory / جای خالی):
 * - GameShell (هدر یکنواخت + بج‌های شنیده/زمان/درست/امتیاز + aria-live مرکزی) +
 *   ResultScreen (ستاره/مرور خطاها) + آموزش ۳گامی (useAutoTutorial) + Pause (تایمر
 *   گیت روی paused و TTS حین توقف قطع) + نگهبان خروج + تله‌متری جلسه + صدا/لرزش.
 * - کار اختصاصی G2-c — پخش دوبارهٔ هزینه‌دار: تلاش‌های پخش per-سؤال شمرده می‌شود
 *   (تلاش ۱ = پخش خودکار سؤال)؛ دو تلاش اول رایگان‌اند (یعنی یک پخش دوبارهٔ رایگان)
 *   و از تلاش ۳ به بعد هر پخش دوباره ۱ امتیاز کم می‌کند (کف صفر). جریمه در بج زندهٔ
 *   امتیاز، در Attempt (correct نهایی) و در رکورد saveBest لحاظ می‌شود.
 * - نکتهٔ بی‌صدا: کلید بی‌صدای کیت فقط افکت‌های SFX موتور کیت را قطع می‌کند؛ تلفظ
 *   TTS واژه‌ها طبق قرارداد فعلی کیت پخش می‌ماند — این رفتار هنگام بی‌صداشدن با
 *   توست فارسی مستند می‌شود (پیش‌فرض سند: فقط SFX).
 * - امضاهای shared.ts (saveAttempt/saveBest/bumpPlays) و کلیدهای localStorage
 *   دست‌نخورده — قانون حفظ‌شوندگی §۳-۴ سند بازی‌ها.
 *
 * فاز G3 (نقشه راه بازی‌ها — G3-01/G3-02):
 * - دشواری ۳سطحی با کیت difficulty: تعداد گزینه = optionsFor(3..5) — آسان ۳ گزینه
 *   (۲ دام)، عادی ۴ گزینه (۳ دام — همان قبلی)، سخت ۵ گزینه (۴ دام) با سقف استخر؛
 *   جریمهٔ پخش دوباره ×hintCostScale با کف ۱ (عادی ‎−۱ مثل قبلی، آسان همان ‎−۱،
 *   سخت ‎−۲)؛ امتیاز نهایی (رکورد) = levelScore؛ اسکوپ رکورد/تله‌متری
 *   scopeWithLevel؛ detail.level افزودنی. سرعت پخش TTS از قبل جدا است و دست نمی‌خورد.
 * - G3-02: انتخاب واژه‌های دور = smartPick جای pickUnique (اولویت SRS ضعیف/سررسید؛
 *   کلید دقیقاً همان رشته‌ای که recordSRS همین بازی می‌نویسد) + پیام «مرکز این دور:
 *   N واژهٔ ضعیف تو» در setup با aria-live. استخر دام‌ها همان شافل قبلی است.
 */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  BookPlus,
  CheckCircle2,
  Headphones,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  Timer,
  Trophy,
  Volume2,
  XCircle,
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
import {
  bumpPlays,
  faNum,
  fmtTime,
  loadBest,
  saveAttempt,
  saveBest,
  shuffle,
  subscribeGameData,
} from "./shared";
// فاز G2-c — کیت GameKit v2 (قرارداد API سند)
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
// فاز G3 — دشواری ۳سطحی + انتخاب هوشمند واژه (کیت GameKit v2 — فقط مصرف)
import {
  LEVEL_KNOBS,
  levelScore,
  loadLevelPref,
  optionsFor,
  saveLevelPref,
  scopeWithLevel,
  type DifficultyKey,
} from "./kit/difficulty";
import { DifficultyPicker } from "./kit/difficulty-picker";
import { countWeak, smartPick } from "./kit/smart-pick";
// G5-01 — مدرس بازی با LLM (راهنمای خودکار بعد از ۳ خطا)
import { useHintCoach } from "./kit/hint-coach";

type Phase = "setup" | "playing" | "done";

/** یک سؤال شنیداری — سرنخ فقط صدا است؛ گزینه‌ها معنی فارسی‌اند */
interface HuntQuestion {
  word: string;
  meaning: string;
  options: string[];
  answer: number;
}

/** پاسخ غلط برای فهرست پایان دور */
interface WrongItem {
  word: string;
  meaning: string;
}

/** شکل رکورد شخصی — بهتر = امتیاز بیشتر (شکار درست منهای جریمهٔ پخش دوباره) */
interface BestRecord {
  score: number;
}

const ALL_LESSONS = -1;
const GAME_KEY = "listening-hunt";
const COUNT_OPTIONS = [5, 10];
/* تعداد دام هر سؤال از فاز G3-01 سطح‌محور شد: trapCount = optionsFor(level, 3, 5) − ۱
   (عادی = ۳ دام مثل قبل — ثابت قدیمی TRAPS = 3 دیگر استفاده نمی‌شود) */
/** سرعت پخش — ثابت (آهسته برای تمرین دقیق، عادی برای شنیدار طبیعی) */
const SPEED_OPTIONS = [
  { value: 0.65, label: "آهسته" },
  { value: 1, label: "عادی" },
] as const;
/** مکث پس از پاسخ درست (ms) */
const CORRECT_LOCK_MS = 700;
/** مکث پس از پاسخ غلط — فرصت دیدن واژهٔ درست (ms) */
const WRONG_LOCK_MS = 1400;
/**
 * فاز G2-c — کار اختصاصی: دو تلاش پخش اول هر سؤال رایگان‌اند (تلاش ۱ = پخش خودکار
 * سؤال، تلاش ۲ = اولین پخش دوباره)؛ از تلاش ۳ به بعد هر پخش دوباره −۱ امتیاز (کف صفر).
 */
const FREE_PLAYS = 2;
/** کلاس چیپ‌های انتخاب (setup) */
const chipCls = (active: boolean): string =>
  cn(
    "min-h-11 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
    active
      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
      : "text-muted-foreground hover:bg-muted",
  );
/** نگاشت کلیدهای ۱..۵ (لاتین و فارسی) به اندیس گزینه — فاز G3-01: سخت ۵ گزینه دارد */
const KEY_TO_OPTION: Record<string, number> = {
  "1": 0,
  "2": 1,
  "3": 2,
  "4": 3,
  "5": 4,
  "۱": 0,
  "۲": 1,
  "۳": 2,
  "۴": 3,
  "۵": 4,
};

/**
 * فاز G3-02 — کلید SRS واژهٔ دور: دقیقاً همان رشتهٔ پاک‌سازی‌شده‌ای که recordSRS
 * همین بازی هنگام شکار/خطا می‌نویسد (واژهٔ کتاب، حفظ حروف اصلی).
 */
function huntKeyOf(w: { word: string }): string {
  return w.word;
}

/** فاز G2-c — آموزش ۳-گامی استاندارد (گوش بده / گزینه بزن / پخش دوباره و جریمه) */
const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <Headphones size={24} />,
    title: "گوش بده",
    text: "واژهٔ انگلیسی خودکار پخش می‌شود ولی هرگز نوشته نمی‌شود — معنی‌اش را فقط با گوش پیدا کن.",
  },
  {
    icon: <Target size={24} />,
    title: "گزینه بزن",
    text: "از میان گزینه‌های معنی فارسی، معنی درست را شکار کن — با کلیدهای ۱ تا ۵ روی کیبورد هم می‌توانی جواب بدهی.",
  },
  {
    icon: <RotateCcw size={24} />,
    title: "پخش دوباره و جریمه",
    text: `هر سؤال ${faNum(FREE_PLAYS)} پخش رایگان دارد (پخش خودکار + یک پخش دوباره)؛ از پخش سوم به بعد هر پخش دوباره امتیاز کم می‌کند (در سطح سخت ${faNum(2)} امتیاز) — با احتیاط گوش کن!`,
  },
];

export function ListeningHuntGame() {
  const data = useBookData();
  const { bookId } = useBook();
  // بازی‌ها فقط داخل کتاب فعال رندر می‌شوند (useBookData بالا گارد است) — bookId عملاً هرگز null نیست
  const activeBookId: string = bookId ?? "";

  const [phase, setPhase] = useState<Phase>("setup");
  const [lesson, setLesson] = useState(ALL_LESSONS);
  const [count, setCount] = useState(5);
  const [speed, setSpeed] = useState<number>(1);
  // ── فاز G3-01 — سطح دشواری ماندگار + کناره‌های گیم‌پلی سطح ──
  const [level, setLevel] = useState<DifficultyKey>(() => loadLevelPref(GAME_KEY));
  /** تعداد کل گزینه هر سؤال: آسان ۳ / عادی ۴ (همان قبلی) / سخت ۵ — با سقف استخر مهار می‌شود */
  const totalOptions = optionsFor(level, 3, 5);
  /** تعداد دام هر سؤال = گزینه‌ها − پاسخ درست */
  const trapCount = totalOptions - 1;
  /** فاز G3-01 — جریمهٔ هر پخش دوباره ×hintCostScale با کف ۱: عادی/آسان ‎−۱، سخت ‎−۲ */
  const replayCost = Math.max(1, Math.round(LEVEL_KNOBS[level].hintCostScale));

  const [deck, setDeck] = useState<HuntQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [correct, setCorrect] = useState(0);
  const [wrongList, setWrongList] = useState<WrongItem[]>([]);
  const [secs, setSecs] = useState(0);
  const [isRecord, setIsRecord] = useState(false);
  // فاز G2-c — پیام باکس aria-live مرکزی شِل (الگوی پایلوت memory/جای خالی)
  const [liveMsg, setLiveMsg] = useState("");
  // فاز G2-c — کار اختصاصی: تلاش پخش سؤال جاری (۱ = پخش خودکار) + جریمهٔ انباشتهٔ دور
  const [plays, setPlays] = useState(1);
  const [penalty, setPenalty] = useState(0);

  const locked = useRef(false);
  const secsRef = useRef(0);
  const idxRef = useRef(0);
  const correctRef = useRef(0);
  const penaltyRef = useRef(0);
  /** کل پخش‌های دوبارهٔ دور — برای detail Attempt (بدون تغییر امضا) */
  const replaysRef = useRef(0);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** آینهٔ paused برای callbackهای پایدار (مثل advance که حین توقف پخش نمی‌کند) */
  const pausedRef = useRef(false);

  // فاز G2-c — توقف/ادامهٔ استاندارد کیت: حین توقف TTS قطع و پیام اعلام می‌شود
  // (توقف خودکار تب مخفی هم از خود هوک می‌آید)
  const { paused, resume, pause: pauseGame, toggle: togglePause } = useGamePause((p) => {
    pausedRef.current = p;
    if (p) stopSpeaking();
    if (phase === "playing") setLiveMsg(p ? "بازی متوقف شد ⏸" : "ادامهٔ بازی ▶");
  });
  // ── فاز G3 — انتخاب سطح ماندگار (قرارداد کیت: saveLevelPref در onChange) ──
  const changeLevel = useCallback((l: DifficultyKey) => {
    setLevel(l);
    saveLevelPref(GAME_KEY, l);
  }, []);
  const [exitAsk, setExitAsk] = useState(false);
  // فاز G2-c — بی‌صدای کیت (فقط SFX؛ تلفظ TTS طبق قرارداد کیت پخش می‌ماند)
  // الگوی دارباز/جای خالی: state + شنوندهٔ storage برای همگام‌سازی بین-تب
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
  // فاز G2-c — تله‌متری جلسه (بدون PII: بازی/اسکوپ/مدت رُند/دلیل)
  const sessionRef = useRef<GameSessionTracker | null>(null);
  // G5-01 — مدرس بازی (کارت شناور داخل GameShell) — دسترسی در callbackهای پایدار با latest-ref (الگوی کیت)
  const hint = useHintCoach(GAME_KEY);
  const hintRef = useRef(hint);
  useEffect(() => {
    hintRef.current = hint;
  });

  // رکورد شخصی این اسکوپ — اسنپ‌شات رشته‌ای (primitive تا هر خواندن آبجکت تازه نسازد)
  // فاز G3-01 — اسکوپ سطح‌دار: عادی = دقیقاً همان کلید قدیمی (scopeWithLevel)
  const bestScope = scopeWithLevel(
    `${lesson === ALL_LESSONS ? "all" : lesson}:${count}:${speed}`,
    level,
  );
  const bestRaw = useSyncExternalStore(
    subscribeGameData,
    () => {
      const b = loadBest<BestRecord>(activeBookId, GAME_KEY, bestScope);
      return b ? JSON.stringify(b) : null;
    },
    () => null,
  );
  const best = useMemo<BestRecord | null>(
    () => (bestRaw ? (JSON.parse(bestRaw) as BestRecord) : null),
    [bestRaw],
  );

  // تایمر — بدون setState مستقیم در effect (react-hooks v6)؛ secsRef برای زمان دقیق لحظهٔ پایان
  // فاز G2-c — گیت روی paused: توقف دستی یا خودکارِ تب مخفی هیچ تیکی جلو نمی‌برد
  useEffect(() => {
    if (phase !== "playing" || paused) return;
    const t = setInterval(() => {
      secsRef.current += 1;
      setSecs((s) => s + 1);
    }, 1000);
    return () => clearInterval(t);
  }, [phase, paused]);

  // cleanup: تله‌متری «رهاشده» (اگر باز باشد no-op) + تایمر معلق + توقف صدا (unmount)
  useEffect(
    () => () => {
      sessionRef.current?.abandon("unmount");
      if (advanceTimer.current !== null) window.clearTimeout(advanceTimer.current);
      stopSpeaking();
    },
    [],
  );

  const clearAdvance = useCallback(() => {
    if (advanceTimer.current !== null) {
      window.clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  }, []);

  const finish = useCallback(
    (finalCorrect: number, finalSecs: number) => {
      clearAdvance();
      touchStreak();
      recordStudySession();
      bumpPlays(activeBookId, GAME_KEY);
      // فاز G2-c — پایان عادی جلسهٔ تله‌متری
      sessionRef.current?.end("finish");
      // فاز G2-c — کار اختصاصی: امتیاز نهایی = شکار درست − جریمهٔ پخش دوباره (کف صفر)
      const score = Math.max(0, finalCorrect - penaltyRef.current);
      // فاز G3-01 — امتیاز رکورد با ضریب سطح (عادی: همان عدد قبلی)
      const finalScore = levelScore(score, level);
      const perfect = deck.length > 0 && finalCorrect === deck.length;
      // فاز G2-c — بازخورد سه‌کانالهٔ پایان (دور بی‌نقص = صدای win — الگوی جای خالی)
      playSound(perfect ? "win" : "finish");
      buzz("success");
      saveAttempt(activeBookId, GAME_KEY, {
        lesson: lesson === ALL_LESSONS ? 0 : lesson,
        total: count,
        correct: score,
        duration: finalSecs,
        detail: { speed, replays: replaysRef.current, penalty: penaltyRef.current, level },
      });
      setSecs(finalSecs);
      const scope = scopeWithLevel(
        `${lesson === ALL_LESSONS ? "all" : lesson}:${count}:${speed}`,
        level,
      );
      const prev = loadBest<BestRecord>(activeBookId, GAME_KEY, scope);
      if (!prev || finalScore > prev.score) {
        saveBest(activeBookId, GAME_KEY, scope, { score: finalScore });
        setIsRecord(true);
        // فاز G2-c — رکورد جدید: صدا + لرزش رکورد (الگوی پایلوت)
        playSound("record");
        buzz("record");
        toast.success(`رکورد جدید! ${faNum(finalScore)} امتیاز از ${faNum(count)} 🏆`);
      } else {
        toast.success(`شکار تمام شد — ${faNum(finalScore)} امتیاز از ${faNum(count)} 🎯`);
      }
      setLiveMsg(perfect ? "همه واژه‌ها شکار شد — بی‌نقص! 🎉" : "دور تمام شد!");
      setPhase("done");
    },
    [activeBookId, clearAdvance, count, deck.length, lesson, speed, level],
  );

  /** پرسش بعدی — همیشه داخل callback تایمر/کلیک صدا زده می‌شود (هرگز در بدنهٔ effect) */
  const advance = useCallback(() => {
    clearAdvance();
    const nextIdx = idxRef.current + 1;
    if (nextIdx >= deck.length) {
      finish(correctRef.current, secsRef.current);
      return;
    }
    idxRef.current = nextIdx;
    setIdx(nextIdx);
    setSelected(null);
    setResult(null);
    locked.current = false;
    // فاز G2-c — تلاش پخش سؤال تازه (دو تلاش اول هر سؤال رایگان‌اند)
    setPlays(1);
    // پخش خودکار سؤال بعد — در ادامهٔ زنجیرهٔ callback (مجاز)؛
    // حین توقف پخش نمی‌شود — پس از ادامه، پخش دوبارهٔ رایگان در دسترس است
    if (!pausedRef.current) speak(deck[nextIdx].word, { speed });
  }, [clearAdvance, deck, finish, speed]);

  const handleOption = useCallback(
    (optIdx: number, viaKey = false) => {
      if (locked.current || paused || exitAsk) return;
      const q = deck[idxRef.current];
      if (!q) return;
      // فاز G3-01 — کلید بیرون از تعداد گزینهٔ سطح (۳/۴/۵) بی‌اثر است؛ در عادی هرگز رخ نمی‌دهد
      if (optIdx < 0 || optIdx >= q.options.length) return;
      locked.current = true;
      setSelected(optIdx);
      // فاز G2-c — بازخورد کلیک گزینه (مسیر ماوس؛ کیبورد فقط صدای نتیجه — الگوی دارباز)
      if (!viaKey) {
        playSound("click");
        buzz("light");
      }
      if (optIdx === q.answer) {
        setResult("correct");
        correctRef.current += 1;
        setCorrect((c) => c + 1);
        recordSRS(q.word, true);
        speak(q.word, { speed }); // تلفظ دوبارهٔ واژهٔ شکارشده
        // فاز G2-c — بازخورد سه‌کانالهٔ پاسخ درست
        playSound("correct");
        buzz("success");
        setLiveMsg("درست شکار شد! 🎉");
        advanceTimer.current = setTimeout(advance, CORRECT_LOCK_MS);
      } else {
        setResult("wrong");
        setWrongList((prev) => [...prev, { word: q.word, meaning: q.meaning }]);
        recordSRS(q.word, false);
        // فاز G2-c — بازخورد سه‌کانالهٔ پاسخ غلط
        playSound("wrong");
        buzz("error");
        // G5-01 — مدرس بازی: گزینهٔ غلط (معنی سرنخ + واژهٔ درست + گزینهٔ انتخابی)
        hintRef.current.recordMistake({ prompt: q.meaning, answer: q.word, chosen: (q.options[optIdx] ?? "").slice(0, 160) });
        setLiveMsg(`غلط بود — واژهٔ درست «${q.word}» بود`);
        advanceTimer.current = setTimeout(advance, WRONG_LOCK_MS);
      }
    },
    [advance, deck, speed, paused, exitAsk],
  );

  // فاز G2-c — کار اختصاصی: پخش دوبارهٔ هزینه‌دار — دو تلاش اول هر سؤال رایگان،
  // از تلاش ۳ به بعد هر پخش −۱ امتیاز (کف صفر در محاسبهٔ امتیاز نهایی).
  // گاردها: سؤال قفل‌شده (پاسخ داده‌شده) / توقف / پنجرهٔ باز نگهبان خروج.
  const handleReplay = useCallback(() => {
    if (locked.current || paused || exitAsk) return;
    const q = deck[idxRef.current];
    if (!q) return;
    const nextPlays = plays + 1;
    setPlays(nextPlays);
    replaysRef.current += 1;
    // بازخورد کلیک — سه‌کاناله؛ متن اعلام برای فناوری‌های کمکی
    playSound("click");
    buzz("light");
    if (nextPlays > FREE_PLAYS) {
      // تلاش ۳ به بعد — جریمهٔ ×hintCostScale (عادی/آسان ‎−۱، سخت ‎−۲)
      penaltyRef.current += replayCost;
      setPenalty(penaltyRef.current);
      setLiveMsg(`پخش دوباره — ${faNum(replayCost)} امتیاز کم شد`);
    } else {
      setLiveMsg("پخش دوباره — رایگان");
    }
    speak(q.word, { speed });
  }, [plays, paused, exitAsk, deck, speed, replayCost]);

  // latest-ref برای callback کیبورد (ضد کلوزر کهنه)
  const optionRef = useRef(handleOption);
  useEffect(() => {
    optionRef.current = handleOption;
  });

  // کیبورد ۱..۴ (و ارقام فارسی) برای گزینه‌ها — فقط در فاز بازی؛
  // فاز G2-c — گاردهای توقف و پنجرهٔ باز نگهبان + گارد تکرار کلید (الگوی جای خالی)
  useEffect(() => {
    if (phase !== "playing" || paused || exitAsk) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.repeat) return;
      const i = KEY_TO_OPTION[e.key];
      if (i === undefined) return;
      e.preventDefault();
      optionRef.current(i, true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, paused, exitAsk]);

  /** استخر قابل بازی: حذف پرانتز pos، فقط حروف A-Za-z، معنی یکتا (دام‌های گمراه‌کننده حذف شوند) */
  const buildPool = useCallback(() => {
    const pool = lesson === ALL_LESSONS ? data.vocab.all : data.vocab.ofLesson(lesson);
    const cleaned = pool
      .map((w) => ({ ...w, word: w.word.replace(/\s*\([^)]*\)\s*/g, " ").trim() }))
      .filter((w) => /^[A-Za-z]+$/.test(w.word));
    // دو واژه با معنی یکسان گمراه‌کننده است — dedup روی معنی
    const seenMeanings = new Set<string>();
    return cleaned.filter((w) => {
      if (seenMeanings.has(w.meaning)) return false;
      seenMeanings.add(w.meaning);
      return true;
    });
  }, [data.vocab, lesson]);

  // فاز G3-02 — شمارش واژه‌های ضعیف/سررسید/نوی استخر برای پیام setup
  const weakCount = useMemo(() => countWeak(buildPool(), huntKeyOf), [buildPool]);

  const start = useCallback(() => {
    const deduped = buildPool();
    // گارد: استخر باید حداقل سؤال‌ها + دام‌های سطح (و در عمل ۵) واژه داشته باشد
    const minPool = Math.max(count + trapCount, 5);
    // فاز G3-02 — انتخاب هوشمند: اولویت واژه‌های ضعیف/سررسید SRS (شروع سرد = همان pickUnique)
    const chosen = smartPick(deduped, count, huntKeyOf);
    if (deduped.length < minPool || chosen.length < count) {
      toast.error(
        `واژهٔ کافی برای ${faNum(count)} سؤال پیدا نشد — حداقل ${faNum(minPool)} واژه لازم است؛ درس دیگری را امتحان کن`,
      );
      return;
    }
    const built: HuntQuestion[] = chosen.map((w) => {
      // دام‌های سطح از همان استخر — شافل قبلی دست‌نخورده (فاز G3-02: فقط واژه‌های دور هوشمندند)
      const traps = shuffle(deduped.filter((d) => d.word !== w.word && d.meaning !== w.meaning))
        .slice(0, trapCount)
        .map((d) => d.meaning);
      const options = shuffle([w.meaning, ...traps]);
      return { word: w.word, meaning: w.meaning, options, answer: options.indexOf(w.meaning) };
    });
    clearAdvance();
    idxRef.current = 0;
    correctRef.current = 0;
    penaltyRef.current = 0;
    replaysRef.current = 0;
    locked.current = false;
    secsRef.current = 0;
    setDeck(built);
    setIdx(0);
    setSelected(null);
    setResult(null);
    setCorrect(0);
    setWrongList([]);
    setSecs(0);
    setIsRecord(false);
    setLiveMsg("");
    hintRef.current.reset(); // G5-01 — دور تازه
    setPlays(1);
    setPenalty(0);
    resume();
    setExitAsk(false);
    // فاز G2-c — بازخورد کلیک شروع دور (از setup و «دور جدید» نتیجه)
    playSound("click");
    buzz("light");
    // فاز G2-c — جلسهٔ تازهٔ تله‌متری برای این دور (فاز G3: اسکوپ سطح‌دار)
    sessionRef.current = createGameSession({
      game: GAME_KEY,
      level: scopeWithLevel(`${lesson === ALL_LESSONS ? "all" : lesson}:${count}:${speed}`, level),
    });
    sessionRef.current.start();
    setPhase("playing");
    // پخش خودکار اولین واژه — در handler کلیک (تعامل کاربر موجود است)
    speak(built[0].word, { speed });
  }, [buildPool, clearAdvance, count, lesson, resume, speed, trapCount, level, setExitAsk]);

  // انصراف حین دور — فاز G2-c (نگهبان خروج): با حداقل یک پاسخ، GameExitGuard؛
  // بدون هیچ پاسخی، خروج مستقیم + تله‌متری abandon
  const handleExitClick = useCallback(() => {
    stopSpeaking();
    if (idx > 0 || result !== null) {
      setExitAsk(true);
    } else {
      clearAdvance();
      // دور بدون پاسخ هم یک جلسه است؛ همین‌جا رهاشده ثبت می‌شود
      sessionRef.current?.abandon("exit");
      resume();
      setPhase("setup");
    }
  }, [idx, result, resume, clearAdvance, setExitAsk]);

  // فاز G2-c — دکمهٔ بی‌صدای شِل: فقط SFX کیت قطع می‌شود؛ رفتار با توست مستند می‌شود
  const handleMuteToggle = useCallback(() => {
    const next = toggleSoundMuted();
    setMuted(next);
    if (next) {
      toast.info("افکت‌های صوتی بازی بی‌صدا شد — تلفظ واژه‌ها همچنان پخش می‌شود");
    }
  }, []);

  // ── Setup ──
  if (phase === "setup") {
    return (
      <>
        <Card className="mx-auto max-w-xl rise-in">
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <Headphones size={22} />
              </span>
              <div>
                <h2 className="text-lg font-black">شکار صدا</h2>
                <p className="text-xs text-muted-foreground">
                  واژه را فقط بشنو — معنی درست را از میان {faNum(totalOptions)} گزینه شکار کن!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
              <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
              <p>
                واژهٔ انگلیسی خوانده می‌شود ولی هرگز نوشته نمی‌شود — فقط با گوش! هر شکار درست یک امتیاز
                است؛ دو پخش اول هر سؤال رایگان‌اند و از پخش سوم به بعد هر پخش دوباره {faNum(replayCost)} امتیاز کم
                می‌کند. پاسخ غلط واژه را آشکار می‌کند و به مرور اضافه می‌شود.
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
                  className={chipCls(lesson === ALL_LESSONS)}
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
                    className={chipCls(lesson === l.lesson)}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[13px] font-bold">چند سؤال؟</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="تعداد سؤال‌ها">
                {COUNT_OPTIONS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      playSound("click");
                      buzz("light");
                      setCount(n);
                    }}
                    aria-pressed={count === n}
                    className={chipCls(count === n)}
                  >
                    {faNum(n)} سؤال
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[13px] font-bold">سرعت پخش صدا</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="سرعت پخش صدا">
                {SPEED_OPTIONS.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => {
                      playSound("click");
                      buzz("light");
                      setSpeed(s.value);
                    }}
                    aria-pressed={speed === s.value}
                    className={chipCls(speed === s.value)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* فاز G3-01 — انتخاب سطح دشواری ماندگار (کیت difficulty) */}
            <DifficultyPicker value={level} onChange={changeLevel} />
            <p className="-mt-3 text-[11px] leading-5 text-muted-foreground">
              {level === "easy"
                ? `در این سطح: ${faNum(totalOptions)} گزینه (${faNum(trapCount)} دام)، جریمهٔ پخش دوباره ${faNum(replayCost)} امتیاز، امتیاز ×۰٫۷`
                : level === "hard"
                  ? `در این سطح: ${faNum(totalOptions)} گزینه (${faNum(trapCount)} دام)، جریمهٔ پخش دوباره ${faNum(replayCost)} امتیاز، امتیاز ×۱٫۶`
                  : "در این سطح: همان تجربهٔ اصلی — ۴ گزینه و جریمهٔ پخش ۱ امتیازی"}
            </p>
            {/* فاز G3-02 — تمرکز هوشمند دور روی کارت‌های ضعیف/سررسید SRS */}
            {weakCount > 0 && (
              <p
                role="status"
                aria-live="polite"
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400"
              >
                🎯 مرکز این دور: {faNum(weakCount)} واژهٔ ضعیف تو
              </p>
            )}

            {best && (
              <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
                <Trophy size={12} />
                بهترین امتیاز: {faNum(best.score)} از {faNum(count)}
              </Badge>
            )}

            <Button size="lg" className="h-12 w-full gap-2 text-base" onClick={start}>
              <Play size={18} />
              شروع شکار
            </Button>
          </CardContent>
        </Card>
        {/* فاز G2-c — آموزش یک‌بارنمایش در اولین ورود */}
        <TutorialOverlay
          game={GAME_KEY}
          steps={TUTORIAL_STEPS}
          open={tutorialOpen}
          onOpenChange={handleTutorialOpenChange}
        />
      </>
    );
  }

  // ── Done — فاز G2-c: صفحهٔ نتیجهٔ استاندارد کیت ──
  if (phase === "done") {
    const acc = Math.round((correct / Math.max(deck.length, 1)) * 100);
    // ستاره‌بندی per-game (فاز G2-c): دقت ≥۹۰٪ = ۳ ستاره، ≥۶۵٪ = ۲ ستاره
    const stars = acc >= 90 ? 3 : acc >= 65 ? 2 : 1;
    const perfect = deck.length > 0 && correct === deck.length;
    // فاز G3-01 — امتیاز نمایشی = سطح‌دار (عادی: همان شکار − جریمهٔ قبلی)
    const finalScore = levelScore(Math.max(0, correct - penalty), level);
    return (
      <ResultScreen
        title={perfect ? "همه واژه‌ها شکار شد!" : "شکار تمام شد!"}
        stars={stars}
        isRecord={isRecord}
        errorCount={wrongList.length}
        reviewItems={wrongList.map((w) => ({ front: w.word, back: w.meaning }))}
        stats={[
          {
            label: "درست",
            value: faNum(correct),
            icon: <CheckCircle2 size={16} className="text-emerald-500" />,
          },
          {
            label: "دقت",
            value: `${faNum(acc)}٪`,
            icon: <Target size={16} className="text-teal-500" />,
          },
          {
            label: "امتیاز",
            value: faNum(finalScore),
            icon: <Sparkles size={16} className="text-amber-500" />,
          },
        ]}
        onReplay={start}
        onExit={() => setPhase("setup")}
        exitLabel="تنظیمات"
      />
    );
  }

  // ── Playing ──
  const q: HuntQuestion | undefined = deck[idx];
  const pct = Math.round(((idx + (result !== null ? 1 : 0)) / Math.max(deck.length, 1)) * 100);
  // فاز G2-c — امتیاز زندهٔ بج = شکار درست − جریمهٔ پخش دوباره (کف صفر)
  const liveScore = Math.max(0, correct - penalty);
  // لیبل پویا: plays=۱ → «۱ رایگان باقی»؛ plays≥۲ (پخش بعدی جریمه دارد) → «−N امتیاز»
  const replayLabel =
    plays < FREE_PLAYS
      ? `پخش دوباره (${faNum(FREE_PLAYS - plays)} رایگان باقی)`
      : `پخش دوباره (−${faNum(replayCost)} امتیاز)`;
  const replayAria =
    plays < FREE_PLAYS
      ? `پخش دوبارهٔ صدا — ${faNum(FREE_PLAYS - plays)} پخش رایگان باقی`
      : `پخش دوبارهٔ صدا — هر پخش ${faNum(replayCost)} امتیاز کم می‌کند`;

  return (
    <>
      {/* فاز G2-c — هدر یکنواخت از کیت (الگوی پایلوت memory/جای خالی) */}
      <GameShell
        title="شکار صدا"
        icon={<Headphones size={18} />}
        stats={
          <>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <Headphones size={11} />
              {faNum(idx + 1)} / {faNum(deck.length)}
            </Badge>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <Timer size={11} />
              {fmtTime(secs)}
            </Badge>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <Target size={11} className="text-emerald-500" />
              {faNum(correct)} درست
            </Badge>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <Sparkles size={11} className="text-teal-500" />
              {faNum(liveScore)} امتیاز
            </Badge>
          </>
        }
        liveMsg={liveMsg}
        progress={
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-l from-primary to-emerald-400 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        }
        paused={paused}
        onPauseToggle={togglePause}
        muted={muted}
        onMuteToggle={handleMuteToggle}
        onHelp={handleHelp}
        onExit={handleExitClick}
      >
        <div className="relative">
          <div className={cn("space-y-4", paused && "pointer-events-none blur-sm")} aria-hidden={paused}>
            {q && (
              <Card>
                <CardContent className="space-y-5 p-6">
                  {/* سرنخ صوتی — واژه هرگز نوشته نمی‌شود */}
                  <div className="flex flex-col items-center gap-3 text-center">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 shadow-inner dark:text-emerald-400">
                      {result === null ? <Headphones size={38} /> : <Volume2 size={38} />}
                    </span>
                    <div>
                      <p className="text-[15px] font-black">به دقت گوش کن…</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        واژه پنهان است — فقط با گوش شکار می‌شود!
                      </p>
                    </div>
                    {/* فاز G2-c — کار اختصاصی: پخش دوبارهٔ هزینه‌دار (دو تلاش اول هر سؤال رایگان) */}
                    <Button
                      variant="outline"
                      className="min-h-11 gap-2"
                      onClick={handleReplay}
                      disabled={result !== null || paused}
                      aria-label={replayAria}
                    >
                      <Volume2 size={16} />
                      {replayLabel}
                    </Button>
                  </div>

                  {/* بازخورد */}
                  {result === "correct" && (
                    <div className="flex items-center justify-center">
                      <Badge className="match-pop gap-1.5 bg-emerald-500 text-emerald-950 shadow-md shadow-emerald-500/30">
                        <CheckCircle2 size={13} />
                        آفرین! درست شکار شد
                      </Badge>
                    </div>
                  )}
                  {result === "wrong" && (
                    <div className="match-shake flex flex-col items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3">
                      <Badge
                        variant="outline"
                        className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400"
                      >
                        <BookPlus size={12} />
                        به مرور اضافه شد
                      </Badge>
                      <p className="text-[11px] text-muted-foreground">واژهٔ درست:</p>
                      <span dir="ltr" className="font-en text-lg font-black text-destructive">
                        {q.word}
                      </span>
                    </div>
                  )}

                  {/* گزینه‌های معنی فارسی سطح — درست + دام‌های متمایز (فاز G3-01: ۳/۴/۵ گزینه) */}
                  <div className="grid grid-cols-1 gap-2">
                    {q.options.map((opt, i) => {
                      const isAnswer = i === q.answer;
                      const isSelected = i === selected;
                      const showState = result !== null;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleOption(i)}
                          disabled={showState}
                          aria-keyshortcuts={String(i + 1)}
                          aria-label={`گزینهٔ ${faNum(i + 1)}: ${opt}`}
                          className={cn(
                            "flex min-h-12 w-full items-center gap-3 rounded-xl border-2 bg-card px-4 py-2.5 text-right text-[14px] font-bold shadow-sm transition-all",
                            !showState && "hover:border-primary/60 hover:bg-muted/50",
                            showState &&
                              isAnswer &&
                              "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
                            showState &&
                              !isAnswer &&
                              isSelected &&
                              "match-shake border-destructive bg-destructive/10 text-destructive",
                            showState && !isAnswer && !isSelected && "opacity-40",
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[12px] font-black",
                              showState && isAnswer
                                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                                : "border-primary/30 text-primary",
                            )}
                          >
                            {faNum(i + 1)}
                          </span>
                          <span className="flex-1">{opt}</span>
                          {showState && isAnswer && (
                            <CheckCircle2 size={17} className="shrink-0 text-emerald-500" />
                          )}
                          {showState && !isAnswer && isSelected && (
                            <XCircle size={17} className="shrink-0 text-destructive" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-center text-[10px] text-muted-foreground">
                    کلیدهای {faNum(1)} تا {faNum(totalOptions)} برای انتخاب سریع — از پخش سوم به بعد هر پخش
                    دوباره {faNum(replayCost)} امتیاز کم می‌کند
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* فاز G2-c — اورلی توقف (الگوی پایلوت memory): محتوا تار و غیرقابل‌کلیک */}
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

        {/* فاز G2-c — نگهبان خروج استاندارد کیت */}
        <GameExitGuard
          open={exitAsk}
          onOpenChange={setExitAsk}
          onConfirm={() => {
            // فاز G2-c — رهاکردن دور نیمه‌کاره + تله‌متری
            sessionRef.current?.abandon("exit");
            clearAdvance();
            stopSpeaking();
            setExitAsk(false);
            resume();
            setPhase("setup");
          }}
        />
        {/* G5-01 — کارت مدرس بازی */}
        {hint.element}
      </GameShell>
      {/* فاز G2-c — راهنمای دکمهٔ شِل (حین بازی با توقف باز می‌شود) */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
