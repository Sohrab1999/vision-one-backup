// گام ۹-C — استخراج مکانیکی wordle-game.tsx (۱۳۴۰ خط) → games/wordle/
// برش‌های خطی بایت‌به‌بایت از `git show HEAD` (الگوی پلی‌بوک t7/t8a/t8b — games/fps/README.md).
// تنها دلتاهای مجاز: هدر کامنت + import + "use client" + کلیدواژهٔ export + اینترفیس props +
// dedent دقیقاً ۲ فاصله برای بدنهٔ شاخه‌های داخل if (playing/done) + سیم‌کشی تازهٔ index.
import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";

const CWD = "/home/z/my-project";
const DIR = `${CWD}/src/components/book/games/wordle`;
mkdirSync(DIR, { recursive: true });

const orig = execSync("git show HEAD:src/components/book/games/wordle-game.tsx", {
  cwd: CWD,
  encoding: "utf8",
}).split("\n");
if (orig[orig.length - 1] === "") orig.pop();
if (orig.length !== 1340) throw new Error(`expected 1340 lines, got ${orig.length}`);

// ── گارد مرز برش‌ها: محتوای خطوط مرزی باید دقیقاً همین‌ها باشد ──
const at = (n: number, prefix: string) => {
  if (!orig[n - 1]!.startsWith(prefix))
    throw new Error(`boundary line ${n} mismatch: ${JSON.stringify(orig[n - 1])}`);
};
at(74, "type Phase");
at(112, "}");
at(114, "const GAME_KEY");
at(129, "const WORD_RE");
at(131, "// ─── توابع خالص");
at(211, "}");
at(213, "// ─── localStorage روزانه");
at(268, "}");
at(270, "/** آموزش ۳-گامی استاندارد");
at(287, "];");
at(289, "export function WordleGame() {");
at(800, "  }, [playingActive, paused, exitAsk, submitGuess, eraseLetter, typeLetter]);");
at(802, "  // ── Done: روزانه");
at(803, "  if (dailyDoneView) {");
at(804, "    const won = dailyToday.status");
at(879, "    );");
at(882, "  if (dailyPlayingView || infinitePlaying) {");
at(883, "    // ── Playing");
at(1079, "    );");
at(1082, '  if (phase === "done") {');
at(1083, "    // ── Done: بی‌نهایت");
at(1154, "    );");
at(1157, "  // ── Setup ──");
at(1158, "  const dailyStatusText");
at(1339, "  );");
at(1340, "}");

/** برش فرا-شامل: a..b با اندیس ۱-پایه */
const slice = (a: number, b: number) => orig.slice(a - 1, b).join("\n");
/** حذف دقیقاً ۲ فاصلهٔ ابتدای خط‌های تورفته (dedent بدنهٔ شاخه‌های داخل if — خط خالی دست‌نخورده) */
const dedent2 = (s: string) =>
  s
    .split("\n")
    .map((l) => (l.startsWith("  ") ? l.slice(2) : l))
    .join("\n");
/** دلتای مجاز پلی‌بوک: افزودن کلیدواژهٔ export به اعلان‌های سطح ماژول (فقط اعلان — نه ارجاع‌ها) */
const exp = (s: string, names: string[]): string =>
  s
    .split("\n")
    .map((l) => {
      const m = l.match(/^(const|let|function|type|interface) (\w+)/);
      return m && names.includes(m[2]!) ? `export ${l}` : l;
    })
    .join("\n");

// ═══ ۱) types.ts — تایپ‌ها و اینترفیس‌ها (اصل ۷۴..۱۱۲) ═══
const typesTs = `/**
 * تایپ‌های «وردل ویژن» — تفکیک مکانیکی از wordle-game.tsx
 * (گام ۹ نقشهٔ docs/refactor-roadmap-2.md — پلی‌بوک games/fps/README.md)
 */

${exp(slice(74, 112), [
  "Phase",
  "Mode",
  "WordLevel",
  "Verdict",
  "DailyState",
  "DailyStreakState",
  "BestMoves",
  "BestScore",
  "MetaSnapshot",
])}
`;

// ═══ ۲) constants.ts — ثابت‌های تنظیمی (اصل ۱۱۴..۱۲۹) ═══
const constantsTs = `/**
 * ثابت‌های «وردل ویژن» — تفکیک مکانیکی از wordle-game.tsx
 * (گام ۹ نقشهٔ docs/refactor-roadmap-2.md — پلی‌بوک games/fps/README.md)
 *
 * کلیدهای localStorage روزانه/زنجیره در daily-store.ts ساخته می‌شوند؛
 * WORD_LEN ثابت روزانه دست‌نخورده (seed روزانه به استخر ۵حرفی وابسته است).
 */

import type { WordLevel } from "./types";

${exp(slice(114, 129), [
  "GAME_KEY",
  "WORD_LEN",
  "MAX_ROWS",
  "FLIP_STAGGER_MS",
  "FLIP_SETTLE_MS",
  "MIN_POOL",
  "LEVELS",
  "WORD_RE",
])}
`;

// ═══ ۳) helpers.ts — منطق خالص: داور دو-گذره + تاریخ/هش روزانه + رنگ حکم + کیبورد + ستاره (اصل ۱۳۱..۲۱۱) ═══
const helpersTs = `/**
 * توابع خالص «وردل ویژن» — تفکیک مکانیکی از wordle-game.tsx
 * (گام ۹ نقشهٔ docs/refactor-roadmap-2.md — پلی‌بوک games/fps/README.md)
 *
 * داور دو-گذرهٔ وردل (judgeVerdicts با احترام به حروف تکراری) + تاریخ/هش پایدار روزانه
 * (todayKey/shiftDate/hashStr) + کلاس رنگ و توضیح فارسی حکم (VERDICT_FACE/VERDICT_FA)
 * + چیدمان QWERTY کیبورد (KEY_ROWS) + ستاره‌بندی (starsFor). pad2 خصوصی می‌ماند.
 */

import type { Verdict } from "./types";

${exp(slice(131, 211), [
  "todayKey",
  "shiftDate",
  "hashStr",
  "judgeVerdicts",
  "VERDICT_RANK",
  "VERDICT_FACE",
  "VERDICT_FA",
  "KEY_ROWS",
  "starsFor",
])}
`;

// ═══ ۴) daily-store.ts — وضعیت روزانه/زنجیره در localStorage (اصل ۲۱۳..۲۶۸) ═══
const dailyStoreTs = `/**
 * وضعیت روزانه/زنجیرهٔ «وردل ویژن» در localStorage — تفکیک مکانیکی از wordle-game.tsx
 * (گام ۹ نقشهٔ docs/refactor-roadmap-2.md — پلی‌بوک games/fps/README.md)
 *
 * کلیدها: «visionone:wordle-daily:{bookId}» و «visionone:wordle-streak:{bookId}» —
 * هر نوشتن با notifyGameData به استور بیرونی (useSyncExternalStore در index) اعلان می‌دهد.
 * dailyKeyOf/streakKeyOf خصوصی می‌مانند.
 */

import { notifyGameData } from "../shared";
import { MAX_ROWS, WORD_RE } from "./constants";
import type { DailyState, DailyStreakState } from "./types";

${exp(slice(213, 268), ["loadDailyState", "writeDailyState", "loadDailyStreak", "saveDailyStreak"])}
`;

// ═══ ۵) setup-panel.tsx — TUTORIAL_STEPS (اصل ۲۷۰..۲۸۷) + بدنهٔ شاخهٔ setup (اصل ۱۱۵۷..۱۳۳۹ — عیناً بدون dedent) ═══
const setupPanel = `"use client";

/**
 * setup-panel — نمای راه‌اندازی «وردل ویژن» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).
 *
 * استخراج مکانیکی JSX فاز setup از wordle-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * کارت معرفی + راهنمای رنگ حروف + انتخاب حالت (روزانه/بی‌نهایت) + انتخاب طول واژهٔ ۴/۵/۶ حرفی +
 * بج‌های استخر/رکورد/زنجیره + هشدار استخر کم + دکمهٔ شروع + آموزش ۳گامی
 * (TUTORIAL_STEPS — صادرشده برای بقیهٔ نماها).
 * کامپوننت presentational — state و موتور در index.tsx می‌ماند؛ props هم‌نام شناسه‌های قبلی‌اند
 * تا JSX منتقل‌شده صفر تغییر شناسه داشته باشد.
 */

import { Keyboard, Sun, Infinity as InfinityIcon, Play, Trophy, Sparkles, Target, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Dispatch, SetStateAction } from "react";
import type { VocabEntry } from "@/data/types";
import { faNum } from "../shared";
import { TutorialOverlay, type TutorialStep } from "../kit/tutorial-overlay";
import { GAME_KEY, LEVELS, MIN_POOL } from "./constants";
import type { BestMoves, DailyState, MetaSnapshot, Mode, WordLevel } from "./types";

interface SetupPanelProps {
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
  /** فاز G2-d — طول واژهٔ حالت بی‌نهایت (پیش‌فرض ۵) */
  wordLen: WordLevel;
  setWordLen: Dispatch<SetStateAction<WordLevel>>;
  /** وضعیت روزانهٔ امروز — null = هنوز شروع نشده */
  dailyToday: DailyState | null;
  /** استخرهای واژگان یکتا/مرتب بر حسب طول */
  poolsByLen: Record<WordLevel, VocabEntry[]>;
  /** رکورد بی‌نهایت هر سطح — ۵حرفی همان scope «infinite» قبلی */
  bestForLen: (n: WordLevel) => BestMoves | null;
  /** اسنپ‌شات رکوردها/زنجیره برای بج‌ها */
  meta: MetaSnapshot;
  startDaily: () => void;
  startInfinite: () => void;
  tutorialOpen: boolean;
  handleTutorialOpenChange: (open: boolean) => void;
}

${exp(slice(270, 287), ["TUTORIAL_STEPS"])}

export function SetupPanel({
  mode,
  setMode,
  wordLen,
  setWordLen,
  dailyToday,
  poolsByLen,
  bestForLen,
  meta,
  startDaily,
  startInfinite,
  tutorialOpen,
  handleTutorialOpenChange,
}: SetupPanelProps) {
${slice(1157, 1339)}
}
`;

// ═══ ۶) playing-view.tsx — بدنهٔ شاخهٔ playing (اصل ۸۸۳..۱۰۷۹ — dedent دقیقاً ۲ فاصلهٔ if) ═══
const playingView = `"use client";

/**
 * playing-view — نمای حین بازی «وردل ویژن» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).
 *
 * استخراج مکانیکی JSX فاز playing از wordle-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * GameShell کیت (بج حالت/حدس/زنجیره + نوار پیشرفت + توقف/صدا/راهنما/خروج) + گرید ۶×N فلیپ
 * دو-گذره + کیبورد QWERTY رنگی + اورلی توقف + نگهبان خروج (متن مخصوص استریک روزانه) +
 * کارت مدرس بازی G5-01 + آموزش ۳گامی.
 * کامپوننت presentational — state/تایمرهای فلیپ در index.tsx می‌مانند؛ props هم‌نام‌اند.
 */

import { Keyboard, Sun, Infinity as InfinityIcon, Target, Trophy, Pause, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { faNum } from "../shared";
import { toggleSoundMuted } from "../kit/sound-engine";
import { GameExitGuard } from "../kit/exit-guard";
import { GameShell } from "../kit/game-shell";
import { TutorialOverlay } from "../kit/tutorial-overlay";
import type { HintCoach } from "../kit/hint-coach";
import { KEY_ROWS, VERDICT_FACE, VERDICT_FA, judgeVerdicts } from "./helpers";
import { TUTORIAL_STEPS } from "./setup-panel";
import { GAME_KEY, MAX_ROWS } from "./constants";
import type { MetaSnapshot, Verdict, WordLevel } from "./types";

interface PlayingViewProps {
  /** نمای بازی روزانه فعال — مبنای isDaily و متن نگهبان خروج */
  dailyPlayingView: boolean;
  /** طول واژهٔ دور جاری — روزانه همیشه ۵، بی‌نهایت = طول انتخابی */
  activeLen: WordLevel;
  /** حدس‌های ثبت‌شدهٔ دور جاری (روزانه: از استور) */
  activeCommitted: string[];
  activeAnswer: string;
  /** ورودی جاری ردیف فعال */
  input: string;
  /** بهترین وضعیت هر حرف روی کیبورد — از همهٔ حدس‌ها */
  keyStatus: Map<string, Verdict>;
  /** کلید لرزش ردیف جاری — با تغییر key انیمیشن دوباره اجرا می‌شود */
  shakeKey: number;
  /** ردیف در حال فلیپ (-1 = هیچ) */
  revealRow: number;
  /** چند ستونِ ردیف در حال فلیپ برگشته‌اند */
  flipCols: number;
  meta: MetaSnapshot;
  liveMsg: string;
  paused: boolean;
  togglePause: () => void;
  muted: boolean;
  setMuted: (v: boolean) => void;
  handleHelp: () => void;
  handleExitClick: () => void;
  submitGuess: () => void;
  eraseLetter: () => void;
  typeLetter: (letter: string) => void;
  resume: () => void;
  exitAsk: boolean;
  setExitAsk: (o: boolean) => void;
  confirmExit: () => void;
  /** کارت مدرس بازی (element داخل GameShell رندر می‌شود) */
  hint: HintCoach;
  tutorialOpen: boolean;
  handleTutorialOpenChange: (open: boolean) => void;
}

export function PlayingView({
  dailyPlayingView,
  activeLen,
  activeCommitted,
  activeAnswer,
  input,
  keyStatus,
  shakeKey,
  revealRow,
  flipCols,
  meta,
  liveMsg,
  paused,
  togglePause,
  muted,
  setMuted,
  handleHelp,
  handleExitClick,
  submitGuess,
  eraseLetter,
  typeLetter,
  resume,
  exitAsk,
  setExitAsk,
  confirmExit,
  hint,
  tutorialOpen,
  handleTutorialOpenChange,
}: PlayingViewProps) {
${dedent2(slice(883, 1079))}
}
`;

// ═══ ۷) done-view.tsx — بدنهٔ دو شاخهٔ done (اصل ۸۰۴..۸۷۹ روزانه + ۱۰۸۳..۱۱۵۴ بی‌نهایت — dedent ۲) ═══
const doneView = `"use client";

/**
 * done-view — نمای پایان «وردل ویژن» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).
 *
 * استخراج مکانیکی JSX دو شاخهٔ done از wordle-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * DailyDoneView (روزانه — نمای مشتق‌شده از استور و رفرش‌پذیر؛ با شمارش معکوس متنی واژهٔ بعدی)
 * و InfiniteDoneView (بی‌نهایت). هر دو: ResultScreen کیت + کارت واژهٔ دور (معنی/درس —
 * SRS در finishGame ثبت شده است).
 * کامپوننت presentational — state و موتور در index.tsx می‌ماند؛ props هم‌نام شناسه‌های قبلی‌اند.
 */

import { Target, Timer, Trophy, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { VocabEntry } from "@/data/types";
import { faNum, fmtTime } from "../shared";
import { ResultScreen } from "../kit/result-screen";
import { TutorialOverlay } from "../kit/tutorial-overlay";
import { starsFor } from "./helpers";
import { TUTORIAL_STEPS } from "./setup-panel";
import { GAME_KEY, MAX_ROWS } from "./constants";
import type { DailyState, MetaSnapshot, Phase } from "./types";

interface DailyDoneViewProps {
  /** وضعیت روزانهٔ امروز — در شاخهٔ dailyDoneView قطعاً non-null است (گارد index) */
  dailyToday: DailyState;
  dailyAnswer: string;
  /** مدخل واژهٔ دور برای کارت معنی/درس */
  answerEntry: VocabEntry | null;
  activeAnswer: string;
  isRecord: boolean;
  /** مدت نهایی دور (ثانیه) برای آمار نتیجه */
  finalSecs: number;
  meta: MetaSnapshot;
  liveMsg: string;
  startInfinite: () => void;
  backToSetup: () => void;
  tutorialOpen: boolean;
  handleTutorialOpenChange: (open: boolean) => void;
}

export function DailyDoneView({
  dailyToday,
  dailyAnswer,
  answerEntry,
  activeAnswer,
  isRecord,
  finalSecs,
  meta,
  liveMsg,
  startInfinite,
  backToSetup,
  tutorialOpen,
  handleTutorialOpenChange,
}: DailyDoneViewProps) {
${dedent2(slice(804, 879))}
}

interface InfiniteDoneViewProps {
  guesses: string[];
  answer: string;
  isRecord: boolean;
  finalSecs: number;
  meta: MetaSnapshot;
  liveMsg: string;
  startInfinite: () => void;
  setPhase: (p: Phase) => void;
  answerEntry: VocabEntry | null;
  activeAnswer: string;
  tutorialOpen: boolean;
  handleTutorialOpenChange: (open: boolean) => void;
}

export function InfiniteDoneView({
  guesses,
  answer,
  isRecord,
  finalSecs,
  meta,
  liveMsg,
  startInfinite,
  setPhase,
  answerEntry,
  activeAnswer,
  tutorialOpen,
  handleTutorialOpenChange,
}: InfiniteDoneViewProps) {
${dedent2(slice(1083, 1154))}
}
`;

// ═══ ۸) index.tsx — هدر مستندات (اصل ۳..۲۳) + موتور (اصل ۲۸۹..۸۰۰ — عیناً) + سیم‌کشی چهار شاخه ═══
const indexTsx = `"use client";

/**
 * گام ۹ نقشهٔ docs/refactor-roadmap-2.md — تفکیک مکانیکی از wordle-game.tsx (پلی‌بوک fps/)؛
 * JSX بایت‌به‌بایت منتقل شده است.
 *
 * این فایل فقط موتور/ارکستراسیون WordleGame است (state/refs/استورهای بیرونی/فلیپ پله‌ای/
 * ثبت نتیجه/SRS/رکورد/تله‌متری جلسه/توقف/نگهبان خروج/کیبورد فیزیکی)؛ نماها:
 * setup-panel.tsx / playing-view.tsx / done-view.tsx — تایپ‌ها types.ts، ثابت‌ها constants.ts،
 * منطق خالص helpers.ts، وضعیت روزانهٔ localStorage در daily-store.ts.
 * props بین ماژول‌ها هم‌نام شناسه‌های فایل اصلی‌اند تا JSX منتقل‌شده صفر تغییر شناسه داشته باشد.
 */

${slice(3, 23)}

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";
import type { VocabEntry } from "@/data/types";
import { useBook, useBookData } from "@/lib/book-context";
import { recordSRS } from "@/lib/srs-store";
import { touchStreak } from "@/lib/streak-store";
import { recordStudySession } from "@/lib/goal-store";
import { speak, stopSpeaking } from "@/lib/speak";
import { useVoiceSpeed } from "@/lib/voice-store";
import {
  bumpPlays,
  faNum,
  loadBest,
  saveAttempt,
  saveBest,
  subscribeGameData,
} from "../shared";
// ─── فاز G2-d — کیت GameKit v2 (قرارداد API سند §۴) ───
import { isSoundMuted, playSound } from "../kit/sound-engine";
import { buzz } from "../kit/haptics";
import { useGamePause } from "../kit/use-pause";
import { useAutoTutorial } from "../kit/tutorial-overlay";
import { createGameSession, type GameSessionTracker } from "../kit/telemetry";
// G5-01 — مدرس بازی با LLM (راهنمای خودکار بعد از ۳ خطا)
import { useHintCoach } from "../kit/hint-coach";
// ─── ماژول‌های تفکیک‌شدهٔ wordle/ (گام ۹) ───
import { hashStr, judgeVerdicts, shiftDate, todayKey, VERDICT_RANK } from "./helpers";
import { FLIP_SETTLE_MS, FLIP_STAGGER_MS, GAME_KEY, MAX_ROWS, MIN_POOL, WORD_LEN } from "./constants";
import { loadDailyState, loadDailyStreak, saveDailyStreak, writeDailyState } from "./daily-store";
import type {
  BestMoves,
  BestScore,
  DailyState,
  MetaSnapshot,
  Mode,
  Phase,
  Verdict,
  WordLevel,
} from "./types";
import { SetupPanel } from "./setup-panel";
import { DailyDoneView, InfiniteDoneView } from "./done-view";
import { PlayingView } from "./playing-view";

${slice(289, 800)}

  // ── Done: روزانه (نمای مشتق‌شده از استور — رفرش‌پذیر) — فاز G2-d: ResultScreen ──
  // (گارد && dailyToday فقط برای narrow کردن نوع prop است — dailyDoneView خودش مستلزم non-null بودن dailyToday است)
  if (dailyDoneView && dailyToday) {
    return (
      <DailyDoneView
        dailyToday={dailyToday}
        dailyAnswer={dailyAnswer}
        answerEntry={answerEntry}
        activeAnswer={activeAnswer}
        isRecord={isRecord}
        finalSecs={finalSecs}
        meta={meta}
        liveMsg={liveMsg}
        startInfinite={startInfinite}
        backToSetup={backToSetup}
        tutorialOpen={tutorialOpen}
        handleTutorialOpenChange={handleTutorialOpenChange}
      />
    );
  }

  // ── Playing — بدنهٔ شاخه به PlayingView منتقل شد (اصل ۸۸۳..۱۰۷۹ — props هم‌نام) ──
  if (dailyPlayingView || infinitePlaying) {
    return (
      <PlayingView
        dailyPlayingView={dailyPlayingView}
        activeLen={activeLen}
        activeCommitted={activeCommitted}
        activeAnswer={activeAnswer}
        input={input}
        keyStatus={keyStatus}
        shakeKey={shakeKey}
        revealRow={revealRow}
        flipCols={flipCols}
        meta={meta}
        liveMsg={liveMsg}
        paused={paused}
        togglePause={togglePause}
        muted={muted}
        setMuted={setMuted}
        handleHelp={handleHelp}
        handleExitClick={handleExitClick}
        submitGuess={submitGuess}
        eraseLetter={eraseLetter}
        typeLetter={typeLetter}
        resume={resume}
        exitAsk={exitAsk}
        setExitAsk={setExitAsk}
        confirmExit={confirmExit}
        hint={hint}
        tutorialOpen={tutorialOpen}
        handleTutorialOpenChange={handleTutorialOpenChange}
      />
    );
  }

  // ── Done: بی‌نهایت — بدنهٔ شاخه به InfiniteDoneView منتقل شد (اصل ۱۰۸۳..۱۱۵۴) ──
  if (phase === "done") {
    return (
      <InfiniteDoneView
        guesses={guesses}
        answer={answer}
        isRecord={isRecord}
        finalSecs={finalSecs}
        meta={meta}
        liveMsg={liveMsg}
        startInfinite={startInfinite}
        setPhase={setPhase}
        answerEntry={answerEntry}
        activeAnswer={activeAnswer}
        tutorialOpen={tutorialOpen}
        handleTutorialOpenChange={handleTutorialOpenChange}
      />
    );
  }

  // ── Setup — بدنهٔ پایانی به SetupPanel منتقل شد (اصل ۱۱۵۷..۱۳۳۹ — props هم‌نام) ──
  return (
    <SetupPanel
      mode={mode}
      setMode={setMode}
      wordLen={wordLen}
      setWordLen={setWordLen}
      dailyToday={dailyToday}
      poolsByLen={poolsByLen}
      bestForLen={bestForLen}
      meta={meta}
      startDaily={startDaily}
      startInfinite={startInfinite}
      tutorialOpen={tutorialOpen}
      handleTutorialOpenChange={handleTutorialOpenChange}
    />
  );
}
`;

writeFileSync(`${DIR}/types.ts`, typesTs);
writeFileSync(`${DIR}/constants.ts`, constantsTs);
writeFileSync(`${DIR}/helpers.ts`, helpersTs);
writeFileSync(`${DIR}/daily-store.ts`, dailyStoreTs);
writeFileSync(`${DIR}/setup-panel.tsx`, setupPanel);
writeFileSync(`${DIR}/playing-view.tsx`, playingView);
writeFileSync(`${DIR}/done-view.tsx`, doneView);
writeFileSync(`${DIR}/index.tsx`, indexTsx);
for (const f of [
  "types.ts",
  "constants.ts",
  "helpers.ts",
  "daily-store.ts",
  "setup-panel.tsx",
  "playing-view.tsx",
  "done-view.tsx",
  "index.tsx",
]) {
  const n = execSync(`wc -l < ${JSON.stringify(`${DIR}/${f}`)}`, { encoding: "utf8" }).trim();
  console.log(`  ${f}: ${n} خط`);
}
console.log("extracted ✓");
