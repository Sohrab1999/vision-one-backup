"use client";

/**
 * TeacherPanel — «معلم خصوصی» (فاز ۸): انتخاب موضوع گرامری + واژه‌های خود دانش‌آموز
 * → POST /api/ai-teacher → توضیح سطح‌بندی‌شده با مثال‌هایی که واژه‌های خودش را به‌کار می‌برند.
 * بدون هیچ effect — همهٔ آپدیت‌های state فقط در handlerها (سازگار با react-hooks v6).
 */

import { useState } from "react";
import {
  GraduationCap,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useBook, useBookData } from "@/lib/book-context";
import { readUserName } from "@/lib/name-store";
import { faNum } from "@/components/book/games/shared";

type Level = "A2" | "B1";

const MAX_WORDS = 15;

interface TeacherReply {
  reply: string;
  cached: boolean;
}

export function TeacherPanel() {
  const { bookId, meta } = useBook();
  const data = useBookData();

  const grammarTopics = data.grammar.lessons.map((l) => l.titleFa);
  const lessons = data.vocab.lessons;

  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [customTopic, setCustomTopic] = useState("");
  const [lesson, setLesson] = useState<number>(() =>
    lessons.some((l) => l.lesson === 1) ? 1 : (lessons[0]?.lesson ?? 0),
  );
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [level, setLevel] = useState<Level>("A2");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TeacherReply | null>(null);
  const [error, setError] = useState<string | null>(null);

  const words = data.vocab.ofLesson(lesson);
  const effectiveTopic = customTopic.trim() || selectedTopic;

  function pickTopic(topic: string) {
    setSelectedTopic((prev) => (prev === topic ? null : topic));
    setCustomTopic("");
  }

  function toggleWord(w: string) {
    setSelectedWords((prev) =>
      prev.includes(w) ? prev.filter((x) => x !== w) : [...prev, w],
    );
  }

  async function ask() {
    const topic = effectiveTopic;
    if (!topic || selectedWords.length === 0 || loading) return;
    const guest = readUserName();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/ai-teacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(guest ? { "x-visionone-name": guest } : {}),
        },
        body: JSON.stringify({
          topic,
          words: selectedWords,
          level,
          book: {
            id: bookId,
            title: data.info.title,
            grade: meta?.gradeLabel ?? "",
          },
        }),
      });
      const json = (await res.json()) as {
        reply?: string;
        cached?: boolean;
        error?: string;
      };
      if (res.ok && typeof json.reply === "string" && json.reply.trim()) {
        setResult({ reply: json.reply, cached: json.cached === true });
      } else {
        setError(json.error ?? "توضیحی ساخته نشد — دوباره تلاش کن");
      }
    } catch {
      setError("خطا در ارتباط با سرور — اتصال اینترنتت را بررسی کن");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* ۱) موضوع گرامری */}
      <Card className="border-primary/20 bg-card/60">
        <CardContent className="space-y-3 p-4">
          <p className="flex items-center gap-1.5 text-[13px] font-black">
            <GraduationCap size={15} className="text-primary" aria-hidden />
            موضوع گرامری را انتخاب کن
          </p>
          <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1" role="group" aria-label="موضوع‌های گرامری کتاب">
            {grammarTopics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => pickTopic(topic)}
                aria-pressed={selectedTopic === topic}
                className={cn(
                  "min-h-11 rounded-full border px-3 py-2 text-[11.5px] leading-5 transition-all",
                  selectedTopic === topic
                    ? "border-primary bg-primary/10 font-bold text-primary"
                    : "bg-card text-muted-foreground hover:border-primary/40 hover:text-primary",
                )}
              >
                {topic}
              </button>
            ))}
          </div>
          <Input
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder="یا موضوع دلخواه بنویس… (مثلاً: فرق will و be going to)"
            className="bg-card text-[12.5px]"
            aria-label="موضوع گرامری دلخواه"
          />
        </CardContent>
      </Card>

      {/* ۲) واژه‌های تو */}
      <Card className="border-primary/20 bg-card/60">
        <CardContent className="space-y-3 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[13px] font-black">
              واژه‌های خودت را انتخاب کن (تا {faNum(MAX_WORDS)} واژه)
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-[10.5px]">
                {faNum(selectedWords.length)} از {faNum(MAX_WORDS)}
              </Badge>
              {selectedWords.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedWords([])}
                  className="text-[11px] text-muted-foreground underline underline-offset-4 hover:text-primary"
                  aria-label="پاک کردن انتخاب واژه‌ها"
                >
                  پاک‌کردن
                </button>
              )}
            </div>
          </div>

          {/* فیلتر درس */}
          <div
            className="flex gap-1.5 overflow-x-auto pb-1"
            role="group"
            aria-label="فیلتر درس"
          >
            {lessons.map((l) => (
              <button
                key={l.lesson}
                type="button"
                onClick={() => setLesson(l.lesson)}
                aria-pressed={lesson === l.lesson}
                className={cn(
                  "min-h-11 shrink-0 whitespace-nowrap rounded-full border px-3.5 text-[11.5px] transition-all",
                  lesson === l.lesson
                    ? "border-primary bg-primary/10 font-bold text-primary"
                    : "bg-card text-muted-foreground hover:border-primary/40 hover:text-primary",
                )}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* چیپ‌های واژه */}
          <div
            className="grid max-h-48 grid-cols-2 gap-1.5 overflow-y-auto pr-1 sm:grid-cols-3"
            role="group"
            aria-label="واژه‌های درس"
          >
            {words.map((entry) => {
              const on = selectedWords.includes(entry.word);
              return (
                <button
                  key={`${entry.lesson}-${entry.word}`}
                  type="button"
                  onClick={() => toggleWord(entry.word)}
                  disabled={!on && selectedWords.length >= MAX_WORDS}
                  aria-pressed={on}
                  title={entry.meaning}
                  className={cn(
                    "flex min-h-11 flex-col items-start justify-center gap-0.5 rounded-xl border px-2.5 py-1.5 text-right transition-all disabled:opacity-40",
                    on
                      ? "border-primary bg-primary/10"
                      : "bg-card hover:border-primary/40",
                  )}
                >
                  <span dir="ltr" className="w-full truncate font-en text-[12px] font-bold">
                    {entry.word}
                  </span>
                  <span className="w-full truncate text-[10px] text-muted-foreground">
                    {entry.meaning}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* ۳) سطح + دکمهٔ اجرا */}
      <div className="flex items-center justify-center gap-1.5" role="group" aria-label="سطح پاسخ">
        <button
          type="button"
          onClick={() => setLevel("A2")}
          aria-pressed={level === "A2"}
          className={cn(
            "min-h-11 rounded-full border px-4 text-[11.5px] transition-all",
            level === "A2"
              ? "border-primary bg-primary/10 font-bold text-primary"
              : "bg-card text-muted-foreground hover:border-primary/40",
          )}
        >
          ساده (A2)
        </button>
        <button
          type="button"
          onClick={() => setLevel("B1")}
          aria-pressed={level === "B1"}
          className={cn(
            "min-h-11 rounded-full border px-4 text-[11.5px] transition-all",
            level === "B1"
              ? "border-primary bg-primary/10 font-bold text-primary"
              : "bg-card text-muted-foreground hover:border-primary/40",
          )}
        >
          سخت‌تر (B1)
        </button>
      </div>

      <Button
        className="min-h-11 w-full gap-2 rounded-xl"
        onClick={() => ask()}
        disabled={!effectiveTopic || selectedWords.length === 0 || loading}
        aria-busy={loading}
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" aria-hidden />
        ) : (
          <GraduationCap size={16} aria-hidden />
        )}
        توضیح بده
      </Button>

      {/* حالت لودینگ */}
      {loading && (
        <Card className="border-primary/20 bg-card/60">
          <CardContent className="space-y-2.5 p-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      )}

      {/* خطا — پیام amber */}
      {error && !loading && (
        <div
          role="alert"
          className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-3 text-[12.5px] leading-6 text-amber-800 dark:text-amber-200"
        >
          {error}
        </div>
      )}

      {/* پاسخ معلم — کارت emerald ملایم */}
      {result && !loading && (
        <Card className="border-emerald-500/30 bg-emerald-500/10">
          <CardContent className="space-y-3 p-4">
            <div className="flex items-center justify-between gap-2 border-b border-emerald-500/20 pb-2.5">
              <p className="flex items-center gap-1.5 text-[13px] font-black text-emerald-800 dark:text-emerald-200">
                <GraduationCap size={15} aria-hidden />
                معلم خصوصی
              </p>
              {result.cached && (
                <Badge variant="secondary" className="text-[10px]">
                  پاسخ ذخیره‌شده
                </Badge>
              )}
            </div>
            <div className="whitespace-pre-line text-[13.5px] leading-8 text-foreground">
              {result.reply}
            </div>
            <Button
              variant="secondary"
              className="min-h-11 w-full gap-2 rounded-xl bg-emerald-600/15 text-emerald-800 hover:bg-emerald-600/25 dark:text-emerald-200"
              onClick={() => ask()}
              disabled={loading}
              aria-label="پرسش دوباره از معلم خصوصی"
            >
              <RefreshCw size={14} aria-hidden />
              دوباره
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
