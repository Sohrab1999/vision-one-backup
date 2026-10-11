"use client";

/**
 * دوئل آنلاین Realtime — فاز G4-02 نقشه راه بازی‌ها (بُعد اجتماعی و رقابت).
 *
 * معماری:
 * - مینی‌سرویس socket.io روی پورت ۳۰۰۳ (mini-services/duel-service) با اتاق کد ۴رقمی؛
 *   اتصال کلاینت فقط با مسیر نسبی و XTransformPort (Caddy فوروارد می‌کند) — هرگز URL مطلق.
 * - بستهٔ سؤال میزبان از همان بانک تست «تست برقی» ساخته می‌شود (data.quiz.seed کتاب فعال،
 *   ۱۰ سؤال با pickUnique) و به سرور می‌رود؛ کلید پاسخ هرگز به کلاینت لو نمی‌رود —
 *   درستی/نادرستی فقط از رویداد score/reveal سرور می‌آید.
 * - تایمر هر سؤال با endsAt سرور همگام است (اختلاف ساعت با serverNow جبران می‌شود)؛
 *   ۱۵ ثانیه + پاداش سرعت تا +۵ روی ۱۰ امتیاز پایه.
 * - قطعی: socket.io خودش وصل می‌شود و کلاینت با rejoin { code, playerId } به همان
 *   جایگاه برمی‌گردد (۶۰ ثانیه مهلت سمت سرور)؛ پیام‌های فارسی برای قطعی حریف/خودم.
 * - پایان: سکوی نتیجهٔ دو نفره + مرور سؤال‌ها (تاشو) + دوباره (میزبان) / خروج؛
 *   Attempt با category "duel" (total=تعداد سؤال، correct=پاسخ‌های درست من،
 *   detail شامل امتیاز حریف) با امضای موجود saveAttempt — فقط افزودنی.
 *
 * دسترس‌پذیری: aria-live برای تغییر امتیاز/پیام‌ها، aria-label گزینه‌ها، اهداف لمسی ≥۴۴px،
 * ناوبری کیبوردی کامل. صدا/لرزش از کیت مشترک بازی‌ها (sound-engine / haptics).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import {
  Swords,
  Copy,
  Check,
  LogOut,
  RotateCcw,
  WifiOff,
  Crown,
  ChevronDown,
  Loader2,
  Timer,
  Trophy,
  UserRound,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { QuizQuestionSeed } from "@/data/types";
import { useBook, useBookData } from "@/lib/book-context";
import { faNum, getPlays, pickUnique, saveAttempt } from "../shared";
// فاز G5-03 — getter شمارندهٔ برد کامل (`visionone:game-wins`) برای نرخ برد ربات تطبیقی
import { readGameWins } from "@/lib/badge-store";
import { playSound } from "../kit/sound-engine";
import { buzz } from "../kit/haptics";

// ─── ثابت‌ها و تایپ‌ها ───

const NAME_KEY = "visionone:duel:name";
const PACK_SIZE = 10;
const QUESTION_MS = 15000;

interface DuelQuestion {
  id: string;
  text: string;
  options: string[];
  answer: number;
}

interface PlayerPublic {
  id: string;
  name: string;
  score: number;
  correct: number;
  lastDelta: number;
  lastCorrect: boolean;
  connected: boolean;
}

type ScoresMap = Record<string, { name: string; score: number; lastDelta: number; lastCorrect: boolean }>;

interface QuestionEvent {
  index: number;
  total: number;
  text: string;
  options: string[];
  endsAt: number;
  serverNow: number;
}

interface RevealEvent {
  index: number;
  answer: number;
  scores: ScoresMap;
}

interface FinishedEvent {
  finalScores: { id: string; name: string; score: number; correct: number }[];
  packSummary: DuelQuestion[];
  duration: number;
}

export interface DuelArenaProps {
  /** قفل شدن دیالوگ حین اتاق/بازی (برای نگهبان خروج در games-hub) */
  onLockChange?: (locked: boolean) => void;
  /** خروج نرم — دیالوگ از بیرون بسته شود */
  onExit?: () => void;
}

type Phase = "setup" | "lobby" | "playing" | "finished";

/** تبدیل ارقام فارسی/عربی به لاتین برای کد اتاق */
function toEnDigits(s: string): string {
  return s
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

/**
 * فاز G5-03 — نرخ برد دوئل آنلاین این مرورگر برای ربات تطبیقی (قاعده‌محور، بدون AI).
 * منبع (بدون کلید/امضای جدید): wins از `visionone:game-wins` کلید "duel-online"
 * (getter readGameWins — «برد» یعنی دوئل بی‌نقص، پروکسی محافظه‌کارانهٔ برد واقعی) و
 * دورهای تمام‌شده از شمارندهٔ مشترک plays (`visionone:game-plays:{book}`).
 * دورهای <۳ → null (نفرستادن تا سرویس پیش‌فرض ۰٫۵ بگذارد).
 */
function duelWinRate(bookId: string): number | null {
  try {
    const wins = readGameWins()["duel-online"] ?? 0;
    const plays = getPlays(bookId)["duel-online"] ?? 0;
    if (plays < 3) return null;
    return Math.min(1, Math.max(0, wins / plays));
  } catch {
    return null;
  }
}

export function DuelArena({ onLockChange, onExit }: DuelArenaProps) {
  const data = useBookData();
  const { bookId } = useBook();
  const id = bookId ?? "vision-one";

  // ── stateهای نما ──
  const [phase, setPhase] = useState<Phase>("setup");
  // نام ماندگار — خواندن در initializer (کامپوننت فقط سمت کلاینت با ssr:false مونت می‌شود)
  const [name, setName] = useState<string>(() => {
    try {
      return localStorage.getItem(NAME_KEY) ?? "";
    } catch {
      return "";
    }
  });
  const [joinCode, setJoinCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [roomCode, setRoomCode] = useState("");
  const [meId, setMeId] = useState("");
  const [players, setPlayers] = useState<PlayerPublic[]>([]);
  const [hostId, setHostId] = useState("");
  const [question, setQuestion] = useState<QuestionEvent | null>(null);
  const [reveal, setReveal] = useState<RevealEvent | null>(null);
  const [scores, setScores] = useState<ScoresMap | null>(null);
  const [myChoice, setMyChoice] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [finished, setFinished] = useState<FinishedEvent | null>(null);
  const [myAnswers, setMyAnswers] = useState<Record<number, number | null>>({});
  const [reviewOpen, setReviewOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [liveMsg, setLiveMsg] = useState("");

  // ── refs (الگوی latest-ref — هندلرهای سوکت بدون کلوزر کهنه) ──
  const socketRef = useRef<Socket | null>(null);
  const joinedRef = useRef<{ code: string; playerId: string } | null>(null);
  const meIdRef = useRef("");
  const phaseRef = useRef<Phase>("setup");
  const myAnswersRef = useRef<Record<number, number | null>>({});
  const deadlineRef = useRef(0);
  const lastTickRef = useRef(-1);
  const startedAtRef = useRef(0);
  const attemptSavedRef = useRef(false);
  /** فاز G5-03 — دور جاری مقابل ربات داخلی است؟ (برای پرچم vsBot در Attempt) */
  const vsBotRef = useRef(false);
  const idRef = useRef(id);
  useEffect(() => {
    idRef.current = id;
  }, [id]);

  // ── بستهٔ سؤال میزبان — همان منبع «تست برقی»: بانک تست کتاب فعال ──
  const buildPack = useCallback((): DuelQuestion[] => {
    const pool = data.quiz.seed as QuizQuestionSeed[];
    const picked = pickUnique(pool, PACK_SIZE, (q) => q.text);
    return picked.map((q, i) => ({ id: `q${i + 1}`, text: q.text, options: q.options, answer: q.answer }));
  }, [data.quiz.seed]);

  // ── قفل نگهبان خروج (lobby/playing) ──
  useEffect(() => {
    phaseRef.current = phase;
    onLockChange?.(phase === "lobby" || phase === "playing");
  }, [phase, onLockChange]);

  // ── اتصال سوکت — فقط مسیر نسبی با XTransformPort (الگوی examples/websocket) ──
  useEffect(() => {
    const socket = io("/?XTransformPort=3003", {
      path: "/",
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelayMax: 10000,
      timeout: 20000,
    });
    socketRef.current = socket;

    const resetRound = () => {
      startedAtRef.current = 0;
      attemptSavedRef.current = false;
      myAnswersRef.current = {};
      setMyAnswers({});
      setNotice(null);
      setFinished(null);
      setQuestion(null);
      setReveal(null);
      setScores(null);
      setMyChoice(null);
      setReviewOpen(false);
    };

    const onConnect = () => {
      setConnected(true);
      // اولین وصل شدن یا اتصال دوباره بعد از قطعی → اگر عضو اتاقی هستیم rejoin
      const j = joinedRef.current;
      if (j) socket.emit("rejoin", { code: j.code, playerId: j.playerId });
    };
    const onDisconnect = () => setConnected(false);

    const onCreated = (d: { code: string; playerId: string; total: number }) => {
      setRoomCode(d.code);
      setMeId(d.playerId);
      meIdRef.current = d.playerId;
      joinedRef.current = { code: d.code, playerId: d.playerId };
      resetRound();
      setPhase("lobby");
      setBusy(false);
      setError(null);
      setLiveMsg(`اتاق ${faNum(Number(d.code))} ساخته شد — منتظر حریف`);
    };

    const onJoined = (d: {
      code: string;
      players: PlayerPublic[];
      hostId: string;
      state: "lobby" | "playing" | "ended";
      you: string;
    }) => {
      setPlayers(d.players);
      setHostId(d.hostId);
      setMeId(d.you);
      meIdRef.current = d.you;
      setRoomCode(d.code);
      joinedRef.current = { code: d.code, playerId: d.you };
      setBusy(false);
      setError(null);
      if (d.state === "playing") {
        setPhase("playing"); // سؤال همگام بلافاصله بعدش می‌آید
      } else if (d.state === "ended") {
        setPhase("finished");
      } else {
        resetRound();
        setPhase("lobby");
      }
    };

    const onQuestion = (q: QuestionEvent) => {
      // همگام‌سازی تایمر با ساعت سرور (جبران اختلاف)
      deadlineRef.current = Date.now() + Math.max(0, q.endsAt - q.serverNow);
      lastTickRef.current = -1;
      setQuestion(q);
      setReveal(null);
      setMyChoice(null);
      setRemaining(Math.max(0, q.endsAt - q.serverNow));
      setPhase("playing");
      if (q.index === 0) {
        startedAtRef.current = Date.now();
        attemptSavedRef.current = false;
        myAnswersRef.current = {};
        setMyAnswers({});
        setNotice(null);
      }
      setLiveMsg(`سؤال ${faNum(q.index + 1)} از ${faNum(q.total)}`);
      playSound("click");
    };

    const onScore = (s: { questionIndex: number; scores: ScoresMap }) => {
      setScores(s.scores);
    };

    const onReveal = (r: RevealEvent) => {
      setReveal(r);
      setScores(r.scores);
      const mine = myAnswersRef.current[r.index];
      if (mine === undefined || mine === null) {
        setLiveMsg("وقت این سؤال تمام شد");
        playSound("wrong");
        buzz("error");
      } else if (mine === r.answer) {
        setLiveMsg("درست بود! 🎉");
        playSound("correct");
        buzz("success");
      } else {
        setLiveMsg("اشتباه بود — پاسخ درست مشخص شد");
        playSound("wrong");
        buzz("error");
      }
    };

    const onFinished = (f: FinishedEvent) => {
      setFinished(f);
      setQuestion(null);
      setReveal(null);
      setPhase("finished");
      const me = f.finalScores.find((x) => x.id === meIdRef.current);
      const opp = f.finalScores.find((x) => x.id !== meIdRef.current);
      const result =
        me && opp ? (me.score > opp.score ? "win" : me.score < opp.score ? "loss" : "draw") : "solo";
      if (result === "win") {
        playSound("win");
        buzz("record");
      } else {
        playSound("finish");
        buzz("light");
      }
      setLiveMsg(
        result === "win"
          ? "دوئل تمام شد — تو بردی! 🏆"
          : result === "loss"
            ? "دوئل تمام شد — حریف برد"
            : result === "draw"
              ? "دوئل مساوی شد"
              : "دوئل تمام شد",
      );
      // ثبت Attempt — فقط یک‌بار در هر دور (امضای موجود saveAttempt — افزودنی)
      // category «duel-online» تا با دوئل دونفرهٔ آفلاین (duel) تداخل نکند
      if (!attemptSavedRef.current) {
        attemptSavedRef.current = true;
        saveAttempt(idRef.current, "duel-online", {
          lesson: 0,
          total: f.packSummary.length,
          correct: me?.correct ?? 0,
          duration: f.duration || Math.max(1, Math.round((Date.now() - startedAtRef.current) / 1000)),
          detail: {
            myScore: me?.score ?? 0,
            opponentName: opp?.name ?? "",
            opponentScore: opp?.score ?? 0,
            result,
            mode: "online-1v1",
            // فاز G5-03 — پرچم افزودنی: دور تمرینی مقابل ربات داخلی
            vsBot: vsBotRef.current,
          },
        });
      }
    };

    const onOpponentLeft = (d: { name: string; message: string }) => {
      setNotice(d.message);
      setLiveMsg(d.message);
      buzz("light");
    };

    const onOpponentBack = (d: { name: string; message: string }) => {
      setNotice(null);
      setLiveMsg(d.message);
    };

    const onRematch = () => {
      resetRound();
      setPhase("playing"); // سؤال اول بلافاصله بعدش می‌آید
    };

    const onRoomClosed = (d: { message: string }) => {
      joinedRef.current = null;
      resetRound();
      setPlayers([]);
      setRoomCode("");
      setMeId("");
      setPhase("setup");
      setError(d.message);
      toast.error(d.message);
    };

    const onError = (d: { message: string; fatal?: boolean }) => {
      const msg = d?.message ?? "خطای نامشخص";
      setBusy(false);
      if (d?.fatal === false) {
        // اطلاع‌رسانی درون اتاق (مثل رسیدن میزبانی)
        setNotice(msg);
        setLiveMsg(msg);
        return;
      }
      if (phaseRef.current === "setup") {
        setError(msg);
      } else {
        // اتاق از دست رفته (مثلاً قطعی طولانی) — بازگشت به setup با پیام فارسی
        joinedRef.current = null;
        resetRound();
        setPlayers([]);
        setRoomCode("");
        setMeId("");
        setPhase("setup");
        setError(msg);
        toast.error(msg);
      }
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("created", onCreated);
    socket.on("joined", onJoined);
    socket.on("question", onQuestion);
    socket.on("score", onScore);
    socket.on("reveal", onReveal);
    socket.on("finished", onFinished);
    socket.on("opponent-left", onOpponentLeft);
    socket.on("opponent-back", onOpponentBack);
    socket.on("rematch", onRematch);
    socket.on("room-closed", onRoomClosed);
    socket.on("error", onError);

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  // ── تیک تایمر سؤال (همگام با endsAt سرور) ──
  useEffect(() => {
    if (phase !== "playing" || !question || reveal) return;
    const tick = () => {
      const rem = Math.max(0, deadlineRef.current - Date.now());
      setRemaining(rem);
      const sec = Math.ceil(rem / 1000);
      if (sec > 0 && sec <= 5 && sec !== lastTickRef.current) {
        lastTickRef.current = sec;
        playSound("tick");
      }
    };
    tick();
    const iv = setInterval(tick, 100);
    return () => clearInterval(iv);
  }, [phase, question, reveal]);

  // ── مشتق‌ها ──
  const isHost = meId === hostId;
  const opponent = useMemo(() => players.find((p) => p.id !== meId) ?? null, [players, meId]);
  const myScore = scores?.[meId] ?? null;
  const oppScore = opponent && scores ? (scores[opponent.id] ?? null) : null;
  const remainingSec = Math.ceil(remaining / 1000);
  const timePct = question ? Math.max(0, Math.min(100, (remaining / QUESTION_MS) * 100)) : 0;
  const finalMe = finished?.finalScores.find((x) => x.id === meId) ?? null;
  const finalOpp = finished?.finalScores.find((x) => x.id !== meId) ?? null;
  const result: "win" | "loss" | "draw" | null =
    finalMe && finalOpp ? (finalMe.score > finalOpp.score ? "win" : finalMe.score < finalOpp.score ? "loss" : "draw") : null;

  // ── اقدام‌ها ──
  const persistName = (v: string) => {
    setName(v);
    try {
      localStorage.setItem(NAME_KEY, v);
    } catch {
      /* noop */
    }
  };

  const handleCreate = () => {
    if (!connected || busy) return;
    if (!name.trim()) {
      setError("اسمت را بنویس");
      return;
    }
    setError(null);
    setBusy(true);
    playSound("click");
    buzz("light");
    startedAtRef.current = 0;
    attemptSavedRef.current = false;
    vsBotRef.current = false;
    myAnswersRef.current = {};
    setMyAnswers({});
    socketRef.current?.emit("create", { name: name.trim(), pack: buildPack() });
  };

  /**
   * فاز G5-03 — تمرین با ربات تطبیقی: همان جریان create/start کلاینت، فقط رخداد
   * play_bot با winRate تخمینی این مرورگر (دادهٔ <۳ دور نفرستاده می‌شود → سرویس ۰٫۵).
   */
  const handlePlayBot = () => {
    if (!connected || busy) return;
    if (!name.trim()) {
      setError("اسمت را بنویس");
      return;
    }
    setError(null);
    setBusy(true);
    playSound("click");
    buzz("light");
    startedAtRef.current = 0;
    attemptSavedRef.current = false;
    vsBotRef.current = true;
    myAnswersRef.current = {};
    setMyAnswers({});
    const winRate = duelWinRate(idRef.current);
    socketRef.current?.emit("play_bot", {
      name: name.trim(),
      pack: buildPack(),
      ...(winRate !== null ? { winRate } : {}),
    });
  };

  const handleJoin = () => {
    if (!connected || busy) return;
    if (!name.trim()) {
      setError("اسمت را بنویس");
      return;
    }
    const code = toEnDigits(joinCode).replace(/\D/g, "").slice(0, 4);
    if (code.length !== 4) {
      setError("کد اتاق ۴ رقم است");
      return;
    }
    setError(null);
    setBusy(true);
    playSound("click");
    buzz("light");
    startedAtRef.current = 0;
    attemptSavedRef.current = false;
    vsBotRef.current = false;
    myAnswersRef.current = {};
    setMyAnswers({});
    socketRef.current?.emit("join", { code, name: name.trim() });
  };

  const handleStart = () => {
    playSound("click");
    buzz("light");
    socketRef.current?.emit("start");
  };

  const handleAnswer = (idx: number) => {
    if (!question || reveal || myChoice !== null) return;
    setMyChoice(idx);
    const next = { ...myAnswersRef.current, [question.index]: idx };
    myAnswersRef.current = next;
    setMyAnswers(next);
    playSound("click");
    buzz("light");
    socketRef.current?.emit("answer", { index: question.index, choice: idx });
  };

  const handleRematch = () => {
    playSound("click");
    buzz("light");
    startedAtRef.current = 0;
    attemptSavedRef.current = false;
    myAnswersRef.current = {};
    setMyAnswers({});
    setFinished(null);
    setNotice(null);
    setReviewOpen(false);
    setPhase("playing");
    socketRef.current?.emit("rematch");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      playSound("click");
      toast.success("کد اتاق کپی شد");
    } catch {
      toast.error("کپی نشد — کد را دستی یادداشت کن");
    }
  };

  const handleExit = () => {
    playSound("click");
    onExit?.();
  };

  // ── نوار وضعیت اتصال ──
  const StatusDot = (
    <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground" aria-hidden>
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          connected ? "bg-emerald-500 shadow-[0_0_6px] shadow-emerald-500/60" : "bg-rose-500 animate-pulse",
        )}
      />
      {connected ? "متصل" : "در حال اتصال…"}
    </span>
  );

  const DisconnectBanner = !connected ? (
    <div
      className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-[12px] font-medium text-rose-700 dark:text-rose-300"
      role="alert"
    >
      <WifiOff size={15} className="shrink-0" />
      ارتباط قطع شد — تلاش برای اتصال دوباره…
    </div>
  ) : null;

  const NoticeBanner = notice ? (
    <div className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-[12px] font-medium text-amber-700 dark:text-amber-300" role="status">
      <UserRound size={15} className="shrink-0" />
      {notice}
    </div>
  ) : null;

  // ── نمایشگر امتیاز زندهٔ دو نفره ──
  const myDelta = myScore && myScore.lastDelta > 0 ? myScore.lastDelta : null;
  const oppDelta = oppScore && oppScore.lastDelta > 0 ? oppScore.lastDelta : null;
  const ScoreBoard = (
    <div className="grid grid-cols-2 gap-2" role="group" aria-label="امتیاز زندهٔ دو بازیکن">
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-center">
        <p className="truncate text-[11px] font-medium text-muted-foreground">تو</p>
        <p className="text-xl font-black tabular-nums text-emerald-700 dark:text-emerald-300">
          {faNum(myScore?.score ?? 0)}
        </p>
        <p className="h-4 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
          {myDelta !== null ? `+${faNum(myDelta)}` : ""}
        </p>
      </div>
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 text-center">
        <p className="truncate text-[11px] font-medium text-muted-foreground">
          {opponent ? opponent.name : "منتظر حریف…"}
        </p>
        <p className="text-xl font-black tabular-nums text-amber-700 dark:text-amber-300">
          {opponent ? faNum(oppScore?.score ?? 0) : "—"}
        </p>
        <p className="h-4 text-[10px] font-bold text-amber-600 dark:text-amber-400">
          {oppDelta !== null ? `+${faNum(oppDelta)}` : ""}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex max-h-[75vh] flex-col gap-3 overflow-y-auto pl-0.5" aria-label="دوئل آنلاین">
      <p role="status" aria-live="polite" className="sr-only">
        {liveMsg}
      </p>

      {/* ═══ Setup ═══ */}
      {phase === "setup" && (
        <div className="space-y-4">
          <header className="flex items-center gap-3 rounded-2xl bg-gradient-to-bl from-emerald-500/15 via-amber-500/10 to-transparent p-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Swords size={22} />
            </span>
            <div className="min-w-0">
              <h2 className="text-base font-black">دوئل آنلاین</h2>
              <p className="text-[11px] text-muted-foreground">رقابت زندهٔ ۱ به ۱ با کد اتاق — ۱۰ سؤال از بانک تست همین جزوه</p>
            </div>
          </header>

          {StatusDot}

          <div className="space-y-1.5">
            <label htmlFor="duel-name" className="text-[12px] font-bold">
              اسم تو
            </label>
            <Input
              id="duel-name"
              value={name}
              onChange={(e) => persistName(e.target.value)}
              maxLength={24}
              placeholder="مثلاً سارا"
              className="h-11"
              autoComplete="off"
            />
          </div>

          {error && (
            <p className="text-[12px] font-medium text-rose-600 dark:text-rose-400" role="alert">
              {error}
            </p>
          )}

          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleCreate}
              disabled={!connected || busy || !name.trim()}
              className="h-11 w-full gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
            >
              {busy ? <Loader2 size={16} className="animate-spin" /> : <Swords size={16} />}
              ساخت اتاق
            </Button>
            {/* فاز G5-03 — تمرین با ربات تطبیقی (هم‌استایل؛ outline زمردی) */}
            <Button
              onClick={handlePlayBot}
              disabled={!connected || busy || !name.trim()}
              variant="outline"
              className="h-11 w-full gap-2 border-emerald-500/50 text-emerald-700 hover:bg-emerald-500/10 dark:text-emerald-400"
            >
              {busy ? <Loader2 size={16} className="animate-spin" /> : <Bot size={16} />}
              تمرین با ربات 🤖
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-[11px] text-muted-foreground">یا</span>
            <Separator className="flex-1" />
          </div>

          <div className="flex gap-2">
            <Input
              value={joinCode}
              onChange={(e) => setJoinCode(toEnDigits(e.target.value).replace(/\D/g, "").slice(0, 4))}
              placeholder="کد ۴ رقمی"
              inputMode="numeric"
              maxLength={4}
              dir="ltr"
              aria-label="کد اتاق حریف"
              className="h-11 flex-1 text-center text-lg font-black tracking-[0.4em]"
            />
            <Button
              onClick={handleJoin}
              disabled={!connected || busy || joinCode.length < 4 || !name.trim()}
              variant="outline"
              className="h-11 gap-2 border-amber-500/50 text-amber-700 hover:bg-amber-500/10 dark:text-amber-400"
            >
              {busy ? <Loader2 size={16} className="animate-spin" /> : null}
              پیوستن با کد
            </Button>
          </div>

          <p className="text-[11px] leading-5 text-muted-foreground">
            هر پاسخ درست ۱۰ امتیاز + پاداش سرعت تا ۵ امتیاز — تایمر هر سؤال ۱۵ ثانیه. دوئل در آمارت بازی‌ها ثبت می‌شود.
          </p>
        </div>
      )}

      {/* ═══ Lobby ═══ */}
      {phase === "lobby" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black">اتاق آماده است</h2>
            {StatusDot}
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
            <p className="text-[11px] text-muted-foreground">کد اتاق — به حریفت بگو تا با آن بپیوندد</p>
            <p dir="ltr" className="my-1 text-4xl font-black tracking-[0.35em] text-emerald-700 dark:text-emerald-300">
              {faNum(Number(roomCode))}
            </p>
            <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-1.5 text-[12px] text-emerald-700 dark:text-emerald-300" aria-label="کپی کد اتاق">
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "کپی شد" : "کپی کد"}
            </Button>
          </div>

          <div className="space-y-2" aria-label="بازیکنان اتاق">
            {players.map((p) => (
              <div key={p.id} className="flex items-center gap-2 rounded-xl border bg-card p-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[12px] font-black text-emerald-700 dark:text-emerald-300">
                  {p.name.slice(0, 2)}
                </span>
                <span className="min-w-0 flex-1 truncate text-[13px] font-bold">
                  {p.name}
                  {p.id === meId ? " (تو)" : ""}
                </span>
                {p.id === hostId && <Badge className="bg-amber-500/15 text-[10px] text-amber-700 dark:text-amber-400">میزبان</Badge>}
                {!p.connected && <Badge variant="outline" className="text-[10px] text-rose-600">قطع</Badge>}
              </div>
            ))}
          </div>

          {players.length < 2 ? (
            <p className="flex items-center justify-center gap-2 text-[12px] text-muted-foreground" role="status">
              <Loader2 size={14} className="animate-spin" />
              منتظر حریف… کد را برایش بفرست
            </p>
          ) : null}

          {isHost ? (
            <Button
              onClick={handleStart}
              disabled={players.length < 2 || !connected}
              className="h-11 w-full gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <Swords size={16} />
              شروع دوئل
            </Button>
          ) : (
            <p className="text-center text-[12px] text-muted-foreground">وقتی میزبان شروع کند، دوئل می‌آید…</p>
          )}

          <Button variant="ghost" onClick={handleExit} className="h-10 w-full gap-1.5 text-[12px] text-muted-foreground">
            <LogOut size={14} />
            خروج
          </Button>
        </div>
      )}

      {/* ═══ Playing ═══ */}
      {phase === "playing" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black">
              {question ? `سؤال ${faNum(question.index + 1)} از ${faNum(question.total)}` : "در حال آماده‌سازی سؤال…"}
            </h2>
            <Badge
              variant="outline"
              className={cn(
                "gap-1 text-[12px] font-black tabular-nums",
                remainingSec <= 5 && remainingSec > 0
                  ? "animate-pulse border-rose-500/40 text-rose-600 dark:text-rose-400"
                  : "border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
              )}
              aria-label={`${faNum(remainingSec)} ثانیه باقی مانده`}
            >
              <Timer size={13} />
              {faNum(remainingSec)}
            </Badge>
          </div>

          <Progress value={question && !reveal ? timePct : 0} className="h-1.5" aria-hidden />

          {DisconnectBanner}
          {NoticeBanner}
          {ScoreBoard}

          {question ? (
            <>
              <div className="rounded-2xl border bg-card p-4" role="group" aria-label="متن سؤال">
                <p dir="ltr" lang="en" className="text-center text-[15px] font-bold leading-relaxed">
                  {question.text}
                </p>
              </div>

              <div className="flex flex-col gap-2" role="group" aria-label="گزینه‌های سؤال">
                {question.options.map((opt, idx) => {
                  const isCorrect = reveal !== null && idx === reveal.answer;
                  const isMyWrong = reveal !== null && myChoice === idx && idx !== reveal.answer;
                  const isPicked = myChoice === idx && reveal === null;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAnswer(idx)}
                      disabled={myChoice !== null || reveal !== null || !connected}
                      aria-label={describeOpt(opt, idx)}
                      className={cn(
                        "flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border px-4 py-2.5 text-right transition-all",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
                        "disabled:cursor-default",
                        isCorrect
                          ? "border-emerald-500 bg-emerald-500/15 font-bold text-emerald-800 dark:text-emerald-200"
                          : isMyWrong
                            ? "border-rose-500 bg-rose-500/10 text-rose-700 line-through dark:text-rose-300"
                            : isPicked
                              ? "border-amber-500 bg-amber-500/15 font-bold text-amber-800 dark:text-amber-200"
                              : "bg-card text-card-foreground hover:border-emerald-500/40 hover:bg-emerald-500/5",
                      )}
                    >
                      <span dir="ltr" lang="en" className="min-w-0 flex-1 text-[13px] leading-6">
                        {opt}
                      </span>
                      <span className="shrink-0 text-[10px] font-black text-muted-foreground">{faNum(idx + 1)}</span>
                    </button>
                  );
                })}
              </div>

              {reveal !== null && (
                <p className="text-center text-[11px] text-muted-foreground" role="status">
                  سؤال بعدی دارد می‌آید…
                </p>
              )}
            </>
          ) : (
            <div className="flex h-32 items-center justify-center gap-2 rounded-2xl border bg-card text-[12px] text-muted-foreground">
              <Loader2 size={15} className="animate-spin" />
              همگام‌سازی با اتاق…
            </div>
          )}
        </div>
      )}

      {/* ═══ Finished ═══ */}
      {phase === "finished" && finished && (
        <div className="space-y-4">
          <header
            className={cn(
              "flex items-center gap-3 rounded-2xl p-4",
              result === "win"
                ? "bg-gradient-to-bl from-amber-500/20 via-amber-500/5 to-transparent"
                : "bg-gradient-to-bl from-emerald-500/15 via-transparent to-transparent",
            )}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
              {result === "win" ? <Crown size={22} /> : <Trophy size={22} />}
            </span>
            <div>
              <h2 className="text-base font-black">
                {result === "win" ? "بردی! 🏆" : result === "loss" ? "حریف برد" : result === "draw" ? "مساوی شد!" : "دوئل تمام شد"}
              </h2>
              <p className="text-[11px] text-muted-foreground">
                {faNum(finished.duration)} ثانیه دوئل — نتیجه در آمارت و رده‌بندی ثبت شد
              </p>
            </div>
          </header>

          {NoticeBanner}

          {/* سکوی نتیجهٔ دو نفره */}
          <div className="grid grid-cols-2 gap-2">
            {[finalMe, finalOpp].map((f, i) =>
              f ? (
                <div
                  key={f.id}
                  className={cn(
                    "rounded-xl border p-3 text-center",
                    result === "win" && i === 0
                      ? "border-amber-500/50 bg-amber-500/10"
                      : "border-emerald-500/30 bg-emerald-500/10",
                  )}
                >
                  {result === "win" && i === 0 && <Crown size={16} className="mx-auto mb-1 text-amber-500" />}
                  <p className="truncate text-[12px] font-bold">{f.id === meId ? `${f.name} (تو)` : f.name}</p>
                  <p className="text-2xl font-black tabular-nums">{faNum(f.score)}</p>
                  <p className="text-[10px] text-muted-foreground">{faNum(f.correct)} پاسخ درست</p>
                </div>
              ) : null,
            )}
          </div>

          {/* مرور سؤال‌ها — تاشو */}
          <Collapsible open={reviewOpen} onOpenChange={setReviewOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-xl border bg-card px-4 py-2.5 text-[13px] font-bold hover:bg-emerald-500/5">
              مرور سؤال‌ها و پاسخ‌های درست
              <ChevronDown size={15} className={cn("transition-transform", reviewOpen && "rotate-180")} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-2 max-h-72 space-y-2 overflow-y-auto pl-1">
                {finished.packSummary.map((q, qi) => {
                  const mine = myAnswers[qi];
                  const answeredCorrectly = mine === q.answer;
                  return (
                    <div key={q.id} className="rounded-xl border bg-card p-3">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <p dir="ltr" lang="en" className="min-w-0 flex-1 text-[12px] font-bold leading-5">
                          {q.text}
                        </p>
                        {mine === undefined || mine === null ? (
                          <Badge variant="outline" className="shrink-0 text-[9px]">بی‌پاسخ</Badge>
                        ) : answeredCorrectly ? (
                          <Badge className="shrink-0 bg-emerald-500/15 text-[9px] text-emerald-700 dark:text-emerald-300">درست</Badge>
                        ) : (
                          <Badge variant="outline" className="shrink-0 border-rose-500/40 text-[9px] text-rose-600">غلط</Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {q.options.map((opt, oi) => (
                          <span
                            key={oi}
                            dir="ltr"
                            lang="en"
                            className={cn(
                              "rounded-lg border px-2 py-1 text-[11px] leading-5",
                              oi === q.answer
                                ? "border-emerald-500/50 bg-emerald-500/10 font-bold text-emerald-700 dark:text-emerald-300"
                                : mine === oi
                                  ? "border-rose-500/50 bg-rose-500/10 text-rose-600 line-through dark:text-rose-300"
                                  : "text-muted-foreground",
                            )}
                          >
                            {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="flex gap-2">
            {isHost ? (
              <Button onClick={handleRematch} className="h-11 flex-1 gap-2 bg-emerald-600 text-white hover:bg-emerald-700">
                <RotateCcw size={15} />
                دوباره
              </Button>
            ) : (
              <div className="flex h-11 flex-1 items-center justify-center rounded-xl border border-dashed text-[12px] text-muted-foreground">
                میزبان تصمیم دور دوباره می‌گیرد…
              </div>
            )}
            <Button variant="outline" onClick={handleExit} className="h-11 gap-1.5 border-amber-500/40 text-amber-700 hover:bg-amber-500/10 dark:text-amber-400">
              <LogOut size={15} />
              خروج
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/** توصیف گزینه برای فناوری‌های کمکی — الگوی describeOption مشترک */
function describeOpt(text: string, idx: number): string {
  return `گزینه ${faNum(idx + 1)}: ${text}`;
}
