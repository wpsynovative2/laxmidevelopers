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
  /**
   * A teaser for a project that has not been announced yet. The card says so
   * plainly instead of dressing up invented details, and offers to register
   * interest rather than linking to a page that does not exist.
   */
  unrevealed?: boolean;
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

/**
 * Statuses the site surfaces, in display order.
 *
 * `completed` is deliberately absent for now: there is nothing to list under it,
 * so the filter tab, the footer link and the summary card are all withheld
 * rather than pointing visitors at an empty category. `/projects#completed`
 * falls back to "All Projects". Put it back in this array and every one of
 * those reappears — `statusMeta.completed` is still here, ready and unchanged.
 */
export const statusOrder: ProjectStatus[] = ["ongoing", "upcoming"];

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
  {
    slug: "unveiling-soon",
    name: "Unveiling Soon",
    status: "upcoming",
    location: "Mumbai",
    summary:
      "Our next residential development is in planning. Nothing is being claimed about it yet — configurations, pricing and plans go up once the approvals are in place. Register your interest and you will hear about it first.",
    facts: [
      { label: "Stage", value: "In planning" },
      { label: "Details", value: "Under wraps" },
      { label: "Reveal", value: "To be announced" },
    ],
    image: "/media/project-unrevealed.webp",
    imageAlt: "A new building draped in a red unveiling curtain",
    unrevealed: true,
  },
];

export const projectsByStatus = (status: ProjectStatus) => projects.filter((p) => p.status === status);

/**
 * Options for the "Select a Project" field on every form. Unannounced teasers
 * are left out: there is nothing to ask about them by name yet, and the
 * "Register Interest" button on the card already tags the enquiry.
 */
export const projectOptions = [...projects.filter((p) => !p.unrevealed).map((p) => p.name), "General enquiry"];
