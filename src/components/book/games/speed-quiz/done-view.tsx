"use client";

/**
 * done-view — نمای نتیجهٔ بازی «تست برقی» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).
 * استخراج مکانیکی JSX از speed-quiz-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * محاسبهٔ رتبه/دقت/ستاره + ResultScreen کیت (presentational — props هم‌نام از index).
 */

import { Flame, Star, Target } from "lucide-react";
import { levelScore, type DifficultyKey } from "../kit/difficulty";
import { ResultScreen } from "../kit/result-screen";
import { faNum } from "../shared";
import { rankOf } from "./helpers";
import { GAME_KEY } from "./types";
import type { Phase, RoundMode, WrongItem } from "./types";

interface DoneViewProps {
  score: number;
  mode: RoundMode;
  level: DifficultyKey;
  answered: number;
  correct: number;
  wrongList: WrongItem[];
  isRecord: boolean;
  maxCombo: number;
  /** برچسب اسکوپ جلسه برای رویداد K3 — همان scopeFor(...) لحظهٔ شروع دور */
  levelTag: string;
  beginRound: (roundMode: RoundMode) => void;
  setPhase: (p: Phase) => void;
}

export function DoneView({
  score,
  mode,
  level,
  answered,
  correct,
  wrongList,
  isRecord,
  maxCombo,
  levelTag,
  beginRound,
  setPhase,
}: DoneViewProps) {
  const rank = rankOf(score);
  const acc = answered > 0 ? Math.round((correct / answered) * 100) : 0;
  // ستاره‌بندی per-game (پیشنهاد تسک): دقت ≥۹۰٪ = ۳ ستاره، ≥۷۰٪ = ۲ ستاره، بقیه ۱
  const stars = acc >= 90 ? 3 : acc >= 70 ? 2 : 1;
  const finalScore = mode === "endless" ? score : levelScore(score, level);
  return (
    <ResultScreen
      title={mode === "endless" ? "تمرین بی‌پایان تمام شد!" : `زمان تمام شد — ${rank.label}!`}
      stars={stars}
      isRecord={isRecord}
      errorCount={wrongList.length}
      reviewItems={wrongList}
      stats={[
        { label: "امتیاز", value: faNum(finalScore), icon: <Star size={16} className="text-amber-500" /> },
        { label: "دقت", value: `${faNum(acc)}٪`, icon: <Target size={16} className="text-teal-500" /> },
        { label: "بهترین کمبو", value: `×${faNum(maxCombo)}`, icon: <Flame size={16} className="text-amber-500" /> },
      ]}
      onReplay={() => beginRound(mode)}
      onExit={() => setPhase("setup")}
      exitLabel="تنظیمات"
      game={GAME_KEY}
      level={levelTag}
    />
  );
}
