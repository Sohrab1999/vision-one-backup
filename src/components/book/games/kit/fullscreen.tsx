"use client";

/**
 * اورلی تمام‌صفحهٔ بازی — فاز FS2 نقشه راه تمام‌صفحه (docs/fullscreen-roadmap.md).
 *
 * الگو از پایلوت مار و پله (FS1-02) استخراج شد تا به ۱۴ بازی دیگر تعمیم یابد:
 * - پورتال به body (بیرون از wrapper اپ) — هدر/فوتر سایت زیر اورلی می‌مانند
 * - قفل اسکرول html + inert روی wrapper اپ (body > div.min-h-screen) —
 *   هدر/فوتر از tab و صفحه‌خوان خارج می‌شوند (a11y)
 * - فوکوس اولیه روی ریشهٔ اورلی (outline-none — فقط نقطهٔ ورود کیبورد) + cleanup کامل
 * - ارتفاع 100dvh — در موبایل با نوار آدرس پویا هم‌گام می‌ماند (FN1: صفر اسکرول صفحه)
 * - pointer-events:auto صریح — اگر اورلی داخل یک دیالوگ مودال رادیکس مانت شود (دوئل آنلاین —
 *   FS3)، رادیکس روی body مقدار pointer-events:none می‌گذارد؛ این صریح‌سازی کلیک‌های
 *   اورلی را زنده نگه می‌دارد و صفحهٔ پشت همچنان قفل تعامل می‌ماند
 *
 * قرارداد مصرف (DoD هر بازی در FS2):
 * - فقط فازهای playing/done داخل اورلی می‌روند؛ setup بدون تغییر می‌ماند (FN5)
 * - داخل اورلی: GameShell با fill (به‌علاوهٔ wrapper هم‌خوان با FS_PAD_PLAY) یا
 *   نمای done با FS_PAD_DONE و اسکرول داخلی مجاز اگر محتوا ذاتاً بلند است
 *   (crossword/wordsearch — مرز فاز FS2) — اسکرول صفحه ممنوع می‌ماند
 * - دیالوگ‌ها (GameExitGuard/TutorialOverlay/...) داخل اورلی رندر شوند تا روی آن بنشینند
 * - بازی‌های تخته‌ای با چیدمان دوستونهٔ دسکتاپ: سقف عرض و media دستی px-مبنا داخل
 *   بلاک CSS خود بازی (درس FS1-R2 — mix کردن با lg: ریم‌مبنای تیلویند ممنوع)
 */

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * FS3-01 — CSS انیمیشن ورود/خروج اورلی:
 * - ورود: fade + zoom ریز ریشهٔ اورلی (۲۲۰ms ease-out نمایی)
 * - خروج: خود اورلی با آن‌مانت حذف می‌شود (بازی کنترل مانت است)؛ به‌جایش در cleanup
 *   (layout effect — پیش از برداشتن DOM) صفحهٔ پشت با fade نرم «آشکار» می‌شود
 *   (.fs-reveal روی wrapper اپ) — حس تعویض نرم بدون دست زدن به هیچ بازی
 * - گارد reduced-motion روی هر سه قاعده (CSS + JS) — صفر افکت برای کاربر حساس
 */
const FS_OVERLAY_CSS = `
@keyframes fs-enter { from { opacity: 0; transform: scale(0.988); } }
@keyframes fs-reveal { from { opacity: 0.35; } }
.fs-enter { animation: fs-enter 220ms cubic-bezier(0.16, 1, 0.3, 1); }
.fs-reveal { animation: fs-reveal 240ms ease-out; }
@media (prefers-reduced-motion: reduce) {
  .fs-enter, .fs-reveal { animation: none !important; }
}
`;

/**
 * useLayoutEffect ایزومورفیک — cleanup خروج باید «قبل از» حذف DOM اورلی اجرا شود
 * (passive effect دیر است و صفحه یک فریم بدون fade عوض می‌شود)؛ روی سرور بی‌اثر.
 */
const useIsoLayoutEffect =
  typeof document !== "undefined" ? useLayoutEffect : useEffect;

/**
 * wrapper استاندارد نمای playing داخل اورلی — همان padding پایلوت؛
 * عرض و چیدمان داخلی را خود بازی تعیین می‌کند (سقف عرض در بلاک CSS px-مبنا یا max-w-* تیلویند)
 */
export const FS_PAD_PLAY =
  "h-full w-full px-2 pb-[max(10px,env(safe-area-inset-bottom))] pt-[max(8px,env(safe-area-inset-top))] sm:px-4";

/**
 * wrapper استاندارد نمای done داخل اورلی — اسکرول داخلی مجاز (کارنامه ممکن است بلند باشد)
 */
export const FS_PAD_DONE =
  "h-full overflow-y-auto px-3 pb-[max(16px,env(safe-area-inset-bottom))] pt-4";

export function FsOverlay({
  children,
  label = "نمای تمام‌صفحهٔ بازی",
}: {
  children: ReactNode;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    const bg = document.querySelector<HTMLElement>("body > div.min-h-screen");
    const bgWasInert = bg?.inert ?? false;
    if (bg) bg.inert = true;
    ref.current?.focus({ preventScroll: true });
    return () => {
      html.style.overflow = prevOverflow;
      if (bg) bg.inert = bgWasInert;
    };
  }, []);

  // FS3-01 — انیمیشن خروج: آشکارسازی نرم صفحهٔ پشت اورلی هنگام آن‌مانت
  // (بستن کارنامه / نگهبان خروج). اگر اورلی دیگری بلافاصله مانت شود (playing→done)،
  // انیمیشن زیر آن اجرا می‌شود و بی‌آزار است؛ پاک‌سازی با animationend + fallback.
  useIsoLayoutEffect(() => {
    return () => {
      try {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const bg = document.querySelector<HTMLElement>("body > div.min-h-screen");
        if (!bg) return;
        bg.classList.remove("fs-reveal");
        void bg.offsetWidth; // ری‌استارت انیمیشن اگر از قبل در جریان بود
        bg.classList.add("fs-reveal");
        const clear = () => bg.classList.remove("fs-reveal");
        bg.addEventListener("animationend", clear, { once: true });
        window.setTimeout(clear, 360);
      } catch {
        /* محیط بدون DOM — بی‌اهمیت */
      }
    };
  }, []);

  if (typeof document === "undefined") return null;
  return createPortal(
    <>
      <style>{FS_OVERLAY_CSS}</style>
      <div
        ref={ref}
        tabIndex={-1}
        aria-label={label}
        className="fs-enter fixed inset-0 z-50 bg-background outline-none"
        style={{ height: "100dvh", pointerEvents: "auto" }}
      >
        {children}
      </div>
    </>,
    document.body,
  );
}
