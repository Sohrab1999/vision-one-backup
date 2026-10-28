"use client";

import { useState } from "react";
import { BookMarked, MessagesSquare, Languages, CircleHelp, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { faNum } from "@/lib/class-store";
import { SpeakButton } from "./speak-button";
import { ClickableEnText } from "./word-lookup";
import { useBook, useBookData } from "@/lib/book-context";
import type { Reading, ReadingExercise, Conversation } from "@/data/types";

/** برچسب‌های تب درس — به‌صورت خودکار از محتوای کتاب فعال ساخته می‌شوند */
function useLessonTabs() {
  const data = useBookData();
  const { bookId } = useBook();
  const lessons = new Set<number>();
  data.readings.forEach((r) => lessons.add(r.lesson));
  data.conversations.forEach((c) => lessons.add(c.lesson));
  // کتاب‌های داستانی (Steps to Understanding): تب‌ها «داستان N» هستند نه «درس N»
  const isStoryBook = bookId?.startsWith("hill-") ?? false;
  return [...lessons].sort((a, b) => a - b).map((n) => ({
    lesson: n,
    label: isStoryBook ? `داستان ${faNum(n)}` : `درس ${n}`,
  }));
}

export function ReadingsLibrary({ lessonFilter }: { lessonFilter?: number }) {
  const data = useBookData();
  const lessonTabs = useLessonTabs();
  const [showFa, setShowFa] = useState(true);
  const [activeLesson, setActiveLesson] = useState(lessonFilter ?? lessonTabs[0]?.lesson ?? 1);

  const list = data.readings.filter((r) => r.lesson === activeLesson);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5">
          {lessonTabs.map((t) => (
            <button
              key={t.lesson}
              type="button"
              onClick={() => setActiveLesson(t.lesson)}
              className={cn(
                "rounded-full px-4 min-h-9 flex items-center text-[12px] font-bold transition-all active:scale-95",
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
    <Card className="mx-auto w-full max-w-3xl lg:max-w-5xl">
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
            /* دسکتاپ (lg+): EN و ترجمهٔ FA دوستونه — اسکرول نصف، مقایسهٔ خط‌به‌خط */
            <div
              key={i}
              className="rounded-xl border bg-muted/30 p-4 space-y-2 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0"
            >
              <div className="flex items-start gap-2.5">
                <SpeakButton text={p.en} />
                {/* موبایل (Task 23): متن ریدینگ از ۱۳٫۵px به ۱۵px — خوانایی با یک دست؛
                    هدف لمسی واژه‌های درون‌متنی هم با padding همسطح بزرگ‌تر شد */}
                <ClickableEnText
                  text={p.en}
                  className="font-en flex-1 text-[15px] leading-7 text-foreground md:text-base"
                />
              </div>
              {showFa && (
                <p className="border-t pt-2 text-[13px] leading-7 text-muted-foreground lg:border-s lg:border-t-0 lg:ps-4 lg:pt-0">
                  {p.fa}
                </p>
              )}
            </div>
          ))}
          <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
            💡 روی هر واژه بزن — یا یک عبارت را نگه‌دار و انتخاب کن تا «جست‌وجو» ظاهر شود
          </p>
        </div>

        {/* تمرین درک مطلب کتاب‌های داستانی — سؤال‌های بخش B با پاسخ نمونهٔ بازشونده */}
        {reading.exercise && reading.exercise.items.length > 0 && (
          <ReadingExerciseBlock exercise={reading.exercise} />
        )}
      </CardContent>
    </Card>
  );
}

/** یک آیتم تمرین با دکمهٔ باز/بستن پاسخ نمونه */
function ExerciseItem({ index, item }: { index: number; item: ReadingExercise["items"][number] }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="rounded-xl border bg-muted/30 p-3.5 space-y-2">
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-black text-primary">
          {faNum(index + 1)}
        </span>
        <ClickableEnText
          text={item.en}
          className="font-en flex-1 text-[14.5px] leading-7 text-foreground"
        />
      </div>
      {item.fa && <p className="ps-8.5 text-[12.5px] leading-6 text-muted-foreground">{item.fa}</p>}
      <div className="ps-8.5">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="h-8 gap-1.5 px-2.5 text-[11.5px] font-bold text-primary hover:text-primary"
        >
          <Eye size={13} />
          {open ? "پنهان کردن پاسخ" : "نمایش پاسخ نمونه"}
        </Button>
        {open && (
          <div className="mt-1.5 rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-1">
            <p dir="ltr" className="font-en text-[13.5px] leading-7 text-left">
              {item.answerEn}
            </p>
            {item.answerFa && (
              <p className="text-[12px] leading-6 text-muted-foreground">{item.answerFa}</p>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

function ReadingExerciseBlock({ exercise }: { exercise: ReadingExercise }) {
  return (
    <section className="rounded-2xl border-2 border-dashed border-primary/25 bg-background p-4 space-y-3" aria-label="تمرین درک مطلب">
      <div className="flex flex-wrap items-baseline justify-between gap-1">
        <h4 className="flex items-center gap-1.5 text-[14px] font-black">
          <CircleHelp size={16} className="text-primary" />
          تمرین درک مطلب
        </h4>
        <p dir="ltr" className="font-en text-[11px] text-muted-foreground text-left">
          {exercise.instruction}
        </p>
      </div>
      <p className="text-[12px] text-muted-foreground">{exercise.instructionFa}</p>
      <ol className="space-y-2.5">
        {exercise.items.map((item, i) => (
          <ExerciseItem key={i} index={i} item={item} />
        ))}
      </ol>
    </section>
  );
}

export function ConversationsList({ lessonFilter }: { lessonFilter?: number }) {
  const data = useBookData();
  const lessonTabs = useLessonTabs();
  const [activeLesson, setActiveLesson] = useState(lessonFilter ?? lessonTabs[0]?.lesson ?? 1);
  const list = data.conversations.filter((c) => c.lesson === activeLesson);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {lessonTabs.map((t) => (
          <button
            key={t.lesson}
            type="button"
            onClick={() => setActiveLesson(t.lesson)}
            className={cn(
              "rounded-full px-4 min-h-9 flex items-center text-[12px] font-bold transition-all active:scale-95",
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
                  <ClickableEnText
                    text={line.en}
                    className="font-en mt-1 block text-[13.5px] font-semibold leading-6"
                  />
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
