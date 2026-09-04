import type { Metadata, Viewport } from "next";
import { Playfair_Display, Rosario } from "next/font/google";
import { JsonLd, organizationSchema } from "@/components/JsonLd";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { FloatingCta } from "@/components/layout/FloatingCta";
import { ModalProvider } from "@/components/modals/ModalProvider";
import { site } from "@/lib/site";
import "./globals.css";

// Both families carry over from the live site's Elementor kit.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const rosario = Rosario({
  variable: "--font-rosario",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: ["Laxmi Developers", "Laxmi Heights", "Bhandup West", "Mumbai real estate", "1 BHK Bhandup", "2 BHK Bhandup"],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#14593a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${playfair.variable} ${rosario.variable} h-full`}>
      <head>
        {/*
          Runs before first paint. Scroll-reveal only hides content under `.js`,
          so a visitor without JavaScript sees every section instead of a blank page.
        */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("js")` }} />
        <JsonLd data={organizationSchema} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:rounded-full focus:bg-forest-700 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream-50"
        >
          Skip to content
        </a>

        <ModalProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingCta />
        </ModalProvider>
      </body>
    </html>
  );
}
