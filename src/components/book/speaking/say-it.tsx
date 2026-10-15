"use client";

/**
 * «بگو ببینم» — تمرین تلفظ واژه با میکروفن (فاز ۷ نقشه راه جامع ۲۰۲۶).
 *
 * جریان: انتخاب واژه (تب درس / واژه تصادفی / چیپ واژه) → ضبط با میکروفن
 * → ارسال به /api/asr → متن شنیده‌شده → نمرهٔ شباهت (similarityScore)
 * → دایرهٔ نمره + گیمیفیکیشن (XP واژهٔ تمرینی یا ضربان فعالیت).
 *
 * - مرورگر بدون ضبط یا رد شدن اجازهٔ میکروفن → جایگزین «تایپ کن ببینم».
 * - بدون props؛ برای ادغام: import { SayItPractice } و رندر داخل نمای دارای
 *   BookProvider (useBookData کانتکست کتاب فعال را می‌خواند).
 * - react-hooks v6: هیچ setState در بدنهٔ effect (پشتیبانی ضبط با
 *   useSyncExternalStore خوانده می‌شود)؛ پاکسازی کامل ضبط/تایمر/TTS هنگام unmount.
 */

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  ArrowLeft,
  Dices,
  Loader2,
  Mic,
  RotateCcw,
  Target,
  TrendingUp,
  Volume1,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useBookData } from "@/lib/book-context";
import {
  startRecording,
  isRecordingSupported,
  type AsrResult,
  type Recorder,
} from "@/lib/asr-client";
import { similarityScore, scoreLabel } from "@/lib/similarity";
import { speak, stopSpeaking } from "@/lib/speak";
import { awardPracticeWords, notifyActivity } from "@/lib/gamification";
import { faNum } from "@/components/book/games/shared";
import { SpeakButton } from "../speak-button";
import type { VocabEntry } from "@/data/types";

// ─── پشتیبانی ضبط — اسنپ‌شات بیرونی کش‌شده (بدون setState-in-effect) ───

let supportCache: boolean | null = null;
function readRecordingSupport(): boolean {
  if (supportCache === null) supportCache = isRecordingSupported();
  return supportCache;
}
function subscribeSupportNever(_onChange: () => void): () => void {
  return () => {};
}
/** خوش‌بینانه: اکثر مرورگرها ضبط دارند؛ مرورگر بدون پشتیبانی بعد از هیدریشن جا می‌افتد */
const SUPPORT_SERVER = true;

// ─── انواع و ثابت‌ها ───

type MicPhase = "idle" | "recording" | "processing";
type Tone = "great" | "good" | "try";

interface EvalResult {
  said: string;
  score: number;
  label: string;
  tone: Tone;
}

/** رنگ هر سطح نمره — فقط emerald/amber (هرگز آبی/نیلی/بنفش) */
const TONE_STYLES: Record<Tone, { ring: string; text: string }> = {
  great: {
    ring: "stroke-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  good: {
    ring: "stroke-amber-500",
    text: "text-amber-600 dark:text-amber-400",
  },
  try: {
    ring: "stroke-amber-600",
    text: "text-amber-700 dark:text-amber-400",
  },
};

const MIC_MAX_MS = 7000;

// ─── دایرهٔ نمره (SVG با stroke-dasharray — الگوی rewards-view) ───

function ScoreRing({ score, tone }: { score: number; tone: Tone }) {
  const R = 34;
  const C = 2 * Math.PI * R;
  const safe = Math.min(100, Math.max(0, score));
  const offset = C - (safe / 100) * C;
  return (
    <div
      className="relative h-24 w-24 shrink-0"
      role="img"
      aria-label={`نمرهٔ تلفظ: ${faNum(safe)} از ۱۰۰`}
    >
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="40" cy="40" r={R} fill="none" strokeWidth="7" className="stroke-muted" />
        <circle
          cx="40"
          cy="40"
          r={R}
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={offset}
          className={cn(
            "transition-[stroke-dashoffset] duration-700 ease-out",
            TONE_STYLES[tone].ring,
          )}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn("text-2xl font-black tabular-nums", TONE_STYLES[tone].text)}>
          {faNum(safe)}
        </span>
      </div>
    </div>
  );
}

// ─── کامپوننت اصلی ───

export function SayItPractice() {
  const data = useBookData();

  // تب‌های درس — از واژگان کتاب فعال (اعداد یونیک مرتب) با برچسب کوتاه
  const lessonTabs = useMemo(
    () =>
      data.vocab.lessons.map((l) => ({
        lesson: l.lesson,
        short: l.label.split("—")[0].trim() || l.label,
      })),
    [data.vocab.lessons],
  );

  const [lesson, setLesson] = useState<number>(lessonTabs[0]?.lesson ?? 0);
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<MicPhase>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [result, setResult] = useState<EvalResult | null>(null);
  const [asrError, setAsrError] = useState<string | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [scores, setScores] = useState<number[]>([]);

  const recorderRef = useRef<Recorder | null>(null);
  const tickRef = useRef<number | null>(null);
  const autoStopRef = useRef<number | null>(null);
  const typedInputRef = useRef<HTMLInputElement | null>(null);

  const supported = useSyncExternalStore(
    subscribeSupportNever,
    readRecordingSupport,
    () => SUPPORT_SERVER,
  );

  // اگر کتاب عوض شود و درس فعلی در کتاب جدید نباشد، بدون effect به تب اول برمی‌گردیم
  const effectiveLesson = lessonTabs.some((t) => t.lesson === lesson)
    ? lesson
    : (lessonTabs[0]?.lesson ?? 0);

  const pool = useMemo(
    () => data.vocab.ofLesson(effectiveLesson),
    [data, effectiveLesson],
  );

  const current: VocabEntry | undefined =
    pool.length > 0 ? pool[Math.min(wordIdx, pool.length - 1)] : undefined;

  const lessonShort =
    lessonTabs.find((t) => t.lesson === effectiveLesson)?.short ?? "";

  const avg =
    scores.length > 0
      ? Math.round(scores.reduce((sum, n) => sum + n, 0) / scores.length)
      : null;

  // پاکسازی کامل هنگام unmount: تایمرها + ضبط + TTS
  useEffect(() => {
    return () => {
      if (tickRef.current !== null) window.clearInterval(tickRef.current);
      if (autoStopRef.current !== null) window.clearTimeout(autoStopRef.current);
      recorderRef.current?.cancel();
      recorderRef.current = null;
      stopSpeaking();
    };
  }, []);

  // ─── کمکی‌های ضبط (فقط داخل handler/async صدا زده می‌شوند) ───

  function clearTimers() {
    if (tickRef.current !== null) {
      window.clearInterval(tickRef.current);
      tickRef.current = null;
    }
    if (autoStopRef.current !== null) {
      window.clearTimeout(autoStopRef.current);
      autoStopRef.current = null;
    }
  }

  function dropActiveRecording() {
    clearTimers();
    recorderRef.current?.cancel();
    recorderRef.current = null;
  }

  function clearTransient() {
    setResult(null);
    setAsrError(null);
    setMicError(null);
    setTyped("");
    setElapsed(0);
    setPhase("idle");
  }

  // ─── ارزیابی و گیمیفیکیشن ───

  function evaluateAnswer(word: string, said: string) {
    const score = similarityScore(word, said);
    const { label, tone } = scoreLabel(score);
    setResult({ said, score, label, tone });
    setScores((prev) => [...prev, score]);
    if (score >= 60) {
      awardPracticeWords(1);
    } else {
      notifyActivity();
    }
  }

  function applyAsrResult(res: AsrResult, word: string) {
    setPhase("idle");
    setElapsed(0);
    if (!res.ok || !res.text || !res.text.trim()) {
      setAsrError(res.error?.trim() || "تشخیص گفتار ناموفق بود — دوباره تلاش کن.");
      return;
    }
    evaluateAnswer(word, res.text.trim());
  }

  // ─── جریان میکروفن ───

  async function startRecordingFlow() {
    if (!current) return;
    const word = current.word;
    dropActiveRecording();
    stopSpeaking(); // صدای الگو داخل ضبط نیفتد
    setResult(null);
    setAsrError(null);
    setMicError(null);
    setElapsed(0);
    setPhase("recording");
    try {
      const rec = await startRecording(MIC_MAX_MS);
      recorderRef.current = rec;
      tickRef.current = window.setInterval(() => setElapsed((e) => e + 1), 1000);
      autoStopRef.current = window.setTimeout(() => {
        void finishRecording(word);
      }, MIC_MAX_MS);
    } catch {
      setPhase("idle");
      setMicError(
        "دسترسی میکروفن داده نشد — از تنظیمات مرورگر اجازهٔ میکروفن بده و دوباره تلاش کن.",
      );
    }
  }

  async function finishRecording(word: string) {
    const rec = recorderRef.current;
    if (!rec) return;
    recorderRef.current = null;
    clearTimers();
    setPhase("processing");
    let res: AsrResult;
    try {
      res = await rec.stop();
    } catch {
      res = { ok: false, error: "ضبط صدا ناتمام ماند — دوباره تلاش کن." };
    }
    applyAsrResult(res, word);
  }

  function onMicClick() {
    if (!current || phase === "processing") return;
    if (phase === "recording") {
      void finishRecording(current.word);
      return;
    }
    void startRecordingFlow();
  }

  // ─── انتخاب واژه ───

  function selectWord(i: number) {
    dropActiveRecording();
    clearTransient();
    setWordIdx(i);
  }

  function changeLesson(l: number) {
    dropActiveRecording();
    clearTransient();
    setLesson(l);
    setWordIdx(0);
  }

  function pickRandomWord() {
    if (pool.length < 2) return;
    let next = Math.floor(Math.random() * pool.length);
    if (next === wordIdx) next = (next + 1) % pool.length;
    selectWord(next);
  }

  function goNextWord() {
    if (pool.length === 0) return;
    selectWord((wordIdx + 1) % pool.length);
  }

  // ─── تایپ کن ببینم (جایگزین میکروفن) ───

  function checkTyped() {
    if (!current) return;
    const said = typed.trim();
    if (!said) return;
    dropActiveRecording();
    setResult(null);
    setAsrError(null);
    setMicError(null);
    setElapsed(0);
    setPhase("idle");
    evaluateAnswer(current.word, said);
  }

  function sayAgain() {
    setResult(null);
    setAsrError(null);
    if (supported) {
      void startRecordingFlow();
    } else {
      typedInputRef.current?.focus();
    }
  }

  // ─── رندر ───

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4 xl:max-w-4xl">
      {/* سربرگ */}
      <div className="flex items-center gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary"
          aria-hidden
        >
          <Mic size={22} />
        </span>
        <div className="min-w-0">
          <h2 className="text-lg font-black text-foreground">بگو ببینم</h2>
          <p className="text-xs text-muted-foreground">
            تمرین تلفظ واژه با میکروفن و نمرهٔ شباهت
          </p>
        </div>
      </div>

      {/* تب‌های درس — الگوی texts-view */}
      <div className="flex flex-wrap gap-1.5" aria-label="انتخاب درس">
        {lessonTabs.map((t) => (
          <button
            key={t.lesson}
            type="button"
            onClick={() => changeLesson(t.lesson)}
            aria-pressed={effectiveLesson === t.lesson}
            disabled={phase === "processing"}
            className={cn(
              "flex min-h-11 items-center rounded-full px-4 text-[12px] font-bold transition-all",
              effectiveLesson === t.lesson
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {t.short}
          </button>
        ))}
      </div>

      {/* آمار جلسه */}
      <div className="flex items-center justify-between gap-3 rounded-full border bg-card/60 px-4 py-2 text-xs">
        <span className="flex items-center gap-1.5 font-bold text-foreground">
          <Target size={14} className="text-primary" aria-hidden />
          تمرین امروز: {faNum(scores.length)} واژه
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <TrendingUp size={14} aria-hidden />
          میانگین: {avg === null ? "—" : faNum(avg)}
        </span>
      </div>

      {/* انتخاب واژه */}
      <Card className="border bg-card/60">
        <CardContent className="p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-black text-foreground">
              انتخاب واژه{" "}
              <span className="font-normal text-muted-foreground">
                ({faNum(pool.length)} واژه)
              </span>
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="min-h-11 gap-1.5 rounded-full px-4"
              onClick={pickRandomWord}
              disabled={phase === "processing" || pool.length < 2}
            >
              <Dices size={15} aria-hidden />
              واژه تصادفی
            </Button>
          </div>
          {pool.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              این بخش واژه‌ای ندارد — درس دیگری را انتخاب کن.
            </p>
          ) : (
            <div
              className="grid max-h-96 grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6"
              aria-label="فهرست واژه‌های این درس"
            >
              {pool.map((w, i) => (
                <button
                  key={`${w.word}-${i}`}
                  type="button"
                  onClick={() => selectWord(i)}
                  aria-pressed={i === wordIdx}
                  disabled={phase === "processing"}
                  className={cn(
                    "flex min-h-11 flex-col items-center rounded-2xl border p-2 text-center transition-all",
                    i === wordIdx
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border bg-background hover:border-primary/40 hover:bg-muted/50",
                  )}
                >
                  <span
                    dir="ltr"
                    className="w-full truncate font-en text-[13px] font-bold text-foreground"
                  >
                    {w.word}
                  </span>
                  <span className="w-full truncate text-[11px] text-muted-foreground">
                    {w.meaning}
                  </span>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* صحنهٔ تمرین واژهٔ فعال */}
      {current && (
        <Card className="border bg-card/60">
          <CardContent className="space-y-5 p-4 sm:p-6">
            {/* واژهٔ فعال */}
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-[11px]">
                  {lessonShort}
                </Badge>
                {current.pos && (
                  <Badge variant="secondary" className="text-[11px]">
                    {current.pos}
                  </Badge>
                )}
              </div>
              <p dir="ltr" className="font-en text-4xl font-black text-primary">
                {current.word}
              </p>
              <p className="text-sm text-muted-foreground">{current.meaning}</p>
              <div className="flex items-center gap-2 pt-1">
                <SpeakButton
                  text={current.word}
                  size="lg"
                  className="h-11 w-11"
                  label={`روخوانی الگو: ${current.word}`}
                />
                <button
                  type="button"
                  onClick={() => void speak(current.word, { speed: 0.7 })}
                  aria-label="روخوانی آهستهٔ واژه"
                  className="flex h-11 items-center gap-1.5 rounded-full bg-muted px-4 text-xs font-bold text-foreground transition-all hover:bg-muted/70"
                >
                  <Volume1 size={15} aria-hidden />
                  آهسته
                </button>
              </div>
            </div>

            {/* میکروفن */}
            {supported && (
              <div className="flex flex-col items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={onMicClick}
                  disabled={phase === "processing"}
                  aria-label={
                    phase === "recording" ? "توقف ضبط" : "شروع ضبط واژه"
                  }
                  aria-pressed={phase === "recording"}
                  aria-busy={phase === "processing"}
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-all",
                    phase === "recording"
                      ? "animate-pulse ring-8 ring-primary/25"
                      : "ring-4 ring-primary/15 hover:scale-105",
                    phase === "processing" && "cursor-wait opacity-70",
                  )}
                >
                  {phase === "recording" ? (
                    <span
                      className="soundwave flex h-5 items-end gap-[3px]"
                      aria-hidden
                    >
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </span>
                  ) : phase === "processing" ? (
                    <Loader2 size={26} className="animate-spin" aria-hidden />
                  ) : (
                    <Mic size={26} aria-hidden />
                  )}
                </button>
                <p className="text-xs text-muted-foreground">
                  {phase === "recording"
                    ? `دارم گوش می‌دهم… ${faNum(Math.min(elapsed, 7))} ثانیه`
                    : phase === "processing"
                      ? "دارم صدایت را بررسی می‌کنم…"
                      : "دکمهٔ میکروفن را بزن و واژه را بلند بگو"}
                </p>
              </div>
            )}

            {/* خطای میکروفن / تشخیص گفتار — پیام کهربایی محترمانه */}
            {(micError || asrError) && (
              <div
                role="alert"
                className="flex flex-wrap items-center gap-2 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-3 text-[13px] text-amber-800 dark:text-amber-200"
              >
                <span className="min-w-0 flex-1">{micError ?? asrError}</span>
                {supported && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-11 shrink-0 rounded-full border-amber-500/50 px-4 text-amber-800 hover:bg-amber-500/15 dark:text-amber-200"
                    onClick={() => void startRecordingFlow()}
                  >
                    تلاش دوباره
                  </Button>
                )}
              </div>
            )}

            {/* جایگزین «تایپ کن ببینم» — بدون پشتیبانی ضبط یا خطای میکروفن */}
            {(!supported || micError) && (
              <div className="space-y-2 rounded-2xl border bg-muted/30 p-4">
                <Label htmlFor="sayit-typed" className="text-[13px] font-bold">
                  {!supported ? "تایپ کن ببینم" : "یا تایپ کن ببینم"}
                </Label>
                <p className="text-xs text-muted-foreground">
                  {!supported
                    ? "مرورگرت از ضبط صدا پشتیبانی نمی‌کند — به‌جای میکروفن، واژه را همین‌جا تایپ کن تا نمرهٔ شباهتش را ببینی."
                    : "تا وقتی اجازهٔ میکروفن داده نشده، می‌توانی واژه را تایپ کنی و نمره بگیری."}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Input
                    id="sayit-typed"
                    dir="ltr"
                    className="font-en min-h-11 flex-1 text-start"
                    placeholder="type the word…"
                    value={typed}
                    onChange={(e) => setTyped(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        checkTyped();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    className="min-h-11 shrink-0 rounded-full px-5"
                    onClick={checkTyped}
                    disabled={!typed.trim()}
                  >
                    بررسی
                  </Button>
                </div>
              </div>
            )}

            {/* نتیجهٔ ارزیابی */}
            {result && (
              <div
                role="status"
                className="space-y-4 rounded-2xl border bg-background/60 p-4"
              >
                <div className="flex flex-col items-center gap-2">
                  <ScoreRing score={result.score} tone={result.tone} />
                  <p
                    className={cn(
                      "text-sm font-black",
                      TONE_STYLES[result.tone].text,
                    )}
                  >
                    {result.label}
                  </p>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  شنیدم:{" "}
                  <span
                    dir="ltr"
                    className="font-en inline-block font-bold text-foreground"
                  >
                    “{result.said}”
                  </span>
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="min-h-11 gap-1.5 rounded-full px-5"
                    onClick={sayAgain}
                  >
                    <RotateCcw size={15} aria-hidden />
                    دوباره بگو
                  </Button>
                  <Button
                    type="button"
                    className="min-h-11 gap-1.5 rounded-full px-5"
                    onClick={goNextWord}
                  >
                    واژهٔ بعدی
                    <ArrowLeft size={15} aria-hidden />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
