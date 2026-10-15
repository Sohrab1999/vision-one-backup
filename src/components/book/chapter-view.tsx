"use client";

import { useState } from "react";
import {
  BookOpen,
  GraduationCap,
  ClipboardList,
  FileText,
  MessagesSquare,
  ArrowRight,
  Quote,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBookData } from "@/lib/book-context";
import { VocabCardGrid } from "./vocab-card-grid";
import { GrammarLibrary } from "./grammar-library";
import { QuizGame } from "./games/quiz";
import { ReadingCard, ConversationsList } from "./texts-view";
import { cn } from "@/lib/utils";
import type { ViewId } from "./app-header";

export function ChapterView({
  chapterId,
  onNavigate,
}: {
  chapterId: number;
  onNavigate: (v: ViewId) => void;
}) {
  const data = useBookData();
  const chapter = data.chapters.find((c) => c.id === chapterId) ?? data.chapters[0];
  const [tab, setTab] = useState("intro");

  return (
    <div className="space-y-4">
      {/* سرصفحه فصل */}
      <div className="rise-in relative overflow-hidden rounded-2xl border bg-gradient-to-bl from-primary/12 via-card to-accent/20 p-6">
        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative space-y-3">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 -mb-2 text-[12px] text-muted-foreground"
            onClick={() => onNavigate("contents")}
          >
            <ArrowRight size={14} />
            بازگشت به فهرست
          </Button>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-primary text-primary-foreground">{chapter.number}</Badge>
            <Badge variant="secondary" className="text-[11px]">
              {chapter.minutes.toLocaleString("fa-IR")} دقیقه مطالعه
            </Badge>
          </div>
          <h1 dir="ltr" className="font-en text-2xl sm:text-3xl font-black text-left">
            {chapter.title}
          </h1>
          <p className="text-sm font-bold text-muted-foreground">{chapter.titleFa}</p>
          <div className="flex items-start gap-2 rounded-xl border bg-card/70 p-3 max-w-2xl">
            <Quote size={15} className="mt-1 shrink-0 text-amber-500" />
            <div>
              <p dir="ltr" className="font-en text-[12.5px] font-semibold leading-6">
                {chapter.quote.en}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {chapter.quote.fa} — {chapter.quote.source}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* تب‌های فصل */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex w-full flex-wrap h-auto gap-1 justify-start bg-card p-1.5 border">
          <TabsTrigger value="intro" className="gap-1.5 text-[12px]">
            <Sparkles size={13} /> معرفی
          </TabsTrigger>
          <TabsTrigger value="vocab" className="gap-1.5 text-[12px]">
            <BookOpen size={13} /> واژگان
          </TabsTrigger>
          {data.conversations.length > 0 && (
            <TabsTrigger value="conv" className="gap-1.5 text-[12px]">
              <MessagesSquare size={13} /> مکالمه
            </TabsTrigger>
          )}
          <TabsTrigger value="reading" className="gap-1.5 text-[12px]">
            <FileText size={13} /> ریدینگ
          </TabsTrigger>
          {data.grammar.lessons.length > 0 && (
            <TabsTrigger value="grammar" className="gap-1.5 text-[12px]">
              <GraduationCap size={13} /> گرامر
            </TabsTrigger>
          )}
          <TabsTrigger value="quiz" className="gap-1.5 text-[12px]">
            <ClipboardList size={13} /> تمرین
          </TabsTrigger>
        </TabsList>

        <TabsContent value="intro" className="rise-in">
          <ChapterIntro chapterId={chapter.id} onTabChange={setTab} />
        </TabsContent>
        <TabsContent value="vocab" className="rise-in">
          <VocabCardGrid words={data.vocab.ofLesson(chapter.id)} />
        </TabsContent>
        <TabsContent value="conv" className="rise-in">
          <ConversationsList lessonFilter={chapter.id} />
        </TabsContent>
        <TabsContent value="reading" className="rise-in">
          <div className="space-y-4">
            <ReadingsOfLesson lesson={chapter.id} />
          </div>
        </TabsContent>
        <TabsContent value="grammar" className="rise-in">
          <GrammarLibrary lessonFilter={chapter.id} />
        </TabsContent>
        <TabsContent value="quiz" className="rise-in">
          {chapter.id === 0 ? (
            <p className="rounded-xl border bg-card p-6 text-center text-sm text-muted-foreground">
              برای فصل مرور، از آزمون جامع در بخش «آزمون» استفاده کنید.
            </p>
          ) : (
            <QuizGame lessonFilter={chapter.id} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ReadingsOfLesson({ lesson }: { lesson: number }) {
  const data = useBookData();
  return (
    <>
      {data.readings
        .filter((r) => r.lesson === lesson)
        .map((r) => (
          <ReadingCard key={r.id} reading={r} />
        ))}
    </>
  );
}

function ChapterIntro({
  chapterId,
  onTabChange,
}: {
  chapterId: number;
  onTabChange: (tab: string) => void;
}) {
  const data = useBookData();
  const chapter = data.chapters.find((c) => c.id === chapterId) ?? data.chapters[0];
  const words = data.vocab.ofLesson(chapterId);
  const sample = words.slice(0, 8);

  const steps = [
    { icon: BookOpen, title: "واژگان", desc: `${words.length.toLocaleString("fa-IR")} واژه کلیدی درس با کارت فلپ و روخوانی`, tab: "vocab" },
    { icon: FileText, title: "ریدینگ", desc: "متن کتاب درسی و کتاب کار با ترجمه روان فارسی", tab: "reading" },
    ...(data.conversations.length > 0
      ? [{ icon: MessagesSquare, title: "مکالمه", desc: "گفت‌وگوی کتاب با روایت صوتی هر جمله", tab: "conv" as const }]
      : []),
    ...(data.grammar.lessons.length > 0
      ? [{ icon: GraduationCap, title: "گرامر", desc: chapter.grammarTopics.join(" • "), tab: "grammar" as const }]
      : []),
    { icon: ClipboardList, title: "تمرین", desc: "تست‌های آموزشی اختصاصی همین درس", tab: "quiz" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <Card
            key={s.title}
            className={cn("cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg", `rise-in rise-in-${(i % 4) + 1}`)}
            onClick={() => onTabChange(s.tab)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onTabChange(s.tab)}
          >
            <CardContent className="p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon size={17} />
              </span>
              <h3 className="mt-2.5 text-sm font-black">{s.title}</h3>
              <p className="mt-1 text-[11.5px] leading-5 text-muted-foreground">{s.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* نمونه واژگان */}
      <Card>
        <CardContent className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-black">نمونه واژه‌های این درس</h3>
            <Button variant="outline" size="sm" onClick={() => onTabChange("vocab")}>
              همه واژه‌ها
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {sample.map((w) => (
              <div key={w.word} className="rounded-xl border bg-card p-3 text-center">
                <p dir="ltr" className="font-en truncate text-[13px] font-black text-primary">
                  {w.word}
                </p>
                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{w.meaning}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
