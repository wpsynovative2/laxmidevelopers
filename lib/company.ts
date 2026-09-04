/**
 * Company-level content for Laxmi Developers — the developer, not any one
 * development. Project-specific material (amenities, floor plans,
 * configurations, connectivity) belongs in the project's own file, e.g.
 * lib/laxmi-heights.ts.
 *
 * Copy is taken from https://laxmi-developers.com/about-us/.
 */

import type { IconName } from "@/components/ui/Icon";

/** What the company does, as published on the live About page. */
export const services: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "trend",
    title: "Strategic Vision & Planning",
    body: "Market intelligence, financial analysis and forward-looking strategy — designed to maximise long-term value and growth potential.",
  },
  {
    icon: "scale",
    title: "Transparent & Seamless Processes",
    body: "A structured, end-to-end approach with clarity and accountability at every stage, from documentation to delivery.",
  },
  {
    icon: "cube",
    title: "Quality & Craftsmanship",
    body: "Superior materials, precision engineering and architectural excellence, ensuring timeless quality and an enduring legacy.",
  },
  {
    icon: "handshake",
    title: "Client-Focused Excellence",
    body: "Every decision aligned to your objectives, with a personalised buying experience and satisfaction at every milestone.",
  },
];

export const values = [
  { title: "Trust", body: "Legally sound projects, honestly represented." },
  { title: "Transparency", body: "Clear documentation at every stage." },
  { title: "Quality", body: "Materials and engineering chosen to last." },
  { title: "Foresight", body: "Locations planned for how the city will grow." },
];

/** How a buyer moves from first call to handover. */
export const process: { step: string; icon: IconName; title: string; body: string }[] = [
  { step: "01", icon: "users", title: "Discover", body: "Tell us your budget, configuration and the neighbourhoods you are considering." },
  { step: "02", icon: "building", title: "Visit", body: "We arrange a site visit, walk you through the plans and answer the hard questions." },
  { step: "03", icon: "scale", title: "Verify", body: "Full documentation review — approvals, RERA registration and the agreement for sale." },
  { step: "04", icon: "handshake", title: "Move in", body: "Handover with a clear checklist, followed by ongoing facility support." },
];

export const milestones = [
  { year: "2008", title: "A legal foundation", body: "Nilesh Gavad enters real estate with a legal grounding, learning the business from its roots." },
  { year: "2012", title: "Into development", body: "That knowledge turns into hands-on expertise across development, sales and marketing." },
  { year: "2020", title: "Laxmi Developers", body: "The company formalises around trust, transparency and thoughtful development." },
  { year: "Today", title: "Laxmi Heights", body: "An ongoing residential tower in Bhandup West, with more addresses in planning." },
];

/** Headline figures about the company. */
export const companyStats = [
  { value: 2008, label: "Building since", plain: true },
  { value: 1, label: "Ongoing development" },
  { value: 4, label: "Disciplines in-house" },
  { value: 100, suffix: "%", label: "Legally cleared titles" },
];
