(async () => {
  const CARD = "__CARD__";
  const norm = s => (s || "").replace(/\u200c/g, "");
  const vis = t => [...document.querySelectorAll("button,a")].filter(e => e.offsetParent && norm(e.textContent).includes(t));
  const step = async (t, ms = 1000) => { const e = vis(t)[0]; if (e) { e.click(); await new Promise(r => setTimeout(r, ms)); return true; } return false; };
  // بستن دیالوگ تازه‌ها اگر باز باشد
  const dlgClose = document.querySelector("[role=dialog] button[aria-label=Close], [role=alertdialog] button");
  if (dlgClose && vis("بازیها").length === 0) { dlgClose.click(); await new Promise(r => setTimeout(r, 600)); }
  if (!vis("بازیها").length) await step("قفسه");
  await step("پایه هفتم", 1400);
  const okTab = await step("بازیها", 1400);
  const card = [...document.querySelectorAll("button")].find(x => x.offsetParent && x.className.includes("rise-in") && norm(x.textContent).startsWith(CARD));
  if (!card) return JSON.stringify({ game: CARD, error: "card-not-found", okTab });
  card.click();
  await new Promise(r => setTimeout(r, 900));
  // بستن آموزش خودکار اگر باز شد
  const skip = [...document.querySelectorAll("button")].find(e => e.offsetParent && e.textContent.includes("رد کردن"));
  if (skip) { skip.click(); await new Promise(r => setTimeout(r, 500)); }
  const normTxt = e => norm(e.textContent).trim();
  const startBtn = [...document.querySelectorAll("button")].find(e => e.offsetParent && (normTxt(e).startsWith("شروع") || normTxt(e).startsWith("ادامهٔ دور") || normTxt(e).startsWith("ساخت")) && e.textContent.length < 60);
  if (startBtn) startBtn.click();
  let ov = null, fsEnterSeen = false;
  for (let i = 0; i < 70; i++) {
    await new Promise(r => setTimeout(r, 50));
    ov = document.querySelector(".fs-enter");
    if (ov) {
      if (ov.getAnimations().some(a => a.animationName === "fs-enter")) fsEnterSeen = true;
      if (i < 6) continue;
      break;
    }
  }
  const de = document.documentElement;
  const fn1 = de.scrollHeight <= window.innerHeight + 1;
  const noX = de.scrollWidth <= window.innerWidth + 1;
  const hasContent = ov ? ov.innerText.replace(/\s+/g, "").length > 40 : false;
  return JSON.stringify({
    game: CARD, overlay: !!ov, fsEnterSeen,
    fn1, scrollH: de.scrollHeight, innerH: window.innerHeight, innerW: window.innerWidth, noX, hasContent,
    err: ov ? null : "no-overlay",
  });
})()
