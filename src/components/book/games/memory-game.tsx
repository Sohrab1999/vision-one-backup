"use client";

/**
 * بازی «تطبیق حافظه» (Memory Pairs) — فاز ۳ نقشه راه جامع ۲۰۲۶.
 *
 * همه کارت‌ها رو به پایین‌اند: هر واژه یک کارت انگلیسی و یک کارت معنی فارسی دارد.
 * جفت درست باز می‌ماند (ثبت در SRS + پخش تلفظ)، جفت غلط با لرزش دوباره بسته می‌شود
 * (کاوش است — چیزی ثبت نمی‌شود). رکورد شخصی: کمترین حرکت، تساوی → کمترین زمان؛
 * اسکوپ رکورد: درس (یا کل کتاب) × تعداد جفت.
 */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  LayoutGrid,
  Play,
  RotateCcw,
  Trophy,
  Timer,
  Target,
  PartyPopper,
  CheckCircle2,
  MousePointerClick,
  Sparkles,
  Pause,
  Volume2,
  VolumeX,
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
  /** پیام باکس aria-live — اعلام جفت درست/غلط برای فناوری‌های کمکی */
  const [liveMsg, setLiveMsg] = useState("");

  // فاز G1 (پایلوت کیت بازی) — توقف/ادامهٔ استاندارد + نگهبان خروج + کلید صدا/لرزش
  // توقف خودکار در تب مخفی هم همین‌جا اعمال می‌شود (سطح بالاتر از گارد G0-05: کاربر
  // هنگام بازگشت اورلی «متوقف شد» می‌بیند و خودش ادامه می‌دهد)
  const { paused, resume, toggle: togglePause } = useGamePause((p) => {
    if (phase === "playing") setLiveMsg(p ? "بازی متوقف شد ⏸" : "ادامهٔ بازی ▶");
  });
  const [exitAsk, setExitAsk] = useState(false);
  const [muted, setMuted] = useState(isSoundMuted());

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

  useEffect(() => () => stopSpeaking(), []);

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
    busy.current = false;
    resume();
    setExitAsk(false);
    setPhase("playing");
  }, [data.vocab, lesson, pairCount, resume]);

  const finish = useCallback(
    (finalMoves: number, finalSecs: number) => {
      touchStreak();
      recordStudySession();
      bumpPlays(activeBookId, GAME_KEY);
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
        setTimeout(() => {
          setWrongIds([]);
          setOpenIds([]);
          busy.current = false;
        }, WRONG_LOCK_MS);
      }
    },
    [cards, finish, matchedIds, moves, openIds, paused, speed],
  );

  // ── Setup ──
  if (phase === "setup") {
    return (
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
    );
  }

  // ── Done ──
  if (phase === "done") {
    const acc = Math.round((pairCount / Math.max(moves, 1)) * 100);
    return (
      <Card className="mx-auto max-w-xl rise-in border-amber-500/30">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <PartyPopper size={30} />
          </span>
          <h2 className="text-xl font-black">همه جفت‌ها پیدا شد!</h2>
          {isRecord && (
            <Badge className="gap-1.5 bg-amber-500 text-amber-950 shadow-md shadow-amber-500/30">
              <Trophy size={13} />
              رکورد جدید! 🏆
            </Badge>
          )}
          <div className="grid w-full grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-muted/60 p-3">
              <Timer size={16} className="mx-auto text-primary" />
              <p className="mt-1.5 text-lg font-black leading-none">{fmtTime(secs)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">زمان</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <MousePointerClick size={16} className="mx-auto text-teal-500" />
              <p className="mt-1.5 text-lg font-black leading-none">{faNum(moves)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">حرکت</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <Target size={16} className="mx-auto text-amber-500" />
              <p className="mt-1.5 text-lg font-black leading-none">{faNum(acc)}٪</p>
              <p className="mt-1 text-[10px] text-muted-foreground">دقت</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={start} className="h-11 gap-2">
              <RotateCcw size={16} />
              دور جدید
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
  const pct = Math.round((matchedIds.size / Math.max(cards.length, 1)) * 100);
  return (
    <div role="group" aria-label="بازی تطبیق حافظه" className="mx-auto max-w-2xl space-y-4 rise-in">
      <div className="flex flex-wrap items-center gap-2">
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
        {/* فاز G1 — کنترل‌های استاندارد: توقف/ادامه + کلید صدا/لرزش */}
        <div className="mr-auto flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="sm"
            className="h-11 w-11 p-0 text-muted-foreground"
            onClick={togglePause}
            aria-pressed={paused}
            aria-label={paused ? "ادامهٔ بازی" : "توقف بازی"}
          >
            {paused ? <Play size={15} /> : <Pause size={15} />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-11 w-11 p-0 text-muted-foreground"
            onClick={() => setMuted(toggleSoundMuted())}
            aria-pressed={muted}
            aria-label={muted ? "روشن‌کردن صدا" : "بی‌صدا"}
          >
            {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-11 text-[11px] text-muted-foreground"
            onClick={() => {
              stopSpeaking();
              // نگهبان خروج (فاز G1-04) — هر پیشرفتی یعنی دور نیمه‌کاره
              if (moves > 0 || openIds.length > 0 || matchedIds.size > 0) {
                setExitAsk(true);
              } else {
                setPhase("setup");
              }
            }}
          >
            انصراف
          </Button>
        </div>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-l from-primary to-emerald-400 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* اعلام زندهٔ نتیجه برای فناوری‌های کمکی (WCAG 4.1.3) */}
      <p role="status" aria-live="polite" className="sr-only">
        {liveMsg}
      </p>

      <div className="relative">
      <div
        className={cn("grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3", paused && "pointer-events-none blur-sm")}
        aria-hidden={paused}
      >
        {cards.map((c, i) => {
          const isMatched = matchedIds.has(c.id);
          const isOpen = isMatched || openIds.includes(c.id);
          const isWrong = wrongIds.includes(c.id);
          const label = isMatched
            ? c.side === "en"
              ? `واژه ${c.word} — جفت شد`
              : `معنی ${c.meaning} — جفت شد`
            : isOpen
              ? c.side === "en"
                ? `واژه ${c.word}`
                : `معنی: ${c.meaning}`
              : `کارت ${faNum(i + 1)} رو به پایین`;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => handleCardClick(c)}
              disabled={isMatched}
              aria-pressed={isOpen}
              aria-label={label}
              className={cn(
                "flip-scene h-24 sm:h-28 cursor-pointer select-none",
                isMatched && "match-pop",
                isWrong && "match-shake",
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
          stopSpeaking();
          setExitAsk(false);
          resume();
          setPhase("setup");
        }}
      />
    </div>
  );
}
