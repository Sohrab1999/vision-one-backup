(async () => {
  const norm = s => (s || "").replace(/\u200c/g, "");
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const ov = document.querySelector(".fs-enter");
  if (!ov) return "no-overlay";
  window.__ev = [];
  if (!window.__obs) {
    window.__obs = new PerformanceObserver(l => { for (const e of l.getEntries()) window.__ev.push({ n: e.name, d: Math.round(e.duration) }); });
    window.__obs.observe({ type: "event", durationThreshold: 16 });
  }
  const rectOf = sel => {
    const el = [...ov.querySelectorAll("button")].find(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) };
  };
  window.__targets = { opt: null, dice: null, pause: null, resume: null };
  window.__targets.opt = rectOf(b => /گزینه/.test(b.getAttribute("aria-label") || ""));
  window.__targets.dice = rectOf(b => /تاس/.test(norm(b.getAttribute("aria-label") || "") + norm(b.textContent)));
  window.__targets.pause = rectOf(b => (b.getAttribute("aria-label") || "") === "توقف بازی");
  return JSON.stringify({ targets: window.__targets, count: (window.__ev || []).length });
})()
