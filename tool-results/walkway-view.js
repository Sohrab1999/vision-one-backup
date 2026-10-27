(function () {
  var b = window.__drv.grab();
  if (!b) return "no-bridge";
  window.__drv.release("KeyW");
  // روی گذرگاه — نگاه به میدان (جنوب‌غرب، کمی پایین)
  b.pos.x = 9.7; b.pos.z = -0.2 - 7; b.vel.x = 0; b.vel.z = 0; b.jumpY = 3.16; b.floorY = 3.16;
  b.aim.yaw = -2.2; b.aim.pitch = -0.22;
  return "on-walkway";
})()
