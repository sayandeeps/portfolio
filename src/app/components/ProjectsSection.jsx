"use client";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { projects, projectTags } from "../data/portfolio";

export default function ProjectsSection() {
  const [tag, setTag] = useState("All");
  const filtered =
    tag === "All" ? projects : projects.filter((project) => project.tags.includes(tag));

  return (
    <section id="projects" className="py-20">
      <SectionHeading title="Selected projects" />

      <div
        className="mt-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by category"
      >
        {projectTags.map((name) => {
          const selected = tag === name;
          return (
            <button
              key={name}
              type="button"
              aria-pressed={selected}
              onClick={() => setTag(name)}
              className={`rounded-full border px-4 py-2 font-mono text-xs transition-colors ${
                selected
                  ? "border-ember bg-ember-dim text-ember"
                  : "border-line text-content-muted hover:border-content-muted hover:text-content"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.05} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
