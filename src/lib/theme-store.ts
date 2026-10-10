"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny external store for theme (dark class on <html>).
 * Applies the persisted preference at module load (client only).
 */

const listeners = new Set<() => void>();

if (typeof document !== "undefined") {
  try {
    // فاز ۷ — پیش‌فرض سیستمی: اگر کاربر انتخابی ذخیره نکرده باشد، از
    // prefers-color-scheme سیستم‌عامل پیروی می‌شود (روشن → کلاس dark حذف).
    const stored = localStorage.getItem("visionone:theme");
    const prefersLight =
      typeof matchMedia === "function" && matchMedia("(prefers-color-scheme: light)").matches;
    if (stored === "light" || (!stored && prefersLight)) {
      document.documentElement.classList.remove("dark");
    }
  } catch {
    /* noop */
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): boolean {
  if (typeof document === "undefined") return true;
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot(): boolean {
  return true;
}

export function useIsDark(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setDark(next: boolean) {
  document.documentElement.classList.toggle("dark", next);
  try {
    localStorage.setItem("visionone:theme", next ? "dark" : "light");
  } catch {
    /* noop */
  }
  listeners.forEach((l) => l());
}
