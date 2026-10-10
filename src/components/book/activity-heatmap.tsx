"use client";

import { useMemo, useSyncExternalStore } from "react";
import { CalendarDays, CalendarCheck, BookOpen, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useGoalData } from "@/lib/goal-store";

/**
 * تقویم حرارتی فعالیت — به سبک گیت‌هاب.
 * هر خانه یک روز: شدت رنگ = واژه‌های یادگرفته + جلسات مطالعه (آزمون/بازی).
 * چیدمان RTL: هفته قدیمی‌تر سمت راست، امروز در ستون آخر (سمت چپ).
 * روی نمایشگر بزرگ ۲۶ هفته و روی موبایل ۱۲ هفته نمایش داده می‌شود.
 */

const WEEKDAY_LABELS = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const WIDE_QUERY = "(min-width: 1024px)";

function subscribeWide(cb: () => void) {
  const mq = window.matchMedia(WIDE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** weekday index با مبدأ شنبه (۰) — epochDay ۰ پنجشنبه است */
function faWeekday(epochDay: number): number {
  return ((epochDay + 5) % 7 + 7) % 7;
}

function levelOf(score: number): 0 | 1 | 2 | 3 | 4 {
  if (score <= 0) return 0;
  if (score <= 3) return 1;
  if (score <= 7) return 2;
  if (score <= 12) return 3;
  return 4;
}

const LEVEL_CLASS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-muted/70",
  1: "bg-primary/25",
  2: "bg-primary/45",
  3: "bg-primary/70",
  4: "bg-primary shadow-sm shadow-primary/40",
};

function faNum(v: number | string): string {
  return String(v).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

function dayLabel(epochDay: number): string {
  const date = new Date(epochDay * 86400000);
  try {
    return date.toLocaleDateString("fa-IR", { weekday: "long", month: "long", day: "numeric" });
  } catch {
    return date.toLocaleDateString();
  }
}

interface DayCell {
  day: number;
  words: number;
  sessions: number;
  score: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export function ActivityHeatmap() {
  const data = useGoalData();
  const wide = useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(WIDE_QUERY).matches,
    () => false,
  );
  const weeks = wide ? 26 : 12;
  const totalDays = weeks * 7;

  const grid = useMemo(() => {
    const today = Math.floor(Date.now() / 86400000);
    // انتهای محدوده = شنبهٔ همین هفته تا ستون آخر کامل باشد
    const end = today + (6 - faWeekday(today));
    const start = end - (totalDays - 1);

    const cells: DayCell[] = Array.from({ length: totalDays }, (_, i) => {
      const day = start + i;
      const words = data.log[day]?.length ?? 0;
      const sessions = data.sessionLog[day] ?? 0;
      const score = words + sessions * 2;
      return { day, words, sessions, score, level: levelOf(score) };
    });

    // ستون‌بندی: هر ستون یک هفته (شنبه تا جمعه)
    const cols: DayCell[][] = [];
    for (let w = 0; w < weeks; w++) cols.push(cells.slice(w * 7, w * 7 + 7));

    const activeDays = cells.filter((c) => c.score > 0 && c.day <= today).length;
    const totalWords = cells.reduce((a, c) => a + c.words, 0);
    const totalSessions = cells.reduce((a, c) => a + c.sessions, 0);
    const bestStreakScore = cells.reduce((a, c) => Math.max(a, c.score), 0);
    return { cols, activeDays, totalWords, totalSessions, bestStreakScore, today, start };
  }, [data, totalDays, weeks]);

  const tiles = [
    {
      icon: CalendarCheck,
      label: "روز فعال",
      value: `${faNum(grid.activeDays)} از ${faNum(totalDays)}`,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: BookOpen,
      label: "واژه یادگرفته",
      value: faNum(grid.totalWords),
      color: "text-teal-500",
      bg: "bg-teal-500/10",
    },
    {
      icon: Target,
      label: "جلسه آزمون/بازی",
      value: faNum(grid.totalSessions),
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <Card className="rise-in rise-in-2">
      <CardContent className="p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="flex items-center gap-2 text-sm font-bold">
            <CalendarDays size={15} className="text-primary" />
            تقویم فعالیت {faNum(weeks)} هفته اخیر
          </p>
          <div className="flex items-center gap-1.5 text-[10.5px] text-muted-foreground">
            <span>کم</span>
            {([0, 1, 2, 3, 4] as const).map((l) => (
              <span key={l} className={cn("h-3 w-3 rounded-[4px] border border-black/5 dark:border-white/5", LEVEL_CLASS[l])} />
            ))}
            <span>زیاد</span>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-8">
          <div className="heatmap-scroll overflow-x-auto pb-1.5">
            <div className="flex min-w-max gap-[3px] pl-1">
              {/* برچسب روزهای هفته */}
              <div className="mr-1 flex flex-col gap-[3px] pt-0.5">
                {WEEKDAY_LABELS.map((w, i) => (
                  <span
                    key={w}
                    className={cn(
                      "flex h-3.5 w-4 items-center justify-center text-[9px] leading-none text-muted-foreground/80",
                      i % 2 === 1 && "opacity-40",
                    )}
                  >
                    {w}
                  </span>
                ))}
              </div>

              {grid.cols.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((cell) => {
                    const isToday = cell.day === grid.today;
                    const isFuture = cell.day > grid.today;
                    const tip = isFuture
                      ? ""
                      : `${dayLabel(cell.day)} — ${
                          cell.score > 0
                            ? `${faNum(cell.words)} واژه، ${faNum(cell.sessions)} جلسه مطالعه`
                            : "بدون فعالیت"
                        }`;
                    return (
                      <span
                        key={cell.day}
                        title={tip}
                        aria-label={tip}
                        className={cn(
                          "hm-cell block h-3.5 w-3.5 rounded-[4px] border border-black/5 dark:border-white/5",
                          isFuture ? "border-dashed bg-transparent opacity-40" : LEVEL_CLASS[cell.level],
                          isToday && "ring-2 ring-primary/60 ring-offset-1 ring-offset-background",
                        )}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* خلاصه فعالیت */}
          <div className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-2">
            {tiles.map((t) => (
              <div
                key={t.label}
                className="flex items-center gap-2.5 rounded-xl border bg-card p-2.5 transition-colors hover:border-primary/40 lg:p-3"
              >
                <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg lg:h-9 lg:w-9", t.bg, t.color)}>
                  <t.icon size={16} />
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-black leading-none lg:text-base">{t.value}</p>
                  <p className="mt-1 truncate text-[10px] text-muted-foreground lg:text-[11px]">{t.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
