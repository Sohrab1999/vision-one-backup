"use client";

/**
 * بازی «دارباز» (Hangman) — فاز ۴ نقشه راه جامع ۲۰۲۶ + فاز G2-a نقشه راه بازی‌ها.
 *
 * حدس حرف‌به‌حرف واژه‌های انگلیسی با سرنخ «معنی فارسی + نوع واژه (pos)».
 * به‌جای شکل کلاسیک دارباز، ۶ جان = ۶ بادکنک رنگی است: هر حرف غلط یک بادکنک
 * می‌ترکد — فاز G2-a: بازخورد سه‌کاناله (صدا+لرزش از کیت + انیمیشن CSS ترکیدن
 * scale-up/fade-out ~۴۰۰ms؛ با prefers-reduced-motion جای حرکت، فلاش سادهٔ رنگ
 * پخش می‌شود) و پس از پایان انیمیشن، بادکنک حذف و حباب خط‌چین می‌ماند.
 * - برد واژه: recordSRS(✓) + پخش تلفظ + Badge سبز
 * - باخت واژه: نمایش کامل واژه + recordSRS(✗) + Badge «به مرور اضافه شد»
 * - رکورد شخصی: بیشترین برد (score) به تفکیک درس × تعداد واژهٔ دور
 * - حروف تکراری یک‌جا آشکار می‌شوند؛ قفل double-guess با ref همگام است
 * - فاز G2-a (کیت GameKit v2 — الگوی پایلوت memory): GameShell + ResultScreen +
 *   آموزش ۳گامی (useAutoTutorial) + Pause (تایمر گیت روی paused) + نگهبان خروج +
 *   تله‌متری جلسه (start/end/abandon) — امضاهای shared.ts و کلیدهای localStorage
 *   دست‌نخورده (قانون حفظ‌شوندگی §۳-۴ سند).
 */

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  CheckCircle2,
  Heart,
  MousePointerClick,
  Pause,
  Play,
  PlusCircle,
  SpellCheck,
  Sparkles,
  Target,
  Timer,
  Trophy,
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
import { useVoiceSpeed } from "@/lib/voice-store";
import {
  bumpPlays,
  faNum,
  fmtTime,
  loadBest,
  pickUnique,
  saveAttempt,
  saveBest,
  subscribeGameData,
} from "./shared";
// فاز G2-a — کیت GameKit v2 (قرارداد API سند)
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

type Phase = "setup" | "playing" | "done";

/** یک واژهٔ دور — از VocabEntry کتاب فعال ساخته می‌شود */
interface WordItem {
  /** واژهٔ پایهٔ uppercase بدون نشانه‌های دستوری */
  word: string;
  meaning: string;
  pos?: string;
  lessonLabel: string;
}

/** شکل رکورد شخصی — بهتر = برد بیشتر */
interface BestRecord {
  score: number;
}

/** ردیف جزئیات دور — برای Attempt سروری و فهرست باخت‌ها */
interface DetailRow {
  word: string;
  ok: boolean;
}

const ALL_LESSONS = -1;
const GAME_KEY = "hangman";
const WORD_OPTIONS = [3, 5];
/** تعداد جان‌ها = تعداد بادکنک‌ها */
const MAX_WRONG = 6;
/** مکث بعد از برد واژه تا پخش تلفظ شنیده شود (ms) */
const WIN_LOCK_MS = 1400;
/** مکث بعد از باخت تا واژهٔ کامل + معنی دیده شود (ms) */
const LOSS_LOCK_MS = 2200;
/** فقط واژه‌های تک‌کلمه‌ای لاتین ۳ تا ۱۰ حرفی وارد بازی می‌شوند */
const WORD_RE = /^[A-Za-z]{3,10}$/;
/** ردیف‌های کیبورد on-screen — الفبایی، LTR */
const KB_ROWS = ["ABCDEFGHI", "JKLMNOPQR", "STUVWXYZ"];
/** رنگ بادکنک‌ها — emerald/amber/teal متناوب */
const BALLOON_TONES = [
  "text-emerald-500",
  "text-amber-500",
  "text-teal-500",
  "text-emerald-500",
  "text-amber-500",
  "text-teal-500",
];
/** فاز G2-a — مدت انیمیشن ترکیدن بادکنک (ms) */
const POP_MS = 400;

/** فاز G2-a — آموزش ۳-گامی استاندارد (الگوی پایلوت memory / G1-08) */
const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <SpellCheck size={24} />,
    title: "حرف‌به‌حرف حدس بزن",
    text: "سرنخ تو معنی فارسی و نوع واژه است — حرف درست، جای خودش در واژه نشان داده می‌شود.",
  },
  {
    icon: <Heart size={24} />,
    title: "۶ بادکنک = ۶ جان",
    text: "هر حرف غلط یک بادکنک می‌ترکد؛ اگر همه ترکیدند، واژه را می‌بازی و به مرور هوشمند اضافه می‌شود.",
  },
  {
    icon: <Trophy size={24} />,
    title: "برد = تلفظ + مرور هوشمند",
    text: "واژهٔ کامل‌شده تلفظ می‌شود و در مرور ثبت می‌گردد — بیشترین برد در دور، رکورد توست!",
  },
];

/**
 * فاز G2-a — CSS ترکیدن بادکنک: scale-up + fade-out ~۴۰۰ms روی بادکنک فعال‌شده و
 * حذف آن پس از پایان انیمیشن (fill forwards → کلاس pop برداشته می‌شود و حالت
 * ترکیده می‌ماند). رعایت prefers-reduced-motion: انیمیشن حرکتی با media query
 * خاموش و به‌جایش «فلاش سادهٔ رنگ» (تیره‌شدن/چشمک opacity، بدون هیچ جابه‌جایی).
 */
const BALLOON_POP_CSS = `
@keyframes hangman-pop {
  0% { transform: scale(1); opacity: 1; }
  35% { transform: scale(1.3); opacity: 0.95; }
  100% { transform: scale(1.7); opacity: 0; }
}
@keyframes hangman-flash {
  0%, 100% { opacity: 1; }
  30% { opacity: 0.3; filter: brightness(0.5) saturate(2.5); }
  65% { opacity: 0.9; }
}
.hangman-pop { animation: hangman-pop ${POP_MS}ms ease-out forwards; }
@media (prefers-reduced-motion: reduce) {
  .hangman-pop { animation-name: hangman-flash; }
}
`;

/** واژهٔ پایه — حذف نشانه‌های دستوری داخل پرانتز: "dry (adj.)" → "dry" */
function baseWord(w: string): string {
  return w.replace(/\s*\([^)]*\)\s*/g, " ").trim();
}

export function HangmanGame() {
  const data = useBookData();
  const { bookId } = useBook();
  // بازی‌ها فقط داخل کتاب فعال رندر می‌شوند (useBookData بالا گارد است) — bookId عملاً هرگز null نیست
  const activeBookId: string = bookId ?? "";

  const [phase, setPhase] = useState<Phase>("setup");
  const [lesson, setLesson] = useState(ALL_LESSONS);
  const [count, setCount] = useState(5);

  const [deck, setDeck] = useState<WordItem[]>([]);
  const [idx, setIdx] = useState(0);
  /** حروف حدس‌زده‌شدهٔ واژهٔ جاری — ترتیب درج حفظ می‌شود (بادکنک‌ها با همین ترتیب می‌ترکند) */
  const [used, setUsed] = useState<string[]>([]);
  /** جزئیات واژه‌های تمام‌شده — مبنای آمار، Attempt و فهرست باخت‌ها */
  const [detail, setDetail] = useState<DetailRow[]>([]);
  const [secs, setSecs] = useState(0);
  const [isRecord, setIsRecord] = useState(false);
  /** پیام باکس aria-live — اعلام برد/باخت/ترکیدن بادکنک برای فناوری‌های کمکی */
  const [liveMsg, setLiveMsg] = useState("");
  /** وضعیت واژهٔ جاری: null = در حال بازی، true = برد، false = باخت */
  const [result, setResult] = useState<boolean | null>(null);
  /** فاز G2-a — ایندکس بادکنکی که همین حالا می‌ترکد (انیمیشن pop؛ پس از POP_MS پاک می‌شود) */
  const [popIdx, setPopIdx] = useState<number | null>(null);

  // فاز G2-a — توقف/ادامهٔ استاندارد کیت + نگهبان خروج + کلید صدا (الگوی پایلوت memory)
  // توقف خودکار در تب مخفی (useGamePause) — در بازگشت اورلی «متوقف شد» دیده می‌شود
  const { paused, resume, pause: pauseGame, toggle: togglePause } = useGamePause((p) => {
    if (phase === "playing") setLiveMsg(p ? "بازی متوقف شد ⏸" : "ادامهٔ بازی ▶");
  });
  const [exitAsk, setExitAsk] = useState(false);
  // الگوی memory: state بی‌صدا + همگام‌سازی با کلید سراسری و toggle در هندلر
  const [muted, setMuted] = useState(isSoundMuted());
  useEffect(() => {
    const sync = () => setMuted(isSoundMuted());
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  // فاز G2-a — آموزش یک‌بارنمایش (خودکار در setup) + راهنمای شِل حین بازی (با توقف)
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
  // فاز G2-a — تله‌متری جلسه (بدون PII: بازی/اسکوپ/مدت رُند/دلیل)
  const sessionRef = useRef<GameSessionTracker | null>(null);

  const { speed } = useVoiceSpeed();
  /** قفل double-guess — از حدس هم‌زمان (کلیک + کیبورد) و حین مکث برد/باخت جلوگیری می‌کند */
  const locked = useRef(false);
  /** نگاشت همگامِ used — گارد سنکرون مقابل keydownهای پشت‌سرهم قبل از رندر بعدی */
  const usedRef = useRef<string[]>([]);
  /** ایندکس سنکرون واژهٔ جاری — گارد کلوزر کهنه حین تعویض واژه */
  const idxRef = useRef(0);
  const timer = useRef<number | undefined>(undefined);
  /** فاز G2-a — تایمر انیمیشن ترکیدن بادکنک */
  const popTimer = useRef<number | undefined>(undefined);
  const secsRef = useRef(0);

  // رکورد شخصی این اسکوپ — snapshot عددی (پایدار برای useSyncExternalStore؛ سرور null)
  const scope = `${lesson === ALL_LESSONS ? "all" : lesson}:${count}`;
  const bestScore = useSyncExternalStore(
    subscribeGameData,
    () => {
      const b = loadBest<BestRecord>(activeBookId, GAME_KEY, scope);
      return b ? b.score : null;
    },
    () => null,
  );

  // ── تایمر ۱ثانیه‌ای — functional setState + شمارندهٔ دقیق برای Attempt ──
  // فاز G2-a — گیت روی paused: هنگام توقف (دستی یا خودکارِ تب مخفی) هیچ تیکی جلو نمی‌رود
  useEffect(() => {
    if (phase !== "playing" || paused) return;
    const t = window.setInterval(() => {
      secsRef.current += 1;
      setSecs((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(t);
  }, [phase, paused]);

  /** پاک‌سازی تایمرهای معلق دور (قفل برد/باخت + انیمیشن ترکیدن) */
  const clearRoundTimers = useCallback(() => {
    if (timer.current !== undefined) window.clearTimeout(timer.current);
    if (popTimer.current !== undefined) window.clearTimeout(popTimer.current);
    locked.current = false;
  }, []);

  // ── پاک‌سازی نهایی: تلفظ + تایمرهای معلق + ثبت «رهاشده» تله‌متری (فاز G2-a) ──
  useEffect(() => {
    return () => {
      sessionRef.current?.abandon("unmount");
      stopSpeaking();
      if (timer.current !== undefined) window.clearTimeout(timer.current);
      if (popTimer.current !== undefined) window.clearTimeout(popTimer.current);
    };
  }, []);

  /** پایان دور — استریک/جلسه/Attempt/رکورد (بیشترین برد) */
  const finish = useCallback(
    (finalDetail: DetailRow[]) => {
      const correct = finalDetail.filter((d) => d.ok).length;
      touchStreak();
      recordStudySession();
      bumpPlays(activeBookId, GAME_KEY);
      // فاز G2-a — پایان عادی جلسهٔ تله‌متری
      sessionRef.current?.end("finish");
      // فاز G2-a — بازخورد سه‌کانالهٔ پایان دور (الگوی پایلوت memory)
      playSound("finish");
      buzz("success");
      saveAttempt(activeBookId, GAME_KEY, {
        lesson: lesson === ALL_LESSONS ? 0 : lesson,
        total: deck.length,
        correct,
        duration: secsRef.current,
        detail: { words: finalDetail },
      });
      const recScope = `${lesson === ALL_LESSONS ? "all" : lesson}:${count}`;
      const prev = loadBest<BestRecord>(activeBookId, GAME_KEY, recScope);
      if (!prev || correct > prev.score) {
        saveBest<BestRecord>(activeBookId, GAME_KEY, recScope, { score: correct });
        setIsRecord(true);
        playSound("record");
        buzz("record");
        toast.success(`رکورد جدید! ${faNum(correct)} برد از ${faNum(deck.length)} 🏆`);
      } else {
        toast.success(`دور تمام شد — ${faNum(correct)} برد از ${faNum(deck.length)}`);
      }
      setPhase("done");
    },
    [activeBookId, lesson, count, deck.length],
  );

  /** ادامه به واژهٔ بعدی یا پایان دور — ریست کامل وضعیت واژه */
  const advance = useCallback(
    (nextIdx: number, finalDetail: DetailRow[]) => {
      if (nextIdx >= deck.length) {
        finish(finalDetail);
        return;
      }
      setIdx(nextIdx);
      idxRef.current = nextIdx;
      usedRef.current = [];
      setUsed([]);
      setResult(null);
    },
    [deck.length, finish],
  );

  /**
   * فاز G2-a — ترکاندن بادکنک ایندکس i با بازخورد سه‌کاناله:
   * صدا (wrong) + لرزش (error) + انیمیشن CSS pop (reduced-motion → فلاش رنگ)؛
   * پس از POP_MS انیمیشن پاک می‌شود و بادکنک حذف‌شده (حباب خط‌چین) می‌ماند.
   */
  const popBalloon = useCallback((i: number) => {
    playSound("wrong");
    buzz("error");
    setPopIdx(i);
    if (popTimer.current !== undefined) window.clearTimeout(popTimer.current);
    popTimer.current = window.setTimeout(() => setPopIdx(null), POP_MS + 20);
  }, []);

  /** حدس یک حرف — هستهٔ بازی؛ هم برای کیبورد on-screen و هم فیزیکی */
  const guessLetter = useCallback(
    (raw: string) => {
      const letter = raw.toUpperCase();
      if (!/^[A-Z]$/.test(letter)) return;
      if (locked.current || paused) return; // فاز G2-a — گیت توقف
      const current = deck[idx];
      if (!current) return;
      if (idxRef.current !== idx) return;
      // گارد سنکرون — keydown پشت‌سرهم قبل از رندر بعدی نباید دوبار ثبت شود
      if (usedRef.current.includes(letter)) return;
      const nextUsed = [...usedRef.current, letter];
      usedRef.current = nextUsed;
      setUsed(nextUsed);

      if (current.word.includes(letter)) {
        // حرف درست — حروف تکراری همه‌باهم آشکار می‌شوند (چیپ‌ها از used مشتق می‌شوند)
        if (current.word.split("").every((ch) => nextUsed.includes(ch))) {
          // فاز G2-a — باز کردن کل واژه: صدای win + لرزش record
          setLiveMsg(`درست بود! واژه «${current.word}» کامل شد 🎉`);
          locked.current = true;
          playSound("win");
          buzz("record");
          recordSRS(current.word, true);
          speak(current.word, { speed });
          const nextDetail = [...detail, { word: current.word, ok: true }];
          setDetail(nextDetail);
          setResult(true);
          timer.current = window.setTimeout(() => {
            locked.current = false;
            advance(idx + 1, nextDetail);
          }, WIN_LOCK_MS);
        } else {
          // فاز G2-a — حدس درست حرف: correct + success
          setLiveMsg(`حرف ${letter} درست بود — ادامه بده`);
          playSound("correct");
          buzz("success");
        }
      } else {
        // حرف غلط — فاز G2-a: یک بادکنک می‌ترکد (سه‌کاناله در popBalloon)
        const wrongCount = nextUsed.filter((l) => !current.word.includes(l)).length;
        popBalloon(MAX_WRONG - wrongCount);
        if (wrongCount >= MAX_WRONG) {
          // باخت واژه — متنی هم: «کلمه X بود» + wrong/error در popBalloon
          setLiveMsg(`واژه «${current.word}» بود — به مرور اضافه شد`);
          locked.current = true;
          recordSRS(current.word, false);
          const nextDetail = [...detail, { word: current.word, ok: false }];
          setDetail(nextDetail);
          setResult(false);
          timer.current = window.setTimeout(() => {
            locked.current = false;
            advance(idx + 1, nextDetail);
          }, LOSS_LOCK_MS);
        } else {
          // اعلام aria: «یک بادکنک ترکید — N جان مانده»
          setLiveMsg(`یک بادکنک ترکید — ${faNum(MAX_WRONG - wrongCount)} جان مانده`);
        }
      }
    },
    [advance, deck, detail, idx, paused, popBalloon, speed],
  );

  // ── latest-ref — آخرین نسخهٔ guessLetter برای listener پایدار کیبورد ──
  const guessRef = useRef<(letter: string) => void>(() => {});
  useEffect(() => {
    guessRef.current = guessLetter;
  });

  // ── کیبورد فیزیکی — فقط در فاز بازی؛ listener با cleanup ──
  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (/^[a-zA-Z]$/.test(e.key)) {
        guessRef.current(e.key);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  /**
   * انصراف حین دور — فاز G2-a (نگهبان خروج): با حداقل یک حدس یا پیشرفت،
   * GameExitGuard؛ بدون هیچ حدسی، خروج مستقیم + تله‌متری abandon.
   */
  const handleExitClick = useCallback(() => {
    stopSpeaking();
    if (used.length > 0 || detail.length > 0) {
      setExitAsk(true);
    } else {
      clearRoundTimers();
      // دور بدون پیشرفت هم یک جلسه است؛ همین‌جا رهاشده ثبت می‌شود
      sessionRef.current?.abandon("exit");
      resume();
      setPhase("setup");
    }
  }, [clearRoundTimers, detail.length, resume, used.length]);

  /** شروع دور — استخر فقط A-Za-z طول ۳..۱۰، یکتا با pickUnique */
  const start = useCallback(() => {
    const pool = lesson === ALL_LESSONS ? data.vocab.all : data.vocab.ofLesson(lesson);
    const eligible = pool.filter((w) => WORD_RE.test(baseWord(w.word)));
    const chosen = pickUnique(eligible, count, (w) => baseWord(w.word).toUpperCase());
    if (chosen.length < count) {
      toast.error(
        `واژهٔ کافی برای ${faNum(count)} واژه پیدا نشد — درس دیگری را امتحان کن یا تعداد را کمتر کن`,
      );
      return;
    }
    clearRoundTimers();
    usedRef.current = [];
    idxRef.current = 0;
    stopSpeaking();
    setDeck(
      chosen.map((w) => ({
        word: baseWord(w.word).toUpperCase(),
        meaning: w.meaning,
        pos: w.pos,
        lessonLabel: w.lessonLabel,
      })),
    );
    setIdx(0);
    setUsed([]);
    setDetail([]);
    setResult(null);
    setPopIdx(null);
    setSecs(0);
    secsRef.current = 0;
    setIsRecord(false);
    resume();
    setExitAsk(false);
    // فاز G2-a — جلسهٔ تازهٔ تله‌متری برای این دور
    sessionRef.current = createGameSession({
      game: GAME_KEY,
      level: `${lesson === ALL_LESSONS ? "all" : lesson}:${count}`,
    });
    sessionRef.current.start();
    setPhase("playing");
  }, [clearRoundTimers, data.vocab, lesson, count, resume]);

  // ── Setup ──
  if (phase === "setup") {
    return (
      <>
        <Card className="mx-auto max-w-xl rise-in">
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <SpellCheck size={22} />
              </span>
              <div>
                <h2 className="text-lg font-black">دارباز</h2>
                <p className="text-xs text-muted-foreground">
                  با سرنخ معنی فارسی، حرف‌به‌حرف واژه را پیدا کن — بادکنک‌هایت را نگه دار!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
              <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
              <p>
                ۶ بادکنک داری؛ هر حرف غلط یک بادکنک می‌ترکد. واژهٔ کامل = تلفظ + ثبت در مرور هوشمند،
                اما اگر ۶ بادکنک ترکید، واژه را می‌بازی و به صف مرور اضافه می‌شود.
              </p>
            </div>

            <div>
              <p className="mb-2 text-[13px] font-bold">کدام درس؟</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب درس">
                <button
                  type="button"
                  onClick={() => setLesson(ALL_LESSONS)}
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
                    onClick={() => setLesson(l.lesson)}
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

            <div>
              <p className="mb-2 text-[13px] font-bold">چند واژه در هر دور؟</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="تعداد واژه‌های دور">
                {WORD_OPTIONS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setCount(n)}
                    aria-pressed={count === n}
                    className={cn(
                      "min-h-11 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
                      count === n
                        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {faNum(n)} واژه
                  </button>
                ))}
              </div>
            </div>

            {bestScore !== null && (
              <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
                <Trophy size={12} />
                رکورد بیشترین برد: {faNum(bestScore)}
              </Badge>
            )}

            <Button size="lg" className="h-12 w-full gap-2 text-base" onClick={start}>
              <Play size={18} />
              شروع بازی
            </Button>
          </CardContent>
        </Card>
        {/* فاز G2-a — آموزش یک‌بارنمایش در اولین ورود */}
        <TutorialOverlay
          game={GAME_KEY}
          steps={TUTORIAL_STEPS}
          open={tutorialOpen}
          onOpenChange={handleTutorialOpenChange}
        />
      </>
    );
  }

  // ── Done — فاز G2-a: صفحهٔ نتیجهٔ استاندارد کیت (برد و باخت هر دو) ──
  if (phase === "done") {
    const wins = detail.filter((d) => d.ok).length;
    const losses = detail.length - wins;
    // ستاره‌بندی per-game: دور بی‌خطا = ۳ ستاره؛ دور با خطا هرگز ستارهٔ کامل نیست
    const stars = losses === 0 && detail.length > 0 ? 3 : wins > 0 ? 2 : 1;
    // واژه‌های باخته برای «مرور خطاها» — معنی فارسی از دادهٔ خود بازی
    const lostRows = detail
      .filter((d) => !d.ok)
      .map((d) => ({
        front: d.word,
        back: deck.find((w) => w.word === d.word)?.meaning ?? "",
      }));
    const title =
      wins === deck.length && deck.length > 0
        ? "همه واژه‌ها را بردی!"
        : wins === 0
          ? "کلمه‌ها این بودند!"
          : "دور تمام شد!";
    return (
      <ResultScreen
        title={title}
        stars={stars}
        isRecord={isRecord}
        errorCount={losses}
        reviewItems={lostRows}
        stats={[
          {
            label: "برد",
            value: faNum(wins),
            icon: <CheckCircle2 size={16} className="text-emerald-500" />,
          },
          {
            label: "باخت",
            value: faNum(losses),
            icon: <XCircle size={16} className="text-destructive" />,
          },
          {
            label: "زمان",
            value: fmtTime(secs),
            icon: <Timer size={16} className="text-primary" />,
          },
        ]}
        onReplay={start}
        onExit={() => setPhase("setup")}
        exitLabel="تنظیمات"
      />
    );
  }

  // ── Playing ──
  const current = deck[idx];
  const wins = detail.filter((d) => d.ok).length;
  const losses = detail.length - wins;
  const pct = Math.round((detail.length / Math.max(deck.length, 1)) * 100);
  const wrongLetters = current ? used.filter((l) => !current.word.includes(l)) : [];
  const livesLeft = MAX_WRONG - wrongLetters.length;
  const frozen = result !== null;

  return (
    <>
      {/* فاز G2-a — CSS انیمیشن ترکیدن بادکنک (+ fallback reduced-motion) */}
      <style>{BALLOON_POP_CSS}</style>
      {/* فاز G2-a — هدر یکنواخت از کیت (الگوی پایلوت memory) */}
      <GameShell
        title="دارباز"
        icon={<SpellCheck size={18} />}
        stats={
          <>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <Target size={11} className="text-amber-500" />
              واژه {faNum(idx + 1)} از {faNum(deck.length)}
            </Badge>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <Timer size={11} />
              {fmtTime(secs)}
            </Badge>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <Heart size={11} className="text-amber-500" />
              {faNum(livesLeft)} جان
            </Badge>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <MousePointerClick size={11} className="text-teal-500" />
              {faNum(used.length)} حدس
            </Badge>
            {wins > 0 && (
              <Badge variant="secondary" className="gap-1 text-[11px]">
                <CheckCircle2 size={11} className="text-primary" />
                {faNum(wins)} برد
              </Badge>
            )}
            {losses > 0 && (
              <Badge variant="outline" className="gap-1 border-destructive/40 text-[11px] text-destructive">
                <XCircle size={11} />
                {faNum(losses)} باخت
              </Badge>
            )}
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
        onMuteToggle={() => setMuted(toggleSoundMuted())}
        onHelp={handleHelp}
        onExit={handleExitClick}
      >
        <div className="relative">
          <div
            className={cn("space-y-4", paused && "pointer-events-none blur-sm")}
            aria-hidden={paused}
          >
            {/* بادکنک‌های جان */}
            <div className="rounded-2xl border bg-card px-4 pb-3 pt-4">
              <div role="group" aria-label="بادکنک‌های جان" className="flex items-end justify-center gap-1.5">
                {Array.from({ length: MAX_WRONG }, (_, i) => {
                  const popped = i >= livesLeft;
                  // فاز G2-a — بادکنکی که همین حالا انیمیشن ترکیدن را پخش می‌کند
                  const popping = popped && popIdx === i;
                  return (
                    <span
                      key={i}
                      role="img"
                      aria-label={
                        popped
                          ? `بادکنک ${faNum(i + 1)} — ترکیده`
                          : `بادکنک ${faNum(i + 1)} — سالم، ${faNum(livesLeft)} جان باقی`
                      }
                      className="relative block h-16 w-10"
                    >
                      <span
                        className={cn(
                          "absolute inset-0 transition-all duration-500",
                          BALLOON_TONES[i],
                          popping
                            ? "hangman-pop" // انیمیشن ترکیدن؛ پس از پایان، کلاس برداشته می‌شود و بادکنک حذف می‌شود
                            : popped
                              ? "scale-0 opacity-0"
                              : "scale-100 opacity-100",
                        )}
                      >
                        <svg viewBox="0 0 44 64" className="h-full w-full" aria-hidden="true">
                          <ellipse cx="22" cy="21" rx="16" ry="19" className="fill-current" />
                          <ellipse cx="15.5" cy="14" rx="4.5" ry="6.5" className="fill-white/40" />
                          <path d="M22 40 L18.5 45.5 L25.5 45.5 Z" className="fill-current opacity-75" />
                          <path
                            d="M22 45.5 C 15 51, 29 56, 22 63"
                            fill="none"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            className="stroke-current opacity-45"
                          />
                        </svg>
                      </span>
                      {/* حباب خط‌چین جای بادکنک ترکیده — بعد از پایان انیمیشن ترکیدن ظاهر می‌شود */}
                      <span
                        className={cn(
                          "absolute left-1/2 top-1.5 h-10 w-8 -translate-x-1/2 rounded-full border-2 border-dashed border-destructive/35 transition-all duration-500",
                          popped && !popping ? "scale-100 opacity-100" : "scale-0 opacity-0",
                        )}
                      />
                    </span>
                  );
                })}
              </div>
              <p className="mt-1 text-center text-[10px] font-bold text-muted-foreground">
                {livesLeft > 0
                  ? `${faNum(livesLeft)} بادکنک باقی مانده`
                  : "بادکنک‌ها تمام شد — واژه را می‌بازی!"}
              </p>
            </div>

            {/* کارت واژه */}
            {current && (
              <div className="space-y-4 rounded-2xl border bg-card p-5">
                {/* سرنخ: درس + نوع واژه + طول */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge variant="secondary" className="text-[10px]">
                      {current.lessonLabel}
                    </Badge>
                    {current.pos && (
                      <Badge
                        variant="outline"
                        dir="ltr"
                        className="border-amber-500/40 font-en text-[10px] text-amber-600 dark:text-amber-400"
                      >
                        {current.pos}
                      </Badge>
                    )}
                  </div>
                  <Badge variant="secondary" className="gap-1 text-[10px]">
                    <SpellCheck size={11} className="text-teal-500" />
                    {faNum(current.word.length)} حرف
                  </Badge>
                </div>

                {/* سرنخ اصلی: معنی فارسی */}
                <div className="rounded-xl bg-muted/50 p-3 text-center">
                  <p className="text-[10px] font-bold text-muted-foreground">معنی واژه</p>
                  <p className="mt-0.5 text-[15px] font-black leading-7">{current.meaning}</p>
                </div>

                {/* خانه‌های حروف واژه — حروف تکراری با هم آشکار می‌شوند */}
                <div
                  dir="ltr"
                  role="group"
                  aria-label="خانه‌های حروف واژه"
                  className="flex min-h-14 flex-wrap items-center justify-center gap-1.5"
                >
                  {current.word.split("").map((ch, i) => {
                    const shown = used.includes(ch) || result === false;
                    return (
                      <span
                        key={`${i}-${ch}`}
                        aria-hidden={!shown}
                        className={cn(
                          "flex h-11 w-9 items-center justify-center rounded-lg border-2 font-en text-xl font-black transition-colors",
                          shown
                            ? result === false
                              ? "match-pop border-destructive/45 bg-destructive/10 text-destructive"
                              : "match-pop border-solid border-primary/50 bg-primary/10 text-primary"
                            : "border-dashed border-muted-foreground/30",
                        )}
                      >
                        {shown ? ch : ""}
                      </span>
                    );
                  })}
                </div>

                {/* بازخورد برد/باخت */}
                {result === true && (
                  <div className="flex justify-center">
                    <Badge className="match-pop gap-1.5 border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 size={12} />
                      درست بود!
                      <span dir="ltr" className="font-en">
                        {current.word}
                      </span>
                    </Badge>
                  </div>
                )}
                {result === false && (
                  <div className="flex justify-center">
                    <Badge variant="outline" className="match-pop gap-1.5 border-destructive/50 text-destructive">
                      <PlusCircle size={12} />
                      به مرور اضافه شد
                    </Badge>
                  </div>
                )}
              </div>
            )}

            {/* کیبورد on-screen */}
            <div
              role="group"
              aria-label="کیبورد حدس حروف"
              className="mx-auto w-full max-w-sm space-y-2 rounded-2xl border bg-card p-3"
            >
              <div dir="ltr" className="space-y-1.5">
                {KB_ROWS.map((row) => (
                  <div key={row} className="flex justify-center gap-1">
                    {row.split("").map((letter) => {
                      const isUsed = used.includes(letter);
                      return (
                        <button
                          key={letter}
                          type="button"
                          onClick={() => {
                            // فاز G2-a — بازخورد کلیک حروف: صدا + لرزش، سپس نتیجهٔ حدس
                            playSound("click");
                            buzz("light");
                            guessLetter(letter);
                          }}
                          disabled={isUsed || frozen}
                          aria-label={isUsed ? `حرف ${letter} — استفاده شده` : `حدس حرف ${letter}`}
                          className={cn(
                            "min-h-11 flex-1 rounded-lg border font-en text-base font-black shadow-sm transition-all",
                            isUsed
                              ? "border-transparent bg-muted/40 opacity-30"
                              : "border-border bg-muted/50 hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-95",
                          )}
                        >
                          {letter}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
              <p className="text-center text-[10px] text-muted-foreground">
                با کیبورد فیزیکی هم می‌توانی حدس بزنی (A تا Z)
              </p>
            </div>
          </div>

          {/* فاز G2-a — اورلی توقف (الگوی پایلوت memory): محتوا تار و غیرقابل‌کلیک */}
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

        {/* فاز G2-a — نگهبان خروج استاندارد کیت */}
        <GameExitGuard
          open={exitAsk}
          onOpenChange={setExitAsk}
          onConfirm={() => {
            // فاز G2-a — رهاکردن دور نیمه‌کاره + تله‌متری
            sessionRef.current?.abandon("exit");
            clearRoundTimers();
            stopSpeaking();
            setExitAsk(false);
            resume();
            setPhase("setup");
          }}
        />
      </GameShell>
      {/* فاز G2-a — راهنمای دکمهٔ شِل (حین بازی با توقف باز می‌شود) */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
