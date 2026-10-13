"use client";

import {
  History,
  Lightbulb,
  MousePointerClick,
  Play,
  Puzzle,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { BookData } from "@/data/books/types";
import { faNum, fmtTime } from "../shared";
import { buzz } from "../kit/haptics";
import { playSound } from "../kit/sound-engine";
import { TutorialOverlay, type TutorialStep } from "../kit/tutorial-overlay";
import type { CrosswordDraft } from "./draft";
import { ALL_LESSONS, COUNT_OPTIONS, GAME_KEY, type BestRecord } from "./types";

interface SetupPanelProps {
  data: BookData;
  draft: CrosswordDraft | null;
  lesson: number;
  setLesson: (lesson: number) => void;
  wordCount: number;
  setWordCount: (count: number) => void;
  best: BestRecord | null;
  start: () => void;
  resumeDraft: () => void;
  deleteDraft: () => void;
  tutorialOpen: boolean;
  handleTutorialOpenChange: (open: boolean) => void;
}

/** فاز G2-d — آموزش ۳-گامی استاندارد (هدف / جهت‌گیری با کلیک / راهنمای واژه‌ها) */
export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <Puzzle size={24} />,
    title: "جدول از واژه‌های درس ساخته می‌شود",
    text: "سرنخ هر واژه معنی فارسی است — حروف انگلیسی را با کیبورد یا ردیف حروف، در خانه‌های جدول بنشین تا همهٔ واژه‌ها سر جایشان بنشینند.",
  },
  {
    icon: <MousePointerClick size={24} />,
    title: "جهت افقی و عمودی",
    text: "روی یک خانه بزن تا انتخاب شود و هم‌مسیرهایش روشن شوند؛ دوباره روی همان خانه بزن تا جهت افقی (ACROSS) یا عمودی (DOWN) عوض شود.",
  },
  {
    icon: <Lightbulb size={24} />,
    title: "بررسی، راهنما و رکورد",
    text: "«بررسی» حروف درست را قفل و غلط‌ها را پاک می‌کند؛ «راهنما» یک حرف را آشکار می‌کند. سریع‌ترین حلِ بدون راهنما = رکورد! فهرست سرنخ‌ها زیر جدول است.",
  },
];

export function SetupPanel({
  data,
  draft,
  lesson,
  setLesson,
  wordCount,
  setWordCount,
  best,
  start,
  resumeDraft,
  deleteDraft,
  tutorialOpen,
  handleTutorialOpenChange,
}: SetupPanelProps) {
  const draftLessonLabel = draft
    ? draft.lesson === ALL_LESSONS
      ? "کل کتاب"
      : (data.vocab.lessons.find((l) => l.lesson === draft.lesson)?.label ??
        `درس ${faNum(draft.lesson)}`)
    : "";
  const draftFilled = draft ? Object.keys(draft.cells).length : 0;
  const chipCls = (activeChip: boolean) =>
    cn(
      "min-h-11 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
      activeChip
        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
        : "text-muted-foreground hover:bg-muted",
    );
  return (
    <>
      <Card className="mx-auto max-w-xl rise-in">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400">
              <Puzzle size={22} />
            </span>
            <div>
              <h2 className="text-lg font-black">جدول کلمات متقاطع</h2>
              <p className="text-xs text-muted-foreground">
                جدول از واژه‌های خود درس ساخته می‌شود — با سرنخ فارسی حروف را در خانه‌ها بنشین!
              </p>
            </div>
          </div>

          {/* فاز G2-d — نوار ادامهٔ جدول نیمه‌کاره (draft معتبر همین کتاب) */}
          {draft && (
            <div className="flex items-start gap-2.5 rounded-xl border border-teal-500/30 bg-teal-500/8 p-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-500/15 text-teal-600 dark:text-teal-400">
                <History size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-black">ادامهٔ جدول نیمه‌کاره؟</p>
                <p className="mt-0.5 text-[11px] leading-5 text-muted-foreground">
                  {draftLessonLabel} · {faNum(draft.wordCount)} واژه ·{" "}
                  {faNum(draftFilled)} خانهٔ پرشده
                </p>
                <div className="mt-2.5 flex gap-2">
                  <Button size="sm" className="h-11 flex-1 gap-1.5" onClick={resumeDraft}>
                    <Play size={15} />
                    ادامه
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-11 px-4"
                    onClick={deleteDraft}
                    aria-label="حذف جدول نیمه‌کاره"
                  >
                    حذف
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
            <p>
              معنی فارسی هر واژه را بخوان و حروفش را در جدول بگذار؛ روی خانه بزن تا جهت افقی/عمودی عوض شود.
              سریع‌ترین حلِ بدون راهنما = رکورد!
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
                className={chipCls(lesson === ALL_LESSONS)}
              >
                کل کتاب ({faNum(data.vocab.all.length)} واژه)
              </button>
              {data.vocab.lessons
                .filter((l) => l.lesson > 0)
                .map((l) => (
                  <button
                    key={l.lesson}
                    type="button"
                    onClick={() => {
                      playSound("click");
                      buzz("light");
                      setLesson(l.lesson);
                    }}
                    aria-pressed={lesson === l.lesson}
                    className={chipCls(lesson === l.lesson)}
                  >
                    {l.label}
                  </button>
                ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">چند واژه؟</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="تعداد واژه‌ها">
              {COUNT_OPTIONS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    playSound("click");
                    buzz("light");
                    setWordCount(n);
                  }}
                  aria-pressed={wordCount === n}
                  className={chipCls(wordCount === n)}
                >
                  {faNum(n)} واژه
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
              سریع‌ترین حل: {fmtTime(best.time)} (بدون راهنما)
            </Badge>
          )}

          <Button size="lg" className="h-12 w-full gap-2 text-base" onClick={start}>
            <Play size={18} />
            ساخت جدول و شروع
          </Button>
        </CardContent>
      </Card>
      {/* فاز G2-d — آموزش یک‌بارنمایش در اولین ورود */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
