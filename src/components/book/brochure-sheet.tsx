"use client";

import { createPortal } from "react-dom";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * بروشور معرفی ویژن‌وان برای چاپ/PDF (فاز ۱۲ — صفحه معلم‌ها).
 *
 * همان تکنیک print-flashcards (فاز ۱۰):
 *  - شیت A4 عمودی روی صفحهٔ نمایش کاملاً مخفی است (display:none) و فقط در
 *    @media print با الگوی visibility نمایان می‌شود؛ به chrome اپ دست نمی‌زنیم.
 *  - شیت با portal مستقیم به body رندر می‌شود تا از overflow دیالوگ فرار کند.
 *  - window.print() فقط از event handler (دکمهٔ چاپ) با دو rAF صدا زده می‌شود —
 *    هرگز در effect.
 *  - سقف محتوا: یک برگ A4 (سربرگ + ۳ ستون + فوتر).
 *  - پالت چاپ: فقط emerald/amber/teal + خنثی با print-color-adjust: exact.
 */

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
    .bro-page {
      width: 210mm;
      height: 297mm;
      box-sizing: border-box;
      padding: 0;
      background: #fff;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      color: #1f2937;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .bro-controls {
      display: none !important;
    }
    .bro-hero {
      position: relative;
      height: 52mm;
      overflow: hidden;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .bro-hero img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .bro-hero::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(4,120,87,0.88) 0%, rgba(4,120,87,0.25) 55%, rgba(4,120,87,0.05) 100%);
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .bro-hero-caption {
      position: absolute;
      bottom: 4mm;
      right: 9mm;
      left: 9mm;
      z-index: 2;
      color: #fff;
    }
    .bro-title {
      font-size: 20pt;
      font-weight: 900;
      line-height: 1.35;
      margin: 0;
    }
    .bro-subtitle {
      font-size: 11.5pt;
      font-weight: 700;
      margin: 1.5mm 0 0;
      color: #d1fae5;
    }
    .bro-body {
      flex: 1;
      display: grid;
      grid-template-columns: 1.15fr 1fr 0.85fr;
      gap: 0;
      padding: 7mm 9mm 4mm;
      box-sizing: border-box;
    }
    .bro-col {
      padding: 0 5mm;
      display: flex;
      flex-direction: column;
      gap: 3.5mm;
      min-width: 0;
    }
    .bro-col + .bro-col { border-right: 0.35mm solid #e5e7eb; }
    .bro-col:first-child { padding-right: 0; }
    .bro-col:last-child { padding-left: 0; }
    .bro-col-title {
      display: flex;
      align-items: center;
      gap: 2mm;
      font-size: 13pt;
      font-weight: 900;
      color: #047857;
      margin: 0 0 1mm;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .bro-col-title .dot {
      width: 3.4mm;
      height: 3.4mm;
      border-radius: 999px;
      background: #f59e0b;
      flex-shrink: 0;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .bro-item {
      display: flex;
      align-items: flex-start;
      gap: 2.2mm;
      font-size: 10pt;
      font-weight: 600;
      line-height: 1.75;
      color: #374151;
    }
    .bro-item .tick {
      width: 4.2mm;
      height: 4.2mm;
      margin-top: 1.1mm;
      border-radius: 999px;
      background: #d1fae5;
      color: #047857;
      font-size: 7pt;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .bro-step {
      display: flex;
      align-items: flex-start;
      gap: 2.4mm;
      padding: 2.6mm 3mm;
      border: 0.35mm solid #d1fae5;
      border-radius: 2.5mm;
      background: #f0fdf9;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .bro-step .num {
      width: 5.4mm;
      height: 5.4mm;
      border-radius: 999px;
      background: #047857;
      color: #fff;
      font-size: 9pt;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .bro-step .t {
      font-size: 9.5pt;
      font-weight: 800;
      color: #065f46;
      line-height: 1.6;
      margin: 0;
    }
    .bro-step .d {
      font-size: 8pt;
      font-weight: 600;
      color: #6b7280;
      line-height: 1.6;
      margin: 0.4mm 0 0;
    }
    .bro-arrow {
      text-align: center;
      color: #f59e0b;
      font-size: 9pt;
      font-weight: 900;
      line-height: 1;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .bro-install {
      padding: 3mm 3.4mm;
      border: 0.35mm solid #fef3c7;
      border-radius: 2.5mm;
      background: #fffbeb;
      font-size: 8.6pt;
      font-weight: 600;
      line-height: 1.8;
      color: #374151;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .bro-install b { color: #92400e; }
    .bro-foot {
      border-top: 0.5mm solid #d1fae5;
      background: #f0fdf9;
      padding: 3.4mm 9mm;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 4mm;
      font-size: 9pt;
      font-weight: 800;
      color: #047857;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .bro-foot .en {
      direction: ltr;
      font-family: ui-sans-serif, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
      font-weight: 800;
      color: #0f766e;
    }
  }
`;

/** دکمهٔ چاپ از event handler — دو فریم صبر تا layout شیت بنشیند */
function triggerPrint() {
  requestAnimationFrame(() => requestAnimationFrame(() => window.print()));
}

export function BrochureSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  const sheet = (
    <div className="print-sheet">
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />
      <div className="bro-page" dir="rtl" lang="fa">
        {/* نوار کنترل — فقط روی صفحه، در چاپ مخفی */}
        <div className="bro-controls" style={{ display: "none" }}>
          <button type="button" className="print:hidden" onClick={triggerPrint}>چاپ</button>
          <button type="button" className="print:hidden" onClick={onClose}>بستن</button>
        </div>

        {/* سربرگ: تصویر برند با برش ظریف */}
        <div className="bro-hero">
          <img src="/og-image.png" alt="ویژن‌وان — جزوه‌های تعاملی زبان انگلیسی" />
          <div className="bro-hero-caption">
            <p className="bro-title">ویژن‌وان 🦉</p>
            <p className="bro-subtitle">جزوه‌های تعاملی زبان انگلیسی ۷ تا ۱۲</p>
          </div>
        </div>

        {/* بدنه: سه ستون */}
        <div className="bro-body">
          {/* چرا ویژن‌وان؟ */}
          <div className="bro-col">
            <h2 className="bro-col-title"><span className="dot" aria-hidden />چرا ویژن‌وان؟</h2>
            <p className="bro-item"><span className="tick" aria-hidden>✓</span>رایگان و بدون تبلیغ — هیچ پرداختی و هیچ بنر مزاحمی وجود ندارد</p>
            <p className="bro-item"><span className="tick" aria-hidden>✓</span>بازی و آزمون و دستیار هوشمند برای هر درس</p>
            <p className="bro-item"><span className="tick" aria-hidden>✓</span>آفلاین کار می‌کند — با اینترنت ضعیف مدرنه هم باز می‌شود</p>
            <p className="bro-item"><span className="tick" aria-hidden>✓</span>فقط برای نوجوان‌ها — بدون ردیاب و بدون تبلیغ هدفمند</p>
          </div>

          {/* راهنمای معلم */}
          <div className="bro-col">
            <h2 className="bro-col-title"><span className="dot" aria-hidden />راهنمای معلم</h2>
            <div className="bro-step">
              <span className="num" aria-hidden>۱</span>
              <div>
                <p className="t">ساخت کلاس</p>
                <p className="d">از بخش «کلاس» در اپ، کلاس مجازی رایگان بسازید</p>
              </div>
            </div>
            <p className="bro-arrow" aria-hidden>↓</p>
            <div className="bro-step">
              <span className="num" aria-hidden>۲</span>
              <div>
                <p className="t">اشتراک کد ۶رقمی</p>
                <p className="d">کد را روی تخته بنویسید؛ دانش‌آموزان با همان کد می‌پیوندند</p>
              </div>
            </div>
            <p className="bro-arrow" aria-hidden>↓</p>
            <div className="bro-step">
              <span className="num" aria-hidden>۳</span>
              <div>
                <p className="t">تکلیف و آزمون زنده</p>
                <p className="d">تکلیف بدهید، آزمون زنده بگیرید و پیشرفت همه را ببینید</p>
              </div>
            </div>
          </div>

          {/* نصب روی گوشی */}
          <div className="bro-col">
            <h2 className="bro-col-title"><span className="dot" aria-hidden />نصب روی گوشی</h2>
            <div className="bro-install">
              <p style={{ margin: "0 0 1.5mm" }}><b>کروم (اندروید):</b> منوی ⋮ ← «Add to Home screen»</p>
              <p style={{ margin: 0 }}><b>سافاری (آیفون):</b> دکمهٔ اشتراک ⬆️ ← «Add to Home Screen»</p>
            </div>
            <p className="bro-item" style={{ fontSize: "8.6pt", color: "#6b7280" }}>
              بعد از نصب، ویژن‌وان مثل یک اپ واقعی تمام‌صفحه باز می‌شود و آفلاین هم کار می‌کند.
            </p>
          </div>
        </div>

        {/* فوتر بروشور */}
        <div className="bro-foot">
          <span>ویژن‌وان — رایگان، امن و آفلاین</span>
          <span className="en">vision-one — یادگیری انگلیسی با بازی</span>
        </div>
      </div>
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
            <DialogTitle className="text-right">بروشور معرفی ویژن‌وان 🖨️</DialogTitle>
            <DialogDescription className="text-right text-[12px] leading-6">
              بروشور یک‌صفحه‌ای A4 ویژهٔ معلم‌ها: معرفی اپ، راهنمای سه‌گامی کلاس مجازی و راهنمای نصب.
              با دکمهٔ چاپ می‌توانید پرینت بگیرید یا خروجی PDF ذخیره کنید.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={triggerPrint} className="min-h-11 gap-1.5 print:hidden">
              <Printer size={15} aria-hidden />
              چاپ / ذخیره PDF
            </Button>
            <Button variant="outline" onClick={onClose} className="min-h-11 print:hidden">
              بستن
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* شیت چاپ — مستقیم روی body تا از overflow دیالوگ فرار کند */}
      {createPortal(sheet, document.body)}
    </>
  );
}
