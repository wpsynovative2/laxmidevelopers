/**
 * Project catalogue for Laxmi Developers.
 *
 * Laxmi Heights is the company's current development and the only project with
 * published details. Categories with nothing in them render an empty state —
 * no invented listings, no filler cards. Add entries here as projects are
 * cleared for release.
 */

export type ProjectStatus = "upcoming" | "ongoing" | "completed";

export interface Project {
  slug: string;
  name: string;
  status: ProjectStatus;
  location: string;
  /** One-line positioning under the name. */
  summary: string;
  /** Key/value chips shown on the card. */
  facts: { label: string; value: string }[];
  image: string;
  imageAlt: string;
  /** Present when the project has a dedicated detail page. */
  href?: string;
}

export const statusMeta: Record<
  ProjectStatus,
  { label: string; blurb: string; empty: string; dot: string; chip: string }
> = {
  upcoming: {
    label: "Upcoming",
    blurb: "Developments in planning — reflecting experience, vision and long-term value creation.",
    empty: "No upcoming project has been announced yet. Register your interest and you will hear from us the day one is.",
    dot: "bg-gold-500",
    chip: "bg-gold-500/15 text-gold-600 ring-gold-500/30",
  },
  ongoing: {
    label: "Ongoing",
    blurb: "Delivering excellence through projects currently shaping our legacy.",
    empty: "Nothing under construction at the moment.",
    dot: "bg-forest-600",
    chip: "bg-forest-600/12 text-forest-700 ring-forest-600/30",
  },
  completed: {
    label: "Completed",
    blurb: "Finished projects reflecting commitment, craftsmanship and long-term reliability.",
    empty: "Our delivery record is available on request — ask our team for site references.",
    dot: "bg-teal-700",
    chip: "bg-teal-700/12 text-teal-700 ring-teal-700/30",
  },
};

export const statusOrder: ProjectStatus[] = ["ongoing", "upcoming", "completed"];

export const projects: Project[] = [
  {
    slug: "laxmi-heights",
    name: "Laxmi Heights",
    status: "ongoing",
    location: "Bhatti Pada Road, Bhandup West, Mumbai",
    summary:
      "A residential tower of 1, 2 and 3 BHK homes built around smart planning, terrace-level wellness amenities and everyday connectivity.",
    facts: [
      { label: "Configuration", value: "1, 2 & 3 BHK" },
      { label: "Carpet area", value: "319 – 666 sq.ft." },
      { label: "Status", value: "Under construction" },
    ],
    image: "/media/tower-portrait.webp",
    imageAlt: "Laxmi Heights residential tower elevation seen from street level",
    href: "/projects/laxmi-heights",
  },
];

export const projectsByStatus = (status: ProjectStatus) => projects.filter((p) => p.status === status);

/** Options for the "Select a Project" field on every form. */
export const projectOptions = [...projects.map((p) => p.name), "General enquiry"];
