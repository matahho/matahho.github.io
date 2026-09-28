import { create } from "zustand";

// Bridges GSAP ScrollTrigger (DOM) → React Three Fiber scene.
// The hero ScrollTrigger writes `progress`; the Canvas reads it each frame.
type ScrollState = {
  progress: number; // 0 = top of hero, 1 = hero fully scrolled (scattered → ordered)
  setProgress: (p: number) => void;
};

export const useScroll = create<ScrollState>((set) => ({
  progress: 0,
  setProgress: (p) => set({ progress: p }),
}));
