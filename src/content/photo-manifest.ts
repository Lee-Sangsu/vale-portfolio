/**
 * Curated photo manifest — hand-picked photos per slot, per project.
 *
 * The auto-resolver (lib/photos) walks folders and dumps whatever's there.
 * That works as a fallback but it's not editorial. This file pins specific
 * images to specific spaces so the page reads on purpose.
 *
 * Slot semantics:
 *   - cover:       the single hero shot at the top of the project page
 *   - polaroid:    3-6 photos for the scattered pile section
 *   - mosaic:      3-6 photos for the masonry mid-body grid
 *   - mainCarousel: 5-12 photos for the bottom "Gallery" carousel
 *   - decks:       named sub-carousels for things like "Post — Last call"
 *
 * Paths are RELATIVE to /public (no leading slash, will get URL-encoded
 * by the resolver). Use the real folder/file names including spaces.
 */

export type DeckEntry = {
  label: string;
  /** Either an explicit photo list, OR a folder whose contents become the deck. */
  photos?: string[];
  folder?: string;
};

export type ProjectManifest = {
  cover?: string;
  /** Optional second photo shown as a Mac-window pop next to the title block. */
  spotlight?: string;
  polaroid?: string[];
  mosaic?: string[];
  mainCarousel?: string[];
  decks?: DeckEntry[];
};

const PUBLIC_PHOTOS = "photos";

// ── HEROES ────────────────────────────────────────────────────────────
export const HERO_MANIFEST: Record<string, ProjectManifest> = {
  "global-youth-summit": {
    cover: `${PUBLIC_PHOTOS}/Favorite projects/global-youth-summit/_MG_3552.png`,
  },

  "misiones-internacionales": {
    cover: `${PUBLIC_PHOTOS}/Favorite projects/misiones-internacionales/IMG_9755.png`,
  },

  "sejong-hackathon": {
    cover: `${PUBLIC_PHOTOS}/Favorite projects/sejong-hackathon/IMG_3845.png`,
  },

  "jal-nomadher": {
    cover: `${PUBLIC_PHOTOS}/Favorite projects/jal-nomadher/Banner.png`,
  },

  "nomadher-app": {
    cover: `${PUBLIC_PHOTOS}/Favorite projects/nomadher-app/03 iPhone Mockups.png`,
  },
};

// ── MENTIONS ──────────────────────────────────────────────────────────
export const MENTION_MANIFEST: Record<string, ProjectManifest> = {
  // BOOST LAB
  "women-entrepreneur-summit-seoul": {
    cover: `${PUBLIC_PHOTOS}/BOOST LAB/women-entrepreneur-summit-seoul/Group 2864.png`,
    mainCarousel: [
      `${PUBLIC_PHOTOS}/BOOST LAB/women-entrepreneur-summit-seoul/Group 2864.png`,
    ],
  },

  // N9NE
  "nobled-coffee": {
    cover: `${PUBLIC_PHOTOS}/N9NE/nobled-coffee/IMG_3839.png`,
    mainCarousel: [
      `${PUBLIC_PHOTOS}/N9NE/nobled-coffee/IMG_3839.png`,
    ],
  },

  // Independent
  "brujula-etica": {
    cover: `${PUBLIC_PHOTOS}/Independent/brujula-etica/Poster 1.png`,
  },
  "opuesto-sas": {
    cover: `${PUBLIC_PHOTOS}/Independent/opuesto-sas/Group 2412.png`,
  },

  // Travelling University
  "mentes-sin-fronteras": {
    cover: `${PUBLIC_PHOTOS}/Travelling University/mentes-sin-fronteras/2. Overview + Vision.png`,
  },
};

/** url-encodes a path the way Next.js <Image> expects (preserves slashes). */
export function encodeAsset(p: string | undefined): string | undefined {
  if (!p) return undefined;
  return "/" + p.split("/").map(encodeURIComponent).join("/");
}

/** Maps a deck spec into the resolved {label, photos[]} shape. */
export function resolveDecks(
  decks: DeckEntry[] | undefined,
  walk: (folder: string) => string[],
): { label: string; photos: string[] }[] {
  if (!decks) return [];
  return decks
    .map((d) => {
      if (d.photos && d.photos.length) {
        return { label: d.label, photos: d.photos.map((p) => encodeAsset(p)!) };
      }
      if (d.folder) {
        return { label: d.label, photos: walk(d.folder) };
      }
      return { label: d.label, photos: [] };
    })
    .filter((g) => g.photos.length > 0);
}
