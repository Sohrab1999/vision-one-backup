"use client";

import { useEffect } from "react";
import { flushOfflineQueue } from "@/lib/offline-queue";

/**
 * ثبت سرویس‌ورکر PWA — به‌صورت بی‌صدا شکست می‌خورد (بدون مزاحمت برای کاربر).
 * تنها در بستر امن (https یا localhost) و پس از رویداد window.load ثبت می‌شود.
 *
 * آفلاین‌فرست (فاز ۱۱):
 *  - صف همگام‌سازی آفلاین هنگام mount و بازگشت اتصال flush می‌شود (توست از خود lib می‌آید).
 *  - ۵ ثانیه پس از ثبت SW (idle)، پیام CACHE_BOOK به SW می‌رود تا chunkهای JS
 *    دیده‌شدهٔ کتاب پیش‌بارگذاری شوند؛ به درخواست COLLECT_SCRIPTSِ SW هم با
 *    performance resource entries همین صفحه پاسخ می‌دهد.
 */
export function PwaRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // صف همگام‌سازی آفلاین: هنگام mount (چند لحظه بعد از بوت) و روی رویداد online
    const flushOnOnline = () => {
      void flushOfflineQueue();
    };
    const mountFlush = setTimeout(() => {
      void flushOfflineQueue();
    }, 2500);
    window.addEventListener("online", flushOnOnline);

    if (!("serviceWorker" in navigator)) {
      return () => {
        window.removeEventListener("online", flushOnOnline);
        clearTimeout(mountFlush);
      };
    }

    const { protocol, hostname } = window.location;
    const isSecureContext =
      protocol === "https:" ||
      hostname === "localhost" ||
      hostname === "127.0.0.1";

    // پاسخ به درخواست SW برای فهرست chunkهای دیده‌شده (پیام COLLECT_SCRIPTS)
    const onSwMessage = (event: MessageEvent) => {
      const data = (event.data ?? {}) as { type?: string };
      if (data.type !== "COLLECT_SCRIPTS") return;
      const port = event.ports?.[0];
      if (!port) return;
      try {
        port.postMessage({ urls: collectScriptUrls() });
      } catch {
        /* noop */
      }
    };
    navigator.serviceWorker.addEventListener("message", onSwMessage);

    if (!isSecureContext) {
      return () => {
        navigator.serviceWorker.removeEventListener("message", onSwMessage);
        window.removeEventListener("online", flushOnOnline);
        clearTimeout(mountFlush);
      };
    }

    let cancelled = false;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    /** فهرست chunkهای JS دیده‌شده در این صفحه از performance resource entries */
    function collectScriptUrls(): string[] {
      try {
        const entries = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
        return entries
          .filter((e) => e.initiatorType === "script" || e.initiatorType === "link" || e.initiatorType === "other")
          .map((e) => e.name)
          .filter((u) => {
            try {
              const parsed = new URL(u, window.location.origin);
              return (
                parsed.origin === window.location.origin &&
                parsed.pathname.startsWith("/_next/static/chunks/") &&
                parsed.pathname.endsWith(".js")
              );
            } catch {
              return false;
            }
          });
      } catch {
        return [];
      }
    }

    /** ۵ ثانیه پس از آماده‌شدن SW (idle)، پیام پیش‌بارگذاری کتاب به SW */
    function scheduleCacheBook(reg: ServiceWorkerRegistration) {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        idleTimer = null;
        try {
          (reg.active ?? navigator.serviceWorker.controller)?.postMessage({ type: "CACHE_BOOK" });
        } catch {
          /* noop */
        }
      }, 5000);
    }

    const register = () => {
      if (cancelled) return;
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => navigator.serviceWorker.ready)
        .then((reg) => {
          if (!cancelled) scheduleCacheBook(reg);
        })
        .catch(() => {
          // ثبت ناموفق — بی‌صدا نادیده گرفته می‌شود
        });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
    }

    return () => {
      cancelled = true;
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener("load", register);
      navigator.serviceWorker.removeEventListener("message", onSwMessage);
      window.removeEventListener("online", flushOnOnline);
      clearTimeout(mountFlush);
    };
  }, []);

  return null;
}

export default PwaRegister;
