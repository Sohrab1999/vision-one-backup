"use client";

import { useState } from "react";
import { BookOpen, Gauge } from "lucide-react";
import { VOCAB_LESSONS, vocabOfLesson } from "@/data/vocab";
import { BOOK_STATS } from "@/data/book-meta";
import { VocabCardGrid } from "./vocab-card-grid";
import { cn } from "@/lib/utils";
import { useVoiceSpeed, VOICE_SPEED_OPTIONS } from "@/lib/voice-store";

export function VocabularyView() {
  const [lesson, setLesson] = useState<number | undefined>(undefined);
  const words = lesson === undefined ? [...vocabOfLesson(1), ...vocabOfLesson(2), ...vocabOfLesson(3), ...vocabOfLesson(4)] : vocabOfLesson(lesson);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-black">
            <BookOpen size={20} className="text-primary" />
            واژگان کلیدی و تکمیلی
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {BOOK_STATS.words.toLocaleString("fa-IR")} واژه از کل کتاب — روی کارت بزن تا معنی را ببینی و آن را «یاد گرفته» علامت بزنی.
          </p>
        </div>
        <VoiceSpeedControl />
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterChip active={lesson === undefined} onClick={() => setLesson(undefined)} label="همه درس‌های دهم" />
        {VOCAB_LESSONS.map((l) => (
          <FilterChip
            key={l.lesson}
            active={lesson === l.lesson}
            onClick={() => setLesson(l.lesson)}
            label={l.label}
          />
        ))}
      </div>

      <VocabCardGrid words={words} showLessonBadge={lesson === undefined} />
    </div>
  );
}

function VoiceSpeedControl() {
  const { speed, setSpeed } = useVoiceSpeed();
  return (
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
