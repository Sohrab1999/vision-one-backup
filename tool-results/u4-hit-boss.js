(() => {
  try {
    const el = document.querySelector('[aria-label^="میدان سه‌بعدی"]') || document.querySelector('[aria-label^="میدان سهبعدی"]');
    if (!el) return "no-el";
    const fk = Object.keys(el).find((k) => k.startsWith("__reactFiber"));
    let f = el[fk];
    for (let up = 0; up < 40 && f; up++) {
      let h = f.memoizedState;
      for (let hn = 0; h && hn < 500; hn++, h = h.next) {
        const v = h.memoizedState;
        if (v && typeof v === "object" && v.current && typeof v.current === "object" && "bossPhase" in v.current) {
          const br = v.current;
          br.onHit("boss");
          return JSON.stringify({ called: true, bossPhase: br.bossPhase, up, hn });
        }
      }
      f = f.return;
    }
    return "nf";
  } catch (e) {
    return JSON.stringify({ err: String((e && e.message) || e) });
  }
})()
