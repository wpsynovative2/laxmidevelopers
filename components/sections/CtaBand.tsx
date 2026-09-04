import Image from "next/image";
import { site } from "@/lib/site";
import { EnquireButton } from "../ui/EnquireButton";
import { CtaButton } from "../ui/CtaButton";
import { EyebrowMark, WaveDivider } from "../ui/Decor";
import { Reveal } from "../ui/Reveal";

interface CtaBandProps {
  eyebrow?: string;
  title: string;
  body: string;
  /** Pre-selects a project in the enquiry popup. */
  project?: string;
  source: string;
  image?: string;
  primaryLabel?: string;
  /** Fill for the top curve — must match the section above. "none" omits it. */
  topTone?: string;
  /** Fill for the bottom curve — must match whatever follows. "none" omits it. */
  bottomTone?: string;
}

/**
 * Full-bleed conversion band. Curved dividers top and bottom soften the join
 * with the cream sections either side of it.
 */
export function CtaBand({
  eyebrow = "Let's talk",
  title,
  body,
  project,
  source,
  image = "/media/night-aerial-alt.webp",
  primaryLabel = "Enquire Now",
  topTone = "fill-cream-50",
  // Most pages end on this band, and the footer is what follows.
  bottomTone = "fill-forest-900",
}: CtaBandProps) {
  return (
    <section className="relative isolate overflow-hidden">
      {topTone !== "none" && <WaveDivider position="top" tone={topTone} />}
      <Image src={image} alt="" aria-hidden="true" fill sizes="100vw" className="-z-10 object-cover" />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-forest-950/95 via-forest-900/85 to-forest-800/55" />

      <div className="container-x py-24 sm:py-28">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow text-gold-400">
              <EyebrowMark />
              {eyebrow}
            </span>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-4 font-display text-3xl leading-tight text-cream-50 text-balance sm:text-4xl lg:text-[2.6rem]">{title}</h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-5 text-[1rem] leading-relaxed text-cream-200/75 text-pretty">{body}</p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap gap-3">
              <EnquireButton project={project} source={source} variant="gold" size="lg">
                {primaryLabel}
              </EnquireButton>
              <CtaButton href={`tel:${site.phoneHref}`} external variant="light" size="lg" icon="phone">
                {site.phone}
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </div>

      {bottomTone !== "none" && <WaveDivider position="bottom" tone={bottomTone} />}
    </section>
  );
}
