(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const findBridge = () => {
    const el = document.querySelector('[aria-label^="میدان سه‌بعدی"]') || document.querySelector('[aria-label^="میدان سهبعدی"]');
    const fk = el && Object.keys(el).find((k) => k.startsWith("__reactFiber"));
    let f = fk ? el[fk] : null;
    for (let up = 0; up < 40 && f; up++) {
      let h = f.memoizedState;
      for (let hn = 0; h && hn < 500; hn++, h = h.next) {
        const v = h.memoizedState;
        if (v && typeof v === "object" && v.current && "bossPhase" in v.current && "cageEta" in v.current) return v.current;
      }
      f = f.return;
    }
    return null;
  };
  const b = findBridge();
  if (!b) return "bridge-not-found";
  const t0 = performance.now();
  let maxEta = 0;
  let etaWindows = 0;
  let inWindow = false;
  while (performance.now() - t0 < 9500) {
    if (b.cageEta > 0) {
      maxEta = Math.max(maxEta, b.cageEta);
      if (!inWindow) {
        etaWindows++;
        inWindow = true;
      }
    } else inWindow = false;
    await sleep(100);
  }
  return JSON.stringify({ bossPhase: b.bossPhase, enemyPhase: b.enemyPhase, cageWindows: etaWindows, maxEta: Math.round(maxEta * 10) / 10 });
})()
