import type { Locale } from "../types";
import type { ChapterId } from "../types";
import { HERO_MANIFEST, MENTION_MANIFEST, encodeAsset } from "../photo-manifest";
import { versionedAsset } from "@/lib/project-photos";
import {
  getChapterCardCoverPath,
  getChapterCoverPath,
  getChapterCoverPaths,
  getProjectDiaryPaths,
  getProjectInstagramGroups,
  getChapterPhotoPaths,
  type ChapterCaseKind,
  getProjectPhotoPaths,
  type ProjectPhotoKind,
} from "@/lib/project-photos";
import data from "./data.generated.json";
import type {
  FilterId,
  LocalizedChapter,
  LocalizedProject,
  PortfolioData,
  Project,
} from "./types";

export * from "./types";

const portfolio = data as unknown as PortfolioData;

export const FILTER_IDS: FilterId[] = [
  "design",
  "ux-ui",
  "events",
  "marketing-content",
  "strategy",
];

export const FILTER_LABELS: Record<FilterId, Record<Locale, string>> = {
  design: { es: "Diseño gráfico", en: "Graphic design" },
  "ux-ui": { es: "UX/UI", en: "UX/UI" },
  events: { es: "Eventos y talleres", en: "Events & workshops" },
  "marketing-content": { es: "Marketing y contenido", en: "Marketing & content" },
  strategy: { es: "Estrategia", en: "Strategy" },
};

export const portfolioChapters = portfolio.chapters;
export const allProjects: Project[] = portfolio.chapters.flatMap((c) => c.projects);

export function localizeProject(project: Project, locale: Locale): LocalizedProject {
  return { ...project, t: project[locale] };
}

export function getChapter(id: string, locale: Locale): LocalizedChapter | undefined {
  const chapter = portfolio.chapters.find((c) => c.id === id);
  return chapter ? { ...chapter, t: chapter[locale], locale } : undefined;
}

export function getProject(slug: string, locale: Locale): LocalizedProject | undefined {
  const project = allProjects.find((p) => p.slug === slug);
  return project ? localizeProject(project, locale) : undefined;
}

/** Projects of a filter, in the order set in the source copy. */
export function getProjectsByFilter(filter: FilterId, locale: Locale): LocalizedProject[] {
  return (portfolio.filters[filter] ?? [])
    .map((slug) => allProjects.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p))
    .map((p) => localizeProject(p, locale));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}

/** Top-level projects of a chapter (children live inside their parent's page). */
export function getTopLevelProjects(chapterId: string): Project[] {
  return (portfolio.chapters.find((c) => c.id === chapterId)?.projects ?? []).filter(
    (p) => !p.parent,
  );
}

export function getChapterNeighbors(id: ChapterId) {
  const i = portfolio.chapters.findIndex((c) => c.id === id);
  return {
    prev: i > 0 ? portfolio.chapters[i - 1] : undefined,
    next: i < portfolio.chapters.length - 1 ? portfolio.chapters[i + 1] : undefined,
  };
}

/** Existing photos from the previous site, matched by project (slug or old id). */
const LEGACY_IMAGE_KEY: Record<string, string> = {
  "seoul-women-entrepreneur-summit": "women-entrepreneur-summit-seoul",
};

/** Path relative to /public (not URL-encoded). The project's own `portada` folder wins over the old photos. */
/** `versionedAsset` for an optional path. */
const versioned = (p: string | undefined) => (p ? versionedAsset(p) : undefined);

export function getProjectCoverPath(slug: string): string | undefined {
  const project = allProjects.find((p) => p.slug === slug);
  const key = LEGACY_IMAGE_KEY[slug] ?? slug;
  return (
    (project ? getProjectPhotoPaths(project.chapter, slug, "portada")[0] : undefined) ??
    HERO_MANIFEST[key]?.cover ??
    MENTION_MANIFEST[key]?.cover
  );
}

export function getProjectCover(slug: string): string | undefined {
  return versioned(getProjectCoverPath(slug));
}

/** Photos dropped in a project's `celular`, `instagram`, `presentacion` or `visual` folder (URL-encoded). */
export function getProjectPhotos(slug: string, kind: ProjectPhotoKind, edition = 1): string[] {
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return [];
  return getProjectPhotoPaths(project.chapter, slug, kind, edition).map((p) => versionedAsset(p));
}

/** The chapter's `portada` photo (URL-encoded), shown on its card and at the top of its page. */
export function getChapterCover(chapterId: string): string | undefined {
  return versioned(getChapterCoverPath(chapterId));
}

/** All the photos in the chapter's `portada` folder (URL-encoded), for the rotating hero. */
export function getChapterCovers(chapterId: string): string[] {
  return getChapterCoverPaths(chapterId).map((p) => versionedAsset(p));
}

/** Everything in a project's `diario/` folder, photos and videos (URL-encoded). */
export function getProjectDiary(slug: string): { src: string; kind: "image" | "video" }[] {
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return [];
  return getProjectDiaryPaths(project.chapter, slug).map((m) => ({ src: versionedAsset(m.path), kind: m.kind }));
}

/** Instagram posts of a project as groups, one carousel each (URL-encoded). */
export function getProjectInstagramPosts(slug: string, edition = 1): string[][] {
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return [];
  return getProjectInstagramGroups(project.chapter, slug, edition).map((group) => group.map((p) => versionedAsset(p)));
}

/** The chapter's card photo in Portafolio (URL-encoded): `tarjeta/` if filled, else `portada/`. */
export function getChapterCardCover(chapterId: string): string | undefined {
  return versioned(getChapterCardCoverPath(chapterId));
}

/** Photos in a project-less chapter's `destacada`, `visual`, `presentacion` or `instagram` folder (URL-encoded). */
export function getChapterPhotos(chapterId: string, kind: ChapterCaseKind): string[] {
  return getChapterPhotoPaths(chapterId, kind).map((p) => versionedAsset(p));
}

/** "NomadHer · Seúl, 2025" → { chapter, place } for display. */
export function splitMeta(meta: string) {
  const [chapter, ...rest] = meta.split(" · ");
  return { chapter, place: rest.join(" · ") };
}
