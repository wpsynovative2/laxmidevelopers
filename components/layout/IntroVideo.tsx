"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Seconds of the clip to play before dismissing. `intro.mp4` is already cut to
 * this length by `npm run intro`; the cap is a belt-and-braces guard so a
 * re-encode that runs long cannot hold the visitor hostage.
 */
const PLAY_SECONDS = 6;

/** Matches the fade duration in globals.css. */
const FADE_MS = 500;

/**
 * Set once the splash has been shown, so it plays a single time and does not
 * replay on every page a visitor opens. `sessionStorage` scopes that to the
 * current browsing session — swap it for `localStorage` to show it once ever.
 * The inline script in the root layout reads the same key before first paint,
 * and hard-codes it: change one and you must change the other.
 */
export const INTRO_KEY = "ld-intro-seen";

/**
 * One-time full-screen intro splash.
 *
 * The overlay ships inside the static HTML rather than being mounted from an
 * effect, so it covers the page from the very first paint with no flash of the
 * site behind it. Whether it shows at all is decided before paint by the inline
 * script in the root layout, which sets `data-intro="play"` on <html>; the CSS
 * keeps the overlay hidden until then. React never manages that attribute, so
 * there is no hydration mismatch, and `preload="none"` means a hidden overlay
 * costs no bandwidth — the clip is only fetched when `play()` is called below.
 */
export function IntroVideo() {
  const [gone, setGone] = useState(false);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const closedRef = useRef(false);

  const dismiss = useCallback(() => {
    if (closedRef.current) return;
    closedRef.current = true;
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      // Private browsing or blocked storage — the splash just shows again.
    }
    // Deliberately not stamping `data-intro` here: that attribute hides the
    // overlay outright, which would cut the fade off at the knees. The inline
    // script picks the key up on the next page load, which is when it matters.
    delete document.body.dataset.introOpen;
    setFading(true);
    window.setTimeout(() => setGone(true), FADE_MS);
  }, []);

  useEffect(() => {
    // The pre-paint script in the root layout has already weighed up "seen this
    // session" and "prefers reduced motion" and left its verdict on <html>.
    // Re-deriving it here would risk the two disagreeing.
    if (document.documentElement.dataset.intro !== "play") {
      // The CSS is already hiding the overlay. Left mounted rather than
      // unmounted: preload="none" means an inert overlay downloads nothing.
      closedRef.current = true;
      return;
    }

    document.body.dataset.introOpen = "true";
    // Land the keyboard on the only control the splash offers.
    const restoreTo = document.activeElement as HTMLElement | null;
    skipRef.current?.focus();

    // Autoplay can still be refused (data saver, or a policy we cannot detect).
    // Dismissing on refusal means a block never leaves a frozen poster on screen.
    void videoRef.current?.play().catch(dismiss);

    // Hard stop, in case `timeupdate` stalls or the file runs longer than expected.
    const timer = window.setTimeout(dismiss, (PLAY_SECONDS + 0.4) * 1000);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      delete document.body.dataset.introOpen;
      restoreTo?.focus?.();
    };
  }, [dismiss]);

  if (gone) return null;

  return (
    <div
      // Deliberately a plain element. `aria-hidden` would drop the Skip button
      // out of the accessibility tree while leaving it tabbable — a focusable
      // control nobody can be told about. `role="dialog"` + `aria-modal` would
      // be the other overreach: it claims a modality this does not enforce (no
      // focus trap), and would collide with the real enquiry and legal dialogs.
      // So: an ordinary overlay whose only control is an announced button.
      data-intro-overlay=""
      data-state={fading ? "out" : "in"}
      className="fixed inset-0 z-200 flex items-center justify-center bg-forest-950"
      onClick={dismiss}
    >
      <video
        ref={videoRef}
        aria-hidden="true"
        muted
        playsInline
        preload="none"
        poster="/media/intro-poster.webp"
        onTimeUpdate={(event) => {
          if (event.currentTarget.currentTime >= PLAY_SECONDS) dismiss();
        }}
        onEnded={dismiss}
        onError={dismiss}
        className="size-full object-cover"
      >
        <source src="/media/intro.webm" type="video/webm" />
        <source src="/media/intro.mp4" type="video/mp4" />
      </video>

      <button
        ref={skipRef}
        type="button"
        onClick={dismiss}
        className="absolute right-5 bottom-5 rounded-full border border-cream-200/40 bg-forest-950/80 px-5 py-2.5 text-[0.8rem] font-semibold text-cream-100 backdrop-blur-sm transition-colors duration-300 hover:border-gold-500/60 hover:text-gold-400 sm:right-8 sm:bottom-8"
      >
        Skip intro
      </button>
    </div>
  );
}
