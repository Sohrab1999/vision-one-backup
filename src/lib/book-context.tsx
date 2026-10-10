"use client";

/**
 * BookProvider — کانتکست کتاب فعال در کتابخانه چندجزوه‌ای.
 *
 * - bookId = null یعنی کاربر هنوز کتابی انتخاب نکرده (نمای «قفسه کتاب»)
 * - کتاب فعال یک external store است (book-storage)؛ پس بازیابی کتاب ذخیره‌شده
 *   و سوییچ کتاب بدون هیچ setState در effect انجام می‌شود (سازگار با react-hooks v6).
 * - داده کتاب (فاز ۷) با dynamic import تنبل بارگذاری می‌شود — استور بیرونی
 *   book-data-store؛ تا رسیدن chunk، data = null است (اسکلت بارگذاری در page.tsx).
 *   requestBookData در effect فقط متد استور بیرونی را صدا می‌زند، نه setState.
 */

import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useSyncExternalStore } from "react";
import type { BookId, BookData, BookMeta } from "@/data/books/types";
import { BOOKS, getBookMeta } from "@/data/books/registry";
import {
  setActiveBookId,
  getActiveBookSnapshot,
  getServerBookSnapshot,
  subscribeActiveBook,
} from "./book-storage";
import {
  requestBookData,
  getBookDataSnapshot,
  getServerBookDataSnapshot,
  subscribeBookData,
} from "./book-data-store";

interface BookContextValue {
  /** کتاب فعال — null یعنی قفسه */
  bookId: BookId | null;
  /** متادیتای کتاب فعال */
  meta: BookMeta | null;
  /** داده محتوایی کتاب فعال — null یعنی در حال بارگذاری تنبل (یا جزوه غیرفعال) */
  data: BookData | null;
  /** ورود به یک کتاب (فقط اگر available باشد) */
  setBook: (id: BookId) => void;
  /** همه کتاب‌های قفسه */
  books: BookMeta[];
}

const BookContext = createContext<BookContextValue | null>(null);

export function BookProvider({ children }: { children: React.ReactNode }) {
  const bookId = useSyncExternalStore(
    subscribeActiveBook,
    getActiveBookSnapshot,
    getServerBookSnapshot,
  );

  const data = useSyncExternalStore(
    subscribeBookData,
    getBookDataSnapshot,
    getServerBookDataSnapshot,
  );

  // درخواست بارگذاری تنبل داده کتاب فعال — فقط متد استور بیرونی (بدون setState)
  useEffect(() => {
    requestBookData(bookId);
  }, [bookId]);

  const setBook = useCallback((id: BookId) => {
    const meta = getBookMeta(id);
    if (!meta || !meta.available) return;
    setActiveBookId(id); // persist + reset کَش استورهای scoped + notify
  }, []);

  const value = useMemo<BookContextValue>(() => {
    const meta = bookId ? (getBookMeta(bookId) ?? null) : null;
    return {
      bookId,
      meta,
      data: bookId ? data : null,
      setBook,
      books: BOOKS,
    };
  }, [bookId, data, setBook]);

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

/** کانتکست کتاب — حتی روی قفسه (با bookId=null) در دسترس است */
export function useBook(): BookContextValue {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error("useBook must be used within BookProvider");
  return ctx;
}

/** برای ویوهایی که فقط وقتی کتاب فعال و داده آن آماده است رندر می‌شوند */
export function useBookData(): BookData {
  const { data } = useBook();
  if (!data) throw new Error("useBookData used without an active book");
  return data;
}
