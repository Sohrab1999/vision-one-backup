"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Layers,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  Eye,
  PartyPopper,
  Sprout,
  Flame,
  Target,
  Puzzle,
  Star,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { VocabEntry } from "@/data/types";
import { useBookData } from "@/lib/book-context";
import { useLearnedWords } from "@/lib/learned-store";
import { useStarredWords } from "@/lib/star-store";
import { usePracticeIntent, clearPracticeIntent } from "@/lib/practice-intent";
import { gradeSrs, srsWeight, useSRSData, SRS_MAX_BOX, type SrsItem } from "@/lib/srs-store";
import { previewIntervals, formatInterval } from "@/lib/srs-engine";
import { awardPracticeWords, notifyActivity } from "@/lib/gamification";
import { SpeakButton } from "./speak-button";
import { MatchGame } from "./match-game";

type Phase = "setup" | "playing" | "done";

const SESSION_SIZE = 12;
const ALL_LESSONS = -1;

/** A word is "weak" when it's unseen or still in the first two SRS boxes. */
function isWeak(word: string, srs: Record<string, SrsItem>): boolean {
  const item = srs[word];
  return !item || item.box <= 1;
}

function pickSession(pool: VocabEntry[], learned: Set<string>, srs: Record<string, SrsItem>): VocabEntry[] {
  // Weighted sampling: unseen + low-box + unlearned words come up more often.
  const weights = pool.map((w) => {
    let weight = srsWeight(srs[w.word]);
    if (learned.has(w.word)) weight = Math.min(weight, 1); // learned words rarely repeat
    return weight;
  });
  const weightedPool: VocabEntry[] = [];
  const used = new Set<number>();
  while (weightedPool.length < Math.min(SESSION_SIZE, pool.length) && used.size < pool.length) {
    // weighted random pick among not-yet-used items
    const candidates = pool.map((_, i) => i).filter((i) => !used.has(i));
    const totalW = candidates.reduce((s, i) => s + weights[i], 0);
    let roll = Math.random() * totalW;
    let chosen = candidates[candidates.length - 1];
    for (const i of candidates) {
      roll -= weights[i];
      if (roll <= 0) {
        chosen = i;
        break;
      }
    }
    used.add(chosen);
    weightedPool.push(pool[chosen]);
  }
  return weightedPool.sort(() => Math.random() - 0.5);
}

/** Tabbed practice view: SRS flashcards + word-match mini game. */
export function FlashcardView() {
  const intent = usePracticeIntent();
  const [tab, setTab] = useState<"cards" | "match">(intent.tab === "match" ? "match" : "cards");

  // مصرف یک‌بارِ هدف تمرین (پس از مقداردهی اولیهٔ نماها) — بدون setState در effect
  useEffect(() => {
    clearPracticeIntent();
  }, []);

  return (
    <div className="space-y-5">
      <div
        className="mx-auto grid max-w-xl grid-cols-2 gap-1.5 rounded-2xl border bg-muted/50 p-1.5"
        role="tablist"
        aria-label="حالت تمرین"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === "cards"}
          onClick={() => setTab("cards")}
          className={cn(
            "flex h-10 items-center justify-center gap-2 rounded-xl text-[13px] font-black transition-all",
            tab === "cards"
              ? "bg-card text-primary shadow-md shadow-primary/10"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Layers size={15} />
          فلاش‌کارت SRS
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "match"}
          onClick={() => setTab("match")}
          className={cn(
            "flex h-10 items-center justify-center gap-2 rounded-xl text-[13px] font-black transition-all",
            tab === "match"
              ? "bg-card text-amber-600 shadow-md shadow-amber-500/10 dark:text-amber-400"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Puzzle size={15} />
          بازی تطبیق
        </button>
      </div>

      {tab === "cards" ? <FlashcardGame /> : <MatchGame />}
    </div>
  );
}

function FlashcardGame() {
  const data = useBookData();
  const intent = usePracticeIntent();
  const [phase, setPhase] = useState<Phase>("setup");
  const [lesson, setLesson] = useState<number>(1);
  const [weakOnly, setWeakOnly] = useState(() => intent.tab === "cards" && intent.weakOnly);
  const [starredOnly, setStarredOnly] = useState(() => intent.tab === "cards" && intent.starredOnly);
  const { learned, toggle } = useLearnedWords();
  const srs = useSRSData();
  const starred = useStarredWords();

  const [deck, setDeck] = useState<VocabEntry[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const [hardCount, setHardCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const basePool = useMemo(
    () => (lesson === ALL_LESSONS ? data.vocab.all : data.vocab.ofLesson(lesson)),
    [data.vocab, lesson],
  );
  const pool = useMemo(() => {
    let p = basePool;
    if (weakOnly) p = p.filter((w) => isWeak(w.word, srs));
    if (starredOnly) p = p.filter((w) => starred.has(w.word));
    return p;
  }, [basePool, weakOnly, starredOnly, srs, starred]);

  const start = useCallback(() => {
    if (pool.length === 0) {
      toast.error(
        starredOnly
          ? "در این محدوده واژه ستاره‌داری نیست — از نمای واژگان ستاره بزن! ⭐"
          : weakOnly
            ? "واژه ضعیفی در این محدوده نیست — همه را بلدی! 🎉"
            : "واژه‌ای برای این درس یافت نشد",
      );
      return;
    }
    setDeck(pickSession(pool, learned, srs));
    setIndex(0);
    setFlipped(false);
    setKnownCount(0);
    setHardCount(0);
    setReviewCount(0);
    setPhase("playing");
  }, [pool, learned, srs, weakOnly, starredOnly]);

  const current = deck[index];

  const answer = useCallback(
    (grade: 0 | 1 | 2) => {
      if (!current) return;
      gradeSrs(current.word, grade);
      if (grade === 2) {
        if (!learned.has(current.word)) toggle(current.word);
        setKnownCount((c) => c + 1);
      } else if (grade === 1) {
        setHardCount((c) => c + 1);
      } else {
        setReviewCount((c) => c + 1);
      }
      if (index + 1 >= deck.length) {
        awardPracticeWords(deck.length); // فاز ۶ — پیشرفت ماموریت «تمرین واژه»
        notifyActivity(); // زنجیرهٔ روزانه + ضربان فعالیت
        setPhase("done");
      } else {
        setIndex((i) => i + 1);
        setFlipped(false);
      }
    },
    [current, deck.length, index, learned, toggle],
  );

  // میان‌برهای کیبورد: Space = چرخش کارت، y = بلد بودم، n = بلد نبودم
  useEffect(() => {
    if (phase !== "playing") return;
    function onKey(e: KeyboardEvent) {
      if (e.code === "Space" || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key === "y" || e.key === "ی") {
        answer(2);
      } else if (e.key === "n" || e.key === "ن") {
        answer(0);
      } else if (e.key === "h") {
        answer(1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, answer]);

  // ── Setup ──
  if (phase === "setup") {
    const unlearned = pool.filter((w) => !learned.has(w.word)).length;
    const weakCount = basePool.filter((w) => isWeak(w.word, srs)).length;
    return (
      <Card className="mx-auto max-w-xl rise-in">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Layers size={22} />
            </span>
            <div>
              <h2 className="text-lg font-black">تمرین فلاش‌کارت</h2>
              <p className="text-xs text-muted-foreground">
                دور {SESSION_SIZE.toLocaleString("fa-IR")} واژه‌ای — مرور هوشمند با سیستم SRS
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
            <Sprout size={15} className="mt-0.5 shrink-0 text-amber-500" />
            <p>
              هر واژه با زمان‌بندی SM-2 زمان مرور بعدی مخصوص خودش را می‌گیرد: «نمی‌دونم» ۱۰ دقیقه بعد، «سخت» با رشد کم و «بلد بودم» با رشد نمایی فاصله. زمان دقیق هر گزینه زیر دکمه‌ها نوشته شده.
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
                کل کتاب ({data.vocab.all.length.toLocaleString("fa-IR")} واژه)
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

          {/* حالت تمرین فقط واژه‌های ضعیف */}
          <button
            type="button"
            role="switch"
            aria-checked={weakOnly}
            onClick={() => setWeakOnly((v) => !v)}
            className={cn(
              "flex w-full items-center gap-3 rounded-2xl border p-3.5 text-right transition-all",
              weakOnly
                ? "border-amber-500/50 bg-amber-500/10 shadow-sm"
                : "border-border bg-card hover:bg-muted/60",
            )}
          >
            <span
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                weakOnly ? "bg-amber-500/20 text-amber-600 dark:text-amber-400" : "bg-muted text-muted-foreground",
              )}
            >
              <Target size={18} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 text-[13px] font-black">
                فقط واژه‌های ضعیف
                {weakOnly && (
                  <Badge className="border-amber-500/40 bg-amber-500/15 text-[10px] text-amber-700 dark:text-amber-300">
                    فعال
                  </Badge>
                )}
              </span>
              <span className="mt-0.5 block text-[11px] text-muted-foreground">
                فقط واژه‌های دیده‌نشده یا در دو مرحله اول SRS تمرین می‌شوند.
              </span>
            </span>
            <span
              className={cn(
                "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                weakOnly ? "bg-amber-500" : "bg-muted-foreground/25",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
                  weakOnly ? "right-0.5" : "right-[22px]",
                )}
              />
            </span>
          </button>

          {/* حالت تمرین فقط واژه‌های ستاره‌دار */}
          <button
            type="button"
            role="switch"
            aria-checked={starredOnly}
            onClick={() => setStarredOnly((v) => !v)}
            className={cn(
              "flex w-full items-center gap-3 rounded-2xl border p-3.5 text-right transition-all",
              starredOnly
                ? "border-yellow-500/50 bg-yellow-500/10 shadow-sm"
                : "border-border bg-card hover:bg-muted/60",
            )}
          >
            <span
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                starredOnly
                  ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                  : "bg-muted text-muted-foreground",
              )}
            >
              <Star size={18} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 text-[13px] font-black">
                فقط ستاره‌دارها
                {starredOnly && (
                  <Badge className="border-yellow-500/40 bg-yellow-500/15 text-[10px] text-yellow-700 dark:text-yellow-300">
                    فعال
                  </Badge>
                )}
              </span>
              <span className="mt-0.5 block text-[11px] text-muted-foreground">
                فقط واژه‌هایی که در نمای واژگان ستاره زدی ({starred.count.toLocaleString("fa-IR")} واژه) تمرین می‌شوند.
              </span>
            </span>
            <span
              className={cn(
                "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                starredOnly ? "bg-yellow-500" : "bg-muted-foreground/25",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
                  starredOnly ? "right-0.5" : "right-[22px]",
                )}
              />
            </span>
          </button>

          <div className="grid grid-cols-3 gap-2 text-center text-[12px]">
            <div className="rounded-xl bg-primary/8 border border-primary/20 p-3">
              <p className="text-lg font-black text-primary">{unlearned.toLocaleString("fa-IR")}</p>
              <p className="text-[11px] text-muted-foreground">یادنگرفته</p>
            </div>
            <div className="rounded-xl bg-amber-500/8 border border-amber-500/20 p-3">
              <p className="text-lg font-black text-amber-600 dark:text-amber-400">{weakCount.toLocaleString("fa-IR")}</p>
              <p className="text-[11px] text-muted-foreground">واژه ضعیف</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <p className="text-lg font-black">{pool.length.toLocaleString("fa-IR")}</p>
              <p className="text-[11px] text-muted-foreground">
                {weakOnly && starredOnly
                  ? "ضعیف + ستاره‌دار"
                  : weakOnly
                    ? "موجود در دور ضعیف"
                    : starredOnly
                      ? "ستاره‌دار محدوده"
                      : "کل واژگان محدوده"}
              </p>
            </div>
          </div>

          <Button size="lg" className="w-full gap-2 h-12 text-base" onClick={start}>
            <Play size={18} />
            شروع دور تمرین
          </Button>

          <p className="text-center text-[11px] text-muted-foreground">
            میان‌برها: <kbd className="rounded bg-muted px-1.5">Space</kbd> چرخش کارت •{" "}
            <kbd className="rounded bg-muted px-1.5">y</kbd> بلد بودم •{" "}
            <kbd className="rounded bg-muted px-1.5">n</kbd> بلد نبودم •{" "}
            <kbd className="rounded bg-muted px-1.5">h</kbd> سخت
          </p>
        </CardContent>
      </Card>
    );
  }

  // ── Done ──
  if (phase === "done") {
    const pct = Math.round(((knownCount + hardCount) / Math.max(deck.length, 1)) * 100);
    return (
      <Card className="mx-auto max-w-xl rise-in border-primary/30">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <PartyPopper size={30} />
          </span>
          <h2 className="text-xl font-black">دور تمام شد!</h2>
          <p className="text-sm text-muted-foreground">
            {knownCount.toLocaleString("fa-IR")} بلد بودی، {hardCount.toLocaleString("fa-IR")} سخت زدی و {reviewCount.toLocaleString("fa-IR")} برای مرور علامت خورد.
          </p>
          <Badge variant="outline" className="gap-1.5 border-orange-500/40 text-orange-500">
            <Flame size={13} />
            زنجیره یادگیری امروز فعال شد
          </Badge>
          <div className="relative h-28 w-28">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" strokeWidth="12" className="stroke-muted" />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                strokeWidth="12"
                strokeLinecap="round"
                className="stroke-primary"
                strokeDasharray={`${(pct / 100) * 326.7} 326.7`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-black">
              {pct.toLocaleString("fa-IR")}٪
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={start} className="gap-2">
              <RotateCcw size={16} />
              دور جدید
            </Button>
            <Button variant="outline" onClick={() => setPhase("setup")}>
              تغییر درس
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ── Playing ──
  if (!current) return null;

  return (
    <div className="mx-auto max-w-xl space-y-4 rise-in">
      <div className="flex items-center gap-3">
        <Progress value={((index + 1) / deck.length) * 100} className="h-2 flex-1" />
        <span className="shrink-0 text-[12px] font-bold text-muted-foreground">
          {(index + 1).toLocaleString("fa-IR")} / {deck.length.toLocaleString("fa-IR")}
        </span>
        <Badge variant="secondary" className="gap-1 text-[11px]">
          <CheckCircle2 size={11} className="text-primary" />
          {knownCount.toLocaleString("fa-IR")}
        </Badge>
      </div>

      <div
        className="flip-scene h-[320px] cursor-pointer select-none"
        onClick={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
        aria-label="کارت تمرین — برای چرخش کلیک کنید"
      >
        <div className={cn("flip-inner", flipped && "flipped")}>
          {/* روی کارت: واژه */}
          <div className="flip-face border bg-card shadow-lg flex flex-col items-center justify-center gap-4 p-8">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-[11px]">
                {current.lesson === 0 ? `پایه ${current.grade}` : `درس ${current.lesson.toLocaleString("fa-IR")}`}
              </Badge>
              {starred.has(current.word) && (
                <span title="واژه ستاره‌دار" className="star-pop flex items-center">
                  <Star size={13} className="fill-yellow-500 text-yellow-500" />
                </span>
              )}
              {/* نشانگر سطح SRS */}
              <span
                className="flex items-center gap-1"
                title={`سطح SRS: ${(srs[current.word]?.box ?? 0).toLocaleString("fa-IR")} از ${SRS_MAX_BOX.toLocaleString("fa-IR")}`}
              >
                {Array.from({ length: SRS_MAX_BOX }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 w-3 rounded-full transition-colors",
                      i < (srs[current.word]?.box ?? 0) ? "bg-amber-500" : "bg-muted",
                    )}
                  />
                ))}
              </span>
            </div>
            <p dir="ltr" className="font-en text-4xl font-black text-center leading-tight">
              {current.word}
            </p>
            <div onClick={(e) => e.stopPropagation()}>
              <SpeakButton text={current.word} size="lg" showSlow />
            </div>
            <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Eye size={12} />
              برای دیدن معنی کلیک کن یا Space بزن
            </p>
          </div>
          {/* پشت کارت: معنی */}
          <div className="flip-face flip-back border border-primary/35 bg-primary/10 shadow-lg flex flex-col items-center justify-center gap-3 p-8">
            <Sparkles size={20} className="text-amber-500" />
            <p className="text-3xl font-black text-center leading-relaxed">{current.meaning}</p>
            <p dir="ltr" className="font-en text-sm text-primary">{current.word}</p>
          </div>
        </div>
      </div>

      {flipped && (
        <div className="grid grid-cols-3 gap-2 rise-in">
          <Button
            variant="outline"
            size="lg"
            onClick={() => answer(0)}
            className="flex h-13 flex-col gap-1 border-destructive/40 text-destructive hover:bg-destructive/10"
          >
            <span className="flex items-center gap-1.5">
              <XCircle size={19} />
              نمی‌دونم
            </span>
            <span className="block text-[10px] font-medium opacity-80">
              {formatInterval(previewIntervals(srs[current.word], Date.now())[0])}
            </span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => answer(1)}
            className="flex h-13 flex-col gap-1 border-amber-500/50 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
          >
            <span className="flex items-center gap-1.5">
              <Clock size={19} />
              سخت
            </span>
            <span className="block text-[10px] font-medium opacity-80">
              {formatInterval(previewIntervals(srs[current.word], Date.now())[1])}
            </span>
          </Button>
          <Button
            size="lg"
            onClick={() => answer(2)}
            className="flex h-13 flex-col gap-1"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={19} />
              بلد بودم
            </span>
            <span className="block text-[10px] font-medium opacity-80">
              {formatInterval(previewIntervals(srs[current.word], Date.now())[2])}
            </span>
          </Button>
        </div>
      )}
    </div>
  );
}
