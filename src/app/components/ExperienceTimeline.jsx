import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { experience } from "../data/portfolio";

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-20">
      <SectionHeading title="Work experience" />
      <ol className="relative mt-10 space-y-12 border-l border-line pl-8">
        {experience.map((job, index) => (
          <li key={`${job.company}-${job.role}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[38px] top-2 h-3 w-3 rounded-full bg-ember ring-4 ring-ink"
            />
            <Reveal delay={index * 0.05}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-display text-xl font-semibold text-content">
                  {job.role}
                </h3>
                <span className="font-mono text-xs text-content-faint">
                  {job.period}
                </span>
              </div>
              <p className="mt-1 text-ember">
                {job.company}
                {job.project ? (
                  <span className="text-content-muted"> · {job.project}</span>
                ) : null}
              </p>
              {job.stack?.length ? (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {job.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-content-faint"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              ) : null}
              <ul className="mt-4 space-y-2">
                {job.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-sm leading-relaxed text-content-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-content-faint"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
