"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import ClusterGraph from "./ClusterGraph";
import Effects from "./Effects";

export default function Scene() {
  const [count, setCount] = useState(90);
  const [enableEffects, setEnableEffects] = useState(true);

  useEffect(() => {
    const small = window.matchMedia("(max-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCount(small ? 50 : 90);
    // Bloom is the heaviest pass; drop it on small / reduced-motion devices.
    setEnableEffects(!small && !reduce);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 18%, rgba(34,211,238,0.03), rgba(5,7,10,0) 55%), #05070a",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ClusterGraph count={count} />
        {enableEffects && <Effects />}
      </Canvas>
    </div>
  );
}
