"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  /** Render the number as-is (years, for instance) instead of counting up. */
  plain?: boolean;
  duration?: number;
  className?: string;
}

/** Counts up to `value` once the element scrolls into view. */
export function Counter({ value, suffix = "", prefix = "", plain = false, duration = 1400, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(plain ? value : 0);

  useEffect(() => {
    if (plain) return;
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        // Someone who asked for less motion still needs the final figure.
        if (reduced) {
          setDisplay(value);
          return;
        }

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // easeOutExpo — fast out of the gate, settles gently on the final value.
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setDisplay(Math.round(eased * value));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration, plain]);

  // `plain` values are years and the like — grouping separators would turn
  // 2008 into "2,008", so only counted-up figures get locale formatting.
  const text = plain ? String(value) : display.toLocaleString("en-IN");

  return (
    <span ref={ref} className={className}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
