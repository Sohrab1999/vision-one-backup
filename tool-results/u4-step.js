(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const findQ = () => {
    const el = document.querySelector('[aria-label^="میدان سه‌بعدی"]') || document.querySelector('[aria-label^="میدان سهبعدی"]');
    if (!el) return null;
    const fk = Object.keys(el).find((k) => k.startsWith("__reactFiber"));
    if (!fk) return null;
    let f = el[fk];
    for (let up = 0; up < 40 && f; up++) {
      let h = f.memoizedState;
      for (let hn = 0; h && hn < 90; hn++, h = h.next) {
        const v = h.memoizedState;
        if (v && typeof v === "object" && Array.isArray(v.targets) && typeof v.promptMain === "string") return v;
      }
      f = f.return;
    }
    return null;
  };
  const cardFilled = () => {
    const card = document.querySelector('[class*="max-w-lg"][class*="rounded-2xl"]');
    return card ? card.querySelectorAll('[class*="bg-emerald-500/15"]').length : 0;
  };
  const keyOf = (q, id) => {
    const ordered = [...q.targets].sort((a, b) => a.lane - b.lane);
    const i = ordered.findIndex((t) => t.id === id);
    return i >= 0 ? String(i + 1) : null;
  };
  const press = (k) => window.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true }));

  // یک گام: اگر گزارش نتیجه دیده شد پایان؛ اگر سؤال هست یک پاسخ قطعی می‌زند
  const body = document.body.innerText;
  if (body.includes("گزارش مأموریت")) return JSON.stringify({ step: "result" });
  const badge = (body.match(/رئیس واژه — مرحلهٔ ([۰-۹]+)\/([۰-۹]+)/) || ["", "", ""]);
  const q = findQ();
  if (!q) return JSON.stringify({ step: "noq" });
  if (q.mode === "sentence-chain" && q.sequence) {
    const filled = cardFilled();
    const expected = q.sequence.words[filled] ?? q.sequence.words[0];
    const t = q.targets.find((x) => x.text === expected && x.correct) || q.targets.find((x) => x.text === expected);
    const k = t ? keyOf(q, t.id) : null;
    if (k) press(k);
    return JSON.stringify({ step: "spell", letter: expected, filled, key: k, word: q.sequence.en });
  }
  const c = q.targets.find((t) => t.correct);
  const k = c ? keyOf(q, c.id) : null;
  if (k) press(k);
  return JSON.stringify({ step: "q", seq: q.seq, mode: q.mode, bossStage: badge[1] || "0", key: k, prompt: (q.promptMain || "").slice(0, 24) });
})()
