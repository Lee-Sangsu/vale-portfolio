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
  getTopLevelProjects,
} from "@/content/portfolio";
import { CHAPTER_FOLDERS, isVideoPath } from "@/lib/project-photos";
import type { Locale } from "@/content/types";

/** Own heading for a project's deck ("ppt") or poster ("afiches") section. */
const SECTION_TITLES: Record<string, Partial<Record<"ppt" | "afiches" | "visual" | "portafolio", Record<Locale, string>>>> = {
  "nobled-coffee": { ppt: { es: "Brandbook", en: "Brandbook" } },
  "teampreneurship-cooperative": { ppt: { es: "Guía de marca", en: "Brand guide" } },
  "opuesto-sas": {
    ppt: { es: "Brandbook", en: "Brandbook" },
  },
  "eats-real": { afiches: { es: "Campaña", en: "Campaign" } },
  "nomadher-app": {
    afiches: { es: "App Store", en: "App Store" },
    portafolio: { es: "Onboarding y guía de comunidad", en: "Onboarding and community guide" },
  },
  "bloggers-program": { afiches: { es: "Emails del programa", en: "Program emails" } },
  "instagram-content": {
    portafolio: { es: "Sistema de stories", en: "Story system" },
    afiches: { es: "Newsletter y emails", en: "Newsletter and emails" },
  },
  "misiones-internacionales": { ppt: { es: "La propuesta de la misión", en: "The mission proposal" } },
  "seoul-women-entrepreneur-summit": { ppt: { es: "Las slides del día", en: "The day's slides" } },
  "global-youth-summit": { ppt: { es: "Dossier para aliados", en: "Partner dossier" } },
  "seoul-entrepreneur-summit": { ppt: { es: "Las slides del día", en: "The day's slides" } },
  "ruta-8": {
    portafolio: { es: "Plan de comunicación", en: "Communication plan" },
    afiches: { es: "Póster y correos de convocatoria", en: "Call poster and emails" },
  },
  "business-decks": { portafolio: { es: "Booth deck del festival", en: "Festival booth deck" } },
  "city-lounge": { portafolio: { es: "Propuestas y flujos", en: "Proposals and flows" } },
  "travel-buddy-meetups": { portafolio: { es: "Flujos y versiones", en: "Flows and versions" } },
  "levels-badges-perks": { portafolio: { es: "Niveles, badges y perks", en: "Levels, badges and perks" } },
  "brujula-etica": { afiches: { es: "Pósters e historias", en: "Posters and stories" } },
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
  if (!second.length) return getProjectInstagramPosts(slug).flat().filter((p) => !isVideoPath(p));
  const firsts = second.map((group) => group[0]);
  const seconds = second.filter((group) => group.length > 1).map((group) => group[1]);
  return [...firsts, ...seconds].slice(0, 7);
}

/** With several editions every edition shows all its posts as one carousel, one piece after another. */
function oneCarouselPerEdition(posts: string[][], slug: string): string[][] {
  return getProjectInstagramPosts(slug, 2).length ? [posts.flat()] : posts;
}

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
    es: ["Juventud, proyección, pertenencia", "Impacto, determinación, acción", "Creatividad, flexibilidad, crecimiento"],
    en: ["Youth, projection, belonging", "Impact, determination, action", "Creativity, flexibility, growth"],
  },
};

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
  const photos: TemplatePhotos = {
    portada: cover,
    celular: getProjectPhotos(project.slug, "celular"),
    // All Instagram pieces of the project, flat (the ring in the hero uses them); posts keep their own groups below.
    instagram: heroPieces(project.slug),
    presentacion: getProjectPhotos(project.slug, "presentacion"),
    visual: getProjectPhotos(project.slug, "visual"),
    afiches: getProjectPhotos(project.slug, "afiches"),
    web: getProjectPhotos(project.slug, "web"),
    grilla: getProjectPhotos(project.slug, "grilla"),
    moodboard: getProjectPhotos(project.slug, "moodboard"),
    portafolio: getProjectPhotos(project.slug, "portafolio"),
    webScreens: getProjectPhotos(project.slug, "web/pantalla"),
    instagramPosts: oneCarouselPerEdition(getProjectInstagramPosts(project.slug), project.slug),
    diario: getProjectDiary(project.slug),
  };
  // A second edition (edicion-2/ folder) gets its own block after the first one.
  const secondPosts = getProjectInstagramPosts(project.slug, 2);
  const secondEdition: TemplatePhotos | null = secondPosts.length || getProjectPhotos(project.slug, "afiches", 2).length
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
  const media = await HeroMedia({ template: project.template, photos, title: page.title });
  // Instagram and the visual collage open with a centered title and description above the pictures.
  const centered = (project.template === "instagram" || project.template === "visual") && Boolean(media);
  const slidesLeft = (project.template === "ppt" || project.template === "app") && Boolean(media);

  const parent = project.parent ? getProject(project.parent, locale) : undefined;
  const children = project.children
    .map((childSlug) => getProject(childSlug, locale))
    .filter((child): child is NonNullable<typeof child> => Boolean(child));

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
          {media && slidesLeft ? <div className="lg:order-first">{media}</div> : null}
          <div className={centered ? "mx-auto max-w-[760px] text-center" : "max-w-[760px]"}>
            {parent ? (
              <Link
                href={`/work/${parent.slug}`}
                className="font-inter text-ink2 mb-5 inline-flex items-center gap-2 text-[14px] font-medium transition-opacity hover:opacity-70"
              >
                <span aria-hidden="true">←</span>
                {es ? "Parte de" : "Part of"} {parent.t.card.title}
              </Link>
            ) : null}
            <Link
              href={`/chapters/${project.chapter}`}
              className="font-inter text-muted text-[13px] font-medium tracking-[0.08em] transition-colors hover:text-black"
            >
              [ {es ? "CAPÍTULO" : "CHAPTER"} {chapter.number} · {chapter.t.page.label} ]
            </Link>
            <h1 className="font-inter text-ink2 mt-5 text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] font-bold">
              {page.title}
            </h1>
            <p className="font-inter text-ink mt-6 text-[17px] leading-[1.55] sm:text-[19px]">
              {page.description}
            </p>
            <p className="font-inter text-muted mt-5 text-[14px] font-medium">
              {card.meta}
            </p>

            {page.purpose.length ? (
              <div className="mt-9 rounded-[24px] bg-[#f4f4f4] px-6 py-5 sm:px-9 sm:py-6">
                <span className="font-inter text-muted text-[13px]">
                  {page.purposeLabel ?? (es ? "Propósito" : "Purpose")}
                </span>
                <ul
                  className="mt-3 grid divide-y divide-[#c8c8c2] sm:grid-cols-[repeat(var(--cols),minmax(0,1fr))] sm:divide-x sm:divide-y-0"
                  style={{ ["--cols" as string]: page.purpose.length }}
                >
                  {page.purpose.map((item) => (
                    <li
                      key={item}
                      className="font-inter text-ink2 flex min-h-[64px] items-center justify-center px-5 py-2 text-center text-balance sm:px-6 text-[15px] leading-snug font-bold sm:text-[17px]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {media && !slidesLeft ? media : null}

          {!media && cover ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] bg-[#ecece7] shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
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
      </section>

      <CaseSections data={page} locale={locale} />
      {(photos.moodboard ?? []).length ? (
        <TemplateGallery account={account}
          template="moodboard"
          photos={photos}
          locale={locale}
          hints={hints}
          labels={MOODBOARD_LABELS[project.slug]?.[locale]}
        />
      ) : null}
      {secondEdition ? (
        <TemplateGallery account={account}
          template="edition"
          photos={photos}
          locale={locale}
          hints={hints}
          title={es ? "Primera edición" : "First edition"}
        />
      ) : null}
      <TemplateGallery account={account}
        template={project.template}
        photos={photos}
        locale={locale}
        hints={hints}
        title={
          project.template === "ppt"
            ? SECTION_TITLES[project.slug]?.ppt?.[locale]
            : secondEdition && project.template === "instagram"
              ? "Social Media Carousel · " + (es ? "Versión 1" : "Version 1")
              : undefined
        }
      />
      {/* A project can also carry other kinds of photos (a brandbook deck, phone screens...): show each one that has files. */}
      {(
        [
          ["ppt", photos.presentacion],
          ["portafolio", photos.portafolio ?? []],
          ["instagram", photos.instagram],
          ["app", photos.celular],
          ["afiches", photos.afiches ?? []],
          ["web", photos.web ?? []],
          ["grilla", photos.grilla ?? []],
          // The Visual Diary (diario/) rides on the visual gallery, so it counts even when visual/ is empty.
          ["visual", photos.visual.length ? photos.visual : (photos.diario ?? [])],
        ] as const
      )
        .filter(([template, list]) => template !== project.template && list.length > 0)
        .sort(([a], [b]) => extraRank(project.slug, a) - extraRank(project.slug, b))
        .map(([template]) => (
          <TemplateGallery account={account}
            key={template}
            template={template}
            photos={photos}
            locale={locale}
            hints={hints}
            visualInHero={false}
            title={
              template === "ppt" || template === "afiches" || template === "visual" || template === "portafolio"
                ? SECTION_TITLES[project.slug]?.[template]?.[locale]
                : undefined
            }
          />
        ))}
      {secondEdition ? (
        <>
          <TemplateGallery account={account}
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
            <TemplateGallery account={account}
              template="instagram"
              photos={secondEdition}
              locale={locale}
              hints={hints}
              title={"Social Media Carousel · " + (es ? "Versión 2" : "Version 2")}
            />
          ) : null}
          {(secondEdition.afiches ?? []).length ? (
            <TemplateGallery account={account}
              template="afiches"
              photos={secondEdition}
              locale={locale}
              hints={hints}
              title={SECTION_TITLES[project.slug]?.afiches?.[locale]}
            />
          ) : null}
          {(secondEdition.grilla ?? []).length ? (
            <TemplateGallery account={account} template="grilla" photos={secondEdition} locale={locale} hints={hints} />
          ) : null}
        </>
      ) : null}
      <ProjectExtras extras={page.extras} />

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
                  <TemplateGallery account={account}
                    template="visual"
                    photos={{ portada: undefined, celular: [], instagram: [], presentacion: [], visual: childVisual }}
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
                      <span className="flex flex-1 flex-col px-6 pb-6 pt-6">
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
        aria-label={es ? "Más proyectos del capítulo" : "More projects in this chapter"}
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
