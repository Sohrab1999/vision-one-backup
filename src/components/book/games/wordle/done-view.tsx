"use client";

/**
 * done-view — نمای پایان «وردل ویژن» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).
 *
 * استخراج مکانیکی JSX دو شاخهٔ done از wordle-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * DailyDoneView (روزانه — نمای مشتق‌شده از استور و رفرش‌پذیر؛ با شمارش معکوس متنی واژهٔ بعدی)
 * و InfiniteDoneView (بی‌نهایت). هر دو: ResultScreen کیت + کارت واژهٔ دور (معنی/درس —
 * SRS در finishGame ثبت شده است).
 * کامپوننت presentational — state و موتور در index.tsx می‌ماند؛ props هم‌نام شناسه‌های قبلی‌اند.
 */

import { Target, Timer, Trophy, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { VocabEntry } from "@/data/types";
import { faNum, fmtTime } from "../shared";
import { ResultScreen } from "../kit/result-screen";
import { TutorialOverlay } from "../kit/tutorial-overlay";
import { starsFor } from "./helpers";
import { TUTORIAL_STEPS } from "./setup-panel";
import { GAME_KEY, MAX_ROWS } from "./constants";
import type { DailyState, MetaSnapshot, Phase } from "./types";

interface DailyDoneViewProps {
  /** وضعیت روزانهٔ امروز — در شاخهٔ dailyDoneView قطعاً non-null است (گارد index) */
  dailyToday: DailyState;
  dailyAnswer: string;
  /** مدخل واژهٔ دور برای کارت معنی/درس */
  answerEntry: VocabEntry | null;
  activeAnswer: string;
  isRecord: boolean;
  /** مدت نهایی دور (ثانیه) برای آمار نتیجه */
  finalSecs: number;
  meta: MetaSnapshot;
  liveMsg: string;
  startInfinite: () => void;
  backToSetup: () => void;
  tutorialOpen: boolean;
  handleTutorialOpenChange: (open: boolean) => void;
}

export function DailyDoneView({
  dailyToday,
  dailyAnswer,
  answerEntry,
  activeAnswer,
  isRecord,
  finalSecs,
  meta,
  liveMsg,
  startInfinite,
  backToSetup,
  tutorialOpen,
  handleTutorialOpenChange,
}: DailyDoneViewProps) {
  const won = dailyToday.status === "won";
  const rowsUsed = dailyToday.guesses.length;
  const streakNow = meta.streak?.streak ?? 0;
  return (
    <>
      <ResultScreen
        title={won ? `کلمه ${dailyAnswer.toUpperCase()} بود! 🎉` : `کلمه این بود: ${dailyAnswer.toUpperCase()}`}
        stars={starsFor(won, rowsUsed)}
        isRecord={isRecord}
        stats={[
          {
            label: "حدس‌ها",
            value: `${faNum(rowsUsed)} از ${faNum(MAX_ROWS)}`,
            icon: <Target size={16} className="text-primary" />,
          },
          {
            label: "زمان",
            value: fmtTime(finalSecs),
            icon: <Timer size={16} className="text-teal-500" />,
          },
          {
            label: "زنجیرهٔ برد",
            value: `${faNum(streakNow)} روز`,
            icon: <Trophy size={16} className="text-amber-500" />,
          },
        ]}
        onReplay={startInfinite}
        onExit={backToSetup}
        exitLabel="بازگشت"
        game={GAME_KEY}
      />

      {/* کارت واژهٔ دور — معنی و درس (تکمیل ResultScreen؛ SRS در finishGame ثبت شد) */}
      {answerEntry && (
        <div className="mx-auto mt-3 max-w-xl space-y-2 rounded-2xl border bg-muted/40 p-4 text-center">
          <p dir="ltr" className="font-en text-2xl font-black tracking-wider">
            {activeAnswer.toUpperCase()}
          </p>
          <p className="text-[13px] font-bold leading-6">{answerEntry.meaning}</p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <Badge variant="secondary" className="text-[10px]">
              {answerEntry.lessonLabel}
            </Badge>
            {answerEntry.pos && (
              <Badge variant="outline" dir="ltr" className="font-en text-[10px]">
                {answerEntry.pos}
              </Badge>
            )}
            {!won && (
              <Badge
                variant="outline"
                className="gap-1 border-emerald-500/40 text-[10px] text-emerald-600 dark:text-emerald-400"
              >
                <CheckCircle2 size={10} />
                به مرور اضافه شد
              </Badge>
            )}
          </div>
          {/* شمارش معکوس متنی — بدون تایمر زنده */}
          <p className="flex items-center justify-center gap-1.5 pt-1 text-[12px] font-bold text-muted-foreground">
            <Clock size={14} className="text-teal-500" />
            واژهٔ بعدی فردا آماده می‌شود
          </p>
        </div>
      )}

      <p role="status" aria-live="polite" className="sr-only">
        {liveMsg}
      </p>
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}

interface InfiniteDoneViewProps {
  guesses: string[];
  answer: string;
  isRecord: boolean;
  finalSecs: number;
  meta: MetaSnapshot;
  liveMsg: string;
  startInfinite: () => void;
  setPhase: (p: Phase) => void;
  answerEntry: VocabEntry | null;
  activeAnswer: string;
  tutorialOpen: boolean;
  handleTutorialOpenChange: (open: boolean) => void;
}

export function InfiniteDoneView({
  guesses,
  answer,
  isRecord,
  finalSecs,
  meta,
  liveMsg,
  startInfinite,
  setPhase,
  answerEntry,
  activeAnswer,
  tutorialOpen,
  handleTutorialOpenChange,
}: InfiniteDoneViewProps) {
  // ── Done: بی‌نهایت — فاز G2-d: ResultScreen ──
  const won = guesses[guesses.length - 1] === answer;
  const rowsUsed = guesses.length;
  const streakNow = meta.streak?.streak ?? 0;
  return (
    <>
      <ResultScreen
        title={won ? `کلمه ${answer.toUpperCase()} بود! 🎉` : `کلمه این بود: ${answer.toUpperCase()}`}
        stars={starsFor(won, rowsUsed)}
        isRecord={isRecord}
        stats={[
          {
            label: "حدس‌ها",
            value: `${faNum(rowsUsed)} از ${faNum(MAX_ROWS)}`,
            icon: <Target size={16} className="text-primary" />,
          },
          {
            label: "زمان",
            value: fmtTime(finalSecs),
            icon: <Timer size={16} className="text-teal-500" />,
          },
          {
            label: "زنجیرهٔ برد",
            value: `${faNum(streakNow)} روز`,
            icon: <Trophy size={16} className="text-amber-500" />,
          },
        ]}
        onReplay={startInfinite}
        onExit={() => setPhase("setup")}
        exitLabel="تنظیمات"
        game={GAME_KEY}
      />

      {/* کارت واژهٔ دور — معنی و درس (تکمیل ResultScreen؛ SRS در finishGame ثبت شد) */}
      {answerEntry && (
        <div className="mx-auto mt-3 max-w-xl space-y-2 rounded-2xl border bg-muted/40 p-4 text-center">
          <p dir="ltr" className="font-en text-2xl font-black tracking-wider">
            {activeAnswer.toUpperCase()}
          </p>
          <p className="text-[13px] font-bold leading-6">{answerEntry.meaning}</p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <Badge variant="secondary" className="text-[10px]">
              {answerEntry.lessonLabel}
            </Badge>
            {answerEntry.pos && (
              <Badge variant="outline" dir="ltr" className="font-en text-[10px]">
                {answerEntry.pos}
              </Badge>
            )}
            {!won && (
              <Badge
                variant="outline"
                className="gap-1 border-emerald-500/40 text-[10px] text-emerald-600 dark:text-emerald-400"
              >
                <CheckCircle2 size={10} />
                به مرور اضافه شد
              </Badge>
            )}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="sr-only">
        {liveMsg}
      </p>
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
