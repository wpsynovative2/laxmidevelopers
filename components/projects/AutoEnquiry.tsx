"use client";

import { useEffect } from "react";
import { useModals, type EnquiryOptions } from "@/components/modals/ModalProvider";

interface AutoEnquiryProps extends EnquiryOptions {
  /** Delay before the popup appears, in milliseconds. */
  delay?: number;
  /** sessionStorage key that records the popup has already been shown. */
  storageKey: string;
}

/**
 * Opens the enquiry popup once, a few seconds after the page loads. It is shown
 * at most once per browser session; after that the form only opens from buttons.
 * If the user has already opened a popup themselves, it does not interrupt them.
 */
export function AutoEnquiry({ delay = 5000, storageKey, ...options }: AutoEnquiryProps) {
  const { offerEnquiry } = useModals();

  useEffect(() => {
    try {
      if (sessionStorage.getItem(storageKey)) return;
    } catch {
      // Storage blocked (private mode etc.) — fall back to showing once per page load.
    }

    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(storageKey, "1");
      } catch {}
      offerEnquiry(options);
    }, delay);

    return () => window.clearTimeout(timer);
    // Run once on mount; options are static for a page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
