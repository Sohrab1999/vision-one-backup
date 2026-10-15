"use client";

/**
 * ناوبری پایین موبایل (Task 23 — Mobile UX)
 * ─────────────────────────────────────────────────────────────
 * پیش از این، تنها ناوبری موبایل «نوار قرصی افقی ۱۸ آیتمی» داخل هدر بود:
 *  - ~۱۲ مقصد بیرون از دید → هانتینگ با اسکرول لنگ
 *  - قرص‌ها ~۳۰px (زیر حد ۴۴px اپل) و هدر تا ~۱۰۰px رشد می‌کرد
 *  - هیچ افوردنس «قابل اسکرول بودن» نداشت (اسکرول‌بار عمداً مخفی)
 *
 * الگوی جدید: Bottom Navigation با ۵ مقصد پرکاربرد + کشوی «بیشتر» (vaul Drawer)
 * برای ۱۳ مقصد بقیه + ردیف اقدامات کم‌تکرار (نصب PWA / پوسته) — پروگرسیو دیسکلوژر.
 *  - min-h 56px هر زبانه، safe-area-inset-bottom رعایت می‌شود
 *  - هنگام فوکوس روی input/textarea (کیبورد نرم) خودکار مخفی می‌شود
 *  - در md+ رندر نمی‌شود (هدر قرصی md..xl و ریل xl+ برقرارند)
 */

import { useEffect, useState } from "react";
import { MoreHorizontal, Smartphone, Sun, Moon } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useIsDark, setDark } from "@/lib/theme-store";
import { NAV, type ViewId } from "./app-header";
import { OPEN_INSTALL_EVENT } from "./pwa-install-guide";

/** ۵ مقصد اصلی حلقهٔ کاربر موبایل: خواندن → واژه → آزمون → بازی + خانه */
const TABS: { id: ViewId; label: string }[] = [
  { id: "home", label: "خانه" },
  { id: "contents", label: "فهرست" },
  { id: "vocab", label: "واژگان" },
  { id: "quiz", label: "آزمون" },
  { id: "games", label: "بازی‌ها" },
];

const TAB_IDS = new Set(TABS.map((t) => t.id));

export function MobileNav({
  view,
  onNavigate,
}: {
  view: ViewId;
  onNavigate: (v: ViewId) => void;
}) {
  const [open, setOpen] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const dark = useIsDark();

  // کیبورد نرم باز شد؟ ناوبری پایین جمع شود تا فیلد مدفون نشود
  useEffect(() => {
    function onFocusChange(e: FocusEvent) {
      const t = e.target as HTMLElement | null;
      const isField =
        !!t &&
        (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      setKeyboardOpen(isField);
    }
    document.addEventListener("focusin", onFocusChange);
    document.addEventListener("focusout", onFocusChange);
    return () => {
      document.removeEventListener("focusin", onFocusChange);
      document.removeEventListener("focusout", onFocusChange);
    };
  }, []);

  function go(v: ViewId) {
    setOpen(false); // بستن کشو بعد از ناوبری
    onNavigate(v);
  }

  const rest = NAV.filter((i) => !TAB_IDS.has(i.id));

  return (
    <nav
      aria-label="ناوبری پایین"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ease-out md:hidden",
        keyboardOpen && "translate-y-full",
      )}
    >
      <div className="border-t bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg supports-[backdrop-filter]:bg-background/85">
        <div className="mx-auto grid max-w-md grid-cols-6">
          {TABS.map((tab) => {
            const item = NAV.find((i) => i.id === tab.id);
            if (!item) return null;
            const Icon = item.icon;
            const active =
              view === tab.id || (view === "chapter" && tab.id === "contents");
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => go(tab.id)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-[56px] flex-col items-center justify-center gap-0.5 px-0.5 pt-1 text-[10px] font-bold transition-all active:scale-95",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon size={20} aria-hidden />
                <span className="leading-none">{tab.label}</span>
                <span
                  aria-hidden
                  className={cn(
                    "h-1 w-1 rounded-full transition-colors",
                    active ? "bg-primary" : "bg-transparent",
                  )}
                />
              </button>
            );
          })}

          {/* زبانهٔ «بیشتر» — کشوی همهٔ بخش‌ها */}
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <button
                type="button"
                aria-label="همهٔ بخش‌ها"
                aria-expanded={open}
                className={cn(
                  "flex min-h-[56px] flex-col items-center justify-center gap-0.5 px-0.5 pt-1 text-[10px] font-bold transition-all active:scale-95",
                  open ? "text-primary" : "text-muted-foreground",
                )}
              >
                <MoreHorizontal size={20} aria-hidden />
                <span className="leading-none">بیشتر</span>
                <span
                  aria-hidden
                  className={cn(
                    "h-1 w-1 rounded-full transition-colors",
                    open ? "bg-primary" : "bg-transparent",
                  )}
                />
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-md px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-1">
                <DrawerTitle className="text-center text-xs font-bold text-muted-foreground">
                  همهٔ بخش‌ها
                </DrawerTitle>
                <div className="mt-3 grid grid-cols-4 gap-1.5">
                  {rest.map((item) => {
                    const active =
                      view === item.id ||
                      (view === "chapter" && item.id === "contents");
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => go(item.id)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex min-h-[76px] flex-col items-center justify-center gap-1.5 rounded-2xl border px-1 py-2 text-[11px] font-bold leading-tight transition-all active:scale-95",
                          active
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "border-border/60 bg-card text-muted-foreground",
                        )}
                      >
                        <item.icon size={19} aria-hidden />
                        <span className="text-center">{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* اقدامات کم‌تکرار — از هدر موبایل به اینجا منتقل شدند (پروگرسیو دیسکلوژر) */}
                <div className="mt-3 flex items-center gap-2 border-t pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      window.dispatchEvent(new CustomEvent(OPEN_INSTALL_EVENT));
                    }}
                    className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border bg-muted/40 text-xs font-bold active:scale-[0.98]"
                  >
                    <Smartphone size={15} aria-hidden />
                    نصب روی گوشی
                  </button>
                  <button
                    type="button"
                    onClick={() => setDark(!dark)}
                    className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border bg-muted/40 text-xs font-bold active:scale-[0.98]"
                  >
                    {dark ? <Sun size={15} aria-hidden /> : <Moon size={15} aria-hidden />}
                    {dark ? "پوسته روشن" : "پوسته تیره"}
                  </button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </nav>
  );
}
