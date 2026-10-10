"use client";

/**
 * گزارش‌ده «Web Vitals» — فاز ۱۱ (استانداردهای وب ۲۰۲۶).
 *
 * 🎯 بودجهٔ کارایی پروژه (هر صفحه، شبکهٔ متوسط):
 *   LCP  < 2500ms   — بزرگ‌ترین عنصر محتوایی تا ۲٫۵ ثانیه نقش ببندد
 *   INP  < 200ms    — طولانی‌ترین تعامل پاسخ‌گو باشد
 *   CLS  < 0.1      — پرش چیدمان حداقلی
 *
 * سازوکار: در mount (یک‌بار — گارد ماژولی) سه PerformanceObserver سبک بسته می‌شود:
 *   • LCP  → 'largest-contentful-paint' با buffered:true (آخرین entry = LCP نهایی)
 *   • CLS  → 'layout-shift' بدون hadRecentInput (فقط شیفت‌های واقعی)
 *   • INP~ → 'event' با durationThreshold:40 — ماکسیمم طول رویداد تعاملی
 *     (تقریب INP؛ INP دقیق بر پایهٔ interaction-id سمت مرورگر است)
 *
 * گزارش: پس از نخستین visibilitychange→hidden یا حداکثر ۱۵ ثانیه، یک‌بار
 * POST /api/client-log با level:"perf" — شکست شبکه/۴۰۴/۴۲۹ کاملاً ساکت است
 * (تله‌متری هرگز نباید UX را خراب کند). همهٔ اعداد گرد شده‌اند و پرچم بودجه
 * در extra می‌آید تا سمت سرور/داشبورد بدون محاسبه قابل مقایسه باشد.
 */

import { useEffect } from "react";

/** گارد ماژولی — در طول عمر صفحه فقط یک گزارش (StrictMode/دابل‌افکت هم نقض نمی‌شود) */
let reported = false;

export function PerfReporter() {
  useEffect(() => {
    if (reported) return;

    let lcp = 0;
    let cls = 0;
    let inp = 0;
    const observers: PerformanceObserver[] = [];
    const controller = new AbortController();
    let timer = 0;

    /** ثبت امن یک observer — مرورگرهایی که type را نمی‌شناسند را نمی‌شکند */
    const observe = (
      type: string,
      opts: Record<string, unknown>,
      cb: (entries: PerformanceEntryList) => void,
    ) => {
      try {
        const po = new PerformanceObserver((list) => cb(list.getEntries()));
        // durationThreshold در تایپ PerformanceObserverInit نیست ولی در زمان اجرا معتبر است
        po.observe({ type, buffered: true, ...opts } as PerformanceObserverInit & { durationThreshold?: number });
        observers.push(po);
      } catch {
        /* نوع در این مرورگر پشتیبانی نمی‌شود — ساکت رد شو */
      }
    };

    observe(
      "largest-contentful-paint",
      {},
      (entries) => {
        const last = entries[entries.length - 1];
        if (last) lcp = last.startTime;
      },
    );

    observe(
      "layout-shift",
      {},
      (entries) => {
        for (const e of entries) {
          // شیفت پس از ورودی کاربر خطای طراح نیست (پرشِ اسکرول/کلیک)
          if (!(e as PerformanceEntry & { hadRecentInput?: boolean }).hadRecentInput) {
            cls += (e as PerformanceEntry & { value?: number }).value ?? 0;
          }
        }
      },
    );

    observe(
      "event",
      { durationThreshold: 40 },
      (entries) => {
        for (const e of entries) {
          if (e.duration > inp) inp = e.duration;
        }
      },
    );

    const send = () => {
      if (reported) return;
      reported = true;
      for (const po of observers) {
        try {
          po.disconnect();
        } catch {
          /* noop */
        }
      }
      window.removeEventListener("visibilitychange", onHidden);
      window.clearTimeout(timer);
      const lcpR = Math.round(lcp);
      const clsR = Math.round(cls * 1000) / 1000;
      const inpR = Math.round(inp);
      try {
        void fetch("/api/client-log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          keepalive: true,
          signal: controller.signal,
          body: JSON.stringify({
            level: "perf",
            message: "vitals",
            extra: {
              lcp: lcpR,
              cls: clsR,
              inp: inpR,
              href: location.pathname,
              // پرچم بودجه (۱=داخل سقف) — مسیر client-log فقط مقدار رشته‌ای می‌پذیرد
              // (extra تخت ≤۵ کلید)، پس بودجه به‌جای آبجکت به شکل فشرده رشته‌ای می‌رود
              budget: `lcp:${lcpR < 2500 ? 1 : 0},cls:${clsR < 0.1 ? 1 : 0},inp:${inpR < 200 ? 1 : 0}`,
            },
          }),
        }).catch(() => {
          /* ساکت — تله‌متری است */
        });
      } catch {
        /* ساکت */
      }
    };

    const onHidden = () => {
      if (document.visibilityState === "hidden") send();
    };

    window.addEventListener("visibilitychange", onHidden);
    // فالبک — کاربری که برنمی‌گردد هم گزارشش از دست نرود
    timer = window.setTimeout(send, 15000);

    return () => {
      for (const po of observers) {
        try {
          po.disconnect();
        } catch {
          /* noop */
        }
      }
      window.removeEventListener("visibilitychange", onHidden);
      window.clearTimeout(timer);
      controller.abort();
    };
  }, []);

  return null;
}
