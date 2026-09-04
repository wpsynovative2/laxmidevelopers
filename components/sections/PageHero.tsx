import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Blob, DotGrid, EyebrowMark } from "../ui/Decor";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { Band } from "./Band";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  image: string;
  imageAlt: string;
  /** Breadcrumb trail, excluding Home which is always prepended. */
  crumbs?: { label: string; href?: string }[];
  children?: ReactNode;
}

/** Full-bleed masthead band used by every page except Home and Laxmi Heights. */
export function PageHero({ eyebrow, title, lede, image, imageAlt, crumbs = [], children }: PageHeroProps) {
  return (
    <Band tone="forest" pad="lg">
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="-z-10 object-cover opacity-25" />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-br from-forest-950/90 via-forest-900/80 to-forest-800/60" />
      <Blob className="-top-28 -right-28 size-[30rem]" tone="text-forest-600/25" />
      <DotGrid className="right-10 bottom-8 h-20 w-32" tone="text-gold-500/25" />

      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-[0.76rem] text-cream-200/60">
          <li>
            <Link href="/" className="transition-colors hover:text-gold-400">
              Home
            </Link>
          </li>
          {crumbs.map((crumb) => (
            <li key={crumb.label} className="flex items-center gap-2">
              <Icon name="chevronDown" className="size-3 -rotate-90 text-cream-200/35" />
              {crumb.href ? (
                <Link href={crumb.href} className="transition-colors hover:text-gold-400">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-cream-100">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <Reveal>
        <span className="eyebrow mt-8 text-gold-400">
          <EyebrowMark />
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={90}>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] tracking-tight text-cream-50 text-balance sm:text-5xl lg:text-[3.5rem]">
          {title}
        </h1>
      </Reveal>

      {lede && (
        <Reveal delay={180}>
          <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-cream-200/75 text-pretty">{lede}</p>
        </Reveal>
      )}

      {children && (
        <Reveal delay={260}>
          <div className="mt-9 flex flex-wrap gap-3">{children}</div>
        </Reveal>
      )}
    </Band>
  );
}
