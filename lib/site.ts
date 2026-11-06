/**
 * Single source of truth for company-wide details.
 *
 * Everything here was lifted from https://laxmi-developers.com. Where the live
 * site still ships its theme placeholders (the header phone number and the
 * RERA registration), the value is marked PLACEHOLDER — swap those two and the
 * whole site updates.
 */

export const site = {
  name: "Laxmi Developers",
  tagline: "Building Dreams, Creating Futures.",
  url: "https://laxmi-developers.com",
  description:
    "Laxmi Developers builds residential and commercial spaces in Mumbai on a foundation of legal clarity, considered planning and long-term value.",

  /** PLACEHOLDER — the live site has not published a real number yet. */
  phone: "+91 98765 43210",
  phoneHref: "+919876543210",
  /** PLACEHOLDER — used for the floating WhatsApp action. */
  whatsapp: "919876543210",

  emails: {
    general: "info@laxmi-developers.com",
    sales: "sales@laxmi-developers.com",
  },

  address: {
    line1: "Gavad Sadan, Bhatti Pada Rd",
    line2: "Opposite Parshwa Nath Jain Mandir, Battipada",
    city: "Bhandup West, Mumbai",
    state: "Maharashtra",
    pincode: "400078",
    get full() {
      return `${this.line1}, ${this.line2}, ${this.city}, ${this.state} ${this.pincode}`;
    },
  },

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Gavad+Sadan+Bhatti+Pada+Rd+Bhandup+West+Mumbai+400078",

  credit: { label: "SYNOVATIVE", note: "Design and developed by" },
} as const;

export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  // Hidden from the menu for now. The /projects page still exists; uncomment to show it again.
  // { label: "Projects", href: "/projects" },
  { label: "Laxmi Heights", href: "/projects/laxmi-heights" },
  { label: "Career", href: "/career" },
  { label: "Contact Us", href: "/contact" },
];

export type SocialLink = { label: string; href: string; icon: "whatsapp" | "facebook" | "instagram" | "youtube" | "twitter" };

export const socialLinks: SocialLink[] = [
  { label: "WhatsApp", href: `https://wa.me/${site.whatsapp}`, icon: "whatsapp" },
  { label: "Facebook", href: "https://facebook.com/", icon: "facebook" },
  { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
  { label: "YouTube", href: "https://youtube.com/", icon: "youtube" },
  { label: "Twitter", href: "https://twitter.com/", icon: "twitter" },
];

/** The promise strip that runs under the hero and above most CTA bands. */
export const trustPoints = [
  "Legally clear titles",
  "RERA-registered development",
  "Transparent documentation",
  "On-time delivery focus",
  "In-house design and execution",
] as const;
