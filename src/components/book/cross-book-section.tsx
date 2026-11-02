"use client";

/**
 * بخش «معنی در کتاب‌های دیگر» (F-CV-1) — فقط پس از miss کامل در کتاب فعال رندر می‌شود.
 * ارتقای UX (F-CV-2): سلسله‌مراتب اطلاعات هر نتیجه، پایه/درس مرئی (چیپ)، تمایز بصری
 * نزدیک‌ترین پایه، «شکل پایه» فقط وقتی با انتخاب دانش‌آموز فرق دارد، اسکلت بارگذاری،
 * پیام صادقانهٔ حالت خطا، دکمهٔ پرش لمسی‌تر با حلقهٔ فوکوس — بدون تغییر داده/سرویس/ناوبری.
 *
 * - نمایش فقط‌خواندنی: معنی + برچسب منبع (کتاب + پایه + درس) + دکمهٔ «رفتن به منبع».
 * - هیچ نوشتنی در استورهای SRS/ستاره/یاد گرفتم انجام نمی‌شود — هویت یادگیری هر کتاب
 *   مستقل می‌ماند (§۷ مأموریت)؛ افزودن واژهٔ منبع به مجموعهٔ یادگیری فقط از مسیر
 *   خودِ کتاب منبع (دکمهٔ پرش با الگوی موجود setBook + requestView) انجام می‌شود.
 * - داده کاملاً سمت کلاینت و بدون درخواست /api است (dynamic import ماژول‌های سبک).
 * - کش ماژولی نتیجه‌ها (الگوی notesCache در word-lookup.tsx): باز شدن دوبارهٔ همان
 *   واژه بی‌درنگ است؛ آفلاین/چانک در دسترس نبود → پیام ظریف و صادقانه (بدون ادعای
 *   «یافت نشد») و رفتار فعلی پاپ‌آپ دست‌نخورده می‌ماند.
 */

import { useEffect, useRef, useSyncExternalStore } from "react";
import { ArrowUpLeft, Loader2, SearchX, WifiOff } from "lucide-react";
import type { BookId } from "@/data/books/types";
import { isGradedBookId, lookupCrossBookWithStatus, type CrossBookHit } from "@/lib/cross-book-vocab";
import { useBook } from "@/lib/book-context";
import { requestView } from "@/lib/nav-store";
import { cn } from "@/lib/utils";

// ─── کش ماژولی نتیجه‌ها — کلید = «کتاب فعال::واژه» (ترتیب/حذف کتاب فعال وابسته به کتاب است) ───

type SectionStatus = "loading" | "ready" | "empty" | "unavailable";

interface SectionEntry {
  status: SectionStatus;
  hits: CrossBookHit[];
  at: number;
}

const cache = new Map<string, SectionEntry>();
let version = 0;
const listeners = new Set<() => void>();

function bump() {
  version += 1;
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getVersion() {
  return version;
}

function entryKey(bookId: string, norm: string) {
  return `${bookId}::${norm}`;
}

/** شروع جست‌وجو فقط برای اولین باز شدن هر (کتاب, واژه) — سپس از کش */
function ensureLookup(bookId: BookId, norm: string) {
  const key = entryKey(bookId, norm);
  const st = cache.get(key);
  if (st) return; // در حال بارگذاری یا آماده — هیچ fetch/import تکراری
  cache.set(key, { status: "loading", hits: [], at: Date.now() });
  bump();
  lookupCrossBookWithStatus(bookId, norm)
    .then((r) => {
      // F-CV-2 §۶-د: تمایز صادقانه — «یافت نشد» فقط وقتی جست‌وجو واقعاً انجام شد؛
      // degraded (هیچ ایندکسی بارگذاری نشد) = پیام در دسترس‌نبودن، نه ادعای یافت‌نشدن
      const status: SectionStatus = r.hits.length > 0 ? "ready" : r.degraded ? "unavailable" : "empty";
      cache.set(key, { status, hits: r.hits, at: Date.now() });
      bump();
    })
    .catch(() => {
      // خطای پیش‌بینی‌نشدهٔ خود سرویس — همان پیام ظریف به‌جای بخش خالی بی‌توضیح
      cache.set(key, { status: "unavailable", hits: [], at: Date.now() });
      bump();
    });
}

// ─── کمکی‌های نمایش ───

/** آینهٔ normalize سرویس — برای تشخیص «شکل پایهٔ منبع = همان انتخاب دانش‌آموز» (حذف تکرار اطلاعات) */
function sameAsSelection(printForm: string, norm: string): boolean {
  return (
    printForm
      .replace(/[’‘]/g, "'")
      .replace(/[^A-Za-z' \-]/g, "")
      .trim()
      .toLowerCase() === norm
  );
}

/** یادداشت نقش منبع — فقط وقتی معنی فارسی نداریم یا از جدول فعل است (توضیح چرایی محتوا) */
function kindNote(hit: CrossBookHit): string | null {
  if (hit.kind === "verb") return "جدول افعال بی‌قاعده";
  if (hit.kind === "dict") return "دیکشنری جزوه";
  return null;
}

// ─── کامپوننت ───

interface CrossBookSectionProps {
  /** واژهٔ نرمال‌شدهٔ انتخاب دانش‌آموز — شکل اصلی در هدر پاپ‌آپ حفظ می‌شود (تصمیم §۲-۱۰) */
  norm: string;
  /** بستن پاپ‌آپ پیش از پرش به منبع */
  onClose: () => void;
}

export function CrossBookSection({ norm, onClose }: CrossBookSectionProps) {
  const { bookId, setBook } = useBook();
  useSyncExternalStore(subscribe, getVersion, getVersion);
  const mountedRef = useRef(false);

  const key = bookId ? entryKey(bookId, norm) : null;
  const entry = key ? cache.get(key) : undefined;

  useEffect(() => {
    if (!bookId || !norm) return;
    // در چرخهٔ StrictMode/HMR فقط اولین درخواست واقعی کار می‌کند (کش loading/ready)
    if (mountedRef.current) return;
    mountedRef.current = true;
    ensureLookup(bookId, norm);
  }, [bookId, norm]);

  if (!bookId || !entry) return null;

  function jump(hit: CrossBookHit) {
    onClose();
    if (bookId !== hit.bookId) setBook(hit.bookId);
    requestView(hit.view);
  }

  if (entry.status === "loading") {
    return (
      <div
        className="mt-2.5 rounded-xl border border-primary/25 bg-primary/5 p-2.5"
        role="status"
        aria-live="polite"
        aria-label="در حال جست‌وجو در کتاب‌های دیگر"
      >
        <p className="mb-2 flex items-center gap-1.5 text-[11px] font-black text-primary">
          <Loader2 size={12} className="animate-spin" aria-hidden />
          در کتاب‌های دیگر می‌گردم…
        </p>
        {/* اسکلت هم‌قدِ کارت نتیجه — کاهش پرش چیدمانی وقتی نتایج می‌آیند (F-CV-2 §۶-د) */}
        <div className="space-y-2" aria-hidden>
          <div className="h-[88px] animate-pulse rounded-lg border border-border/60 bg-muted/50" />
          <div className="h-[88px] animate-pulse rounded-lg border border-border/40 bg-muted/30" />
        </div>
      </div>
    );
  }

  if (entry.status === "empty") {
    return (
      <p role="status" className="mt-2 flex items-center gap-1.5 text-[10.5px] font-bold text-muted-foreground/80">
        <SearchX size={11} aria-hidden />
        در واژگان کتاب‌های دیگر هم یافت نشد.
      </p>
    );
  }

  if (entry.status === "unavailable") {
    // خطا/شکست بارگذاری — صادقانه: «یافت نشد» نمی‌گوییم چون جست‌وجو انجام نشده (F-CV-2 §۶-د)
    return (
      <p role="note" className="mt-2 flex items-center gap-1.5 text-[10.5px] font-bold text-muted-foreground/80">
        <WifiOff size={11} aria-hidden />
        جست‌وجوی بین‌کتابی همین حالا در دسترس نیست — شاید به‌خاطر حالت آفلاین.
      </p>
    );
  }

  const multiple = entry.hits.length > 1;

  return (
    <div className="mt-2.5 rounded-xl border border-primary/25 bg-primary/5 p-2.5" aria-label="معنی در کتاب‌های دیگر">
      <p className="flex items-center gap-1 text-[11px] font-black text-primary">
        <ArrowUpLeft size={12} aria-hidden />
        معنی در کتاب‌های دیگر
      </p>
      {multiple && (
        <p className="mt-0.5 pr-4 text-[9.5px] font-bold text-muted-foreground/75">
          مرتب‌شده بر پایهٔ نزدیکی پایهٔ تحصیلی به جزوهٔ فعال
        </p>
      )}
      <ul className="mt-2 space-y-2">
        {entry.hits.map((h, i) => {
          const wordDiffers = !sameAsSelection(h.word, norm);
          const closest = multiple && i === 0 && isGradedBookId(h.bookId);
          const note = kindNote(h);
          return (
            <li
              key={`${h.bookId}-${h.word}`}
              className={cn(
                "rounded-lg border border-border/70 bg-card p-2.5 shadow-sm transition-colors",
                closest && "border-primary/40 ring-1 ring-primary/30",
              )}
            >
              {/* ① هویت منبع: کتاب + درس + (نزدیک‌ترین پایه) */}
              <div className="flex items-center gap-1.5">
                <span aria-hidden className="text-[12px] leading-none">
                  {h.emoji}
                </span>
                <span className="min-w-0 flex-1 truncate text-[10.5px] font-black text-foreground/90" title={h.bookTitle}>
                  {h.bookTitle}
                </span>
                {closest && (
                  <span className="shrink-0 rounded-full bg-primary px-1.5 py-px text-[8.5px] font-black text-primary-foreground">
                    نزدیک‌ترین پایه
                  </span>
                )}
                {h.lessonLabel && (
                  <span className="shrink-0 rounded-full bg-primary/10 px-1.5 py-px text-[9px] font-black text-primary">
                    {h.lessonLabel}
                  </span>
                )}
              </div>
              {/* ② پایه/نوع منبع — مرئی (پیش‌تر فقط در hover بود) */}
              <p className="mt-0.5 flex items-center gap-1 text-[9.5px] font-bold text-muted-foreground/75">
                <span className="truncate">{h.gradeLabel}</span>
                {note && (
                  <>
                    <span aria-hidden>·</span>
                    <span className="shrink-0">{note}</span>
                  </>
                )}
              </p>

              {/* ③ شکل پایه — فقط وقتی با انتخاب دانش‌آموز متفاوت است (حذف تکرار اطلاعات) */}
              {wordDiffers && (
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="text-[9px] font-bold text-muted-foreground/80">شکل پایه:</span>
                  <span dir="ltr" className="font-en text-[13px] font-black leading-5 text-foreground">
                    {h.word}
                  </span>
                </div>
              )}

              {/* ④ محتوا: نقش دستوری + معنی چاپی (اصلی) و تعریف EN (ثانویه؛ یا اصلی در دیکشنری-محض) */}
              {(h.meaning || h.pos || h.phonetic) && (
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  {h.pos && (
                    <span dir="ltr" className="font-en shrink-0 rounded bg-muted px-1.5 py-px text-[9.5px] font-bold text-muted-foreground">
                      {h.pos}
                    </span>
                  )}
                  {h.phonetic && (
                    <span dir="ltr" className="font-en shrink-0 text-[10px] text-muted-foreground/85">
                      {h.phonetic}
                    </span>
                  )}
                  {h.meaning && <span className="text-[13px] font-black leading-5.5 text-foreground">{h.meaning}</span>}
                </div>
              )}
              {h.definition && (
                <p
                  dir="ltr"
                  className={cn(
                    "font-en mt-1 rounded-md px-2 py-1 text-left leading-4.5",
                    h.meaning
                      ? "bg-muted/60 text-[11px] text-muted-foreground"
                      : "bg-muted/40 text-[12px] leading-5 text-foreground/90",
                  )}
                >
                  {h.definition}
                </p>
              )}

              {/* ⑤ پرش به منبع — هم‌قد الگوی پاپ‌آپ (min-h-9) + حلقهٔ فوکوس */}
              <button
                type="button"
                onClick={() => jump(h)}
                className={cn(
                  "mt-2 flex min-h-9 items-center gap-1 rounded-full border border-primary/40 bg-primary/5 px-3 text-[11px] font-black text-primary",
                  "transition-all hover:bg-primary/15 active:scale-95",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                )}
                aria-label={`رفتن به ${h.bookTitle}${h.lessonLabel ? ` — ${h.lessonLabel}` : ""}`}
              >
                <ArrowUpLeft size={12} aria-hidden />
                رفتن به منبع
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-2 flex items-center gap-1 text-[9.5px] text-muted-foreground/70">
        <WifiOff size={10} aria-hidden />
        جست‌وجو در واژگان محلی همهٔ جزوه‌ها — بدون اینترنت
      </p>
    </div>
  );
}
