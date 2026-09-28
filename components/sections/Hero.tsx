"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScroll } from "@/lib/scroll";
import { profile } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) return;

    const setProgress = useScroll.getState().setProgress;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Intro fade-in.
      gsap.fromTo(
        [titleRef.current, subRef.current],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.15 }
      );

      if (reduce) {
        setProgress(1); // show the organized cluster, no scrub.
        return;
      }

      // Pin the hero and scrub the scattered → ordered progress into the 3D scene.
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: inner,
        scrub: 0.6,
        onUpdate: (self) => setProgress(self.progress),
      });

      // Text recedes as you scroll, and returns on scroll-up.
      // immediateRender:false + explicit from/to keeps the tween reversible.
      gsap.fromTo(
        [titleRef.current, subRef.current],
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -40,
          immediateRender: false,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "45% top",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        cueRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          immediateRender: false,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "12% top",
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="top" className="relative h-[220vh]">
      <div
        ref={innerRef}
        className="flex h-screen flex-col items-center justify-center px-6 text-center"
      >
        <p className="mb-7 font-[family-name:var(--font-display)] text-lg uppercase tracking-[0.4em] text-[var(--color-muted)] sm:text-xl md:text-2xl">
          {profile.location}
        </p>
        <h1
          ref={titleRef}
          className="font-[family-name:var(--font-display)] text-7xl font-semibold tracking-tight sm:text-9xl md:text-[12rem] md:leading-[0.92]"
        >
          {profile.name}
        </h1>
        <p
          ref={subRef}
          className="mt-8 max-w-2xl text-xl text-[var(--color-fg)]/80 sm:text-2xl md:text-3xl"
        >
          <span className="text-accent">{profile.tagline}.</span>
          <br />
          {profile.intro}
        </p>

        <div
          ref={cueRef}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-[var(--color-muted)]"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="h-10 w-px animate-pulse bg-[var(--color-accent)]" />
        </div>
      </div>
    </section>
  );
}
