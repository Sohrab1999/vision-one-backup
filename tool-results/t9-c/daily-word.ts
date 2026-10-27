// محاسبهٔ واژهٔ روز وردل — همان مسیر index.tsx (برای QA مسیر پذیرش حدس)
import { hashStr } from "../../src/components/book/games/wordle/helpers";
import { VISION_ONE_BOOK } from "../../src/data/vision-one/index";

const vocabAll: Array<{ word: string }> = (VISION_ONE_BOOK as unknown as {
  vocab: { all: Array<{ word: string }> };
}).vocab.all;

const re = new RegExp(`^[a-zA-Z]{5}$`);
const seen = new Set<string>();
const out: Array<{ word: string }> = [];
for (const w of vocabAll) {
  if (!re.test(w.word)) continue;
  const key = w.word.toLowerCase();
  if (seen.has(key)) continue;
  seen.add(key);
  out.push(w);
}
out.sort((a, b) => {
  const x = a.word.toLowerCase();
  const y = b.word.toLowerCase();
  return x < y ? -1 : x > y ? 1 : 0;
});

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}
const d = new Date();
const today = `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const bookId = "vision-one";
const answer = out[hashStr(`${bookId}:${today}`) % out.length].word.toLowerCase();
console.log(JSON.stringify({ today, pool: out.length, answer }));
