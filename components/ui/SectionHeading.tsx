import Reveal from "./Reveal";

type Props = {
  index: string;
  title: string;
  caption?: string;
};

export default function SectionHeading({ index, title, caption }: Props) {
  return (
    <Reveal className="mb-12 md:mb-20">
      <p className="mono text-sm text-accent">
        layer_{index}
        {caption && <span className="text-[var(--color-muted)]"> · {caption}</span>}
      </p>
      <h2 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-medium tracking-tight md:text-7xl">
        {title}
      </h2>
      <div className="mt-6 h-px w-full bg-[var(--color-line)]" />
    </Reveal>
  );
}
