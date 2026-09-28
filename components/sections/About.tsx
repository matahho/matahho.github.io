import Reveal from "@/components/ui/Reveal";
import { about } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-4xl px-6 py-32 md:py-44">
      <Reveal>
        <p className="font-[family-name:var(--font-display)] text-base tracking-[0.3em] text-accent">
          01 — ABOUT
        </p>
      </Reveal>

      <div className="mt-10 space-y-7">
        {about.lines.map((line, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p className="text-2xl leading-relaxed text-[var(--color-fg)]/90 md:text-3xl md:leading-relaxed">
              {line}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14">
        <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-soft)]/60 p-7 backdrop-blur-sm">
          <p className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.3em] text-accent">
            {about.highlight.label}
          </p>
          <p className="mt-3 text-lg text-[var(--color-fg)] md:text-xl">
            {about.highlight.text}
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-8">
        <p className="text-base text-[var(--color-muted)]">{about.open}</p>
      </Reveal>
    </section>
  );
}
