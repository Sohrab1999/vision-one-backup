"use client";

import { useSyncExternalStore } from "react";

/**
 * Cross-view "practice intent" — از نماهای دیگر (واژگان، پاپ‌اور جست‌وجوی واژه)
 * یک دور تمرین مشخص در نمای «تمرین» (فلاش‌کارت SRS / بازی تطبیق) با فیلترهای
 * آماده تنظیم می‌شود. FlashcardView هنگام mount آن را مصرف می‌کند.
 *
 * nonce باعث می‌شود درخواست تکراری هم دوباره اعمال شود.
 */

export interface PracticeIntent {
  tab: "cards" | "match";
  starredOnly: boolean;
  weakOnly: boolean;
  nonce: number;
}

const EMPTY: PracticeIntent = { tab: "cards", starredOnly: false, weakOnly: false, nonce: 0 };

let state: PracticeIntent = { ...EMPTY };
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

/** Queue a practice session with pre-set filters (called from other views). */
export function setPracticeIntent(intent: Omit<PracticeIntent, "nonce">) {
  state = { ...intent, nonce: state.nonce + 1 };
  emit();
}

/** Consume the intent after it has been applied to initial state. */
export function clearPracticeIntent() {
  if (!state.nonce) return;
  state = { ...EMPTY };
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function usePracticeIntent(): PracticeIntent {
  return useSyncExternalStore(subscribe, () => state, () => EMPTY);
}
