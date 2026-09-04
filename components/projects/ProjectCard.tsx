import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { EnquireButton } from "../ui/EnquireButton";
import { Icon } from "../ui/Icon";
import { StatusBadge } from "./StatusBadge";

interface ProjectCardProps {
  project: Project;
  /** Lays the card out side-by-side across the full grid width. */
  featured?: boolean;
  priority?: boolean;
}

export function ProjectCard({ project, featured = false, priority = false }: ProjectCardProps) {
  const { name, location, summary, facts, image, imageAlt, href, status, unrevealed } = project;

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-cream-300/70 bg-white transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:border-forest-600/30 hover:shadow-[0_28px_64px_-28px_rgba(18,28,38,.3)] ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "aspect-16/11 lg:aspect-auto lg:w-1/2" : "aspect-4/3"}`}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority={priority}
          sizes={featured ? "(min-width:1024px) 45vw, 100vw" : "(min-width:1024px) 32vw, (min-width:640px) 48vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.06]"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink-900/55 via-transparent to-transparent" />
        <StatusBadge status={status} tone="solid" className="absolute top-4 left-4" />
      </div>

      <div className={`flex flex-1 flex-col p-7 sm:p-8 ${featured ? "lg:justify-center lg:p-10" : ""}`}>
        <p className="flex items-center gap-1.5 text-[0.78rem] text-slate-muted">
          <Icon name="pin" className="size-3.5 text-forest-600" />
          {location}
        </p>

        <h3 className={`mt-2 font-display leading-tight text-ink-900 ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          {href ? (
            <Link href={href} className="transition-colors duration-200 hover:text-forest-700 after:absolute after:inset-0">
              {name}
            </Link>
          ) : (
            name
          )}
        </h3>

        <p className="mt-3 text-[0.9rem] leading-relaxed text-slate-muted text-pretty">{summary}</p>

        <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-cream-200 pt-5">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-[0.64rem] tracking-[0.14em] text-slate-muted/80 uppercase">{fact.label}</dt>
              <dd className="mt-1 text-[0.82rem] font-semibold text-ink-900">{fact.value}</dd>
            </div>
          ))}
        </dl>

        {/* Relative + z-10 keeps these clickable above the card-wide title overlay. */}
        <div className="relative z-10 mt-7 flex flex-wrap items-center gap-3">
          {href && (
            <Link href={href} className="group/link inline-flex items-center gap-2 text-[0.85rem] font-semibold text-forest-700">
              View Project
              <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          )}
          <EnquireButton
            project={unrevealed ? undefined : name}
            source={`Project card — ${name}`}
            {...(unrevealed
              ? { title: "Register your interest", subtitle: "We will tell you about our next project before it is listed." }
              : {})}
            variant={unrevealed ? "primary" : "outline"}
            size="sm"
          >
            {unrevealed ? "Register Interest" : "Enquire"}
          </EnquireButton>
        </div>
      </div>
    </article>
  );
}
