import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const cache = new Map<string, number>();

/** Local file behind a public URL like "/portafolio/a/b.jpg?v=abc" (the version query is dropped). */
const publicFile = (publicUrl: string) => path.join(process.cwd(), "public", decodeURIComponent(publicUrl.split("?")[0]));

/** Display width / height of an MP4 (read from its `tkhd` box), or undefined if it can't be read. */
function mp4Aspect(file: string): number | undefined {
  const data = fs.readFileSync(file);
  const walk = (start: number, end: number, route: string[]): number | undefined => {
    let i = start;
    while (i + 8 <= end) {
      let size = data.readUInt32BE(i);
      const type = data.toString("latin1", i + 4, i + 8);
      let header = 8;
      if (size === 1) {
        size = Number(data.readBigUInt64BE(i + 8));
        header = 16;
      } else if (size === 0) size = end - i;
      if (size < header) return undefined;
      if (type === route[0]) {
        if (route.length === 1) {
          const w = data.readUInt32BE(i + size - 8) / 65536;
          const h = data.readUInt32BE(i + size - 4) / 65536;
          // The 3x3 transform sits right before the size; a quarter turn (a≈0, b≈±1) swaps width and height.
          const a = data.readInt32BE(i + size - 8 - 36) / 65536;
          const b = data.readInt32BE(i + size - 8 - 36 + 4) / 65536;
          const turned = Math.abs(b) > Math.abs(a);
          if (w > 0 && h > 0) return turned ? h / w : w / h;
        } else {
          const found = walk(i + header, i + size, route.slice(1));
          if (found) return found;
        }
      }
      i += size;
    }
    return undefined;
  };
  return walk(0, data.length, ["moov", "trak", "tkhd"]);
}

/**
 * width / height of a public image or video given its (URL-encoded) path like "/portafolio/a/b.jpg". Falls back to 1.
 * The cache is keyed by modification time, so replacing a file under the same name is picked up.
 */
export async function getImageAspect(publicUrl: string): Promise<number> {
  try {
    const file = publicFile(publicUrl);
    const key = `${file}:${fs.statSync(file).mtimeMs}`;
    const hit = cache.get(key);
    if (hit) return hit;
    let aspect: number | undefined;
    if (/\.(mp4|mov)$/i.test(file)) aspect = mp4Aspect(file);
    else {
      const { width, height } = await sharp(file).metadata();
      aspect = width && height ? width / height : undefined;
    }
    const value = aspect ?? 1;
    cache.set(key, value);
    return value;
  } catch {
    return 1;
  }
}

const alphaCache = new Map<string, boolean>();

/** True when an image has a transparent channel (a mockup that already brings its own frame and shadow). */
export async function hasTransparency(publicUrl: string): Promise<boolean> {
  try {
    const file = publicFile(publicUrl);
    const key = `${file}:${fs.statSync(file).mtimeMs}`;
    const hit = alphaCache.get(key);
    if (hit !== undefined) return hit;
    const { hasAlpha } = await sharp(file).metadata();
    alphaCache.set(key, Boolean(hasAlpha));
    return Boolean(hasAlpha);
  } catch {
    return false;
  }
}

const holeCache = new Map<string, { left: number; top: number; width: number; height: number } | null>();

/**
 * The transparent "screen" of a laptop mockup (a hole in its frame), as fractions of the image, found by walking
 * outwards from the center until the first opaque pixel. Null when the center is opaque (a mockup without a hole).
 */
export async function getTransparentHole(publicUrl: string) {
  try {
    const file = publicFile(publicUrl);
    const key = `${file}:${fs.statSync(file).mtimeMs}`;
    if (holeCache.has(key)) return holeCache.get(key) ?? null;
    const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const alphaAt = (x: number, y: number) => data[(y * info.width + x) * info.channels + 3];
    const cx = Math.floor(info.width / 2);
    const cy = Math.floor(info.height * 0.45);
    let hole: { left: number; top: number; width: number; height: number } | null = null;
    if (alphaAt(cx, cy) === 0) {
      let l = cx, r = cx, t = cy, b = cy;
      while (l > 0 && alphaAt(l - 1, cy) === 0) l--;
      while (r < info.width - 1 && alphaAt(r + 1, cy) === 0) r++;
      while (t > 0 && alphaAt(cx, t - 1) === 0) t--;
      while (b < info.height - 1 && alphaAt(cx, b + 1) === 0) b++;
      hole = { left: l / info.width, top: t / info.height, width: (r - l + 1) / info.width, height: (b - t + 1) / info.height };
    }
    holeCache.set(key, hole);
    return hole;
  } catch {
    return null;
  }
}

/** Pixel size of a public image, or null if it can't be read. */
export async function getImageSize(publicUrl: string): Promise<{ width: number; height: number } | null> {
  try {
    const { width, height } = await sharp(publicFile(publicUrl)).metadata();
    return width && height ? { width, height } : null;
  } catch {
    return null;
  }
}
