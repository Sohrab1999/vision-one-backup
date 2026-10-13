"use client";

/**
 * کارت سؤال (فاز playing) — تفکیک مکانیکی گام ۴ نقشهٔ refactor-2.
 * شامل نوار پیشرفت/زمان، نشان‌های وضعیت، دکمهٔ ستاره، گزینه‌ها و بازخورد پاسخ؛
 * کارت بونس «سؤال مشابه» به BonusCard (bonus-card.tsx) منتقل شده است.
 * JSX بایت‌به‌بایت از quiz-game.tsx منتقل شده است.
 */

import {
  ArrowLeft,
  CalendarCheck,
  CalendarRange,
  CheckCircle2,
  Hourglass,
  Layers,
  Loader2,
  NotebookPen,
  Sparkles,
  Star,
  Timer,
  Wand2,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { WeeklyInfo } from "@/lib/weekly-store";
import { LETTERS, levelBadgeClass } from "./constants";
import { fmtTime } from "./helpers";
import { BonusCard } from "./bonus-card";
import type { Mode, Question, SimilarBonus } from "./types";

export interface QuestionCardProps {
  current: Question;
  index: number;
  questions: Question[];
  selected: number | null;
  shownLeft: number;
  elapsed: number;
  timed: number;
  mode: Mode;
  weekly: WeeklyInfo;
  correctCount: number;
  aiExplanation: string | null;
  aiExplaining: boolean;
  bonus: SimilarBonus | null;
  bonusLoading: boolean;
  bonusSelected: number | null;
  bonusRegen: number;
  setBonus: (b: SimilarBonus | null) => void;
  setBonusSelected: (i: number) => void;
  hasQStar: (id: string) => boolean;
  toggleQStar: (id: string) => void;
  chooseOption: (optIdx: number) => void;
  nextQuestion: () => void;
  askAiExplanation: () => void;
  generateSimilar: (fromBonus: boolean) => void;
}

export function QuestionCard({
  current,
  index,
  questions,
  selected,
  shownLeft,
  elapsed,
  timed,
  mode,
  weekly,
  correctCount,
  aiExplanation,
  aiExplaining,
  bonus,
  bonusLoading,
  bonusSelected,
  bonusRegen,
  setBonus,
  setBonusSelected,
  hasQStar,
  toggleQStar,
  chooseOption,
  nextQuestion,
  askAiExplanation,
  generateSimilar,
}: QuestionCardProps) {
  const answered = selected !== null;

  return (
    <div className="mx-auto max-w-2xl space-y-4 rise-in">
      {/* نوار پیشرفت */}
      <div className="flex items-center gap-3">
        <Progress value={((index + 1) / questions.length) * 100} className="h-2 flex-1" />
        <span className="shrink-0 text-[12px] font-bold text-muted-foreground">
          سؤال {(index + 1).toLocaleString("fa-IR")} از {questions.length.toLocaleString("fa-IR")}
        </span>
        {timed > 0 ? (
          <Badge
            variant="outline"
            className={cn(
              "gap-1 shrink-0 text-[11px] font-black tabular-nums",
              selected === -1
                ? "border-destructive/50 bg-destructive/10 text-destructive"
                : shownLeft <= 5
                  ? "timer-urgent border-destructive/50 bg-destructive/10 text-destructive"
                  : shownLeft <= 10
                    ? "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    : "border-primary/40 bg-primary/10 text-primary",
            )}
          >
            {selected === -1 ? <Hourglass size={11} /> : <Timer size={11} />}
            {selected === -1 ? "وقت تمام" : `${shownLeft.toLocaleString("fa-IR")} ثانیه`}
          </Badge>
        ) : (
          <Badge variant="secondary" className="gap-1 shrink-0 text-[11px]">
            <Timer size={11} />
            {fmtTime(elapsed)}
          </Badge>
        )}
      </div>

      {/* نوار زمان باقی‌ماندهٔ سؤال در حالت زمان‌دار */}
      {timed > 0 && (
        <div aria-hidden className="h-1 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-[width] duration-1000 ease-linear",
              selected === -1
                ? "bg-destructive/60"
                : shownLeft <= 5
                  ? "bg-destructive"
                  : shownLeft <= 10
                    ? "bg-amber-500"
                    : "bg-primary",
            )}
            style={{ width: `${Math.min(100, (shownLeft / timed) * 100)}%` }}
          />
        </div>
      )}

      <Card>
        <CardContent className="space-y-5 p-5">
          <div className="flex flex-wrap items-center gap-2">
            {mode === "review" && (
              <Badge className="border-amber-500/40 bg-amber-500/15 text-[11px] text-amber-700 dark:text-amber-300">
                <NotebookPen size={11} />
                دور مرور
              </Badge>
            )}
            {mode === "starred" && (
              <Badge className="border-yellow-500/40 bg-yellow-500/15 text-[11px] text-yellow-700 dark:text-yellow-300">
                <Star size={11} />
                تمرین ستاره‌دارها
              </Badge>
            )}
            {mode === "combined" && (
              <Badge className="border-teal-500/40 bg-teal-500/15 text-[11px] text-teal-700 dark:text-teal-300">
                <Layers size={11} />
                مرور ترکیبی
              </Badge>
            )}
            {mode === "daily" && (
              <Badge className="border-amber-500/40 bg-amber-500/15 text-[11px] text-amber-700 dark:text-amber-300">
                <CalendarCheck size={11} />
                چالش روزانه
              </Badge>
            )}
            {mode === "weekly" && (
              <Badge className="border-violet-500/40 bg-violet-500/15 text-[11px] text-violet-700 dark:text-violet-300">
                <CalendarRange size={11} />
                چالش هفتگی · هفتهٔ {weekly.weekIndex.toLocaleString("fa-IR")}
              </Badge>
            )}
            <Badge variant="outline" className="text-[11px]">
              {current.scope}
            </Badge>
            <Badge variant="outline" className={cn("text-[11px]", levelBadgeClass(current.level))}>
              سطح: {current.level}
            </Badge>
            <Badge variant="secondary" className="text-[11px]">
              {current.category === "grammar" ? "گرامر" : "واژگان"}
            </Badge>
            {timed > 0 && mode !== "daily" && mode !== "weekly" && (
              <Badge variant="outline" className="gap-1 border-amber-500/40 text-[10.5px] text-amber-600 dark:text-amber-400">
                <Hourglass size={10} />
                زمان‌دار
              </Badge>
            )}
            {/* ستاره‌دار کردن سؤال جاری — حتی قبل از پاسخ */}
            <button
              type="button"
              onClick={() => toggleQStar(current.id)}
              aria-label={hasQStar(current.id) ? "حذف ستاره سؤال" : "ستاره‌دار کردن این سؤال"}
              aria-pressed={hasQStar(current.id)}
              title={hasQStar(current.id) ? "حذف از سؤال‌های ستاره‌دار" : "این سؤال را برای مرور بعدی ستاره‌دار کن"}
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all hover:scale-110",
                hasQStar(current.id) ? "text-yellow-500" : "text-muted-foreground/50 hover:text-yellow-500",
              )}
            >
              <Star size={15} className={cn(hasQStar(current.id) && "fill-yellow-500 star-pop")} />
            </button>
            <span className="mr-auto flex items-center gap-1 text-[12px] font-bold text-primary">
              <CheckCircle2 size={13} />
              {correctCount.toLocaleString("fa-IR")} صحیح
            </span>
          </div>

          <p dir="ltr" className="font-en rounded-xl bg-muted/50 p-4 text-[15px] font-semibold leading-8">
            {current.text}
          </p>

          <RadioGroup value={selected !== null ? String(selected) : ""} className="gap-2">
            {current.options.map((opt, i) => {
              const isCorrect = i === current.answer;
              const isChosen = i === selected;
              return (
                <Label
                  key={i}
                  htmlFor={`opt-${index}-${i}`}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all",
                    !answered && "hover:border-primary/50 hover:bg-primary/5",
                    answered && isCorrect && "border-primary bg-primary/10 shadow-sm",
                    answered && isChosen && !isCorrect && "border-destructive bg-destructive/10",
                    answered && !isChosen && !isCorrect && "opacity-55",
                  )}
                >
                  <RadioGroupItem
                    id={`opt-${index}-${i}`}
                    value={String(i)}
                    aria-label={`گزینه ${(i + 1).toLocaleString("fa-IR")}`}
                    disabled={answered}
                    onClick={() => chooseOption(i)}
                    className={cn(
                      answered && isCorrect && "border-primary text-primary",
                      answered && isChosen && !isCorrect && "border-destructive text-destructive",
                    )}
                  />
                  <span
                    dir="ltr"
                    className={cn(
                      "font-en flex-1 text-[14px] leading-6",
                      answered && isCorrect && "font-bold text-primary",
                      answered && isChosen && !isCorrect && "text-destructive",
                    )}
                  >
                    <span
                      className={cn(
                        "mr-2 inline-flex h-5.5 w-5.5 translate-y-1 items-center justify-center rounded-lg text-[10px] font-black transition-colors",
                        answered && isCorrect
                          ? "bg-primary text-primary-foreground"
                          : answered && isChosen && !isCorrect
                            ? "bg-destructive text-destructive-foreground"
                            : "bg-primary/10 text-primary",
                      )}
                    >
                      {LETTERS[i]}
                    </span>
                    {opt}
                  </span>
                  {answered && isCorrect && <CheckCircle2 size={17} className="text-primary shrink-0" />}
                  {answered && isChosen && !isCorrect && <XCircle size={17} className="text-destructive shrink-0" />}
                  {!answered && (
                    <kbd className="hidden h-5 min-w-5 shrink-0 items-center justify-center rounded-md border bg-muted/70 px-1 font-en text-[10px] font-bold text-muted-foreground sm:inline-flex" title="میان‌بر کیبورد">
                      {i + 1}
                    </kbd>
                  )}
                </Label>
              );
            })}
          </RadioGroup>

          {answered && (
            <div aria-live="polite" className="space-y-3 rise-in">
              {aiExplanation && (
                <div className="rounded-xl border border-accent/50 bg-accent/25 p-3 text-[12.5px] leading-7">
                  <p className="mb-1 flex items-center gap-1.5 text-[11px] font-black text-accent-foreground">
                    <Sparkles size={12} className="text-amber-500" />
                    توضیح هوشمند
                  </p>
                  {aiExplanation}
                </div>
              )}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={askAiExplanation}
                    disabled={aiExplaining}
                    className="gap-1.5 text-[12px]"
                  >
                    {aiExplaining ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} className="text-amber-500" />}
                    توضیح با هوش مصنوعی
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateSimilar(false)}
                    disabled={bonusLoading}
                    className="gap-1.5 text-[12px]"
                  >
                    {bonusLoading ? <Loader2 size={13} className="animate-spin" /> : <Wand2 size={13} className="text-teal-500" />}
                    سؤال مشابه بساز
                  </Button>
                </div>
                <Button onClick={nextQuestion} className="gap-2">
                  {index + 1 >= questions.length ? "دیدن نتیجه" : "سؤال بعدی"}
                  <kbd className="hidden rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 font-en text-[10px] font-bold sm:inline">↵</kbd>
                  <ArrowLeft size={15} />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* کارت بونس — سؤال مشابه (تمرین بی‌پایان) */}
      {answered && bonus && (
        <BonusCard
          bonus={bonus}
          index={index}
          bonusSelected={bonusSelected}
          bonusLoading={bonusLoading}
          bonusRegen={bonusRegen}
          setBonus={setBonus}
          setBonusSelected={setBonusSelected}
          generateSimilar={generateSimilar}
        />
      )}
    </div>
  );
}
