"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny external store for the user's display name (persisted in localStorage).
 */

const NAME_KEY = "visionone:name";
const listeners = new Set<() => void>();
let cache: string | null = null;

function read(): string {
  if (cache !== null) return cache;
  try {
    cache = localStorage.getItem(NAME_KEY) ?? "";
  } catch {
    cache = "";
  }
  return cache;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function useUserName(): string {
  return useSyncExternalStore(
    subscribe,
    () => read(),
    () => "",
  );
}

export function setName(name: string) {
  cache = name.trim().slice(0, 40);
  try {
    if (cache) localStorage.setItem(NAME_KEY, cache);
    else localStorage.removeItem(NAME_KEY);
  } catch {
    /* noop */
  }
  listeners.forEach((l) => l());
}
