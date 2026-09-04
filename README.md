# Laxmi Developers

Marketing site for Laxmi Developers (Bhandup West, Mumbai) — Next.js App Router, TypeScript,
Tailwind CSS v4, exported as a fully static site with no backend.

Content, copy and the colour palette were extracted from the existing site at
<https://laxmi-developers.com>. The layout is new.

## Quick start

```bash
npm install
cp .env.example .env.local   # then paste your Apps Script URL into it
npm run dev
```

| Script            | What it does                                                            |
| ----------------- | ----------------------------------------------------------------------- |
| `npm run dev`     | Dev server on <http://localhost:3000>                                    |
| `npm run build`   | Static export to `out/`, then flattens the prefetch payloads (see below) |
| `npm run images`  | Regenerates `public/media/` from `assets/source-images/`                 |
| `npm run intro`   | Re-cuts the intro splash clip (needs `ffmpeg` on PATH)                   |
| `npm run lint`    | ESLint                                                                   |

`npm run build` writes a plain `out/` folder — upload it to any static host
(Hostinger, Netlify, S3, GitHub Pages). There is no Node server to run.

## Pages

| Route                      | Notes                                                             |
| -------------------------- | ----------------------------------------------------------------- |
| `/`                        | The company: hero, stats, about, services, portfolio, values, process, testimonials, form |
| `/about`                   | Founder story, expertise, offerings, timeline                      |
| `/projects`                | Filterable grid — Upcoming / Ongoing / Completed                   |
| `/projects/laxmi-heights`  | The project: overview, highlights, amenities, configuration, floor plans, virtual tour, connectivity |
| `/contact`                 | Contact channels, enquiry form, office location                    |
| `/career`                  | Role groups and the application form                               |

### Company vs. project

Laxmi Developers is the **company**; Laxmi Heights is **one of its projects**. The
site keeps those separate, and so does the content layer:

- Company-level material — services, values, process, milestones, headline
  figures — lives in `lib/company.ts` and drives Home and About.
- Project-level material — amenities, configurations, floor plans, floor plates,
  connectivity, RERA — lives in `lib/laxmi-heights.ts` and appears **only** on the
  project page. Adding a second project means adding a `lib/<project>.ts` and an
  entry in `lib/projects.ts`; nothing on Home needs to change.

Deep links work: `/projects#ongoing`, `/projects#upcoming`, `/projects#completed`.

### Virtual tour

The Laxmi Heights page embeds the hosted 360° walkthrough in an iframe, between
the floor plates and connectivity sections. The URL is `laxmiHeights.virtualTour.url`
in `lib/laxmi-heights.ts`. It is a third-party, fixed-layout build: it does not
scale down, so the embed is given height (30rem on mobile, 40rem on desktop)
rather than being shrunk. Nothing on the page depends on it loading.

## Forms → Google Sheet + email

There is no database. Both forms POST to a Google Apps Script web app that appends
a row to a Sheet, saves any CV to Drive, and emails a notification.

**Setup** — full step-by-step instructions are in the header comment of
[`scripts/apps-script/Code.gs`](scripts/apps-script/Code.gs). In short:

1. Create a Google Sheet, open **Extensions → Apps Script**, paste in `Code.gs`.
2. Set the Script Properties `SHEET_ID`, `NOTIFY_EMAIL`, and optionally `CV_FOLDER_ID`.
3. **Deploy → New deployment → Web app**, *Execute as: Me*, *Who has access: Anyone*.
4. Put the `/exec` URL in `.env.local` as `NEXT_PUBLIC_FORMS_ENDPOINT`, then rebuild.

The script creates the `Enquiries` and `Applications` tabs on first submission.

> The request is sent as `Content-Type: text/plain;charset=utf-8` on purpose.
> Apps Script does not answer CORS preflight requests, so the body has to qualify
> as a CORS *simple request*; the script parses it as JSON on the other side.
> See [`lib/submit.ts`](lib/submit.ts).

If `NEXT_PUBLIC_FORMS_ENDPOINT` is unset, forms fail gracefully with a message
pointing the visitor at the phone number instead of throwing.

## Content and configuration

Everything editable lives in `lib/` — no copy is hard-coded in components.

| File                   | Holds                                                    |
| ---------------------- | -------------------------------------------------------- |
| `lib/site.ts`          | Company details, nav, socials, address, trust points      |
| `lib/company.ts`       | Services, values, process, milestones, headline figures   |
| `lib/projects.ts`      | The project catalogue and status metadata                 |
| `lib/laxmi-heights.ts` | Everything on the Laxmi Heights page                      |
| `lib/legal.ts`         | Privacy Policy, Terms & Conditions, Disclaimer            |
| `lib/jobs.ts`          | Career role groups and experience options                 |
| `lib/testimonials.ts`  | Home page testimonials — **placeholder, see below**       |

### Three things still need replacing

All are marked `PLACEHOLDER` in the source:

- `site.phone` / `site.phoneHref` / `site.whatsapp` in `lib/site.ts` — the live site
  shows `+91 9876543210`.
- `laxmiHeights.rera` in `lib/laxmi-heights.ts` — the live site shows
  `MAHARERA Regn. No. P123XXXXXXXX`.
- **`lib/testimonials.ts`** — the live site publishes no testimonials, so the three
  quotes on the home page are invented stand-ins that show the layout. Replace them
  with real, attributable quotes you have permission to publish, **or empty the
  array** — the section then removes itself from the home page, and the CTA band
  below it re-matches its curve to the section above automatically. Do not ship the
  stand-ins: publishing fabricated reviews is a consumer-protection exposure for a
  RERA-registered developer.

### Statuses and unannounced projects

`statusOrder` in `lib/projects.ts` controls which statuses the site surfaces, and
it drives all three places at once: the filter tabs, the summary cards at the top
of `/projects`, and the footer links. **`completed` is currently withheld** —
there is nothing to list under it, so rather than pointing visitors at an empty
category the tab, card and link are all absent, and `/projects#completed` falls
back to "All Projects". Put `"completed"` back in that array and every one of
them reappears; `statusMeta.completed` was left untouched.

Upcoming holds one **unrevealed teaser** (`unrevealed: true`). It is a real
project that has not been announced, so the card says exactly that — "In
planning", "Under wraps", "To be announced" — rather than inventing
configurations and prices. It has no detail page, its button reads *Register
Interest*, and it is kept out of the "Select a Project" dropdown on the forms.
Give it a real name, facts and an `href` when it is cleared for release, and drop
the `unrevealed` flag.

A status that ends up with nothing in it still renders an empty state with a
Register Interest CTA rather than a filler card.

## Images

Raw renders live in `assets/source-images/` (~148 MB, not served). `npm run images`
resizes and re-encodes them into `public/media/` as WebP (~4.8 MB total), which is
what the site actually ships. Add a job to `scripts/optimize-images.mjs` to bring a
new render in.

`Intro-video.mp4` in `assets/source-images/` is the source for the splash below;
`npm run intro` cuts it down. `LAXMI DEVELOPERS 01.mp4` is a byte-identical copy of
it and is unused.

## Intro splash

A first-time visitor gets a short full-screen clip before the site
([`components/layout/IntroVideo.tsx`](components/layout/IntroVideo.tsx)). It plays
the first **6 seconds** of the brand film, once, then fades out.

- **Once per session.** `sessionStorage["ld-intro-seen"]` is set on dismissal, so it
  does not replay as the visitor moves around the site. For once *ever* instead,
  swap that one call for `localStorage`.
- **Decided before first paint.** The overlay ships in the static HTML so it covers
  the page with no flash of the site behind it, but the CSS keeps it hidden until
  the inline script in the root layout sets `data-intro="play"` on `<html>`. Hidden
  is the safe default: if that script never runs, nobody is trapped behind a video
  they cannot dismiss.
- **Skippable four ways** — the Skip button (which takes focus on open), Escape,
  clicking anywhere, or just waiting.
- **Never shown** to anyone with `prefers-reduced-motion: reduce`, or without
  JavaScript. Neither downloads the clip either: `preload="none"` means a hidden
  overlay costs no bandwidth.
- **Weight.** The raw film is 1080p25 at ~13.6 Mbps — 24 MB for 14 seconds. The
  6-second cut ships as `intro.webm` (1.1 MB, preferred) and `intro.mp4` (1.8 MB,
  fallback); only one is ever fetched. Audio is stripped, since the clip must be
  muted for autoplay to be allowed at all.

To change the length, edit `DURATION` in
[`scripts/make-intro.mjs`](scripts/make-intro.mjs) and `PLAY_SECONDS` in the
component, then re-run `npm run intro`.

## Design system

Brand colours come from the live site's Elementor global kit and the logo; the
cream neutrals are the grounds they sit on. Tokens are defined in `app/globals.css`.

| Token                            | Value     | Use                        |
| -------------------------------- | --------- | -------------------------- |
| `forest-700`                     | `#14593A` | Brand primary              |
| `gold-500`                       | `#DAB144` | Accent, primary CTA        |
| `ink-900`                        | `#121C26` | Body text                  |
| `teal-700`                       | `#264653` | Secondary                  |
| `cream-50` / `cream-100`         | —         | Alternating section bands  |

Typography is Playfair Display (headings) and Rosario (body), both carried over
from the live site.

**Layout language.** Section backgrounds run full-bleed, edge to edge; the content
inside them stays in the page container. `components/sections/Band.tsx` provides
both: `Band` for a coloured full-width band (cream / sand / forest / white), and
`Section` for a plain run on the page's own cream ground. Imagery sits in arch
frames, and the CTA band meets the ground on a curve. The decorative primitives —
`ArchFrame`, `Blob`, `DotGrid`, `WaveDivider`, `EyebrowMark` — are in
`components/ui/Decor.tsx`; `Accent` in `components/ui/SectionHeading.tsx` sets the
italic gold word used in display headings.

Blobs are deliberately positioned past their band's edge. Each `Band` clips its own
with `overflow-hidden`, and `body` carries `overflow-x: clip` for the rest — not
`hidden`, which would break the sticky header and the project section-nav. Nothing
that needs `position: sticky` may live inside a `Band`.

**Motion.** Scroll reveals (`components/ui/Reveal.tsx`), count-ups
(`components/ui/Counter.tsx`), CTA hover sheens, and card lifts. All of it is
disabled under `prefers-reduced-motion`, and the hidden state is scoped to a `.js`
class set before first paint so the page is fully readable without JavaScript.

## Notes on the build

`scripts/flatten-prefetch.mjs` runs after `next build`. Next 16 writes each route's
prefetch payload to a nested directory (`out/about/__next.about/__PAGE__.txt`) but
the client requests it flattened (`/about/__next.about.__PAGE__.txt`). A Node server
rewrites between the two; a static host cannot, so every `<Link>` prefetch would
404. The script copies each payload to the flat name as well. Remove it if a future
Next release makes it unnecessary.
