(function () {
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  return (async function () {
    if (!window.__drive) window.__drive = { breaks: 0, holding: false, holdT0: 0, lastPh: "?" };
    var d = window.__drive;
    var end = Date.now() + 8000;
    var out = [];
    while (Date.now() < end) {
      var s = window.__drv.snap();
      var ph = s ? s.ph : "?";
      if (ph !== d.lastPh) { out.push({ t: +((Date.now() - window.__t0) / 1000).toFixed(1), ph: ph, breaks: d.breaks }); d.lastPh = ph; }
      if (d.breaks >= 3) break;
      if (!d.holding && ph === "stalk") {
        window.__drv.hold("KeyW"); d.holding = true; d.holdT0 = Date.now();
        out.push({ t: +((Date.now() - window.__t0) / 1000).toFixed(1), act: "HOLD-W", breaks: d.breaks });
      } else if (d.holding) {
        var s2 = window.__drv.snap();
        if ((s2 && s2.ph !== "stalk" && s2.ph !== "charge") || Date.now() - d.holdT0 > 3000) {
          window.__drv.release("KeyW"); d.holding = false; d.breaks += 1;
          out.push({ t: +((Date.now() - window.__t0) / 1000).toFixed(1), act: "RELEASE-BREAK#" + d.breaks, phAfter: s2 ? s2.ph : "?" });
        }
      }
      await sleep(250);
    }
    return JSON.stringify({ breaks: d.breaks, holding: d.holding, log: out.slice(-14) });
  })();
})()
