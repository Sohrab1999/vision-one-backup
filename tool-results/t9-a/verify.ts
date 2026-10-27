// گام ۹ — صحه‌گذاری بایت‌به‌بایت: بازه‌های `git show HEAD:.../speed-quiz-game.tsx`
// در برابر ماژول‌های جدید games/speed-quiz/ (الگوی tool-results/t8b/verify.ts — پلی‌بوک fps/).
// دلتاهای مجاز: افزودن export/import/"use client"/کامنت هدر + dedent یکنواخت بدنهٔ شاخه‌های
// setup/done (داخل if بودند). فایل اصلی و games-hub هر دو باید دست‌نخورده بمانند (مسئولیت
// re-point/حذف با orchestrator است) — برخلاف t8b، حذف فایل قدیمی «انتظار» است نه خطا.
import { execSync } from "child_process";
import { existsSync, readFileSync } from "fs";

const CWD = "/home/z/my-project";
const OLD = "src/components/book/games/speed-quiz-game.tsx";
const orig = execSync(`git show HEAD:${OLD}`, { cwd: CWD, encoding: "utf8" }).split("\n");
if (orig[orig.length - 1] === "") orig.pop();
if (orig.length !== 1495) throw new Error(`HEAD file: expected 1495 lines, got ${orig.length}`);
const slice = (a: number, b: number) => orig.slice(a - 1, b).join("\n");

const dir = `${CWD}/src/components/book/games/speed-quiz`;
const read = (f: string) => readFileSync(`${dir}/${f}`, "utf8");

const norm = (s: string) =>
  s
    .split("\n")
    .map((l) => l.replace(/\s+$/g, ""))
    .filter((l) => l.trim().length > 0)
    .join("\n");
// برای بدنه‌های dedent‌شده — تورفتگی ابتدای خط بی‌اثر است (رندر JSX یکسان)
const normLoose = (s: string) =>
  s
    .split("\n")
    .map((l) => l.replace(/^\s+/g, "").replace(/\s+$/g, ""))
    .filter((l) => l.length > 0)
    .join("\n");

let ok = true;
const check = (name: string, origS: string, moved: string, mode: "raw" | "norm" | "loose" = "norm") => {
  const normed = (s: string) => (mode === "loose" ? normLoose(s) : mode === "norm" ? norm(s) : s);
  const na = normed(origS);
  const nb = normed(moved);
  if (na === nb) {
    console.log(`✓ ${name} — مطابقت: ${na.split("\n").length} خط عیناً`);
  } else {
    ok = false;
    console.error(`✗ ${name} — مغایرت! (اصل ${na.split("\n").length} خط / جدید ${nb.split("\n").length} خط)`);
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

/** حذف پسوند export (تنها دلتای مجاز وقتی همه exportها تازه‌اند) */
const strip = (s: string): string =>
  stripImports(s)
    .split("\n")
    .map((l) => l.replace(/^export (async function|function|const|type|interface) /, "$1 "))
    .join("\n");

/** بدنهٔ آخرین کامپوننت فایل (از پایان امضای props تا آخرین «}» فایل) */
const lastBody = (s: string, marker: string): string => {
  const i = s.indexOf(marker);
  if (i === -1) throw new Error(`marker not found: ${marker.slice(0, 40)}`);
  const j = s.lastIndexOf("\n}");
  if (j === -1 || j <= i) throw new Error("closing brace not found");
  return s.slice(i + marker.length, j);
};

// ── ۱) types.ts — اصل ۱۲۰..۱۳۳ + ۲۷۲..۲۷۶ (دلتا: export برای همهٔ اعلان‌ها) ──
check(
  "types.ts (اصل ۱۲۰..۱۳۳ + ۲۷۲..۲۷۶ — تنها تغییر: export)",
  `${slice(120, 133)}\n${slice(272, 276)}`,
  strip(read("types.ts")),
);

// ── ۲) helpers.ts — اصل ۱۳۵..۲۳۴ (دلتا: export روی ۷ تابع؛ Rank خصوصی می‌ماند) ──
check(
  "helpers.ts (اصل ۱۳۵..۲۳۴ — scopeOf/scopeFor/quizKeyOf/shapeOptions/smartOrderDeck/Rank/rankOf/lessonLabel)",
  slice(135, 234),
  strip(read("helpers.ts")),
);

// ── ۳) ai.ts — اصل ۲۷۸..۴۱۶ (بخش کامل G5-02؛ دلتا: export روی ۵ عضو مصرفی بیرون) ──
check(
  "ai.ts (اصل ۲۷۸..۴۱۶ — ثابت‌های AI/AiQuestion/AiQuizSeed/isAiSeed/isAiQuestionShape/fetchAiQuestions/aiNorm/aiQuestionsToSeeds)",
  slice(278, 416),
  strip(read("ai.ts")),
);

/** یافتن ایندکس از نقطهٔ مشخص (Array.findIndex ازIndex ندارد) */
const findFrom = (lines: string[], pred: (l: string) => boolean, from: number) => {
  for (let i = Math.max(0, from); i < lines.length; i++) if (pred(lines[i]!)) return i;
  return -1;
};

// ── ۴) TUTORIAL_STEPS — اصل ۲۳۶..۲۵۳ → setup-panel.tsx (تنها تغییر: export const) ──
const panel = read("setup-panel.tsx");
const pLines = panel.split("\n");
const tutStart = pLines.findIndex((l) => l.startsWith("/** آموزش ۳-گامی استاندارد"));
const tutEnd = findFrom(pLines, (l) => l === "];", tutStart);
if (tutStart === -1 || tutEnd === -1) {
  ok = false;
  console.error("✗ TUTORIAL_STEPS — مارکر پیدا نشد!");
} else {
  const tutText = pLines
    .slice(tutStart, tutEnd + 1)
    .join("\n")
    .replace("export const TUTORIAL_STEPS", "const TUTORIAL_STEPS");
  check("TUTORIAL_STEPS (اصل ۲۳۶..۲۵۳ — تنها تغییر: export const)", slice(236, 253), tutText, "raw");
}

// ── ۵) chipCls — اصل ۱۰۵۵..۱۰۶۱ → setup-panel.tsx (عیناً بدون dedent) ──
const chipStart = pLines.findIndex((l) => l.startsWith("  const chipCls = (active: boolean) =>"));
const chipEnd = findFrom(pLines, (l) => l === "    );", chipStart);
if (chipStart === -1 || chipEnd === -1) {
  ok = false;
  console.error("✗ chipCls — مارکر پیدا نشد!");
} else {
  check("chipCls (اصل ۱۰۵۵..۱۰۶۱ — عیناً)", slice(1055, 1061), pLines.slice(chipStart, chipEnd + 1).join("\n"), "raw");
}

// ── ۶) بدنهٔ شاخهٔ setup — اصل ۱۰۶۵..۱۲۶۲ → SetupPanel (modulo dedent یکنواخت ۲) ──
check(
  "SetupPanel بدنه (اصل ۱۰۶۵..۱۲۶۲ — return + Card/TutorialOverlay، modulo dedent)",
  slice(1065, 1262),
  lastBody(panel, "}: SetupPanelProps) {\n"),
  "loose",
);

// ── ۷) بدنهٔ شاخهٔ done — اصل ۱۲۶۸..۱۲۸۹ → DoneView (modulo dedent یکنواخت ۲) ──
const dview = read("done-view.tsx");
check(
  "DoneView بدنه (اصل ۱۲۶۸..۱۲۸۹ — rank/acc/stars/finalScore + ResultScreen، modulo dedent)",
  slice(1268, 1289),
  lastBody(dview, "}: DoneViewProps) {\n"),
  "loose",
);

// ── ۸) COMBO_FIRE_CSS — اصل ۲۵۵..۲۷۰ → playing-view.tsx (عیناً بدون dedent) ──
const pview = read("playing-view.tsx");
const pvLines = pview.split("\n");
const cssStart = pvLines.findIndex((l) => l.startsWith(" * فاز G2-c — CSS افکت بصری واحد بج کمبو"));
if (cssStart === -1) {
  ok = false;
  console.error("✗ COMBO_FIRE_CSS — مارکر پیدا نشد!");
} else {
  const cssBlockStart = cssStart - 1; // خط /**
  const cssEnd = findFrom(pvLines, (l) => l === "`;", cssStart);
  if (cssBlockStart < 0 || cssEnd === -1) {
    ok = false;
    console.error("✗ COMBO_FIRE_CSS — مرز بلاک پیدا نشد!");
  } else {
    check("COMBO_FIRE_CSS (اصل ۲۵۵..۲۷۰ — عیناً)", slice(255, 270), pvLines.slice(cssBlockStart, cssEnd + 1).join("\n"), "raw");
  }
}

// ── ۹) بدنهٔ شاخهٔ playing — اصل ۱۲۹۴..۱۴۹۴ → PlayingView (عیناً بدون dedent) ──
check(
  "PlayingView بدنه (اصل ۱۲۹۴..۱۴۹۴ — isEndless/pct/urgent + GameShell + کارت سؤال + اورلی توقف + نگهبان + آموزش — عیناً)",
  slice(1294, 1494),
  lastBody(pview, "}: PlayingViewProps) {\n"),
  "raw",
);

// ── ۱۰) موتور index.tsx — اصل ۴۱۸..۱۰۵۳ — عیناً بدون dedent ──
const idx = read("index.tsx");
const iLines = idx.split("\n");
const fnStart = iLines.findIndex((l) => l === "export function SpeedQuizGame() {");
if (fnStart === -1) {
  ok = false;
  console.error("✗ موتور index — مارکر پیدا نشد!");
} else {
  check(
    "موتور index.tsx (اصل ۴۱۸..۱۰۵۳ — state/refs/جریان بازی/effectها — عیناً بدون dedent)",
    slice(418, 1053),
    iLines.slice(fnStart, fnStart + 636).join("\n"),
    "raw",
  );
}

// ── ۱۱) هدر مستندات — اصل ۳..۴۸ — عیناً داخل index ──
if (norm(idx).includes(norm(slice(3, 48)))) {
  console.log("✓ هدر مستندات index (اصل ۳..۴۸) — عیناً");
} else {
  ok = false;
  console.error("✗ هدر مستندات index — مغایرت!");
}

// ── ۱۲) گارد نهایی + سیم‌کشی سه شاخه با props هم‌نام ──
const idxNorm = norm(idx);
if (idxNorm.includes("if (!q) return null;")) {
  console.log("✓ گارد «if (!q) return null;» بین setup/done و playing حفظ شد");
} else {
  ok = false;
  console.error("✗ گارد نهایی پیدا نشد!");
}
const wiring = (comp: string, props: string[]) => {
  const i = idx.indexOf(`<${comp}`);
  if (i === -1) return false;
  const region = idx.slice(i, idx.indexOf("/>", i));
  return props.every((p) => region.includes(`${p}={`));
};
const wiringChecks: [string, string[]][] = [
  [
    "SetupPanel",
    ["lesson", "setLesson", "cat", "setCat", "duration", "setDuration", "lessons", "countFor", "level", "changeLevel", "totalSecs", "weakCount", "best", "aiOn", "setAiOn", "beginRound", "pendingMode", "tutorialOpen", "handleTutorialOpenChange"],
  ],
  ["DoneView", ["score", "mode", "level", "answered", "correct", "wrongList", "isRecord", "maxCombo", "beginRound", "setPhase"]],
  [
    "PlayingView",
    ["q", "mode", "timeLeft", "totalSecs", "elapsed", "score", "combo", "multiplier", "qNum", "liveMsg", "paused", "resume", "togglePause", "muted", "setMuted", "exitAsk", "setExitAsk", "finishEndless", "sessionRef", "overRef", "setPhase", "answer", "skip", "flash", "handleHelp", "handleExitClick", "tutorialOpen", "handleTutorialOpenChange"],
  ],
];
for (const [comp, props] of wiringChecks) {
  if (wiring(comp, props)) console.log(`✓ سیم‌کشی ${comp} — هر ${props.length} prop هم‌نام منتقل شد`);
  else {
    ok = false;
    console.error(`✗ سیم‌کشی ${comp} — prop ناقص!`);
  }
}

// ── ۱۳) تعاریف جابه‌جاشده دیگر در index نیستند (import شده‌اند) ──
const movedDefs = [
  "const TUTORIAL_STEPS",
  "const COMBO_FIRE_CSS",
  "const chipCls",
  "function scopeOf",
  "function scopeFor",
  "function quizKeyOf",
  "function shapeOptions",
  "function smartOrderDeck",
  "function rankOf",
  "function lessonLabel",
  "function isAiSeed",
  "async function fetchAiQuestions",
  "function aiQuestionsToSeeds",
  "const AI_COUNT",
  "const AI_TIMEOUT_MS",
  "const AI_MIN_POOL",
  "const AI_POOL_SAMPLE",
  "interface AiQuestion",
  "interface BestRecord",
  "interface WrongItem",
  "interface Rank",
  "type Phase =",
  "type CatKey =",
  "type RoundMode =",
  "const DURATIONS",
];
for (const d of movedDefs) {
  if (!idx.includes(d)) console.log(`✓ «${d}» از index حذف شد (import از ماژول خودش)`);
  else {
    ok = false;
    console.error(`✗ «${d}» هنوز داخل index تعریف شده!`);
  }
}

// ── ۱۴) «use client» در چهار ماژول .tsx ──
for (const f of ["index.tsx", "setup-panel.tsx", "done-view.tsx", "playing-view.tsx"]) {
  if (read(f).startsWith(`"use client";`)) console.log(`✓ ${f} — "use client"`);
  else {
    ok = false;
    console.error(`✗ ${f} — "use client" نیست!`);
  }
}

// ── ۱۵) مسیر importها: داخلی فقط «./» بین ماژول‌های خود بازی؛ بیرونی «../shared|../kit/*|@/*» ──
const localAllowed = new Set(["./types", "./helpers", "./ai", "./setup-panel", "./done-view", "./playing-view"]);
let importsOk = true;
for (const f of ["types.ts", "helpers.ts", "ai.ts", "setup-panel.tsx", "done-view.tsx", "playing-view.tsx", "index.tsx"]) {
  for (const m of read(f).matchAll(/from "([^"]+)"/g)) {
    const p = m[1]!;
    const bad =
      p === "./shared" ||
      p.startsWith("./kit/") ||
      (p.startsWith("./") && !localAllowed.has(p)) ||
      (p.startsWith("../") && !p.startsWith("../kit/") && p !== "../shared") ||
      p.includes("speed-quiz-game");
    if (bad) {
      importsOk = false;
      console.error(`✗ ${f}: مسیر نامعتبر «${p}»`);
    }
  }
}
if (importsOk) console.log("✓ مسیر importهای هر ۷ ماژول — داخلی «./» و بیرونی «../kit|../shared|@/» مطابق قرارداد");

// ── ۱۶) فایل قدیمی دست‌نخورده (git diff خالی) + games-hub دست‌خورده ──
const diffOld = execSync(`git diff HEAD -- ${OLD}`, { cwd: CWD, encoding: "utf8" });
if (diffOld === "") console.log("✓ git diff HEAD — speed-quiz-game.tsx دست‌نخورده (خالی)");
else {
  ok = false;
  console.error(`✗ فایل قدیمی تغییر کرده! (${diffOld.split("\n").length} خط diff)`);
}
const diffHub = execSync("git diff HEAD -- src/components/book/games/games-hub.tsx", { cwd: CWD, encoding: "utf8" });
if (diffHub === "") console.log("✓ git diff HEAD — games-hub.tsx دست‌نخورده (خالی)");
else {
  ok = false;
  console.error(`✗ games-hub.tsx تغییر کرده! (${diffHub.split("\n").length} خط diff)`);
}
if (existsSync(`${CWD}/${OLD}`)) {
  console.log("✓ speed-quiz-game.tsx قدیمی سر جایش است (حذف با orchestrator)");
} else {
  ok = false;
  console.error("✗ فایل قدیمی حذف شده — این گام اجازهٔ حذف نداشت!");
}
const hub = readFileSync(`${CWD}/src/components/book/games/games-hub.tsx`, "utf8");
const hubRefs = hub.match(/import\("\.\/speed-quiz-game"\)/g) ?? [];
if (hubRefs.length === 2) console.log("✓ games-hub.tsx — هر دو ارجاع dynamic به ./speed-quiz-game حفظ شده (re-point با orchestrator)");
else {
  ok = false;
  console.error(`✗ games-hub.tsx — انتظار ۲ ارجاع، یافت ${hubRefs.length}`);
}

// ── ۱۷) رشته‌های فارسی — شمارش خط‌های حاوی فارسی در هر برش با ماژول مقصد برابر است ──
const faCount = (s: string) => s.split("\n").filter((l) => /[\u0600-\u06FF]/.test(l)).length;
const faPairs: [string, string, string][] = [
  ["types.ts", `${slice(120, 133)}\n${slice(272, 276)}`, strip(read("types.ts"))],
  ["helpers.ts", slice(135, 234), strip(read("helpers.ts"))],
  ["ai.ts", slice(278, 416), strip(read("ai.ts"))],
  ["TUTORIAL_STEPS", slice(236, 253), tutTextSafe(pLines)],
  ["SetupPanel بدنه", slice(1065, 1262), lastBody(panel, "}: SetupPanelProps) {\n")],
  ["DoneView بدنه", slice(1268, 1289), lastBody(dview, "}: DoneViewProps) {\n")],
  ["COMBO_FIRE_CSS", slice(255, 270), pvLines.slice(cssStartSafe(pvLines), cssEndSafe(pvLines)).join("\n")],
  ["PlayingView بدنه", slice(1294, 1494), lastBody(pview, "}: PlayingViewProps) {\n")],
  ["موتور index", slice(418, 1053), iLines.slice(fnStart, fnStart + 636).join("\n")],
];
for (const [name, origS, movedS] of faPairs) {
  if (faCount(origS) === faCount(movedS)) console.log(`✓ رشته‌های فارسی ${name} — ${faCount(origS)} خط حاوی فارسی، برابر`);
  else {
    ok = false;
    console.error(`✗ رشته‌های فارسی ${name} — اصل ${faCount(origS)} / جدید ${faCount(movedS)}`);
  }
}

// ── گزارش خط هر ماژول ──
console.log("\n— خط به خط ماژول‌ها (wc -l) —");
for (const f of ["types.ts", "helpers.ts", "ai.ts", "setup-panel.tsx", "done-view.tsx", "playing-view.tsx", "index.tsx"]) {
  const n = read(f).split("\n").length - 1;
  console.log(`  ${f}: ${n}`);
}
const biggest = Math.max(...["types.ts", "helpers.ts", "ai.ts", "setup-panel.tsx", "done-view.tsx", "playing-view.tsx", "index.tsx"].map((f) => read(f).split("\n").length - 1));
if (biggest <= 850) console.log(`✓ بزرگ‌ترین ماژول ${biggest} خط — زیر سقف ~۸۵۰`);
else {
  ok = false;
  console.error(`✗ بزرگ‌ترین ماژول ${biggest} خط — بالای سقف ۸۵۰!`);
}

console.log(ok ? "\nهمهٔ صحه‌گذاری‌ها OK ✓" : "\n⚠ مغایرت!");
process.exit(ok ? 0 : 1);

// ── کمک‌تابع‌های امن برای بخش فارسی (بدون شکستن جریان اصلی) ──
function tutTextSafe(lines: string[]): string {
  const a = lines.findIndex((l) => l.startsWith("/** آموزش ۳-گامی استاندارد"));
  const b = lines.findIndex((l) => l === "];");
  if (a === -1 || b === -1) return "";
  return lines.slice(a, b + 1).join("\n").replace("export const TUTORIAL_STEPS", "const TUTORIAL_STEPS");
}
function cssStartSafe(lines: string[]): number {
  const a = lines.findIndex((l) => l.startsWith(" * فاز G2-c — CSS افکت بصری واحد بج کمبو"));
  return a > 0 ? a - 1 : 0;
}
function cssEndSafe(lines: string[]): number {
  const a = lines.findIndex((l) => l === "`;");
  return a === -1 ? 0 : a;
}
