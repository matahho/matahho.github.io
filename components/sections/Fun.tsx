"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { fun } from "@/lib/content";

function Polaroid() {
  const [broken, setBroken] = useState(false);

  return (
    <div className="rotate-[-3deg] rounded-md bg-[#f5f3ee] p-3 pb-5 shadow-2xl shadow-black/50 transition-transform duration-500 hover:rotate-0">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-bg-soft)]">
        {broken ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center text-[var(--color-muted)]">
            <span className="text-3xl">📸</span>
            <span className="text-xs">
              Drop <code className="text-accent">bob-and-me.jpg</code> in{" "}
              <code>/public</code>
            </span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={fun.image.src}
            alt={fun.image.caption}
            onError={() => setBroken(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <p className="mt-3 text-center font-[family-name:var(--font-display)] text-sm text-[#1a1a1a]">
        {fun.image.caption}
      </p>
    </div>
  );
}

export default function Fun() {
  return (
    <section id="fun" className="mx-auto max-w-6xl px-6 py-32 md:py-44">
      <SectionHeading index="03" title="Fun" caption="regularization, keeps me from overfitting" />

      <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <Polaroid />
        </Reveal>

        <div>
          <Reveal>
            <p className="text-xl text-[var(--color-fg)]/80 md:text-2xl">
              {fun.intro}
            </p>
          </Reveal>

          {/* Better Call Saul, featured. */}
          <Reveal className="mt-8">
            <div className="rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/[0.06] p-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{fun.feature.emoji}</span>
                <h3 className="text-xl font-medium text-accent md:text-2xl">
                  {fun.feature.title}
                </h3>
              </div>
              <p className="mt-3 text-base text-[var(--color-fg)]/80">
                {fun.feature.text}
              </p>
            </div>
          </Reveal>

          <ul className="mt-8 space-y-6">
            {fun.items.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.05}>
                <div className="flex gap-4">
                  <span className="text-2xl leading-none">{item.emoji}</span>
                  <div>
                    <h4 className="text-lg font-medium">{item.title}</h4>
                    <p className="mt-1 text-base text-[var(--color-muted)]">
                      {item.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
