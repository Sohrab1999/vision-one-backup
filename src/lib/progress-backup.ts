"use client";

/**
 * Progress backup — صادرات/واردات کامل پیشرفت کاربر (همه کلیدهای visionone:* در localStorage)
 * برای انتقال پیشرفت بین دستگاه‌ها یا پشتیبان‌گیری.
 *
 * فاز ۱۰ — نسخهٔ v2: کنار دادهٔ محلی، بخش اختیاری `server` (همان شکلی که
 * /api/export می‌دهد) در فایل می‌نشیند و هنگام بازیابی جداگانه به /api/import
 * داده می‌شود. فایل‌های v1 (بدون server) هم همچنان خوانده می‌شوند.
 */

const PREFIX = "visionone:";
const MAX_VALUE = 512 * 1024; // سقف هر مقدار — ۵۱۲KB
const MAX_TOTAL = 4 * 1024 * 1024; // سقف کل فایل — ۴MB

/** بخش سمت سرور فایل پشتیبان — قرارداد مشترک /api/export و /api/import (فاز ۱۰) */
export interface ServerBackupSection {
  profile?: {
    username?: string;
    avatar?: string | null;
    grade?: string | null;
    createdAt?: string;
  } | null;
  progress?: { key: string; value: string }[];
  attempts?: unknown[];
  reviewStates?: unknown[];
  wordNotes?: unknown[];
}

export interface BackupFile {
  app: "vision-one";
  /** v1 = فقط دادهٔ localStorage · v2 = + بخش سرور (خروجی کامل کاربر لاگین) */
  version: 1 | 2;
  exportedAt: string;
  data: Record<string, string>;
  /** فقط در v2 — UI این بخش را جداگانه به /api/import می‌فرستد؛ restoreBackup به آن دست نمی‌زند */
  server?: ServerBackupSection;
}

/** همه کلیدهای پیشرفت را از localStorage می‌خواند و آبجکت پشتیبان می‌سازد؛
 *  اگر server داده شود (خروجی /api/export)، همان بخش عیناً داخل فایل v2 می‌نشیند. */
export function collectBackup(server?: ServerBackupSection): BackupFile {
  const data: Record<string, string> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(PREFIX)) continue;
      const value = localStorage.getItem(key);
      if (!value || value.length > MAX_VALUE) continue;
      data[key] = value;
    }
  } catch {
    /* noop */
  }
  return {
    app: "vision-one",
    version: 2,
    exportedAt: new Date().toISOString(),
    data,
    ...(server ? { server } : {}),
  };
}

/** فایل پشتیبان را دانلود می‌کند؛ تعداد کلیدها را برمی‌گرداند */
export function downloadBackup(): number {
  const backup = collectBackup();
  const count = Object.keys(backup.data).length;
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  a.href = url;
  a.download = `vision-one-progress-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  return count;
}

/** دانلود یک آبجکت پشتیبان آماده (v1 یا v2) — خروجی کامل فاز ۱۰ با نام دلخواه */
export function downloadBackupJson(backup: BackupFile, filename = "vision-one-backup.json"): void {
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

// ─── ساخت CSV (فاز ۱۰) — با BOM برای نمایش درست فارسی در اکسل ───

/**escape سلول CSV: اگر ویرگول/کوتیشن/خط جدید داشت، داخل کوتیشن با escape می‌رود */
function csvCell(v: unknown): string {
  const s = v === null || v === undefined ? "" : String(v);
  return /[",\n\r;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** CSV آزمون‌ها: تاریخ/جزوه/دسته/درس/درست/کل/مدت */
export function toAttemptsCsv(attempts: readonly unknown[]): string {
  const header = ["date", "book", "category", "lesson", "correct", "total", "duration"];
  const lines = attempts.map((a) => {
    const o = (a ?? {}) as Record<string, unknown>;
    return [
      o.createdAt ?? o.date ?? "",
      o.book ?? "",
      o.category ?? "",
      o.lesson ?? "",
      o.correct ?? "",
      o.total ?? "",
      o.duration ?? "",
    ]
      .map(csvCell)
      .join(",");
  });
  return ["\uFEFF" + header.join(","), ...lines].join("\r\n");
}

/** CSV پیشرفت: کلید/مقدار — از باندل محلی (Record) یا ردیف‌های سرور (آرایه) */
export function toProgressCsv(
  progress: Record<string, string> | readonly { key: string; value: string }[],
): string {
  const rows: [string, string][] = Array.isArray(progress)
    ? progress.map((p) => [p.key, p.value])
    : Object.entries(progress);
  const lines = rows.map(([k, v]) => [csvCell(k), csvCell(v)].join(","));
  return ["\uFEFF" + ["key", "value"].join(","), ...lines].join("\r\n");
}

export interface ParseResult {
  ok: boolean;
  entries: Record<string, string>;
  /** بخش سرور فایل (v2) — جداگانه برگردانده می‌شود تا UI آن را به /api/import بفرستد */
  server?: ServerBackupSection;
  error?: string;
}

/** فایل پشتیبان را اعتبارسنجی و پارس می‌کند */
export function parseBackup(text: string): ParseResult {
  if (text.length > MAX_TOTAL) {
    return { ok: false, entries: {}, error: "حجم فایل بیش از حد مجاز است" };
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, entries: {}, error: "فایل JSON معتبر نیست" };
  }
  const obj = parsed as Partial<BackupFile> | null;
  if (!obj || typeof obj !== "object" || obj.app !== "vision-one" || !obj.data || typeof obj.data !== "object") {
    return { ok: false, entries: {}, error: "این فایل پشتیبانِ ویژن وان نیست" };
  }
  const entries: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj.data)) {
    if (!key.startsWith(PREFIX) || typeof value !== "string") continue;
    if (value.length > MAX_VALUE) continue;
    entries[key] = value;
  }
  // بخش سرور (v2) — اگر بود دست‌نخورده برمی‌گردد؛ restoreBackup فقط بخش محلی را می‌نویسد
  const server =
    obj.server && typeof obj.server === "object" && !Array.isArray(obj.server)
      ? (obj.server as ServerBackupSection)
      : undefined;
  if (Object.keys(entries).length === 0 && !server) {
    return { ok: false, entries: {}, error: "هیچ داده پیشرفتی در فایل پیدا نشد" };
  }
  return { ok: true, entries, ...(server ? { server } : {}) };
}

/** داده‌های پشتیبان را در localStorage می‌نویسد؛ تعداد کلیدهای بازنویسی‌شده را برمی‌گرداند */
export function restoreBackup(entries: Record<string, string>): number {
  let n = 0;
  for (const [key, value] of Object.entries(entries)) {
    try {
      localStorage.setItem(key, value);
      n++;
    } catch {
      /* skip */
    }
  }
  return n;
}
