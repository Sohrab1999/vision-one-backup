"use client";

import { useMemo } from "react";
import { Map as MapIcon, CheckCircle2, CircleDashed, Ban } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useBookData } from "@/lib/book-context";
import {
  useLessonProgress,
  lessonCompletionOf,
  completedStageCount,
  LESSON_STAGES,
} from "@/lib/lesson-progress-store";
import { faNum } from "@/lib/class-store";

/**
 * «نقشهٔ پیشرفت کتاب» — گزینهٔ ⑤ مصوب مالک، ارتقای مأموریت `VIU-LEARNING-EXPERIENCE-UPGRADE-01`:
 * شبکهٔ ۶۰/۱۰۰/۱۰۰ درس با وضعیت هر درس (نه‌شروع / در جریان / تکمیل) + نوار پیشرفت ۶-مرحله‌ای
 * الگوی مشترک برای درس‌های پایلوت + برچسب صادقانهٔ «بدون محتوا» برای درس‌های فاقد دادهٔ
 * آموزشی (واژه + متن + بانک = صفر) — درس بی‌محتوا هرگز «تکمیل» نشان داده نمی‌شود
 * (بند ۵ مأموریت مالک).
 *
 * تکمیل درس از lessonCompletionOf می‌آید: درس با واژه = قرارداد قدیمی (words && quizDone)؛
 * درس بی‌واژه اما دارای متن/تمرین = انجام واقعی بافت + تمرین (بند ۴-د مأموریت).
 *
 * کلیک درس‌های خارج از دامنهٔ پایلوت = پیام صادقانه (بدون اجرای پنهان) —
 * گسترش فقط با ارزیابی مالک.
 */

const fa = (n: number) => n.toLocaleString("fa-IR");

export function LessonProgressMap({
  pilotLessons,
  onSelectLesson,
}: {
  pilotLessons: number[];
  onSelectLesson: (lesson: number) => void;
}) {
  const data = useBookData();
  const progress = useLessonProgress();

  // اجتماع chapters + vocab + readings — منبع یگانهٔ فهرست درس‌ها (درس ۲۰ viu-elem متن دارد
  // اما ردیف واژه در بانک ندارد — نقشه هرگز درس را پنهان نمی‌کند؛ وضعیتش صادقانه می‌ماند)
  const lessons = useMemo(() => {
    const set = new Set<number>();
    for (const c of data.chapters) set.add(c.id);
    for (const l of data.vocab.lessons) set.add(l.lesson);
    for (const r of data.readings) set.add(r.lesson);
    return [...set].sort((a, b) => a - b);
  }, [data.chapters, data.vocab.lessons, data.readings]);

  /** پرچم‌های محتوای واقعی هر درس — واژه/متن/بانک */
  const contentFlags = useMemo(() => {
    const vocabLessons = new Set<number>();
    for (const [ls, cnt] of Object.entries(data.vocab.countByLesson)) {
      if (cnt > 0) vocabLessons.add(Number(ls));
    }
    const readingLessons = new Set(data.readings.map((r) => r.lesson));
    const bankLessons = new Set(data.quiz.seed.map((q) => q.lesson));
    return { vocabLessons, readingLessons, bankLessons };
  }, [data.vocab.countByLesson, data.readings, data.quiz.seed]);

  const stats = useMemo(() => {
    let done = 0;
    let ongoing = 0;
    let noContent = 0;
    for (const l of lessons) {
      const hasVocab = contentFlags.vocabLessons.has(l);
      const contentless =
        !hasVocab && !contentFlags.readingLessons.has(l) && !contentFlags.bankLessons.has(l);
      if (contentless) {
        noContent++;
        continue;
      }
      const st = lessonCompletionOf(progress[String(l)], { hasVocab });
      if (st === "done") done++;
      else if (st === "ongoing") ongoing++;
    }
    return { done, ongoing, noContent };
  }, [lessons, progress, contentFlags]);

  return (
    <section className="rounded-2xl border bg-card p-4 sm:p-5" aria-label="نقشهٔ پیشرفت کتاب">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-[15px] font-black">
          <MapIcon size={16} className="text-primary" />
          نقشهٔ پیشرفت کتاب
        </h3>
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge className="gap-1 border-emerald-500/40 bg-emerald-500/12 text-[10.5px] text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 size={11} />
            {fa(stats.done)} تکمیل
          </Badge>
          {stats.ongoing > 0 && (
            <Badge className="gap-1 border-amber-500/40 bg-amber-500/12 text-[10.5px] text-amber-700 dark:text-amber-300">
              <CircleDashed size={11} />
              {fa(stats.ongoing)} در جریان
            </Badge>
          )}
          {stats.noContent > 0 && (
            <Badge className="gap-1 border-border bg-muted/50 text-[10.5px] text-muted-foreground">
              <Ban size={11} />
              {fa(stats.noContent)} بدون محتوا
            </Badge>
          )}
          <Badge variant="secondary" className="text-[10.5px]">
            از {fa(lessons.length)} درس
          </Badge>
        </div>
      </div>
      <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
        وضعیت هر درس از جریان «مسیر یادگیری» می‌آید — درس‌های {faNum(pilotLessons[0])} تا{" "}
        {faNum(pilotLessons[pilotLessons.length - 1])} در پایلوت باز هستند؛ نوار زیر کاشی،
        پیشرفت {fa(LESSON_STAGES.length)} مرحله‌ای را نشان می‌دهد. گسترش بقیهٔ درس‌ها پس از ارزیابی مالک انجام می‌شود.
      </p>

      <div
        className="mt-3 grid grid-cols-6 gap-1.5 sm:grid-cols-10 sm:gap-2"
        role="list"
        aria-label="شبکهٔ وضعیت درس‌ها"
      >
        {lessons.map((l) => {
          const hasVocab = contentFlags.vocabLessons.has(l);
          const contentless =
            !hasVocab && !contentFlags.readingLessons.has(l) && !contentFlags.bankLessons.has(l);
          const st = contentless ? "none" : lessonCompletionOf(progress[String(l)], { hasVocab });
          const inPilot = pilotLessons.includes(l);
          const stageRatio = inPilot && !contentless ? completedStageCount(progress[String(l)]) / LESSON_STAGES.length : 0;
          const label =
            data.vocab.lessons.find((x) => x.lesson === l)?.label ??
            data.chapters.find((c) => c.id === l)?.number ??
            `درس ${l}`;
          const stateText = contentless
            ? "بدون محتوا در اسکن"
            : st === "done"
              ? "تکمیل"
              : st === "ongoing"
                ? "در جریان"
                : "نه‌شروع";
          return (
            <button
              key={l}
              type="button"
              role="listitem"
              onClick={() => {
                if (contentless) {
                  toast.info(`${label} در اسکن کتاب محتوای آموزشی ندارد — صادقانه «بدون محتوا» ثبت شده است.`);
                  return;
                }
                if (!inPilot) {
                  toast.info(`${label} در پایلوت آموزش باز نیست — گسترش پس از ارزیابی مالک انجام می‌شود.`);
                  return;
                }
                onSelectLesson(l);
              }}
              title={`${label} — ${stateText}${inPilot ? "" : " (خارج از پایلوت)"}`}
              aria-label={`${label} — ${stateText}`}
              className={cn(
                "relative flex aspect-square items-center justify-center rounded-lg border text-[11px] font-black transition-all",
                contentless
                  ? "border-dashed border-border bg-muted/20 text-muted-foreground/70"
                  : st === "done"
                    ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                    : st === "ongoing"
                      ? "border-amber-500/50 bg-amber-500/15 text-amber-700 dark:text-amber-300"
                      : "border-border bg-muted/40 text-muted-foreground",
                inPilot && !contentless && "hover:scale-105 active:scale-95 hover:border-primary/60",
                !inPilot && !contentless && "opacity-70",
              )}
            >
              {faNum(l)}
              {st === "done" && (
                <CheckCircle2
                  size={10}
                  aria-hidden
                  className="absolute -top-1 -right-1 rounded-full bg-card text-emerald-600 dark:text-emerald-400"
                />
              )}
              {contentless && (
                <Ban
                  size={9}
                  aria-hidden
                  className="absolute -top-1 -right-1 rounded-full bg-card text-muted-foreground/70"
                />
              )}
              {/* نوار پیشرفت ۶-مرحله‌ای الگوی مشترک — فقط درس‌های پایلوت دارای محتوا */}
              {inPilot && !contentless && (
                <span
                  aria-hidden
                  className="absolute inset-x-1 bottom-0.5 h-[3px] overflow-hidden rounded-full bg-border/70"
                >
                  <span
                    className="block h-full rounded-full bg-primary/80 transition-all"
                    style={{ width: `${Math.round(stageRatio * 100)}%` }}
                  />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-bold text-muted-foreground">
        <span className="flex items-center gap-1">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full border border-emerald-500/50 bg-emerald-500/60" />
          تکمیل
        </span>
        <span className="flex items-center gap-1">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full border border-amber-500/50 bg-amber-500/60" />
          در جریان
        </span>
        <span className="flex items-center gap-1">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full border border-border bg-muted" />
          نه‌شروع
        </span>
        <span className="flex items-center gap-1">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full border border-dashed border-border bg-muted/20" />
          بدون محتوا (هرگز تکمیل نشان داده نمی‌شود)
        </span>
      </div>
    </section>
  );
}
