import type { IconType } from "react-icons";
import { FaGithub, FaLinkedinIn, FaTelegram, FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import Reveal from "@/components/ui/Reveal";
import { profile, socials, type Social } from "@/lib/content";

const ICONS: Record<Social["icon"], { Icon: IconType; color: string }> = {
  github: { Icon: FaGithub, color: "#e7ecf2" },
  linkedin: { Icon: FaLinkedinIn, color: "#0a66c2" },
  x: { Icon: FaXTwitter, color: "#e7ecf2" },
  telegram: { Icon: FaTelegram, color: "#26a5e4" },
  email: { Icon: HiOutlineMail, color: "#22d3ee" },
};

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 pb-24 pt-32 text-center md:pt-44">
      <Reveal>
        <p className="mono text-sm text-accent">
          layer_04 <span className="text-[var(--color-muted)]">· send a query</span>
        </p>
      </Reveal>

      <Reveal className="mt-8">
        <h2 className="font-[family-name:var(--font-display)] text-5xl font-medium tracking-tight md:text-7xl">
          Let’s connect.
        </h2>
      </Reveal>

      <Reveal className="mt-6">
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[var(--color-fg)]/80 md:text-xl">
          I’m actively looking for <span className="text-accent">industrial collaborations</span>,{" "}
          <span className="text-accent">internships</span>, and{" "}
          <span className="text-accent">new connections</span>. If any of that sounds like you, my
          inbox is always open.
        </p>
      </Reveal>

      <Reveal className="mt-12">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {socials.map((s) => {
            const { Icon, color } = ICONS[s.icon];
            return (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="group flex items-center gap-3 rounded-full border border-[var(--color-line)] bg-[var(--color-bg-soft)]/60 py-2 pl-2 pr-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-fg)]/25"
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110"
                  style={{ background: `${color}22`, color }}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="text-left">
                  <span className="block text-sm text-[var(--color-fg)]">{s.label}</span>
                  <span className="block text-xs text-[var(--color-muted)]">{s.handle}</span>
                </span>
              </a>
            );
          })}
        </div>
      </Reveal>

      <Reveal className="mt-8">
        <a
          href={profile.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-[var(--color-accent)] px-6 py-2.5 text-sm font-medium text-[#04121a] transition-opacity hover:opacity-90"
        >
          Download CV
        </a>
      </Reveal>

      <Reveal className="mt-16">
        <p className="text-xs text-[var(--color-muted)]/60">
          © {new Date().getFullYear()} {profile.name}. No weights were harmed in the making of this bio.
        </p>
      </Reveal>
    </section>
  );
}
