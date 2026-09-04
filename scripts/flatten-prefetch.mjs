/**
 * Post-export fix-up for Next 16 prefetch payloads.
 *
 * `next build` with `output: "export"` writes each route's prefetch payload as a
 * nested directory, e.g.
 *   out/about/__next.about/__PAGE__.txt
 *   out/projects/laxmi-heights/__next.projects/laxmi-heights/__PAGE__.txt
 *
 * but the client requests the segment path flattened onto one filename:
 *   /about/__next.about.__PAGE__.txt
 *   /projects/laxmi-heights/__next.projects.laxmi-heights.__PAGE__.txt
 *
 * On a Node server Next rewrites between the two. A plain static host cannot, so
 * every <Link> prefetch 404s — navigation still works, but it falls back to a
 * full fetch and the console fills with errors. This copies each payload to the
 * flat name the client actually asks for, leaving the originals in place.
 *
 * Runs automatically after `npm run build`.
 */

import { readdir, copyFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");

/** Collects every file under `dir`, returned as paths relative to `dir`. */
async function walk(dir, base = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full, base)));
    else files.push(path.relative(base, full));
  }
  return files;
}

async function run() {
  let files;
  try {
    files = await walk(OUT);
  } catch {
    console.error("flatten-prefetch: no out/ directory — run `next build` first.");
    process.exitCode = 1;
    return;
  }

  let copied = 0;

  for (const rel of files) {
    const parts = rel.split(path.sep);
    // Find the segment that opens a payload directory, e.g. "__next.projects".
    const start = parts.findIndex((part) => part.startsWith("__next.") && part !== "__next.");
    if (start === -1) continue;

    // Already flat (the whole payload is one filename) — nothing to do.
    if (start === parts.length - 1) continue;

    const prefix = parts.slice(0, start);
    const flatName = parts.slice(start).join(".");
    const dest = path.join(OUT, ...prefix, flatName);

    await copyFile(path.join(OUT, rel), dest);
    copied += 1;
  }

  console.log(`flatten-prefetch: wrote ${copied} flattened prefetch payload${copied === 1 ? "" : "s"}.`);
}

run();
