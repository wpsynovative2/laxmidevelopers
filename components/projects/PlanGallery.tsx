"use client";

import Image from "next/image";
import { useState } from "react";
import { useModals } from "../modals/ModalProvider";
import { CtaButton } from "../ui/CtaButton";

export interface Plan {
  label: string;
  /** Sub-label — carpet area for unit plans, blank for floor plates. */
  area?: string;
  image: string;
}

interface PlanGalleryProps {
  plans: readonly Plan[];
  projectName: string;
  /** Shown under the active plan. */
  caption?: string;
}

/**
 * Tabbed plan viewer. The plans are drawings rather than photography, so the
 * image is letterboxed on a light ground instead of being cropped to fill.
 */
export function PlanGallery({ plans, projectName, caption }: PlanGalleryProps) {
  const { openEnquiry } = useModals();
  const [index, setIndex] = useState(0);
  const active = plans[index];

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
      <div role="tablist" aria-label="Plans" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {plans.map((plan, i) => {
          const isActive = i === index;
          return (
            <button
              key={`${plan.label}-${plan.area ?? i}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setIndex(i)}
              className={`shrink-0 rounded-xl border px-4 py-3 text-left transition-all duration-300 ease-[var(--ease-out-soft)] lg:w-full ${
                isActive
                  ? "border-forest-700 bg-forest-700 text-cream-50 shadow-md shadow-forest-900/15"
                  : "border-cream-300 bg-white text-ink-700 hover:-translate-y-0.5 hover:border-forest-600/40 hover:text-forest-700"
              }`}
            >
              <span className="block text-[0.88rem] font-semibold whitespace-nowrap">{plan.label}</span>
              {plan.area && (
                <span className={`mt-0.5 block text-[0.75rem] whitespace-nowrap ${isActive ? "text-cream-200/75" : "text-slate-muted"}`}>
                  {plan.area}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div>
        <figure className="overflow-hidden rounded-2xl border border-cream-300/70 bg-white">
          <div className="relative aspect-4/3 sm:aspect-16/10">
            <Image
              key={active.image}
              src={active.image}
              alt={`${projectName} — ${active.label}${active.area ? `, ${active.area}` : ""}`}
              fill
              sizes="(min-width:1024px) 60vw, 100vw"
              className="object-contain p-4 motion-safe:animate-[plan-in_.4s_var(--ease-out-soft)]"
            />
          </div>
          <figcaption className="flex flex-wrap items-center justify-between gap-4 border-t border-cream-200 px-5 py-4">
            <span className="text-[0.86rem] text-ink-900">
              <strong className="font-semibold">{active.label}</strong>
              {active.area && <span className="text-slate-muted"> · {active.area}</span>}
            </span>
            <CtaButton
              variant="outline"
              size="sm"
              icon="download"
              onClick={() => openEnquiry({ project: projectName, source: `Plan gallery — ${active.label}`, title: "Get the Brochure", subtitle: "Share your details and we will send the full plan set and price list." })}
            >
              Get Brochure Now
            </CtaButton>
          </figcaption>
        </figure>

        {caption && <p className="mt-4 text-[0.78rem] leading-relaxed text-slate-muted">{caption}</p>}
      </div>

      <style>{`
        @keyframes plan-in { from { opacity: 0; transform: scale(.985) } to { opacity: 1; transform: none } }
      `}</style>
    </div>
  );
}
