"use client";

/**
 * setup-panel — نمای راه‌اندازی «نقشه ماجراجویی» (گام ۷ نقشهٔ docs/refactor-roadmap-2.md).
 *
 * استخراج مکانیکی JSX فاز setup از adventure-map-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * کارت معرفی، انتخاب درس، بج رکورد، پیشرفت ذخیره‌شده، دکمه‌های ادامه/از اول/شروع
 * + آموزش ۳گامی (TUTORIAL_STEPS). کامپوننت presentational — state و موتور در index.tsx می‌ماند؛
 * props هم‌نام شناسه‌های قبلی‌اند تا JSX منتقل‌شده صفر تغییر شناسه داشته باشد.
 */

import { Lock, Map, Play, RotateCcw, Sparkles, Star, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { BookData } from "@/data/books/types";
import { faNum } from "../shared";
import { playSound } from "../kit/sound-engine";
import { buzz } from "../kit/haptics";
import type { TutorialStep } from "../kit/tutorial-overlay";
import {
  ALL_LESSONS,
  MAX_STARS,
  TOTAL_STAGES,
  type AdventureProgress,
  type BestRec,
  type Phase,
} from "./types";

/** آموزش ۳-گامی استاندارد (فاز G2-e) — نقشهٔ ۸ مرحله / گیم‌پلی مرحله / ستاره‌ها */
export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <Map size={24} />,
    title: "هشت گره روی نقشه",
    text: "هر گره یک مینی‌بازی کوتاه است؛ گرهٔ روشن را بزن تا مرحله شروع شود — فقط گرهٔ بعدی آزاد می‌شود.",
  },
  {
    icon: <Sparkles size={24} />,
    title: "چهار نوع چالش",
    text: "آزمون واژه، حروف جابه‌جا، جفت‌سازی و شنیداری — با ترتیب تازه در هر دور؛ خطاها را کم کن.",
  },
  {
    icon: <Star size={24} />,
    title: "ستاره‌ها رکورد می‌شوند",
    text: "صفر خطا = ۳ ستاره، یک خطا = ۲ ستاره، بیشتر = ۱ ستاره — مجموع ستاره‌های ۸ مرحله رکورد توست!",
  },
];

export interface SetupPanelProps {
  data: BookData;
  lesson: number;
  setLesson: (lesson: number) => void;
  best: BestRec | null;
  progress: AdventureProgress | null;
  doneCount: number;
  totalStars: number;
  allDone: boolean;
  beginAdventure: (mode: "fresh" | "continue") => void;
  setPhase: (phase: Phase) => void;
}

export function SetupPanel({
  data,
  lesson,
  setLesson,
  best,
  progress,
  doneCount,
  totalStars,
  allDone,
  beginAdventure,
  setPhase,
}: SetupPanelProps) {
  return (
    <Card className="mx-auto max-w-lg rise-in">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <Map size={22} />
          </span>
          <div>
            <h2 className="text-lg font-black">نقشه ماجراجویی</h2>
            <p className="text-xs text-muted-foreground">
              هشت مرحله روی یک نقشهٔ مارپیچ — گره‌به‌گره جلو برو!
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/10 p-3 text-[11px] leading-5 text-muted-foreground">
          <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
          <p>
            هر گره یک مینی‌بازی کوتاه است: آزمون واژه، حروف جابه‌جا، جفت‌سازی یا شنیداری —
            با ترتیب تازه در هر دور. صفر خطا = ۳ ستاره، یک خطا = ۲ ستاره، بیشتر = ۱ ستاره.
            پیشرفتت ذخیره می‌شود تا با بستن صفحه از دست نرود.
          </p>
        </div>

        <div>
          <p className="mb-2 text-[13px] font-bold">کدام درس؟</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب درس">
            <button
              type="button"
              onClick={() => {
                playSound("click");
                buzz("light");
                setLesson(ALL_LESSONS);
              }}
              aria-pressed={lesson === ALL_LESSONS}
              className={cn(
                "min-h-11 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
                lesson === ALL_LESSONS
                  ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              کل کتاب ({faNum(data.vocab.all.length)} واژه)
            </button>
            {data.vocab.lessons.filter((l) => l.lesson > 0).map((l) => (
              <button
                key={l.lesson}
                type="button"
                onClick={() => {
                  playSound("click");
                  buzz("light");
                  setLesson(l.lesson);
                }}
                aria-pressed={lesson === l.lesson}
                className={cn(
                  "min-h-11 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
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

        {best && (
          <Badge
            variant="outline"
            className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400"
          >
            <Trophy size={12} />
            بیشترین ستاره: {faNum(best.score)} از {faNum(MAX_STARS)}
          </Badge>
        )}

        {progress && (
          <div className="space-y-2 rounded-xl border bg-muted/40 p-3">
            <div className="flex items-center justify-between text-[12px] font-bold">
              <span>پیشرفت ذخیره‌شده</span>
              <span className="text-muted-foreground">
                {faNum(doneCount)} از {faNum(TOTAL_STAGES)} مرحله — {faNum(totalStars)} ستاره
              </span>
            </div>
            <div className="flex gap-1.5">
              {progress.stars.map((s, i) => (
                <div
                  key={`prog-${i}`}
                  className={cn(
                    "flex h-8 flex-1 items-center justify-center gap-0.5 rounded-lg border text-[11px] font-black",
                    progress.done[i]
                      ? "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      : "border-dashed border-muted-foreground/30 text-muted-foreground/50",
                  )}
                >
                  {progress.done[i] ? (
                    <>
                      <Star size={10} className="fill-amber-500 text-amber-500" />
                      {faNum(s)}
                    </>
                  ) : (
                    <Lock size={10} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {progress && !allDone && (
          <Button
            size="lg"
            className="h-12 w-full gap-2 text-base"
            onClick={() => {
              playSound("click");
              beginAdventure("continue");
            }}
          >
            <Play size={18} />
            ادامه ماجراجویی
          </Button>
        )}
        {progress && (
          <Button
            size="lg"
            variant={allDone ? "default" : "outline"}
            className="h-12 w-full gap-2 text-base"
            onClick={() => {
              playSound("click");
              beginAdventure("fresh");
            }}
          >
            <RotateCcw size={17} />
            از اول
          </Button>
        )}
        {progress && allDone && (
          <Button
            variant="outline"
            className="h-12 w-full gap-2 text-base"
            onClick={() => {
              playSound("click");
              setPhase("map");
            }}
          >
            <Map size={17} />
            نمایش نقشه
          </Button>
        )}
        {!progress && (
          <Button
            size="lg"
            className="h-12 w-full gap-2 text-base"
            onClick={() => {
              playSound("click");
              beginAdventure("fresh");
            }}
          >
            <Play size={18} />
            شروع ماجراجویی
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
