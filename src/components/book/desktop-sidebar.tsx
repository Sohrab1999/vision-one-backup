"use client";

import { useState } from "react";
import { BookOpen, Keyboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV, type ViewId } from "./app-header";

/**
 * سایدبار دسکتاپ (بهینه‌سازی صفحه‌نمایش بزرگ):
 * - فقط از بریک‌پوینت xl (۱۲۸۰px) ظاهر می‌شود؛ زیر آن هدرِ قرصی کار می‌کند
 * - ریل ثابت راست (RTL) با عرض ۷۲px که با hover/focus تا ۲۳۶px باز می‌شود
 * - باز/بسته شدن با state JS است نه فقط :hover CSS — چون Tailwind 4 باید /
 *   hover: را داخل @media (hover:hover) می‌گذارد و در برخی محیط‌ها از کار
 *   می‌افتد؛ این‌طرف بهتر رفتار یکنواخت دارد
 * - باز شدن روی محتوا (overlay) است — محتوای صفحه هیچ‌وقت جابه‌جا نمی‌شود
 * - میان‌برهای Alt+1..9 در title هر آیتم اعلام می‌شوند (راهنمای پایین ریل هم هست)
 */
export function DesktopSidebar({
  view,
  onNavigate,
}: {
  view: ViewId;
  onNavigate: (v: ViewId) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 right-0 z-[60] hidden flex-col border-l bg-background/95 shadow-[-8px_0_24px_-12px_rgb(0_0_0/0.12)] backdrop-blur-md transition-[width] duration-200 ease-out xl:flex",
        open ? "w-[236px]" : "w-[72px]",
      )}
      aria-label="ناوبری دسکتاپ"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        // فقط وقتی فوکوس کاملاً از ریل خارج شد ببند (event.relatedTarget)
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      {/* برند — کلیک = بازگشت به جلد */}
      <button
        type="button"
        onClick={() => onNavigate("home")}
        className="flex h-14 w-full shrink-0 items-center gap-3 overflow-hidden border-b px-[24px] text-right transition-colors hover:bg-muted"
        aria-label="جلد کتاب"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25">
          <BookOpen size={18} />
        </span>
        <span className="sidebar-label min-w-0 whitespace-nowrap text-[13px] font-black leading-tight">
          کتابخانه ویژن
          <span className="block text-[9.5px] font-medium text-muted-foreground">
            ناوبری سریع
          </span>
        </span>
      </button>

      {/* فهرست ناوبری — ۱۸ آیتم، اسکرول عمودی هوشمند */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 [scrollbar-width:thin]">
        <ul className="space-y-0.5 px-2">
          {NAV.map((item, i) => {
            const active =
              view === item.id || (view === "chapter" && item.id === "contents");
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={active ? "page" : undefined}
                  title={`${item.label}${i < 9 ? ` — میان‌بر: Alt+${i + 1}` : ""}`}
                  className={cn(
                    "flex h-10 w-full items-center gap-3 overflow-hidden rounded-xl px-3 text-right text-[13px] font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground focus-visible:outline-none",
                  )}
                >
                  <item.icon size={18} className="shrink-0" aria-hidden />
                  <span className="sidebar-label min-w-0 truncate whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* راهنمای میان‌برها — فقط وقتی ریل باز است دیده می‌شود */}
      <div className="shrink-0 overflow-hidden border-t px-3 py-2.5">
        <div className="sidebar-label flex items-start gap-2 whitespace-nowrap text-[10px] leading-4 text-muted-foreground">
          <Keyboard size={13} className="mt-0.5 shrink-0" aria-hidden />
          <span>
            <kbd className="rounded border bg-muted px-1 font-sans text-[9.5px]">Alt</kbd>
            {" + "}
            <kbd className="rounded border bg-muted px-1 font-sans text-[9.5px]">۱..۹</kbd>{" "}
            پرش سریع
            <span className="block">
              <kbd className="rounded border bg-muted px-1 font-sans text-[9.5px]">Ctrl</kbd>
              {" + "}
              <kbd className="rounded border bg-muted px-1 font-sans text-[9.5px]">K</kbd>{" "}
              جست‌وجو
            </span>
          </span>
        </div>
      </div>
    </aside>
  );
}
