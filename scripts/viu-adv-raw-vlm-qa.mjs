// VIU Book 4 (AVU-3) — Phase A1 — visual QA sampling (roadmap §۳-2: VLM only for visual QA sampling;
// roadmap A1 validation: "مقایسهٔ دستی ≥۵ واحد با رندر pdftoppm").
// Compares 5 rendered unit pages (pdftoppm 110dpi — docs/qa/viu-adv-raw/g1-samples/) against the A1 raw
// extraction JSONs and records per-unit verdicts in docs/qa/viu-adv-raw/vlm-qa-2026-11-20.json.
// Read-only + one output JSON; zero product-code/data/db changes (roadmap §3).
//
// bun scripts/viu-adv-raw-vlm-qa.mjs

import ZAI from "z-ai-web-dev-sdk";
import { readFileSync, writeFileSync } from "node:fs";

const ROOT = process.cwd();
const RAW = `${ROOT}/docs/qa/viu-adv-raw`;
const OUT = `${RAW}/vlm-qa-2026-11-20.json`;

// unit → rendered page (one page per unit; left pages carry the column-split, right pages the exercise layout)
const SAMPLES = [
  { unit: 1, page: "left", pdfPage: 10, render: "g1-samples/u1-p10-010.png" },
  { unit: 21, page: "left", pdfPage: 50, render: "g1-samples/u21-p50-050.png" },
  { unit: 49, page: "right", pdfPage: 107, render: "g1-samples/u49-p107-107.png" },
  { unit: 72, page: "left", pdfPage: 152, render: "g1-samples/u72-p152-152.png" },
  { unit: 96, page: "right", pdfPage: 201, render: "g1-samples/u96-p201-201.png" },
];

const extractedPageText = (unit, page) => {
  const j = JSON.parse(readFileSync(`${RAW}/unit-${String(unit).padStart(3, "0")}.json`, "utf8"));
  const pg = page === "left" ? j.leftPage : j.rightPage;
  return pg.lines
    .map((l) => `${l.tag === "title" ? "[TITLE] " : l.tag === "dict" ? "[DICT] " : ""}${l.text}`)
    .join("\n")
    .slice(0, 3600);
};

const PROMPT = (extracted) => `You are a strict extraction-QA judge for a PDF-to-data pipeline. Below is the TEXT EXTRACTED from one page of the book "English Vocabulary in Use Advanced" by a coordinate-aware extractor. Look at the attached RENDERED PAGE IMAGE and judge the extraction.

Judge ONLY these points:
1. titleMatch: does the extraction contain the page's real title/heading text (unit number + title, or "Exercises" + exercise number)?
2. sectionsSeen: are the visible section letters / exercise numbers represented in the extraction?
3. missingBlocks: name any clearly visible paragraph/block/exercise that is ABSENT from the extraction (be specific but brief; ignore page furniture like running headers, page numbers, ISBN codes).
4. garbage: does the extraction contain obvious garbage (repeated doubled words like "thethe", interleaved column soup, gibberish)?
5. verdict: "PASS" if the extraction faithfully represents the visible page content (minor punctuation/spacing quirks are acceptable), else "FAIL".
6. notes: max 2 short sentences.

Answer STRICTLY as minified JSON: {"titleMatch":true/false,"sectionsSeen":"...","missingBlocks":"...","garbage":"...","verdict":"PASS"/"FAIL","notes":"..."}

=== EXTRACTED TEXT ===
${extracted}`;

async function main() {
  const zai = await ZAI.create();
  const results = [];
  for (const s of SAMPLES) {
    const b64 = readFileSync(`${RAW}/${s.render}`).toString("base64");
    const body = {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: PROMPT(extractedPageText(s.unit, s.page)) },
            { type: "image_url", image_url: { url: `data:image/png;base64,${b64}` } },
          ],
        },
      ],
      thinking: { type: "disabled" },
    };
    // vision endpoint (chat.completions.createVision) — model required; try known GLM vision models in order
    let completion = null;
    let lastErr = null;
    for (const model of ["glm-4.5v", "glm-4v", "glm-4v-flash"]) {
      try {
        completion = await zai.chat.completions.createVision({ ...body, model });
        if (completion?.choices?.[0]?.message?.content) break;
      } catch (e) {
        lastErr = e;
        completion = null;
      }
    }
    if (!completion) throw lastErr ?? new Error("no vision model available");
    const raw = completion.choices[0]?.message?.content ?? "";
    let verdict = null;
    try {
      const m = raw.match(/\{[\s\S]*\}/);
      verdict = m ? JSON.parse(m[0]) : { parseError: raw.slice(0, 300) };
    } catch {
      verdict = { parseError: raw.slice(0, 300) };
    }
    results.push({ unit: s.unit, page: s.page, pdfPage: s.pdfPage, render: s.render, verdict });
    console.log(`unit ${s.unit} (${s.page}, PDF ${s.pdfPage}): ${verdict.verdict ?? "PARSE-ERROR"}`);
  }
  const passCount = results.filter((r) => r.verdict?.verdict === "PASS").length;
  const report = {
    meta: {
      script: "scripts/viu-adv-raw-vlm-qa.mjs",
      generatedAt: new Date().toISOString(),
      role: "roadmap §۳-2: VLM as visual QA SAMPLER only (extraction itself is text-based, A1-1)",
      requirement: "A1 validation: manual comparison of ≥5 units against pdftoppm renders",
      samples: SAMPLES.length,
      rendersDpi: 110,
    },
    passCount,
    allPass: passCount === SAMPLES.length,
    results,
  };
  writeFileSync(OUT, JSON.stringify(report, null, 2) + "\n");
  console.log(`\nvlm-qa written → ${OUT} · pass ${passCount}/${SAMPLES.length}`);
}

main().catch((e) => {
  console.error("VLM QA failed:", e.message);
  process.exit(1);
});
