"use client";

/**
 * TTS با دو موتور:
 *  1) «بومی مرورگر» — speechSynthesis سیستم‌عامل با صدای انگلیسی Native
 *     (پیش‌فرض: بدون لهجه، آفلاین، بی‌هزینه) ← رفع مشکل لهجه چینی
 *  2) «سرور» — /api/tts (z-ai SDK؛ صداهای چینی‌پایه) با کش دولایه
 *     حافظه + Cache Storage برای پخش آفلاین
 *
 * انتخاب موتور از voice-store خوانده می‌شود؛ اگر موتور بومی موجود نبود
 * (مرورگر بی‌صدا یا بدون صدای انگلیسی) به‌طور شفاف به سرور برمی‌گردیم.
 */

import { readEngineInternal } from "./voice-store";

const AUDIO_CACHE = "visionone-audio-v1";
const AUDIO_CACHE_MAX = 400; // سقف تعداد فایل‌های صوتی کش‌شده

const cache = new Map<string, string>();

let currentAudio: HTMLAudioElement | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;

export function stopSpeaking() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  try {
    if (typeof speechSynthesis !== "undefined" && speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    currentUtterance = null;
  } catch {
    /* noop */
  }
}

// ─── موتور بومی مرورگر ───────────────────────────────────────────────

let cachedVoice: SpeechSynthesisVoice | null = null;
let voicesResolved = false;

/** بهترین صدای انگلیسی دستگاه را برمی‌گزیند (GB > US > هر en) */
function pickBrowserVoice(): SpeechSynthesisVoice | null {
  if (typeof speechSynthesis === "undefined") return null;
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return null;
  const en = voices.filter((v) => v.lang.toLowerCase().startsWith("en"));
  if (!en.length) return null;
  const score = (v: SpeechSynthesisVoice): number => {
    const n = v.name.toLowerCase();
    let s = 0;
    if (v.lang.toLowerCase() === "en-gb") s += 6;
    else if (v.lang.toLowerCase() === "en-us") s += 5;
    if (/\bnatural\b|\bneural\b/.test(n)) s += 5;
    if (/google/.test(n)) s += 4;
    if (/samantha|daniel|karen|serena|moira|tessa|arthur/.test(n)) s += 3;
    if (/microsoft/.test(n)) s += 2;
    if (/premium|enhanced/.test(n)) s += 2;
    if (v.localService) s += 1;
    return s;
  };
  return en.reduce((best, v) => (score(v) > score(best) ? v : best), en[0]);
}

/** صداها در کروم به‌صورت async لود می‌شوند — تا ۱ثانیه منتظر می‌مانیم */
async function resolveBrowserVoice(): Promise<SpeechSynthesisVoice | null> {
  if (typeof speechSynthesis === "undefined") return null;
  if (cachedVoice && speechSynthesis.getVoices().includes(cachedVoice)) return cachedVoice;
  const immediate = pickBrowserVoice();
  if (immediate) {
    cachedVoice = immediate;
    voicesResolved = true;
    return immediate;
  }
  if (voicesResolved) return null; // قبلاً صبر کردیم و چیزی نبود
  const found = await new Promise<SpeechSynthesisVoice | null>((resolve) => {
    const done = (v: SpeechSynthesisVoice | null) => {
      speechSynthesis.removeEventListener("voiceschanged", onChange);
      window.clearTimeout(timer);
      resolve(v);
    };
    const onChange = () => {
      const v = pickBrowserVoice();
      if (v) done(v);
    };
    const timer = window.setTimeout(() => done(pickBrowserVoice()), 1000);
    speechSynthesis.addEventListener("voiceschanged", onChange);
  });
  voicesResolved = true;
  cachedVoice = found;
  return found;
}

function speakBrowser(
  text: string,
  speed: number,
  onStart: () => void,
  onEnd: () => void,
  voice: SpeechSynthesisVoice,
): void {
  const utter = new SpeechSynthesisUtterance(text);
  utter.voice = voice;
  utter.lang = voice.lang;
  utter.rate = Math.min(Math.max(speed, 0.5), 2);
  utter.pitch = 1;
  utter.onstart = onStart;
  utter.onend = () => {
    if (currentUtterance === utter) currentUtterance = null;
    onEnd();
  };
  utter.onerror = () => {
    if (currentUtterance === utter) currentUtterance = null;
    onEnd();
  };
  currentUtterance = utter;
  speechSynthesis.speak(utter);
}

// ─── موتور سرور با کش دولایه ────────────────────────────────────────

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

async function speakCloud(
  text: string,
  opts: { voice: string; speed: number; onStart: () => void; onEnd: () => void },
): Promise<void> {
  const { voice, speed, onStart, onEnd } = opts;
  const key = audioKey(voice, speed, text);
  // خارج از try — در catch برای تشخیص «قطع عمدی» لازم است
  let audio: HTMLAudioElement | null = null;

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
    audio = new Audio(url);
    currentAudio = audio;
    audio.onended = () => {
      if (currentAudio === audio) currentAudio = null;
      onEnd();
    };
    audio.onerror = () => onEnd();
    await audio.play();
  } catch (e) {
    // فاز F10 — قطع عمدی پخش قبلی (stopSpeaking در سؤال بعدی/«پخش دوباره» شنیداری)
    // عادی است و نباید خطای کنسول بدهد؛ فقط خطای واقعی شبکه/پخش گزارش می‌شود.
    if (audio !== null && currentAudio !== audio) {
      onEnd();
      return;
    }
    console.error("speak error:", e);
    onEnd();
  }
}

// ─── نقطهٔ ورود واحد ─────────────────────────────────────────────────

export async function speak(
  text: string,
  opts: { voice?: string; speed?: number; onStart?: () => void; onEnd?: () => void } = {},
): Promise<void> {
  const { voice = "jam", speed = 1, onStart, onEnd } = opts;

  stopSpeaking();
  onStart?.();

  const engine = readEngineInternal();

  if (engine === "browser") {
    const bv = await resolveBrowserVoice();
    if (bv) {
      speakBrowser(text, speed, () => onStart?.(), () => onEnd?.(), bv);
      return;
    }
    // مرورگر صدای انگلیسی ندارد → شفاف به سرور برمی‌گردیم
  }

  await speakCloud(text, { voice, speed, onStart: () => onStart?.(), onEnd: () => onEnd?.() });
}

/** آیا موتور بومی واقعاً صدای انگلیسی دارد؟ (برای UI انتخاب موتور) */
export async function browserVoiceAvailable(): Promise<boolean> {
  return (await resolveBrowserVoice()) !== null;
}
