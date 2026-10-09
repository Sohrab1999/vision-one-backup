"use client";

/**
 * Client-side TTS helper: caches generated audio object-URLs in memory.
 * Voices: jam (British gentleman — great for English), kazi, tongtong, ...
 */

const cache = new Map<string, string>();

let currentAudio: HTMLAudioElement | null = null;

export function stopSpeaking() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

export async function speak(
  text: string,
  opts: { voice?: string; speed?: number; onStart?: () => void; onEnd?: () => void } = {},
): Promise<void> {
  const { voice = "jam", speed = 1, onStart, onEnd } = opts;
  const key = `${voice}|${speed}|${text}`;

  stopSpeaking();
  onStart?.();

  try {
    let url = cache.get(key);
    if (!url) {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice, speed }),
      });
      if (!res.ok) throw new Error("TTS failed");
      const blob = await res.blob();
      url = URL.createObjectURL(blob);
      cache.set(key, url);
    }
    const audio = new Audio(url);
    currentAudio = audio;
    audio.onended = () => {
      if (currentAudio === audio) currentAudio = null;
      onEnd?.();
    };
    audio.onerror = () => onEnd?.();
    await audio.play();
  } catch (e) {
    console.error("speak error:", e);
    onEnd?.();
  }
}
