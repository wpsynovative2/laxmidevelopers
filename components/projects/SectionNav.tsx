"use client";

import { useEffect, useState } from "react";
import { useModals } from "../modals/ModalProvider";
import { CtaButton } from "../ui/CtaButton";

interface SectionNavProps {
  sections: readonly { id: string; label: string }[];
  projectName: string;
}

/**
 * Sticky in-page nav for the project detail page, with a scroll-spy that marks
 * whichever section currently owns the viewport.
 */
export function SectionNav({ sections, projectName }: SectionNavProps) {
  const { openEnquiry } = useModals();
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    // Scroll position rather than IntersectionObserver: an observer only fires on
    // change, so scrolling back above the first section left the highlight stuck
    // on whichever section was last in view. This recomputes from scratch.
    let frame = 0;

    const update = () => {
      frame = 0;
      const probe = window.scrollY + (document.documentElement.clientHeight * 0.3);
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

      if (atBottom) {
        setActive(sections[sections.length - 1].id);
        return;
      }

      let current = sections[0].id;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top + window.scrollY <= probe) current = section.id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return (
    <div className="sticky top-[var(--header-h)] z-30 border-y border-cream-300/70 bg-cream-50/95 backdrop-blur-md">
      <div className="container-x flex items-center justify-between gap-6 py-3">
        <nav aria-label="Project sections" className="-mx-1 flex-1 overflow-x-auto">
          <ul className="flex items-center gap-1 px-1 whitespace-nowrap">
            {sections.map((section) => {
              const isActive = active === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative inline-block rounded-full px-4 py-2 text-[0.8rem] font-medium capitalize transition-colors duration-300 ${
                      isActive ? "bg-forest-700 text-cream-50" : "text-ink-700 hover:bg-cream-200 hover:text-forest-700"
                    }`}
                  >
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <CtaButton
          variant="gold"
          size="sm"
          className="hidden shrink-0 md:inline-flex"
          onClick={() => openEnquiry({ project: projectName, source: "Laxmi Heights section nav" })}
        >
          Enquire Now
        </CtaButton>
      </div>
    </div>
  );
}
