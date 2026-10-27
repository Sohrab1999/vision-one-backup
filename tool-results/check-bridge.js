(function () {
  var cs = Array.prototype.slice.call(document.querySelectorAll("canvas"));
  var game = cs.filter(function (c) { return c.className.indexOf("pointer-events-none") === -1; })[0];
  if (!game) return JSON.stringify({ err: "no-game-canvas", n: cs.length });
  var key = Object.keys(game).find(function (k) { return k.indexOf("__reactFiber") === 0; });
  var f = game[key], hops = 0, found = null;
  while (f && hops < 30 && !found) {
    var hook = f.memoizedState, n = 0;
    while (hook && n < 120) {
      var m = hook.memoizedState;
      if (m && m.current && typeof m.current === "object" && m.current.aim && m.current.pos && m.current.layout && m.current.keys) {
        found = { same: m.current === window.__fpsBridge, hops: hops, wz: +(7 + m.current.pos.z).toFixed(2) };
        break;
      }
      hook = hook.next; n++;
    }
    f = f.return; hops++;
  }
  return JSON.stringify(found || { err: "not-found" });
})()
