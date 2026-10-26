"use client";

/**
 * صف همگام‌سازی آفلاین (فاز ۱۱ — آفلاین‌فرست)
 *
 * درخواست‌های POST/PUT که هنگام قطع اینترنت (یا خطای سرور) شکست می‌خورند اینجا
 * صف می‌شوند و به‌محض برگشت اتصال به‌ترتیبِ قدیم ارسال می‌شوند:
 *   - پاسخ 4xx به‌جز 408/429: «رد نامعتبر» است — همان رکورد دور انداخته می‌شود (دوباره تلاش نمی‌شود)
 *   - پاسخ 408/429: خطای موقتی است — رکورد همان‌جا می‌ماند و چرخهٔ flush قطع می‌شود (G1-a)
 *   - 408/429 با «Retry-After» معتبر (عدد صحیح ثانیه): مکث سراسری تا پایان مهلت هدر
 *     تنظیم می‌شود و هیچ flush تازه‌ای پیش از آن آغاز نمی‌شود (G1-b)
 *   - 408/429 بدون هدر یا با مقدار نامعتبر: بدون fallback حدسی (تصمیم باز D8) — فقط توقف G1-a
 *   - پاسخ 5xx یا خطای شبکه: رکورد همان‌جا می‌ماند و حلقه قطع می‌شود
 *   - پس از هر flush موفق، توست فارسی «X مورد آفلاین همگام شد ✓» (فقط اگر sent > 0)
 *   - شمارندهٔ تلاش‌ها (G1-c مرحلهٔ ۱): هر آیتم صفت اختیاری `tries` دارد — هنگام ساخت ۰ است و
 *     هنگام خواندن نرمال می‌شود (فقط عدد صحیح امن نامنفی معتبر؛ بقیه → ۰)
 *   - شمارش تلاش‌ها (G1-c مرحلهٔ ۲ — تصمیم‌های تأییدشدهٔ مالک): خطای شبکه، 408 و 5xx برای
 *     آیتمِ واقعاً تلاش‌شده (سر صف) `tries` را +۱ می‌کنند؛ 429 معاف است و مکث G1-b آن دقیقاً
 *     حفظ می‌شود؛ آیتم‌های پشت سر صف هرگز شمرده نمی‌شوند؛ مقدار در MAX_TRIES=۱۰ clamp
 *     می‌شود؛ افزایش در مسیرهای break بلافاصله persist می‌شود (بدون افت پس از reload)
 *   - توقف پردازش پس از سقف (G1-c مرحلهٔ ۳ — تصمیم تأییدشدهٔ مالک): در ابتدای هر دور حلقهٔ
 *     پردازش و پیش از هر ارسال شبکه‌ای، سرصفٔ واقعی صف بررسی می‌شود؛ اگر tries نرمال‌شدهٔ آن
 *     ≥ MAX_TRIES باشد (شامل مقادیر بزرگ‌ترِ حفظ‌شدهٔ دادهٔ قدیمی) پردازش همان‌جا متوقف می‌شود —
 *     بدون fetch، بدون حذف یا عبور از آیتم، بدون افزایش شمارنده و بدون persist/توست اضافی؛
 *     FIFO و نگه‌داری آیتم دقیقاً حفظ می‌شود (سیاست نهایی پس از سقف = گام G4، تصمیم آتی مالک)
 *   - قرارداد وضعیت (G1-c مرحلهٔ ۳): `QueueStatus` فیلد مشتق‌شدهٔ `cappedHead` دارد — «آیا
 *     سرصفٔ واقعی صف به سقف تلاش رسیده است؟» — در snapshot اولیه، مقایسه/انتشار، بازسازی و
 *     server snapshot به‌روز می‌شود (بدون API عمومی جدید یا UI جدید)
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
  /** G1-c مرحلهٔ ۱/۲ — شمارندهٔ تلاش‌ها (اختیاری برای سازگاری با داده‌های قدیمی)؛ مرحلهٔ ۲: شبکه/408/5xx آن را تا سقف ۱۰ افزایش می‌دهند، 429 معاف است؛ مرحلهٔ ۳: سرصفٔ سقف‌خورده (≥۱۰) پیش از ارسال پردازش نمی‌شود */
  tries?: number;
}

/**
 * قرارداد داخلی وضعیت صف.
 * G1-c مرحلهٔ ۳ — فیلد مشتق‌شدهٔ `cappedHead`: «آیا سرصفٔ واقعی صف به سقف تلاش رسیده است؟»
 * (بر پایهٔ شرط tries نرمال‌شدهٔ سرصف ≥ MAX_TRIES؛ بدون API عمومی جدید یا UI جدید)
 */
type QueueStatus = { pending: number; online: boolean; cappedHead: boolean };

const MAX_ITEMS = 200;
const FLUSH_INTERVAL_MS = 90_000;
/**
 * G1-c مرحلهٔ ۲ — سقف شمارندهٔ تلاش‌ها (تصمیم تأییدشدهٔ مالک: ۱۰).
 * G1-c مرحلهٔ ۳ — با رسیدن سرصفٔ واقعی صف به این سقف (tries نرمال‌شده ≥ ۱۰، شامل مقادیر
 * بزرگ‌ترِ حفظ‌شدهٔ دادهٔ قدیمی) پردازش صف پیش از هر ارسال شبکه‌ای متوقف می‌شود؛ آیتم نگه
 * داشته می‌شود (بدون حذف/skip/قرنطینه) و وضعیت آن از طریق `cappedHead` در QueueStatus
 * منتشر می‌شود — سیاست نهایی پس از سقف (گام G4) نیازمند تصمیم جداگانهٔ مالک است.
 */
const MAX_TRIES = 10;

// ─── وضعیت ماژول ───

let items: QueueItem[] = [];
let online = true;
let initialized = false;
let flushing = false;
// G1-b — مکث سراسری صف پس از 408/429 همراه با «Retry-After» معتبر (epoch ms؛ ۰ = بدون مکث).
// نبود/نامعتبری هدر → بدون fallback حدسی؛ مقدار fallback هنوز تصمیم باز مالک است (D8 — پیوست D §۲ نقشهٔ راه R-C1).
let pauseUntilMs = 0;
let nextId = 1;
const listeners = new Set<() => void>();
let snapshot: QueueStatus = { pending: 0, online: true, cappedHead: false };

function emit() {
  const pending = items.length;
  const cappedHead = isHeadCapped();
  // G1-c مرحلهٔ ۳ — cappedHead در مقایسه و انتشار تغییرات وضعیت لحاظ می‌شود؛
  // در نبود تغییر، همان snapshot قبلی (هویت پایدار برای useSyncExternalStore) نگه داشته می‌شود
  if (snapshot.pending !== pending || snapshot.online !== online || snapshot.cappedHead !== cappedHead) {
    snapshot = { pending, online, cappedHead };
  }
  listeners.forEach((l) => l());
}

function rebuildSnapshot() {
  snapshot = { pending: items.length, online, cappedHead: isHeadCapped() };
}

/**
 * G1-c مرحلهٔ ۳ — نرمال‌سازی مقدار شمارندهٔ تلاش‌ها (قرارداد مشترک مرحلهٔ ۱):
 * فقط عدد صحیح امن نامنفی معتبر است؛ نبودِ tries در داده‌های قدیمی و هر مقدار دیگر
 * (منفی/اعشاری/رشته/null/boolean/ناامن) → ۰. readStorage، bumpTries، گیت توقف سرصف و
 * فیلد cappedHead همه از همین یک قرارداد استفاده می‌کنند.
 */
function normalizeTriesValue(value: unknown): number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : 0;
}

/**
 * G1-c مرحلهٔ ۳ — فیلد مشتق‌شدهٔ قرارداد وضعیت: آیا سرصفٔ واقعی صف به سقف تلاش رسیده است؟
 * بر پایهٔ شرط tries نرمال‌شدهٔ سرصف ≥ MAX_TRIES (مقادیر بزرگ‌ترِ حفظ‌شدهٔ دادهٔ قدیمی هم
 * سقف‌خورده شمرده می‌شوند)؛ صف خالی → false. هیچ آیتمی را تغییر نمی‌دهد.
 */
function isHeadCapped(): boolean {
  const head = items[0];
  return head !== undefined && normalizeTriesValue(head.tries) >= MAX_TRIES;
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
          // G1-c مرحلهٔ ۱ — نرمال‌سازی شمارندهٔ تلاش‌ها (کمکی مشترک normalizeTriesValue):
          // فقط عدد صحیح امن نامنفی پذیرفته می‌شود؛ نبودِ tries در داده‌های قدیمی و هر
          // مقدار دیگر (منفی/اعشاری/رشته/null/ناامن) → ۰
          tries: normalizeTriesValue(v.tries),
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
    tries: 0, // G1-c مرحلهٔ ۱ — هر آیتم تازه با صفر تلاش آغاز می‌شود
  };
  items.push(item);
  if (items.length > MAX_ITEMS) {
    items = items.slice(items.length - MAX_ITEMS);
  }
  persist();
  emit();
}

/**
 * G1-b — اعتبارسنجی هدر «Retry-After»: فقط عدد صحیح مثبت بر حسب ثانیه معتبر است.
 * نبود هدر، اعشار، صفر، منفی یا مقدار غیرعددی (مانند HTTP-date) → null (نامعتبر).
 * مقادیر فراتر از دقت عددی JavaScript نیز نامعتبر تلقی می‌شوند.
 */
function parseRetryAfterSeconds(value: string | null): number | null {
  if (value === null) return null;
  const trimmed = value.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  const seconds = Number(trimmed);
  if (!Number.isSafeInteger(seconds) || seconds < 1) return null;
  return seconds;
}

/**
 * G1-c مرحلهٔ ۲ — افزایش شمارندهٔ تلاش‌های آیتمِ واقعاً تلاش‌شده (تصمیم‌های تأییدشدهٔ مالک):
 *  - فقط برای آیتمی که برایش fetch انجام شده است (سر صف در لحظهٔ تلاش)؛ آیتم‌های پشت سر صف
 *    که ارسال نشده‌اند به این تابع نمی‌رسند و شمارنده‌شان ثابت می‌ماند.
 *  - فقط خطای شبکه، 408 و 5xx این تابع را فراخوانی می‌کنند؛ 429 معاف است (شمرده نمی‌شود).
 *  - مقدار در MAX_TRIES (۱۰) clamp می‌شود و از آن بالاتر نمی‌رود؛ آیتمِ از قبل سقف‌خورده
 *    (شامل مقادیر بزرگ‌ترِ حفظ‌شده از دادهٔ قدیمی) بدون تغییر رد می‌شود.
 *  - رسیدن به آستانه فقط «هشدار شمارشی» console.warn می‌سازد — بدون URL کامل، query
 *    string، توکن یا دادهٔ شخصی؛ از G1-c مرحلهٔ ۳ پردازشِ آیتمِ سقف‌خورده توسط گیت توقف
 *    سرصف انجام نمی‌شود (بدون حذف/skip/قرنطینه — G4 نیازمند مجوز جداگانهٔ مالک است).
 *  - هشدار فقط در گذرِ آستانه صادر می‌شود (آیتمِ از قبل سقف‌خورده دوباره هشدار نمی‌دهد).
 * خروجی: true اگر مقدار تغییر کرد (فراخواننده باید persist کند)، وگرنه false.
 */
function bumpTries(item: QueueItem): boolean {
  const current = normalizeTriesValue(item.tries);
  if (current >= MAX_TRIES) return false;
  item.tries = current + 1;
  if (item.tries === MAX_TRIES) {
    console.warn(
      `[offline-queue] آیتم صف به سقف تلاش رسید (${item.tries}/${MAX_TRIES} تلاش ناموفق) — نگه‌داری بدون حذف؛ پردازش صف تا تغییر سرصف متوقف می‌شود (G1-c مرحلهٔ ۳)`
    );
  }
  return true;
}

/**
 * ارسال صف به‌ترتیب قدیم.
 *  - 2xx → رکورد حذف می‌شود (sent)
 *  - 4xx به‌جز 408/429 → رد نامعتبر — رکورد حذف می‌شود (failed)؛ شمارندهٔ tries به این مسیر تعلق ندارد
 *  - 408/429 → موقتی — رکورد می‌ماند و حلقه همان‌جا قطع می‌شود (G1-a)؛
 *    با «Retry-After» معتبر، مکث سراسری (pauseUntilMs) نیز به‌روز می‌شود (G1-b)؛
 *    شمارش تلاش فقط برای 408 انجام می‌شود و 429 معاف است (G1-c مرحلهٔ ۲)
 *  - 5xx/خطای شبکه → رکورد می‌ماند و حلقه قطع می‌شود؛ شمارندهٔ tries سرصف +۱ تا سقف ۱۰ (G1-c مرحلهٔ ۲)
 *  - توقف پس از سقف (G1-c مرحلهٔ ۳): در ابتدای هر دور حلقه و پیش از هر ارسال شبکه‌ای،
 *    سرصفٔ واقعی صف بررسی می‌شود؛ اگر tries نرمال‌شدهٔ آن ≥ MAX_TRIES باشد پردازش همان‌جا
 *    متوقف می‌شود — بدون fetch، بدون حذف/عبور از آیتم، بدون افزایش شمارنده و بدون
 *    persist/توست اضافی (FIFO و نگه‌داری حفظ می‌شود؛ G4 = تصمیم آتی مالک)
 */
export async function flushOfflineQueue(): Promise<{ sent: number; failed: number }> {
  if (typeof window === "undefined") return { sent: 0, failed: 0 };
  initOfflineQueue();
  // G1-b — در دورهٔ مکث سراسری هیچ راه‌اندازی (تایمر ۹۰ثانیه‌ای/رویداد online/فراخوانی دستی) flush را شروع نمی‌کند
  if (Date.now() < pauseUntilMs) return { sent: 0, failed: 0 };
  if (flushing || !items.length || !online) return { sent: 0, failed: 0 };
  flushing = true;
  let sent = 0;
  let failed = 0;
  try {
    while (items.length) {
      const item = items[0];
      // G1-c مرحلهٔ ۳ — گیت توقف: سرصفٔ واقعی صف در ابتدای هر دور و پیش از هر ارسال شبکه‌ای
      // بررسی می‌شود؛ سقف‌خورده (شامل مقادیر بزرگ‌ترِ دادهٔ قدیمی) → توقف فوری همان‌جا:
      // بدون fetch، بدون shift/عبور از آیتم، بدون افزایش tries، بدون persist/توست اضافی؛
      // FIFO و نگه‌داری آیتم دقیقاً حفظ می‌شود (سیاست نهایی پس از سقف = گام G4).
      if (normalizeTriesValue(item.tries) >= MAX_TRIES) {
        break;
      }
      try {
        const res = await fetch(item.url, {
          method: item.method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item.body ?? {}),
        });
        if (res.ok) {
          items.shift();
          sent++;
        } else if (res.status === 408 || res.status === 429) {
          // G1-a — خطای موقتی: رکورد می‌ماند و همین چرخهٔ flush قطع می‌شود (تصمیم D1 — گزینه A)
          // G1-b — «Retry-After» فقط برای 408/429 خوانده می‌شود؛ مقدار معتبر (عدد صحیح ثانیه ≥۱)
          // مکث سراسری را با فرمول max(قبلی، اکنون + ثانیه×۱۰۰۰) به‌روز می‌کند (بدون کسر FLUSH_INTERVAL_MS).
          // نبود/نامعتبری هدر → بدون fallback حدسی (تصمیم باز D8)؛ در این حالت فقط توقف G1-a اعمال می‌شود.
          const retryAfterSeconds = parseRetryAfterSeconds(res.headers.get("retry-after"));
          if (retryAfterSeconds !== null) {
            pauseUntilMs = Math.max(pauseUntilMs, Date.now() + retryAfterSeconds * 1000);
          }
          // G1-c مرحلهٔ ۲ — شمارش تلاش فقط برای 408؛ 429 معاف است (تصمیم تأییدشدهٔ مالک) و
          // مکث G1-bِ بالا دقیقاً حفظ می‌شود. افزایش در مسیر break بلافاصله persist می‌شود
          // تا پس از reload از دست نرود.
          if (res.status === 408 && bumpTries(item)) {
            persist();
          }
          break;
        } else if (res.status >= 400 && res.status < 500) {
          // رد نامعتبر — دوباره تلاش نمی‌شود؛ شمارندهٔ tries به این مسیر قطعی تعلق نمی‌گیرد (G1-c مرحلهٔ ۲)
          items.shift();
          failed++;
        } else {
          // G1-c مرحلهٔ ۲ — 5xx شمرده می‌شود (فقط آیتمِ واقعاً تلاش‌شده = سر صف)؛
          // persist پیش از break تا افزایش پس از reload از دست نرود
          if (bumpTries(item)) {
            persist();
          }
          break; // 5xx — همان‌جا می‌ماند
        }
      } catch {
        // G1-c مرحلهٔ ۲ — خطای شبکه شمرده می‌شود (فقط آیتمِ واقعاً تلاش‌شده = سر صف)؛
        // persist پیش از break تا افزایش پس از reload از دست نرود
        if (bumpTries(item)) {
          persist();
        }
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
  // G1-c مرحلهٔ ۳ — server snapshot همان قرارداد pending=0 و online=true را دارد و فیلد
  // مشتق‌شده را با مقدار بی‌طرف false نگه می‌دارد (سمت سرور صف/سرصفی وجود ندارد)
  return { pending: 0, online: true, cappedHead: false };
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
