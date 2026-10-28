"use client";

/**
 * PdfReaderView — کتاب‌خوان PDF مجموعهٔ «Steps to Understanding» (L. A. Hill — آکسفورد)
 *
 * معماری:
 * - کتاب فعال از BookProvider می‌آید (kind:"pdf")؛ پیکربندی فایل و نقشهٔ
 *   «داستان → صفحه» از src/data/books/pdf-books.ts خوانده می‌شود.
 * - pdf.js با dynamic import داخل اثر بارگذاری می‌شود (کداسپلیت کامل + بدون SSR)
 *   و worker آن از /pdfjs/pdf.worker.min.mjs سرو می‌شود (نسخهٔ همسان با پکیج).
 * - رندر صفحه روی <canvas> با fit-width + زوم دستی، devicePixelRatio برای شفافیت
 *   و سقف مساحت بوم برای iOS Safari.
 * - پیشرفت مطالعه (آخرین صفحه) در localStorage با کلید scoped هر کتاب ذخیره و
 *   هنگام بازگشت خودکار بازیابی می‌شود.
 * - ناوبری داستانی: نوار چیپ داستان‌ها + کشوی فهرست (Sheet) + پرش ضمیمهٔ واژه‌نامه.
 * - میان‌برهای کیبورد: ←→ صفحه، +/− زوم، 0 زوم پیش‌فرض، Home/End اول/آخر.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  List,
  Library,
  Loader2,
  RotateCcw,
  Maximize,
  Minimize,
  BookOpen,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBook } from "@/lib/book-context";
import { getPdfBookConfig, storyAtPage, type PdfBookConfig } from "@/data/books/pdf-books";
import type { ViewId } from "./app-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

/** کلید پیشرفت مطالعه — هم‌الگوی کلیدهای scoped پروژه */
function progressKey(bookId: string): string {
  return `visionone:pdfbook:${bookId}:page`;
}

/** سقف مساحت بوم — موبایل‌های iOS بالای این را سیاه می‌کشند */
const MAX_CANVAS_AREA = 16_000_000;

type LoadState = "loading" | "ready" | "error";

/** تایپ ساختاری برای جلوگیری از وابستگی عمق به تایپ‌های داخلی pdf.js */
interface RenderTaskLike {
  promise: Promise<unknown>;
  cancel: () => void;
}

function fa(n: number): string {
  return n.toLocaleString("fa-IR");
}

export function PdfReaderView({ onNavigate }: { onNavigate: (v: ViewId) => void }) {
  const { bookId, meta } = useBook();
  const cfg: PdfBookConfig | undefined = useMemo(
    () => (bookId ? getPdfBookConfig(bookId) : undefined),
    [bookId],
  );

  // ── بارگذاری سند ──
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [loadPct, setLoadPct] = useState(0);
  const [totalPages, setTotalPages] = useState(cfg?.totalPages ?? 0);
  const [retryNonce, setRetryNonce] = useState(0);
  const docRef = useRef<import("pdfjs-dist").PDFDocumentProxy | null>(null);

  // ── ناوبری صفحه ──
  const [page, setPage] = useState(0); // ۰ = هنوز مقداردهی نشده (منتظر آماده شدن سند)
  const [pageInput, setPageInput] = useState("1");
  const [zoom, setZoom] = useState(1); // ۱ = عرض صفحه
  const [displayPct, setDisplayPct] = useState<number | null>(null);
  const [rendering, setRendering] = useState(false);
  const [stageWidth, setStageWidth] = useState(0);

  // ── UI ──
  const [fullscreen, setFullscreen] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chipsRef = useRef<HTMLDivElement | null>(null);
  const activeChipRef = useRef<HTMLButtonElement | null>(null);

  const storyIndex = cfg && page > 0 ? storyAtPage(cfg, page) : 0; // ۰ = جلد/مقدمه

  // ── عملگر ناوبری صفحه ──
  const goTo = useCallback(
    (p: number) => {
      const max = totalPages || cfg?.totalPages || 1;
      const clamped = Math.min(max, Math.max(1, Math.floor(p)));
      setPage((prev) => (prev === clamped ? prev : clamped));
      setPageInput(String(clamped));
    },
    [totalPages, cfg],
  );

  // ── بارگذاری سند PDF (یک‌بار به ازای هر کتاب / تلاش دوباره) ──
  useEffect(() => {
    if (!cfg) return;
    let cancelled = false;

    (async () => {
      await Promise.resolve(); // خروج از فاز همگام اثر — سازگار با قانون set-state-in-effect
      if (cancelled) return;
      setLoadState("loading");
      setLoadPct(0);
      try {
        const pdfjs = await import("pdfjs-dist");
        if (cancelled) return;
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";
        const task = pdfjs.getDocument({ url: cfg.file });
        task.onProgress = (data: { loaded: number; total: number }) => {
          if (!cancelled && data.total > 0) {
            setLoadPct(Math.min(99, Math.round((data.loaded / data.total) * 100)));
          }
        };
        const doc = await task.promise;
        if (cancelled) {
          void doc.destroy();
          return;
        }
        docRef.current = doc;
        setTotalPages(doc.numPages);
        setLoadPct(100);

        // بازیابی آخرین صفحهٔ خوانده‌شده (پس از await — بدون setState همگام در اثر)
        let restored = 1;
        try {
          const saved = bookId ? Number(window.localStorage.getItem(progressKey(bookId))) : NaN;
          if (Number.isFinite(saved) && saved >= 1 && saved <= doc.numPages) restored = Math.floor(saved);
        } catch {
          /* noop */
        }
        setPage(restored);
        setPageInput(String(restored));
        setLoadState("ready");
      } catch (err) {
        if (!cancelled) {
          console.error("pdf-reader: خطا در بارگذاری فایل", err);
          setLoadState("error");
        }
      }
    })();

    return () => {
      cancelled = true;
      const doc = docRef.current;
      docRef.current = null;
      if (doc) void doc.destroy();
    };
  }, [cfg, bookId, retryNonce]);

  // ── ذخیرهٔ پیشرفت مطالعه ──
  useEffect(() => {
    if (loadState !== "ready" || !bookId || page < 1) return;
    try {
      window.localStorage.setItem(progressKey(bookId), String(page));
    } catch {
      /* noop */
    }
  }, [page, loadState, bookId]);

  // ── اندازهٔ صحنه (برای fit-width) ──
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let last = 0;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      if (Math.abs(w - last) > 4) {
        last = w;
        setStageWidth(w);
      }
    });
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  // ── رندر صفحهٔ جاری روی بوم ──
  useEffect(() => {
    const doc = docRef.current;
    const canvas = canvasRef.current;
    if (loadState !== "ready" || !doc || !canvas || page < 1 || stageWidth <= 0) return;

    let cancelled = false;
    let task: RenderTaskLike | null = null;

    (async () => {
      try {
        await Promise.resolve(); // خروج از فاز همگام اثر — سازگار با قانون set-state-in-effect
        if (cancelled) return;
        setRendering(true);

        const p = await doc.getPage(page);
        if (cancelled) return;

        const base = p.getViewport({ scale: 1 });
        const avail = Math.max(200, stageWidth - 24);
        const fit = avail / base.width;
        const scale = Math.min(5, Math.max(0.25, fit * zoom));
        const dpr = Math.min(2.5, window.devicePixelRatio || 1);

        let vp = p.getViewport({ scale: scale * dpr });
        const area = vp.width * vp.height;
        if (area > MAX_CANVAS_AREA) {
          const f = Math.sqrt(MAX_CANVAS_AREA / area);
          vp = p.getViewport({ scale: scale * dpr * f });
        }

        canvas.width = Math.floor(vp.width);
        canvas.height = Math.floor(vp.height);
        canvas.style.width = `${Math.floor(base.width * scale)}px`;
        canvas.style.height = `${Math.floor(base.height * scale)}px`;

        const ctx = canvas.getContext("2d");
        if (!ctx || cancelled) return;
        task = p.render({ canvasContext: ctx, viewport: vp }) as unknown as RenderTaskLike;
        await task.promise;
        if (!cancelled) {
          setRendering(false);
          setDisplayPct(Math.round(scale * 100));
        }
      } catch (err) {
        const name = (err as { name?: string } | null)?.name;
        if (!cancelled && name !== "RenderingCancelledException") {
          console.error("pdf-reader: خطا در رندر صفحه", err);
          setRendering(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      try {
        task?.cancel();
      } catch {
        /* noop */
      }
    };
  }, [loadState, page, zoom, stageWidth]);

  // ── پیمایش صحنه به بالا هنگام تغییر صفحه ──
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [page]);

  // ── وسط‌چین کردن چیپ فعال نوار داستان‌ها ──
  useEffect(() => {
    if (loadState !== "ready") return;
    const el = activeChipRef.current;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [storyIndex, loadState]);

  // ── وضعیت تمام‌صفحه ──
  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // ── میان‌برهای کیبورد ──
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target;
      if (
        t instanceof HTMLElement &&
        (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)
      )
        return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(page + 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(page - 1);
      } else if (e.key === "+" || e.key === "=") {
        setZoom((z) => Math.min(3, Math.round((z + 0.1) * 10) / 10));
      } else if (e.key === "-" || e.key === "_") {
        setZoom((z) => Math.max(0.5, Math.round((z - 0.1) * 10) / 10));
      } else if (e.key === "0") {
        setZoom(1);
      } else if (e.key === "Home") {
        goTo(1);
      } else if (e.key === "End") {
        goTo(totalPages);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, page, totalPages]);

  // ── عملگرهای دیگر ──
  function submitPageInput() {
    const n = Number(pageInput.replace(/[^\d]/g, ""));
    if (Number.isFinite(n) && n >= 1) goTo(n);
    else setPageInput(String(page || 1));
  }

  function toggleFullscreen() {
    try {
      if (document.fullscreenElement) void document.exitFullscreen();
      else void document.documentElement.requestFullscreen();
    } catch {
      /* noop */
    }
  }

  function retry() {
    setRetryNonce((n) => n + 1);
  }

  const storyLabel = useMemo(() => {
    if (!cfg) return "";
    if (cfg.appendixPage && page >= cfg.appendixPage) return cfg.appendixLabel ?? "ضمیمه";
    if (storyIndex === 0) return "جلد و مقدمه";
    const hint = cfg.storyHints?.[storyIndex - 1];
    return hint ? `داستان ${fa(storyIndex)} — ${hint}` : `داستان ${fa(storyIndex)}`;
  }, [cfg, page, storyIndex]);

  const chipEntries = useMemo(() => {
    const entries: { key: string; label: string; sub?: string; targetPage: number; storyNo: number }[] = [];
    if (!cfg) return entries;
    if (cfg.storyPages[0] > 1) {
      entries.push({ key: "cover", label: "جلد و مقدمه", targetPage: 1, storyNo: 0 });
    }
    cfg.storyPages.forEach((p, i) => {
      const hint = cfg.storyHints?.[i];
      entries.push({
        key: `s${i + 1}`,
        label: hint ?? `داستان ${fa(i + 1)}`,
        sub: `داستان ${fa(i + 1)}`,
        targetPage: p,
        storyNo: i + 1,
      });
    });
    if (cfg.appendixPage) {
      entries.push({
        key: "appendix",
        label: cfg.appendixLabel ?? "ضمیمه",
        targetPage: cfg.appendixPage,
        storyNo: -1,
      });
    }
    return entries;
  }, [cfg]);

  // ── پیکربندی نیامده (کتاب غیر PDF) — نباید رخ دهد ──
  if (!cfg || !meta) {
    return (
      <section className="flex min-h-[55vh] flex-col items-center justify-center gap-3 rounded-3xl border bg-card/60 p-10 text-center">
        <BookOpen className="h-8 w-8 text-muted-foreground" aria-hidden />
        <p className="text-sm text-muted-foreground">پیکربندی کتاب‌خوان برای این کتاب یافت نشد.</p>
        <Button variant="outline" onClick={() => onNavigate("shelf")} className="min-h-11">
          <Library size={16} aria-hidden />
          بازگشت به قفسه
        </Button>
      </section>
    );
  }

  return (
    <div className="pb-10" data-pdf-reader={meta.id}>
      {/* ─── نوار ابزار چسبان ─── */}
      <div className="sticky top-14 z-30 -mx-3 -mt-1 border-b bg-background/90 backdrop-blur-lg sm:-mx-4">
        <div className="mx-auto flex max-w-full items-center gap-1.5 px-2 py-2 sm:gap-2 sm:px-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("shelf")}
            aria-label="بازگشت به قفسهٔ کتاب"
            className="h-11 w-11 shrink-0 rounded-full sm:h-9 sm:w-9"
          >
            <Library size={17} />
          </Button>

          {/* عنوان کتاب + موقعیت داستان */}
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-[13px] font-black">{meta.title}</p>
            <p className="truncate text-[11px] text-muted-foreground">{storyLabel}</p>
          </div>

          {/* ناوبری صفحه */}
          <div className="flex shrink-0 items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => goTo(page - 1)}
              disabled={page <= 1}
              aria-label="صفحهٔ قبلی"
              className="h-11 w-11 rounded-full sm:h-9 sm:w-9"
            >
              <ChevronRight size={18} />
            </Button>
            <div className="flex items-center gap-1" dir="ltr">
              <Input
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onBlur={submitPageInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.currentTarget.blur();
                  }
                }}
                inputMode="numeric"
                aria-label="شمارهٔ صفحه"
                className="h-9 w-12 px-1 text-center text-[13px] font-bold tabular-nums"
              />
              <span className="hidden text-[11px] text-muted-foreground sm:inline">/ {fa(totalPages)}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => goTo(page + 1)}
              disabled={totalPages > 0 && page >= totalPages}
              aria-label="صفحهٔ بعد"
              className="h-11 w-11 rounded-full sm:h-9 sm:w-9"
            >
              <ChevronLeft size={18} />
            </Button>
          </div>

          {/* زوم */}
          <div className="hidden items-center gap-0.5 sm:flex">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setZoom((z) => Math.max(0.5, Math.round((z - 0.1) * 10) / 10))}
              disabled={zoom <= 0.5}
              aria-label="کوچک‌نمایی"
              className="h-9 w-9 rounded-full"
            >
              <ZoomOut size={17} />
            </Button>
            <button
              type="button"
              onClick={() => setZoom(1)}
              aria-label="بازگشت به اندازهٔ مناسب عرض"
              className="min-w-12 rounded-full px-1 py-1 text-center text-[12px] font-bold tabular-nums text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {displayPct !== null ? `٪${fa(displayPct)}` : "—"}
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setZoom((z) => Math.min(3, Math.round((z + 0.1) * 10) / 10))}
              disabled={zoom >= 3}
              aria-label="بزرگ‌نمایی"
              className="h-9 w-9 rounded-full"
            >
              <ZoomIn size={17} />
            </Button>
          </div>

          {/* فهرست + تمام‌صفحه */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="فهرست داستان‌ها"
                className="h-11 w-11 shrink-0 rounded-full sm:h-9 sm:w-9"
              >
                <List size={18} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[85vw] max-w-80 flex-col gap-0 p-0 sm:w-80">
              <SheetHeader className="border-b px-4 py-3.5 text-right">
                <SheetTitle className="flex items-center gap-2 text-base">
                  <BookOpen size={16} aria-hidden />
                  فهرست {meta.title}
                </SheetTitle>
                <SheetDescription className="text-xs">
                  {fa(cfg.storyPages.length)} داستان
                  {cfg.appendixPage ? " + واژه‌نامه" : ""} — برای پرش، روی هر بخش بزنید
                </SheetDescription>
              </SheetHeader>
              <ScrollArea className="flex-1">
                <nav aria-label="فهرست داستان‌ها" className="flex flex-col gap-1 p-3">
                  {chipEntries.map((e) => {
                    const active =
                      e.storyNo === -1
                        ? Boolean(cfg.appendixPage && page >= cfg.appendixPage)
                        : e.storyNo === storyIndex;
                    return (
                      <SheetClose key={e.key} asChild>
                        <button
                          type="button"
                          onClick={() => goTo(e.targetPage)}
                          aria-current={active ? "true" : undefined}
                          className={cn(
                            "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-right text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            active ? "bg-primary/10 font-bold text-primary" : "hover:bg-muted",
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-black tabular-nums",
                              active
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground",
                            )}
                          >
                            {e.storyNo > 0
                              ? fa(e.storyNo)
                              : e.storyNo === 0
                                ? <BookOpen size={13} aria-hidden />
                                : <FileText size={13} aria-hidden />}
                          </span>
                          <span className="min-w-0 flex-1 truncate">{e.label}</span>
                          <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
                            ص {fa(e.targetPage)}
                          </span>
                        </button>
                      </SheetClose>
                    );
                  })}
                </nav>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            aria-label={fullscreen ? "خروج از تمام‌صفحه" : "نمایش تمام‌صفحه"}
            className="hidden h-11 w-11 shrink-0 rounded-full sm:inline-flex sm:h-9 sm:w-9"
          >
            {fullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
          </Button>
        </div>

        {/* نوار چیپ داستان‌ها — پرش سریع */}
        <div
          ref={chipsRef}
          className="flex gap-1.5 overflow-x-auto px-2 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-3"
          role="tablist"
          aria-label="پرش سریع به داستان‌ها"
        >
          {chipEntries.map((e) => {
            const active =
              e.storyNo === -1
                ? Boolean(cfg.appendixPage && page >= cfg.appendixPage)
                : e.storyNo === storyIndex;
            return (
              <button
                key={e.key}
                ref={active ? activeChipRef : undefined}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => goTo(e.targetPage)}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-[12px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active
                    ? "border-transparent bg-primary font-bold text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {e.sub && e.label !== e.sub ? (
                  <span>
                    <span className="font-bold">{e.sub}</span>
                    <span className="mx-1 opacity-60">·</span>
                    {e.label}
                  </span>
                ) : (
                  e.label
                )}
              </button>
            );
          })}
        </div>

        {/* نشانگر پیشرفت مطالعه */}
        <Progress
          value={totalPages > 0 && page >= 1 ? (page / totalPages) * 100 : 0}
          className="h-0.5 rounded-none bg-transparent"
          aria-label="پیشرفت مطالعه"
        />
      </div>

      {/* ─── صحنهٔ نمایش صفحه ─── */}
      <div
        ref={stageRef}
        className="relative mt-4 flex min-h-[70vh] justify-center rounded-2xl bg-zinc-200/70 px-3 py-4 dark:bg-zinc-950"
      >
        {loadState === "loading" && (
          <div className="flex w-full max-w-md flex-col items-center justify-center gap-4 self-center text-center">
            <span className="relative flex h-14 w-14 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" aria-hidden />
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl" aria-hidden>
                {meta.emoji}
              </span>
            </span>
            <p className="text-sm font-bold">در حال باز کردن {meta.title}…</p>
            <Progress value={loadPct} className="h-1.5 w-52" aria-label="پیشرفت بارگذاری فایل" />
            <p className="text-xs tabular-nums text-muted-foreground">٪{fa(loadPct)}</p>
          </div>
        )}

        {loadState === "error" && (
          <div className="flex w-full max-w-sm flex-col items-center justify-center gap-3 self-center text-center">
            <span className="text-4xl" aria-hidden>
              📄
            </span>
            <p className="text-sm font-bold">فایل کتاب باز نشد</p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              اتصال را بررسی کنید و دوباره تلاش کنید. اگر مشکل ادامه داشت، صفحه را نوسازی کنید.
            </p>
            <Button onClick={retry} className="min-h-11 gap-1.5">
              <RotateCcw size={15} aria-hidden />
              تلاش دوباره
            </Button>
          </div>
        )}

        {loadState === "ready" && (
          <div className="relative">
            <canvas
              ref={canvasRef}
              aria-label={`صفحهٔ ${fa(page || 1)} از ${meta.title}`}
              className="block rounded-md bg-white shadow-2xl ring-1 ring-black/10"
            />
            {rendering && (
              <span
                className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/85 shadow-md backdrop-blur"
                role="status"
                aria-label="در حال رندر صفحه"
              >
                <Loader2 size={15} className="animate-spin text-primary" aria-hidden />
              </span>
            )}
          </div>
        )}
      </div>

      {/* راهنمای کیبورد — فقط دسکتاپ */}
      <p className="mt-3 hidden text-center text-[11px] text-muted-foreground lg:block">
        میان‌برها: فلش ← → صفحه · +/− زوم · 0 زوم پیش‌فرض · Home/End اول و آخر کتاب
      </p>
    </div>
  );
}
