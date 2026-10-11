"use client";

/**
 * بازی «حروف جابه‌جا» (Word Scramble) — فاز ۳ نقشه راه جامع ۲۰۲۶ + مهاجرت GameKit v2 (فاز G2-a-2).
 *
 * حروف واژه‌های انگلیسی به‌هم ریخته می‌شوند؛ بازیکن با معنی فارسی حروف را
 * با کلیک (یا کیبورد) سر جای خودش می‌چیند.
 * - حل درست: recordSRS(✓) + پخش تلفظ + بازخورد سه‌کانالهٔ کیت (صدا + لرزش + متن)
 * - رد کردن: recordSRS(✗) + نمایش واژهٔ درست برای ۱ ثانیه
 * - راهنمای هزینه‌دار (کار اختصاصی G2-a): هر بار استفاده −۳۰ امتیاز (کف صفر) +
 *   شمارندهٔ راهنما + اعلام متنی؛ رکورد دور هم می‌سوزد (قاعدهٔ قبلی، دست‌نخورده)
 * - رکورد: سریع‌ترین اجرای کامل (بدون رد/راهنما) به تفکیک درس و تعداد واژه
 *
 * مهاجرت کیت (الگوی پایلوت memory): GameShell + ResultScreen + TutorialOverlay +
 * useGamePause + GameExitGuard + تله‌متری جلسه — امضاهای shared.ts
 * (saveAttempt/saveBest/bumpPlays) و کلیدهای localStorage هیچ تغییری نکرده‌اند
 * (قانون حفظ‌شوندگی §۳-۴ سند نقشه راه بازی‌ها).
 *
 * فاز G3-01 — سطح دشواری ۳گانه: هزینهٔ راهنما ×hintCostScale (آسان −۱۵ / عادی −۳۰ /
 * سخت −۴۵ با کف ۱) + امتیاز نهایی دور levelScore (یک‌بار روی خامِ پایانی؛ عادی =
 * دست‌نخورده). تایمر شمارشی است (بدون شمارش معکوس) — timeScale کاربرد ندارد.
 * رکورد آسان/سخت scope پسونددار جدا می‌گیرد (کلیدهای عادی بایت‌به‌بایت دست‌نخورده).
 * فاز G3-02 — انتخاب هوشمند واژه‌های دور: smartPick با اولویت کارت‌های SRS
 * ضعیف/سررسید/نو (شروع سرد = همان شافل قبلی).
 */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  Shuffle,
  Play,
  Trophy,
  Timer,
  Target,
  CheckCircle2,
  XCircle,
  Eraser,
  Lightbulb,
  SkipForward,
  Volume2,
  Sparkles,
  Pause,
  Coins,
  Keyboard,
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
// G5-01 — مدرس بازی با LLM (راهنمای خودکار بعد از ۳ خطا)
import { useHintCoach } from "./kit/hint-coach";
// فاز G3-01/G3-02 — دشواری ۳سطحی + انتخاب هوشمند واژه (کیت؛ فقط مصرف)
import { DifficultyPicker } from "./kit/difficulty-picker";
import {
  LEVEL_KNOBS,
  levelScore,
  loadLevelPref,
  saveLevelPref,
  scopeWithLevel,
  type DifficultyKey,
} from "./kit/difficulty";
import { countWeak, smartPick } from "./kit/smart-pick";

type Phase = "setup" | "playing" | "done";

/** کلید بازی — الگوی مشترک همهٔ بازی‌ها (فاز G0-04) — هرگز تغییر نمی‌کند */
const GAME_KEY = "scramble";

/** حرف با شناسه یکتا — حروف تکراری مستقل مدیریت می‌شوند (اینکس‌محور) */
interface Tile {
  id: number;
  letter: string;
}

/** شکل رکورد شخصی این بازی — سریع‌ترین اجرا (ثانیه) */
interface BestRec {
  time: number;
}

/** ردیف جزئیات دور — برای Attempt سروری و مرور خطاهای صفحهٔ نتیجه */
interface DetailRow {
  word: string;
  ok: boolean;
}

const ALL_LESSONS = -1;
const ROUND_OPTIONS = [5, 8, 12];

/** فقط واژه‌های تک‌کلمه‌ای لاتینِ ۳ تا ۱۲ حرفی وارد بازی می‌شوند */
const WORD_RE = /^[A-Za-z]{3,12}$/;

/** کار اختصاصی G2-a — امتیاز هر واژهٔ حل‌شده و هزینهٔ هر بار راهنما */
const SOLVE_POINTS = 100;
const HINT_COST = 30;

/** واژهٔ پایه — حذف نشانه‌های دستوری داخل پرانتز: "dry (adj.)" → "dry" */
function baseWord(w: string): string {
  return w.replace(/\s*\([^)]*\)\s*/g, " ").trim();
}

/** آموزش ۳-گامی استاندارد (فاز G1-08) — گام سوم هزینهٔ راهنما را مستند می‌کند */
const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <Shuffle size={24} />,
    title: "حروف به‌هم ریخته‌اند",
    text: "معنی فارسی را بخوان و روی حروف به ترتیب بزن تا واژهٔ انگلیسی ساخته شود.",
  },
  {
    icon: <Keyboard size={24} />,
    title: "با کیبورد هم سریع‌تری",
    text: "حرف‌ها را تایپ کن تا سر جایشان بنشینند؛ Backspace حرف آخر را برمی‌گرداند. تلفظ واژه را هم می‌توانی بشنوی.",
  },
  {
    icon: <Lightbulb size={24} />,
    title: "راهنما هزینه دارد",
    text: `دکمهٔ راهنما یک حرف درست را سر جایش می‌گذارد، ولی هر بار ${faNum(HINT_COST)} امتیاز می‌سوزاند و رکورد دور هم از دست می‌رود!`,
  },
];

export function ScrambleGame() {
  const data = useBookData();
  const { bookId: activeBookId } = useBook();
  // بازی فقط داخل کتاب فعال رندر می‌شود (useBookData بالا تضمینش می‌کند) — در عمل هرگز تهی نیست
  const bookId: string = activeBookId ?? "";
  const { speed } = useVoiceSpeed();

  const [phase, setPhase] = useState<Phase>("setup");
  const [lesson, setLesson] = useState<number>(ALL_LESSONS);
  const [rounds, setRounds] = useState<number>(8);
  // فاز G3-01 — سطح دشواری ماندگار (پیش‌فرض «عادی» = دقیقاً رفتار قبلی بازی)
  const [level, setLevel] = useState<DifficultyKey>(() => loadLevelPref(GAME_KEY));

  const [deck, setDeck] = useState<VocabEntry[]>([]);
  const [idx, setIdx] = useState(0);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [slots, setSlots] = useState<(number | null)[]>([]);

  const [solved, setSolved] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [hinted, setHinted] = useState(0);
  /** کار اختصاصی G2-a — امتیاز دور: هر حل +۱۰۰، هر راهنما −۳۰ (کف صفر) */
  const [roundScore, setRoundScore] = useState(0);
  const [detail, setDetail] = useState<DetailRow[]>([]);
  const [secs, setSecs] = useState(0);
  const [isRecord, setIsRecord] = useState(false);

  /** انیمیشن match-pop روی ردیف پاسخ هنگام حل درست */
  const [pop, setPop] = useState(false);
  /** واژهٔ درستی که بعد از رد کردن برای ۱ ثانیه نشان داده می‌شود */
  const [reveal, setReveal] = useState<string | null>(null);
  /** پیام باکس aria-live شِل — بازخورد سه‌کانالهٔ کیت (صدا + لرزش + متن) */
  const [liveMsg, setLiveMsg] = useState("");

  // فاز G2 — توقف/ادامهٔ استاندارد کیت (تایمر خودکار در تب مخفی هم می‌ایستد) + نگهبان خروج
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
  // فاز G3-01 — تغییر سطح (هزینهٔ راهنما و ضریب امتیاز از LEVEL_KNOBS خوانده می‌شود؛
  // تعداد واژه‌های دور ثابت است — چیپ‌های «چند واژه؟» دستِ کاربر)
  const handleLevelChange = useCallback((lv: DifficultyKey) => {
    setLevel(lv);
    saveLevelPref(GAME_KEY, lv);
  }, []);
  // فاز G1-10 — تله‌متری جلسه (بدون PII: بازی/اسکوپ/مدت رُند/دلیل)
  const sessionRef = useRef<GameSessionTracker | null>(null);
  // G5-01 — مدرس بازی (کارت شناور داخل GameShell) — دسترسی در callbackهای پایدار با latest-ref (الگوی کیت)
  const hint = useHintCoach(GAME_KEY);
  const hintRef = useRef(hint);
  useEffect(() => {
    hintRef.current = hint;
  });

  const locked = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const secsRef = useRef(0);

  const busy = pop || reveal !== null;

  // استخر قابل بازی — فقط واژه‌های تک‌کلمه‌ای ۳ تا ۱۲ حرفی
  const pool = useMemo(() => {
    const base = lesson === ALL_LESSONS ? data.vocab.all : data.vocab.ofLesson(lesson);
    return base.filter((w) => WORD_RE.test(baseWord(w.word)));
  }, [data.vocab, lesson]);

  // فاز G3-01 — هزینهٔ واقعی راهنما در این سطح: عادی = همان ثابت قبلی؛ آسان/سخت ×hintCostScale (کف ۱)
  const hintCost =
    level === "normal"
      ? HINT_COST
      : Math.max(1, Math.round(HINT_COST * LEVEL_KNOBS[level].hintCostScale));

  // رکورد شخصی — snapshot عددی (پایدار برای useSyncExternalStore؛ سرور null)
  // فاز G3-01 — اسکوپ سطح‌دار: عادی = همان کلید قبلی بایت‌به‌بایت؛ آسان/سخت کلید افزودنی
  const scope = scopeWithLevel(`${lesson === ALL_LESSONS ? "all" : lesson}:${rounds}`, level);
  const best = useSyncExternalStore(
    subscribeGameData,
    () => {
      const b = loadBest<BestRec>(bookId, GAME_KEY, scope);
      return b ? b.time : null;
    },
    () => null,
  );

  // ── تایمر (functional) + شمارندهٔ دقیق برای رکورد — روی paused گیت می‌شود (فاز G1-03) ──
  useEffect(() => {
    if (phase !== "playing" || paused) return;
    const t = window.setInterval(() => {
      secsRef.current += 1;
      setSecs((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(t);
  }, [phase, paused]);

  // ── پاک‌سازی نهایی: تلفظ + تایمرهای معلق + تله‌متری دورِ باز (tracker اگر گزارش‌شده باشد no-op است) ──
  useEffect(() => {
    return () => {
      sessionRef.current?.abandon("unmount");
      stopSpeaking();
      if (timer.current !== undefined) window.clearTimeout(timer.current);
    };
  }, []);

  /** بارگذاری واژهٔ بعدی — حروف به‌هم‌ریخته + خانه‌های خالی */
  const loadWord = useCallback((entry: VocabEntry) => {
    const base = baseWord(entry.word);
    setTiles(shuffle(base.split("").map((letter, i) => ({ id: i, letter }))));
    setSlots(Array.from({ length: base.length }, () => null as number | null));
    setPop(false);
  }, []);

  /** پایان دور — استریک/جلسه/Attempt/رکورد + بازخورد سه‌کانالهٔ کیت */
  const finishRun = useCallback(
    (finalSolved: number, finalSkipped: number, finalDetail: DetailRow[]) => {
      touchStreak();
      recordStudySession();
      bumpPlays(bookId, GAME_KEY);
      // فاز G1-10 — پایان عادی جلسهٔ تله‌متری
      sessionRef.current?.end("finish");
      // فاز G2 — پایان دور: برد کامل (بدون هیچ رد) = صدای برد، بقیه = صدای پایان
      const perfectRun = finalSkipped === 0 && finalSolved === deck.length;
      playSound(perfectRun ? "win" : "finish");
      buzz("success");
      saveAttempt(bookId, GAME_KEY, {
        lesson: lesson === ALL_LESSONS ? 0 : lesson,
        total: deck.length,
        correct: finalSolved,
        duration: secsRef.current,
        // فاز G3-01 — سطح دور به‌عنوان فیلد افزودنی در هر ردیف detail (شکل آرایه حفظ شده)
        detail: finalDetail.map((d) => ({ ...d, level })),
      });
      // رکورد فقط برای اجرای کاملِ بدون رد کردن و بدون راهنما — قاعدهٔ قبلی (دست‌نخورده)
      if (finalSkipped === 0 && hinted === 0) {
        const prev = loadBest<BestRec>(bookId, GAME_KEY, scope);
        if (!prev || secsRef.current < prev.time) {
          saveBest<BestRec>(bookId, GAME_KEY, scope, { time: secsRef.current });
          setIsRecord(true);
          playSound("record");
          buzz("record");
          setLiveMsg("دور تمام شد — رکورد جدید! 🏆");
        } else {
          setLiveMsg("دور تمام شد! 🎉");
        }
      } else {
        setLiveMsg("دور تمام شد! 🎉");
      }
      setPhase("done");
    },
    [bookId, lesson, rounds, deck.length, hinted, scope, level],
  );

  /** ادامه به واژهٔ بعد یا پایان دور */
  const advanceOrFinish = useCallback(
    (nextIdx: number, finalSolved: number, finalSkipped: number, finalDetail: DetailRow[]) => {
      if (nextIdx >= deck.length) {
        finishRun(finalSolved, finalSkipped, finalDetail);
        return;
      }
      setIdx(nextIdx);
      loadWord(deck[nextIdx]);
    },
    [deck, loadWord, finishRun],
  );

  /** حل درست — پاپ + تلفظ + SRS(✓) + امتیاز + بازخورد کیت و بعد واژهٔ بعد */
  const solveWord = useCallback(
    (entry: VocabEntry, finalSolved: number, finalDetail: DetailRow[]) => {
      locked.current = true;
      setPop(true);
      // کار اختصاصی G2-a — هر واژهٔ حل‌شده امتیاز مثبت دارد
      setRoundScore((s) => s + SOLVE_POINTS);
      const base = baseWord(entry.word);
      recordSRS(base, true);
      speak(base, { speed });
      setLiveMsg(`«${base}» حل شد — درست بود! 🎉`);
      playSound("correct");
      buzz("success");
      timer.current = window.setTimeout(() => {
        locked.current = false;
        setPop(false);
        advanceOrFinish(idx + 1, finalSolved, skipped, finalDetail);
      }, 650);
    },
    [speed, idx, skipped, advanceOrFinish],
  );

  /** گذاشتن یک حرف از استخر در اولین خانهٔ خالی + بررسی حل شدن */
  const placeTile = useCallback(
    (tileId: number) => {
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
      // همهٔ خانه‌ها پر شد؟ تطبیق با واژهٔ پایه را بسنجیم
      if (nextSlots.every((s) => s !== null)) {
        const base = baseWord(current.word);
        const attempt = nextSlots
          .map((s) => tiles.find((t) => t.id === s)?.letter ?? "")
          .join("");
        if (attempt === base) {
          const finalSolved = solved + 1;
          const nextDetail = [...detail, { word: base, ok: true }];
          setSolved(finalSolved);
          setDetail(nextDetail);
          solveWord(current, finalSolved, nextDetail);
        } else {
          // چیده‌شدن غلط — رفتار قبلی (ردیف سر جایش می‌ماند) + بازخورد کیت
          playSound("wrong");
          buzz("error");
          // G5-01 — مدرس بازی: چیدمان غلط (معنی + واژهٔ درست + چیدهٔ کاربر)
          hintRef.current.recordMistake({ prompt: current.meaning, answer: base, chosen: attempt.slice(0, 160) });
          setLiveMsg("چیدمان غلط از آب درآمد — یک حرف را برگردان و دوباره بچین");
        }
      } else {
        // فاز G2 — بازخورد کلیکِ حرف (وقتی هنوز واژه کامل نشده)
        playSound("click");
        buzz("light");
      }
    },
    [deck, idx, slots, tiles, solved, detail, solveWord, paused],
  );

  /** برگرداندن حرفِ یک خانه به استخر (کلیک روی خانهٔ پر) */
  const returnAt = useCallback(
    (index: number) => {
      if (locked.current || paused) return;
      playSound("click");
      buzz("light");
      setSlots((prev) => {
        if (prev[index] === null) return prev;
        const next = [...prev];
        next[index] = null;
        return next;
      });
    },
    [paused],
  );

  /** پاک کردن آخرین حرف (دکمه یا Backspace) */
  const returnLast = useCallback(() => {
    if (locked.current || paused) return;
    playSound("click");
    buzz("light");
    setSlots((prev) => {
      for (let i = prev.length - 1; i >= 0; i--) {
        if (prev[i] !== null) {
          const next = [...prev];
          next[i] = null;
          return next;
        }
      }
      return prev;
    });
  }, [paused]);

  /**
   * راهنمای هزینه‌دار (کار اختصاصی G2-a) — یک حرف درستِ بعدی را جای‌گذاری می‌کند.
   * هر بار استفاده: امتیاز دور −۳۰ (کف صفر) + شمارندهٔ راهنما + بازخورد سه‌کاناله
   * (صدا click + لرزش light + اعلام متنی). رکورد دور هم طبق قاعدهٔ قبلی می‌سوزد.
   */
  const applyHint = useCallback(() => {
    if (locked.current || paused) return;
    const current = deck[idx];
    if (!current) return;
    const empty = slots.indexOf(null);
    if (empty === -1) return;
    const base = baseWord(current.word);
    const used = new Set(slots.filter((s): s is number => s !== null));
    const tile = tiles.find((t) => !used.has(t.id) && t.letter === base[empty]);
    if (!tile) return;
    setHinted((h) => h + 1);
    setRoundScore((s) => Math.max(0, s - hintCost));
    playSound("click");
    buzz("light");
    setLiveMsg(`راهنما فعال شد — ${faNum(hintCost)} امتیاز کم شد`);
    placeTile(tile.id);
  }, [deck, idx, slots, tiles, placeTile, paused, hintCost]);

  /** رد کردن — SRS(✗) + نمایش واژهٔ درست برای ۱ ثانیه (رکورد دور می‌سوزد) */
  const skipWord = useCallback(() => {
    if (locked.current || paused) return;
    const current = deck[idx];
    if (!current) return;
    locked.current = true;
    const base = baseWord(current.word);
    recordSRS(base, false);
    const nextSkipped = skipped + 1;
    const nextDetail = [...detail, { word: base, ok: false }];
    setSkipped(nextSkipped);
    setDetail(nextDetail);
    setReveal(base);
    setLiveMsg("واژه رد شد — پاسخ درست نشان داده می‌شود");
    playSound("wrong");
    buzz("error");
    // G5-01 — مدرس بازی: واژهٔ ردشده (معنی + پاسخ درست)
    hintRef.current.recordMistake({ prompt: current.meaning, answer: base });
    timer.current = window.setTimeout(() => {
      locked.current = false;
      setReveal(null);
      advanceOrFinish(idx + 1, solved, nextSkipped, nextDetail);
    }, 1000);
  }, [deck, idx, skipped, detail, solved, advanceOrFinish, paused]);

  /** شروع دور — انتخاب واژه‌های یکتا از استخر قابل بازی + جلسهٔ تازهٔ تله‌متری */
  const start = useCallback(() => {
    // فاز G3-02 — انتخاب هوشمند واژه‌های دور (اولویت کارت‌های SRS ضعیف/سررسید/نو؛
    // شروع سرد = همان شافل قبلی) — جایگزین drop-in برای pickUnique با همان n و keyOf
    const chosen = smartPick(pool, rounds, (w) => baseWord(w.word));
    if (chosen.length < 3) {
      toast.error("واژه قابل بازی در این محدوده پیدا نشد");
      return;
    }
    if (timer.current !== undefined) window.clearTimeout(timer.current);
    locked.current = false;
    secsRef.current = 0;
    setDeck(chosen);
    setIdx(0);
    setSolved(0);
    setSkipped(0);
    setHinted(0);
    setRoundScore(0);
    setDetail([]);
    setSecs(0);
    setIsRecord(false);
    setReveal(null);
    setLiveMsg("");
    hintRef.current.reset(); // G5-01 — دور تازه
    loadWord(chosen[0]);
    resume();
    setExitAsk(false);
    // فاز G1-10 — جلسهٔ تازهٔ تله‌متری برای این دور (فاز G3-01 — level اسکوپ سطح‌دار)
    sessionRef.current = createGameSession({
      game: GAME_KEY,
      level: scope,
    });
    sessionRef.current.start();
    // فاز G2 — بازخورد شروع دور
    playSound("click");
    buzz("light");
    setPhase("playing");
  }, [pool, rounds, loadWord, resume, scope]);

  // ── کیبورد: فقط در فاز بازی و بدون توقف؛ حروف → جای‌گذاری، Backspace → برگرداندن ──
  useEffect(() => {
    if (phase !== "playing" || paused) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "Backspace") {
        e.preventDefault();
        returnLast();
        return;
      }
      if (e.key === "Enter") return; // حل خودکار است — اینتر کاری نمی‌کند
      if (/^[a-zA-Z]$/.test(e.key)) {
        const letter = e.key.toLowerCase();
        const used = new Set(slots.filter((s): s is number => s !== null));
        const tile = tiles.find((t) => !used.has(t.id) && t.letter.toLowerCase() === letter);
        if (tile) placeTile(tile.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, paused, slots, tiles, placeTile, returnLast]);

  // انصراف حین بازی — با حداقل یک تلاش، نگهبان خروج؛ بدون پیشرفت، خروج مستقیم
  const handleExitClick = useCallback(() => {
    stopSpeaking();
    const hasAttempt =
      solved > 0 || skipped > 0 || hinted > 0 || slots.some((s) => s !== null);
    if (hasAttempt) {
      setExitAsk(true);
    } else {
      // فاز G1-10 — دور بدون پیشرفت هم یک جلسه است؛ همین‌جا رهاشده ثبت می‌شود
      sessionRef.current?.abandon("exit");
      setPhase("setup");
    }
  }, [slots, solved, skipped, hinted]);

  const current = deck[idx];
  const usedIds = new Set(slots.filter((s): s is number => s !== null));
  const letterOf = (id: number): string => tiles.find((t) => t.id === id)?.letter ?? "";
  const pct = Math.round(((solved + skipped) / Math.max(deck.length, 1)) * 100);

  // ── Setup ──
  if (phase === "setup") {
    // فاز G3-02 — شمارش کارت‌های ضعیف/سررسید/نو استخر (صفر = تمرکز هوشمند غیرفعال)
    const weakCount = countWeak(pool, (w) => baseWord(w.word));
    return (
      <>
        <Card className="mx-auto max-w-xl rise-in">
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                <Shuffle size={22} />
              </span>
              <div>
                <h2 className="text-lg font-black">حروف جابه‌جا</h2>
                <p className="text-xs text-muted-foreground">
                  حروف واژه‌ها ریخته شده — با معنی فارسی سرهمشان کن!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
              <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
              <p>
                روی حروف به ترتیب بزن تا واژه ساخته شود؛ کیبورد هم کار می‌کند. هر واژهٔ حل‌شده{" "}
                {faNum(SOLVE_POINTS)} امتیاز دارد و دکمهٔ راهنما هر بار {faNum(hintCost)} امتیاز
                می‌گیرد — رد کردن یا راهنما رکوردِ دور را هم می‌سوزاند!
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
              <p className="mb-2 text-[13px] font-bold">چند واژه؟</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="تعداد واژه‌های دور">
                {ROUND_OPTIONS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRounds(n)}
                    aria-pressed={rounds === n}
                    className={cn(
                      "min-h-11 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
                      rounds === n
                        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {faNum(n)} واژه
                  </button>
                ))}
              </div>
            </div>

            {best !== null && (
              <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
                <Trophy size={12} />
                سریع‌ترین اجرا: {fmtTime(best)}
              </Badge>
            )}

            {/* فاز G3-01 — انتخاب سطح دشواری (عادی = دقیقاً رفتار قبلی بازی) */}
            <DifficultyPicker value={level} onChange={handleLevelChange} />
            <p className="text-[11px] leading-5 text-muted-foreground">
              {level === "easy"
                ? `آسان: راهنما −${faNum(hintCost)} امتیاز (نصف) — امتیاز دور ×۰٫۷`
                : level === "hard"
                  ? `سخت: راهنما −${faNum(hintCost)} امتیاز — امتیاز دور ×۱٫۶`
                  : `عادی: همان بازی همیشگی — راهنما −${faNum(hintCost)} امتیاز`}
            </p>
            {/* فاز G3-02 — پیام تمرکز هوشمند روی واژه‌های ضعیف (aria-live روی والد) */}
            <div aria-live="polite">
              {weakCount > 0 && (
                <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  🎯 مرکز این دور: {faNum(weakCount)} واژهٔ ضعیف تو
                </p>
              )}
            </div>

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

  // ── Done — صفحهٔ نتیجهٔ استاندارد کیت (فاز G1-06) ──
  if (phase === "done") {
    // ستاره‌بندی per-game: دقت ≥۹۰٪ → ۳ ستاره، ≥۶۵٪ → ۲، بقیه → ۱
    const acc = Math.round((solved / Math.max(deck.length, 1)) * 100);
    const stars = acc >= 90 ? 3 : acc >= 65 ? 2 : 1;
    const reviewRows = detail
      .filter((d) => !d.ok)
      .map((d) => ({
        front: d.word,
        back: deck.find((w) => baseWord(w.word) === d.word)?.meaning ?? "",
      }));
    return (
      <ResultScreen
        title={`دور تمام شد — ${fmtTime(secs)}`}
        stars={stars}
        isRecord={isRecord}
        errorCount={skipped}
        reviewItems={reviewRows}
        stats={[
          {
            label: "امتیاز",
            // فاز G3-01 — امتیاز نهایی دور با ضریب سطح (عادی = همان عدد قبلی)
            value: faNum(levelScore(roundScore, level)),
            icon: <Coins size={16} className="text-amber-500" />,
          },
          {
            label: "دقت",
            value: `${faNum(acc)}٪`,
            icon: <Target size={16} className="text-teal-500" />,
          },
          {
            label: "راهنما",
            value: faNum(hinted),
            icon: <Lightbulb size={16} className="text-primary" />,
          },
        ]}
        onReplay={start}
        onExit={() => setPhase("setup")}
        exitLabel="تنظیمات"
      />
    );
  }

  // ── Playing — قاب استاندارد GameShell (فاز G1-05) ──
  return (
    <>
      <GameShell
        title="حروف جابه‌جا"
        icon={<Shuffle size={18} />}
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
              <Coins size={11} className="text-amber-500" />
              {faNum(roundScore)} امتیاز
            </Badge>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <CheckCircle2 size={11} className="text-primary" />
              {faNum(solved)} حل‌شده
            </Badge>
            {skipped > 0 && (
              <Badge variant="outline" className="gap-1 border-destructive/40 text-[11px] text-destructive">
                <XCircle size={11} />
                {faNum(skipped)} ردشده
              </Badge>
            )}
            {hinted > 0 && (
              <Badge variant="outline" className="gap-1 border-amber-500/40 text-[11px] text-amber-600 dark:text-amber-400">
                <Lightbulb size={11} />
                {faNum(hinted)} راهنما
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
          {current && (
            <div
              className={cn(
                "space-y-5 rounded-2xl border bg-card p-4 sm:p-6",
                paused && "pointer-events-none select-none blur-sm",
              )}
              aria-hidden={paused}
            >
              {/* ردیف متا */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant="secondary" className="text-[10px]">
                    {current.lessonLabel}
                  </Badge>
                  {current.pos && (
                    <Badge variant="outline" dir="ltr" className="font-en text-[10px]">
                      {current.pos}
                    </Badge>
                  )}
                </div>
                <button
                  type="button"
                  dir="ltr"
                  aria-label="پخش تلفظ"
                  onClick={() => speak(baseWord(current.word), { speed })}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                >
                  <Volume2 size={18} />
                </button>
              </div>

              {/* راهنمای فارسی */}
              <div className="rounded-xl bg-muted/50 p-3 text-center">
                <p className="text-[10px] font-bold text-muted-foreground">معنی</p>
                <p className="mt-0.5 text-[15px] font-black leading-7">{current.meaning}</p>
              </div>

              {/* نمایش واژهٔ درست پس از رد کردن */}
              {reveal && (
                <div className="flex justify-center">
                  <Badge className="gap-1.5 border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                    <CheckCircle2 size={12} />
                    <span dir="ltr" className="font-en">
                      {reveal}
                    </span>
                  </Badge>
                </div>
              )}

              {/* ردیف پاسخ */}
              <div
                dir="ltr"
                className={cn(
                  "flex min-h-14 flex-wrap items-center justify-center gap-1.5",
                  pop && "match-pop",
                )}
              >
                {slots.map((slotId, i) =>
                  slotId === null ? (
                    <div
                      key={`slot-${i}`}
                      className="h-12 w-12 rounded-xl border-2 border-dashed border-muted-foreground/30"
                    />
                  ) : (
                    <button
                      key={`slot-${i}`}
                      type="button"
                      onClick={() => returnAt(i)}
                      disabled={busy}
                      aria-label={`برگرداندن حرف ${letterOf(slotId)}`}
                      className="h-12 w-12 rounded-xl border-2 border-primary/40 bg-primary/10 font-en text-xl font-black text-primary transition-all hover:border-primary/70 hover:bg-primary/20 disabled:pointer-events-none disabled:opacity-60"
                    >
                      {letterOf(slotId)}
                    </button>
                  ),
                )}
              </div>

              {/* استخر حروف */}
              <div dir="ltr" className="flex flex-wrap items-center justify-center gap-2">
                {tiles.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => placeTile(t.id)}
                    disabled={usedIds.has(t.id) || busy}
                    aria-label={`حرف ${t.letter}`}
                    className={cn(
                      "h-12 w-12 rounded-xl border bg-card font-en text-lg font-black shadow-sm transition-all",
                      "hover:border-primary/50 hover:bg-primary/5",
                      "disabled:pointer-events-none disabled:opacity-25",
                    )}
                  >
                    {t.letter}
                  </button>
                ))}
              </div>

              {/* دکمه‌های کمکی — در موبایل ستونی تا لیبل هزینه‌دار راهنما کامل جا شود */}
              <div className="grid gap-2 sm:grid-cols-3">
                <Button
                  variant="outline"
                  onClick={returnLast}
                  disabled={busy}
                  className="min-h-11 gap-1.5 text-[12px]"
                >
                  <Eraser size={15} />
                  پاک کردن
                </Button>
                <Button
                  variant="outline"
                  onClick={applyHint}
                  disabled={busy}
                  className="min-h-11 gap-1.5 border-amber-500/40 text-[12px] text-amber-600 hover:bg-amber-500/10 hover:text-amber-600 dark:text-amber-400"
                >
                  <Lightbulb size={15} />
                  {`راهنما (−${faNum(hintCost)} امتیاز)`}
                </Button>
                <Button
                  variant="ghost"
                  onClick={skipWord}
                  disabled={busy}
                  className="min-h-11 gap-1.5 text-[12px] text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <SkipForward size={15} />
                  رد کردن
                </Button>
              </div>

              <p className="text-center text-[10px] text-muted-foreground">
                کیبورد: حروف انگلیسی جای‌گذاری می‌کنند · Backspace حرف آخر را برمی‌گرداند
              </p>
            </div>
          )}

          {/* فاز G1-03 — اورلی توقف: بدنه تار و غیرقابل‌کلیک؛ اعلام متنی در liveMsg شِل */}
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

        {/* فاز G1-04 — نگهبان خروج استاندارد کیت */}
        <GameExitGuard
          open={exitAsk}
          onOpenChange={setExitAsk}
          onConfirm={() => {
            // فاز G1-10 — رهاکردن دور نیمه‌کاره
            sessionRef.current?.abandon("exit");
            if (timer.current !== undefined) window.clearTimeout(timer.current);
            locked.current = false;
            stopSpeaking();
            setExitAsk(false);
            resume();
            setPhase("setup");
          }}
        />
        {/* G5-01 — کارت مدرس بازی */}
        {hint.element}
      </GameShell>
      {/* فاز G1-08 — راهنمای دکمهٔ شِل (حین بازی با توقف باز می‌شود) */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
