import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/content/types";
import { heroes, chapters, chapterIntros } from "@/content";
import { mentions } from "@/content/mentions";
import {
  HERO_MANIFEST,
  MENTION_MANIFEST,
  encodeAsset,
} from "@/content/photo-manifest";
import { HomeHero } from "@/components/site/HomeHero";
import { HomeAboutHero } from "@/components/site/HomeAboutHero";
import { CommunityStrip } from "@/components/site/CommunityStrip";
import {
  CategoryShowcase,
  type ShowcaseCategory,
  type ShowcaseProject,
} from "@/components/site/CategoryShowcase";
import {
  WorkChapters,
  type ChapterEntry,
} from "@/components/site/WorkChapters";
import {
  FeatureProjectsMarquee,
  type FeatureItem,
} from "@/components/site/FeatureProjectsMarquee";
import { RotatingWord } from "@/components/RotatingWord";
import { LogoMarquee } from "@/components/LogoMarquee";
import { WorkTogether } from "@/components/site/WorkTogether";
import { SiteFooter } from "@/components/site/SiteFooter";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const es = locale === "es";

  // Resolve a project (hero or mention) to a card: title + link + cover image.
  // cover() may be undefined when a slug has no manifest entry; callers must
  // guard before passing it as an <Image> src (which would otherwise throw).
  const cover = (slug: string): string | undefined =>
    encodeAsset(HERO_MANIFEST[slug]?.cover ?? MENTION_MANIFEST[slug]?.cover);
  const proj = (slug: string) => {
    const h = heroes.find((x) => x.slug === slug);
    const m = mentions.find((x) => x.id === slug);
    return {
      title: h ? h.title[locale] : m ? m.title : slug,
      href: `/work/${slug}`,
      img: cover(slug),
    };
  };

  // ── What I can do · 4 categories (page-owned home assets), 3 projects each ──
  const M = (cat: string, file: string) =>
    encodeAsset(`pages/home/content/What Can I do for you/${cat}/${file}`)!;

  const cat = (folder: string, cards: string[]): ShowcaseProject[] =>
    cards.map((c) => ({ title: folder, href: "/projects", img: M(folder, c) }));

  const categories: ShowcaseCategory[] = [
    {
      key: "innovation",
      title: es
        ? "Innovación y estrategia de negocio"
        : "Innovation & business strategy",
      desc: es
        ? "Posicionamiento, propuesta de valor y consultoría para ventures early-stage."
        : "Positioning, value propositions and consulting for early-stage ventures.",
      image: M("Innovation & Bussines strategy", "image-1.png"),
      projects: cat("Innovation & Bussines strategy", [
        "place-card-3.png",
        "place-card-7.png",
        "place-card-11.png",
      ]),
    },
    {
      key: "product",
      title: es ? "Producto y UX/UI" : "Product & UX/UI",
      desc: es
        ? "Diseño de producto para mobile y web: flujos, sistemas y experiencias."
        : "Product design for mobile and web: flows, systems and experiences.",
      image: M("Product & UX:UI Design ", "image-3.png"),
      projects: cat("Product & UX:UI Design ", [
        "place-card-1.png",
        "place-card-5.png",
        "place-card-9.png",
      ]),
    },
    {
      key: "brand",
      title: es ? "Branding y redes" : "Branding & social media",
      desc: es
        ? "Identidad, sistemas visuales y contenido que mantienen una marca viva en redes."
        : "Identity, visual systems and content that keep a brand alive on social media.",
      image: M("Brand & Marketing", "image-2.png"),
      projects: cat("Brand & Marketing", [
        "place-card-2.png",
        "place-card-6.png",
        "place-card-10.png",
      ]),
    },
    {
      key: "events",
      title: es ? "Eventos y comunidad" : "Events & community",
      desc: es
        ? "De la concepción al día D: experiencias de 80 a 400+ personas."
        : "From concept to event day: experiences for 80 to 400+ people.",
      image: M("Events & production", "image.png"),
      projects: cat("Events & production", [
        "place-card.png",
        "place-card-4.png",
        "place-card-8.png",
      ]),
    },
  ];

  // ── Work chapters · accordion drives the image + a view button ──
  const WC = "pages/home/content/Work chapters";
  const chapterImg: Record<string, string> = {
    n9ne: encodeAsset(`${WC}/N9NE.png`)!,
    "travelling-university": encodeAsset(
      `${WC}/New Folder With Items/Travelling University.png`,
    )!,
    independent: encodeAsset(`${WC}/Idependent design .png`)!,
    "boost-lab": encodeAsset(`${WC}/BOOST LAB.png`)!,
    nomadher: encodeAsset(`${WC}/NomadHer.png`)!,
  };
  const chapterHref: Record<string, string> = {
    n9ne: "/work/nobled-coffee",
    "travelling-university": "/work/mentes-sin-fronteras",
    independent: "/work/brujula-etica",
    "boost-lab": "/work/global-youth-summit",
    nomadher: "/work/nomadher-app",
  };
  const chapterEntries: ChapterEntry[] = chapters.map((c) => ({
    id: c.id,
    title: c.title[locale],
    meta: `${c.dateRange} · ${c.location[locale]}`,
    intro: chapterIntros[c.id][locale],
    image: chapterImg[c.id],
    href: chapterHref[c.id],
    starred: c.starred,
  }));

  // ── Feature projects marquee ──
  const featureItems = [
    "global-youth-summit",
    "nomadher-app",
    "women-entrepreneur-summit-seoul",
    "jal-nomadher",
    "brujula-etica",
    "sejong-hackathon",
    "mentes-sin-fronteras",
    "nobled-coffee",
    "misiones-internacionales",
    "opuesto-sas",
  ]
    .map(proj)
    .filter((p): p is FeatureItem => Boolean(p.img));

  const rotating = es
    ? ["startups", "marcas", "comunidades", "founders", "ti"]
    : ["startups", "brands", "communities", "founders", "you"];

  return (
    <main>
      <HomeHero locale={locale} />

      <CommunityStrip>
        {es
          ? "Diseño, producto y estrategia · 5 años entre Bilbao, Berlín, Bogotá y Seúl"
          : "Design, product and strategy · 5 years between Bilbao, Berlin, Bogotá and Seoul"}
      </CommunityStrip>

      <HomeAboutHero locale={locale} />

      <CategoryShowcase
        categories={categories}
        heading={es ? "Qué disfruto hacer" : "What I enjoy doing"}
        intro={
          es
            ? "Práctica, creativa y enfocada en que las cosas pasen: así me gusta trabajar."
            : "Practical, creative and focused on making things happen: that's how I like to work."
        }
        allLabel={
          es ? "Ver proyectos de esta área" : "See projects in this area"
        }
      />

      <FeatureProjectsMarquee
        items={featureItems}
        label={es ? "Proyectos destacados" : "Feature projects"}
      />

      {/* ── Designing for [rotating] ── */}
      <section className="bg-white px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1040px]">
          <h2 className="font-inter text-ink2 text-[40px] leading-[1.1] font-bold sm:text-[68px]">
            {es ? "Diseño para" : "I design for"}
            <br />
            <RotatingWord words={rotating} className="text-black" />
          </h2>
        </div>
      </section>

      <WorkChapters
        chapters={chapterEntries}
        heading={es ? "Capítulos de trabajo" : "Work chapters"}
        intro={
          es
            ? "El portafolio leído como una historia: cinco capítulos, un país y una forma de trabajar cada uno."
            : "The portfolio read as a story: five chapters, each a country and a way of working."
        }
        viewLabel={es ? "Ver capítulo" : "View chapter"}
      />

      <LogoMarquee
        title={
          es ? "Marcas con las que he trabajado" : "Brands I've worked with"
        }
      />

      <WorkTogether photo="/shared/portraits/Val.jpg" />
      <SiteFooter />
    </main>
  );
}
