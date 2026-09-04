/**
 * ============================================================================
 * PLACEHOLDER CONTENT — REPLACE BEFORE LAUNCH
 * ============================================================================
 *
 * The live site at laxmi-developers.com publishes no testimonials, so there was
 * nothing to transcribe. The three entries below are stand-ins written to show
 * the section's layout — they are NOT real quotes from real buyers.
 *
 * Publishing invented reviews as genuine is both dishonest and, under the
 * Consumer Protection Act's guidelines on online reviews, a legal exposure for
 * a RERA-registered developer. So do one of two things before going live:
 *
 *   1. Replace every entry with a real, attributable quote you have permission
 *      to publish, or
 *   2. Empty the array. The section then removes itself from the home page —
 *      no gap, no orphan heading.
 */

export interface Testimonial {
  quote: string;
  name: string;
  /** Sits under the name — their home, or how they know the company. */
  role: string;
  /** Out of five. Whole numbers only. */
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "What sold us was how straight they were about the paperwork. Every approval and every clause was explained before we signed anything, and nothing changed afterwards.",
    name: "Rohit Kulkarni",
    role: "2 BHK owner · Bhandup West",
    rating: 5,
  },
  {
    quote:
      "I bought as an investment and expected to chase people for updates. Instead I got them without asking — construction stage, timelines, the lot. That is rare in this market.",
    name: "Sneha Deshmukh",
    role: "Investor · Mumbai",
    rating: 5,
  },
  {
    quote:
      "The layout is what won me over. A 1 BHK that actually lives like one, because the circulation space has not been wasted. You notice it the moment you walk in.",
    name: "Amit Shirke",
    role: "1 BHK owner · Bhandup West",
    rating: 5,
  },
];
