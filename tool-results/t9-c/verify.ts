// گام ۹-C — صحه‌گذاری بایت‌به‌بایت: بازه‌های `git show HEAD:.../wordle-game.tsx` (۱۳۴۰ خط)
// در برابر ماژول‌های جدید games/wordle/ (الگوی tool-results/t8b/verify.ts).
// دلتاهای مجاز: افزودن export/import/"use client"/کامنت هدر + dedent دقیقاً ۲ فاصله برای
// بدنهٔ شاخه‌های JSX منتقل‌شده به کامپوننت (playing/done) + سیم‌کشی props هم‌نام در index.
// برخلاف t8b: فایل اصلی games/wordle-game.tsx و games-hub.tsx باید دست‌نخورده بمانند
// (حذف/re-point مسئولیت orchestrator است).
import { execSync } from "child_process";
import { readFileSync, existsSync } from "fs";

const CWD = "/home/z/my-project";
const OLD_FILE = `${CWD}/src/components/book/games/wordle-game.tsx`;
const dir = `${CWD}/src/components/book/games/wordle`;

let ok = true;
const pass = (msg: string) => console.log(`PASS ✓ ${msg}`);
const fail = (msg: string) => {
  ok = false;
  console.error(`FAIL ✗ ${msg}`);
};

const orig = execSync("git show HEAD:src/components/book/games/wordle-game.tsx", {
  cwd: CWD,
  encoding: "utf8",
}).split("\n");
if (orig[orig.length - 1] === "") orig.pop();
if (orig.length !== 1340) throw new Error(`HEAD file: expected 1340 lines, got ${orig.length}`);
const slice = (a: number, b: number) => orig.slice(a - 1, b).join("\n");

const read = (f: string) => readFileSync(`${dir}/${f}`, "utf8");

const norm = (s: string) =>
  s
    .split("\n")
    .map((l) => l.replace(/\s+$/g, ""))
    .filter((l) => l.trim().length > 0)
    .join("\n");

/** حذف هدر کامنت/«use client» + بلاک‌های import — بدون دست‌زدن به exportها */
const stripImports = (s: string): string => {
  const lines = s.split("\n");
  let i = 0;
  while (
    i < lines.length &&
    (lines[i]!.trim() === "" ||
      lines[i]!.startsWith("//") ||
      lines[i]!.startsWith("/**") ||
      lines[i]!.startsWith(" *") ||
      lines[i]!.trim() === "*/")
  )
    i++;
  while (i < lines.length && lines[i]!.startsWith("import ")) {
    while (i < lines.length && !/;$/.test(lines[i]!.replace(/\s+$/, ""))) i++;
    i++;
  }
  return lines.slice(i).join("\n");
};

/** مثل t8b: حذف هدر + importها + پس‌وند export (تنها دلتای مجاز وقتی همه exportها تازه‌اند) */
const strip = (s: string): string =>
  stripImports(s)
    .split("\n")
    .map((l) => l.replace(/^export (type|const|interface|function) /, "$1 "))
    .join("\n");

/** حذف دقیقاً ۲ فاصلهٔ ابتدای خط‌های تورفته (همان dedent2 استخراج — بدنهٔ شاخه‌های داخل if) */
const dedent2 = (s: string) =>
  s
    .split("\n")
    .map((l) => (l.startsWith("  ") ? l.slice(2) : l))
    .join("\n");

/** بدنهٔ کامپوننت بین امضای props و اولین «}» ستون-صفر (بستن تابع) */
const bodyOf = (s: string, marker: string): string => {
  const i = s.indexOf(marker);
  if (i === -1) throw new Error(`marker not found: ${marker.slice(0, 40)}`);
  const start = i + marker.length;
  const j = s.indexOf("\n}", start);
  if (j === -1) throw new Error("closing brace not found");
  return s.slice(start, j);
};

const check = (name: string, origS: string, moved: string) => {
  const na = norm(origS);
  const nb = norm(moved);
  if (na === nb) pass(`${name} — مطابقت بایت‌به‌بایت: ${na.split("\n").length} خط عیناً`);
  else {
    fail(`${name} — مغایرت! (اصل ${na.split("\n").length} خط / جدید ${nb.split("\n").length} خط)`);
    const la = na.split("\n");
    const lb = nb.split("\n");
    for (let i = 0; i < Math.max(la.length, lb.length); i++) {
      if (la[i] !== lb[i]) {
        console.error(
          `  اولین تفاوت خط ${i + 1}:\n    اصل: ${JSON.stringify(la[i])}\n    جدید: ${JSON.stringify(lb[i])}`,
        );
        break;
      }
    }
  }
};

// ── ۱) types.ts — اصل ۷۴..۱۱۲ (دلتا: export برای ۹ عضو) ──
check(
  "types.ts (اصل ۷۴..۱۱۲ — تنها تغییر: export)",
  slice(74, 112),
  strip(read("types.ts")),
);

// ── ۲) constants.ts — اصل ۱۱۴..۱۲۹ (دلتا: export + import نوع WordLevel) ──
check(
  "constants.ts (اصل ۱۱۴..۱۲۹ — تنها تغییر: export)",
  slice(114, 129),
  strip(read("constants.ts")),
);

// ── ۳) helpers.ts — اصل ۱۳۱..۲۱۱ (دلتا: export ۹ عضو؛ pad2 خصوصی می‌ماند) ──
check(
  "helpers.ts (اصل ۱۳۱..۲۱۱ — تنها تغییر: export)",
  slice(131, 211),
  strip(read("helpers.ts")),
);

// ── ۴) daily-store.ts — اصل ۲۱۳..۲۶۸ (دلتا: export ۴ تابع؛ dailyKeyOf/streakKeyOf خصوصی) ──
check(
  "daily-store.ts (اصل ۲۱۳..۲۶۸ — تنها تغییر: export)",
  slice(213, 268),
  strip(read("daily-store.ts")),
);

// ── ۵) TUTORIAL_STEPS — اصل ۲۷۰..۲۸۷ → setup-panel.tsx (تنها تغییر: export const) ──
const panel = read("setup-panel.tsx");
const pLines = panel.split("\n");
const tutStart = pLines.findIndex((l) => l.startsWith("/** آموزش ۳-گامی استاندارد"));
const tutEnd = pLines.findIndex((l) => l === "];");
if (tutStart === -1 || tutEnd === -1) throw new Error("TUTORIAL_STEPS markers not found");
const tutText = pLines
  .slice(tutStart, tutEnd + 1)
  .join("\n")
  .replace("export const TUTORIAL_STEPS", "const TUTORIAL_STEPS");
check("TUTORIAL_STEPS (اصل ۲۷۰..۲۸۷ — تنها تغییر: export const)", slice(270, 287), tutText);

// ── ۶) بدنهٔ شاخهٔ setup — اصل ۱۱۵۷..۱۳۳۹ → SetupPanel (عیناً — بدون dedent؛ سطح تورفتگی یکسان) ──
check(
  "SetupPanel بدنه (اصل ۱۱۵۷..۱۳۳۹ — dailyStatusText/dailyPoolOk/infinitePoolOk/setupPoolLen/setupBest + return — عیناً بدون dedent)",
  slice(1157, 1339),
  bodyOf(panel, "}: SetupPanelProps) {\n"),
);

// ── ۷) بدنهٔ شاخهٔ playing — اصل ۸۸۳..۱۰۷۹ → PlayingView (modulo dedent دقیقاً ۲ فاصلهٔ if) ──
const pview = read("playing-view.tsx");
check(
  "PlayingView بدنه (اصل ۸۸۳..۱۰۷۹ — isDaily/gridColsClass + GameShell + گرید فلیپ ۶×N + کیبورد QWERTY + اورلی توقف + نگهبان خروج + مدرس — modulo dedent ۲)",
  dedent2(slice(883, 1079)),
  bodyOf(pview, "}: PlayingViewProps) {\n"),
);

// ── ۸) بدنهٔ دو شاخهٔ done — اصل ۸۰۴..۸۷۹ و ۱۰۸۳..۱۱۵۴ → done-view.tsx (modulo dedent ۲) ──
const dview = read("done-view.tsx");
check(
  "DailyDoneView بدنه (اصل ۸۰۴..۸۷۹ — won/rowsUsed/streakNow + ResultScreen + کارت واژه + شمارش معکوس — modulo dedent ۲)",
  dedent2(slice(804, 879)),
  bodyOf(dview, "}: DailyDoneViewProps) {\n"),
);
check(
  "InfiniteDoneView بدنه (اصل ۱۰۸۳..۱۱۵۴ — won/rowsUsed/streakNow + ResultScreen + کارت واژه — modulo dedent ۲)",
  dedent2(slice(1083, 1154)),
  bodyOf(dview, "}: InfiniteDoneViewProps) {\n"),
);

// ── ۹) موتور index.tsx — اصل ۲۸۹..۸۰۰ — عیناً بدون dedent ──
const idx = read("index.tsx");
const iLines = idx.split("\n");
const fnStart = iLines.findIndex((l) => l === "export function WordleGame() {");
const depsMark = iLines.findIndex(
  (l) => l === "  }, [playingActive, paused, exitAsk, submitGuess, eraseLetter, typeLetter]);",
);
if (fnStart === -1 || depsMark === -1) throw new Error("index.tsx engine markers not found");
check(
  "موتور index.tsx (اصل ۲۸۹..۸۰۰ — state/refs/استورهای بیرونی/پخ روزانه/فلیپ پله‌ای/finishGame/submitGuess/شروع‌ها/کیبورد فیزیکی — عیناً بدون dedent)",
  slice(289, 800),
  iLines.slice(fnStart, depsMark + 1).join("\n"),
);

// ── ۱۰) هدر مستندات — اصل ۳..۲۳ — عیناً داخل index ──
if (norm(idx).includes(norm(slice(3, 23))))
  pass("هدر مستندات index (اصل ۳..۲۳) — عیناً");
else fail("هدر مستندات index — مغایرت!");

// ── ۱۱) ترتیب شاخه‌ها در index: روزانه-done → playing → بی‌نهایت-done → setup ──
const gDailyDone = idx.indexOf("if (dailyDoneView && dailyToday) {");
const gPlaying = idx.indexOf("if (dailyPlayingView || infinitePlaying) {");
const gInfiniteDone = idx.indexOf('if (phase === "done") {');
const gSetup = idx.indexOf("<SetupPanel");
if (
  gDailyDone !== -1 &&
  gPlaying !== -1 &&
  gInfiniteDone !== -1 &&
  gSetup !== -1 &&
  gDailyDone < gPlaying &&
  gPlaying < gInfiniteDone &&
  gInfiniteDone < gSetup
)
  pass("ترتیب شاخه‌های نما در index — روزانه-done → playing → بی‌نهایت-done → setup (مطابق اصل)");
else fail("ترتیب شاخه‌های نما در index — ناقص!");

// ── ۱۲) سیم‌کشی چهار شاخه با props هم‌نام ──
const wiring = (comp: string, props: string[]) => {
  const i = idx.indexOf(`<${comp}`);
  if (i === -1) return false;
  const region = idx.slice(i, idx.indexOf("/>", i));
  return props.every((p) => region.includes(`${p}={`));
};
const wiringChecks: [string, string[]][] = [
  [
    "SetupPanel",
    ["mode", "setMode", "wordLen", "setWordLen", "dailyToday", "poolsByLen", "bestForLen", "meta", "startDaily", "startInfinite", "tutorialOpen", "handleTutorialOpenChange"],
  ],
  [
    "DailyDoneView",
    ["dailyToday", "dailyAnswer", "answerEntry", "activeAnswer", "isRecord", "finalSecs", "meta", "liveMsg", "startInfinite", "backToSetup", "tutorialOpen", "handleTutorialOpenChange"],
  ],
  [
    "PlayingView",
    ["dailyPlayingView", "activeLen", "activeCommitted", "activeAnswer", "input", "keyStatus", "shakeKey", "revealRow", "flipCols", "meta", "liveMsg", "paused", "togglePause", "muted", "setMuted", "handleHelp", "handleExitClick", "submitGuess", "eraseLetter", "typeLetter", "resume", "exitAsk", "setExitAsk", "confirmExit", "hint", "tutorialOpen", "handleTutorialOpenChange"],
  ],
  [
    "InfiniteDoneView",
    ["guesses", "answer", "isRecord", "finalSecs", "meta", "liveMsg", "startInfinite", "setPhase", "answerEntry", "activeAnswer", "tutorialOpen", "handleTutorialOpenChange"],
  ],
];
for (const [comp, props] of wiringChecks) {
  if (wiring(comp, props))
    pass(`سیم‌کشی ${comp} — هر ${props.length} prop هم‌نام منتقل شد`);
  else fail(`سیم‌کشی ${comp} — prop ناقص!`);
}

// ── ۱۳) «use client» در چهار ماژول .tsx ──
for (const f of ["index.tsx", "setup-panel.tsx", "playing-view.tsx", "done-view.tsx"]) {
  if (read(f).startsWith(`"use client";`)) pass(`${f} — "use client"`);
  else fail(`${f} — "use client" نیست!`);
}

// ── ۱۴) تعاریف جابه‌جاشده دیگر در index نیستند (import شده‌اند) ──
const movedDefs = [
  "const TUTORIAL_STEPS",
  "const KEY_ROWS",
  "const VERDICT_RANK",
  "const VERDICT_FACE",
  "const VERDICT_FA",
  "const GAME_KEY",
  "const WORD_LEN",
  "const MAX_ROWS",
  "const FLIP_STAGGER_MS",
  "const FLIP_SETTLE_MS",
  "const MIN_POOL",
  "const LEVELS",
  "const WORD_RE",
  "function pad2",
  "function todayKey",
  "function shiftDate",
  "function hashStr",
  "function judgeVerdicts",
  "function starsFor",
  "function dailyKeyOf",
  "function streakKeyOf",
  "function loadDailyState",
  "function writeDailyState",
  "function loadDailyStreak",
  "function saveDailyStreak",
  "type Phase =",
  "type Mode =",
  "type WordLevel =",
  "type Verdict =",
  "interface DailyState",
  "interface DailyStreakState",
  "interface BestMoves",
  "interface BestScore",
  "interface MetaSnapshot",
];
for (const d of movedDefs) {
  if (!idx.includes(d)) pass(`«${d}» از index حذف شد (import از ماژول خودش)`);
  else fail(`«${d}» هنوز داخل index تعریف شده!`);
}

// ── ۱۵) index از ۷ ماژول جدید import می‌کند و به فایل قدیمی ارجاع ندارد + نام خروجی ──
const newImports: [string, string][] = [
  ["./types", "import type {"],
  ["./constants", "GAME_KEY"],
  ["./helpers", "judgeVerdicts"],
  ["./daily-store", "writeDailyState"],
  ["./setup-panel", "SetupPanel"],
  ["./playing-view", "PlayingView"],
  ["./done-view", "InfiniteDoneView"],
];
for (const [mod, needle] of newImports) {
  if (idx.includes(`from "${mod}"`)) pass(`index — import از "${mod}"`);
  else fail(`index — import از "${mod}" پیدا نشد!`);
}
if (!idx.includes(`from "./wordle-game"`) && !idx.includes(`import("./wordle-game")`))
  pass("index — بدون import از فایل قدیمی wordle-game (ذکر در کامنت هدر مجاز و الزام تسک است)");
else fail("index — هنوز به wordle-game ارجاع import دارد!");
if (idx.includes("export function WordleGame() {"))
  pass("index — خروجی همان نام WordleGame حفظ شد");
else fail("index — WordleGame خروجی نیست!");

// ── ۱۶) گارد «فایل‌های قدیمی دست‌نخورده» — برخلاف t8b اینجا باید موجود و بدون diff باشند ──
const diffOld = execSync(
  "git diff HEAD -- src/components/book/games/wordle-game.tsx",
  { cwd: CWD, encoding: "utf8" },
);
if (diffOld === "") pass("git diff HEAD -- wordle-game.tsx خالی است (فایل قدیمی دست‌نخورده)");
else fail(`git diff HEAD -- wordle-game.tsx خالی نیست! (${diffOld.split("\n").length} خط)`);
if (existsSync(OLD_FILE)) pass("wordle-game.tsx قدیمی هنوز موجود است (حذف با orchestrator)");
else fail("wordle-game.tsx قدیمی حذف شده — نباید حذف می‌شد!");

const diffHub = execSync("git diff HEAD -- src/components/book/games/games-hub.tsx", {
  cwd: CWD,
  encoding: "utf8",
});
if (diffHub === "") pass("git diff HEAD -- games-hub.tsx خالی است (هاب دست‌نخورده)");
else fail(`git diff HEAD -- games-hub.tsx خالی نیست! (${diffHub.split("\n").length} خط)`);

// ── ۱۷) رشته‌های فارسی — شمارش خط‌های حاوی فارسی در هر برش با ماژول مقصد برابر است ──
const faCount = (s: string) => s.split("\n").filter((l) => /[\u0600-\u06FF]/.test(l)).length;
const pairs: [string, string, string][] = [
  ["types.ts", slice(74, 112), strip(read("types.ts"))],
  ["constants.ts", slice(114, 129), strip(read("constants.ts"))],
  ["helpers.ts", slice(131, 211), strip(read("helpers.ts"))],
  ["daily-store.ts", slice(213, 268), strip(read("daily-store.ts"))],
  ["TUTORIAL_STEPS", slice(270, 287), tutText],
  ["SetupPanel بدنه", slice(1157, 1339), bodyOf(panel, "}: SetupPanelProps) {\n")],
  ["PlayingView بدنه", slice(883, 1079), bodyOf(pview, "}: PlayingViewProps) {\n")],
  ["DailyDoneView بدنه", slice(804, 879), bodyOf(dview, "}: DailyDoneViewProps) {\n")],
  ["InfiniteDoneView بدنه", slice(1083, 1154), bodyOf(dview, "}: InfiniteDoneViewProps) {\n")],
  ["موتور index", slice(289, 800), iLines.slice(fnStart, depsMark + 1).join("\n")],
];
for (const [name, origS, movedS] of pairs) {
  if (faCount(origS) === faCount(movedS))
    pass(`رشته‌های فارسی ${name} — ${faCount(origS)} خط حاوی فارسی، برابر`);
  else
    fail(`رشته‌های فارسی ${name} — اصل ${faCount(origS)} / جدید ${faCount(movedS)}`);
}

// ── ۱۸) سقف خط ماژول‌ها (بزرگ‌ترین < ~۸۵۰) ──
const files = [
  "types.ts",
  "constants.ts",
  "helpers.ts",
  "daily-store.ts",
  "setup-panel.tsx",
  "playing-view.tsx",
  "done-view.tsx",
  "index.tsx",
];
console.log("\n— خط به خط ماژول‌ها (wc -l) —");
let maxLines = 0;
let maxFile = "";
for (const f of files) {
  const n = read(f).split("\n").length;
  if (n > maxLines) {
    maxLines = n;
    maxFile = f;
  }
  console.log(`  ${f}: ${n}`);
}
if (maxLines < 850) pass(`بزرگ‌ترین ماژول ${maxFile} = ${maxLines} خط < ۸۵۰`);
else fail(`بزرگ‌ترین ماژول ${maxFile} = ${maxLines} خط ≥ ۸۵۰!`);

console.log(ok ? "\nهمهٔ صحه‌گذاری‌ها PASS ✓" : "\n⚠ دست‌کم یک صحه‌گذاری FAIL شد!");
process.exit(ok ? 0 : 1);
