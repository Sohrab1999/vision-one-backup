"use client";

/**
 * setup-panel — نمای setup + آموزش ۳گامی بازی «تست برقی» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).
 * استخراج مکانیکی JSX از speed-quiz-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * آموزش استاندارد (TUTORIAL_STEPS) + چیپ‌های محدوده/دسته/مدت + انتخاب سطح دشواری + سوییچ
 * سؤال‌های هوشمند + دو دکمهٔ شروع (تایم‌دار/بی‌پایان) + TutorialOverlay.
 * کامپوننت presentational — state در index.tsx می‌ماند؛ props هم‌نام‌اند.
 */

import {
  Flame,
  Infinity as InfinityIcon,
  Loader2,
  Play,
  Sparkles,
  Timer,
  Trophy,
  Zap,
} from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { optionsFor, type DifficultyKey } from "../kit/difficulty";
import { DifficultyPicker } from "../kit/difficulty-picker";
import { buzz } from "../kit/haptics";
import { playSound } from "../kit/sound-engine";
import { TutorialOverlay, type TutorialStep } from "../kit/tutorial-overlay";
import { faNum } from "../shared";
import { lessonLabel } from "./helpers";
import { ALL_LESSON, DURATIONS, GAME_KEY, type CatKey, type RoundMode } from "./types";

/** آموزش ۳-گامی استاندارد (فاز G1-08) — هدف / کمبو ×۲ و ×۳ / تیک‌تاک آخر */
export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <Zap size={24} />,
    title: "مسابقه با تایمر!",
    text: "سؤال‌ها از بانک تست خود جزوه پشت‌سرهم می‌آیند — قبل از تمام‌شدن زمان بیشترین امتیاز را بگیر.",
  },
  {
    icon: <Flame size={24} />,
    title: "کمبو امتیازت را چند برابر می‌کند",
    text: "پاسخ درست پیاپی کمبو می‌سازد: از دومی ×۲ و از پنجمی ×۳ امتیاز. اشتباه یا رد کردن کمبو را صفر می‌کند.",
  },
  {
    icon: <Timer size={24} />,
    title: "تیک‌تاک ۱۰ ثانیهٔ آخر",
    text: "در ۱۰ ثانیهٔ آخر صدای تیک‌تاک می‌شنوی — تا آخرین ثانیه فرصت داری! با کلیدهای ۱ تا ۵ هم می‌توانی جواب بدهی.",
  },
];

  const chipCls = (active: boolean) =>
    cn(
      "flex min-h-11 items-center rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
      active
        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
        : "text-muted-foreground hover:bg-muted",
    );

interface SetupPanelProps {
  lesson: number;
  setLesson: (v: number) => void;
  cat: CatKey;
  setCat: (key: CatKey) => void;
  duration: number;
  setDuration: (d: number) => void;
  lessons: number[];
  countFor: (l: number) => number;
  level: DifficultyKey;
  changeLevel: (l: DifficultyKey) => void;
  totalSecs: number;
  weakCount: number;
  best: number | null;
  aiOn: boolean;
  setAiOn: Dispatch<SetStateAction<boolean>>;
  beginRound: (roundMode: RoundMode) => void;
  pendingMode: RoundMode | null;
  tutorialOpen: boolean;
  handleTutorialOpenChange: (open: boolean) => void;
}

export function SetupPanel({
  lesson,
  setLesson,
  cat,
  setCat,
  duration,
  setDuration,
  lessons,
  countFor,
  level,
  changeLevel,
  totalSecs,
  weakCount,
  best,
  aiOn,
  setAiOn,
  beginRound,
  pendingMode,
  tutorialOpen,
  handleTutorialOpenChange,
}: SetupPanelProps) {
  return (
    <>
      <Card className="mx-auto max-w-xl rise-in">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Zap size={22} />
            </span>
            <div>
              <h2 className="text-lg font-black">تست برقی</h2>
              <p className="text-xs text-muted-foreground">تایمر روشن است — هر ثانیه مهم است!</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
            <p>
              پاسخ درست پیاپی کمبو می‌سازد: از دومی ×۲، از پنجمی ×۳ امتیاز. اشتباه یا رد کردن کمبو را صفر می‌کند.
            </p>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">محدوده؟</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب محدودهٔ سؤال">
              <button
                type="button"
                aria-pressed={lesson === ALL_LESSON}
                onClick={() => setLesson(ALL_LESSON)}
                className={chipCls(lesson === ALL_LESSON)}
              >
                کل بانک ({faNum(countFor(ALL_LESSON))} سؤال)
              </button>
              {lessons.map((l) => (
                <button
                  key={l}
                  type="button"
                  aria-pressed={lesson === l}
                  onClick={() => setLesson(l)}
                  className={chipCls(lesson === l)}
                >
                  {lessonLabel(l)} ({faNum(countFor(l))})
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">کدام دسته؟</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب دستهٔ سؤال">
              {(
                [
                  ["all", "همه"],
                  ["vocabulary", "واژگان"],
                  ["grammar", "گرامر"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={cat === key}
                  onClick={() => setCat(key)}
                  className={chipCls(cat === key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[13px] font-bold">
              <Timer size={14} className="text-amber-500" />
              چند ثانیه؟
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="مدت مسابقه">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={duration === d}
                  onClick={() => setDuration(d)}
                  className={chipCls(duration === d)}
                >
                  {faNum(d)} ثانیه
                </button>
              ))}
            </div>
          </div>

          {/* فاز G3-01 — انتخاب سطح دشواری ماندگار (کیت difficulty) */}
          <DifficultyPicker value={level} onChange={changeLevel} />
          <p className="-mt-3 text-[11px] leading-5 text-muted-foreground">
            {level === "easy"
              ? `در این سطح: ${faNum(optionsFor(level, 3, 5))} گزینه · مدت ${faNum(duration)} ثانیه‌ای = ${faNum(totalSecs)} ثانیه · امتیاز ×۰٫۷`
              : level === "hard"
                ? `در این سطح: ${faNum(optionsFor(level, 3, 5))} گزینه (یک مزاحم اضافه) · مدت ${faNum(duration)} ثانیه‌ای = ${faNum(totalSecs)} ثانیه · امتیاز ×۱٫۶`
                : "در این سطح: همان تجربهٔ اصلی — ۴ گزینه و تایمر کامل"}
          </p>
          {/* فاز G3-02 — تمرکز هوشمند دور روی کارت‌های ضعیف/سررسید SRS */}
          {weakCount > 0 && (
            <p
              role="status"
              aria-live="polite"
              className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400"
            >
              🎯 مرکز این دور: {faNum(weakCount)} واژهٔ ضعیف تو
            </p>
          )}

          {best !== null && (
            <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
              <Trophy size={12} />
              بهترین امتیاز: {faNum(best)}
            </Badge>
          )}

          {/* فاز G5-02 — سوییچ «سؤال‌های هوشمند ✨» (state محلی؛ پیش‌فرض خاموش؛
              اگر سؤال‌ساز در دسترس نباشد دور کاملاً عادی شروع می‌شود) */}
          <div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="سؤال‌های هوشمند">
              <button
                type="button"
                aria-pressed={aiOn}
                onClick={() => {
                  playSound("click");
                  buzz("light");
                  setAiOn((v) => !v);
                }}
                className={cn(
                  "flex min-h-11 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
                  aiOn
                    ? "border-amber-500 bg-amber-500/15 text-amber-600 shadow-md shadow-amber-500/20 dark:text-amber-400"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                ✨ سؤال‌های هوشمند
              </button>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
              چند سؤال از واژه‌های همین کتاب با هوش مصنوعی ساخته می‌شود
            </p>
          </div>

          {/* فاز G3-05 — شروع تایم‌دار یا تمرین بی‌پایان (دکمهٔ جدا — هر دو min-h-11+) */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              size="lg"
              className="h-12 w-full gap-2 text-base sm:flex-1"
              onClick={() => beginRound("timed")}
              disabled={pendingMode !== null}
            >
              {pendingMode === "timed" ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  در حال آماده‌سازی…
                </>
              ) : (
                <>
                  <Play size={18} />
                  شروع مسابقه
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 w-full gap-2 text-base sm:flex-1"
              onClick={() => beginRound("endless")}
              disabled={pendingMode !== null}
            >
              {pendingMode === "endless" ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  در حال آماده‌سازی…
                </>
              ) : (
                <>
                  <InfinityIcon size={18} />
                  تمرین بی‌پایان ∞
                </>
              )}
            </Button>
          </div>
          <p className="text-center text-[11px] leading-5 text-muted-foreground">
            تمرین بی‌پایان: بدون تایمر پایان — تا هر وقت بخواهی؛ با «انصراف» آمار همین لحظه ثبت و
            صفحهٔ نتیجه باز می‌شود (رکورد جدا).
          </p>
        </CardContent>
      </Card>
      {/* فاز G2-c — آموزش یک‌بارنمایش در اولین ورود */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
