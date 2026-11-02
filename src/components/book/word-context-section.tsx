"use client";

/**
 * بخش «در متن‌های واقعی» (F-CV-3 — فاز ۱۴، گام ۱) — نمایش واژه در جمله‌های واقعی عین جزوه.
 * جایگاه در پاپ‌آپ Word Lookup (تصمیم D2/D4):
 *   - hit: زیر بلوک دیکشنری/معنی
 *   - miss/related: زیر پیام miss و کالوکیشن‌های مرتبط، بالای سکشن بین‌کتابی
 *
 * قراردادها:
 *  - فقط‌خواندنی کامل: هیچ نوشتنی در SRS/ستاره/یاد گرفتم (حفاظت هویت §۷ مأموریت).
 *  - داده کاملاً سمت کلاینت و بدون درخواست /api — dynamic import زیرماژول‌های متنی
 *    (سرویس word-in-context.ts)؛ کش ماژولی نتیجه‌ها (الگوی cross-book-section).
 *  - تعداد اولیه ۲ + «نمایش بیشتر (+۲)» تا سقف ۶ + خط شمارش (تصمیم D5) — سقف در سطح کل سکشن.
 *  - سه سطح ترجمهٔ صادقانه (§۷): جمله‌به‌جمله بدون برچسب؛ پاراگراف‌محور با برچسب
 *    «ترجمهٔ پاراگراف از جزوه» + جمع‌شوندهٔ «نمایش پاراگراف کامل» (تصمیم D3).
 *  - خط منبع ۵جزئی (تصمیم D8): ایموجی + عنوان کتاب + چیپ درس/فصل + نوع محتوا +
 *    رشتهٔ source چاپی (کم‌رنگ). مختصات داده (refKind/refId/sentIdx) در title خط منبع.
 *  - موج ۲ (گام ۲ — فقط جایگاه miss کامل، prop allowWave2): نمونه‌های بین‌کتابی
 *    پایه‌دارهای ۷→۱۲ منهای فعال پس از miss موج ۱؛ مرتبشده با |Δپایه|؛ چیپ
 *    «نزدیک‌ترین پایه» + ring ظریف فقط روی اولین آیتمِ کتاب پایه‌دار خارج از فعال
 *    (بایت‌به‌بایت الگوی F-CV-2 در cross-book-section.tsx). در hit و related هرگز موج ۲ نیست.
 *  - حالت‌های صادقانه (§۴ سند UX): empty هرگز «واژه پیدا نشد» نمی‌گوید (C-1/C-4)؛
 *    خطا/آفلاین سرد = پیام در دسترس‌نبودن با WifiOff (C-5 — الگوی degraded در F-CV-2).
 *  - فقط‌خواندنی کامل: صفر import استورهای SRS/ستاره.
 */

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BookOpenText, ChevronDown, Loader2, WifiOff } from "lucide-react";
import type { BookId } from "@/data/books/types";
import { getBookMeta } from "@/data/books/registry";
import { lookupSentencesWithStatus, type ContextSentence } from "@/lib/word-in-context";
import { isGradedBookId } from "@/lib/cross-book-vocab";
import { useBook } from "@/lib/book-context";
import { cn } from "@/lib/utils";

// ─── کش ماژولی نتیجه‌ها — کلید = «کتاب فعال::واژه» (الگوی cross-book-section) ───

type SectionStatus = "loading" | "ready" | "empty" | "unavailable";

interface SectionEntry {
  status: SectionStatus;
  sentences: ContextSentence[];
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

function entryKey(bookId: string, norm: string, allowWave2: boolean) {
  // پرچم موج در کلید — دفاعی: مسیر hit (موج ۱) و miss کامل (موج ۱+۲) هرگز یک کلید را به اشتراک نگذارند
  return `${bookId}::${norm}::${allowWave2 ? "w2" : "w1"}`;
}

/** شروع جست‌وجو فقط برای اولین باز شدن هر (کتاب, واژه, موج) — سپس از کش */
function ensureLookup(bookId: BookId, norm: string, allowWave2: boolean) {
  const key = entryKey(bookId, norm, allowWave2);
  const st = cache.get(key);
  if (st) return; // در حال بارگذاری یا آماده — هیچ import تکراری
  cache.set(key, { status: "loading", sentences: [], at: Date.now() });
  bump();
  lookupSentencesWithStatus(bookId, norm, { includeWave2: allowWave2 })
    .then((r) => {
      // تمایز صادقانه (C-5): «یافت نشد» فقط وقتی جست‌وجو واقعاً انجام شد
      const status: SectionStatus = r.sentences.length > 0 ? "ready" : r.degraded ? "unavailable" : "empty";
      cache.set(key, { status, sentences: r.sentences, at: Date.now() });
      bump();
    })
    .catch(() => {
      cache.set(key, { status: "unavailable", sentences: [], at: Date.now() });
      bump();
    });
}

// ─── نمایش ───

const INITIAL_COUNT = 2; // تصمیم D5: ۲ جملهٔ اولیه
const STEP = 2; // گام «نمایش بیشتر»
const UI_CAP = 6; // سقف نمایش در UI (تصمیم D5)

function fa(n: number) {
  return n.toLocaleString("fa-IR");
}

/** جملهٔ EN با mark کهربایی روی بازهٔ منطبق — عین رشته، بدون بازنویسی کاراکتر */
function EnWithMark({ en, start, end, className }: { en: string; start: number; end: number; className?: string }) {
  return (
    <p dir="ltr" className={cn("font-en text-left", className)}>
      {en.slice(0, start)}
      <mark className="rounded-sm bg-amber-300/70 px-0.5 text-inherit dark:bg-amber-500/40">{en.slice(start, end)}</mark>
      {en.slice(end)}
    </p>
  );
}

/** یک آیتم جمله: EN + ترجمهٔ سطح‌دار (§۷) + خط منبع ۵جزئی (D8)؛
 *  closest = چیپ «نزدیک‌ترین پایه» + ring — فقط اولین نتیجهٔ کتاب پایه‌دار خارج از فعال در موج ۲ (الگوی F-CV-2) */
function ContextItem({ s, closest = false }: { s: ContextSentence; closest?: boolean }) {
  const [paraOpen, setParaOpen] = useState(false);
  const meta = getBookMeta(s.bookId);
  const isPara = s.level === "paragraph" && s.paraEn !== undefined && s.paraFa !== undefined;

  return (
    <li
      className={cn(
        "rounded-lg border border-border/70 bg-card p-2.5 shadow-sm",
        closest && "border-primary/40 ring-1 ring-primary/30",
      )}
    >
      <EnWithMark en={s.en} start={s.spanStart} end={s.spanEnd} className="text-[12.5px] leading-5 text-foreground" />

      {/* ترجمه — سطح‌دار و صادقانه (§۷ سند UX) */}
      <div className="mt-1 border-t border-border/50 pt-1">
        {isPara && (
          <p className="mb-0.5 flex items-center gap-1 text-[9px] font-black text-amber-700 dark:text-amber-400">
            ترجمهٔ پاراگراف از جزوه
          </p>
        )}
        <p dir="rtl" className="text-[11.5px] leading-5 text-muted-foreground">
          {s.fa}
        </p>

        {/* جمع‌شوندهٔ پاراگراف کامل (تصمیم D3 — پیش‌فرض بسته) */}
        {isPara && (
          <>
            <button
              type="button"
              onClick={() => setParaOpen((v) => !v)}
              aria-expanded={paraOpen}
              aria-label={paraOpen ? "بستن پاراگراف کامل" : "نمایش پاراگراف کامل"}
              className={cn(
                "mt-1 flex min-h-9 w-full items-center justify-center gap-1 rounded-full border border-border/70 px-3 text-[10.5px] font-black text-muted-foreground",
                "transition-all hover:bg-muted/60 hover:text-foreground active:scale-[0.98]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
              )}
            >
              {paraOpen ? "بستن پاراگراف کامل" : "نمایش پاراگراف کامل"}
              <ChevronDown size={12} className={cn("transition-transform", paraOpen && "rotate-180")} aria-hidden />
            </button>
            {paraOpen && (
              <div className="mt-1.5 rounded-lg bg-muted/40 p-2" role="region" aria-label="پاراگراف کامل از جزوه">
                <p dir="ltr" className="font-en text-left text-[11.5px] leading-5 text-foreground/90">
                  {(s.paraEn ?? "").slice(0, (s.paraSentenceStart ?? 0) + s.spanStart)}
                  <mark className="rounded-sm bg-amber-300/70 px-0.5 text-inherit dark:bg-amber-500/40">
                    {(s.paraEn ?? "").slice((s.paraSentenceStart ?? 0) + s.spanStart, (s.paraSentenceStart ?? 0) + s.spanEnd)}
                  </mark>
                  {(s.paraEn ?? "").slice((s.paraSentenceStart ?? 0) + s.spanEnd)}
                </p>
                <p dir="rtl" className="mt-1 border-t border-border/50 pt-1 text-[11px] leading-5 text-muted-foreground">
                  {s.paraFa}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* خط منبع ۵جزئی (D8) — مختصات داده در title (شفافیت کامل بدون شلوغی) */}
      <p
        className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[9.5px] font-bold text-muted-foreground/75"
        title={`${s.bookId} · ${s.refKind} · ${s.refId}#${s.sentIdx}`}
      >
        <span aria-hidden>{meta?.emoji ?? "📘"}</span>
        <span className="max-w-[110px] truncate" title={meta?.title}>
          {meta?.title ?? s.bookId}
        </span>
        {closest && (
          <span className="shrink-0 rounded-full bg-primary px-1.5 py-px text-[8.5px] font-black text-primary-foreground">
            نزدیک‌ترین پایه
          </span>
        )}
        {s.source.lessonLabel && (
          <span className="shrink-0 rounded-full bg-primary/10 px-1.5 py-px text-[9px] font-black text-primary">
            {s.source.lessonLabel}
          </span>
        )}
        <span className="shrink-0">{s.source.contentType}</span>
        {s.source.printedSource && <span className="truncate opacity-75">·{s.source.printedSource}</span>}
      </p>
    </li>
  );
}

// ─── کامپوننت ───

export function WordContextSection({ norm, allowWave2 = false }: { norm: string; allowWave2?: boolean }) {
  const { bookId } = useBook();
  useSyncExternalStore(subscribe, getVersion, getVersion);
  const mountedRef = useRef(false);
  const [visible, setVisible] = useState(INITIAL_COUNT);

  const key = bookId ? entryKey(bookId, norm, allowWave2) : null;
  const entry = key ? cache.get(key) : undefined;

  useEffect(() => {
    if (!bookId || !norm) return;
    // در چرخهٔ StrictMode/HMR فقط اولین درخواست واقعی کار می‌کند (کش loading/ready)
    if (mountedRef.current) return;
    mountedRef.current = true;
    ensureLookup(bookId, norm, allowWave2);
  }, [bookId, norm, allowWave2]);

  if (!bookId || !entry) return null;

  if (entry.status === "loading") {
    return (
      <div
        className="mt-2.5 rounded-xl border border-primary/25 bg-primary/5 p-2.5"
        role="status"
        aria-live="polite"
        aria-label="در حال یافتن جمله‌ها"
      >
        <p className="mb-2 flex items-center gap-1.5 text-[11px] font-black text-primary">
          <Loader2 size={12} className="animate-spin" aria-hidden />
          در حال یافتن جمله‌ها…
        </p>
        {/* اسکلت هم‌قدِ ۲ آیتم — کاهش پرش چیدمانی (الگوی F-CV-2 §۶-د) */}
        <div className="space-y-2" aria-hidden>
          <div className="h-[86px] animate-pulse rounded-lg border border-border/60 bg-muted/50" />
          <div className="h-[86px] animate-pulse rounded-lg border border-border/40 bg-muted/30" />
        </div>
      </div>
    );
  }

  if (entry.status === "empty") {
    // C-1/C-4 — هرگز «واژه پیدا نشد» نمی‌گوییم (معنی واژه جای دیگری از همین پاپ‌آپ است)
    return (
      <p role="status" className="mt-2 flex items-center gap-1.5 text-[10.5px] font-bold text-muted-foreground/80">
        <BookOpenText size={11} aria-hidden />
        در متن‌های کتاب‌ها جمله‌ای با این واژه یافت نشد.
      </p>
    );
  }

  if (entry.status === "unavailable") {
    // C-5 — آفلاین سرد/شکست چانک: «جست‌وجو انجام نشد»، نه «یافت نشد» (الگوی F-CV-2)
    return (
      <p role="note" className="mt-2 flex items-center gap-1.5 text-[10.5px] font-bold text-muted-foreground/80">
        <WifiOff size={11} aria-hidden />
        نمایش جمله‌ها همین حالا در دسترس نیست — شاید به‌خاطر حالت آفلاین.
      </p>
    );
  }

  const total = entry.sentences.length;
  const shown = entry.sentences.slice(0, Math.min(visible, UI_CAP));
  const canExpand = visible < total && visible < UI_CAP;
  const atUiCap = visible >= UI_CAP && total > UI_CAP;
  const multiple = total > 1;
  // موج ۲: آیا نتیجه‌ای از کتابی غیر از فعال در نمایش هست؟ (زیرنویس و یادداشت رتبه‌بندی)
  const hasCrossBook = shown.some((s) => s.bookId !== bookId);
  // نشان «نزدیک‌ترین پایه» فقط روی «اولین آیتم کتاب پایه‌دار خارج از فعال» —
  // حتی وقتی موج ۱ (کتاب فعال) جلوتر است (Wireframe 2 سند UX — الگوی F-CV-2)
  const firstCrossIdx = allowWave2 ? entry.sentences.findIndex((s) => s.bookId !== bookId) : -1;

  return (
    <div className="mt-2.5 rounded-xl border border-primary/25 bg-primary/5 p-2.5" aria-label="جمله‌های واقعی از کتاب‌ها">
      <p className="flex items-center gap-1 text-[11px] font-black text-primary">
        <BookOpenText size={12} aria-hidden />
        در متن‌های واقعی
      </p>
      {hasCrossBook && multiple && (
        <p className="mt-0.5 pr-4 text-[9.5px] font-bold text-muted-foreground/75">
          مرتب‌شده بر پایهٔ نزدیکی پایهٔ تحصیلی به جزوهٔ فعال
        </p>
      )}
      <p className="mt-0.5 pr-4 text-[9.5px] font-bold text-muted-foreground/75">
        {hasCrossBook ? "نمونه‌ها عین متن چاپی جزوه‌ها است — فقط‌خواندنی" : "نمونه‌ها عین متن جزوهٔ فعال است — فقط‌خواندنی"}
      </p>

      <ul className="mt-2 space-y-2">
        {shown.map((s, i) => (
          <ContextItem
            key={`${s.bookId}-${s.refKind}-${s.refId}-${s.sentIdx}`}
            s={s}
            closest={allowWave2 && multiple && i === firstCrossIdx && isGradedBookId(s.bookId) && s.bookId !== bookId}
          />
        ))}
      </ul>

      {canExpand && (
        <button
          type="button"
          onClick={() => setVisible((v) => Math.min(v + STEP, UI_CAP))}
          aria-label={`نمایش ${fa(Math.min(STEP, total - visible, UI_CAP - visible))} جملهٔ بیشتر — ${fa(Math.min(visible + STEP, UI_CAP))} از ${fa(Math.min(total, UI_CAP))}`}
          className={cn(
            "mt-2 flex min-h-9 w-full items-center justify-center gap-1 rounded-full border border-primary/40 bg-primary/5 px-3 text-[11px] font-black text-primary",
            "transition-all hover:bg-primary/15 active:scale-[0.98]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
          )}
        >
          نمایش بیشتر ({fa(Math.min(STEP, total - visible, UI_CAP - visible))}+)
        </button>
      )}

      {atUiCap && (
        <p className="mt-1.5 text-center text-[9.5px] font-bold text-muted-foreground/70">
          {fa(UI_CAP)} جملهٔ نخست از {fa(total)} جمله
        </p>
      )}

      <p className="mt-2 flex items-center gap-1 text-[9.5px] text-muted-foreground/70">
        <WifiOff size={10} aria-hidden />
        جست‌وجو در متن‌های محلی جزوه‌ها — بدون اینترنت
      </p>
    </div>
  );
}
