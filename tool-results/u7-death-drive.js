(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const log = [];
  const findQ = () => {
    const el = document.querySelector('[aria-label^="میدان سه"]') || document.querySelector('[aria-label^="میدان سهبعدی"]');
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
  const keyOf = (q, id) => {
    const ordered = [...q.targets].sort((a, b) => a.lane - b.lane);
    const i = ordered.findIndex((t) => t.id === id);
    return i >= 0 ? String(i + 1) : null;
  };
  const press = (k) => window.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true }));

  // سه پاسخ غلط متوالی (هدف‌های correct=false)
  for (let step = 0; step < 6; step++) {
    if (document.body.innerText.includes("گزارش بقا")) { log.push("RESULT"); break; }
    const q = findQ();
    if (!q) { await sleep(400); log.push("noq"); continue; }
    const wrong = q.targets.find((t) => !t.correct);
    const k = wrong ? keyOf(q, wrong.id) : null;
    log.push(`wrong:${k}`);
    if (k) { press(k); await sleep(1400); }
    else await sleep(400);
  }
  const body = document.body.innerText;
  return JSON.stringify({
    log,
    result: body.includes("گزارش بقا"),
    missionResult: body.includes("گزارش مأموریت"),
    wavesStat: body.includes("موج بقا"),
    snippet: body.slice(body.indexOf("گزارش"), body.indexOf("گزارش") + 400).replace(/\n/g, "|"),
  });
})()
