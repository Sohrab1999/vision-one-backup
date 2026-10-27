"use client";

/**
 * نوار وضعیت «وردل ویژن — واژهٔ امروز» در هاب بازی‌ها — فیچر محصولی Task 12.
 *
 * فقط مصرف‌کنندهٔ storeهای مستند daily-store.ts است — هیچ کلید localStorage جدیدی
 * معرفی نمی‌شود (وضعیت روزانه: «visionone:wordle-daily:{bookId}»، زنجیره:
 * «visionone:wordle-streak:{bookId}»). همگام‌سازی با useSyncExternalStore روی
 * subscribeGameData — بازگشت از بازی، نوار را بلافاصله به‌روز می‌کند (همان الگوی
 * شمارندهٔ دورهای هاب).
 *
 * سه وضعیت:
 *   fresh    — امروز شروع نشده: دعوت به حدس واژهٔ روز
 *   playing  — نیمه‌کاره: «ادامه بده» با شمار فرصت باقی‌مانده
 *   done     — حل/باخت امروز: تأیید + «واژهٔ بعدی فردا» (بدون اسپویل واژه)
 */

import { useMemo, useSyncExternalStore } from "react";
import { CalendarCheck2, Flame, Hourglass, PartyPopper, SpellCheck2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { faNum, subscribeGameData } from "../shared";
import { useBook } from "@/lib/book-context";
import { loadDailyState, loadDailyStreak } from "./daily-store";
import { todayKey } from "./helpers";
import { MAX_ROWS } from "./constants";

interface WordleDailyChipProps {
  /** باز کردن بازی وردل از هاب */
  onOpen: () => void;
}

interface DailySnapshot {
  date: string | null;
  status: "playing" | "won" | "lost" | null;
  rows: number;
  streak: number;
}

export function WordleDailyChip({ onOpen }: WordleDailyChipProps) {
  const { bookId } = useBook();

  // اسنپ‌شات رشته‌ای localStorage — پایدار و کَش‌شونده برای useSyncExternalStore
  const snap = useSyncExternalStore(
    subscribeGameData,
    () => {
      const d = bookId ? loadDailyState(bookId) : null;
      const s = bookId ? loadDailyStreak(bookId) : null;
      return JSON.stringify({
        date: d?.date ?? null,
        status: d?.status ?? null,
        rows: d?.guesses.length ?? 0,
        streak: s?.streak ?? 0,
      } satisfies DailySnapshot);
    },
    () => "null",
  );

  const state = useMemo<DailySnapshot | null>(() => {
    if (!snap || snap === "null") return null;
    try {
      return JSON.parse(snap) as DailySnapshot;
    } catch {
      return null;
    }
  }, [snap]);

  const today = todayKey();
  const isToday = state?.date === today;
  const streak = isToday ? (state?.streak ?? 0) : 0;
  const status = isToday ? state?.status : null;

  // ── حل‌شدهٔ امروز (برد یا باخت) — نوار اطلاعیِ غیرکلیک‌پذیر ──
  if (status === "won" || status === "lost") {
    return (
      <div
        className="rise-in flex items-center gap-3 rounded-2xl border border-emerald-500/25 bg-gradient-to-bl from-emerald-500/10 via-card to-card p-4"
        role="status"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
          {status === "won" ? <PartyPopper size={20} /> : <CalendarCheck2 size={20} />}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[15px] font-black">وردل ویژن — واژهٔ امروز</h3>
            {streak > 0 && (
              <Badge className="gap-1 bg-amber-500/15 text-[10px] font-bold text-amber-700 dark:text-amber-400">
                <Flame size={11} />
                زنجیرهٔ {faNum(streak)} روزه
              </Badge>
            )}
          </div>
          <p className="mt-1 text-[12px] leading-5 text-muted-foreground">
            {status === "won"
              ? "واژهٔ امروز پیدا شد — آفرید! واژهٔ بعدی فردا آماده می‌شود."
              : "فرصت‌های امروز تمام شد — فردا با واژه‌ای تازه برگرد."}
          </p>
        </div>
        <span className="shrink-0 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">✓</span>
      </div>
    );
  }

  // ── نیمه‌کاره یا شروع‌نشده — کلیک = رفتن به وردل ──
  const rowsLeft = MAX_ROWS - (state?.rows ?? 0);
  const inProgress = status === "playing";
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={
        inProgress
          ? `ادامهٔ وردل امروز — ${faNum(rowsLeft)} فرصت باقی مانده`
          : "شروع وردل امروز — حدس واژهٔ روز در شش فرصت"
      }
      className={cn(
        "group rise-in relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-bl from-emerald-500/15 via-amber-500/5 to-card p-4 text-right transition-all",
        "hover:-translate-y-0.5 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 transition-transform group-hover:scale-110 dark:text-emerald-400">
          <SpellCheck2 size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[15px] font-black">وردل ویژن — واژهٔ امروز</h3>
            <Badge
              variant="outline"
              className="gap-1 border-emerald-500/40 text-[10px] font-bold text-emerald-600 dark:text-emerald-400"
            >
              {inProgress ? (
                <>
                  <Hourglass size={11} />
                  نیمه‌کاره
                </>
              ) : (
                <>
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" aria-hidden />
                  آماده است
                </>
              )}
            </Badge>
            {streak > 0 && (
              <Badge className="gap-1 bg-amber-500/15 text-[10px] font-bold text-amber-700 dark:text-amber-400">
                <Flame size={11} />
                زنجیرهٔ {faNum(streak)} روزه
              </Badge>
            )}
          </div>
          <p className="mt-1 text-[12px] leading-5 text-muted-foreground">
            {inProgress
              ? `${faNum(rowsLeft)} فرصت از ${faNum(MAX_ROWS)} فرصت باقی مانده — ادامه بده!`
              : "هر روز یک واژهٔ ۵حرفی از همین جزوه — در شش فرصت حدسش بزن و زنجیرهٔ بردت را بساز."}
          </p>
        </div>
      </div>
    </button>
  );
}
