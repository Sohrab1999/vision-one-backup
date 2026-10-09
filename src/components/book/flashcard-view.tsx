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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { VOCAB_LESSONS, vocabOfLesson, type VocabEntry } from "@/data/vocab";
import { useLearnedWords } from "@/lib/learned-store";
import { SpeakButton } from "./speak-button";

type Phase = "setup" | "playing" | "done";

const SESSION_SIZE = 12;

function pickSession(pool: VocabEntry[], learned: Set<string>): VocabEntry[] {
  const unlearned = pool.filter((w) => !learned.has(w.word));
  const learnedOnes = pool.filter((w) => learned.has(w.word));
  const shuffled = [...unlearned].sort(() => Math.random() - 0.5);
  const session = shuffled.slice(0, SESSION_SIZE);
  if (session.length < SESSION_SIZE) {
    session.push(
      ...[...learnedOnes].sort(() => Math.random() - 0.5).slice(0, SESSION_SIZE - session.length),
    );
  }
  return session.sort(() => Math.random() - 0.5);
}

export function FlashcardView() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [lesson, setLesson] = useState<number>(1);
  const { learned, toggle } = useLearnedWords();

  const [deck, setDeck] = useState<VocabEntry[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const pool = useMemo(() => vocabOfLesson(lesson), [lesson]);

  const start = useCallback(() => {
    if (pool.length === 0) {
      toast.error("واژه‌ای برای این درس یافت نشد");
      return;
    }
    setDeck(pickSession(pool, learned));
    setIndex(0);
    setFlipped(false);
    setKnownCount(0);
    setReviewCount(0);
    setPhase("playing");
  }, [pool, learned]);

  const current = deck[index];

  const answer = useCallback(
    (known: boolean) => {
      if (!current) return;
      if (known) {
        if (!learned.has(current.word)) toggle(current.word);
        setKnownCount((c) => c + 1);
      } else {
        setReviewCount((c) => c + 1);
      }
      if (index + 1 >= deck.length) {
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
        answer(true);
      } else if (e.key === "n" || e.key === "ن") {
        answer(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, answer]);

  // ── Setup ──
  if (phase === "setup") {
    const unlearned = pool.filter((w) => !learned.has(w.word)).length;
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
                دور {SESSION_SIZE.toLocaleString("fa-IR")} واژه‌ای — اولویت با واژه‌های یادنگرفته
              </p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">کدام درس؟</p>
            <div className="flex flex-wrap gap-2">
              {VOCAB_LESSONS.filter((l) => l.lesson > 0).map((l) => (
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

          <div className="grid grid-cols-2 gap-2 text-center text-[12px]">
            <div className="rounded-xl bg-primary/8 border border-primary/20 p-3">
              <p className="text-lg font-black text-primary">{unlearned.toLocaleString("fa-IR")}</p>
              <p className="text-[11px] text-muted-foreground">واژه یادنگرفته در این درس</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <p className="text-lg font-black">{(pool.length - unlearned).toLocaleString("fa-IR")}</p>
              <p className="text-[11px] text-muted-foreground">واژه یادگرفته</p>
            </div>
          </div>

          <Button size="lg" className="w-full gap-2 h-12 text-base" onClick={start}>
            <Play size={18} />
            شروع دور تمرین
          </Button>

          <p className="text-center text-[11px] text-muted-foreground">
            میان‌برها: <kbd className="rounded bg-muted px-1.5">Space</kbd> چرخش کارت •{" "}
            <kbd className="rounded bg-muted px-1.5">y</kbd> بلد بودم •{" "}
            <kbd className="rounded bg-muted px-1.5">n</kbd> بلد نبودم
          </p>
        </CardContent>
      </Card>
    );
  }

  // ── Done ──
  if (phase === "done") {
    const pct = Math.round((knownCount / Math.max(deck.length, 1)) * 100);
    return (
      <Card className="mx-auto max-w-xl rise-in border-primary/30">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <PartyPopper size={30} />
          </span>
          <h2 className="text-xl font-black">دور تمام شد!</h2>
          <p className="text-sm text-muted-foreground">
            {knownCount.toLocaleString("fa-IR")} واژه بلد بودی و {reviewCount.toLocaleString("fa-IR")} واژه برای مرور علامت خورد.
          </p>
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
            <Badge variant="secondary" className="text-[11px]">
              {current.lesson === 0 ? `پایه ${current.grade}` : `درس ${current.lesson.toLocaleString("fa-IR")}`}
            </Badge>
            <p dir="ltr" className="font-en text-4xl font-black text-center leading-tight">
              {current.word}
            </p>
            <div onClick={(e) => e.stopPropagation()}>
              <SpeakButton text={current.word} size="lg" />
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
        <div className="grid grid-cols-2 gap-3 rise-in">
          <Button
            variant="outline"
            size="lg"
            onClick={() => answer(false)}
            className="gap-2 h-13 border-destructive/40 text-destructive hover:bg-destructive/10"
          >
            <XCircle size={19} />
            بلد نبودم
          </Button>
          <Button size="lg" onClick={() => answer(true)} className="gap-2 h-13">
            <CheckCircle2 size={19} />
            بلد بودم
          </Button>
        </div>
      )}
    </div>
  );
}
