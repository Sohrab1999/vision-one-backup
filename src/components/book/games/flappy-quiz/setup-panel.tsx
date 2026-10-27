"use client";

/**
 * setup-panel — نمای راه‌اندازی «فلپی گزینش» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).
 *
 * استخراج مکانیکی JSX فاز setup از flappy-quiz-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * کارت معرفی، انتخاب درس، حالت آسان، بج رکورد عادی/بی‌پایان، دکمه‌های «شروع پرواز» و «تمرین بی‌پایان ∞»
 * + آموزش (TUTORIAL_STEPS ۳گامی + گام چهارم ENDLESS_TUTORIAL_STEP — صادرشده برای بقیهٔ نماها) + chipCls.
 * کامپوننت presentational — state و موتور در index.tsx می‌ماند؛ props هم‌نام شناسه‌های قبلی‌اند
 * تا JSX منتقل‌شده صفر تغییر شناسه داشته باشد.
 */

import { Bird, Heart, Infinity as InfinityIcon, MousePointerClick, Play, Sparkles, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Dispatch, SetStateAction } from "react";
import type { QuizQuestionSeed } from "@/data/types";
import { TutorialOverlay, type TutorialStep } from "../kit/tutorial-overlay";
import { faNum } from "../shared";
import { lessonLabel } from "./helpers";
import { ALL_LESSONS, GAME_KEY } from "./types";

/** فاز G2-c — آموزش ۳-گامی استاندارد (الگوی پایلوت memory / G1-08) */
export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <Bird size={24} />,
    title: "از گزینهٔ درست رد شو",
    text: "سؤالِ «دیوار پیش‌رو» را بالای بوم بخوان و دقیقاً از دهانهٔ گزینهٔ درستش عبور کن.",
  },
  {
    icon: <MousePointerClick size={24} />,
    title: "پرش با تپ یا Space",
    text: "کلیک/لمس روی بوم یا کلید Space بال می‌زند و پرنده را بالا می‌برد؛ جاذبه همیشه پایینش می‌کشد.",
  },
  {
    icon: <Heart size={24} />,
    title: "قلب‌ها و کمبو",
    text: "هر خطا یک ❤ کم می‌کند و کمبو را صفر می‌کند؛ عبورهای پشت‌سرهم بونوس می‌گیرند (۱۰ تا ۲۰ امتیاز). با صفر شدن قلب‌ها پرواز تمام است.",
  },
];

/** فاز G3-05 — گام چهارم آموزش فقط برای «تمرین بی‌پایان» (همان مسیر کیت، یک گام بیشتر) */
export const ENDLESS_TUTORIAL_STEP: TutorialStep = {
  icon: <InfinityIcon size={24} />,
  title: "پرواز بی‌پایان",
  text: "اینجا هیچ‌چیز دور را تمام نمی‌کند — هر خطا فقط کمبو را صفر می‌کند. هر وقت خواستی در توقف «پایان پرواز» را بزن تا امتیاز و آمار پروازت ثبت شود.",
};

const chipCls = (active: boolean) =>
  cn(
    "min-h-11 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
    active
      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
      : "text-muted-foreground hover:bg-muted",
  );

/** props هم‌نام شناسه‌های flappy-quiz-game.tsx — JSX منتقل‌شده صفر تغییر شناسه دارد */
interface SetupPanelProps {
  lesson: number;
  setLesson: Dispatch<SetStateAction<number>>;
  easy: boolean;
  setEasy: Dispatch<SetStateAction<boolean>>;
  lessons: number[];
  countFor: (l: number) => number;
  vocabSeed: QuizQuestionSeed[];
  best: number | null;
  bestEndless: number | null;
  weakCount: number;
  start: () => void;
  startEndless: () => void;
  tutorialSteps: TutorialStep[];
  tutorialOpen: boolean;
  handleTutorialOpenChange: (o: boolean) => void;
}

export function SetupPanel({
  lesson,
  setLesson,
  easy,
  setEasy,
  lessons,
  countFor,
  vocabSeed,
  best,
  bestEndless,
  weakCount,
  start,
  startEndless,
  tutorialSteps,
  tutorialOpen,
  handleTutorialOpenChange,
}: SetupPanelProps) {
  return (
    <>
      <Card className="mx-auto max-w-xl rise-in">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Bird size={22} />
            </span>
            <div>
              <h2 className="text-lg font-black">فلپی گزینش</h2>
              <p className="text-xs text-muted-foreground">پرواز کن و از دروازهٔ گزینهٔ درست رد شو!</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
            <p>
              روی هر دیوار چند گزینه نوشته شده — دقیقاً از گزینهٔ درستِ سؤالِ «دیوار پیش‌رو» رد شو. هر عبور درست
              کمبو و سرعت را بالا می‌برد و هر خطا یک ❤ کم می‌کند؛ با صفر شدن قلب‌ها پرواز تمام است.
            </p>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">کدام درس؟</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب درس">
              <button
                type="button"
                aria-pressed={lesson === ALL_LESSONS}
                onClick={() => setLesson(ALL_LESSONS)}
                className={chipCls(lesson === ALL_LESSONS)}
              >
                کل کتاب ({faNum(vocabSeed.length)} سؤال)
              </button>
              {lessons.map((l) => (
                <button
                  key={l}
                  type="button"
                  aria-pressed={lesson === l}
                  onClick={() => setLesson(l)}
                  className={chipCls(lesson === l)}
                >
                  {lessonLabel(l)} ({faNum(countFor(l))} سؤال)
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">سرعت پرواز</p>
            <button type="button" aria-pressed={easy} onClick={() => setEasy((v) => !v)} className={chipCls(easy)}>
              حالت آسان {easy ? "— فعال" : ""}
            </button>
            <p className="mt-2 text-[11px] text-muted-foreground">
              در حالت آسان جاذبه و سرعت پایه کمتر است؛ رکورد هر دو حالت جداگانه ثبت می‌شود.
            </p>
          </div>

          {best !== null && (
            <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
              <Trophy size={12} />
              بهترین امتیاز: {faNum(best)}
            </Badge>
          )}
          {bestEndless !== null && (
            <Badge
              variant="outline"
              className="gap-1.5 border-teal-500/40 text-teal-600 dark:text-teal-400"
            >
              <InfinityIcon size={12} />
              بهترین امتیاز بی‌پایان: {faNum(bestEndless)}
            </Badge>
          )}

          {/* فاز G3-05 — دکمهٔ جدا «تمرین بی‌پایان» کنار شروع عادی (پذیرش G3-05) */}
          <div className="grid gap-2 sm:grid-cols-2">
            <Button size="lg" className="h-12 w-full gap-2 text-base" onClick={start}>
              <Play size={18} />
              شروع پرواز
            </Button>
            <Button size="lg" variant="outline" className="h-12 w-full gap-2 text-base" onClick={startEndless}>
              <InfinityIcon size={18} className="text-teal-600 dark:text-teal-400" />
              تمرین بی‌پایان ∞
            </Button>
          </div>
          <p className="-mt-3 text-center text-[11px] leading-5 text-muted-foreground">
            بی‌پایان: خطا دور را تمام نمی‌کند (فقط کمبو صفر می‌شود) — پرواز تا «پایان پرواز» خودت ادامه دارد و رکورد جدا ثبت می‌شود.
          </p>
          {weakCount > 0 && (
            <p className="-mt-3 text-center text-[11px] font-bold text-teal-600 dark:text-teal-400">
              🎯 مرکز این دور: {faNum(weakCount)} واژهٔ ضعیف تو
            </p>
          )}
        </CardContent>
      </Card>
      {/* فاز G2-c — آموزش یک‌بارنمایش در اولین ورود */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={tutorialSteps}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
