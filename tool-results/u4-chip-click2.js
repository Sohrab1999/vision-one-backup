(async () => {
  try {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const t0 = performance.now();
    const out = [];
    let done = false;
    while (performance.now() - t0 < 24000 && !done) {
      const chip = document.querySelector('[aria-label^="قفس واژه در پرواز"]');
      if (chip) {
        const seenAt = Math.round((performance.now() - t0) / 100) / 10;
        chip.click();
        for (let w = 0; w < 30; w++) {
          await sleep(100);
          const t = document.body.innerText;
          if (t.includes("منهدوم کردی")) {
            out.push(`chip@${seenAt} → DOWNED ✓`);
            done = true;
            break;
          }
          if (t.includes("به تو خورد")) {
            out.push(`chip@${seenAt} → HIT (کلیک نجات نداد!)`);
            done = true;
            break;
          }
        }
        if (!done) out.push(`chip@${seenAt} → هیچ پیامی (کلیک بی‌اثر؟)`);
      } else {
        await sleep(150);
      }
    }
    return JSON.stringify({ out, result: document.body.innerText.includes("گزارش مأموریت") });
  } catch (e) {
    return JSON.stringify({ err: String((e && e.message) || e) });
  }
})()
