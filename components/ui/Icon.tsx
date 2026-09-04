import type { SVGProps } from "react";

/** Every glyph used on the site, drawn on a 24×24 grid with a 1.6 stroke. */
const paths = {
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowUpRight: "M8 16 16 8M9 8h7v7",
  phone: "M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3Z",
  mail: "M3 6.5h18v11H3zM3 7l9 6 9-6",
  pin: "M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3.5 2",
  check: "m4.5 12.5 5 5 10-11",
  close: "M6 6l12 12M18 6 6 18",
  menu: "M4 7h16M4 12h16M4 17h16",
  chevronDown: "m6 9 6 6 6-6",
  sparkle: "M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.2 10.2 12.6 4.5 10.8 10.2 9 12 3.5Z",
  cube: "M12 3 3.5 7.5v9L12 21l8.5-4.5v-9L12 3ZM3.5 7.5 12 12l8.5-4.5M12 12v9",
  route: "M6.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM17.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM15 6.5H9.5a3 3 0 0 0 0 6h5a3 3 0 0 1 0 6H9",
  trend: "M3.5 16.5 9 11l3.5 3.5L20.5 6.5M15.5 6.5h5v5",
  shield: "M12 3 5 6v6c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6l-7-3Z",
  leaf: "M5 19c0-8 5.5-13 15-13 0 9.5-5 15-13 15H5v-2ZM5 19c2.5-4 5.5-6.5 9.5-8.5",
  train: "M7 3h10a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM5 9h14M9 12.5h.01M15 12.5h.01M8 16l-2.5 5M16 16l2.5 5",
  metro: "M12 3c-4 0-7 .8-7 3v7a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6c0-2.2-3-3-7-3ZM5 9.5h14M9 13h.01M15 13h.01M8.5 16 6 21M15.5 16l2.5 5",
  hospital: "M4.5 20.5v-13L12 3l7.5 4.5v13M9.5 20.5v-5h5v5M12 8v4M10 10h4",
  temple: "M12 2.5 4.5 8h15L12 2.5ZM6 8v12.5M18 8v12.5M4 20.5h16M9.5 20.5V14a2.5 2.5 0 0 1 5 0v6.5",
  dining: "M6 3v7a2.5 2.5 0 0 0 5 0V3M8.5 10v11M17 3c-1.5 1.5-2 3-2 5.5S16 12 17 12.5V21",
  building: "M4 21V6l7-3v18M11 21h9V10l-9-4M7.5 9h.01M7.5 13h.01M7.5 17h.01M15 12h.01M15 16h.01",
  users: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20.5a6.5 6.5 0 0 1 13 0M16 4.4a3.5 3.5 0 0 1 0 6.7M18 14.2a6.5 6.5 0 0 1 3.5 6.3",
  scale: "M12 3.5v17M7 20.5h10M6 7.5h12M6 7.5 3 14h6L6 7.5ZM18 7.5 15 14h6l-3-6.5Z",
  handshake: "m9 12 2 2 4-4M3.5 9 7 5.5h10L20.5 9M3.5 9v6L8 19.5l2-2M20.5 9v6L16 19.5l-2-2",
  download: "M12 3.5v11m0 0 4-4m-4 4-4-4M4.5 17v2.5h15V17",
  play: "M9 6.5v11l9-5.5-9-5.5Z",
  whatsapp:
    "M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Zm4.4 12.4c-.2.6-1.1 1.1-1.6 1.1-.4 0-.9.2-3-.8-2.5-1.1-4.1-3.7-4.2-3.9-.1-.2-1-1.3-1-2.5s.6-1.7.9-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.6l-.4.5c-.1.1-.3.3-.1.6.1.3.7 1.1 1.4 1.8.9.8 1.7 1.1 2 1.2.2.1.4.1.5-.1l.7-.8c.2-.2.4-.1.6 0l1.7.8c.2.1.4.2.4.3.1.2.1.7-.1 1.2Z",
  facebook: "M14.5 8.5H17V5h-2.5a4 4 0 0 0-4 4v2H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V9.5a1 1 0 0 1 1-1Z",
  instagram: "M7.5 3.5h9a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4v-9a4 4 0 0 1 4-4ZM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM17 7h.01",
  youtube: "M21 8.5a3 3 0 0 0-2.2-2.2C17 5.8 12 5.8 12 5.8s-5 0-6.8.5A3 3 0 0 0 3 8.5 31 31 0 0 0 2.6 12 31 31 0 0 0 3 15.5a3 3 0 0 0 2.2 2.2c1.8.5 6.8.5 6.8.5s5 0 6.8-.5a3 3 0 0 0 2.2-2.2 31 31 0 0 0 .4-3.5 31 31 0 0 0-.4-3.5ZM10.2 14.5v-5l4.3 2.5-4.3 2.5Z",
  twitter: "M3.5 3.5h4l5.2 6.9 5.8-6.9h2L14 11.8l7 9.7h-4l-5.5-7.3-6.2 7.3H3.5l8-9.4-8-8.6Z",
  star: "M12 2.9l2.8 5.6 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.4l6.2-.9L12 2.9Z",
  quote: "M10.2 5.6C6.9 6.9 4.6 9.9 4.6 13.7v4.7h6.6v-6.6H8.4c.2-1.9 1.2-3.2 3-4L10.2 5.6Zm9.2 0c-3.3 1.3-5.6 4.3-5.6 8.1v4.7h6.6v-6.6h-2.8c.2-1.9 1.2-3.2 3-4l-1.2-2.2Z",
} as const;

export type IconName = keyof typeof paths;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  /** Filled glyphs (brand marks) need no stroke. */
  filled?: boolean;
}

const FILLED: IconName[] = ["whatsapp", "facebook", "instagram", "youtube", "twitter", "play", "sparkle", "star", "quote"];

export function Icon({ name, filled, className = "size-5", ...rest }: IconProps) {
  const solid = filled ?? FILLED.includes(name);
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill={solid ? "currentColor" : "none"}
      stroke={solid ? "none" : "currentColor"}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  );
}
