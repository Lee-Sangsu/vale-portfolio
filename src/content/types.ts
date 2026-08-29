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

export type ChapterId =
  | "nomadher"
  | "boost-lab"
  | "independent"
  | "n9ne"
  | "ironhack"
  | "travelling-university";

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

export type ChapterImpact = {
  value: string;
  label: LocalizedString;
};

export type ChapterResponsibility = {
  title: LocalizedString;
  body: LocalizedString;
};

export type ChapterProject = {
  title: LocalizedString;
  label: LocalizedString;
  description: LocalizedString;
  href?: `/work/${string}`;
  image?: string;
};

export type ChapterDetail = {
  id: ChapterId;
  role: LocalizedString;
  intro: LocalizedString;
  accent: string;
  cover?: string;
  impact: ChapterImpact[];
  responsibilities: ChapterResponsibility[];
  projects: ChapterProject[];
};
