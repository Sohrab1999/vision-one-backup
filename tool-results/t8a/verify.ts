// گام ۸-A — صحه‌گذاری بایت‌به‌بایت: بازه‌های `git show HEAD:.../crossword-game.tsx`
// در برابر ماژول‌های جدید games/crossword/ (الگوی tool-results/t7/verify.ts).
// دلتاهای مجاز: افزودن export/import/"use client"/کامنت هدر + dedent بدنهٔ شاخه‌ها.
// توجه: فایل اصلی HEAD = ۱۶۷۵ خط (wc -l؛ نمایش Read یک خط ۱۶۷۶م خیالی از newline پایانی می‌سازد).
import { execSync } from "child_process";
import { readFileSync, existsSync } from "fs";

const CWD = "/home/z/my-project";
const orig = execSync("git show HEAD:src/components/book/games/crossword-game.tsx", {
  cwd: CWD,
  encoding: "utf8",
}).split("\n");
if (orig[orig.length - 1] === "") orig.pop();
if (orig.length !== 1675) throw new Error(`HEAD file: expected 1675 lines, got ${orig.length}`);
const slice = (a: number, b: number) => orig.slice(a - 1, b).join("\n");

const dir = `${CWD}/src/components/book/games/crossword`;
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

const between = (s: string, a: string, b: string): string => {
  const i = s.indexOf(a);
  if (i === -1) throw new Error(`marker A not found: ${a.slice(0, 40)}`);
  const j = s.indexOf(b, i + a.length);
  if (j === -1) throw new Error(`marker B not found: ${b.slice(0, 40)}`);
  return s.slice(i + a.length, j);
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
      lines[i]!.startsWith("*") ||
      lines[i]!.startsWith(" *") ||
      lines[i]!.startsWith("*/"))
  )
    i++;
  while (i < lines.length && lines[i]!.startsWith("import ")) {
    while (i < lines.length && !/;$/.test(lines[i]!.replace(/\s+$/, ""))) i++;
    i++;
  }
  return lines.slice(i).join("\n");
};

/** مثل t7: حذف هدر + importها + پس‌وند export (تنها دلتای مجاز وقتی همه exportها تازه‌اند) */
const strip = (s: string): string =>
  stripImports(s)
    .split("\n")
    .map((l) => l.replace(/^export (type|const|interface|function) /, "$1 "))
    .join("\n");

// ── ۱) generator.ts — اصل ۸۵..۳۳۳ (دلتا: export برای cellKey/parseKey/draftCellKey) ──
const gen = read("generator.ts");
const genLines = gen.split("\n");
const cellsIdx = genLines.findIndex((l) => l.startsWith("export const cellsOf"));
if (cellsIdx === -1) throw new Error("cellsOf not found in generator.ts");
const genMain = stripImports(genLines.slice(0, cellsIdx).join("\n"));
const genMainOrig = slice(85, 333)
  .replace("const cellKey = ", "export const cellKey = ")
  .replace("const parseKey = ", "export const parseKey = ")
  .replace("const draftCellKey = ", "export const draftCellKey = ");
check("generator.ts — بدنهٔ الگوریتم (اصل ۸۵..۳۳۳ + export سه کلید)", genMainOrig, genMain);

// ── ۲) cellsOf — اصل ۶۹۲..۶۹۶ → انتهای generator.ts (dedent + export) ──
check(
  "generator.ts — cellsOf (اصل ۶۹۲..۶۹۶ — dedent + export)",
  slice(692, 696),
  genLines
    .slice(cellsIdx)
    .join("\n")
    .replace("export const cellsOf", "const cellsOf"),
  true,
);

// ── ۳) types.ts — اصل ۳۳۷..۳۴۲ + ۵۱۵..۵۲۵ (تنها تغییر: export) ──
check(
  "types.ts (اصل ۳۳۷..۳۴۲ + ۵۱۵..۵۲۵ — تنها تغییر: export)",
  `${slice(337, 342)}\n${slice(515, 525)}`,
  strip(read("types.ts")),
);

// ── ۴) draft.ts — اصل ۳۴۵..۵۱۳ (هدر = کامنت بخش اصل ۳۴۴؛ تنها تغییر: export/import) ──
check("draft.ts (اصل ۳۴۵..۵۱۳ — تنها تغییر: export + import)", slice(345, 513), strip(read("draft.ts")));

// ── ۵) TUTORIAL_STEPS — اصل ۵۲۷..۵۴۴ → setup-panel.tsx (تنها تغییر: export const) ──
const panel = read("setup-panel.tsx");
const pLines = panel.split("\n");
const tutStart = pLines.findIndex((l) => l.startsWith("/** فاز G2-d — آموزش ۳-گامی استاندارد"));
const tutEnd = pLines.findIndex((l) => l === "];");
check(
  "TUTORIAL_STEPS (اصل ۵۲۷..۵۴۴ — تنها تغییر: export const)",
  slice(527, 544),
  pLines.slice(tutStart, tutEnd + 1).join("\n").replace("export const TUTORIAL_STEPS", "const TUTORIAL_STEPS"),
);

// ── ۶) بدنهٔ شاخهٔ setup — اصل ۱۲۲۱..۱۳۷۰ → SetupPanel (modulo dedent) ──
check(
  "SetupPanel بدنه (اصل ۱۲۲۱..۱۳۷۰ — draftLessonLabel/draftFilled/chipCls + return، modulo dedent)",
  slice(1221, 1370),
  between(panel, "}: SetupPanelProps) {\n", "\n}"),
  true,
);

// ── ۷) بدنهٔ شاخهٔ done — اصل ۱۳۷۷..۱۴۰۸ → DoneView (stars + ResultScreen — modulo dedent) ──
const dview = read("done-view.tsx");
check(
  "DoneView بدنه (اصل ۱۳۷۷..۱۴۰۸ — stars + ResultScreen، modulo dedent)",
  slice(1377, 1408),
  between(dview, "}: DoneViewProps) {\n", "\n}"),
  true,
);

// ── ۸) بدنهٔ شاخهٔ playing — اصل ۱۴۱۱..۱۶۷۴ → PlayingView (عیناً بدون dedent) ──
const pview = read("playing-view.tsx");
check(
  "PlayingView بدنه (اصل ۱۴۱۱..۱۶۷۴ — clueButton + GameShell + جدول + کیبورد + توقف/نگهبان/آموزش — عیناً)",
  slice(1411, 1674),
  between(pview, "}: PlayingViewProps) {\n", "\n}"),
);

// ── ۹) موتور index.tsx — اصل ۵۴۶..۱۲۱۷ منهای cellsOf (۶۹۲..۶۹۶) — عیناً بدون dedent ──
const idx = read("index.tsx");
const iLines = idx.split("\n");
const fnStart = iLines.findIndex((l) => l === "export function CrosswordGame() {");
const setupMark = iLines.findIndex((l) => l.includes("── Setup ──"));
if (fnStart === -1 || setupMark === -1) throw new Error("index.tsx markers not found");
check(
  "موتور index.tsx (اصل ۵۴۶..۱۲۱۷ منهای cellsOf ۶۹۲..۶۹۶ — عیناً بدون dedent)",
  `${slice(546, 691)}\n${slice(697, 1217)}`,
  iLines.slice(fnStart, setupMark - 1).join("\n"),
);
if (!idx.includes("const cellsOf = (p: CrosswordPlacement)")) {
  console.log("✓ تعریف محلی cellsOf از index حذف شد (import از generator)");
} else {
  ok = false;
  console.error("✗ تعریف محلی cellsOf هنوز در index است!");
}

// ── ۱۰) هدر مستندات — اصل ۳..۲۷ — عیناً داخل index ──
if (norm(idx).includes(norm(slice(3, 27)))) {
  console.log("✓ هدر مستندات index (اصل ۳..۲۷) — عیناً");
} else {
  ok = false;
  console.error("✗ هدر مستندات index — مغایرت!");
}

// ── ۱۱) گارد نهایی + سیم‌کشی سه شاخه با props هم‌نام ──
const idxNorm = norm(idx);
if (idxNorm.includes("if (!puzzle) return null;")) {
  console.log("✓ گارد «if (!puzzle) return null;» بین setup و done حفظ شد");
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
    ["data", "draft", "lesson", "setLesson", "wordCount", "setWordCount", "best", "start", "resumeDraft", "deleteDraft", "tutorialOpen", "handleTutorialOpenChange"],
  ],
  ["DoneView", ["puzzle", "wrongChecked", "hints", "secs", "isRecord", "missedWords", "start", "setPhase"]],
  [
    "PlayingView",
    ["puzzle", "letters", "locked", "popKeys", "shakeKeys", "active", "dir", "solved", "hints", "secs", "liveMsg", "paused", "resume", "togglePause", "muted", "setMuted", "handleHelp", "tutorialOpen", "handleTutorialOpenChange", "exitAsk", "setExitAskGuard", "confirmExit", "hintCoach", "activeWord", "onCellTap", "typeLetter", "backspace", "check", "hint", "focusWord", "handleExitClick"],
  ],
];
for (const [comp, props] of wiringChecks) {
  if (wiring(comp, props)) console.log(`✓ سیم‌کشی ${comp} — هر ${props.length} prop هم‌نام منتقل شد`);
  else {
    ok = false;
    console.error(`✗ سیم‌کشی ${comp} — prop ناقص!`);
  }
}

// ── ۱۲) «use client» در چهار ماژول .tsx ──
for (const f of ["index.tsx", "setup-panel.tsx", "done-view.tsx", "playing-view.tsx"]) {
  if (read(f).startsWith(`"use client";`)) console.log(`✓ ${f} — "use client"`);
  else {
    ok = false;
    console.error(`✗ ${f} — "use client" نیست!`);
  }
}

// ── ۱۳) games-hub: re-point به ./crossword + حذف فایل قدیمی ──
const hub = readFileSync(`${CWD}/src/components/book/games/games-hub.tsx`, "utf8");
const hubOk =
  (hub.match(/import\("\.\/crossword"\)/g) ?? []).length === 2 && !hub.includes("crossword-game");
if (hubOk) console.log("✓ games-hub.tsx — هر دو ارجاع به ./crossword؛ بدون ارجاع کهنه");
else {
  ok = false;
  console.error("✗ games-hub.tsx — re-point ناقص!");
}
if (!existsSync(`${CWD}/src/components/book/games/crossword-game.tsx`)) {
  console.log("✓ crossword-game.tsx قدیمی حذف شد");
} else {
  ok = false;
  console.error("✗ فایل قدیمی هنوز وجود دارد!");
}

// ── گزارش خط هر ماژول ──
console.log("\n— خط به خط ماژول‌ها (wc -l) —");
for (const f of ["generator.ts", "types.ts", "draft.ts", "setup-panel.tsx", "done-view.tsx", "playing-view.tsx", "index.tsx"]) {
  const n = read(f).split("\n").length;
  console.log(`  ${f}: ${n}`);
}

console.log(ok ? "\nهمهٔ صحه‌گذاری‌ها OK ✓" : "\n⚠ مغایرت!");
process.exit(ok ? 0 : 1);
