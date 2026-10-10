"use client";

import { useEffect, useState } from "react";
import { BookOpen, Gauge, AudioLines } from "lucide-react";
import { useBookData } from "@/lib/book-context";
import { VocabCardGrid } from "./vocab-card-grid";
import { cn } from "@/lib/utils";
import { useVoiceSpeed, useVoiceEngine, VOICE_SPEED_OPTIONS, VOICE_ENGINE_OPTIONS } from "@/lib/voice-store";
import { browserVoiceAvailable } from "@/lib/speak";
import { setPracticeIntent } from "@/lib/practice-intent";
import type { ViewId } from "./app-header";

export function VocabularyView({ onNavigate }: { onNavigate?: (v: ViewId) => void }) {
  const data = useBookData();
  const [lesson, setLesson] = useState<number | undefined>(undefined);
  const words =
    lesson === undefined
      ? data.vocab.lessons
          .filter((l) => l.lesson > 0)
          .flatMap((l) => data.vocab.ofLesson(l.lesson))
      : data.vocab.ofLesson(lesson);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-black">
            <BookOpen size={20} className="text-primary" />
            واژگان کلیدی و تکمیلی
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {data.stats.words.toLocaleString("fa-IR")} واژه از کل کتاب — روی کارت بزن تا معنی را ببینی و آن را «یاد گرفته» علامت بزنی.
          </p>
        </div>
        <VoiceSpeedControl />
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterChip active={lesson === undefined} onClick={() => setLesson(undefined)} label="همه درس‌های جزوه" />
        {data.vocab.lessons.map((l) => (
          <FilterChip
            key={l.lesson}
            active={lesson === l.lesson}
            onClick={() => setLesson(l.lesson)}
            label={l.label}
          />
        ))}
      </div>

      <VocabCardGrid
        words={words}
        showLessonBadge={lesson === undefined}
        onPracticeStarred={
          onNavigate
            ? () => {
                setPracticeIntent({ tab: "cards", starredOnly: true, weakOnly: false });
                onNavigate("flashcards");
              }
            : undefined
        }
      />
    </div>
  );
}

function VoiceSpeedControl() {
  const { speed, setSpeed } = useVoiceSpeed();
  const { engine, setEngine } = useVoiceEngine();
  const [nativeOk, setNativeOk] = useState(true);

  // وجود صدای انگلیسی بومی فقط سمت کلاینت معلوم است — state در callback، نه در بدنه effect
  useEffect(() => {
    let cancelled = false;
    browserVoiceAvailable().then((ok) => {
      if (!cancelled) setNativeOk(ok);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <div
        role="group"
        aria-label="موتور صدا"
        className="flex items-center gap-1 rounded-full border bg-card/60 px-2 py-1"
      >
        <AudioLines size={13} className="mx-1 shrink-0 text-primary" aria-hidden />
        {VOICE_ENGINE_OPTIONS.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={engine === o.value}
            disabled={o.value === "browser" && !nativeOk}
            title={o.hint + (o.value === "browser" && !nativeOk ? " — روی این مرورگر موجود نیست" : "")}
            onClick={() => setEngine(o.value)}
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-bold transition-all disabled:opacity-40 disabled:line-through",
              engine === o.value
                ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                : "text-muted-foreground hover:bg-muted",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div
        role="group"
        aria-label="سرعت روخوانی"
        className="flex items-center gap-1 rounded-full border bg-card/60 px-2 py-1"
      >
        <Gauge size={13} className="mx-1 shrink-0 text-primary" aria-hidden />
        {VOICE_SPEED_OPTIONS.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={speed === o.value}
            title={`سرعت روخوانی: ${o.label}`}
            onClick={() => setSpeed(o.value)}
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-bold transition-all",
              speed === o.value
                ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                : "text-muted-foreground hover:bg-muted",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-1.5 text-[12px] font-bold transition-all",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
          : "text-muted-foreground hover:bg-muted",
      )}
    >
      {label}
    </button>
  );
}
