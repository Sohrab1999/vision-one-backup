"use client";

/**
 * بازی «سازنده جمله» (Sentence Builder) — فاز ۴ نقشه راه ویژن‌وان.
 *
 * واژه‌های یک جملهٔ انگلیسی از متن خود جزوه (ریدینگ/مکالمه/مثال دیکشنری)
 * به‌هم ریخته می‌شوند؛ بازیکن با کمک ترجمهٔ فارسی جمله، آن را درست می‌چیند.
 * - مدل ایندکس‌محور tiles/slots (الگوی scramble) — واژه‌های تکراری جمله با
 *   شناسهٔ مستقل مدیریت می‌شوند و هیچ Set واژه‌ای در کار نیست.
 * - چیدن کامل: match-pop + پخش تلفظ جملهٔ کامل و رفتن به جملهٔ بعد
 * - رد کردن: بدون SRS، فقط شمارش (رکورد دور را می‌سوزاند)
 * - رکورد: سریع‌ترین دور (فقط بدون رد/راهنما) به تفکیک درس و تعداد جمله
 *
 * - فاز G2-b (کیت GameKit v2 — الگوی پایلوت memory و G2-a): GameShell +
 *   ResultScreen + آموزش ۳گامی + Pause (گیت تایمر روی paused + visibility) +
 *   نگهبان خروج + تله‌متری جلسه + صدا/لرزش سه‌کاناله.
 * - کار اختصاصی G2-b — کیبورد جابه‌جایی کلمه: روی ردیف «جملهٔ در حال ساخت»
 *   نشانگر جایگاه فعال (الگوی نشانگر سیار memory) — Tab به ردیف می‌رسد،
 *   فلش‌های ←→ واژهٔ خانهٔ فعال را با همسایه جابه‌جا می‌کنند (همسایهٔ خالی =
 *   انتقال) و Enter/Space واژه را به استخر برمی‌گرداند — دقیقاً همان رفتار
 *   کلیک روی خانهٔ پر. جابه‌جایی هیچ منطق امتیاز جدیدی نمی‌سازد؛ اگر ردیف
 *   کامل شود همان بررسیِ مشترک placeTile اجرا می‌شود.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  ArrowLeftRight,
  Blocks,
  Play,
  Trophy,
  Timer,
  CheckCircle2,
  XCircle,
  Eraser,
  Lightbulb,
  SkipForward,
  Sparkles,
  Pause,
  ListOrdered,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { BookData } from "@/data/books/types";
import { useBook, useBookData } from "@/lib/book-context";
import { touchStreak } from "@/lib/streak-store";
import { recordStudySession } from "@/lib/goal-store";
import { speak, stopSpeaking } from "@/lib/speak";
import { useVoiceSpeed } from "@/lib/voice-store";
import {
  shuffle,
  faNum,
  fmtTime,
  loadBest,
  saveBest,
  bumpPlays,
  saveAttempt,
  subscribeGameData,
} from "./shared";
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
type SentenceKind = "reading" | "conversation" | "dict";

/** یک جملهٔ بازی — متن انگلیسی + ترجمهٔ فارسی (مثال دیکشنری ترجمهٔ ثبت‌شده ندارد) */
interface SentenceItem {
  en: string;
  fa: string;
  lesson: number;
  kind: SentenceKind;
  /** برای مثال دیکشنری: واژهٔ سردرِمدخل */
  src?: string;
}

/** واژه با شناسهٔ یکتا — واژه‌های تکراری مستقل مدیریت می‌شوند (اینکس‌محور) */
interface Tile {
  id: number;
  word: string;
}

/** شکل رکورد شخصی این بازی — سریع‌ترین دور کامل */
interface BestRec {
  time: number;
}

const ALL_LESSONS = -1;
const GAME_KEY = "sentence-builder";
const COUNT_OPTIONS = [3, 5];
/** بازهٔ تعداد واژه در حالت عادی */
const MIN_WORDS = 4;
const MAX_WORDS = 12;
/** اگر جمله‌های بازهٔ عادی کمتر از این شد، بازه گسترده می‌شود */
const WIDEN_THRESHOLD = 10;
const MIN_WORDS_WIDE = 3;
const MAX_WORDS_WIDE = 16;
/** مکث پس از چیدن کامل جمله (ms) */
const SOLVE_LOCK_MS = 700;
/** مکث پس از رد کردن (ms) */
const SKIP_LOCK_MS = 400;

const KIND_LABEL: Record<SentenceKind, string> = {
  reading: "ریدینگ",
  conversation: "مکالمه",
  dict: "دیکشنری",
};

/**
 * واژهٔ مجاز: فقط حروف/رقم/آندرلاین + آپاستروف، با حداکثر یک نقطه/کاما/علامت
 * سؤال پایانی — جمله‌های دارای dash خاص یا گیومهٔ تایپوگرافی حذف می‌شوند.
 */
const WORD_OK = /^[\w']+[.,?]?$/;

/** آموزش ۳-گامی استاندارد (فاز G1-08) — قدم دوم شامل کلیدهای فلش (کار اختصاصی G2-b) */
const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <Blocks size={24} />,
    title: "از روی ترجمه بچین",
    text: "واژه‌های به‌هم‌ریخته را به ترتیب بزن تا جملهٔ انگلیسی ساخته شود؛ ترجمهٔ فارسی از ابتدا نمایان است.",
  },
  {
    icon: <ArrowLeftRight size={24} />,
    title: "جابه‌جایی با کیبورد",
    text: "با Tab روی ردیف جمله بایست و با فلش‌ها واژه‌ای را انتخاب کن؛ ←→ واژهٔ انتخاب‌شده را با همسایه‌اش جابه‌جا می‌کند و Enter آن را به استخر برمی‌گرداند. Backspace هم آخرین واژه را برمی‌گرداند.",
  },
  {
    icon: <Trophy size={24} />,
    title: "سریع‌ترین دور = رکورد",
    text: "رد کردن یا راهنما رکورد را می‌سوزاند — رکورد: سریع‌ترین دور کامل بدون رد و راهنما!",
  },
];

/** استخر جمله‌های یک محدوده — با سنجش بازهٔ واژه و یکتاسازی متن */
function buildPool(
  data: BookData,
  lesson: number,
  minW: number,
  maxW: number,
): SentenceItem[] {
  const seen = new Set<string>();
  const items: SentenceItem[] = [];
  const push = (en: string, fa: string, lessonNo: number, kind: SentenceKind, src?: string) => {
    const text = en.trim();
    if (!text) return;
    const words = text.split(/\s+/);
    if (words.length < minW || words.length > maxW) return;
    for (const w of words) {
      if (!WORD_OK.test(w)) return;
    }
    const key = text.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    items.push({ en: text, fa: fa.trim(), lesson: lessonNo, kind, src });
  };
  const inScope = (l: number) => lesson === ALL_LESSONS || l === lesson;

  for (const r of data.readings) {
    if (!inScope(r.lesson)) continue;
    for (const p of r.paragraphs) push(p.en, p.fa, r.lesson, "reading");
  }
  for (const c of data.conversations) {
    if (!inScope(c.lesson)) continue;
    for (const line of c.lines) push(line.en, line.fa, c.lesson, "conversation");
  }
  for (const d of data.dictionary) {
    if (!inScope(d.lesson)) continue;
    for (const ex of d.examples) push(ex, "", d.lesson, "dict", d.word);
  }
  return items;
}

export function SentenceBuilderGame() {
  const data = useBookData();
  const { bookId } = useBook();
  // بازی فقط داخل کتاب فعال رندر می‌شود (useBookData بالا تضمینش می‌کند) — در عمل هرگز تهی نیست
  const activeBookId: string = bookId ?? "";
  const { speed } = useVoiceSpeed();

  const [phase, setPhase] = useState<Phase>("setup");
  const [lesson, setLesson] = useState<number>(ALL_LESSONS);
  const [count, setCount] = useState<number>(3);

  const [deck, setDeck] = useState<SentenceItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [words, setWords] = useState<string[]>([]);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [slots, setSlots] = useState<(number | null)[]>([]);

  const [solved, setSolved] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [hinted, setHinted] = useState(0);
  const [secs, setSecs] = useState(0);
  const [isRecord, setIsRecord] = useState(false);

  /** انیمیشن match-pop روی ردیف جمله هنگام چیدن کامل درست */
  const [pop, setPop] = useState(false);

  /** فاز G2-b — جمله‌های مشکل‌دار دور (چیدمان نادرست کامل یا ردشده) برای «مرور خطاها» */
  const [missedWords, setMissedWords] = useState<{ front: string; back: string }[]>([]);
  /** پیام باکس aria-live مرکزی شِل — اعلام بازخورد سه‌کاناله برای فناوری‌های کمکی */
  const [liveMsg, setLiveMsg] = useState("");
  /**
   * فاز G2-b — کار اختصاصی: نشانگر جایگاه فعال ردیف ساخت برای کیبورد ←→.
   * null یعنی هنوز با فلش وارد ردیف نشده؛ اولین فلش روی اولین واژهٔ چیده‌شده می‌ایستد.
   */
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  /** ریشهٔ ردیف ساخت برای گارد اسکرول (واژهٔ نشانگرشده در دید بماند) */
  const rowRef = useRef<HTMLDivElement | null>(null);

  const locked = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const secsRef = useRef(0);

  const busy = pop;

  // فاز G2-b — توقف/ادامهٔ استاندارد + نگهبان خروج + کلید صدا/لرزش (الگوی پایلوت memory)
  // توقف خودکار در تب مخفی: در بازگشت اورلی «متوقف شد» دیده می‌شود و خود کاربر ادامه می‌دهد
  const { paused, resume, pause: pauseGame, toggle: togglePause } = useGamePause((p) => {
    if (phase === "playing") setLiveMsg(p ? "بازی متوقف شد ⏸" : "ادامهٔ بازی ▶");
  });
  const [exitAsk, setExitAsk] = useState(false);
  const [muted, setMuted] = useState(isSoundMuted());
  // فاز G1-08 — آموزش یک‌بارنمایش (خودکار در setup) + راهنمای شِل حین بازی (با توقف)
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
  // فاز G1-10 — تله‌متری جلسه (بدون PII: بازی/اسکوپ/مدت رُند/دلیل)
  const sessionRef = useRef<GameSessionTracker | null>(null);

  // استخر جملهٔ محدودهٔ انتخابی — اگر بازهٔ عادی کم آمد، بازهٔ واژه گسترده می‌شود
  const poolInfo = useMemo<{ items: SentenceItem[]; widened: boolean }>(() => {
    const base = buildPool(data, lesson, MIN_WORDS, MAX_WORDS);
    if (base.length >= WIDEN_THRESHOLD) return { items: base, widened: false };
    return { items: buildPool(data, lesson, MIN_WORDS_WIDE, MAX_WORDS_WIDE), widened: true };
  }, [data, lesson]);

  // رکورد شخصی — snapshot عددی (پایدار برای useSyncExternalStore؛ سرور null)
  const scope = `${lesson === ALL_LESSONS ? "all" : lesson}:${count}`;
  const best = useSyncExternalStore(
    subscribeGameData,
    () => {
      const b = loadBest<BestRec>(activeBookId, GAME_KEY, scope);
      return b ? b.time : null;
    },
    () => null,
  );

  // ── تایمر (functional) + شمارندهٔ دقیق برای رکورد ──
  // فاز G2-b — گیت روی paused + گارد visibilitychange/pageshow: زمان (ملاک رکورد)
  // در تب مخفی نمی‌سوزد و با بازگشت از همان secsRef افزایشی ادامه می‌یابد
  useEffect(() => {
    if (phase !== "playing" || paused) return;
    let t: number | null = null;
    const startTimer = () => {
      if (t !== null) return;
      t = window.setInterval(() => {
        secsRef.current += 1;
        setSecs((s) => s + 1);
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
      stopTimer(); // interval تازه می‌شود تا تیک معوقِ دورهٔ انجماد یک‌جا شمرده نشود
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

  // ── پاک‌سازی نهایی: تلفظ + تایمر معلق + جلسهٔ تله‌متری ──
  useEffect(() => {
    return () => {
      stopSpeaking();
      sessionRef.current?.abandon("unmount");
      if (timer.current !== undefined) window.clearTimeout(timer.current);
    };
  }, []);

  /** بارگذاری جملهٔ بعدی — واژه‌های به‌هم‌ریخته + خانه‌های خالی */
  const loadSentence = useCallback((item: SentenceItem) => {
    const ws = item.en.trim().split(/\s+/);
    setWords(ws);
    setTiles(shuffle(ws.map((word, i) => ({ id: i, word }))));
    setSlots(Array.from({ length: ws.length }, () => null as number | null));
    setPop(false);
    setActiveSlot(null); // فاز G2-b — نشانگر کیبورد برای جملهٔ تازه از نو
  }, []);

  /** فاز G2-b — ثبت جملهٔ مشکل‌دار برای «مرور خطاها»ی صفحهٔ نتیجه (بدون تکرار) */
  const rememberMissed = useCallback((item: SentenceItem) => {
    setMissedWords((prev) =>
      prev.some((m) => m.front === item.en)
        ? prev
        : [
            ...prev,
            {
              front: item.en,
              back: item.fa || (item.src ? `مثالِ واژهٔ ${item.src}` : "بدون ترجمه"),
            },
          ],
    );
  }, []);

  /** پایان دور — استریک/جلسه/Attempt/رکورد */
  const finishRun = useCallback(
    (finalSolved: number) => {
      touchStreak();
      recordStudySession();
      bumpPlays(activeBookId, GAME_KEY);
      // فاز G1-10 — پایان عادی جلسه
      sessionRef.current?.end("finish");
      // فاز G2-b — بازخورد سه‌کانالهٔ پایان دور (صدا + لرزش + صفحهٔ نتیجه)
      playSound("finish");
      buzz("success");
      saveAttempt(activeBookId, GAME_KEY, {
        lesson: lesson === ALL_LESSONS ? 0 : lesson,
        total: deck.length,
        correct: finalSolved,
        duration: secsRef.current,
        detail: { hints: hinted, skipped },
      });
      // رکورد فقط برای دورِ کاملِ بدون رد کردن و بدون راهنما
      if (skipped === 0 && hinted === 0) {
        const recScope = `${lesson === ALL_LESSONS ? "all" : lesson}:${count}`;
        const prev = loadBest<BestRec>(activeBookId, GAME_KEY, recScope);
        if (!prev || secsRef.current < prev.time) {
          saveBest<BestRec>(activeBookId, GAME_KEY, recScope, { time: secsRef.current });
          setIsRecord(true);
          // فاز G2-b — بازخورد رکورد (توست/کانفتی خودش از مسیر saveBest می‌آید)
          playSound("record");
          buzz("record");
        }
      }
      setSecs(secsRef.current);
      setPhase("done");
    },
    [activeBookId, lesson, count, deck.length, hinted, skipped],
  );

  /** ادامه به جملهٔ بعد یا پایان دور */
  const advanceOrFinish = useCallback(
    (nextIdx: number, finalSolved: number) => {
      if (nextIdx >= deck.length) {
        finishRun(finalSolved);
        return;
      }
      setIdx(nextIdx);
      loadSentence(deck[nextIdx]);
    },
    [deck, loadSentence, finishRun],
  );

  /** چیدن کامل درست — پاپ + تلفظ جملهٔ کامل و بعد جملهٔ بعد */
  const solveSentence = useCallback(
    (item: SentenceItem, finalSolved: number) => {
      locked.current = true;
      setPop(true);
      // فاز G2-b — بازخورد سه‌کانالهٔ جملهٔ درست
      playSound("correct");
      buzz("success");
      setLiveMsg("جمله کامل شد — درست بود! 🎉");
      speak(item.en, { speed });
      timer.current = window.setTimeout(() => {
        locked.current = false;
        setPop(false);
        advanceOrFinish(idx + 1, finalSolved);
      }, SOLVE_LOCK_MS);
    },
    [speed, idx, advanceOrFinish],
  );

  /**
   * بررسی چیدن کامل — مشترک placeTile و swapAt (فاز G2-b):
   * همهٔ خانه‌ها پر و ترتیب درست بود → حل (همان منطق قبلی، بدون امتیاز جدید)
   */
  const completeIfSolved = useCallback(
    (nextSlots: (number | null)[]) => {
      if (!nextSlots.every((s) => s !== null)) return false;
      const attempt = nextSlots.map((s) => tiles.find((t) => t.id === s)?.word ?? "");
      if (!attempt.every((w, i) => w === words[i])) return false;
      const current = deck[idx];
      if (!current) return false;
      const finalSolved = solved + 1;
      setSolved(finalSolved);
      solveSentence(current, finalSolved);
      return true;
    },
    [tiles, words, deck, idx, solved, solveSentence],
  );

  /** واژهٔ یک توکن از استخر — برای پیام‌های aria-live */
  const wordOfById = useCallback((id: number) => tiles.find((t) => t.id === id)?.word ?? "", [tiles]);

  /**
   * گذاشتن یک واژه از استخر در اولین خانهٔ خالی + بررسی چیدن کامل.
   * فاز G2-b — `msgOverride`: پیام اختصاصی (راهنما) وقتی چیدن کامل نشود.
   */
  const placeTile = useCallback(
    (tileId: number, msgOverride?: string) => {
      if (locked.current || paused) return;
      const current = deck[idx];
      if (!current) return;
      const empty = slots.indexOf(null);
      if (empty === -1) return;
      const tile = tiles.find((t) => t.id === tileId);
      if (!tile) return;
      const nextSlots = [...slots];
      nextSlots[empty] = tileId;
      setSlots(nextSlots);
      const full = nextSlots.every((s) => s !== null);
      if (full && completeIfSolved(nextSlots)) return; // حل شد — صدای correct داخل solveSentence
      if (full) {
        // فاز G2-b — بازخورد سه‌کانالهٔ چیدمان نادرست (بدون تغییر امتیاز؛ ردیف پر می‌ماند)
        playSound("wrong");
        buzz("error");
        setLiveMsg("چیدمان درست نیست — واژه‌ها را بردار یا با فلش‌ها جابه‌جا کن");
        rememberMissed(current);
        return;
      }
      // فاز G2-b — بازخورد کلیک/جابه‌جایی واژه
      playSound("click");
      buzz("light");
      setLiveMsg(msgOverride ?? `واژه ${tile.word} در جایگاه ${faNum(empty + 1)} گذاشته شد`);
    },
    [paused, deck, idx, slots, tiles, completeIfSolved, rememberMissed],
  );

  /** برگرداندن واژهٔ یک خانه به استخر (کلیک روی خانهٔ پر یا Enter کیبورد) */
  const returnAt = useCallback(
    (index: number) => {
      if (locked.current || paused) return;
      const tileId = slots[index];
      if (tileId === null) return;
      setSlots((prev) => {
        const next = [...prev];
        next[index] = null;
        return next;
      });
      playSound("click");
      buzz("light");
      setLiveMsg(`واژه ${wordOfById(tileId)} به استخر برگشت`);
    },
    [paused, slots, wordOfById],
  );

  /** پاک کردن آخرین واژه (دکمه یا Backspace) */
  const returnLast = useCallback(() => {
    if (locked.current || paused) return;
    let last = -1;
    for (let i = slots.length - 1; i >= 0; i--) {
      if (slots[i] !== null) {
        last = i;
        break;
      }
    }
    if (last === -1) return;
    const tileId = slots[last] as number;
    setSlots((prev) => {
      const next = [...prev];
      next[last] = null;
      return next;
    });
    playSound("click");
    buzz("light");
    setLiveMsg(`واژه ${wordOfById(tileId)} به استخر برگشت`);
  }, [paused, slots, wordOfById]);

  /** پاک کردن همه — همهٔ واژه‌ها به استخر برمی‌گردند */
  const clearAll = useCallback(() => {
    if (locked.current || paused) return;
    if (!slots.some((s) => s !== null)) return;
    setSlots((prev) => prev.map(() => null));
    playSound("click");
    buzz("light");
    setLiveMsg("همه واژه‌ها به استخر برگشتند");
  }, [paused, slots]);

  /** راهنمای دوم — یک واژهٔ درستِ بعدی را جای‌گذاری می‌کند (رکورد دور می‌سوزد) */
  const applyHint = useCallback(() => {
    if (locked.current || paused) return;
    const empty = slots.indexOf(null);
    if (empty === -1) return;
    const used = new Set(slots.filter((s): s is number => s !== null));
    const tile = tiles.find((t) => !used.has(t.id) && t.word === words[empty]);
    if (!tile) return;
    setHinted((h) => h + 1);
    // اگر راهنما جمله را کامل کند، پیام حل جایگزین پیام راهنما می‌شود
    placeTile(tile.id, "راهنما فعال شد — رکورد این دور می‌سوزد");
  }, [paused, slots, tiles, words, placeTile]);

  /** رد کردن — بدون SRS، فقط شمارش و جملهٔ بعد (رکورد دور می‌سوزاند) */
  const skipSentence = useCallback(() => {
    if (locked.current || paused) return;
    const current = deck[idx];
    if (!current) return;
    locked.current = true;
    setSkipped((s) => s + 1);
    // فاز G2-b — جملهٔ ردشده برای مرور خطاها + بازخورد
    rememberMissed(current);
    playSound("click");
    buzz("light");
    setLiveMsg("جمله رد شد — جملهٔ بعدی");
    timer.current = window.setTimeout(() => {
      locked.current = false;
      advanceOrFinish(idx + 1, solved);
    }, SKIP_LOCK_MS);
  }, [paused, deck, idx, solved, advanceOrFinish, rememberMissed]);

  /**
   * فاز G2-b — کار اختصاصی: جابه‌جایی واژهٔ خانهٔ فعال با همسایه (الگوی swap).
   * همسایهٔ پر = جابه‌جایی دو واژه؛ همسایهٔ خالی = انتقال واژه به آن خانه.
   * هیچ منطق امتیاز جدیدی نیست — فقط ترتیب slots عوض می‌شود و اگر ردیف کامل
   * شود همان بررسیِ مشترک placeTile اجرا می‌شود.
   */
  const swapAt = useCallback(
    (i: number, dir: -1 | 1) => {
      if (locked.current || paused) return;
      const j = i + dir;
      if (j < 0 || j >= slots.length) return;
      const a = slots[i];
      if (a === null) return; // واژه‌ای برای جابه‌جایی نیست
      const next = [...slots];
      next[i] = slots[j];
      next[j] = a;
      setSlots(next);
      setActiveSlot(j); // نشانگر واژهٔ جابه‌جاشده را دنبال می‌کند
      playSound("click");
      buzz("light");
      setLiveMsg(`واژه ${wordOfById(a)} به جایگاه ${faNum(j + 1)} منتقل شد`);
      completeIfSolved(next); // ردیف کامل و درست شد؟ حل — بدون منطق جدید
    },
    [paused, slots, completeIfSolved, wordOfById],
  );

  /** شروع دور — انتخاب جمله‌ها از استخر (اگر کم بود، تکرار با shuffle مجاز است) */
  const start = useCallback(() => {
    const items = poolInfo.items;
    if (items.length === 0) {
      toast.error("جملهٔ قابل بازی در این محدوده پیدا نشد — درس دیگری را امتحان کن");
      return;
    }
    const picked: SentenceItem[] = [];
    while (picked.length < count) {
      const batch = shuffle(items).slice(0, Math.min(count - picked.length, items.length));
      picked.push(...batch);
    }
    if (timer.current !== undefined) window.clearTimeout(timer.current);
    locked.current = false;
    secsRef.current = 0;
    setDeck(picked);
    setIdx(0);
    setSolved(0);
    setSkipped(0);
    setHinted(0);
    setSecs(0);
    setIsRecord(false);
    setMissedWords([]);
    setExitAsk(false);
    resume();
    loadSentence(picked[0]); // نشانگر کیبورد را هم از نو می‌کند
    // فاز G1-10 — جلسهٔ تازهٔ تله‌متری برای این دور
    sessionRef.current = createGameSession({
      game: GAME_KEY,
      level: `${lesson === ALL_LESSONS ? "all" : lesson}:${count}`,
    });
    sessionRef.current.start();
    setPhase("playing");
  }, [poolInfo, count, loadSentence, resume, lesson]);

  /**
   * فاز G2-b — کیبورد ردیف ساخت (کار اختصاصی G2-b): نشانگر جایگاه فعال روی wrapper
   * (الگوی نشانگر سیار memory — دکمه‌های واژه از ترتیب Tab خارج‌اند):
   *  - ←→ : واژهٔ خانهٔ فعال را با همسایه جابه‌جا می‌کند (همسایهٔ خالی = انتقال)؛
   *    روی خانهٔ خالی فقط نشانگر جابه‌جا می‌شود
   *  - Enter/Space : واژهٔ خانهٔ فعال را به استخر برمی‌گرداند (همان کلیک خانهٔ پر)
   * گاردها: paused / locked / دیالوگ باز (آموزش یا نگهبان خروج)
   */
  const handleRowKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (paused || exitAsk || tutorialOpen || locked.current) return;
      const key = e.key;

      if (key === "Enter" || key === " ") {
        e.preventDefault(); // مهار فعال‌سازی دوبارهٔ native و مهار اسکرول Space
        if (activeSlot === null) return;
        if (slots[activeSlot] === null) return;
        returnAt(activeSlot);
        return;
      }

      if (key !== "ArrowLeft" && key !== "ArrowRight") return;
      e.preventDefault(); // فلش‌ها نباید صفحه را اسکرول کنند
      if (activeSlot === null) {
        // ورود اول با کیبورد — اولین واژهٔ چیده‌شده (یا خانهٔ اول اگر ردیف خالی است)
        const firstFilled = slots.findIndex((s) => s !== null);
        const base = firstFilled === -1 ? 0 : firstFilled;
        setActiveSlot(base);
        const id = slots[base];
        setLiveMsg(
          id !== null
            ? `واژه ${wordOfById(id)} انتخاب شد — جایگاه ${faNum(base + 1)}`
            : `جایگاه ${faNum(base + 1)}`,
        );
        return;
      }
      const dir = key === "ArrowRight" ? 1 : -1;
      const next = activeSlot + dir;
      if (next < 0 || next >= slots.length) return; // گارد مرز ردیف
      if (slots[activeSlot] !== null) {
        // واژهٔ فعال — جابه‌جایی با همسایه (همان الگوی دکمه‌های واژه، بدون امتیاز جدید)
        swapAt(activeSlot, dir);
      } else {
        // نشانگر روی خانهٔ خالی — فقط جابه‌جایی نشانگر
        setActiveSlot(next);
        const id = slots[next];
        setLiveMsg(
          id !== null
            ? `جایگاه ${faNum(next + 1)} — واژه ${wordOfById(id)}`
            : `جایگاه ${faNum(next + 1)}`,
        );
      }
    },
    [paused, exitAsk, tutorialOpen, activeSlot, slots, returnAt, swapAt, wordOfById],
  );

  // فاز G2-b — گارد اسکرول: واژهٔ نشانگرشده همیشه در دید بماند (block: nearest = بدون پرش)
  useEffect(() => {
    if (activeSlot === null) return;
    rowRef.current
      ?.querySelector<HTMLButtonElement>('button[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [activeSlot]);

  // ── کیبورد (latest-ref): Backspace آخرین واژهٔ چیده‌شده را برمی‌گرداند ──
  // فاز G2-b — گارد توقف و دیالوگ‌ها: حین اورلی توقف/نگهبان/آموزش، کلید بی‌اثر است
  const returnLastRef = useRef<() => void>(() => {});
  useEffect(() => {
    returnLastRef.current = returnLast;
  });
  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (paused || exitAsk || tutorialOpen) return;
      if (e.key === "Backspace") {
        e.preventDefault();
        returnLastRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, paused, exitAsk, tutorialOpen]);

  // انصراف حین دور — با پیشرفت، نگهبان خروج؛ بدون پیشرفت، خروج مستقیم
  const handleExitClick = useCallback(() => {
    // تایمر معلق (قفل حل/رد) پاک شود تا بعد از خروج، advance پشت‌صحنه رخ ندهد
    if (timer.current !== undefined) {
      window.clearTimeout(timer.current);
      timer.current = undefined;
    }
    locked.current = false;
    stopSpeaking();
    // نگهبان خروج (فاز G1-04) — هر واژهٔ چیده‌شده یا جملهٔ حل/ردشده یعنی دور نیمه‌کاره
    const progressed = slots.some((s) => s !== null) || solved > 0 || skipped > 0 || hinted > 0;
    if (progressed) {
      setExitAsk(true);
    } else {
      // فاز G1-10 — دور بدون پیشرفت هم یک جلسه است؛ همین‌جا رهاشده ثبت می‌شود
      sessionRef.current?.abandon("exit");
      setPhase("setup");
    }
  }, [slots, solved, skipped, hinted]);

  const current = deck[idx];
  const usedIds = new Set(slots.filter((s): s is number => s !== null));
  const pct = Math.round(((solved + skipped) / Math.max(deck.length, 1)) * 100);

  // ── Setup ──
  if (phase === "setup") {
    return (
      <>
        <Card className="mx-auto max-w-xl rise-in">
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400">
                <Blocks size={22} />
              </span>
              <div>
                <h2 className="text-lg font-black">سازندهٔ جمله</h2>
                <p className="text-xs text-muted-foreground">
                  واژه‌های جمله به‌هم ریخته‌اند — از روی ترجمه، جمله را درست بچین!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
              <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
              <p>
                روی واژه‌ها به ترتیب بزن تا جملهٔ انگلیسی ساخته شود؛ ترجمهٔ فارسی از ابتدا نمایان است.
                با فلش‌های ←→ روی ردیف جمله می‌توانی واژه‌ها را جابه‌جا کنی.
                رد کردن یا راهنما رکورد را می‌سوزاند — رکورد: سریع‌ترین دور کامل!
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
                  کل کتاب
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
              <p className="mb-2 text-[13px] font-bold">چند جمله؟</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="تعداد جمله‌ها">
                {COUNT_OPTIONS.map((n) => (
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
                    {faNum(n)} جمله
                  </button>
                ))}
              </div>
            </div>

            <p className="text-center text-[11px] text-muted-foreground">
              استخر این محدوده: <span className="font-black text-foreground">{faNum(poolInfo.items.length)}</span>{" "}
              جملهٔ {poolInfo.widened ? "۳ تا ۱۶ واژه‌ای" : "۴ تا ۱۲ واژه‌ای"}
              {poolInfo.widened && " (بازه گسترده شد)"}
            </p>

            {best !== null && (
              <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
                <Trophy size={12} />
                سریع‌ترین دور: {fmtTime(best)}
              </Badge>
            )}

            <Button size="lg" className="h-12 w-full gap-2 text-base" onClick={start}>
              <Play size={18} />
              شروع بازی
            </Button>
          </CardContent>
        </Card>
        {/* فاز G1-08 — آموزش یک‌بارنمایش در اولین ورود */}
        <TutorialOverlay
          game={GAME_KEY}
          steps={TUTORIAL_STEPS}
          open={tutorialOpen}
          onOpenChange={handleTutorialOpenChange}
        />
      </>
    );
  }

  // ── Done ──
  if (phase === "done") {
    // ستاره‌بندی per-game (فاز G1-06): سهم جمله‌های حل‌شدهٔ دور
    const acc = Math.round((solved / Math.max(deck.length, 1)) * 100);
    const stars = acc >= 90 ? 3 : acc >= 65 ? 2 : 1;
    return (
      <ResultScreen
        title="همه جمله‌ها چیده شد!"
        stars={stars}
        isRecord={isRecord}
        errorCount={missedWords.length}
        reviewItems={missedWords}
        stats={[
          { label: "زمان", value: fmtTime(secs), icon: <Timer size={16} className="text-primary" /> },
          { label: "درست", value: faNum(solved), icon: <CheckCircle2 size={16} className="text-emerald-500" /> },
          { label: "ردشده", value: faNum(skipped), icon: <XCircle size={16} className="text-amber-500" /> },
        ]}
        onReplay={start}
        onExit={() => setPhase("setup")}
      />
    );
  }

  // ── Playing ──
  return (
    <>
      {/* فاز G2-b — هدر یکنواخت از کیت: نام + بج‌ها + راهنما/توقف/صدا/انصراف */}
      <GameShell
        title="سازندهٔ جمله"
        icon={<Blocks size={18} />}
        stats={
          <>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <ListOrdered size={11} className="text-teal-500" />
              جمله {faNum(idx + 1)} از {faNum(deck.length)}
            </Badge>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <Timer size={11} />
              {fmtTime(secs)}
            </Badge>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <CheckCircle2 size={11} className="text-primary" />
              {faNum(solved)} درست
            </Badge>
            {skipped > 0 && (
              <Badge variant="outline" className="gap-1 border-destructive/40 text-[11px] text-destructive">
                <XCircle size={11} />
                {faNum(skipped)} ردشده
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
            {/* کارت جمله */}
            {current && (
              <div className="space-y-5 rounded-2xl border bg-card p-5 sm:p-6">
                {/* ردیف متا */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge variant="secondary" className="text-[10px]">
                      {KIND_LABEL[current.kind]}
                    </Badge>
                    {current.lesson > 0 && (
                      <Badge variant="outline" className="text-[10px]">
                        درس {faNum(current.lesson)}
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-[10px]">
                      {faNum(words.length)} واژه
                    </Badge>
                  </div>
                </div>

                {/* سرنخ اصلی — ترجمهٔ فارسی جمله (از ابتدا نمایان) */}
                <div className="rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-center">
                  <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                    ترجمهٔ جمله — از روی معنی بچین
                  </p>
                  {current.fa ? (
                    <p className="mt-1 text-[14px] font-black leading-7">{current.fa}</p>
                  ) : (
                    <p className="mt-1 text-[12px] font-bold leading-6 text-muted-foreground">
                      برای این مثال ترجمه‌ای ثبت نشده
                      {current.src && (
                        <>
                          {" "}— مثالِ واژهٔ{" "}
                          <span dir="ltr" className="font-en text-[13px] font-black text-foreground">
                            {current.src}
                          </span>
                        </>
                      )}
                    </p>
                  )}
                </div>

                {/* ردیف جمله — خانه‌های چیدمان (LTR)
                    فاز G2-b — wrapper تاب‌پذیر ردیف ساخت: نقطهٔ ورود Tab + هندلر ←→/Enter/Space */}
                <div
                  ref={rowRef}
                  dir="ltr"
                  role="group"
                  aria-label="جملهٔ در حال ساخت — با فلش‌های چپ و راست واژهٔ انتخابی را با همسایه‌اش جابه‌جا کن و با Enter به استخر برگردان"
                  aria-keyshortcuts="ArrowLeft ArrowRight Enter Space"
                  tabIndex={paused ? -1 : 0}
                  onKeyDown={handleRowKeyDown}
                  className={cn(
                    "flex min-h-14 flex-wrap items-center justify-center gap-1.5",
                    pop && "match-pop",
                  )}
                >
                  {slots.map((slotId, i) =>
                    slotId === null ? (
                      <div
                        key={`slot-${i}`}
                        className="h-11 min-w-16 rounded-xl border-2 border-dashed border-muted-foreground/30"
                      />
                    ) : (
                      <button
                        key={`slot-${i}`}
                        type="button"
                        tabIndex={-1}
                        onClick={() => {
                          // فاز G2-b — همگام‌سازی نشانگر کیبورد با لمس/کلیک (همان رفتار برگشت واژه)
                          setActiveSlot(i);
                          returnAt(i);
                        }}
                        disabled={busy}
                        aria-label={`برگشت واژه ${wordOfById(slotId)} به استخر — جایگاه ${faNum(i + 1)}`}
                        aria-keyshortcuts="Enter Space"
                        data-active={i === activeSlot ? "true" : undefined}
                        className={cn(
                          "h-11 rounded-xl border-2 border-primary/40 bg-primary/10 px-3 font-en text-[13px] font-black text-primary transition-all hover:border-primary/70 hover:bg-primary/20 disabled:pointer-events-none disabled:opacity-60 sm:text-[15px]",
                          i === activeSlot && "ring-2 ring-amber-400 ring-offset-1",
                        )}
                      >
                        {wordOfById(slotId)}
                      </button>
                    ),
                  )}
                </div>

                {/* استخر واژه‌ها */}
                <div dir="ltr" className="flex flex-wrap items-center justify-center gap-2">
                  {tiles.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => placeTile(t.id)}
                      disabled={usedIds.has(t.id) || busy}
                      aria-label={`جای‌گذاری واژه ${t.word}`}
                      aria-keyshortcuts="Enter"
                      className={cn(
                        "h-11 min-h-11 rounded-xl border bg-card px-3 font-en text-[13px] font-black shadow-sm transition-all sm:text-[15px]",
                        "hover:border-primary/50 hover:bg-primary/5",
                        "disabled:pointer-events-none disabled:opacity-25",
                      )}
                    >
                      {t.word}
                    </button>
                  ))}
                </div>

                {/* دکمه‌های کمکی */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={clearAll}
                    disabled={busy}
                    className="min-h-11 flex-1 gap-1.5 text-[12px]"
                  >
                    <Eraser size={15} />
                    پاک کردن
                  </Button>
                  <Button
                    variant="outline"
                    onClick={applyHint}
                    disabled={busy}
                    className="min-h-11 flex-1 gap-1.5 border-amber-500/40 text-[12px] text-amber-600 hover:bg-amber-500/10 hover:text-amber-600 dark:text-amber-400"
                  >
                    <Lightbulb size={15} />
                    راهنما
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={skipSentence}
                    disabled={busy}
                    className="min-h-11 flex-1 gap-1.5 text-[12px] text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <SkipForward size={15} />
                    رد کردن
                  </Button>
                </div>

                <p className="text-center text-[10px] text-muted-foreground">
                  کیبورد: فلش‌های ←→ واژهٔ انتخابی را جابه‌جا می‌کنند · Enter واژه را به استخر برمی‌گرداند · Backspace
                  آخرین واژه را برمی‌گرداند
                </p>
              </div>
            )}
          </div>

          {/* فاز G2-b — اورلی توقف: کارت تار و غیرقابل‌کلیک؛ اعلام متنی در liveMsg سراسری */}
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

        {/* فاز G2-b — نگهبان خروج استاندارد کیت */}
        <GameExitGuard
          open={exitAsk}
          onOpenChange={setExitAsk}
          onConfirm={() => {
            // فاز G1-10 — رهاکردن دور نیمه‌کاره
            sessionRef.current?.abandon("exit");
            stopSpeaking();
            setExitAsk(false);
            resume();
            setPhase("setup");
          }}
        />
      </GameShell>
      {/* فاز G2-b — راهنمای دکمهٔ شِل (حین بازی با توقف باز می‌شود) */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
