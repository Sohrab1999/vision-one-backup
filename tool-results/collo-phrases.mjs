// Pass 2: extract key collocation phrases per lesson (phrase + Persian gloss) from lesson prose.
// Output: tool-results/collo-phrases.json — { "<lessonNum>": [{p, fa}, ...] }
import ZAI from "z-ai-web-dev-sdk";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const SRC = "/home/z/my-project/tool-results/collo-extract.json";
const OUT = "/home/z/my-project/tool-results/collo-phrases.json";

const data = JSON.parse(readFileSync(SRC, "utf-8"));
const out = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf-8")) : {};

const SYSTEM =
  "You are an expert English lexicographer building a collocation dictionary for Persian learners. " +
  "Respond with VALID JSON only — no markdown fences, no commentary.";

async function extractLesson(zai, L) {
  const text = L.paragraphs.join("\n").slice(0, 6000);
  const user = JSON.stringify({
    task: "Extract the most important English collocations (typical word combinations) from this lesson text.",
    rules: [
      "Return 12-20 collocations: natural word combinations as they appear in the text (2-4 words), e.g. 'immediate family', 'give birth', 'close-knit family'.",
      "Each with a SHORT Persian equivalent (1-6 words).",
      "Format: {\"items\": [{\"p\": \"english phrase\", \"fa\": \"معنی فارسی\"}]}",
      "Phrases must appear (as consecutive words) in the text. No duplicates. No single words.",
    ],
    topic: L.topic,
    text,
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
      const raw = (completion.choices[0]?.message?.content ?? "").trim()
        .replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
      const a = raw.indexOf("{"), b = raw.lastIndexOf("}");
      const parsed = JSON.parse(raw.slice(a, b + 1));
      const items = (parsed.items || [])
        .filter((it) => it && typeof it.p === "string" && typeof it.fa === "string" && it.p.includes(" "))
        .map((it) => ({ p: it.p.trim().toLowerCase(), fa: it.fa.trim() }));
      // dedupe within lesson
      const seen = new Set();
      const clean = items.filter((it) => (seen.has(it.p) ? false : (seen.add(it.p), true)));
      if (clean.length === 0) throw new Error("empty items");
      return clean;
    } catch (e) {
      console.error(`P2 L${L.num} attempt ${attempt} failed: ${e.message}`);
      if (attempt === 3) return null;
      await new Promise((r) => setTimeout(r, 8000 * attempt));
    }
  }
}

async function main() {
  const zai = await ZAI.create();
  const todo = data.lessons.filter((L) => !out[L.num] && L.paragraphs.length > 0);
  console.log(`pass2 lessons: ${todo.length}`);
  for (const L of todo) {
    await new Promise((r) => setTimeout(r, 9000)); // pacing — جلوگیری از 429
    const items = await extractLesson(zai, L);
    if (items) {
      out[L.num] = items;
      writeFileSync(OUT, JSON.stringify(out), "utf-8");
      console.log(`✓ P2 L${L.num} ${L.topic}: ${items.length} phrases`);
    } else {
      console.error(`✗ P2 L${L.num} gave up`);
    }
  }
  const total = Object.values(out).reduce((s, arr) => s + arr.length, 0);
  console.log(`P2 DONE. lessons: ${Object.keys(out).length}/50, phrases: ${total}`);
}

main().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});
