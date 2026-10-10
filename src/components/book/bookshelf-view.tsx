"use client";

import { BookOpen, Clock, Layers, Sparkles, ArrowLeft, GitCompareArrows, Printer, School, Smartphone, Check } from "lucide-react";
import { useSyncExternalStore, useState } from "react";
import { getBookSrsCounts } from "@/lib/srs-store";
import { BOOKS } from "@/data/books/registry";
import { cn } from "@/lib/utils";
import { useBook } from "@/lib/book-context";
import { requestView } from "@/lib/nav-store";
import { Button } from "@/components/ui/button";
import { BrochureSheet } from "./brochure-sheet";
import type { BookMeta } from "@/data/books/types";
import type { ViewId } from "./app-header";

// ── نشان سررسید قفسه (فاز ۲) ── مجموع مرورهای سررسید هر جزوه، مستقیم از localStorage
// با الگوی استور بیرونی پروژه: سمت سرور و حین hydration صفر برمی‌گردد (بدون خطای mismatch
// با HTML پیش‌رندرشده) و بلافاصله پس از آن عدد واقعی می‌نشیند. subscribe هنگام هر mount
// قفسه کَش را باطل می‌کند تا عدد هنگام ورود تازه باشد (معادل useMemo تنها-اولیه).
const EMPTY_DUE: Record<string, number> = {};
let dueSnapshot: Record<string, number> | null = null;

function subscribeDueSnapshot() {
  dueSnapshot = null; // ورود دوباره به قفسه → محاسبهٔ تازه
  return () => {};
}

function getDueSnapshot(): Record<string, number> {
  if (!dueSnapshot) {
    const out: Record<string, number> = {};
    for (const b of BOOKS) {
      if (b.available) out[b.id] = getBookSrsCounts(b.id).due;
    }
    dueSnapshot = out;
  }
  return dueSnapshot;
}

/** کلاس‌های گرادیان جلد بر اساس رنگ کتاب — بدون آبی/ایندیگو */
const COVER_GRADIENT: Record<BookMeta["color"], string> = {
  emerald: "from-emerald-500 via-emerald-600 to-teal-700",
  amber: "from-amber-400 via-amber-500 to-orange-600",
  teal: "from-teal-500 via-teal-600 to-emerald-700",
  violet: "from-violet-500 via-violet-600 to-purple-700",
  orange: "from-orange-500 via-orange-600 to-amber-700",
  rose: "from-rose-500 via-rose-600 to-pink-700",
};

const BADGE_TEXT: Record<BookMeta["color"], string> = {
  emerald: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  amber: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  teal: "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300",
  violet: "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300",
  orange: "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300",
  rose: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
};

function BookCard({
  meta,
  active,
  onOpen,
  dueCount,
}: {
  meta: BookMeta;
  active: boolean;
  dueCount: number;
  onOpen: (id: BookMeta["id"]) => void;
}) {
  const available = meta.available;

  return (
    <button
      type="button"
      onClick={() => available && onOpen(meta.id)}
      disabled={!available}
      aria-label={available ? `ورود به ${meta.title}` : `${meta.title} — به‌زودی`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-card text-right transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        available
          ? "cursor-pointer shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10 active:translate-y-0"
          : "cursor-not-allowed border-dashed opacity-80",
        active && "ring-2 ring-primary",
      )}
    >
      {/* جلد */}
      <div
        className={cn(
          "relative flex h-36 items-center justify-center bg-gradient-to-br sm:h-40",
          available ? COVER_GRADIENT[meta.color] : "from-muted via-muted to-muted",
        )}
      >
        <span
          className={cn(
            "text-6xl drop-shadow-lg transition-transform duration-300 sm:text-7xl",
            available && "group-hover:scale-110 group-hover:-rotate-6",
            !available && "opacity-40 grayscale",
          )}
          aria-hidden
        >
          {meta.emoji}
        </span>

        {/* برچسب پایه روی جلد */}
        <span
          className={cn(
            "absolute top-3 right-3 rounded-full px-2.5 py-1 text-[11px] font-bold backdrop-blur",
            available
              ? "bg-white/25 text-white"
              : "bg-background/70 text-muted-foreground",
          )}
        >
          {meta.gradeLabel}
        </span>

        {/* نشان وضعیت */}
        {available ? (
          active && (
            <span className="absolute top-3 left-3 rounded-full bg-white/25 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
              در حال مطالعه
            </span>
          )
        ) : (
          <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-background/70 px-2.5 py-1 text-[11px] font-bold text-muted-foreground backdrop-blur">
            <Clock size={11} />
            به‌زودی
          </span>
        )}

        {/* نشان مرور سررسید این جزوه (فاز ۲) */}
        {available && dueCount > 0 && (
          <span className="absolute bottom-3 left-3 rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur">
            {dueCount.toLocaleString("fa-IR")} مرور امروز
          </span>
        )}
        {/* خط تزئینی پایین جلد */}
        <span className="absolute inset-x-0 bottom-0 h-1.5 bg-black/10" aria-hidden />
      </div>

      {/* بدنه کارت */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="flex items-center gap-1.5 text-base font-black leading-snug">
          {meta.title}
          {available && <ArrowLeft size={15} className="shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />}
        </h3>
        <p className="text-xs leading-relaxed text-muted-foreground">{meta.tagline}</p>
        <p className="mt-auto pt-1.5 text-[11px] text-muted-foreground/80">
          {available ? `تألیف و گردآوری: ${meta.author}` : "فایل جزوه هنوز بارگذاری نشده است"}
        </p>
      </div>
    </button>
  );
}

export function BookshelfView({ onNavigate }: { onNavigate: (v: ViewId) => void }) {
  const { books, bookId, setBook } = useBook();
  const availableCount = books.filter((b) => b.available).length;
  // تعداد مرور سررسید هر جزوه + مجموع کل کتابخانه (فاز ۲)
  const dueByBook = useSyncExternalStore(subscribeDueSnapshot, getDueSnapshot, () => EMPTY_DUE);
  const totalDue = Object.values(dueByBook).reduce((sum, n) => sum + n, 0);

  // بروشور معرفی معلم‌ها (فاز ۱۲)
  const [brochureOpen, setBrochureOpen] = useState(false);

  function openBook(id: BookMeta["id"]) {
    setBook(id);
    onNavigate("home");
  }

  return (
    <div className="space-y-6">
      {/* سرصفحه قفسه */}
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-l from-emerald-50 via-background to-background p-6 dark:from-emerald-950/40 sm:p-8">
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                <BookOpen size={22} />
              </span>
              قفسه کتاب
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              جزوه‌ات را انتخاب کن؛ پیشرفت واژگان، فلش‌کارت‌ها و نتایج آزمون هر پایه جداگانه و امن نگه داشته می‌شود.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate("compare")}
              className="flex items-center gap-1.5 rounded-full bg-muted px-3.5 py-1.5 text-xs font-bold text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="مقایسه پیشرفت بین پایه‌ها"
            >
              <GitCompareArrows size={14} aria-hidden />
              مقایسه پایه‌ها
            </button>
            {totalDue > 0 && (
              <span className="rounded-full bg-amber-500/15 px-3 py-1.5 text-xs font-bold text-amber-700 dark:text-amber-300">
                {totalDue.toLocaleString("fa-IR")} مرور سررسید در کتابخانه
              </span>
            )}
            <span className={cn("rounded-full px-3 py-1.5 text-xs font-bold", BADGE_TEXT.emerald)}>
              {availableCount} جزوه فعال
            </span>
            <span className="flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-xs font-bold text-muted-foreground">
              <Clock size={12} />
              {books.length - availableCount} در راه
            </span>
          </div>
        </div>
        <Sparkles className="absolute -left-6 -top-6 h-40 w-40 text-primary/5" aria-hidden />
      </section>

      {/* شبکه کتاب‌ها */}
      <section
        aria-label="فهرست جزوه‌ها"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {books.map((meta) => (
          <BookCard key={meta.id} meta={meta} active={meta.id === bookId} dueCount={dueByBook[meta.id] ?? 0} onOpen={openBook} />
        ))}
      </section>

      {/* دعوت معلم‌ها (فاز ۱۲) — فقط در نمای قفسه */}
      <section aria-label="دعوت معلم‌ها" className="space-y-3">
        {/* نوار کوچک نصب روی گوشی */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-teal-500/25 bg-teal-500/5 px-4 py-2 text-center text-[11px] font-bold text-teal-700 dark:text-teal-300">
          <Smartphone size={13} aria-hidden />
          <span>ویژن‌وان روی گوشی هم نصب می‌شود 📱</span>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("visionone:open-install"))}
            className="rounded-sm underline decoration-dotted underline-offset-4 transition-colors hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            راهنمای نصب
          </button>
        </div>

        <div className="overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-l from-amber-50 via-background to-background dark:from-amber-950/30">
          <div className="flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center">
            <div className="min-w-0 flex-1 space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-black text-amber-700 dark:text-amber-300">
                دعوت معلم‌ها 👨‍🏫
              </span>
              <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                معلم هستید؟ کلاس مجازی رایگان بسازید
              </h2>
              <ul className="space-y-1.5 text-sm leading-6 text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <Check size={14} className="shrink-0 text-emerald-600" aria-hidden />
                  ساخت کلاس با کد ۶رقمی
                </li>
                <li className="flex items-center gap-1.5">
                  <Check size={14} className="shrink-0 text-emerald-600" aria-hidden />
                  تکلیف و آزمون زنده
                </li>
                <li className="flex items-center gap-1.5">
                  <Check size={14} className="shrink-0 text-emerald-600" aria-hidden />
                  داشبورد پیشرفت — بدون ثبت‌نام دانش‌آموز
                </li>
              </ul>
              <div className="flex flex-col gap-2 pt-1 sm:flex-row">
                <Button
                  onClick={() => {
                    // نمای کلاس به دادهٔ جزوه نیاز دارد (hasData) — برای تازه‌وارد بدون جزوهٔ فعال، ویژن وان فعال می‌شود
                    if (!bookId) setBook("vision-one");
                    requestView("class");
                  }}
                  className="min-h-11 gap-1.5 bg-emerald-600 text-white hover:bg-emerald-700"
                  aria-label="ساخت کلاس مجازی رایگان"
                >
                  <School size={16} aria-hidden />
                  ساخت کلاس 🏫
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setBrochureOpen(true)}
                  className="min-h-11 gap-1.5 border-amber-500/50 text-amber-700 hover:bg-amber-500/10 hover:text-amber-800 dark:text-amber-300 dark:hover:text-amber-200"
                  aria-label="دریافت بروشور معرفی ویژن‌وان"
                >
                  <Printer size={16} aria-hidden />
                  دریافت بروشور 🖨️
                </Button>
              </div>
            </div>
            <div className="hidden shrink-0 lg:flex" aria-hidden>
              <span className="text-7xl drop-shadow-sm">👨‍🏫</span>
            </div>
          </div>
        </div>

        <BrochureSheet open={brochureOpen} onClose={() => setBrochureOpen(false)} />
      </section>

      {/* نکته پیشرفت */}
      <p className="flex items-center justify-center gap-1.5 pb-2 text-center text-xs text-muted-foreground">
        <Layers size={13} className="shrink-0" aria-hidden />
        هر ۶ جزوه (پایه هفتم تا دوازدهم + ویژن وان) فعال است — برای جزئیات هر جزوه، نقشه راه در پوشه «نقشه راه ها» را ببینید.
      </p>
    </div>
  );
}
