"use client";

import { useMemo } from "react";
import { createPortal } from "react-dom";
import { Printer, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { faNum } from "@/components/book/games/shared";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import type { VocabEntry } from "@/data/types";

/**
 * چاپ فلش‌کارت دورو (فاز ۱۰ — خروجی‌ها).
 *
 * - A4 عمودی، هر صفحه ۸ کارت (۲ ستون × ۴ ردیف) با ابعاد mm و خط برش خط‌چین.
 * - ایندکس زوج برگه = روی کارت‌ها (واژهٔ انگلیسی)، ایندکس فرد = پشت همان کارت‌ها
 *   (معنی فارسی) با آینه‌سازی افقی — «همان ردیف، ترتیب ستون‌های معکوس» — تا با
 *   چاپ دورو لبه‌بلند (Flip on long edge) پشت هر کارت دقیقاً پشت رویش بیفتد.
 * - برگه‌های چاپ روی صفحهٔ نمایش کاملاً مخفی‌اند (display:none) و فقط در @media
 *   print با تکنیک visibility دیده می‌شوند؛ به chrome اپ دست نمی‌زنیم.
 */

const CARDS_PER_PAGE = 8; // ۲ ستون × ۴ ردیف
const MAX_CARDS = 64; // ۸ برگ روی × ۲ پشت
const ROWS = CARDS_PER_PAGE / 2;

/** برچسب درس — همان منطق بَج فلاش‌کارت درون‌برنامه‌ای */
function lessonChip(e: VocabEntry): string {
  if (e.lesson === 0) return e.grade ? `پایه ${faNum(e.grade)}` : "مرور";
  return `درس ${faNum(e.lesson)}`;
}

/** برگه‌های چاپ: زوج = روی، فرد = پشتِ همان برگه (آینهٔ افقی ردیف‌ها) */
function buildSheets(entries: VocabEntry[]): (VocabEntry | undefined)[][] {
  const sheets: (VocabEntry | undefined)[][] = [];
  for (let i = 0; i < entries.length; i += CARDS_PER_PAGE) {
    const chunk = entries.slice(i, i + CARDS_PER_PAGE);
    sheets.push(chunk); // برگهٔ روی
    const back: (VocabEntry | undefined)[] = [];
    for (let r = 0; r < ROWS; r++) {
      const a = chunk[r * 2];
      const b = chunk[r * 2 + 1];
      back.push(b, a); // همان ردیف، ستون‌ها معکوس
    }
    sheets.push(back); // برگهٔ پشت
  }
  return sheets;
}

const PRINT_CSS = `
  .print-sheet { display: none; }
  @page { size: A4 portrait; margin: 0; }
  @media print {
    body * { visibility: hidden !important; }
    .print-sheet, .print-sheet * { visibility: visible !important; }
    .print-sheet {
      display: block !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 210mm !important;
      background: #fff !important;
    }
    .print-page {
      width: 210mm;
      height: 297mm;
      box-sizing: border-box;
      padding: 7mm;
      background: #fff;
      overflow: hidden;
      page-break-after: always;
      break-after: page;
    }
    .print-page:last-child {
      page-break-after: auto;
      break-after: auto;
    }
    .print-grid {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(4, 1fr);
      gap: 2.5mm;
    }
    .print-card {
      box-sizing: border-box;
      border: 0.4mm dashed #d6d9de;
      border-radius: 2mm;
      background: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3.5mm;
      padding: 3mm;
      overflow: hidden;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .print-card .chip {
      font-size: 9pt;
      font-weight: 700;
      color: #047857;
      background: #d1fae5;
      border-radius: 999px;
      padding: 1mm 4.5mm;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .print-card .word {
      direction: ltr;
      font-family: ui-sans-serif, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
      font-size: 21pt;
      font-weight: 800;
      color: #111827;
      text-align: center;
      line-height: 1.25;
      max-width: 100%;
      overflow-wrap: break-word;
    }
    .print-card .divider {
      width: 38%;
      border-top: 0.35mm dashed #e5e7eb;
    }
    .print-card .back-word {
      direction: ltr;
      font-family: ui-sans-serif, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
      font-size: 10pt;
      font-weight: 700;
      color: #059669;
      text-align: center;
      max-width: 100%;
      overflow-wrap: break-word;
    }
    .print-card .meaning {
      font-size: 15pt;
      font-weight: 800;
      color: #1f2937;
      text-align: center;
      line-height: 1.6;
      max-width: 100%;
    }
  }
`;

function FrontCard({ e }: { e: VocabEntry }) {
  return (
    <div className="print-card">
      <span className="chip">{lessonChip(e)}</span>
      <p className="word">{e.word}</p>
      <span className="divider" />
    </div>
  );
}

function BackCard({ e }: { e: VocabEntry }) {
  return (
    <div className="print-card">
      <p className="back-word">{e.word}</p>
      <p className="meaning">{e.meaning}</p>
    </div>
  );
}

export function PrintFlashcards({ entries, onClose }: { entries: VocabEntry[]; onClose: () => void }) {
  const oversized = entries.length > MAX_CARDS;
  const sheets = useMemo(() => buildSheets(entries.slice(0, MAX_CARDS)), [entries]);
  const frontPages = Math.ceil(sheets.length / 2);

  // window.print() از داخل event handler — پس از دو فریم تا layout برگه‌ها بنشیند
  function handlePrint() {
    if (oversized) toast.info("فقط ۶۴ واژه اول چاپ می‌شود");
    requestAnimationFrame(() => requestAnimationFrame(() => window.print()));
  }

  const sheet = (
    <div className="print-sheet" aria-hidden="true">
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />
      {sheets.map((cards, i) => (
        <div key={`page-${i}`} className="print-page">
          <div className="print-grid">
            {Array.from({ length: CARDS_PER_PAGE }).map((_, cell) => {
              const e = cards[cell];
              if (!e) return <div key={`cell-${cell}`} />;
              return i % 2 === 0 ? <FrontCard key={`cell-${cell}`} e={e} /> : <BackCard key={`cell-${cell}`} e={e} />;
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Dialog
        open
        onOpenChange={(o) => {
          if (!o) onClose();
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">چاپ فلش‌کارت 🖨️</DialogTitle>
            <DialogDescription className="text-right text-[12px] leading-6">
              {faNum(Math.min(entries.length, MAX_CARDS))} کارت روی {faNum(frontPages)} برگ A4 — روی هر
              برگ واژهٔ انگلیسی و پشتش معنی فارسی. در تنظیمات چاپ، دورو با گزینهٔ «Flip on long edge» را
              انتخاب کن تا پشت هر کارت درست جا بیفتد.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-start gap-2 rounded-xl border border-teal-500/25 bg-teal-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
            <Scissors size={14} className="mt-0.5 shrink-0 text-teal-600" />
            <p>
              خط‌چین دور هر کارت، خط برش است. کاغذ A4، حاشیهٔ چاپ «None» و مقیاس ۱۰۰٪ بهترین نتیجه را
              می‌دهد.
            </p>
          </div>

          {oversized && (
            <Badge
              variant="outline"
              className="border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-300"
            >
              دک بزرگ‌تر از ۶۴ واژه است — فقط ۶۴ واژهٔ اول چاپ می‌شود
            </Badge>
          )}

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={handlePrint} className="gap-1.5">
              <Printer size={15} />
              چاپ کن
            </Button>
            <Button variant="outline" onClick={onClose}>
              بستن
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* برگه‌های چاپ — مستقیم روی body تا از overflow دیالوگ فرار کنند */}
      {createPortal(sheet, document.body)}
    </>
  );
}
