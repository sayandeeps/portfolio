import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { skills } from "../data/portfolio";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20">
      <SectionHeading title="Technologies & tools" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, index) => (
          <Reveal key={group.group} delay={index * 0.05} className="card p-6">
            <h3 className="font-display text-lg font-semibold text-content">
              {group.group}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
