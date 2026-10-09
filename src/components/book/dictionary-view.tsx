"use client";

import { useMemo, useState } from "react";
import { Library, Search, Quote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DICTIONARY } from "@/data/dictionary";
import { SpeakButton } from "./speak-button";

export function DictionaryView() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DICTIONARY;
    return DICTIONARY.filter(
      (d) =>
        d.word.toLowerCase().includes(q) ||
        d.definition.toLowerCase().includes(q) ||
        d.pos.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="flex items-center gap-2 text-xl font-black">
          <Library size={20} className="text-primary" />
          دیکشنری انگلیسی به انگلیسی
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          {DICTIONARY.length.toLocaleString("fa-IR")} مدخل از دیکشنری تکمیلی جزوه — با تلفظ IPA، نقش دستوری و مثال.
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
        />
      </div>

      <ScrollArea className="h-[600px] rounded-xl border bg-card/40">
        <div className="grid grid-cols-1 gap-3 p-3 md:grid-cols-2">
          {filtered.map((d, i) => (
            <Card key={`${d.word}-${i}`} className="border-muted">
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
                  <SpeakButton text={d.word} className="mr-auto" />
                </div>
                <p dir="ltr" className="font-en text-[13px] leading-6 text-foreground">
                  {d.definition}
                </p>
                {d.examples.length > 0 && (
                  <div className="space-y-1 rounded-lg bg-muted/50 p-2.5">
                    {d.examples.map((ex, j) => (
                      <p key={j} dir="ltr" className="font-en flex items-start gap-1.5 text-[12px] leading-5 text-muted-foreground">
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
        {filtered.length === 0 && (
          <p className="p-8 text-center text-sm text-muted-foreground">
            واژه‌ای یافت نشد.
          </p>
        )}
      </ScrollArea>
    </div>
  );
}
