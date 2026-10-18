"use client";

/**
 * بازی «جای خالی» (Cloze) — فاز ۳ نقشه راه جامع ۲۰۲۶ + فاز G2-b نقشه راه بازی‌ها.
 *
 * جمله‌های واقعی متن‌ها (readings) و مکالمه‌ها (conversations) خود کتاب با جای خالیِ
 * واژه هدف؛ انتخاب از ۳ گزینه. پاسخ درست در SRS ثبت و تلفظش پخش می‌شود؛ پاسخ غلط
 * واژه را به صف «مرور هوشمند» می‌فرستد (همان مسیر غلط آزمون).
 *
 * فاز G2-b (کیت GameKit v2 — الگوی پایلوت memory / دارباز):
 * - GameShell + ResultScreen + آموزش ۳گامی (useAutoTutorial) + Pause (تایمر گیت روی
 *   paused) + نگهبان خروج + تله‌متری جلسه (start/end/abandon) + صدا/لرزش سه‌کاناله
 * - کار اختصاصی G2-b: کیبورد ۱..۳ برای انتخاب گزینه — حین playing کلیدهای ۱/۲/۳
 *   (لاتین و فارسی) همان گزینهٔ N را پاسخ می‌دهند (گارد فاز/توقف/پنجرهٔ باز نگهبان)؛
 *   هر گزینهٔ دکمه‌ای <kbd> شماره‌دار + aria-keyshortcuts دارد و liveMsg «گزینه N»
 *   را برای فناوری‌های کمکی اعلام می‌کند.
 * - امضاهای shared.ts (saveAttempt/saveBest/bumpPlays) و کلیدهای localStorage
 *   دست‌نخورده — قانون حفظ‌شوندگی §۳-۴ سند بازی‌ها.
 *
 * فاز G3-01 — سطح دشواری ۳گانه: تعداد گزینهٔ هر پرسش (عادی = همان ۳ گزینهٔ قبلی /
 * آسان ۳ با ریتم آرام‌تر / سخت ۵ گزینهٔ مزاحم با ریتم سریع‌تر — مکث پیشروی ×timeScale).
 * رکورد (تعداد پاسخ درست از تعداد پرسش) امتیاز عددیِ بازی نیست — ضریب levelScore
 * نمی‌گیرد؛ رکورد آسان/سخت scope پسونددار جدا می‌شود (کلیدهای عادی بایت‌به‌بایت).
 * فاز G3-02 — انتخاب هوشمند پرسش‌های دور: smartPick با اولویت کارت‌های SRS
 * ضعیف/سررسید/نو (شروع سرد = همان شافل قبلی)؛ حواس‌پرتی‌ها همان pickUnique قبلی.
 *
 * فاز G5-02 — سؤال‌های هوشمند ✨: سوییچ setup (پیش‌فرض خاموش) → پیش از شروع دور تا
 * ۳ سؤال از /api/game-questions (سؤال‌ساز AI) گرفته و سرِ deck می‌نشیند — فقط از
 * واژگان همان محدوده (استخر عادی همین بازی) با والیدیشن دوطرفه سرور+کلاینت؛
 * هر خطا/تایم‌اوت = توست و دور کاملاً عادی (بازی هرگز بلاک نمی‌شود). ردیف سؤال
 * هوشمند در detail با source:"ai" پرچم می‌خورد و دورِ دارای سؤال هوشمند detail
 * را با پرچم سطح بالا source:"ai" ثبت می‌کند. هیچ کلید localStorage جدیدی و هیچ
 * تغییری در امضای saveAttempt/saveBest/bumpPlays وجود ندارد.
 */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  PencilLine,
  Play,
  Trophy,
  Timer,
  Target,
  CheckCircle2,
  Sparkles,
  Pause,
  Keyboard,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { VocabEntry } from "@/data/types";
import type { BookData } from "@/data/books/types";
import { useBook, useBookData } from "@/lib/book-context";
import { recordSRS, seedReviewFromQuiz } from "@/lib/srs-store";
import { touchStreak } from "@/lib/streak-store";
import { recordStudySession } from "@/lib/goal-store";
import { speak, stopSpeaking } from "@/lib/speak";
import { useVoiceSpeed } from "@/lib/voice-store";
import {
  shuffle,
  faNum,
  fmtTime,
  pickUnique,
  loadBest,
  saveBest,
  bumpPlays,
  saveAttempt,
  subscribeGameData,
  bestKeyOf,
} from "./shared";
// فاز G2-b — کیت GameKit v2 (قرارداد API سند)
import { playSound, toggleSoundMuted, isSoundMuted } from "./kit/sound-engine";
import { buzz } from "./kit/haptics";
import { useGamePause } from "./kit/use-pause";
import { GameExitGuard } from "./kit/exit-guard";
import { GameShell } from "./kit/game-shell";
import { ResultScreen } from "./kit/result-screen";
import {
  TutorialOverlay,
  useAutoTutorial,
  type TutorialStep,
} from "./kit/tutorial-overlay";
import { createGameSession, type GameSessionTracker } from "./kit/telemetry";
// فاز G3-01/G3-02 — دشواری ۳سطحی + انتخاب هوشمند واژه (کیت؛ فقط مصرف)
import { DifficultyPicker } from "./kit/difficulty-picker";
import {
  LEVEL_KNOBS,
  loadLevelPref,
  optionsFor,
  saveLevelPref,
  scopeWithLevel,
  type DifficultyKey,
} from "./kit/difficulty";
import { countWeak, smartPick } from "./kit/smart-pick";

const GAME_KEY = "cloze";
const ALL_LESSONS = -1;
const MAX_ITEMS = 40;
const BLANK = "______";
const ROUND_OPTIONS = [6, 10, 14];
const WORD_RE = /^[A-Za-z]{3,14}$/;
/** فاز G3-01 — تعداد گزینهٔ هر پرسش در مسیر عادی (ثابت قبلی بازی — دست‌نخورده) */
const NORMAL_OPTIONS = 3;
/** فاز G3-01 — مکث پیشروی بین پرسش‌ها (تایمر ریتم بازی — عادی = همان ۱ ثانیه) */
const ADVANCE_MS = 1000;
/** فاز G2-b — نگاشت کلیدهای کیبورد ۱..۵ (لاتین + فارسی) به شمارهٔ گزینه —
 *  فاز G3-01: گزینه‌های ۴/۵ فقط در سطح سخت فعال می‌شوند (با ۳ گزینه گارد options[n] می‌گیرد) */
const OPTION_KEYS: Record<string, number> = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "۱": 1,
  "۲": 2,
  "۳": 3,
  "۴": 4,
  "۵": 5,
};

type Phase = "setup" | "playing" | "done";

/** یک پرسش جای خالی */
interface ClozeItem {
  id: string;
  /** جمله انگلیسی حاوی یک ______ */
  sentence: string;
  /** ترجمه فارسی پاراگراف/خط مادر */
  fa: string;
  answer: string;
  options: string[];
  meaning: string;
  lessonLabel: string;
  /** فاز G5-02 — سؤال تولیدی هوشمند (پرچم نمایش + پرچم detail) */
  source?: "ai";
}

/** رکورد شخصی: بیشترین پاسخ درست از همان تعداد پرسش */
interface BestRecord {
  score: number;
  total: number;
}

interface WrongItem {
  word: string;
  meaning: string;
}

interface SourceSentence {
  en: string;
  fa: string;
}

/** فاز G2-b — آموزش ۳-گامی استاندارد (الگوی پایلوت memory / G1-08) */
const TUTORIAL_STEPS: TutorialStep[] = [
  {
    icon: <PencilLine size={24} />,
    title: "واژهٔ گم‌شده را پیدا کن",
    text: "جمله از متن‌ها و مکالمه‌های خود کتاب آمده؛ با کمک ترجمهٔ فارسی، جای خالی را پر کن.",
  },
  {
    icon: <Keyboard size={24} />,
    title: "سه گزینه، یک درست",
    text: "از بین ۳ گزینه واژهٔ درست را انتخاب کن — با کلیدهای ۱ و ۲ و ۳ روی کیبورد هم می‌توانی جواب بدهی.",
  },
  {
    icon: <Trophy size={24} />,
    title: "دقت بالاتر = ستارهٔ بیشتر",
    text: "پاسخ درست تلفظ می‌شود و در مرور هوشمند ثبت می‌شود؛ غلط‌ها به صف مرور می‌روند — تا ۳ ستاره جمع کن!",
  },
];

/** واژه هدف بدون پرانتز توضیح — «order (n)» → «order» */
function toBase(word: string): string {
  return word.replace(/\s*\([^)]*\)\s*/g, " ").trim();
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function wordCount(s: string): number {
  return s.trim().split(/\s+/).length;
}

/** همه جمله‌های کوتاه کتاب: متن‌ها (پاراگراف‌ها) + مکالمه‌ها (خط‌ها) */
function collectSentences(data: BookData): SourceSentence[] {
  const out: SourceSentence[] = [];
  for (const r of data.readings) {
    for (const p of r.paragraphs) {
      for (const s of p.en.split(/(?<=[.!?])\s+/)) {
        const t = s.trim();
        if (t) out.push({ en: t, fa: p.fa });
      }
    }
  }
  for (const c of data.conversations) {
    for (const line of c.lines) {
      for (const s of line.en.split(/(?<=[.!?])\s+/)) {
        const t = s.trim();
        if (t) out.push({ en: t, fa: line.fa });
      }
    }
  }
  return out;
}

/**
 * هسته ساخت پازل — تابع خالص: برای هر واژه (بدون تکرار) اولین جمله مناسب کتاب را
 * پیدا می‌کند، واژه را با ______ جایگزین و ۲ حواس‌پرتی از همان استخر درس می‌چیند.
 */
function buildPool(data: BookData, lesson: number, distractorCount = 2): ClozeItem[] {
  const vocabPool = lesson === ALL_LESSONS ? data.vocab.all : data.vocab.ofLesson(lesson);
  const sentences = collectSentences(data);

  // استخر واژه پاکسازی‌شده — فقط واژه‌های تک‌کلمه‌ای لاتین، یکتا بر اساس baseWord
  const seenBase = new Set<string>();
  const words: { base: string; entry: VocabEntry }[] = [];
  for (const entry of vocabPool) {
    const base = toBase(entry.word);
    if (!WORD_RE.test(base) || seenBase.has(base)) continue;
    seenBase.add(base);
    words.push({ base, entry });
  }

  const items: ClozeItem[] = [];
  for (const { base, entry } of words) {
    if (items.length >= MAX_ITEMS) break;
    const re = new RegExp("\\b" + escapeRe(base) + "\\b", "i");
    const found = sentences.find((s) => {
      if (s.en.length < 30 || s.en.length > 160) return false;
      const wc = wordCount(s.en);
      if (wc < 6 || wc > 35) return false;
      return re.test(s.en);
    });
    if (!found) continue;

    // حواس‌پرتی‌ها از همان استخر درس — baseWord متفاوت + معنی یکتا (بدون ابهام)
    // (فاز G3-01 — تعداد حواس‌پرتی سطح‌دار؛ پیش‌فرض ۲ = همان رفتار قبلی)
    const distractorPool = vocabPool.filter((w) => {
      const b = toBase(w.word);
      return b !== base && WORD_RE.test(b) && w.meaning !== entry.meaning;
    });
    const distractors = pickUnique(distractorPool, distractorCount, (w) => `${toBase(w.word)}|${w.meaning}`);
    if (distractors.length < distractorCount) continue;

    items.push({
      id: `${lesson}:${base}`,
      sentence: found.en.replace(re, BLANK),
      fa: found.fa,
      answer: base,
      options: shuffle([base, ...distractors.map((d) => toBase(d.word))]),
      meaning: entry.meaning,
      lessonLabel: entry.lessonLabel,
    });
  }
  return shuffle(items);
}

// ─── فاز G5-02 — سؤال‌های هوشمند ✨ (تولید دینامیک از واژگان همین کتاب) ───

/** تعداد سؤال هوشمند هر دور — قرارداد API (count ۱..۵) */
const AI_COUNT = 3;
/** مهلت انتظار سؤال‌ساز — بعد از آن دور عادی شروع می‌شود */
const AI_TIMEOUT_MS = 8000;
/** کف استخر واژه برای صدا زدن سؤال‌ساز (قرارداد API: pool ۴..۴۰ عضو) */
const AI_MIN_POOL = 4;
/** سقف نمونهٔ واژهٔ فرستاده‌شده به سؤال‌ساز */
const AI_POOL_SAMPLE = 20;

/** سؤال تولیدی API — شکل اکید قرارداد */
interface AiQuestion {
  word: string;
  sentence: string;
  options: string[];
  answerIndex: number;
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
async function fetchAiQuestions(
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

/**
 * تبدیل سؤال‌های تولیدی به پرسش‌های بازی جای خالی — دفاع دوم سند: واژه باید
 * دقیقاً عضو استخر همین دور باشد و گزینهٔ درست عین همان واژه؛ جای خالیِ «___»
 * به قالب خود بازی (BLANK) تبدیل و گزینه‌ها هم‌تعداد سطح دور می‌شوند. سؤال‌های
 * مشکوک بی‌صدا رد می‌شوند (دور عادی جبران می‌کند).
 */
function aiQuestionsToCloze(
  questions: AiQuestion[],
  pool: ClozeItem[],
  optCount: number,
): ClozeItem[] {
  const byWord = new Map(pool.map((it) => [it.answer.toLowerCase(), it]));
  const out: ClozeItem[] = [];
  for (const q of questions) {
    const entry = byWord.get(q.word.trim().toLowerCase());
    if (!entry) continue; // واژه بیرون از استخر این دور → رد
    const answerOpt = q.options[q.answerIndex]?.trim().toLowerCase();
    if (answerOpt !== entry.answer.toLowerCase()) continue; // پاسخِ درست‌نما → رد
    const wrongs = q.options
      .map((o) => o.trim())
      .filter((o) => o.toLowerCase() !== entry.answer.toLowerCase());
    out.push({
      id: `ai:${entry.answer}`,
      sentence: q.sentence.replace(/_{3,}/g, BLANK),
      // جملهٔ AI ترجمهٔ کتاب ندارد — معنی واژهٔ هدف همان راهنمای فارسی پرسش است
      fa: `معنی واژهٔ گم‌شده: ${entry.meaning}`,
      answer: entry.answer,
      options: shuffle([entry.answer, ...shuffle(wrongs).slice(0, Math.max(0, optCount - 1))]),
      meaning: entry.meaning,
      lessonLabel: entry.lessonLabel,
      source: "ai",
    });
  }
  return out;
}

// ─── اسنپ‌شات پایدار رکورد (JSON.parse هر بار آبجکت تازه می‌سازد — باید کَش شود) ───

let bestCacheKey = "";
let bestCacheValue: BestRecord | null = null;

function readBest(bookId: string, scope: string): BestRecord | null {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(bestKeyOf(bookId, GAME_KEY, scope));
  } catch {
    return null;
  }
  const cacheKey = `${bookId}|${scope}|${raw ?? ""}`;
  if (cacheKey === bestCacheKey) return bestCacheValue;
  let value: BestRecord | null = null;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Partial<BestRecord> | null;
      if (parsed && typeof parsed.score === "number" && typeof parsed.total === "number") {
        value = { score: parsed.score, total: parsed.total };
      }
    } catch {
      value = null;
    }
  }
  bestCacheKey = cacheKey;
  bestCacheValue = value;
  return value;
}

export function ClozeGame() {
  const data = useBookData();
  const { bookId: activeBookId } = useBook();
  /** بازی فقط داخل کتاب فعال سوار می‌شود (useBookData بدون کتاب فعال خطا می‌دهد) — پس bookId همیشه هست */
  const bookId = activeBookId!;
  const [phase, setPhase] = useState<Phase>("setup");
  const [lesson, setLesson] = useState<number>(ALL_LESSONS);
  const [rounds, setRounds] = useState<number>(10);
  // فاز G3-01 — سطح دشواری ماندگار (پیش‌فرض «عادی» = دقیقاً رفتار قبلی بازی)
  const [level, setLevel] = useState<DifficultyKey>(() => loadLevelPref(GAME_KEY));
  // فاز G5-02 — سوییچ «سؤال‌های هوشمند»: state محلی، پیش‌فرض خاموش (بدون کلید localStorage جدید)
  const [aiOn, setAiOn] = useState(false);
  /** حین آماده‌سازی سؤال هوشمند (اسپینر دکمهٔ شروع) */
  const [aiLoading, setAiLoading] = useState(false);
  const aiBusyRef = useRef(false);
  const aiAbortRef = useRef<AbortController | null>(null);

  const [deck, setDeck] = useState<ClozeItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongList, setWrongList] = useState<WrongItem[]>([]);
  const [secs, setSecs] = useState(0);
  const [isRecord, setIsRecord] = useState(false);
  /** فاز G2-b — پیام باکس aria-live (اعلام پاسخ/توقف/گزینهٔ کیبورد) برای فناوری‌های کمکی */
  const [liveMsg, setLiveMsg] = useState("");

  // فاز G2-b — توقف/ادامهٔ استاندارد کیت + نگهبان خروج + کلید صدا (الگوی پایلوت memory/دارباز)
  // توقف خودکار در تب مخفی از خود هوک می‌آید — در بازگشت اورلی «متوقف شد» دیده می‌شود
  const { paused, resume, pause: pauseGame, toggle: togglePause } = useGamePause((p) => {
    if (phase === "playing") setLiveMsg(p ? "بازی متوقف شد ⏸" : "ادامهٔ بازی ▶");
  });
  const [exitAsk, setExitAsk] = useState(false);
  // الگوی دارباز: state بی‌صدا + همگام‌سازی با کلید سراسری (storage بین-تب) و toggle در هندلر
  const [muted, setMuted] = useState(isSoundMuted());
  useEffect(() => {
    const sync = () => setMuted(isSoundMuted());
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  // فاز G2-b — آموزش یک‌بارنمایش (خودکار در setup) + راهنمای شِل حین بازی (با توقف)
  const {
    open: tutorialOpen,
    openHelp: openTutorial,
    close: closeTutorial,
  } = useAutoTutorial(GAME_KEY, phase === "setup");
  const pausedForHelpRef = useRef(false);
  const handleHelp = useCallback(() => {
    if (phase === "playing") {
      pausedForHelpRef.current = true;
      pauseGame();
    }
    openTutorial();
  }, [openTutorial, pauseGame, phase]);
  const handleTutorialClose = useCallback(() => {
    closeTutorial();
    if (pausedForHelpRef.current) {
      pausedForHelpRef.current = false;
      resume();
    }
  }, [closeTutorial, resume]);
  const handleTutorialOpenChange = useCallback(
    (o: boolean) => {
      if (!o) handleTutorialClose();
    },
    [handleTutorialClose],
  );
  // فاز G3-01 — تغییر سطح (هم‌صدا با چیپ‌های خود بازی: بازخورد کلیک)
  const handleLevelChange = useCallback((lv: DifficultyKey) => {
    playSound("click");
    buzz("light");
    setLevel(lv);
    saveLevelPref(GAME_KEY, lv);
  }, []);
  // فاز G2-b — تله‌متری جلسه (بدون PII: بازی/اسکوپ/مدت رُند/دلیل)
  const sessionRef = useRef<GameSessionTracker | null>(null);

  const { speed } = useVoiceSpeed();
  const busy = useRef(false);
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrongRef = useRef<WrongItem[]>([]);
  const secsRef = useRef(0);

  // فاز G3-01 — تعداد گزینهٔ هر پرسش: مسیر عادی = ثابت قبلی (۳)؛ آسان/سخت با optionsFor (کف ۳/سقف ۵)
  const optCount = level === "normal" ? NORMAL_OPTIONS : optionsFor(level, NORMAL_OPTIONS, 5);

  // استخر پازل هر محدوده — یک‌بار برای کل کتاب + هر درس (تابع خالص)
  const pools = useMemo(() => {
    const map = new Map<number, ClozeItem[]>();
    const keys = [ALL_LESSONS, ...data.vocab.lessons.filter((l) => l.lesson > 0).map((l) => l.lesson)];
    // فاز G3-01 — تعداد حواس‌پرتی هر پرسش سطح‌دار است (عادی = ۲ حواس‌پرتی قبلی)
    for (const l of keys) map.set(l, buildPool(data, l, optCount - 1));
    return map;
  }, [data, optCount]);

  const lessonOptions = useMemo(
    () => [
      { lesson: ALL_LESSONS, label: "کل کتاب" },
      ...data.vocab.lessons
        .filter((l) => l.lesson > 0)
        .map((l) => ({ lesson: l.lesson, label: l.label })),
    ],
    [data.vocab.lessons],
  );

  const poolCount = pools.get(lesson)?.length ?? 0;
  // فاز G3-01 — اسکوپ سطح‌دار: عادی = همان کلید قبلی بایت‌به‌بایت؛ آسان/سخت کلید افزودنی
  const scope = scopeWithLevel(`${lesson === ALL_LESSONS ? "all" : lesson}:${rounds}`, level);
  // فاز G3-01 — ریتم پیشروی بین پرسش‌ها: عادی = همان ۱ ثانیه؛ آسان/سخت ×timeScale
  const advanceMs =
    level === "normal" ? ADVANCE_MS : Math.round(ADVANCE_MS * LEVEL_KNOBS[level].timeScale);

  // رکورد شخصی — بدون setState در effect (الگوی match-game با اسنپ‌شات پایدار)
  const best = useSyncExternalStore(
    subscribeGameData,
    () => readBest(bookId, scope),
    () => null,
  );

  // تایمر — آپدیت functional + شمارندهٔ دقیق برای Attempt
  // فاز G2-b — گیت روی paused: توقف دستی یا خودکارِ تب مخفی هیچ تیکی جلو نمی‌برد
  useEffect(() => {
    if (phase !== "playing" || paused) return;
    const t = window.setInterval(() => {
      secsRef.current += 1;
      setSecs((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(t);
  }, [phase, paused]);

  // فاز G2-b — پاک‌سازی نهایی: تلفظ + تایمر پیشروی + ثبت «رهاشده» تله‌متری (اگر باز باشد no-op)
  // فاز G5-02 — درخواست معلق سؤال‌ساز هوشمند هم لغو می‌شود
  useEffect(() => {
    return () => {
      sessionRef.current?.abandon("unmount");
      stopSpeaking();
      if (advanceRef.current) clearTimeout(advanceRef.current);
      aiAbortRef.current?.abort();
    };
  }, []);

  /** پاک‌سازی تایمر پیشروی — مسیرهای خروج/شروع دوباره */
  const clearAdvance = useCallback(() => {
    if (advanceRef.current) {
      clearTimeout(advanceRef.current);
      advanceRef.current = null;
    }
    busy.current = false;
  }, []);

  /** شروع دور با deck نهایی (عادی یا + سؤال‌های هوشمند) — بدنهٔ قبلی start دست‌نخورده */
  const startWith = useCallback(
    (aiItems: ClozeItem[]) => {
      const pool = pools.get(lesson) ?? [];
      if (pool.length < 3) {
        toast.error("در این محدوده جمله مناسب پیدا نشد — درس دیگری را امتحان کن");
        return;
      }
      // فاز G2-b — بازخورد کلیک شروع دور (از setup و «دور جدید» نتیجه)
      playSound("click");
      buzz("light");
      clearAdvance();
      stopSpeaking();
      // فاز G3-02 — انتخاب هوشمند پرسش‌های دور (اولویت کارت‌های SRS ضعیف/سررسید/نو؛
      // شروع سرد = همان شافل قبلی) — جایگزین shuffle().slice() با همان n؛ کلید SRS = پاسخ
      // فاز G5-02 — سؤال‌های هوشمند سرِ دور می‌نشینند و بقیهٔ ظرفیت از استخر عادی پر می‌شود
      const capacity = Math.min(rounds, pool.length);
      const regular = smartPick(pool, Math.max(0, capacity - aiItems.length), (it) => it.answer);
      setDeck([...aiItems, ...regular]);
      setIdx(0);
      setPicked(null);
      setCorrectCount(0);
      setWrongList([]);
      wrongRef.current = [];
      setSecs(0);
      secsRef.current = 0;
      setIsRecord(false);
      setLiveMsg("");
      resume();
      setExitAsk(false);
      // فاز G2-b — جلسهٔ تازهٔ تله‌متری برای این دور (فاز G3-01 — level اسکوپ سطح‌دار)
      sessionRef.current = createGameSession({
        game: GAME_KEY,
        level: scope,
      });
      sessionRef.current.start();
      setPhase("playing");
    },
    [pools, lesson, rounds, resume, clearAdvance, scope],
  );

  /**
   * فاز G5-02 — شروع دور: اگر سوییچ هوشمند روشن است، اول سؤال‌ساز صدا زده می‌شود
   * (نمونهٔ تا ۲۰ واژه از همان استخر عادی این دور؛ مهلت ۸ث + AbortController).
   * هر خطا/تایم‌اوت/پاسخ نامعتبر = توست و دور کاملاً عادی — بازی هرگز بلاک نمی‌شود.
   */
  const start = useCallback(async () => {
    if (aiBusyRef.current) return; // نگهبان دوبار-کلیک حین آماده‌سازی
    const pool = pools.get(lesson) ?? [];
    if (pool.length < 3) {
      toast.error("در این محدوده جمله مناسب پیدا نشد — درس دیگری را امتحان کن");
      return;
    }
    let aiItems: ClozeItem[] = [];
    if (aiOn && pool.length >= AI_MIN_POOL) {
      aiBusyRef.current = true;
      setAiLoading(true);
      const ctrl = new AbortController();
      aiAbortRef.current = ctrl;
      const sample = shuffle(pool)
        .slice(0, AI_POOL_SAMPLE)
        .map((it) => ({ word: it.answer, meaning: it.meaning }));
      const questions = await fetchAiQuestions("cloze", sample, ctrl);
      aiBusyRef.current = false;
      aiAbortRef.current = null;
      setAiLoading(false);
      if (questions) aiItems = aiQuestionsToCloze(questions, pool, optCount);
      if (aiItems.length === 0) {
        toast.error("سؤال هوشمند آماده نشد — با سؤال‌های عادی ادامه می‌دهیم");
      }
    }
    startWith(aiItems);
  }, [pools, lesson, aiOn, optCount, startWith]);

  const finish = useCallback(
    (finalCorrect: number) => {
      touchStreak();
      recordStudySession();
      bumpPlays(bookId, GAME_KEY);
      // فاز G2-b — پایان عادی جلسهٔ تله‌متری
      sessionRef.current?.end("finish");
      // فاز G2-b — بازخورد سه‌کانالهٔ پایان دور (دور بی‌نقص = صدای win — الگوی دارباز)
      const perfect = deck.length > 0 && finalCorrect === deck.length;
      playSound(perfect ? "win" : "finish");
      buzz("success");
      saveAttempt(bookId, GAME_KEY, {
        lesson: lesson === ALL_LESSONS ? 0 : lesson,
        total: deck.length,
        correct: finalCorrect,
        duration: secsRef.current,
        // فاز G3-01 — سطح دور به‌عنوان فیلد افزودنی در هر ردیف detail (شکل آرایه حفظ شده)
        // فاز G5-02 — ردیف سؤال هوشمند source:"ai" می‌گیرد؛ دورِ دارای سؤال هوشمند detail
        // را با پرچم سطح بالا source:"ai" ثبت می‌کند (بدون سؤال هوشمند = دقیقاً همان
        // آرایهٔ قبلی بایت‌به‌بایت). امضای saveAttempt تغییر نکرده.
        detail: deck.some((it) => it.source === "ai")
          ? {
              source: "ai" as const,
              items: deck.map((it) => ({
                word: it.answer,
                ok: !wrongRef.current.some((w) => w.word === it.answer),
                level,
                ...(it.source === "ai" ? { source: "ai" as const } : {}),
              })),
            }
          : deck.map((it) => ({
              word: it.answer,
              ok: !wrongRef.current.some((w) => w.word === it.answer),
              level,
            })),
      });
      let newRecord = false;
      try {
        const prev = loadBest<BestRecord>(bookId, GAME_KEY, scope);
        if (!prev || finalCorrect > prev.score) {
          saveBest<BestRecord>(bookId, GAME_KEY, scope, { score: finalCorrect, total: deck.length });
          setIsRecord(true);
          newRecord = true;
        }
      } catch {
        /* noop */
      }
      const acc = Math.round((finalCorrect / Math.max(deck.length, 1)) * 100);
      if (newRecord) {
        // فاز G2-b — رکورد جدید: صدا + لرزش رکورد (الگوی پایلوت)
        playSound("record");
        buzz("record");
        toast.success(`رکورد جدید! ${faNum(finalCorrect)} از ${faNum(deck.length)} پاسخ درست 🏆`);
      } else {
        toast.success(`جای خالی‌ها پر شد — ${faNum(acc)}٪ دقت! ✏️`);
      }
      setLiveMsg(perfect ? "همه واژه‌ها درست بود — بی‌نقص! 🎉" : "دور تمام شد!");
      setPhase("done");
    },
    [bookId, deck, lesson, scope, level],
  );

  const answer = useCallback(
    (opt: string, viaKey?: number) => {
      if (busy.current || picked !== null || paused) return;
      const item = deck[idx];
      if (!item) return;
      const ok = opt === item.answer;
      busy.current = true;
      setPicked(opt);
      // فاز G2-b — اعلام aria: با کیبورد «گزینه N» هم ابتدا اعلام می‌شود (کار اختصاصی G2-b)
      const keyPrefix = viaKey ? `گزینه ${faNum(viaKey)} — ` : "";
      let finalCorrect = correctCount;
      if (ok) {
        finalCorrect = correctCount + 1;
        setCorrectCount(finalCorrect);
        recordSRS(item.answer, true);
        speak(item.answer, { speed });
        // فاز G2-b — بازخورد سه‌کانالهٔ پاسخ درست
        playSound("correct");
        buzz("success");
        setLiveMsg(`${keyPrefix}درست بود! «${item.answer}» 🎉`);
      } else {
        seedReviewFromQuiz(item.answer);
        const w: WrongItem = { word: item.answer, meaning: item.meaning };
        wrongRef.current = [...wrongRef.current, w];
        setWrongList((prev) => [...prev, w]);
        // فاز G2-b — بازخورد سه‌کانالهٔ پاسخ غلط
        playSound("wrong");
        buzz("error");
        setLiveMsg(`${keyPrefix}غلط بود — پاسخ «${item.answer}» بود`);
      }
      const nextIdx = idx + 1;
      advanceRef.current = setTimeout(() => {
        busy.current = false;
        setPicked(null);
        if (nextIdx >= deck.length) {
          finish(finalCorrect);
        } else {
          setIdx(nextIdx);
        }
      }, advanceMs);
    },
    [picked, deck, idx, correctCount, speed, finish, paused, advanceMs],
  );

  // ── فاز G2-b — کار اختصاصی: کیبورد ۱..۳ برای انتخاب گزینه (رفع شکاف کیبورد سند §۵-G2-b) ──
  // الگوی latest-ref (دارباز): listener پایدار روی window فقط حین playing — کلیدهای
  // ۱/۲/۳ لاتین یا فارسی همان گزینهٔ N را پاسخ می‌دهند. گاردها: فاز playing + توقف +
  // پنجرهٔ باز نگهبان خروج (سطح effect) و قفل busy/پاسخ‌داده‌شده (داخل answer).
  const pickByKeyRef = useRef<(n: number) => void>(() => {});
  useEffect(() => {
    pickByKeyRef.current = (n: number) => {
      const item = deck[idx];
      if (!item) return;
      const opt = item.options[n - 1];
      if (!opt) return;
      answer(opt, n);
    };
  });

  useEffect(() => {
    if (phase !== "playing" || paused || exitAsk) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.repeat) return; // نگه‌داشتن کلید نباید چند پرسش را پشت‌سرهم پاسخ دهد
      const n = OPTION_KEYS[e.key];
      if (!n) return;
      e.preventDefault();
      pickByKeyRef.current(n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, paused, exitAsk]);

  // انصراف حین دور — فاز G2-b (نگهبان خروج): با حداقل یک پاسخ، GameExitGuard؛
  // بدون هیچ پاسخی، خروج مستقیم + تله‌متری abandon
  const handleExitClick = useCallback(() => {
    stopSpeaking();
    if (idx > 0 || picked !== null) {
      setExitAsk(true);
    } else {
      clearAdvance();
      // دور بدون پیشرفت هم یک جلسه است؛ همین‌جا رهاشده ثبت می‌شود
      sessionRef.current?.abandon("exit");
      resume();
      setPhase("setup");
    }
  }, [idx, picked, resume, clearAdvance]);

  // ── Setup ──
  if (phase === "setup") {
    // فاز G3-02 — شمارش کارت‌های ضعیف/سررسید/نو استخر (صفر = تمرکز هوشمند غیرفعال)
    const weakCount = countWeak(pools.get(lesson) ?? [], (it) => it.answer);
    return (
      <>
        <Card className="mx-auto max-w-xl rise-in">
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400">
                <PencilLine size={22} />
              </span>
              <div>
                <h2 className="text-lg font-black">جای خالی</h2>
                <p className="text-xs text-muted-foreground">جمله‌های خود کتاب — واژه گم‌شده را پیدا کن!</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
              <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
              <p>
                جمله از متن‌ها و مکالمه‌های همین جزوه آمده؛ ترجمه فارسی پایین کارت کمکت می‌کند. غلط بزنی، واژه به صف
                مرور هوشمند می‌رود.
              </p>
            </div>

            <div>
              <p className="mb-2 text-[13px] font-bold">کدام درس؟</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="انتخاب درس">
                {lessonOptions.map((o) => {
                  const count = pools.get(o.lesson)?.length ?? 0;
                  const active = lesson === o.lesson;
                  return (
                    <button
                      key={o.lesson}
                      type="button"
                      disabled={count === 0}
                      aria-pressed={active}
                      onClick={() => {
                        playSound("click");
                        buzz("light");
                        setLesson(o.lesson);
                      }}
                      className={cn(
                        "flex min-h-11 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
                        active
                          ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                          : "text-muted-foreground hover:bg-muted",
                        count === 0 && "opacity-50",
                      )}
                    >
                      {o.label}
                      <Badge
                        className={cn(
                          "rounded-full border-0 px-1.5 py-0 text-[10px] font-bold",
                          active
                            ? "bg-primary-foreground/20 text-primary-foreground"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {faNum(count)} جمله آماده
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[13px] font-bold">چند پرسش؟</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="تعداد پرسش‌های دور">
                {ROUND_OPTIONS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={rounds === n}
                    onClick={() => {
                      playSound("click");
                      buzz("light");
                      setRounds(n);
                    }}
                    className={cn(
                      "min-h-11 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
                      rounds === n
                        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {faNum(n)} پرسش
                  </button>
                ))}
              </div>
              {poolCount > 0 && poolCount < rounds && (
                <p className="mt-2 text-[11px] text-muted-foreground">
                  در این محدوده فقط {faNum(poolCount)} پرسش آماده است — همین تعداد پرسیده می‌شود.
                </p>
              )}
            </div>

            {best && (
              <Badge variant="outline" className="gap-1.5 border-amber-500/40 text-amber-600 dark:text-amber-400">
                <Trophy size={12} />
                بهترین: {faNum(best.score)} از {faNum(best.total)}
              </Badge>
            )}

            {/* فاز G3-01 — انتخاب سطح دشواری (عادی = دقیقاً رفتار قبلی بازی) */}
            <DifficultyPicker value={level} onChange={handleLevelChange} />
            <p className="text-[11px] leading-5 text-muted-foreground">
              {level === "easy"
                ? `آسان: ${faNum(optCount)} گزینه و ریتم آرام‌تر — رکورد سطح جدا`
                : level === "hard"
                  ? `سخت: ${faNum(optCount)} گزینهٔ مزاحم و ریتم سریع‌تر — رکورد سطح جدا`
                  : `عادی: همان بازی همیشگی — ${faNum(optCount)} گزینه برای هر پرسش`}
            </p>
            {/* فاز G5-02 — سوییچ «سؤال‌های هوشمند ✨» (state محلی؛ پیش‌فرض خاموش؛
                اگر سؤال‌ساز در دسترس نباشد دور کاملاً عادی شروع می‌شود) */}
            <div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="سؤال‌های هوشمند">
                <button
                  type="button"
                  aria-pressed={aiOn}
                  onClick={() => {
                    playSound("click");
                    buzz("light");
                    setAiOn((v) => !v);
                  }}
                  className={cn(
                    "flex min-h-11 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all",
                    aiOn
                      ? "border-amber-500 bg-amber-500/15 text-amber-600 shadow-md shadow-amber-500/20 dark:text-amber-400"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  ✨ سؤال‌های هوشمند
                </button>
              </div>
              <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
                چند سؤال از واژه‌های همین کتاب با هوش مصنوعی ساخته می‌شود
              </p>
            </div>

            {/* فاز G3-02 — پیام تمرکز هوشمند روی واژه‌های ضعیف (aria-live روی والد) */}
            <div aria-live="polite">
              {weakCount > 0 && (
                <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  🎯 مرکز این دور: {faNum(weakCount)} واژهٔ ضعیف تو
                </p>
              )}
            </div>

            {/* فاز G5-02 — حین آماده‌سازی سؤال هوشمند: اسپینر + «در حال آماده‌سازی…» (سقف ۸ ثانیه) */}
            <Button size="lg" className="h-12 w-full gap-2 text-base" onClick={start} disabled={aiLoading}>
              {aiLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  در حال آماده‌سازی…
                </>
              ) : (
                <>
                  <Play size={18} />
                  شروع بازی
                </>
              )}
            </Button>
          </CardContent>
        </Card>
        {/* فاز G2-b — آموزش یک‌بارنمایش در اولین ورود */}
        <TutorialOverlay
          game={GAME_KEY}
          steps={TUTORIAL_STEPS}
          open={tutorialOpen}
          onOpenChange={handleTutorialOpenChange}
        />
      </>
    );
  }

  // ── Done — فاز G2-b: صفحهٔ نتیجهٔ استاندارد کیت ──
  if (phase === "done") {
    const total = deck.length;
    const acc = Math.round((correctCount / Math.max(total, 1)) * 100);
    // ستاره‌بندی per-game (فاز G2-b): دقت ≥۹۰٪ = ۳ ستاره، ≥۶۵٪ = ۲ ستاره
    const stars = acc >= 90 ? 3 : acc >= 65 ? 2 : 1;
    const perfect = total > 0 && correctCount === total;
    return (
      <ResultScreen
        title={perfect ? "همه واژه‌ها درست بود!" : "جای خالی‌ها پر شد!"}
        stars={stars}
        isRecord={isRecord}
        errorCount={wrongList.length}
        reviewItems={wrongList.map((w) => ({ front: w.word, back: w.meaning }))}
        stats={[
          {
            label: "درست",
            value: faNum(correctCount),
            icon: <CheckCircle2 size={16} className="text-emerald-500" />,
          },
          {
            label: "دقت",
            value: `${faNum(acc)}٪`,
            icon: <Target size={16} className="text-teal-500" />,
          },
          {
            label: "زمان",
            value: fmtTime(secs),
            icon: <Timer size={16} className="text-primary" />,
          },
        ]}
        onReplay={start}
        onExit={() => setPhase("setup")}
        exitLabel="تنظیمات"
      />
    );
  }

  // ── Playing ──
  const item = deck[idx];
  const splitAt = item ? item.sentence.indexOf(BLANK) : -1;
  const before = item && splitAt >= 0 ? item.sentence.slice(0, splitAt) : "";
  const after = item && splitAt >= 0 ? item.sentence.slice(splitAt + BLANK.length) : "";
  const revealed = picked !== null;
  const answered = idx + (revealed ? 1 : 0);
  const pct = Math.round((answered / Math.max(deck.length, 1)) * 100);

  return (
    <>
      {/* فاز G2-b — هدر یکنواخت از کیت (الگوی پایلوت memory/دارباز) */}
      <GameShell
        title="جای خالی"
        icon={<PencilLine size={18} />}
        stats={
          <>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <PencilLine size={11} />
              {faNum(idx + 1)} / {faNum(deck.length)}
            </Badge>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <Timer size={11} />
              {fmtTime(secs)}
            </Badge>
            <Badge variant="secondary" className="gap-1 text-[11px]">
              <CheckCircle2 size={11} className="text-emerald-500" />
              {faNum(correctCount)} درست
            </Badge>
          </>
        }
        liveMsg={liveMsg}
        progress={
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-l from-primary to-emerald-400 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        }
        paused={paused}
        onPauseToggle={togglePause}
        muted={muted}
        onMuteToggle={() => setMuted(toggleSoundMuted())}
        onHelp={handleHelp}
        onExit={handleExitClick}
      >
        <div className="relative">
          <div className={cn("space-y-4", paused && "pointer-events-none blur-sm")} aria-hidden={paused}>
            {item && (
              <div className="space-y-4 rounded-2xl border bg-card p-6">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant="outline" className="border-teal-500/40 text-[10px] text-teal-600 dark:text-teal-400">
                    {item.lessonLabel}
                  </Badge>
                  {/* فاز G5-02 — بج سؤال هوشمند */}
                  {item.source === "ai" && (
                    <Badge variant="outline" className="border-amber-500/40 text-[10px] text-amber-600 dark:text-amber-400">
                      ✨ هوشمند
                    </Badge>
                  )}
                </div>

                <p dir="ltr" className="font-en text-[15px] leading-8 sm:text-base">
                  {splitAt >= 0 ? (
                    <>
                      {before}
                      <span className="mx-1 inline-block min-w-16 rounded-md border-b-2 border-amber-500/70 bg-amber-500/10 px-2 text-center font-black text-amber-600 dark:text-amber-400">
                        {revealed ? item.answer : "؟"}
                      </span>
                      {after}
                    </>
                  ) : (
                    item.sentence
                  )}
                </p>

                <p className="border-r-2 border-primary/30 pr-3 text-[12px] leading-6 text-muted-foreground">
                  {/* فاز G5-02 — سؤال هوشمند ترجمهٔ کتاب ندارد؛ معنی واژهٔ هدف راهنمای آن است */}
                  {item.source === "ai" ? item.fa : `ترجمه: ${item.fa}`}
                </p>

                <div className="grid gap-2 sm:grid-cols-3">
                  {item.options.map((opt, i) => {
                    const isAnswer = opt === item.answer;
                    const isPicked = picked === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        dir="ltr"
                        disabled={revealed}
                        onClick={() => answer(opt)}
                        aria-keyshortcuts={String(i + 1)}
                        className={cn(
                          "relative min-h-12 rounded-xl border bg-card px-3 py-2.5 text-center font-en text-[15px] font-black transition-all",
                          revealed && isAnswer
                            ? isPicked
                              ? "match-pop border-primary bg-primary/10 text-primary"
                              : "border-primary/50 ring-1 ring-primary"
                            : revealed
                              ? isPicked
                                ? "match-shake border-destructive/60 bg-destructive/10 text-destructive"
                                : "border-border opacity-60"
                              : "border-border hover:border-primary/50",
                        )}
                      >
                        {/* فاز G2-b — سرنخ کیبورد: کلید ۱..۳ همین گزینه را انتخاب می‌کند */}
                        <kbd
                          aria-hidden
                          className="absolute left-1.5 top-1/2 -translate-y-1/2 rounded-md border bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground"
                        >
                          {faNum(i + 1)}
                        </kbd>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                <p className="text-center text-[10px] text-muted-foreground">
                  با کلیدهای {faNum(1)} تا {faNum(optCount)} هم می‌توانی گزینه را انتخاب کنی
                </p>
              </div>
            )}
          </div>

          {/* فاز G2-b — اورلی توقف (الگوی پایلوت memory): محتوا تار و غیرقابل‌کلیک */}
          {paused && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl bg-background/80 backdrop-blur-sm">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Pause size={26} />
              </span>
              <p className="text-sm font-black">بازی متوقف شد</p>
              <Button onClick={resume} className="h-11 gap-2">
                <Play size={16} />
                ادامهٔ بازی
              </Button>
            </div>
          )}
        </div>

        {/* فاز G2-b — نگهبان خروج استاندارد کیت */}
        <GameExitGuard
          open={exitAsk}
          onOpenChange={setExitAsk}
          onConfirm={() => {
            // فاز G2-b — رهاکردن دور نیمه‌کاره + تله‌متری
            sessionRef.current?.abandon("exit");
            clearAdvance();
            stopSpeaking();
            setExitAsk(false);
            resume();
            setPhase("setup");
          }}
        />
      </GameShell>
      {/* فاز G2-b — راهنمای دکمهٔ شِل (حین بازی با توقف باز می‌شود) */}
      <TutorialOverlay
        game={GAME_KEY}
        steps={TUTORIAL_STEPS}
        open={tutorialOpen}
        onOpenChange={handleTutorialOpenChange}
      />
    </>
  );
}
