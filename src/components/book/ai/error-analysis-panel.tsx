"use client";

/**
 * ErrorAnalysisPanel — «تحلیل هوشمند خطاها» (فاز ۸): بالای نمای آزمون نشسته،
 * با یک کلیک سؤال‌های غلط دفتر خطاها را می‌گیرد (GET /api/questions?ids=…)
 * → POST /api/error-analysis → الگوی خطا + نکتهٔ طلایی + ۴ تمرین اختصاصی که
 * یکی‌یکی همان‌جا پاسخ داده می‌شود. کاملاً event-driven — بدون هیچ effect.
 */

import { useState } from "react";
import {
  CheckCircle2,
  Lightbulb,
  Loader2,
  RefreshCw,
  SearchCheck,
  Target,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useBook, useBookData } from "@/lib/book-context";
import { useMistakes } from "@/lib/mistakes-store";
import { readUserName } from "@/lib/name-store";
import { faNum } from "@/components/book/games/shared";

interface DrillItem {
  text: string;
  options: string[];
  answer: number;
  explain: string;
}

interface AnalysisPayload {
  pattern: string;
  summary: string;
  tip: string;
  drill: DrillItem[];
}

/** گارد سبک شکل پاسخ سرور قبل از setState */
function isValidAnalysis(v: unknown): v is AnalysisPayload {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.pattern === "string" &&
    o.pattern.trim().length > 0 &&
    typeof o.summary === "string" &&
    o.summary.trim().length > 0 &&
    typeof o.tip === "string" &&
    o.tip.trim().length > 0 &&
    Array.isArray(o.drill) &&
    o.drill.length > 0
  );
}

interface QuestionLite {
  text: string;
  options: string[];
  answer: number;
  category?: string;
}

export function ErrorAnalysisPanel() {
  const { bookId, meta } = useBook();
  const data = useBookData();
  const { entries: mistakeEntries, count } = useMistakes();

  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisPayload | null>(null);
  const [cached, setCached] = useState(false);
  const [drillIdx, setDrillIdx] = useState(0);
  const [picks, setPicks] = useState<(number | null)[]>([]);

  const drill = analysis?.drill ?? [];
  const current = drill[drillIdx];
  const pick = drillIdx < picks.length ? (picks[drillIdx] ?? null) : null;
  const answered = pick !== null;
  const finished = analysis !== null && drillIdx >= drill.length;
  const correctCount = drill.reduce(
    (acc, d, i) => acc + (picks[i] === d.answer ? 1 : 0),
    0,
  );

  async function analyze() {
    if (loading) return;
    const ids = mistakeEntries
      .slice(0, 8)
      .map((e) => e.id)
      .filter((id) => /^[a-z0-9]{10,40}$/i.test(id));
    if (!bookId || ids.length === 0) {
      toast.error("سؤال‌های دفتر خطاها پیدا نشد — اول چند آزمون بده");
      return;
    }
    setLoading(true);
    setAnalysis(null);
    setCached(false);
    setDrillIdx(0);
    setPicks([]);
    try {
      // ۱) گرفتن سؤال‌های واقعی از بانک سؤال کتاب فعلی
      const qRes = await fetch(
        `/api/questions?ids=${encodeURIComponent(ids.join(","))}&book=${encodeURIComponent(bookId)}`,
      );
      const qJson = (await qRes.json()) as {
        questions?: Array<{
          text?: unknown;
          options?: unknown;
          answer?: unknown;
          category?: unknown;
        }>;
        error?: string;
      };
      const questions: QuestionLite[] = (qJson.questions ?? [])
        .filter(
          (q) =>
            typeof q.text === "string" &&
            Array.isArray(q.options) &&
            q.options.every((o) => typeof o === "string") &&
            typeof q.answer === "number",
        )
        .map((q) => ({
          text: q.text as string,
          options: q.options as string[],
          answer: q.answer as number,
          category:
            typeof q.category === "string" ? (q.category as string) : undefined,
        }));
      if (!qRes.ok || questions.length === 0) {
        toast.error(
          qJson.error ??
            "سؤال‌های ثبت‌شده در دفتر خطاها پیدا نشد — شاید کتاب عوض شده باشد",
        );
        return;
      }

      // ۲) ارسال برای تحلیل هوشمند
      const guest = readUserName();
      const res = await fetch("/api/error-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(guest ? { "x-visionone-name": guest } : {}),
        },
        body: JSON.stringify({
          questions,
          book: {
            id: bookId,
            title: data.info.title,
            grade: meta?.gradeLabel ?? "",
          },
        }),
      });
      const json = (await res.json()) as {
        analysis?: unknown;
        cached?: boolean;
        error?: string;
      };
      if (res.ok && isValidAnalysis(json.analysis)) {
        setAnalysis(json.analysis);
        setCached(json.cached === true);
      } else {
        toast.error(json.error ?? "تحلیل خطاها ساخته نشد — دوباره تلاش کن");
      }
    } catch {
      toast.error("خطا در ارتباط با سرور — اتصال اینترنتت را بررسی کن");
    } finally {
      setLoading(false);
    }
  }

  function answerDrill(choice: number) {
    if (answered || !current) return;
    setPicks((prev) => {
      const next = [...prev];
      while (next.length < drillIdx) next.push(null);
      next[drillIdx] = choice;
      return next;
    });
  }

  // ── حالت خالی: دفتر خطاها سبز است ──
  if (count === 0) {
    return (
      <Card className="border-muted bg-muted/40">
        <CardContent className="flex items-center gap-2 p-4">
          <span aria-hidden className="text-base">🌱</span>
          <p className="text-[12.5px] leading-6 text-muted-foreground">
            هنوز اشتباهی ثبت نشده — دفتر خطاها سبز است! 🌱
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 bg-card/60">
      <CardContent className="space-y-3 p-4">
        {/* سربرگ پنل */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 text-[13px] font-black">
            <SearchCheck size={15} className="text-primary" aria-hidden />
            تحلیل هوشمند خطاها
          </p>
          <Badge variant="secondary" className="text-[10.5px]">
            دفتر خطاها: {faNum(count)} مورد
          </Badge>
        </div>
        <p className="text-[12px] leading-6 text-muted-foreground">
          الگوی اشتباه‌های اخیرت را می‌یابد و تمرین اختصاصی می‌سازد
        </p>

        <Button
          className="min-h-11 w-full gap-2 rounded-xl"
          onClick={() => analyze()}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" aria-hidden />
          ) : (
            <SearchCheck size={16} aria-hidden />
          )}
          تحلیل اشتباهاتم ({faNum(count)} مورد)
        </Button>

        {/* حالت لودینگ */}
        {loading && (
          <div
            role="status"
            className="flex items-center justify-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-[13px] font-bold text-primary"
          >
            <Loader2 size={16} className="animate-spin" aria-hidden />
            دارم اشتباه‌هایت را تحلیل می‌کنم…
          </div>
        )}

        {/* نتیجهٔ تحلیل */}
        {analysis && !loading && (
          <div className="space-y-3 pt-1">
            {/* الگوی خطا */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-emerald-600 text-[10.5px] text-white hover:bg-emerald-600">
                  الگوی خطا
                </Badge>
                {cached && (
                  <Badge variant="secondary" className="text-[10px]">
                    تحلیل ذخیره‌شده
                  </Badge>
                )}
              </div>
              <p className="mt-2 text-[14px] font-black leading-7 text-emerald-800 dark:text-emerald-200">
                {analysis.pattern}
              </p>
              <p className="mt-1.5 text-[13px] leading-7 text-foreground">
                {analysis.summary}
              </p>
            </div>

            {/* نکتهٔ طلایی */}
            <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-3.5">
              <p className="flex items-center gap-1.5 text-[12.5px] font-black text-amber-800 dark:text-amber-200">
                <Lightbulb size={14} aria-hidden />
                نکتهٔ طلایی
              </p>
              <p className="mt-1.5 text-[13px] leading-7 text-foreground">
                {analysis.tip}
              </p>
            </div>

            {/* تمرین اختصاصی — سؤال‌به‌سؤال */}
            {!finished && current && (
              <div className="rounded-2xl border border-primary/20 bg-card p-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="flex items-center gap-1.5 text-[12.5px] font-black">
                    <Target size={14} className="text-primary" aria-hidden />
                    تمرین اختصاصی
                  </p>
                  <Badge variant="secondary" className="text-[10.5px]">
                    {faNum(drillIdx + 1)} از {faNum(drill.length)}
                  </Badge>
                </div>

                <p
                  dir="ltr"
                  className="font-en mt-3 break-words rounded-xl bg-muted/50 p-3 text-[14px] font-semibold leading-7"
                >
                  {current.text}
                </p>

                <div
                  className="mt-3 space-y-2"
                  role="group"
                  aria-label={`گزینه‌های تمرین ${faNum(drillIdx + 1)}`}
                >
                  {current.options.map((opt, i) => {
                    const isCorrect = i === current.answer;
                    const isChosen = pick === i;
                    return (
                      <button
                        key={`${drillIdx}-${i}`}
                        type="button"
                        onClick={() => answerDrill(i)}
                        disabled={answered}
                        aria-pressed={isChosen}
                        className={cn(
                          "flex min-h-10 w-full items-center gap-2.5 rounded-xl border bg-card px-3 py-2 text-right transition-all",
                          !answered &&
                            "hover:border-primary/50 hover:bg-primary/5",
                          answered &&
                            isCorrect &&
                            "border-primary bg-primary/10 shadow-sm",
                          answered &&
                            isChosen &&
                            !isCorrect &&
                            "border-destructive bg-destructive/10",
                          answered && !isChosen && !isCorrect && "opacity-55",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold",
                            answered && isCorrect && "border-primary text-primary",
                            answered &&
                              isChosen &&
                              !isCorrect &&
                              "border-destructive text-destructive",
                            (!answered || (!isCorrect && !isChosen)) &&
                              "border-muted-foreground/30 text-muted-foreground",
                          )}
                        >
                          {faNum(i + 1)}
                        </span>
                        <span
                          dir="ltr"
                          className={cn(
                            "font-en flex-1 text-[13.5px] leading-6",
                            answered && isCorrect && "font-bold text-primary",
                            answered &&
                              isChosen &&
                              !isCorrect &&
                              "text-destructive",
                          )}
                        >
                          {opt}
                        </span>
                        {answered && isCorrect && (
                          <CheckCircle2
                            size={16}
                            className="shrink-0 text-primary"
                            aria-hidden
                          />
                        )}
                        {answered && isChosen && !isCorrect && (
                          <XCircle
                            size={16}
                            className="shrink-0 text-destructive"
                            aria-hidden
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* چرا؟ — فقط بعد از پاسخ */}
                {answered && current.explain && (
                  <p className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 text-[12.5px] leading-6">
                    {current.explain}
                  </p>
                )}

                {answered && drillIdx < drill.length - 1 && (
                  <Button
                    className="mt-3 min-h-11 w-full gap-2 rounded-xl"
                    onClick={() => setDrillIdx((i) => i + 1)}
                  >
                    سؤال بعدی
                  </Button>
                )}
              </div>
            )}

            {/* پایان تمرین */}
            {finished && (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
                <p className="flex items-center justify-center gap-2 text-[14px] font-black text-emerald-800 dark:text-emerald-200">
                  <CheckCircle2 size={16} aria-hidden />
                  پایان تمرین — {faNum(correctCount)} از {faNum(drill.length)} درست
                </p>
                <p className="mt-1.5 text-[12px] leading-6 text-muted-foreground">
                  {correctCount === drill.length
                    ? "عالی! الگوی خطا رو گرفتی — حالا در آزمون اصلی نشودش بده."
                    : "خوب بود! نکتهٔ طلایی بالا را یک‌بار دیگر بخوان و دوباره تلاش کن."}
                </p>
              </div>
            )}

            {/* تحلیل دوباره */}
            <Button
              variant="secondary"
              className="min-h-11 w-full gap-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20"
              onClick={() => analyze()}
              disabled={loading}
              aria-label="اجرای دوبارهٔ تحلیل خطاها"
            >
              <RefreshCw size={14} aria-hidden />
              تحلیل دوباره
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
