import { laxmiHeights } from "@/lib/laxmi-heights";
import { site } from "@/lib/site";

/**
 * Renders a structured-data block. `<` is escaped per the Next.js JSON-LD
 * guidance so a stray tag in the data cannot break out of the script element.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: `${site.address.line1}, ${site.address.line2}`,
  addressLocality: "Mumbai",
  addressRegion: site.address.state,
  postalCode: site.address.pincode,
  addressCountry: "IN",
};

/** Company-level schema, rendered once in the root layout. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  email: site.emails.general,
  telephone: site.phone,
  address: postalAddress,
  areaServed: { "@type": "City", name: "Mumbai" },
  founder: { "@type": "Person", name: "Nilesh Gavad" },
  foundingDate: "2008",
};

/** Listing schema for the Laxmi Heights detail page. */
export const laxmiHeightsSchema = {
  "@context": "https://schema.org",
  "@type": "ApartmentComplex",
  name: "Laxmi Heights",
  description:
    "An ongoing residential tower on Bhatti Pada Road, Bhandup West, Mumbai, offering 1, 2 and 3 BHK homes from 319 to 666 sq.ft. carpet area.",
  url: `${site.url}/projects/laxmi-heights`,
  numberOfAvailableAccommodationUnits: 9,
  address: postalAddress,
  amenityFeature: laxmiHeights.amenityList.map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  })),
  provider: { "@type": "RealEstateAgent", name: site.name, url: site.url },
};
