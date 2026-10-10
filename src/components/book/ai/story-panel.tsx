"use client";

/**
 * StoryPanel — «داستان‌ساز» (فاز ۸): انتخاب ۶..۱۲ واژه از درس
 * → POST /api/ai-story → داستان انگلیسی A2 با هایلایت واژه‌ها + سؤال فهم مطلب گزینه‌ای.
 * هایلایت با split روی regex word-boundary و ساخت آرایهٔ span/mark (بدون dangerouslySetInnerHTML).
 * بدون هیچ effect — همهٔ آپدیت‌های state فقط در handlerها (سازگار با react-hooks v6).
 */

import { useState } from "react";
import {
  BookOpenCheck,
  Check,
  Loader2,
  RotateCcw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useBook, useBookData } from "@/lib/book-context";
import { readUserName } from "@/lib/name-store";
import { faNum } from "@/components/book/games/shared";
import { SpeakButton } from "../speak-button";

const MIN_WORDS = 6;
const MAX_WORDS = 12;

interface StoryResult {
  story: string;
  question: string;
  options: string[];
  answer: number;
  cached?: boolean;
}

interface Span {
  text: string;
  hit: boolean;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** پیدا کردن واژه‌های درس با word-boundary و تبدیل متن به آرایهٔ تکه‌ها */
function buildSpans(text: string, words: string[]): Span[] {
  const list = Array.from(new Set(words.map((w) => w.trim()).filter(Boolean)))
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp);
  if (list.length === 0) return [{ text, hit: false }];
  const re = new RegExp(`\\b(?:${list.join("|")})\\b`, "gi");
  const spans: Span[] = [];
  let last = 0;
  let m: RegExpExecArray | null = re.exec(text);
  while (m !== null) {
    if (m.index > last) spans.push({ text: text.slice(last, m.index), hit: false });
    spans.push({ text: m[0], hit: true });
    last = m.index + m[0].length;
    if (m[0].length === 0) re.lastIndex += 1;
    m = re.exec(text);
  }
  if (last < text.length) spans.push({ text: text.slice(last), hit: false });
  return spans;
}

export function StoryPanel() {
  const { bookId, meta } = useBook();
  const data = useBookData();
  const lessons = data.vocab.lessons;

  const [lesson, setLesson] = useState<number>(() =>
    lessons.some((l) => l.lesson === 1) ? 1 : (lessons[0]?.lesson ?? 0),
  );
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StoryResult | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const words = data.vocab.ofLesson(lesson);
  const enoughWords = selectedWords.length >= MIN_WORDS && selectedWords.length <= MAX_WORDS;

  function toggleWord(w: string) {
    setSelectedWords((prev) =>
      prev.includes(w) ? prev.filter((x) => x !== w) : [...prev, w],
    );
  }

  async function makeStory() {
    if (!enoughWords || loading) return;
    const guest = readUserName();
    setLoading(true);
    setError(null);
    setResult(null);
    setPicked(null);
    try {
      const res = await fetch("/api/ai-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(guest ? { "x-visionone-name": guest } : {}),
        },
        body: JSON.stringify({
          words: selectedWords,
          lesson,
          book: {
            id: bookId,
            title: data.info.title,
            grade: meta?.gradeLabel ?? "",
          },
        }),
      });
      const json = (await res.json()) as StoryResult & { error?: string };
      if (
        res.ok &&
        typeof json.story === "string" &&
        typeof json.question === "string" &&
        Array.isArray(json.options) &&
        typeof json.answer === "number"
      ) {
        setResult({
          story: json.story,
          question: json.question,
          options: json.options,
          answer: json.answer,
          cached: json.cached === true,
        });
      } else {
        setError(json.error ?? "داستانی ساخته نشد — دوباره تلاش کن");
      }
    } catch {
      setError("خطا در ارتباط با سرور — اتصال اینترنتت را بررسی کن");
    } finally {
      setLoading(false);
    }
  }

  function newStory() {
    setResult(null);
    setPicked(null);
    setError(null);
  }

  return (
    <div className="space-y-4">
      {/* انتخاب واژه‌ها */}
      <Card className="border-primary/20 bg-card/60">
        <CardContent className="space-y-3 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 text-[13px] font-black">
              <BookOpenCheck size={15} className="text-primary" aria-hidden />
              واژه‌های داستان را انتخاب کن
            </p>
            <Badge variant="secondary" className="text-[10.5px]">
              {faNum(selectedWords.length)} واژه (۶ تا ۱۲)
            </Badge>
          </div>

          {/* تب درس */}
          <div
            className="flex gap-1.5 overflow-x-auto pb-1"
            role="group"
            aria-label="انتخاب درس"
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

          {/* گرید واژه‌ها */}
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

      <Button
        className="min-h-11 w-full gap-2 rounded-xl"
        onClick={() => makeStory()}
        disabled={!enoughWords || loading}
        aria-busy={loading}
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" aria-hidden />
        ) : (
          <BookOpenCheck size={16} aria-hidden />
        )}
        داستان بساز
      </Button>

      {/* حالت لودینگ */}
      {loading && (
        <Card className="border-primary/20 bg-card/60">
          <CardContent className="space-y-2.5 p-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/5" />
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

      {/* داستان */}
      {result && !loading && (
        <Card className="border-amber-500/25 bg-card/60">
          <CardContent className="space-y-4 p-4">
            <div className="flex items-center justify-between gap-2 border-b pb-2.5">
              <p className="flex items-center gap-1.5 text-[13px] font-black">
                <BookOpenCheck size={15} className="text-primary" aria-hidden />
                داستان تو
              </p>
              <div className="flex items-center gap-1.5">
                {result.cached && (
                  <Badge variant="secondary" className="text-[10px]">
                    از حافظه
                  </Badge>
                )}
                <SpeakButton
                  text={result.story}
                  showSlow
                  size="md"
                  label="روخوانی داستان"
                />
              </div>
            </div>

            {/* متن داستان — انگلیسی با هایلایت واژه‌های انتخابی */}
            <p
              dir="ltr"
              className="font-en whitespace-pre-line text-[15px] leading-8"
              aria-label="متن داستان"
            >
              {buildSpans(result.story, selectedWords).map((span, i) =>
                span.hit ? (
                  <mark
                    key={i}
                    className="rounded bg-amber-200/60 px-0.5 text-foreground"
                  >
                    {span.text}
                  </mark>
                ) : (
                  <span key={i}>{span.text}</span>
                ),
              )}
            </p>
            <p className="flex items-center gap-1.5 text-[10.5px] text-muted-foreground">
              <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-sm bg-amber-200/60" />
              واژه‌های انتخابی تو در داستان هایلایت شده‌اند
            </p>

            {/* سؤال فهم مطلب */}
            <div className="space-y-2.5 rounded-2xl border border-primary/20 bg-primary/5 p-3">
              <p className="text-[12.5px] font-black">سؤال فهم مطلب</p>
              <p dir="ltr" className="font-en text-[13.5px] leading-7">
                {result.question}
              </p>
              <div className="space-y-1.5" role="group" aria-label="گزینه‌های سؤال">
                {result.options.map((option, i) => {
                  const isAnswer = i === result.answer;
                  const isPicked = picked === i;
                  const revealed = picked !== null;
                  return (
                    <button
                      key={i}
                      type="button"
                      dir="ltr"
                      onClick={() => setPicked(i)}
                      disabled={revealed}
                      aria-label={`گزینهٔ ${faNum(i + 1)}`}
                      className={cn(
                        "flex min-h-11 w-full items-center gap-2 rounded-xl border px-3 py-2 text-left font-en text-[12.5px] transition-all",
                        !revealed && "bg-card hover:border-primary/40",
                        revealed && isAnswer && "border-emerald-500/50 bg-emerald-500/10 font-bold text-emerald-800 dark:text-emerald-200",
                        revealed && isPicked && !isAnswer && "border-amber-500/50 bg-amber-500/10 text-amber-800 dark:text-amber-200",
                        revealed && !isAnswer && !isPicked && "opacity-50",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-black",
                          revealed && isAnswer && "border-emerald-500 bg-emerald-500 text-white",
                          revealed && isPicked && !isAnswer && "border-amber-500 bg-amber-500 text-white",
                          !(revealed && (isAnswer || isPicked)) && "border-muted-foreground/40 text-muted-foreground",
                        )}
                      >
                        {revealed && isAnswer ? (
                          <Check size={12} />
                        ) : revealed && isPicked ? (
                          <X size={12} />
                        ) : (
                          faNum(i + 1)
                        )}
                      </span>
                      {option}
                    </button>
                  );
                })}
              </div>
              {picked !== null && (
                <p
                  role="status"
                  className={cn(
                    "rounded-xl border px-3 py-2 text-[12px] leading-6",
                    picked === result.answer
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
                      : "border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-200",
                  )}
                >
                  {picked === result.answer
                    ? "آفرین! درست بود ✓"
                    : "اشتباه شد — گزینهٔ درست با تیک سبز مشخص شد"}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Button
                variant="secondary"
                className="min-h-11 w-full gap-2 rounded-xl"
                onClick={() => newStory()}
                aria-label="بستن داستان و ساختن داستان جدید"
              >
                <RotateCcw size={14} aria-hidden />
                داستان جدید
              </Button>
              <p className="text-center text-[10.5px] text-muted-foreground">
                برای داستان تازه، ترکیب واژه‌ها را کمی عوض کن
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
