import type { Locale } from "../types";
import type { ChapterId } from "../types";
import { HERO_MANIFEST, MENTION_MANIFEST, encodeAsset } from "../photo-manifest";
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

/** Path relative to /public, as stored in the photo manifest (not URL-encoded). */
export function getProjectCoverPath(slug: string): string | undefined {
  const key = LEGACY_IMAGE_KEY[slug] ?? slug;
  return HERO_MANIFEST[key]?.cover ?? MENTION_MANIFEST[key]?.cover;
}

export function getProjectCover(slug: string): string | undefined {
  return encodeAsset(getProjectCoverPath(slug));
}

/** "NomadHer · Seúl, 2025" → { chapter, place } for display. */
export function splitMeta(meta: string) {
  const [chapter, ...rest] = meta.split(" · ");
  return { chapter, place: rest.join(" · ") };
}
