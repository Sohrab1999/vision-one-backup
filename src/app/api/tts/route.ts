import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { mkdirSync, existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const CACHE_DIR = path.join("/tmp", "vision-tts");
const MAX_INPUT = 1000;

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
  const response = await zai.audio.tts.create({
    input: text,
    voice,
    speed,
    response_format: "mp3",
    stream: false,
  });
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(new Uint8Array(arrayBuffer));
}

export async function POST(req: NextRequest) {
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
    const file = path.join(CACHE_DIR, `${key}.mp3`);

    if (existsSync(file)) {
      const cached = readFileSync(file);
      return new NextResponse(new Uint8Array(cached), {
        status: 200,
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Length": cached.length.toString(),
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    mkdirSync(CACHE_DIR, { recursive: true });

    const chunks = chunkText(text);
    const buffers: Buffer[] = [];
    for (const chunk of chunks) {
      buffers.push(await generateChunk(chunk, safeVoice, safeSpeed));
    }
    const audio = Buffer.concat(buffers);
    writeFileSync(file, audio);

    return new NextResponse(new Uint8Array(audio), {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
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
