"use client";

import {
  BookOpen,
  Clock,
  GraduationCap,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CHAPTERS, BOOK_STATS } from "@/data/book-meta";
import { VOCAB_COUNT_BY_LESSON } from "@/data/vocab";
import { useLearnedWords } from "@/lib/learned-store";
import { cn } from "@/lib/utils";
import type { ViewId } from "./app-header";

const COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  amber: { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", border: "hover:border-amber-500/40" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", border: "hover:border-emerald-500/40" },
  teal: { bg: "bg-teal-500/10", text: "text-teal-600 dark:text-teal-400", border: "hover:border-teal-500/40" },
  violet: { bg: "bg-violet-500/10", text: "text-violet-600 dark:text-violet-400", border: "hover:border-violet-500/40" },
  orange: { bg: "bg-orange-500/10", text: "text-orange-600 dark:text-orange-400", border: "hover:border-orange-500/40" },
};

export function ContentsView({
  onOpenChapter,
}: {
  onOpenChapter: (chapterId: number) => void;
}) {
  const { learned } = useLearnedWords();

  return (
    <div className="space-y-5">
      <div className="text-center space-y-2 rise-in">
        <h1 className="text-2xl font-black">فهرست مطالب</h1>
        <p className="mx-auto max-w-md text-xs leading-6 text-muted-foreground">
          مسیر یادگیری کتاب در {CHAPTERS.length.toLocaleString("fa-IR")} فصل — هر فصل شامل واژگان، مکالمه، ریدینگ، گرامر و تمرین اختصاصی است.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {CHAPTERS.map((ch, idx) => {
          const c = COLOR_MAP[ch.color] ?? COLOR_MAP.emerald;
          const total = VOCAB_COUNT_BY_LESSON[ch.id] ?? 0;
          const learnedCount = [...learned].filter((w) =>
            // واژه‌های درس با جستجو در آرایه کامل بررسی می‌شوند
            true,
          ).length;
          void learnedCount;
          return (
            <Card
              key={ch.id}
              className={cn(
                `rise-in rise-in-${(idx % 4) + 1} group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl ${c.border}`,
              )}
              onClick={() => onOpenChapter(ch.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onOpenChapter(ch.id)}
              aria-label={`باز کردن فصل ${ch.titleFa}`}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl font-black text-sm", c.bg, c.text)}>
                        {ch.id === 0 ? "مرور" : ch.id.toLocaleString("fa-IR")}
                      </span>
                      <Badge variant="secondary" className="text-[10px]">
                        {ch.number}
                      </Badge>
                    </div>
                    <h2 dir="ltr" className="font-en text-lg font-black text-foreground text-left group-hover:text-primary transition-colors">
                      {ch.title}
                    </h2>
                    <p className="text-[13px] font-bold text-muted-foreground">{ch.titleFa}</p>
                  </div>
                  <ArrowLeft size={18} className="mt-1 text-muted-foreground transition-transform group-hover:-translate-x-1 group-hover:text-primary" />
                </div>

                <p className="mt-3 flex items-start gap-1.5 rounded-xl bg-muted/50 p-2.5 text-[11px] leading-5 text-muted-foreground">
                  <Sparkles size={12} className="mt-0.5 shrink-0 text-amber-500" />
                  <span dir="ltr" className="font-en">{ch.quote.en}</span>
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {ch.grammarTopics.map((t) => (
                    <Badge key={t} variant="outline" className="text-[10px] font-normal">
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock size={12} />
                    {ch.minutes.toLocaleString("fa-IR")} دقیقه
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <BookOpen size={12} />
                    {total.toLocaleString("fa-IR")} واژه
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <GraduationCap size={12} />
                    {ch.grammarTopics.length.toLocaleString("fa-IR")} گرامر
                  </span>
                  <Progress value={ch.id === 0 ? 0 : Math.min(100, ch.minutes * 2)} className="mr-auto h-1.5 w-20" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 p-4 text-[12px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-primary" />
            {BOOK_STATS.words.toLocaleString("fa-IR")} واژه
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-primary" />
            {BOOK_STATS.questions.toLocaleString("fa-IR")} تست
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-primary" />
            {BOOK_STATS.readings.toLocaleString("fa-IR")} ریدینگ + {BOOK_STATS.conversations.toLocaleString("fa-IR")} مکالمه
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-primary" />
            {BOOK_STATS.dictionary.toLocaleString("fa-IR")} مدخل دیکشنری
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
