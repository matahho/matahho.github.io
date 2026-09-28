"use client";

import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function Effects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.2}
        luminanceThreshold={0.65}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
    </EffectComposer>
  );
}
