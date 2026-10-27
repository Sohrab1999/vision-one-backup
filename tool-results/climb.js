(function () {
  var b = window.__fpsBridge;
  if (!b) return "no-bridge";
  // رو به پلکان: از (0,7) به (9.7,8.9) → yaw = atan2(-9.7,-1.9) ≈ -1.766
  b.aim.yaw = -1.766;
  b.aim.pitch = 0;
  window.__climbKeys = function (down) {
    var ev = new KeyboardEvent(down ? "keydown" : "keyup", { code: "KeyW", key: "w", bubbles: true });
    window.dispatchEvent(ev);
  };
  window.__climbKeys(true);
  return "walking";
})()
