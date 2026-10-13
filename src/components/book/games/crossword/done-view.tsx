"use client";

import { Lightbulb, Target, Timer } from "lucide-react";
import { ResultScreen } from "../kit/result-screen";
import { faNum, fmtTime } from "../shared";
import type { CrosswordPuzzle } from "./generator";
import type { Phase } from "./types";

interface DoneViewProps {
  puzzle: CrosswordPuzzle;
  wrongChecked: number;
  hints: number;
  secs: number;
  isRecord: boolean;
  missedWords: { front: string; back: string }[];
  start: () => void;
  setPhase: (phase: Phase) => void;
}

export function DoneView({
  puzzle,
  wrongChecked,
  hints,
  secs,
  isRecord,
  missedWords,
  start,
  setPhase,
}: DoneViewProps) {
  // ستاره‌بندی per-game: بدون خطای راستی‌آزمایی و بدون راهنما = ۳ ·
  // حداکثر ۶ خطا و حداکثر ۲ راهنما = ۲ · غیر از این = ۱
  const stars = wrongChecked === 0 && hints === 0 ? 3 : wrongChecked <= 6 && hints <= 2 ? 2 : 1;
  return (
    <ResultScreen
      title="جدول کامل شد!"
      stars={stars}
      isRecord={isRecord}
      errorCount={wrongChecked}
      reviewItems={missedWords}
      stats={[
        {
          label: "زمان",
          value: fmtTime(secs),
          icon: <Timer size={16} className="text-primary" />,
        },
        {
          label: "واژه",
          value: faNum(puzzle.placements.length),
          icon: <Target size={16} className="text-teal-500" />,
        },
        {
          label: "راهنما",
          value: faNum(hints),
          icon: <Lightbulb size={16} className="text-amber-500" />,
        },
      ]}
      onReplay={start}
      onExit={() => setPhase("setup")}
      exitLabel="تنظیمات"
    />
  );
}
