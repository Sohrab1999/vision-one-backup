"use client";

import { useSyncExternalStore } from "react";

/**
 * Cross-view «intent فیلتر درس در مرور» (گزینهٔ ④ سند آموزش مصوب مالک ۲۰۲۶-۱۱-۱۴ —
 * «مرور درس‌پایه در SRS»: فیلتر «فقط درس N» در صف مرور موجود).
 *
 * از گام ۴ (جمع‌بندی) جریان درس‌محور یک درس مشخص تنظیم می‌شود و ReviewView هنگام
 * mount آن را مصرف می‌کند — الگوی عین practice-intent.ts (nonce برای درخواست تکراری).
 * lesson = null یعنی «همهٔ کتاب» (فیلتر پاک شود).
 */

export interface ReviewLessonIntent {
  lesson: number | null;
  nonce: number;
}

const EMPTY: ReviewLessonIntent = { lesson: null, nonce: 0 };

let state: ReviewLessonIntent = { ...EMPTY };
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

/** درخواست مرور فقط یک درس (called from event handlers only). */
export function setReviewLessonIntent(lesson: number | null) {
  state = { lesson, nonce: state.nonce + 1 };
  emit();
}

/** Consume the intent after it has been applied to initial state. */
export function clearReviewLessonIntent() {
  if (!state.nonce) return;
  state = { ...EMPTY };
  emit();
}

/** خواندن همگام برای initializer وضعیت — مصرف‌کننده پس از اعمال clear می‌کند */
export function getReviewLessonIntent(): ReviewLessonIntent {
  return state;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useReviewLessonIntent(): ReviewLessonIntent {
  return useSyncExternalStore(subscribe, () => state, () => EMPTY);
}
