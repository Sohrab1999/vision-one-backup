"use client";

/**
 * Client-side TTS helper: caches generated audio in two layers —
 * 1) in-memory object-URLs for the session
 * 2) Cache Storage ("visionone-audio-v1") for offline playback across reloads
 *
 * Voices: jam (British gentleman — great for English), kazi, tongtong, ...
 */

const AUDIO_CACHE = "visionone-audio-v1";
const AUDIO_CACHE_MAX = 400; // سقف تعداد فایل‌های صوتی کش‌شده

const cache = new Map<string, string>();

let currentAudio: HTMLAudioElement | null = null;

export function stopSpeaking() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

/** کلید یکتا برای یک قطعه صوتی — هم برای memory هم Cache Storage */
function audioKey(voice: string, speed: number, text: string): string {
  return `/api/tts?voice=${encodeURIComponent(voice)}&speed=${speed}&text=${encodeURIComponent(text)}`;
}

/** واکشی از Cache Storage آفلاین (اگر موجود باشد) */
async function fetchCachedAudio(key: string): Promise<Blob | null> {
  try {
    if (typeof caches === "undefined") return null;
    const store = await caches.open(AUDIO_CACHE);
    const hit = await store.match(key);
    if (hit) {
      const blob = await hit.blob();
      trimAudioCache(store);
      return blob;
    }
  } catch {
    /* Cache Storage در دسترس نیست — بی‌صدا رد شو */
  }
  return null;
}

/** ذخیره صوت در Cache Storage برای پخش آفلاین بعدی */
async function storeAudioOffline(key: string, res: Response): Promise<void> {
  try {
    if (typeof caches === "undefined" || !res.ok) return;
    const store = await caches.open(AUDIO_CACHE);
    await store.put(key, res.clone());
    trimAudioCache(store);
  } catch {
    /* کش آفلاین اختیاری است — خطا نادیده گرفته می‌شود */
  }
}

/** سقف کش: اگر شلوغ شد قدیمی‌ها حذف می‌شوند */
async function trimAudioCache(store: Cache): Promise<void> {
  try {
    const keys = await store.keys();
    if (keys.length <= AUDIO_CACHE_MAX) return;
    for (const k of keys.slice(0, keys.length - AUDIO_CACHE_MAX)) {
      await store.delete(k);
    }
  } catch {
    /* noop */
  }
}

export async function speak(
  text: string,
  opts: { voice?: string; speed?: number; onStart?: () => void; onEnd?: () => void } = {},
): Promise<void> {
  const { voice = "jam", speed = 1, onStart, onEnd } = opts;
  const key = audioKey(voice, speed, text);

  stopSpeaking();
  onStart?.();

  try {
    let blob: Blob | null = null;

    // لایه ۱ — حافظه نشست
    const memoryUrl = cache.get(key);
    if (memoryUrl) {
      const res = await fetch(memoryUrl);
      blob = await res.blob();
    }

    // لایه ۲ — Cache Storage آفلاین
    if (!blob) blob = await fetchCachedAudio(key);

    // لایه ۳ — شبکه
    if (!blob) {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice, speed }),
      });
      if (!res.ok) throw new Error("TTS failed");
      // clone باید قبل از مصرف body انجام شود — وگرنه «Body is unusable» می‌دهد
      const offlineCopy = res.clone();
      void storeAudioOffline(key, offlineCopy); // آفلاین‌فرست: برای بار بعدی کش شود
      blob = await res.blob();
    }

    const url = URL.createObjectURL(blob);
    cache.set(key, url);
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
