import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WorkTogether } from "@/components/site/WorkTogether";
import { CaseSections } from "@/components/site/project/CaseSections";
import { ProjectExtras } from "@/components/site/project/ProjectExtras";
import { InstagramEmbeds } from "@/components/site/project/InstagramEmbeds";
import { SlideCarousel } from "@/components/site/project/SlideCarousel";
import { getImageAspect } from "@/lib/image-aspect";
import { HeroMosaic, type MosaicItem } from "@/components/site/project/HeroMosaic";
import {
  HeroMedia,
  TemplateGallery,
  type TemplatePhotos,
} from "@/components/site/project/ProjectTemplates";
import {
  allProjects,
  getChapter,
  getProject,
  getProjectCover,
  getProjectDiary,
  getProjectInstagramPosts,
  getProjectPhotos,
  getProjectScreenGroups,
  getTopLevelProjects,
} from "@/content/portfolio";
import { CHAPTER_FOLDERS, isVideoPath } from "@/lib/project-photos";
import type { Locale } from "@/content/types";

/** Own heading for a project's deck ("ppt") or poster ("afiches") section. */
const SECTION_TITLES: Record<
  string,
  Partial<
    Record<
      "ppt" | "afiches" | "visual" | "portafolio" | "web",
      Record<Locale, string>
    >
  >
> = {
  "nobled-coffee": { ppt: { es: "Brandbook", en: "Brandbook" } },
  "teampreneurship-cooperative": {
    ppt: { es: "Guía de marca", en: "Brand guide" },
  },
  "opuesto-sas": {
    ppt: { es: "Brandbook", en: "Brandbook" },
  },
  "eats-real": { afiches: { es: "Campaña", en: "Campaign" } },
  "nomadher-app": {
    afiches: { es: "App Store", en: "App Store" },
    portafolio: { es: "Onboarding", en: "Onboarding" },
  },
  "bloggers-program": {
    afiches: { es: "Emails del programa", en: "Program emails" },
  },
  "applied-brand": {
    web: {
      es: "Newsletters y emails del user journey",
      en: "Newsletters and user-journey emails",
    },
  },
  "she-can-travel-anywhere-seoul": {
    visual: { es: "Todo lo que se diseñó", en: "Everything that was designed" },
  },
  "instagram-content": {
    portafolio: { es: "Plantillas de stories", en: "Story templates" },
  },
  "misiones-internacionales": {
    ppt: { es: "Los itinerarios", en: "The itineraries" },
  },
  "seoul-women-entrepreneur-summit": {
    ppt: { es: "Las slides del día", en: "The day's slides" },
  },
  "global-youth-summit": {
    ppt: { es: "Dossier para aliados", en: "Partner dossier" },
  },
  "sejong-hackathon": {
    ppt: { es: "Las plantillas de trabajo", en: "The worksheets" },
    afiches: { es: "Los reconocimientos", en: "The awards" },
  },
  "jal-nomadher": {
    visual: { es: "El lanzamiento en la app", en: "The launch inside the app" },
  },
  "city-lounge": {
    portafolio: { es: "Propuestas y flujos", en: "Proposals and flows" },
  },
  "travel-buddy-meetups": {
    portafolio: { es: "Flujos y versiones", en: "Flows and versions" },
  },
  "levels-badges-perks": {
    portafolio: {
      es: "Niveles, badges y perks",
      en: "Levels, badges and perks",
    },
  },
  "brujula-etica": {
    afiches: { es: "Pósters e historias", en: "Posters and stories" },
  },
  "hola-guesthouse-jeju": {
    ppt: { es: "Brand guidelines", en: "Brand guidelines" },
    afiches: { es: "Folleto", en: "Brochure" },
  },
};

/**
 * Pieces for the Instagram ring in the hero. With a second edition (all pieces vertical, 4:5) the ring shows only
 * those, so every tile has the same size: the first piece of each post, then the second of each post up to 7.
 */
function heroPieces(slug: string): string[] {
  const second = getProjectInstagramPosts(slug, 2);
  // Clips (reels) stay in their post; the ring and the collage only take still pieces.
  if (!second.length)
    return getProjectInstagramPosts(slug)
      .flat()
      .filter((p) => !isVideoPath(p));
  const firsts = second.map((group) => group[0]);
  const seconds = second
    .filter((group) => group.length > 1)
    .map((group) => group[1]);
  return [...firsts, ...seconds].slice(0, 7);
}

/** With several editions every edition shows all its posts as one carousel, one piece after another. */
function oneCarouselPerEdition(posts: string[][], slug: string): string[][] {
  return getProjectInstagramPosts(slug, 2).length ? [posts.flat()] : posts;
}

/** Pages whose other screens live in their child projects: only these phone-screen groups show on the page itself. */
const ONLY_SCREEN_GROUPS: Record<string, string[]> = {
  "nomadher-app": ["onboarding"],
};

/** Pages whose phone screens sit next to the text section they belong to (same title), instead of in a gallery of their own. */
const SCREENS_BESIDE_TEXT = new Set(["city-lounge", "travel-buddy-meetups", "levels-badges-perks"]);

/** Projects whose children are sections of their own page instead of cards linking to another page. */
const INLINE_CHILDREN = new Set(["boost-lab-workshops"]);

/** Instagram account shown on the posts of each chapter; other projects show their own title. */
const INSTAGRAM_ACCOUNTS: Record<string, string> = {
  nomadher: "nomad_her",
  "boost-lab": "boostlab.glb",
};

/** Keywords of each moodboard proposal, shown under it. */
const MOODBOARD_LABELS: Record<string, Record<Locale, string[]>> = {
  "brujula-etica": {
    es: [
      "Juventud, proyección, pertenencia",
      "Impacto, determinación, acción",
      "Creatividad, flexibilidad, crecimiento",
    ],
    en: [
      "Youth, projection, belonging",
      "Impact, determination, action",
      "Creativity, flexibility, growth",
    ],
  },
};

/** Projects whose Visual Diary runs in more than two rows. */
/** Splits a description into sentences (a period followed by a space and a capital letter or quote starts a new one). */
function splitSentences(text: string) {
  return text
    .split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ¿¡"“])/)
    .map((t) => t.trim())
    .filter(Boolean);
}

/** Titles for the `celular/<group>/` folders (the folder name without its number prefix). */
const SCREEN_GROUP_TITLES: Record<string, Record<Locale, string>> = {
  banners: { es: "Banners en la app", en: "In-app banners" },
  "banners-figma": {
    es: "Banners de la app · sistema en Figma",
    en: "App banners · Figma system",
  },
  "banners-canva": {
    es: "Banners · plantillas editables en Canva",
    en: "Banners · editable Canva templates",
  },
  papeleria: {
    es: "Papelería · tarjetas y firma de correo",
    en: "Stationery · cards and email signature",
  },
  senaletica: { es: "Señalética del viaje", en: "Trip signage" },
  carrusel: { es: "Carrusel de lanzamiento", en: "Launch carousel" },
  "lounge-where": { es: "Fase 1 · Where to?", en: "Phase 1 · Where to?" },
  "lounge-when": { es: "Fase 2 · When", en: "Phase 2 · When" },
  "lounge-city": { es: "Fase 3 · La página de ciudad", en: "Phase 3 · The city page" },
  "tb-people": { es: "La pestaña People", en: "The People tab" },
  "tb-meetups": { es: "Women Meetups", en: "Women Meetups" },
  "tb-status": { es: "Travel Status", en: "Travel Status" },
  "tb-after": { es: "Antes y después del meetup", en: "Before and after the meetup" },
  "tb-v3": { es: "Travel Buddy V3", en: "Travel Buddy V3" },
  "ex-states": { es: "Explore · tres estados", en: "Explore · three states" },
  "ex-search": { es: "La búsqueda", en: "The search" },
  "ex-chat": { es: "El chat de ciudad", en: "The city chat" },
  "ex-empty": { es: "Cuando la ciudad está vacía", en: "When the city is empty" },
  "pp-seoul": { es: "People · Seúl", en: "People · Seoul" },
  "pp-weekly": { es: "Every week · sin host", en: "Every week · no host" },
  "pp-upfor": { es: "What are you up for?", en: "What are you up for?" },
  "pp-match": { es: "El match y el chat", en: "The match and the chat" },
  "lv-perfil": { es: "El perfil", en: "The profile" },
  "lv-levels": { es: "Los niveles", en: "The levels" },
  "lv-exp": { es: "Experiences · banner de host", en: "Experiences · host banner" },
  "lv-inbox": { es: "Notificaciones e Inbox", en: "Notifications and Inbox" },
  "lv-perks": { es: "Perks y wallet", en: "Perks and wallet" },
  "carrusel-condado": { es: "Carrusel · edición con el condado", en: "Carousel · county edition" },
  "superalink-experience": { es: "Superalink · experience covers", en: "Superalink · experience covers" },
  "post-fundadoras": { es: "Post · las fundadoras", en: "Post · the founders" },
  experiencia: { es: "Experience posts", en: "Experience posts" },
  impresos: { es: "Pendones del viaje", en: "Trip banners" },
  creadoras: { es: "Post · las diez creadoras", en: "Post · the ten creators" },
  "superalink-carrusel": { es: "Superalink · carrusel", en: "Superalink · carousel" },
  "superalink-posts": { es: "Superalink · posts y banners", en: "Superalink · posts and banners" },
  "superalink-app": { es: "Superalink · dentro de la app", en: "Superalink · inside the app" },
  "fete-carrusel": { es: "Fête de la Musique · carrusel", en: "Fête de la Musique · carousel" },
  "fete-stories": { es: "Fête de la Musique · stories", en: "Fête de la Musique · stories" },
  "fete-afiches": { es: "Fête de la Musique · afiches y banner", en: "Fête de la Musique · posters and banner" },
  perks: { es: "NomadHer Perks · lanzamiento", en: "NomadHer Perks · launch" },
  bingo: { es: "Bingo · lucky draw card", en: "Bingo · lucky draw card" },
  posters: { es: "Pósters y piezas de venta", en: "Posters and ticket pieces" },
  "mapa-y-programa": { es: "Mapa y programa", en: "Map and program" },
  "banners-y-senaletica": {
    es: "Banners y señalética del venue",
    en: "Venue banners and signage",
  },
  speakers: { es: "Posts de speakers", en: "Speaker posts" },
  embajadoras: {
    es: "Embajadoras y voluntarias",
    en: "Ambassadors and volunteers",
  },
  postal: { es: "Postal", en: "Postcard" },
  "stories-community": {
    es: "Stories para la comunidad",
    en: "Community stories",
  },
  "posts-speakers-ig": {
    es: "Posts de speakers en Instagram",
    en: "Speaker posts on Instagram",
  },
  "ipad-y-flyers": {
    es: "iPad de los talleres y flyers A6",
    en: "Workshop iPad and A6 flyers",
  },
  "launch-posts": { es: "Launch posts", en: "Launch posts" },
  "experience-posts": { es: "Experience posts", en: "Experience posts" },
  "experience-cover": { es: "Experience cover", en: "Experience cover" },
  onboarding: { es: "Onboarding", en: "Onboarding" },
  lounge: { es: "Lounge", en: "Lounge" },
  "travel-buddy": { es: "Travel Buddy", en: "Travel Buddy" },
  experiences: { es: "Experiences", en: "Experiences" },
  perfil: { es: "Perfil", en: "Profile" },
  niveles: { es: "Niveles y perks", en: "Levels and perks" },
};

const DIARY_ROWS: Record<string, number> = {
  "seoul-women-entrepreneur-summit": 4,
};

/** Live Instagram posts shown on a project page (public posts only, rendered with Instagram's embed). */
type EmbedGroup = { title?: { es: string; en: string }; urls: string[] };
const INSTAGRAM_EMBEDS: Record<string, EmbedGroup[]> = {
  "instagram-content": [
    {
      title: {
        es: "Convocatorias y anuncios",
        en: "Open calls and announcements",
      },
      urls: [
        "https://www.instagram.com/nomad_her/p/De1KaFalfQ1/",
        "https://www.instagram.com/nomad_her/p/DdRrhPekYMx/",
        "https://www.instagram.com/nomad_her/p/Dbc6ldelUqC/",
        "https://www.instagram.com/nomad_her/p/DYRk2CmkdpT/",
      ],
    },
    {
      title: {
        es: "Serie · What's happening this month",
        en: "Series · What's happening this month",
      },
      urls: [
        "https://www.instagram.com/nomad_her/p/Dc0DI27FQZ-/",
        "https://www.instagram.com/p/DZrINmMFRR7/",
        "https://www.instagram.com/p/DVL35UBEVIS/",
      ],
    },
    {
      title: {
        es: "Serie · Historical women",
        en: "Series · Historical women",
      },
      urls: [
        "https://www.instagram.com/nomad_her/p/Ddb6jobkaFi/",
        "https://www.instagram.com/p/Daj9d5AFbwr/",
      ],
    },
    {
      title: {
        es: "Inspiración y empoderamiento",
        en: "Inspiration and empowerment",
      },
      urls: [
        "https://www.instagram.com/nomad_her/p/DVsK2G3ER5-/",
        "https://www.instagram.com/nomad_her/p/DZoVOm-kW9f/",
        "https://www.instagram.com/nomad_her/p/DT-t8GaAdU-/",
      ],
    },
    {
      title: { es: "How to · tips de viaje", en: "How to · travel tips" },
      urls: [
        "https://www.instagram.com/nomad_her/p/DUkeaVSkXZU/",
        "https://www.instagram.com/nomad_her/p/DTuzgp4EVQ4/",
        "https://www.instagram.com/nomad_her/p/DTaWVKFkX4z/",
        "https://www.instagram.com/nomad_her/p/DTfoDMHkbsm/",
        "https://www.instagram.com/nomad_her/p/DSm9GAyEXxG/",
        "https://www.instagram.com/nomad_her/p/DSu47RpkSKF/",
      ],
    },
    {
      title: {
        es: "Co-branded con mi cuenta",
        en: "Co-branded with my own account",
      },
      urls: [
        "https://www.instagram.com/nomad_her/p/DcQY1tDlZum/",
        "https://www.instagram.com/nomad_her/p/DazdqXTFWXJ/",
      ],
    },
  ],
  "bloggers-program": [
    {
      title: {
        es: "Official NomadHer Bloggers",
        en: "Official NomadHer Bloggers",
      },
      urls: [
        "https://www.instagram.com/p/DcvLvMdkZWd/",
        "https://www.instagram.com/p/DdVROg5EZLf/",
        "https://www.instagram.com/p/Ddl_G6DEeYH/",
      ],
    },
    {
      title: {
        es: "Travel Content Creator Pilot · edición completa",
        en: "Travel Content Creator Pilot · full edition",
      },
      urls: [
        "https://www.instagram.com/p/DWCZ6LwkSvx/",
        "https://www.instagram.com/reel/DWPHkLtzGas/",
        "https://www.instagram.com/reel/DXcJ9VBEYht/",
      ],
    },
    {
      title: {
        es: "Travel Content Creator Pilot · un post por comunidad",
        en: "Travel Content Creator Pilot · one post per community",
      },
      urls: [
        "https://www.instagram.com/p/DTxdpL4EQ1a/",
        "https://www.instagram.com/p/DUV1XLTEcyv/",
        "https://www.instagram.com/p/DVe0dbfkuLm/",
      ],
    },
  ],
};

/** Projects whose live Instagram posts open the galleries (right after the case text) and replace the post files. */
const EMBEDS_FIRST = new Set(["instagram-content"]);

/** Projects whose visual/ photo is only the page cover: no extra "Galería" of it below the decks. */
const NO_VISUAL_GALLERY = new Set(["hola-guesthouse-jeju"]);

/** Projects that keep the original gallery look: tall deck slides and Instagram posts in two big columns. */
const CLASSIC_GALLERY = new Set([
  "brujula-etica",
  "teampreneurship-cooperative",
]);

/** Order of a project's extra galleries when it differs from the default one (earlier = higher on the page). */
const EXTRA_ORDER: Record<string, string[]> = {
  "opuesto-sas": ["web", "ppt", "portafolio"],
};
function extraRank(slug: string, template: string) {
  const order = EXTRA_ORDER[slug];
  const i = order ? order.indexOf(template) : -1;
  return i === -1 ? 100 : i; // the rest keeps its order (sort is stable)
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    allProjects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const project = getProject(slug, locale as Locale);
  if (!project) return {};
  return {
    title: project.t.page.title,
    description: project.t.card.description,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const es = locale === "es";

  const project = getProject(slug, locale);
  if (!project) notFound();

  const chapter = getChapter(project.chapter, locale)!;
  const { page, card } = project.t;
  const cover = getProjectCover(project.slug);

  // Photos dropped in the project's folders feed the template (app / instagram / ppt / visual).
  const screenGroups = getProjectScreenGroups(project.slug).filter(
    (g) => !ONLY_SCREEN_GROUPS[project.slug] || ONLY_SCREEN_GROUPS[project.slug].includes(g.name),
  );
  // Launch pieces sorted in folders (visual/01-banners, 02-launch-posts...): one titled row per folder.
  const launchGroups = getProjectScreenGroups(project.slug, "visual").map(
    (g) => ({
      title: SCREEN_GROUP_TITLES[g.name]?.[locale] ?? g.name,
      items: g.items,
    }),
  );
  const photos: TemplatePhotos = {
    portada: cover,
    celular: getProjectPhotos(project.slug, "celular").length
      ? getProjectPhotos(project.slug, "celular")
      : screenGroups.flatMap((g) => g.items),
    screenGroups: screenGroups.map((g) => ({
      title: SCREEN_GROUP_TITLES[g.name]?.[locale] ?? g.name,
      items: g.items,
    })),
    // All Instagram pieces of the project, flat (the ring in the hero uses them); posts keep their own groups below.
    instagram: heroPieces(project.slug),
    presentacion: getProjectPhotos(project.slug, "presentacion"),
    // Only the loose files: pieces sorted in subfolders render as titled rows, never as the hero collage.
    visual: getProjectPhotos(project.slug, "visual"),
    // Pieces sorted in visual/ subfolders: the loose files on top are the hero collage; the rows show the rest.
    visualHeroOnly:
      launchGroups.length > 0 &&
      getProjectPhotos(project.slug, "visual").length > 0,
    afiches: getProjectPhotos(project.slug, "afiches"),
    web: getProjectPhotos(project.slug, "web"),
    grilla: getProjectPhotos(project.slug, "grilla"),
    moodboard: getProjectPhotos(project.slug, "moodboard"),
    portafolio: getProjectPhotos(project.slug, "portafolio"),
    webScreens: getProjectPhotos(project.slug, "web/pantalla"),
    instagramPosts: oneCarouselPerEdition(
      getProjectInstagramPosts(project.slug),
      project.slug,
    ),
    diario: getProjectDiary(project.slug),
    diaryRows: DIARY_ROWS[project.slug],
  };
  // A second edition (edicion-2/ folder) gets its own block after the first one.
  const secondPosts = getProjectInstagramPosts(project.slug, 2);
  const secondEdition: TemplatePhotos | null =
    secondPosts.length || getProjectPhotos(project.slug, "afiches", 2).length
      ? {
          portada: cover,
          celular: [],
          instagram: secondPosts.flat(),
          presentacion: [],
          visual: [],
          afiches: getProjectPhotos(project.slug, "afiches", 2),
          grilla: getProjectPhotos(project.slug, "grilla", 2),
          // Many posts: one carousel with all the pieces, one after another.
          instagramPosts: [secondPosts.flat()],
        }
      : null;
  const account = INSTAGRAM_ACCOUNTS[project.chapter] ?? page.title;
  const folder = `public/portafolio/capitulos/${CHAPTER_FOLDERS[project.chapter]}/proyectos/${project.slug}`;
  const hints = {
    celular: `${folder}/celular/`,
    instagram: `${folder}/instagram/`,
    presentacion: `${folder}/presentacion/`,
    visual: `${folder}/visual/`,
  };
  // Marca aplicada opens with a wall of everything on the page: the covers of the projects inside, banners,
  // stationery and website screens, so the whole body of work shows at a glance.
  const mosaic =
    project.slug === "applied-brand"
      ? await (async () => {
          const pick = <T,>(arr: T[], idx: number[]) => idx.map((i) => arr[i]).filter(Boolean);
          const groups = Object.fromEntries(
            getProjectScreenGroups(project.slug, "visual").map((g) => [g.name, g.items]),
          );
          const kids = project.children
            .map((childSlug) => ({ child: getProject(childSlug, locale), src: getProjectCover(childSlug) }))
            .filter((k): k is { child: NonNullable<typeof k.child>; src: string } => Boolean(k.child && k.src))
            .map((k) => ({ src: k.src, href: `/work/${k.child.slug}`, label: k.child.t.card.title }));
          const loose = [
            ...photos.visual.slice(0, 1),
            ...pick(groups["banners-figma"] ?? [], [2, 0]),
            ...pick(groups["banners-canva"] ?? [], [0]),
            ...pick(groups["papeleria"] ?? [], [0, 2]),
          ].map((src) => ({ src }));
          // Interleave covers and pieces so every row (and its first three tiles on phones) mixes both.
          const mixed: { src: string; href?: string; label?: string }[] = [];
          const max = Math.max(kids.length, loose.length);
          for (let i = 0; i < max; i++) {
            if (kids[i]) mixed.push(kids[i]);
            if (loose[i]) mixed.push(loose[i]);
          }
          const items: MosaicItem[] = await Promise.all(
            mixed.map(async (m) => ({ ...m, aspect: await getImageAspect(m.src) })),
          );
          return <HeroMosaic items={items} title={page.title} />;
        })()
      : null;
  const media =
    mosaic ??
    (await HeroMedia({
      template: project.template,
      photos,
      title: page.title,
    }));
  // Instagram and the visual collage open with a centered title and description above the pictures.
  const centered =
    (project.template === "instagram" || project.template === "visual") &&
    Boolean(media);
  const slidesLeft =
    (project.template === "ppt" || project.template === "app") &&
    Boolean(media);
  // The Instagram ring opens the page: it sits above the title, the text follows.
  const mediaFirst = project.template === "instagram" && Boolean(media);
  const launchFirst =
    project.template === "instagram" &&
    (photos.visual.length > 0 || launchGroups.length > 0);

  const parent = project.parent
    ? getProject(project.parent, locale)
    : undefined;
  const children = project.children
    .map((childSlug) => getProject(childSlug, locale))
    .filter((child): child is NonNullable<typeof child> => Boolean(child));
  const hasChildCards =
    children.length > 0 && !INLINE_CHILDREN.has(project.slug);

  // Previous/next stay inside the same group: siblings of a child, or the chapter's top-level projects.
  const siblings = parent
    ? parent.children
        .map((childSlug) => allProjects.find((p) => p.slug === childSlug))
        .filter((p): p is NonNullable<typeof p> => Boolean(p))
    : getTopLevelProjects(project.chapter);
  const index = siblings.findIndex((p) => p.slug === project.slug);
  const prev = index > 0 ? siblings[index - 1] : undefined;
  const next = index < siblings.length - 1 ? siblings[index + 1] : undefined;

  return (
    <main>
      <section className="relative overflow-hidden bg-white">
        <SiteNav tone="dark" />
        <div
          className={`mx-auto max-w-[1280px] px-5 pt-[150px] pb-20 sm:px-8 md:pt-[180px] md:pb-32 ${
            media && slidesLeft
              ? "grid items-center gap-12 lg:grid-cols-2"
              : media
                ? "flex flex-col gap-12"
                : cover
                  ? "grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]"
                  : ""
          }`}
        >
          {media && slidesLeft ? (
            <div className="lg:order-first">{media}</div>
          ) : null}
          {media && mediaFirst ? media : null}
          <div
            className={
              centered ? "mx-auto max-w-[760px] text-center" : "max-w-[760px]"
            }
          >
            {parent ? (
              <Link
                href={`/work/${parent.slug}`}
                className="font-inter text-ink2 mr-5 mb-5 inline-flex items-center gap-2 text-[14px] font-medium transition-opacity hover:opacity-70"
              >
                <span aria-hidden="true">←</span>
                {es ? "Parte de" : "Part of"} {parent.t.card.title}
              </Link>
            ) : null}
            <Link
              href={`/chapters/${project.chapter}`}
              className="font-inter text-muted text-[13px] font-medium tracking-[0.08em] transition-colors hover:text-black"
            >
              [ {es ? "CAPÍTULO" : "CHAPTER"} {chapter.number} ·{" "}
              {chapter.t.page.label} ]
            </Link>
            <h1 className="font-inter text-ink2 mt-5 text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] font-bold">
              {page.title}
            </h1>
            {/* Each sentence on its own line, the way a caption reads. */}
            <div className="font-inter text-ink mt-6 space-y-3 text-[17px] leading-[1.55] sm:text-[19px]">
              {splitSentences(page.description).map((sentence, i) => (
                <p key={i}>{sentence}</p>
              ))}
            </div>
            <p className="font-inter text-muted mt-5 text-[14px] font-medium">
              {card.meta}
            </p>
          </div>

          {media && !slidesLeft && !mediaFirst ? <div className="max-lg:-order-1">{media}</div> : null}

          {!media && cover ? (
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[18px] max-lg:-order-1 bg-[#ecece7] shadow-[0_12px_32px_rgba(0,0,0,0.12)] lg:aspect-auto lg:min-h-[560px] lg:self-stretch">
              <Image
                src={cover}
                alt={page.title}
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>

        {/* Purpose or highlights: always after the pictures, as a full-width editorial row under the hero. */}
        {page.purpose.length ? (
          <div className="mx-auto -mt-6 max-w-[1280px] px-5 pb-20 sm:px-8 md:-mt-12 md:pb-32">
            <span className="font-inter text-muted text-[12px] font-medium tracking-[0.16em] uppercase">
              {page.purposeLabel ?? (es ? "Propósito" : "Purpose")}
            </span>
            <ul
              className="mt-4 grid gap-x-10 gap-y-6 sm:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
              style={{ ["--cols" as string]: page.purpose.length }}
            >
              {page.purpose.map((item, i) => (
                <li key={item} className="border-ink2 border-t pt-4">
                  <span className="font-inter text-muted text-[12px] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display text-ink2 mt-3 max-w-[420px] text-[28px] leading-[0.95] tracking-[0.01em] text-balance sm:text-[34px]">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <CaseSections data={page} locale={locale} />
      {INSTAGRAM_EMBEDS[project.slug] && EMBEDS_FIRST.has(project.slug) ? (
        <InstagramEmbeds
          groups={INSTAGRAM_EMBEDS[project.slug].map((g) => ({
            title: g.title ? (es ? g.title.es : g.title.en) : undefined,
            urls: g.urls,
          }))}
          title={es ? "Publicado en Instagram" : "Live on Instagram"}
          note={
            es
              ? "Los posts reales, tal como se ven en la cuenta."
              : "The real posts, as they live on the account."
          }
        />
      ) : null}
      {(photos.moodboard ?? []).length ? (
        <TemplateGallery
          account={account}
          tallSlides={CLASSIC_GALLERY.has(project.slug)}
          classicPosts={CLASSIC_GALLERY.has(project.slug)}
          template="moodboard"
          photos={photos}
          locale={locale}
          hints={hints}
          labels={MOODBOARD_LABELS[project.slug]?.[locale]}
        />
      ) : null}
      {secondEdition ? (
        <TemplateGallery
          account={account}
          tallSlides={CLASSIC_GALLERY.has(project.slug)}
          classicPosts={CLASSIC_GALLERY.has(project.slug)}
          template="edition"
          photos={photos}
          locale={locale}
          hints={hints}
          title={es ? "Primera edición" : "First edition"}
        />
      ) : null}
      {/* On a campaign page the pieces that launched it (app banner, Lounge post, Experience page) come before the Instagram posts. */}
      {launchGroups.length ? (
        <section className="bg-white py-24 sm:py-36">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
            <h2 className="font-inter text-ink2 text-center text-[32px] leading-tight font-semibold">
              {SECTION_TITLES[project.slug]?.visual?.[locale] ??
                (es ? "Todo lo que se diseñó" : "Everything that was designed")}
            </h2>
            <div className="mt-12 space-y-14">
              {await Promise.all(
                launchGroups.map(async (group) => {
                  const sized = await Promise.all(
                    group.items.map(async (src) => ({
                      src,
                      aspect: await getImageAspect(src),
                    })),
                  );
                  return (
                    <div key={group.title}>
                      <h3 className="font-inter text-ink2 text-[18px] font-semibold sm:text-[20px]">
                        {group.title}
                      </h3>
                      {/* One slider per section, tall, so each design can be seen properly. */}
                      <SlideCarousel
                        tall
                        slides={sized}
                        previousLabel={es ? "Pieza anterior" : "Previous piece"}
                        nextLabel={es ? "Pieza siguiente" : "Next piece"}
                      />
                    </div>
                  );
                }),
              )}
            </div>
          </div>
        </section>
      ) : launchFirst ? (
        <TemplateGallery
          account={account}
          tallSlides={CLASSIC_GALLERY.has(project.slug)}
          classicPosts={CLASSIC_GALLERY.has(project.slug)}
          template="visual"
          photos={photos}
          locale={locale}
          hints={hints}
          visualInHero={false}
          title={SECTION_TITLES[project.slug]?.visual?.[locale]}
        />
      ) : null}
      {/* No main gallery when there is nothing to show: a visual project without photos (its work lives on Instagram). */}
      {(hasChildCards && project.template === "visual") ||
      (project.template === "visual" &&
        photos.visual.length === 0 &&
        (photos.diario ?? []).length === 0) ||
      EMBEDS_FIRST.has(project.slug) ||
      SCREENS_BESIDE_TEXT.has(project.slug) ||
      // The titled rows already show every piece: no second "Galería" of the same files.
      (project.template === "visual" && launchGroups.length > 0) ? null : (
        <TemplateGallery
          account={account}
          tallSlides={CLASSIC_GALLERY.has(project.slug)}
          classicPosts={CLASSIC_GALLERY.has(project.slug)}
          template={project.template}
          photos={photos}
          locale={locale}
          hints={hints}
          title={
            project.template === "ppt"
              ? SECTION_TITLES[project.slug]?.ppt?.[locale]
              : project.template === "app" && ONLY_SCREEN_GROUPS[project.slug]?.length === 1
                ? photos.screenGroups?.[0]?.title
                : secondEdition && project.template === "instagram"
                ? "Social Media Carousel · " + (es ? "Versión 1" : "Version 1")
                : undefined
          }
        />
      )}
      {/* A project can also carry other kinds of photos (a brandbook deck, phone screens...): show each one that has files. */}
      {(
        [
          ["ppt", photos.presentacion],
          ["portafolio", photos.portafolio ?? []],
          ["instagram", EMBEDS_FIRST.has(project.slug) ? [] : photos.instagram],
          ["app", photos.celular],
          ["afiches", photos.afiches ?? []],
          ["web", photos.web ?? []],
          ["grilla", photos.grilla ?? []],
          // The Visual Diary (diario/) rides on the visual gallery, so it counts even when visual/ is empty.
          // A page that lists its child projects ("Dentro de este proyecto") keeps the hero collage only: no extra gallery.
          [
            "visual",
            launchFirst || hasChildCards || NO_VISUAL_GALLERY.has(project.slug)
              ? []
              : photos.visual.length
                ? photos.visual
                : (photos.diario ?? []),
          ],
        ] as const
      )
        .filter(
          ([template, list]) =>
            template !== project.template && list.length > 0,
        )
        .sort(
          ([a], [b]) => extraRank(project.slug, a) - extraRank(project.slug, b),
        )
        .map(([template]) => (
          <TemplateGallery
            account={account}
            tallSlides={CLASSIC_GALLERY.has(project.slug)}
            classicPosts={CLASSIC_GALLERY.has(project.slug)}
            key={template}
            template={template}
            photos={photos}
            locale={locale}
            hints={hints}
            visualInHero={false}
            title={
              template === "ppt" ||
              template === "afiches" ||
              template === "visual" ||
              template === "portafolio" ||
              template === "web"
                ? SECTION_TITLES[project.slug]?.[template]?.[locale]
                : undefined
            }
          />
        ))}
      {secondEdition ? (
        <>
          <TemplateGallery
            account={account}
            tallSlides={CLASSIC_GALLERY.has(project.slug)}
            classicPosts={CLASSIC_GALLERY.has(project.slug)}
            template="edition"
            photos={photos}
            locale={locale}
            hints={hints}
            title={es ? "Segunda edición" : "Second edition"}
            body={
              es
                ? "Un año después, volvieron con una nueva edición. Querían mantener el mismo concepto, pero jugar un poco más con las líneas."
                : "A year later they came back with a new edition. They wanted to keep the same concept, but play a bit more with the lines."
            }
          />
          {secondEdition.instagram.length ? (
            <TemplateGallery
              account={account}
              tallSlides={CLASSIC_GALLERY.has(project.slug)}
              classicPosts={CLASSIC_GALLERY.has(project.slug)}
              template="instagram"
              photos={secondEdition}
              locale={locale}
              hints={hints}
              title={
                "Social Media Carousel · " + (es ? "Versión 2" : "Version 2")
              }
            />
          ) : null}
          {(secondEdition.afiches ?? []).length ? (
            <TemplateGallery
              account={account}
              tallSlides={CLASSIC_GALLERY.has(project.slug)}
              classicPosts={CLASSIC_GALLERY.has(project.slug)}
              template="afiches"
              photos={secondEdition}
              locale={locale}
              hints={hints}
              title={SECTION_TITLES[project.slug]?.afiches?.[locale]}
            />
          ) : null}
          {(secondEdition.grilla ?? []).length ? (
            <TemplateGallery
              account={account}
              tallSlides={CLASSIC_GALLERY.has(project.slug)}
              classicPosts={CLASSIC_GALLERY.has(project.slug)}
              template="grilla"
              photos={secondEdition}
              locale={locale}
              hints={hints}
            />
          ) : null}
        </>
      ) : null}
      {INSTAGRAM_EMBEDS[project.slug] && !EMBEDS_FIRST.has(project.slug) ? (
        <InstagramEmbeds
          groups={INSTAGRAM_EMBEDS[project.slug].map((g) => ({
            title: g.title ? (es ? g.title.es : g.title.en) : undefined,
            urls: g.urls,
          }))}
          title={es ? "Publicado en Instagram" : "Live on Instagram"}
          note={
            es
              ? "Los posts reales, tal como se ven en la cuenta."
              : "The real posts, as they live on the account."
          }
        />
      ) : null}
      <ProjectExtras
        extras={page.extras}
        screens={
          SCREENS_BESIDE_TEXT.has(project.slug)
            ? await Promise.all(
                (photos.screenGroups ?? []).map(async (g) => ({
                  title: g.title,
                  items: await Promise.all(
                    g.items.map(async (src) => ({ src, aspect: await getImageAspect(src) })),
                  ),
                })),
              )
            : undefined
        }
      />

      {/* Parts of a project (Youth Future Talent inside the workshops): shown as sections of this same page. */}
      {INLINE_CHILDREN.has(project.slug)
        ? children.map((child) => {
            const childVisual = getProjectPhotos(child.slug, "visual");
            return (
              <div key={child.slug}>
                <CaseSections
                  data={child.t.page}
                  locale={locale}
                  heading={child.t.card.title}
                  intro={child.t.page.description}
                />
                {childVisual.length ? (
                  <TemplateGallery
                    account={account}
                    tallSlides={CLASSIC_GALLERY.has(project.slug)}
                    classicPosts={CLASSIC_GALLERY.has(project.slug)}
                    template="visual"
                    photos={{
                      portada: undefined,
                      celular: [],
                      instagram: [],
                      presentacion: [],
                      visual: childVisual,
                    }}
                    locale={locale}
                    hints={hints}
                    visualInHero={false}
                    title={es ? "Galería" : "Gallery"}
                  />
                ) : null}
              </div>
            );
          })
        : null}

      {children.length && !INLINE_CHILDREN.has(project.slug) ? (
        <section className="bg-white pb-24 sm:pb-36">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
            <h2 className="font-inter text-ink2 text-[32px] leading-tight font-bold sm:text-[40px]">
              {es ? "Dentro de este proyecto" : "Inside this project"}
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {children.map((child) => {
                const childCover = getProjectCover(child.slug);
                return (
                  <li key={child.slug}>
                    <Link
                      href={`/work/${child.slug}`}
                      className="group flex h-full min-h-[300px] flex-col overflow-hidden rounded-[16px] border border-[#e2e2dd] bg-[#fafaf5] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b173b]"
                    >
                      <span className="relative block h-[160px] shrink-0 overflow-hidden bg-[#ecece7]">
                        {childCover ? (
                          <Image
                            src={childCover}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 400px, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                        ) : null}
                      </span>
                      <span className="flex flex-1 flex-col px-6 pt-6 pb-6">
                        <span className="font-inter text-muted text-[13px] font-medium tracking-[0.08em]">
                          {child.t.card.labels.join(" · ")}
                        </span>
                        <span className="font-inter text-ink2 mt-3 text-[24px] leading-[1.08] font-semibold">
                          {child.t.card.title}
                        </span>
                        <span className="font-inter text-ink mt-3 text-[15px] leading-[1.5]">
                          {child.t.card.description}
                        </span>
                        <span className="font-inter text-ink2 mt-auto pt-5 text-[13px] font-semibold tracking-[0.1em] uppercase">
                          {es ? "Ver proyecto ↗" : "View project ↗"}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      {/* ── Previous / next project in this chapter ── */}
      <nav
        aria-label={
          es ? "Más proyectos del capítulo" : "More projects in this chapter"
        }
        className="border-t border-[#e2e2dc] bg-white"
      >
        <div className="mx-auto grid max-w-[1280px] gap-px px-5 py-10 sm:grid-cols-2 sm:px-8">
          {[
            { target: prev, label: es ? "Anterior" : "Previous" },
            { target: next, label: es ? "Siguiente" : "Next" },
          ].map(({ target, label }, i) => (
            <div key={label} className={i === 1 ? "sm:text-right" : ""}>
              {target ? (
                <Link
                  href={`/work/${target.slug}`}
                  className="group inline-flex flex-col gap-1 py-3 transition-opacity hover:opacity-70"
                >
                  <span className="font-inter text-muted text-[13px] font-medium tracking-[0.08em]">
                    {label.toUpperCase()}
                  </span>
                  <span className="font-inter text-ink2 text-[22px] leading-tight font-semibold">
                    {target[locale].card.title}
                  </span>
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </nav>

      <WorkTogether variant="detail" />
      <SiteFooter />
    </main>
  );
}
