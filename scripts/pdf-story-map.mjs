// استخراج نقشهٔ «داستان → صفحه PDF» برای مجموعه Steps to Understanding
// اجرا: bun scripts/pdf-story-map.mjs
// خروجی: برای هر PDF — تعداد صفحات + برای هر صفحه توکن‌های عددی و نشانگرهای بخش تمرین
// تا از روی شماره‌های پاصفحه (footer) صفحهٔ شروع هر داستان استخراج شود.

import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

const FILES = [
  "public/books/hill-introductory.pdf",
  "public/books/hill-elementary.pdf",
  "public/books/hill-intermediate.pdf",
  "public/books/hill-advanced.pdf",
];

const MARKERS = [
  "Which of these sentences",
  "Answer these questions",
  "Do this puzzle",
  "Opposites",
  "Put the right sentences",
  "Draw lines",
  "Use these words",
  "Choose the correct sentence",
  "How is the first picture",
  "Vocabulary",
  "vocabulary",
];

for (const file of FILES) {
  console.log("\n===================", file);
  const doc = await pdfjs.getDocument({ url: file, useSystemFonts: false }).promise;
  console.log("totalPages:", doc.numPages);

  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const tc = await page.getTextContent();
    const text = tc.items.map((it) => it.str).join(" ").replace(/\s+/g, " ").trim();
    const tokens = text.split(" ");
    // توکن‌های عددی ۱ تا ۲ رقمی (کاندیدِ شمارهٔ پاصفحه)
    const nums = new Set();
    for (const t of tokens) {
      const m = t.match(/^(\d{1,2})[.,]?$/);
      if (m) {
        const n = Number(m[1]);
        if (n >= 2 && n <= 80) nums.add(n);
      }
    }
    // جفت‌های (n زوج، n+1) — پاصفحهٔ اسپرد داستان k=(n-2)/2
    const storyCands = [];
    for (const n of nums) {
      if (n % 2 === 0 && nums.has(n + 1)) storyCands.push((n - 2) / 2 + 1);
    }
    const markers = MARKERS.filter((m) => text.includes(m));
    const head = text.slice(0, 90).replace(/[^\x20-\x7E]/g, "?");
    console.log(
      `p${String(p).padStart(2, "0")} chars=${String(text.length).padStart(4)} stories=[${storyCands.join(",")}] marks=[${markers.join("|")}] :: ${head}`,
    );
    page.cleanup();
  }
}
console.log("\nDONE");
