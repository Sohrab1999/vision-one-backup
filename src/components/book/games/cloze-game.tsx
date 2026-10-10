"use client";

/**
 * بازی «جای خالی» (Cloze) — فاز ۳ نقشه راه جامع ۲۰۲۶.
 *
 * جمله‌های واقعی متن‌ها (readings) و مکالمه‌ها (conversations) خود کتاب با جای خالیِ
 * واژه هدف؛ انتخاب از ۳ گزینه. پاسخ درست در SRS ثبت و تلفظش پخش می‌شود؛ پاسخ غلط
 * واژه را به صف «مرور هوشمند» می‌فرستد (همان مسیر غلط آزمون).
 */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  PencilLine,
  Play,
  RotateCcw,
  Trophy,
  Timer,
  Target,
  CheckCircle2,
  XCircle,
  Sparkles,
  PartyPopper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { VocabEntry } from "@/data/types";
import type { BookData } from "@/data/books/types";
import { useBook, useBookData } from "@/lib/book-context";
import { recordSRS, seedReviewFromQuiz } from "@/lib/srs-store";
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
  bestKeyOf,
} from "./shared";

const GAME_KEY = "cloze";
const ALL_LESSONS = -1;
const MAX_ITEMS = 40;
const BLANK = "______";
const ROUND_OPTIONS = [6, 10, 14];
const WORD_RE = /^[A-Za-z]{3,14}$/;

type Phase = "setup" | "playing" | "done";

/** یک پرسش جای خالی */
interface ClozeItem {
  id: string;
  /** جمله انگلیسی حاوی یک ______ */
  sentence: string;
  /** ترجمه فارسی پاراگراف/خط مادر */
  fa: string;
  answer: string;
  options: string[];
  meaning: string;
  lessonLabel: string;
}

/** رکورد شخصی: بیشترین پاسخ درست از همان تعداد پرسش */
interface BestRecord {
  score: number;
  total: number;
}

interface WrongItem {
  word: string;
  meaning: string;
}

interface SourceSentence {
  en: string;
  fa: string;
}

/** واژه هدف بدون پرانتز توضیح — «order (n)» → «order» */
function toBase(word: string): string {
  return word.replace(/\s*\([^)]*\)\s*/g, " ").trim();
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function wordCount(s: string): number {
  return s.trim().split(/\s+/).length;
}

/** همه جمله‌های کوتاه کتاب: متن‌ها (پاراگراف‌ها) + مکالمه‌ها (خط‌ها) */
function collectSentences(data: BookData): SourceSentence[] {
  const out: SourceSentence[] = [];
  for (const r of data.readings) {
    for (const p of r.paragraphs) {
      for (const s of p.en.split(/(?<=[.!?])\s+/)) {
        const t = s.trim();
        if (t) out.push({ en: t, fa: p.fa });
      }
    }
  }
  for (const c of data.conversations) {
    for (const line of c.lines) {
      for (const s of line.en.split(/(?<=[.!?])\s+/)) {
        const t = s.trim();
        if (t) out.push({ en: t, fa: line.fa });
      }
    }
  }
  return out;
}

/**
 * هسته ساخت پازل — تابع خالص: برای هر واژه (بدون تکرار) اولین جمله مناسب کتاب را
 * پیدا می‌کند، واژه را با ______ جایگزین و ۲ حواس‌پرتی از همان استخر درس می‌چیند.
 */
function buildPool(data: BookData, lesson: number): ClozeItem[] {
  const vocabPool = lesson === ALL_LESSONS ? data.vocab.all : data.vocab.ofLesson(lesson);
  const sentences = collectSentences(data);

  // استخر واژه پاکسازی‌شده — فقط واژه‌های تک‌کلمه‌ای لاتین، یکتا بر اساس baseWord
  const seenBase = new Set<string>();
  const words: { base: string; entry: VocabEntry }[] = [];
  for (const entry of vocabPool) {
    const base = toBase(entry.word);
    if (!WORD_RE.test(base) || seenBase.has(base)) continue;
    seenBase.add(base);
    words.push({ base, entry });
  }

  const items: ClozeItem[] = [];
  for (const { base, entry } of words) {
    if (items.length >= MAX_ITEMS) break;
    const re = new RegExp("\\b" + escapeRe(base) + "\\b", "i");
    const found = sentences.find((s) => {
      if (s.en.length < 30 || s.en.length > 160) return false;
      const wc = wordCount(s.en);
      if (wc < 6 || wc > 35) return false;
      return re.test(s.en);
    });
    if (!found) continue;

    // حواس‌پرتی‌ها از همان استخر درس — baseWord متفاوت + معنی یکتا (بدون ابهام)
    const distractorPool = vocabPool.filter((w) => {
      const b = toBase(w.word);
      return b !== base && WORD_RE.test(b) && w.meaning !== entry.meaning;
    });
    const distractors = pickUnique(distractorPool, 2, (w) => `${toBase(w.word)}|${w.meaning}`);
    if (distractors.length < 2) continue;

    items.push({
      id: `${lesson}:${base}`,
      sentence: found.en.replace(re, BLANK),
      fa: found.fa,
      answer: base,
      options: shuffle([base, ...distractors.map((d) => toBase(d.word))]),
      meaning: entry.meaning,
      lessonLabel: entry.lessonLabel,
    });
  }
  return shuffle(items);
}

// ─── اسنپ‌شات پایدار رکورد (JSON.parse هر بار آبجکت تازه می‌سازد — باید کَش شود) ───

let bestCacheKey = "";
let bestCacheValue: BestRecord | null = null;

function readBest(bookId: string, scope: string): BestRecord | null {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(bestKeyOf(bookId, GAME_KEY, scope));
  } catch {
    return null;
  }
  const cacheKey = `${bookId}|${scope}|${raw ?? ""}`;
  if (cacheKey === bestCacheKey) return bestCacheValue;
  let value: BestRecord | null = null;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Partial<BestRecord> | null;
      if (parsed && typeof parsed.score === "number" && typeof parsed.total === "number") {
        value = { score: parsed.score, total: parsed.total };
      }
    } catch {
      value = null;
    }
  }
  bestCacheKey = cacheKey;
  bestCacheValue = value;
  return value;
}

export function ClozeGame() {
  const data = useBookData();
  const { bookId: activeBookId } = useBook();
  /** بازی فقط داخل کتاب فعال سوار می‌شود (useBookData بدون کتاب فعال خطا می‌دهد) — پس bookId همیشه هست */
  const bookId = activeBookId!;
  const [phase, setPhase] = useState<Phase>("setup");
  const [lesson, setLesson] = useState<number>(ALL_LESSONS);
  const [rounds, setRounds] = useState<number>(10);

  const [deck, setDeck] = useState<ClozeItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongList, setWrongList] = useState<WrongItem[]>([]);
  const [secs, setSecs] = useState(0);
  const [isRecord, setIsRecord] = useState(false);

  const { speed } = useVoiceSpeed();
  const busy = useRef(false);
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrongRef = useRef<WrongItem[]>([]);

  // استخر پازل هر محدوده — یک‌بار برای کل کتاب + هر درس (تابع خالص)
  const pools = useMemo(() => {
    const map = new Map<number, ClozeItem[]>();
    const keys = [ALL_LESSONS, ...data.vocab.lessons.filter((l) => l.lesson > 0).map((l) => l.lesson)];
    for (const l of keys) map.set(l, buildPool(data, l));
    return map;
  }, [data]);

  const lessonOptions = useMemo(
    () => [
      { lesson: ALL_LESSONS, label: "کل کتاب" },
      ...data.vocab.lessons
        .filter((l) => l.lesson > 0)
        .map((l) => ({ lesson: l.lesson, label: l.label })),
    ],
    [data.vocab.lessons],
  );

  const poolCount = pools.get(lesson)?.length ?? 0;
  const scope = `${lesson === ALL_LESSONS ? "all" : lesson}:${rounds}`;

  // رکورد شخصی — بدون setState در effect (الگوی match-game با اسنپ‌شات پایدار)
  const best = useSyncExternalStore(
    subscribeGameData,
    () => readBest(bookId, scope),
    () => null,
  );

  // تایمر — آپدیت functional
  useEffect(() => {
    if (phase !== "playing") return;
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => () => stopSpeaking(), []);

  useEffect(
    () => () => {
      if (advanceRef.current) clearTimeout(advanceRef.current);
    },
    [],
  );

  const start = useCallback(() => {
    const pool = pools.get(lesson) ?? [];
    if (pool.length < 3) {
      toast.error("در این محدوده جمله مناسب پیدا نشد — درس دیگری را امتحان کن");
      return;
    }
    if (advanceRef.current) {
      clearTimeout(advanceRef.current);
      advanceRef.current = null;
    }
    stopSpeaking();
    setDeck(shuffle(pool).slice(0, Math.min(rounds, pool.length)));
    setIdx(0);
    setPicked(null);
    setCorrectCount(0);
    setWrongList([]);
    wrongRef.current = [];
    setSecs(0);
    setIsRecord(false);
    busy.current = false;
    setPhase("playing");
  }, [pools, lesson, rounds]);

  const finish = useCallback(
    (finalCorrect: number) => {
      touchStreak();
      recordStudySession();
      bumpPlays(bookId, GAME_KEY);
      saveAttempt(bookId, GAME_KEY, {
        lesson: lesson === ALL_LESSONS ? 0 : lesson,
        total: deck.length,
        correct: finalCorrect,
        duration: secs,
        detail: deck.map((it) => ({
          word: it.answer,
          ok: !wrongRef.current.some((w) => w.word === it.answer),
        })),
      });
      try {
        const prev = loadBest<BestRecord>(bookId, GAME_KEY, scope);
        if (!prev || finalCorrect > prev.score) {
          saveBest<BestRecord>(bookId, GAME_KEY, scope, { score: finalCorrect, total: deck.length });
          setIsRecord(true);
        }
      } catch {
        /* noop */
      }
      const acc = Math.round((finalCorrect / Math.max(deck.length, 1)) * 100);
      toast.success(`جای خالی‌ها پر شد — ${faNum(acc)}٪ دقت! ✏️`);
      setPhase("done");
    },
    [bookId, deck, lesson, scope, secs],
  );

  const answer = useCallback(
    (opt: string) => {
      if (busy.current || picked !== null) return;
      const item = deck[idx];
      if (!item) return;
      const ok = opt === item.answer;
      busy.current = true;
      setPicked(opt);
      let finalCorrect = correctCount;
      if (ok) {
        finalCorrect = correctCount + 1;
        setCorrectCount(finalCorrect);
        recordSRS(item.answer, true);
        speak(item.answer, { speed });
      } else {
        seedReviewFromQuiz(item.answer);
        const w: WrongItem = { word: item.answer, meaning: item.meaning };
        wrongRef.current = [...wrongRef.current, w];
        setWrongList((prev) => [...prev, w]);
      }
      const nextIdx = idx + 1;
      advanceRef.current = setTimeout(() => {
        busy.current = false;
        setPicked(null);
        if (nextIdx >= deck.length) {
          finish(finalCorrect);
        } else {
          setIdx(nextIdx);
        }
      }, 1000);
    },
    [picked, deck, idx, correctCount, speed, finish],
  );

  const cancel = useCallback(() => {
    if (advanceRef.current) {
      clearTimeout(advanceRef.current);
      advanceRef.current = null;
    }
    stopSpeaking();
    busy.current = false;
    setPhase("setup");
  }, []);

  // ── Setup ──
  if (phase === "setup") {
    return (
      <Card className="mx-auto max-w-xl rise-in">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400">
              <PencilLine size={22} />
            </span>
            <div>
              <h2 className="text-lg font-black">جای خالی</h2>
              <p className="text-xs text-muted-foreground">جمله‌های خود کتاب — واژه گم‌شده را پیدا کن!</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
            <p>
              جمله از متن‌ها و مکالمه‌های همین جزوه آمده؛ ترجمه فارسی پایین کارت کمکت می‌کند. غلط بزنی، واژه به صف
              مرور هوشمند می‌رود.
            </p>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">کدام درس؟</p>
            <div className="flex flex-wrap gap-2">
              {lessonOptions.map((o) => {
                const count = pools.get(o.lesson)?.length ?? 0;
                const active = lesson === o.lesson;
                return (
                  <button
                    key={o.lesson}
                    type="button"
                    disabled={count === 0}
                    onClick={() => setLesson(o.lesson)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
                      active
                        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                        : "text-muted-foreground hover:bg-muted",
                      count === 0 && "opacity-50",
                    )}
                  >
                    {o.label}
                    <Badge
                      className={cn(
                        "rounded-full border-0 px-1.5 py-0 text-[9px] font-bold",
                        active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground",
                      )}
                    >
                      {faNum(count)} جمله آماده
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">چند پرسش؟</p>
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
                  {faNum(n)} پرسش
                </button>
              ))}
            </div>
            {poolCount > 0 && poolCount < rounds && (
              <p className="mt-2 text-[11px] text-muted-foreground">
                در این محدوده فقط {faNum(poolCount)} پرسش آماده است — همین تعداد پرسیده می‌شود.
              </p>
            )}
          </div>

          {best && (
            <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
              <Trophy size={12} />
              بهترین: {faNum(best.score)} از {faNum(best.total)}
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
    const total = deck.length;
    const acc = Math.round((correctCount / Math.max(total, 1)) * 100);
    return (
      <Card className="mx-auto max-w-xl rise-in border-amber-500/30">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <PartyPopper size={30} />
          </span>
          <h2 className="text-xl font-black">جای خالی‌ها پر شد!</h2>
          {isRecord && (
            <Badge className="gap-1.5 bg-amber-500 text-amber-950 shadow-md shadow-amber-500/30">
              <Trophy size={13} />
              رکورد جدید! 🏆
            </Badge>
          )}
          <div className="grid w-full grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-muted/60 p-3">
              <Target size={16} className="mx-auto text-teal-500" />
              <p className="mt-1.5 text-lg font-black leading-none">{faNum(acc)}٪</p>
              <p className="mt-1 text-[10px] text-muted-foreground">دقت</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <CheckCircle2 size={16} className="mx-auto text-emerald-500" />
              <p className="mt-1.5 text-lg font-black leading-none">{faNum(correctCount)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">درست</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <XCircle size={16} className="mx-auto text-destructive" />
              <p className="mt-1.5 text-lg font-black leading-none">{faNum(wrongList.length)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">غلط</p>
            </div>
          </div>

          {wrongList.length > 0 ? (
            <div className="w-full text-right">
              <p className="mb-1.5 text-[12px] font-bold text-muted-foreground">واژه‌های غلط — به صف مرور رفتند:</p>
              <div className="max-h-44 divide-y overflow-y-auto rounded-xl border">
                {wrongList.map((w) => (
                  <div key={w.word} className="flex items-center justify-between gap-3 px-3 py-2">
                    <span dir="ltr" className="font-en text-[13px] font-black text-amber-600 dark:text-amber-400">
                      {w.word}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{w.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Badge className="gap-1.5 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={13} />
              بدون غلط — عالی!
            </Badge>
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
  const item = deck[idx];
  const splitAt = item ? item.sentence.indexOf(BLANK) : -1;
  const before = item && splitAt >= 0 ? item.sentence.slice(0, splitAt) : "";
  const after = item && splitAt >= 0 ? item.sentence.slice(splitAt + BLANK.length) : "";
  const revealed = picked !== null;
  const answered = idx + (revealed ? 1 : 0);
  const pct = Math.round((answered / Math.max(deck.length, 1)) * 100);

  return (
    <div className="mx-auto max-w-2xl space-y-4 rise-in">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="gap-1 text-[11px]">
          <PencilLine size={11} />
          {faNum(idx + 1)} / {faNum(deck.length)}
        </Badge>
        <Badge variant="secondary" className="gap-1 text-[11px]">
          <Timer size={11} />
          {fmtTime(secs)}
        </Badge>
        <Badge variant="secondary" className="gap-1 text-[11px]">
          <CheckCircle2 size={11} className="text-emerald-500" />
          {faNum(correctCount)} درست
        </Badge>
        <div className="mr-auto">
          <Button variant="ghost" size="sm" onClick={cancel} className="text-[11px] text-muted-foreground">
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

      {item && (
        <div className="space-y-4 rounded-2xl border bg-card p-6">
          <div>
            <Badge variant="outline" className="border-teal-500/40 text-[10px] text-teal-600 dark:text-teal-400">
              {item.lessonLabel}
            </Badge>
          </div>

          <p dir="ltr" className="font-en text-[15px] leading-8 sm:text-base">
            {splitAt >= 0 ? (
              <>
                {before}
                <span className="mx-1 inline-block min-w-16 rounded-md border-b-2 border-amber-500/70 bg-amber-500/10 px-2 text-center font-black text-amber-600 dark:text-amber-400">
                  {revealed ? item.answer : "؟"}
                </span>
                {after}
              </>
            ) : (
              item.sentence
            )}
          </p>

          <p className="border-r-2 border-primary/30 pr-3 text-[12px] leading-6 text-muted-foreground">
            ترجمه: {item.fa}
          </p>

          <div className="grid gap-2 sm:grid-cols-3">
            {item.options.map((opt) => {
              const isAnswer = opt === item.answer;
              const isPicked = picked === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  dir="ltr"
                  disabled={revealed}
                  onClick={() => answer(opt)}
                  className={cn(
                    "min-h-12 rounded-xl border bg-card px-3 py-2.5 text-center font-en text-[15px] font-black transition-all",
                    revealed && isAnswer
                      ? isPicked
                        ? "match-pop border-primary bg-primary/10 text-primary"
                        : "border-primary/50 ring-1 ring-primary"
                      : revealed
                        ? isPicked
                          ? "match-shake border-destructive/60 bg-destructive/10 text-destructive"
                          : "border-border opacity-60"
                        : "border-border hover:border-primary/50",
                  )}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
