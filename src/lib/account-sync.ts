"use client";

/**
 * موتور همگام‌سازی حساب (فاز ۱) — پیشرفت کاربر بین دستگاه‌ها.
 *
 * ایدهٔ اصلی: کل پیشرفت اپ = کلیدهای visionone:* در localStorage
 * (همان شکلی که progress-backup صادر می‌کند). این ماژول:
 *   ۱) روی نوشتن هر کلید visionone:* چشم می‌دارد (پچ setItem/removeItem)
 *      و با تاخیر debounce وضعیت را به سرور می‌فرستد.
 *   ۲) هنگام ورود: اسنپ‌شات سرور را می‌کشد، با داده محلی «ادغام» می‌کند
 *      (آرایه‌ها = اجتماع، اعداد = بیشینه، کلید دستگاه‌محلی = محلی) و سپس
 *      نتیجه را یک‌جا به سرور برمی‌گرداند تا سرور = برابر اجتماع شود.
 */

const PREFIX = "visionone:";
const DEVICE_KEYS = new Set(["visionone:active-book", "visionone:theme", "visionone:upsell"]);
const PUSH_DEBOUNCE_MS = 2500;
const MAX_KEYS = 3000;

let merging = false;
let pushTimer: ReturnType<typeof setTimeout> | null = null;
let lastSyncAt: number | null = null;
const syncListeners = new Set<() => void>();

function collect(): Record<string, string> {
  const data: Record<string, string> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(PREFIX)) continue;
      const value = localStorage.getItem(key);
      if (value && value.length <= 512 * 1024) data[key] = value;
    }
  } catch {
    /* noop */
  }
  return data;
}

function notify() {
  lastSyncAt = Date.now();
  syncListeners.forEach((l) => l());
}

/** ارسال اسنپ‌شات کامل به سرور (حالت «وضعیت کامل») */
export async function pushSnapshot(): Promise<boolean> {
  if (merging) return false;
  const data = collect();
  if (Object.keys(data).length > MAX_KEYS) return false;
  try {
    const res = await fetch("/api/progress", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    if (res.ok) {
      notify();
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/** ادغام اسنپ‌شات سرور در localStorage — قواعد برندهٔ هوشمند */
export function mergeServerIntoLocal(server: Record<string, string>): number {
  let applied = 0;
  try {
    for (const [key, sVal] of Object.entries(server)) {
      if (!key.startsWith(PREFIX)) continue;
      if (DEVICE_KEYS.has(key)) continue; // ترجیح دستگاه
      const lVal = localStorage.getItem(key);
      if (lVal === sVal) continue;

      let winner: string | null = null;

      // آرایه‌ها (واژه‌های یادگرفته/ستاره‌دار/SRS/...) → اجتماع
      const lArr = tryParseArray(lVal);
      const sArr = tryParseArray(sVal);
      if (lArr && sArr) {
        const set = new Set(sArr);
        const merged = [...sArr, ...lArr.filter((x) => !set.has(x))];
        winner = JSON.stringify(merged);
      } else if (lArr && lVal !== null) {
        winner = lVal; // محلی آرایه معتبر، سرور فرمت دیگر → محلی
      } else if (sArr && lVal === null) {
        winner = sVal;
      } else {
        // اعداد → بیشینه (شمارنده‌ها/زنجیره/رکوردها)، بقیه → سرور
        const lNum = Number(lVal);
        const sNum = Number(sVal);
        if (
          lVal !== null &&
          Number.isFinite(lNum) &&
          Number.isFinite(sNum) &&
          `${lNum}` === String(lVal).trim() &&
          `${sNum}` === String(sVal).trim()
        ) {
          winner = String(Math.max(lNum, sNum));
        } else {
          winner = sVal; // سرور مرجع است
        }
      }

      if (winner !== null && winner !== lVal) {
        localStorage.setItem(key, winner);
        applied++;
      }
    }
  } catch {
    /* noop */
  }
  return applied;
}

function tryParseArray(v: string | null): string[] | null {
  if (v === null || !v.startsWith("[")) return null;
  try {
    const p = JSON.parse(v);
    return Array.isArray(p) ? (p.map(String) as string[]) : null;
  } catch {
    return null;
  }
}

/** ورود: کشیدن → ادغام → پس‌دادن اجتماع. تعداد تغییرات اعمالی را برمی‌گرداند */
export async function pullMergePush(): Promise<number> {
  merging = true;
  let changed = 0;
  try {
    const res = await fetch("/api/progress", { cache: "no-store" });
    if (!res.ok) return 0;
    const json = (await res.json()) as { data?: Record<string, string> };
    const server = json.data ?? {};
    changed = mergeServerIntoLocal(server);
    // رفرش کَش استورهای scoped + پخش event تا useSyncExternalStoreها تازه شوند
    try {
      window.dispatchEvent(new Event("storage"));
    } catch {
      /* noop */
    }
  } finally {
    merging = false; // قبل از push آزاد شود وگرنه push خودش را بلاک می‌کند
  }
  await pushSnapshot();
  return changed;
}

/** نصب پچ دیده‌بانی نوشتن‌ها — یک‌بار در عمر صفحه */
export function installSyncWatcher(): void {
  if ((window as unknown as { __v1SyncWatcher?: boolean }).__v1SyncWatcher) return;
  (window as unknown as { __v1SyncWatcher?: boolean }).__v1SyncWatcher = true;

  const origSet = Storage.prototype.setItem;
  const origRemove = Storage.prototype.removeItem;

  const schedule = () => {
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = setTimeout(() => {
      pushTimer = null;
      void pushSnapshot();
    }, PUSH_DEBOUNCE_MS);
  };

  Storage.prototype.setItem = function (key: string, value: string) {
    origSet.call(this, key, value);
    if (typeof key === "string" && key.startsWith(PREFIX) && !DEVICE_KEYS.has(key)) schedule();
  };
  Storage.prototype.removeItem = function (key: string) {
    origRemove.call(this, key);
    if (typeof key === "string" && key.startsWith(PREFIX) && !DEVICE_KEYS.has(key)) schedule();
  };
}

export function getLastSyncAt(): number | null {
  return lastSyncAt;
}

export function subscribeSync(cb: () => void): () => void {
  syncListeners.add(cb);
  return () => {
    syncListeners.delete(cb);
  };
}
