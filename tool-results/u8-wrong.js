(function () {
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var findQ = () => {
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
  const keyOf = (q, id) => {
    const ordered = [...q.targets].sort((a, b) => a.lane - b.lane);
    const i = ordered.findIndex((t) => t.id === id);
    return i >= 0 ? String(i + 1) : null;
  };
  const press = (k) => window.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true }));
  return (async function () {
    const log = [];
    for (let step = 0; step < 5; step++) {
      const body = document.body.innerText;
      if (/گزارش (مأموریت|بقا)/.test(body)) { log.push("DEAD@step" + step); break; }
      const q = findQ();
      if (!q) { await sleep(350); log.push("noq"); continue; }
      const ordered = [...q.targets].sort((a, b) => a.lane - b.lane);
      const wrong = ordered.find((t) => !t.correct);
      if (!wrong) { await sleep(350); log.push("no-wrong-target"); continue; }
      const k = keyOf(q, wrong.id);
      log.push(`q${q.seq}:wrong-key${k}`);
      if (k) { press(k); await sleep(1150); } else { await sleep(350); }
    }
    const dead = /گزارش (مأموریت|بقا)/.test(document.body.innerText);
    return JSON.stringify({ log, dead });
  })();
})()
