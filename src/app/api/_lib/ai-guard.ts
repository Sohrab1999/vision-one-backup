// ابزارهای مشترک کنترل هزینهٔ مسیرهای هوش مصنوعی (فاز ۸) — کش حافظه + سقف روزانهٔ فراخوانی
// این پوشه با پیشوند _ از روتینگ App Router مستثنی است.

import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";

/** شمارهٔ روز (epochDay) به‌وقت تهران — با تغییرش سقف‌های روزانه خودکار ریست می‌شوند */
export function tehranEpochDay(): number {
  const TEHRAN_UTC_OFFSET_MS = 3.5 * 60 * 60 * 1000; // UTC+3:30
  return Math.floor((Date.now() + TEHRAN_UTC_OFFSET_MS) / 86_400_000);
}

/** کش حافظهٔ کوچک با سقف تعداد ورودی (LRU ساده) — پاسخ تکراری بدون فراخوانی LLM */
export class BoundedCache {
  private readonly cap: number;
  private readonly map = new Map<string, string>();

  constructor(cap: number) {
    this.cap = cap;
  }

  get(key: string): string | undefined {
    const value = this.map.get(key);
    if (value === undefined) return undefined;
    this.map.delete(key); // تازه‌سازی ترتیب استفاده
    this.map.set(key, value);
    return value;
  }

  set(key: string, value: string): void {
    this.map.delete(key);
    this.map.set(key, value);
    while (this.map.size > this.cap) {
      const oldest = this.map.keys().next();
      if (oldest.done) break;
      this.map.delete(oldest.value);
    }
  }
}

interface DailyEntry {
  day: number;
  count: number;
}

/** Map روزانهٔ مشترک بین مسیرهای AI — اسکوپ هر مسیر با پیشوند کلید جدا می‌شود */
const DAILY = new Map<string, DailyEntry>();
const DAILY_MAX_KEYS = 400;

/**
 * یک واحد از سقف روزانهٔ کاربر را مصرف می‌کند.
 * true → مجاز است (یک واحد مصرف شد)؛ false → سقف پر شده است.
 * Map روزانه با ریست خودکار در تغییر epochDay و پاک‌سازی کلیدهای روزهای قبل.
 */
export function consumeDailyQuota(userKey: string, limit: number): boolean {
  const day = tehranEpochDay();
  const entry = DAILY.get(userKey);
  if (!entry || entry.day !== day) {
    if (DAILY.size >= DAILY_MAX_KEYS) {
      for (const [key, value] of DAILY) {
        if (value.day !== day) DAILY.delete(key);
      }
    }
    DAILY.set(userKey, { day, count: 1 });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}

/** کلید کاربر برای سقف روزانه: نام مهمان از هدر x-visionone-name وگرنه IP */
export function userKeyOf(req: NextRequest, scope: string): string {
  const name = req.headers
    .get("x-visionone-name")
    ?.trim()
    .toLowerCase()
    .slice(0, 40);
  const forwarded = req.headers.get("x-forwarded-for");
  const ip =
    (forwarded ? forwarded.split(",")[0] : "")?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    "local";
  return `${scope}:${name || ip}`;
}

/** hash کوتاه برای کلید کش */
export function sha1Of(input: string): string {
  return createHash("sha1").update(input).digest("hex");
}

/** پاک‌سازی فهرست واژه‌های ورودی: trim/فاصله‌زدایی/dedup/سقف تعداد */
export function cleanWordList(input: unknown, max: number): string[] {
  if (!Array.isArray(input)) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of input) {
    if (typeof raw !== "string") continue;
    const w = raw.replace(/\s+/g, " ").trim().slice(0, 40);
    if (!w) continue;
    const key = w.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(w);
    if (out.length >= max) break;
  }
  return out;
}
