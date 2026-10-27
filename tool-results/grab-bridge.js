(function () {
  if (window.__fpsBridge) return JSON.stringify({ cached: true, jy: window.__fpsBridge.jumpY, wz: +(7 + window.__fpsBridge.pos.z).toFixed(2), fy: window.__fpsBridge.floorY });
  var cs = Array.prototype.slice.call(document.querySelectorAll("canvas"));
  var game = cs.filter(function (c) { return c.className.indexOf("pointer-events-none") === -1; })[0];
  if (!game) return JSON.stringify({ err: "no-game-canvas" });
  var key = Object.keys(game).find(function (k) { return k.indexOf("__reactFiber") === 0; });
  var f = game[key], hops = 0;
  while (f && hops < 30) {
    var hook = f.memoizedState, n = 0;
    while (hook && n < 120) {
      var m = hook.memoizedState;
      if (m && m.current && typeof m.current === "object" && m.current.aim && m.current.pos && m.current.layout && m.current.keys) {
        window.__fpsBridge = m.current;
        return JSON.stringify({ hops: hops, h: n, fy: m.current.floorY, jy: m.current.jumpY, wz: +(7 + m.current.pos.z).toFixed(2), fly: m.current.layout.enemyFlyY || null, nb: m.current.layout.boxes.length, phase: m.current.enemyPhase });
      }
      hook = hook.next; n++;
    }
    f = f.return; hops++;
  }
  return JSON.stringify({ err: "not-found" });
})()
