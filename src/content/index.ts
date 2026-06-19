import { globalYouthSummit } from "./heroes/global-youth-summit";
import { misionesInternacionales } from "./heroes/misiones-internacionales";
import { sejongHackathon } from "./heroes/sejong-hackathon";
import { jalNomadHer } from "./heroes/jal-nomadher";
import { nomadHerApp } from "./heroes/nomadher-app";
import type { Hero, HeroSlug } from "./types";

export const heroes: Hero[] = [
  globalYouthSummit,
  misionesInternacionales,
  sejongHackathon,
  jalNomadHer,
  nomadHerApp,
];

export function getHero(slug: HeroSlug | string): Hero | undefined {
  return heroes.find((h) => h.slug === slug);
}

export function getHeroIndex(slug: HeroSlug | string): number {
  return heroes.findIndex((h) => h.slug === slug);
}

export function getNeighbors(slug: HeroSlug | string) {
  const i = getHeroIndex(slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? heroes[i - 1] : undefined,
    next: i < heroes.length - 1 ? heroes[i + 1] : undefined,
  };
}

export { chapters, chapterIntros, getChapter } from "./chapters";
export { mentions, getMentionsByChapter } from "./mentions";
export type { Mention } from "./mentions";
export * from "./about";
export * from "./types";
