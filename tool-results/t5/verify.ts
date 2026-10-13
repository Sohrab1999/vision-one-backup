// گام ۵ — صحه‌گذاری بایت‌به‌بایت (نسخهٔ ۲): بدنهٔ منتقل‌شده عیناً با اصل یکی باشد (بدون تورفتگی)
import { readFileSync } from "fs";

const dir = "/home/z/my-project/tool-results/t5";
const fps = "/home/z/my-project/src/components/book/games/fps";
const norm = (s: string) =>
  s
    .split("\n")
    .map((l) => l.replace(/\s+$/g, ""))
    .filter((l) => l.trim().length > 0)
    .join("\n");
// برای JSXهای dedent‌شده — تورفتگی ابتدای خط بی‌اثر است (رندر JSX یکسان)
const normLoose = (s: string) =>
  s
    .split("\n")
    .map((l) => l.replace(/^\s+/g, "").replace(/\s+$/g, ""))
    .filter((l) => l.length > 0)
    .join("\n");

let ok = true;
const check = (name: string, orig: string, moved: string, loose = false) => {
  const na = loose ? normLoose(orig) : norm(orig);
  const nb = loose ? normLoose(moved) : norm(moved);
  if (na === nb) {
    console.log(`✓ ${name} — مطابقت: ${na.split("\n").length} خط عیناً`);
  } else {
    ok = false;
    console.error(`✗ ${name} — مغایرت! (اصل ${na.split("\n").length} خط / جدید ${nb.split("\n").length} خط)`);
    const la = na.split("\n");
    const lb = nb.split("\n");
    for (let i = 0; i < Math.max(la.length, lb.length); i++) {
      if (la[i] !== lb[i]) {
        console.error(`  اولین تفاوت خط ${i + 1}:\n    اصل: ${JSON.stringify(la[i])}\n    جدید: ${JSON.stringify(lb[i])}`);
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

// ── ۱) حالت‌ها + setterها → use-fps-prefs ──
const b1 = readFileSync(`${dir}/index.before-phase1.tsx`, "utf8").split("\n");
const hook = readFileSync(`${fps}/use-fps-prefs.ts`, "utf8");
const hookBody = between(hook, "export function useFpsPrefs() {\n", "\n  return {");
// اصل: ۳۲۶ (mode) + ۳۳۰..۳۳۹ (کامنت‌ها/حالت‌ها؛ ۳۳۸ کامنتش نیم‌شده) + ۱۴۰۲..۱۴۴۱ + ۱۴۵۵..۱۴۶۰
const b1States = [b1[325]!, ...b1.slice(329, 337), "  // ── فاز F9 — سلاح انتخابی (ماندگار) ──", b1[338]!].join("\n");
const b1Setters = [...b1.slice(1401, 1441), ...b1.slice(1454, 1460)].join("\n");
const hookSplit = hookBody.indexOf("  // ── فاز G2-e — انتخاب کیفیت");
if (hookSplit === -1) throw new Error("hook setter marker not found");
check("حالت‌های ترجیحات (اصل ۳۲۶+۳۳۰..۳۳۹)", b1States, hookBody.slice(0, hookSplit).replace(/\n+$/g, ""));
check("setterهای ماندگار (اصل ۱۴۰۲..۱۴۴۱ + ۱۴۵۵..۱۴۶۰)", b1Setters, hookBody.slice(hookSplit));

// ── ۲) TUTORIAL_STEPS + chipCls + setup JSX → setup-panel ──
const b2 = readFileSync(`${dir}/index.before-phase2.tsx`, "utf8").split("\n");
const panel = readFileSync(`${fps}/setup-panel.tsx`, "utf8");
const tutStart = b2.findIndex((l) => l.includes("─── فاز G2-e — آموزش ۳-گامی استاندارد"));
const bahashi = b2.findIndex((l) => l.includes("// ─── بازی اصلی ───"));
check("TUTORIAL_STEPS (تنها تغییر: export const)", b2.slice(tutStart, bahashi - 1).join("\n").replace("const TUTORIAL_STEPS", "export const TUTORIAL_STEPS"), between(panel, 'import type { Mode } from "./types";\n', "\nexport interface SetupPanelProps"));

const chipStart = b2.findIndex((l) => l.includes("const chipCls = (active: boolean) =>"));
const b2Chip = b2.slice(chipStart, chipStart + 7).join("\n");
check("chipCls", b2Chip, between(panel, "}: SetupPanelProps) {\n", "\n  return ("));

const retOpen = b2.findIndex((l, i) => i > 1000 && l.trim() === "return (" && (b2[i + 1] ?? "").includes("<>"));
const retClose = b2.findIndex((l, i) => i > retOpen && l.trim() === ");");
check("setup JSX (فرگمنت کامل — modulo dedent)", b2.slice(retOpen + 1, retClose).join("\n"), between(panel, "  return (\n", "\n  );\n}"), true);

// ── ۳) کارت سؤال HUD → hud-question ──
const b3 = readFileSync(`${dir}/index.before-phase3.tsx`, "utf8").split("\n");
const hud = readFileSync(`${fps}/hud-question.tsx`, "utf8");
const cIdx = b3.findIndex((l) => l.includes("سؤال — HUD بالای میدان"));
const rIdx = b3.findIndex((l) => l.includes("رتیکل — فقط در حالت شلیک"));
check("کارت سؤال HUD (بدنهٔ div — modulo dedent)", b3.slice(cIdx + 2, rIdx - 2).join("\n"), between(hud, "  return (\n", "\n  );\n}"), true);

console.log(ok ? "\nهمهٔ صحه‌گذاری‌ها OK ✓" : "\n⚠ مغایرت!");
process.exit(ok ? 0 : 1);
