import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";

const DIR = "/tmp/pages";
const PAGES = [184, 185, 186, 187, 188];

const mcqPrompt = `This page contains numbered multiple-choice English vocabulary test questions from a bilingual (English-Persian) textbook. Each question has a stem (English sentence, sometimes with A:/B: dialogue lines) and exactly 4 options labeled a., b., c., d. (sometimes shown as boxes).

Transcribe EVERY test on the page. Output one line per test in this EXACT format:
NUMBER :: STEM :: OPTION_A | OPTION_B | OPTION_C | OPTION_D

Rules:
- STEM: the full question text exactly as printed. Blanks (dashes) → "________". For dialogues keep: A: "..." B: "..." joined with a space.
- OPTIONS: exactly the 4 option texts WITHOUT the a./b./c./d. letter prefixes, separated by " | ", original order and case.
- Do not skip any test, do not translate, do not fix grammar.
- If something is truly unreadable write ?? in place.
- Output ONLY the transcription lines, no commentary, no markdown.`;

async function main() {
  const zai = await ZAI.create();
  for (const page of PAGES) {
    const file = `${DIR}/t${page}.md`;
    if (fs.existsSync(file) && fs.readFileSync(file, "utf8").includes("::")) continue;
    const b64 = fs.readFileSync(`${DIR}/pg-${String(page).padStart(3, "0")}.png`).toString("base64");
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        const res = await zai.chat.completions.createVision({
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: mcqPrompt },
                { type: "image_url", image_url: { url: `data:image/png;base64,${b64}` } },
              ],
            },
          ],
          thinking: { type: "disabled" },
        });
        const content = res.choices[0]?.message?.content ?? "";
        if (content.length < 200) throw new Error("short response");
        fs.writeFileSync(file, content);
        console.log(`OK t${page} (${content.length} chars)`);
        break;
      } catch (e) {
        console.error(`FAIL t${page} attempt ${attempt}: ${(e as Error).message}`);
        if (attempt === 4) console.error(`GIVE UP t${page}`);
        await new Promise((r) => setTimeout(r, 6000 * attempt));
      }
    }
  }
  console.log("ALL_DONE");
}

main();
