"use client";

/**
 * صف همگام‌سازی آفلاین (فاز ۱۱ — آفلاین‌فرست)
 *
 * درخواست‌های POST/PUT که هنگام قطع اینترنت (یا خطای سرور) شکست می‌خورند اینجا
 * صف می‌شوند و به‌محض برگشت اتصال به‌ترتیبِ قدیم ارسال می‌شوند:
 *   - پاسخ 4xx: «رد نامعتبر» است — همان رکورد دور انداخته می‌شود (دوباره تلاش نمی‌شود)
 *   - پاسخ 5xx یا خطای شبکه: رکورد همان‌جا می‌ماند و حلقه قطع می‌شود
 *   - پس از هر flush موفق، توست فارسی «X مورد آفلاین همگام شد ✓» (فقط اگر sent > 0)
 *
 * ذخیره‌سازی: localStorage با کلید «visionone:offline-queue» (کوشش/خطا با try/catch).
 * سقف صف ۲۰۰ رکورد است — جدیدترین می‌ماند و قدیمی‌ترین‌ها حذف می‌شوند.
 * شنونده‌ها و تایمر ۹۰ ثانیه‌ای در init ماژول (یک‌بار، نه در کامپوننت) نصب می‌شوند.
 */

import { useSyncExternalStore } from "react";
import { toast } from "sonner";

/** کلید عمومی صف — account-sync این کلید را از سیم‌کشی/ادغام سرور مستثنا می‌کند */
export const OFFLINE_QUEUE_KEY = "visionone:offline-queue";

export interface OfflineRequest {
  url: string;
  method: "POST" | "PUT";
  body: unknown;
}

interface QueueItem {
  id: string;
  url: string;
  method: "POST" | "PUT";
  body: unknown;
  at: number;
}

type QueueStatus = { pending: number; online: boolean };

const MAX_ITEMS = 200;
const FLUSH_INTERVAL_MS = 90_000;

// ─── وضعیت ماژول ───

let items: QueueItem[] = [];
let online = true;
let initialized = false;
let flushing = false;
let nextId = 1;
const listeners = new Set<() => void>();
let snapshot: QueueStatus = { pending: 0, online: true };

function emit() {
  const pending = items.length;
  if (snapshot.pending !== pending || snapshot.online !== online) {
    snapshot = { pending, online };
  }
  listeners.forEach((l) => l());
}

function rebuildSnapshot() {
  snapshot = { pending: items.length, online };
}

function isQueueItem(value: unknown): value is QueueItem {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.url === "string" &&
    v.url.startsWith("/") &&
    (v.method === "POST" || v.method === "PUT") &&
    "body" in v
  );
}

/** خواندن صف از localStorage — خرابی/نبود فایل → صف خالی */
function readStorage() {
  try {
    const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
    if (!raw) {
      items = [];
      return;
    }
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      items = parsed
        .filter(isQueueItem)
        .slice(-MAX_ITEMS)
        .map((v, i) => ({
          id: typeof v.id === "string" ? v.id : `q${i}-${Date.now()}`,
          url: v.url,
          method: v.method,
          body: v.body ?? null,
          at: typeof v.at === "number" ? v.at : Date.now(),
        }));
    } else {
      items = [];
    }
  } catch {
    items = [];
  }
}

/** نوشتن صف در localStorage — سهمیهٔ پرشده → قدیمی‌ترین‌ها کنار گذاشته می‌شوند */
function persist() {
  try {
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(items));
  } catch {
    while (items.length > 0) {
      items.shift(); // قدیمی‌ترین را فدا کن تا جدیدترین بماند
      try {
        localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(items));
        return;
      } catch {
        /* باز هم پر است — یک رکورد دیگر حذف می‌شود */
      }
    }
  }
}

// ─── API عمومی ───

/** افزودن درخواست به صف — سقف ۲۰۰ رکورد (جدیدترین می‌ماند) */
export function enqueueOffline(req: OfflineRequest): void {
  if (typeof window === "undefined") return;
  initOfflineQueue();
  if (!req.url || !req.url.startsWith("/")) return; // فقط مسیرهای نسبی همان‌مبدأ
  const item: QueueItem = {
    id: `q${Date.now()}-${nextId++}`,
    url: req.url,
    method: req.method,
    body: req.body ?? null,
    at: Date.now(),
  };
  items.push(item);
  if (items.length > MAX_ITEMS) {
    items = items.slice(items.length - MAX_ITEMS);
  }
  persist();
  emit();
}

/**
 * ارسال صف به‌ترتیب قدیم.
 *  - 2xx → رکورد حذف می‌شود (sent)
 *  - 4xx → رد نامعتبر — رکورد حذف می‌شود (failed)
 *  - 5xx/خطای شبکه → رکورد می‌ماند و حلقه قطع می‌شود
 */
export async function flushOfflineQueue(): Promise<{ sent: number; failed: number }> {
  if (typeof window === "undefined") return { sent: 0, failed: 0 };
  initOfflineQueue();
  if (flushing || !items.length || !online) return { sent: 0, failed: 0 };
  flushing = true;
  let sent = 0;
  let failed = 0;
  try {
    while (items.length) {
      const item = items[0];
      try {
        const res = await fetch(item.url, {
          method: item.method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item.body ?? {}),
        });
        if (res.ok) {
          items.shift();
          sent++;
        } else if (res.status >= 400 && res.status < 500) {
          // رد نامعتبر — دوباره تلاش نمی‌شود
          items.shift();
          failed++;
        } else {
          break; // 5xx — همان‌جا می‌ماند
        }
      } catch {
        break; // خطای شبکه — همان‌جا می‌ماند
      }
      persist();
      emit();
    }
  } finally {
    flushing = false;
  }
  if (sent > 0) {
    toast.success(`${sent.toLocaleString("fa-IR")} مورد آفلاین همگام شد ✓`);
  }
  emit();
  return { sent, failed };
}

/** وضعیت زندهٔ صف برای UI — useSyncExternalStore سازگار با SSR */
export function useOfflineQueueStatus(): QueueStatus {
  return useSyncExternalStore(subscribeStatus, getStatusSnapshot, getServerSnapshot);
}

function subscribeStatus(cb: () => void): () => void {
  initOfflineQueue();
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getStatusSnapshot(): QueueStatus {
  return snapshot;
}

function getServerSnapshot(): QueueStatus {
  return { pending: 0, online: true };
}

// ─── init یک‌بارهٔ ماژول (شنونده‌ها + تایمر ۹۰ ثانیه) ───

function initOfflineQueue(): void {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  online = navigator.onLine;
  readStorage();
  rebuildSnapshot();

  window.addEventListener("online", () => {
    online = true;
    rebuildSnapshot();
    emit();
    void flushOfflineQueue();
  });
  window.addEventListener("offline", () => {
    online = false;
    rebuildSnapshot();
    emit();
  });

  // هر ۹۰ ثانیه اگر چیزی در صف مانده و آنلاینیم و صفحه دیده می‌شود، دوباره تلاش کن
  setInterval(() => {
    if (items.length > 0 && online && document.visibilityState !== "hidden") {
      void flushOfflineQueue();
    }
  }, FLUSH_INTERVAL_MS);
}

if (typeof window !== "undefined") {
  initOfflineQueue();
}
