"use client";

import { legalDocuments, type LegalKey } from "@/lib/legal";
import { CtaButton } from "../ui/CtaButton";
import { Modal } from "./Modal";

interface LegalModalProps {
  open: boolean;
  docKey: LegalKey;
  onClose: () => void;
}

/** Renders the Privacy Policy, Terms & Conditions or Disclaimer in the shared dialog. */
export function LegalModal({ open, docKey, onClose }: LegalModalProps) {
  const doc = legalDocuments[docKey];

  return (
    <Modal open={open} onClose={onClose} title={doc.title} size="lg">
      <div className="space-y-5 text-[0.92rem] leading-relaxed text-ink-700/85">
        {doc.intro && <p>{doc.intro}</p>}

        <ul className="space-y-3.5">
          {doc.points.map((point, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-gold-500" />
              <p>
                {point.term && <strong className="font-semibold text-ink-900">{point.term}: </strong>}
                {point.text}
              </p>
            </li>
          ))}
        </ul>

        {doc.outro && <p className="border-t border-cream-300/70 pt-5 text-ink-900">{doc.outro}</p>}
      </div>

      <div className="mt-7 flex justify-end">
        <CtaButton variant="primary" size="md" icon="check" onClick={onClose}>
          Accept &amp; Continue
        </CtaButton>
      </div>
    </Modal>
  );
}
