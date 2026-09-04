// Generates web-ready WebP derivatives in public/media from the raw renders in public/images.
// Run with: node scripts/optimize-images.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = path.join(process.cwd(), "assets", "source-images");
const OUT = path.join(process.cwd(), "public", "media");

/** @typedef {{ src: string, out: string, width: number, cropBottomPct?: number, cropLeftPct?: number, png?: boolean, quality?: number }} Job */

/** @type {Job[]} */
const jobs = [
  // --- Laxmi Heights elevations -------------------------------------------
  { src: "Final elevation v14.jpg", out: "hero-tower", width: 2400 },
  { src: "Scene 23.png", out: "tower-portrait", width: 1200 },
  { src: "night elevation 2.jpeg", out: "night-aerial", width: 1800, cropBottomPct: 6 },
  { src: "night elevation 1.jpeg", out: "night-aerial-alt", width: 1800, cropBottomPct: 6 },
  { src: "Elevation 1 final.jpg", out: "elevation-a", width: 1800 },
  { src: "Elevation 1 final1.jpg", out: "elevation-b", width: 1800 },
  { src: "Final elevation v2.jpeg", out: "elevation-c", width: 1800 },
  { src: "Final elevation v3.jpeg", out: "elevation-d", width: 1800 },
  { src: "Final elevation v1.jpg.jpeg", out: "elevation-e", width: 1800 },
  { src: "Png eliavtion 1.png", out: "elevation-f", width: 1400 },
  { src: "newelevation.jpeg", out: "elevation-wide", width: 1400 },
  { src: "Building-coverd.png", out: "project-unrevealed", width: 1600 },

  // --- People / company ----------------------------------------------------
  { src: "Nilesh Sir My version.png", out: "founder-portrait", width: 900 },
  { src: "Hero_one.png", out: "founder-office", width: 1800 },
  { src: "Smart Construction Technology.png", out: "team-planning", width: 1400 },
  { src: "Akhilesh Bhai Laxmi Developers revised.png", out: "team-alt", width: 1200 },
  { src: "Nilesh Gawad img 5.png", out: "founder-alt-1", width: 1200 },
  { src: "Nilesh Gawad img 7.png", out: "founder-alt-2", width: 1200 },

  // --- Unlabelled renders (inspected after generation) ---------------------
  { src: "ChatGPT Image Jul 20, 2026, 06_17_58 PM.png", out: "scene-a", width: 1400 },
  { src: "ChatGPT Image Jul 20, 2026, 06_26_10 PM.png", out: "scene-b", width: 1400 },
  { src: "6077d74f-0b1c-4419-ae9a-0a377cd8f69a.png", out: "scene-c", width: 1400 },
  { src: "77264d49-af31-4e12-aa8c-743564184f3a.png", out: "scene-d", width: 1400 },
  { src: "85ab9629-dd06-4a4b-bc96-30b74bbbfa08.png", out: "scene-e", width: 1400 },

  // --- Amenities (trim the VR-tour hotspot button on the left edge) --------
  { src: "Amenities/Yoga.png", out: "amenity-yoga", width: 1200, cropLeftPct: 3 },
  { src: "Amenities/Kids play area.png", out: "amenity-kids", width: 1200, cropLeftPct: 3 },
  { src: "Amenities/Seating area.png", out: "amenity-seating", width: 1200, cropLeftPct: 3 },

  // --- Unit plans ----------------------------------------------------------
  { src: "1 BHK - 393 sq ft.jpg.jpeg", out: "plan-1bhk-393", width: 1400 },
  { src: "1 BHK - 413 sq ft.jpg.jpeg", out: "plan-1bhk-413", width: 1400 },
  { src: "2 BHK - 574 sq fit roted.jpg.jpeg", out: "plan-2bhk-574", width: 1400 },
  { src: "1 BHK Typical.jpg.jpeg", out: "plan-1bhk-typical", width: 1400 },
  { src: "2 BHK Typical.jpg.jpeg", out: "plan-2bhk-typical", width: 1400 },
  { src: "3 BHK Typical.jpg.jpeg", out: "plan-3bhk-typical", width: 1400 },

  // --- Floor plates --------------------------------------------------------
  { src: "Floor Plans/Ground-Floor-Plan.jpeg", out: "floor-ground", width: 1400 },
  { src: "Floor Plans/1st-Floor.jpeg", out: "floor-01", width: 1400 },
  { src: "Floor Plans/2nd-floor-plan.jpeg", out: "floor-02", width: 1400 },
  { src: "Floor Plans/3rd-4th-floor-plan.jpeg", out: "floor-03-04", width: 1400 },
  { src: "Floor Plans/5th-floor-plan.jpeg", out: "floor-05", width: 1400 },
  { src: "Floor Plans/6th-8th-to13th-15th-to-10th.jpeg", out: "floor-06-19", width: 1400 },
  { src: "Floor Plans/7th-14th-Floor-plan.jpeg", out: "floor-07-14", width: 1400 },
  { src: "Floor Plans/20th-Floor-Plan.jpeg", out: "floor-20", width: 1400 },
  { src: "Floor Plans/21st-floor-plan.jpeg", out: "floor-21", width: 1400 },
  { src: "Floor Plans/22nd-&-23rd-floor-plan.jpeg", out: "floor-22-23", width: 1400 },
  { src: "26th floor plan.jpeg", out: "floor-26", width: 1400 },

  // --- Location ------------------------------------------------------------
  { src: "Map .jpg.jpeg", out: "location-map", width: 1600 },

  // --- Logo keeps its alpha channel ---------------------------------------
  { src: "Logo vv.png", out: "logo", width: 720, png: true },
];

async function run() {
  await mkdir(OUT, { recursive: true });
  const results = [];

  for (const job of jobs) {
    const from = path.join(SRC, job.src);
    try {
      let pipeline = sharp(from);
      const meta = await pipeline.metadata();

      if (job.cropBottomPct || job.cropLeftPct) {
        const left = Math.round((meta.width * (job.cropLeftPct ?? 0)) / 100);
        const height = Math.round(meta.height * (1 - (job.cropBottomPct ?? 0) / 100));
        pipeline = pipeline.extract({ left, top: 0, width: meta.width - left, height });
      }

      pipeline = pipeline.resize({ width: job.width, withoutEnlargement: true });

      const ext = job.png ? "png" : "webp";
      const dest = path.join(OUT, `${job.out}.${ext}`);
      const info = job.png
        ? await pipeline.png({ compressionLevel: 9, palette: true }).toFile(dest)
        : await pipeline.webp({ quality: job.quality ?? 82, effort: 5 }).toFile(dest);

      results.push({ out: `${job.out}.${ext}`, w: info.width, h: info.height, kb: Math.round(info.size / 1024) });
    } catch (err) {
      results.push({ out: job.out, error: err.message });
    }
  }

  for (const r of results) {
    console.log(r.error ? `FAIL ${r.out}: ${r.error}` : `${r.out.padEnd(26)} ${String(r.w).padStart(5)}x${String(r.h).padEnd(5)} ${String(r.kb).padStart(5)} KB`);
  }

  const total = results.reduce((a, r) => a + (r.kb ?? 0), 0);
  console.log(`\n${results.filter((r) => !r.error).length}/${jobs.length} written, ${(total / 1024).toFixed(1)} MB total`);
}

run();
