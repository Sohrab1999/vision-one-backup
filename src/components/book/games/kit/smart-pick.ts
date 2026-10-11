"use client";

import { readSrsItems, SRS_MAX_BOX, type SrsItem } from "@/lib/srs-store";
import { shuffle } from "../shared";

/**
 * انتخاب هوشمند واژه — فاز G3-02 نقشه راه بازی‌ها.
 *
 * استخر سؤال بازی‌ها به اولویت کارت‌های SRS «ضعیف/سررسید» می‌چسبد تا کاربر
 * با واژه‌های مشکل‌دار خودش بیشتر بازی کند (حلقهٔ یادگیری §۰ سند).
 *
 * ★ الگوریتم: نمونه‌گیری وزن‌دار بدون جایگذاری (Efraimidis–Spirakis) ★
 *
 *     score(i) = random() ^ (1 / weight(i))   → نزولی مرتب، n تای اول
 *
 *   - وزن هر کارت از الگوی srsWeight استور: جعبهٔ پایین‌تر = وزن بیشتر
 *     (کارت نو = بیشترین) و کارت سررسید (dueAt گذشته) ×۲ می‌شود
 *   - شروع سرد (SRS خالی/خطا): رفتار دقیقاً = pickUnique معمولی (شافل خالص)
 *   - هیچ نوشتن به SRS انجام نمی‌شود — فقط خواندن (readSrsItems)
 *   - ورودی غیرمعتبر: pool خالی → [] · n<=0 → []
 *
 * استفاده در بازی‌ها: جایگزین مستقیم pickUnique در انتخاب واژه‌های دور.
 * کلید جدا: countWeak برای نمایش «این دور روی واژه‌های ضعیف تو متمرکز است».
 */

/** وزن «ضعیف بودن» — بیشتر = شانس بیشتر برای ورود به دور */
function weightOf(item: SrsItem | undefined, now: number): number {
  if (!item) return SRS_MAX_BOX + 2; // کارت نو — اولویت بیشینه
  const base = Math.max(1, SRS_MAX_BOX - item.box + 1); // ۱..۶ — الگوی srsWeight
  const due = item.dueAt <= now && item.reps > 0 ? 2 : 1; // سررسید = تقویت ×۲
  return base * due;
}

/** آیا این کارت «ضعیف/سررسید» است؟ (برای شمارش setup) */
export function isWeakCard(item: SrsItem | undefined, now: number = Date.now()): boolean {
  if (!item) return false; // کارت نو = عضو عادی استخر است، نه «واژهٔ ضعیفِ تو»
  return item.reps > 0 && (item.box <= 1 || (item.dueAt <= now && item.dueAt > 0));
}

/**
 * انتخاب n عضو یکتا با اولویت کارت‌های ضعیف — جایگزین drop-in برای pickUnique.
 * weakRatio پارامتر داخلی الگوریتم نیست (وزن‌ها خودشان اولویت می‌سازند)؛
 * برای سازگاری امضا با pickUnique حفظ شده و رزرو آینده است.
 */
export function smartPick<T>(
  pool: T[],
  n: number,
  keyOf: (item: T) => string,
  _weakRatio = 0.6,
): T[] {
  if (!Array.isArray(pool) || pool.length === 0 || !Number.isFinite(n) || n <= 0) return [];
  const now = Date.now();

  // حذف تکراری بر اساس کلید — همان قرارداد pickUnique
  const seen = new Set<string>();
  const candidates: T[] = [];
  for (const item of pool) {
    const k = keyOf(item);
    if (seen.has(k)) continue;
    seen.add(k);
    candidates.push(item);
  }
  if (candidates.length <= n) return shuffle(candidates);

  // خواندن SRS — خطا/خالی → شافل خالص (شروع سرد)
  let srs: Record<string, SrsItem> | null = null;
  try {
    srs = readSrsItems();
  } catch {
    srs = null;
  }
  if (!srs || Object.keys(srs).length === 0) return shuffle(candidates).slice(0, n);

  // نمونه‌گیری وزن‌دار: random^(1/w) نزولی — کارت‌های ضعیف شانس چندبرابر
  const scored = candidates.map((item) => {
    const w = weightOf(srs![keyOf(item)], now);
    const r = Math.random();
    // r^(1/w) — برای جلوگیری از log(0): اگر r=0 کوچکِ ناچیز
    const s = r <= 0 ? 0 : Math.pow(r, 1 / Math.max(1, w));
    return { item, s };
  });
  scored.sort((a, b) => b.s - a.s);
  return scored.slice(0, Math.min(n, scored.length)).map((x) => x.item);
}

/**
 * شمارش کارت‌های «کارکردهٔ» ضعیف/سررسید در استخر — برای پیام setup
 * («مرکز این دور: N واژهٔ ضعیف تو»). کارت‌های هرگز دیده‌نشده شمرده نمی‌شوند
 * (آن‌ها عضو عادی استخرند، نه ضعف کاربر). صفر = تمرکز هوشمند غیرفعال.
 */
export function countWeak<T>(pool: T[], keyOf: (item: T) => string): number {
  let srs: Record<string, SrsItem> = {};
  try {
    srs = readSrsItems();
  } catch {
    return 0;
  }
  if (!srs || Object.keys(srs).length === 0) return 0;
  const now = Date.now();
  const seen = new Set<string>();
  let n = 0;
  for (const item of pool) {
    const k = keyOf(item);
    if (seen.has(k)) continue;
    seen.add(k);
    if (isWeakCard(srs[k], now)) n++;
  }
  return n;
}
