import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/content/types";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const PROPOSALS = [
  {
    slug: "a-diario-editorial",
    number: "01",
    name: "Diario Editorial",
    summary:
      "Adriana-style: Instrument Serif italic + MacWindow para fotos + scroll horizontal de Visual Diary cards. Calmo, espacio en blanco, lime solo como chispa.",
    mood: ["editorial", "instrument serif", "calmo", "polaroid pile"],
    accent: "lime",
  },
  {
    slug: "b-archivo-vivo",
    number: "02",
    name: "Archivo Vivo",
    summary:
      "Escritorio Mac: folders flotando, iconos cool dispersos (estrella, plane, camera), polaroid pile dominante. Más vivo y juguetón pero sigue editorial.",
    mood: ["desktop", "folders", "draggable", "stickers"],
    accent: "pink",
  },
  {
    slug: "c-mancheta",
    number: "03",
    name: "Mancheta",
    summary:
      "Front-page de revista: gran titular Instrument Serif italic, secciones numeradas como artículos, hairline rules separando, pull-quotes grandes. Elegante.",
    mood: ["magazine", "front page", "numbered", "pull-quotes"],
    accent: "red",
  },
];

const ACCENT_BG: Record<string, string> = {
  lime: "bg-lime",
  pink: "bg-pink",
  red: "bg-red",
};

export default async function ProposalsIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  return (
    <main className="container-page py-20 sm:py-28">
      <header className="mb-16 max-w-3xl">
        <span className="kicker-muted">
          {locale === "es" ? "Tres direcciones visuales" : "Three visual directions"}
        </span>
        <h1 className="display-2xl text-ink mt-4 leading-[0.95]">
          Escoge una.
        </h1>
        <p className="lead text-ink mt-6">
          {locale === "es"
            ? "Cada propuesta usa los mismos assets (tus fotos, iconos, formas) pero ataca el problema con un mood distinto. Abre las tres, compara, y dime cuál se siente como tú."
            : "Each proposal uses the same assets (your photos, icons, shapes) but attacks the problem with a different mood. Open the three, compare, and tell me which one feels like you."}
        </p>
      </header>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PROPOSALS.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/proposals/${p.slug}`}
              className="group flex flex-col h-full bg-cream-deep rounded-3xl p-7 shadow-[0_18px_40px_-18px_rgba(40,49,50,0.22)] hover:-translate-y-1 hover:shadow-[0_28px_55px_-20px_rgba(40,49,50,0.30)] transition-all duration-300"
            >
              <div className="flex items-baseline justify-between mb-8">
                <span className="num text-ink-soft text-2xl">{p.number}</span>
                <span
                  className={`size-3 rounded-full ${ACCENT_BG[p.accent]}`}
                  aria-hidden
                />
              </div>
              <h2 className="display-lg text-ink font-display leading-tight mb-4">
                {p.name}
              </h2>
              <p className="body text-ink mb-6">{p.summary}</p>
              <ul className="flex flex-wrap gap-x-3 gap-y-1 mb-auto">
                {p.mood.map((m, i) => (
                  <li
                    key={m}
                    className="kicker text-ink-soft flex items-center gap-2"
                  >
                    {i > 0 && <span aria-hidden className="text-ink-muted">·</span>}
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center justify-between">
                <span className="kicker text-ink underline-soft">
                  {locale === "es" ? "Abrir propuesta" : "Open proposal"}
                </span>
                <span className="kicker-muted">→</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <footer className="mt-20 max-w-2xl">
        <p className="body text-ink-soft">
          {locale === "es"
            ? "Cada propuesta es un boceto navegable: hero + sneak peek + preview de proyecto. Cuando escojas una, replico esa dirección en TODAS las páginas del portafolio."
            : "Each proposal is a navigable sketch: hero + sneak peek + project preview. When you pick one, I roll that direction across every page of the portfolio."}
        </p>
      </footer>
    </main>
  );
}
