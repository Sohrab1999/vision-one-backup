"use client";

/**
 * سایه‌خانی خط‌به‌خط (Shadowing Practice) — فاز ۷ نقشه راه جامع ۲۰۲۶.
 *
 * یک ریدینگ از جزوهٔ فعال انتخاب می‌شود و هر پاراگراف یک «خط» تمرین است:
 *  ۱ گوش بده (TTS) → ۲ تکرار کن (ضبط میکروفن اختیاری + نمرهٔ شباهت؛ بدون ضبط، تکرار شفاهی)
 *  → ۳ خط بعد. خط فعال ring دارد و با scrollIntoView (فقط در callback) وسط دید می‌آید.
 *
 * کنترل‌های کلی: قبلی/بعدی دستی، «آهسته» (سرعت ۰.۷)، «ترجمه»، «پخش خودکار» چرخهٔ
 * play → onEnd → (اگر «حالت ضبط» روشن باشد ۱.۲ ثانیه مکث برای تکرار شفاهی — ضبط
 * خودکار نداریم؛ دکمهٔ «تکرار کن» دستی است) → خط بعد.
 * پایان متن: کارت مراسم + notifyActivity. cleanup کامل در unmount (صدا/ضبط/تایمر).
 * هیچ ناوبری‌ای از این نما صادر نمی‌شود — مونتاژ با ارکستراتور است.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Check,
  Flag,
  Loader2,
  LogOut,
  Mic,
  PartyPopper,
  RotateCcw,
  Sparkles,
  Square,
  Target,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  isRecordingSupported,
  startRecording,
  type AsrResult,
  type Recorder,
} from "@/lib/asr-client";
import { scoreLabel, similarityScore } from "@/lib/similarity";
import { speak, stopSpeaking } from "@/lib/speak";
import { useVoiceSpeed } from "@/lib/voice-store";
import { notifyActivity } from "@/lib/gamification";
import { useBookData } from "@/lib/book-context";
import { ClickableEnText } from "@/components/book/word-lookup";
import { faNum } from "@/components/book/games/shared";
import type { Reading } from "@/data/types";

type Phase = "pick" | "practice" | "done";
type RecState = "idle" | "recording" | "processing";

/** کلید یک ردیف سوییچ — لیبل + Switch دسترس‌پذیر */
function ToggleRow({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <span className="flex items-center gap-1.5">
      <Switch id={id} checked={checked} onCheckedChange={onChange} aria-label={label} />
      <Label htmlFor={id} className="cursor-pointer text-[12px] font-bold">
        {label}
      </Label>
    </span>
  );
}

/** نگاشت tone نمره به کلاس رنگ — عالی emerald، خوب amber، تلاش نارنجی ملایم */
function toneCls(tone: "great" | "good" | "try"): string {
  if (tone === "great")
    return "border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400";
  if (tone === "good")
    return "border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-400";
  return "border-orange-500/40 bg-orange-500/15 text-orange-700 dark:text-orange-400";
}

/** onEnd تضمیناً یک‌بار — audio.onerror و catch پخش هر دو صدا می‌زنند */
function onceEnd(cb: () => void): () => void {
  let called = false;
  return () => {
    if (called) return;
    called = true;
    cb();
  };
}

const MAX_RECORD_MS = 7000;
/** سقف ضبط + حاشیه — اگر دکمهٔ «پایان ضبط» فشرده نشود، خودکار نمره‌دهی می‌شود */
const AUTO_STOP_MS = MAX_RECORD_MS + 400;
/** مکث چرخهٔ خودکار در «حالت ضبط» — فرصت تکرار شفاهی کاربر */
const REPEAT_PAUSE_MS = 1200;

export function ShadowingPractice() {
  const data = useBookData();
  const readings = data.readings;
  const { speed } = useVoiceSpeed();

  const [phase, setPhase] = useState<Phase>("pick");
  const [reading, setReading] = useState<Reading | null>(null);
  const [idx, setIdx] = useState(0);
  const [slow, setSlow] = useState(false);
  const [showFa, setShowFa] = useState(true);
  const [auto, setAuto] = useState(false);
  const [recMode, setRecMode] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [recState, setRecState] = useState<RecState>("idle");
  const [scores, setScores] = useState<Record<number, number | undefined>>({});
  const [heard, setHeard] = useState<string | null>(null);
  const [asrError, setAsrError] = useState<string | null>(null);
  const [practiced, setPracticed] = useState<boolean[]>([]);

  const idxRef = useRef(0);
  const readingRef = useRef<Reading | null>(null);
  /** زنجیرهٔ چرخهٔ صدا — با هر کنش دستی ابطال می‌شود */
  const chainRef = useRef(0);
  const recorderRef = useRef<Recorder | null>(null);
  const autoTimerRef = useRef<number | null>(null);
  const autoStopRef = useRef<number | null>(null);
  const lineElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const aliveRef = useRef(true);
  const autoRef = useRef(false);
  const recModeRef = useRef(true);
  const recStateRef = useRef<RecState>("idle");

  // ── رفرش‌های دیرهنگام برای callbackهای زنجیرهٔ صدا (الگوی latest-ref) ──
  const playLineRef = useRef<(i: number) => void>(() => {});
  const goToRef = useRef<(i: number) => void>(() => {});
  const scheduleAdvanceRef = useRef<(token: number, i: number, waited: boolean) => void>(() => {});
  const finishRef = useRef<() => void>(() => {});
  const stopAndScoreRef = useRef<() => Promise<void>>(async () => {});

  const clearAutoTimer = useCallback(() => {
    if (autoTimerRef.current !== null) {
      window.clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  }, []);

  const cancelRecorder = useCallback(() => {
    if (recorderRef.current) {
      recorderRef.current.cancel();
      recorderRef.current = null;
    }
    if (autoStopRef.current !== null) {
      window.clearTimeout(autoStopRef.current);
      autoStopRef.current = null;
    }
  }, []);

  const finish = useCallback(() => {
    chainRef.current += 1;
    stopSpeaking();
    clearAutoTimer();
    cancelRecorder();
    setSpeaking(false);
    recStateRef.current = "idle";
    setRecState("idle");
    notifyActivity();
    setPhase("done");
  }, [cancelRecorder, clearAutoTimer]);

  /** پخش یک خط — نقطهٔ شروع همهٔ چرخه‌ها؛ فقط در callback/handler صدا زده می‌شود */
  const playLine = useCallback(
    (i: number) => {
      const list = readingRef.current?.paragraphs ?? [];
      const p = list[i];
      if (!p) {
        finishRef.current();
        return;
      }
      const token = chainRef.current;
      setSpeaking(true);
      speak(p.en, {
        speed: slow ? 0.7 : speed,
        onEnd: onceEnd(() => {
          if (token !== chainRef.current || !aliveRef.current) return;
          setSpeaking(false);
          if (!autoRef.current) return;
          scheduleAdvanceRef.current(token, i, false);
        }),
      });
    },
    [slow, speed],
  );

  /**
   * ادامهٔ چرخهٔ خودکار: در «حالت ضبط» اول یک مکث ۱.۲ ثانیه‌ای برای تکرار شفاهی
   * (ضبط خودکار نداریم)؛ اگر کاربر با دکمهٔ «تکرار کن» مشغول ضبط باشد تا پایانش صبر می‌کنیم.
   */
  const scheduleAutoAdvance = useCallback(
    (token: number, i: number, waited: boolean) => {
      clearAutoTimer();
      if ((!waited && recModeRef.current) || recStateRef.current !== "idle") {
        autoTimerRef.current = window.setTimeout(() => {
          if (token !== chainRef.current || !aliveRef.current) return;
          scheduleAdvanceRef.current(token, i, true);
        }, REPEAT_PAUSE_MS);
        return;
      }
      goToRef.current(i + 1);
    },
    [clearAutoTimer],
  );

  /** رفتن به خط — خط فعلی «تمرین‌شده» حساب می‌شود؛ اسکرول فقط اینجا (callback) */
  const goToLine = useCallback(
    (i: number) => {
      const prev = idxRef.current;
      setPracticed((p) => {
        if (p[prev]) return p;
        const copy = [...p];
        copy[prev] = true;
        return copy;
      });
      const list = readingRef.current?.paragraphs ?? [];
      if (i >= list.length) {
        finishRef.current();
        return;
      }
      idxRef.current = i;
      setIdx(i);
      setHeard(null);
      setAsrError(null);
      cancelRecorder();
      recStateRef.current = "idle";
      setRecState("idle");
      const el = lineElsRef.current[i];
      if (el) el.scrollIntoView({ block: "center", behavior: "smooth" });
      if (autoRef.current) playLineRef.current(i);
    },
    [cancelRecorder],
  );

  const stopAndScore = useCallback(async () => {
    const rec = recorderRef.current;
    if (!rec) return;
    if (autoStopRef.current !== null) {
      window.clearTimeout(autoStopRef.current);
      autoStopRef.current = null;
    }
    const lineIdx = idxRef.current;
    const token = chainRef.current;
    recStateRef.current = "processing";
    setRecState("processing");
    let res: AsrResult;
    try {
      res = await rec.stop();
    } catch {
      res = { ok: false, error: "ضبط صدا ناموفق بود — دوباره تلاش کن" };
    }
    if (recorderRef.current === rec) recorderRef.current = null;
    if (!aliveRef.current || token !== chainRef.current || lineIdx !== idxRef.current) return;
    recStateRef.current = "idle";
    setRecState("idle");
    if (!res.ok) {
      setAsrError(res.error ?? "تشخیص گفتار ناموفق بود — دوباره تلاش کن");
      return;
    }
    const heardText = res.text;
    if (!heardText) {
      setAsrError("چیزی شنیده نشد — کمی بلندتر و شفاف‌تر بگو");
      return;
    }
    setAsrError(null);
    setHeard(heardText);
    const target = readingRef.current?.paragraphs[lineIdx]?.en ?? "";
    const score = similarityScore(target, heardText);
    setScores((prev) => ({ ...prev, [lineIdx]: score }));
  }, []);

  // ── آینه‌کردن آخرین نسخهٔ callbackها (الگوی latest-ref) ──
  useEffect(() => {
    playLineRef.current = playLine;
    goToRef.current = goToLine;
    scheduleAdvanceRef.current = scheduleAutoAdvance;
    finishRef.current = finish;
    stopAndScoreRef.current = stopAndScore;
    autoRef.current = auto;
    recModeRef.current = recMode;
    recStateRef.current = recState;
  });

  // ── cleanup کامل هنگام unmount: صدا، ضبط و هر دو تایمر ──
  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
      chainRef.current += 1;
      stopSpeaking();
      clearAutoTimer();
      cancelRecorder();
    };
  }, [cancelRecorder, clearAutoTimer]);

  // ── هندلرها (همه فقط در رویدادها) ──

  const startReading = useCallback(
    (r: Reading) => {
      chainRef.current += 1;
      stopSpeaking();
      clearAutoTimer();
      cancelRecorder();
      readingRef.current = r;
      idxRef.current = 0;
      setReading(r);
      setIdx(0);
      setScores({});
      setHeard(null);
      setAsrError(null);
      setSpeaking(false);
      recStateRef.current = "idle";
      setRecState("idle");
      setPracticed(r.paragraphs.map(() => false));
      setPhase("practice");
      if (autoRef.current) playLineRef.current(0);
    },
    [cancelRecorder, clearAutoTimer],
  );

  const exitPractice = useCallback(() => {
    chainRef.current += 1;
    stopSpeaking();
    clearAutoTimer();
    cancelRecorder();
    setSpeaking(false);
    recStateRef.current = "idle";
    setRecState("idle");
    setReading(null);
    setPhase("pick");
  }, [cancelRecorder, clearAutoTimer]);

  const toggleAuto = useCallback(
    (v: boolean) => {
      autoRef.current = v;
      setAuto(v);
      chainRef.current += 1;
      clearAutoTimer();
      if (v) {
        playLineRef.current(idxRef.current);
      } else {
        stopSpeaking();
        setSpeaking(false);
      }
    },
    [clearAutoTimer],
  );

  const toggleRecMode = useCallback((v: boolean) => {
    recModeRef.current = v;
    setRecMode(v);
  }, []);

  /** ۱ گوش بده — پخش خط فعال (با پخش خودکار، چرخه از همین‌جا ادامه می‌یابد) */
  const listenNow = useCallback(() => {
    chainRef.current += 1;
    clearAutoTimer();
    stopSpeaking();
    setHeard(null);
    setAsrError(null);
    playLineRef.current(idxRef.current);
  }, [clearAutoTimer]);

  /** ۲ تکرار کن — ضبط دستی؛ مرورگر بی‌ضبط → تکرار شفاهی */
  const handleRecButton = useCallback(async () => {
    if (recState === "processing") return;
    if (recState === "recording") {
      await stopAndScore();
      return;
    }
    if (!isRecordingSupported()) {
      toast.info("مرورگرت ضبط صدا ندارد — همین‌جا شفاهی تکرار کن و بعد «خط بعد» را بزن");
      return;
    }
    try {
      const rec = await startRecording(MAX_RECORD_MS);
      if (!aliveRef.current) {
        rec.cancel();
        return;
      }
      recorderRef.current = rec;
      recStateRef.current = "recording";
      setRecState("recording");
      autoStopRef.current = window.setTimeout(() => {
        void stopAndScoreRef.current();
      }, AUTO_STOP_MS);
    } catch {
      setAsrError("دسترسی به میکروفن داده نشد — اجازهٔ مرورگر را بررسی کن");
    }
  }, [recState, stopAndScore]);

  /** ۳ خط بعد — همان ناوبری دستی؛ روی خط آخر به مراسم می‌رسد */
  const goNext = useCallback(() => {
    chainRef.current += 1;
    clearAutoTimer();
    stopSpeaking();
    setSpeaking(false);
    goToRef.current(idxRef.current + 1);
  }, [clearAutoTimer]);

  const goPrev = useCallback(() => {
    if (idxRef.current === 0) return;
    chainRef.current += 1;
    clearAutoTimer();
    stopSpeaking();
    setSpeaking(false);
    goToRef.current(idxRef.current - 1);
  }, [clearAutoTimer]);

  const finishNow = useCallback(() => {
    const prev = idxRef.current;
    setPracticed((p) => {
      if (p[prev]) return p;
      const copy = [...p];
      copy[prev] = true;
      return copy;
    });
    finishRef.current();
  }, []);

  // ── فاز انتخاب متن ──
  if (phase === "pick") {
    return (
      <div className="mx-auto max-w-2xl space-y-4 rise-in">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400">
            <BookOpenText size={22} />
          </span>
          <div>
            <h2 className="text-lg font-black">سایه‌خوانی — گوش بده و تکرار کن</h2>
            <p className="text-[11.5px] text-muted-foreground">
              متن را خط‌به‌خط گوش بده، با همان ریتم تکرار کن و نمرهٔ تلفظ بگیر
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
          <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
          <p>
            چرخهٔ هر خط: «گوش بده» → «تکرار کن» (میکروفن اختیاری — اگر مرورگرت ضبط ندارد شفاهی
            تکرار کن) → «خط بعد». با «پخش خودکار» چرخه خودش جلو می‌رود.
          </p>
        </div>

        {readings.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-[13px] text-muted-foreground">
              در این جزوه متنی برای سایه‌خوانی ثبت نشده است.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {readings.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => startReading(r)}
                className="rounded-2xl border bg-card/60 p-4 text-right shadow-sm transition-all hover:border-primary/50 hover:bg-muted/40 active:scale-[0.99]"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[14px] font-black leading-6">{r.titleFa}</h3>
                  <Badge variant="secondary" className="shrink-0 text-[10px]">
                    درس {faNum(r.lesson)}
                  </Badge>
                </div>
                <p dir="ltr" className="font-en mt-0.5 text-left text-[11px] text-muted-foreground">
                  {r.title}
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <BookOpenText size={12} />
                  {faNum(r.paragraphs.length)} پاراگراف
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── فاز مراسم پایان ──
  if (phase === "done") {
    const r = reading;
    const m = r?.paragraphs.length ?? 0;
    const practicedCount = practiced.filter(Boolean).length;
    const scored = Object.values(scores).filter((s): s is number => typeof s === "number");
    const avg =
      scored.length > 0 ? Math.round(scored.reduce((a, b) => a + b, 0) / scored.length) : null;
    const greatCount = scored.filter((s) => s >= 85).length;
    return (
      <Card className="mx-auto max-w-xl rise-in border-amber-500/30">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <PartyPopper size={30} />
          </span>
          <div>
            <h2 className="text-xl font-black">تمرین سایه‌خوانی تمام شد!</h2>
            {r && <p className="mt-1 text-[12px] text-muted-foreground">{r.titleFa}</p>}
          </div>
          <div className="grid w-full grid-cols-3 gap-2">
            <div className="rounded-xl bg-muted/60 p-3">
              <Check size={16} className="mx-auto text-emerald-500" />
              <p className="mt-1.5 text-lg font-black leading-none">
                {faNum(practicedCount)} از {faNum(m)}
              </p>
              <p className="mt-1 text-[10px] text-muted-foreground">خط تمرین‌شده</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <Target size={16} className="mx-auto text-amber-500" />
              <p className="mt-1.5 text-lg font-black leading-none">
                {avg === null ? "—" : `${faNum(avg)}٪`}
              </p>
              <p className="mt-1 text-[10px] text-muted-foreground">میانگین نمره</p>
            </div>
            <div className="rounded-xl bg-muted/60 p-3">
              <Sparkles size={16} className="mx-auto text-teal-500" />
              <p className="mt-1.5 text-lg font-black leading-none">{faNum(greatCount)}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">خط عالی</p>
            </div>
          </div>
          <p className="text-[11.5px] leading-6 text-muted-foreground">
            {avg === null
              ? "این‌بار فقط گوش دادی و تکرار کردی — دفعهٔ بعد «تکرار کن» را بزن تا نمرهٔ تلفظ بگیری."
              : avg >= 85
                ? "تلفظت فوق‌العاده بود — همین ریتم را حفظ کن! 🎉"
                : "خوب پیش رفتی؛ خط‌های کم‌نمره را یک‌بار دیگر گوش بده و تکرار کن. 💪"}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {r && (
              <Button className="min-h-11 gap-1.5" onClick={() => startReading(r)}>
                <RotateCcw size={15} />
                تمرین دوباره
              </Button>
            )}
            <Button variant="outline" className="min-h-11 gap-1.5" onClick={() => setPhase("pick")}>
              <BookOpenText size={15} />
              متن دیگر
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ── فاز تمرین خط‌به‌خط ──
  const r = reading;
  if (!r) return null;
  const paras = r.paragraphs;
  const m = paras.length;
  const pctPos = m > 0 ? Math.round(((idx + 1) / m) * 100) : 0;
  const practicedCount = practiced.filter(Boolean).length;
  const pctPracticed = m > 0 ? Math.round((practicedCount / m) * 100) : 0;
  const isLast = idx === m - 1;
  const curScore = scores[idx];

  return (
    <div className="mx-auto max-w-2xl space-y-4 rise-in">
      {/* سربرگ متن */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h2 dir="ltr" className="font-en text-left text-base font-black leading-6 text-primary">
            {r.title}
          </h2>
          <p className="mt-0.5 text-[12px] font-bold">{r.titleFa}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <Badge variant="secondary" className="shrink-0 text-[10px]">
            درس {faNum(r.lesson)}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="min-h-11 gap-1.5 text-[11px] text-muted-foreground"
            onClick={exitPractice}
          >
            <LogOut size={14} />
            خروج
          </Button>
        </div>
      </div>

      {/* پیشرفت */}
      <div className="space-y-1.5">
        <Progress
          value={pctPos}
          aria-label={`پیشرفت — خط ${faNum(idx + 1)} از ${faNum(m)}`}
          className="h-1.5"
        />
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground">
          <span>
            خط {faNum(idx + 1)} از {faNum(m)}
          </span>
          <span aria-hidden="true">·</span>
          <span>تمرین‌شده: {faNum(pctPracticed)}٪</span>
        </div>
      </div>

      {/* کنترل‌های کلی */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border bg-card/60 p-3">
        <ToggleRow id="sh-slow" label="آهسته" checked={slow} onChange={setSlow} />
        <ToggleRow id="sh-fa" label="ترجمه" checked={showFa} onChange={setShowFa} />
        <ToggleRow id="sh-auto" label="پخش خودکار" checked={auto} onChange={toggleAuto} />
        <ToggleRow id="sh-rec" label="حالت ضبط" checked={recMode} onChange={toggleRecMode} />
      </div>

      {/* ناوبری دستی */}
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" className="min-h-11 gap-1.5" onClick={goPrev} disabled={idx === 0}>
          <ArrowRight size={15} />
          قبلی
        </Button>
        <Button variant="outline" className="min-h-11 gap-1.5" onClick={goNext}>
          بعدی
          <ArrowLeft size={15} />
        </Button>
        <div className="mr-auto">
          <Button
            variant="ghost"
            size="sm"
            className="min-h-11 gap-1.5 text-[11px] text-muted-foreground"
            onClick={finishNow}
          >
            <Flag size={14} />
            پایان تمرین
          </Button>
        </div>
      </div>

      {/* خط‌های متن */}
      <div className="space-y-3">
        {paras.map((p, i) => {
          const active = i === idx;
          const score = scores[i];
          return (
            <div
              key={`${r.id}-${i}`}
              ref={(el) => {
                lineElsRef.current[i] = el;
              }}
              className={cn(
                "rounded-2xl border bg-card/60 p-4 transition-all",
                active ? "border-primary/40 ring-2 ring-primary" : "opacity-75",
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-7 min-w-7 items-center justify-center rounded-full px-1 text-[11px] font-black",
                    active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  {faNum(i + 1)}
                </span>
                {active && (
                  <Badge variant="outline" className="border-primary/40 text-[10px] text-primary">
                    خط فعال — اینجا تمرین کن
                  </Badge>
                )}
              </div>
              <ClickableEnText text={p.en} className="font-en mt-2 block text-[13.5px] leading-7" />
              {showFa && (
                <p className="mt-1.5 border-t pt-1.5 text-[12px] leading-6 text-muted-foreground">
                  {p.fa}
                </p>
              )}

              {active && (
                <div className="mt-3 space-y-2.5 border-t pt-3">
                  {speaking && (
                    <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <Volume2 size={12} className="animate-pulse" />
                      در حال پخش… خوب گوش کن
                    </p>
                  )}
                  <div className="grid gap-2 sm:grid-cols-3">
                    {/* ۱ گوش بده */}
                    <Button variant="outline" className="min-h-11 justify-start gap-2" onClick={listenNow}>
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-black text-primary">
                        ۱
                      </span>
                      <Volume2 size={15} />
                      گوش بده
                    </Button>
                    {/* ۲ تکرار کن — ضبط دستی */}
                    <Button
                      variant={recState === "idle" ? "outline" : "secondary"}
                      className={cn("min-h-11 justify-start gap-2", recState === "recording" && "animate-pulse")}
                      onClick={() => void handleRecButton()}
                      disabled={recState === "processing"}
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-black text-primary">
                        ۲
                      </span>
                      {recState === "idle" && (
                        <>
                          <Mic size={15} />
                          تکرار کن
                        </>
                      )}
                      {recState === "recording" && (
                        <>
                          <Square size={14} />
                          پایان ضبط
                        </>
                      )}
                      {recState === "processing" && (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          بررسی…
                        </>
                      )}
                    </Button>
                    {/* ۳ خط بعد — جهت RTL: بعدی = چپ */}
                    <Button className="min-h-11 justify-start gap-2" onClick={goNext}>
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-foreground/20 text-[10px] font-black">
                        ۳
                      </span>
                      {isLast ? (
                        <>
                          <Flag size={15} />
                          پایان متن
                        </>
                      ) : (
                        <>
                          <ArrowLeft size={15} />
                          خط بعد
                        </>
                      )}
                    </Button>
                  </div>

                  {asrError && (
                    <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3">
                      <p className="text-[12px] font-bold leading-5 text-amber-700 dark:text-amber-400">
                        {asrError}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2 min-h-11 gap-1.5"
                        onClick={() => void handleRecButton()}
                      >
                        <Mic size={14} />
                        تلاش دوباره
                      </Button>
                    </div>
                  )}

                  {curScore !== undefined && (
                    <div className="space-y-1.5 rounded-xl border border-primary/20 bg-muted/40 p-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="outline"
                          className={cn("text-[10.5px]", toneCls(scoreLabel(curScore).tone))}
                        >
                          {faNum(curScore)} از {faNum(100)}
                        </Badge>
                        <span className="text-[11.5px] font-bold">{scoreLabel(curScore).label}</span>
                      </div>
                      {heard && (
                        <p
                          dir="ltr"
                          className="font-en text-left text-[11px] leading-5 text-muted-foreground"
                        >
                          شنیدم: {heard}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
