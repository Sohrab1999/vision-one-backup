"use client";

import { useEffect } from "react";

/**
 * ثبت سرویس‌ورکر PWA — به‌صورت بی‌صدا شکست می‌خورد (بدون مزاحمت برای کاربر).
 * تنها در بستر امن (https یا localhost) و پس از رویداد window.load ثبت می‌شود.
 */
export function PwaRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const { protocol, hostname } = window.location;
    const isSecureContext =
      protocol === "https:" ||
      hostname === "localhost" ||
      hostname === "127.0.0.1";
    if (!isSecureContext) return;

    let cancelled = false;

    const register = () => {
      if (cancelled) return;
      navigator.serviceWorker.register("/sw.js").catch(() => {
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
      window.removeEventListener("load", register);
    };
  }, []);

  return null;
}

export default PwaRegister;
