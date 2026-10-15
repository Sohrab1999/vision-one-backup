"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Library, Search, Quote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useBookData } from "@/lib/book-context";
import { SpeakButton } from "./speak-button";

/** تعداد ستون‌های گرید دیکشنری — موبایل ۱ ستون و دسکتاپ (md به بالا) ۲ ستون؛ هماهنگ با md:grid-cols-2 قبلی */
function useColumnCount() {
  const [cols, setCols] = useState(1);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setCols(mq.matches ? 2 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return cols;
}

export function DictionaryView() {
  const data = useBookData();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data.dictionary;
    return data.dictionary.filter(
      (d) =>
        d.word.toLowerCase().includes(q) ||
        d.definition.toLowerCase().includes(q) ||
        d.pos.toLowerCase().includes(q),
    );
  }, [data.dictionary, query]);

  // مجازی‌سازی فهرست مدخل‌ها — فقط ردیف‌های قابل‌مشاهده در ویوپورت رندر می‌شوند
  const cols = useColumnCount();
  const parentRef = useRef<HTMLDivElement>(null);

  /** ردیف‌های گرید — هر ردیف به تعداد ستون‌ها مدخل دارد تا ارتفاع متغیر کارت‌ها با measureElement درست اندازه‌گیری شود */
  const rows = useMemo(() => {
    const out: (typeof filtered)[] = [];
    for (let i = 0; i < filtered.length; i += cols) {
      out.push(filtered.slice(i, i + cols));
    }
    return out;
  }, [filtered, cols]);

  // useVirtualizer توابع غیرقابل-memo برمی‌گرداند و React Compiler عمداً این کامپوننت را skip می‌کند — هشدار اطلاع‌رسانی است، نه خطا
  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    // برآورد اولیه ارتفاع ردیف (کارت + تعریف + مثال‌ها) — با measureElement اصلاح می‌شود
    estimateSize: () => 160,
    overscan: 8,
    getItemKey: (i) => rows[i].map((d) => d.word).join("|"),
  });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="flex items-center gap-2 text-xl font-black">
          <Library size={20} className="text-primary" />
          دیکشنری انگلیسی به انگلیسی
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          {data.dictionary.length.toLocaleString("fa-IR")} مدخل از دیکشنری تکمیلی جزوه — با تلفظ IPA، نقش دستوری و مثال.
        </p>
      </div>

      <div className="relative max-w-xl">
        <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a word… (جستجوی واژه یا تعریف)"
          className="pr-9 bg-card font-en"
          aria-label="جستجوی دیکشنری"
          enterKeyHint="search"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border bg-card/40 p-8 text-center text-sm text-muted-foreground">
          واژه‌ای یافت نشد.
        </p>
      ) : (
        <div
          ref={parentRef}
          // موبایل (Task 23): ارتفاع dvh به‌جای 600px ثابت (اسکرول-داخل-اسکرول در گوشی کوتاه)
          className="h-[calc(100dvh-230px)] max-h-[600px] min-h-[360px] overflow-y-auto rounded-xl border bg-card/40 px-3 pt-3"
        >
          <div className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const rowItems = rows[virtualRow.index];
              return (
                <div
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={virtualizer.measureElement}
                  className="absolute top-0 left-0 grid w-full gap-3 pb-3"
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                  }}
                >
                  {rowItems.map((d, j) => (
                    <Card key={`${d.word}-${virtualRow.index * cols + j}`} className="border-muted">
                      <CardContent className="space-y-2 p-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <p dir="ltr" className="font-en text-[15px] font-black text-primary">
                            {d.word}
                          </p>
                          <span dir="ltr" className="font-en rounded-md bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
                            {d.phonetic}
                          </span>
                          <Badge variant="secondary" dir="ltr" className="font-en text-[10px] italic">
                            {d.pos || "—"}
                          </Badge>
                          <Badge variant="outline" className="text-[10px]">
                            درس {d.lesson.toLocaleString("fa-IR")}
                          </Badge>
                          <SpeakButton text={d.word} className="mr-auto" showSlow />
                        </div>
                        <p dir="ltr" className="font-en text-[13px] leading-6 text-foreground">
                          {d.definition}
                        </p>
                        {d.examples.length > 0 && (
                          <div className="space-y-1 rounded-lg bg-muted/50 p-2.5">
                            {d.examples.map((ex, k) => (
                              <p key={k} dir="ltr" className="font-en flex items-start gap-1.5 text-[12px] leading-5 text-muted-foreground">
                                <Quote size={10} className="mt-1 shrink-0 text-primary/50" />
                                {ex}
                              </p>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
