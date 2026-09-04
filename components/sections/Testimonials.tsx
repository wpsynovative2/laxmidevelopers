import { testimonials } from "@/lib/testimonials";
import { Blob, DotGrid } from "../ui/Decor";
import { EnquireButton } from "../ui/EnquireButton";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { Accent, SectionHeading } from "../ui/SectionHeading";
import { Band } from "./Band";

/** "Nilesh Gavad" → "NG". Falls back to one letter for a single-word name. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? "")
    .join("")
    .toUpperCase();
}

function Stars({ rating }: { rating: number }) {
  return (
    <p className="flex gap-0.5 text-gold-500" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" className={`size-4 ${i < rating ? "" : "text-cream-300"}`} />
      ))}
    </p>
  );
}

/**
 * What owners say. Driven entirely by `lib/testimonials.ts` — empty that array
 * and the whole band disappears rather than leaving a heading over nothing.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Band tone="sand" pad="lg">
      <DotGrid className="top-10 right-8 h-20 w-32" tone="text-forest-700/18" />
      <Blob className="-bottom-28 -left-24 size-96" tone="text-forest-700/8" />

      <SectionHeading
        eyebrow="What owners say"
        title={
          <>
            Trusted by the people who <Accent>live here.</Accent>
          </>
        }
        lede="The measure of a developer is what buyers say once the keys have changed hands."
        align="center"
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item, i) => (
          <Reveal key={item.name} delay={i * 100}>
            <figure className="group relative flex h-full flex-col rounded-[1.75rem] bg-cream-50 p-7 transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_24px_50px_-24px_rgba(18,28,38,.22)] sm:p-8">
              {/* Rating sits up here rather than beside the name — in a three-up
                  grid the footer is too narrow to hold both without wrapping. */}
              <div className="flex items-start justify-between gap-4">
                <Icon
                  name="quote"
                  className="size-8 text-forest-700/15 transition-colors duration-500 group-hover:text-gold-500/40"
                />
                <Stars rating={item.rating} />
              </div>

              <blockquote className="mt-5 flex-1">
                <p className="font-display text-[1.05rem] leading-relaxed text-ink-900 text-pretty">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </blockquote>

              <figcaption className="mt-7 flex items-center gap-4 border-t border-cream-300/70 pt-6">
                <span
                  aria-hidden="true"
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-forest-700/10 font-display text-base text-forest-700 transition-colors duration-500 group-hover:bg-forest-700 group-hover:text-cream-50"
                >
                  {initials(item.name)}
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.94rem] font-semibold text-ink-900">{item.name}</span>
                  <span className="mt-0.5 block text-[0.8rem] text-slate-muted">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={320}>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-4 text-center">
          <p className="text-[0.92rem] text-slate-muted">Want to hear it first-hand? We can put you in touch.</p>
          <EnquireButton
            source="Home testimonials"
            title="Speak to an owner"
            subtitle="Leave your details and we will arrange a conversation with a resident."
            variant="primary"
            size="md"
          >
            Talk to an Owner
          </EnquireButton>
        </div>
      </Reveal>
    </Band>
  );
}
