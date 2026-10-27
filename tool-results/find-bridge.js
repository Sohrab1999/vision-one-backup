(function () {
  var cs = Array.prototype.slice.call(document.querySelectorAll("canvas"));
  var game = cs.filter(function (c) { return c.className.indexOf("pointer-events-none") === -1; })[0] || cs[0];
  var key = Object.keys(game).find(function (k) { return k.indexOf("__reactFiber") === 0; });
  var f = game[key], res = null, hops = 0;
  while (f && hops < 14 && !res) {
    var hook = f.memoizedState, n = 0;
    while (hook && n < 130) {
      var m = hook.memoizedState;
      if (m && m.current && typeof m.current === "object" && m.current.aim && m.current.pos && m.current.layout && m.current.keys) {
        res = { hops: hops, h: n, fy: m.current.floorY, jy: m.current.jumpY, x: +m.current.pos.x.toFixed(2), wz: +(7 + m.current.pos.z).toFixed(2), fly: m.current.layout.enemyFlyY || null, nb: m.current.layout.boxes.length };
        break;
      }
      hook = hook.next; n++;
    }
    f = f.return; hops++;
  }
  return JSON.stringify(res);
})()
