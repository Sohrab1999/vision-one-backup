(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const btn = (t) => [...document.querySelectorAll("button")].find((b) => b.textContent.includes(t));
  const live = () => ((document.querySelector("[aria-live=polite],[role=status]") || {}).textContent || "");
  const out = { taps: 0, rotations: 0 };
  try {
    // ۰) رسیدن به playing
    const gameCanvas = () => {
      const wrap = document.querySelector('[aria-label^="میدان"]');
      return wrap ? wrap.querySelector("canvas") : null;
    };
    if (!gameCanvas()) {
      const again = btn("دور جدید");
      if (again) again.click();
      else {
        const st = btn("شروع مأموریت");
        if (st) st.click();
        else return "no-entry";
      }
      await sleep(2000);
    }
    let cv = gameCanvas();
    if (!cv) return "no-canvas";
    // ۱) bridge از element-tree: صعود از DOM fiber تا fiber فرزندان Canvas
    const fk = Object.keys(cv).find((k) => k.startsWith("__reactFiber"));
    if (!fk) return "no-dom-fiber";
    let bridge = null;
    const scanEls = (el, depth) => {
      if (!el || depth > 6 || bridge) return;
      if (el.props) {
        if (el.props.bridge && el.props.bridge.current && el.props.bridge.current.aim) {
          bridge = el.props.bridge.current;
          return;
        }
        const kids = el.props.children;
        if (Array.isArray(kids)) kids.forEach((k) => scanEls(k, depth + 1));
        else scanEls(kids, depth + 1);
      }
    };
    let f = cv[fk];
    let hops = 0;
    while (f && !bridge && hops < 60) {
      const p = f.memoizedProps;
      if (p && p.children) {
        (Array.isArray(p.children) ? p.children : [p.children]).forEach((c) => scanEls(c, 0));
      }
      f = f.return;
      hops++;
    }
    out.hops = hops;
    if (!bridge) return "no-bridge";
    const b = bridge;
    // ۲) صبر تا تعقیب — پهپاد ساکن می‌شود
    let guard = 0;
    while (b.enemyPhase !== "stalk" && guard < 26) {
      await sleep(350);
      guard++;
      if (!document.querySelector("canvas")) {
        const again = btn("دور جدید");
        if (again) {
          again.click();
          await sleep(2000);
        }
      }
    }
    out.phase = b.enemyPhase;
    if (b.enemyPhase !== "stalk") return JSON.stringify(out) + ":no-stalk";
    // ۳) جاروب ۳۶۰°: چهار چرخش ۹۰° × ده تپ (دو نوار ارتفاع)
    const r0 = cv.getBoundingClientRect();
    const cx = r0.left + r0.width / 2;
    const cy = r0.top + r0.height / 2;
    const pe = (t, x, y) =>
      cv.dispatchEvent(new PointerEvent(t, { clientX: x, clientY: y, button: 0, pointerId: 9, bubbles: true, isPrimary: true }));
    let hit = false;
    for (let rot = 0; rot < 4 && !hit; rot++) {
      for (const nx of [-0.4, -0.2, 0, 0.2, 0.4]) {
        for (const ny of [0.2, 0.45]) {
          if (!gameCanvas()) return JSON.stringify(out) + ":round-died";
          const px = cx + nx * (r0.width / 2);
          const py = cy - ny * (r0.height / 2);
          pe("pointerdown", px, py);
          pe("pointerup", px, py);
          out.taps++;
          await sleep(540);
          if (live().includes("عقب کشید")) {
            hit = true;
            out.hitNdc = [nx, ny];
            break;
          }
        }
        if (hit) break;
      }
      if (hit) break;
      // چرخش ۹۰ درجه
      pe("pointerdown", cx, cy);
      for (let i = 1; i <= 8; i++) {
        pe("pointermove", cx + i * 40, cy + 3);
        await sleep(14);
      }
      pe("pointerup", cx + 320, cy + 3);
      out.rotations++;
      await sleep(420);
      cv = gameCanvas() || cv;
    }
    out.hitFlee = hit;
    out.liveAfter = live().slice(0, 70);
    return JSON.stringify(out);
  } catch (e) {
    return "ERR:" + e.message;
  }
})()
