"use client";

/**
 * بازی «تطبیق حافظه» (Memory Pairs) — فاز ۳ نقشه راه جامع ۲۰۲۶.
 *
 * همه کارت‌ها رو به پایین‌اند: هر واژه یک کارت انگلیسی و یک کارت معنی فارسی دارد.
 * جفت درست باز می‌ماند (ثبت در SRS + پخش تلفظ)، جفت غلط با لرزش دوباره بسته می‌شود
 * (کاوش است — چیزی ثبت نمی‌شود). رکورد شخصی: کمترین حرکت، تساوی → کمترین زمان؛
 * اسکوپ رکورد: درس (یا کل کتاب) × تعداد جفت.
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
  LayoutGrid,
  HeartHandshake,
  Play,
  Trophy,
  Timer,
  Target,
  CheckCircle2,
  MousePointerClick,
  Sparkles,
  Pause,
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
  shuffle,
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
type Side = "en" | "fa";

/** یک کارت بازی — هر واژه دو کارت می‌سازد (یک انگلیسی + یک فارسی) */
interface CardItem {
  id: number;
  side: Side;
  word: string;
  meaning: string;
}

/** شکل رکورد شخصی — بهتر = حرکت کمتر، تساوی → زمان کمتر */
interface BestRecord {
  moves: number;
  time: number;
}

const ALL_LESSONS = -1;
const GAME_KEY = "memory";
const PAIR_OPTIONS = [4, 6, 8];
/** قفل کلیک پس از جفت درست تا مکث کوتاه روی فلیپ (ms) */
const MATCH_LOCK_MS = 400;
/** مدت لرزش جفت غلط تا بسته‌شدن کارت‌ها (ms) */
const WRONG_LOCK_MS = 650;
/** فاز G2-a — تعداد ستون‌های گرید برای پیمایش کیبورد چهارجهته (گرید ۴ ستونه — COLS ثابت) */
const GRID_COLS = 4;

/** آموزش ۳-گامی استاندارد (فاز G1-08) — یک‌بارنمایش + دکمهٔ راهنمای شِل */
const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <LayoutGrid size={24} />,
    title: "کارت‌ها رو به پایین‌اند",
    text: "در هر نوبت دو کارت برگردان — یک واژه انگلیسی و یک معنی فارسی.",
  },
  {
    icon: <HeartHandshake size={24} />,
    title: "جفت درست می‌ماند",
    text: "اگر واژه و معنی هم‌خوان باشند باز می‌مانند و تلفظش را می‌شنوی؛ جفت غلط دوباره بسته می‌شود.",
  },
  {
    icon: <Trophy size={24} />,
    title: "کمترین حرکت = رکورد",
    text: "با حرکت و زمان کمتر، ستاره‌های بیشتری می‌گیری — سه ستاره یعنی تقریباً بی‌خطا!",
  },
];

export function MemoryGame() {
  const data = useBookData();
  const { bookId } = useBook();
  // بازی‌ها فقط داخل کتاب فعال رندر می‌شوند (useBookData بالا گارد است) — bookId عملاً هرگز null نیست
  const activeBookId: string = bookId ?? "";

  const [phase, setPhase] = useState<Phase>("setup");
  const [lesson, setLesson] = useState(1);
  const [pairCount, setPairCount] = useState(6);

  const [cards, setCards] = useState<CardItem[]>([]);
  const [openIds, setOpenIds] = useState<number[]>([]);
  const [matchedIds, setMatchedIds] = useState<Set<number>>(new Set());
  const [wrongIds, setWrongIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [secs, setSecs] = useState(0);
  const [isRecord, setIsRecord] = useState(false);
  /** فاز G1-06 — واژه‌های جفت‌غلط این دور (برای «مرور خطاها»ی صفحهٔ نتیجه) */
  const [missedWords, setMissedWords] = useState<{ front: string; back: string }[]>([]);
  /** پیام باکس aria-live — اعلام جفت درست/غلط برای فناوری‌های کمکی */
  const [liveMsg, setLiveMsg] = useState("");
  /**
   * فاز G2-a — کیبورد چهارجهته: نشانگر سیار روی گرید (ایندکس کارت).
   * null یعنی هنوز با فلش وارد گرید نشده؛ اولین فلش از کارت ۱ شروع می‌کند.
   */
  const [focusIdx, setFocusIdx] = useState<number | null>(null);
  /** فاز G2-a — ریشهٔ گرید برای گارد اسکرول (رندر کارتِ نشانگرشده در دید) */
  const gridRef = useRef<HTMLDivElement | null>(null);

  // فاز G1 (پایلوت کیت بازی) — توقف/ادامهٔ استاندارد + نگهبان خروج + کلید صدا/لرزش
  // توقف خودکار در تب مخفی هم همین‌جا اعمال می‌شود (سطح بالاتر از گارد G0-05: کاربر
  // هنگام بازگشت اورلی «متوقف شد» می‌بیند و خودش ادامه می‌دهد)
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

  const { speed } = useVoiceSpeed();
  const busy = useRef(false);
  const secsRef = useRef(0);

  // رکورد شخصی این اسکوپ — اسنپ‌شات رشته‌ای (primitive مثل best در match-game) تا هر خواندن آبجکت تازه نسازد
  const bestScope = `${lesson === ALL_LESSONS ? "all" : lesson}:${pairCount}`;
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

  // تایمر — بدون setState مستقیم در effect (react-hooks v6)؛ secsRef برای زمان دقیقِ لحظه پایان
  // فاز G0-05 — گارد visibilitychange: شمارش زمان سپری‌شده (ملاک رکورد) در تب مخفی می‌ایستد
  // (interval پاک می‌شود) و در بازگشت با همان secsRef ادامه می‌یابد — شمارنده افزایشی است و
  // از Date.now() محاسبه نمی‌شود، پس نیازی به offset نیست. بازگشت از bfcache با pageshow
  // پوشش داده می‌شود؛ unmount همیشه پاک می‌کند.
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

  // فاز G1-10 — دورِ باز در unmount «رهاشده» ثبت می‌شود (اگر قبلاً گزارش شده باشد no-op)
  useEffect(
    () => () => {
      sessionRef.current?.abandon("unmount");
      stopSpeaking();
    },
    [],
  );

  const start = useCallback(() => {
    const pool = lesson === ALL_LESSONS ? data.vocab.all : data.vocab.ofLesson(lesson);
    // حذف معنی‌های تکراری (الگوی match-game) — تا دو کارت فارسی یکسان بازی را گمراه نکند
    const seenMeanings = new Set<string>();
    const deduped = pool.filter((w) => {
      if (seenMeanings.has(w.meaning)) return false;
      seenMeanings.add(w.meaning);
      return true;
    });
    // استخر واژه یکتا — برای N جفت باید N واژه متمایز موجود باشد
    const chosen = pickUnique(deduped, pairCount, (w) => w.word);
    if (chosen.length < pairCount) {
      toast.error(
        `واژه کافی برای ${faNum(pairCount)} جفت پیدا نشد — درس دیگری را امتحان کن یا تعداد جفت را کمتر کن`,
      );
      return;
    }
    const built: CardItem[] = [];
    chosen.forEach((w) => {
      built.push({ id: built.length, side: "en", word: w.word, meaning: w.meaning });
      built.push({ id: built.length, side: "fa", word: w.word, meaning: w.meaning });
    });
    setCards(shuffle(built));
    setOpenIds([]);
    setMatchedIds(new Set());
    setWrongIds([]);
    setMoves(0);
    setSecs(0);
    secsRef.current = 0;
    setIsRecord(false);
    setMissedWords([]);
    busy.current = false;
    // فاز G2-a — نشانگر کیبورد گرید هم برای دور تازه از نو شروع شود
    setFocusIdx(null);
    resume();
    setExitAsk(false);
    // فاز G1-10 — جلسهٔ تازهٔ تله‌متری برای این دور
    sessionRef.current = createGameSession({
      game: GAME_KEY,
      level: `${lesson === ALL_LESSONS ? "all" : lesson}:${pairCount}`,
    });
    sessionRef.current.start();
    setPhase("playing");
  }, [data.vocab, lesson, pairCount, resume]);

  const finish = useCallback(
    (finalMoves: number, finalSecs: number) => {
      touchStreak();
      recordStudySession();
      bumpPlays(activeBookId, GAME_KEY);
      // فاز G1-10 — پایان عادی جلسه
      sessionRef.current?.end("finish");
      // فاز G1 — بازخورد سه‌کانالهٔ پایان دور (صدا + لرزش + متن/toast موجود)
      playSound("finish");
      buzz("success");
      saveAttempt(activeBookId, GAME_KEY, {
        lesson: lesson === ALL_LESSONS ? 0 : lesson,
        total: pairCount,
        correct: pairCount,
        duration: finalSecs,
        detail: [{ moves: finalMoves, time: finalSecs }],
      });
      setSecs(finalSecs);
      const scope = `${lesson === ALL_LESSONS ? "all" : lesson}:${pairCount}`;
      const prev = loadBest<BestRecord>(activeBookId, GAME_KEY, scope);
      if (!prev || finalMoves < prev.moves || (finalMoves === prev.moves && finalSecs < prev.time)) {
        saveBest(activeBookId, GAME_KEY, scope, { moves: finalMoves, time: finalSecs });
        setIsRecord(true);
        playSound("record");
        buzz("record");
        toast.success(`رکورد جدید! ${faNum(finalMoves)} حرکت در ${fmtTime(finalSecs)} 🏆`);
      } else {
        toast.success(`همه جفت‌ها پیدا شد — ${faNum(finalMoves)} حرکت در ${fmtTime(finalSecs)} 🎉`);
      }
      setLiveMsg("همه جفت‌ها پیدا شد! 🎉");
      setPhase("done");
    },
    [activeBookId, lesson, pairCount],
  );

  const handleCardClick = useCallback(
    (card: CardItem) => {
      if (busy.current || paused) return;
      if (matchedIds.has(card.id)) return;
      if (openIds.includes(card.id)) return;

      // کارت اول — فاز G1: بازخورد کلیک
      if (openIds.length === 0) {
        playSound("click");
        buzz("light");
        setOpenIds([card.id]);
        return;
      }

      // کارت دوم → یک حرکت کامل (هر بار دو کارت باز می‌شوند = یک حرکت، نه هر کلیک)
      const first = cards.find((c) => c.id === openIds[0]);
      if (!first) {
        setOpenIds([card.id]);
        return;
      }
      const finalMoves = moves + 1;
      setMoves(finalMoves);
      setOpenIds([first.id, card.id]);
      busy.current = true;

      if (first.side !== card.side && first.word === card.word) {
        // جفت درست — باز می‌ماند؛ در SRS ثبت می‌شود و تلفظش پخش می‌شود
        setLiveMsg(`«${first.word}» جفت شد — درست بود! 🎉`);
        recordSRS(first.word, true);
        speak(first.word, { speed });
        playSound("correct");
        buzz("success");
        const willFinish = matchedIds.size + 2 >= cards.length;
        setTimeout(() => {
          setMatchedIds((prev) => {
            const next = new Set(prev);
            next.add(first.id);
            next.add(card.id);
            return next;
          });
          setOpenIds([]);
          busy.current = false;
          if (willFinish) finish(finalMoves, secsRef.current);
        }, MATCH_LOCK_MS);
      } else {
        // جفت غلط — لرزش و بسته‌شدن (کاوش است؛ هیچ چیزی ثبت نمی‌شود)
        setWrongIds([first.id, card.id]);
        setLiveMsg("جفت غلط — کارت‌ها بسته می‌شوند، دوباره تلاش کن");
        playSound("wrong");
        buzz("error");
        // فاز G1-06 — واژهٔ خطاخورده برای «مرور خطاها»ی صفحهٔ نتیجه (بدون تکرار)
        setMissedWords((prev) =>
          prev.some((m) => m.front === first.word)
            ? prev
            : [...prev, { front: first.word, back: first.meaning }],
        );
        setTimeout(() => {
          setWrongIds([]);
          setOpenIds([]);
          busy.current = false;
        }, WRONG_LOCK_MS);
      }
    },
    [cards, finish, matchedIds, moves, openIds, paused, speed],
  );

  // ── فاز G2-a — کیبورد چهارجهته روی گرید کارت‌ها (رفع شکاف کیبورد سند §۵-G2-a) ──
  // الگو: نشانگر سیار (roving cursor) — فقط wrapper گرید تاب‌پذیر است؛ فلش‌ها focusIdx را
  // با گارد مرز سطر/ستون جابه‌جا می‌کنند و Enter/Space همان handleCardClick را صدا می‌زند
  // (گاردهای busy/paused/matched/open داخل همان تابع موجود رعایت می‌شوند — هیچ منطق جدیدی نیست).
  const handleGridKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (paused || cards.length === 0) return;
      const key = e.key;

      // Enter/Space — برگرداندن کارتِ زیر نشانگر کیبورد
      if (key === "Enter" || key === " ") {
        e.preventDefault(); // مهار اسکرول Space و مهار فعال‌سازی دوبارهٔ native دکمه‌ها
        if (focusIdx === null) return;
        const card = cards[focusIdx];
        if (!card) return;
        // اعلام محتوای کارتِ برگشته — فقط وقتی واقعاً باز می‌شود (همان گاردهای handleCardClick)؛
        // برای کارت دوم، پیام جفت درست/غلطِ خودِ بازی جایگزین همین پیام می‌شود
        if (!busy.current && !matchedIds.has(card.id) && !openIds.includes(card.id)) {
          setLiveMsg(
            `کارت شمارهٔ ${faNum(focusIdx + 1)} — ${
              card.side === "en" ? `واژه ${card.word}` : `معنی ${card.meaning}`
            }`,
          );
        }
        handleCardClick(card);
        return;
      }

      if (!key.startsWith("Arrow")) return;
      e.preventDefault(); // فلش‌ها نباید صفحه را اسکرول کنند
      // ورود اول با کیبورد — از ابتدای گرید شروع کن
      if (focusIdx === null) {
        setFocusIdx(0);
        setLiveMsg(`کارت شمارهٔ ${faNum(1)}`);
        return;
      }
      const last = cards.length - 1;
      let next = focusIdx;
      switch (key) {
        case "ArrowRight":
          // فلش راست = +۱ — گارد مرز: از آخرین ستون عبور نکند
          if (focusIdx % GRID_COLS < GRID_COLS - 1 && focusIdx < last) next = focusIdx + 1;
          break;
        case "ArrowLeft":
          // فلش چپ = کاهش ایندکس — گارد مرز: از اولین ستون عبور نکند
          if (focusIdx % GRID_COLS > 0) next = focusIdx - 1;
          break;
        case "ArrowDown":
          // فلش پایین = +COLS با clamp به انتهای گرید
          next = Math.min(last, focusIdx + GRID_COLS);
          break;
        case "ArrowUp":
          // فلش بالا = منهای COLS با clamp به ابتدای گرید
          next = Math.max(0, focusIdx - GRID_COLS);
          break;
        default:
          return;
      }
      if (next === focusIdx) return;
      setFocusIdx(next);
      // حلقهٔ aria-live — اعلام مقصد؛ کارت بسته فقط شماره می‌گیرد (محتوایش لو نمی‌رود)
      const dest = cards[next];
      const face = dest.side === "en" ? `واژه ${dest.word}` : `معنی ${dest.meaning}`;
      const destMatched = matchedIds.has(dest.id);
      const revealed = destMatched || openIds.includes(dest.id);
      setLiveMsg(
        `کارت شمارهٔ ${faNum(next + 1)}${revealed ? ` — ${face}${destMatched ? " — جفت شد" : ""}` : ""}`,
      );
    },
    [cards, focusIdx, handleCardClick, matchedIds, openIds, paused],
  );

  // فاز G2-a — گارد اسکرول: کارتِ نشانگرشده همیشه در دید بماند (block: nearest = بدون پرش صفحه)
  useEffect(() => {
    if (focusIdx === null) return;
    gridRef.current
      ?.querySelector<HTMLButtonElement>('button[data-focused="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [focusIdx]);

  // انصراف حین بازی — با پیشرفت، نگهبان خروج؛ بدون پیشرفت، خروج مستقیم
  const handleExitClick = useCallback(() => {
    stopSpeaking();
    // نگهبان خروج (فاز G1-04) — هر پیشرفتی یعنی دور نیمه‌کاره
    if (moves > 0 || openIds.length > 0 || matchedIds.size > 0) {
      setExitAsk(true);
    } else {
      // فاز G1-10 — دور بدون پیشرفت هم یک جلسه است؛ همین‌جا رهاشده ثبت می‌شود
      sessionRef.current?.abandon("exit");
      setPhase("setup");
    }
  }, [matchedIds, moves, openIds]);

  // ── Setup ──
  if (phase === "setup") {
    return (
      <>
      <Card className="mx-auto max-w-xl rise-in">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <LayoutGrid size={22} />
            </span>
            <div>
              <h2 className="text-lg font-black">تطبیق حافظه</h2>
              <p className="text-xs text-muted-foreground">
                کارت‌ها رو به پایین‌اند — هر واژه و معنی‌اش را از حفظ پیدا کن!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
            <p>
              دو کارت را برگردان؛ اگر واژه انگلیسی و معنی فارسی هم باشند می‌مانند. کمترین حرکت و زمان = رکورد!
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
            <p className="mb-2 text-[13px] font-bold">چند جفت؟</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="تعداد جفت کارت‌ها">
              {PAIR_OPTIONS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPairCount(n)}
                  aria-pressed={pairCount === n}
                  className={cn(
                    "min-h-11 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
                    pairCount === n
                      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {faNum(n)} جفت
                </button>
              ))}
            </div>
          </div>

          {best && (
            <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
              <Trophy size={12} />
              بهترین رکورد: {faNum(best.moves)} حرکت در {fmtTime(best.time)}
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
    // ستاره‌بندی per-game (فاز G1-06): بازی بی‌نقص = ۱۰۰٪ دقت
    const acc = Math.round((pairCount / Math.max(moves, 1)) * 100);
    const stars = acc >= 85 ? 3 : acc >= 60 ? 2 : 1;
    return (
      <ResultScreen
        title="همه جفت‌ها پیدا شد!"
        stars={stars}
        isRecord={isRecord}
        errorCount={missedWords.length}
        reviewItems={missedWords}
        stats={[
          { label: "زمان", value: fmtTime(secs), icon: <Timer size={16} className="text-primary" /> },
          { label: "حرکت", value: faNum(moves), icon: <MousePointerClick size={16} className="text-teal-500" /> },
          { label: "دقت", value: `${faNum(acc)}٪`, icon: <Target size={16} className="text-amber-500" /> },
        ]}
        onReplay={start}
        onExit={() => setPhase("setup")}
        exitLabel="تنظیمات"
      />
    );
  }

  // ── Playing ──
  const pct = Math.round((matchedIds.size / Math.max(cards.length, 1)) * 100);
  return (
    <>
      {/* فاز G1-05 — هدر یکنواخت از کیت: نام + بج‌ها + راهنما/توقف/صدا/انصراف */}
      <GameShell
        title="تطبیق حافظه"
        icon={<LayoutGrid size={18} />}
        stats={
          <>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <Timer size={11} />
              {fmtTime(secs)}
            </Badge>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <Target size={11} className="text-amber-500" />
              {faNum(moves)} حرکت
            </Badge>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <CheckCircle2 size={11} className="text-primary" />
              {faNum(matchedIds.size / 2)} / {faNum(pairCount)}
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
        onMuteToggle={() => setMuted(toggleSoundMuted())}
        onHelp={handleHelp}
        onExit={handleExitClick}
      >
      <div className="relative">
      {/* فاز G2-a — wrapper گرید با tabIndex=0 نقطهٔ ورود Tab است؛ این‌جا onKeyDown می‌گذاریم نه روی هر کارت */}
      <div
        ref={gridRef}
        role="group"
        aria-label="گرید کارت‌ها — با فلش‌ها بین کارت‌ها جابه‌جا شو و با Enter کارت را برگردان"
        tabIndex={paused ? -1 : 0}
        onKeyDown={handleGridKeyDown}
        className={cn("grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3", paused && "pointer-events-none blur-sm")}
        aria-hidden={paused}
      >
        {cards.map((c, i) => {
          const isMatched = matchedIds.has(c.id);
          const isOpen = isMatched || openIds.includes(c.id);
          const isWrong = wrongIds.includes(c.id);
          // فاز G2-a — aria-label وضعیت‌مند (الگوی describeOption سند): کارت بسته فقط شماره؛
          // کارت باز/جفت‌شده متن واقعی (واژهٔ انگلیسی یا معنی فارسی) با موقعیت روی گرید
          const face = c.side === "en" ? `واژه ${c.word}` : `معنی ${c.meaning}`;
          const label = isMatched
            ? `کارت شمارهٔ ${faNum(i + 1)} — ${face} — جفت شد`
            : isOpen
              ? `کارت شمارهٔ ${faNum(i + 1)} — ${face}`
              : `کارت شمارهٔ ${faNum(i + 1)}`;
          // فاز G2-a — الگوی نشانگر سیار: دکمه‌ها از ترتیب Tab خارج‌اند تا دو نشانگر موازی نسازد
          return (
            <button
              key={c.id}
              type="button"
              tabIndex={-1}
              onClick={() => {
                // فاز G2-a — همگام‌سازی نشانگر کیبورد با لمس/کلیک
                setFocusIdx(i);
                handleCardClick(c);
              }}
              disabled={isMatched}
              aria-pressed={isOpen}
              aria-label={label}
              data-focused={i === focusIdx ? "true" : undefined}
              className={cn(
                "flip-scene h-24 sm:h-28 cursor-pointer select-none rounded-lg",
                isMatched && "match-pop",
                isWrong && "match-shake",
                // فاز G2-a — حلقهٔ کهربایی نشانگر کیبورد چهارجهته
                i === focusIdx && "ring-2 ring-amber-400 ring-offset-1",
              )}
            >
              <div className={cn("flip-inner", isOpen && "flipped")}>
                {/* روی کارت — رو به پایین */}
                <div className="flip-face flex h-full w-full items-center justify-center rounded-xl border-2 border-primary/25 bg-gradient-to-br from-primary/15 to-amber-500/10 shadow-md">
                  <span className="text-2xl font-black text-primary/40">؟</span>
                </div>
                {/* پشت کارت — محتوای واقعی */}
                <div
                  className={cn(
                    "flip-face flip-back flex h-full w-full items-center justify-center rounded-xl border bg-card p-2 shadow-md",
                    isMatched && "border-primary/50 opacity-60",
                    isWrong && "border-destructive/60 bg-destructive/10",
                  )}
                >
                  {c.side === "en" ? (
                    <span dir="ltr" className="font-en text-center text-[13px] font-black sm:text-[15px]">
                      {c.word}
                    </span>
                  ) : (
                    <span className="text-center text-[12px] font-bold leading-6 sm:text-[13px]">
                      {c.meaning}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* فاز G1-03 — اورلی توقف: کارت‌ها تار و غیرقابل‌کلیک؛ اعلام متنی در liveMsg سراسری */}
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
          stopSpeaking();
          setExitAsk(false);
          resume();
          setPhase("setup");
        }}
      />
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
