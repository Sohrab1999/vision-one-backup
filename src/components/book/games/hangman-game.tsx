"use client";

/**
 * بازی «دارباز» (Hangman) — فاز ۴ نقشه راه جامع ۲۰۲۶.
 *
 * حدس حرف‌به‌حرف واژه‌های انگلیسی با سرنخ «معنی فارسی + نوع واژه (pos)».
 * به‌جای شکل کلاسیک دارباز، ۶ جان = ۶ بادکنک رنگی است: هر حرف غلط یک بادکنک
 * می‌ترکد (transition سادهٔ scale + opacity) و خط‌چین حباب خالی می‌ماند.
 * - برد واژه: recordSRS(✓) + پخش تلفظ + Badge سبز
 * - باخت واژه: نمایش کامل واژه + recordSRS(✗) + Badge «به مرور اضافه شد»
 * - رکورد شخصی: بیشترین برد (score) به تفکیک درس × تعداد واژهٔ دور
 * - حروف تکراری یک‌جا آشکار می‌شوند؛ قفل double-guess با ref همگام است
 */

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  CheckCircle2,
  PartyPopper,
  Play,
  PlusCircle,
  RotateCcw,
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
  /** وضعیت واژهٔ جاری: null = در حال بازی، true = برد، false = باخت */
  const [result, setResult] = useState<boolean | null>(null);

  const { speed } = useVoiceSpeed();
  /** قفل double-guess — از حدس هم‌زمان (کلیک + کیبورد) و حین مکث برد/باخت جلوگیری می‌کند */
  const locked = useRef(false);
  /** نگاشت همگامِ used — گارد سنکرون مقابل keydownهای پشت‌سرهم قبل از رندر بعدی */
  const usedRef = useRef<string[]>([]);
  /** ایندکس سنکرون واژهٔ جاری — گارد کلوزر کهنه حین تعویض واژه */
  const idxRef = useRef(0);
  const timer = useRef<number | undefined>(undefined);
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

  /** پایان دور — استریک/جلسه/Attempt/رکورد (بیشترین برد) */
  const finish = useCallback(
    (finalDetail: DetailRow[]) => {
      const correct = finalDetail.filter((d) => d.ok).length;
      touchStreak();
      recordStudySession();
      bumpPlays(activeBookId, GAME_KEY);
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

  /** حدس یک حرف — هستهٔ بازی؛ هم برای کیبورد on-screen و هم فیزیکی */
  const guessLetter = useCallback(
    (raw: string) => {
      const letter = raw.toUpperCase();
      if (!/^[A-Z]$/.test(letter)) return;
      if (locked.current) return;
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
          locked.current = true;
          recordSRS(current.word, true);
          speak(current.word, { speed });
          const nextDetail = [...detail, { word: current.word, ok: true }];
          setDetail(nextDetail);
          setResult(true);
          timer.current = window.setTimeout(() => {
            locked.current = false;
            advance(idx + 1, nextDetail);
          }, WIN_LOCK_MS);
        }
      } else {
        // حرف غلط — یک بادکنک می‌ترکد؛ با ششمین خطا واژه می‌بازد
        const wrongCount = nextUsed.filter((l) => !current.word.includes(l)).length;
        if (wrongCount >= MAX_WRONG) {
          locked.current = true;
          recordSRS(current.word, false);
          const nextDetail = [...detail, { word: current.word, ok: false }];
          setDetail(nextDetail);
          setResult(false);
          timer.current = window.setTimeout(() => {
            locked.current = false;
            advance(idx + 1, nextDetail);
          }, LOSS_LOCK_MS);
        }
      }
    },
    [deck, idx, detail, speed, advance],
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

  /** انصراف — پاک‌سازی تایمر معلق و صدا و برگشت به تنظیمات */
  const cancel = useCallback(() => {
    if (timer.current !== undefined) window.clearTimeout(timer.current);
    locked.current = false;
    stopSpeaking();
    setPhase("setup");
  }, []);

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
    if (timer.current !== undefined) window.clearTimeout(timer.current);
    locked.current = false;
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
    setSecs(0);
    secsRef.current = 0;
    setIsRecord(false);
    setPhase("playing");
  }, [data.vocab, lesson, count]);

  // ── Setup ──
  if (phase === "setup") {
    return (
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
    );
  }

  // ── Done ──
  if (phase === "done") {
    const wins = detail.filter((d) => d.ok).length;
    const losses = detail.length - wins;
    const lostRows = detail
      .filter((d) => !d.ok)
      .map((d) => ({
        word: d.word,
        meaning: deck.find((w) => w.word === d.word)?.meaning ?? "",
      }));
    return (
      <Card className="mx-auto max-w-xl rise-in border-amber-500/30">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <PartyPopper size={30} />
          </span>
          <h2 className="text-xl font-black">
            {wins === deck.length && deck.length > 0 ? "همه واژه‌ها را بردی!" : "دور تمام شد!"}
          </h2>
          {isRecord && (
            <Badge className="gap-1.5 bg-amber-500 text-amber-950 shadow-md shadow-amber-500/30">
              <Trophy size={13} />
              رکورد جدید! 🏆
            </Badge>
          )}

          <div className="grid w-full grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-muted/60 p-3">
              <CheckCircle2 size={16} className="mx-auto text-emerald-500" />
              <p className="mt-1.5 text-lg font-black leading-none">{faNum(wins)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">برد</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <XCircle size={16} className="mx-auto text-destructive" />
              <p className="mt-1.5 text-lg font-black leading-none">{faNum(losses)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">باخت</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <Timer size={16} className="mx-auto text-primary" />
              <p className="mt-1.5 text-lg font-black leading-none">{fmtTime(secs)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">زمان</p>
            </div>
          </div>

          {lostRows.length > 0 && (
            <div className="w-full space-y-1.5 rounded-xl border bg-muted/30 p-3 text-right">
              <p className="text-[11px] font-bold text-muted-foreground">
                این‌ها را باختی — به مرور هوشمند اضافه شدند:
              </p>
              <div className="max-h-44 space-y-1.5 overflow-y-auto">
                {lostRows.map((r) => (
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
                      className="shrink-0 gap-1 border-destructive/40 text-[9px] text-destructive"
                    >
                      <PlusCircle size={10} />
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
  const current = deck[idx];
  const wins = detail.filter((d) => d.ok).length;
  const losses = detail.length - wins;
  const pct = Math.round((detail.length / Math.max(deck.length, 1)) * 100);
  const wrongLetters = current ? used.filter((l) => !current.word.includes(l)) : [];
  const livesLeft = MAX_WRONG - wrongLetters.length;
  const frozen = result !== null;

  return (
    <div role="group" aria-label="بازی دارباز" className="mx-auto max-w-xl space-y-4 rise-in">
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
          {faNum(wins)} برد
        </Badge>
        {losses > 0 && (
          <Badge variant="outline" className="gap-1 border-destructive/40 text-[11px] text-destructive">
            <XCircle size={11} />
            {faNum(losses)} باخت
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

      {/* بادکنک‌های جان */}
      <div className="rounded-2xl border bg-card px-4 pb-3 pt-4">
        <div role="group" aria-label="بادکنک‌های جان" className="flex items-end justify-center gap-1.5">
          {Array.from({ length: MAX_WRONG }, (_, i) => {
            const popped = i >= livesLeft;
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
                    popped ? "scale-0 opacity-0" : "scale-100 opacity-100",
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
                {/* حباب خط‌چین جای بادکنک ترکیده */}
                <span
                  className={cn(
                    "absolute left-1/2 top-1.5 h-10 w-8 -translate-x-1/2 rounded-full border-2 border-dashed border-destructive/35 transition-all duration-500",
                    popped ? "scale-100 opacity-100" : "scale-0 opacity-0",
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
                    onClick={() => guessLetter(letter)}
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
  );
}
