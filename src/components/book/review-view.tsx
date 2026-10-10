"use client";

/**
 * نمای «مرور امروز» (فاز ۲ نقشه راه — سیم‌کشی موتور SRS).
 *
 * سه فاز: setup (داشبورد KPI + پیش‌بینی ۷روزه + تنظیم سقف کارت نو + دردسرسازها)
 * → playing (فلیپ‌کارت سه‌درجه‌ای با پیش‌نمایش فاصلهٔ مرور) → done (جمع‌بندی).
 * موتور: srs-engine (SM-2 خالص) + srs-store (استور ری‌اکتیو scoped کتاب فعال).
 *
 * قواعد react-hooks v6: هیچ setState مستقیم داخل effect انجام نمی‌شود —
 * صف و شمارنده‌ها در event handlerها ساخته می‌شوند و KPIها در رندر از
 * استور ری‌اکتیو با توابع خالص محاسبه می‌شوند.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  Brain,
  CalendarClock,
  CheckCircle2,
  Clock,
  Eye,
  Home,
  PartyPopper,
  Play,
  RotateCcw,
  Timer,
  XCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { IrregularVerb, VocabEntry } from "@/data/types";
import { useBookData } from "@/lib/book-context";
import {
  bumpTodayReview,
  getDailyNewLimit,
  getTodayReview,
  gradeSrs,
  NEW_LIMIT_OPTIONS,
  setDailyNewLimit,
  useSRSData,
  type SrsItem,
} from "@/lib/srs-store";
import {
  DAY_MS,
  formatInterval,
  isLeech,
  previewIntervals,
  RELEARN_MS,
  type SrsGrade,
} from "@/lib/srs-engine";
import { touchStreak } from "@/lib/streak-store";
import { SpeakButton } from "./speak-button";

type Phase = "setup" | "playing" | "done";

/** سقف کارت در هر جلسهٔ مرور */
const QUEUE_CAP = 60;

const fa = (n: number) => n.toLocaleString("fa-IR");

const EMPTY_QUEUE: QueueCard[] = [];

/** کارت صف مرور — واژه یا فعل بی‌قاعده */
interface QueueCard {
  /** کلید SRS: متن واژه یا "v:base" */
  key: string;
  kind: "word" | "verb";
  /** روی کارت — واژه یا شکل سادهٔ فعل */
  front: string;
  /** پشت کارت — معنی فارسی */
  meaning: string;
  /** برچسب روی کارت: برچسب درس یا «فعل» */
  lessonLabel: string;
  /** فقط برای فعل‌ها */
  past?: string;
  participle?: string;
  /** کارت نو (هرگز پاسخ داده نشده)؟ — برای شمارندهٔ روزانه */
  isNewCard: boolean;
  /** ترتیب کارت‌های سررسید در صف */
  dueAt: number;
  /** تعداد فراموشی — برای صف دردسرسازها */
  lapses: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * صف استاندارد مرور: کارت‌های سررسید (صعودی dueAt) + کارت‌های نو تا سقف
 * باقی‌ماندهٔ روز (به‌ترتیب درس، شافل درون‌درس؛ فعل‌ها در پایان) — سقف کل ۶۰.
 */
function buildQueue(
  srs: Record<string, SrsItem>,
  words: VocabEntry[],
  verbs: IrregularVerb[],
  now: number,
  newLimit: number,
  newDone: number,
): QueueCard[] {
  const due: QueueCard[] = [];
  const newByLesson = new Map<number, QueueCard[]>();
  const newVerbs: QueueCard[] = [];
  let totalNew = 0;

  for (const w of words) {
    const st = srs[w.word];
    if (!st || st.reps === 0) {
      totalNew++;
      const card: QueueCard = {
        key: w.word,
        kind: "word",
        front: w.word,
        meaning: w.meaning,
        lessonLabel: w.lessonLabel,
        isNewCard: true,
        dueAt: Number.MAX_SAFE_INTEGER,
        lapses: 0,
      };
      const list = newByLesson.get(w.lesson);
      if (list) list.push(card);
      else newByLesson.set(w.lesson, [card]);
    } else if (st.dueAt <= now) {
      due.push({
        key: w.word,
        kind: "word",
        front: w.word,
        meaning: w.meaning,
        lessonLabel: w.lessonLabel,
        isNewCard: false,
        dueAt: st.dueAt,
        lapses: st.lapses,
      });
    }
  }

  for (const v of verbs) {
    const key = `v:${v.base}`;
    const st = srs[key];
    if (!st || st.reps === 0) {
      totalNew++;
      newVerbs.push({
        key,
        kind: "verb",
        front: v.base,
        meaning: v.meaning,
        lessonLabel: "فعل",
        past: v.past,
        participle: v.participle,
        isNewCard: true,
        dueAt: Number.MAX_SAFE_INTEGER,
        lapses: 0,
      });
    } else if (st.dueAt <= now) {
      due.push({
        key,
        kind: "verb",
        front: v.base,
        meaning: v.meaning,
        lessonLabel: "فعل",
        past: v.past,
        participle: v.participle,
        isNewCard: false,
        dueAt: st.dueAt,
        lapses: st.lapses,
      });
    }
  }

  due.sort((a, b) => a.dueAt - b.dueAt);

  // کارت‌های نو: ترتیب درس‌ها + شافل درون هر درس؛ فعل‌های نو در پایان
  const newCards: QueueCard[] = [];
  for (const lesson of [...newByLesson.keys()].sort((a, b) => a - b)) {
    newCards.push(...shuffle(newByLesson.get(lesson)!));
  }
  newCards.push(...shuffle(newVerbs));

  const remaining = Math.max(0, Math.min(newLimit - newDone, totalNew));
  return [...due, ...newCards.slice(0, remaining)].slice(0, QUEUE_CAP);
}

/** فهرست کارت‌های دردسرساز — پرتکرارترین فراموشی‌ها اول */
function collectLeeches(srs: Record<string, SrsItem>, words: VocabEntry[], verbs: IrregularVerb[]): QueueCard[] {
  const out: QueueCard[] = [];
  for (const w of words) {
    const st = srs[w.word];
    if (isLeech(st)) {
      out.push({
        key: w.word,
        kind: "word",
        front: w.word,
        meaning: w.meaning,
        lessonLabel: w.lessonLabel,
        isNewCard: false,
        dueAt: st.dueAt,
        lapses: st.lapses,
      });
    }
  }
  for (const v of verbs) {
    const key = `v:${v.base}`;
    const st = srs[key];
    if (isLeech(st)) {
      out.push({
        key,
        kind: "verb",
        front: v.base,
        meaning: v.meaning,
        lessonLabel: "فعل",
        past: v.past,
        participle: v.participle,
        isNewCard: false,
        dueAt: st.dueAt,
        lapses: st.lapses,
      });
    }
  }
  return out.sort((a, b) => b.lapses - a.lapses);
}

/** شمارش کارت‌های نو (واژه + فعل) — هرگز وارد چرخه نشده‌اند */
function countNew(srs: Record<string, SrsItem>, words: VocabEntry[], verbs: IrregularVerb[]): number {
  let n = 0;
  for (const w of words) {
    const st = srs[w.word];
    if (!st || st.reps === 0) n++;
  }
  for (const v of verbs) {
    const st = srs[`v:${v.base}`];
    if (!st || st.reps === 0) n++;
  }
  return n;
}

/** پیش‌بینی بار مرور ۷ روز آینده از کارت‌های در چرخه (سرریز گذشته → ستون «امروز») */
function buildForecast(srs: Record<string, SrsItem>, now: number): { label: string; count: number }[] {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const day0 = start.getTime();
  const fmt = new Intl.DateTimeFormat("fa-IR", { weekday: "short" });
  const out: { label: string; count: number }[] = [];
  for (let i = 0; i < 7; i++) {
    const from = day0 + i * DAY_MS;
    const to = from + DAY_MS;
    let count = 0;
    for (const st of Object.values(srs)) {
      if (st.reps > 0 && (i === 0 ? st.dueAt < to : st.dueAt >= from && st.dueAt < to)) count++;
    }
    out.push({ label: i === 0 ? "امروز" : i === 1 ? "فردا" : fmt.format(new Date(from)), count });
  }
  return out;
}

/**
 * نمای مرور هوشمند — onNavigate اختیاری است (بی‌استفاده هم امن).
 */
export function ReviewView({ onNavigate }: { onNavigate?: (v: string) => void }) {
  const data = useBookData();
  const srs = useSRSData();

  const [phase, setPhase] = useState<Phase>("setup");
  const [queue, setQueue] = useState<QueueCard[]>(EMPTY_QUEUE);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [againCount, setAgainCount] = useState(0);
  const [hardCount, setHardCount] = useState(0);
  const [goodCount, setGoodCount] = useState(0);

  // سقف کارت نو و شمارندهٔ روزانه فقط یک‌بار در ابتدا خوانده می‌شوند و
  // در event handlerها (شروع جلسه / بازگشت به setup) تازه‌سازی می‌شوند.
  const [newLimit, setNewLimitUi] = useState(() => getDailyNewLimit());
  const [newDone, setNewDone] = useState(() => getTodayReview().newDone);

  const startedAtRef = useRef(0);

  const words = data.vocab.all;
  const verbs = data.verbs;
  const now = Date.now();
  const current = queue[index];

  // ── KPIها — توابع خالص روی استور ری‌اکتیو (محاسبه در رندر) ──
  let dueCount = 0;
  let inCycle = 0;
  for (const st of Object.values(srs)) {
    if (st.reps > 0) {
      inCycle++;
      if (st.dueAt <= now) dueCount++;
    }
  }
  const totalNew = countNew(srs, words, verbs);
  const newRemaining = Math.max(0, Math.min(newLimit - newDone, totalNew));
  const leeches = collectLeeches(srs, words, verbs);
  const forecast = buildForecast(srs, now);
  const forecastMax = Math.max(1, ...forecast.map((f) => f.count));

  const preview = phase === "setup" ? buildQueue(srs, words, verbs, now, newLimit, newDone) : EMPTY_QUEUE;
  const previewFor =
    phase === "playing" && current ? previewIntervals(srs[current.key], now) : ([0, 0, 0] as [number, number, number]);

  // جمع‌بندی فاز done — درصد موفقیت (بدون «نمی‌دونم») و مدت جلسه از ref زمان شروع
  const successPct = Math.round(((goodCount + hardCount) / Math.max(queue.length, 1)) * 100);
  const elapsedMs = Math.max(0, Date.now() - startedAtRef.current);
  const elapsedMin = Math.floor(elapsedMs / 60_000);
  const elapsedSec = Math.floor((elapsedMs % 60_000) / 1000);
  const duration = elapsedMin > 0 ? `${fa(elapsedMin)} دقیقه و ${fa(elapsedSec)} ثانیه` : `${fa(elapsedSec)} ثانیه`;

  // ── event handlerها — صف و شمارنده‌ها اینجا ساخته می‌شوند ──

  function beginSession(cards: QueueCard[]) {
    if (cards.length === 0) return;
    startedAtRef.current = Date.now();
    setQueue(cards);
    setIndex(0);
    setFlipped(false);
    setAgainCount(0);
    setHardCount(0);
    setGoodCount(0);
    setPhase("playing");
  }

  function startLeechSession() {
    const q = collectLeeches(srs, words, verbs).slice(0, QUEUE_CAP);
    if (q.length === 0) {
      toast.error("الان کارت دردسرسازی برای تمرین ویژه نیست.");
      return;
    }
    beginSession(q);
  }

  function changeLimit(n: number) {
    setDailyNewLimit(n);
    setNewLimitUi(n);
    toast.info(`سقف کارت نو روزانه روی ${fa(n)} کارت تنظیم شد.`);
  }

  function backToSetup() {
    // تازه‌سازی شمارنده‌ها پس از جلسه — صف در رندر setup بازمحاسبه می‌شود
    setNewDone(getTodayReview().newDone);
    setNewLimitUi(getDailyNewLimit());
    setPhase("setup");
  }

  const answer = useCallback(
    (grade: SrsGrade) => {
      const card = queue[index];
      if (!card) return;
      gradeSrs(card.key, grade);
      bumpTodayReview(card.isNewCard ? 1 : 0);
      if (grade === 0) setAgainCount((c) => c + 1);
      else if (grade === 1) setHardCount((c) => c + 1);
      else setGoodCount((c) => c + 1);
      if (index + 1 >= queue.length) {
        touchStreak(); // زنجیرهٔ روزانه — یک‌بار در پایان جلسه
        setPhase("done");
      } else {
        setIndex((i) => i + 1);
        setFlipped(false);
      }
    },
    [queue, index],
  );

  // میان‌برهای کیبورد — الگوی flashcard-view (setState فقط در callback رویداد)
  useEffect(() => {
    if (phase !== "playing") return;
    function onKey(e: KeyboardEvent) {
      if (e.code === "Space" || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (!flipped) {
        return; // درجه‌ها فقط پس از دیدن پاسخ
      } else if (e.key === "1" || e.key === "۱") {
        answer(0);
      } else if (e.key === "2" || e.key === "۲") {
        answer(1);
      } else if (e.key === "3" || e.key === "۳") {
        answer(2);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, flipped, answer]);

  const announcement =
    phase === "setup"
      ? "نمای مرور هوشمند امروز آماده است"
      : phase === "playing"
        ? `کارت ${fa(index + 1)} از ${fa(queue.length)}`
        : "جلسهٔ مرور به پایان رسید";

  return (
    <div className="space-y-4" role="region" aria-label="مرور هوشمند امروز">
      <div className="sr-only" role="status" aria-live="polite">
        {announcement}
      </div>

      {/* ── فاز setup ── */}
      {phase === "setup" && (
        <>
          <Card className="mx-auto max-w-2xl rise-in">
            <CardContent className="space-y-6 p-6">
              {/* سربرگ */}
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Brain size={24} />
                </span>
                <div>
                  <h1 className="text-lg font-black">مرور هوشمند امروز</h1>
                  <p className="text-xs leading-5 text-muted-foreground">
                    الگوریتم SM-2 — هر کارت دقیقاً لحظه‌ای تکرار می‌شود که نزدیک فراموشی‌ات باشی.
                  </p>
                </div>
              </div>

              {/* KPIها */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="list" aria-label="آمار مرور امروز">
                <div role="listitem" className="rounded-2xl border border-amber-500/25 bg-amber-500/8 p-3 text-center">
                  <p className="text-2xl font-black text-amber-600 dark:text-amber-400">{fa(dueCount)}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">سررسید امروز</p>
                </div>
                <div role="listitem" className="rounded-2xl border border-emerald-500/25 bg-emerald-500/8 p-3 text-center">
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{fa(newRemaining)}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">نو باقی‌مانده امروز</p>
                </div>
                <div role="listitem" className="rounded-2xl border bg-muted/40 p-3 text-center">
                  <p className="text-2xl font-black text-amber-600 dark:text-amber-400">{fa(leeches.length)}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">دردسرساز</p>
                </div>
                <div role="listitem" className="rounded-2xl border bg-muted/40 p-3 text-center">
                  <p className="text-2xl font-black text-teal-600 dark:text-teal-400">{fa(inCycle)}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">کارت در چرخه</p>
                </div>
              </div>

              {/* سقف کارت نو روزانه */}
              <div>
                <p className="mb-2 text-[13px] font-bold">سقف کارت نو روزانه</p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="سقف کارت نو روزانه">
                  {NEW_LIMIT_OPTIONS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => changeLimit(n)}
                      aria-pressed={newLimit === n}
                      className={cn(
                        "h-11 min-w-11 rounded-full border px-4 text-[13px] font-black transition-all",
                        newLimit === n
                          ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {fa(n)}
                    </button>
                  ))}
                </div>
              </div>

              {/* پیش‌بینی بار مرور ۷ روز آینده — نمودار میله‌ای CSS خالص */}
              <div>
                <p className="mb-3 flex items-center gap-1.5 text-[13px] font-bold">
                  <CalendarClock size={15} className="text-amber-500" />
                  پیش‌بینی بار مرور ۷ روز آینده
                </p>
                <div
                  className="grid grid-cols-7 gap-1.5 sm:gap-2"
                  role="img"
                  aria-label={`بار مرور ۷ روز آینده: ${forecast.map((f) => `${f.label} ${fa(f.count)} کارت`).join("، ")}`}
                >
                  {forecast.map((f, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <span className="h-4 text-[10px] font-black text-amber-600 dark:text-amber-400">
                        {f.count > 0 ? fa(f.count) : ""}
                      </span>
                      <div className="flex h-20 w-full items-end overflow-hidden rounded-lg bg-muted/50">
                        <div
                          className="w-full rounded-t bg-amber-500/60"
                          style={{
                            height: `${f.count > 0 ? Math.max(8, Math.round((f.count / forecastMax) * 100)) : 0}%`,
                          }}
                        />
                      </div>
                      <span className="max-w-full truncate text-[10px] text-muted-foreground">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* هشدار دردسرسازها */}
          {leeches.length > 0 && (
            <Card className="mx-auto max-w-2xl border-amber-500/40 bg-amber-500/5 rise-in-1">
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={17} className="shrink-0 text-amber-500" />
                  <h2 className="flex-1 text-[14px] font-black">کلمات دردسرساز</h2>
                  <Badge className="border-amber-500/40 bg-amber-500/15 text-[11px] text-amber-700 dark:text-amber-300">
                    {fa(leeches.length)} کارت
                  </Badge>
                </div>
                <div
                  className="max-h-44 space-y-1.5 overflow-y-auto pl-1"
                  role="list"
                  aria-label="فهرست کلمات دردسرساز"
                >
                  {leeches.slice(0, 8).map((l) => (
                    <div
                      key={l.key}
                      role="listitem"
                      className="flex items-center gap-2 rounded-xl border border-amber-500/20 bg-card px-3 py-2"
                    >
                      <span dir="ltr" className="shrink-0 font-en text-[13px] font-bold">
                        {l.front}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[11px] text-muted-foreground">{l.meaning}</span>
                      <Badge
                        variant="outline"
                        className="shrink-0 border-amber-500/35 text-[10px] text-amber-700 dark:text-amber-300"
                      >
                        ×{fa(l.lapses)} فراموشی
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={startLeechSession}
                  className="h-11 w-full gap-2 border-amber-500/50 text-amber-700 hover:bg-amber-500/10 dark:text-amber-300"
                >
                  <Zap size={16} />
                  تمرین ویژه این‌ها ({fa(Math.min(leeches.length, QUEUE_CAP))} کارت)
                </Button>
              </CardContent>
            </Card>
          )}

          {/* شروع جلسه */}
          <Card className="mx-auto max-w-2xl rise-in-2">
            <CardContent className="space-y-3 p-5">
              <Button
                size="lg"
                className="h-12 w-full gap-2 text-base"
                disabled={preview.length === 0}
                onClick={() => beginSession(preview)}
              >
                <Play size={18} />
                شروع مرور ({fa(preview.length)} کارت)
              </Button>
              {preview.length === 0 ? (
                <p className="text-center text-[13px] font-bold text-emerald-600 dark:text-emerald-400">
                  همه‌چیز مرور شده! 🎉 فردا دوباره سر بزن.
                </p>
              ) : (
                <p className="text-center text-[11px] text-muted-foreground">
                  صف امروز: {fa(dueCount)} کارت سررسید + تا {fa(newRemaining)} کارت نو — سقف جلسه {fa(QUEUE_CAP)} کارت.
                </p>
              )}
              <p className="rounded-xl bg-muted/60 p-3 text-[11px] leading-5 text-muted-foreground">
                سه دکمهٔ پاسخ: «نمی‌دونم» کارت را {formatInterval(RELEARN_MS)} دیگر برمی‌گرداند · «سخت» فاصلهٔ کوتاه‌تری
                می‌سازد · «بلد بودم» فاصلهٔ مرور را نمایی بلند می‌کند. میان‌برها: Space فلیپ · 1/2/3 درجه‌ها.
              </p>
            </CardContent>
          </Card>
        </>
      )}

      {/* ── فاز playing ── */}
      {phase === "playing" && current && (
        <div className="mx-auto max-w-xl space-y-4 rise-in">
          <div className="flex items-center gap-3">
            <Progress value={((index + 1) / queue.length) * 100} className="h-2 flex-1" />
            <span className="shrink-0 text-[12px] font-bold text-muted-foreground">
              {fa(index + 1)} / {fa(queue.length)}
            </span>
            <Badge className="gap-1 border-emerald-500/40 bg-emerald-500/12 text-[11px] text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 size={11} />
              بلد {fa(goodCount)}
            </Badge>
          </div>

          <div
            className="flip-scene h-[320px] cursor-pointer select-none"
            onClick={() => setFlipped((f) => !f)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
            aria-label="کارت مرور — برای دیدن پاسخ کلیک کنید"
          >
            <div className={cn("flip-inner", flipped && "flipped")}>
              {/* روی کارت */}
              <div className="flip-face border bg-card shadow-lg flex flex-col items-center justify-center gap-4 p-8">
                {current.kind === "verb" ? (
                  <Badge className="border-amber-500/40 bg-amber-500/15 text-[11px] text-amber-700 dark:text-amber-300">
                    فعل
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-[11px]">
                    {current.lessonLabel}
                  </Badge>
                )}
                <p dir="ltr" className="font-en text-4xl font-black text-center leading-tight">
                  {current.front}
                </p>
                <div onClick={(e) => e.stopPropagation()}>
                  <SpeakButton text={current.front} size="lg" />
                </div>
                <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Eye size={12} />
                  برای دیدن پاسخ کلیک کن یا Space بزن
                </p>
              </div>
              {/* پشت کارت */}
              <div className="flip-face flip-back border border-primary/35 bg-primary/10 shadow-lg flex flex-col items-center justify-center gap-3 p-8">
                {current.kind === "verb" ? (
                  <>
                    <p dir="ltr" className="font-en text-2xl font-black text-center leading-tight">
                      {current.past} • {current.participle}
                    </p>
                    <p className="text-2xl font-black text-center leading-relaxed">{current.meaning}</p>
                  </>
                ) : (
                  <>
                    <p className="text-3xl font-black text-center leading-relaxed">{current.meaning}</p>
                    <p dir="ltr" className="font-en text-sm text-primary">
                      {current.front}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {flipped && (
            <div className="grid grid-cols-3 gap-2 rise-in">
              <Button
                variant="outline"
                onClick={() => answer(0)}
                className="h-13 flex-col gap-0.5 border-destructive/45 text-destructive hover:bg-destructive/10"
              >
                <span className="flex items-center gap-1.5 text-[13px] font-black">
                  <XCircle size={16} />
                  نمی‌دونم
                </span>
                <span className="block text-[10px] font-medium opacity-75">{formatInterval(previewFor[0])} دیگر</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => answer(1)}
                className="h-13 flex-col gap-0.5 border-amber-500/50 text-amber-700 hover:bg-amber-500/10 dark:text-amber-300"
              >
                <span className="flex items-center gap-1.5 text-[13px] font-black">
                  <Clock size={16} />
                  سخت
                </span>
                <span className="block text-[10px] font-medium opacity-75">{formatInterval(previewFor[1])} دیگر</span>
              </Button>
              <Button onClick={() => answer(2)} className="h-13 flex-col gap-0.5">
                <span className="flex items-center gap-1.5 text-[13px] font-black">
                  <CheckCircle2 size={16} />
                  بلد بودم
                </span>
                <span className="block text-[10px] font-medium opacity-80">{formatInterval(previewFor[2])} دیگر</span>
              </Button>
            </div>
          )}
        </div>
      )}

      {/* ── فاز done ── */}
      {phase === "done" && (
        <Card className="mx-auto max-w-xl border-primary/30 rise-in">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <PartyPopper size={30} />
            </span>
            <h2 className="text-xl font-black">جلسهٔ مرور تمام شد!</h2>

            <div className="grid w-full grid-cols-3 gap-2">
              <div className="rounded-xl border border-destructive/25 bg-destructive/8 p-3">
                <p className="text-xl font-black text-destructive">{fa(againCount)}</p>
                <p className="text-[11px] text-muted-foreground">نمی‌دونم</p>
              </div>
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/8 p-3">
                <p className="text-xl font-black text-amber-600 dark:text-amber-400">{fa(hardCount)}</p>
                <p className="text-[11px] text-muted-foreground">سخت</p>
              </div>
              <div className="rounded-xl border border-primary/25 bg-primary/8 p-3">
                <p className="text-xl font-black text-primary">{fa(goodCount)}</p>
                <p className="text-[11px] text-muted-foreground">بلد بودم</p>
              </div>
            </div>

            <div className="relative h-28 w-28">
              <svg
                viewBox="0 0 120 120"
                className="h-full w-full -rotate-90"
                role="img"
                aria-label={`درصد موفقیت جلسه: ${fa(successPct)}٪`}
              >
                <circle cx="60" cy="60" r="52" fill="none" strokeWidth="12" className="stroke-muted" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  strokeWidth="12"
                  strokeLinecap="round"
                  className="stroke-primary"
                  strokeDasharray={`${(successPct / 100) * 326.7} 326.7`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-black">
                {fa(successPct)}٪
              </div>
            </div>
            <p className="-mt-2 text-[11px] text-muted-foreground">درصد موفقیت</p>

            <p className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
              <Timer size={13} />
              مدت جلسه: {duration}
            </p>

            {againCount > 0 && (
              <p className="flex w-full items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/8 p-3 text-right text-[11px] leading-5 text-muted-foreground">
                <Clock size={14} className="mt-0.5 shrink-0 text-amber-500" />
                <span>
                  {fa(againCount)} کارتی که «نمی‌دونم» زدی {formatInterval(RELEARN_MS)} دیگر آمادهٔ مرورند — کمی بعد
                  دوباره سر بزن!
                </span>
              </p>
            )}

            <div className="flex flex-wrap justify-center gap-2">
              <Button onClick={backToSetup} className="h-11 gap-2">
                <RotateCcw size={16} />
                دور جدید
              </Button>
              <Button variant="outline" onClick={() => onNavigate?.("home")} className="h-11 gap-2">
                <Home size={16} />
                بازگشت به جلد
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
