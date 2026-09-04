"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../ui/Icon";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** Wider shell for the enquiry form; narrower for legal copy. */
  size?: "md" | "lg";
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible dialog shell shared by the enquiry and legal popups: portalled to
 * the body, closes on Escape and backdrop click, locks page scroll, traps Tab
 * inside itself and restores focus to whatever opened it.
 */
export function Modal({ open, onClose, title, subtitle, children, size = "md" }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    restoreTo.current = document.activeElement as HTMLElement | null;
    document.body.dataset.modalOpen = "true";

    // Move focus into the dialog so screen readers and keyboards land in the right place.
    const timer = window.setTimeout(() => {
      const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? panelRef.current)?.focus();
    }, 60);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      delete document.body.dataset.modalOpen;
      restoreTo.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="fixed inset-0 cursor-default bg-ink-900/65 backdrop-blur-sm motion-safe:animate-[fade-in_.25s_ease-out]"
        style={{ animationName: "fade-in" }}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`relative my-auto w-full ${size === "lg" ? "sm:max-w-2xl" : "sm:max-w-xl"} rounded-t-3xl bg-cream-50 shadow-2xl outline-none sm:rounded-3xl motion-safe:animate-[modal-in_.35s_var(--ease-out-soft)]`}
      >
        <div className="flex items-start justify-between gap-6 border-b border-cream-300/70 px-6 py-5 sm:px-8">
          <div>
            <h2 id={titleId} className="font-display text-xl text-ink-900 sm:text-2xl">
              {title}
            </h2>
            {subtitle && <p className="mt-1.5 text-sm text-slate-muted">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 shrink-0 rounded-full p-2 text-slate-muted transition-colors duration-200 hover:bg-cream-200 hover:text-ink-900"
          >
            <Icon name="close" className="size-5" />
          </button>
        </div>

        <div className="max-h-[min(70vh,40rem)] overflow-y-auto overscroll-contain px-6 py-6 sm:px-8">{children}</div>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modal-in {
          from { opacity: 0; transform: translateY(24px) scale(.98) }
          to { opacity: 1; transform: none }
        }
      `}</style>
    </div>,
    document.body,
  );
}
