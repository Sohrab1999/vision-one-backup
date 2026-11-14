"use client";

import { useMemo } from "react";
import { Map as MapIcon, CheckCircle2, CircleDashed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useBookData } from "@/lib/book-context";
import { useLessonProgress, lessonStatusOf } from "@/lib/lesson-progress-store";
import { faNum } from "@/lib/class-store";

/**
 * «نقشهٔ پیشرفت کتاب» — گزینهٔ ⑤ سند پیشنهاد آموزش (مصوب مالک ۲۰۲۶-۱۱-۱۴ —
 * «همه گزینه‌ها به جز گزینه ۳»): شبکهٔ ۶۰/۱۰۰/۱۰۰ درس با وضعیت هر درس
 * (نه‌شروع / در جریان / تکمیل) بر پایهٔ دادهٔ گزینهٔ ① (استور lesson-progress).
 *
 * پ۶ سند (بی‌پاسخ از مالک — پیش‌فرض سند اعمال شد، قابل تغییر با فرمان مالک):
 * نقشه داخل نمای کتاب (جلد) رندر می‌شود، نه نمای مستقل.
 * جایگاه: بخش پایلوت آموزش در HomeView کتاب viu-elem.
 *
 * کلیک درس‌های خارج از دامنهٔ پایلوت = پیام صادقانه (بدون اجرای پنهان) —
 * گسترش فقط با ارزیابی مالک (§E سند: پایلوت ۱-۵ → ارزیابی → گسترش).
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

  const stats = useMemo(() => {
    let done = 0;
    let ongoing = 0;
    for (const l of lessons) {
      const st = lessonStatusOf(progress[String(l)]);
      if (st === "done") done++;
      else if (st === "ongoing") ongoing++;
    }
    return { done, ongoing };
  }, [lessons, progress]);

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
          <Badge variant="secondary" className="text-[10.5px]">
            از {fa(lessons.length)} درس
          </Badge>
        </div>
      </div>
      <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
        وضعیت هر درس از جریان «مسیر یادگیری» می‌آید — درس‌های {faNum(pilotLessons[0])} تا {faNum(pilotLessons[pilotLessons.length - 1])} در پایلوت باز هستند؛
        گسترش بقیهٔ درس‌ها پس از ارزیابی مالک انجام می‌شود.
      </p>

      <div
        className="mt-3 grid grid-cols-6 gap-1.5 sm:grid-cols-10 sm:gap-2"
        role="list"
        aria-label="شبکهٔ وضعیت درس‌ها"
      >
        {lessons.map((l) => {
          const st = lessonStatusOf(progress[String(l)]);
          const inPilot = pilotLessons.includes(l);
          const label =
            data.vocab.lessons.find((x) => x.lesson === l)?.label ??
            data.chapters.find((c) => c.id === l)?.number ??
            `درس ${l}`;
          return (
            <button
              key={l}
              type="button"
              role="listitem"
              onClick={() => {
                if (!inPilot) {
                  toast.info(`${label} در پایلوت آموزش باز نیست — گسترش پس از ارزیابی مالک انجام می‌شود.`);
                  return;
                }
                onSelectLesson(l);
              }}
              title={`${label} — ${
                st === "done" ? "تکمیل" : st === "ongoing" ? "در جریان" : "نه‌شروع"
              }${inPilot ? "" : " (خارج از پایلوت)"}`}
              aria-label={`${label} — ${st === "done" ? "تکمیل" : st === "ongoing" ? "در جریان" : "نه‌شروع"}`}
              className={cn(
                "relative flex aspect-square items-center justify-center rounded-lg border text-[11px] font-black transition-all",
                st === "done"
                  ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                  : st === "ongoing"
                    ? "border-amber-500/50 bg-amber-500/15 text-amber-700 dark:text-amber-300"
                    : "border-border bg-muted/40 text-muted-foreground",
                inPilot && "hover:scale-105 active:scale-95 hover:border-primary/60",
                !inPilot && "opacity-70",
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
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-bold text-muted-foreground">
        <span className="flex items-center gap-1">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full border border-emerald-500/50 bg-emerald-500/60" />
          تکمیل (واژه‌ها + تمرین)
        </span>
        <span className="flex items-center gap-1">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full border border-amber-500/50 bg-amber-500/60" />
          در جریان
        </span>
        <span className="flex items-center gap-1">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full border border-border bg-muted" />
          نه‌شروع
        </span>
      </div>
    </section>
  );
}
