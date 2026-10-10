"use client";

/**
 * NotebookView — «📓 دفتر خطاها» (فاز ۱۰): دو فاز در یک نما (بدون route جدید).
 *
 * فاز فهرست: کارت هر سؤالِ غلط (تاریخ شمسی، چیپ دسته/درس) با بازشدن آکاردئونیِ
 * گزینه‌ها + توضیح؛ دکمهٔ «همین‌ها را تمرینم کن» و «خالی کردن دفتر» با تأیید.
 * فاز تمرین: حداکثر ۱۰ خطای اخیر یکی‌یکی پاسخ داده می‌شود؛ پاسخ درست →
 * resolveMistake (حذف از دفتر)؛ پایان: کارت نتیجه + «تمرین دوباره»/«بازگشت به دفتر».
 *
 * رویدادمحور: گرفتن سؤال‌های تمرین فقط با کلیک انجام می‌شود؛ جزئیات فهرست در
 * effect با fetch ناهمگام گرفته می‌شود (بدون setState همگام در بدنهٔ effect +
 * AbortController کامل در cleanup) — سازگار با react-hooks v6.
 */

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Target,
  Trash2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useBook } from "@/lib/book-context";
import { useMistakes, resolveMistake, clearMistakes } from "@/lib/mistakes-store";
import { faNum } from "@/components/book/games/shared";

/** سقف ids در GET /api/questions = ۱۰۰ — فهرست هم همان سقف را نشان می‌دهد */
const LIST_CAP = 100;
const PRACTICE_CAP = 10;
const EXPLAIN_NONE = "توضیحی ثبت نشده";

interface NotebookQ {
  id: string;
  text: string;
  options: string[];
  answer: number;
  category: string;
  lesson: number;
  explanation: string | null;
}

/** گارد سبک شکل پاسخ سرور قبل از ورود داده به state */
function isValidQ(q: unknown): q is NotebookQ {
  if (typeof q !== "object" || q === null) return false;
  const o = q as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.text === "string" &&
    Array.isArray(o.options) &&
    o.options.every((x) => typeof x === "string") &&
    typeof o.answer === "number"
  );
}

/** تاریخ شمسی فارسی — formatter یک‌بار ساخته می‌شود؛ ورودی خراب → «—» */
let jalaliFmt: Intl.DateTimeFormat | null = null;
function formatJalali(at: string): string {
  if (!at) return "—";
  const d = new Date(at);
  if (Number.isNaN(d.getTime())) return "—";
  try {
    if (!jalaliFmt) jalaliFmt = new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium" });
    return jalaliFmt.format(d);
  } catch {
    return "—";
  }
}

interface PracticeSession {
  qs: NotebookQ[];
  picks: (number | null)[];
}

export function NotebookView() {
  const { bookId } = useBook();
  const { entries, count } = useMistakes();

  // ── فاز: null = فهرست | object = تمرین ──
  const [session, setSession] = useState<PracticeSession | null>(null);
  const [idx, setIdx] = useState(0);
  const [starting, setStarting] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  // جزئیات سؤال‌ها برای فهرست — بهازای هر کتاب جدا تا سوییچ کتاب داده کهنه نشان ندهد
  const [detailsByBook, setDetailsByBook] = useState<Record<string, Record<string, NotebookQ>>>({});
  const details = bookId ? (detailsByBook[bookId] ?? {}) : {};

  const listed = useMemo(() => entries.slice(0, LIST_CAP), [entries]);
  const idsKey = useMemo(() => listed.map((e) => e.id).join(","), [listed]);

  // گرفتن جزئیات فهرست — ناهمگام، بدون setState همگام؛ abort در cleanup
  useEffect(() => {
    if (!bookId || !idsKey) return;
    const ctrl = new AbortController();
    fetch(
      `/api/questions?ids=${encodeURIComponent(idsKey)}&book=${encodeURIComponent(bookId)}`,
      { signal: ctrl.signal },
    )
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j: { questions?: unknown[] }) => {
        if (ctrl.signal.aborted) return;
        const map: Record<string, NotebookQ> = {};
        for (const q of j.questions ?? []) {
          if (isValidQ(q)) map[q.id] = q;
        }
        if (Object.keys(map).length === 0) return;
        setDetailsByBook((prev) => ({ ...prev, [bookId]: { ...(prev[bookId] ?? {}), ...map } }));
      })
      .catch(() => {
        /* قطع‌شدن (abort) یا خطا — کارت اسکلتون می‌ماند؛ بدون toast مزاحم */
      });
    return () => ctrl.abort();
  }, [bookId, idsKey]);

  // ── فاز تمرین: شروع با کلیک (رویدادمحور) ──
  async function startPractice() {
    if (!bookId || starting) return;
    const ids = entries.slice(0, PRACTICE_CAP).map((e) => e.id);
    if (ids.length === 0) {
      toast.error("دفتر خطاها خالی است — اول چند آزمون بده 🎯");
      return;
    }
    setStarting(true);
    try {
      const res = await fetch(
        `/api/questions?ids=${encodeURIComponent(ids.join(","))}&book=${encodeURIComponent(bookId)}`,
      );
      const json = (await res.json().catch(() => null)) as
        | { questions?: unknown[]; error?: string }
        | null;
      const qs = (json?.questions ?? []).filter(isValidQ);
      if (!res.ok || qs.length === 0) {
        toast.error(
          json?.error ?? "سؤال‌های ثبت‌شده در دفتر پیدا نشد — شاید کتاب عوض شده باشد",
        );
        return;
      }
      setSession({ qs, picks: Array(qs.length).fill(null) });
      setIdx(0);
      setOpenId(null);
    } catch {
      toast.error("خطا در ارتباط با سرور — اتصال اینترنتت را بررسی کن");
    } finally {
      setStarting(false);
    }
  }

  function pickOption(i: number) {
    if (!session) return;
    const q = session.qs[idx];
    if (!q || session.picks[idx] !== null) return;
    setSession((prev) => {
      if (!prev) return prev;
      const picks = [...prev.picks];
      picks[idx] = i;
      return { ...prev, picks };
    });
    if (i === q.answer) resolveMistake(q.id);
  }

  function retryRemaining() {
    if (!session) return;
    const live = new Set(entries.map((e) => e.id));
    const remaining = session.qs.filter((q) => live.has(q.id));
    if (remaining.length === 0) {
      toast.success("همهٔ این خطاها سبز شد — چیزی برای تمرین دوباره نیست 🌱");
      backToNotebook();
      return;
    }
    setSession({ qs: remaining, picks: Array(remaining.length).fill(null) });
    setIdx(0);
  }

  function backToNotebook() {
    setSession(null);
    setIdx(0);
  }

  function confirmClear() {
    clearMistakes();
    toast.success("دفتر خطاها خالی شد — سبز شد! 🌱");
  }

  // ═══════════════ فاز تمرین ═══════════════
  if (session) {
    const { qs, picks } = session;
    const q = qs[idx];
    const pick = idx < picks.length ? (picks[idx] ?? null) : null;
    const answered = pick !== null;
    const finished = !q;
    const correctCount = qs.reduce(
      (acc, qq, i) => acc + (picks[i] === qq.answer ? 1 : 0),
      0,
    );

    return (
      <section aria-label="دفتر خطاها — تمرین" className="space-y-4">
        {/* سربرگ تمرین */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={backToNotebook}
              aria-label="بازگشت به دفتر خطاها"
              className="h-9 gap-1.5 rounded-full px-3 text-[12px] font-bold"
            >
              <ArrowRight size={15} />
              بازگشت به دفتر
            </Button>
          </div>
          {!finished && (
            <Badge variant="secondary" className="text-[11px]">
              سؤال {faNum(idx + 1)} از {faNum(qs.length)}
            </Badge>
          )}
        </div>
        {!finished && (
          <Progress
            value={((idx + (answered ? 1 : 0)) / qs.length) * 100}
            className="h-1.5"
            aria-label="پیشرفت تمرین"
          />
        )}

        {/* سؤال جاری */}
        {!finished && q && (
          <Card className="border-primary/20 bg-card/70">
            <CardContent className="space-y-3 p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-1.5">
                {q.category && (
                  <Badge variant="secondary" className="text-[10.5px]">
                    {q.category}
                  </Badge>
                )}
                <Badge variant="secondary" className="text-[10.5px]">
                  درس {faNum(q.lesson)}
                </Badge>
              </div>
              <p
                dir="ltr"
                className="font-en break-words rounded-xl bg-muted/50 p-3 text-[14.5px] font-semibold leading-7"
              >
                {q.text}
              </p>

              <div
                className="space-y-2"
                role="group"
                aria-label={`گزینه‌های سؤال ${faNum(idx + 1)}`}
              >
                {q.options.map((opt, i) => {
                  const isCorrect = i === q.answer;
                  const isChosen = pick === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => pickOption(i)}
                      disabled={answered}
                      aria-pressed={isChosen}
                      className={cn(
                        "flex min-h-11 w-full items-center gap-2.5 rounded-xl border bg-card px-3 py-2.5 text-right transition-all",
                        !answered && "hover:border-primary/50 hover:bg-primary/5 active:scale-[0.99]",
                        answered && isCorrect && "border-primary bg-primary/10 shadow-sm",
                        answered && isChosen && !isCorrect && "border-destructive bg-destructive/10",
                        answered && !isChosen && !isCorrect && "opacity-55",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold",
                          answered && isCorrect && "border-primary text-primary",
                          answered && isChosen && !isCorrect && "border-destructive text-destructive",
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
                          answered && isChosen && !isCorrect && "text-destructive",
                        )}
                      >
                        {opt}
                      </span>
                      {answered && isCorrect && (
                        <CheckCircle2 size={16} className="shrink-0 text-primary" aria-hidden />
                      )}
                      {answered && isChosen && !isCorrect && (
                        <XCircle size={16} className="shrink-0 text-destructive" aria-hidden />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* چرا؟ — فقط بعد از پاسخ */}
              {answered && (
                <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 text-[12.5px] leading-6">
                  {q.explanation?.trim() ? q.explanation : EXPLAIN_NONE}
                </p>
              )}

              {answered && (
                <Button
                  className="min-h-11 w-full gap-2 rounded-xl"
                  onClick={() => setIdx((v) => v + 1)}
                >
                  {idx < qs.length - 1 ? "سؤال بعدی" : "دیدن نتیجه"}
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* کارت نتیجه */}
        {finished && (
          <Card className="border-emerald-500/30 bg-emerald-500/5">
            <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
              <span className="text-5xl" aria-hidden>
                {correctCount === qs.length ? "🎉" : "💪"}
              </span>
              <p className="text-[16px] font-black text-emerald-800 dark:text-emerald-200">
                {faNum(correctCount)} از {faNum(qs.length)} درست بود
              </p>
              <p className="max-w-sm text-[12.5px] leading-7 text-muted-foreground">
                {correctCount === qs.length
                  ? "دفتر از این خطاها پاک شد — همین‌قدر پیوسته تمرین کن!"
                  : "پاسخ‌های درست از دفتر حذف شدند؛ باقی‌مانده‌ها را دوباره تمرین کن تا دفتر سبز شود."}
              </p>
              <div className="flex w-full flex-col gap-2 pt-1 sm:flex-row sm:justify-center">
                <Button
                  onClick={retryRemaining}
                  className="min-h-11 gap-2 rounded-xl px-6"
                  disabled={correctCount === qs.length}
                >
                  <Target size={16} aria-hidden />
                  تمرین دوباره (از باقی‌مانده‌ها)
                </Button>
                <Button
                  variant="secondary"
                  onClick={backToNotebook}
                  className="min-h-11 rounded-xl px-6 bg-primary/10 text-primary hover:bg-primary/20"
                >
                  بازگشت به دفتر
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </section>
    );
  }

  // ═══════════════ فاز فهرست ═══════════════

  // حالت خالی — دفتر سبز است
  if (count === 0) {
    return (
      <section aria-label="دفتر خطاها" className="space-y-4">
        <NotebookHeader count={0} />
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
            <span className="text-5xl" aria-hidden>
              🌱
            </span>
            <p className="text-[15px] font-black text-primary">دفتر خطاها سبز است!</p>
            <p className="max-w-md text-[13px] leading-7 text-muted-foreground">
              هنوز هیچ اشتباهی ثبت نشده. هر سؤالی را در آزمون‌ها غلط جواب بدهی، این‌جا
              ثبت می‌شود تا همان‌ها را یک‌به‌یک تمرین کنی و با هر پاسخ درست، صفحه‌ای از
              دفتر را ورق بزنی.
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section aria-label="دفتر خطاها" className="space-y-4">
      <NotebookHeader count={count} />

      {/* دکمه‌های اصلی فهرست */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          className="min-h-11 flex-1 gap-2 rounded-xl"
          onClick={() => startPractice()}
          disabled={starting}
          aria-busy={starting}
        >
          {starting ? (
            <Loader2 size={16} className="animate-spin" aria-hidden />
          ) : (
            <Target size={16} aria-hidden />
          )}
          همین‌ها را تمرینم کن 🎯
          <span className="text-[11px] font-medium opacity-80">
            (حداکثر {faNum(PRACTICE_CAP)} خطای اخیر)
          </span>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="min-h-11 gap-2 rounded-xl border-destructive/40 px-5 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 size={15} aria-hidden />
              خالی کردن دفتر
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>دفتر خطاها کامل خالی شود؟</AlertDialogTitle>
              <AlertDialogDescription>
                هر {faNum(count)} سؤالِ ثبت‌شده پاک می‌شود و این کار برگشت‌پذیر نیست.
                اگر هنوز روی بعضی‌ها مسلط نیستی، به‌جای این کار «تمرین» را امتحان کن.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>بی‌خیال</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmClear}
                className="bg-destructive text-white hover:bg-destructive/90"
              >
                بله، خالی کن
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* فهرست کارت‌های خطا — اسکرول‌بار سفارشی سراسری اعمال می‌شود */}
      <div className="max-h-96 space-y-2.5 overflow-y-auto pl-1 pr-0.5" role="list">
        {listed.map((entry) => {
          const q = details[entry.id];
          const open = openId === entry.id;
          return (
            <div
              key={entry.id}
              role="listitem"
              className="overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/30"
            >
              {/* سربرگ کارت — باز/بسته */}
              <button
                type="button"
                onClick={() => setOpenId(open ? null : entry.id)}
                aria-expanded={open}
                className="flex w-full items-start gap-2 p-3.5 text-right"
              >
                <span className="min-w-0 flex-1">
                  {q ? (
                    <span
                      dir="ltr"
                      className="font-en line-clamp-2 block break-words text-[13.5px] font-semibold leading-6"
                    >
                      {q.text}
                    </span>
                  ) : (
                    <span className="block space-y-1.5" aria-hidden>
                      <span className="block h-3.5 w-4/5 animate-pulse rounded bg-muted" />
                      <span className="block h-3.5 w-3/5 animate-pulse rounded bg-muted [animation-delay:120ms]" />
                    </span>
                  )}
                  <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    {q?.category && (
                      <Badge variant="secondary" className="text-[10px]">
                        {q.category}
                      </Badge>
                    )}
                    {q && (
                      <Badge variant="secondary" className="text-[10px]">
                        درس {faNum(q.lesson)}
                      </Badge>
                    )}
                    <span className="text-[10.5px] leading-5 text-muted-foreground">
                      {formatJalali(entry.at)}
                    </span>
                  </span>
                </span>
                <ChevronDown
                  size={16}
                  aria-hidden
                  className={cn(
                    "mt-1 shrink-0 text-muted-foreground transition-transform",
                    open && "rotate-180 text-primary",
                  )}
                />
              </button>

              {/* بازشدن: گزینه‌ها + توضیح */}
              {open && (
                <div className="space-y-2 border-t bg-muted/30 p-3.5">
                  {q ? (
                    <>
                      <div className="space-y-1.5" role="group" aria-label="گزینه‌های سؤال">
                        {q.options.map((opt, i) => {
                          const isCorrect = i === q.answer;
                          return (
                            <div
                              key={i}
                              className={cn(
                                "flex items-center gap-2.5 rounded-xl border px-3 py-2",
                                isCorrect
                                  ? "border-primary bg-primary/10"
                                  : "border-border/60 bg-card opacity-70",
                              )}
                            >
                              <span
                                className={cn(
                                  "flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full border text-[10.5px] font-bold",
                                  isCorrect
                                    ? "border-primary text-primary"
                                    : "border-muted-foreground/30 text-muted-foreground",
                                )}
                              >
                                {faNum(i + 1)}
                              </span>
                              <span
                                dir="ltr"
                                className={cn(
                                  "font-en flex-1 text-[12.5px] leading-6",
                                  isCorrect && "font-bold text-primary",
                                )}
                              >
                                {opt}
                              </span>
                              {isCorrect && (
                                <CheckCircle2
                                  size={15}
                                  className="shrink-0 text-primary"
                                  aria-hidden
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 text-[12px] leading-6">
                        {q.explanation?.trim() ? q.explanation : EXPLAIN_NONE}
                      </p>
                    </>
                  ) : (
                    <p className="py-2 text-center text-[11.5px] text-muted-foreground">
                      جزئیات این سؤال پیدا نشد — شاید از کتاب دیگری ثبت شده باشد.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {count > LIST_CAP && (
        <p className="text-center text-[11px] text-muted-foreground">
          {faNum(count)} خطا ثبت شده — {faNum(LIST_CAP)} موردِ اخیر نمایش داده می‌شود.
        </p>
      )}
    </section>
  );
}

/** سربرگ مشترک نما: عنوان + شمارنده */
function NotebookHeader({ count }: { count: number }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div>
        <h2 className="flex items-center gap-2 text-[17px] font-black">
          <span aria-hidden>📓</span>
          دفتر خطاها
        </h2>
        <p className="mt-1 text-[12px] leading-6 text-muted-foreground">
          هر سؤالِ غلط این‌جا ثبت می‌شود تا همان‌ها را دوباره تمرین کنی
        </p>
      </div>
      <Badge
        variant="secondary"
        className={cn(
          "text-[11px]",
          count === 0 && "border-primary/30 bg-primary/10 text-primary",
        )}
      >
        {count === 0 ? "خالی" : `${faNum(count)} سؤال`}
      </Badge>
    </div>
  );
}
