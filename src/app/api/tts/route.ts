import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { mkdirSync, existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { checkRate, rateLimited } from "../_lib/rate-limit";
import { consumeDailyQuota, userKeyOf } from "../_lib/ai-guard";
import { logEvent } from "../_lib/logger";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const CACHE_DIR = path.join("/tmp", "vision-tts");
const MAX_INPUT = 1000;
const SAMPLE_RATE = 24000;

// ── محافظ مصوب N1-2 فاز ۳-ب (سند: «نقشه راه ها/نقشه-راه-فاز-۳-N1-2.md») ──
const RATE_LIMIT = 20; // درخواست در دقیقه — مصوب مالک ۱۴۰۵/۸/۱ (۲۰۲۶-۱۰-۲۳)
const RATE_WINDOW_MS = 60_000;
const DAILY_LIMIT = 60; // درخواست در شبانه‌روز تهران — مصوب مالک ۱۴۰۵/۸/۱ (۲۰۲۶-۱۰-۲۳)

/**
 * ثانیه تا نیمه‌شب بعدی تهران — قرارداد مصوب U3 (فاز ۱/B): عدد صحیح ≥ ۱.
 * محاسبهٔ محلی با همان ثابت آفست ai-guard؛ بدون تغییر helper مشترک.
 */
function secondsToTehranMidnight(): number {
  const TEHRAN_UTC_OFFSET_MS = 3.5 * 60 * 60 * 1000; // UTC+3:30
  const msIntoDay = (Date.now() + TEHRAN_UTC_OFFSET_MS) % 86_400_000;
  return Math.max(1, Math.ceil((86_400_000 - msIntoDay) / 1000));
}

/** Wrap raw 16-bit mono PCM data in a standard RIFF/WAVE header. */
function pcmToWav(pcm: Buffer, sampleRate = SAMPLE_RATE, channels = 1, bitsPerSample = 16): Buffer {
  const blockAlign = (channels * bitsPerSample) / 8;
  const byteRate = sampleRate * blockAlign;
  const header = Buffer.alloc(44);
  header.write("RIFF", 0, "ascii");
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVE", 8, "ascii");
  header.write("fmt ", 12, "ascii");
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM format
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36, "ascii");
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

function chunkText(text: string, maxLen = MAX_INPUT): string[] {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLen) return [clean];
  const sentences = clean.match(/[^.!?]+[.!?]+/g) ?? [clean];
  const chunks: string[] = [];
  let current = "";
  for (const s of sentences) {
    if ((current + s).length <= maxLen) {
      current += s;
    } else {
      if (current) chunks.push(current.trim());
      current = s;
    }
  }
  if (current) chunks.push(current.trim());
  return chunks.slice(0, 4);
}

async function generateChunk(
  text: string,
  voice: string,
  speed: number,
): Promise<Buffer> {
  const ZAI = (await import("z-ai-web-dev-sdk")).default;
  const zai = await ZAI.create();
  // NOTE: backend no longer accepts response_format "mp3"; raw PCM is the
  // most reliable format and lets us concatenate chunks into one valid WAV.
  const response = await zai.audio.tts.create({
    input: text,
    voice,
    speed,
    response_format: "pcm",
    stream: false,
  });
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(new Uint8Array(arrayBuffer));
}

export async function POST(req: NextRequest) {
  // ۱) محافظ نرخ — اولین دستور، پیش از خواندن بدنه و بررسی کش (قرارداد فاز ۱/E؛
  //    کش‌خورد هم مشمول نرخ دقیقه‌ای است — تصمیم مصوب مالک فاز ۳-ب)
  const rl = checkRate(req, "tts:post", RATE_LIMIT, RATE_WINDOW_MS);
  if (!rl.ok) {
    logEvent("tts", "rate-limited");
    return rateLimited(rl.retryAfter);
  }

  try {
    const { text, voice = "jam", speed = 1 } = (await req.json()) as {
      text?: string;
      voice?: string;
      speed?: number;
    };

    if (!text || !text.trim()) {
      return NextResponse.json({ error: "متن خالی است" }, { status: 400 });
    }

    const safeVoice = ["tongtong", "chuichui", "xiaochen", "jam", "kazi", "douji", "luodo"].includes(voice)
      ? voice
      : "jam";
    const safeSpeed = Math.min(Math.max(Number(speed) || 1, 0.5), 2);

    const key = createHash("sha1")
      .update(`${safeVoice}|${safeSpeed}|${text.trim()}`)
      .digest("hex");
    const file = path.join(CACHE_DIR, `${key}.wav`);

    if (existsSync(file)) {
      const cached = readFileSync(file);
      return new NextResponse(new Uint8Array(cached), {
        status: 200,
        headers: {
          "Content-Type": "audio/wav",
          "Content-Length": cached.length.toString(),
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    // ۲) سقف روزانه — فقط روی مسیر تولید واقعی (کش‌خورد بالاتر برگشته و سقف روزانه نمی‌گیرد —
    //    تصمیم مصوب مالک ۳-ب؛ یک POST = یک واحد، مستقل از تعداد قطعه‌ها؛
    //    تصمیم مصوب U1: خطای upstream بازپرداخت ندارد؛ 429 با Retry-After طبق U3)
    if (!consumeDailyQuota(userKeyOf(req, "tts"), DAILY_LIMIT)) {
      return NextResponse.json(
        { error: "سقف روزانهٔ روایت صوتی پر شد — فردا دوباره بیا! 🌱" },
        { status: 429, headers: { "Retry-After": String(secondsToTehranMidnight()) } },
      );
    }

    mkdirSync(CACHE_DIR, { recursive: true });

    const chunks = chunkText(text);
    const pcmParts: Buffer[] = [];
    for (const chunk of chunks) {
      pcmParts.push(await generateChunk(chunk, safeVoice, safeSpeed));
    }
    const audio = pcmToWav(Buffer.concat(pcmParts));
    writeFileSync(file, audio);

    return new NextResponse(new Uint8Array(audio), {
      status: 200,
      headers: {
        "Content-Type": "audio/wav",
        "Content-Length": audio.length.toString(),
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (e) {
    console.error("POST /api/tts error:", e);
    return NextResponse.json(
      { error: "خطا در تولید صوت" },
      { status: 500 },
    );
  }
}
