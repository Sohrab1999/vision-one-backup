(async () => {
  const norm = s => (s || "").replace(/\u200c/g, "");
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const vis = t => [...document.querySelectorAll("button,a")].filter(e => e.offsetParent && norm(e.textContent).includes(t));
  const step = async (t, ms = 1200) => { const e = vis(t)[0]; if (e) { e.click(); await sleep(ms); return true; } return false; };
  const dlg = document.querySelector("[role=dialog] button[aria-label=Close]");
  if (dlg) { dlg.click(); await sleep(600); }
  await step("پایه هفتم");
  await step("بازیها");
  const card = [...document.querySelectorAll("button")].find(x => x.offsetParent && x.className.includes("rise-in") && norm(x.textContent).startsWith("مار و پله"));
  if (!card) return "no-card";
  card.click(); await sleep(1200);
  const skip = [...document.querySelectorAll("button")].find(e => e.offsetParent && e.textContent.includes("رد کردن"));
  if (skip) { skip.click(); await sleep(500); }
  const start = [...document.querySelectorAll("button")].find(e => e.offsetParent && norm(e.textContent).trim().startsWith("شروع بازی"));
  if (!start) return "no-start";
  start.click(); await sleep(900);
  const ov = document.querySelector(".fs-enter");
  if (!ov) return "no-overlay";
  // ۳ دور پاسخ (گزینه ۲) + تاس + توقف/ادامه — با مکث طبیعی برای زنجیره
  for (let round = 0; round < 3; round++) {
    const opt = [...ov.querySelectorAll("button")].find(b => /گزینه/.test(b.getAttribute("aria-label") || ""));
    if (opt) { opt.click(); await sleep(2600); }
    const dice = [...ov.querySelectorAll("button")].find(b => /تاس/.test(norm(b.getAttribute("aria-label") || "") + norm(b.textContent)));
    if (dice && !dice.disabled) { dice.click(); await sleep(2200); }
  }
  const pause = [...ov.querySelectorAll("button")].find(b => (b.getAttribute("aria-label") || "") === "توقف بازی");
  if (pause) { pause.click(); await sleep(700); }
  const resume = [...document.querySelectorAll("button")].find(e => e.offsetParent && norm(e.textContent).trim() === "ادامهٔ بازی");
  if (resume) { resume.click(); await sleep(700); }
  const evs = (window.__ev || []).sort((a, b) => b.d - a.d);
  return JSON.stringify({
    total: evs.length,
    worst5: evs.slice(0, 5),
    max: evs[0] ? evs[0].d : 0,
  });
})()
