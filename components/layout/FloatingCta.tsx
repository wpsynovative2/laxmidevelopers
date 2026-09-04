"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { useModals } from "../modals/ModalProvider";
import { Icon } from "../ui/Icon";

/**
 * Persistent conversion rail. Slides in once the visitor is past the hero so it
 * never competes with the first CTA they see.
 */
export function FloatingCta() {
  const { openEnquiry } = useModals();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 transition-all duration-500 ease-[var(--ease-out-soft)] sm:right-6 sm:bottom-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <a
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group flex size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-ink-900/25 transition-transform duration-300 hover:scale-110"
      >
        {/* Soft pulse to draw the eye without animating the button itself. */}
        <span aria-hidden="true" className="absolute inline-flex size-13 animate-ping rounded-full bg-[#25D366] opacity-20" />
        <Icon name="whatsapp" className="relative size-7" />
      </a>

      <button
        type="button"
        onClick={() => openEnquiry({ source: "Floating CTA" })}
        className="group flex items-center gap-2.5 rounded-full bg-gold-500 py-3.5 pr-5 pl-4 text-[0.85rem] font-semibold text-ink-900 shadow-lg shadow-gold-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-xl"
      >
        <Icon name="sparkle" className="size-4.5" />
        Enquire Now
      </button>
    </div>
  );
}
