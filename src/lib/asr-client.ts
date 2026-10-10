"use client";

/**
 * کلاینت ضبط صدا و ارسال به /api/asr — زیرساخت مشترک «بگو ببینم»،
 * مکالمه نقش‌محور و هر تمرین Speaking دیگر.
 *
 * MediaRecorder در کروم اندروید webm/opus و در سافاری iOS mp4 می‌دهد؛
 * هر دو به سرویس ASR فرستاده می‌شوند و خطاها محترمانه برمی‌گردند.
 */

export type RecorderState = "idle" | "requesting" | "recording" | "processing";

export interface AsrResult {
  ok: boolean;
  text?: string;
  error?: string;
}

/** mime پشتیبانی‌شده را انتخاب می‌کند — سافاری mp4، کروم webm */
export function pickRecorderMime(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"];
  return candidates.find((c) => MediaRecorder.isTypeSupported(c));
}

/** آیا مرورگر اصلاً ضبط صدا دارد؟ */
export function isRecordingSupported(): boolean {
  return (
    typeof navigator !== "undefined" &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof MediaRecorder !== "undefined"
  );
}

export interface Recorder {
  stop: () => Promise<AsrResult>;
  cancel: () => void;
}

/**
 * ضبط را شروع می‌کند. تابع برگشتیِ stop نتیجهٔ ASR را می‌دهد
 * (ضبط + ارسال به سرور در یک جریان). cancel همه‌چیز را بدون ارسال می‌بندد.
 */
export async function startRecording(maxMs = 7000): Promise<Recorder> {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: true, noiseSuppression: true },
  });

  const mime = pickRecorderMime();
  const chunks: BlobPart[] = [];
  const recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };
  recorder.start();

  // توقف خودکار برای جلوگیری از ضبط‌های خیلی بلند
  const autoTimer = window.setTimeout(() => {
    if (recorder.state === "recording") recorder.stop();
  }, maxMs);

  async function stop(): Promise<AsrResult> {
    window.clearTimeout(autoTimer);
    const blob = await new Promise<Blob>((resolve) => {
      recorder.onstop = () => resolve(new Blob(chunks, { type: recorder.mimeType || "audio/webm" }));
      if (recorder.state !== "inactive") recorder.stop();
      else resolve(new Blob(chunks, { type: recorder.mimeType || "audio/webm" }));
    });
    stream.getTracks().forEach((t) => t.stop());

    if (blob.size < 800) {
      return { ok: false, error: "صدایی ضبط نشد — دوباره تلاش کن" };
    }
    return sendToAsr(blob);
  }

  function cancel() {
    window.clearTimeout(autoTimer);
    try {
      if (recorder.state !== "inactive") recorder.stop();
    } catch {
      /* noop */
    }
    stream.getTracks().forEach((t) => t.stop());
  }

  return { stop, cancel };
}

/** ارسال blob صوتی به /api/asr و گرفتن متن */
export async function sendToAsr(blob: Blob): Promise<AsrResult> {
  try {
    const base64 = await blobToBase64(blob);
    const res = await fetch("/api/asr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ audioBase64: base64, mime: blob.type }),
    });
    const data = (await res.json()) as { text?: string; error?: string };
    if (!res.ok || !data.text) {
      return { ok: false, error: data.error ?? "تشخیص گفتار ناموفق بود" };
    }
    return { ok: true, text: data.text };
  } catch {
    return { ok: false, error: "شبکه در دسترس نیست — به اینترنت وصل شو و دوباره تلاش کن" };
  }
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? "");
      const comma = result.indexOf(",");
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(new Error("read failed"));
    reader.readAsDataURL(blob);
  });
}
