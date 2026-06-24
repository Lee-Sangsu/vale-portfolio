import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/content/types";
import { MacWindow } from "@/components/MacWindow";
import { NaturalPhoto } from "@/components/NaturalPhoto";
import { PolaroidPile } from "@/components/PolaroidPile";
import { SneakPeek, type SneakPeekItem } from "@/components/SneakPeek";
import { HERO_MANIFEST, MENTION_MANIFEST, encodeAsset } from "@/content/photo-manifest";
import { Decoration, DECO } from "@/components/Decoration";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function DiarioEditorialPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  const sneak: SneakPeekItem[] = [
    { src: encodeAsset(HERO_MANIFEST["nomadher-app"].cover)!, label: "NomadHer App", sublabel: "Product · 2024", variant: "lime" },
    { src: encodeAsset(HERO_MANIFEST["jal-nomadher"].cover)!, label: "JAL × NomadHer", sublabel: "Brand partnership", variant: "cream" },
    { src: encodeAsset(HERO_MANIFEST["global-youth-summit"].cover)!, label: "Global Youth Summit", sublabel: "Seoul · 2024", variant: "pink" },
    { src: encodeAsset(HERO_MANIFEST["sejong-hackathon"].cover)!, label: "Sejong Hackathon", sublabel: "Seoul · 2024", variant: "cream" },
    { src: encodeAsset(MENTION_MANIFEST["nobled-coffee"].cover)!, label: "NOBLED Coffee", sublabel: "Berlin · 2023", variant: "ink" },
    { src: encodeAsset(MENTION_MANIFEST["brujula-etica"].cover)!, label: "Brújula Ética", sublabel: "Javeriana × Loyola", variant: "lime" },
    { src: encodeAsset(MENTION_MANIFEST["women-entrepreneur-summit-seoul"].cover)!, label: "Women Summit", sublabel: "BOOST LAB · 2024", variant: "pink" },
  ];

  const polaroidPhotos = (HERO_MANIFEST["global-youth-summit"].polaroid ?? []).map((p) => encodeAsset(p)!);

  return (
    <main className="bg-cream">
      {/* Top label bar */}
      <div className="container-page pt-6 pb-2 flex items-center justify-between text-ink">
        <Link href="/proposals" className="kicker underline-soft">
          ← {locale === "es" ? "Propuestas" : "Proposals"}
        </Link>
        <span className="kicker-muted">01 · Diario Editorial</span>
      </div>

      {/* ── HERO — text card left, MacWindow with portrait right ── */}
      <section className="container-page pt-10 pb-24 sm:pt-16 sm:pb-32">
        <div className="grid-editorial items-center gap-y-12">
          <div className="col-span-12 lg:col-span-7">
            <span className="kicker text-ink-soft">Portfolio · 2021 / 2026</span>
            <h1
              className="display-2xl text-ink leading-[0.92] mt-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="italic font-normal" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                Diseño
              </span>{" "}
              <span className="block">para personas</span>
              <span className="block italic font-normal" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                que viajan.
              </span>
            </h1>
            <p className="lead text-ink mt-8 max-w-xl">
              {locale === "es"
                ? "Soy Valeria. Diseño marca, producto y estrategia. He construido desde Bilbao, Berlín, Bogotá y Seúl, sosteniendo dos lenguajes y dos audiencias."
                : "I'm Valeria. I design brand, product, strategy. Built across Bilbao, Berlin, Bogotá, Seoul, holding two languages and two audiences."}
            </p>
            <div className="mt-10 flex items-center gap-5">
              <a
                href="mailto:hola@valeria.archive"
                className="inline-flex items-center gap-2 rounded-full bg-ink text-cream px-6 py-3 text-sm font-semibold tracking-[0.16em] uppercase hover:translate-y-[-2px] transition-transform"
              >
                {locale === "es" ? "Hablemos" : "Let's talk"} <span aria-hidden>→</span>
              </a>
              <Link href="/projects" className="kicker text-ink underline-soft">
                {locale === "es" ? "Ver trabajo" : "See work"}
              </Link>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="max-w-md ml-auto">
              <MacWindow
                src="/photos/about/Val.jpg"
                alt="Valeria Jiménez"
                title="valeria.portrait"
                maxHeightVh={70}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Sneak peek ── */}
      <SneakPeek
        title={locale === "es" ? "Un vistazo a mi trabajo" : "Sneak peek of my work"}
        items={sneak}
      />

      {/* ── Project preview — Adriana's project page layout ── */}
      <section className="container-page py-24 sm:py-32 border-t border-ink/15">
        <div className="grid-editorial mb-12">
          <div className="col-span-12 sm:col-span-3">
            <span className="kicker-muted inline-flex items-center gap-2">
              {locale === "es" ? "Caso" : "Case"} · 01
              <Decoration src={DECO.star} size={14} className="opacity-70" />
            </span>
          </div>
          <h2 className="col-span-12 sm:col-span-9 display-xl font-display text-ink">
            Global Youth Summit
          </h2>
        </div>

        {/* Mac window cover */}
        <div className="mb-16">
          <MacWindow
            src={encodeAsset(HERO_MANIFEST["global-youth-summit"].cover)!}
            alt="Global Youth Summit"
            title="gys_seoul_2024"
            maxHeightVh={70}
          />
        </div>

        {/* Overview row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16 pb-12 border-b border-ink/15">
          {[
            { kicker: locale === "es" ? "Cliente" : "Client", value: "BOOST LAB" },
            { kicker: locale === "es" ? "Tipo" : "Type", value: locale === "es" ? "Summit + Branding" : "Summit + Branding" },
            { kicker: locale === "es" ? "Rol" : "Role", value: locale === "es" ? "Diseñadora líder" : "Lead designer" },
            { kicker: locale === "es" ? "Entregables" : "Deliverables", value: locale === "es" ? "Marca · Producción · Materiales" : "Brand · Production · Materials" },
          ].map((it) => (
            <div key={it.kicker}>
              <span className="kicker-muted block mb-2">{it.kicker}</span>
              <span className="display-sm text-ink block">{it.value}</span>
            </div>
          ))}
        </div>

        {/* Spotlight + context */}
        <div className="grid-editorial items-start gap-y-10 mb-16">
          <div className="col-span-12 sm:col-span-7">
            <span className="kicker-muted block mb-3">
              {locale === "es" ? "Contexto" : "Context"}
            </span>
            <p className="prose-editorial body-lg leading-relaxed">
              {locale === "es"
                ? "El primer Global Youth Summit en Seúl reunió 200+ jóvenes de 14 países para hablar de innovación y emprendimiento. La marca tenía que sostener un evento bilingüe, multipanel y multicampaña en menos de tres meses."
                : "The first Global Youth Summit in Seoul gathered 200+ youth from 14 countries around innovation and entrepreneurship. The brand had to hold a bilingual, multi-panel, multi-campaign event in under three months."}
            </p>
          </div>
          <div className="col-span-12 sm:col-span-5">
            <NaturalPhoto
              src={encodeAsset(
                HERO_MANIFEST["global-youth-summit"].spotlight ??
                  HERO_MANIFEST["global-youth-summit"].cover,
              )!}
              alt="Global Youth Summit — spotlight"
              maxHeightVh={55}
              rounded="rounded-2xl"
            />
          </div>
        </div>

        {/* Polaroid pile */}
        <div className="grid-editorial">
          <div className="col-span-12 sm:col-span-3">
            <span className="kicker-muted inline-flex items-center gap-2">
              {locale === "es" ? "En el lugar" : "On the ground"}
              <Decoration src={DECO.stars} size={26} className="opacity-80" />
            </span>
          </div>
          <div className="col-span-12 sm:col-span-9">
            <PolaroidPile photos={polaroidPhotos} alt="Global Youth Summit" size={220} />
          </div>
        </div>
      </section>

      {/* Pick footer */}
      <PickFooter slug="a-diario-editorial" locale={locale} />
    </main>
  );
}

function PickFooter({ slug, locale }: { slug: string; locale: Locale }) {
  return (
    <section className="container-page py-20 border-t border-ink/15">
      <div className="grid-editorial items-end">
        <div className="col-span-12 sm:col-span-9">
          <h3 className="display-lg font-display text-ink">
            {locale === "es" ? "¿Esta es la dirección?" : "Is this the direction?"}
          </h3>
          <p className="body-lg text-ink mt-3 max-w-xl">
            {locale === "es"
              ? `Si te gusta esta, dime "voy con la ${slug.split("-")[0]}" y la replico en TODO el portafolio.`
              : `If you like this one, tell me "going with ${slug.split("-")[0]}" and I roll it across the whole portfolio.`}
          </p>
        </div>
        <div className="col-span-12 sm:col-span-3 sm:text-right">
          <Link href="/proposals" className="kicker text-ink underline-soft">
            ← {locale === "es" ? "Comparar las tres" : "Compare all three"}
          </Link>
        </div>
      </div>
    </section>
  );
}
