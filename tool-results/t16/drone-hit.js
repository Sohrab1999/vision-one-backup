(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const btn = (t) => [...document.querySelectorAll("button")].find((b) => b.textContent.includes(t));
  const live = () => ((document.querySelector("[aria-live=polite],[role=status]") || {}).textContent || "");
  const out = {};
  try {
    // ۰) رسیدن به حالت playing
    if (!document.querySelector("canvas")) {
      const again = btn("دور جدید");
      if (again) again.click();
      else {
        const st = btn("شروع مأموریت");
        if (st) st.click();
        else return "no-entry";
      }
      await sleep(1800);
    }
    let cv = document.querySelector("canvas");
    if (!cv) return "no-canvas";
    // ۱) fiber walk — یافتن bridge (props.bridge.current.aim) و مش پهپاد (userData.id=drone)
    const findRoot = () => {
      for (const k of Object.keys(cv)) {
        if (k.startsWith("__reactContainer")) return cv[k];
      }
      return null;
    };
    const rootF = findRoot();
    if (!rootF) return "no-react-root";
    let bridge = null;
    let droneMesh = null;
    const seen = new Set();
    const queue = [rootF];
    let n = 0;
    while (queue.length && n < 8000) {
      const f = queue.shift();
      n++;
      if (!f || seen.has(f)) continue;
      seen.add(f);
      const p = f.memoizedProps;
      if (p && p.bridge && p.bridge.current && p.bridge.current.aim && !bridge) bridge = p.bridge.current;
      const sn = f.stateNode;
      if (sn && sn.userData && sn.userData.id === "drone" && !droneMesh) droneMesh = sn;
      if (f.child) queue.push(f.child);
      if (f.sibling) queue.push(f.sibling);
    }
    out.fiberNodes = n;
    if (!bridge) return "no-bridge";
    if (!droneMesh) return "no-drone-mesh:" + (bridge.enemyPhase || "?");
    // ۲) صبر تا تعقیب (پهپاد می‌ایستد — هدف ساکن)
    let guard = 0;
    while (bridge.enemyPhase !== "stalk" && guard < 24) {
      await sleep(350);
      guard++;
    }
    out.phase = bridge.enemyPhase;
    // ۳) محاسبهٔ NDC پهپاد از هندسهٔ دوربین
    const r = cv.getBoundingClientRect();
    const b = bridge;
    const baseZ = 7 + (1 - b.laneK) * 4.2;
    const cx0 = b.pos.x;
    const cz0 = baseZ + b.pos.z;
    const gp = droneMesh.parent.position;
    const dx = gp.x - cx0;
    const dz = gp.z - cz0;
    const yaw = b.aim.yaw;
    const fwdX = -Math.sin(yaw);
    const fwdZ = -Math.cos(yaw);
    const distF = dx * fwdX + dz * fwdZ;
    const xR = dx * Math.cos(yaw) - dz * Math.sin(yaw);
    const yU = gp.y - 1.7;
    if (distF <= 0.3) return "drone-behind:" + JSON.stringify({ distF, phase: bridge.enemyPhase });
    const tanV = Math.tan((72 / 2) * (Math.PI / 180));
    const tanH = tanV * (r.width / r.height);
    const ndcX = xR / distF / tanH;
    const ndcY = yU / distF / tanV;
    out.ndc = [Number(ndcX.toFixed(2)), Number(ndcY.toFixed(2))];
    out.distF = Number(distF.toFixed(2));
    // ۴) تپ دقیق
    const px = r.left + r.width / 2 + ndcX * (r.width / 2);
    const py = r.top + r.height / 2 - ndcY * (r.height / 2);
    const pe = (t, x, y) =>
      cv.dispatchEvent(new PointerEvent(t, { clientX: x, clientY: y, button: 0, pointerId: 9, bubbles: true, isPrimary: true }));
    pe("pointerdown", px, py);
    pe("pointerup", px, py);
    await sleep(650);
    out.liveAfter = live().slice(0, 70);
    out.hitFlee = live().includes("عقب کشید");
    return JSON.stringify(out);
  } catch (e) {
    return "ERR:" + e.message;
  }
})()
