// VIU Book 4 (AVU-3) — Phase A2-6 — automated audit of the structural capture layer.
// Roadmap A2-6: "NEW ممیزی audit:viu-adv (صفر فیلد خالی · ایندکس پاسخ معتبر · متغارهای ساختاری)"
// — at the A2 stage exercises carry keyed=null (the printed Answer key is linked in Phase A3), so
// the audit enforces the structural invariants that ARE mechanically checkable now:
//   Z1 file set complete (unit-001..101 capture + verify + fa-cache stub) and parseable
//   Z2 titles/sections/blocks/notes/items: zero empty text fields, letters ⊆ A..E, kinds valid
//   Z3 exercises: numbering N.x, item numbers ≥1, blankCount == "____" occurrences, refs ⊆ A..E,
//      keyed === null (honest until A3), instruction-or-items present
//   Z4 miniDict: entry text non-empty, headword/ipa only when mechanically derived
//   Z5 queued unknown chars (PUA/C0 — A1-KA-4): every queued codepoint present verbatim in the
//      capture text with the exact count, and ZERO unqueued PUA/C0 chars anywhere in the capture
//   Z6 census consistency: per-unit census == recomputed counts; global totals == Σ rows
//   Z7 knownArtifacts carried: u1 U+001F/U+0019 · u21 drop-cap T · u72 U+E022
//   Z8 partition-equivalence claim recorded in every verify file (byte-exact vs raw layer)
// Exit code 1 on any violation — a red audit can never be shipped as green.
//
// READ-ONLY (writes nothing).

import { readFileSync } from "node:fs";

const CAP = "docs/qa/viu-adv-capture";
const CENSUS = "docs/qa/viu-adv-census-2026-11-21.json";
const RAW = "docs/qa/viu-adv-raw";

const issues = [];
const fail = (msg) => issues.push(msg);
const isPuaOrCtl = (c) => (c >= 0xe000 && c <= 0xf8ff) || c < 0x20 || (c >= 0x7f && c <= 0x9f);

// Z1 — file set
let captures = 0, verifies = 0;
for (let n = 1; n <= 101; n++) {
  const id = String(n).padStart(3, "0");
  try { JSON.parse(readFileSync(`${CAP}/unit-${id}.json`, "utf8")); captures++; } catch (e) { fail(`Z1 capture unit-${id} missing/invalid: ${e.message}`); }
  try { JSON.parse(readFileSync(`${CAP}/verify-unit-${id}.json`, "utf8")); verifies++; } catch (e) { fail(`Z1 verify unit-${id} missing/invalid: ${e.message}`); }
}
const fa = JSON.parse(readFileSync(`${CAP}/fa-cache.json`, "utf8"));
if (fa.status !== "A4-pending" || fa.faNew !== 0 || fa.faReviewed !== 0) fail("Z1 fa-cache stub must be {status:A4-pending, faNew:0, faReviewed:0}");

const totals = { vocabCandidates: 0, marginNotes: 0, proseBlocks: 0, languageHelp: 0, dropCaps: 0, exercises: 0, exerciseItems: 0, blanks: 0, banks: 0, mixedLineSplits: 0, imageDependentCandidates: 0, queuedChars: 0 };
const census = JSON.parse(readFileSync(CENSUS, "utf8"));

for (let n = 1; n <= 101; n++) {
  const id = String(n).padStart(3, "0");
  const c = JSON.parse(readFileSync(`${CAP}/unit-${id}.json`, "utf8"));
  const v = JSON.parse(readFileSync(`${CAP}/verify-unit-${id}.json`, "utf8"));

  // Z2 — titles/sections/blocks
  if (!c.title || !c.title.trim()) fail(`Z2 u${n} empty title`);
  if (c.unit !== n) fail(`Z2 u${n} unit field mismatch`);
  for (const s of c.leftPage.sections) {
    if (!/^[A-E]$/.test(s.letter)) fail(`Z2 u${n} invalid section letter ${s.letter}`);
    if (!s.title?.trim()) fail(`Z2 u${n} section ${s.letter} empty title`);
    for (const b of s.blocks) {
      if (!["paragraph", "languageHelpMarker", "dropCap"].includes(b.kind)) fail(`Z2 u${n} ${s.letter} invalid block kind ${b.kind}`);
      if (!b.text?.trim()) fail(`Z2 u${n} ${s.letter} empty block text (${b.kind} y=${b.y})`);
      if (b.kind === "languageHelpMarker" && b.text.trim() !== "Language help") fail(`Z2 u${n} ${s.letter} bad marker text`);
    }
    for (const m of s.marginNotes) if (!m.text?.trim()) fail(`Z2 u${n} ${s.letter} empty margin note y=${m.y}`);
  }

  // Z3 — exercises
  for (const ex of c.rightPage.exercises) {
    if (!new RegExp(`^${n}\\.\\d+$`).test(ex.no)) fail(`Z3 u${n} bad exercise no ${ex.no}`);
    if (ex.keyed !== null) fail(`Z3 u${n}/${ex.no} keyed must be null until A3, got ${ex.keyed}`);
    if (!["fillIn", "bank", "open", "instruction"].includes(ex.kind)) fail(`Z3 u${n}/${ex.no} invalid kind ${ex.kind}`);
    if (!ex.instruction?.trim() && ex.items.length === 0 && !ex.bank) fail(`Z3 u${n}/${ex.no} empty exercise (no instruction, items, bank)`);
    for (const r of ex.refs ?? []) if (!/^[A-E]$/.test(r) && r !== "opposite") fail(`Z3 u${n}/${ex.no} bad ref ${r}`);
    for (const it of ex.items) {
      if (!Number.isInteger(it.n) || it.n < 1) fail(`Z3 u${n}/${ex.no} bad item n ${it.n}`);
      if (!it.text?.trim()) fail(`Z3 u${n}/${ex.no} empty item ${it.n}`);
      const blanks = (it.text.match(/____/g) ?? []).length;
      if (blanks !== it.blankCount) fail(`Z3 u${n}/${ex.no} item ${it.n} blankCount ${it.blankCount} != ____ count ${blanks}`);
    }
    for (const b of ex.bank ?? []) if (!b?.trim()) fail(`Z3 u${n}/${ex.no} empty bank row`);
  }

  // Z4 — miniDict
  for (const e of c.leftPage.miniDict) {
    if (!e.text?.trim()) fail(`Z4 u${n} empty dict entry n=${e.n}`);
    if (e.headword !== null && !e.headword?.trim()) fail(`Z4 u${n} entry n=${e.n} empty headword`);
  }

  // Z5 — queued unknown chars present verbatim + zero unqueued PUA/C0 in capture text
  const queued = new Map();
  for (const q of c.queuedChars) queued.set(q.codepoint, (queued.get(q.codepoint) ?? 0) + q.count);
  const seen = new Map();
  const scanText = (t) => { for (const ch of t ?? "") { const cp = ch.codePointAt(0); if (isPuaOrCtl(cp)) { const k = `U+${cp.toString(16).toUpperCase().padStart(4, "0")}`; seen.set(k, (seen.get(k) ?? 0) + 1); } } };
  for (const s of c.leftPage.sections) { for (const b of s.blocks) scanText(b.text); for (const m of s.marginNotes) scanText(m.text); }
  for (const e of c.leftPage.miniDict) scanText(e.text);
  for (const ex of c.rightPage.exercises) { scanText(ex.instruction); for (const i of ex.items) scanText(i.text); for (const b of ex.bank ?? []) scanText(b); }
  for (const [k, cnt] of seen) if (!queued.has(k)) fail(`Z5 u${n} unqueued unknown char ${k}×${cnt} in capture text`);
  for (const [k, cnt] of queued) {
    const rawUnit = JSON.parse(readFileSync(`${RAW}/unit-${id}.json`, "utf8"));
    const rawCount = [...rawUnit.leftPage.lines, ...rawUnit.rightPage.lines].reduce((a, l) => a + [...l.text].filter((ch) => `U+${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}` === k).length, 0);
    if (rawCount !== cnt) fail(`Z5 u${n} queued ${k} count ${cnt} != raw-layer occurrences ${rawCount}`);
    if ((seen.get(k) ?? 0) !== cnt) fail(`Z5 u${n} queued ${k}×${cnt} not fully carried into capture text (seen ${seen.get(k) ?? 0})`);
  }

  // Z6 — per-unit census consistency
  const recomputed = {
    vocabCandidates: c.leftPage.miniDict.length,
    marginNotes: c.leftPage.sections.reduce((a, s) => a + s.marginNotes.length, 0),
    proseBlocks: c.leftPage.sections.reduce((a, s) => a + s.blocks.filter((b) => b.kind === "paragraph").length, 0),
    languageHelp: c.leftPage.sections.reduce((a, s) => a + s.blocks.filter((b) => b.kind === "languageHelpMarker").length, 0),
    dropCaps: c.leftPage.sections.reduce((a, s) => a + s.blocks.filter((b) => b.kind === "dropCap").length, 0),
    exercises: c.rightPage.exercises.length,
    exerciseItems: c.rightPage.exercises.reduce((a, e) => a + e.items.length, 0),
    blanks: c.rightPage.exercises.reduce((a, e) => a + e.items.reduce((b, i) => b + i.blankCount, 0), 0),
    banks: c.rightPage.exercises.reduce((a, e) => a + (e.bank?.length ?? 0), 0),
    mixedLineSplits: c.leftPage.diagnostics.mixedLineSplits,
    imageDependentCandidates: c.imageDependentCandidates.length,
  };
  for (const [k, val] of Object.entries(recomputed)) if (c.census[k] !== val) fail(`Z6 u${n} census.${k}=${c.census[k]} != recomputed ${val}`);
  for (const [k, val] of Object.entries(recomputed)) totals[k] += val;
  totals.queuedChars += c.queuedChars.length;

  // Z8 — partition equivalence recorded
  if (!v.checks?.partitionEquivalence?.startsWith("byte-exact")) fail(`Z8 u${n} verify missing partitionEquivalence claim`);
  if (v.unit !== n || v.ok !== true) fail(`Z8 u${n} verify not ok`);
}

// Z6 — global totals
for (const [k, val] of Object.entries(totals)) if (census.totals[k] !== val) fail(`Z6 global totals.${k}=${census.totals[k]} != recomputed ${val}`);
if (census.units.length !== 101) fail(`Z6 census rows ${census.units.length} != 101`);

// Z7 — known artifacts carried
const u1 = JSON.parse(readFileSync(`${CAP}/unit-001.json`, "utf8"));
const u21 = JSON.parse(readFileSync(`${CAP}/unit-021.json`, "utf8"));
const u72 = JSON.parse(readFileSync(`${CAP}/unit-072.json`, "utf8"));
const u1q = new Set(u1.queuedChars.map((q) => q.codepoint));
if (u1q.size !== 2 || !u1q.has("U+001F") || !u1q.has("U+0019")) fail(`Z7 u1 queued chars ${JSON.stringify([...u1q])} — expected U+001F+U+0019 (A1-KA-4)`);
if (u21.leftPage.sections.reduce((a, s) => a + s.blocks.filter((b) => b.kind === "dropCap").length, 0) !== 1) fail("Z7 u21 drop-cap T not carried (A1-KA-2)");
if (!u72.queuedChars.some((q) => q.codepoint === "U+E022")) fail("Z7 u72 U+E022 not carried (A1-KA-3)");

// verdict
const verdict = { ok: issues.length === 0, checks: { captures, verifies, totals }, issues };
console.log(JSON.stringify(verdict, null, 2));
if (!verdict.ok) process.exit(1);
