import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export type CtaVariant = "primary" | "gold" | "outline" | "light" | "ghost";
export type CtaSize = "sm" | "md" | "lg";

const base =
  "group/cta relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold tracking-wide " +
  "transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-[var(--ease-out-soft)] " +
  "hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<CtaVariant, string> = {
  primary: "bg-forest-700 text-cream-50 shadow-lg shadow-forest-900/20 hover:bg-forest-800 hover:shadow-xl hover:shadow-forest-900/30",
  gold: "bg-gold-500 text-ink-900 shadow-lg shadow-gold-600/25 hover:bg-gold-400 hover:shadow-xl hover:shadow-gold-600/35",
  outline: "border border-forest-700/30 bg-transparent text-forest-800 hover:border-forest-700 hover:bg-forest-700 hover:text-cream-50",
  light: "border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:border-white/50 hover:bg-white hover:text-forest-800",
  ghost: "text-forest-800 hover:text-forest-600",
};

const sizes: Record<CtaSize, string> = {
  sm: "px-4 py-2 text-[0.78rem]",
  md: "px-6 py-3 text-[0.85rem]",
  lg: "px-8 py-4 text-[0.92rem]",
};

interface CtaContentProps {
  children: ReactNode;
  icon?: IconName;
  variant: CtaVariant;
}

function CtaInner({ children, icon = "arrowRight", variant }: CtaContentProps) {
  return (
    <>
      {/* Light sweeps left-to-right across the face on hover. */}
      {variant !== "ghost" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover/cta:translate-x-full"
        />
      )}
      <span className="relative">{children}</span>
      {icon && (
        <Icon
          name={icon}
          className="relative size-4 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover/cta:translate-x-1"
        />
      )}
    </>
  );
}

type AnchorProps = { href: string; external?: boolean } & Omit<ComponentProps<typeof Link>, "href">;
type ButtonProps = { href?: undefined } & ComponentProps<"button">;

type CtaButtonProps = {
  children: ReactNode;
  variant?: CtaVariant;
  size?: CtaSize;
  icon?: IconName | null;
  className?: string;
} & (AnchorProps | ButtonProps);

/**
 * The one call-to-action element used everywhere. Renders an internal `Link`,
 * an external `<a>`, or a `<button>` depending on the props it is given.
 */
export function CtaButton({ children, variant = "primary", size = "md", icon, className = "", ...rest }: CtaButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const inner = (
    <CtaInner variant={variant} icon={icon === null ? undefined : icon}>
      {children}
    </CtaInner>
  );

  if ("href" in rest && rest.href) {
    const { href, external, ...anchorRest } = rest as AnchorProps;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {inner}
      </Link>
    );
  }

  const { type = "button", ...buttonRest } = rest as ButtonProps;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {inner}
    </button>
  );
}
