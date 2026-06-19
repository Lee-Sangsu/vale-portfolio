import type { AppLocale } from "@/i18n/routing";

export type Locale = AppLocale;

export type Localized<T> = Record<Locale, T>;
export type LocalizedString = Localized<string>;
export type LocalizedList = Localized<string[]>;

export type Stat = {
  value: string | LocalizedString;
  label: LocalizedString;
};

export type PartnerEntry = {
  name: string;
  note?: LocalizedString;
};

export type Speaker = {
  name: string;
  role: LocalizedString;
};

export type Quote = {
  text: string;
  author: LocalizedString;
};

export type ChapterId = "n9ne" | "travelling-university" | "independent" | "boost-lab" | "nomadher";

export type HeroSlug =
  | "global-youth-summit"
  | "misiones-internacionales"
  | "sejong-hackathon"
  | "jal-nomadher"
  | "nomadher-app";

export type HeroSection = {
  title: LocalizedString;
  body?: LocalizedString;
  bullets?: LocalizedList;
};

export type Hero = {
  slug: HeroSlug;
  chapter: ChapterId;
  number: string;
  brand: string;
  date: LocalizedString;
  location: string;
  title: LocalizedString;
  tagline: LocalizedString;
  context: LocalizedString;
  role?: LocalizedList;
  partners?: {
    title?: LocalizedString;
    items: PartnerEntry[];
  }[];
  speakers?: Speaker[];
  workshops?: LocalizedList;
  channels?: LocalizedList;
  results?: Stat[];
  quotes?: Quote[];
  sections?: HeroSection[];
  geography?: LocalizedString;
  status?: LocalizedString;
  whatsNext?: LocalizedString;
  heroImage?: string;
  gallery?: string[];
  accent?: string;
};

export type Chapter = {
  id: ChapterId;
  number: string;
  title: LocalizedString;
  dateRange: string;
  location: LocalizedString;
  projects: LocalizedList;
  starred?: boolean;
};
