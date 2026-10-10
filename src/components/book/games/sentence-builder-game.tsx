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
 */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  Blocks,
  Play,
  RotateCcw,
  Trophy,
  Timer,
  CheckCircle2,
  XCircle,
  Eraser,
  Lightbulb,
  SkipForward,
  Sparkles,
  PartyPopper,
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

  const locked = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const secsRef = useRef(0);

  const busy = pop;

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
  useEffect(() => {
    if (phase !== "playing") return;
    const t = window.setInterval(() => {
      secsRef.current += 1;
      setSecs((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(t);
  }, [phase]);

  // ── پاک‌سازی نهایی: تلفظ + تایمر معلق ──
  useEffect(() => {
    return () => {
      stopSpeaking();
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
  }, []);

  /** پایان دور — استریک/جلسه/Attempt/رکورد */
  const finishRun = useCallback(
    (finalSolved: number) => {
      touchStreak();
      recordStudySession();
      bumpPlays(activeBookId, GAME_KEY);
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
      speak(item.en, { speed });
      timer.current = window.setTimeout(() => {
        locked.current = false;
        setPop(false);
        advanceOrFinish(idx + 1, finalSolved);
      }, SOLVE_LOCK_MS);
    },
    [speed, idx, advanceOrFinish],
  );

  /** گذاشتن یک واژه از استخر در اولین خانهٔ خالی + بررسی چیدن کامل */
  const placeTile = useCallback(
    (tileId: number) => {
      if (locked.current) return;
      const current = deck[idx];
      if (!current) return;
      const empty = slots.indexOf(null);
      if (empty === -1) return;
      const tile = tiles.find((t) => t.id === tileId);
      if (!tile) return;
      const nextSlots = [...slots];
      nextSlots[empty] = tileId;
      setSlots(nextSlots);
      // همهٔ خانه‌ها پر شد؟ ترتیب چیده‌شده را با جملهٔ پایه بسنجیم
      if (nextSlots.every((s) => s !== null)) {
        const attempt = nextSlots.map((s) => tiles.find((t) => t.id === s)?.word ?? "");
        const ok = attempt.every((w, i) => w === words[i]);
        if (ok) {
          const finalSolved = solved + 1;
          setSolved(finalSolved);
          solveSentence(current, finalSolved);
        }
      }
    },
    [deck, idx, slots, tiles, words, solved, solveSentence],
  );

  /** برگرداندن واژهٔ یک خانه به استخر (کلیک روی خانهٔ پر) */
  const returnAt = useCallback((index: number) => {
    if (locked.current) return;
    setSlots((prev) => {
      if (prev[index] === null) return prev;
      const next = [...prev];
      next[index] = null;
      return next;
    });
  }, []);

  /** پاک کردن آخرین واژه (دکمه یا Backspace) */
  const returnLast = useCallback(() => {
    if (locked.current) return;
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
  }, []);

  /** پاک کردن همه — همهٔ واژه‌ها به استخر برمی‌گردند */
  const clearAll = useCallback(() => {
    if (locked.current) return;
    setSlots((prev) => (prev.every((s) => s === null) ? prev : prev.map(() => null)));
  }, []);

  /** راهنمای دوم — یک واژهٔ درستِ بعدی را جای‌گذاری می‌کند (رکورد دور می‌سوزد) */
  const applyHint = useCallback(() => {
    if (locked.current) return;
    const empty = slots.indexOf(null);
    if (empty === -1) return;
    const used = new Set(slots.filter((s): s is number => s !== null));
    const tile = tiles.find((t) => !used.has(t.id) && t.word === words[empty]);
    if (!tile) return;
    setHinted((h) => h + 1);
    placeTile(tile.id);
  }, [slots, tiles, words, placeTile]);

  /** رد کردن — بدون SRS، فقط شمارش و جملهٔ بعد (رکورد دور می‌سوزاند) */
  const skipSentence = useCallback(() => {
    if (locked.current) return;
    const current = deck[idx];
    if (!current) return;
    locked.current = true;
    setSkipped((s) => s + 1);
    timer.current = window.setTimeout(() => {
      locked.current = false;
      advanceOrFinish(idx + 1, solved);
    }, SKIP_LOCK_MS);
  }, [deck, idx, solved, advanceOrFinish]);

  /** انصراف — تایمر معلق پاک و به تنظیمات برگردیم */
  const cancel = useCallback(() => {
    if (timer.current !== undefined) window.clearTimeout(timer.current);
    locked.current = false;
    stopSpeaking();
    setPhase("setup");
  }, []);

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
    loadSentence(picked[0]);
    setPhase("playing");
  }, [poolInfo, count, loadSentence]);

  // ── کیبورد (latest-ref): Backspace آخرین واژهٔ چیده‌شده را برمی‌گرداند ──
  const returnLastRef = useRef<() => void>(() => {});
  useEffect(() => {
    returnLastRef.current = returnLast;
  });
  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "Backspace") {
        e.preventDefault();
        returnLastRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  const current = deck[idx];
  const usedIds = new Set(slots.filter((s): s is number => s !== null));
  const wordOf = (id: number): string => tiles.find((t) => t.id === id)?.word ?? "";
  const pct = Math.round(((solved + skipped) / Math.max(deck.length, 1)) * 100);

  // ── Setup ──
  if (phase === "setup") {
    return (
      <Card className="mx-auto max-w-xl rise-in">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400">
              <Blocks size={22} />
            </span>
            <div>
              <h2 className="text-lg font-black">سازنده جمله</h2>
              <p className="text-xs text-muted-foreground">
                واژه‌های جمله به‌هم ریخته‌اند — از روی ترجمه، جمله را درست بچین!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
            <p>
              روی واژه‌ها به ترتیب بزن تا جملهٔ انگلیسی ساخته شود؛ ترجمهٔ فارسی از ابتدا نمایان است.
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
    );
  }

  // ── Done ──
  if (phase === "done") {
    return (
      <Card className="mx-auto max-w-xl rise-in border-amber-500/30">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <PartyPopper size={30} />
          </span>
          <h2 className="text-xl font-black">همه جمله‌ها چیده شد!</h2>
          {isRecord && (
            <Badge className="gap-1.5 bg-amber-500 text-amber-950 shadow-md shadow-amber-500/30">
              <Trophy size={13} />
              رکورد جدید! 🏆
            </Badge>
          )}

          <div className="grid w-full grid-cols-2 gap-2 text-center sm:grid-cols-4">
            <div className="rounded-xl bg-muted/60 p-3">
              <Timer size={16} className="mx-auto text-primary" />
              <p className="mt-1.5 text-lg font-black leading-none">{fmtTime(secs)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">زمان</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <CheckCircle2 size={16} className="mx-auto text-emerald-500" />
              <p className="mt-1.5 text-lg font-black leading-none">{faNum(solved)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">درست</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <XCircle size={16} className="mx-auto text-amber-500" />
              <p className="mt-1.5 text-lg font-black leading-none">{faNum(skipped)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">ردشده</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <Lightbulb size={16} className="mx-auto text-teal-500" />
              <p className="mt-1.5 text-lg font-black leading-none">{faNum(hinted)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">راهنما</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={start} className="min-h-11 gap-2">
              <RotateCcw size={16} />
              دور جدید
            </Button>
            <Button variant="outline" className="min-h-11" onClick={() => setPhase("setup")}>
              تنظیمات
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ── Playing ──
  return (
    <div role="group" aria-label="بازی سازنده جمله" className="mx-auto max-w-2xl space-y-4 rise-in">
      {/* نوار بالا */}
      <div className="flex flex-wrap items-center gap-2">
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
        <div className="mr-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={cancel}
            className="h-11 text-[11px] text-muted-foreground"
          >
            انصراف
          </Button>
        </div>
      </div>

      {/* نوار پیشرفت */}
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-l from-primary to-emerald-400 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

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

          {/* ردیف جمله — خانه‌های چیدمان (LTR) */}
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
                  className="h-11 min-w-16 rounded-xl border-2 border-dashed border-muted-foreground/30"
                />
              ) : (
                <button
                  key={`slot-${i}`}
                  type="button"
                  onClick={() => returnAt(i)}
                  disabled={busy}
                  aria-label={`برگشت واژه ${wordOf(slotId)} به استخر`}
                  className="h-11 rounded-xl border-2 border-primary/40 bg-primary/10 px-3 font-en text-[13px] font-black text-primary transition-all hover:border-primary/70 hover:bg-primary/20 disabled:pointer-events-none disabled:opacity-60 sm:text-[15px]"
                >
                  {wordOf(slotId)}
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
            کیبورد: Backspace آخرین واژه را برمی‌گرداند · کلیک روی واژهٔ چیده‌شده آن را به استخر برمی‌گرداند
          </p>
        </div>
      )}
    </div>
  );
}
