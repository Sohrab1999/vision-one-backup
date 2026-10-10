"use client";

/**
 * پلیر آزمون زنده (فاز ۹ — کلاس مجازی) — فقط دانش‌آموز:
 *  • Polling GET live هر ۲٫۵ ثانیه (فقط وقتی باز است) با الگوی latest-ref
 *  • سؤال جاری با ۴ گزینه — هر ایندکس فقط یک تلاش (قفل + پایدار بعد از رفرش
 *    با answered سرور)
 *  • تغییر سؤال → انیمیشن rise-in؛ پایان → صفحهٔ «🏁 تمام شد!»
 *
 * هیچ setState در بدنهٔ effect نیست — همهٔ به‌روزرسانی‌ها داخل callback
 * تایمر یا ادامهٔ async آن‌ها رخ می‌دهند (سازگار با react-hooks v6).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { readUserName } from "@/lib/name-store";
import {
  faNum,
  readApiError,
  useClassSession,
  type StudentLivePayload,
} from "@/lib/class-store";

interface AnswerRecord {
  choice: number;
  correct: boolean;
}

export function LivePlayer({ onExit }: { onExit: () => void }) {
  const session = useClassSession();
  const [data, setData] = useState<StudentLivePayload | null>(null);
  const [answers, setAnswers] = useState<Record<number, AnswerRecord>>({});
  const [submittingIdx, setSubmittingIdx] = useState<number | null>(null);
  const [pendingChoice, setPendingChoice] = useState<number | null>(null);
  /** آیا تا به حال آزمون فعالی دیده‌ایم؟ (سرور پس از پایان، live را null می‌کند) */
  const [sawLive, setSawLive] = useState(false);

  const sessionRef = useRef(session);
  const shownAtRef = useRef<number>(Date.now());
  const curIndexRef = useRef<number>(-1);
  const answersRef = useRef<Record<number, AnswerRecord>>({});
  /** نام نمایشی واقعی عضو — از پاسخ سرور (me.displayName)؛ نام کلاس هرگز به‌عنوان نام دانش‌آموز فرستاده نمی‌شود */
  const meNameRef = useRef<string>("");

  const displayName = data?.me?.displayName || readUserName();

  // ── polling هر ۲٫۵ ثانیه — setState فقط داخل callback تایمر/async ──
  const fetchLive = useCallback(async () => {
    const s = sessionRef.current;
    if (!s) return;
    try {
      const res = await fetch(
        `/api/class/${encodeURIComponent(s.code)}/live?key=${encodeURIComponent(s.key)}&role=student`,
        { cache: "no-store" },
      );
      if (!res.ok) throw new Error();
      const d = (await res.json()) as StudentLivePayload;

      if (d.live) setSawLive(true);

      // پاسخ ثبت‌شدهٔ سرور برای سؤال جاری (پایداری بعد از رفرش)
      if (d.answered && answersRef.current[d.answered.index] === undefined) {
        answersRef.current = {
          ...answersRef.current,
          [d.answered.index]: { choice: d.answered.choice, correct: d.answered.correct },
        };
        setAnswers(answersRef.current);
      }

      // تغییر سؤال → زمان‌سنج شمارش تازه + رفع قفل ارسال
      const idx = d.live?.currentIndex ?? -1;
      if (idx !== curIndexRef.current) {
        curIndexRef.current = idx;
        shownAtRef.current = Date.now();
        setSubmittingIdx(null);
      }

      setData(d);
      meNameRef.current = d.me?.displayName || meNameRef.current;
    } catch {
      /* ساکت — دور بعد تلاش می‌شود */
    }
  }, []);

  const fetchRef = useRef(fetchLive);
  useEffect(() => {
    fetchRef.current = fetchLive;
  }, [fetchLive]);

  useEffect(() => {
    const t0 = window.setTimeout(() => void fetchRef.current(), 0);
    const t = window.setInterval(() => void fetchRef.current(), 2500);
    return () => {
      window.clearTimeout(t0);
      window.clearInterval(t);
    };
  }, []);

  async function answer(choice: number) {
    const s = sessionRef.current;
    const live = data?.live;
    if (!s || !live || live.status === "finished") return;
    const index = live.currentIndex;
    if (answersRef.current[index] !== undefined || submittingIdx !== null) return;

    const ms = Math.max(0, Date.now() - shownAtRef.current);
    setSubmittingIdx(index);
    setPendingChoice(choice);
    try {
      const res = await fetch(`/api/class/${encodeURIComponent(s.code)}/live`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentKey: s.key,
          displayName: meNameRef.current || readUserName(),
          quizId: live.id,
          index,
          choice,
          ms,
        }),
      });
      if (res.ok) {
        const j = (await res.json()) as { correct: boolean; answeredCount: number };
        answersRef.current = { ...answersRef.current, [index]: { choice, correct: j.correct } };
        setAnswers(answersRef.current);
        setSubmittingIdx(null);
        setPendingChoice(null);
      } else {
        toast.error(await readApiError(res, "ثبت پاسخ ممکن نشد"));
        setSubmittingIdx(null);
        setPendingChoice(null);
      }
    } catch {
      toast.error("ارتباط با سرور برقرار نشد — دوباره تلاش کن");
      setSubmittingIdx(null);
      setPendingChoice(null);
    }
  }

  // ── رندر ──
  if (!session) return null;

  // بارگذاری اولیه
  if (data === null) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border bg-card p-10 text-center" role="status">
        <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-muted border-t-primary" aria-hidden />
        <p className="text-[13px] font-medium text-muted-foreground">در حال وصل شدن به آزمون زنده…</p>
      </div>
    );
  }

  // آزمونی در جریان نیست — اگر قبلاً آزمون دیده‌ایم یعنی معلم تازگی تمام کرده
  if (!data.live) {
    if (sawLive) {
      return (
        <div className="rise-in flex flex-col items-center gap-4 rounded-2xl border bg-card p-8 text-center">
          <span className="text-5xl" aria-hidden>
            🏁
          </span>
          <h2 className="text-xl font-black">تمام شد!</h2>
          <p className="text-[13px] text-muted-foreground">
            نتیجه در جدول برنده‌های کلاس — معلم همین حالا نشان می‌دهد 🏆
          </p>
          <BackButton onExit={onExit} />
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card p-8 text-center">
        <p className="text-[13.5px] text-muted-foreground">
          آزمون زنده‌ای در جریان نیست — شاید معلم تمام کرده باشد.
        </p>
        <BackButton onExit={onExit} />
      </div>
    );
  }

  // پایان آزمون
  if (data.live.status === "finished") {
    return (
      <div className="rise-in flex flex-col items-center gap-4 rounded-2xl border bg-card p-8 text-center">
        <span className="text-5xl" aria-hidden>
          🏁
        </span>
        <h2 className="text-xl font-black">تمام شد!</h2>
        <p className="text-[13px] text-muted-foreground">
          نتیجه در جدول برنده‌های کلاس — معلم همین حالا نشان می‌دهد 🏆
        </p>
        <BackButton onExit={onExit} />
      </div>
    );
  }

  const live = data.live;
  const q = data.question ?? null;
  const answered = answers[live.currentIndex];
  const answeredRecord = q && answered && answered.choice >= 0 && answered.choice < (q.options.length || 0) ? answered : null;

  return (
    <div className="space-y-4">
      {/* سرصفحه پلیر */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border bg-card p-4">
        <div className="min-w-0">
          <h1 className="flex items-center gap-2 text-base font-black">
            <span className="relative flex h-2.5 w-2.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500/60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>
            آزمون زنده
          </h1>
          <p className="mt-0.5 text-[11.5px] text-muted-foreground">
            {displayName && <span>{displayName} — </span>}
            هر سؤال فقط یک تلاش داری؛ سریع باش!
          </p>
        </div>
        <Badge className="bg-primary text-primary-foreground">
          سؤال {faNum(live.currentIndex + 1)} از {faNum(live.questionCount)}
        </Badge>
      </div>

      {q ? (
        // کلید = ایندکس سؤال → هر سؤال تازه با انیمیشن rise-in وارد می‌شود
        <Card key={live.currentIndex} className="rise-in">
          <CardContent className="space-y-3.5 p-4 sm:p-5">
            <p dir="ltr" className="font-en text-lg font-bold leading-relaxed sm:text-xl">
              {q.text}
            </p>

            <div className="grid gap-2" role="group" aria-label="گزینه‌های سؤال">
              {q.options.map((opt, i) => {
                const chosen = answeredRecord?.choice === i;
                const correctPick = chosen && answeredRecord!.correct;
                const wrongPick = chosen && !answeredRecord!.correct;
                const locked = answered !== undefined || submittingIdx !== null;
                const pending = submittingIdx === live.currentIndex && pendingChoice === i;
                return (
                  <button
                    key={i}
                    type="button"
                    dir="ltr"
                    disabled={locked}
                    onClick={() => void answer(i)}
                    aria-pressed={chosen}
                    aria-label={`گزینه ${i + 1}: ${opt}`}
                    className={cn(
                      "font-en flex min-h-11 w-full items-center gap-2.5 rounded-xl border px-4 py-2.5 text-start text-[14px] transition-all",
                      !locked && "hover:-translate-y-px hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm",
                      !chosen && locked && "opacity-55",
                      correctPick && "border-emerald-500/60 bg-emerald-500/15 font-bold text-emerald-700 dark:text-emerald-400",
                      wrongPick && "border-red-500/60 bg-red-500/10 font-bold text-red-700 dark:text-red-400",
                      !chosen && "bg-card",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-black",
                        correctPick && "border-emerald-500/60 bg-emerald-500/20",
                        wrongPick && "border-red-500/60 bg-red-500/20",
                        !chosen && "border-muted-foreground/30 text-muted-foreground",
                      )}
                      aria-hidden
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="min-w-0 flex-1">{opt}</span>
                    {pending && <Loader2 size={14} className="shrink-0 animate-spin text-muted-foreground" aria-hidden />}
                    {correctPick && <CheckCircle2 size={16} className="shrink-0" aria-hidden />}
                    {wrongPick && <XCircle size={16} className="shrink-0" aria-hidden />}
                  </button>
                );
              })}
            </div>

            {/* پیام نتیجه */}
            {answeredRecord?.correct && (
              <p className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2.5 text-center text-[13.5px] font-black text-emerald-700 dark:text-emerald-400" role="status">
                درست بود! 🎉
              </p>
            )}
            {answeredRecord && !answeredRecord.correct && (
              <p className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2.5 text-center text-[13px] font-bold text-amber-700 dark:text-amber-400" role="status">
                اشتباه بود — سؤال بعدی را معلم می‌فرستد
              </p>
            )}
            {answered !== undefined && submittingIdx !== null && (
              <p className="flex items-center justify-center gap-2 text-center text-[12px] text-muted-foreground" role="status">
                <Loader2 size={13} className="animate-spin" aria-hidden />
                در حال ثبت پاسخ…
              </p>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border bg-card p-10 text-center" role="status">
          <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-muted border-t-primary" aria-hidden />
          <p className="text-[13px] font-medium text-muted-foreground">منتظر سؤال {faNum(live.currentIndex + 1)} از معلم…</p>
        </div>
      )}

      <p className="text-center text-[11px] text-muted-foreground">
        سؤال‌ها را معلم یکی‌یکی می‌فرستد — نیازی به رفرش نیست
      </p>
    </div>
  );
}

function BackButton({ onExit }: { onExit: () => void }) {
  return (
    <Button variant="outline" onClick={onExit} className="min-h-11 gap-1.5 font-bold">
      <ArrowRight size={16} aria-hidden />
      بازگشت به کلاس
    </Button>
  );
}
