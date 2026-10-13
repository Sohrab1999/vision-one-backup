// ─── فاز G2-d — draft جدول نیمه‌کاره (کلید افزودنی؛ بدون PII) ───

import { parseKey, type CrosswordPuzzle } from "./generator";
import { COUNT_OPTIONS } from "./types";

/**
 * شکل draft ذخیره‌شده در `visionone:game-draft:crossword`:
 * فیلدهای دستور {bookId, lesson, cells, savedAt} عیناً حفظ شده‌اند و فیلدهای
 * افزودنیِ لازم برای بازگردانی «حروف سر جایشان» کنارشان می‌نشینند:
 * - wordCount: تنظیمات دور (اسکوپ Attempt/رکورد)
 * - puzzle: ساختار جدول تولیدی — چیدمان تصادفی است و بدون آن خانه‌ها قابل
 *   بازگردانی نیستند
 * - solved: واژه‌های حل‌شده برای بازسازی سلول‌های قفل‌شده
 * - hints/secs: شرط رکورد «بدون راهنما» و زمان سپری‌شده — وگرنه ادامهٔ دور
 *   رکورد را می‌شکند
 */
export interface CrosswordDraft {
  bookId: string;
  lesson: number;
  wordCount: number;
  cells: Record<string, string>;
  savedAt: number;
  puzzle: CrosswordPuzzle;
  solved: number[];
  hints: number;
  secs: number;
}

export const DRAFT_KEY = "visionone:game-draft:crossword";
export const DRAFT_EVENT = "visionone:game-draft-change";

export const readDraftRaw = (): string | null => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(DRAFT_KEY);
  } catch {
    return null;
  }
};

export const notifyDraftChange = (): void => {
  try {
    window.dispatchEvent(new CustomEvent(DRAFT_EVENT));
  } catch {
    /* noop */
  }
};

/** اشتراک تغییر draft — الگوی استورهای پروژه (storage بین-تب + رویداد محلی) */
export function subscribeDraft(cb: () => void): () => void {
  window.addEventListener("storage", cb);
  window.addEventListener(DRAFT_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(DRAFT_EVENT, cb);
  };
}

export const saveDraft = (d: CrosswordDraft): void => {
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
  } catch {
    /* noop — ذخیرهٔ draft هرگز خروج را نمی‌بندد */
  }
  notifyDraftChange();
};

/** پاک‌کردن draft — فقط اگر مال همین کتاب باشد (draft کتاب دیگر دست‌نخورده می‌ماند) */
export const clearDraftForBook = (bookId: string): void => {
  const raw = readDraftRaw();
  if (raw === null) return;
  let belongs = true;
  try {
    const d = JSON.parse(raw) as { bookId?: unknown } | null;
    belongs = d?.bookId === bookId;
  } catch {
    belongs = true; // خراب = زباله است، پاک می‌شود
  }
  if (!belongs) return;
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* noop */
  }
  notifyDraftChange();
};

/**
 * اعتبارسنجی سخت‌گیرانهٔ draft خوانده‌شده — هر ایراد = null (سرکش، بدون خطا).
 * جدول باید حرف‌به‌حرف با placements سازگار باشد تا «حروف سر جایشان» معنا داشته باشد.
 */
export function parseDraft(raw: string | null): CrosswordDraft | null {
  if (!raw) return null;
  try {
    const d = JSON.parse(raw) as unknown;
    if (!d || typeof d !== "object" || Array.isArray(d)) return null;
    const o = d as Record<string, unknown>;
    if (typeof o.bookId !== "string" || o.bookId.length === 0) return null;
    if (typeof o.lesson !== "number" || !Number.isFinite(o.lesson)) return null;
    if (typeof o.wordCount !== "number" || !COUNT_OPTIONS.includes(o.wordCount)) return null;
    if (typeof o.savedAt !== "number" || !(o.savedAt > 0)) return null;
    if (typeof o.hints !== "number" || !Number.isFinite(o.hints) || o.hints < 0) return null;
    if (typeof o.secs !== "number" || !Number.isFinite(o.secs) || o.secs < 0) return null;
    const cells = o.cells;
    if (!cells || typeof cells !== "object" || Array.isArray(cells)) return null;
    const p = o.puzzle as CrosswordPuzzle | null;
    if (!p || typeof p !== "object" || Array.isArray(p)) return null;
    if (
      !Number.isInteger(p.rows) ||
      !Number.isInteger(p.cols) ||
      p.rows < 3 ||
      p.cols < 3 ||
      p.rows > 13 ||
      p.cols > 13
    ) {
      return null;
    }
    if (!Array.isArray(p.grid) || p.grid.length !== p.rows) return null;
    for (const row of p.grid) {
      if (!Array.isArray(row) || row.length !== p.cols) return null;
      for (const cell of row) {
        if (!cell || typeof cell !== "object" || Array.isArray(cell)) return null;
        if (typeof cell.letter !== "string") return null;
        if (cell.num !== null && typeof cell.num !== "number") return null;
      }
    }
    if (!Array.isArray(p.placements) || p.placements.length === 0) return null;
    for (const pl of p.placements) {
      if (!pl || typeof pl !== "object" || Array.isArray(pl)) return null;
      if (typeof pl.word !== "string" || !/^[A-Z]{3,9}$/.test(pl.word)) return null;
      if (typeof pl.meaning !== "string" || pl.meaning.length === 0) return null;
      if (typeof pl.row !== "number" || typeof pl.col !== "number") return null;
      if (pl.dir !== "across" && pl.dir !== "down") return null;
      const endR = pl.dir === "down" ? pl.row + pl.word.length - 1 : pl.row;
      const endC = pl.dir === "across" ? pl.col + pl.word.length - 1 : pl.col;
      if (pl.row < 0 || pl.col < 0 || endR >= p.rows || endC >= p.cols) return null;
      for (let j = 0; j < pl.word.length; j++) {
        const r = pl.dir === "down" ? pl.row + j : pl.row;
        const c = pl.dir === "across" ? pl.col + j : pl.col;
        if (p.grid[r][c].letter !== pl.word[j]) return null;
      }
    }
    for (const [k, v] of Object.entries(cells as Record<string, unknown>)) {
      if (typeof v !== "string" || !/^[A-Z]$/.test(v)) return null;
      if (!/^\d+,\d+$/.test(k)) return null;
      const [r, c] = parseKey(k);
      const cell = p.grid[r]?.[c];
      if (!cell || cell.letter === "") return null; // خانهٔ پرشده باید روی خانهٔ حرف‌دار جدول باشد
    }
    const solved = o.solved;
    if (
      !Array.isArray(solved) ||
      solved.some(
        (id) => typeof id !== "number" || !Number.isInteger(id) || id < 0 || id >= p.placements.length,
      )
    ) {
      return null;
    }
    return {
      bookId: o.bookId,
      lesson: o.lesson,
      wordCount: o.wordCount,
      cells: cells as Record<string, string>,
      savedAt: o.savedAt,
      puzzle: p,
      solved: solved as number[],
      hints: o.hints,
      secs: o.secs,
    };
  } catch {
    return null;
  }
}
