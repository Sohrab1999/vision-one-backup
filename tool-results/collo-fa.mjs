// Persian translation pipeline for the Collocations book (backend-only, bun + z-ai-web-dev-sdk)
// Reads tool-results/collo-extract.json → writes tool-results/collo-fa.json incrementally (resume-safe)
import ZAI from "z-ai-web-dev-sdk";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const SRC = "/home/z/my-project/tool-results/collo-extract.json";
const OUT = "/home/z/my-project/tool-results/collo-fa.json";

const data = JSON.parse(readFileSync(SRC, "utf-8"));
const fa = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf-8")) : {};

const SYSTEM =
  "You are a professional English-to-Persian (Farsi) translator for an educational English-learning app. " +
  "You always respond with VALID JSON only — no markdown fences, no commentary.";

function parseJsonLoose(s) {
  s = s.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  const a = s.indexOf("{"), b = s.lastIndexOf("}");
  if (a >= 0 && b > a) s = s.slice(a, b + 1);
  return JSON.parse(s);
}

async function translateLesson(zai, L) {
  const phrases = [];
  const seen = new Set();
  for (const q of L.quiz) {
    const p = q.options[q.answer];
    if (p && !seen.has(p.toLowerCase())) {
      seen.add(p.toLowerCase());
      phrases.push({ p, ex: q.text.replace("________", "___") });
    }
  }
  const quoteEn = (L.paragraphs[0] || "").split(/(?<=[.!?]) /)[0] || L.topic;
  const user = JSON.stringify({
    task: "Translate this English lesson for Persian learners of English.",
    rules: [
      "titleFa: natural Persian title of the lesson topic (max 4 words).",
      "quoteFa: fluent Persian translation of quoteEn.",
      "paragraphsFa: translate EACH paragraph to fluent Persian; the array MUST have exactly " + L.paragraphs.length + " items, same order. Keep English collocation phrases inside parentheses after the Persian when helpful, like «خانواده صمیمی (close-knit family)».",
      "glosses: for EVERY phrase p, a short Persian equivalent (1-6 words). Use the example sentence ex as context. Keys must be EXACTLY the phrase strings given.",
    ],
    topic: L.topic,
    quoteEn,
    paragraphs: L.paragraphs,
    phrases,
  });

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const completion = await zai.chat.completions.create({
        messages: [
          { role: "assistant", content: SYSTEM },
          { role: "user", content: user },
        ],
        thinking: { type: "disabled" },
      });
      const raw = completion.choices[0]?.message?.content ?? "";
      const out = parseJsonLoose(raw);
      if (!Array.isArray(out.paragraphsFa) || out.paragraphsFa.length !== L.paragraphs.length) {
        throw new Error(`paragraphsFa length ${out.paragraphsFa?.length} != ${L.paragraphs.length}`);
      }
      if (typeof out.titleFa !== "string" || typeof out.quoteFa !== "string") {
        throw new Error("missing titleFa/quoteFa");
      }
      return {
        num: L.num,
        topic: L.topic,
        titleFa: String(out.titleFa).trim(),
        quoteEn,
        quoteFa: String(out.quoteFa).trim(),
        paragraphsFa: out.paragraphsFa.map((x) => String(x).trim()),
        glosses: out.glosses && typeof out.glosses === "object" ? out.glosses : {},
      };
    } catch (e) {
      console.error(`L${L.num} attempt ${attempt} failed: ${e.message}`);
      if (attempt === 3) return null;
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
}

async function main() {
  const zai = await ZAI.create();
  const todo = data.lessons.filter((L) => !fa[L.num] && L.paragraphs.length > 0);
  console.log(`lessons to translate: ${todo.length}`);
  for (const L of todo) {
    const res = await translateLesson(zai, L);
    if (res) {
      fa[L.num] = res;
      writeFileSync(OUT, JSON.stringify(fa), "utf-8");
      console.log(`✓ L${L.num} ${L.topic} → ${res.titleFa} (${Object.keys(res.glosses).length} glosses)`);
    } else {
      console.error(`✗ L${L.num} ${L.topic} — gave up`);
    }
  }
  console.log(`DONE. translated: ${Object.keys(fa).length}/50`);
}

main().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});
