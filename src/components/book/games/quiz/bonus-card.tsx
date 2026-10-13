"use client";

/**
 * کارت بونس «سؤال مشابه» (تمرین بی‌پایان با هوش مصنوعی) — تفکیک مکانیکی گام ۴ نقشهٔ refactor-2.
 * JSX بایت‌به‌بایت از quiz-game.tsx منتقل شده است؛ وضعیت بونس نزد موتور (index.tsx) می‌ماند.
 */

import { CheckCircle2, Loader2, Sparkles, Wand2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LETTERS } from "./constants";
import type { SimilarBonus } from "./types";

export interface BonusCardProps {
  bonus: SimilarBonus;
  index: number;
  bonusSelected: number | null;
  bonusLoading: boolean;
  bonusRegen: number;
  setBonus: (b: SimilarBonus | null) => void;
  setBonusSelected: (i: number) => void;
  generateSimilar: (fromBonus: boolean) => void;
}

export function BonusCard({
  bonus,
  index,
  bonusSelected,
  bonusLoading,
  bonusRegen,
  setBonus,
  setBonusSelected,
  generateSimilar,
}: BonusCardProps) {
  return (
        <Card key={bonusRegen} className="border-amber-500/40 rise-in">
          <CardContent className="space-y-4 p-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="gap-1 border-amber-500/40 bg-amber-500/15 text-[11px] text-amber-700 dark:text-amber-300">
                <Wand2 size={11} />
                سؤال مشابه ✨
              </Badge>
              <Badge variant="outline" className="text-[10.5px]">
                تمرین بی‌پایان
              </Badge>
              <span className="mr-auto flex items-center gap-1 text-[11px] font-bold text-muted-foreground">
                ساخته‌شده از سؤال {(index + 1).toLocaleString("fa-IR")}
              </span>
            </div>

            <p dir="ltr" className="font-en rounded-xl bg-amber-500/5 p-4 text-[15px] font-semibold leading-8">
              {bonus.text}
            </p>

            <div className="space-y-2">
              {bonus.options.map((opt, i) => {
                const bonusAnswered = bonusSelected !== null;
                const isCorrect = i === bonus.answer;
                const isChosen = i === bonusSelected;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={isChosen}
                    disabled={bonusAnswered || bonusLoading}
                    onClick={() => setBonusSelected(i)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border p-3 transition-all",
                      !bonusAnswered && "hover:border-primary/50 hover:bg-primary/5",
                      bonusAnswered && isCorrect && "border-primary bg-primary/10 shadow-sm",
                      bonusAnswered && isChosen && !isCorrect && "border-destructive bg-destructive/10",
                      bonusAnswered && !isChosen && !isCorrect && "opacity-55",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-lg text-[10px] font-black transition-colors",
                        bonusAnswered && isCorrect
                          ? "bg-primary text-primary-foreground"
                          : bonusAnswered && isChosen && !isCorrect
                            ? "bg-destructive text-destructive-foreground"
                            : "bg-primary/10 text-primary",
                      )}
                    >
                      {LETTERS[i]}
                    </span>
                    <span
                      dir="ltr"
                      className={cn(
                        "font-en flex-1 text-[14px] leading-6",
                        bonusAnswered && isCorrect && "font-bold text-primary",
                        bonusAnswered && isChosen && !isCorrect && "text-destructive",
                      )}
                    >
                      {opt}
                    </span>
                    {bonusAnswered && isCorrect && <CheckCircle2 size={17} className="shrink-0 text-primary" />}
                    {bonusAnswered && isChosen && !isCorrect && <XCircle size={17} className="shrink-0 text-destructive" />}
                  </button>
                );
              })}
            </div>

            {bonusSelected !== null && bonus.note && (
              <div className="rounded-xl border border-accent/50 bg-accent/25 p-3 text-[12.5px] leading-7">
                <p className="mb-1 flex items-center gap-1.5 text-[11px] font-black text-accent-foreground">
                  <Sparkles size={12} className="text-amber-500" />
                  نکتهٔ این تست
                </p>
                {bonus.note}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => generateSimilar(true)} disabled={bonusLoading} className="gap-1.5 text-[12px]">
                {bonusLoading ? <Loader2 size={13} className="animate-spin" /> : <Wand2 size={13} className="text-amber-500" />}
                سؤال مشابه بعدی
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setBonus(null)} disabled={bonusLoading} className="text-[12px]">
                بستن
              </Button>
              {bonusSelected !== null && (
                <span className="mr-auto flex items-center gap-1 text-[11.5px] font-black">
                  {bonusSelected === bonus.answer ? (
                    <>
                      <CheckCircle2 size={13} className="text-primary" />
                      <span className="text-primary">درست بود! 🎉</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={13} className="text-destructive" />
                      <span className="text-destructive">اشتباه بود — نکته را بخوان</span>
                    </>
                  )}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
  );
}
