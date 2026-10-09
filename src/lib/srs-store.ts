"use client";

import { useSyncExternalStore } from "react";
import { readScoped, writeScoped, registerScopedReset } from "./book-storage";

/**
 * Leitner-box SRS (Spaced Repetition) store for flashcards.
 *
 * Each word has a box level 0..5:
 *  - answered "بلد بودم"  → box +1 (max 5)
 *  - answered "بلد نبودم" → box 0
 * Session selection weights words by (5 - box) so hard/unseen words appear more.
 * Persisted in localStorage scoped per book: visionone:book:<id>:srs
 */

export const SRS_MAX_BOX = 5;

const STORE_NAME = "srs";
const EMPTY: Record<string, { box: number; seen: number; wrong: number }> = {};

export interface SrsItem {
  box: number;
  seen: number;
  wrong: number;
}

type SrsData = Record<string, SrsItem>;

let cache: SrsData | null = null;
const listeners = new Set<() => void>();
registerScopedReset(() => {
  cache = null;
});

function read(): SrsData {
  if (cache) return cache;
  try {
    const raw = readScoped(STORE_NAME);
    cache = raw ? (JSON.parse(raw) as SrsData) : {};
  } catch {
    cache = {};
  }
  return cache;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function persist(next: SrsData) {
  cache = next;
  try {
    writeScoped(STORE_NAME, JSON.stringify(next));
  } catch {
    /* noop */
  }
  listeners.forEach((l) => l());
}

/** Record a flashcard answer. known=true promotes the word, known=false resets it. */
export function recordSRS(word: string, known: boolean) {
  const data = read();
  const prev = data[word] ?? { box: 0, seen: 0, wrong: 0 };
  persist({
    ...data,
    [word]: {
      box: known ? Math.min(prev.box + 1, SRS_MAX_BOX) : 0,
      seen: prev.seen + 1,
      wrong: known ? prev.wrong : prev.wrong + 1,
    },
  });
}

/** Weight for session picking — unseen/weak words get the highest weight. */
export function srsWeight(item: SrsItem | undefined): number {
  if (!item) return SRS_MAX_BOX + 1; // unseen → highest priority
  return SRS_MAX_BOX - item.box + 1;
}

export function useSRSData(): Record<string, SrsItem> {
  return useSyncExternalStore(
    subscribe,
    () => read(),
    () => EMPTY,
  );
}
