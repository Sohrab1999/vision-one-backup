"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { LAYOUTS } from "../layouts";
import { ENV_ROCKS, ENV_TUFTS } from "../constants";
import { shuffle } from "../../shared";
import { CloudDrift, SkyOrb, StarField } from "./sky";
import type { MapConfig } from "../maps";
import type { SceneBridge, BurstApi } from "../types";

export function FieldProps({ map, tier }: { map: MapConfig; tier: 0 | 1 | 2 }) {
  const rockColor = map.id === "night" ? "#334155" : map.mountain;
  const tuftColor = map.decoColors[1];
  const boxes = LAYOUTS[map.id].boxes;
  const rocks = useMemo(
    () =>
      Array.from({ length: ENV_ROCKS[tier] }, (_, i) => ({
        key: `rk${i}`,
        x: (i % 2 === 0 ? 1 : -1) * (1.2 + Math.random() * 7.6),
        z: -1 - Math.random() * 14,
        s: 0.18 + Math.random() * 0.3,
        rot: Math.random() * Math.PI,
      })),
    [tier],
  );
  const tufts = useMemo(
    () =>
      Array.from({ length: ENV_TUFTS[tier] }, (_, i) => ({
        key: `tf${i}`,
        x: (i % 2 === 0 ? -1 : 1) * (0.7 + Math.random() * 6.8),
        z: -1.5 - Math.random() * 11,
        s: 0.7 + Math.random() * 0.7,
      })),
    [tier],
  );
  return (
    <group>
      {/* سازه‌های چیدمان — همان لیستی که برخورد بازیکن با آن است */}
      {boxes.map((bx, i) => {
        if (bx.k === "tree") {
          return (
            <group key={`bx${i}`} position={[bx.x, 0, bx.z]}>
              <mesh position={[0, bx.h / 2, 0]}>
                <cylinderGeometry args={[0.22, 0.3, bx.h, 7]} />
                <meshStandardMaterial color="#4a3620" roughness={0.9} flatShading />
              </mesh>
              <mesh position={[0, bx.h + 0.75, 0]}>
                <coneGeometry args={[1.05, 1.8, 7]} />
                <meshStandardMaterial color="#15803d" roughness={0.9} flatShading />
              </mesh>
            </group>
          );
        }
        if (bx.k === "crystal") {
          return (
            <mesh key={`bx${i}`} position={[bx.x, bx.h / 2, bx.z]} rotation-y={i * 0.7} scale={[bx.w * 0.95, bx.h, bx.d * 0.95]}>
              <octahedronGeometry args={[0.5, 0]} />
              <meshStandardMaterial
                color={map.accentColor}
                emissive={map.accentColor}
                emissiveIntensity={map.decoGlow * 1.3 + 0.35}
                flatShading
                roughness={0.3}
                metalness={0.1}
              />
            </mesh>
          );
        }
        const color =
          bx.k === "crate" || bx.k === "sandbag"
            ? map.crateColor
            : bx.k === "door" || bx.k === "doorOpen" || bx.k === "post"
              ? map.doorColor
              : map.wallColor;
        const rough = bx.k === "door" || bx.k === "doorOpen" ? 0.75 : 0.95;
        return (
          <group key={`bx${i}`}>
            <mesh position={[bx.x, (bx.y ?? 0) + bx.h / 2, bx.z]} rotation-y={bx.rot ?? 0}>
              <boxGeometry args={[bx.w, bx.h, bx.d]} />
              <meshStandardMaterial color={color} roughness={rough} flatShading />
            </mesh>
            {/* نوار تأکیدی روی درها — خواناییِ «در» در نگاه اول */}
            {(bx.k === "door" || bx.k === "doorOpen") && (
              <mesh position={[bx.x, (bx.y ?? 0) + bx.h - 0.18, bx.z]} rotation-y={bx.rot ?? 0}>
                <boxGeometry args={[bx.w * 0.92, 0.09, bx.d + 0.04]} />
                <meshStandardMaterial color={map.accentColor} roughness={0.5} metalness={0.2} />
              </mesh>
            )}
          </group>
        );
      })}
      {/* سنگ‌ریزه‌های پراکنده */}
      {rocks.map((r) => (
        <mesh key={r.key} position={[r.x, r.s * 0.6, r.z]} rotation-y={r.rot}>
          <dodecahedronGeometry args={[r.s, 0]} />
          <meshStandardMaterial color={rockColor} flatShading roughness={1} />
        </mesh>
      ))}
      {/* بوته‌ها */}
      {tufts.map((t) => (
        <mesh key={t.key} position={[t.x, 0.22 * t.s, t.z]}>
          <coneGeometry args={[0.16 * t.s, 0.5 * t.s, 6]} />
          <meshStandardMaterial color={tuftColor} flatShading roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/** میدان low-poly با پالت نقشه (فاز F6): زمین، کوه، آسمان زنده و عناصر محیطی — فاز G2-e: deco پارامتر */
export function Arena({ map, deco, tier }: { map: MapConfig; deco: number; tier: 0 | 1 | 2 }) {
  const decoShapes = useMemo(
    () =>
      shuffle(
        Array.from({ length: deco }, (_, i) => ({
          key: `d${i}`,
          kind: (i % 3 === 0 ? "octa" : i % 3 === 1 ? "box" : "dodeca") as "octa" | "box" | "dodeca",
          pos: [
            (i % 2 === 0 ? 1 : -1) * (7.5 + Math.random() * 8),
            0.8 + Math.random() * 4.2,
            -4 - Math.random() * 18,
          ] as [number, number, number],
          hue: map.decoColors[i % map.decoColors.length],
          spin: 0.2 + Math.random() * 0.4,
          bob: 0.4 + Math.random() * 0.5,
          scale: 0.5 + Math.random() * 1.1,
        })),
      ),
    [deco, map],
  );
  const mounts = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        key: `m${i}`,
        pos: [-24 + i * 9.5 + Math.random() * 4, 0, -26 - Math.random() * 6] as [number, number, number],
        h: 5 + Math.random() * 5,
        r: 3 + Math.random() * 2.4,
      })),
    [],
  );
  return (
    <>
      <color attach="background" args={[map.bg]} />
      <fog attach="fog" args={[map.bg, map.fogNear, map.fogFar]} />
      <ambientLight intensity={map.ambIntensity} />
      <hemisphereLight args={[map.hemiSky, map.hemiGround, 0.55]} />
      <directionalLight position={[5, 9, 3]} intensity={map.sunIntensity} color={map.sunColor} />
      {/* زمین دایره‌ای */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, -7]}>
        <circleGeometry args={[30, 44]} />
        <meshStandardMaterial color={map.ground} roughness={0.95} />
      </mesh>
      {/* حلقه‌های راهنمای زمین */}
      {[5.4, 9.2, 13.4].map((r, i) => (
        <mesh key={r} rotation-x={-Math.PI / 2} position={[0, 0.02, -7]}>
          <ringGeometry args={[r, r + 0.22, 52]} />
          <meshBasicMaterial color={i === 0 ? map.ringMain : map.ringOther} transparent opacity={0.3 - i * 0.07} />
        </mesh>
      ))}
      {/* کوه‌های low-poly دوردست */}
      {mounts.map((m) => (
        <mesh key={m.key} position={m.pos}>
          <coneGeometry args={[m.r, m.h, 5]} />
          <meshStandardMaterial color={map.mountain} flatShading roughness={1} />
        </mesh>
      ))}
      {/* آسمان زنده — فاز F7 */}
      {map.orb && <SkyOrb orb={map.orb} />}
      {map.stars && <StarField />}
      {map.clouds > 0 && <CloudDrift count={map.clouds} color={map.cloudColor} />}
      {/* عناصر محیطی — جعبه/ابلیسک/سنگ/بوته */}
      <FieldProps map={map} tier={tier} />
      {/* اجسام شناور تزئینی */}
      {decoShapes.map((d) => (
        <DecoShape key={d.key} spec={d} glow={map.decoGlow} />
      ))}
    </>
  );
}

export interface DecoSpec {
  key: string;
  kind: "octa" | "box" | "dodeca";
  pos: [number, number, number];
  hue: number;
  spin: number;
  bob: number;
  scale: number;
}

export function DecoShape({ spec, glow }: { spec: DecoSpec; glow: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const t0 = useMemo(() => Math.random() * 8, []);
  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    m.position.y = spec.pos[1] + Math.sin(t * spec.bob + t0) * 0.55;
    m.rotation.y = t * spec.spin;
    m.rotation.x = t * spec.spin * 0.55;
  });
  return (
    <mesh ref={ref} position={spec.pos} scale={spec.scale}>
      {spec.kind === "octa" ? (
        <octahedronGeometry args={[1, 0]} />
      ) : spec.kind === "box" ? (
        <boxGeometry args={[1.3, 1.3, 1.3]} />
      ) : (
        <dodecahedronGeometry args={[1, 0]} />
      )}
      {/* فاز F6 — emissive پالت نقشه: شب = کریستال درخشان، روز = درخشش ملایم */}
      <meshStandardMaterial color={spec.hue} flatShading roughness={0.6} metalness={0.12} emissive={spec.hue} emissiveIntensity={glow} />
    </mesh>
  );
}


export function World({
  bridge,
  registry,
  burstApi,
}: {
  bridge: React.RefObject<SceneBridge>;
  registry: React.RefObject<THREE.Mesh[]>;
  burstApi: React.RefObject<BurstApi | null>;
}) {
  const { camera } = useThree();
  const ray = useMemo(() => new THREE.Raycaster(), []);
  const v2 = useMemo(() => new THREE.Vector2(), []);
  const lastSeq = useRef(0);
  useFrame(() => {
    const b = bridge.current;
    const req = b.shoot;
    if (req.seq === lastSeq.current) return;
    lastSeq.current = req.seq;
    // فاز F9 — پمپ زون‌کن: سه پرتو موازی (چپ/مرکز/راست)؛ بقیه تک‌پرتو
    const offs = req.spread > 0 ? [-req.spread, 0, req.spread] : [0];
    const ids: Array<string | null> = [];
    let centerOrigin: THREE.Vector3 | null = null;
    let anyOrigin: THREE.Vector3 | null = null;
    for (const off of offs) {
      v2.set(req.x + off, req.y);
      ray.setFromCamera(v2, camera);
      const first = ray.intersectObjects(registry.current ?? [], false).find((h) => h.object.visible);
      if (first) {
        ids.push((first.object.userData.id as string | undefined) ?? null);
        anyOrigin ??= first.point;
        if (off === 0) centerOrigin = first.point;
      } else {
        ids.push(null);
      }
    }
    const pt = centerOrigin ?? anyOrigin;
    if (pt) burstApi.current?.fire(pt, req.burst);
    if (req.spread > 0 && b.onVolley) {
      // والی پمپ: همهٔ برخوردها یکجا — بهترین نتیجه در handleVolley تصمیم می‌شود
      b.onVolley(ids);
    } else {
      b.onHit(ids.find((x): x is string => x !== null) ?? null);
    }
  });
  return null;
}
