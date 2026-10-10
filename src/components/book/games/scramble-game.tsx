"use client";

/**
 * بازی «حروف جابه‌جا» (Word Scramble) — فاز ۳ نقشه راه جامع ۲۰۲۶.
 *
 * حروف واژه‌های انگلیسی به‌هم ریخته می‌شوند؛ بازیکن با معنی فارسی حروف را
 * با کلیک (یا کیبورد) سر جای خودش می‌چیند.
 * - حل درست: recordSRS(✓) + پخش تلفظ
 * - رد کردن: recordSRS(✗) + نمایش واژهٔ درست برای ۱ ثانیه
 * - رکورد: سریع‌ترین اجرای کامل (بدون رد/راهنما) به تفکیک درس و تعداد واژه
 */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  Shuffle,
  Play,
  RotateCcw,
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
  PartyPopper,
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
  pickUnique,
  loadBest,
  saveBest,
  bumpPlays,
  saveAttempt,
  subscribeGameData,
} from "./shared";

type Phase = "setup" | "playing" | "done";

/** حرف با شناسه یکتا — حروف تکراری مستقل مدیریت می‌شوند (اینکس‌محور) */
interface Tile {
  id: number;
  letter: string;
}

/** شکل رکورد شخصی این بازی */
interface BestRec {
  time: number;
}

/** ردیف جزئیات دور — برای Attempt سروری و فهرست ردشده‌ها */
interface DetailRow {
  word: string;
  ok: boolean;
}

const ALL_LESSONS = -1;
const ROUND_OPTIONS = [5, 8, 12];

/** فقط واژه‌های تک‌کلمه‌ای لاتینِ ۳ تا ۱۲ حرفی وارد بازی می‌شوند */
const WORD_RE = /^[A-Za-z]{3,12}$/;

/** واژهٔ پایه — حذف نشانه‌های دستوری داخل پرانتز: "dry (adj.)" → "dry" */
function baseWord(w: string): string {
  return w.replace(/\s*\([^)]*\)\s*/g, " ").trim();
}

export function ScrambleGame() {
  const data = useBookData();
  const { bookId: activeBookId } = useBook();
  // بازی فقط داخل کتاب فعال رندر می‌شود (useBookData بالا تضمینش می‌کند) — در عمل هرگز تهی نیست
  const bookId: string = activeBookId ?? "";
  const { speed } = useVoiceSpeed();

  const [phase, setPhase] = useState<Phase>("setup");
  const [lesson, setLesson] = useState<number>(ALL_LESSONS);
  const [rounds, setRounds] = useState<number>(8);

  const [deck, setDeck] = useState<VocabEntry[]>([]);
  const [idx, setIdx] = useState(0);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [slots, setSlots] = useState<(number | null)[]>([]);

  const [solved, setSolved] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [hinted, setHinted] = useState(0);
  const [detail, setDetail] = useState<DetailRow[]>([]);
  const [secs, setSecs] = useState(0);
  const [isRecord, setIsRecord] = useState(false);

  /** انیمیشن match-pop روی ردیف پاسخ هنگام حل درست */
  const [pop, setPop] = useState(false);
  /** واژهٔ درستی که بعد از رد کردن برای ۱ ثانیه نشان داده می‌شود */
  const [reveal, setReveal] = useState<string | null>(null);

  const locked = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const secsRef = useRef(0);

  const busy = pop || reveal !== null;

  // استخر قابل بازی — فقط واژه‌های تک‌کلمه‌ای ۳ تا ۱۲ حرفی
  const pool = useMemo(() => {
    const base = lesson === ALL_LESSONS ? data.vocab.all : data.vocab.ofLesson(lesson);
    return base.filter((w) => WORD_RE.test(baseWord(w.word)));
  }, [data.vocab, lesson]);

  // رکورد شخصی — snapshot عددی (پایدار برای useSyncExternalStore؛ سرور null)
  const scope = `${lesson === ALL_LESSONS ? "all" : lesson}:${rounds}`;
  const best = useSyncExternalStore(
    subscribeGameData,
    () => {
      const b = loadBest<BestRec>(bookId, "scramble", scope);
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

  // ── پاک‌سازی نهایی: تلفظ + تایمرهای معلق ──
  useEffect(() => {
    return () => {
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

  /** پایان دور — استریک/جلسه/Attempt/رکورد */
  const finishRun = useCallback(
    (finalSolved: number, finalSkipped: number, finalDetail: DetailRow[]) => {
      touchStreak();
      recordStudySession();
      bumpPlays(bookId, "scramble");
      saveAttempt(bookId, "scramble", {
        lesson: lesson === ALL_LESSONS ? 0 : lesson,
        total: deck.length,
        correct: finalSolved,
        duration: secsRef.current,
        detail: finalDetail,
      });
      // رکورد فقط برای اجرای کاملِ بدون رد کردن و بدون راهنما
      if (finalSkipped === 0 && hinted === 0) {
        const recScope = `${lesson === ALL_LESSONS ? "all" : lesson}:${rounds}`;
        const prev = loadBest<BestRec>(bookId, "scramble", recScope);
        if (!prev || secsRef.current < prev.time) {
          saveBest<BestRec>(bookId, "scramble", recScope, { time: secsRef.current });
          setIsRecord(true);
        }
      }
      setPhase("done");
    },
    [bookId, lesson, rounds, deck.length, hinted],
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

  /** حل درست — پاپ + تلفظ + SRS(✓) و بعد واژهٔ بعد */
  const solveWord = useCallback(
    (entry: VocabEntry, finalSolved: number, finalDetail: DetailRow[]) => {
      locked.current = true;
      setPop(true);
      const base = baseWord(entry.word);
      recordSRS(base, true);
      speak(base, { speed });
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
        }
      }
    },
    [deck, idx, slots, tiles, solved, detail, solveWord],
  );

  /** برگرداندن حرفِ یک خانه به استخر (کلیک روی خانهٔ پر) */
  const returnAt = useCallback((index: number) => {
    if (locked.current) return;
    setSlots((prev) => {
      if (prev[index] === null) return prev;
      const next = [...prev];
      next[index] = null;
      return next;
    });
  }, []);

  /** پاک کردن آخرین حرف (دکمه یا Backspace) */
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

  /** راهنما — یک حرف درستِ بعدی را جای‌گذاری می‌کند (رکورد دور می‌سوزد) */
  const applyHint = useCallback(() => {
    if (locked.current) return;
    const current = deck[idx];
    if (!current) return;
    const empty = slots.indexOf(null);
    if (empty === -1) return;
    const base = baseWord(current.word);
    const used = new Set(slots.filter((s): s is number => s !== null));
    const tile = tiles.find((t) => !used.has(t.id) && t.letter === base[empty]);
    if (!tile) return;
    setHinted((h) => h + 1);
    placeTile(tile.id);
  }, [deck, idx, slots, tiles, placeTile]);

  /** رد کردن — SRS(✗) + نمایش واژهٔ درست برای ۱ ثانیه (رکورد دور می‌سوزد) */
  const skipWord = useCallback(() => {
    if (locked.current) return;
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
    timer.current = window.setTimeout(() => {
      locked.current = false;
      setReveal(null);
      advanceOrFinish(idx + 1, solved, nextSkipped, nextDetail);
    }, 1000);
  }, [deck, idx, skipped, detail, solved, advanceOrFinish]);

  /** انصراف — تایمرهای معلق پاک و به تنظیمات برگردیم */
  const cancel = useCallback(() => {
    if (timer.current !== undefined) window.clearTimeout(timer.current);
    locked.current = false;
    stopSpeaking();
    setPhase("setup");
  }, []);

  /** شروع دور — انتخاب واژه‌های یکتا از استخر قابل بازی */
  const start = useCallback(() => {
    const chosen = pickUnique(pool, rounds, (w) => baseWord(w.word));
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
    setDetail([]);
    setSecs(0);
    setIsRecord(false);
    setReveal(null);
    loadWord(chosen[0]);
    setPhase("playing");
  }, [pool, rounds, loadWord]);

  // ── کیبورد: فقط در فاز بازی؛ حروف → جای‌گذاری، Backspace → برگرداندن ──
  useEffect(() => {
    if (phase !== "playing") return;
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
  }, [phase, slots, tiles, placeTile, returnLast]);

  const current = deck[idx];
  const usedIds = new Set(slots.filter((s): s is number => s !== null));
  const letterOf = (id: number): string => tiles.find((t) => t.id === id)?.letter ?? "";
  const pct = Math.round(((solved + skipped) / Math.max(deck.length, 1)) * 100);

  // ── Setup ──
  if (phase === "setup") {
    return (
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
              روی حروف به ترتیب بزن تا واژه ساخته شود؛ کیبورد هم کار می‌کند. واژه‌های سخت را می‌توانی رد کنی ولی رکورد می‌سوزد!
            </p>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">کدام درس؟</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setLesson(ALL_LESSONS)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
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
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
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
            <div className="flex flex-wrap gap-2">
              {ROUND_OPTIONS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRounds(n)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
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
    const skippedRows = detail
      .filter((d) => !d.ok)
      .map((d) => ({
        word: d.word,
        meaning: deck.find((w) => baseWord(w.word) === d.word)?.meaning ?? "",
      }));
    return (
      <Card className="mx-auto max-w-xl rise-in border-amber-500/30">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <PartyPopper size={30} />
          </span>
          <h2 className="text-xl font-black">تمام شد!</h2>
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
              <CheckCircle2 size={16} className="mx-auto text-emerald-500" />
              <p className="mt-1.5 text-lg font-black leading-none">{faNum(solved)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">حل‌شده</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <SkipForward size={16} className="mx-auto text-amber-500" />
              <p className="mt-1.5 text-lg font-black leading-none">{faNum(skipped)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">ردشده</p>
            </div>
          </div>

          {skippedRows.length > 0 && (
            <div className="w-full space-y-1.5 rounded-xl border bg-muted/30 p-3 text-right">
              <p className="text-[11px] font-bold text-muted-foreground">
                این‌ها را رد کردی — به مرور هوشمند اضافه شدند:
              </p>
              <div className="max-h-44 space-y-1.5 overflow-y-auto">
                {skippedRows.map((r) => (
                  <div
                    key={r.word}
                    className="flex items-center justify-between gap-2 rounded-lg border bg-card px-3 py-2"
                  >
                    <span dir="ltr" className="shrink-0 font-en text-[13px] font-black">
                      {r.word}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[12px] font-bold">{r.meaning}</span>
                    <Badge
                      variant="outline"
                      className="shrink-0 gap-1 border-emerald-500/40 text-[9px] text-emerald-600 dark:text-emerald-400"
                    >
                      <CheckCircle2 size={10} />
                      به مرور اضافه شد
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

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
    <div className="mx-auto max-w-xl space-y-4 rise-in">
      {/* نوار بالا */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="gap-1 text-[11px]">
          <Target size={11} className="text-amber-500" />
          واژه {faNum(idx + 1)} از {faNum(deck.length)}
        </Badge>
        <Badge variant="secondary" className="gap-1 text-[11px]">
          <Timer size={11} />
          {fmtTime(secs)}
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

      {/* کارت واژه */}
      {current && (
        <div className="space-y-5 rounded-2xl border bg-card p-6">
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

          {/* دکمه‌های کمکی */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={returnLast}
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
              onClick={skipWord}
              disabled={busy}
              className="min-h-11 flex-1 gap-1.5 text-[12px] text-destructive hover:bg-destructive/10 hover:text-destructive"
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
    </div>
  );
}
