import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { work } from "@/lib/content";

// A vertical "pipeline": cards alternate around a central line, each wired in by a node.
export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-5xl px-6 py-32 md:py-44">
      <SectionHeading index="02" title="Industrial Experience" caption="pre-training on real systems" />

      <ol className="relative">
        <span
          aria-hidden
          className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-transparent via-[var(--color-accent)]/40 to-transparent md:left-1/2"
        />
        {work.map((w, i) => {
          const left = i % 2 === 0;
          const linked = w.href.startsWith("http");
          return (
            <li key={w.company} className="relative py-5 md:grid md:grid-cols-2 md:gap-16">
              <span
                aria-hidden
                className="absolute left-5 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-[var(--color-bg)] md:left-1/2"
                style={{ background: w.color, boxShadow: `0 0 16px ${w.color}` }}
              />
              <Reveal
                delay={0.05}
                className={`ml-12 md:ml-0 ${left ? "md:col-start-1" : "md:col-start-2"}`}
              >
                <div
                  className={`relative overflow-hidden rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-bg-soft)]/70 p-6 transition-transform duration-500 hover:-translate-y-1 ${
                    left ? "md:rounded-tr-md" : "md:rounded-tl-md"
                  }`}
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ background: w.color }}
                  />
                  <div className="flex items-center gap-4">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-[family-name:var(--font-display)] text-xl font-semibold text-[#05070a]"
                      style={{ background: w.color }}
                    >
                      {w.company[0]}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-xl font-medium">
                        {linked ? (
                          <a
                            href={w.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-accent"
                          >
                            {w.company} <span className="text-sm text-accent">↗</span>
                          </a>
                        ) : (
                          w.company
                        )}
                      </h3>
                      <span
                        className="mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs"
                        style={{ background: `${w.color}1f`, color: w.color }}
                      >
                        {w.role}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-base text-[var(--color-muted)]">{w.blurb}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
