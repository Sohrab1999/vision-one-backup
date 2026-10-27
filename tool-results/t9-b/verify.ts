/**
 * verify.ts — صحه‌گذاری بایت‌به‌بایت تفکیک flappy-quiz-game.tsx → games/flappy-quiz/ (گام ۹، Task 9-b)
 *
 * الگوی t5/t7/t8: اصل کار از git HEAD خوانده می‌شود (child_process execSync)، بازه‌های خطی منتقل‌شده
 * بریده و با ماژول‌های جدید مقایسه می‌شوند. تنها دو تبدیل مستند مجازند (مانند گام‌های قبلی):
 *   (۱) export-prefix: افزودن «export » به تعریف‌های سطح‌بالا هنگام مهاجرت (فهرست خط‌ها در هر چک)
 *   (۲) modulo-dedent ۲ فاصله: فقط برای JSX منتقل‌شده به بدنهٔ کامپوننت presentational
 * علاوه بر آن: شمارش خط‌های فارسی هر برش (الگوی t8-b)، گیت‌های git (فایل قدیمی و هاب دست‌نخورده)،
 * نبودن تعاریف جابه‌جاشده در index و سقف خط ماژول‌ها. خروج غیرصفر در صورت هر FAIL.
 */
import { execSync } from "child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "fs";

const ROOT = "/home/z/my-project";
const OLD_REL = "src/components/book/games/flappy-quiz-game.tsx";
const HUB_REL = "src/components/book/games/games-hub.tsx";
const DIR = `${ROOT}/src/components/book/games/flappy-quiz`;

let failures = 0;
const ok = (name: string, detail = "") => console.log(`PASS  ${name}${detail ? " — " + detail : ""}`);
const bad = (name: string, detail = "") => {
  console.log(`FAIL  ${name}${detail ? " — " + detail : ""}`);
  failures++;
};

const run = (cmd: string): string =>
  execSync(cmd, { encoding: "utf8", cwd: ROOT });

// ── اصل: محتوای اصلی از git HEAD ──
const orig = run(`git show HEAD:${OLD_REL}`);
const L = orig.split("\n");
if (L[L.length - 1] === "") L.pop(); // فایل با \n تمام می‌شود
const origLines = L;
const persian = (s: string) => /[\u0600-\u06FF]/.test(s);
const faCount = (lines: string[]) => lines.filter(persian).length;
const show = (s: string) => JSON.stringify(s).slice(0, 160);

const readMod = (name: string): string[] => {
  const t = readFileSync(`${DIR}/${name}`, "utf8").split("\n");
  if (t[t.length - 1] === "") t.pop();
  return t;
};

const mods: Record<string, string[]> = {};
for (const f of readdirSync(DIR)) if (statSync(`${DIR}/${f}`).isFile()) mods[f] = readMod(f);

/** یافتن شروع برش در فایل مقصد از روی خط لنگر (باید یکتا باشد) */
const locate = (file: string[], anchor: string, offsetBefore: number, ctx: string): number => {
  const hits: number[] = [];
  file.forEach((l, i) => {
    if (l === anchor) hits.push(i);
  });
  if (hits.length !== 1) {
    bad(`${ctx}: anchor`, `تعداد وقوع خط لنگر = ${hits.length} (باید ۱ باشد): ${show(anchor)}`);
    return -1;
  }
  const start = hits[0] - offsetBefore;
  if (start < 0) {
    bad(`${ctx}: offset`, `شروع منفی ${start}`);
    return -1;
  }
  return start;
};

interface Check {
  name: string;
  a: number; // خط شروع برش در فایل اصلی (۱-پایه)
  b: number; // خط پایان برش
  target: string; // فایل مقصد
  anchorLine: number; // خط لنگر داخل برش (۱-پایه، مطلق در فایل اصلی)
  offsetBefore: number; // چند خط قبل از لنگر، شروع برش است
  dedent?: number; // modulo-dedent مجاز
  exportAt?: number[]; // خط‌های مطلقی که «export » گرفته‌اند
}

const CHECKS: Check[] = [
  { name: "doc-header (۳..۴۸)", a: 3, b: 48, target: "index.tsx", anchorLine: 4, offsetBefore: 1 },
  {
    name: "types (۱۰۶..۱۷۰)",
    a: 106, b: 170, target: "types.ts", anchorLine: 106, offsetBefore: 0,
    exportAt: [108, 109, 111, 113, 114, 115, 116, 117, 119, 121, 123, 125, 128, 136, 137, 139, 146, 155, 160, 168],
  },
  { name: "tutorial-steps (۱۷۲..۱۹۶)", a: 172, b: 196, target: "setup-panel.tsx", anchorLine: 172, offsetBefore: 0, exportAt: [173, 192] },
  { name: "helpers (۱۹۸..۲۲۹)", a: 198, b: 229, target: "helpers.ts", anchorLine: 198, offsetBefore: 0, exportAt: [201, 205, 210] },
  { name: "render (۲۳۱..۳۵۹)", a: 231, b: 359, target: "render.ts", anchorLine: 231, offsetBefore: 0, exportAt: [242, 257, 269, 316] },
  { name: "engine-open (۳۶۱..۴۰۰)", a: 361, b: 400, target: "index.tsx", anchorLine: 361, offsetBefore: 0 },
  { name: "session-block (۴۰۱..۴۶۹)", a: 401, b: 469, target: "index.tsx", anchorLine: 401, offsetBefore: 0 },
  { name: "world-refs (۴۷۱..۴۹۴)", a: 471, b: 494, target: "index.tsx", anchorLine: 471, offsetBefore: 0 },
  { name: "derived→hook (۴۹۵..۵۵۳)", a: 495, b: 553, target: "use-flappy-data.ts", anchorLine: 495, offsetBefore: 0 },
  { name: "engine-rest (۵۵۵..۱۰۹۲)", a: 555, b: 1092, target: "index.tsx", anchorLine: 555, offsetBefore: 0 },
  { name: "chipCls (۱۰۹۴..۱۱۰۰)", a: 1094, b: 1100, target: "setup-panel.tsx", anchorLine: 1094, offsetBefore: 0, dedent: 2 },
  { name: "setup-view (۱۱۰۴..۱۲۰۶)", a: 1104, b: 1206, target: "setup-panel.tsx", anchorLine: 1106, offsetBefore: 2, dedent: 2 },
  { name: "done-branch-head (۱۲۰۹..۱۲۱۰)", a: 1209, b: 1210, target: "index.tsx", anchorLine: 1209, offsetBefore: 0 },
  { name: "done-view (۱۲۱۱..۱۲۷۷)", a: 1211, b: 1277, target: "done-view.tsx", anchorLine: 1211, offsetBefore: 0, dedent: 2 },
  { name: "playing-view (۱۲۸۱..۱۴۵۱)", a: 1281, b: 1451, target: "playing-view.tsx", anchorLine: 1283, offsetBefore: 2 },
];

console.log(`=== برش‌های بایت‌به‌بایت (اصل از git HEAD، ${origLines.length} خط) ===`);
let slicePass = 0;
for (const c of CHECKS) {
  const src = origLines.slice(c.a - 1, c.b);
  const expect = src.map((l, i) => {
    const abs = c.a + i;
    let out = l;
    if (c.exportAt?.includes(abs)) {
      if (!/^(const |let |function |type |interface )/.test(out)) {
        bad(c.name, `خط export-هدف تعریف نیست: L${abs}`);
        return out;
      }
      out = "export " + out;
    }
    if (c.dedent) {
      const pad = " ".repeat(c.dedent);
      out = out.startsWith(pad) ? out.slice(c.dedent) : out;
    }
    return out;
  });
  const tgt = mods[c.target];
  if (!tgt) {
    bad(c.name, `فایل مقصد ${c.target} پیدا نشد`);
    continue;
  }
  const anchorTransformed = expect[c.anchorLine - c.a];
  const start = locate(tgt, anchorTransformed, c.offsetBefore, c.name);
  if (start < 0) continue;
  let diffAt = -1;
  for (let i = 0; i < expect.length; i++) {
    if (tgt[start + i] !== expect[i]) {
      diffAt = i;
      break;
    }
  }
  const faSrc = faCount(src);
  const faTgt = faCount(tgt.slice(start, start + expect.length));
  if (diffAt === -1 && faSrc === faTgt) {
    slicePass++;
    ok(c.name, `${expect.length} خط بایت‌به‌بایت → ${c.target} | خط‌های فارسی: ${faSrc}`);
  } else if (diffAt !== -1) {
    bad(
      c.name,
      `ناهمخوانی در خط ${c.a + diffAt} برش: اصلی=${show(expect[diffAt])} مقصد=${show(tgt[start + diffAt] ?? "<پایان فایل>")}`,
    );
  } else {
    bad(c.name, `شمار خط فارسی: اصلی=${faSrc} مقصد=${faTgt}`);
  }
}

console.log("\n=== گیت‌های git (فایل قدیمی و هاب دست‌نخورده — مسئولیت orchestrator) ===");
const diffOld = run(`git diff HEAD -- ${OLD_REL}`).trim();
const diffHub = run(`git diff HEAD -- ${HUB_REL}`).trim();
const diffSrcAll = run(`git diff HEAD --name-only -- src/`).trim();
if (diffOld === "" && existsSync(`${ROOT}/${OLD_REL}`)) ok("old file untouched + موجود", OLD_REL);
else bad("old file untouched + موجود", diffOld || "فایل وجود ندارد");
if (diffHub === "") ok("hub untouched", HUB_REL);
else bad("hub untouched", diffHub.slice(0, 200));
if (diffSrcAll === "") ok("no other tracked file in src/ changed", "(git diff HEAD --name-only -- src/ خالی)");
else bad("no other tracked file in src/ changed", diffSrcAll);

console.log("\n=== یکپارچگی ماژول‌ها ===");
const expectedFiles = ["done-view.tsx", "helpers.ts", "index.tsx", "playing-view.tsx", "render.ts", "setup-panel.tsx", "types.ts", "use-flappy-data.ts"].sort();
const actualFiles = Object.keys(mods).sort();
if (JSON.stringify(actualFiles) === JSON.stringify(expectedFiles)) ok("file set دقیق ۸ ماژول", actualFiles.join(", "));
else bad("file set دقیق ۸ ماژول", actualFiles.join(", "));

const idx = mods["index.tsx"] ?? [];
const idxText = idx.join("\n");
const MAX_LINES = 850;
let maxOk = true;
for (const [f, lines] of Object.entries(mods)) {
  if (lines.length > MAX_LINES) {
    bad(`module size ≤ ${MAX_LINES}`, `${f} = ${lines.length} خط`);
    maxOk = false;
  }
}
if (maxOk) ok(`module size ≤ ${MAX_LINES}`, Object.entries(mods).map(([f, l]) => `${f}:${l.length}`).join(" · "));

const mustHave = ["export function FlappyQuizGame() {"];
const mustNotHave = [
  "const TUTORIAL_STEPS", "const ENDLESS_TUTORIAL_STEP", "function qLabel", "function lessonLabel",
  "function layoutGaps", "function drawSky", "function drawGround", "function drawWall", "function drawBird",
  "const chipCls", "const NORMAL_CFG", "const EASY_CFG", "interface FlappyWall", "interface Cfg",
  "interface BirdState", "interface Popup", "interface BestRecord", "const GAME_KEY",
  "useSyncExternalStore", "const meaningMap", "const vocabSeed = useMemo",
];
const missingHave = mustHave.filter((p) => !idxText.includes(p));
const leaked = mustNotHave.filter((p) => idxText.includes(p));
if (missingHave.length === 0) ok("index صادر می‌کند FlappyQuizGame");
else bad("index صادر می‌کند FlappyQuizGame", missingHave.join(", "));
if (leaked.length === 0) ok("تعاریف جابه‌جاشده در index باقی نمانده‌اند (۲۱ الگو)");
else bad("تعاریف جابه‌جاشده در index باقی نمانده‌اند", leaked.join(", "));

console.log("\n────────────────────────────────────────");
// ۱۵ برش + ۳ گیت git + file-set + سقف خط + export + leak = ۲۲ چک
const passed = slicePass + (diffOld === "" && existsSync(`${ROOT}/${OLD_REL}`) ? 1 : 0) + (diffHub === "" ? 1 : 0) + (diffSrcAll === "" ? 1 : 0) + (JSON.stringify(actualFiles) === JSON.stringify(expectedFiles) ? 1 : 0) + (maxOk ? 1 : 0) + (missingHave.length === 0 ? 1 : 0) + (leaked.length === 0 ? 1 : 0);
console.log(`نتیجه: ${passed}/${CHECKS.length + 7} چک PASS | برش‌ها: ${slicePass}/${CHECKS.length}`);
if (failures > 0) {
  console.log("وضعیت: FAIL");
  process.exit(1);
}
console.log("وضعیت: PASS");
