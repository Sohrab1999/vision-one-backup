"use client";

import { useState, useMemo } from "react";
import { GraduationCap, Lightbulb, Table2, Type } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { SpeakButton } from "./speak-button";
import { useBookData } from "@/lib/book-context";
import type { GrammarBlock } from "@/data/types";

function BlockRenderer({ block }: { block: GrammarBlock }) {
  if (block.kind === "text" || block.kind === "formula") {
    return (
      <div className="space-y-2">
        {block.title && (
          <h4 className="flex items-center gap-1.5 text-[13px] font-black text-primary">
            {block.kind === "formula" ? <Type size={14} /> : <Lightbulb size={14} />}
            {block.title}
          </h4>
        )}
        <p
          className={cn(
            "rounded-xl p-3 text-[13px] leading-7",
            block.kind === "formula"
              ? "bg-primary/8 border border-primary/20 font-bold text-primary"
              : "bg-muted/60",
          )}
        >
          {block.text}
        </p>
      </div>
    );
  }

  if (block.kind === "note") {
    return (
      <div className="space-y-2">
        {block.title && (
          <h4 className="flex items-center gap-1.5 text-[13px] font-black text-accent-foreground">
            <Lightbulb size={14} className="text-amber-500" />
            {block.title}
          </h4>
        )}
        <p className="rounded-xl border border-accent/40 bg-accent/25 p-3 text-[13px] leading-7">
          {block.text}
        </p>
      </div>
    );
  }

  if (block.kind === "table" && block.headers && block.rows) {
    return (
      <div className="space-y-2">
        <h4 className="flex items-center gap-1.5 text-[13px] font-black text-primary">
          <Table2 size={14} />
          {block.title}
        </h4>
        <div className="overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/70">
                {block.headers.map((h, hi) => (
                  <TableHead key={`${hi}-${h}`} className="text-[12px] font-black">
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {block.rows.map((row, ri) => (
                <TableRow key={ri}>
                  {row.map((cell, ci) => (
                    <TableCell
                      key={ci}
                      className={cn(
                        "text-[12px] leading-6",
                        /[a-zA-Z]/.test(cell) && !/[\u0600-\u06FF]/.test(cell)
                          ? "font-en text-left"
                          : "",
                      )}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  if (block.kind === "examples" && block.items) {
    return (
      <div className="space-y-2">
        {block.title && (
          <h4 className="text-[13px] font-black text-foreground">{block.title}</h4>
        )}
        <div className="space-y-2">
          {block.items.map((ex, i) => (
            <div key={i} className="rounded-xl border bg-card p-3">
              <div className="flex items-start gap-2">
                <SpeakButton text={ex.en} />
                <div className="min-w-0 flex-1">
                  <p dir="ltr" className="font-en text-[13px] font-semibold leading-6 text-foreground">
                    {ex.en}
                  </p>
                  <p className="mt-1 text-[12px] text-muted-foreground">{ex.fa}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export function GrammarLibrary({ lessonFilter }: { lessonFilter?: number }) {
  const [value, setValue] = useState<string>("");

  return (
    <Accordion type="single" collapsible value={value} onValueChange={setValue} className="space-y-3">
      <GrammarAccordionItems lessonFilter={lessonFilter} />
    </Accordion>
  );
}

function GrammarAccordionItems({
  lessonFilter,
}: {
  lessonFilter?: number;
}) {
  const data = useBookData();
  const lessons = useMemo(
    () =>
      lessonFilter === undefined
        ? data.grammar.lessons
        : data.grammar.lessons.filter((g) => g.lesson === lessonFilter),
    [data.grammar.lessons, lessonFilter],
  );
  return (
    <>
      {lessons.map((g) => (
        <AccordionItem
          key={g.id}
          value={g.id}
          className="rounded-2xl border bg-card px-4 last:border-b"
        >
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex flex-1 flex-col items-start gap-1 text-right">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GraduationCap size={15} />
                </span>
                <Badge variant="secondary" className="text-[10px]">
                  {g.lesson === 0 ? "پایه ۷ تا ۹" : `درس ${g.lesson.toLocaleString("fa-IR")}`}
                </Badge>
              </div>
              <div>
                <p dir="ltr" className="font-en text-[13px] font-bold text-foreground text-left">
                  {g.title}
                </p>
                <p className="text-[13px] font-bold text-primary">{g.titleFa}</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-5">
            <p className="mb-4 rounded-xl bg-muted/60 p-3 text-[12px] leading-6 text-muted-foreground">
              {g.summary}
            </p>
            <div className="space-y-4">
              {g.blocks.map((b, i) => (
                <BlockRenderer key={i} block={b} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </>
  );
}

