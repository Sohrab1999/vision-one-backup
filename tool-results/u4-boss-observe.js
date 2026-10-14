(async () => {
  try {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const findState = () => {
      const el = document.querySelector('[aria-label^="میدان سه‌بعدی"]') || document.querySelector('[aria-label^="میدان سهبعدی"]');
      if (!el) return {};
      const fk = Object.keys(el).find((k) => k.startsWith("__reactFiber"));
      let f = fk ? el[fk] : null;
      const out = {};
      for (let up = 0; up < 40 && f; up++) {
        let h = f.memoizedState;
        for (let hn = 0; h && hn < 500; hn++, h = h.next) {
          const v = h.memoizedState;
          if (v && typeof v === "object" && !out.q && Array.isArray(v.targets) && typeof v.promptMain === "string") out.q = v;
          if (v && typeof v === "object" && v.current && !out.bridge && "bossPhase" in v.current && "cageEta" in v.current) out.bridge = v.current;
        }
        f = f.return;
      }
      return out;
    };
    const st = findState();
    if (!st.bridge) return JSON.stringify({ err: "bridge-not-found", hasQ: !!st.q });

    // ── پنجرهٔ مشاهدهٔ ۹ ثانیه‌ای: قفس رئیس (cageEta + چیپ DOM) ──
    const t0 = performance.now();
    let maxEta = 0;
    let etaWindows = 0;
    let inWindow = false;
    let chipSeen = false;
    let chipText = "";
    while (performance.now() - t0 < 9000) {
      if (st.bridge.cageEta > 0) {
        maxEta = Math.max(maxEta, st.bridge.cageEta);
        if (!inWindow) {
          etaWindows++;
          inWindow = true;
        }
      } else inWindow = false;
      if (!chipSeen) {
        const chip = document.querySelector('[aria-label^="قفس واژه در پرواز"]');
        if (chip) {
          chipSeen = true;
          chipText = (chip.getAttribute("aria-label") || "").slice(0, 50);
        }
      }
      await sleep(100);
    }
    const obs = { cageWindows: etaWindows, maxEta: Math.round(maxEta * 10) / 10, chipSeen, chipText, bossPhase: st.bridge.bossPhase, enemyPhase: st.bridge.enemyPhase };

    // ── پاسخ یک گام (بعد از مشاهده — بدون مرگ میانی) ──
    const s2 = findState();
    if (!s2.q) return JSON.stringify({ obs, step: "noq" });
    const keyOf = (q, id) => {
      const ordered = [...q.targets].sort((a, b) => a.lane - b.lane);
      const i = ordered.findIndex((t) => t.id === id);
      return i >= 0 ? String(i + 1) : null;
    };
    const press = (k) => window.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true }));
    if (s2.q.mode === "sentence-chain" && s2.q.sequence) {
      const card = document.querySelector('[class*="max-w-lg"][class*="rounded-2xl"]');
      const filled = card ? card.querySelectorAll('[class*="bg-emerald-500/15"]').length : 0;
      const expected = s2.q.sequence.words[filled] ?? s2.q.sequence.words[0];
      const t = s2.q.targets.find((x) => x.text === expected);
      const k = t ? keyOf(s2.q, t.id) : null;
      if (k) press(k);
      return JSON.stringify({ obs, step: "spell", letter: expected, key: k });
    }
    const c = s2.q.targets.find((t) => t.correct);
    const k = c ? keyOf(s2.q, c.id) : null;
    if (k) press(k);
    return JSON.stringify({ obs, step: "q", key: k });
  } catch (e) {
    return JSON.stringify({ err: String((e && e.message) || e) });
  }
})()
