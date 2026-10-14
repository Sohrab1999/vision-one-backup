/**
 * U5 QA — درایو نسخهٔ ۲: صبر بر تغییر q.seq (ضد stale) + پاسخ مراحل رئیس بدون توقف.
 * هر chunk ≤ ۱۲ ثانیه (ضد timeout CDP). خروجی: window.__u5 {resolved, wrong, bossPresses, log}.
 */
(() => {
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
  const press = (k) => window.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true }));

  window.__u5 = { resolved: 0, wrong: 0, bossPresses: 0, log: [] };
  const st = window.__u5;
  const t0 = performance.now();

  return (async () => {
    const body0 = document.body.innerText;
    if (body0.includes("گزارش مأموریت")) {
      const again = [...document.querySelectorAll("button")].find((b) => (b.textContent || "").includes("دور جدید"));
      if (again) { again.click(); await sleep(2400); }
    } else if (body0.includes("شروع مأموریت")) {
      const s = [...document.querySelectorAll("button")].find((b) => /شروع مأموریت/.test(b.textContent || ""));
      if (s) { s.click(); await sleep(2400); }
    }

    while (performance.now() - t0 < 11500) {
      if (document.body.innerText.includes("گزارش مأموریت")) { st.log.push("REPORT"); break; }
      const q = findQ();
      if (!q || !q.targets) { await sleep(350); continue; }
      const seq = q.seq;
      const good = q.targets.find((t) => t.correct);
      if (!good) { await sleep(350); continue; }
      const ordered = [...q.targets].sort((a, b) => a.lane - b.lane);
      press(String(ordered.findIndex((t) => t.id === good.id) + 1));
      // صبر تا تغییر seq (resolve + advance) — سقف ۹ث (تایم‌اوت سؤال ۱۲ث را نمی‌گذرد)
      let ok = false;
      for (let i = 0; i < 18; i++) {
        await sleep(500);
        const nq = findQ();
        if (document.body.innerText.includes("گزارش مأموریت")) { ok = true; break; }
        if (nq && nq.seq !== seq) { ok = true; await sleep(600); break; }
      }
      if (document.body.innerText.includes("رئیس واژه")) st.bossPresses += 1;
      if (ok) st.resolved += 1; else st.wrong += 1;
      st.log.push((ok ? "+" : "-") + (document.body.innerText.includes("رئیس واژه") ? "B" : "n"));
      await sleep(250);
    }
    st.panSnapshot = (window.__panLog || []).length;
    return JSON.stringify({ resolved: st.resolved, wrong: st.wrong, bossPresses: st.bossPresses, tail: st.log.slice(-8), pan: st.panSnapshot, boss: document.body.innerText.includes("رئیس واژه"), report: document.body.innerText.includes("گزارش مأموریت") });
  })();
})()
