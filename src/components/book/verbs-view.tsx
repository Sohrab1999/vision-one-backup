"use client";

import { useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Repeat, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBookData } from "@/lib/book-context";
import { SpeakButton } from "./speak-button";

/** ستون‌بندی جدول — موبایل (Task 23): در <md فقط شکل اول + معنی + صدا
    (۶ ستون در ۳۹۰px یعنی ~۷۲px برای هر ستون و شکستن سه‌خطی سرستون‌ها) */
const GRID_COLS =
  "grid-cols-[2rem_1.2fr_1fr_2.75rem] md:grid-cols-[2.5rem_1fr_1fr_1fr_1fr_3rem]";

export function VerbsView() {
  const data = useBookData();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data.verbs;
    return data.verbs.filter(
      (v) =>
        v.base.toLowerCase().includes(q) ||
        v.past.toLowerCase().includes(q) ||
        v.participle.toLowerCase().includes(q) ||
        v.meaning.includes(query.trim()),
    );
  }, [data.verbs, query]);

  // مجازی‌سازی سطرهای جدول — با ۱۰۰+ فعل فقط سطرهای قابل‌مشاهده رندر می‌شوند
  const parentRef = useRef<HTMLDivElement>(null);

  // useVirtualizer توابع غیرقابل-memo برمی‌گرداند و React Compiler عمداً این کامپوننت را skip می‌کند — هشدار اطلاع‌رسانی است، نه خطا
  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    // برآورد اولیه ارتفاع سطر (Badge + p-2) — با measureElement اصلاح می‌شود
    estimateSize: () => 40,
    overscan: 8,
    getItemKey: (i) => `${filtered[i].base}-${i}`,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-black">
            <Repeat size={20} className="text-primary" />
            افعال بی‌قاعده
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {data.verbs.length.toLocaleString("fa-IR")} فعل بی‌قاعده جزوه — شکل اول، گذشته، اسم مفعول و معنی.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو (go / went / رفتن)"
            className="pr-9 bg-card"
            aria-label="جستجوی فعل"
            enterKeyHint="search"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {/* موبایل: ارتفاع وابسته به dvh به‌جای 600px ثابت (اسکرول-داخل-اسکرول) */}
          <div ref={parentRef} className="h-[calc(100dvh-230px)] max-h-[600px] min-h-[360px] overflow-y-auto">
            {/* سرجدول چسبان — ظاهر همان TableHeader قبلی */}
            <div className="sticky top-0 z-10 border-b bg-card">
              <div className={`grid h-10 items-center ${GRID_COLS}`}>
                <div className="text-center text-sm font-medium">#</div>
                <div className="px-2 text-left text-sm font-medium">شکل اول</div>
                <div className="hidden px-2 text-left text-sm font-medium md:block">شکل دوم (گذشته)</div>
                <div className="hidden px-2 text-left text-sm font-medium md:block">شکل سوم (p.p)</div>
                <div className="px-2 text-left text-sm font-medium">معنی</div>
                <div className="px-2 text-left text-sm font-medium">صدا</div>
              </div>
            </div>
            <div className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
              {virtualizer.getVirtualItems().map((virtualRow) => {
                const v = filtered[virtualRow.index];
                return (
                  <div
                    key={virtualRow.key}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                    className={`absolute top-0 left-0 grid w-full items-center border-b transition-colors hover:bg-muted/40 ${GRID_COLS}`}
                    style={{ transform: `translateY(${virtualRow.start}px)` }}
                  >
                    <div className="p-2 text-center text-xs text-muted-foreground">
                      {(virtualRow.index + 1).toLocaleString("fa-IR")}
                    </div>
                    <div className="min-w-0 p-2">
                      <Badge variant="secondary" dir="ltr" className="font-en text-[12px] font-bold">
                        {v.base}
                      </Badge>
                    </div>
                    <div dir="ltr" className="font-en hidden p-2 text-left text-[13px] font-semibold md:block">
                      {v.past}
                    </div>
                    <div dir="ltr" className="font-en hidden p-2 text-left text-[13px] font-semibold text-primary md:block">
                      {v.participle}
                    </div>
                    <div className="min-w-0 p-2 text-[13px]">{v.meaning}</div>
                    <div className="p-2">
                      <SpeakButton text={`${v.base}, ${v.past}, ${v.participle}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
