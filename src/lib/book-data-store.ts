"use client";

/**
 * استور بیرونی داده کتاب فعال — lazy-load با dynamic import (فاز ۷).
 *
 * چرا؟ پیش از فاز ۷ رجیستری همه ۶ جزوه را import استاتیک می‌کرد و باندل اولیه
 * بیش از ۲ مگابایت داده داشت. اکنون داده هر جزوه فقط هنگام ورود به آن جزوه
 * به‌صورت chunk جداگانه بارگذاری می‌شود:
 *
 *   requestBookData(id)  ← از BookProvider (در effect) صدا زده می‌شود
 *   cache.get(id)        ← اسنپ‌شات همزمان؛ chunk موازی resolve شد notify()
 *
 * نکته سازگاری react-hooks v6: هیچ React setState داخل effect صدا زده
 * نمی‌شود — فقط متدهای استور بیرونی؛ رندر مجدد با useSyncExternalStore انجام
 * می‌شود و اسنپ‌شات سرور همیشه null است (اسکلت بارگذاری سمت کلاینت).
 *
 * P0-BOOK-LOADING-1 (شکست بارگذاری = خطای مرئی، نه اسکلت بی‌پایان):
 * قبلاً reject/null شدن import فقط console.error می‌شد و data برای همیشه null
 * می‌ماند → اسکلت «در حال باز کردن جزوه…» بی‌پایان (بازتولید و اثبات: گزارش
 * docs/qa/book-loading-diagnostic-2026-11-02.md). اکنون:
 *  - شکست واقعی (ChunkLoadError/شبکه) → خطای هر کتاب ثبت و emit می‌شود؛
 *    UI پیام صادقانه + «تلاش دوباره» نشان می‌دهد (retryBookData — امن:
 *    فقط وقتی تلاش جاری تمام شده، خطا پاک و درخواست تازه زده می‌شود)
 *  - انتظار معلق بی‌پایان (اتصال فریز/سرور نیمه‌مرده) → سقف BOOK_DATA_TIMEOUT_MS؛
 *    اگر import پس از timeout دیرتر resolve شود، موفقیت دیرهنگام همچنان
 *    کش و emit می‌شود (بازیابی خودکار UI بدون رفرش — race بی‌ضرر)
 */

import type { BookData, BookId } from "@/data/books/types";
import { loadBookData } from "@/data/books/registry";
import { getActiveBookSnapshot } from "./book-storage";

const listeners = new Set<() => void>();

/** کش داده هر کتاب پس از اولین بارگذاری — سوییچ برگشت بدون تأخیر */
const cache = new Map<BookId, BookData>();

/** importهای در جریان — از تکرار درخواست هم‌زمان همان کتاب جلوگیری می‌کند */
const pending = new Set<BookId>();

/** خطای آخرین تلاش هر کتاب — UI مرئی به‌جای اسکلت بی‌پایان؛ با موفقیت بعدی پاک می‌شود */
const errors = new Map<BookId, Error>();

/** سقف انتظار برای settle شدن import — سنجش‌شده در dev: کامپایل سرد بزرگ‌ترین جزوه‌ها < ۶۰ث */
const BOOK_DATA_TIMEOUT_MS = 60_000;

function emit() {
  listeners.forEach((l) => l());
}

/** شروع بارگذاری داده کتاب درخواستی (بدون رقابت — تکرارش بی‌اثر است) */
export function requestBookData(id: BookId | null) {
  if (!id || cache.has(id) || pending.has(id)) return;
  pending.add(id);
  errors.delete(id);

  let settled = false;
  const finishError = (err: Error) => {
    if (settled) return;
    settled = true;
    pending.delete(id);
    errors.set(id, err);
    emit();
  };
  const timer = setTimeout(
    () => finishError(new Error(`بارگذاری جزوه بیشتر از ${Math.round(BOOK_DATA_TIMEOUT_MS / 1000)} ثانیه طول کشید`)),
    BOOK_DATA_TIMEOUT_MS,
  );

  loadBookData(id)
    .then((data) => {
      clearTimeout(timer);
      if (!data) {
        // registry خطا را لاگ می‌کند و null برمی‌گرداند (ChunkLoadError/شبکه/خروجی نامعتبر)
        finishError(new Error("دادهٔ جزوه بارگذاری نشد"));
        return;
      }
      // موفقیت — حتی دیرهنگام پس از timeout: کش + پاک‌کردن خطا + بازیابی UI
      cache.set(id, data);
      settled = true;
      pending.delete(id);
      errors.delete(id);
      emit();
    })
    .catch((err) => {
      clearTimeout(timer);
      console.error(`book-data-store: خطا در بارگذاری داده ${id}`, err);
      finishError(err instanceof Error ? err : new Error(String(err)));
    });
}

/** خطای آخرین تلاش یک کتاب — null یعنی یا سالم است یا در حال بارگذاری */
export function getBookDataError(id: BookId): Error | null {
  return errors.get(id) ?? null;
}

/** اسنپ‌شات سرور — خطا فقط سمت کلاینت معنا دارد */
export function getServerBookDataError(): Error | null {
  return null;
}

/** تلاش دوبارهٔ امن — فقط وقتی تلاش قبلی تمام شده؛ خطا پاک و درخواست تازه زده می‌شود */
export function retryBookData(id: BookId) {
  if (!id || pending.has(id)) return;
  errors.delete(id);
  emit();
  requestBookData(id);
}

/** اسنپ‌شات داده کتاب فعال — تا resolve شدن chunk، null (اسکلت) */
export function getBookDataSnapshot(): BookData | null {
  const id = getActiveBookSnapshot();
  if (!id) return null;
  return cache.get(id) ?? null;
}

/** اسنپ‌شات سرور — داده هرگز سمت سرور بارگذاری نمی‌شود */
export function getServerBookDataSnapshot(): BookData | null {
  return null;
}

export function subscribeBookData(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
