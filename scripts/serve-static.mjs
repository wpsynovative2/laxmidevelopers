/**
 * Serves the static export on a Node host (Hostinger's Node.js app runtime, a
 * container, anywhere with a process and a port).
 *
 * Why this exists: the site is a full static export, so `next start` refuses to
 * run —
 *
 *   Error: "next start" does not work with "output: export" configuration.
 *
 * On a plain static host none of this is needed: upload `out/` and stop. This is
 * only for hosts that insist on running a Node process.
 *
 * No dependencies on purpose, so it survives `npm ci --omit=dev`.
 */

import http from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."), "out");
const PORT = Number(process.env.PORT) || 3000;
// Hosts route to the container's external interface, not loopback.
const HOST = process.env.HOST || "0.0.0.0";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  // Next's prefetch payloads. utf-8 matters: they carry the page copy.
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

/**
 * Hashed build assets can be cached forever. Media is content-addressed only by
 * name, so it gets a day with revalidation. HTML must never be cached hard, or a
 * redeploy leaves visitors on the old page.
 */
function cacheFor(urlPath, ext) {
  if (urlPath.startsWith("/_next/static/")) return "public, max-age=31536000, immutable";
  if (ext === ".html" || ext === ".txt") return "public, max-age=0, must-revalidate";
  if (urlPath.startsWith("/media/")) return "public, max-age=86400";
  return "public, max-age=3600";
}

/** Resolves a URL path to a file inside ROOT, or null if it escapes or is missing. */
async function resolve(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  const candidate = path.resolve(ROOT, "." + decoded);

  // Path traversal guard: everything served must sit under ROOT.
  if (candidate !== ROOT && !candidate.startsWith(ROOT + path.sep)) return null;

  for (const file of [candidate, path.join(candidate, "index.html"), candidate + ".html"]) {
    try {
      const info = await stat(file);
      if (info.isFile()) return { file, size: info.size };
    } catch {
      // Try the next candidate.
    }
  }
  return null;
}

const server = http.createServer(async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { allow: "GET, HEAD" }).end("Method Not Allowed");
    return;
  }

  const urlPath = (req.url || "/").split("?")[0];

  // The export is built with `trailingSlash: true`, so /about/ is the canonical
  // URL. Redirect /about rather than serving the same page at both, which would
  // hand search engines two URLs for one page.
  if (!urlPath.endsWith("/") && !path.extname(urlPath) && (await resolve(urlPath + "/"))) {
    const query = (req.url || "").slice(urlPath.length);
    res.writeHead(308, { location: urlPath + "/" + query }).end();
    return;
  }

  let hit = await resolve(urlPath);

  let status = 200;
  if (!hit) {
    status = 404;
    hit = await resolve("/404.html");
    if (!hit) {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" }).end("404 Not Found");
      return;
    }
  }

  const ext = path.extname(hit.file).toLowerCase();
  const headers = {
    "content-type": TYPES[ext] ?? "application/octet-stream",
    "cache-control": cacheFor(urlPath, ext),
    "x-content-type-options": "nosniff",
    "accept-ranges": "bytes",
  };

  // Range support, so the intro video can be scrubbed and resumed rather than
  // being refetched whole.
  const range = status === 200 ? /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? "") : null;
  if (range) {
    const start = range[1] ? Number(range[1]) : 0;
    const end = range[2] ? Math.min(Number(range[2]), hit.size - 1) : hit.size - 1;
    if (Number.isNaN(start) || start > end || start >= hit.size) {
      res.writeHead(416, { "content-range": `bytes */${hit.size}` }).end();
      return;
    }
    res.writeHead(206, { ...headers, "content-range": `bytes ${start}-${end}/${hit.size}`, "content-length": end - start + 1 });
    if (req.method === "HEAD") return res.end();
    createReadStream(hit.file, { start, end }).pipe(res);
    return;
  }

  res.writeHead(status, { ...headers, "content-length": hit.size });
  if (req.method === "HEAD") return res.end();
  createReadStream(hit.file).pipe(res);
});

server.listen(PORT, HOST, () => {
  console.log(`Serving ${ROOT} on http://${HOST}:${PORT}`);
});
