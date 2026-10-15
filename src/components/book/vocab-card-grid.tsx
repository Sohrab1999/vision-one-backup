"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search, CheckCircle2, LayoutGrid, Rows3, Star, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
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

/**
 * نقشه راه دسکتاپ (دور ۳) — نمایش تدریجی به‌جای سقف سخت:
 * به‌جای «فقط ۲۴۰/۳۰۰ واژهٔ اول + برو جستجو کن»، لیست با اسکرول اضافه می‌شود
 * (IntersectionObserver + بافر ۴۸۰px) — بدون کتابخانهٔ مجازی‌سازی، بدون جهش layout،
 * و DOM فقط به‌اندازهٔ چیزی که کاربر دیده رشد می‌کند.
 *
 * شمارنده «state مشتق‌شده» است (الگوی مستند ری‌اکت — بدون effect و بدون ریست در effect):
 * با تغییر resetKey (نما/تعداد فیلتر) خواندن به initial برمی‌گردد و loadMoreِ بعدی
 * روی کلید جدید ذخیره می‌شود. ref حسگر هم جدا از مقدارهای state نگه داشته می‌شود
 * (قاعدهٔ react-hooks/refs — آبجکت برگشتی هوک فقط state خالص دارد).
 */
function useIncrementalReveal(total: number, initial: number, step: number, resetKey: string) {
  const [st, setSt] = useState(() => ({ key: resetKey, visible: initial }));

  const visible = st.key === resetKey ? Math.min(st.visible, total) : Math.min(initial, total);
  const hasMore = visible < total;

  const loadMore = useCallback(() => {
    setSt((prev) => {
      const base = prev.key === resetKey ? prev.visible : initial;
      return { key: resetKey, visible: Math.min(base + step, total) };
    });
  }, [resetKey, initial, step, total]);

  return { visible, hasMore, loadMore };
}

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
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all active:scale-90",
        active
          ? "border-amber-500/50 bg-amber-500/15 text-amber-500"
          : "border-transparent bg-muted/50 text-muted-foreground/50 hover:border-amber-500/30 hover:text-amber-500",
      )}
    >
      <Star size={15} className={cn(active && "fill-amber-500 star-pop")} />
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

  // موبایل (Task 23): اسکن ۱۵۰۰ آیتمی روی هر رندر (هر کلید جستجو) → useMemo
  const learnedInList = useMemo(
    () => filtered.filter((w) => learned.has(w.word)).length,
    [filtered, learned],
  );

  // نمایش تدریجی — با تغییر نما یا تعدادِ فیلتر، شمارش از ابتدا (resetKey شامل هر دو)
  const initialForMode = mode === "table" ? 120 : 60;
  const reveal = useIncrementalReveal(
    filtered.length,
    initialForMode,
    120,
    `${mode}:${filtered.length}`,
  );
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !reveal.hasMore) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) reveal.loadMore();
      },
      { rootMargin: "480px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reveal.hasMore, reveal.loadMore]);

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
            enterKeyHint="search"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
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
              "flex h-9 shrink-0 items-center gap-1 rounded-full border px-3 text-xs font-black transition-all",
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
              className="flex h-9 shrink-0 items-center gap-1 rounded-full border border-yellow-500/50 bg-yellow-500/10 px-3 text-xs font-black text-yellow-700 transition-all hover:bg-yellow-500/20 dark:text-yellow-300"
            >
              <GraduationCap size={12} />
              تمرین ستاره‌دارها
            </button>
          )}
          <div className="flex rounded-lg border bg-card p-0.5 shrink-0">
            <Button
              size="icon"
              variant={mode === "cards" ? "secondary" : "ghost"}
              className="h-9 w-9 rounded-md"
              onClick={() => setMode("cards")}
              aria-label="نمای کارت"
            >
              <LayoutGrid size={15} />
            </Button>
            <Button
              size="icon"
              variant={mode === "table" ? "secondary" : "ghost"}
              className="h-9 w-9 rounded-md"
              onClick={() => setMode("table")}
              aria-label="نمای جدول"
            >
              <Rows3 size={15} />
            </Button>
          </div>
        </div>
      </div>

      {mode === "table" ? (
        <Card className="overflow-hidden">
          <ScrollArea className="h-[560px]">
            {/* موبایل: عرض کمینه برای فعال‌شدن پن افقی داخل ScrollArea
                (اسکرول‌بار افقی مخفی + جدول ۵ ستونه در ۳۹۰px = پن نامرئی بود) */}
            <div className="min-w-[430px]">
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
                {/* نقشه راه دسکتاپ: نمایش تدریجی — سقف سخت ۳۰۰ حذف شد */}
                {filtered.slice(0, reveal.visible).map((w, i) => (
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
                        <SpeakButton text={w.word} showSlow />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
            {/* حسگر نمایش تدریجی — داخل ویوپورت ScrollArea */}
            {reveal.hasMore && <div ref={sentinelRef} aria-hidden className="h-px" />}
          </ScrollArea>
          {reveal.hasMore ? (
            <p className="border-t bg-muted/30 px-4 py-2.5 text-center text-xs text-muted-foreground">
              {reveal.visible.toLocaleString("fa-IR")} واژه از {filtered.length.toLocaleString("fa-IR")} نمایش داده شده — به اسکرول ادامه بده…
            </p>
          ) : (
            filtered.length > 120 && (
              <p className="border-t bg-muted/30 px-4 py-2.5 text-center text-xs text-muted-foreground">
                همهٔ {filtered.length.toLocaleString("fa-IR")} واژه نمایش داده شد ✓
              </p>
            )
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filtered.slice(0, reveal.visible).map((w, i) => {
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

      {mode === "cards" && reveal.hasMore && (
        <div ref={sentinelRef} className="py-2 text-center text-xs text-muted-foreground">
          {reveal.visible.toLocaleString("fa-IR")} از {filtered.length.toLocaleString("fa-IR")} واژه — اسکرول کن تا بیشتر بیاید…
        </div>
      )}
      {starredOnly && filtered.length === 0 && (
        <p className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6 text-center text-xs leading-6 text-muted-foreground">
          هنوز واژه‌ای نشان نزدی‌ای — روی ☆ هر کارت بزن تا برای مرور بعدی نشان شود.
        </p>
      )}
    </div>
  );
}
