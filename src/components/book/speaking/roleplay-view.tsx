"use client";

/**
 * مکالمه نقش‌محور (Roleplay Practice) — فاز ۷ نقشه راه جامع ۲۰۲۶.
 *
 * کاربر یک مکالمه از جزوهٔ فعال انتخاب می‌کند، نقش A (خطوط زوج) یا B (خطوط فرد)
 * را می‌گیرد و مکالمه خط‌به‌خط ادامه می‌یابد:
 *  - خطوط نقش مقابل با TTS خودکار پخش می‌شود («دوباره پخش» روی هر حباب هست).
 *  - نوبت کاربر: «حالا نوبت توئه» → ضبط میکروفن (ASR) یا تایپ → نمرهٔ شباهت ۰..۱۰۰
 *    روی حباب (>=۸۵ emerald، >=۶۰ amber، کمتر نارنجی ملایم) + «شنیدم: …».
 *  - خطای ASR محترمانه با دو مسیر «تلاش دوباره / تایپ می‌کنم» — بدون کرش.
 *  - حالت سوم «فقط گوش بده»: پخش کامل مکالمه با TTS (خطوط کاربر هم خوانده می‌شود).
 * پایان: کارت مراسم با دقت میانگین + شمارش عالی/خوب + notifyActivity (XP/زنجیره).
 * هیچ ناوبری‌ای از این نما صادر نمی‌شود — مونتاژ با ارکستراتور است.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Headphones,
  Keyboard,
  Loader2,
  LogOut,
  MessagesSquare,
  Mic,
  PartyPopper,
  Play,
  SkipForward,
  Sparkles,
  Square,
  Target,
  ThumbsUp,
  Users,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
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
import { SpeakButton } from "@/components/book/speak-button";
import { ClickableEnText } from "@/components/book/word-lookup";
import { faNum } from "@/components/book/games/shared";
import type { Conversation, ConversationLine } from "@/data/types";

type Phase = "pick" | "role" | "play" | "done";
type Role = "A" | "B" | "listen";
type RecState = "idle" | "recording" | "processing";
type AnswerMode = "speak" | "type";

/** نتیجهٔ یک خط از نقش کاربر — skip یعنی null */
interface LineResult {
  score: number;
  heard: string;
}

/** نگاشت tone نمره به کلاس رنگ — عالی emerald، خوب amber، تلاش نارنجی ملایم */
function toneCls(tone: "great" | "good" | "try"): string {
  if (tone === "great")
    return "border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400";
  if (tone === "good")
    return "border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-400";
  return "border-orange-500/40 bg-orange-500/15 text-orange-700 dark:text-orange-400";
}

/** حروف آواتار دایره‌ای از نام گوینده — هم‌الگوی texts-view */
function initialsOf(speaker: string): string {
  return speaker.replace("Ms. ", "").replace("Mr. ", "").slice(0, 2);
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
/** سقف ضبط + حاشیه — اگر دکمهٔ توقف فشرده نشود، خودکار نمره‌دهی می‌شود */
const AUTO_STOP_MS = MAX_RECORD_MS + 400;

export function RoleplayPractice() {
  const data = useBookData();
  const conversations = data.conversations;
  const { speed } = useVoiceSpeed();

  const [phase, setPhase] = useState<Phase>("pick");
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [role, setRole] = useState<Role>("A");
  const [turn, setTurn] = useState(0);
  const [results, setResults] = useState<(LineResult | null)[]>([]);
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const [recState, setRecState] = useState<RecState>("idle");
  const [asrError, setAsrError] = useState<string | null>(null);
  const [answerMode, setAnswerMode] = useState<AnswerMode>("speak");
  const [typedInput, setTypedInput] = useState("");

  const turnRef = useRef(0);
  const roleRef = useRef<Role>("A");
  /** زنجیرهٔ پخش TTS — با هر پرش/پخش دوباره ابطال می‌شود */
  const chainRef = useRef(0);
  /** نشست مکالمه — فقط شروع/خروج/پایان آن را عوض می‌کند (گارد نتیجهٔ ASR) */
  const sessionRef = useRef(0);
  const recorderRef = useRef<Recorder | null>(null);
  const autoStopRef = useRef<number | null>(null);
  const aliveRef = useRef(true);

  const lines: ConversationLine[] = conversation?.lines ?? [];

  // ── رفرش‌های دیرهنگام برای callbackهای زنجیرهٔ صدا (الگوی latest-ref) ──
  const advanceRef = useRef<() => void>(() => {});
  const speakLineRef = useRef<(i: number, token: number) => void>(() => {});
  const finishRef = useRef<() => void>(() => {});
  const stopAndScoreRef = useRef<() => Promise<void>>(async () => {});

  const isUserLineIdx = useCallback((i: number): boolean => {
    const r = roleRef.current;
    return r !== "listen" && i % 2 === (r === "B" ? 1 : 0);
  }, []);

  const clearAutoStop = useCallback(() => {
    if (autoStopRef.current !== null) {
      window.clearTimeout(autoStopRef.current);
      autoStopRef.current = null;
    }
  }, []);

  const finish = useCallback(() => {
    sessionRef.current += 1;
    chainRef.current += 1;
    stopSpeaking();
    if (recorderRef.current) {
      recorderRef.current.cancel();
      recorderRef.current = null;
    }
    clearAutoStop();
    setSpeakingIdx(null);
    setRecState("idle");
    notifyActivity();
    setPhase("done");
  }, [clearAutoStop]);

  /** نوبت بعد — همیشه داخل callback (پایان صدا/دکمه‌ها) صدا زده می‌شود، نه در بدنهٔ effect */
  const advanceTurn = useCallback(() => {
    const next = turnRef.current + 1;
    if (next >= lines.length) {
      finishRef.current();
      return;
    }
    turnRef.current = next;
    setTurn(next);
    setAsrError(null);
    setTypedInput("");
    speakLineRef.current(next, chainRef.current);
  }, [lines]);

  /** پخش یک خط — خطوط نقش کاربر بی‌صدا رد می‌شود (نوبت کاربر) */
  const speakLine = useCallback(
    (i: number, token: number) => {
      const line = lines[i];
      if (!line) {
        finishRef.current();
        return;
      }
      if (isUserLineIdx(i)) return;
      setSpeakingIdx(i);
      speak(line.en, {
        speed,
        onEnd: onceEnd(() => {
          if (token !== chainRef.current || !aliveRef.current) return;
          setSpeakingIdx(null);
          advanceRef.current();
        }),
      });
    },
    [isUserLineIdx, lines, speed],
  );

  const stopAndScore = useCallback(async () => {
    const rec = recorderRef.current;
    if (!rec) return;
    clearAutoStop();
    const lineIdx = turnRef.current;
    const session = sessionRef.current;
    setRecState("processing");
    let res: AsrResult;
    try {
      res = await rec.stop();
    } catch {
      res = { ok: false, error: "ضبط صدا ناموفق بود — دوباره تلاش کن" };
    }
    if (recorderRef.current === rec) recorderRef.current = null;
    if (!aliveRef.current || session !== sessionRef.current || lineIdx !== turnRef.current) return;
    setRecState("idle");
    const line = lines[lineIdx];
    if (!line) return;
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
    const score = similarityScore(line.en, heardText);
    setResults((prev) => {
      const copy = [...prev];
      copy[lineIdx] = { score, heard: heardText };
      return copy;
    });
  }, [clearAutoStop, lines]);

  // ── آینه‌کردن آخرین نسخهٔ callbackها برای استفادهٔ امن در onEnd/تایمر ──
  useEffect(() => {
    advanceRef.current = advanceTurn;
    speakLineRef.current = speakLine;
    finishRef.current = finish;
    stopAndScoreRef.current = stopAndScore;
  });

  // ── cleanup کامل هنگام unmount: صدا، ضبط و تایمرها ──
  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
      sessionRef.current += 1;
      chainRef.current += 1;
      stopSpeaking();
      if (recorderRef.current) {
        recorderRef.current.cancel();
        recorderRef.current = null;
      }
      if (autoStopRef.current !== null) {
        window.clearTimeout(autoStopRef.current);
        autoStopRef.current = null;
      }
    };
  }, []);

  // ── هندلرها (همه فقط در رویدادها) ──

  const openConversation = useCallback((c: Conversation) => {
    setConversation(c);
    setPhase("role");
  }, []);

  const backToPick = useCallback(() => {
    setConversation(null);
    setPhase("pick");
  }, []);

  const startWith = useCallback(
    (r: Role) => {
      const c = conversation;
      if (!c) return;
      sessionRef.current += 1;
      chainRef.current += 1;
      clearAutoStop();
      if (recorderRef.current) {
        recorderRef.current.cancel();
        recorderRef.current = null;
      }
      roleRef.current = r;
      turnRef.current = 0;
      setRole(r);
      setTurn(0);
      setResults(c.lines.map(() => null));
      setSpeakingIdx(null);
      setRecState("idle");
      setAsrError(null);
      setTypedInput("");
      setAnswerMode("speak");
      setPhase("play");
      speakLineRef.current(0, chainRef.current);
    },
    [clearAutoStop, conversation],
  );

  const exitSession = useCallback(() => {
    sessionRef.current += 1;
    chainRef.current += 1;
    stopSpeaking();
    clearAutoStop();
    if (recorderRef.current) {
      recorderRef.current.cancel();
      recorderRef.current = null;
    }
    setSpeakingIdx(null);
    setRecState("idle");
    setConversation(null);
    setPhase("pick");
  }, [clearAutoStop]);

  /** رد شدن از خط فعلی — صدا/ضبط متوقف و نوبت بعد */
  const skipLine = useCallback(() => {
    chainRef.current += 1;
    stopSpeaking();
    clearAutoStop();
    if (recorderRef.current) {
      recorderRef.current.cancel();
      recorderRef.current = null;
    }
    setSpeakingIdx(null);
    advanceTurn();
  }, [advanceTurn, clearAutoStop]);

  /** دوباره پخش یک حباب — اگر خطِ نوبتِ مقابل باشد، مکالمه بعدش ادامه می‌یابد */
  const replayLine = useCallback(
    (i: number) => {
      const line = lines[i];
      if (!line) return;
      chainRef.current += 1;
      const token = chainRef.current;
      setSpeakingIdx(i);
      speak(line.en, {
        speed,
        onEnd: onceEnd(() => {
          if (token !== chainRef.current || !aliveRef.current) return;
          setSpeakingIdx(null);
          if (i === turnRef.current && !isUserLineIdx(i)) advanceRef.current();
        }),
      });
    },
    [isUserLineIdx, lines, speed],
  );

  const handleMic = useCallback(async () => {
    if (recState === "processing") return;
    if (recState === "recording") {
      await stopAndScore();
      return;
    }
    if (!isRecordingSupported()) {
      toast.info("مرورگرت از ضبط صدا پشتیبانی نمی‌کند — به‌جای گفتن، تایپ کن");
      setAnswerMode("type");
      return;
    }
    try {
      const rec = await startRecording(MAX_RECORD_MS);
      if (!aliveRef.current) {
        rec.cancel();
        return;
      }
      recorderRef.current = rec;
      setRecState("recording");
      clearAutoStop();
      autoStopRef.current = window.setTimeout(() => {
        void stopAndScoreRef.current();
      }, AUTO_STOP_MS);
    } catch {
      setAsrError("دسترسی به میکروفن داده نشد — از تنظیمات مرورگر اجازه بده یا تایپ کن");
    }
  }, [clearAutoStop, recState, stopAndScore]);

  const submitTyped = useCallback(() => {
    const line = lines[turnRef.current];
    const text = typedInput.trim();
    if (!line || !text) return;
    const lineIdx = turnRef.current;
    const score = similarityScore(line.en, text);
    setResults((prev) => {
      const copy = [...prev];
      copy[lineIdx] = { score, heard: text };
      return copy;
    });
    setAsrError(null);
    setTypedInput("");
  }, [lines, typedInput]);

  // ── فاز انتخاب مکالمه ──
  if (phase === "pick") {
    return (
      <div className="mx-auto max-w-2xl space-y-4 rise-in">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <MessagesSquare size={22} />
          </span>
          <div>
            <h2 className="text-lg font-black">مکالمه نقش‌محور</h2>
            <p className="text-[11.5px] text-muted-foreground">
              یک مکالمه را بردار، نقش بگیر و جمله‌به‌جمله ادامه بده
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/8 p-3 text-[11px] leading-5 text-muted-foreground">
          <Sparkles size={15} className="mt-0.5 shrink-0 text-amber-500" />
          <p>
            خطوط نقش مقابل خودکار پخش می‌شود؛ وقتی «حالا نوبت توئه» دیدی جمله را با میکروفن بگو تا
            نمرهٔ تلفظ بگیری — یا به‌جای گفتن، تایپ کن.
          </p>
        </div>

        {conversations.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-[13px] text-muted-foreground">
              در این جزوه مکالمه‌ای ثبت نشده است.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {conversations.map((cv) => (
              <button
                key={cv.id}
                type="button"
                onClick={() => openConversation(cv)}
                className="rounded-2xl border bg-card/60 p-4 text-right shadow-sm transition-all hover:border-primary/50 hover:bg-muted/40 active:scale-[0.99]"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[14px] font-black leading-6">{cv.titleFa}</h3>
                  <Badge variant="secondary" className="shrink-0 text-[10px]">
                    درس {faNum(cv.lesson)}
                  </Badge>
                </div>
                <p dir="ltr" className="font-en mt-0.5 text-left text-[11px] text-muted-foreground">
                  {cv.title}
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <MessagesSquare size={12} />
                  {faNum(cv.lines.length)} خط مکالمه
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── فاز انتخاب نقش ──
  if (phase === "role") {
    const c = conversation;
    if (!c) return null;
    const countA = c.lines.filter((_, i) => i % 2 === 0).length;
    const countB = c.lines.length - countA;
    const namesOf = (parity: number): string => {
      const names: string[] = [];
      c.lines.forEach((l, i) => {
        if (i % 2 === parity && !names.includes(l.speaker)) names.push(l.speaker);
      });
      return names.join(" · ");
    };
    return (
      <Card className="mx-auto max-w-xl rise-in">
        <CardContent className="space-y-4 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <h2 className="flex items-center gap-2 text-base font-black">
                <MessagesSquare size={17} className="shrink-0 text-primary" />
                {c.titleFa}
              </h2>
              <p dir="ltr" className="font-en mt-0.5 text-left text-[11px] text-muted-foreground">
                {c.title}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <Badge variant="secondary" className="text-[10px]">
                درس {faNum(c.lesson)}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="min-h-11 gap-1.5 text-[11px] text-muted-foreground"
                onClick={backToPick}
              >
                <ArrowRight size={14} />
                تغییر مکالمه
              </Button>
            </div>
          </div>

          {c.intro && (
            <div className="rounded-xl bg-muted/50 p-3">
              <p dir="ltr" className="font-en text-left text-[12px] leading-6">
                {c.intro.en}
              </p>
              <p className="mt-1 text-[12px] leading-6 text-muted-foreground">{c.intro.fa}</p>
            </div>
          )}

          <p className="text-[13px] font-bold">کدام نقش را می‌گیری؟</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {/* نقش A — گویندهٔ خطوط زوج */}
            <div className="space-y-2.5 rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 p-4">
              <Badge className="border border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
                نقش A — خطوط زوج
              </Badge>
              <p
                dir="ltr"
                className="font-en text-left text-[15px] font-black text-emerald-700 dark:text-emerald-400"
              >
                {namesOf(0)}
              </p>
              <p className="text-[11px] leading-5 text-muted-foreground">
                {faNum(countA)} خط — مکالمه را تو شروع می‌کنی
              </p>
              <Button
                className="min-h-11 w-full gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                onClick={() => startWith("A")}
              >
                <Play size={15} />
                شروع مکالمه
              </Button>
            </div>
            {/* نقش B — گویندهٔ خطوط فرد */}
            <div className="space-y-2.5 rounded-2xl border-2 border-amber-500/30 bg-amber-500/5 p-4">
              <Badge className="border border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-400">
                نقش B — خطوط فرد
              </Badge>
              <p
                dir="ltr"
                className="font-en text-left text-[15px] font-black text-amber-700 dark:text-amber-400"
              >
                {namesOf(1)}
              </p>
              <p className="text-[11px] leading-5 text-muted-foreground">
                {faNum(countB)} خط — بعد از نقش A حرف می‌زنی
              </p>
              <Button
                className="min-h-11 w-full gap-2 bg-amber-600 text-white hover:bg-amber-700"
                onClick={() => startWith("B")}
              >
                <Play size={15} />
                شروع مکالمه
              </Button>
            </div>
          </div>

          <Button variant="outline" className="min-h-11 w-full gap-2" onClick={() => startWith("listen")}>
            <Headphones size={15} />
            فقط گوش بده
          </Button>
          <p className="text-center text-[10.5px] leading-5 text-muted-foreground">
            در حالت گوش دادن کل مکالمه با صدا پخش می‌شود تا نقش‌ها را بفهمی.
          </p>
        </CardContent>
      </Card>
    );
  }

  // ── فاز مراسم پایان ──
  if (phase === "done") {
    const c = conversation;
    const isListen = role === "listen";
    const userParity = role === "B" ? 1 : 0;
    const userLineCount =
      c && !isListen ? c.lines.filter((_, i) => i % 2 === userParity).length : 0;
    const scored = results.filter((r): r is LineResult => r !== null);
    const avg =
      scored.length > 0 ? Math.round(scored.reduce((s, r) => s + r.score, 0) / scored.length) : null;
    const greatCount = scored.filter((r) => r.score >= 85).length;
    const goodCount = scored.filter((r) => r.score >= 60 && r.score < 85).length;
    const skipped = Math.max(0, userLineCount - scored.length);
    return (
      <Card className="mx-auto max-w-xl rise-in border-amber-500/30">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <PartyPopper size={30} />
          </span>
          <div>
            <h2 className="text-xl font-black">{isListen ? "گوش دادی، آفرین!" : "مکالمه تمام شد!"}</h2>
            {c && <p className="mt-1 text-[12px] text-muted-foreground">{c.titleFa}</p>}
          </div>

          {!isListen && scored.length > 0 && (
            <div className="grid w-full grid-cols-3 gap-2">
              <div className="rounded-xl bg-muted/60 p-3">
                <Target size={16} className="mx-auto text-emerald-500" />
                <p className="mt-1.5 text-lg font-black leading-none">
                  {avg === null ? "—" : `${faNum(avg)}٪`}
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground">دقت میانگین</p>
              </div>
              <div className="rounded-xl bg-muted/60 p-3">
                <Sparkles size={16} className="mx-auto text-amber-500" />
                <p className="mt-1.5 text-lg font-black leading-none">{faNum(greatCount)}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">عالی</p>
              </div>
              <div className="rounded-xl bg-muted/60 p-3">
                <ThumbsUp size={16} className="mx-auto text-teal-500" />
                <p className="mt-1.5 text-lg font-black leading-none">{faNum(goodCount)}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">خوب</p>
              </div>
            </div>
          )}

          {isListen ? (
            <p className="text-[12.5px] leading-6 text-muted-foreground">
              کل مکالمه را با دقت گوش دادی 🎧 حالا یکی از نقش‌ها را بگیر و خودت ادامه بده!
            </p>
          ) : (
            <p className="text-[11.5px] leading-6 text-muted-foreground">
              {skipped > 0
                ? `${faNum(skipped)} خط را رد کردی — دفعهٔ بعد بگو تا نمره بگیری!`
                : "همهٔ خطوط نقشت را گفتی — با تکرار، دقت را تا عالی بالا ببر! 💪"}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-2">
            {isListen && (
              <Button className="min-h-11 gap-1.5" onClick={() => setPhase("role")}>
                <Users size={15} />
                حالا نقش بگیر
              </Button>
            )}
            <Button variant={isListen ? "outline" : "default"} className="min-h-11 gap-1.5" onClick={backToPick}>
              <MessagesSquare size={15} />
              مکالمه دیگر
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ── فاز بازی مکالمه ──
  const c = conversation;
  if (!c) return null;
  const ls = c.lines;
  const cur = ls[turn];
  if (!cur) return null;
  const isListen = role === "listen";
  const isUserTurn = !isListen && turn % 2 === (role === "B" ? 1 : 0);
  const currentResult = results[turn] ?? null;
  const isLast = turn === ls.length - 1;
  const pct = Math.round(((turn + 1) / ls.length) * 100);

  return (
    <div className="mx-auto max-w-xl space-y-4 rise-in">
      {/* نوار بالای صحنه */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="gap-1 text-[11px]">
          <MessagesSquare size={11} />
          خط {faNum(turn + 1)} از {faNum(ls.length)}
        </Badge>
        {isListen ? (
          <Badge
            variant="outline"
            className="gap-1 border-teal-500/40 text-[11px] text-teal-700 dark:text-teal-400"
          >
            <Headphones size={11} />
            فقط گوش بده
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="gap-1 border-amber-500/40 text-[11px] text-amber-700 dark:text-amber-400"
          >
            <Users size={11} />
            نقش تو: {role === "A" ? "خطوط زوج" : "خطوط فرد"}
          </Badge>
        )}
        <div className="mr-auto">
          <Button
            variant="ghost"
            size="sm"
            className="min-h-11 gap-1.5 text-[11px] text-muted-foreground"
            onClick={exitSession}
          >
            <LogOut size={14} />
            اتمام و خروج
          </Button>
        </div>
      </div>
      <Progress
        value={pct}
        aria-label={`پیشرفت مکالمه — خط ${faNum(turn + 1)} از ${faNum(ls.length)}`}
        className="h-1.5"
      />

      {c.intro && (
        <div className="rounded-xl border bg-muted/40 p-3">
          <p dir="ltr" className="font-en text-left text-[11.5px] leading-5 text-muted-foreground">
            {c.intro.en}
          </p>
          <p className="mt-1 text-[11.5px] leading-5 text-muted-foreground/80">{c.intro.fa}</p>
        </div>
      )}

      {/* حباب‌های چت — تا خط فعلی */}
      <div className="space-y-3" aria-label="مکالمه">
        {ls.slice(0, turn + 1).map((line, i) => {
          const even = i % 2 === 0;
          const res = results[i] ?? null;
          return (
            <div key={`${c.id}-${i}`} className={cn("flex gap-2.5", even ? "" : "flex-row-reverse")}>
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-black",
                  even
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                    : "bg-amber-500/15 text-amber-700 dark:text-amber-400",
                )}
              >
                {initialsOf(line.speaker)}
              </span>
              <div
                className={cn(
                  "min-w-0 max-w-[85%] rounded-2xl border p-3",
                  even
                    ? "rounded-tr-sm border-emerald-500/25 bg-emerald-500/8"
                    : "rounded-tl-sm border-amber-500/25 bg-amber-500/8",
                )}
              >
                <div className="flex items-center gap-2">
                  <p dir="ltr" className="font-en text-[11px] font-black text-muted-foreground">
                    {line.speaker}
                  </p>
                  <button
                    type="button"
                    onClick={() => replayLine(i)}
                    aria-label="دوباره پخش"
                    title="دوباره پخش"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:scale-105 hover:bg-primary/20"
                  >
                    <Volume2 size={13} />
                  </button>
                  {speakingIdx === i && (
                    <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-0.5" aria-hidden="true">
                        <span
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-current"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-current"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-current"
                          style={{ animationDelay: "300ms" }}
                        />
                      </span>
                      حرف می‌زند…
                    </span>
                  )}
                </div>
                <ClickableEnText
                  text={line.en}
                  className="font-en mt-1 block text-[13.5px] font-semibold leading-6"
                />
                <p className="mt-1 text-[12px] leading-6 text-muted-foreground">{line.fa}</p>
                {res && (
                  <div className="mt-2 space-y-1.5 border-t pt-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn("text-[10.5px]", toneCls(scoreLabel(res.score).tone))}
                      >
                        {faNum(res.score)} از {faNum(100)}
                      </Badge>
                      <span className="text-[11px] font-bold">{scoreLabel(res.score).label}</span>
                    </div>
                    <p dir="ltr" className="font-en text-left text-[11px] leading-5 text-muted-foreground">
                      شنیدم: {res.heard}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* پنل نوبت کاربر */}
      {isUserTurn && !currentResult && (
        <Card className="border-primary/30">
          <CardContent className="space-y-3 p-4">
            <div className="flex items-center gap-2">
              <Badge className="gap-1 bg-primary text-primary-foreground">
                <Mic size={11} />
                حالا نوبت توئه
              </Badge>
              <SpeakButton text={cur.en} label="شنیدن جملهٔ نقش خودت" />
            </div>
            <p dir="ltr" className="font-en text-left text-[15px] font-black leading-7">
              {cur.en}
            </p>
            <p className="text-[12px] leading-6 text-muted-foreground">{cur.fa}</p>

            {asrError && (
              <div className="space-y-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3">
                <p className="text-[12px] font-bold leading-5 text-amber-700 dark:text-amber-400">
                  {asrError}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="min-h-11 gap-1.5" onClick={() => void handleMic()}>
                    <Mic size={14} />
                    تلاش دوباره
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="min-h-11 gap-1.5"
                    onClick={() => setAnswerMode("type")}
                  >
                    <Keyboard size={14} />
                    تایپ می‌کنم
                  </Button>
                </div>
              </div>
            )}

            {answerMode === "speak" && !asrError && (
              <>
                {recState === "idle" && (
                  <Button
                    className="min-h-14 w-full gap-2 bg-emerald-600 text-base text-white hover:bg-emerald-700"
                    onClick={() => void handleMic()}
                  >
                    <Mic size={20} />
                    بگو ببینم
                  </Button>
                )}
                {recState === "recording" && (
                  <Button
                    variant="secondary"
                    className="min-h-14 w-full animate-pulse gap-2 text-base"
                    onClick={() => void stopAndScore()}
                  >
                    <Square size={18} />
                    در حال شنیدن… تمامش کن
                  </Button>
                )}
                {recState === "processing" && (
                  <Button variant="secondary" className="min-h-14 w-full gap-2 text-base" disabled>
                    <Loader2 size={18} className="animate-spin" />
                    دارم می‌شنوم…
                  </Button>
                )}
              </>
            )}

            {answerMode === "type" && (
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  submitTyped();
                }}
              >
                <Input
                  dir="ltr"
                  value={typedInput}
                  onChange={(e) => setTypedInput(e.target.value)}
                  placeholder="جمله را انگلیسی تایپ کن…"
                  aria-label="پاسخ انگلیسی"
                  className="min-h-11 flex-1 bg-card text-left font-en"
                />
                <Button type="submit" className="min-h-11 gap-1.5" disabled={!typedInput.trim()}>
                  <Check size={15} />
                  ثبت
                </Button>
              </form>
            )}

            <button
              type="button"
              onClick={() => setAnswerMode(answerMode === "speak" ? "type" : "speak")}
              className="text-[11px] text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
            >
              {answerMode === "speak" ? "به‌جای گفتن، تایپ کن" : "به‌جای تایپ، با میکروفن بگو"}
            </button>
          </CardContent>
        </Card>
      )}

      {/* ناوبری مکالمه */}
      <div className="flex flex-wrap items-center gap-2">
        {!currentResult && (
          <Button variant="outline" className="min-h-11 gap-1.5" onClick={skipLine}>
            <SkipForward size={15} />
            رد شدن
          </Button>
        )}
        {currentResult && (
          <Button className="min-h-11 gap-1.5" onClick={() => advanceTurn()}>
            {isLast ? "پایان مکالمه" : "بعدی"}
            <ArrowLeft size={15} />
          </Button>
        )}
      </div>
    </div>
  );
}
