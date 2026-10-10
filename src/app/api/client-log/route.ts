import { NextRequest, NextResponse } from "next/server";
import { checkRate, rateLimited } from "../_lib/rate-limit";
import { logEvent } from "../_lib/logger";

export const dynamic = "force-dynamic";

/**
 * لاگ سمت کلاینت (فاز ۱۱ — مانیتورینگ) — سقف ۳۰ در ۵ دقیقه برای هر IP.
 * فقط console سرور؛ هیچ چیز در دیتابیس ذخیره نمی‌شود و هیچ PII هم ثبت نمی‌شود
 * (الگوی ایمیل/تلفن در پیام و مقادیر extra با *** جایگزین می‌شود).
 * پاسخ همیشه سادهٔ {ok:true} است تا fire-and-forget کلاینت بی‌دردسر باشد.
 */

const LEVELS = new Set(["error", "warn", "perf"]);
const MESSAGE_MAX = 200;
const URL_MAX = 150;
const EXTRA_KEYS_MAX = 5;
const EXTRA_VALUE_MAX = 100;

/** الگوهای PII: ایمیل و رشتهٔ رقم‌های پیوستهٔ ۹+ رقمی (تلفن) — ارقام فارسی هم پوشش داده می‌شود */
const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const PHONE_RE = /(?:[0-9۰-۹][\s\-.]?){9,}/g;

function redact(v: unknown): string {
  const s = typeof v === "string" ? v : typeof v === "number" || typeof v === "boolean" ? String(v) : "";
  return s.replace(EMAIL_RE, "***").replace(PHONE_RE, "***");
}

export async function POST(req: NextRequest) {
  const rl = checkRate(req, "client-log:post", 30, 5 * 60_000);
  if (!rl.ok) {
    logEvent("client-log", "rate-limited");
    return rateLimited(rl.retryAfter);
  }

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      // بدنهٔ خراب هم بی‌سروصدا می‌پذیریم — هدف فقط تلمتری است
      return NextResponse.json({ ok: true });
    }

    const raw = (body ?? {}) as {
      level?: unknown;
      message?: unknown;
      url?: unknown;
      extra?: unknown;
    };

    const level = typeof raw.level === "string" && LEVELS.has(raw.level) ? raw.level : "log";
    const message = redact(typeof raw.message === "string" ? raw.message : "").slice(0, MESSAGE_MAX);
    const url = (typeof raw.url === "string" ? raw.url : "").slice(0, URL_MAX);

    // extra: فقط آبجکت تخت با سقف ۵ کلید و ۱۰۰ نویسه در هر مقدار
    const extra: Record<string, string> = {};
    if (raw.extra && typeof raw.extra === "object" && !Array.isArray(raw.extra)) {
      for (const [k, v] of Object.entries(raw.extra as Record<string, unknown>)) {
        if (Object.keys(extra).length >= EXTRA_KEYS_MAX) break;
        const value = redact(v).slice(0, EXTRA_VALUE_MAX);
        if (!value) continue;
        extra[String(k).slice(0, 40)] = value;
      }
    }

    logEvent("client-log", level, { message, url, extra });

    return NextResponse.json({ ok: true });
  } catch {
    // مسیر تلمتری هرگز نباید خطا بدهد — همیشه ok
    return NextResponse.json({ ok: true });
  }
}
