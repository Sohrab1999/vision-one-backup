"use client";

/**
 * بازی «شکار صدا» (Listening Hunt) — فاز ۴ نقشه راه ویژن‌وان.
 *
 * تمرین شنیداری خالص: واژهٔ انگلیسی با TTS خوانده می‌شود ولی هرگز نوشته نمی‌شود —
 * بازیکن باید از میان ۴ معنی فارسی، معنی درست را شکار کند.
 * پاسخ درست → تلفظ دوباره + ثبت در SRS؛ پاسخ غلط → آشکارسازی واژه + صف مرور.
 * رکورد شخصی: بیشترین امتیاز — اسکوپ: درس × تعداد سؤال × سرعت پخش.
 */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  BookPlus,
  CheckCircle2,
  Headphones,
  PartyPopper,
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
  pickUnique,
  saveAttempt,
  saveBest,
  shuffle,
  subscribeGameData,
} from "./shared";

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

/** شکل رکورد شخصی — بهتر = امتیاز (تعداد شکار درست) بیشتر */
interface BestRecord {
  score: number;
}

const ALL_LESSONS = -1;
const GAME_KEY = "listening-hunt";
const COUNT_OPTIONS = [5, 10];
/** تعداد دام برای هر سؤال */
const TRAPS = 3;
/** سرعت پخش — ثابت (آهسته برای تمرین دقیق، عادی برای شنیدار طبیعی) */
const SPEED_OPTIONS = [
  { value: 0.65, label: "آهسته" },
  { value: 1, label: "عادی" },
] as const;
/** مکث پس از پاسخ درست (ms) */
const CORRECT_LOCK_MS = 700;
/** مکث پس از پاسخ غلط — فرصت دیدن واژهٔ درست (ms) */
const WRONG_LOCK_MS = 1400;
/** کلاس چیپ‌های انتخاب (setup) */
const chipCls = (active: boolean): string =>
  cn(
    "min-h-11 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
    active
      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
      : "text-muted-foreground hover:bg-muted",
  );
/** نگاشت کلیدهای ۱..۴ (لاتین و فارسی) به اندیس گزینه */
const KEY_TO_OPTION: Record<string, number> = {
  "1": 0,
  "2": 1,
  "3": 2,
  "4": 3,
  "۱": 0,
  "۲": 1,
  "۳": 2,
  "۴": 3,
};

export function ListeningHuntGame() {
  const data = useBookData();
  const { bookId } = useBook();
  // بازی‌ها فقط داخل کتاب فعال رندر می‌شوند (useBookData بالا گارد است) — bookId عملاً هرگز null نیست
  const activeBookId: string = bookId ?? "";

  const [phase, setPhase] = useState<Phase>("setup");
  const [lesson, setLesson] = useState(ALL_LESSONS);
  const [count, setCount] = useState(5);
  const [speed, setSpeed] = useState<number>(1);

  const [deck, setDeck] = useState<HuntQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [correct, setCorrect] = useState(0);
  const [wrongList, setWrongList] = useState<WrongItem[]>([]);
  const [secs, setSecs] = useState(0);
  const [isRecord, setIsRecord] = useState(false);

  const locked = useRef(false);
  const secsRef = useRef(0);
  const idxRef = useRef(0);
  const correctRef = useRef(0);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // رکورد شخصی این اسکوپ — اسنپ‌شات رشته‌ای (primitive تا هر خواندن آبجکت تازه نسازد)
  const bestScope = `${lesson === ALL_LESSONS ? "all" : lesson}:${count}:${speed}`;
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
  useEffect(() => {
    if (phase !== "playing") return;
    const t = setInterval(() => {
      secsRef.current += 1;
      setSecs((s) => s + 1);
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  // cleanup: تایمر معلق + توقف صدا (unmount)
  useEffect(
    () => () => {
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
      saveAttempt(activeBookId, GAME_KEY, {
        lesson: lesson === ALL_LESSONS ? 0 : lesson,
        total: count,
        correct: finalCorrect,
        duration: finalSecs,
        detail: { speed },
      });
      setSecs(finalSecs);
      const scope = `${lesson === ALL_LESSONS ? "all" : lesson}:${count}:${speed}`;
      const prev = loadBest<BestRecord>(activeBookId, GAME_KEY, scope);
      if (!prev || finalCorrect > prev.score) {
        saveBest(activeBookId, GAME_KEY, scope, { score: finalCorrect });
        setIsRecord(true);
        toast.success(`رکورد جدید! ${faNum(finalCorrect)} از ${faNum(count)} 🏆`);
      } else {
        toast.success(`شکار تمام شد — ${faNum(finalCorrect)} از ${faNum(count)} 🎯`);
      }
      setPhase("done");
    },
    [activeBookId, clearAdvance, count, lesson, speed],
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
    // پخش خودکار سؤال بعد — در ادامهٔ زنجیرهٔ callback (مجاز)
    speak(deck[nextIdx].word, { speed });
  }, [clearAdvance, deck, finish, speed]);

  const handleOption = useCallback(
    (optIdx: number) => {
      if (locked.current) return;
      const q = deck[idxRef.current];
      if (!q) return;
      locked.current = true;
      setSelected(optIdx);
      if (optIdx === q.answer) {
        setResult("correct");
        correctRef.current += 1;
        setCorrect((c) => c + 1);
        recordSRS(q.word, true);
        speak(q.word, { speed }); // تلفظ دوبارهٔ واژهٔ شکارشده
        advanceTimer.current = setTimeout(advance, CORRECT_LOCK_MS);
      } else {
        setResult("wrong");
        setWrongList((prev) => [...prev, { word: q.word, meaning: q.meaning }]);
        recordSRS(q.word, false);
        advanceTimer.current = setTimeout(advance, WRONG_LOCK_MS);
      }
    },
    [advance, deck, speed],
  );

  // latest-ref برای callback کیبورد (ضد کلوزر کهنه)
  const optionRef = useRef(handleOption);
  useEffect(() => {
    optionRef.current = handleOption;
  });

  // کیبورد ۱..۴ (و ارقام فارسی) برای گزینه‌ها — فقط در فاز بازی
  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const i = KEY_TO_OPTION[e.key];
      if (i === undefined) return;
      optionRef.current(i);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

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

  const start = useCallback(() => {
    const deduped = buildPool();
    // گارد: استخر باید حداقل سؤال‌ها + ۳ دام (و در عمل ۵) واژه داشته باشد
    const minPool = Math.max(count + TRAPS, 5);
    const chosen = pickUnique(deduped, count, (w) => w.word);
    if (deduped.length < minPool || chosen.length < count) {
      toast.error(
        `واژهٔ کافی برای ${faNum(count)} سؤال پیدا نشد — حداقل ${faNum(minPool)} واژه لازم است؛ درس دیگری را امتحان کن`,
      );
      return;
    }
    const built: HuntQuestion[] = chosen.map((w) => {
      // ۳ دام از همان استخر — واژهٔ متفاوت (همنامِ صوتیِ دو معنیِ «run» ناعادلانه می‌شود) و معنی یکتا
      const traps = shuffle(deduped.filter((d) => d.word !== w.word && d.meaning !== w.meaning))
        .slice(0, TRAPS)
        .map((d) => d.meaning);
      const options = shuffle([w.meaning, ...traps]);
      return { word: w.word, meaning: w.meaning, options, answer: options.indexOf(w.meaning) };
    });
    clearAdvance();
    idxRef.current = 0;
    correctRef.current = 0;
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
    setPhase("playing");
    // پخش خودکار اولین واژه — در handler کلیک (تعامل کاربر موجود است)
    speak(built[0].word, { speed });
  }, [buildPool, clearAdvance, count, speed]);

  const quit = useCallback(() => {
    clearAdvance();
    stopSpeaking();
    setPhase("setup");
  }, [clearAdvance]);

  // ── Setup ──
  if (phase === "setup") {
    return (
      <Card className="mx-auto max-w-xl rise-in">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Headphones size={22} />
            </span>
            <div>
              <h2 className="text-lg font-black">شکار صدا</h2>
              <p className="text-xs text-muted-foreground">
                واژه را فقط بشنو — معنی درست را از میان ۴ گزینه شکار کن!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
            <p>
              واژهٔ انگلیسی خوانده می‌شود ولی هرگز نوشته نمی‌شود — فقط با گوش! هر شکار درست یک امتیاز
              است؛ پاسخ غلط واژه را آشکار می‌کند و به مرور اضافه می‌شود.
            </p>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">کدام درس؟</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب درس">
              <button
                type="button"
                onClick={() => setLesson(ALL_LESSONS)}
                aria-pressed={lesson === ALL_LESSONS}
                className={chipCls(lesson === ALL_LESSONS)}
              >
                کل کتاب ({faNum(data.vocab.all.length)} واژه)
              </button>
              {data.vocab.lessons.filter((l) => l.lesson > 0).map((l) => (
                <button
                  key={l.lesson}
                  type="button"
                  onClick={() => setLesson(l.lesson)}
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
                  onClick={() => setCount(n)}
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
                  onClick={() => setSpeed(s.value)}
                  aria-pressed={speed === s.value}
                  className={chipCls(speed === s.value)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

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
    );
  }

  // ── Done ──
  if (phase === "done") {
    const acc = Math.round((correct / Math.max(count, 1)) * 100);
    return (
      <Card className="mx-auto max-w-xl rise-in border-amber-500/30">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <PartyPopper size={30} />
          </span>
          <h2 className="text-xl font-black">شکار تمام شد!</h2>
          {isRecord && (
            <Badge className="gap-1.5 bg-amber-500 text-amber-950 shadow-md shadow-amber-500/30">
              <Trophy size={13} />
              رکورد جدید! 🏆
            </Badge>
          )}
          <div className="grid w-full grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-muted/60 p-3">
              <Target size={16} className="mx-auto text-emerald-500" />
              <p className="mt-1.5 text-lg font-black leading-none">{faNum(correct)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">امتیاز از {faNum(count)}</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <Sparkles size={16} className="mx-auto text-teal-500" />
              <p className="mt-1.5 text-lg font-black leading-none">{faNum(acc)}٪</p>
              <p className="mt-1 text-[10px] text-muted-foreground">دقت</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <Timer size={16} className="mx-auto text-amber-500" />
              <p className="mt-1.5 text-lg font-black leading-none">{fmtTime(secs)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">زمان</p>
            </div>
          </div>

          {wrongList.length > 0 && (
            <div className="w-full space-y-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-right">
              <p className="text-[12px] font-black text-destructive">به مرور اضافه شد</p>
              {wrongList.map((wItem, i) => (
                <div
                  key={`${wItem.word}-${i}`}
                  className="flex items-center justify-between gap-2 rounded-lg bg-card/70 px-3 py-2"
                >
                  <span className="text-[12px] font-bold">{wItem.meaning}</span>
                  <span dir="ltr" className="font-en text-[13px] font-black text-destructive">
                    {wItem.word}
                  </span>
                  <Badge
                    variant="outline"
                    className="gap-1 border-amber-500/40 text-[10px] text-amber-600 dark:text-amber-400"
                  >
                    <BookPlus size={11} />
                    مرور
                  </Badge>
                </div>
              ))}
            </div>
          )}

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
  const q: HuntQuestion | undefined = deck[idx];
  const pct = Math.round(((idx + (result !== null ? 1 : 0)) / Math.max(deck.length, 1)) * 100);
  return (
    <div role="group" aria-label="بازی شکار صدا" className="mx-auto max-w-xl space-y-4 rise-in">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="gap-1 text-[11px]">
          <Timer size={11} />
          {fmtTime(secs)}
        </Badge>
        <Badge variant="secondary" className="gap-1 text-[11px]">
          <Target size={11} className="text-emerald-500" />
          {faNum(correct)} درست
        </Badge>
        <Badge variant="secondary" className="gap-1 text-[11px]">
          <Headphones size={11} className="text-amber-500" />
          {faNum(idx + 1)} / {faNum(count)}
        </Badge>
        <div className="mr-auto">
          <Button
            variant="ghost"
            size="sm"
            className="h-11 text-[11px] text-muted-foreground"
            onClick={quit}
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
              <Button
                variant="outline"
                className="min-h-11 gap-2"
                onClick={() => speak(q.word, { speed })}
                aria-label="تکرار صدا"
              >
                <Volume2 size={16} />
                تکرار صدا
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

            {/* ۴ گزینهٔ معنی فارسی — درست + ۳ دام متمایز */}
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
              کلیدهای {faNum(1)} تا {faNum(4)} برای انتخاب سریع
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
