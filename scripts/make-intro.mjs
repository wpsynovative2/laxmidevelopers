// Cuts the intro splash clip out of the full brand film and encodes web-ready
// derivatives into public/media. Run with: npm run intro
//
// Needs ffmpeg on PATH. The raw film is 1080p25 at ~13.6 Mbps (24 MB for 14s),
// which is far too heavy to put in front of a first-time visitor, so only the
// first few seconds are kept and re-encoded. Audio is dropped: the splash is
// muted regardless (browsers block unmuted autoplay), so the track is dead weight.
import { execFileSync } from "node:child_process";
import { statSync } from "node:fs";
import path from "node:path";

const SRC = path.join(process.cwd(), "assets", "source-images", "Intro-video.mp4");
const OUT = path.join(process.cwd(), "public", "media");

/** Seconds of the source to keep, from the start. Mirrored in IntroVideo.tsx. */
const DURATION = 6;

const ff = (args) => execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...args], { stdio: ["ignore", "inherit", "inherit"] });
const kb = (f) => `${Math.round(statSync(f).size / 1024)} KB`;

const mp4 = path.join(OUT, "intro.mp4");
const webm = path.join(OUT, "intro.webm");
const poster = path.join(OUT, "intro-poster.webp");

// -ss before -i seeks fast; both are keyframe-aligned at 0 so it is exact here.
ff(["-ss", "0", "-t", String(DURATION), "-i", SRC, "-an",
    "-c:v", "libx264", "-crf", "27", "-preset", "slow", "-profile:v", "high",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4]);

ff(["-ss", "0", "-t", String(DURATION), "-i", SRC, "-an",
    "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-row-mt", "1", "-deadline", "good", webm]);

// Poster covers the gap before the first frame decodes, so the splash never
// flashes black.
ff(["-ss", "0", "-i", SRC, "-frames:v", "1", "-c:v", "libwebp", "-quality", "78", poster]);

for (const f of [mp4, webm, poster]) console.log(`${path.basename(f).padEnd(20)} ${kb(f)}`);
console.log(`\nfirst ${DURATION}s of ${path.basename(SRC)} (${kb(SRC)})`);
