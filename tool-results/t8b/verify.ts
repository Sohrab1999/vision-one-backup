// گام ۸-B — صحه‌گذاری بایت‌به‌بایت: بازه‌های `git show HEAD:.../snakes-ladders-game.tsx`
// در برابر ماژول‌های جدید games/snakes-ladders/ (الگوی tool-results/t8a/verify.ts).
// دلتاهای مجاز: افزودن export/import/"use client"/کامنت هدر + dedent بدنهٔ شاخه‌های setup/done.
// توجه: فایل اصلی HEAD = ۱۶۳۷ خط (wc -l).
import { execSync } from "child_process";
import { readFileSync, existsSync } from "fs";

const CWD = "/home/z/my-project";
const orig = execSync("git show HEAD:src/components/book/games/snakes-ladders-game.tsx", {
  cwd: CWD,
  encoding: "utf8",
}).split("\n");
if (orig[orig.length - 1] === "") orig.pop();
if (orig.length !== 1637) throw new Error(`HEAD file: expected 1637 lines, got ${orig.length}`);
const slice = (a: number, b: number) => orig.slice(a - 1, b).join("\n");

const dir = `${CWD}/src/components/book/games/snakes-ladders`;
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
const check = (name: string, origS: string, moved: string, loose = false) => {
  const na = loose ? normLoose(origS) : norm(origS);
  const nb = loose ? normLoose(moved) : norm(moved);
  if (na === nb) {
    console.log(`✓ ${name} — مطابقت: ${na.split("\n").length} خط عیناً`);
  } else {
    ok = false;
    console.error(
      `✗ ${name} — مغایرت! (اصل ${na.split("\n").length} خط / جدید ${nb.split("\n").length} خط)`,
    );
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

/** مثل t8a: حذف هدر + importها + پس‌وند export (تنها دلتای مجاز وقتی همه exportها تازه‌اند) */
const strip = (s: string): string =>
  stripImports(s)
    .split("\n")
    .map((l) => l.replace(/^export (type|const|interface|function) /, "$1 "))
    .join("\n");

/** بدنهٔ آخرین کامپوننت فایل (از پایان امضای props تا آخرین «}» فایل) */
const lastBody = (s: string, marker: string): string => {
  const i = s.indexOf(marker);
  if (i === -1) throw new Error(`marker not found: ${marker.slice(0, 40)}`);
  const j = s.lastIndexOf("\n}");
  if (j === -1 || j <= i) throw new Error("closing brace not found");
  return s.slice(i + marker.length, j);
};

// ── ۱) types.ts — اصل ۱۲۸..۱۴۸ + ۱۹۵..۲۳۴ (دلتا: export برای همهٔ اعلان‌ها) ──
check(
  "types.ts (اصل ۱۲۸..۱۴۸ + ۱۹۵..۲۳۴ — تنها تغییر: export)",
  `${slice(128, 148)}\n${slice(195, 234)}`,
  strip(read("types.ts")),
);

// ── ۲) helpers.ts — اصل ۱۵۰..۱۹۴ + ۲۳۶..۳۴۲ + ۳۴۴..۳۵۲ (دلتا: export ۱۰ عضو) ──
check(
  "helpers.ts (اصل ۱۵۰..۱۹۴ + ۲۳۶..۳۴۲ + ۳۴۴..۳۵۲ — export/تغییر نام ندارند؛ vsBotSession/clampBotSkill/cellCenter/snakePath/ladderGeom خصوصی می‌مانند)",
  `${slice(150, 194)}\n${slice(236, 342)}\n${slice(344, 352)}`,
  strip(read("helpers.ts")),
);

// ── ۳) TUTORIAL_STEPS — اصل ۳۵۴..۳۷۱ → setup-panel.tsx (تنها تغییر: export const) ──
const panel = read("setup-panel.tsx");
const pLines = panel.split("\n");
const tutStart = pLines.findIndex((l) => l.startsWith("/** فاز G2-e-1 — آموزش ۳-گامی استاندارد"));
const tutEnd = pLines.findIndex((l) => l === "];");
const tutText = pLines.slice(tutStart, tutEnd + 1).join("\n").replace("export const TUTORIAL_STEPS", "const TUTORIAL_STEPS");
check(
  "TUTORIAL_STEPS (اصل ۳۵۴..۳۷۱ — تنها تغییر: export const)",
  slice(354, 371),
  tutText,
);

// ── ۴) بدنهٔ شاخهٔ setup — اصل ۱۰۱۷..۱۱۹۷ → SetupPanel (chipCls + return — modulo dedent) ──
check(
  "SetupPanel بدنه (اصل ۱۰۱۷..۱۱۹۷ — chipCls + return، modulo dedent)",
  slice(1017, 1197),
  lastBody(panel, "}: SetupPanelProps) {\n"),
  true,
);

// ── ۵) بدنهٔ شاخهٔ done — اصل ۱۲۰۲..۱۲۸۱ → DoneView (wp/stars + ResultScreen + کارنامه — modulo dedent) ──
const dview = read("done-view.tsx");
check(
  "DoneView بدنه (اصل ۱۲۰۲..۱۲۸۱ — confetti + ResultScreen + کارنامهٔ بازیکن‌ها، modulo dedent)",
  slice(1202, 1281),
  lastBody(dview, "}: DoneViewProps) {\n"),
  true,
);

// ── ۶) بدنهٔ شاخهٔ playing — اصل ۱۲۸۶..۱۶۳۶ → PlayingView (عیناً بدون dedent) ──
const pview = read("playing-view.tsx");
check(
  "PlayingView بدنه (اصل ۱۲۸۶..۱۶۳۶ — cp/locked + GameShell + کارت سؤال + تاس سه‌بعدی + تختهٔ SVG + لایهٔ مهره + توقف/نگهبان/مدرس — عیناً)",
  slice(1286, 1636),
  lastBody(pview, "}: PlayingViewProps) {\n"),
);

// ── ۷) موتور index.tsx — اصل ۳۷۳..۱۰۱۳ — عیناً بدون dedent ──
const idx = read("index.tsx");
const iLines = idx.split("\n");
const fnStart = iLines.findIndex((l) => l === "export function SnakesLaddersGame() {");
const setupMark = iLines.findIndex((l) => l.includes("── Setup ──"));
if (fnStart === -1 || setupMark === -1) throw new Error("index.tsx markers not found");
check(
  "موتور index.tsx (اصل ۳۷۳..۱۰۱۳ — state/refs/زنجیرهٔ بی‌توقف/جریان بازی/effectها — عیناً بدون dedent)",
  slice(373, 1013),
  iLines.slice(fnStart, setupMark - 1).join("\n"),
);

// ── ۸) هدر مستندات — اصل ۳..۶۰ — عیناً داخل index ──
if (norm(idx).includes(norm(slice(3, 60)))) {
  console.log("✓ هدر مستندات index (اصل ۳..۶۰) — عیناً");
} else {
  ok = false;
  console.error("✗ هدر مستندات index — مغایرت!");
}

// ── ۹) گارد نهایی + سیم‌کشی سه شاخه با props هم‌نام ──
const idxNorm = norm(idx);
if (idxNorm.includes('if (!q || players.length === 0) return null;')) {
  console.log("✓ گارد «if (!q || players.length === 0) return null;» بین setup/done و playing حفظ شد");
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
    ["mode", "setMode", "count", "setCount", "names", "setNames", "lesson", "setLesson", "cat", "setCat", "lessons", "countFor", "pool", "best", "start", "tutorialOpen", "handleTutorialOpenChange"],
  ],
  ["DoneView", ["winner", "players", "stats", "journey", "isRecord", "qNum", "rolls", "secs", "start", "setPhase"]],
  [
    "PlayingView",
    ["q", "players", "positions", "cur", "reveal", "diceFace", "dicePop", "slideMs", "pulse", "mode", "liveMsg", "qNum", "secs", "paused", "resume", "togglePause", "muted", "setMuted", "exitAsk", "setExitAsk", "confirmExit", "handleHelp", "handleExitClick", "answerHuman", "tutorialOpen", "handleTutorialOpenChange", "hint"],
  ],
];
for (const [comp, props] of wiringChecks) {
  if (wiring(comp, props)) console.log(`✓ سیم‌کشی ${comp} — هر ${props.length} prop هم‌نام منتقل شد`);
  else {
    ok = false;
    console.error(`✗ سیم‌کشی ${comp} — prop ناقص!`);
  }
}

// ── ۱۰) «use client» در چهار ماژول .tsx ──
for (const f of ["index.tsx", "setup-panel.tsx", "done-view.tsx", "playing-view.tsx"]) {
  if (read(f).startsWith(`"use client";`)) console.log(`✓ ${f} — "use client"`);
  else {
    ok = false;
    console.error(`✗ ${f} — "use client" نیست!`);
  }
}

// ── ۱۱) تعاریف جابه‌جاشده دیگر در index نیستند (import شده‌اند) ──
const movedDefs = ["const TUTORIAL_STEPS", "const TOKEN_BG", "const DICE_ICONS", "const CELL_POS", "const SNAKE_PATHS", "const LADDER_GEOMS", "const CUBE_FACES", "const CONFETTI", "function cubeTransform", "function lessonLabel", "function wrongIndexOf", "function computeAdaptiveBotSkill", "function recordVsBotSessionResult", "const vsBotSession", "function clampBotSkill"];
for (const d of movedDefs) {
  if (!idx.includes(d)) console.log(`✓ «${d}» از index حذف شد (import از ماژول خودش)`);
  else {
    ok = false;
    console.error(`✗ «${d}» هنوز داخل index تعریف شده!`);
  }
}

// ── ۱۲) games-hub: re-point به ./snakes-ladders + حذف فایل قدیمی ──
const hub = readFileSync(`${CWD}/src/components/book/games/games-hub.tsx`, "utf8");
const hubOk =
  (hub.match(/import\("\.\/snakes-ladders"\)/g) ?? []).length === 2 && !hub.includes("snakes-ladders-game");
if (hubOk) console.log("✓ games-hub.tsx — هر دو ارجاع به ./snakes-ladders؛ بدون ارجاع کهنه");
else {
  ok = false;
  console.error("✗ games-hub.tsx — re-point ناقص!");
}
if (!existsSync(`${CWD}/src/components/book/games/snakes-ladders-game.tsx`)) {
  console.log("✓ snakes-ladders-game.tsx قدیمی حذف شد");
} else {
  ok = false;
  console.error("✗ فایل قدیمی هنوز وجود دارد!");
}

// ── ۱۳) رشته‌های فارسی — شمارش خط‌های حاوی فارسی در هر برش با ماژول مقصد برابر است ──
const faCount = (s: string) => s.split("\n").filter((l) => /[\u0600-\u06FF]/.test(l)).length;
const pairs: [string, string, string][] = [
  ["TUTORIAL_STEPS", slice(354, 371), tutText],
  ["SetupPanel بدنه", slice(1017, 1197), lastBody(panel, "}: SetupPanelProps) {\n")],
  ["DoneView بدنه", slice(1202, 1281), lastBody(dview, "}: DoneViewProps) {\n")],
  ["PlayingView بدنه", slice(1286, 1636), lastBody(pview, "}: PlayingViewProps) {\n")],
  ["موتور index", slice(373, 1013), iLines.slice(fnStart, setupMark - 1).join("\n")],
];
for (const [name, origS, movedS] of pairs) {
  if (faCount(origS) === faCount(movedS)) console.log(`✓ رشته‌های فارسی ${name} — ${faCount(origS)} خط حاوی فارسی، برابر`);
  else {
    ok = false;
    console.error(`✗ رشته‌های فارسی ${name} — اصل ${faCount(origS)} / جدید ${faCount(movedS)}`);
  }
}

// ── گزارش خط هر ماژول ──
console.log("\n— خط به خط ماژول‌ها (wc -l) —");
for (const f of ["types.ts", "helpers.ts", "setup-panel.tsx", "done-view.tsx", "playing-view.tsx", "index.tsx"]) {
  const n = read(f).split("\n").length;
  console.log(`  ${f}: ${n}`);
}

console.log(ok ? "\nهمهٔ صحه‌گذاری‌ها OK ✓" : "\n⚠ مغایرت!");
process.exit(ok ? 0 : 1);
