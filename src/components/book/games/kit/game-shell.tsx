"use client";

/**
 * قاب استاندارد بازی‌ها (GameShell) — فاز G1-05 نقشه راه بازی‌ها.
 *
 * هدر یکنواخت: [آیکون + نام بازی] [بج‌های آمار بازی] ... [راهنما | توقف | صدا | انصراف]
 * + نوار پیشرفت اختیاری + جایگاه aria-live مرکزی (sr-only) + بدنهٔ بازی (children)
 *
 * قراردادها:
 * - تم فصلی (G3-06): شِل خودش تم را از getSeasonTheme (kit/theme) داخل بدنه می‌خواند —
 *   prop تمی به بازی‌ها اضافه نمی‌شود تا هر ۱۵ بازی بدون تغییر روی تم بنشینند؛
 *   در تم "default" خروجی JSX و کلاس‌ها بایت‌به‌بایت مثل قبل است (پذیرش سند)
 * - دکمه‌های استاندارد h-11 با aria-pressed و لیبل پویا فارسی (الگوی پایلوت memory)
 * - راهنما/توقف/صدا اختیاری‌اند — بازی‌هایی که معنا ندارند نمی‌فرستند؛ انصراف اجباری است
 * - نگهبان خروج و اورلی توقف مال خود بازی است (GameExitGuard / اورلی اختصاصی) —
 *   شِل فقط ظاهر یکدست می‌دهد و در منطق بازی دخالت نمی‌کند
 * - کلاس rtl-دوست: کنترل‌ها با mr-auto به سمت چپ می‌روند (الگوی فعلی آزمایشگاه)
 */

import { useMemo, type ReactNode } from "react";
import { HelpCircle, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSeasonTheme, mehreganHeaderCls } from "./theme";

export interface GameShellProps {
  /** نام فارسی بازی (همچنین aria-label ریشه) */
  title: string;
  icon: ReactNode;
  /** بج‌های آمار کنار نام (زمان/حرکت/…) */
  stats?: ReactNode;
  /** پیام اعلام زندهٔ مرکزی — بازی فقط مقدار می‌دهد؛ باکس sr-only خود شِل است */
  liveMsg?: string;
  /** نوار پیشرفت یا هر لایهٔ بین هدر و بدنه */
  progress?: ReactNode;
  paused?: boolean;
  onPauseToggle?: () => void;
  muted?: boolean;
  onMuteToggle?: () => void;
  onHelp?: () => void;
  /** انصراف/خروج — اجباری؛ نگهبان خروج را خود بازی قبل از انجام می‌تواند بگذارد */
  onExit: () => void;
  exitLabel?: string;
  children: ReactNode;
}

export function GameShell({
  title,
  icon,
  stats,
  liveMsg,
  progress,
  paused,
  onPauseToggle,
  muted,
  onMuteToggle,
  onHelp,
  onExit,
  exitLabel = "انصراف",
  children,
}: GameShellProps) {
  // تم فصلی (G3-06) — یک‌بار در mount؛ "default" = دقیقاً رفتار و کلاس‌های قبلی
  const season = useMemo(() => getSeasonTheme(), []);
  return (
    <div role="group" aria-label={`بازی ${title}`} className="mx-auto max-w-2xl space-y-4 rise-in">
      {/* نوار جشن مهرگان — فقط در تم mehregan رندر می‌شود (ظریف، بدون دست‌زدن به فاصله‌های پیش‌فرض) */}
      {season === "mehregan" && (
        <div
          aria-hidden
          className="h-1 w-full rounded-full bg-gradient-to-l from-rose-500/70 via-orange-400/60 to-amber-400/70"
        />
      )}
      <div className="flex flex-wrap items-center gap-2">
        <span
          aria-hidden
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
            season === "mehregan" && mehreganHeaderCls(),
          )}
        >
          {icon}
        </span>
        <h2 className="text-[15px] font-black">
          {title}
          {season === "mehregan" && <span aria-hidden> 🍁</span>}
        </h2>
        {stats}
        <div className="mr-auto flex items-center gap-0.5">
          {onHelp && (
            <Button
              variant="ghost"
              size="sm"
              className="h-11 w-11 p-0 text-muted-foreground"
              onClick={onHelp}
              aria-label="راهنمای بازی"
            >
              <HelpCircle size={15} />
            </Button>
          )}
          {onPauseToggle && (
            <Button
              variant="ghost"
              size="sm"
              className="h-11 w-11 p-0 text-muted-foreground"
              onClick={onPauseToggle}
              aria-pressed={paused}
              aria-label={paused ? "ادامهٔ بازی" : "توقف بازی"}
            >
              {paused ? <Play size={15} /> : <Pause size={15} />}
            </Button>
          )}
          {onMuteToggle && (
            <Button
              variant="ghost"
              size="sm"
              className="h-11 w-11 p-0 text-muted-foreground"
              onClick={onMuteToggle}
              aria-pressed={muted}
              aria-label={muted ? "روشن‌کردن صدا" : "بی‌صدا"}
            >
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-11 text-[11px] text-muted-foreground"
            onClick={onExit}
          >
            {exitLabel}
          </Button>
        </div>
      </div>

      {progress}

      {/* اعلام زندهٔ نتیجه برای فناوری‌های کمکی (WCAG 4.1.3) — جایگاه مرکزی واحد */}
      <p role="status" aria-live="polite" className="sr-only">
        {liveMsg}
      </p>

      {children}
    </div>
  );
}
