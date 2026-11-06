import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd, laxmiHeightsSchema } from "@/components/JsonLd";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { AutoEnquiry } from "@/components/projects/AutoEnquiry";
import { PlanGallery } from "@/components/projects/PlanGallery";
import { SectionNav } from "@/components/projects/SectionNav";
import { StatusBadge } from "@/components/projects/StatusBadge";
import { CtaBand } from "@/components/sections/CtaBand";
import { Band, Section } from "@/components/sections/Band";
import { ArchFrame, Blob, DotGrid, EyebrowMark } from "@/components/ui/Decor";
import { CtaButton } from "@/components/ui/CtaButton";
import { Counter } from "@/components/ui/Counter";
import { EnquireButton, LegalLink } from "@/components/ui/EnquireButton";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { laxmiHeights as lh } from "@/lib/laxmi-heights";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Laxmi Heights — Ongoing in Bhandup West",
  description:
    "Laxmi Heights, a project by Laxmi Developers: an ongoing residential tower on Bhatti Pada Road, Bhandup West, Mumbai. 1, 2 and 3 BHK homes from 319 to 666 sq.ft. carpet, with terrace-level amenities.",
};

export default function LaxmiHeightsPage() {
  return (
    <>
      <JsonLd data={laxmiHeightsSchema} />
      <AutoEnquiry
        storageKey="lh-auto-enquiry-shown"
        project={lh.name}
        source="Laxmi Heights auto popup"
      />

      {/* ----------------------------------------------------------------- Hero */}
      <Band tone="forest" pad="lg">
        <Image
          src={lh.hero.image}
          alt={lh.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-30"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-br from-forest-950/92 via-forest-950/80 to-forest-900/60"
        />
        <Blob
          className="-top-28 -right-28 size-[32rem]"
          tone="text-forest-600/20"
        />
        <DotGrid
          className="bottom-10 left-6 h-20 w-32"
          tone="text-gold-500/25"
        />

        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            {/* The project belongs to the company — say so, and link back. */}
            <Reveal>
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 rounded-full border border-cream-200/20 bg-cream-50/5 py-2 pr-5 pl-2.5 backdrop-blur-sm transition-colors duration-300 hover:border-gold-500/40"
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-cream-50">
                  <Image
                    src="/media/logo-mark.png"
                    alt=""
                    width={939}
                    height={662}
                    className="h-4 w-auto"
                  />
                </span>
                <span className="text-[0.72rem] tracking-[0.14em] text-cream-200/75 uppercase">
                  A project by{" "}
                  <span className="font-semibold text-cream-50">
                    {site.name}
                  </span>
                </span>
              </Link>
            </Reveal>

            <Reveal delay={90}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <StatusBadge status={lh.status} tone="solid" />
                <span className="flex items-center gap-1.5 text-[0.8rem] text-cream-200/70">
                  <Icon name="pin" className="size-3.5 text-gold-500" />
                  {lh.location}
                </span>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <h1 className="mt-5 font-display text-[2.6rem] leading-[1.06] tracking-tight text-cream-50 text-balance sm:text-6xl lg:text-[4rem]">
                {lh.name}
              </h1>
            </Reveal>

            <Reveal delay={210}>
              <p className="mt-3 font-display text-xl text-gold-500 sm:text-2xl">
                {lh.hero.title}
              </p>
            </Reveal>

            <Reveal delay={270}>
              <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-cream-200/75 text-pretty">
                {lh.hero.lede}
              </p>
            </Reveal>

            <Reveal delay={340}>
              <div className="mt-9 flex flex-wrap gap-3">
                <EnquireButton
                  project={lh.name}
                  source="Laxmi Heights hero"
                  variant="gold"
                  size="lg"
                >
                  Enquire Now
                </EnquireButton>
                <CtaButton
                  href="#floor-plans"
                  variant="light"
                  size="lg"
                  icon="arrowRight"
                >
                  View Floor Plans
                </CtaButton>
              </div>
            </Reveal>

            <Reveal delay={420}>
              <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-cream-200/12 pt-8">
                {[
                  { k: "Configuration", v: "1, 2 & 3 BHK" },
                  { k: "Carpet area", v: "319 – 666 sq.ft." },
                  { k: "Status", v: "Under construction" },
                ].map((item) => (
                  <div key={item.k}>
                    <dt className="text-[0.64rem] tracking-[0.16em] text-cream-200/45 uppercase">
                      {item.k}
                    </dt>
                    <dd className="mt-1 font-display text-base text-cream-50">
                      {item.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={220}>
            {/*
              The elevation render is a tall 1200x2133. Framed as a plain rounded
              rectangle at that exact ratio, so the whole building reads from
              parapet to retail plinth — an arch crops both ends off.
            */}
            <div className="relative mx-auto aspect-[1200/2133] w-full max-w-[15rem] overflow-hidden rounded-[1.5rem] shadow-2xl shadow-forest-950/50 ring-1 ring-cream-200/15 sm:max-w-[17rem] lg:max-w-[21rem]">
              <Image
                src="/media/Elevation-full-width.jpeg"
                alt="Full elevation of the Laxmi Heights tower seen from Bhatti Pada Road"
                fill
                sizes="(min-width:1024px) 21rem, (min-width:640px) 17rem, 15rem"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Band>

      <SectionNav sections={lh.sections} projectName={lh.name} />

      {/* ------------------------------------------------------------- Overview */}
      <Section id="overview" spacing="lg" className="scroll-mt-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow={lh.overview.eyebrow}
              title={
                <>
                  A perfect balance of <Accent>comfort and value.</Accent>
                </>
              }
            />
            <div className="mt-6 space-y-5">
              {lh.overview.body.map((paragraph, i) => (
                <Reveal key={i} delay={i * 90}>
                  <p className="text-[0.96rem] leading-relaxed text-ink-700/85 text-pretty">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-5 border-t border-cream-300 pt-8 sm:grid-cols-4">
              {lh.overview.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 80}>
                  <div>
                    <p className="font-display text-3xl text-forest-800">
                      <Counter
                        value={stat.value}
                        suffix={stat.suffix}
                        plain={"plain" in stat ? stat.plain : false}
                      />
                    </p>
                    <p className="mt-1.5 text-[0.76rem] leading-snug text-slate-muted">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={300}>
              <div className="mt-9">
                <EnquireButton
                  project={lh.name}
                  source="Laxmi Heights overview"
                  variant="primary"
                  size="md"
                >
                  Enquire Now
                </EnquireButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="relative">
            <Blob
              className="-top-10 -right-12 size-72"
              tone="text-gold-500/12"
            />
            <ArchFrame variant="soft" className="aspect-4/3">
              <Image
                src={lh.overview.image}
                alt={lh.overview.imageAlt}
                fill
                sizes="(min-width:1024px) 48vw, 100vw"
                className="object-cover"
              />
            </ArchFrame>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------------ Amenities */}
      <Section id="amenities" spacing="lg" className="scroll-mt-32">
        <SectionHeading
          eyebrow="Amenities"
          title={
            <>
              Modern amenities designed for <Accent>everyday comfort.</Accent>
            </>
          }
          lede="Wellness, play and leisure spaces on the terrace levels — built to be used daily."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:auto-rows-[18rem] lg:grid-cols-3">
          {lh.amenities.map((amenity, i) => {
            const wide = "wide" in amenity && amenity.wide;
            return (
              <Reveal
                key={amenity.name}
                delay={(i % 3) * 90}
                className={wide ? "lg:col-span-2" : ""}
              >
                <figure className="group relative aspect-4/3 h-full overflow-hidden rounded-[1.75rem] lg:aspect-auto">
                  <Image
                    src={amenity.image}
                    alt={amenity.alt}
                    fill
                    sizes={
                      wide
                        ? "(min-width:1024px) 63vw, (min-width:640px) 48vw, 100vw"
                        : "(min-width:1024px) 31vw, (min-width:640px) 48vw, 100vw"
                    }
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-107"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-ink-900/85 via-ink-900/15 to-transparent"
                  />
                  <figcaption className="absolute inset-x-5 bottom-5 font-display text-lg text-cream-50">
                    {amenity.name}
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {lh.amenityList.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-full border border-cream-300 bg-white px-4 py-2 text-[0.82rem] text-ink-700 transition-colors duration-300 hover:border-forest-600/40 hover:text-forest-700"
              >
                <Icon name="check" className="size-3.5 text-forest-600" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* -------------------------------------------------------- Configuration */}
      <Band id="configuration" tone="cream" pad="lg" className="scroll-mt-32">
        <Blob
          className="-right-24 -bottom-20 size-80"
          tone="text-gold-500/10"
        />

        <SectionHeading
          eyebrow="Configuration"
          title="Configurations crafted for flexibility and ease"
          lede="Nine layouts across 1, 2 and 3 BHK — carpet areas as registered."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
          <Reveal>
            <div className="overflow-hidden rounded-[1.75rem] border border-cream-300/70 bg-cream-50">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[26rem] text-left text-[0.9rem]">
                  <caption className="sr-only">
                    Laxmi Heights unit configurations and carpet areas
                  </caption>
                  <thead>
                    <tr className="bg-forest-800 text-cream-100">
                      <th
                        scope="col"
                        className="px-6 py-4 text-[0.68rem] font-semibold tracking-[0.14em] uppercase"
                      >
                        Sr. No
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-[0.68rem] font-semibold tracking-[0.14em] uppercase"
                      >
                        Config
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-right text-[0.68rem] font-semibold tracking-[0.14em] uppercase"
                      >
                        Carpet Area
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {lh.configurations.map((row) => (
                      <tr
                        key={row.sr}
                        className="border-t border-cream-200 transition-colors duration-200 hover:bg-white"
                      >
                        <td className="px-6 py-3.5 text-slate-muted tabular-nums">
                          {row.sr}
                        </td>
                        <td className="px-6 py-3.5 font-semibold text-ink-900">
                          {row.config}
                        </td>
                        <td className="px-6 py-3.5 text-right text-ink-700 tabular-nums">
                          {row.carpet}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <aside className="flex h-full flex-col justify-center rounded-[1.75rem] bg-forest-800 p-8 text-cream-100">
              <h3 className="font-display text-2xl text-cream-50">
                Want the price list?
              </h3>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-cream-200/75">
                Share your details and we will send the current price list,
                payment plan and the full brochure.
              </p>
              <div className="mt-7 flex flex-col gap-3">
                <EnquireButton
                  project={lh.name}
                  source="Laxmi Heights configuration"
                  title="Get the Brochure"
                  subtitle="Share your details and we will send the full plan set and price list."
                  variant="gold"
                  size="md"
                >
                  Get Brochure Now
                </EnquireButton>
                <CtaButton
                  href={`tel:${site.phoneHref}`}
                  external
                  variant="light"
                  size="md"
                  icon="phone"
                >
                  {site.phone}
                </CtaButton>
              </div>
            </aside>
          </Reveal>
        </div>
      </Band>

      {/* ----------------------------------------------------------- Floor plans */}
      <Section id="floor-plans" spacing="lg" className="scroll-mt-32">
        <SectionHeading
          eyebrow="Floor plan"
          title={
            <>
              Efficient floor plans with <Accent>optimal space use.</Accent>
            </>
          }
          lede="Unit layouts drawn for usable space — circulation kept tight so the living area gets the room."
        />
        <div className="mt-12">
          <PlanGallery
            plans={lh.floorPlans}
            projectName={lh.name}
            caption="Plans are indicative and subject to change and to the approval of the competent authorities. Areas shown on plans may differ from the registered carpet areas listed in the configuration table."
          />
        </div>
      </Section>

      {/* --------------------------------------------------------- Floor plates */}
      <Band tone="sand" pad="lg">
        <SectionHeading
          eyebrow="Floor plates"
          title="Every level, plate by plate"
          lede="From the ground-floor retail plinth to the 26th-floor terrace."
        />
        <div className="mt-12">
          <PlanGallery plans={lh.floorPlates} projectName={lh.name} />
        </div>
      </Band>

      {/* -------------------------------------------------------- Virtual tour */}
      <Section id="virtual-tour" spacing="lg" className="scroll-mt-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={lh.virtualTour.eyebrow}
            title={
              <>
                Walk through <Accent>Laxmi Heights.</Accent>
              </>
            }
            lede={lh.virtualTour.lede}
          />
          <Reveal delay={200}>
            <CtaButton
              href={lh.virtualTour.url}
              external
              variant="outline"
              size="md"
              icon="arrowUpRight"
            >
              Open Full Screen
            </CtaButton>
          </Reveal>
        </div>

        <Reveal delay={120}>
          {/* The tour is a third-party build; if it fails to load the page is unaffected. */}
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-cream-300/70 bg-forest-950 shadow-[0_30px_70px_-40px_rgba(18,28,38,.4)]">
            <iframe
              src={lh.virtualTour.url}
              title={`${lh.name} 360-degree virtual tour`}
              loading="lazy"
              allowFullScreen
              // What a 360 viewer needs: gyroscope panning on phones, and WebXR
              // for headset viewing. Without these the tour logs policy violations.
              allow="fullscreen; gyroscope; accelerometer; magnetometer; xr-spatial-tracking"
              // The tour is a fixed-layout third-party build: below ~30rem its own scene
              // menu is clipped, so the embed is given the height rather than scaled down.
              className="block h-[30rem] w-full border-0 sm:h-[34rem] lg:h-[40rem]"
            />
          </div>
        </Reveal>

        <p className="mt-4 text-[0.78rem] leading-relaxed text-slate-muted">
          The walkthrough shows indicative interiors, finishes and furnishing.
          Fit-out is not part of the sale unless stated in the agreement.
        </p>

        <Reveal delay={260}>
          <div className="mt-9">
            <EnquireButton
              project={lh.name}
              source="Laxmi Heights virtual tour"
              variant="primary"
              size="md"
            >
              Book a Site Visit
            </EnquireButton>
          </div>
        </Reveal>
      </Section>

      {/* --------------------------------------------------------- Connectivity */}
      <Band id="connectivity" tone="forest" pad="lg" className="scroll-mt-32">
        <Blob
          className="-right-28 -bottom-28 size-[28rem]"
          tone="text-forest-600/25"
        />

        <SectionHeading
          eyebrow="Connectivity"
          title="Easy access to daily essentials and transport hubs"
          lede="Four railway stations, two metro stations and everything a family needs within the neighbourhood."
          tone="light"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {lh.connectivity.map((group, i) => (
            <Reveal key={group.group} delay={i * 90}>
              <article className="h-full rounded-[1.75rem] border border-cream-200/12 bg-cream-50/5 p-7 backdrop-blur-sm">
                <span className="flex size-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
                  <Icon name={group.icon as IconName} className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg text-cream-50">
                  {group.group}
                </h3>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-[0.86rem] text-cream-200/70"
                    >
                      <span
                        aria-hidden="true"
                        className="size-1 shrink-0 rounded-full bg-gold-500/70"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}

          <Reveal delay={450}>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full min-h-52 flex-col justify-end overflow-hidden rounded-[1.75rem]"
            >
              <Image
                src="/media/location-map.webp"
                alt="Map showing the location of Laxmi Heights in Bhandup West"
                fill
                sizes="(min-width:1024px) 32vw, 100vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-forest-950/90 to-forest-950/20"
              />
              <span className="relative p-7">
                <span className="flex items-center gap-2 font-display text-lg text-cream-50">
                  Open in Maps
                  <Icon
                    name="arrowUpRight"
                    className="size-4 text-gold-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
                <span className="mt-1.5 block text-[0.82rem] text-cream-200/70">
                  {site.address.city}
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </Band>

      {/* -------------------------------------------------------------- Gallery */}
      <Section spacing="lg">
        <SectionHeading
          eyebrow="Gallery"
          title="Laxmi Heights, inside and out"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lh.gallery.map((shot, i) => (
            <Reveal key={shot.image} delay={(i % 3) * 90}>
              <figure className="group relative aspect-4/3 overflow-hidden rounded-[1.5rem]">
                <Image
                  src={shot.image}
                  alt={shot.alt}
                  fill
                  sizes="(min-width:1024px) 32vw, (min-width:640px) 48vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-106"
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        eyebrow="Schedule a visit"
        title="See Laxmi Heights for yourself."
        body="Book a site visit and we will walk you through the layouts, the amenity levels and the neighbourhood."
        project={lh.name}
        source="Laxmi Heights CTA band"
        image="/media/night-aerial.webp"
        bottomTone="fill-cream-100"
      />

      {/* -------------------------------------------------------------- Enquiry */}
      <Band id="enquire" tone="cream" pad="lg" className="scroll-mt-32">
        <DotGrid
          className="top-10 right-8 h-20 w-32"
          tone="text-forest-700/15"
        />

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Contact us"
              title={
                <>
                  We&rsquo;re here to help you make the{" "}
                  <Accent>right choice.</Accent>
                </>
              }
              lede="Ask us anything about carpet areas, payment plans, possession timelines or the registration status — we will answer straight."
            />

            <Reveal delay={200}>
              <div className="mt-10 rounded-[1.75rem] border border-cream-300/70 bg-cream-50 p-6">
                <span className="eyebrow text-forest-600">
                  <EyebrowMark />
                  Project by
                </span>
                <Link href="/about" className="mt-3 flex items-center gap-3">
                  <Image
                    src="/media/logo-mark.png"
                    alt=""
                    width={939}
                    height={662}
                    className="h-8 w-auto"
                  />
                  <span className="font-display text-xl text-ink-900">
                    {site.name}
                  </span>
                </Link>
                <p className="mt-4 text-[0.82rem] tracking-wide text-slate-muted">
                  {lh.rera}
                </p>
                <div className="mt-5 space-y-2.5 border-t border-cream-200 pt-5 text-[0.88rem]">
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="flex items-center gap-2.5 text-ink-900 link-underline"
                  >
                    <Icon name="phone" className="size-4 text-forest-600" />
                    {site.phone}
                  </a>
                  <a
                    href={`mailto:${site.emails.sales}`}
                    className="flex items-center gap-2.5 text-ink-900 link-underline"
                  >
                    <Icon name="mail" className="size-4 text-forest-600" />
                    {site.emails.sales}
                  </a>
                </div>
                <p className="mt-5 text-[0.72rem] leading-relaxed text-slate-muted">
                  Figures, plans and images on this page are indicative.{" "}
                  <LegalLink doc="disclaimer">
                    <span className="font-semibold text-forest-700">
                      Read the full disclaimer
                    </span>
                  </LegalLink>
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="rounded-[1.75rem] bg-white p-7 shadow-[0_24px_60px_-32px_rgba(18,28,38,.25)] sm:p-9">
              <EnquiryForm
                defaultProject={lh.name}
                source="Laxmi Heights page form"
              />
            </div>
          </Reveal>
        </div>
      </Band>
    </>
  );
}
