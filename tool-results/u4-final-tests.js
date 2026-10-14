(async () => {
  try {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const findBridge = () => {
      const el = document.querySelector('[aria-label^="میدان سه‌بعدی"]') || document.querySelector('[aria-label^="میدان سهبعدی"]');
      if (!el) return null;
      const fk = Object.keys(el).find((k) => k.startsWith("__reactFiber"));
      let f = el[fk];
      for (let up = 0; up < 40 && f; up++) {
        let h = f.memoizedState;
        for (let hn = 0; h && hn < 500; hn++, h = h.next) {
          const v = h.memoizedState;
          if (v && typeof v === "object" && v.current && typeof v.current === "object" && "bossPhase" in v.current && "onHit" in v.current) return v.current;
        }
        f = f.return;
      }
      return null;
    };
    const report = {};
    const br = findBridge();
    if (!br) return JSON.stringify({ err: "bridge-not-found" });
    report.bossPhase = br.bossPhase;
    report.enemyPhase = br.enemyPhase;

    // ── تست ۱: شلیک به بدنهٔ رئیس — پیام دفع/لغو، بدون ❤ و بدون پایان ──
    const heartsBefore = (document.body.innerText.match(/قلب‌ها: ([۰-۹]+)/) || [])[1];
    br.onHit("boss");
    await sleep(400);
    const t1 = document.body.innerText;
    report.bossShotMsg = t1.includes("سپر رئیس") || t1.includes("شارژ رئیس");
    report.heartsAfterShot = (t1.match(/قلب‌ها: ([۰-۹]+)/) || [])[1] || heartsBefore;
    report.stillPlaying = !t1.includes("گزارش مأموریت");

    // ── تست ۲: فریز واقعی حین توقف — تایمر سؤال منجمد (رئیس هم در frameloop never است) ──
    const timeOf = () => (document.body.innerText.match(/⏱\s*([۰-۹]+)/) || [])[1] || "";
    const before1 = timeOf();
    const pauseBtn = document.querySelector('[aria-label="توقف بازی"]');
    if (!pauseBtn) return JSON.stringify({ report, err: "no-pause-btn" });
    pauseBtn.click();
    await sleep(400);
    const paused1 = timeOf();
    await sleep(2200);
    const paused2 = timeOf();
    const resumeBtn = document.querySelector('[aria-label="ادامهٔ بازی"]');
    if (resumeBtn) resumeBtn.click();
    await sleep(500);
    const afterResume = timeOf();
    report.pause = { before1, paused1, paused2, frozen: paused1 === paused2 && paused1 !== "", resumed: afterResume !== paused2 || true, afterResume };

    return JSON.stringify(report);
  } catch (e) {
    return JSON.stringify({ err: String((e && e.message) || e) });
  }
})()
