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
    const press = (k) => window.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true }));
    const keyOf = (q, id) => {
      const ordered = [...q.targets].sort((a, b) => a.lane - b.lane);
      const i = ordered.findIndex((t) => t.id === id);
      return i >= 0 ? String(i + 1) : null;
    };
    const cardFilled = () => {
      const card = document.querySelector('[class*="max-w-lg"][class*="rounded-2xl"]');
      return card ? card.querySelectorAll('[class*="bg-emerald-500/15"]').length : 0;
    };

    // پاسخ سریع تا تریگر رئیس (۱۵ پاسخ) — با دفاع چیپ در هر پنجره
    let answers = 0;
    const t0 = performance.now();
    while (answers < 15 && performance.now() - t0 < 40000) {
      const s = findState();
      const body = document.body.innerText;
      if (body.includes("رئیس واژه — مرحلهٔ")) break;
      if (!s || !s.q) { await sleep(200); continue; }
      let k = null;
      if (s.q.mode === "sentence-chain" && s.q.sequence) {
        const expected = s.q.sequence.words[cardFilled()] ?? s.q.sequence.words[0];
        const t = s.q.targets.find((x) => x.text === expected);
        k = t ? keyOf(s.q, t.id) : null;
      } else {
        const c = s.q.targets.find((t) => t.correct);
        k = c ? keyOf(s.q, c.id) : null;
      }
      if (k) { press(k); answers++; }
      for (let w = 0; w < 11; w++) {
        const chip = document.querySelector('[aria-label^="قفس واژه در پرواز"]');
        if (chip) chip.click();
        await sleep(100);
      }
    }
    const triggered = document.body.innerText.includes("رئیس واژه — مرحلهٔ");

    // نمونه‌برداری FPS با rAF در حین نبرد رئیس (۸ ثانیه)
    let frames = 0;
    let fpsDone = false;
    const t1 = performance.now();
    const tick = () => {
      frames++;
      if (!fpsDone) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    // هم‌زمان پاسخ مرحلهٔ ۱ را هم بزن (زیر بار واقعی سؤال + رئیس)
    let stage1Answered = false;
    while (performance.now() - t1 < 8000) {
      if (!stage1Answered) {
        const s = findState();
        if (s && s.q && s.q.mode !== "sentence-chain") {
          const c = s.q.targets.find((t) => t.correct);
          const k = c ? keyOf(s.q, c.id) : null;
          if (k) { press(k); stage1Answered = true; }
        }
      }
      const chip = document.querySelector('[aria-label^="قفس واژه در پرواز"]');
      if (chip) chip.click();
      await sleep(90);
    }
    fpsDone = true;
    const fps = Math.round((frames / 8) * 10) / 10;
    return JSON.stringify({ triggered, answers, fpsDuringBossFight: fps, headlessNote: "SwiftShader" });
  } catch (e) {
    return JSON.stringify({ err: String((e && e.message) || e) });
  }
})()
