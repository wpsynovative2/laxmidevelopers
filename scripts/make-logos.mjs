// Derives transparent + white-knockout logo variants from the raw brand PNG.
import sharp from "sharp";
import path from "node:path";

const SRC = path.join(process.cwd(), "assets", "source-images", "Logo vv.png");
const OUT = path.join(process.cwd(), "public", "media");

const raw = sharp(SRC).ensureAlpha();
const { data, info } = await raw.raw().toBuffer({ resolveWithObject: true });

// The source render sits on an opaque white card. Knock that back out to alpha so
// the mark can sit on the cream header and the dark footer alike.
const px = Buffer.from(data);
for (let i = 0; i < px.length; i += 4) {
  const [r, g, b] = [px[i], px[i + 1], px[i + 2]];
  if (r > 244 && g > 244 && b > 244) px[i + 3] = 0;
}

const transparent = await sharp(px, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png()
  .toBuffer();

const trimmed = await sharp(transparent).trim({ threshold: 1 }).toBuffer();
const meta = await sharp(trimmed).metadata();

await sharp(trimmed).resize({ width: 720 }).png({ compressionLevel: 9 }).toFile(path.join(OUT, "logo-mark.png"));

// White knockout: keep the shape's alpha, flood every visible pixel to white.
await sharp(trimmed)
  .resize({ width: 720 })
  .composite([{ input: { create: { width: 720, height: Math.round((720 * meta.height) / meta.width), channels: 3, background: "#ffffff" } }, blend: "in" }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(OUT, "logo-white.png"));

console.log(`trimmed source ${meta.width}x${meta.height} -> logo-mark.png + logo-white.png`);
