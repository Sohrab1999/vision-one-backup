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
 */

import type { BookData, BookId } from "@/data/books/types";
import { loadBookData } from "@/data/books/registry";
import { getActiveBookSnapshot } from "./book-storage";

const listeners = new Set<() => void>();

/** کش داده هر کتاب پس از اولین بارگذاری — سوییچ برگشت بدون تأخیر */
const cache = new Map<BookId, BookData>();

/** importهای در جریان — از تکرار درخواست هم‌زمان همان کتاب جلوگیری می‌کند */
const pending = new Set<BookId>();

function emit() {
  listeners.forEach((l) => l());
}

/** شروع بارگذاری داده کتاب درخواستی (بدون رقابت — تکرارش بی‌اثر است) */
export function requestBookData(id: BookId | null) {
  if (!id || cache.has(id) || pending.has(id)) return;
  pending.add(id);
  loadBookData(id)
    .then((data) => {
      if (data) cache.set(id, data);
    })
    .catch((err) => {
      console.error(`book-data-store: خطا در بارگذاری داده ${id}`, err);
    })
    .finally(() => {
      pending.delete(id);
      emit();
    });
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
