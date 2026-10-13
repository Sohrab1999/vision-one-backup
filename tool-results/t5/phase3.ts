// گام ۵ — فاز ۳: استخراج hud-question از fps/index.tsx (جابه‌جایی مکانیکی سطری + لنگر متنی)
import { readFileSync, writeFileSync } from "fs";

const P = "/home/z/my-project/src/components/book/games/fps/index.tsx";
const HUD_P = "/home/z/my-project/src/components/book/games/fps/hud-question.tsx";
const lines = readFileSync(P, "utf8").split("\n");

const findLine = (needle: string): number => {
  const idx = lines.findIndex((l) => l.includes(needle));
  if (idx === -1) {
    console.error(`ANCHOR NOT FOUND: ${JSON.stringify(needle)}`);
    process.exit(1);
  }
  return idx; // صفر-مبنا
};

const commentIdx = findLine("سؤال — HUD بالای میدان");
const qOpen = commentIdx + 1;
if (lines[qOpen]!.trim() !== "{q && (") {
  console.error(`ASSERT FAIL: expected '{{q && (' — got ${JSON.stringify(lines[qOpen])}`);
  process.exit(1);
}
const ratick = findLine("رتیکل — فقط در حالت شلیک");
if (lines[ratick - 2]!.trim() !== ")}") {
  console.error(`ASSERT FAIL: expected ')}' before رتیکل — got ${JSON.stringify(lines[ratick - 2])}`);
  process.exit(1);
}
if (lines[ratick - 1]!.trim() !== "") {
  console.error(`ASSERT FAIL: expected blank before رتیکل — got ${JSON.stringify(lines[ratick - 1])}`);
  process.exit(1);
}
// بدنهٔ کارت: از <div تا </div> (انتها انحصاری ratick-2)
const body = lines.slice(qOpen + 1, ratick - 2);
if (!body[0]!.includes("<div") || !body[body.length - 1]!.includes("</div>")) {
  console.error("ASSERT FAIL: body bounds");
  process.exit(1);
}
const dedented = body.map((l) => (l.startsWith("          ") ? l.slice(10) : l));

// ── بازسازی index ──
const callSite = [
  "            {/* سؤال — HUD بالای میدان */}",
  "            <HudQuestion",
  "              q={q}",
  "              isFs={isFs}",
  "              timePct={timePct}",
  "              goldenActive={goldenActive}",
  "              goldenLeft={goldenLeft}",
  "              voiceSpeedRef={voiceSpeedRef}",
  "            />",
];

const kept: string[] = [];
for (let i = 0; i < lines.length; i++) {
  if (i === commentIdx) {
    kept.push(...callSite);
    i = ratick - 2; // جهش — «)}» بسته‌کنندهٔ شرط هم حذف می‌شود؛ بعدی: خط خالی پیش از رتیکل
    continue;
  }
  kept.push(lines[i]!);
}
let res = kept.join("\n");

// importها: حذف Volume2 از lucide + افزودن import کارت
const volIdx = lines.findIndex((l) => l === "  Volume2,");
if (volIdx === -1) {
  console.error("ASSERT FAIL: Volume2 import");
  process.exit(1);
}
// در kept اندیس‌ها جابه‌جا شده — روی رشته عمل می‌کنیم
res = res.replace("\n  Volume2,", "");
const panelAnchor = 'import { SetupPanel, TUTORIAL_STEPS } from "./setup-panel";';
if (!res.includes(panelAnchor)) {
  console.error("ASSERT FAIL: SetupPanel import anchor");
  process.exit(1);
}
res = res.replace(panelAnchor, `${panelAnchor}\nimport { HudQuestion } from "./hud-question";`);

// ── hud-question.tsx ──
const hudFile = `"use client";

/**
 * hud-question — کارت سؤال روی HUD میدان (گام ۵ نقشهٔ docs/refactor-roadmap-2.md).
 *
 * استخراج مکانیکی از index.tsx (بایت‌به‌بایت — پلی‌بوک games/fps/README.md):
 * متن سؤال (promptFa/promptMain/promptSub) + دکمهٔ «پخش دوباره» حالت شنیداری
 * + نوار زمان + شمارندهٔ فرصت هدف ویژهٔ HVT. کامپوننت presentational با props
 * هم‌نام شناسه‌های قبلی؛ q=null هیچ رندر نمی‌کند (عین شرط قبلی {q && …}).
 */

import { Crosshair, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { speak } from "@/lib/speak";
import { faNum } from "../shared";
import { GOLDEN_BONUS } from "./constants";
import type { Question } from "./types";

interface HudQuestionProps {
  q: Question | null;
  isFs: boolean;
  timePct: number;
  goldenActive: boolean;
  goldenLeft: number;
  /** آینهٔ سرعت گفتار (latest-ref در index) — دکمهٔ پخش دوباره از این می‌خواند */
  voiceSpeedRef: { current: number };
}

export function HudQuestion({ q, isFs, timePct, goldenActive, goldenLeft, voiceSpeedRef }: HudQuestionProps) {
  if (!q) return null;
  return (
${dedented.join("\n")}
  );
}
`;

writeFileSync(HUD_P, hudFile);
writeFileSync(P, res);
console.log("phase3 done. index lines:", res.split("\n").length, "hud lines:", hudFile.split("\n").length);
