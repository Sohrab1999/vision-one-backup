/**
 * ai — فاز G5-02 «سؤال‌های هوشمند ✨» بازی «تست برقی» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).
 * تفکیک مکانیکی از speed-quiz-game.tsx (پلی‌بوک fps/) — تولید دینامیک از واژگان همین کتاب؛
 * کل بخش عیناً از فایل اصلی منتقل شده (تنها دلتا: export روی AI_MIN_POOL/AI_POOL_SAMPLE/
 * isAiSeed/fetchAiQuestions/aiQuestionsToSeeds — بقیه خصوصی می‌مانند).
 */

import type { QuizQuestionSeed } from "@/data/types";
import { type DifficultyKey } from "../kit/difficulty";
import { shuffle } from "../shared";
import { shapeOptions } from "./helpers";

// ─── فاز G5-02 — سؤال‌های هوشمند ✨ (تولید دینامیک از واژگان همین کتاب) ───

/** تعداد سؤال هوشمند هر دور — قرارداد API (count ۱..۵) */
const AI_COUNT = 3;
/** مهلت انتظار سؤال‌ساز — بعد از آن دور عادی شروع می‌شود */
const AI_TIMEOUT_MS = 8000;
/** کف استخر واژه برای صدا زدن سؤال‌ساز (قرارداد API: pool ۴..۴۰ عضو) */
export const AI_MIN_POOL = 4;
/** سقف نمونهٔ واژهٔ فرستاده‌شده به سؤال‌ساز */
export const AI_POOL_SAMPLE = 20;

/** سؤال تولیدی API — شکل اکید قرارداد */
interface AiQuestion {
  word: string;
  sentence: string;
  options: string[];
  answerIndex: number;
}

/** سؤال هوشمند در قالب seed بازی + واژهٔ انگلیسیِ خود جزوه برای مسیر SRS/تلفظ */
type AiQuizSeed = QuizQuestionSeed & { aiWord: string; source: "ai" };

/** گارد سؤال هوشمند داخل deck (سؤال‌های عادی پرچم ندارند) */
export function isAiSeed(q: QuizQuestionSeed): q is AiQuizSeed {
  const probe = q as { source?: unknown; aiWord?: unknown };
  return probe.source === "ai" && typeof probe.aiWord === "string";
}

/** گارد شکل سؤال تولیدی — دفاع دوم روی والیدیشن سرور (بدون any) */
function isAiQuestionShape(v: unknown): v is AiQuestion {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.word === "string" &&
    o.word.trim().length > 0 &&
    typeof o.sentence === "string" &&
    o.sentence.trim().length > 0 &&
    Array.isArray(o.options) &&
    o.options.length >= 2 &&
    o.options.length <= 6 &&
    o.options.every((x) => typeof x === "string" && x.trim().length > 0) &&
    typeof o.answerIndex === "number" &&
    Number.isInteger(o.answerIndex) &&
    o.answerIndex >= 0 &&
    o.answerIndex < o.options.length
  );
}

/**
 * صدا زدن سؤال‌ساز با مهلت ۸ ثانیه (AbortController + Promise.race با تایمر).
 * هر خطا/تایم‌اوت/پاسخ بد → null (بدون پرتاب استثنا؛ دور عادی ادامه می‌یابد).
 */
export async function fetchAiQuestions(
  game: "cloze" | "speed-quiz",
  pool: { word: string; meaning: string }[],
  ctrl: AbortController,
): Promise<AiQuestion[] | null> {
  let timerId: number | null = null;
  const timeout = new Promise<null>((resolve) => {
    timerId = window.setTimeout(() => {
      ctrl.abort();
      resolve(null);
    }, AI_TIMEOUT_MS);
  });
  try {
    const resPromise = fetch("/api/game-questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game, pool, count: AI_COUNT }),
      signal: ctrl.signal,
    })
      .then(async (res) => (res.ok ? ((await res.json()) as { questions?: unknown }) : null))
      .catch(() => null); // لغو/شبکه → بی‌صدا (مسابقه منتظر نمی‌ماند)
    const res = await Promise.race([resPromise, timeout]);
    const raw = res && typeof res === "object" ? (res as { questions?: unknown }).questions : null;
    if (!Array.isArray(raw)) return null;
    const valid = raw.filter(isAiQuestionShape);
    return valid.length > 0 ? valid : null;
  } catch {
    return null;
  } finally {
    if (timerId !== null) window.clearTimeout(timerId);
  }
}

/** نرمال‌سازی مقایسه‌ای معنی‌ها (نیم‌فاصله/ی/ک عربی/فاصله) — فقط برای سنجش تعلق */
function aiNorm(s: string): string {
  return s
    .replace(/\u200c/g, "")
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/**
 * تبدیل سؤال‌های تولیدی به seed سؤال واژگانی همین بازی — دفاع دوم سند: واژه باید
 * دقیقاً عضو استخر واژگان همین دور باشد و گزینهٔ درست عین معنی همان واژه در جزوه؛
 * سؤال‌های مشکوک بی‌صدا رد می‌شوند. گزینه‌ها با shapeOptions به سطح دور شکل می‌گیرند
 * (مزاحم سطح سخت فقط از معنی‌های واقعی همان استخر — هیچ محتوای ساختگی).
 */
export function aiQuestionsToSeeds(
  questions: AiQuestion[],
  vocab: { word: string; meaning: string }[],
  lesson: number,
  level: DifficultyKey,
): QuizQuestionSeed[] {
  const byWord = new Map(vocab.map((v) => [v.word.toLowerCase(), v]));
  const ownerOf = new Map<string, string>();
  for (const v of vocab) {
    const k = aiNorm(v.meaning);
    if (k && !ownerOf.has(k)) ownerOf.set(k, v.word);
  }
  const built: QuizQuestionSeed[] = [];
  for (const q of questions) {
    const entry = byWord.get(q.word.trim().toLowerCase());
    if (!entry) continue; // واژه بیرون از استخر این دور → رد
    const answer = q.options[q.answerIndex]?.trim() ?? "";
    if (!answer) continue;
    if (ownerOf.get(aiNorm(answer)) !== entry.word) continue; // پاسخِ درست‌نما → رد
    const seed: AiQuizSeed = {
      category: "vocabulary",
      lesson,
      scope: "هوشمند",
      text: q.sentence,
      options: q.options.map((o) => o.trim()),
      answer: q.answerIndex,
      level: "استاندارد",
      aiWord: entry.word,
      source: "ai",
    };
    built.push(shapeOptions(seed, level, []));
  }
  if (built.length <= 1) return built;
  // سطح سخت — مزاحم پنجم فقط از معنی‌های واقعی همان استخر
  const traps = shuffle([...new Set(built.flatMap((s) => s.options))]);
  return built.map((s) => shapeOptions(s, level, traps));
}
