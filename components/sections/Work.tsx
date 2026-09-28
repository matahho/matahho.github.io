import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { work } from "@/lib/content";

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-32 md:py-44">
      <SectionHeading index="03" title="Industrial Experience" />

      <div className="grid gap-5 sm:grid-cols-2">
        {work.map((w, i) => (
          <Reveal
            key={w.company}
            as="article"
            delay={i * 0.06}
            className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-soft)]/50 p-7 transition-colors duration-500 hover:border-[var(--color-accent)]/40"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-2xl font-medium">{w.company}</h3>
              <a
                href={w.href}
                target={w.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-xs text-accent transition-opacity hover:opacity-70"
              >
                {w.href.startsWith("http") ? "Visit →" : ""}
              </a>
            </div>
            <p className="mt-1 text-base text-[var(--color-muted)]">{w.role}</p>
            <p className="mt-4 flex-1 text-base leading-relaxed text-[var(--color-fg)]/80">
              {w.blurb}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {w.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[var(--color-line)] px-3 py-1 text-[11px] text-[var(--color-muted)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
