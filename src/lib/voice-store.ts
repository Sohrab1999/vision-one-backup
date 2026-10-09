"use client";

import { useSyncExternalStore } from "react";

/**
 * External store for voice playback preferences (speed), persisted in
 * localStorage and consumed via useSyncExternalStore.
 */

const VOICE_KEY = "visionone:voice-speed";
const SPEEDS = [0.75, 0.9, 1, 1.2] as const;
export type VoiceSpeed = (typeof SPEEDS)[number];

const EMPTY: VoiceSpeed = 0.9;

let cache: VoiceSpeed | null = null;
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

export function useVoiceSpeed(): { speed: VoiceSpeed; setSpeed: (s: VoiceSpeed) => void } {
  const speed = useSyncExternalStore(
    subscribe,
    () => read(),
    () => EMPTY,
  );
  return { speed, setSpeed: setVoiceSpeed };
}

export const VOICE_SPEED_OPTIONS: { value: VoiceSpeed; label: string }[] = [
  { value: 0.75, label: "کند" },
  { value: 0.9, label: "معمولی" },
  { value: 1, label: "طبیعی" },
  { value: 1.2, label: "تند" },
];
