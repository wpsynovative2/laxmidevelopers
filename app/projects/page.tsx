import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Band, Section } from "@/components/sections/Band";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { Blob } from "@/components/ui/Decor";
import { CtaButton } from "@/components/ui/CtaButton";
import { EnquireButton } from "@/components/ui/EnquireButton";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { projectsByStatus, statusMeta, statusOrder } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Upcoming, ongoing and completed developments by Laxmi Developers, including Laxmi Heights — an ongoing residential tower in Bhandup West, Mumbai.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our projects"
        title={
          <>
            Upcoming, ongoing and <Accent>delivered.</Accent>
          </>
        }
        lede="Developments that reflect experience, vision and long-term value creation — from the tower taking shape today to the addresses still on the drawing board."
        image="/media/elevation-c.webp"
        imageAlt="Elevation study of a Laxmi Developers residential tower"
        crumbs={[{ label: "Projects" }]}
      >
        <EnquireButton source="Projects hero" variant="gold" size="lg">
          Enquire Now
        </EnquireButton>
        <CtaButton href="/projects/laxmi-heights" variant="light" size="lg">
          Laxmi Heights
        </CtaButton>
      </PageHero>

      {/* Three doors into the catalogue. */}
      <Section spacing="sm">
        <div className="grid gap-5 md:grid-cols-3">
          {statusOrder.map((status, i) => {
            const meta = statusMeta[status];
            const count = projectsByStatus(status).length;
            return (
              <Reveal key={status} delay={i * 90}>
                <a
                  href={`#${status}`}
                  className="group flex h-full flex-col rounded-[1.75rem] border border-cream-300/70 bg-cream-100 p-7 transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:border-forest-600/30 hover:bg-white hover:shadow-[0_24px_50px_-24px_rgba(18,28,38,.22)]"
                >
                  <span className="flex items-center gap-2.5">
                    <span aria-hidden="true" className={`size-2 rounded-full ${meta.dot}`} />
                    <span className="font-display text-xl text-ink-900">{meta.label}</span>
                    <span className="ml-auto text-[0.75rem] font-semibold text-slate-muted">
                      {count} {count === 1 ? "project" : "projects"}
                    </span>
                  </span>
                  <p className="mt-3 text-[0.86rem] leading-relaxed text-slate-muted">{meta.blurb}</p>
                </a>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Filterable grid */}
      <Section spacing="lg">
        <SectionHeading
          eyebrow="Browse the portfolio"
          title="Every Laxmi Developers address, in one place"
          lede="Filter by stage to see what is available now and what is coming next."
        />
        <div className="mt-12">
          <ProjectShowcase />
        </div>
      </Section>

      {/* Why some categories are empty. */}
      <Band tone="sand" pad="md">
        <Blob className="-right-20 -bottom-24 size-80" tone="text-forest-700/8" />
        <div className="max-w-3xl">
          <SectionHeading eyebrow="Straight answers" title="Details you can rely on" />
          <p className="mt-5 text-[0.94rem] leading-relaxed text-slate-muted text-pretty">
            We publish configurations, carpet areas and registration details only once they are approved and cleared for
            release — which is why you will not find placeholder listings here. For projects still in planning, register your
            interest and we will send you the full details, pricing and RERA registration the day they are announced.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <EnquireButton source="Projects — register interest" variant="primary" size="md">
              Register Interest
            </EnquireButton>
            <CtaButton href="/contact" variant="outline" size="md">
              Contact Our Team
            </CtaButton>
          </div>
        </div>
      </Band>

      <CtaBand
        eyebrow="Schedule a visit"
        title="See a project in person before you decide."
        body="We will arrange a site visit, walk you through the plans and give you a straight answer on availability and pricing."
        source="Projects CTA band"
        image="/media/night-aerial.webp"
        topTone="fill-cream-200"
      />
    </>
  );
}
