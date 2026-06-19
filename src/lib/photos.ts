import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"]);

function isHidden(name: string) {
  return name.startsWith(".") || name === "Icon\r";
}

function encodePath(p: string) {
  return p.split("/").map(encodeURIComponent).join("/");
}

/**
 * Natural sort: "1", "2", "10" come back in that order, not "1", "10", "2".
 * Falls back to localeCompare for non-numeric prefixes.
 */
function natural(a: string, b: string) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

/**
 * List image files inside a public folder.
 * Returns URL-encoded absolute paths (starting with `/`) ready for <Image src>.
 * Returns [] silently if folder is missing — so the call site doesn't crash.
 */
export function listPhotos(folder: string): string[] {
  const trimmed = folder.replace(/^\/+|\/+$/g, "");
  const abs = path.join(PUBLIC_DIR, trimmed);
  if (!fs.existsSync(abs) || !fs.statSync(abs).isDirectory()) return [];

  return fs
    .readdirSync(abs)
    .filter((name) => !isHidden(name))
    .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
    .sort(natural)
    .map((name) => `/${encodePath(`${trimmed}/${name}`)}`);
}

export type PhotoGroup = {
  /** Human-readable label (subfolder name) */
  label: string;
  /** URL-encoded image paths inside this group */
  photos: string[];
};

/**
 * Treats each subfolder as its own carousel "chapter".
 * If the folder contains direct image files AND subfolders,
 * the direct files go into an "Overview" group first.
 */
export function listPhotoGroups(folder: string): PhotoGroup[] {
  const trimmed = folder.replace(/^\/+|\/+$/g, "");
  const abs = path.join(PUBLIC_DIR, trimmed);
  if (!fs.existsSync(abs) || !fs.statSync(abs).isDirectory()) return [];

  const entries = fs
    .readdirSync(abs, { withFileTypes: true })
    .filter((d) => !isHidden(d.name));

  const directImages = entries
    .filter((d) => d.isFile() && IMAGE_EXT.has(path.extname(d.name).toLowerCase()))
    .map((d) => d.name)
    .sort(natural);

  const subdirs = entries
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort(natural);

  const groups: PhotoGroup[] = [];

  if (directImages.length > 0) {
    groups.push({
      label: subdirs.length > 0 ? "Overview" : "",
      photos: directImages.map((n) => `/${encodePath(`${trimmed}/${n}`)}`),
    });
  }

  for (const sub of subdirs) {
    const subPhotos = listPhotos(`${trimmed}/${sub}`);
    if (subPhotos.length > 0) {
      groups.push({ label: sub.trim(), photos: subPhotos });
    }
  }

  return groups;
}

/** Convenience: first photo in a folder (for cover cards). */
export function firstPhoto(folder: string): string | undefined {
  return listPhotos(folder)[0];
}

export type PhotoMeta = {
  src: string;
  width: number;
  height: number;
};

/**
 * In-process memo so we don't re-open the same file with sharp on every
 * server render in dev. Server-only — safe to keep at module scope.
 */
const METADATA_CACHE = new Map<string, PhotoMeta>();

/**
 * Read the intrinsic dimensions of a photo (file path on disk OR
 * url-encoded /public path). Returns reasonable fallbacks if sharp can't
 * read the file (corrupt, missing) so the page still renders.
 */
export async function getPhotoMeta(src: string): Promise<PhotoMeta> {
  const cached = METADATA_CACHE.get(src);
  if (cached) return cached;

  // Resolve the on-disk file path: src may be url-encoded.
  const decoded = decodeURI(src.startsWith("/") ? src.slice(1) : src);
  const abs = path.join(PUBLIC_DIR, decoded);

  let width = 1200;
  let height = 800;
  try {
    if (fs.existsSync(abs)) {
      const meta = await sharp(abs).metadata();
      if (meta.width && meta.height) {
        width = meta.width;
        height = meta.height;
      }
    }
  } catch {
    // keep defaults; the <Image> will still render
  }

  const result = { src, width, height };
  METADATA_CACHE.set(src, result);
  return result;
}

/** Bulk version — runs reads in parallel. */
export async function listPhotosWithMeta(folder: string): Promise<PhotoMeta[]> {
  const photos = listPhotos(folder);
  return Promise.all(photos.map(getPhotoMeta));
}

