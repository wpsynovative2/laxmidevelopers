"use client";

import { EnquiryForm } from "../forms/EnquiryForm";
import { Modal } from "./Modal";
import type { EnquiryOptions } from "./ModalProvider";

interface EnquiryModalProps {
  open: boolean;
  options: EnquiryOptions;
  onClose: () => void;
}

/** The sitewide "Enquire Now" popup. Every CTA routes here through `useModals()`. */
export function EnquiryModal({ open, options, onClose }: EnquiryModalProps) {
  const { project, source = "Site CTA", title = "Schedule a Visit", subtitle = "Get expert guidance on the best investment opportunities in premium real estate." } = options;

  return (
    <Modal open={open} onClose={onClose} title={title} subtitle={subtitle} size="lg">
      <EnquiryForm defaultProject={project} source={source} />
    </Modal>
  );
}
