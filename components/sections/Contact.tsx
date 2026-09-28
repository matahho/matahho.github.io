import Reveal from "@/components/ui/Reveal";
import { profile, socials } from "@/lib/content";

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-4xl px-6 pb-24 pt-32 text-center md:pt-44"
    >
      <Reveal>
        <p className="font-[family-name:var(--font-display)] text-base tracking-[0.3em] text-accent">
          05 — CONTACT
        </p>
      </Reveal>

      <Reveal className="mt-8">
        <h2 className="font-[family-name:var(--font-display)] text-5xl font-medium tracking-tight md:text-7xl">
          Let’s build reliable systems.
        </h2>
      </Reveal>

      <Reveal className="mt-6">
        <a
          href={`mailto:${profile.email}`}
          className="text-lg text-[var(--color-fg)] underline decoration-[var(--color-accent)]/40 underline-offset-8 transition-colors hover:text-accent"
        >
          {profile.email}
        </a>
      </Reveal>

      <Reveal className="mt-10">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--color-line)] px-5 py-2 text-sm text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-accent"
            >
              {s.label}
            </a>
          ))}
          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[var(--color-accent)] px-5 py-2 text-sm font-medium text-[#04121a] transition-opacity hover:opacity-90"
          >
            Download CV
          </a>
        </div>
      </Reveal>

      <Reveal className="mt-16">
        <p className="text-xs text-[var(--color-muted)]/60">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, React
          Three Fiber & GSAP.
        </p>
      </Reveal>
    </section>
  );
}
