import fs from "node:fs";
import path from "node:path";

/**
 * Photo folders for the Portafolio, one tree per chapter:
 *
 *   public/portafolio/capitulos/<NN-capitulo>/portada/         -> chapter card + chapter page hero
 *   public/portafolio/capitulos/<NN-capitulo>/proyectos/<slug>/
 *       portada/        cover of the project (card + top of the page)
 *       celular/        app screens (phone mockups)
 *       instagram/      posts, carousels, stories
 *       presentacion/   slides / decks
 *       visual/         everything else (branding, events, print)
 *       afiches/        posters and flyers, shown large with lots of space
 *       web/            website screenshots, each inside a laptop
 *       grilla/         a suggested feed grid, shown whole
 *       moodboard/      concept proposals; the last one is the chosen one
 *       portafolio/     a second deck (e.g. the company portfolio), shown as its own slider
 *       web/pantalla/   tall page screenshots that scroll inside the laptop of web/ (same number, 01, 02...)
 *       edicion-2/      a second edition: same instagram/ afiches/ grilla/ folders inside (edicion-3/... too)
 *
 * Slugs are the ones in src/content/portfolio/data.generated.json.
 */
const PUBLIC_DIR = path.join(process.cwd(), "public");
const BASE = "portafolio/capitulos";
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;
const VIDEO_EXT = /\.(mp4|webm|mov)$/i;

export const CHAPTER_FOLDERS: Record<string, string> = {
  nomadher: "01-nomadher",
  "boost-lab": "02-boost-lab",
  independent: "03-independiente",
  n9ne: "04-n9ne",
  ironhack: "05-ironhack",
  "travelling-university": "06-travelling-university",
};

export const PROJECT_PHOTO_KINDS = [
  "portada",
  "celular",
  "instagram",
  "presentacion",
  "visual",
  "afiches",
  "web",
  "grilla",
  "moodboard",
  "portafolio",
  "web/pantalla",
] as const;
export type ProjectPhotoKind = (typeof PROJECT_PHOTO_KINDS)[number];

const natural = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

/** The first edition lives in the project's own folders; edition N > 1 in `edicion-N/` inside them. */
const editionPath = (edition: number) => (edition > 1 ? `/edicion-${edition}` : "");

/** Image paths (relative to /public) inside a folder, in natural order. */
function listImages(relDir: string): string[] {
  try {
    return fs
      .readdirSync(path.join(PUBLIC_DIR, relDir))
      .filter((name) => !name.startsWith(".") && IMAGE_EXT.test(name))
      .sort(natural)
      .map((name) => `${relDir}/${name}`);
  } catch {
    return [];
  }
}

/** Photos and videos (in natural order) inside a folder, with their kind. */
function listMedia(relDir: string): { path: string; kind: "image" | "video" }[] {
  try {
    return fs
      .readdirSync(path.join(PUBLIC_DIR, relDir))
      .filter((name) => !name.startsWith(".") && (IMAGE_EXT.test(name) || VIDEO_EXT.test(name)))
      .sort(natural)
      .map((name) => ({
        path: `${relDir}/${name}`,
        kind: VIDEO_EXT.test(name) ? ("video" as const) : ("image" as const),
      }));
  } catch {
    return [];
  }
}

/**
 * Instagram posts of a project, as groups (one carousel each). Files straight inside `instagram/` are one post;
 * subfolders (`post-1/`, `post-2/`...) are one post each, in natural order.
 */
export function getProjectInstagramGroups(chapterId: string, slug: string, edition = 1): string[][] {
  const folder = CHAPTER_FOLDERS[chapterId];
  if (!folder) return [];
  const rel = `${BASE}/${folder}/proyectos/${slug}${editionPath(edition)}/instagram`;
  const flat = listImages(rel);
  let subdirs: string[] = [];
  try {
    subdirs = fs
      .readdirSync(path.join(PUBLIC_DIR, rel), { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
      .map((entry) => entry.name)
      .sort(natural);
  } catch {
    /* no folder yet */
  }
  const groups = [flat, ...subdirs.map((name) => listImages(`${rel}/${name}`))];
  return groups.filter((group) => group.length > 0);
}

/** `diario/` folder of a project: everything (photos and videos) for its "Visual Diary". */
export function getProjectDiaryPaths(chapterId: string, slug: string) {
  const folder = CHAPTER_FOLDERS[chapterId];
  return folder ? listMedia(`${BASE}/${folder}/proyectos/${slug}/diario`) : [];
}

export function getChapterCoverPath(chapterId: string): string | undefined {
  return getChapterCoverPaths(chapterId)[0];
}

/** Every photo in a chapter's `portada/` folder: with more than one, the chapter page shows a random one each visit. */
export function getChapterCoverPaths(chapterId: string): string[] {
  const folder = CHAPTER_FOLDERS[chapterId];
  return folder ? listImages(`${BASE}/${folder}/portada`) : [];
}

/**
 * Photo for the chapter's card in Portafolio: the `tarjeta/` folder if it has one,
 * otherwise the same photo as the chapter page (`portada/`).
 */
export function getChapterCardCoverPath(chapterId: string): string | undefined {
  const folder = CHAPTER_FOLDERS[chapterId];
  return (folder ? listImages(`${BASE}/${folder}/tarjeta`)[0] : undefined) ?? getChapterCoverPath(chapterId);
}

/** Folders a project-less chapter (Ironhack, Travelling University) can fill, directly inside the chapter. */
export const CHAPTER_CASE_KINDS = ["destacada", "visual", "presentacion", "instagram"] as const;
export type ChapterCaseKind = (typeof CHAPTER_CASE_KINDS)[number];

/**
 * Photos of a chapter that has no projects of its own:
 * public/portafolio/capitulos/<NN-capitulo>/<destacada|visual|presentacion|instagram>/
 */
export function getChapterPhotoPaths(chapterId: string, kind: ChapterCaseKind): string[] {
  const folder = CHAPTER_FOLDERS[chapterId];
  return folder ? listImages(`${BASE}/${folder}/${kind}`) : [];
}

export function getProjectPhotoPaths(
  chapterId: string,
  slug: string,
  kind: ProjectPhotoKind,
  edition = 1,
): string[] {
  const folder = CHAPTER_FOLDERS[chapterId];
  return folder ? listImages(`${BASE}/${folder}/proyectos/${slug}${editionPath(edition)}/${kind}`) : [];
}
