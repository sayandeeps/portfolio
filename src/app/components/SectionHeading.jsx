import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title }) {
  return (
    <Reveal>
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-ember">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 font-display text-section font-semibold text-content">
        {title}
      </h2>
    </Reveal>
  );
}
