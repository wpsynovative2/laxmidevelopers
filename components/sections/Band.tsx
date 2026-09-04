import type { ReactNode } from "react";

type BandTone = "cream" | "sand" | "forest" | "white";

const tones: Record<BandTone, string> = {
  cream: "bg-cream-100",
  sand: "bg-cream-200",
  forest: "bg-forest-900 text-cream-100",
  white: "bg-white",
};

const pads = {
  sm: "py-12 sm:py-14",
  md: "py-14 sm:py-20",
  lg: "py-16 sm:py-24",
};

interface BandProps {
  children: ReactNode;
  tone?: BandTone;
  className?: string;
  pad?: keyof typeof pads;
  id?: string;
}

/**
 * A full-bleed colour band. The background runs edge to edge while the content
 * stays inside the page container.
 *
 * `overflow-hidden` clips the decorative blobs that are deliberately positioned
 * past the band's edge. Nothing that needs `position: sticky` may live inside a
 * band, since the clip would turn it into a scroll container.
 */
export function Band({ children, tone = "cream", className = "", pad = "md", id }: BandProps) {
  return (
    <section id={id} className={`relative isolate overflow-hidden ${tones[tone]} ${pads[pad]} ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

/** Section on the page's own cream ground — vertical rhythm plus the container. */
export function Section({
  children,
  className = "",
  id,
  spacing = "md",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  spacing?: "sm" | "md" | "lg";
}) {
  const gap = { sm: "py-10 sm:py-12", md: "py-14 sm:py-20", lg: "py-16 sm:py-24" }[spacing];
  return (
    <section id={id} className={`${gap} ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}
