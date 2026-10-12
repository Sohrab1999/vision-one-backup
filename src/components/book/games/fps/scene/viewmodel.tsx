"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { SceneBridge } from "../types";
import type { WeaponConfig } from "../weapons";
import { clamp, easeOutCubic } from "../helpers";

export function ViewModel({ bridge, weapon }: { bridge: React.RefObject<SceneBridge>; weapon: WeaponConfig }) {
  const gRef = useRef<THREE.Group>(null);
  const flashRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const recoil = useRef(0);
  const lastSeq = useRef(0);
  // فاز F9 — انیمیشن تعویض سلاح هنگام سوار شدن ویومدل (نیم‌چرخش نمایشی + پایین‌رفتن)
  const swapT = useRef(1);
  // فاز F4 — پوکهٔ پرتابی (فضای جهانی، خارج از گروه تفنگ)
  const casingRef = useRef<THREE.Mesh>(null);
  const casing = useRef({ active: false, t0: 0, vel: new THREE.Vector3(), spinX: 0, spinZ: 0 });
  useFrame((state, delta) => {
    const g = gRef.current;
    if (!g) return;
    const b = bridge.current;
    if (b.shoot.seq !== lastSeq.current) {
      lastSeq.current = b.shoot.seq;
      recoil.current = 1;
      // فاز F4 — پرتاب پوکه از پورت خروج (راست-بالا نسبت به دوربین) با اسپین تصادفی
      const c = casingRef.current;
      if (c) {
        const cam = state.camera;
        c.position.copy(cam.position);
        c.quaternion.copy(cam.quaternion);
        c.translateX(0.4);
        c.translateY(0.02);
        c.translateZ(-0.5);
        const right = new THREE.Vector3(1, 0, 0).applyQuaternion(cam.quaternion);
        casing.current.vel.copy(right).multiplyScalar(1.5 + Math.random() * 0.7);
        casing.current.vel.y = 1.7 + Math.random() * 0.9;
        casing.current.spinX = 9 + Math.random() * 14;
        casing.current.spinZ = 6 + Math.random() * 10;
        casing.current.active = true;
        casing.current.t0 = performance.now();
        c.visible = true;
        c.scale.setScalar(1);
      }
    }
    recoil.current = Math.max(0, recoil.current - Math.min(delta, 0.05) * 5.2);
    const r = easeOutCubic(recoil.current) * weapon.recoil;
    const t = state.clock.elapsedTime;
    // فاز F9 — اسکوپ: سلاح به مرکز دید می‌آید و لرزش آرام می‌شود (scopeAmt از FovTune)
    const sc = b.scopeAmt;
    const sway = (Math.sin(t * 1.7) * 0.006 + Math.sin(t * 0.9) * 0.004) * (1 - sc * 0.85);
    const bob = b.moveMag > 0 ? Math.sin(t * 9) * 0.014 * b.moveMag * (1 - sc * 0.8) : 0;
    // فاز F9 — انیمیشن تعویض (شروع دور) و ریلود: پایین‌رفتن + چرخش بر اساس زمان باقی‌مانده
    swapT.current = Math.max(0, swapT.current - Math.min(delta, 0.05) * 1.7);
    const sw = easeOutCubic(swapT.current);
    const rem = b.reloadUntil - performance.now();
    const rl = rem > 0 ? Math.sin(clamp(rem / weapon.reloadMs, 0, 1) * Math.PI) : 0;
    // سوار بر دوربین بدون parenting (سازگار با هر scene-graph): کپی ترنسفورم + آفست فضای دوربین
    const cam = state.camera;
    g.position.copy(cam.position);
    g.quaternion.copy(cam.quaternion);
    g.translateX((0.34 - r * 0.02) * (1 - sc * 0.92));
    g.translateY(-0.3 + sway * 0.6 + bob - r * 0.05 - sw * 0.16 - rl * 0.13);
    g.translateZ(-0.62 + r * 0.16 + sw * 0.24 - sc * 0.08);
    g.rotateX(0.05 + r * 0.34 + rl * 0.4);
    g.rotateY(-0.07 - r * 0.05 - sw * 0.85);
    g.rotateZ(r * 0.06 + rl * 0.5);
    const f = flashRef.current;
    const l = lightRef.current;
    const fs = recoil.current > 0.55 ? (recoil.current - 0.55) / 0.45 : 0;
    if (f) {
      f.visible = fs > 0.02;
      f.scale.setScalar(0.001 + fs * 0.55 * weapon.flash);
      (f.material as THREE.MeshBasicMaterial).opacity = fs;
    }
    if (l) l.intensity = fs * 7 * weapon.flash;
    // فاز F4 — پرواز پوکه: گرانش + اسپین + محو در ۰٫۹ ثانیه
    const cs = casingRef.current;
    if (cs && casing.current.active) {
      const dt = Math.min(delta, 0.05);
      const p = (performance.now() - casing.current.t0) / 900;
      if (p >= 1) {
        casing.current.active = false;
        cs.visible = false;
      } else {
        casing.current.vel.y -= 6.5 * dt;
        cs.position.addScaledVector(casing.current.vel, dt);
        cs.rotation.x += casing.current.spinX * dt;
        cs.rotation.z += casing.current.spinZ * dt;
        cs.scale.setScalar(p < 0.65 ? 1 : Math.max(0.001, 1 - (p - 0.65) / 0.35));
      }
    }
  });
  return (
    <>
      <group ref={gRef}>
        {weapon.id === "pistol" && (
          <>
            {/* بدنه اصلی */}
            <mesh position={[0, 0, 0.05]}>
              <boxGeometry args={[0.09, 0.15, 0.5]} />
              <meshStandardMaterial color="#1f2937" roughness={0.45} metalness={0.55} />
            </mesh>
            {/* لوله */}
            <mesh position={[0, 0.035, -0.34]} rotation-x={Math.PI / 2}>
              <cylinderGeometry args={[0.028, 0.032, 0.42, 12]} />
              <meshStandardMaterial color="#111827" roughness={0.35} metalness={0.7} />
            </mesh>
            {/* دستهٔ کمک‌رنگ */}
            <mesh position={[0, -0.13, 0.16]} rotation-x={-0.32}>
              <boxGeometry args={[0.075, 0.2, 0.09]} />
              <meshStandardMaterial color="#065f46" roughness={0.7} metalness={0.15} />
            </mesh>
            {/* خشاب */}
            <mesh position={[0, -0.12, -0.02]} rotation-x={0.22}>
              <boxGeometry args={[0.06, 0.16, 0.08]} />
              <meshStandardMaterial color="#374151" roughness={0.5} metalness={0.5} />
            </mesh>
            {/* ریل بالا + مگسک کهربایی */}
            <mesh position={[0, 0.085, 0.02]}>
              <boxGeometry args={[0.05, 0.03, 0.3]} />
              <meshStandardMaterial color="#0b1220" roughness={0.4} metalness={0.6} />
            </mesh>
            <mesh position={[0, 0.105, -0.18]}>
              <boxGeometry args={[0.02, 0.045, 0.03]} />
              <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.55} roughness={0.4} />
            </mesh>
            {/* جرقهٔ دهانه + نور لحظه‌ای شلیک */}
            <mesh ref={flashRef} position={[0, 0.035, -0.58]} rotation-x={Math.PI / 2} visible={false}>
              <coneGeometry args={[0.055, 0.16, 8]} />
              <meshBasicMaterial color="#fde68a" transparent opacity={0} toneMapped={false} depthWrite={false} />
            </mesh>
            <pointLight ref={lightRef} position={[0, 0.06, -0.6]} color="#fbbf24" intensity={0} distance={4} decay={2} />
          </>
        )}
        {weapon.id === "heavy" && (
          <>
            {/* بدنهٔ حجیم تیره */}
            <mesh position={[0, 0, 0.06]}>
              <boxGeometry args={[0.13, 0.19, 0.6]} />
              <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.6} />
            </mesh>
            {/* لولهٔ کلفت */}
            <mesh position={[0, 0.045, -0.4]} rotation-x={Math.PI / 2}>
              <cylinderGeometry args={[0.045, 0.05, 0.5, 12]} />
              <meshStandardMaterial color="#111827" roughness={0.3} metalness={0.75} />
            </mesh>
            {/* ترمز دهانه */}
            <mesh position={[0, 0.045, -0.68]}>
              <boxGeometry args={[0.13, 0.13, 0.09]} />
              <meshStandardMaterial color="#1f2937" roughness={0.35} metalness={0.7} />
            </mesh>
            {/* خشاب حلقه‌ای */}
            <mesh position={[0, -0.16, -0.02]} rotation-x={0.2}>
              <cylinderGeometry args={[0.075, 0.075, 0.08, 14]} />
              <meshStandardMaterial color="#374151" roughness={0.5} metalness={0.5} />
            </mesh>
            {/* دستهٔ چوب‌بلوط تیره */}
            <mesh position={[0, -0.15, 0.22]} rotation-x={-0.34}>
              <boxGeometry args={[0.085, 0.22, 0.1]} />
              <meshStandardMaterial color="#7c2d12" roughness={0.7} metalness={0.15} />
            </mesh>
            {/* نوار نارنجی شناسایی */}
            <mesh position={[0, 0.092, 0.06]}>
              <boxGeometry args={[0.135, 0.025, 0.42]} />
              <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.4} roughness={0.4} />
            </mesh>
            {/* مگسک */}
            <mesh position={[0, 0.118, -0.22]}>
              <boxGeometry args={[0.02, 0.05, 0.03]} />
              <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.6} roughness={0.4} />
            </mesh>
            {/* جرقهٔ بزرگ‌تر دهانه + گرم‌تر */}
            <mesh ref={flashRef} position={[0, 0.045, -0.78]} rotation-x={Math.PI / 2} visible={false}>
              <coneGeometry args={[0.085, 0.24, 8]} />
              <meshBasicMaterial color="#fed7aa" transparent opacity={0} toneMapped={false} depthWrite={false} />
            </mesh>
            <pointLight ref={lightRef} position={[0, 0.07, -0.8]} color="#fb923c" intensity={0} distance={5.5} decay={2} />
          </>
        )}
        {weapon.id === "pump" && (
          <>
            {/* قنداق چوبی */}
            <mesh position={[0, -0.02, 0.3]} rotation-x={0.1}>
              <boxGeometry args={[0.08, 0.14, 0.26]} />
              <meshStandardMaterial color="#78350f" roughness={0.85} metalness={0.05} />
            </mesh>
            {/* بدنهٔ فلزی */}
            <mesh position={[0, 0.02, 0.04]}>
              <boxGeometry args={[0.1, 0.14, 0.42]} />
              <meshStandardMaterial color="#292524" roughness={0.5} metalness={0.4} />
            </mesh>
            {/* دو لولهٔ کنار هم */}
            <mesh position={[-0.033, 0.05, -0.36]} rotation-x={Math.PI / 2}>
              <cylinderGeometry args={[0.027, 0.027, 0.52, 10]} />
              <meshStandardMaterial color="#1c1917" roughness={0.35} metalness={0.7} />
            </mesh>
            <mesh position={[0.033, 0.05, -0.36]} rotation-x={Math.PI / 2}>
              <cylinderGeometry args={[0.027, 0.027, 0.52, 10]} />
              <meshStandardMaterial color="#1c1917" roughness={0.35} metalness={0.7} />
            </mesh>
            {/* دستهٔ پمپ چوبی */}
            <mesh position={[0, -0.02, -0.3]}>
              <boxGeometry args={[0.115, 0.08, 0.15]} />
              <meshStandardMaterial color="#92400e" roughness={0.9} metalness={0.05} />
            </mesh>
            {/* مهرهٔ درخشان نوک لوله */}
            <mesh position={[0, 0.095, -0.6]}>
              <sphereGeometry args={[0.016, 8, 8]} />
              <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.7} roughness={0.3} />
            </mesh>
            {/* جرقهٔ پهن دهانه */}
            <mesh ref={flashRef} position={[0, 0.05, -0.72]} rotation-x={Math.PI / 2} visible={false}>
              <coneGeometry args={[0.1, 0.2, 8]} />
              <meshBasicMaterial color="#fde68a" transparent opacity={0} toneMapped={false} depthWrite={false} />
            </mesh>
            <pointLight ref={lightRef} position={[0, 0.06, -0.74]} color="#fdba74" intensity={0} distance={5} decay={2} />
          </>
        )}
      </group>
      {/* فاز F4 — پوکهٔ برنجی در فضای جهانی */}
      <mesh ref={casingRef} visible={false}>
        <cylinderGeometry args={[0.014, 0.014, 0.05, 8]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.85} roughness={0.25} emissive="#92400e" emissiveIntensity={0.25} />
      </mesh>
    </>
  );
}

