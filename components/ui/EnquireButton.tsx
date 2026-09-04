"use client";

import type { ReactNode } from "react";
import { useModals, type EnquiryOptions } from "../modals/ModalProvider";
import { CtaButton, type CtaSize, type CtaVariant } from "./CtaButton";
import type { IconName } from "./Icon";

interface EnquireButtonProps extends EnquiryOptions {
  children?: ReactNode;
  variant?: CtaVariant;
  size?: CtaSize;
  icon?: IconName | null;
  className?: string;
}

/**
 * Client wrapper so server-rendered pages can drop an enquiry CTA anywhere
 * without becoming client components themselves.
 */
export function EnquireButton({
  children = "Enquire Now",
  variant = "gold",
  size = "md",
  icon,
  className,
  ...options
}: EnquireButtonProps) {
  const { openEnquiry } = useModals();
  return (
    <CtaButton variant={variant} size={size} icon={icon} className={className} onClick={() => openEnquiry(options)}>
      {children}
    </CtaButton>
  );
}

/** Text-only variant for footers and inline copy. */
export function LegalLink({ doc, children }: { doc: "privacy" | "terms" | "disclaimer"; children: ReactNode }) {
  const { openLegal } = useModals();
  return (
    <button
      type="button"
      onClick={() => openLegal(doc)}
      className="text-left transition-colors duration-200 hover:text-gold-400 link-underline"
    >
      {children}
    </button>
  );
}
