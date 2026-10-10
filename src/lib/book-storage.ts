"use client";

/**
 * book-storage — ذخیره‌سازی scoped برای هر کتاب + استور بیرونیِ «کتاب فعال».
 *
 * پیشرفت واژگان/آزمون هر جزوه در کلید مستقل خودش نگه داشته می‌شود:
 *   visionone:book:<bookId>:<name>   ← کلید جدید (scoped)
 *   visionone:<name>                 ← کلید قدیمی (متعلق به ویژن وان) — یک‌بار مهاجرت می‌شود
 *
 * «کتاب فعال» هم یک external store است (useSyncExternalStore-friendly):
 *   getServerSnapshot → null (قفسه)  ·  getSnapshot → از localStorage با lazy-init
 * به این ترتیب BookProvider بدون هیچ useEffect کار می‌کند (قانون set-state-in-effect).
 */

import type { BookId } from "@/data/books/types";
import { getBookMeta } from "@/data/books/registry";

const ACTIVE_KEY = "visionone:active-book";

// ─── استور بیرونی کتاب فعال ───

let snapshotLoaded = false;
let activeBookId: BookId | null = null;
const bookListeners = new Set<() => void>();

function loadSnapshot(): void {
  snapshotLoaded = true;
  try {
    const saved = localStorage.getItem(ACTIVE_KEY);
    if (saved) {
      const meta = getBookMeta(saved as BookId);
      if (meta && meta.available) activeBookId = meta.id;
    }
  } catch {
    /* noop */
  }
}

/** سمت کلاینت — بعد از اولین خواندن، ثابت و پایدار است */
export function getActiveBookSnapshot(): BookId | null {
  if (!snapshotLoaded) loadSnapshot();
  return activeBookId;
}

/** سمت سرور — همیشه قفسه (null) */
export function getServerBookSnapshot(): BookId | null {
  return null;
}

export function subscribeActiveBook(cb: () => void): () => void {
  bookListeners.add(cb);
  return () => {
    bookListeners.delete(cb);
  };
}

/** ورود/تغییر کتاب: ثبت در localStorage + ریست کَش استورهای scoped + اطلاع به مشترکین */
export function setActiveBookId(id: BookId) {
  if (snapshotLoaded && activeBookId === id) return;
  snapshotLoaded = true;
  activeBookId = id;
  try {
    localStorage.setItem(ACTIVE_KEY, id);
  } catch {
    /* noop */
  }
  resetScopedStores();
  bookListeners.forEach((l) => l());
}

// ─── کلیدهای scoped پیشرفت ───

export function scopedKey(name: string): string {
  return `visionone:book:${activeBookId ?? "vision-one"}:${name}`;
}

export function legacyKey(name: string): string {
  return `visionone:${name}`;
}

/** خواندن scoped با مهاجرت خودکار یک‌باره از کلید قدیمی (داده‌های فعلی = ویژن وان) */
export function readScoped(name: string): string | null {
  try {
    const fresh = localStorage.getItem(scopedKey(name));
    if (fresh !== null) return fresh;
    const legacy = localStorage.getItem(legacyKey(name));
    if (legacy !== null) {
      try {
        localStorage.setItem(scopedKey(name), legacy);
      } catch {
        /* noop */
      }
      return legacy;
    }
    return null;
  } catch {
    return null;
  }
}

export function writeScoped(name: string, value: string) {
  try {
    localStorage.setItem(scopedKey(name), value);
  } catch {
    /* noop */
  }
}

export function removeScoped(name: string) {
  try {
    localStorage.removeItem(scopedKey(name));
  } catch {
    /* noop */
  }
}

// ─── رجیستری reset کَش استورها ───
const resets = new Set<() => void>();

export function registerScopedReset(fn: () => void): () => void {
  resets.add(fn);
  return () => {
    resets.delete(fn);
  };
}

export function resetScopedStores() {
  resets.forEach((fn) => fn());
}
