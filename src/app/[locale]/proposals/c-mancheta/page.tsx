import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/content/types";
import { NaturalPhoto } from "@/components/NaturalPhoto";
import { HERO_MANIFEST, MENTION_MANIFEST, encodeAsset } from "@/content/photo-manifest";
import { Decoration, DECO } from "@/components/Decoration";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ManchetaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  return (
    <main className="bg-cream">
      {/* Top label bar */}
      <div className="container-page pt-6 pb-2 flex items-center justify-between text-ink">
        <Link href="/proposals" className="kicker underline-soft">
          ← {locale === "es" ? "Propuestas" : "Proposals"}
        </Link>
        <span className="kicker-muted">03 · Mancheta</span>
      </div>

      {/* ── Masthead — newspaper front page ── */}
      <section className="container-page pt-10 pb-12 border-b-2 border-ink">
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
          <span className="kicker text-ink">VALERIA JIMÉNEZ · ARCHIVO 2021–2026</span>
          <span className="kicker-muted">
            {locale === "es" ? "Edición n° 01 · Bilbao · Berlín · Bogotá · Seúl" : "Issue 01 · Bilbao · Berlin · Bogotá · Seoul"}
          </span>
        </div>
        <h1
          className="text-ink leading-[0.88]"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(3.5rem, 13vw, 11rem)",
            letterSpacing: "-0.04em",
            fontWeight: 400,
          }}
        >
          <span className="italic">Diario</span> de
          <br />
          <span className="italic">diseño</span> nómada.
        </h1>
      </section>

      {/* ── Lead story — feature photo + standfirst ── */}
      <section className="container-page py-16 sm:py-24 border-b border-ink/30">
        <div className="grid-editorial items-start gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <NaturalPhoto
              src="/photos/about/Val.png"
              alt="Valeria Jiménez"
              maxHeightVh={75}
              rounded="rounded-none"
              priority
            />
            <p className="kicker-muted mt-3 italic">
              {locale === "es"
                ? "Foto: Valeria, Seúl, primavera de 2024."
                : "Photo: Valeria, Seoul, spring 2024."}
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:pl-4">
            <span className="kicker text-ink-soft">01 · {locale === "es" ? "Editorial" : "Editorial"}</span>
            <h2
              className="text-ink mt-4 mb-6 leading-[0.95]"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                letterSpacing: "-0.02em",
              }}
            >
              <span className="italic">"</span>Construyo
              <br />
              cosas que
              <br />
              <span className="italic">se sostienen.</span>
              <span className="italic">"</span>
            </h2>
            <div className="space-y-4 prose-editorial body-lg text-ink leading-relaxed border-l-2 border-ink pl-5">
              <p>
                {locale === "es"
                  ? "Soy Valeria. Diseño marca, producto y estrategia. Llevo cinco años cruzando Bilbao, Berlín, Bogotá y Seúl, sosteniendo dos lenguajes y dos audiencias."
                  : "I'm Valeria. I design brand, product, strategy. Five years crossing Bilbao, Berlin, Bogotá, Seoul, holding two languages and two audiences."}
              </p>
              <p>
                {locale === "es"
                  ? "Mi trabajo vive en el cruce: marcas que abren ecosistemas, productos que aterrizan en realidades distintas, eventos que reúnen voces que no se hablaban."
                  : "My work lives at intersections: brands that open ecosystems, products that land in different realities, events that gather voices that weren't talking."}
              </p>
            </div>
            <a
              href="mailto:hola@valeria.archive"
              className="kicker text-ink underline-soft mt-8 inline-flex items-baseline gap-2"
            >
              {locale === "es" ? "Sigue leyendo · escríbeme" : "Read on · write me"}{" "}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Inside this issue — table of contents style ── */}
      <section className="container-page py-16 sm:py-24 border-b border-ink/30">
        <div className="flex items-baseline justify-between mb-10 border-b border-ink/20 pb-3">
          <h2
            className="text-ink"
            style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontStyle: "italic" }}
          >
            En esta edición
          </h2>
          <span className="kicker-muted">
            {locale === "es" ? "5 proyectos hero · 12 menciones" : "5 hero projects · 12 mentions"}
          </span>
        </div>

        <ol className="flex flex-col">
          {[
            { n: "02", title: "Global Youth Summit", brand: "BOOST LAB", year: "2024", page: "P. 14" },
            { n: "03", title: "Misiones Internacionales · Korea", brand: "BOOST LAB", year: "2024", page: "P. 22" },
            { n: "04", title: "Sejong Hackathon", brand: "BOOST LAB", year: "2024", page: "P. 28" },
            { n: "05", title: "JAL × NomadHer", brand: "NomadHer", year: "2024", page: "P. 36" },
            { n: "06", title: "NomadHer · The App", brand: "NomadHer", year: "2024", page: "P. 44" },
          ].map((it) => (
            <li key={it.n} className="border-b border-ink/15 py-5">
              <Link
                href={`/work/${it.title === "Misiones Internacionales · Korea" ? "misiones-internacionales" : it.title.toLowerCase().includes("global") ? "global-youth-summit" : it.title.toLowerCase().includes("sejong") ? "sejong-hackathon" : it.title.toLowerCase().includes("jal") ? "jal-nomadher" : "nomadher-app"}`}
                className="grid grid-cols-12 gap-3 items-baseline group hover:bg-cream-deep/40 -mx-2 px-2 py-2 rounded transition"
              >
                <span className="col-span-1 num text-ink-soft text-xl">{it.n}</span>
                <h3
                  className="col-span-12 sm:col-span-6 text-ink leading-tight"
                  style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.25rem, 2vw, 1.625rem)", fontWeight: 400 }}
                >
                  <span className="group-hover:italic transition">{it.title}</span>
                </h3>
                <span className="hidden sm:inline-block sm:col-span-2 kicker text-ink">{it.brand}</span>
                <span className="hidden sm:inline-block sm:col-span-1 kicker-muted">{it.year}</span>
                <span className="hidden sm:inline-block sm:col-span-2 text-right kicker-muted">{it.page}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Feature spread — pull quote left, photo right ── */}
      <section className="container-page py-16 sm:py-24 border-b border-ink/30">
        <span className="kicker text-ink-soft">P. 14 · {locale === "es" ? "Caso de estudio" : "Case study"}</span>
        <div className="grid-editorial items-start gap-y-12 mt-6">
          <div className="col-span-12 lg:col-span-6">
            <h2
              className="text-ink leading-[0.92] mb-8"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              <span className="italic">Global</span>
              <br />
              Youth Summit.
            </h2>
            <Decoration src={DECO.underlineSwoshes} size={200} className="text-ink mb-8 -mt-2" />

            <blockquote
              className="text-ink mb-10"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                fontStyle: "italic",
                lineHeight: 1.25,
              }}
            >
              "200+ jóvenes, 14 países, una marca bilingüe armada en menos de tres meses."
            </blockquote>

            <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/20 pt-6">
              {[
                { k: "Cliente", v: "BOOST LAB" },
                { k: locale === "es" ? "Lugar" : "Location", v: "Seoul" },
                { k: locale === "es" ? "Rol" : "Role", v: locale === "es" ? "Diseño + producción" : "Design + production" },
                { k: locale === "es" ? "Año" : "Year", v: "2024" },
              ].map((it) => (
                <div key={it.k}>
                  <span className="kicker-muted block mb-1">{it.k}</span>
                  <span className="body-lg text-ink">{it.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <NaturalPhoto
              src={encodeAsset(HERO_MANIFEST["global-youth-summit"].cover)!}
              alt="Global Youth Summit"
              maxHeightVh={75}
              rounded="rounded-none"
            />
            <div className="mt-3 flex items-baseline justify-between">
              <span className="kicker-muted italic">{locale === "es" ? "Foto principal" : "Lead image"}</span>
              <span className="kicker-muted">_MG_3552</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mini-features row — 3 columns like newspaper briefs ── */}
      <section className="container-page py-16 sm:py-24 border-b border-ink/30">
        <span className="kicker text-ink-soft mb-6 block">P. 22 · {locale === "es" ? "Breves" : "Briefs"}</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-4">
          {[
            { slug: "nobled-coffee", title: "NOBLED Coffee", standfirst: locale === "es" ? "Una marca de café que conecta Berlín con caficultores colombianos." : "A coffee brand connecting Berlin with Colombian farmers." },
            { slug: "brujula-etica", title: "Brújula Ética", standfirst: locale === "es" ? "Campaña de podcast para Javeriana y Loyola, ética para jóvenes." : "Podcast campaign for Javeriana and Loyola, ethics for youth." },
            { slug: "women-entrepreneur-summit-seoul", title: "Women Summit", standfirst: locale === "es" ? "El summit que nació de una pregunta: ¿dónde están las mujeres?" : "The summit born from a question: where are the women?" },
          ].map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}`} className="group block">
              <NaturalPhoto
                src={encodeAsset(MENTION_MANIFEST[p.slug as keyof typeof MENTION_MANIFEST].cover)!}
                alt={p.title}
                maxHeightVh={35}
                rounded="rounded-none"
              />
              <h3
                className="text-ink mt-4 group-hover:italic transition"
                style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", letterSpacing: "-0.015em" }}
              >
                {p.title}
              </h3>
              <p className="body text-ink mt-2 leading-relaxed border-t border-ink/15 pt-2">
                {p.standfirst}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <PickFooter slug="c-mancheta" locale={locale} />
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
