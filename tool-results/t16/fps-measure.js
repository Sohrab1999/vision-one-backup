(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const btn = (t) => [...document.querySelectorAll("button")].find((b) => b.textContent.includes(t));
  const live = () => ((document.querySelector("[aria-live=polite],[role=status]") || {}).textContent || "");
  const out = {};
  const measureFps = async (ms) => {
    return await new Promise((res) => {
      let n = 0;
      const t0 = performance.now();
      const f = () => {
        n++;
        if (performance.now() - t0 < ms) requestAnimationFrame(f);
        else res(Math.round((n * 1000) / (performance.now() - t0)));
      };
      requestAnimationFrame(f);
    });
  };
  const toSetup = async () => {
    for (let i = 0; i < 3; i++) {
      const ex = btn("پایان دور");
      if (ex) {
        ex.click();
        await sleep(600);
        const yes = [...document.querySelectorAll("[role=alertdialog] button,[role=dialog] button")].find((b) => /خروج/.test(b.textContent));
        if (yes) {
          yes.click();
          await sleep(600);
        }
      }
      if (btn("شروع مأموریت")) return true;
      const rd = btn("دور جدید");
      if (rd) {
        rd.click();
        await sleep(1200);
      }
    }
    return !!btn("شروع مأموریت");
  };
  const runRound = async (difficultyLabel, measureMs) => {
    const d = [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === difficultyLabel);
    if (d) {
      d.click();
      await sleep(300);
    }
    const st = btn("شروع مأموریت");
    if (!st) return "no-start";
    st.click();
    await sleep(2600);
    const fps = await measureFps(measureMs);
    await toSetup();
    return fps;
  };
  try {
    await toSetup();
    // نقشهٔ dust = «دروازهٔ دو در»
    const dm = btn("دروازهٔ دو در");
    if (dm) {
      dm.click();
      await sleep(300);
    }
    out.mapSaved = localStorage.getItem("visionone:game-pref:fps-map");
    out.dustFpsDroneOn = await runRound("عادی", 2500);
    out.dustFpsDroneOff = await runRound("آسان — بدون دشمن", 2500);
    // نقشهٔ desert = «کویر کهربا»
    const ds = btn("کویر کهربا");
    if (ds) {
      ds.click();
      await sleep(300);
    }
    out.desertFpsDroneOn = await runRound("عادی", 2500);
    out.desertFpsDroneOff = await runRound("آسان — بدون دشمن", 2500);
    // بازگشت به جنگل + عادی (پاک‌سازی وضعیت QA)
    const fg = btn("جنگل زمردی");
    if (fg) fg.click();
    const nm = [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === "عادی");
    if (nm) nm.click();
    return JSON.stringify(out);
  } catch (e) {
    return "ERR:" + e.message;
  }
})()
