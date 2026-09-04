/**
 * Laxmi Heights project detail — transcribed from https://laxmi-developers.com/laxmi-heights/.
 * Copy is kept close to the source; only obvious theme placeholders were dropped.
 */

export const laxmiHeights = {
  name: "Laxmi Heights",
  status: "ongoing" as const,
  location: "Bhatti Pada Road, Bhandup West, Mumbai 400078",
  /** PLACEHOLDER — the live site still shows a masked number. */
  rera: "MAHARERA Regn. No. P123XXXXXXXX",

  hero: {
    eyebrow: "Ongoing · Bhandup West",
    title: "Built for Today, Ready for Tomorrow",
    lede: "A residential address designed around comfort, smart planning and long-term value — for families and investors who want quality without compromise.",
    image: "/media/hero-tower.webp",
    imageAlt: "Laxmi Heights tower elevation against a clear sky",
  },

  sections: [
    { id: "overview", label: "Overview" },
    { id: "about", label: "About" },
    { id: "highlights", label: "Highlights" },
    { id: "amenities", label: "Amenities" },
    { id: "configuration", label: "Configuration" },
    { id: "floor-plans", label: "Floor Plans" },
    { id: "virtual-tour", label: "Virtual Tour" },
    { id: "connectivity", label: "Connectivity" },
    { id: "enquire", label: "Contact" },
  ],

  overview: {
    eyebrow: "Project overview",
    title: "A Perfect Balance of Comfort and Value",
    body: [
      "This project is designed to offer comfortable living through smart planning and long-term value. Every space is thoughtfully designed to suit modern families and investors seeking quality and peace of mind.",
      "Strong construction quality and smart layout planning form the foundation of this development. The focus is on creating homes that are functional today and reliable for the future, giving residents a sense of safety and confidence.",
    ],
    image: "/media/night-aerial.webp",
    imageAlt:
      "Aerial night view of Laxmi Heights and the surrounding Bhandup skyline",
    stats: [
      { value: 9, suffix: "", label: "Unit layouts" },
      { value: 3, suffix: "", label: "Configurations" },
      { value: 319, suffix: "+", label: "Carpet sq.ft. from" },
      { value: 2008, suffix: "", label: "Building since", plain: true },
    ],
  },

  about: {
    eyebrow: "About our company",
    title: "Foundation of Quality & Transparency",
    body: [
      "Laxmi Developers is built on the principles of trust, transparency and thoughtful development. The company focuses on delivering projects that are legally sound, strategically planned, and designed for long-term value.",
      "With a strong understanding of real estate development, market dynamics and customer needs, Laxmi Developers aims to create spaces that stand the test of time. Each project reflects careful planning, ethical practices and a commitment to quality — ensuring satisfaction for homeowners and investors alike.",
    ],
    image: "/media/elevation-wide.webp",
    imageAlt: "Daylight elevation render of Laxmi Heights in its surroundings",
  },

  highlights: [
    {
      title: "Lifestyle and Lavish Amenities",
      body: "Terrace-level wellness, play and leisure spaces built into everyday life.",
      icon: "sparkle",
    },
    {
      title: "Smart Construction Technology",
      body: "Modern methods and materials chosen for durability, not just speed.",
      icon: "cube",
    },
    {
      title: "Future Ready Connectivity",
      body: "Rail, metro and road links that keep the whole city within easy reach.",
      icon: "route",
    },
    {
      title: "Smart Investment with Promising Returns",
      body: "A location and configuration mix positioned for long-term appreciation.",
      icon: "trend",
    },
    {
      title: "Designed for Privacy & Peace",
      body: "Layouts planned so homes stay quiet, private and comfortable.",
      icon: "shield",
    },
    {
      title: "Wellness Focused Living",
      body: "Open-air yoga, a terrace gym and green pockets built into the plan.",
      icon: "leaf",
    },
  ],

  /**
   * `wide` cards take two columns on the mosaic grid. Two of them, at the first
   * and last position, make the seven cards fill three rows exactly.
   */
  amenities: [
    {
      name: "Open Gymnasium",
      image: "/media/amenity-Open-Gymnasium.webp",
      alt: "Open-air terrace gymnasium on landscaped turf under a timber pergola",
      wide: true,
    },
    {
      name: "Open Terrace Yoga",
      image: "/media/amenity-Open-terrace-Yoga.webp",
      alt: "Resident practising yoga on the planted open terrace at sunrise, city skyline behind",
    },
    {
      name: "Kids Play Zone",
      image: "/media/amenity-kids.webp",
      alt: "Podium-level children's play area with climbing frame and the jogging track running alongside",
    },
    {
      name: "Indoor Games",
      image: "/media/amenity-Indoor-Games.webp",
      alt: "Indoor games room with a pool table, foosball and lounge seating",
    },
    {
      name: "Gazeebo",
      image: "/media/amenity-Gazeebo.webp",
      alt: "Timber gazebo set among palms in the landscaped garden deck",
    },
    {
      name: "Indoor Yoga & Sauna",
      image: "/media/amenity-yoga.webp",
      alt: "Naturally lit indoor yoga studio with sauna access",
    },
    {
      name: "Seating & Sitting Zone",
      image: "/media/amenity-seating.webp",
      alt: "Landscaped terrace seating zone with cafe tables and a flowering green wall",
      wide: true,
    },
  ],

  amenityList: [
    "Kids Play Zone",
    "Open Terrace Yoga",
    "Open Gymnasium (Terrace)",
    "Indoor Games",
    "Gazeebo",
    "Jogging Track",
  ],

  /** Carpet areas exactly as published on the live configuration table. */
  configurations: [
    { sr: "01", config: "1 BHK", carpet: "319 sq.ft." },
    { sr: "02", config: "1 BHK", carpet: "335 sq.ft." },
    { sr: "03", config: "1 BHK", carpet: "350 sq.ft." },
    { sr: "04", config: "1 BHK", carpet: "366 sq.ft." },
    { sr: "05", config: "1 BHK", carpet: "390 sq.ft." },
    { sr: "06", config: "2 BHK", carpet: "552 sq.ft." },
    { sr: "07", config: "2 BHK", carpet: "565 sq.ft." },
    { sr: "08", config: "2 BHK", carpet: "583 sq.ft." },
    { sr: "09", config: "3 BHK", carpet: "666 sq.ft." },
  ],

  floorPlans: [
    { label: "1 BHK", area: "393 sq.ft", image: "/media/plan-1bhk-393.webp" },
    { label: "1 BHK", area: "413 sq.ft", image: "/media/plan-1bhk-413.webp" },
    { label: "2 BHK", area: "574 sq.ft", image: "/media/plan-2bhk-574.webp" },
    {
      label: "1 BHK",
      area: "Typical layout",
      image: "/media/plan-1bhk-typical.webp",
    },
    {
      label: "2 BHK",
      area: "Typical layout",
      image: "/media/plan-2bhk-typical.webp",
    },
    {
      label: "3 BHK",
      area: "Typical layout",
      image: "/media/plan-3bhk-typical.webp",
    },
  ],

  floorPlates: [
    { label: "Ground floor", image: "/media/floor-ground.webp" },
    { label: "1st floor", image: "/media/floor-01.webp" },
    { label: "2nd floor", image: "/media/floor-02.webp" },
    { label: "3rd – 4th floor", image: "/media/floor-03-04.webp" },
    { label: "5th floor", image: "/media/floor-05.webp" },
    { label: "6th – 19th floor", image: "/media/floor-06-19.webp" },
    { label: "20th floor", image: "/media/floor-20.webp" },
    { label: "21st floor", image: "/media/floor-21.webp" },
    { label: "22nd – 23rd floor", image: "/media/floor-22-23.webp" },
    { label: "26th floor", image: "/media/floor-26.webp" },
  ],

  /**
   * Hosted 360° walkthrough. Embedded in an iframe on the project page — it is a
   * third-party build, so nothing on this site depends on it rendering.
   */
  virtualTour: {
    url: "https://demo.build91.in/laxmiheights/index.htm",
    eyebrow: "Virtual tour",
    title: "Walk through Laxmi Heights",
    lede: "A 360° walkthrough of the sample home and the amenity levels. Drag to look around, click the arrows to move between spaces.",
  },

  connectivity: [
    {
      group: "Railway Station",
      icon: "train",
      items: ["Bhandup", "Kanjurmarg", "Nahur", "Mulund"],
    },
    {
      group: "Metro Station",
      icon: "metro",
      items: ["Bhandup Mahapalika", "Shangrila"],
    },
    {
      group: "Hospitals",
      icon: "hospital",
      items: ["Bhandup", "Kanjurmarg", "Nahur", "Mulund"],
    },
    {
      group: "Temples",
      icon: "temple",
      items: [
        "Bhattipada Mandir",
        "Shani Mandir",
        "Shree Gajanan Maharaj Mandir",
        "Jari Mari Mandir",
        "Ganpati Mandir",
      ],
    },
    {
      group: "Restaurants",
      icon: "dining",
      items: ["The Captain Cook", "Central Bhandup Fine Dine", "Annachi"],
    },
  ],

  gallery: [
    {
      image: "/media/hero-tower.webp",
      alt: "Laxmi Heights full tower elevation in daylight",
    },
    {
      image: "/media/night-aerial.webp",
      alt: "Aerial night view of the illuminated tower",
    },
    {
      image: "/media/night-aerial-alt.webp",
      alt: "Night aerial view from the opposite approach road",
    },
    {
      image: "/media/elevation-c.webp",
      alt: "Close elevation study of the tower facade",
    },
    {
      image: "/media/elevation-d.webp",
      alt: "Alternate facade treatment study",
    },
    {
      image: "/media/elevation-e.webp",
      alt: "Street-level view of the tower entrance and retail plinth",
    },
  ],
} as const;
