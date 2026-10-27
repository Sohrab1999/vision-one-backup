"use client";

/**
 * setup-panel — نمای راه‌اندازی «وردل ویژن» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).
 *
 * استخراج مکانیکی JSX فاز setup از wordle-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * کارت معرفی + راهنمای رنگ حروف + انتخاب حالت (روزانه/بی‌نهایت) + انتخاب طول واژهٔ ۴/۵/۶ حرفی +
 * بج‌های استخر/رکورد/زنجیره + هشدار استخر کم + دکمهٔ شروع + آموزش ۳گامی
 * (TUTORIAL_STEPS — صادرشده برای بقیهٔ نماها).
 * کامپوننت presentational — state و موتور در index.tsx می‌ماند؛ props هم‌نام شناسه‌های قبلی‌اند
 * تا JSX منتقل‌شده صفر تغییر شناسه داشته باشد.
 */

import { Keyboard, Sun, Infinity as InfinityIcon, Play, Trophy, Sparkles, Target, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Dispatch, SetStateAction } from "react";
import type { VocabEntry } from "@/data/types";
import { faNum } from "../shared";
import { TutorialOverlay, type TutorialStep } from "../kit/tutorial-overlay";
import { GAME_KEY, LEVELS, MIN_POOL } from "./constants";
import type { BestMoves, DailyState, MetaSnapshot, Mode, WordLevel } from "./types";

interface SetupPanelProps {
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
  /** فاز G2-d — طول واژهٔ حالت بی‌نهایت (پیش‌فرض ۵) */
  wordLen: WordLevel;
  setWordLen: Dispatch<SetStateAction<WordLevel>>;
  /** وضعیت روزانهٔ امروز — null = هنوز شروع نشده */
  dailyToday: DailyState | null;
  /** استخرهای واژگان یکتا/مرتب بر حسب طول */
  poolsByLen: Record<WordLevel, VocabEntry[]>;
  /** رکورد بی‌نهایت هر سطح — ۵حرفی همان scope «infinite» قبلی */
  bestForLen: (n: WordLevel) => BestMoves | null;
  /** اسنپ‌شات رکوردها/زنجیره برای بج‌ها */
  meta: MetaSnapshot;
  startDaily: () => void;
  startInfinite: () => void;
  tutorialOpen: boolean;
  handleTutorialOpenChange: (open: boolean) => void;
}

/** آموزش ۳-گامی استاندارد (فاز G2-d) — هدف / رنگ‌ها / حالت‌ها و سطح‌ها */
export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <Target size={24} />,
    title: "واژهٔ پنهان را حدس بزن",
    text: "در ۶ حدس، واژهٔ پنهان را پیدا کن: هر حدس باید واژه‌ای واقعی از واژگان همین کتاب باشد.",
  },
  {
    icon: <Palette size={24} />,
    title: "رنگ حروف راهنمای توست",
    text: "سبز یعنی حرف در جای درست است؛ زرد یعنی حرف هست ولی جای دیگری؛ خاکستری یعنی در واژه نیست.",
  },
  {
    icon: <InfinityIcon size={24} />,
    title: "دو حالت، سه سطح",
    text: "«روزانه» هر روز یک واژهٔ ۵حرفی برای همه دارد. در «بی‌نهایت» طول واژه را انتخاب کن: ۴، ۵ یا ۶ حرفی — رکورد هر سطح جدا ثبت می‌شود.",
  },
];

export function SetupPanel({
  mode,
  setMode,
  wordLen,
  setWordLen,
  dailyToday,
  poolsByLen,
  bestForLen,
  meta,
  startDaily,
  startInfinite,
  tutorialOpen,
  handleTutorialOpenChange,
}: SetupPanelProps) {
  // ── Setup ──
  const dailyStatusText = !dailyToday
    ? "واژهٔ امروز منتظر توست"
    : dailyToday.status === "playing"
      ? `نیمه‌کاره — ${faNum(dailyToday.guesses.length)} حدس`
      : dailyToday.status === "won"
        ? "امروز پیدا شد ✓"
        : "امروز پیدا نشد";
  const dailyPoolOk = poolsByLen[5].length >= MIN_POOL;
  const infinitePoolOk = poolsByLen[wordLen].length >= MIN_POOL || dailyPoolOk;
  const setupPoolLen: WordLevel = mode === "daily" ? 5 : wordLen;
  const setupBest = bestForLen(setupPoolLen);
  return (
    <>
      <Card className="mx-auto max-w-xl rise-in">
        <CardContent className="space-y-6 p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400">
            <Keyboard size={22} />
          </span>
          <div>
            <h2 className="text-lg font-black">وردل ویژن</h2>
            <p className="text-xs text-muted-foreground">
              واژه‌ای از واژگان کتاب را در ۶ حدس پیدا کن — روزانه یا بی‌نهایت با واژه‌های ۴ تا ۶ حرفی!
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
          <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
          <div className="flex-1 space-y-2">
            <p>
              هر حدس باید یک واژهٔ واقعی از واژگان همین کتاب باشد. بعد از هر حدس رنگ حروف راهنمایت می‌کند:
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <span className="flex items-center gap-1.5">
                <span aria-hidden className="h-3.5 w-3.5 rounded border border-emerald-600 bg-emerald-600" />
                سبز — جای درست
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden className="h-3.5 w-3.5 rounded border border-amber-500 bg-amber-500" />
                زرد — هست ولی جابه‌جا
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden className="h-3.5 w-3.5 rounded border border-muted bg-muted" />
                خاکستری — در واژه نیست
              </span>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-2 text-[13px] font-bold">کدام حالت؟</p>
          <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label="انتخاب حالت بازی">
            <button
              type="button"
              onClick={() => setMode("daily")}
              aria-pressed={mode === "daily"}
              className={cn(
                "min-h-11 rounded-2xl border p-3 text-right transition-all",
                mode === "daily"
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  <Sun size={16} />
                </span>
                <span className="text-[13px] font-black text-foreground">روزانه</span>
              </span>
              <span className="mt-1.5 block text-[11px] leading-5">هر روز یک واژهٔ ۵حرفی برای همه — فقط یک فرصت!</span>
              <span className="mt-1 block text-[10px] font-bold text-muted-foreground">{dailyStatusText}</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("infinite")}
              aria-pressed={mode === "infinite"}
              className={cn(
                "min-h-11 rounded-2xl border p-3 text-right transition-all",
                mode === "infinite"
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-500/15 text-teal-600 dark:text-teal-400">
                  <InfinityIcon size={16} />
                </span>
                <span className="text-[13px] font-black text-foreground">بی‌نهایت</span>
              </span>
              <span className="mt-1.5 block text-[11px] leading-5">
                هر دور یک واژهٔ تصادفی تازه — با واژه‌های ۴ تا ۶ حرفی.
              </span>
              <span className="mt-1 block text-[10px] font-bold text-muted-foreground">
                {setupBest
                  ? `کمترین حدسِ برد تو (${faNum(setupPoolLen)}حرفی): ${faNum(setupBest.moves)}`
                  : "رکوردی ثبت نشده"}
              </span>
            </button>
          </div>
        </div>

        {/* فاز G2-d — انتخاب طول واژه — فقط حالت بی‌نهایت (روزانه همیشه ۵حرفی است) */}
        {mode === "infinite" && (
          <div>
            <p className="mb-2 text-[13px] font-bold">طول واژه؟</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب طول واژهٔ حالت بی‌نهایت">
              {LEVELS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setWordLen(n)}
                  aria-pressed={wordLen === n}
                  className={cn(
                    "min-h-11 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
                    wordLen === n
                      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {faNum(n)} حرفی
                </button>
              ))}
            </div>
            {poolsByLen[wordLen].length < MIN_POOL && (
              <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
                این کتاب {faNum(poolsByLen[wordLen].length)} واژهٔ {faNum(wordLen)}حرفی دارد — با شروع، دور با
                واژه‌های ۵حرفی ادامه می‌یابد.
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="gap-1 text-[11px]">
            <Keyboard size={11} />
            استخر واژگان {faNum(setupPoolLen)}حرفی: {faNum(poolsByLen[setupPoolLen].length)} واژه
          </Badge>
          {mode === "infinite" && setupBest && (
            <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
              <Trophy size={12} />
              بهترین برد {faNum(setupPoolLen)}حرفی: {faNum(setupBest.moves)} حدس
            </Badge>
          )}
          {meta.dailyBest && (
            <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
              <Trophy size={12} />
              بهترین زنجیرهٔ روزانه: {faNum(meta.dailyBest.score)} روز
            </Badge>
          )}
        </div>

        {!(mode === "daily" ? dailyPoolOk : infinitePoolOk) && (
          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
            <p>
              این کتاب فقط {faNum(poolsByLen[5].length)} واژهٔ ۵حرفی دارد — برای بازی حداقل {faNum(MIN_POOL)} واژه
              لازم است.
            </p>
          </div>
        )}

        <Button
          size="lg"
          className="h-12 w-full gap-2 text-base"
          onClick={mode === "daily" ? startDaily : startInfinite}
          disabled={mode === "daily" ? !dailyPoolOk : !infinitePoolOk}
        >
          <Play size={18} />
          {mode === "daily" ? (dailyToday ? "نمایش بازی امروز" : "شروع واژهٔ امروز") : "شروع دور بی‌نهایت"}
        </Button>
      </CardContent>
      </Card>
      {/* فاز G2-d — آموزش یک‌بارنمایش در اولین ورود (الگوی memory) */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
