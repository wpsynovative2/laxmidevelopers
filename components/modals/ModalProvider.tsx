"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { LegalKey } from "@/lib/legal";
import { EnquiryModal } from "./EnquiryModal";
import { LegalModal } from "./LegalModal";

export interface EnquiryOptions {
  /** Pre-selects the project dropdown. */
  project?: string;
  /** Recorded in the sheet so the team knows which CTA produced the lead. */
  source?: string;
  title?: string;
  subtitle?: string;
}

interface ModalContextValue {
  openEnquiry: (options?: EnquiryOptions) => void;
  /** Opens the enquiry popup only if no other popup is showing (used for timed auto-open). */
  offerEnquiry: (options?: EnquiryOptions) => void;
  openLegal: (key: LegalKey) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

/** Hook used by every CTA on the site to raise a popup. */
export function useModals() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModals must be used inside <ModalProvider>");
  return ctx;
}

type Active = { kind: "enquiry"; options: EnquiryOptions } | { kind: "legal"; key: LegalKey } | null;

export function ModalProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<Active>(null);

  const openEnquiry = useCallback((options: EnquiryOptions = {}) => setActive({ kind: "enquiry", options }), []);
  const offerEnquiry = useCallback(
    (options: EnquiryOptions = {}) => setActive((current) => current ?? { kind: "enquiry", options }),
    [],
  );
  const openLegal = useCallback((key: LegalKey) => setActive({ kind: "legal", key }), []);
  const close = useCallback(() => setActive(null), []);

  const value = useMemo(
    () => ({ openEnquiry, offerEnquiry, openLegal, close }),
    [openEnquiry, offerEnquiry, openLegal, close],
  );

  return (
    <ModalContext value={value}>
      {children}
      <EnquiryModal open={active?.kind === "enquiry"} options={active?.kind === "enquiry" ? active.options : {}} onClose={close} />
      <LegalModal open={active?.kind === "legal"} docKey={active?.kind === "legal" ? active.key : "privacy"} onClose={close} />
    </ModalContext>
  );
}
