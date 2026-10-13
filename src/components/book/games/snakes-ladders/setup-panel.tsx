"use client";

/**
 * setup-panel — نمای راه‌اندازی «مار و پله واژگانی» (گام ۸ نقشهٔ docs/refactor-roadmap-2.md).
 *
 * استخراج مکانیکی JSX فاز setup از snakes-ladders-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * کارت معرفی، حالت بازی (hotseat/ربات)، نام بازیکن‌ها، محدودهٔ سؤال‌ها، دسته، بج رکورد،
 * دکمهٔ شروع + آموزش ۳گامی (TUTORIAL_STEPS — صادرشده برای بقیهٔ نماها).
 * کامپوننت presentational — state و موتور در index.tsx می‌ماند؛ props هم‌نام شناسه‌های قبلی‌اند
 * تا JSX منتقل‌شده صفر تغییر شناسه داشته باشد.
 */

import { Bot, Dices, Pause, Play, Sparkles, TrendingUp, Trophy, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Dispatch, SetStateAction } from "react";
import type { QuizQuestionSeed } from "@/data/types";
import { faNum, fmtTime } from "../shared";
import { TutorialOverlay, type TutorialStep } from "../kit/tutorial-overlay";
import { lessonLabel } from "./helpers";
import { ALL_LESSON, GAME_KEY, TOKEN_BG, type CatKey, type Mode } from "./types";

interface SetupPanelProps {
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  names: string[];
  setNames: Dispatch<SetStateAction<string[]>>;
  lesson: number;
  setLesson: Dispatch<SetStateAction<number>>;
  cat: CatKey;
  setCat: Dispatch<SetStateAction<CatKey>>;
  /** فهرست درس‌های موجود در استخر (برای چیپ‌های محدوده) */
  lessons: number[];
  /** تعداد واقعی سؤال هر چیپ محدوده (با اعمال دستهٔ فعال) */
  countFor: (l: number) => number;
  /** استخر سؤال‌های فیلترشدهٔ دور — فقط طولش در دکمهٔ شروع نمایش داده می‌شود */
  pool: QuizQuestionSeed[];
  best: number | null;
  start: () => void;
  tutorialOpen: boolean;
  handleTutorialOpenChange: (open: boolean) => void;
}

/** فاز G2-e-1 — آموزش ۳-گامی استاندارد (تاس = پاداش پاسخ درست / مار و پله / توقف امن) */
export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <Dices size={24} />,
    title: "پاسخ درست = تاس",
    text: "برای انداختن تاس اول باید سؤال واژگانی را درست جواب بدهی؛ بعد تاس می‌افتد و مهره‌ات خانه‌به‌خانه جلو می‌رود. تاس ۶ یک نوبت اضافه می‌دهد!",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "پله‌ها بالا می‌برند، مارها پایین",
    text: "روی بعضی خانه‌ها پله هست که تو را چند خانه بالا می‌برد و بعضی خانه‌ها مار دارند که برگشتت می‌دهند. نشانِ گوشهٔ خانه، مقصد را نشان می‌دهد.",
  },
  {
    icon: <Pause size={24} />,
    title: "توقف امن و رکورد",
    text: "هر لحظه بخواهی بازی را متوقف کن — ساعت دور هم می‌ایستد و تاس و حرکت مهره فریز می‌شود. سریع‌ترین پیروزی‌ات رکورد شخصی می‌شود.",
  },
];

export function SetupPanel({
  mode,
  setMode,
  count,
  setCount,
  names,
  setNames,
  lesson,
  setLesson,
  cat,
  setCat,
  lessons,
  countFor,
  pool,
  best,
  start,
  tutorialOpen,
  handleTutorialOpenChange,
}: SetupPanelProps) {
  const chipCls = (active: boolean) =>
    cn(
      "flex min-h-11 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
      active
        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
        : "text-muted-foreground hover:bg-muted",
    );
  return (
    <>
      <Card className="mx-auto max-w-xl rise-in">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Dices size={22} />
            </span>
            <div>
              <h2 className="text-lg font-black">مار و پله واژگانی</h2>
              <p className="text-xs text-muted-foreground">برای تاس انداختن اول باید سؤال را درست جواب بدهی!</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
            <p>
              هر بازیکن برای حرکت باید یک سؤال را درست جواب دهد؛ بعد تاس می‌آید و مهره خانه‌به‌خانه جلو می‌رود.
              تاس ۶ یک نوبت اضافه می‌دهد — مراقب مارها باش و دعا کن پله‌ها سر راهت باشند!
            </p>
          </div>

          <div>
            <p className="mb-2 text-[13px] font-bold">حالت بازی؟</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب حالت بازی">
              <button
                type="button"
                onClick={() => setMode("hotseat")}
                aria-pressed={mode === "hotseat"}
                className={chipCls(mode === "hotseat")}
              >
                <Users size={14} />
                روی یک دستگاه
              </button>
              <button
                type="button"
                onClick={() => setMode("bot")}
                aria-pressed={mode === "bot"}
                className={chipCls(mode === "bot")}
              >
                <Bot size={14} />
                مقابل ربات
              </button>
            </div>
          </div>

          {mode === "hotseat" ? (
            <div className="space-y-3">
              <div>
                <p className="mb-2 text-[13px] font-bold">چند بازیکن؟</p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="تعداد بازیکن‌ها">
                  {[2, 3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setCount(n)}
                      aria-pressed={count === n}
                      className={chipCls(count === n)}
                    >
                      {faNum(n)} بازیکن
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[13px] font-bold">نام بازیکن‌ها (اختیاری)</p>
                {Array.from({ length: count }, (_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={cn("h-3 w-3 shrink-0 rounded-full", TOKEN_BG[i])} aria-hidden />
                    <Input
                      value={names[i] ?? ""}
                      onChange={(e) => setNames((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))}
                      placeholder={`بازیکن ${faNum(i + 1)}`}
                      maxLength={18}
                      aria-label={`نام بازیکن ${faNum(i + 1)}`}
                      className="h-11 text-[13px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-[13px] font-bold">بازیکن‌ها</p>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                <Input
                  value={names[0] ?? ""}
                  onChange={(e) => setNames((prev) => prev.map((v, j) => (j === 0 ? e.target.value : v)))}
                  placeholder="تو"
                  maxLength={18}
                  aria-label="نام تو"
                  className="h-11 text-[13px]"
                />
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-muted/40 px-3 py-2.5 text-[12px]">
                <span className="h-3 w-3 shrink-0 rounded-full bg-amber-500" aria-hidden />
                <Bot size={14} className="shrink-0 text-muted-foreground" />
                <span className="font-bold">ربات</span>
                <span className="mr-auto text-[10px] text-muted-foreground">ربات تطبیقی — سختی بر اساس نتایج تو تنظیم می‌شود</span>
              </div>
            </div>
          )}

          <div>
            <p className="mb-2 text-[13px] font-bold">محدودهٔ سؤال‌ها؟</p>
            <div className="flex flex-wrap gap-2">
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
            <div className="flex flex-wrap gap-2">
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

          {best !== null && (
            <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
              <Trophy size={12} />
              سریع‌ترین پیروزی ({mode === "bot" ? "مقابل ربات" : "روی یک دستگاه"}): {fmtTime(best)}
            </Badge>
          )}

          <Button size="lg" className="h-12 w-full gap-2 text-base" onClick={start}>
            <Play size={18} />
            شروع بازی ({faNum(pool.length)} سؤال)
          </Button>
        </CardContent>
      </Card>
      {/* فاز G2-e-1 — آموزش یک‌بارنمایش در اولین ورود */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
