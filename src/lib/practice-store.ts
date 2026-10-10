"use client";

import { useSyncExternalStore } from "react";

/**
 * Cross-view store for "practice a specific set of questions".
 *
 * Stats view («سؤال‌های پراشتباه») fills it, then navigates to the quiz view;
 * QuizGame reads + consumes it on the setup screen and starts a round with
 * exactly those question ids (via /api/questions?ids=...).
 *
 * A `nonce` counter makes repeated requests with the same ids re-trigger.
 */

const EMPTY: { ids: string[]; nonce: number } = { ids: [], nonce: 0 };

let state: { ids: string[]; nonce: number } = { ids: [], nonce: 0 };
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

/** Queue a practice round with specific question ids. */
export function setPracticeIds(ids: string[]) {
  const clean = ids.filter((x) => typeof x === "string" && x.length > 5).slice(0, 60);
  if (!clean.length) return;
  state = { ids: clean, nonce: state.nonce + 1 };
  emit();
}

/** Consume the queued ids (keeps them visible until started). */
export function clearPracticeIds() {
  if (!state.ids.length) return;
  state = { ids: [], nonce: state.nonce };
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function usePracticeIds(): { ids: string[]; nonce: number } {
  return useSyncExternalStore(subscribe, () => state, () => EMPTY);
}
