import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/content/types";
import { MacWindow } from "@/components/MacWindow";
import { PolaroidPile } from "@/components/PolaroidPile";
import { HERO_MANIFEST, encodeAsset } from "@/content/photo-manifest";
import { Decoration, DECO } from "@/components/Decoration";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const FOLDERS = [
  { icon: DECO.plane,  label: "Travelling_U",      rot: 6,   href: "/projects" },
  { icon: DECO.camera, label: "NomadHer",          rot: -3,  href: "/projects" },
  { icon: DECO.laptop, label: "Independent",       rot: 10,  href: "/projects" },
  { icon: DECO.flower, label: "Personal",          rot: -5,  href: "/about" },
];

export default async function ArchivoVivoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  // Pull a few personal photos for the hero polaroid pile.
  const heroPolaroids: string[] = [];

  return (
    <main className="bg-cream min-h-screen">
      {/* Top label bar */}
      <div className="container-page pt-6 pb-2 flex items-center justify-between text-ink">
        <Link href="/proposals" className="kicker underline-soft">
          ← {locale === "es" ? "Propuestas" : "Proposals"}
        </Link>
        <span className="kicker-muted">02 · Archivo Vivo</span>
      </div>

      {/* ── HERO — desktop with folders + center MacWindow ── */}
      <section className="relative container-page pt-12 pb-32 sm:pt-16 sm:pb-40">
        {/* Scattered "desktop" folder icons */}
        <ul className="hidden md:block absolute inset-0 pointer-events-none">
          {FOLDERS.map((f, i) => {
            const positions = [
              { top: "10%", left: "4%" },
              { top: "22%", left: "12%" },
              { top: "56%", left: "2%" },
              { top: "14%", right: "4%" },
              { top: "60%", right: "8%" },
            ];
            const pos = positions[i];
            return (
              <li
                key={f.label}
                className="absolute flex flex-col items-center gap-2 pointer-events-auto"
                style={{ ...pos, transform: `rotate(${f.rot}deg)` }}
              >
                <Link
                  href={f.href}
                  className="group flex flex-col items-center gap-2 hover:scale-105 transition-transform"
                >
                  <Decoration src={f.icon} size={56} className="opacity-90 group-hover:opacity-100" />
                  <span className="kicker bg-cream-deep rounded px-2 py-0.5 text-ink shadow-sm">
                    {f.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Center MacWindow */}
        <div className="relative max-w-md mx-auto">
          <MacWindow
            src="/photos/about/Val.jpg"
            alt="Valeria Jiménez"
            title="aloha_valeria"
            maxHeightVh={60}
            priority
          />
          {/* Name label below window */}
          <div className="mt-6 text-center">
            <h1
              className="inline-block px-4 py-1 bg-sky text-ink rounded-md text-2xl font-display"
              style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
            >
              Valeria Jiménez
            </h1>
          </div>
          {/* Quote below */}
          <div className="mt-8 max-w-md mx-auto bg-cream-deep rounded-2xl shadow-[0_18px_40px_-18px_rgba(0,0,0,0.18)] p-5">
            <div className="flex gap-2 mb-3">
              <span className="size-2.5 rounded-full bg-[#FF5F57]" />
              <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="size-2.5 rounded-full bg-[#28C840]" />
            </div>
            <p className="body text-ink leading-relaxed text-center">
              {locale === "es"
                ? "Soy diseñadora multidisciplinaria. Construyo experiencias significativas y le doy vida a ideas con personalidad."
                : "Multidisciplinary designer. Building meaningful experiences and bringing ideas to life with personality."}
            </p>
          </div>
        </div>
      </section>

      {/* ── What can I do for you — accordion-ish list + polaroid stack ── */}
      <section className="container-page py-20 sm:py-28 border-t border-ink/15">
        <div className="grid grid-cols-12 gap-10 items-start">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <Decoration src={DECO.star} size={24} className="text-pink" />
              <span className="kicker text-ink-soft">
                {locale === "es" ? "Qué puedo hacer por ti" : "What I can do for you"}
              </span>
            </div>
            <h2
              className="display-xl text-ink leading-tight mb-10"
              style={{ fontFamily: "Georgia, serif" }}
            >
              <span className="block">Diseño marca,</span>
              <span className="italic">producto,</span>{" "}
              <span className="italic">estrategia.</span>
            </h2>
            <ul className="flex flex-col">
              {[
                { n: "01", label: locale === "es" ? "Marca · Identidad visual" : "Brand · Visual identity" },
                { n: "02", label: locale === "es" ? "Producto · UX/UI" : "Product · UX/UI" },
                { n: "03", label: locale === "es" ? "Estrategia · Posicionamiento" : "Strategy · Positioning" },
                { n: "04", label: locale === "es" ? "Eventos · Producción" : "Events · Production" },
                { n: "05", label: locale === "es" ? "Contenido · Editorial" : "Content · Editorial" },
              ].map((it) => (
                <li
                  key={it.n}
                  className="border-t border-ink/15 last:border-b py-5 flex items-baseline gap-6 text-ink hover:bg-cream-deep/40 transition cursor-pointer group"
                >
                  <span className="num text-ink-soft">{it.n}</span>
                  <span className="display-md group-hover:italic">{it.label}</span>
                  <span className="ml-auto kicker-muted opacity-0 group-hover:opacity-100 transition">
                    ↗
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <PolaroidPile photos={heroPolaroids} alt="Personal" size={210} />
          </div>
        </div>
      </section>

      {/* ── Project card sample — overlapping window + sticker label ── */}
      <section className="container-page py-24 sm:py-32 border-t border-ink/15">
        <div className="flex items-baseline justify-between mb-10 flex-wrap gap-4">
          <h2
            className="display-xl text-ink leading-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            <span className="italic">Selected</span> work
          </h2>
          <Link href="/projects" className="kicker text-ink underline-soft">
            {locale === "es" ? "Ver el archivo →" : "See the archive →"}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            { slug: "nomadher-app", brand: "NomadHer", date: "2024–Present", color: "bg-pink" },
            { slug: "jal-nomadher", brand: "JAL × NomadHer", date: "2024", color: "bg-lime" },
          ].map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="group block"
            >
              <div className="relative">
                <MacWindow
                  src={encodeAsset(HERO_MANIFEST[p.slug as keyof typeof HERO_MANIFEST].cover)!}
                  alt={p.brand}
                  title={p.slug.replace(/-/g, "_")}
                />
                {/* Sticker label overlapping */}
                <div
                  className={`absolute -bottom-4 -left-3 px-4 py-2 ${p.color} text-ink rounded-xl shadow-md border border-ink/20 rotate-[-3deg] group-hover:rotate-0 transition-transform`}
                >
                  <span className="kicker">{p.brand}</span>
                </div>
              </div>
              <div className="mt-8 flex items-baseline justify-between">
                <h3
                  className="display-md text-ink"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  <span className="italic">
                    {p.slug === "nomadher-app" ? "NomadHer" : "JAL ×"}
                  </span>{" "}
                  {p.slug === "nomadher-app" ? "App" : "NomadHer"}
                </h3>
                <span className="kicker-muted">{p.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <PickFooter slug="b-archivo-vivo" locale={locale} />
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
