"use client";

import { useSyncExternalStore } from "react";

/**
 * External store for voice playback preferences (engine + speed),
 * persisted in localStorage and consumed via useSyncExternalStore.
 *
 * فاز ۷ — رفع لهجه چینی: موتور «بومی مرورگر» پیش‌فرض است (صداهای
 * انگلیسی Native سیستم‌عامل — iOS/اندروید/دسکتاپ) و موتور «سرور»
 * (z-ai TTS با صداهای چینی‌پایه) فقط به‌عنوان جایگزین انتخابی می‌ماند.
 */

const VOICE_KEY = "visionone:voice-speed";
const ENGINE_KEY = "visionone:voice-engine";
const SPEEDS = [0.75, 0.9, 1, 1.2] as const;
export type VoiceSpeed = (typeof SPEEDS)[number];
export type VoiceEngine = "browser" | "cloud";

const EMPTY: VoiceSpeed = 0.9;
const EMPTY_ENGINE: VoiceEngine = "browser";

let cache: VoiceSpeed | null = null;
let engineCache: VoiceEngine | null = null;
const listeners = new Set<() => void>();

function read(): VoiceSpeed {
  if (cache) return cache;
  try {
    const raw = Number(localStorage.getItem(VOICE_KEY));
    cache = (SPEEDS as readonly number[]).includes(raw) ? (raw as VoiceSpeed) : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function readEngine(): VoiceEngine {
  if (engineCache) return engineCache;
  try {
    const raw = localStorage.getItem(ENGINE_KEY);
    engineCache = raw === "cloud" || raw === "browser" ? raw : EMPTY_ENGINE;
  } catch {
    engineCache = EMPTY_ENGINE;
  }
  return engineCache;
}

/** خواندن مستقیم موتور بدون هوک — برای استفاده در speak.ts */
export function readEngineInternal(): VoiceEngine {
  return readEngine();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function setVoiceSpeed(s: VoiceSpeed) {
  cache = s;
  try {
    localStorage.setItem(VOICE_KEY, String(s));
  } catch {
    /* noop */
  }
  listeners.forEach((l) => l());
}

export function setVoiceEngine(e: VoiceEngine) {
  engineCache = e;
  try {
    localStorage.setItem(ENGINE_KEY, e);
  } catch {
    /* noop */
  }
  listeners.forEach((l) => l());
}

export function useVoiceSpeed(): { speed: VoiceSpeed; setSpeed: (s: VoiceSpeed) => void } {
  const speed = useSyncExternalStore(
    subscribe,
    () => read(),
    () => EMPTY,
  );
  return { speed, setSpeed: setVoiceSpeed };
}

export function useVoiceEngine(): { engine: VoiceEngine; setEngine: (e: VoiceEngine) => void } {
  const engine = useSyncExternalStore(
    subscribe,
    () => readEngine(),
    () => EMPTY_ENGINE,
  );
  return { engine, setEngine: setVoiceEngine };
}

export const VOICE_SPEED_OPTIONS: { value: VoiceSpeed; label: string }[] = [
  { value: 0.75, label: "کند" },
  { value: 0.9, label: "معمولی" },
  { value: 1, label: "طبیعی" },
  { value: 1.2, label: "تند" },
];

export const VOICE_ENGINE_OPTIONS: { value: VoiceEngine; label: string; hint: string }[] = [
  { value: "browser", label: "بومی مرورگر", hint: "صدای انگلیسی اصلی دستگاه — بدون لهجه و آفلاین" },
  { value: "cloud", label: "سرور", hint: "صدای تولیدی سرور (جایگزین)" },
];
