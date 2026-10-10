import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";

const DIR = "/tmp/g12hi";
const OUT = "/tmp/g12vlm";

const prompt = `This is one page of a vocabulary table from an Iranian English textbook booklet (Vision Three, grade 12). The table has FOUR visual columns per row. Reading the page from LEFT to RIGHT, the column order is: [English word] [Persian meaning of that word] [English word] [Persian meaning of that word]. (The exact leftmost column may sometimes be the Persian meaning instead — rely on what you SEE.)

Transcribe EVERY visible table row exactly as printed. Output format, one line per visual row, cells separated by " :: " in strict LEFT-to-RIGHT order:
CELL1 :: CELL2 :: CELL3 :: CELL4

Rules:
- Transcribe English exactly as printed (keep capitalization, punctuation, parentheses like "(n, adj)" or "(sit on) lap").
- Transcribe Persian EXACTLY as printed with real Persian characters, including commas "،" and dashes "-". Do NOT translate, do NOT fix typos, do NOT normalize. Copy what is printed.
- If a Persian cell spans two printed lines inside the cell, join them into one string with a single space.
- Do not skip any row. Do not merge rows. Transcribe the table title line first as "TITLE:: <text>" and skip the "Persian Meanings"/"Words" column header row.
- Ignore the page footer line (تألیف و گردآوری ...).
- If a cell is truly unreadable write ??.
- Output ONLY the transcription lines, no commentary, no markdown fences.`;

async function main() {
  const zai = await ZAI.create();
  const files = fs
    .readdirSync(DIR)
    .filter((f) => f.startsWith("pg-") && f.endsWith(".png"))
    .map((f) => ({ f, page: parseInt(f.match(/pg-(\d+)-/)?.[1] ?? "0", 10) }))
    .sort((a, b) => a.page - b.page);

  let idx = 0;
  async function worker() {
    while (idx < files.length) {
      const { f, page } = files[idx++];
      if (fs.existsSync(`${OUT}/p${page}.md`)) continue;
      const b64 = fs.readFileSync(`${DIR}/${f}`).toString("base64");
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const res = await zai.chat.completions.createVision({
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: prompt },
                  { type: "image_url", image_url: { url: `data:image/png;base64,${b64}` } },
                ],
              },
            ],
            thinking: { type: "disabled" },
          });
          const content = res.choices[0]?.message?.content ?? "";
          if (content.length < 200) throw new Error("suspiciously short response");
          fs.writeFileSync(`${OUT}/p${page}.md`, content);
          console.log(`OK p${page} (${content.length} chars)`);
          break;
        } catch (e) {
          console.error(`FAIL p${page} attempt ${attempt}: ${(e as Error).message}`);
          if (attempt === 3) fs.writeFileSync(`${OUT}/p${page}.md`, "TRANSCRIBE_FAILED");
          await new Promise((r) => setTimeout(r, 8000 * attempt));
        }
      }
    }
  }
  await Promise.all(Array.from({ length: 3 }, () => worker()));
  console.log("ALL_DONE");
}

main();
