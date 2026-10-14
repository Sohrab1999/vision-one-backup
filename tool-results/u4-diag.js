(() => {
  try {
    const el = document.querySelector('[aria-label^="میدان سه‌بعدی"]') || document.querySelector('[aria-label^="میدان سهبعدی"]');
    if (!el) return JSON.stringify({ err: "no-el" });
    const fk = Object.keys(el).find((k) => k.startsWith("__reactFiber"));
    let f = el[fk];
    const qs = [];
    for (let up = 0; up < 40 && f; up++) {
      let h = f.memoizedState;
      for (let hn = 0; h && hn < 90; hn++, h = h.next) {
        const v = h.memoizedState;
        if (v && typeof v === "object" && Array.isArray(v.targets) && typeof v.promptMain === "string") {
          qs.push({ up, hn, seq: v.seq, mode: v.mode, stage: v.sequence ? v.sequence.words.join("") : null, n: v.targets.length });
        }
      }
      f = f.return;
    }
    const badge = (document.body.innerText.match(/رئیس واژه — مرحلهٔ [۰-۹]\/[۰-۹]/) || [""])[0];
    const time = (document.body.innerText.match(/([۰-۹]+) ثانیه/) || [""])[1];
    return JSON.stringify({ qs, badge, time, result: document.body.innerText.includes("گزارش مأموریت") });
  } catch (e) {
    return JSON.stringify({ err: String((e && e.message) || e) });
  }
})()
