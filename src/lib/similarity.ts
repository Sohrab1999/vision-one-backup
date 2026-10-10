/**
 * نمره‌دهی شباهت متنی برای تمرین تلفظ — مقایسهٔ خروجی ASR با جملهٔ هدف.
 *
 * دو سنجه ترکیب می‌شود:
 *  - شباهت واژه‌ای: تعداد واژه‌های درست / کل واژه‌های هدف (مرتب‌سازی‌محور)
 *  - شباهت نویسه‌ای: Levenshtein روی متن نرمال‌شده
 */

/** نرمال‌سازی: حروف کوچک، حذف نقطه‌گذاری، فاصلهٔ واحد */
export function normalizeEn(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’'`´]/g, "'")
    .replace(/[^a-z0-9'\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr: number[] = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = curr;
  }
  return prev[b.length];
}

/** شباهت نویسه‌ای ۰..۱ */
export function charSimilarity(target: string, said: string): number {
  const a = normalizeEn(target);
  const b = normalizeEn(said);
  if (!a && !b) return 1;
  if (!a || !b) return 0;
  const dist = levenshtein(a, b);
  return Math.max(0, 1 - dist / Math.max(a.length, b.length));
}

/** شباهت واژه‌ای ۰..۱ — هر واژهٔ هدف با نزدیک‌ترین واژهٔ گفته‌شده جفت می‌شود */
export function wordSimilarity(target: string, said: string): number {
  const targetWords = normalizeEn(target).split(" ").filter(Boolean);
  const saidWords = normalizeEn(said).split(" ").filter(Boolean);
  if (!targetWords.length) return saidWords.length ? 0 : 1;
  if (!saidWords.length) return 0;

  const used = new Set<number>();
  let matched = 0;
  for (const tw of targetWords) {
    let bestIdx = -1;
    let bestScore = 0;
    for (let i = 0; i < saidWords.length; i++) {
      if (used.has(i)) continue;
      const s = charSimilarity(tw, saidWords[i]);
      if (s > bestScore) {
        bestScore = s;
        bestIdx = i;
      }
    }
    if (bestIdx >= 0 && bestScore >= 0.72) {
      used.add(bestIdx);
      matched += bestScore >= 0.94 ? 1 : bestScore;
    }
  }
  return Math.min(1, matched / targetWords.length);
}

/**
 * نمرهٔ نهایی ۰..۱۰۰ — میانگین وزنی: واژه‌ای ۶۰٪ + نویسه‌ای ۴۰٪.
 * (کم‌ سخن‌گفتن جریمه می‌شود چون واژه‌های گم‌شده در سنجهٔ واژه‌ای می‌آیند؛
 * حاشیه‌گویی بیشتر از آنچه جریمهٔ جدی دارد، بواسطهٔ جفت‌سازی بهترین‌ها محدود است.)
 */
export function similarityScore(target: string, said: string): number {
  const w = wordSimilarity(target, said);
  const c = charSimilarity(target, said);
  return Math.round(100 * (0.6 * w + 0.4 * c));
}

/** برچسب کیفی بر اساس نمره */
export function scoreLabel(score: number): { label: string; tone: "great" | "good" | "try" } {
  if (score >= 85) return { label: "عالی بود! 🎉", tone: "great" };
  if (score >= 60) return { label: "خوب بود — نزدیک شدی 👍", tone: "good" };
  return { label: "تلاش کن — گوش بده و دوباره بگو 💪", tone: "try" };
}
