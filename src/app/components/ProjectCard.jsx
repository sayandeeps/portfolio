import Image from "next/image";
import {
  ArrowTopRightOnSquareIcon,
  CheckIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

export default function ProjectCard({ project }) {
  const { title, summary, stack, features, image, repo, live } = project;

  return (
    <article className="project-card card group flex h-full flex-col overflow-hidden hover:border-ember/50 focus-within:border-ember/50">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-content">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-content-muted">
          {summary}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-content-faint"
            >
              {tech}
            </li>
          ))}
        </ul>

        <ul className="mt-4 space-y-1.5">
          {features.map((feature) => (
            <li key={feature} className="flex gap-2 text-sm text-content-muted">
              <CheckIcon
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-4 pt-6">
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} — source code`}
              className="inline-flex items-center gap-2 text-sm font-medium text-content-muted transition-colors hover:text-ember"
            >
              <CodeBracketIcon className="h-4 w-4" aria-hidden="true" />
              Code
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} — live site`}
              className="inline-flex items-center gap-2 text-sm font-medium text-content-muted transition-colors hover:text-ember"
            >
              <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
              Live
            </a>
          )}
          {!repo && !live && (
            <span className="text-sm text-content-faint">
              Case study coming soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
