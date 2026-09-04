"use client";

import { useEffect, useState } from "react";
import { projects, statusMeta, statusOrder, type ProjectStatus } from "@/lib/projects";
import { useModals } from "../modals/ModalProvider";
import { CtaButton } from "../ui/CtaButton";
import { Icon } from "../ui/Icon";
import { ProjectCard } from "./ProjectCard";

type Filter = ProjectStatus | "all";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All Projects" },
  ...statusOrder.map((s) => ({ key: s as Filter, label: statusMeta[s].label })),
];

const isStatus = (value: string): value is ProjectStatus => statusOrder.includes(value as ProjectStatus);

/**
 * Filterable project grid. Reads and writes the URL hash so `/projects#ongoing`
 * deep-links from the footer and shares cleanly. Categories with nothing in
 * them show an empty state rather than a filler card.
 */
export function ProjectShowcase() {
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      setFilter(isStatus(hash) ? hash : "all");
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  function choose(next: Filter) {
    setFilter(next);
    window.history.replaceState(null, "", next === "all" ? window.location.pathname : `#${next}`);
  }

  const visible = filter === "all" ? projects : projects.filter((p) => p.status === filter);

  return (
    <div>
      <div role="tablist" aria-label="Filter projects by status" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          const count = f.key === "all" ? projects.length : projects.filter((p) => p.status === f.key).length;
          return (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => choose(f.key)}
              className={`rounded-full px-5 py-2.5 text-[0.82rem] font-semibold transition-all duration-300 ease-[var(--ease-out-soft)] ${
                active
                  ? "bg-forest-700 text-cream-50 shadow-md shadow-forest-900/20"
                  : "border border-cream-300 bg-white text-ink-700 hover:-translate-y-0.5 hover:border-forest-600/40 hover:text-forest-700"
              }`}
            >
              {f.label}
              <span className="ml-2 text-[0.72rem] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {filter !== "all" && <p className="mt-5 max-w-2xl text-[0.92rem] text-slate-muted">{statusMeta[filter].blurb}</p>}

      {visible.length > 0 ? (
        <div className="mt-10 grid gap-7 lg:grid-cols-2">
          {visible.map((project, i) => (
            <div
              key={project.slug}
              style={{ animation: "card-in .5s var(--ease-out-soft) both", animationDelay: `${i * 70}ms` }}
              // A lone project gets the full width rather than sitting in a half-empty row.
              className={visible.length === 1 ? "lg:col-span-2" : undefined}
            >
              <ProjectCard project={project} featured={visible.length === 1} priority={i === 0} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState status={filter as ProjectStatus} />
      )}

      <style>{`
        @keyframes card-in {
          from { opacity: 0; transform: translateY(18px) }
          to { opacity: 1; transform: none }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes card-in { from { opacity: 1 } to { opacity: 1 } }
        }
      `}</style>
    </div>
  );
}

/** Shown when a category has no published projects. Deliberately not card-shaped. */
function EmptyState({ status }: { status: ProjectStatus }) {
  const { openEnquiry } = useModals();
  const meta = statusMeta[status];

  return (
    <div
      style={{ animation: "card-in .5s var(--ease-out-soft) both" }}
      className="mt-10 rounded-[2rem] border border-dashed border-cream-300 bg-cream-100/60 px-8 py-14 text-center"
    >
      <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-forest-700/8 text-forest-600">
        <Icon name="building" className="size-6" />
      </span>
      <h3 className="mt-5 font-display text-xl text-ink-900">Nothing listed under {meta.label.toLowerCase()} yet</h3>
      <p className="mx-auto mt-3 max-w-md text-[0.9rem] leading-relaxed text-slate-muted text-pretty">{meta.empty}</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <CtaButton variant="primary" size="md" onClick={() => openEnquiry({ source: `Projects — ${meta.label} empty state` })}>
          Register Interest
        </CtaButton>
        <CtaButton href="/projects/laxmi-heights" variant="outline" size="md">
          See Laxmi Heights
        </CtaButton>
      </div>
    </div>
  );
}
