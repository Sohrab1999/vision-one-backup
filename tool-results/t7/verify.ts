// گام ۷ — صحه‌گذاری بایت‌به‌بایت: بازه‌های `git show HEAD:.../adventure-map-game.tsx`
// در برابر ماژول‌های جدید games/adventure-map/ (الگوی tool-results/t5/verify.ts).
// دلتاهای مجاز: افزودن export/import/"use client"/کامنت هدر + dedent بدنهٔ شاخه‌ها (normLoose).
import { execSync } from "child_process";
import { readFileSync, existsSync } from "fs";

const CWD = "/home/z/my-project";
const orig = execSync("git show HEAD:src/components/book/games/adventure-map-game.tsx", {
  cwd: CWD,
  encoding: "utf8",
}).split("\n");
if (orig[orig.length - 1] === "") orig.pop();
if (orig.length !== 1786) throw new Error(`HEAD file: expected 1786 lines, got ${orig.length}`);
const slice = (a: number, b: number) => orig.slice(a - 1, b).join("\n");

const dir = `${CWD}/src/components/book/games/adventure-map`;
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

/** برای ماژول‌های خالص: حذف هدر + بلاک‌های import (تا پیش از نخستین اعلان) + پس‌وند export (تنها دلتای مجاز) */
const strip = (s: string): string => {
  const lines = s.split("\n");
  let i = 0;
  // هدر کامنت/خط خالی
  while (
    i < lines.length &&
    (lines[i]!.trim() === "" ||
      lines[i]!.startsWith("/**") ||
      lines[i]!.startsWith("*") ||
      lines[i]!.startsWith(" *") ||
      lines[i]!.startsWith("*/"))
  )
    i++;
  // بلاک‌های import (تک‌خطی یا چندخطی — تا سطر پایانی «;»)
  while (i < lines.length && lines[i]!.startsWith("import ")) {
    while (i < lines.length && !/;$/.test(lines[i]!.replace(/\s+$/, ""))) i++;
    i++;
  }
  return lines
    .slice(i)
    .map((l) => l.replace(/^export (type|const|interface|function) /, "$1 "))
    .join("\n");
};

// ── ۱) types.ts — اصل ۹۱..۱۱۱ (Phase/StageType/ثابت‌ها/STAGE_META/WORD_RE) + ۱۳۲..۱۸۸ (اینترفیس‌ها) ──
check(
  "types.ts (اصل ۹۱..۱۱۱ + ۱۳۲..۱۸۸ — تنها تغییر: export)",
  `${slice(91, 111)}\n${slice(132, 188)}`,
  strip(read("types.ts")),
);

// ── ۲) helpers.ts — اصل ۱۹۰..۲۶۸ (۶ تابع خالص) ──
check("helpers.ts (اصل ۱۹۰..۲۶۸ — تنها تغییر: export)", slice(190, 268), strip(read("helpers.ts")));

// ── ۳) TUTORIAL_STEPS — اصل ۱۱۳..۱۳۰ → setup-panel.tsx (تنها تغییر: export const) ──
const panel = read("setup-panel.tsx");
const pLines = panel.split("\n");
const tutStart = pLines.findIndex((l) => l.startsWith("/** آموزش ۳-گامی استاندارد"));
const tutEnd = pLines.findIndex((l) => l === "];");
check(
  "TUTORIAL_STEPS (اصل ۱۱۳..۱۳۰ — تنها تغییر: export const)",
  slice(113, 130),
  pLines.slice(tutStart, tutEnd + 1).join("\n").replace("export const TUTORIAL_STEPS", "const TUTORIAL_STEPS"),
);

// ── ۴) بدنهٔ شاخهٔ setup — اصل ۹۰۶..۱۰۷۱ → SetupPanel (modulo dedent) ──
check(
  "SetupPanel بدنهٔ return (اصل ۹۰۶..۱۰۷۱ — modulo dedent)",
  slice(906, 1071),
  `  ${between(panel, "}: SetupPanelProps) {\n", "\n}")}`,
  true,
);

// ── ۵) بدنهٔ شاخهٔ map — اصل ۱۱۰۴..۱۲۶۴ → StageMap (locals + return — modulo dedent) ──
const smap = read("stage-map.tsx");
check(
  "StageMap بدنه (اصل ۱۱۰۴..۱۲۶۴ — order/openIdx/mapLive + return، modulo dedent)",
  slice(1104, 1264),
  `  ${between(smap, "}: StageMapProps) {\n", "\n}")}`,
  true,
);

// ── ۶) بدنهٔ شاخهٔ challenge — اصل ۱۲۶۹..۱۶۴۹ → ChallengeView (modulo dedent) ──
const cview = read("challenge-view.tsx");
check(
  "ChallengeView بدنه (اصل ۱۲۶۹..۱۶۴۹ — ResultScreen + ۴ مینی‌چالش + توقف/نگهبان/آموزش، modulo dedent)",
  slice(1269, 1649),
  `  ${between(cview, "}: ChallengeViewProps) {\n", "\n}")}`,
  true,
);

// ── ۷) بدنهٔ شاخهٔ done — اصل ۱۶۵۴..۱۷۷۲ → DoneView (rank + return — modulo dedent) ──
const dview = read("done-view.tsx");
check(
  "DoneView بدنه (اصل ۱۶۵۴..۱۷۷۲ — rank + مراسم، modulo dedent)",
  slice(1654, 1772),
  `  ${between(dview, "}: DoneViewProps) {\n", "\n}")}`,
  true,
);

// ── ۸) موتور index.tsx — اصل ۲۷۰..۹۰۲ (بدنهٔ AdventureMapGame تا پایان tapCard) — بدون dedent ──
const idx = read("index.tsx");
const iLines = idx.split("\n");
const fnStart = iLines.findIndex((l) => l === "export function AdventureMapGame() {");
const setupMark = iLines.findIndex((l) => l.includes("── Setup ──"));
if (fnStart === -1 || setupMark === -1) throw new Error("index.tsx markers not found");
// تا پیش از کامنت Setup؛ خط خالی میان آن دو در هر دو طرف حذف می‌شود (norm)
check(
  "موتور index.tsx (اصل ۲۷۰..۹۰۲ — state/ref/effect/۱۱ callback — عیناً بدون dedent)",
  slice(270, 902),
  iLines.slice(fnStart, setupMark - 1).join("\n"),
);

// ── ۹) دو گارد دفاعی + گارد نهایی — اصل ۱۰۷۴..۱۱۰۰ و ۱۷۷۵..۱۷۸۵ — عیناً داخل index ──
const idxNorm = norm(idx);
for (const [name, a, b] of [
  ["گارد دفاعی ۱ (اصل ۱۰۷۴..۱۰۸۷)", 1074, 1087],
  ["گارد دفاعی ۲ (اصل ۱۰۸۸..۱۱۰۰)", 1088, 1100],
  ["گارد نهایی (اصل ۱۷۷۵..۱۷۸۵)", 1775, 1785],
] as const) {
  if (idxNorm.includes(norm(slice(a, b)))) {
    console.log(`✓ ${name} — عیناً داخل index.tsx`);
  } else {
    ok = false;
    console.error(`✗ ${name} — در index.tsx پیدا نشد!`);
  }
}

// ── ۱۰) هدر مستندات ۳۲خطی — اصل ۳..۳۴ — عیناً داخل index ──
if (idxNorm.includes(norm(slice(3, 34)))) {
  console.log("✓ هدر مستندات index (اصل ۳..۳۴) — عیناً");
} else {
  ok = false;
  console.error("✗ هدر مستندات index — مغایرت!");
}

// ── ۱۱) games-hub: re-point به ./adventure-map + حذف فایل قدیمی ──
const hub = readFileSync(`${CWD}/src/components/book/games/games-hub.tsx`, "utf8");
const hubOk =
  (hub.match(/import\("\.\/adventure-map"\)/g) ?? []).length === 2 && !hub.includes("adventure-map-game");
if (hubOk) console.log("✓ games-hub.tsx — هر دو ارجاع به ./adventure-map؛ بدون ارجاع کهنه");
else {
  ok = false;
  console.error("✗ games-hub.tsx — re-point ناقص!");
}
if (!existsSync(`${CWD}/src/components/book/games/adventure-map-game.tsx`)) {
  console.log("✓ adventure-map-game.tsx قدیمی حذف شد");
} else {
  ok = false;
  console.error("✗ فایل قدیمی هنوز وجود دارد!");
}

console.log(ok ? "\nهمهٔ صحه‌گذاری‌ها OK ✓" : "\n⚠ مغایرت!");
process.exit(ok ? 0 : 1);
