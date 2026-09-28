"use client";

import dynamic from "next/dynamic";
import Nav from "@/components/ui/Nav";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Research from "@/components/sections/Research";
import Work from "@/components/sections/Work";
import Fun from "@/components/sections/Fun";
import Contact from "@/components/sections/Contact";

// The WebGL scene only runs in the browser.
const Scene = dynamic(() => import("@/components/scene/Scene"), { ssr: false });

export default function Home() {
  return (
    <>
      <Scene />
      <ScrollProgress />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <div className="relative bg-gradient-to-b from-transparent via-[var(--color-bg)]/85 to-[var(--color-bg)]">
          <About />
          <Research />
          <Work />
          <Fun />
          <Contact />
        </div>
      </main>
    </>
  );
}
