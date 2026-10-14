(async () => {
  try {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const t0 = performance.now();
    let clicks = 0;
    let chipLog = [];
    while (performance.now() - t0 < 20000) {
      const chip = document.querySelector('[aria-label^="قفس واژه در پرواز"]');
      if (chip) {
        chipLog.push("seen@" + Math.round((performance.now() - t0) / 100) / 10);
        chip.click();
        clicks++;
        await sleep(250);
        const t = document.body.innerText;
        const downed = t.includes("منهدوم کردی");
        const hit = t.includes("به تو خورد");
        chipLog.push("clicked→" + (downed ? "DOWNED" : hit ? "HIT" : "?") + "@" + Math.round((performance.now() - t0) / 100) / 10);
        if (downed || hit) break;
      }
      await sleep(120);
    }
    return JSON.stringify({ clicks, chipLog: chipLog.slice(0, 8), result: document.body.innerText.includes("گزارش مأموریت") });
  } catch (e) {
    return JSON.stringify({ err: String((e && e.message) || e) });
  }
})()
