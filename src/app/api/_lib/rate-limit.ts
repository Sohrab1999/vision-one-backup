/**
 * محدودکنندهٔ نرخ درخواست (فاز ۱۱ — امنیت) — پنجرهٔ لغزندهٔ درون‌حافظه‌ای.
 *
 * - کلید = IP (اولین عضو x-forwarded-for یا x-real-ip یا "local") + نام مسیر
 * - بدون setInterval سراسری؛ پاک‌سازی ورودی‌های منقضی «همان لحظهٔ چک» انجام
 *   می‌شود تا حافظه بی‌رویش رشد نکند (در هر چک اگر نقشه بزرگ شده باشد sweep).
 * - فقط برای تک‌سرور (dev/استقرار ساده) کافی است؛ برای خوشه باید به Redis منتقل شود.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface Bucket {
  /** مُهر زمانی (epoch ms) هر درخواستِ داخل پنجره — مرتب صعودی */
  hits: number[];
  /** طول پنجرهٔ همین کلید به میلی‌ثانیه */
  windowMs: number;
}

const buckets = new Map<string, Bucket>();

/** آستانهٔ sweep خودکار — با هر چک اگر نقشه از این بزرگ‌تر شد، منقضی‌ها پاک می‌شوند */
const SWEEP_AT = 512;
/** سقف سخت نقشهٔ کلیدها (جلوگیری از سوختن حافظه با IP جعلی) */
const HARD_CAP = 4096;

/** IP واقعی کلاینت تا حد امکان: اولین عضو x-forwarded-for یا x-real-ip یا "local" */
function ipOf(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const first = forwarded ? forwarded.split(",")[0]?.trim() : "";
  if (first) return first;
  return req.headers.get("x-real-ip")?.trim() || "local";
}

/** حذف همهٔ ورودی‌های منقضی (طبق پنجرهٔ خودِ هر کلید) و کلیدهای خالی */
function sweep(now: number): void {
  for (const [key, bucket] of buckets) {
    while (bucket.hits.length > 0 && bucket.hits[0] <= now - bucket.windowMs) {
      bucket.hits.shift();
    }
    if (bucket.hits.length === 0) buckets.delete(key);
  }
}

/**
 * یک درخواست را با پنجرهٔ لغزنده می‌سنجمد.
 * true → مجاز است (یک واحد مصرف شد) · false → سقف پر است (retryAfter به ثانیه).
 */
export function checkRate(
  req: NextRequest,
  name: string,
  limit: number,
  windowMs: number,
): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const key = `${ipOf(req)}|${name}`;

  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { hits: [], windowMs };
    buckets.set(key, bucket);
  }
  // پنجرهٔ لغزنده: مُهرهای منقضی همین کلید را بیرون بینداز
  while (bucket.hits.length > 0 && bucket.hits[0] <= now - bucket.windowMs) {
    bucket.hits.shift();
  }

  if (bucket.hits.length >= limit) {
    // Retry-After = فاصله تا کهنه‌شدن قدیمی‌ترین درخواستِ داخل پنجره
    const retryAfter = Math.max(1, Math.ceil((bucket.hits[0] + bucket.windowMs - now) / 1000));
    if (buckets.size > SWEEP_AT) sweep(now);
    return { ok: false, retryAfter };
  }

  bucket.hits.push(now);

  // نگه‌داری دوره‌ای — همان تابع، بدون تایمر سراسری
  if (buckets.size > SWEEP_AT) sweep(now);
  // سقف سخت: اگر بعد از sweep هنوز شلوغ است، قدیمی‌ترین کلیدها را فدیا کن
  while (buckets.size > HARD_CAP) {
    const oldest = buckets.keys().next();
    if (oldest.done) break;
    buckets.delete(oldest.value);
  }

  return { ok: true, retryAfter: 0 };
}

/**
 * پاسخ استاندارد ۴۲۹ — پیام فارسی + هدر Retry-After (ثانیه)
 */
export function rateLimited(retryAfter: number): NextResponse {
  return NextResponse.json(
    { error: "درخواست‌هایت زیاد شد — کمی صبر کن 🙏" },
    {
      status: 429,
      headers: { "Retry-After": String(Math.max(1, Math.ceil(retryAfter))) },
    },
  );
}

// ─── سقف‌های پیشنهادی پروژه (برای هماهنگی عامل‌ها) ───
// خواندنی‌ها (GET):            ۹۰ در دقیقه
// POST/PUT حساس (attempts/import/class/join/notes/client-log و syncها): ۳۰ در دقیقه
// auth-مرتبط (register و…):    ۲۰ در دقیقه
// حذف حساب (profile DELETE):   ۵ در ساعت
