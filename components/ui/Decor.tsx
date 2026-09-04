import type { ReactNode } from "react";

/**
 * Decorative primitives for the soft, banded look: arch-framed imagery,
 * organic blobs, dot grids and curved section dividers. All of it is
 * presentational and hidden from assistive technology.
 */

/**
 * Arch frame — square-ish at the base, semicircular at the top. The radius is
 * half the element's width, so it resolves to a true arch at any size.
 */
export function ArchFrame({
  children,
  className = "",
  /** `soft` rounds all four corners heavily instead of forming a full arch. */
  variant = "arch",
}: {
  children: ReactNode;
  className?: string;
  variant?: "arch" | "soft";
}) {
  const shape = variant === "arch" ? "rounded-t-[50%] rounded-b-[2rem]" : "rounded-[2.5rem]";
  return <div className={`relative overflow-hidden ${shape} ${className}`}>{children}</div>;
}

/** Soft organic shape used to warm up section corners. */
export function Blob({
  className = "",
  /** Tailwind text-* class — the blob is filled with currentColor. */
  tone = "text-forest-700/8",
}: {
  className?: string;
  tone?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 ${tone} ${className}`}
      fill="currentColor"
    >
      <path d="M42.7 -62.9C55.9 -54.6 67.4 -43.5 73.5 -29.7C79.6 -15.9 80.3 0.7 75.6 15.3C70.9 29.9 60.8 42.6 48.3 52.9C35.8 63.2 20.9 71.2 4.6 74.3C-11.7 77.4 -29.4 75.7 -43.8 67.5C-58.2 59.3 -69.3 44.7 -75.2 28.5C-81.1 12.3 -81.8 -5.5 -76.5 -21.1C-71.2 -36.7 -59.9 -50.1 -46.2 -58.3C-32.5 -66.5 -16.2 -69.5 -0.3 -69.1C15.6 -68.7 29.5 -71.2 42.7 -62.9Z" transform="translate(100 100)" />
    </svg>
  );
}

/** Dotted grid, echoing the reference layouts' scattered-dot motif. */
export function DotGrid({ className = "", tone = "text-gold-500/35" }: { className?: string; tone?: string }) {
  return (
    <svg aria-hidden="true" className={`pointer-events-none absolute ${tone} ${className}`} fill="currentColor">
      <pattern id="dot-grid" width="14" height="14" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="2" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#dot-grid)" />
    </svg>
  );
}

/**
 * Curved divider between a coloured band and the page ground. `position`
 * says which edge of the band it sits on; `tone` is a fill-* class matching
 * whatever lies beyond it.
 */
export function WaveDivider({
  position = "bottom",
  tone = "fill-cream-50",
  className = "",
}: {
  position?: "top" | "bottom";
  tone?: string;
  className?: string;
}) {
  const edge = position === "top" ? "top-0 -translate-y-px" : "bottom-0 translate-y-px";
  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      aria-hidden="true"
      // The path fills the lower half of its viewBox, so a top divider has to be
      // flipped for the fill to land above the curve rather than below it.
      className={`pointer-events-none absolute inset-x-0 ${edge} h-[3.5rem] w-full sm:h-[5rem] ${tone} ${className} ${
        position === "top" ? "rotate-180" : ""
      }`}
    >
      <path d="M0 90V44c120-22 260-33 420-33s300 15 460 30 300 22 440 4c40-5 80-13 120-23v68z" />
    </svg>
  );
}

/** Small mark that precedes every eyebrow label. */
export function EyebrowMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={`size-3.5 ${className}`} fill="currentColor">
      <path d="M8 0.8 9.5 6.5 15.2 8 9.5 9.5 8 15.2 6.5 9.5 0.8 8 6.5 6.5Z" />
    </svg>
  );
}
