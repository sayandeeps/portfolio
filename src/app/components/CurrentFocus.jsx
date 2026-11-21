import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { currentFocus } from "../data/portfolio";

export default function CurrentFocus() {
  return (
    <section id="focus" className="py-20">
      <SectionHeading title={currentFocus.heading} />
      <Reveal delay={0.05}>
        <p className="mt-6 max-w-2xl leading-relaxed text-content-muted">
          {currentFocus.blurb}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <ul className="mt-8 flex flex-wrap gap-2">
          {currentFocus.items.map((item) => (
            <li
              key={item}
              className="chip !border-ember/40 !text-content"
            >
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
