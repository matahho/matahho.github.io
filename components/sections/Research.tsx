import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { research, papers } from "@/lib/content";

export default function Research() {
  return (
    <section id="research" className="mx-auto max-w-6xl px-6 py-32 md:py-44">
      <SectionHeading index="02" title="Research" />

      <div className="grid gap-6 md:grid-cols-3 md:gap-8">
        {research.map((r, i) => (
          <Reveal
            key={r.title}
            as="article"
            delay={i * 0.08}
            className="group flex flex-col rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-soft)]/50 p-8 transition-colors duration-500 hover:border-[var(--color-accent)]/40 md:p-10"
          >
            <p className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
              {r.org}
            </p>
            <h3 className="mt-5 text-2xl font-medium leading-snug">{r.title}</h3>
            <p className="mt-5 flex-1 text-base leading-loose text-[var(--color-muted)]">
              {r.blurb}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {r.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[var(--color-line)] px-3 py-1 text-[11px] text-[var(--color-muted)]"
                >
                  {t}
                </span>
              ))}
            </div>
            {r.link && (
              <a
                href={r.link.href}
                target={r.link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="mt-8 text-sm text-accent transition-opacity hover:opacity-70"
              >
                {r.link.label} →
              </a>
            )}
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <p className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
          Selected papers
        </p>
        <ul className="mt-6 divide-y divide-[var(--color-line)]">
          {papers.map((p) => (
            <li key={p.title}>
              <a
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group grid gap-1 py-5 transition-colors md:grid-cols-[1fr_auto] md:items-start md:gap-8"
              >
                <span className="text-lg leading-snug text-[var(--color-fg)] transition-colors group-hover:text-accent">
                  {p.title}
                </span>
                <span className="text-base text-[var(--color-muted)] md:whitespace-nowrap md:pt-0.5 md:text-right">
                  {p.venue}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
