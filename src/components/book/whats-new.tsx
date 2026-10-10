"use client";

/**
 * What's New — دیالوگ «تازه‌ها» + نشان دیده‌نشدهٔ هدر (فاز ۱۲ «انتشار و رشد»)
 *
 * - همیشه‌مونت در page.tsx؛ باز شدن با رویداد پنجره‌ای «visionone:open-whats-new»
 *   (هدر، قفسه یا هر جای دیگر اپ فقط رویداد dispatch می‌کند — عامل مستقل)
 * - باز شدن خودکار: اگر ورود جدید دیده نشده باشد، ۱.۵ ثانیه پس از mount باز
 *   می‌شود؛ اگر کاربر با لینک عمیق آمده باشد (wasDeepLinkUsed) مزاحمش نمی‌شویم
 * - وضعیت «دیده‌شده» یک استور بیرونی ماژولی است (useSyncExternalStore-friendly):
 *   هدر با useWhatsNewUnseen نقطهٔ amber را نشان می‌دهد — بدون effect-setState
 * - پس از بستن دیالوگ: seen = جدیدترین id + رویداد «visionone:whats-new-changed»
 */

import { useEffect, useState, useSyncExternalStore } from "react";
import { Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { WHATS_NEW, LATEST_WHATS_NEW_ID } from "@/data/whats-new";
import { wasDeepLinkUsed } from "@/lib/deep-link";

/** کلید localStorage وضعیت دیده‌شده — مقدار: id آخرین ورودی که کاربر دیده */
const SEEN_KEY = "visionone:whats-new-seen";
/** رویداد داخلی تغییر وضعیت دیده‌شده — استور بیرونی را تازه می‌کند */
const CHANGED_EVENT = "visionone:whats-new-changed";
/** رویداد پنجره‌ای برای باز کردن دیالوگ (قرارداد مشترک فاز ۱۲) */
export const OPEN_WHATS_NEW_EVENT = "visionone:open-whats-new";

// ─── استور بیرونی «دیده‌شده» ───

let seenIdCache: string | null | undefined;

function readSeenId(): string | null {
  if (seenIdCache === undefined) {
    try {
      seenIdCache = localStorage.getItem(SEEN_KEY);
    } catch {
      seenIdCache = null;
    }
  }
  return seenIdCache;
}

function subscribeSeen(cb: () => void): () => void {
  window.addEventListener(CHANGED_EVENT, cb);
  return () => window.removeEventListener(CHANGED_EVENT, cb);
}

/** ثبت دیده‌شدن جدیدترین ورود + اطلاع به مشترکین (نقطهٔ هدر حذف می‌شود) */
function markAllSeen(): void {
  seenIdCache = LATEST_WHATS_NEW_ID;
  try {
    localStorage.setItem(SEEN_KEY, LATEST_WHATS_NEW_ID);
  } catch {
    /* noop */
  }
  window.dispatchEvent(new Event(CHANGED_EVENT));
}

/** نقطهٔ amber هدر — true یعنی ورود جدیدی دیده نشده (سمت سرور: false) */
export function useWhatsNewUnseen(): boolean {
  return useSyncExternalStore(
    subscribeSeen,
    () => readSeenId() !== LATEST_WHATS_NEW_ID,
    () => false,
  );
}

// ─── دیالوگ ───

export function WhatsNewDialog() {
  const [open, setOpen] = useState(false);

  // باز شدن خودکار (۱۵۰۰ms) — setState در کالبک تایمر، نه همزمان در effect
  useEffect(() => {
    const t = setTimeout(() => {
      if (!wasDeepLinkUsed() && readSeenId() !== LATEST_WHATS_NEW_ID) {
        setOpen(true);
      }
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  // شنوندهٔ رویداد مشترک — هدر/قفسه فقط dispatch می‌کنند
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_WHATS_NEW_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_WHATS_NEW_EVENT, onOpen);
  }, []);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) markAllSeen();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg gap-4 rounded-3xl p-5 sm:p-6" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle className="flex items-center gap-2 text-lg font-black">
            <Sparkles size={19} className="text-amber-500" aria-hidden />
            تازه‌های ویژن‌وان
          </DialogTitle>
          <DialogDescription className="text-[12.5px] leading-6">
            خلاصهٔ چیزهایی که از آخرین دیدنت اضافه شده — چرخهٔ انتشار: هر جمعه یک ورود جدید
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-96 space-y-3 overflow-y-auto pl-1">
          {WHATS_NEW.map((entry) => (
            <article key={entry.id} className="rounded-2xl border bg-card/60 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/15">
                  {entry.date}
                </Badge>
                <h3 className="text-sm font-black">{entry.title}</h3>
              </div>
              <ul className="mt-2.5 space-y-1.5">
                {entry.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-1.5 text-[12.5px] leading-6 text-muted-foreground"
                  >
                    <Sparkles size={13} className="mt-1 shrink-0 text-primary" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default WhatsNewDialog;
