import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHero } from "@/components/sections/PageHero";
import { Band, Section } from "@/components/sections/Band";
import { Blob, DotGrid } from "@/components/ui/Decor";
import { CtaButton } from "@/components/ui/CtaButton";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { site, socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Talk to Laxmi Developers — ${site.address.city}. Call ${site.phone}, email ${site.emails.sales}, or send an enquiry and we will call you back.`,
};

const channels: {
  icon: IconName;
  label: string;
  lines: { text: string; href?: string }[];
}[] = [
  {
    icon: "phone",
    label: "Contact us",
    lines: [{ text: site.phone, href: `tel:${site.phoneHref}` }],
  },
  {
    icon: "mail",
    label: "Mail us",
    lines: [
      { text: site.emails.general, href: `mailto:${site.emails.general}` },
      { text: site.emails.sales, href: `mailto:${site.emails.sales}` },
    ],
  },
  {
    icon: "pin",
    label: "Office address",
    lines: [{ text: site.address.full, href: site.mapsUrl }],
  },
];

const assurances: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "clock",
    title: "Same-day callback",
    body: "Enquiries received during business hours get a call back the same day.",
  },
  {
    icon: "shield",
    title: "Your data stays private",
    body: "We never sell your details. See our Privacy Policy in the footer.",
  },
  {
    icon: "users",
    title: "Straight answers",
    body: "Availability, pricing and possession timelines — as they actually stand.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title={
          <>
            Let&rsquo;s talk about the right <Accent>address for you.</Accent>
          </>
        }
        lede="Our legacy is reflected in the people we work with, the projects we deliver, and the confidence our clients place in us."
        image="/media/founder-office.webp"
        imageAlt="The Laxmi Developers office reception"
        crumbs={[{ label: "Contact Us" }]}
      >
        <CtaButton
          href={`tel:${site.phoneHref}`}
          external
          variant="gold"
          size="lg"
          icon="phone"
        >
          {site.phone}
        </CtaButton>
        <CtaButton
          href={`https://wa.me/${site.whatsapp}`}
          external
          variant="light"
          size="lg"
          icon="whatsapp"
        >
          WhatsApp Us
        </CtaButton>
      </PageHero>

      {/* ------------------------------------------------------------ Channels */}
      <Section spacing="sm">
        <div className="grid gap-5 md:grid-cols-3">
          {channels.map((channel, i) => (
            <Reveal key={channel.label} delay={i * 90}>
              <article className="group h-full rounded-[1.75rem] border border-cream-300/70 bg-cream-100 p-7 transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:border-forest-600/30 hover:bg-white hover:shadow-[0_24px_50px_-24px_rgba(18,28,38,.22)]">
                <span className="flex size-14 items-center justify-center rounded-full bg-forest-700/10 text-forest-700 transition-colors duration-500 group-hover:bg-forest-700 group-hover:text-cream-50">
                  <Icon name={channel.icon} className="size-6" />
                </span>
                <h2 className="mt-6 text-[0.68rem] font-semibold tracking-[0.18em] text-slate-muted uppercase">
                  {channel.label}
                </h2>
                <div className="mt-2 space-y-1">
                  {channel.lines.map((line) => (
                    <p key={line.text}>
                      <a
                        href={line.href}
                        {...(line.href?.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-[0.94rem] leading-relaxed text-ink-900 link-underline"
                      >
                        {line.text}
                      </a>
                    </p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- Form */}
      <Band tone="cream" pad="lg">
        <Blob
          className="-right-24 -bottom-24 size-96"
          tone="text-gold-500/10"
        />
        <DotGrid
          className="top-10 left-8 h-20 w-32"
          tone="text-forest-700/15"
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
              lede="Fill this in and the right person will call you back — usually the same day. No call centres, no scripted pitch."
            />

            <div className="mt-10 space-y-4">
              {assurances.map((item, i) => (
                <Reveal key={item.title} delay={i * 90}>
                  <div className="flex gap-4 rounded-2xl border border-cream-300/70 bg-cream-50 p-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-forest-700/10 text-forest-700">
                      <Icon name={item.icon} className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-[0.9rem] font-semibold text-ink-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[0.84rem] leading-relaxed text-slate-muted">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={400}>
              <div className="mt-9">
                <p className="text-[0.68rem] tracking-[0.18em] text-slate-muted uppercase">
                  Follow us
                </p>
                <ul className="mt-4 flex gap-2.5">
                  {socialLinks.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex size-10 items-center justify-center rounded-full border border-cream-300 bg-white text-ink-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-forest-700 hover:bg-forest-700 hover:text-cream-50"
                      >
                        <Icon name={social.icon} className="size-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="rounded-[1.75rem] bg-white p-7 shadow-[0_24px_60px_-32px_rgba(18,28,38,.25)] sm:p-9">
              <EnquiryForm source="Contact page" />
            </div>
          </Reveal>
        </div>
      </Band>

      {/* ------------------------------------------------------------ Location */}
      <Section spacing="lg">
        <SectionHeading
          eyebrow="Office location"
          title="Come and see us in Bhandup West"
          lede="Our office is on Bhatti Pada Road, opposite Parshwa Nath Jain Mandir. Walk in, or call ahead and we will keep the plans ready."
        />

        <Reveal delay={150}>
          {/*
            The card is no longer one big link. The embed is interactive, and an
            iframe inside an <a> is invalid HTML that behaves badly: the map
            swallows the click meant to open directions, and keyboard users land
            inside the map with no way to reach the link. "Get Directions" is the
            link now, and the map is just the map.
          */}
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-cream-300/70 bg-cream-100">
            <div className="relative aspect-16/10 sm:aspect-21/9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.0396113943175!2d72.9371267!3d19.1497433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b86520c2de1d%3A0x34a081498097ad4!2sLaxmi%20Developers!5e0!3m2!1sen!2sin!4v1788523974301!5m2!1sen!2sin"
                title={`Map showing the ${site.name} office in ${site.address.city}`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 size-full border-0"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-5 p-6 sm:p-8">
              <address className="text-[0.92rem] leading-relaxed text-ink-900 not-italic">
                <strong className="font-semibold">{site.name}</strong>
                <br />
                {site.address.line1}, {site.address.line2}
                <br />
                {site.address.city}, {site.address.state} {site.address.pincode}
              </address>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-forest-700 px-6 py-3 text-[0.85rem] font-semibold text-cream-50 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Get Directions
                <Icon name="arrowUpRight" className="size-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
