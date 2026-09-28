"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "@/lib/scroll";

type Props = {
  count?: number;
  neighbors?: number;
};

const dummy = new THREE.Object3D();
const tmp = new THREE.Vector3();

// Fibonacci sphere → evenly distributed, "ordered" cluster positions.
function fibonacciSphere(n: number, radius: number) {
  const pts: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push(
      new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(
        radius
      )
    );
  }
  return pts;
}

// Random points inside a larger sphere → chaotic "scattered" state.
function scatterCloud(n: number, radius: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < n; i++) {
    const u = Math.random();
    const r = radius * Math.cbrt(u);
    const t = Math.random() * Math.PI * 2;
    const p = Math.acos(2 * Math.random() - 1);
    pts.push(
      new THREE.Vector3(
        r * Math.sin(p) * Math.cos(t),
        r * Math.sin(p) * Math.sin(t),
        r * Math.cos(p)
      )
    );
  }
  return pts;
}

function smoothstep(x: number) {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
}

export default function ClusterGraph({ count = 90, neighbors = 3 }: Props) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);

  const { ordered, scattered, edges, drift, colors } = useMemo(() => {
    const ordered = fibonacciSphere(count, 2.6);
    const scattered = scatterCloud(count, 7);
    // k-nearest-neighbour edges computed on the ordered layout → clean geodesic web.
    const set = new Set<string>();
    const edges: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      const dists = ordered
        .map((p, j) => ({ j, d: ordered[i].distanceToSquared(p) }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, neighbors);
      for (const { j } of dists) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!set.has(key)) {
          set.add(key);
          edges.push([i, j]);
        }
      }
    }
    // Per-node drift + pulse phases for subtle life.
    const drift = Array.from({ length: count }, () => ({
      ax: Math.random() * Math.PI * 2,
      ay: Math.random() * Math.PI * 2,
      s: 0.3 + Math.random() * 0.5,
      pulse: Math.random() * Math.PI * 2,
    }));
    // Dimmer, varied palette (cyan → teal → soft blue) so nodes don't wash out text.
    const colors = Array.from({ length: count }, () => {
      const c = new THREE.Color();
      c.setHSL(0.5 + (Math.random() - 0.5) * 0.08, 0.45, 0.1 + Math.random() * 0.1);
      return c;
    });
    return { ordered, scattered, edges, drift, colors };
  }, [count, neighbors]);

  const lineGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(edges.length * 2 * 3), 3)
    );
    return g;
  }, [edges]);

  // Reusable scratch array of current node positions.
  const current = useMemo(
    () => Array.from({ length: count }, () => new THREE.Vector3()),
    [count]
  );

  // Apply per-instance colors once the mesh exists.
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    for (let i = 0; i < count; i++) mesh.setColorAt(i, colors[i]);
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [count, colors]);

  useFrame((state) => {
    const t = useScroll.getState().progress;
    const e = smoothstep(t);
    const time = state.clock.elapsedTime;

    const mesh = meshRef.current;
    if (!mesh) return;

    for (let i = 0; i < count; i++) {
      const s = scattered[i];
      const o = ordered[i];
      const d = drift[i];
      // Drift amplitude fades out as the cluster organizes.
      const wob = (1 - e) * 0.35;
      tmp.set(
        THREE.MathUtils.lerp(s.x, o.x, e) + Math.sin(time * d.s + d.ax) * wob,
        THREE.MathUtils.lerp(s.y, o.y, e) + Math.cos(time * d.s + d.ay) * wob,
        THREE.MathUtils.lerp(s.z, o.z, e) + Math.sin(time * d.s * 0.7 + d.ax) * wob
      );
      current[i].copy(tmp);
      dummy.position.copy(tmp);
      // Gentle breathing pulse adds life without extra brightness.
      const pulse = 1 + Math.sin(time * 1.6 + d.pulse) * 0.18;
      const scale = (0.045 + e * 0.028) * pulse;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;

    // Update edges from current node positions.
    const pos = lineGeom.getAttribute("position") as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let k = 0; k < edges.length; k++) {
      const [a, b] = edges[k];
      const o = k * 6;
      arr[o] = current[a].x;
      arr[o + 1] = current[a].y;
      arr[o + 2] = current[a].z;
      arr[o + 3] = current[b].x;
      arr[o + 4] = current[b].y;
      arr[o + 5] = current[b].z;
    }
    pos.needsUpdate = true;

    if (groupRef.current) {
      // Pointer parallax — the cluster leans toward the cursor (fun, interactive).
      const px = state.pointer.x;
      const py = state.pointer.y;
      const targetY = time * 0.05 + e * Math.PI * 0.5 + px * 0.45;
      const targetX = Math.sin(time * 0.1) * 0.1 + e * 0.12 - py * 0.3;
      groupRef.current.rotation.y +=
        (targetY - groupRef.current.rotation.y) * 0.06;
      groupRef.current.rotation.x +=
        (targetX - groupRef.current.rotation.x) * 0.06;
    }
    if (linesRef.current) {
      (linesRef.current.material as THREE.LineBasicMaterial).opacity =
        0.05 + e * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </instancedMesh>
      <lineSegments ref={linesRef} geometry={lineGeom}>
        <lineBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.15}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  );
}
