import type { ReactNode } from "react";
import { EyebrowMark } from "./Decor";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

/** Eyebrow + display heading + optional lede, used to open every section. */
export function SectionHeading({ eyebrow, title, lede, align = "left", tone = "dark", className = "" }: SectionHeadingProps) {
  const centered = align === "center";
  const light = tone === "light";

  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className={`eyebrow ${light ? "text-gold-400" : "text-forest-600"}`}>
            <EyebrowMark />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2
          className={`mt-3.5 font-display text-3xl leading-[1.15] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] ${
            light ? "text-cream-50" : "text-ink-900"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={160}>
          <p className={`mt-5 text-[0.98rem] leading-relaxed text-pretty ${light ? "text-cream-200/80" : "text-slate-muted"}`}>{lede}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Italic serif accent for one word inside a display heading. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="font-display italic text-gold-500">{children}</em>;
}
