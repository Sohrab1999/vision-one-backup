"use client";

import { useMemo, useState } from "react";
import { Search, CheckCircle2, LayoutGrid, Rows3, Star, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useLearnedWords } from "@/lib/learned-store";
import { useStarredWords } from "@/lib/star-store";
import { SpeakButton } from "./speak-button";
import type { VocabEntry } from "@/data/types";

/** دکمه نشان‌گذاری (ستاره) — کلیکش نباید کارت را فلیپ کند */
function StarToggle({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
      onKeyDown={(e) => e.stopPropagation()}
      aria-label={active ? "حذف نشان" : "نشان‌گذاری واژه"}
      aria-pressed={active}
      title={active ? "حذف نشان" : "نشان‌گذاری برای مرور بعدی"}
      className={cn(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-all active:scale-90",
        active
          ? "border-amber-500/50 bg-amber-500/15 text-amber-500"
          : "border-transparent bg-muted/50 text-muted-foreground/50 hover:border-amber-500/30 hover:text-amber-500",
      )}
    >
      <Star size={13} className={cn(active && "fill-amber-500 star-pop")} />
    </button>
  );
}
export function VocabCardGrid({
  words,
  showLessonBadge = false,
  onPracticeStarred,
}: {
  words: VocabEntry[];
  showLessonBadge?: boolean;
  /** میان‌بر «تمرین ستاره‌دارها» — وقتی ستاره‌ای وجود دارد کنار چیپ ستاره نمایش داده می‌شود */
  onPracticeStarred?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"cards" | "table">("cards");
  const [starredOnly, setStarredOnly] = useState(false);
  const { learned, toggle } = useLearnedWords();
  const { has: hasStar, toggle: toggleStar, count: starCount } = useStarredWords();

  const filtered = useMemo(() => {
    let list = words;
    if (starredOnly) list = list.filter((w) => hasStar(w.word));
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (w) =>
        w.word.toLowerCase().includes(q) ||
        w.meaning.includes(query.trim()) ||
        (w.pos ?? "").toLowerCase().includes(q),
    );
  }, [words, query, starredOnly, hasStar]);

  const learnedInList = filtered.filter((w) => learned.has(w.word)).length;

  return (
    <div className="space-y-4">
      {/* ابزار جستجو و نما */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو در واژه‌ها یا معنی فارسی…"
            className="pr-9 bg-card"
            aria-label="جستجوی واژه"
          />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="shrink-0 text-[11px]">
            {filtered.length.toLocaleString("fa-IR")} واژه
          </Badge>
          <Badge variant="outline" className="shrink-0 gap-1 text-[11px] text-primary border-primary/30">
            <CheckCircle2 size={11} />
            {learnedInList.toLocaleString("fa-IR")} یادگرفته
          </Badge>
          <button
            type="button"
            onClick={() => setStarredOnly((v) => !v)}
            aria-pressed={starredOnly}
            className={cn(
              "flex h-7 shrink-0 items-center gap-1 rounded-full border px-2.5 text-[11px] font-black transition-all",
              starredOnly
                ? "border-amber-500/60 bg-amber-500/15 text-amber-600 shadow-sm dark:text-amber-400"
                : "text-muted-foreground hover:bg-muted",
            )}
            title="فقط واژه‌های نشان‌شده"
          >
            <Star size={11} className={cn(starredOnly && "fill-amber-500 text-amber-500")} />
            {starCount.toLocaleString("fa-IR")}
          </button>
          {onPracticeStarred && starCount > 0 && (
            <button
              type="button"
              onClick={onPracticeStarred}
              title="شروع فلاش‌کارت با واژه‌های ستاره‌دار"
              className="flex h-7 shrink-0 items-center gap-1 rounded-full border border-yellow-500/50 bg-yellow-500/10 px-2.5 text-[11px] font-black text-yellow-700 transition-all hover:bg-yellow-500/20 dark:text-yellow-300"
            >
              <GraduationCap size={12} />
              تمرین ستاره‌دارها
            </button>
          )}
          <div className="flex rounded-lg border bg-card p-0.5 shrink-0">
            <Button
              size="icon"
              variant={mode === "cards" ? "secondary" : "ghost"}
              className="h-7 w-7 rounded-md"
              onClick={() => setMode("cards")}
              aria-label="نمای کارت"
            >
              <LayoutGrid size={14} />
            </Button>
            <Button
              size="icon"
              variant={mode === "table" ? "secondary" : "ghost"}
              className="h-7 w-7 rounded-md"
              onClick={() => setMode("table")}
              aria-label="نمای جدول"
            >
              <Rows3 size={14} />
            </Button>
          </div>
        </div>
      </div>

      {mode === "table" ? (
        <Card className="overflow-hidden">
          <ScrollArea className="h-[560px]">
            <Table>
              <TableHeader className="sticky top-0 bg-card z-10">
                <TableRow>
                  <TableHead className="w-10">#</TableHead>
                  <TableHead className="text-left">واژه</TableHead>
                  <TableHead>معنی</TableHead>
                  {showLessonBadge && <TableHead className="w-24">بخش</TableHead>}
                  <TableHead className="w-20">نشان</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((w, i) => (
                  <TableRow key={`${w.word}-${i}`} className={cn(learned.has(w.word) && "opacity-55")}>
                    <TableCell className="text-muted-foreground text-xs">{(i + 1).toLocaleString("fa-IR")}</TableCell>
                    <TableCell>
                      <span dir="ltr" className="font-en font-bold text-primary block text-left">
                        {w.word}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">{w.meaning}</TableCell>
                    {showLessonBadge && (
                      <TableCell>
                        <Badge variant="secondary" className="text-[10px]">{w.lessonLabel}</Badge>
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <StarToggle active={hasStar(w.word)} onClick={() => toggleStar(w.word)} />
                        <SpeakButton text={w.word} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, 240).map((w, i) => {
            const isLearned = learned.has(w.word);
            return (
              <div key={`${w.word}-${i}`} className="flip-scene h-[108px]">
                <div
                  className={cn("flip-inner cursor-pointer", isLearned && "flipped")}
                  onClick={() => toggle(w.word)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && toggle(w.word)}
                  aria-label={`کارت واژه ${w.word}`}
                >
                  {/* روی کارت: واژه */}
                  <div className="flip-face border bg-card p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-2">
                      <Badge variant="secondary" className="text-[10px] shrink-0">
                        {showLessonBadge ? w.lessonLabel : `درس ${w.lesson > 0 ? w.lesson.toLocaleString("fa-IR") : "۷-۹"}`}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <StarToggle active={hasStar(w.word)} onClick={() => toggleStar(w.word)} />
                        <SpeakButton text={w.word} />
                      </span>
                    </div>
                    <p dir="ltr" className="font-en text-lg font-black text-foreground leading-tight line-clamp-2">
                      {w.word}
                    </p>
                  </div>
                  {/* پشت کارت: معنی */}
                  <div className="flip-face flip-back border border-primary/30 bg-primary/10 p-4 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-primary">
                        <CheckCircle2 size={11} />
                        یاد گرفتم
                      </span>
                      <span className="flex items-center gap-1">
                        <StarToggle active={hasStar(w.word)} onClick={() => toggleStar(w.word)} />
                        <SpeakButton text={w.word} />
                      </span>
                    </div>
                    <p className="text-[15px] font-bold leading-6 text-right">{w.meaning}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {mode === "cards" && filtered.length > 240 && (
        <p className="text-center text-xs text-muted-foreground">
          ۲۴۰ واژه اول نمایش داده شده — برای واژه‌های دیگر جستجو کنید.
        </p>
      )}
      {starredOnly && filtered.length === 0 && (
        <p className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6 text-center text-xs leading-6 text-muted-foreground">
          هنوز واژه‌ای نشان نزدی‌ای — روی ☆ هر کارت بزن تا برای مرور بعدی نشان شود.
        </p>
      )}
    </div>
  );
}
