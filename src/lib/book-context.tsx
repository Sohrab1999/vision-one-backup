"use client";

/**
 * BookProvider — کانتکست کتاب فعال در کتابخانه چندجزوه‌ای.
 *
 * - bookId = null یعنی کاربر هنوز کتابی انتخاب نکرده (نمای «قفسه کتاب»)
 * - کتاب فعال یک external store است (book-storage)؛ پس بازیابی کتاب ذخیره‌شده
 *   و سوییچ کتاب بدون هیچ useEffect انجام می‌شود (سازگار با react-hooks v6).
 * - data برای کتاب‌های هنوز آپلودنشده null است (کارت «به‌زودی»).
 */

import { createContext, useCallback, useContext, useMemo } from "react";
import { useSyncExternalStore } from "react";
import type { BookId, BookData, BookMeta } from "@/data/books/types";
import { BOOKS, getBookData, getBookMeta } from "@/data/books/registry";
import {
  setActiveBookId,
  getActiveBookSnapshot,
  getServerBookSnapshot,
  subscribeActiveBook,
} from "./book-storage";

interface BookContextValue {
  /** کتاب فعال — null یعنی قفسه */
  bookId: BookId | null;
  /** متادیتای کتاب فعال */
  meta: BookMeta | null;
  /** داده محتوایی کتاب فعال (برای جزوه‌های آپلودنشده null) */
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

  const setBook = useCallback((id: BookId) => {
    const meta = getBookMeta(id);
    if (!meta || !meta.available) return;
    setActiveBookId(id); // persist + reset کَش استورهای scoped + notify
  }, []);

  const value = useMemo<BookContextValue>(() => {
    const meta = bookId ? (getBookMeta(bookId) ?? null) : null;
    const data = bookId ? getBookData(bookId) : null;
    return {
      bookId,
      meta,
      data: data ?? null,
      setBook,
      books: BOOKS,
    };
  }, [bookId, setBook]);

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

/** کانتکست کتاب — حتی روی قفسه (با bookId=null) در دسترس است */
export function useBook(): BookContextValue {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error("useBook must be used within BookProvider");
  return ctx;
}

/** برای ویوهایی که فقط وقتی کتاب فعال است رندر می‌شوند — data قطعاً موجود است */
export function useBookData(): BookData {
  const { data } = useBook();
  if (!data) throw new Error("useBookData used without an active book");
  return data;
}
