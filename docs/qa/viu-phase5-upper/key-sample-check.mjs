// Phase-5 independent key sampling: verify quiz answers against the book's printed Answer key.
// v2 — matches the build's by-index mapping (parsed[idx+1]) instead of printed numbers in item text.
import { readFileSync } from "node:fs";

const normalize = (s) =>
  String(s ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[.。]+$/, "");
const firstAlternate = (ans) =>
  String(ans ?? "")
    .split("/")[0]
    .replace(/\s*\|\s*$/, "")
    .trim();

// load printed key from committed evidence
const keyRaw = JSON.parse(readFileSync(new URL("./answer-key.json", import.meta.url), "utf8"));
const keyByUnit = new Map();
for (const pg of keyRaw) {
  for (const u of pg.units || []) {
    const n = Number(u.unit);
    keyByUnit.set(n, { ...(keyByUnit.get(n) || {}), ...(u.answers || {}) });
  }
}

// load built quiz seed parts
const seeds = [];
for (let p = 1; p <= 5; p++) {
  const mod = await import(`../../../src/data/viu-upper/quiz-part-${p}.ts`);
  seeds.push(...mod[`QUIZ_PART_${p}`]);
}

// parse numbered answers exactly like the build
function parseNumberedAnswers(keyText) {
  const text = String(keyText ?? "").trim();
  if (!text) return null;
  const re = /(?:^|\s)(\d{1,2})[.):]?\s+/g;
  let m;
  const positions = [];
  while ((m = re.exec(text)) !== null)
    positions.push({ num: Number(m[1]), valStart: m.index + m[0].length, matchStart: m.index });
  if (positions.length === 0) return null;
  const tokens = [];
  for (let i = 0; i < positions.length; i++) {
    const end = i + 1 < positions.length ? positions[i + 1].matchStart : text.length;
    const val = text.slice(positions[i].valStart, end).trim().replace(/\s*\|\s*$/, "").trim();
    if (val) tokens.push({ num: positions[i].num, val });
  }
  const out = {};
  for (const t of tokens) out[t.num] = t.val;
  return out;
}

// group questions by (lesson, exercise) preserving order — order = item index
const groups = new Map();
for (const q of seeds) {
  const m = q.scope.match(/تمرین\s+(.+)$/);
  const no = m ? m[1] : "";
  const gk = `${q.lesson}::${no}`;
  if (!groups.has(gk)) groups.set(gk, []);
  groups.get(gk).push(q);
}

// deterministic sample: 60 exercises spread across the bank, 1-2 items each
const groupList = [...groups.keys()];
const step = Math.max(1, Math.floor(groupList.length / 60));
const checked = [];
let ok = 0;
const mismatch = [];
for (let i = 0; i < groupList.length && checked.length < 60; i += step) {
  const gk = groupList[i];
  const [lessonStr, no] = gk.split("::");
  const lesson = Number(lessonStr);
  const answers = keyByUnit.get(lesson) || {};
  const keyText = no in answers ? answers[no] : null;
  const qs = groups.get(gk);
  const parsed = keyText != null ? parseNumberedAnswers(keyText) : null;
  if (!parsed) { mismatch.push(`${gk}: NO PARSED KEY (${String(keyText).slice(0, 40)}…)`); continue; }
  qs.forEach((q, idx) => {
    checked.push(`${gk}#${idx + 1}`);
    const correct = q.options[q.answer];
    const expected = firstAlternate(parsed[idx + 1]);
    if (expected && normalize(expected) === normalize(correct)) ok++;
    else mismatch.push(`${gk}#${idx + 1}: key="${expected}" built="${correct}" (opts=${q.options.join(" | ").slice(0, 60)})`);
  });
}
console.log(`KEY SAMPLE: ${ok}/${checked.length} items consistent with the printed Answer key — mismatches: ${mismatch.length}`);
for (const m of mismatch.slice(0, 15)) console.log("  " + m);
