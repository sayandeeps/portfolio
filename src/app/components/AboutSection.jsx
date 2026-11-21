import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { about, education } from "../data/portfolio";

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <SectionHeading title="About me" />
      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <div className="card relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/about-image.jpg"
              alt="Sayandeep Sharma at work"
              fill
              sizes="(max-width: 1024px) 90vw, 320px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="space-y-5 lg:col-span-8">
          {about.map((paragraph, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <p className="leading-relaxed text-content-muted">{paragraph}</p>
            </Reveal>
          ))}

          <Reveal delay={0.15}>
            <div className="mt-8 border-t border-line pt-6">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-content-faint">
                Education
              </p>
              <ul className="mt-4 space-y-4">
                {education.map((entry) => (
                  <li
                    key={entry.school}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
                  >
                    <div>
                      <p className="font-display font-semibold text-content">
                        {entry.degree}
                      </p>
                      <p className="text-content-muted">{entry.school}</p>
                    </div>
                    <p className="font-mono text-xs text-content-faint">
                      {entry.period}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
