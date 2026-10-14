(async () => {
  try {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const findState = () => {
      const el = document.querySelector('[aria-label^="میدان سه‌بعدی"]') || document.querySelector('[aria-label^="میدان سهبعدی"]');
      if (!el) return null;
      const fk = Object.keys(el).find((k) => k.startsWith("__reactFiber"));
      let f = el[fk];
      const out = {};
      for (let up = 0; up < 40 && f; up++) {
        let h = f.memoizedState;
        for (let hn = 0; h && hn < 90; hn++, h = h.next) {
          const v = h.memoizedState;
          if (v && typeof v === "object" && !out.q && Array.isArray(v.targets) && typeof v.promptMain === "string") out.q = v;
          if (v && typeof v === "object" && v.current && typeof v.current === "object" && !out.bridge && "bossPhase" in v.current && "onHit" in v.current) out.bridge = v.current;
        }
        f = f.return;
      }
      return out;
    };
    const st = findState();
    if (!st.bridge) return JSON.stringify({ err: "bridge-not-found" });
    // انتظار تا نخستین پنجرهٔ قفس رئیس (حداکثر ۱۳ث — cd ورود ۲٫۲ + شارژ ۰٫۹ + حاشیه)
    const t0 = performance.now();
    let waited = 0;
    while (performance.now() - t0 < 13000) {
      if (st.bridge.cageEta > 0) {
        waited = Math.round((performance.now() - t0) / 100) / 10;
        return JSON.stringify({ cageFlying: true, eta: Math.round(st.bridge.cageEta * 10) / 10, waited, bossPhase: st.bridge.bossPhase, enemyPhase: st.bridge.enemyPhase });
      }
      await sleep(60);
    }
    return JSON.stringify({ cageFlying: false, waited: 13, bossPhase: st.bridge.bossPhase, enemyPhase: st.bridge.enemyPhase });
  } catch (e) {
    return JSON.stringify({ err: String((e && e.message) || e) });
  }
})()
