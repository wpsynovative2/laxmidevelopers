import type { Metadata } from "next";
import Image from "next/image";
import { CareerForm } from "@/components/forms/CareerForm";
import { PageHero } from "@/components/sections/PageHero";
import { Band, Section } from "@/components/sections/Band";
import { ArchFrame, Blob, DotGrid } from "@/components/ui/Decor";
import { CtaButton } from "@/components/ui/CtaButton";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { roleGroups } from "@/lib/jobs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Career",
  description:
    "Build your career with Laxmi Developers. We recruit across projects and engineering, sales and marketing, property operations, and corporate functions in Mumbai.",
};

const perks: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "building",
    title: "Real projects, real scale",
    body: "Work on towers that get built — from approvals and drawings through to handover.",
  },
  {
    icon: "scale",
    title: "Clarity over chaos",
    body: "A legally grounded, well-documented way of working. You will always know where a project stands.",
  },
  {
    icon: "users",
    title: "Small team, wide scope",
    body: "Fewer layers means your work is visible and your judgement matters from day one.",
  },
  {
    icon: "trend",
    title: "Room to grow",
    body: "As the portfolio expands, so does the responsibility available to people who earn it.",
  },
];

export default function CareerPage() {
  const totalRoles = roleGroups.reduce((sum, group) => sum + group.roles.length, 0);

  return (
    <>
      <PageHero
        eyebrow="Career"
        title={
          <>
            Build what the city <Accent>lives in.</Accent>
          </>
        }
        // Phrased as the disciplines we recruit for rather than confirmed vacancies —
        // the live site publishes the role list, not an open-positions count.
        lede={`We recruit across ${roleGroups.length} disciplines — engineering, sales, operations and corporate. If you value clear planning and honest work, we would like to hear from you.`}
        image="/media/scene-b.webp"
        imageAlt="Laxmi Developers project team reviewing drawings on site at sunset"
        crumbs={[{ label: "Career" }]}
      >
        <CtaButton href="#apply" variant="gold" size="lg">
          Apply Now
        </CtaButton>
        <CtaButton href={`mailto:${site.emails.general}`} external variant="light" size="lg" icon="mail">
          Email Your CV
        </CtaButton>
      </PageHero>

      {/* --------------------------------------------------------------- Perks */}
      <Band tone="sand" pad="lg">
        <Blob className="-bottom-28 -left-24 size-96" tone="text-forest-700/8" />
        <DotGrid className="top-10 right-8 h-20 w-32" tone="text-forest-700/20" />

        <SectionHeading
          eyebrow="Why join us"
          title="A place where planning beats improvisation"
          lede="Laxmi Developers is built on legal clarity, considered planning and honest dealings. That applies to how we work with each other as much as how we work with buyers."
          align="center"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((perk, i) => (
            <Reveal key={perk.title} delay={i * 90}>
              <article className="group h-full rounded-[1.75rem] bg-cream-50 p-7 text-center transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-2 hover:bg-white hover:shadow-[0_24px_50px_-24px_rgba(18,28,38,.25)]">
                <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-forest-700/10 text-forest-700 transition-colors duration-500 group-hover:bg-forest-700 group-hover:text-cream-50">
                  <Icon name={perk.icon} className="size-7" />
                </span>
                <h3 className="mt-6 font-display text-lg text-ink-900">{perk.title}</h3>
                <p className="mt-3 text-[0.86rem] leading-relaxed text-slate-muted">{perk.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* --------------------------------------------------------------- Roles */}
      <Section id="roles" spacing="lg" className="scroll-mt-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Open disciplines"
            title={
              <>
                Where you could <Accent>fit in.</Accent>
              </>
            }
            lede={`${totalRoles} roles we hire for, across four teams. Do not see your exact title? Apply anyway and tell us what you do.`}
          />
          <Reveal delay={200}>
            <CtaButton href="#apply" variant="outline" size="md">
              Go to Application
            </CtaButton>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {roleGroups.map((group, i) => (
            <Reveal key={group.group} delay={i * 100}>
              <article className="flex h-full flex-col rounded-[1.75rem] border border-cream-300/70 bg-white p-7 transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-forest-600/30 hover:shadow-[0_24px_50px_-24px_rgba(18,28,38,.22)]">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl text-ink-900">{group.group}</h3>
                  <span className="shrink-0 rounded-full bg-forest-700/10 px-3 py-1 text-[0.7rem] font-semibold text-forest-700">
                    {group.roles.length} roles
                  </span>
                </div>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-slate-muted">{group.blurb}</p>

                <ul className="mt-6 flex flex-1 flex-wrap content-start gap-2">
                  {group.roles.map((role) => (
                    <li
                      key={role}
                      className="rounded-full border border-cream-300 bg-cream-50 px-3.5 py-1.5 text-[0.8rem] text-ink-700 transition-colors duration-300 hover:border-forest-600/40 hover:text-forest-700"
                    >
                      {role}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* --------------------------------------------------------------- Apply */}
      <Band id="apply" tone="cream" pad="lg" className="scroll-mt-28">
        <Blob className="-right-24 -bottom-24 size-96" tone="text-gold-500/10" />

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Apply now"
              title={
                <>
                  Tell us about <Accent>yourself.</Accent>
                </>
              }
              lede="Pick the role that fits closest, attach your CV, and we will get back to you if there is a match."
            />

            <Reveal delay={200}>
              <ArchFrame variant="soft" className="mt-10 aspect-4/3 w-full">
                <Image
                  src="/media/scene-a.webp"
                  alt="Laxmi Developers site team reviewing construction drawings"
                  fill
                  sizes="(min-width:1024px) 38vw, 100vw"
                  className="object-cover"
                />
              </ArchFrame>
            </Reveal>

            <Reveal delay={300}>
              <p className="mt-8 text-[0.88rem] leading-relaxed text-slate-muted">
                Prefer email? Send your CV to{" "}
                <a href={`mailto:${site.emails.general}`} className="font-semibold text-forest-700 link-underline">
                  {site.emails.general}
                </a>{" "}
                with the role in the subject line.
              </p>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="rounded-[1.75rem] bg-white p-7 shadow-[0_24px_60px_-32px_rgba(18,28,38,.25)] sm:p-9">
              <CareerForm />
            </div>
          </Reveal>
        </div>
      </Band>
    </>
  );
}
