"use client";

/**
 * صفحهٔ نتیجهٔ استاندارد بازی‌ها (ResultScreen) — فاز G1-06 نقشه راه بازی‌ها.
 *
 * ترکیب ثابت از بالا به پایین:
 *  ۱. آیکون جشن + عنوان پایان دور + بج «رکورد جدید» (وقتی بازی اعلام کند)
 *  ۲. ستاره‌بندی ۱ تا ۳ — آستانه‌ها per-game است و بازی عدد آماده می‌دهد
 *  ۳. شبکهٔ آمار (زمان/حرکت/دقت/…) — بازی می‌دهد
 *  ۴. بخش مرور خطاها (فقط وقتی errorCount > 0 و reviewItems هست) — باز شدن
 *     اول، آیتم‌ها را یک‌بار در SRS به‌عنوان «نامعلوم» ثبت می‌کند (مرورِ صریح
 *     کاربر = واژه باید دوباره تمرین شود) — الگوی recordSRS پروژه
 *  ۵. سه دکمهٔ ثابت: دور جدید / مرور خطاها / خروج (لیبل‌ها قابل تغییر)
 *  ۶. ردیف ظریف «اشتراک نتیجه» زیر دکمه‌های ثابت (فاز G4-04) — ساخت کارت
 *     تصویری آمار پایان با kit/result-share (الگوی progress-card-generator)
 *     و Web Share API؛ فقط با کنش کاربر، بدون ذخیرهٔ خودکار
 *
 * نکتهٔ کانفتی: اعلام رکورد از مسیر موجود می‌آید (saveBest → emitRecord →
 * GamificationToasts → fireConfetti)؛ اینجا دوباره شلیک نمی‌کنیم تا دوبرابر
 * نشود. بازی‌هایی که از saveBest رد می‌شوند prop celebrate را بدهند.
 */

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  BookOpenCheck,
  ChevronDown,
  Loader2,
  PartyPopper,
  RotateCcw,
  Settings2,
  Share2,
  Star,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { fireConfetti } from "@/components/book/confetti";
import { recordSRS } from "@/lib/srs-store";
import { playSound } from "./sound-engine";
import { buzz } from "./haptics";
import { faNum } from "../shared";
import { shareOrDownloadResultCard } from "./result-share";

export interface ResultStat {
  label: string;
  value: string;
  icon?: ReactNode;
}

export interface ResultReviewItem {
  /** روی کارت — معمولاً واژهٔ انگلیسی */
  front: string;
  /** پشت کارت — معمولاً معنی فارسی */
  back: string;
}

export interface ResultScreenProps {
  /** عنوان پایان دور — مثل «همه جفت‌ها پیدا شد!» */
  title: string;
  /** ستاره‌های کسب‌شده ۱..۳ (آستانه per-game مال خود بازی) */
  stars: number;
  stats: ResultStat[];
  isRecord?: boolean;
  /** مرور خطاها فقط با خطای > 0 نشان داده می‌شود */
  errorCount?: number;
  /** آیتم‌های مرور — بدون این، دکمهٔ مرور فقط onReview بازی را صدا می‌زند */
  reviewItems?: ResultReviewItem[];
  /** رفتار مرور اختصاصی بازی (اختیاری) — بعد از ثبت SRS اجرا می‌شود */
  onReview?: () => void;
  /** کانفتی اضافه برای بازی‌هایی که رکوردشان از saveBest رد نمی‌شود */
  celebrate?: boolean;
  /** نام بازی برای کارت «اشتراک نتیجه» (G4-04؛ اختیاری — پیش‌فرض بازی ویژن وان) */
  gameName?: string;
  onReplay: () => void;
  onExit: () => void;
  exitLabel?: string;
}

export function ResultScreen({
  title,
  stars,
  stats,
  isRecord = false,
  errorCount = 0,
  reviewItems,
  onReview,
  celebrate = false,
  onReplay,
  onExit,
  exitLabel = "تنظیمات",
  gameName = "بازی ویژن وان",
}: ResultScreenProps) {
  const [reviewOpen, setReviewOpen] = useState(false);
  // ساخت کارت اشتراک نتیجه حین اجرا — دکمه تا پایان ساخت غیرفعال می‌ماند
  const [shareBusy, setShareBusy] = useState(false);
  // ثبت SRS فقط یک‌بار در هر نمایش نتیجه — باز و بسته‌کردن دوباره ثبت نمی‌زند
  const srsRecordedRef = useRef(false);

  // کانفتی برای بازی‌هایی که رکوردشان از مسیر saveBest رد نمی‌شود — یک‌بار در mount
  useEffect(() => {
    if (celebrate && isRecord) fireConfetti();
  }, [celebrate, isRecord]);

  const starsSafe = Math.max(1, Math.min(3, Math.round(stars)));
  const canReview = errorCount > 0;
  const hasItems = canReview && !!reviewItems && reviewItems.length > 0;

  /** ساخت کارت تصویری نتیجه از همین props و اشتراک/دانلود (G4-04) */
  async function handleShareResult() {
    if (shareBusy) return;
    setShareBusy(true);
    try {
      const outcome = await shareOrDownloadResultCard({
        gameName,
        title,
        stars: starsSafe,
        stats: stats.slice(0, 3).map(({ label, value }) => ({ label, value })),
        isRecord,
      });
      if (outcome === "shared" || outcome === "saved") {
        toast.success("کارت نتیجه آماده شد");
      } else if (outcome === "failed") {
        toast.error("ساخت تصویر ممکن نشد");
      }
      // «cancelled» = لغو دیالوگ اشتراک توسط کاربر — بی‌صدا رد می‌شود
    } catch {
      toast.error("ساخت تصویر ممکن نشد");
    } finally {
      setShareBusy(false);
    }
  }

  const toggleReview = useCallback(() => {
    playSound("click");
    buzz("light");
    if (!srsRecordedRef.current) {
      srsRecordedRef.current = true;
      // مرور صریح کاربر = این واژه‌ها دوباره باید تمرین شوند (SRS)
      const seen = new Set<string>();
      for (const item of reviewItems ?? []) {
        if (seen.has(item.front)) continue;
        seen.add(item.front);
        try {
          recordSRS(item.front, false);
        } catch {
          /* ثبت SRS هرگز نمایش مرور را نمی‌شکند */
        }
      }
      onReview?.();
    }
    setReviewOpen((o) => !o);
  }, [onReview, reviewItems]);

  return (
    <section
      aria-label={`نتیجهٔ بازی — ${title}`}
      className="mx-auto max-w-xl rise-in rounded-2xl border border-amber-500/30 bg-card shadow-sm"
    >
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
          <PartyPopper size={30} aria-hidden />
        </span>
        <h2 className="text-xl font-black">{title}</h2>

        {isRecord && (
          <Badge className="gap-1.5 bg-amber-500 text-amber-950 shadow-md shadow-amber-500/30">
            <Trophy size={13} aria-hidden />
            رکورد جدید! 🏆
          </Badge>
        )}

        {/* ستاره‌بندی ۱ تا ۳ */}
        <div
          role="img"
          aria-label={`ستاره‌ها: ${faNum(starsSafe)} از ${faNum(3)}`}
          className="flex items-center gap-1"
        >
          {[0, 1, 2].map((i) => (
            <Star
              key={i}
              size={26}
              aria-hidden
              className={cn(
                "transition-all duration-300",
                i < starsSafe
                  ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                  : "text-muted-foreground/30",
                i < starsSafe && "scale-110",
              )}
            />
          ))}
        </div>

        <div className="grid w-full grid-cols-3 gap-2 text-center">
          {stats.slice(0, 3).map((s) => (
            <div key={s.label} className="rounded-xl bg-muted/60 p-3">
              {s.icon && <span className="mx-auto block w-fit">{s.icon}</span>}
              <p className="mt-1.5 text-lg font-black leading-none">{s.value}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {canReview && (
          <div className="w-full space-y-2">
            <Button
              variant="outline"
              onClick={toggleReview}
              aria-expanded={reviewOpen}
              className="h-11 w-full gap-2 border-amber-500/40 text-[13px] text-amber-700 hover:bg-amber-500/10 dark:text-amber-400"
            >
              <BookOpenCheck size={16} aria-hidden />
              مرور {faNum(errorCount)} خطا
              <ChevronDown
                size={14}
                aria-hidden
                className={cn("transition-transform duration-300", reviewOpen && "rotate-180")}
              />
            </Button>
            {reviewOpen && hasItems && (
              <ul className="max-h-64 space-y-1.5 overflow-y-auto rounded-xl border bg-muted/40 p-2 text-right">
                {reviewItems.map((item, i) => (
                  <li
                    key={`${item.front}-${i}`}
                    className="flex items-center justify-between gap-3 rounded-lg bg-card px-3 py-2"
                  >
                    <span dir="ltr" className="font-en text-[13px] font-black">
                      {item.front}
                    </span>
                    <span className="text-[12px] text-muted-foreground">{item.back}</span>
                  </li>
                ))}
              </ul>
            )}
            {reviewOpen && !hasItems && (
              <p className="rounded-xl bg-muted/40 p-3 text-[12px] text-muted-foreground">
                لیست خطاها را خود بازی اینجا نشان می‌دهد.
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-2">
          <Button onClick={onReplay} className="h-11 gap-2">
            <RotateCcw size={16} aria-hidden />
            دور جدید
          </Button>
          <Button variant="outline" className="h-11 gap-2" onClick={onExit}>
            <Settings2 size={16} aria-hidden />
            {exitLabel}
          </Button>
        </div>

        {/* ردیف چهارم — اشتراک نتیجه (G4-04): فقط با کنش کاربر؛ لغو دیالوگ بی‌صدا */}
        <Button
          variant="ghost"
          onClick={() => void handleShareResult()}
          disabled={shareBusy}
          aria-busy={shareBusy}
          className="min-h-11 w-full gap-2 text-[13px] text-muted-foreground hover:text-foreground sm:w-auto"
        >
          {shareBusy ? (
            <Loader2 size={16} aria-hidden className="animate-spin" />
          ) : (
            <Share2 size={16} aria-hidden />
          )}
          {shareBusy ? "در حال ساخت کارت…" : "اشتراک نتیجه"}
        </Button>
      </div>
    </section>
  );
}
