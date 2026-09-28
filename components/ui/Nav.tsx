"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

const links = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Work", href: "#work" },
  { label: "Fun", href: "#fun" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        solid ? "backdrop-blur-md" : ""
      }`}
      style={{
        backgroundColor: solid ? "rgba(5,7,10,0.6)" : "transparent",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-7">
        <a
          href="#top"
          className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[0.2em]"
        >
          Mahdi Haji
        </a>
        <ul className="hidden gap-10 text-lg text-[var(--color-muted)] md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="transition-colors hover:text-[var(--color-fg)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={profile.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[var(--color-line)] px-6 py-2.5 text-base tracking-wide text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)] hover:text-accent"
        >
          CV
        </a>
      </nav>
    </header>
  );
}
