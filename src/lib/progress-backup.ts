"use client";

/**
 * Progress backup — صادرات/واردات کامل پیشرفت کاربر (همه کلیدهای visionone:* در localStorage)
 * برای انتقال پیشرفت بین دستگاه‌ها یا پشتیبان‌گیری.
 */

const PREFIX = "visionone:";
const MAX_VALUE = 512 * 1024; // سقف هر مقدار — ۵۱۲KB
const MAX_TOTAL = 4 * 1024 * 1024; // سقف کل فایل — ۴MB

export interface BackupFile {
  app: "vision-one";
  version: 1;
  exportedAt: string;
  data: Record<string, string>;
}

/** همه کلیدهای پیشرفت را از localStorage می‌خواند و آبجکت پشتیبان می‌سازد */
export function collectBackup(): BackupFile {
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
    version: 1,
    exportedAt: new Date().toISOString(),
    data,
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

export interface ParseResult {
  ok: boolean;
  entries: Record<string, string>;
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
  if (Object.keys(entries).length === 0) {
    return { ok: false, entries: {}, error: "هیچ داده پیشرفتی در فایل پیدا نشد" };
  }
  return { ok: true, entries };
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
