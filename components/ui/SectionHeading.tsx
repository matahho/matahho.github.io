import Reveal from "./Reveal";

type Props = {
  index: string;
  title: string;
};

export default function SectionHeading({ index, title }: Props) {
  return (
    <Reveal className="mb-12 md:mb-20">
      <div className="flex items-baseline gap-4">
        <span className="font-[family-name:var(--font-display)] text-base tracking-[0.3em] text-accent">
          {index}
        </span>
        <h2 className="font-[family-name:var(--font-display)] text-5xl font-medium tracking-tight md:text-7xl">
          {title}
        </h2>
      </div>
      <div className="mt-6 h-px w-full bg-[var(--color-line)]" />
    </Reveal>
  );
}
