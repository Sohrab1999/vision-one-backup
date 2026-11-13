// Phase-5 independent accounting: raw evidence → built data (like Phase-4 §B-۴)
import { readFileSync } from "node:fs";

const pad = (n) => String(n).padStart(3, "0");

let rawVocab = 0, rawLines = 0, rawEx = 0, rawItems = 0, emptyFiltered = 0, dupes = 0;
for (let n = 1; n <= 100; n++) {
  const r = JSON.parse(readFileSync(new URL(`./unit-${pad(n)}.json`, import.meta.url), "utf8"));
  if (r.missingInScan) continue;
  const local = new Set();
  for (const v of r.vocab || []) {
    if (!v || typeof v.w !== "string" || !v.w.trim()) continue;
    rawVocab++;
    const k = v.w.trim().toLowerCase().replace(/\s+/g, " ").replace(/[.。]+$/, "");
    if (local.has(k)) dupes++;
    else local.add(k);
  }
  for (const l of r.lines || []) {
    if (l && typeof l.en === "string" && l.en.trim()) rawLines++;
    else emptyFiltered++;
  }
  for (const ex of r.exercises || []) {
    if (!ex || !Array.isArray(ex.items)) continue;
    rawEx++;
    for (const it of ex.items || []) {
      if (it && typeof it.en === "string" && it.en.trim()) rawItems++;
      else emptyFiltered++;
    }
  }
}
console.log("RAW recount: vocab=" + rawVocab + " dupes=" + dupes + " lines=" + rawLines + " emptyFiltered=" + emptyFiltered + " exercises=" + rawEx + " items=" + rawItems);
console.log("dedupe expectation: built vocab = rawVocab - dupes = " + (rawVocab - dupes));
