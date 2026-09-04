"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav, site } from "@/lib/site";
import { useModals } from "../modals/ModalProvider";
import { CtaButton } from "../ui/CtaButton";
import { Icon } from "../ui/Icon";

export function Header() {
  const pathname = usePathname();
  const { openEnquiry } = useModals();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Condense the bar once the page moves, so the hero gets the full stage.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A route change should always dismiss the mobile sheet. Adjusting during
  // render (rather than in an effect) avoids a second paint with it still open.
  const [menuPath, setMenuPath] = useState(pathname);
  if (pathname !== menuPath) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      {/* Utility strip — contact details, hidden once the user starts reading. */}
      <div className="hidden bg-forest-800 text-cream-100 lg:block">
        <div className="container-x flex h-10 items-center justify-between text-[0.76rem]">
          <div className="flex items-center gap-6">
            <a href={`mailto:${site.emails.general}`} className="flex items-center gap-2 transition-colors hover:text-gold-400">
              <Icon name="mail" className="size-3.5" />
              {site.emails.general}
            </a>
            <a href={`tel:${site.phoneHref}`} className="flex items-center gap-2 transition-colors hover:text-gold-400">
              <Icon name="phone" className="size-3.5" />
              {site.phone}
            </a>
          </div>
          <p className="flex items-center gap-2 tracking-[0.18em] text-cream-200/70 uppercase">
            <Icon name="pin" className="size-3.5" />
            {site.address.city}
          </p>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled ? "bg-cream-50/90 shadow-[0_1px_0_rgba(18,28,38,.08),0_8px_30px_-12px_rgba(18,28,38,.18)] backdrop-blur-md" : "bg-cream-50"
        }`}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" className="flex shrink-0 items-center" aria-label={`${site.name} — home`}>
            <Image
              src="/media/logo-mark.png"
              alt={site.name}
              width={939}
              height={662}
              priority
              className={`w-auto transition-[height] duration-300 ${scrolled ? "h-9 lg:h-10" : "h-10 lg:h-12"}`}
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative px-3.5 py-2 text-[0.85rem] font-medium transition-colors duration-200 ${
                    active ? "text-forest-700" : "text-ink-700 hover:text-forest-700"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3.5 bottom-1 h-px origin-left bg-gold-500 transition-transform duration-300 ease-[var(--ease-out-soft)] ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/* Wrapped rather than given `hidden sm:inline-flex` directly — the
                button's own `inline-flex` would win the display conflict. On
                mobile the hero CTA and the floating rail cover this. */}
            <span className="hidden sm:block">
              <CtaButton variant="primary" size="sm" onClick={() => openEnquiry({ source: "Header" })}>
                Enquire Now
              </CtaButton>
            </span>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="rounded-full p-2 text-ink-900 transition-colors hover:bg-cream-200 lg:hidden"
            >
              <Icon name={menuOpen ? "close" : "menu"} className="size-6" />
            </button>
          </div>
        </div>

        {/* Mobile sheet */}
        <div
          id="mobile-nav"
          hidden={!menuOpen}
          className="border-t border-cream-300 bg-cream-50 lg:hidden"
        >
          <nav aria-label="Mobile" className="container-x flex flex-col py-4">
            {primaryNav.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ animationDelay: `${i * 40}ms` }}
                className={`border-b border-cream-200 py-3.5 text-[0.95rem] font-medium transition-colors last:border-0 ${
                  isActive(link.href) ? "text-forest-700" : "text-ink-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <CtaButton variant="gold" size="md" onClick={() => openEnquiry({ source: "Mobile menu" })}>
                Enquire Now
              </CtaButton>
              <CtaButton href={`tel:${site.phoneHref}`} external variant="outline" size="md" icon="phone">
                {site.phone}
              </CtaButton>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
