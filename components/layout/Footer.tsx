import Image from "next/image";
import Link from "next/link";
import { shortDisclaimer } from "@/lib/legal";
import { primaryNav, site, socialLinks } from "@/lib/site";
import { statusMeta, statusOrder } from "@/lib/projects";
import { EnquireButton, LegalLink } from "../ui/EnquireButton";
import { Icon } from "../ui/Icon";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-900 text-cream-200">
      {/* Line-art skyline sits behind the columns as a faint watermark. */}
      <Image
        src="/media/scene-e.webp"
        alt=""
        aria-hidden="true"
        width={740}
        height={423}
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full object-cover opacity-[0.05] invert select-none"
      />

      {/* Closing CTA band */}
      <div className="relative border-b border-cream-200/10">
        <div className="container-x flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl leading-tight text-cream-50 text-balance sm:text-3xl">
              Ready to find the right address?
            </h2>
            <p className="mt-2 max-w-md text-[0.92rem] text-cream-200/70">
              Tell us what you are looking for and our team will call you back with options, pricing and a site visit slot.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <EnquireButton source="Footer band" variant="gold" size="lg">
              Enquire Now
            </EnquireButton>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-cream-200/25 px-6 py-4 text-[0.92rem] font-semibold text-cream-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-cream-200/60 hover:bg-cream-50 hover:text-forest-800"
            >
              <Icon name="whatsapp" className="size-4.5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="relative container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Image src="/media/logo-white.png" alt={site.name} width={939} height={662} className="h-14 w-auto" />
          <p className="mt-5 max-w-sm text-[0.9rem] leading-relaxed text-cream-200/70">
            We are more than just a real estate company — we are committed to shaping communities and delivering spaces where life
            and business thrive. Our projects reflect a blend of modern design, superior quality and long-term value.
          </p>
          <ul className="mt-6 flex gap-2.5">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-full border border-cream-200/20 text-cream-200/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500 hover:bg-gold-500 hover:text-ink-900"
                >
                  <Icon name={s.icon} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h3 className="eyebrow text-gold-400">Quick Links</h3>
          <ul className="mt-5 space-y-2.5 text-[0.9rem]">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-cream-200/75 transition-colors duration-200 hover:text-gold-400 link-underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <h3 className="eyebrow text-gold-400">Projects</h3>
          <ul className="mt-5 space-y-2.5 text-[0.9rem]">
            {statusOrder.map((status) => (
              <li key={status}>
                <Link
                  href={`/projects#${status}`}
                  className="text-cream-200/75 transition-colors duration-200 hover:text-gold-400 link-underline"
                >
                  {statusMeta[status].label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/projects/laxmi-heights" className="text-cream-200/75 transition-colors duration-200 hover:text-gold-400 link-underline">
                Laxmi Heights
              </Link>
            </li>
          </ul>

          <h3 className="eyebrow mt-8 text-gold-400">Legal</h3>
          <ul className="mt-5 space-y-2.5 text-[0.9rem] text-cream-200/75">
            <li>
              <LegalLink doc="privacy">Privacy Policy</LegalLink>
            </li>
            <li>
              <LegalLink doc="terms">Terms &amp; Conditions</LegalLink>
            </li>
            <li>
              <LegalLink doc="disclaimer">Disclaimer</LegalLink>
            </li>
          </ul>
        </div>

        <address className="text-[0.9rem] not-italic lg:col-span-4">
          <h3 className="eyebrow text-gold-400">Contact Us</h3>
          <ul className="mt-5 space-y-4 text-cream-200/75">
            <li className="flex gap-3">
              <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-gold-500" />
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="leading-relaxed transition-colors hover:text-gold-400">
                {site.address.line1}, {site.address.line2},<br />
                {site.address.city}, {site.address.state} {site.address.pincode}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="phone" className="mt-0.5 size-4 shrink-0 text-gold-500" />
              <a href={`tel:${site.phoneHref}`} className="transition-colors hover:text-gold-400">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="mail" className="mt-0.5 size-4 shrink-0 text-gold-500" />
              <span className="flex flex-col gap-1">
                <a href={`mailto:${site.emails.general}`} className="transition-colors hover:text-gold-400">
                  {site.emails.general}
                </a>
                <a href={`mailto:${site.emails.sales}`} className="transition-colors hover:text-gold-400">
                  {site.emails.sales}
                </a>
              </span>
            </li>
          </ul>
        </address>
      </div>

      {/* Disclaimer + credit */}
      <div className="relative border-t border-cream-200/10">
        <div className="container-x py-8">
          <p className="text-[0.72rem] leading-relaxed text-cream-200/45">
            <strong className="font-semibold text-cream-200/70">Disclaimer:</strong> {shortDisclaimer}{" "}
            <LegalLink doc="disclaimer">
              <span className="font-semibold text-cream-200/70">Read the full disclaimer</span>
            </LegalLink>
          </p>
          <div className="mt-6 flex flex-col justify-between gap-2 border-t border-cream-200/10 pt-6 text-[0.75rem] text-cream-200/50 sm:flex-row">
            <p>
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <p>
              {site.credit.note}{" "}
              <span className="font-semibold tracking-wide text-cream-200/70">{site.credit.label}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
