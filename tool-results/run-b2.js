(function () {
  window.__drv.release("KeyW");
  var b = window.__drv.grab();
  if (!b) return "no-bridge";
  var L = (window.__drv.log = []);
  // عمق تونل — لاین شرقی (x −6.6)، جهان z −4
  b.pos.x = -6.6; b.pos.z = -4.0 - 7; b.vel.x = 0; b.vel.z = 0; b.aim.yaw = 0; b.aim.pitch = 0;
  var t0 = performance.now();
  var poll = setInterval(function () {
    var t = performance.now() - t0;
    L.push({ t: Math.round(t), wz: +(7 + b.pos.z).toFixed(1), ph: b.enemyPhase, hid: b.enemyHidden, lost: b.enemyLost, eta: +b.cageEta.toFixed(1) });
    if (t > 7000) { clearInterval(poll); L.push({ ev: "end" }); }
  }, 350);
  return "run-b2-armed";
})()
