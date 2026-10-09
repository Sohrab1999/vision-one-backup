"use client";

import { useState } from "react";
import { BookMarked, MessagesSquare, Languages } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SpeakButton } from "./speak-button";
import { READING_LIST, CONVERSATION_LIST } from "@/data/book-meta";
import type { Reading, Conversation } from "@/data/types";

const LESSON_TABS = [
  { lesson: 1, label: "درس ۱" },
  { lesson: 2, label: "درس ۲" },
  { lesson: 3, label: "درس ۳" },
  { lesson: 4, label: "درس ۴" },
];

export function ReadingsLibrary({ lessonFilter }: { lessonFilter?: number }) {
  const [showFa, setShowFa] = useState(true);
  const [activeLesson, setActiveLesson] = useState(lessonFilter ?? 1);

  const list = READING_LIST.filter((r) => r.lesson === activeLesson);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5">
          {LESSON_TABS.map((t) => (
            <button
              key={t.lesson}
              type="button"
              onClick={() => setActiveLesson(t.lesson)}
              className={cn(
                "rounded-full px-4 py-1.5 text-[12px] font-bold transition-all",
                activeLesson === t.lesson
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Languages size={15} className="text-muted-foreground" />
          <Label htmlFor="show-fa" className="text-[12px] cursor-pointer">
            نمایش ترجمه
          </Label>
          <Switch id="show-fa" checked={showFa} onCheckedChange={setShowFa} />
        </div>
      </div>

      {list.map((r) => (
        <ReadingCard key={r.id} reading={r} showFa={showFa} />
      ))}
    </div>
  );
}

export function ReadingCard({
  reading,
  showFa = true,
}: {
  reading: Reading;
  showFa?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 dir="ltr" className="font-en text-lg font-black text-primary text-left">
              {reading.title}
            </h3>
            <p className="mt-0.5 text-[13px] font-bold">{reading.titleFa}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1 text-[10px]">
              <BookMarked size={11} />
              {reading.source}
            </Badge>
            <SpeakButton
              text={reading.paragraphs.map((p) => p.en).join(" ")}
              size="md"
              label="روخوانی کل متن"
            />
          </div>
        </div>

        <div className="space-y-3">
          {reading.paragraphs.map((p, i) => (
            <div key={i} className="rounded-xl border bg-muted/30 p-4 space-y-2">
              <div className="flex items-start gap-2.5">
                <SpeakButton text={p.en} />
                <p dir="ltr" className="font-en flex-1 text-[13.5px] leading-7 text-foreground">
                  {p.en}
                </p>
              </div>
              {showFa && (
                <p className="border-t pt-2 text-[13px] leading-7 text-muted-foreground">
                  {p.fa}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ConversationsList({ lessonFilter }: { lessonFilter?: number }) {
  const [activeLesson, setActiveLesson] = useState(lessonFilter ?? 1);
  const list = CONVERSATION_LIST.filter((c) => c.lesson === activeLesson);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {LESSON_TABS.map((t) => (
          <button
            key={t.lesson}
            type="button"
            onClick={() => setActiveLesson(t.lesson)}
            className={cn(
              "rounded-full px-4 py-1.5 text-[12px] font-bold transition-all",
              activeLesson === t.lesson
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {list.map((c) => (
        <ConversationCard key={c.id} conversation={c} />
      ))}
    </div>
  );
}

function ConversationCard({ conversation }: { conversation: Conversation }) {
  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="flex items-center gap-2 text-base font-black">
              <MessagesSquare size={17} className="text-primary" />
              {conversation.titleFa}
            </h3>
            <p dir="ltr" className="font-en mt-0.5 text-[11px] text-muted-foreground text-left">
              {conversation.title}
            </p>
          </div>
          <Badge variant="secondary" className="text-[10px]">
            {conversation.source}
          </Badge>
        </div>

        {conversation.intro && (
          <div className="rounded-xl bg-muted/50 p-3">
            <p dir="ltr" className="font-en text-[12.5px] leading-6">
              {conversation.intro.en}
            </p>
            {conversation.intro.fa && (
              <p className="mt-1 text-[12px] leading-6 text-muted-foreground">
                {conversation.intro.fa}
              </p>
            )}
          </div>
        )}

        <div className="space-y-3">
          {conversation.lines.map((line, i) => {
            const even = i % 2 === 0;
            return (
              <div key={i} className={cn("flex gap-2.5", even ? "" : "flex-row-reverse")}>
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-black",
                    even ? "bg-primary/15 text-primary" : "bg-accent/50 text-accent-foreground",
                  )}
                >
                  {line.speaker.replace("Ms. ", "").replace("Mr. ", "").slice(0, 2)}
                </span>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl border p-3",
                    even ? "bg-card rounded-tr-sm" : "bg-muted/40 rounded-tl-sm",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <p className="text-[11px] font-black text-primary" dir="ltr">
                      {line.speaker}
                    </p>
                    <SpeakButton text={line.en} />
                  </div>
                  <p dir="ltr" className="font-en mt-1 text-[13.5px] font-semibold leading-6">
                    {line.en}
                  </p>
                  <p className="mt-1 text-[12px] leading-6 text-muted-foreground">{line.fa}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function TextsView() {
  const [tab, setTab] = useState<"readings" | "conversations">("readings");
  return (
    <div className="space-y-4">
      <div className="mx-auto flex w-fit rounded-xl border bg-card p-1">
        <Button
          variant={tab === "readings" ? "secondary" : "ghost"}
          size="sm"
          className="gap-1.5"
          onClick={() => setTab("readings")}
        >
          <BookMarked size={15} />
          ریدینگ‌ها
        </Button>
        <Button
          variant={tab === "conversations" ? "secondary" : "ghost"}
          size="sm"
          className="gap-1.5"
          onClick={() => setTab("conversations")}
        >
          <MessagesSquare size={15} />
          مکالمه‌ها
        </Button>
      </div>
      {tab === "readings" ? <ReadingsLibrary /> : <ConversationsList />}
    </div>
  );
}
