"use client";

import { useMemo, useState } from "react";
import { Search, CheckCircle2, LayoutGrid, Rows3 } from "lucide-react";
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
import { SpeakButton } from "./speak-button";
import type { VocabEntry } from "@/data/vocab";

export function VocabCardGrid({
  words,
  showLessonBadge = false,
}: {
  words: VocabEntry[];
  showLessonBadge?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"cards" | "table">("cards");
  const { learned, toggle } = useLearnedWords();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return words;
    return words.filter(
      (w) =>
        w.word.toLowerCase().includes(q) ||
        w.meaning.includes(query.trim()) ||
        (w.pos ?? "").toLowerCase().includes(q),
    );
  }, [words, query]);

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
                  <TableHead className="w-12">صدا</TableHead>
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
                      <SpeakButton text={w.word} />
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
                      <SpeakButton text={w.word} />
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
                      <SpeakButton text={w.word} />
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
    </div>
  );
}
