import Image from "next/image";
import { CtaButton } from "@/components/ui/CtaButton";
import { EnquireButton } from "@/components/ui/EnquireButton";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70svh] items-center overflow-hidden bg-forest-950">
      <Image src="/media/night-aerial.webp" alt="" aria-hidden="true" fill sizes="100vw" className="object-cover opacity-30" />
      <span aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-forest-950/95 to-forest-900/70" />

      <div className="relative container-x py-20 text-center">
        <p className="font-display text-6xl text-gold-500 sm:text-7xl">404</p>
        <h1 className="mt-5 font-display text-3xl text-cream-50 text-balance sm:text-4xl">This page could not be found.</h1>
        <p className="mx-auto mt-4 max-w-md text-[0.95rem] leading-relaxed text-cream-200/70">
          The link may be out of date. Head back to the homepage, or tell us what you were looking for and we will point you to it.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <CtaButton href="/" variant="gold" size="lg">
            Back to Home
          </CtaButton>
          <EnquireButton source="404 page" variant="light" size="lg">
            Enquire Now
          </EnquireButton>
        </div>
      </div>
    </section>
  );
}
