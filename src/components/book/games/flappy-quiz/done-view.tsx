"use client";

/**
 * done-view — صفحهٔ نتیجهٔ «فلپی گزینش» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).
 *
 * استخراج مکانیکی JSX فاز done از flappy-quiz-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * ستاره‌بندی per-game (آستانهٔ ۲× برای دور بی‌پایان) + ResultScreen کیت با آمار امتیاز/کمبو/
 * زمان پرواز (بی‌پایان) یا امتیاز/عبور درست/بهترین کمبو (عادی) + مرور خطاها با معنی واژه.
 * کامپوننت presentational — props هم‌نام شناسه‌های قبلی‌اند تا JSX منتقل‌شده صفر تغییر شناسه داشته باشد.
 */

import { CheckCircle2, Flame, Hourglass, Star } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { ResultScreen } from "../kit/result-screen";
import { faNum, fmtTime } from "../shared";
import { GAME_KEY, type Phase } from "./types";

/** props هم‌نام شناسه‌های flappy-quiz-game.tsx — JSX منتقل‌شده صفر تغییر شناسه دارد */
interface DoneViewProps {
  endless: boolean;
  score: number;
  isRecord: boolean;
  wrongWords: string[];
  meaningOf: (w: string) => string;
  maxCombo: number;
  flightTime: number;
  correctCount: number;
  start: () => void;
  startEndless: () => void;
  setEndless: Dispatch<SetStateAction<boolean>>;
  endlessRef: { current: boolean };
  setPhase: Dispatch<SetStateAction<Phase>>;
}

export function DoneView({
  endless,
  score,
  isRecord,
  wrongWords,
  meaningOf,
  maxCombo,
  flightTime,
  correctCount,
  start,
  startEndless,
  setEndless,
  endlessRef,
  setPhase,
}: DoneViewProps) {
  // ستاره‌بندی per-game: دور معمول ۶-۱۵ عبور × ۱۰-۲۰ امتیاز است →
  // ≥۱۲۰ = پرواز قوی (۳ ستاره)، ≥۷۰ = خوب (۲ ستاره)، بقیه ۱ ستاره
  // فاز G3-05 — دور بی‌پایان می‌تواند خیلی بلندتر شود → آستانه‌ها ۲× دور عادی
  const stars = endless
    ? score >= 240
      ? 3
      : score >= 120
        ? 2
        : 1
    : score >= 120
      ? 3
      : score >= 70
        ? 2
        : 1;
  return (
    <ResultScreen
      title={endless ? "پرواز بی‌پایان تمام شد!" : "پرواز تمام شد!"}
      stars={stars}
      isRecord={isRecord}
      errorCount={wrongWords.length}
      reviewItems={wrongWords.map((w) => ({ front: w, back: meaningOf(w) }))}
      stats={
        endless
          ? [
              {
                label: "امتیاز",
                value: faNum(score),
                icon: <Star size={16} className="text-amber-500" />,
              },
              {
                label: "بیشترین کمبو",
                value: `×${faNum(maxCombo)}`,
                icon: <Flame size={16} className="text-teal-500" />,
              },
              {
                label: "زمان پرواز",
                value: fmtTime(flightTime),
                icon: <Hourglass size={16} className="text-emerald-500" />,
              },
            ]
          : [
              {
                label: "امتیاز",
                value: faNum(score),
                icon: <Star size={16} className="text-amber-500" />,
              },
              {
                label: "عبور درست",
                value: faNum(correctCount),
                icon: <CheckCircle2 size={16} className="text-emerald-500" />,
              },
              {
                label: "بهترین کمبو",
                value: `×${faNum(maxCombo)}`,
                icon: <Flame size={16} className="text-teal-500" />,
              },
            ]
      }
      onReplay={endless ? startEndless : start}
      onExit={() => {
        setEndless(false);
        endlessRef.current = false;
        setPhase("setup");
      }}
      exitLabel="تنظیمات"
      game={GAME_KEY}
    />
  );
}
