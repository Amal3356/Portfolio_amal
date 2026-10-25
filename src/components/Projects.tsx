import { useId, useState } from "react";
import { categories, projects, type Project } from "../data/profile";

function ProjectItem({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="border-t border-line last:border-b">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="grid w-full cursor-pointer grid-cols-[1fr_auto] gap-x-4 gap-y-1 py-5 text-left"
      >
        <h3 className="text-[clamp(20px,3vw,26px)] font-extrabold">{project.title}</h3>
        <span
          aria-hidden="true"
          className={`col-start-2 row-span-2 row-start-1 self-center text-[28px] leading-none text-signal transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
        <span className="text-[15px] text-muted">{project.role}</span>
      </button>
      {open && (
        <div id={id} className="max-w-[46em] pb-6">
          <ul className="mb-3.5 list-disc pl-5">
            {project.points.map((p) => (
              <li key={p} className="mb-1.5">
                {p}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="rounded border border-line px-2 py-0.5 font-mono text-[13px] text-muted">
                {t}
              </span>
            ))}
          </div>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener" className="mt-3 inline-block underline">
              View source
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export function Projects() {
  const [current, setCurrent] = useState<(typeof categories)[number]>("All");
  const list = projects.filter((p) => current === "All" || p.categories.includes(current));
  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={c === current}
            onClick={() => setCurrent(c)}
            className="cursor-pointer rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium aria-pressed:border-signal-bg aria-pressed:bg-signal-bg aria-pressed:text-on-signal"
          >
            {c}
          </button>
        ))}
      </div>
      <div>
        {list.map((p) => (
          <ProjectItem key={p.title} project={p} />
        ))}
      </div>
    </>
  );
}
