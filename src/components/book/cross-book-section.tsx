"use client";

/**
 * بخش «معنی در کتاب‌های دیگر» (F-CV-1) — فقط پس از miss کامل در کتاب فعال رندر می‌شود.
 *
 * - نمایش فقط‌خواندنی: معنی + برچسب منبع (کتاب + درس) + دکمهٔ «رفتن به منبع».
 * - هیچ نوشتنی در استورهای SRS/ستاره/یاد گرفتم انجام نمی‌شود — هویت یادگیری هر کتاب
 *   مستقل می‌ماند (§۷ مأموریت)؛ افزودن واژهٔ منبع به مجموعهٔ یادگیری فقط از مسیر
 *   خودِ کتاب منبع (دکمهٔ پرش با الگوی موجود setBook + requestView) انجام می‌شود.
 * - داده کاملاً سمت کلاینت و بدون درخواست /api است (dynamic import ماژول‌های سبک).
 * - کش ماژولی نتیجه‌ها (الگوی notesCache در word-lookup.tsx): باز شدن دوبارهٔ همان
 *   واژه بی‌درنگ است؛ آفلاین/چانک در دسترس نبود → تنزل بی‌صدا (هیچ ردیفی رندر نمی‌شود)
 *   و رفتار فعلی پاپ‌آپ («پیدا نشد» + کالوکیشن‌های مرتبط) دست‌نخورده می‌ماند.
 */

import { useEffect, useRef, useSyncExternalStore } from "react";
import { ArrowUpLeft, Loader2, SearchX } from "lucide-react";
import type { BookId } from "@/data/books/types";
import { lookupCrossBook, type CrossBookHit } from "@/lib/cross-book-vocab";
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
  lookupCrossBook(bookId, norm)
    .then((hits) => {
      cache.set(key, { status: hits.length > 0 ? "ready" : "empty", hits, at: Date.now() });
      bump();
    })
    .catch(() => {
      // آفلاین واقعی و چانک هرگز بارگذاری نشده — تنزل بی‌صدا به رفتار فعلی پاپ‌آپ
      cache.set(key, { status: "unavailable", hits: [], at: Date.now() });
      bump();
    });
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

  if (!bookId || !entry || entry.status === "unavailable") return null;

  function jump(hit: CrossBookHit) {
    onClose();
    if (bookId !== hit.bookId) setBook(hit.bookId);
    requestView(hit.view);
  }

  if (entry.status === "loading") {
    return (
      <div className="mt-2.5 flex items-center gap-1.5 rounded-xl border border-primary/25 bg-primary/5 px-2.5 py-2" role="status" aria-live="polite">
        <Loader2 size={12} className="animate-spin text-primary" />
        <p className="text-[10.5px] font-bold text-muted-foreground">در کتاب‌های دیگر می‌گردم…</p>
      </div>
    );
  }

  if (entry.status === "empty") {
    return (
      <p className="mt-2 flex items-center gap-1.5 text-[10.5px] font-bold text-muted-foreground/80">
        <SearchX size={11} aria-hidden />
        در واژگان کتاب‌های دیگر هم یافت نشد.
      </p>
    );
  }

  return (
    <div className="mt-2.5 rounded-xl border border-primary/25 bg-primary/5 p-2.5" aria-label="معنی در کتاب‌های دیگر">
      <p className="mb-1.5 flex items-center gap-1 text-[11px] font-black text-primary">
        <ArrowUpLeft size={12} aria-hidden />
        معنی در کتاب‌های دیگر
      </p>
      <ul className="space-y-1.5">
        {entry.hits.map((h) => (
          <li key={`${h.bookId}-${h.word}`} className="rounded-lg bg-card p-2 shadow-sm">
            <p className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground" title={h.gradeLabel}>
              <span aria-hidden>{h.emoji}</span>
              <span className="truncate">
                {h.bookTitle}
                {h.lessonLabel ? ` — ${h.lessonLabel}` : h.kind === "verb" ? " — جدول افعال بی‌قاعده" : ""}
              </span>
            </p>
            <div className="mt-1 flex items-baseline justify-between gap-2">
              <span dir="ltr" className="font-en shrink-0 text-left text-[13px] font-black text-foreground">
                {h.word}
              </span>
              {h.pos && (
                <span dir="ltr" className="font-en shrink-0 rounded bg-muted px-1 py-px text-[9.5px] font-bold text-muted-foreground">
                  {h.pos}
                </span>
              )}
            </div>
            {h.meaning && <p className="mt-0.5 text-[12px] font-bold leading-5.5 text-foreground/90">{h.meaning}</p>}
            {h.definition && (
              <p dir="ltr" className="font-en mt-1 line-clamp-2 rounded-md bg-muted/60 px-2 py-1 text-left text-[11px] leading-4.5 text-muted-foreground">
                {h.definition}
              </p>
            )}
            <button
              type="button"
              onClick={() => jump(h)}
              className={cn(
                "mt-1.5 flex min-h-8 items-center gap-1 rounded-full border border-primary/35 px-2.5 text-[10.5px] font-black text-primary",
                "transition-all hover:bg-primary/10 active:scale-95",
              )}
              aria-label={`رفتن به ${h.bookTitle}`}
            >
              <ArrowUpLeft size={11} aria-hidden />
              رفتن به منبع
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-1.5 flex items-center gap-1 text-[9.5px] text-muted-foreground/70">
        جست‌وجو در واژگان محلی همهٔ جزوه‌ها — بدون اینترنت
      </p>
    </div>
  );
}
