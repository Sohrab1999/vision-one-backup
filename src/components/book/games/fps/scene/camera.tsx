"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  applyFov,
  applyRig,
  applyScope,
  initRig,
  stepPlayer,
} from "../physics";
import { SceneBridge } from "../types";

export function FovTune({ fov, bridge, scoped }: { fov: number; bridge: React.RefObject<SceneBridge>; scoped: boolean }) {
  const { camera } = useThree();
  const amt = useRef({ v: 0 });
  useEffect(() => {
    applyFov(camera, fov);
  }, [camera, fov]);
  useFrame((_state, delta) => {
    applyScope(camera, bridge.current, fov, scoped, Math.min(delta, 0.05), amt.current);
  });
  return null;
}

/** دوربین اول‌شخص — چرخش + حرکت WASD/دویدن/پرش/خم‌شدن (فاز F10) + باب گام هماهنگ با سرعت واقعی */
export function Rig({ bridge }: { bridge: React.RefObject<SceneBridge> }) {
  const { camera, size } = useThree();
  const bobT = useRef(0);
  useEffect(() => {
    initRig(camera);
  }, [camera]);
  useFrame((_state, delta) => {
    const dt = Math.min(delta, 0.05); // سقف delta — پرش برگشت به تب
    const b = bridge.current;
    const spd = stepPlayer(b, dt);
    // باب سر هماهنگ با گام — فرکانس و دامنه از سرعت واقعی (نه ثابت)
    bobT.current += dt * (spd > 0.2 ? 5.4 + spd * 1.55 : 2.0);
    const amp = spd > 0.2 ? Math.min(0.05, 0.011 + spd * 0.0062) : 0.011;
    const bobY = Math.sin(bobT.current) * amp;
    applyRig(camera, b, size.width / Math.max(1, size.height), bobY);
  });
  return null;
}

