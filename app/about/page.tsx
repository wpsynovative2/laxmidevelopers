import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Band, Section } from "@/components/sections/Band";
import { ArchFrame, Blob, DotGrid } from "@/components/ui/Decor";
import { CtaButton } from "@/components/ui/CtaButton";
import { Counter } from "@/components/ui/Counter";
import { EnquireButton } from "@/components/ui/EnquireButton";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { companyStats, milestones, services, values } from "@/lib/company";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The vision, values and people behind Laxmi Developers — a Mumbai real estate developer building on legal clarity, considered planning and long-term value since 2008.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            Explore the vision, values and team behind{" "}
            <Accent>Laxmi Developers.</Accent>
          </>
        }
        lede="We are more than just a real estate company. We are committed to shaping communities and delivering spaces where life and business thrive."
        image="/media/elevation-b.webp"
        imageAlt="Laxmi Developers residential tower elevation"
        crumbs={[{ label: "About Us" }]}
      >
        <EnquireButton source="About hero" variant="gold" size="lg">
          Enquire Now
        </EnquireButton>
        <CtaButton href="/projects" variant="light" size="lg">
          View Projects
        </CtaButton>
      </PageHero>

      {/* ------------------------------------------------------------- Founder */}
      <Section spacing="lg">
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
          <Reveal className="relative">
            <Blob
              className="-top-12 -left-14 size-80"
              tone="text-gold-500/12"
            />
            <ArchFrame className="aspect-4/5 w-full max-w-sm">
              <Image
                src="/media/CEO-Image.png"
                alt="Nilesh Gavad, founder of Laxmi Developers"
                fill
                priority
                sizes="(min-width:1024px) 34vw, 100vw"
                className="object-cover"
              />
            </ArchFrame>
            <DotGrid
              className="-bottom-4 -left-6 h-20 w-28"
              tone="text-forest-700/20"
            />
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Who is Nilesh Gavad?"
              title={
                <>
                  A visionary in real estate <Accent>excellence.</Accent>
                </>
              }
              lede="Nilesh Gavad began his real estate journey in 2008 with a strong legal foundation, understanding the business from its roots. Over the years, he transformed this knowledge into expertise across development, sales and marketing."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Started", value: "2008" },
                { label: "Grounded in", value: "Law" },
                { label: "Focus", value: "Mumbai" },
              ].map((item, i) => (
                <Reveal key={item.label} delay={i * 90}>
                  <div className="rounded-2xl border border-cream-300/70 bg-cream-100 px-5 py-4">
                    <p className="text-[0.66rem] tracking-[0.16em] text-slate-muted uppercase">
                      {item.label}
                    </p>
                    <p className="mt-1 font-display text-xl text-forest-800">
                      {item.value}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={260}>
              <blockquote className="mt-9 border-l-2 border-gold-500 pl-6">
                <p className="font-display text-lg leading-relaxed text-ink-900 text-pretty">
                  &ldquo;Strong planning creates strong projects. Legal clarity,
                  smart execution and honest dealings are not extras &mdash;
                  they are the foundation.&rdquo;
                </p>
                <footer className="mt-3 text-[0.82rem] text-slate-muted">
                  Nilesh Gavad · Founder, Laxmi Developers
                </footer>
              </blockquote>
            </Reveal>

            <Reveal delay={340}>
              <div className="mt-9">
                <EnquireButton
                  source="About founder"
                  variant="primary"
                  size="md"
                >
                  Speak With Our Team
                </EnquireButton>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ----------------------------------------------------------- Expertise */}
      <Band tone="forest" pad="lg">
        <Image
          src="/media/team-planning.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="-z-10 object-cover opacity-15"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-r from-forest-950/95 to-forest-900/75"
        />
        <Blob
          className="-right-24 -bottom-28 size-96"
          tone="text-forest-600/25"
        />

        <SectionHeading
          eyebrow="Our expertise"
          title="Building opportunities that move you forward"
          lede="At Laxmi Developers we go beyond property transactions. We help you discover spaces that align with your goals — whether that is a smart investment, a future-ready commercial asset, or a comfortable place to live. Our market insight, transparent process and personalised approach make every decision confident and value-driven."
          tone="light"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 90}>
              <div className="h-full rounded-[1.5rem] border border-cream-200/12 bg-cream-50/5 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-gold-500/35 hover:bg-cream-50/10">
                <h3 className="font-display text-lg text-gold-400">
                  {value.title}
                </h3>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-cream-200/70">
                  {value.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-12">
            <EnquireButton source="About expertise" variant="gold" size="lg">
              Enquire Now
            </EnquireButton>
          </div>
        </Reveal>
      </Band>

      {/* ------------------------------------------------------------ Offering */}
      <Band tone="sand" pad="lg">
        <DotGrid
          className="top-10 left-8 h-20 w-32"
          tone="text-forest-700/20"
        />
        <Blob
          className="-right-28 -bottom-20 size-96"
          tone="text-forest-700/8"
        />

        <SectionHeading
          eyebrow="What we offer"
          title="Smart real estate solutions designed for growth and value"
          lede="End-to-end services that empower investors, buyers and partners to achieve long-term success — designed to deliver maximum value, strong returns and sustainable growth."
          align="center"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 100}>
              <article className="group flex h-full gap-5 rounded-[1.75rem] bg-cream-50 p-7 transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_50px_-24px_rgba(18,28,38,.22)]">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-forest-700/10 text-forest-700 transition-colors duration-500 group-hover:bg-forest-700 group-hover:text-cream-50">
                  <Icon name={service.icon} className="size-6" />
                </span>
                <div>
                  <h3 className="font-display text-lg text-ink-900">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-[0.88rem] leading-relaxed text-slate-muted">
                    {service.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ------------------------------------------------------------- Journey */}
      <Section spacing="lg">
        <SectionHeading
          eyebrow="Our journey"
          title={
            <>
              From a legal grounding to a <Accent>growing portfolio.</Accent>
            </>
          }
          align="center"
        />

        <ol className="relative mt-16 grid gap-10 lg:grid-cols-4 lg:gap-6">
          <span
            aria-hidden="true"
            className="absolute top-3 right-12 left-12 hidden border-t-2 border-dashed border-forest-700/20 lg:block"
          />
          {milestones.map((milestone, i) => (
            <Reveal key={milestone.year} delay={i * 110}>
              <li className="relative">
                <span className="relative z-10 flex size-6 items-center justify-center rounded-full border-4 border-cream-50 bg-gold-500" />
                <p className="mt-5 font-display text-2xl text-forest-800">
                  {milestone.year}
                </p>
                <h3 className="mt-1.5 text-[0.95rem] font-semibold text-ink-900">
                  {milestone.title}
                </h3>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-slate-muted">
                  {milestone.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* --------------------------------------------------------------- Stats */}
      <Band tone="forest" pad="sm">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {companyStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90}>
              <div className="text-center">
                <p className="font-display text-4xl text-gold-500 lg:text-5xl">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    plain={stat.plain}
                  />
                </p>
                <p className="mt-2 text-[0.82rem] text-cream-200/70">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      <CtaBand
        title="Let's find the home or investment that fits your plan."
        body="Our team will walk you through what is available, what is coming, and what makes sense for your budget."
        source="About CTA band"
        // The forest stats band runs straight into this one; no curve between two darks.
        topTone="none"
      />
    </>
  );
}
