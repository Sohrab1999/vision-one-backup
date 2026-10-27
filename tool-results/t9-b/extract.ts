/**
 * extract.ts — تفکیک مکانیکی flappy-quiz-game.tsx به games/flappy-quiz/ (گام ۹، Task 9-b)
 *
 * روش پلی‌بوک fps (تکرار هفتم): برش خطی بایت‌به‌بایت از git HEAD — هیچ JSX دستی بازنویسی نمی‌شود.
 * تنها تغییرات اعمال‌شده روی برش‌ها (مستند و مکانیکی):
 *   1) افزودن پیشوند «export » به تعریف‌های سطح‌بالایی که بین ماژول‌ها مصرف می‌شوند (الگوی گام ۵: «تنها تغییر: export const»)
 *   2) modulo-dedent ۲ فاصله برای JSX منتقل‌شده به بدنهٔ کامپوننت‌های presentational (الگوی t5/t7/t8)
 * هر چیز دیگری (هدرهای مستند، importها، props wiring) کد «چسب» جدید است و در verify.ts از برش‌ها جدا سنجیده می‌شود.
 */
import { execSync } from "child_process";
import { mkdirSync, writeFileSync } from "fs";

const ROOT = "/home/z/my-project";
const REL = "src/components/book/games/flappy-quiz-game.tsx";
const OUT = `${ROOT}/src/components/book/games/flappy-quiz`;

// ── اصل کار: محتوای اصلی از git HEAD (نه کپی دستی) ──
const orig = execSync(`git -C ${ROOT} show HEAD:${REL}`, { encoding: "utf8" });
const L = orig.split("\n"); // L[n-1] = خط n (فایل با \n تمام می‌شود → آخرین عنصر "")
if (L[360] !== "export function FlappyQuizGame() {") throw new Error("anchor 361 mismatch");
if (L[1451] !== "}") throw new Error("anchor 1452 mismatch");

const slice = (a: number, b: number): string[] => L.slice(a - 1, b);
/** افزودن «export » فقط به خط‌های (مطلق) فهرست‌شده — با گارد پیشوند */
const withExports = (lines: string[], start: number, abs: number[]): string[] =>
  lines.map((l, i) => {
    if (!abs.includes(start + i)) return l;
    if (!/^(const |let |function |type |interface )/.test(l)) throw new Error(`export target not a decl @${start + i}: ${l}`);
    return "export " + l;
  });
/** modulo-dedent برای JSX منتقل‌شده به کامپوننت (خط‌های کوتاه‌تر از تورفتگی دست‌نخورده می‌مانند) */
const dedent = (lines: string[], n: number): string[] => {
  const pad = " ".repeat(n);
  return lines.map((l) => (l.startsWith(pad) ? l.slice(n) : l));
};
const text = (lines: string[]): string => lines.join("\n") + "\n";

// ── گاردهای مرزی (خط اول/آخر هر برش) ──
const guard = (idx: number, prefix: string) => {
  if (!L[idx - 1].startsWith(prefix)) throw new Error(`guard L${idx} failed: ${L[idx - 1]}`);
};
guard(3, "/**");
guard(48, " */");
guard(106, "// ─── ثابت‌ها و انواع ───");
guard(170, "}");
guard(172, "/** فاز G2-c — آموزش ۳-گامی استاندارد");
guard(196, "};");
guard(198, "// ─── کمکی‌های خالص ───");
guard(229, "}");
guard(231, "function roundRectPath");
guard(359, "}");
guard(361, "export function FlappyQuizGame() {");
guard(400, "");
guard(401, "  // ── فاز G2-c — توقف/ادامهٔ استاندارد کیت");
guard(469, "  const sessionRef = useRef<GameSessionTracker | null>(null);");
guard(471, "  // ── دنیای بازی — مالک: حلقهٔ rAF ──");
guard(494, "");
guard(495, "  // ── داده‌های مشتق ──");
guard(553, "  );");
guard(555, "  // ── جریان بازی ──");
guard(1092, "  }, [phase, makeWall, registerCorrect, registerMiss, comboCountRef]);");
guard(1094, "  const chipCls = (active: boolean) =>");
guard(1100, "    );");
guard(1102, "  // ── Setup ──");
guard(1103, '  if (phase === "setup") {');
guard(1104, "    return (");
guard(1206, "    );");
guard(1209, "  // ── Done — فاز G2-c: صفحهٔ نتیجهٔ استاندارد کیت ──");
guard(1210, '  if (phase === "done") {');
guard(1211, "    // ستاره‌بندی per-game:");
guard(1277, "    );");
guard(1280, "  // ── Playing ──");
guard(1281, "  return (");
guard(1451, "  );");

mkdirSync(OUT, { recursive: true });
const write = (name: string, body: string) => {
  writeFileSync(`${OUT}/${name}`, body, "utf8");
  console.log(`wrote ${name}: ${body.split("\n").length - 1} lines`);
};

// ═══ ۱) types.ts — ثابت‌ها و انواع (برش ۱۰۶..۱۷۰) ═══
const TYPE_EXPORTS = [108, 109, 111, 113, 114, 115, 116, 117, 119, 121, 123, 125, 128, 136, 137, 139, 146, 155, 160, 168];
write(
  "types.ts",
  text([
    "/**",
    " * ثابت‌ها و انواع «فلپی گزینش» — تفکیک مکانیکی از flappy-quiz-game.tsx",
    " * (گام ۹ نقشهٔ docs/refactor-roadmap-2.md — پلی‌بوک games/fps/README.md)",
    " * کلیدهای مقدس: GAME_KEY / اسکوپ‌های رکورد / امضای Attempt — بدون تغییر.",
    " */",
    "",
    'import type { QuizQuestionSeed } from "@/data/types";',
    "",
    ...withExports(slice(106, 170), 106, TYPE_EXPORTS),
  ]),
);

// ═══ ۲) helpers.ts — کمکی‌های خالص چیدمان/برچسب (برش ۱۹۸..۲۲۹) ═══
write(
  "helpers.ts",
  text([
    "/**",
    " * کمکی‌های خالص «فلپی گزینش» (گام ۹ — تفکیک مکانیکی از flappy-quiz-game.tsx — پلی‌بوک fps/):",
    " * برچسب فارسی درس/سؤال + چیدمان عمودی دهانه‌های دیوار (قاعدهٔ سقف‌دار gapCap) — بدون اثر جانبی.",
    " */",
    "",
    'import { faNum } from "../shared";',
    'import { GROUND_H, H } from "./types";',
    "",
    ...withExports(slice(198, 229), 198, [201, 205, 210]),
  ]),
);

// ═══ ۳) render.ts — رسم بوم Canvas 2D (برش ۲۳۱..۳۵۹) ═══
write(
  "render.ts",
  text([
    "/**",
    " * رندر بوم «فلپی گزینش» (گام ۹ — تفکیک مکانیکی از flappy-quiz-game.tsx — پلی‌بوک fps/):",
    " * آسمان/زمین/دیوار دروازهٔ گزینه‌ها/پرنده — توابع خالص رسم Canvas 2D که حلقهٔ rAF در index",
    " * هر فریم صدا می‌زند؛ هیچ state یا اثر جانبی اینجا نیست (auto-shrink متن دهانه‌ها در drawWall).",
    " */",
    "",
    'import { BIRD_R, GROUND_H, H, WALL_W, type FlappyWall } from "./types";',
    "",
    ...withExports(slice(231, 359), 231, [242, 257, 269, 316]),
  ]),
);

// ═══ ۴) use-flappy-data.ts — داده‌های مشتق (برش ۴۹۵..۵۵۳ عیناً — تورفتگی ۲ حفظ شده) ═══
write(
  "use-flappy-data.ts",
  text([
    '"use client";',
    "",
    "/**",
    " * use-flappy-data — داده‌های مشتق «فلپی گزینش» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).",
    " *",
    " * استخراج مکانیکی بلوک «داده‌های مشتق» از flappy-quiz-game.tsx (پلی‌بوک games/fps/README.md —",
    " * الگوی use-fps-prefs): بدنهٔ هوک بایت‌به‌بایت منتقل شده و پارامترها هم‌نام شناسه‌های قبلی‌اند",
    " * (data / easy / lesson / activeBookId) تا کد منتقل‌شده صفر تغییر شناسه داشته باشد.",
    " */",
    "",
    'import { useCallback, useMemo, useSyncExternalStore } from "react";',
    'import type { BookData } from "@/data/books/types";',
    'import { loadBest, subscribeGameData } from "../shared";',
    'import { countWeak } from "../kit/smart-pick";',
    'import { ALL_LESSONS, GAME_KEY, type BestRecord } from "./types";',
    "",
    "interface FlappyDataInput {",
    "  data: BookData;",
    "  easy: boolean;",
    "  lesson: number;",
    "  activeBookId: string;",
    "}",
    "",
    "export function useFlappyData({ data, easy, lesson, activeBookId }: FlappyDataInput) {",
    ...slice(495, 553),
    "  return { vocabSeed, lessons, countFor, pool, meaningOf, best, bestEndless, weakCount };",
    "}",
  ]),
);

// ═══ ۵) setup-panel.tsx — آموزش + chipCls + نمای setup (برش‌های ۱۷۲..۱۹۶، ۱۰۹۴..۱۱۰۰، ۱۱۰۴..۱۲۰۶) ═══
write(
  "setup-panel.tsx",
  text([
    '"use client";',
    "",
    "/**",
    " * setup-panel — نمای راه‌اندازی «فلپی گزینش» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).",
    " *",
    " * استخراج مکانیکی JSX فاز setup از flappy-quiz-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):",
    " * کارت معرفی، انتخاب درس، حالت آسان، بج رکورد عادی/بی‌پایان، دکمه‌های «شروع پرواز» و «تمرین بی‌پایان ∞»",
    " * + آموزش (TUTORIAL_STEPS ۳گامی + گام چهارم ENDLESS_TUTORIAL_STEP — صادرشده برای بقیهٔ نماها) + chipCls.",
    " * کامپوننت presentational — state و موتور در index.tsx می‌ماند؛ props هم‌نام شناسه‌های قبلی‌اند",
    " * تا JSX منتقل‌شده صفر تغییر شناسه داشته باشد.",
    " */",
    "",
    'import { Bird, Heart, Infinity as InfinityIcon, MousePointerClick, Play, Sparkles, Trophy } from "lucide-react";',
    'import { Badge } from "@/components/ui/badge";',
    'import { Button } from "@/components/ui/button";',
    'import { Card, CardContent } from "@/components/ui/card";',
    'import { cn } from "@/lib/utils";',
    'import type { Dispatch, SetStateAction } from "react";',
    'import type { QuizQuestionSeed } from "@/data/types";',
    'import { TutorialOverlay, type TutorialStep } from "../kit/tutorial-overlay";',
    'import { faNum } from "../shared";',
    'import { lessonLabel } from "./helpers";',
    'import { ALL_LESSONS, GAME_KEY } from "./types";',
    "",
    ...withExports(slice(172, 196), 172, [173, 192]),
    "",
    ...dedent(slice(1094, 1100), 2),
    "",
    "/** props هم‌نام شناسه‌های flappy-quiz-game.tsx — JSX منتقل‌شده صفر تغییر شناسه دارد */",
    "interface SetupPanelProps {",
    "  lesson: number;",
    "  setLesson: Dispatch<SetStateAction<number>>;",
    "  easy: boolean;",
    "  setEasy: Dispatch<SetStateAction<boolean>>;",
    "  lessons: number[];",
    "  countFor: (l: number) => number;",
    "  vocabSeed: QuizQuestionSeed[];",
    "  best: number | null;",
    "  bestEndless: number | null;",
    "  weakCount: number;",
    "  start: () => void;",
    "  startEndless: () => void;",
    "  tutorialSteps: TutorialStep[];",
    "  tutorialOpen: boolean;",
    "  handleTutorialOpenChange: (o: boolean) => void;",
    "}",
    "",
    "export function SetupPanel({",
    "  lesson,",
    "  setLesson,",
    "  easy,",
    "  setEasy,",
    "  lessons,",
    "  countFor,",
    "  vocabSeed,",
    "  best,",
    "  bestEndless,",
    "  weakCount,",
    "  start,",
    "  startEndless,",
    "  tutorialSteps,",
    "  tutorialOpen,",
    "  handleTutorialOpenChange,",
    "}: SetupPanelProps) {",
    ...dedent(slice(1104, 1206), 2),
    "}",
  ]),
);

// ═══ ۶) playing-view.tsx — نمای playing (برش ۱۲۸۱..۱۴۵۱ عیناً — بدون dedent) ═══
write(
  "playing-view.tsx",
  text([
    '"use client";',
    "",
    "/**",
    " * playing-view — نمای حین پرواز «فلپی گزینش» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).",
    " *",
    " * استخراج مکانیکی JSX فاز playing از flappy-quiz-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):",
    " * GameShell (امتیاز/کمبو/قلب‌ها/بی‌پایان + سؤال دیوار پیش‌رو + liveMsg) + بوم canvas + اورلی توقف",
    " * (با «پایان پرواز» دور بی‌پایان) + نگهبان خروج کیت + راهنمای شِل. کامپوننت presentational —",
    " * حلقهٔ rAF و موتور در index.tsx می‌ماند؛ props هم‌نام شناسه‌های قبلی‌اند (شامل refs ساختاری",
    " * endlessRef/overRef/sessionRef/canvasRef) تا JSX منتقل‌شده صفر تغییر شناسه داشته باشد.",
    " */",
    "",
    'import { Bird, Flag, Flame, Heart, Infinity as InfinityIcon, Pause, Play, Star } from "lucide-react";',
    'import { Badge } from "@/components/ui/badge";',
    'import { Button } from "@/components/ui/button";',
    'import { cn } from "@/lib/utils";',
    'import type { Dispatch, SetStateAction } from "react";',
    'import type { QuizQuestionSeed } from "@/data/types";',
    'import { stopSpeaking } from "@/lib/speak";',
    'import { COMBO_FIRE_CLASS } from "../kit/combo-engine";',
    'import { GameExitGuard } from "../kit/exit-guard";',
    'import { GameShell } from "../kit/game-shell";',
    'import type { GameSessionTracker } from "../kit/telemetry";',
    'import { toggleSoundMuted } from "../kit/sound-engine";',
    'import { TutorialOverlay, type TutorialStep } from "../kit/tutorial-overlay";',
    'import { faNum } from "../shared";',
    'import { qLabel } from "./helpers";',
    'import { GAME_KEY, HEARTS, type Phase } from "./types";',
    "",
    "/** props هم‌نام شناسه‌های flappy-quiz-game.tsx — JSX منتقل‌شده صفر تغییر شناسه دارد */",
    "interface PlayingViewProps {",
    "  score: number;",
    "  combo: number;",
    "  hearts: number;",
    "  endless: boolean;",
    "  endlessRef: { current: boolean };",
    "  liveMsg: string;",
    "  hudQ: QuizQuestionSeed | null;",
    "  paused: boolean;",
    "  muted: boolean;",
    "  setMuted: Dispatch<SetStateAction<boolean>>;",
    "  exitAsk: boolean;",
    "  setExitAskSafe: (v: boolean) => void;",
    "  canvasRef: { current: HTMLCanvasElement | null };",
    "  tutorialSteps: TutorialStep[];",
    "  tutorialOpen: boolean;",
    "  handleTutorialOpenChange: (o: boolean) => void;",
    "  handleHelp: () => void;",
    "  handleExitClick: () => void;",
    "  togglePause: () => void;",
    "  resume: () => void;",
    '  finishEndless: (reason: "finish" | "exit") => void;',
    "  sessionRef: { current: GameSessionTracker | null };",
    "  overRef: { current: boolean };",
    "  setPhase: Dispatch<SetStateAction<Phase>>;",
    "}",
    "",
    "export function PlayingView({",
    "  score,",
    "  combo,",
    "  hearts,",
    "  endless,",
    "  endlessRef,",
    "  liveMsg,",
    "  hudQ,",
    "  paused,",
    "  muted,",
    "  setMuted,",
    "  exitAsk,",
    "  setExitAskSafe,",
    "  canvasRef,",
    "  tutorialSteps,",
    "  tutorialOpen,",
    "  handleTutorialOpenChange,",
    "  handleHelp,",
    "  handleExitClick,",
    "  togglePause,",
    "  resume,",
    "  finishEndless,",
    "  sessionRef,",
    "  overRef,",
    "  setPhase,",
    "}: PlayingViewProps) {",
    ...slice(1281, 1451),
    "}",
  ]),
);

// ═══ ۷) done-view.tsx — نمای نتیجه (برش ۱۲۱۱..۱۲۷۷ — dedent ۲) ═══
write(
  "done-view.tsx",
  text([
    '"use client";',
    "",
    "/**",
    " * done-view — صفحهٔ نتیجهٔ «فلپی گزینش» (گام ۹ نقشهٔ docs/refactor-roadmap-2.md).",
    " *",
    " * استخراج مکانیکی JSX فاز done از flappy-quiz-game.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):",
    " * ستاره‌بندی per-game (آستانهٔ ۲× برای دور بی‌پایان) + ResultScreen کیت با آمار امتیاز/کمبو/",
    " * زمان پرواز (بی‌پایان) یا امتیاز/عبور درست/بهترین کمبو (عادی) + مرور خطاها با معنی واژه.",
    " * کامپوننت presentational — props هم‌نام شناسه‌های قبلی‌اند تا JSX منتقل‌شده صفر تغییر شناسه داشته باشد.",
    " */",
    "",
    'import { CheckCircle2, Flame, Hourglass, Star } from "lucide-react";',
    'import type { Dispatch, SetStateAction } from "react";',
    'import { ResultScreen } from "../kit/result-screen";',
    'import { faNum, fmtTime } from "../shared";',
    'import { type Phase } from "./types";',
    "",
    "/** props هم‌نام شناسه‌های flappy-quiz-game.tsx — JSX منتقل‌شده صفر تغییر شناسه دارد */",
    "interface DoneViewProps {",
    "  endless: boolean;",
    "  score: number;",
    "  isRecord: boolean;",
    "  wrongWords: string[];",
    "  meaningOf: (w: string) => string;",
    "  maxCombo: number;",
    "  flightTime: number;",
    "  correctCount: number;",
    "  start: () => void;",
    "  startEndless: () => void;",
    "  setEndless: Dispatch<SetStateAction<boolean>>;",
    "  endlessRef: { current: boolean };",
    "  setPhase: Dispatch<SetStateAction<Phase>>;",
    "}",
    "",
    "export function DoneView({",
    "  endless,",
    "  score,",
    "  isRecord,",
    "  wrongWords,",
    "  meaningOf,",
    "  maxCombo,",
    "  flightTime,",
    "  correctCount,",
    "  start,",
    "  startEndless,",
    "  setEndless,",
    "  endlessRef,",
    "  setPhase,",
    "}: DoneViewProps) {",
    ...dedent(slice(1211, 1277), 2),
    "}",
  ]),
);

// ═══ ۸) index.tsx — موتور و ارکستراسیون ═══
write(
  "index.tsx",
  text([
    '"use client";',
    "",
    "/**",
    " * گام ۹ نقشهٔ docs/refactor-roadmap-2.md — تفکیک مکانیکی از flappy-quiz-game.tsx (پلی‌بوک fps/)؛",
    " * JSX بایت‌به‌بایت منتقل شده است — نقشهٔ ماژول‌ها: types/helpers/render/use-flappy-data +",
    " * setup-panel/playing-view/done-view و این فایل (موتور: state، حلقهٔ rAF، جریان دور و ارکستراسیون نماها).",
    " */",
    "",
    ...slice(3, 48),
    "",
    "import { useCallback, useEffect, useMemo, useRef, useState } from \"react\";",
    'import { toast } from "sonner";',
    'import type { QuizQuestionSeed } from "@/data/types";',
    'import { useBook, useBookData } from "@/lib/book-context";',
    'import { seedReviewFromQuiz } from "@/lib/srs-store";',
    'import { touchStreak } from "@/lib/streak-store";',
    'import { recordStudySession } from "@/lib/goal-store";',
    'import { speak, stopSpeaking } from "@/lib/speak";',
    'import { useVoiceSpeed } from "@/lib/voice-store";',
    'import { bumpPlays, faNum, loadBest, pickUnique, saveAttempt, saveBest, shuffle } from "../shared";',
    "// فاز G2-c — کیت GameKit v2 (قرارداد API سند)",
    'import { playSound, isSoundMuted } from "../kit/sound-engine";',
    'import { buzz } from "../kit/haptics";',
    'import { useGamePause } from "../kit/use-pause";',
    'import { useAutoTutorial } from "../kit/tutorial-overlay";',
    'import { createGameSession, type GameSessionTracker } from "../kit/telemetry";',
    'import { useCombo } from "../kit/combo-engine";',
    "// فاز G3-05 — انتخاب هوشمند واژهٔ کیت (G3-02) — فقط برای استخر سؤال «تمرین بی‌پایان»",
    'import { smartPick } from "../kit/smart-pick";',
    "import {",
    "  ALL_LESSONS, BIRD_R, EASY_CFG, FLASH_MS, GAME_KEY, GROUND_H, H, HEARTS, INVULN_MS,",
    "  MIN_POOL, NORMAL_CFG, WALL_FLASH_MS, WALL_W, type BestRecord, type BirdState, type Cfg,",
    "  type FlappyWall, type Phase, type Popup,",
    '} from "./types";',
    'import { layoutGaps } from "./helpers";',
    'import { drawBird, drawGround, drawSky, drawWall } from "./render";',
    'import { ENDLESS_TUTORIAL_STEP, SetupPanel, TUTORIAL_STEPS } from "./setup-panel";',
    'import { PlayingView } from "./playing-view";',
    'import { DoneView } from "./done-view";',
    'import { useFlappyData } from "./use-flappy-data";',
    "",
    // بدنهٔ موتور — برش پیوستهٔ ۳۶۱..۴۹۴ (state/هوک‌ها/توقف-آموزش-تله‌متری/refهای دنیای بازی) عیناً
    ...slice(361, 494),
    "  // ── داده‌های مشتق — استخراج مکانیکی گام ۹: بدنهٔ این بلوک بایت‌به‌بایت در use-flappy-data.ts منتقل شده است ──",
    "  const { vocabSeed, lessons, countFor, pool, meaningOf, best, bestEndless, weakCount } = useFlappyData({",
    "    data,",
    "    easy,",
    "    lesson,",
    "    activeBookId,",
    "  });",
    "",
    // برش پیوستهٔ ۵۵۵..۱۰۹۲ (جریان بازی: nextQuestion/makeWall/start/finish/startEndless/finishEndless/handleExitClick + حلقهٔ rAF) عیناً
    ...slice(555, 1092),
    "",
    // ── Setup ── (کامنت و شرط عیناً؛ JSX به SetupPanel منتقل شده — props هم‌نام)
    ...slice(1102, 1103),
    "    return (",
    "      <SetupPanel",
    "        lesson={lesson}",
    "        setLesson={setLesson}",
    "        easy={easy}",
    "        setEasy={setEasy}",
    "        lessons={lessons}",
    "        countFor={countFor}",
    "        vocabSeed={vocabSeed}",
    "        best={best}",
    "        bestEndless={bestEndless}",
    "        weakCount={weakCount}",
    "        start={start}",
    "        startEndless={startEndless}",
    "        tutorialSteps={tutorialSteps}",
    "        tutorialOpen={tutorialOpen}",
    "        handleTutorialOpenChange={handleTutorialOpenChange}",
    "      />",
    "    );",
    "  }",
    "",
    // ── Done ── (کامنت و شرط عیناً؛ JSX به DoneView منتقل شده — props هم‌نام)
    ...slice(1209, 1210),
    "    return (",
    "      <DoneView",
    "        endless={endless}",
    "        score={score}",
    "        isRecord={isRecord}",
    "        wrongWords={wrongWords}",
    "        meaningOf={meaningOf}",
    "        maxCombo={maxCombo}",
    "        flightTime={flightTime}",
    "        correctCount={correctCount}",
    "        start={start}",
    "        startEndless={startEndless}",
    "        setEndless={setEndless}",
    "        endlessRef={endlessRef}",
    "        setPhase={setPhase}",
    "      />",
    "    );",
    "  }",
    "",
    // ── Playing ── (کامنت عیناً؛ JSX به PlayingView منتقل شده — props هم‌نام)
    ...slice(1280, 1280),
    "  return (",
    "    <PlayingView",
    "      score={score}",
    "      combo={combo}",
    "      hearts={hearts}",
    "      endless={endless}",
    "      endlessRef={endlessRef}",
    "      liveMsg={liveMsg}",
    "      hudQ={hudQ}",
    "      paused={paused}",
    "      muted={muted}",
    "      setMuted={setMuted}",
    "      exitAsk={exitAsk}",
    "      setExitAskSafe={setExitAskSafe}",
    "      canvasRef={canvasRef}",
    "      tutorialSteps={tutorialSteps}",
    "      tutorialOpen={tutorialOpen}",
    "      handleTutorialOpenChange={handleTutorialOpenChange}",
    "      handleHelp={handleHelp}",
    "      handleExitClick={handleExitClick}",
    "      togglePause={togglePause}",
    "      resume={resume}",
    "      finishEndless={finishEndless}",
    "      sessionRef={sessionRef}",
    "      overRef={overRef}",
    "      setPhase={setPhase}",
    "    />",
    "  );",
    "}",
  ]),
);

console.log("extract done.");
