(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const log = [];
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

  for (let step = 0; step < 8; step++) {
    const body = document.body.innerText;
    if (body.includes("گزارش مأموریت")) { log.push("DONE:result"); break; }
    const bossBadge = (body.match(/رئیس واژه — مرحلهٔ ([۰-۹]+)/) || [])[1];
    const q = findQ();
    if (!q) { await sleep(400); log.push("noq"); continue; }
    if (q.mode === "sentence-chain" && q.sequence) {
      const filled = cardFilled();
      const expected = q.sequence.words[filled] ?? q.sequence.words[0];
      const t = q.targets.find((x) => x.text === expected && x.correct) || q.targets.find((x) => x.text === expected);
      const k = t ? keyOf(q, t.id) : null;
      log.push(`spell:${expected}@${filled}:${k}`);
      if (k) {
        press(k);
        for (let w = 0; w < 11; w++) {
          const chip = document.querySelector('[aria-label^="قفس واژه در پرواز"]');
          if (chip) chip.click();
          await sleep(105);
        }
      }
      else await sleep(400);
      continue;
    }
    const c = q.targets.find((t) => t.correct);
    const k = c ? keyOf(q, c.id) : null;
    log.push(`q${q.seq}:${q.mode}:${bossBadge ? "BOSS" + bossBadge : "norm"}:key${k}`);
    if (k) { press(k); await sleep(1150); }
    else await sleep(400);
  }
  const body2 = document.body.innerText;
  return JSON.stringify({ log, boss: (body2.match(/رئیس واژه — مرحلهٔ [۰-۹]+\/[۰-۹]+/) || [""])[0], result: body2.includes("گزارش مأموریت") });
})()
