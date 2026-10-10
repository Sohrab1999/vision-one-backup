import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";

const DIR = "/tmp/pages";
const VOCAB_PAGES = new Set([
  8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  44, 45, 77, 78, 79, 80, 114, 115, 116, 142, 143, 144,
]);

const vocabPrompt = `This is a page from a bilingual English-Persian vocabulary textbook ("Vision One" - grade 10 English, Iran). The page contains one or two vocabulary tables. Each table row pairs an English word with its Persian meaning. The tables have two word-columns per page.

Transcribe EVERY row of the table(s) exactly as printed. Output format: one line per row in this exact form:
WORD :: PERSIAN

Rules:
- WORD: the English word/c phrase exactly as printed, including any parenthetical markers like "(n, v)" or Persian notes like "(جمع آن: knives)".
- PERSIAN: the Persian meaning exactly as printed in the adjacent cell (transcribe the actual Persian characters).
- Cover BOTH word-columns of the page if there are two. Do not skip any row, do not translate, do not merge rows.
- If a cell is truly unreadable, write ?? in its place.
- Output ONLY the transcription lines, no commentary, no markdown.`;

const textPrompt = `This page is from a bilingual English-Persian English-textbook ("Vision One"). It contains a conversation (dialogue with speaker names) or a reading passage. Each English paragraph or dialogue line is followed by its Persian translation printed below it.

Transcribe EXACTLY as printed, alternating for each block:
EN:: <english text>
FA:: <persian translation>

Rules:
- For dialogue lines include the speaker name inside EN, e.g.: EN:: Maryam: Excuse me, what is it? Is it a leopard?
- If the page has a title or intro/context sentence above the text, transcribe it first as EN::/FA:: lines too (title prefixed with "TITLE:: <english>" and "TITLEFA:: <persian>").
- Transcribe the Persian exactly as printed (real Persian characters from the image).
- Do not skip any paragraph, do not translate yourself, do not merge paragraphs.
- Output ONLY the EN::/FA::/TITLE::/TITLEFA:: lines, no commentary, no markdown.`;

async function main() {
  const zai = await ZAI.create();
  const files = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".png"))
    .map((f) => ({ f, page: parseInt(f.match(/pg-(\d+)/)![1], 10) }))
    .sort((a, b) => a.page - b.page);

  let idx = 0;
  async function worker() {
    while (idx < files.length) {
      const { f, page } = files[idx++];
      if (fs.existsSync(`${DIR}/p${page}.done`)) continue;
      const prompt = VOCAB_PAGES.has(page) ? vocabPrompt : textPrompt;
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
          if (content.length < 80) throw new Error("suspiciously short response");
          fs.writeFileSync(`${DIR}/p${page}.md`, content);
          fs.writeFileSync(`${DIR}/p${page}.done`, "1");
          console.log(`OK p${page} (${content.length} chars)`);
          break;
        } catch (e) {
          console.error(`FAIL p${page} attempt ${attempt}: ${(e as Error).message}`);
          if (attempt === 3) fs.writeFileSync(`${DIR}/p${page}.md`, "TRANSCRIBE_FAILED");
          await new Promise((r) => setTimeout(r, 8000 * attempt));
        }
      }
    }
  }
  await Promise.all(Array.from({ length: 1 }, () => worker()));
  console.log("ALL_DONE");
}

main();
