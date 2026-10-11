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

const GAME_KEY = "cloze";
const ALL_LESSONS = -1;
const MAX_ITEMS = 40;
const BLANK = "______";
const ROUND_OPTIONS = [6, 10, 14];
const WORD_RE = /^[A-Za-z]{3,14}$/;
/** فاز G2-b — نگاشت کلیدهای کیبورد ۱..۳ (لاتین + فارسی) به شمارهٔ گزینه */
const OPTION_KEYS: Record<string, number> = {
  "1": 1,
  "2": 2,
  "3": 3,
  "۱": 1,
  "۲": 2,
  "۳": 3,
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
function buildPool(data: BookData, lesson: number): ClozeItem[] {
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
    const distractorPool = vocabPool.filter((w) => {
      const b = toBase(w.word);
      return b !== base && WORD_RE.test(b) && w.meaning !== entry.meaning;
    });
    const distractors = pickUnique(distractorPool, 2, (w) => `${toBase(w.word)}|${w.meaning}`);
    if (distractors.length < 2) continue;

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
  // فاز G2-b — تله‌متری جلسه (بدون PII: بازی/اسکوپ/مدت رُند/دلیل)
  const sessionRef = useRef<GameSessionTracker | null>(null);

  const { speed } = useVoiceSpeed();
  const busy = useRef(false);
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrongRef = useRef<WrongItem[]>([]);
  const secsRef = useRef(0);

  // استخر پازل هر محدوده — یک‌بار برای کل کتاب + هر درس (تابع خالص)
  const pools = useMemo(() => {
    const map = new Map<number, ClozeItem[]>();
    const keys = [ALL_LESSONS, ...data.vocab.lessons.filter((l) => l.lesson > 0).map((l) => l.lesson)];
    for (const l of keys) map.set(l, buildPool(data, l));
    return map;
  }, [data]);

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
  const scope = `${lesson === ALL_LESSONS ? "all" : lesson}:${rounds}`;

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
  useEffect(() => {
    return () => {
      sessionRef.current?.abandon("unmount");
      stopSpeaking();
      if (advanceRef.current) clearTimeout(advanceRef.current);
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

  const start = useCallback(() => {
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
    setDeck(shuffle(pool).slice(0, Math.min(rounds, pool.length)));
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
    // فاز G2-b — جلسهٔ تازهٔ تله‌متری برای این دور
    sessionRef.current = createGameSession({
      game: GAME_KEY,
      level: `${lesson === ALL_LESSONS ? "all" : lesson}:${rounds}`,
    });
    sessionRef.current.start();
    setPhase("playing");
  }, [pools, lesson, rounds, resume, clearAdvance]);

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
        detail: deck.map((it) => ({
          word: it.answer,
          ok: !wrongRef.current.some((w) => w.word === it.answer),
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
    [bookId, deck, lesson, scope],
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
      }, 1000);
    },
    [picked, deck, idx, correctCount, speed, finish, paused],
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
                          "rounded-full border-0 px-1.5 py-0 text-[9px] font-bold",
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

            <Button size="lg" className="h-12 w-full gap-2 text-base" onClick={start}>
              <Play size={18} />
              شروع بازی
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
                <div>
                  <Badge variant="outline" className="border-teal-500/40 text-[10px] text-teal-600 dark:text-teal-400">
                    {item.lessonLabel}
                  </Badge>
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
                  ترجمه: {item.fa}
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
                  با کلیدهای {faNum(1)} تا {faNum(3)} هم می‌توانی گزینه را انتخاب کنی
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
