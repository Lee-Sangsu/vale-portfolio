import type { ChapterId, Locale } from "../types";

export type FilterId =
  | "design"
  | "ux-ui"
  | "events"
  | "marketing-content"
  | "strategy";

export type Stat = { value: string; label: string };

/** A display block inside an "extra" section of a project page. */
export type Block =
  | { type: "p"; text: string }
  | { type: "chips"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "rows"; rows: string[][] }
  | { type: "items"; items: { lead: string; text: string }[] }
  | { type: "table"; head: string[]; rows: string[][] };

export type Extra = {
  title: string;
  stats: Stat[] | boolean;
  blocks: Block[];
};

export type Case = {
  overview: { label: string; value: string }[];
  challenge: string;
  approach: string;
  result: string;
};

export type ProjectCard = {
  /** Short type + year, e.g. ["UX/UI", "2025 - 2026"] (carousel on the chapter page). */
  labels: string[];
  /** Chapter, city and year (filtered view). */
  meta: string;
  title: string;
  description: string;
  tags: string[];
  filters: FilterId[];
};

export type ProjectPage = Case & {
  title: string;
  description: string;
  purpose: string[];
  extras: Extra[];
};

export type ProjectLocale = { card: ProjectCard; page: ProjectPage };

export type Project = {
  slug: string;
  number: string;
  chapter: ChapterId;
  filters: FilterId[];
  es: ProjectLocale;
  en: ProjectLocale;
};

export type ChapterCard = {
  title: string;
  meta: string;
  description: string;
  tags: string[];
};

export type ChapterPage = {
  title: string;
  tagline: string;
  pill: string;
  label: string;
  band: string;
  stats: Stat[];
  responsibilities: { n: string; title: string; body: string }[];
  projectNames: string[];
  case: Case | null;
};

export type ChapterLocale = { card: ChapterCard; page: ChapterPage };

export type PortfolioChapter = {
  id: ChapterId;
  number: string;
  es: ChapterLocale;
  en: ChapterLocale;
  projects: Project[];
};

export type PortfolioData = {
  chapters: PortfolioChapter[];
  filters: Record<FilterId, string[]>;
};

export type LocalizedProject = Project & { t: ProjectLocale };
export type LocalizedChapter = PortfolioChapter & { t: ChapterLocale; locale: Locale };
