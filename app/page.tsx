import Image from "next/image";
import Link from "next/link";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Band, Section } from "@/components/sections/Band";
import { CtaBand } from "@/components/sections/CtaBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustMarquee } from "@/components/sections/TrustMarquee";
import { ArchFrame, Blob, DotGrid, EyebrowMark } from "@/components/ui/Decor";
import { CtaButton } from "@/components/ui/CtaButton";
import { Counter } from "@/components/ui/Counter";
import { EnquireButton } from "@/components/ui/EnquireButton";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { companyStats, process, services, values } from "@/lib/company";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { testimonials } from "@/lib/testimonials";

export default function HomePage() {
  const flagship = projects[0];
  // The testimonials band is sand; without it the CTA band's top curve meets the
  // page's own cream ground instead. Emptying lib/testimonials.ts keeps the seam
  // correct on its own.
  const ctaTopTone =
    testimonials.length > 0 ? "fill-cream-200" : "fill-cream-50";

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <Band tone="forest" pad="lg">
        <Blob
          className="-top-24 -right-32 size-[34rem]"
          tone="text-forest-600/25"
        />
        <DotGrid
          className="bottom-10 left-6 h-24 w-40"
          tone="text-gold-500/25"
        />

        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <span className="eyebrow text-gold-400">
                <EyebrowMark />
                Real estate developers · Mumbai
              </span>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-5 font-display text-[2.5rem] leading-[1.06] tracking-tight text-cream-50 text-balance sm:text-6xl lg:text-[4rem]">
                Building dreams,
                <br />
                creating <Accent>futures.</Accent>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-7 max-w-lg text-[1.02rem] leading-relaxed text-cream-200/75 text-pretty">
                Laxmi Developers focuses on getting the basics right: space,
                structure, and how it all comes together. The result is homes
                that feel effortless to live in and easy to trust over time.
              </p>
            </Reveal>

            <Reveal delay={270}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <EnquireButton source="Home hero" variant="gold" size="lg">
                  Enquire Now
                </EnquireButton>
                <CtaButton href="/projects" variant="light" size="lg">
                  View Projects
                </CtaButton>
              </div>
            </Reveal>

            <Reveal delay={360}>
              <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-cream-200/12 pt-8">
                {[
                  { k: "Since", v: "2008" },
                  { k: "Based in", v: "Bhandup West" },
                  { k: "Now building", v: "Laxmi Heights" },
                ].map((item) => (
                  <div key={item.k}>
                    <dt className="text-[0.66rem] tracking-[0.16em] text-cream-200/45 uppercase">
                      {item.k}
                    </dt>
                    <dd className="mt-1 font-display text-lg text-cream-50">
                      {item.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/*
            Plain rounded frame at the photograph's own 16:9. The arch this
            replaced cropped it to 3:4, which cut off the founder's head and
            half the logo on the wall behind him.
          */}
          <Reveal delay={200} className="relative">
            <div className="relative mx-auto aspect-[1672/941] w-full overflow-hidden rounded-[1.5rem] shadow-2xl shadow-forest-950/40 ring-1 ring-cream-200/15">
              <Image
                src="/media/founder-office.webp"
                alt="Nilesh Gavad, founder of Laxmi Developers, at the office reception"
                fill
                priority
                sizes="(min-width:1024px) 45vw, 92vw"
                className="object-cover"
              />
            </div>

            <Link
              href={flagship.href!}
              // Straddles the bottom edge so it layers over the frame without
              // hiding anything but the lip of the reception counter.
              className="group absolute -bottom-7 left-1/2 flex w-[min(20rem,90%)] -translate-x-1/2 items-center gap-3 rounded-2xl bg-cream-50 p-3 pr-4 shadow-xl shadow-forest-950/30 transition-transform duration-300 hover:-translate-x-1/2 hover:-translate-y-1 lg:left-6 lg:translate-x-0 lg:hover:translate-x-0"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-forest-700/10 text-forest-700">
                <Icon name="building" className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 text-[0.62rem] font-semibold tracking-[0.16em] text-forest-600 uppercase">
                  <span
                    aria-hidden="true"
                    className="size-1.5 animate-pulse rounded-full bg-forest-600"
                  />
                  Ongoing project
                </span>
                <span className="mt-0.5 block truncate font-display text-base text-ink-900">
                  {flagship.name}
                </span>
              </span>
              <Icon
                name="arrowRight"
                className="size-4 shrink-0 text-slate-muted transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>
        </div>
      </Band>

      {/* Full-bleed on purpose: a ticker clipped by a rounded pill reads as a
          broken word, whereas clipping at the viewport edge reads as motion. */}
      <div className="mt-6">
        <TrustMarquee />
      </div>

      {/* --------------------------------------------------------------- Stats */}
      <Section spacing="sm">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {companyStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90}>
              <div className="border-l-2 border-gold-500/50 pl-5">
                <p className="font-display text-4xl text-forest-800 lg:text-5xl">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    plain={stat.plain}
                  />
                </p>
                <p className="mt-2 text-[0.82rem] leading-snug text-slate-muted">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* --------------------------------------------------------------- About */}
      <Section spacing="lg">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal className="relative">
            <Blob
              className="-top-10 -left-12 size-72"
              tone="text-gold-500/12"
            />
            <ArchFrame variant="soft" className="aspect-[1358/764] w-full">
              <Image
                src="/media/elevation-wide.webp"
                alt="Elevation render of Laxmi Heights, the company's ongoing tower in Bhandup West"
                fill
                sizes="(min-width:1024px) 52vw, 100vw"
                className="object-cover"
              />
            </ArchFrame>

            {/* Straddles the bottom-right corner. Sat inside the old portrait frame;
                over a landscape render that would cover the tower. */}
            <div className="absolute -bottom-5 right-3 w-32 rounded-2xl bg-forest-800 p-4 text-center text-cream-100 shadow-xl shadow-forest-950/20 sm:right-6 sm:w-40 sm:p-5 lg:-right-6 lg:-bottom-6 motion-safe:animate-float-slow">
              <p className="font-display text-2xl text-gold-500 sm:text-3xl">2008</p>
              <p className="mt-1 text-[0.72rem] leading-snug text-balance text-cream-200/80">
                Building in Mumbai since
              </p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="About the company"
              title={
                <>
                  Developing homes with vision, value and <Accent>care.</Accent>
                </>
              }
              lede="We are more than a real estate company. We shape communities and deliver spaces where life and business thrive — combining modern design, superior quality and long-term value."
            />

            <ul className="mt-8 space-y-4">
              {[
                "A leader who believes strong planning creates strong projects.",
                "A professional who values legal clarity, smart execution and honest dealings.",
                "A visionary focused on building practical, profitable and future-ready spaces.",
              ].map((point, i) => (
                <Reveal key={point} delay={i * 90}>
                  <li className="flex gap-3.5">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-forest-700/10 text-forest-700">
                      <Icon name="check" className="size-3.5" />
                    </span>
                    <p className="text-[0.94rem] leading-relaxed text-ink-700/85">
                      {point}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={280}>
              <div className="mt-10 flex flex-wrap gap-3">
                <CtaButton href="/about" variant="primary" size="md">
                  More About Us
                </CtaButton>
                <EnquireButton source="Home about" variant="outline" size="md">
                  Talk to Our Team
                </EnquireButton>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------ Services */}
      <Band tone="sand" pad="lg">
        <Blob
          className="-bottom-28 -left-24 size-96"
          tone="text-forest-700/8"
        />
        <DotGrid
          className="top-10 right-8 h-20 w-32"
          tone="text-forest-700/20"
        />

        <SectionHeading
          eyebrow="What we do"
          title="Smart real estate solutions designed for growth and value"
          lede="End-to-end development services that help investors, buyers and partners achieve long-term success."
          align="center"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 90}>
              <article className="group h-full rounded-[1.75rem] bg-cream-50 p-7 text-center transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-2 hover:bg-white hover:shadow-[0_24px_50px_-24px_rgba(18,28,38,.25)]">
                <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-forest-700/10 text-forest-700 transition-colors duration-500 group-hover:bg-forest-700 group-hover:text-cream-50">
                  <Icon name={service.icon} className="size-7" />
                </span>
                <h3 className="mt-6 font-display text-lg leading-snug text-ink-900">
                  {service.title}
                </h3>
                <p className="mt-3 text-[0.86rem] leading-relaxed text-slate-muted">
                  {service.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ------------------------------------------------------------ Projects */}
      <Section spacing="lg">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Our projects"
            title="What we are building"
            lede="Laxmi Heights is our current development in Bhandup West. New addresses are in planning."
          />
          <Reveal delay={200}>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-[0.85rem] font-semibold text-forest-700"
            >
              View All Projects
              <Icon
                name="arrowRight"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        {/* Flagship spotlight — the one real project, given room. */}
        <Reveal delay={120}>
          <article className="group mt-12 grid overflow-hidden rounded-[2rem] border border-cream-300/70 bg-white transition-shadow duration-500 hover:shadow-[0_30px_70px_-30px_rgba(18,28,38,.3)] lg:grid-cols-2">
            <div className="relative aspect-16/11 overflow-hidden lg:aspect-auto lg:min-h-[28rem]">
              <Image
                src="/media/night-aerial.webp"
                alt="Aerial night view of Laxmi Heights and the surrounding Bhandup skyline"
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
              />
              <span className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-ink-900/70 px-3.5 py-1.5 text-[0.68rem] font-semibold tracking-[0.16em] text-cream-50 uppercase backdrop-blur-sm">
                <span
                  aria-hidden="true"
                  className="size-1.5 animate-pulse rounded-full bg-forest-500"
                />
                Ongoing
              </span>
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-11">
              <p className="flex items-center gap-1.5 text-[0.78rem] text-slate-muted">
                <Icon name="pin" className="size-3.5 text-forest-600" />
                {flagship.location}
              </p>
              <h3 className="mt-2.5 font-display text-3xl text-ink-900 sm:text-4xl">
                {flagship.name}
              </h3>
              <p className="mt-4 text-[0.94rem] leading-relaxed text-slate-muted text-pretty">
                {flagship.summary}
              </p>

              <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-cream-200 pt-6">
                {flagship.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-[0.64rem] tracking-[0.14em] text-slate-muted/80 uppercase">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-[0.84rem] font-semibold text-ink-900">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <CtaButton href={flagship.href!} variant="primary" size="md">
                  Explore Laxmi Heights
                </CtaButton>
                <EnquireButton
                  project={flagship.name}
                  source="Home flagship"
                  variant="outline"
                  size="md"
                >
                  Enquire
                </EnquireButton>
              </div>
            </div>
          </article>
        </Reveal>
      </Section>

      {/* -------------------------------------------------------------- Values */}
      <Band tone="forest" pad="lg">
        <Blob
          className="-top-32 -left-20 size-[30rem]"
          tone="text-forest-600/25"
        />

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Why Laxmi Developers"
            title={
              <>
                Four things we will not <Accent>compromise on.</Accent>
              </>
            }
            tone="light"
          />

          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 90}>
                <li className="border-t border-cream-200/15 pt-5">
                  <span className="font-display text-2xl text-gold-400">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-xl text-cream-50">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-cream-200/70">
                    {value.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Band>

      {/* ------------------------------------------------------------- Process */}
      <Section spacing="lg">
        <SectionHeading
          eyebrow="How it works"
          title="From first call to handover"
          lede="A clear, four-step path so you always know what happens next."
          align="center"
        />

        <ol className="relative mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Dashed rule threading the steps together on wide screens. */}
          <span
            aria-hidden="true"
            className="absolute top-10 right-16 left-16 hidden border-t-2 border-dashed border-forest-700/20 lg:block"
          />

          {process.map((item, i) => (
            <Reveal key={item.step} delay={i * 110}>
              <li className="relative text-center">
                <span className="relative z-10 mx-auto flex size-20 items-center justify-center rounded-full border-2 border-dashed border-forest-700/25 bg-cream-50">
                  <span className="flex size-14 items-center justify-center rounded-full bg-white text-forest-700 shadow-sm">
                    <Icon name={item.icon} className="size-6" />
                  </span>
                </span>
                <p className="mt-5 font-display text-sm tracking-[0.2em] text-gold-600">
                  {item.step}
                </p>
                <h3 className="mt-1 font-display text-lg text-ink-900">
                  {item.title}
                </h3>
                <p className="mx-auto mt-2.5 max-w-xs text-[0.86rem] leading-relaxed text-slate-muted">
                  {item.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* --------------------------------------------------------- Testimonials */}
      <Testimonials />

      <CtaBand
        eyebrow="Schedule a visit"
        title="Get expert guidance on the best opportunities in premium real estate."
        body="Share your requirement and our team will call you back with configurations, pricing and a site visit slot that suits you."
        source="Home CTA band"
        topTone={ctaTopTone}
        bottomTone="fill-cream-100"
      />

      {/* ------------------------------------------------------------- Enquiry */}
      <Band id="enquire" tone="cream" pad="lg">
        <Blob
          className="-right-24 -bottom-24 size-96"
          tone="text-gold-500/10"
        />

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Get in touch"
              title={
                <>
                  What can we <Accent>assist you with?</Accent>
                </>
              }
              lede="Tell us a little about what you are looking for. No obligation, no spam — just a straight answer from someone who knows the projects."
            />

            <ul className="mt-10 space-y-6">
              {[
                {
                  icon: "pin" as const,
                  label: "Office",
                  value: site.address.full,
                  href: site.mapsUrl,
                  external: true,
                },
                {
                  icon: "phone" as const,
                  label: "Call us",
                  value: site.phone,
                  href: `tel:${site.phoneHref}`,
                },
                {
                  icon: "mail" as const,
                  label: "Mail us",
                  value: site.emails.sales,
                  href: `mailto:${site.emails.sales}`,
                },
              ].map((item, i) => (
                <Reveal key={item.label} delay={i * 90}>
                  <li className="flex gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest-700/10 text-forest-700">
                      <Icon name={item.icon} className="size-5" />
                    </span>
                    <div>
                      <p className="text-[0.68rem] tracking-[0.16em] text-slate-muted uppercase">
                        {item.label}
                      </p>
                      <a
                        href={item.href}
                        {...(item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="mt-1 block text-[0.92rem] leading-relaxed text-ink-900 link-underline"
                      >
                        {item.value}
                      </a>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={150}>
            <div className="rounded-[1.75rem] bg-white p-7 shadow-[0_24px_60px_-32px_rgba(18,28,38,.25)] sm:p-9">
              <EnquiryForm source="Home enquiry section" />
            </div>
          </Reveal>
        </div>
      </Band>
    </>
  );
}
