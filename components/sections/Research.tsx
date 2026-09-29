import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import UniLogo from "@/components/ui/UniLogos";
import { research } from "@/lib/content";

export default function Research() {
  return (
    <section id="research" className="mx-auto max-w-6xl px-6 py-32 md:py-44">
      <SectionHeading index="01" title="Research" caption="where most of the gradient flows" />

      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        {research.map((r, i) => (
          <Reveal
            key={r.title}
            as="article"
            delay={i * 0.06}
            className="group flex gap-6 rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-soft)]/50 p-7 transition-colors duration-500 hover:border-[var(--color-accent)]/40 md:p-8"
          >
            <UniLogo
              id={r.logo}
              className="h-[5.5rem] w-20 shrink-0 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
            />
            <div>
              <p className="text-sm text-accent">{r.university}</p>
              <h3 className="mt-2 text-2xl font-medium leading-snug">{r.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">{r.blurb}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
