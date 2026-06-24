import type { Locale } from "@/content/types";
import type { Mention } from "@/content/mentions";
import { PhotoCarousel } from "./PhotoCarousel";
import { PhotoStack } from "./PhotoStack";
import { PhotoMosaic } from "./PhotoMosaic";
import { FullBleedShowcase } from "./FullBleedShowcase";
import { NotesCard } from "./NotesCard";
import { MarkerHeading } from "./MarkerHeading";
import { Stat } from "./Stat";
import { Link } from "@/i18n/navigation";
import { listPhotos } from "@/lib/photos";
import { MENTION_MANIFEST, encodeAsset, resolveDecks } from "@/content/photo-manifest";

function splitTitle(title: string): { lead: string; italic: string } {
  const words = title.split(" ");
  if (words.length === 1) return { lead: title, italic: "" };
  if (words.length === 2) return { lead: words[0], italic: words[1] };
  const mid = Math.max(1, Math.floor(words.length / 2));
  return { lead: words.slice(0, mid).join(" "), italic: words.slice(mid).join(" ") };
}

export async function MentionDetail({
  mention,
  locale,
}: {
  mention: Mention;
  locale: Locale;
}) {
  const m = MENTION_MANIFEST[mention.id] ?? {};
  const cover = encodeAsset(m.cover);
  const spotlight = encodeAsset(m.spotlight);
  const mosaicPhotos = (m.mosaic ?? []).map((p) => encodeAsset(p)!);
  const mainCarousel = (m.mainCarousel ?? []).map((p) => encodeAsset(p)!);
  const deckGroups = resolveDecks(m.decks, listPhotos);

  const { lead, italic } = splitTitle(mention.title);

  return (
    <article className="pb-24">
      {/* ── Back ── */}
      <div className="container-page pt-24 sm:pt-28">
        <Link
          href="/projects"
          className="kicker text-ink underline-soft inline-flex items-baseline gap-2"
        >
          <span aria-hidden>←</span> {mention.brand}
        </Link>
      </div>

      {/* ── Title block ── */}
      <div className="container-page pt-8 sm:pt-12 pb-10 sm:pb-14">
        <div className="flex flex-wrap items-baseline gap-3 mb-6">
          <span className="badge-lime">{mention.brand}</span>
          <span className="kicker-muted">{mention.location}</span>
          <span className="kicker-muted">·</span>
          <span className="kicker-muted">{mention.date[locale]}</span>
        </div>
        <MarkerHeading
          as="h1"
          size="xl"
          lead={lead}
          italic={italic || mention.brand}
          tone="lime"
        />
      </div>

      {/* ── Full-bleed cover with NotesCard "context" ── */}
      {cover && (
        <FullBleedShowcase
          src={cover}
          alt={mention.title}
          height="78vh"
          focal="center 40%"
          desktopIcons={[]}
          notesOverlay={
            <NotesCard
              back={locale === "es" ? "Notas" : "Notes"}
              title={locale === "es" ? "el contexto" : "the context"}
              rotate={2}
            >
              {mention.tagline[locale]}
            </NotesCard>
          }
          notesSide="right"
        />
      )}

      {/* ── Body ── */}
      <div className="container-page pt-20 sm:pt-28 flex flex-col gap-20 sm:gap-28">
        {/* My role + spotlight side-by-side */}
        {(mention.myRole || mention.roleItems || spotlight) && (
          <div className="grid-editorial items-start gap-y-12">
            <div className="col-span-12 lg:col-span-5">
              <MarkerHeading
                as="h2"
                size="md"
                lead={locale === "es" ? "mi" : "my"}
                italic={locale === "es" ? "rol" : "role"}
                tone="sky"
                className="mb-6"
              />
              {mention.myRole && (
                <p className="body text-ink mb-5">{mention.myRole[locale]}</p>
              )}
              {mention.roleItems && (
                <ul className="flex flex-col">
                  {mention.roleItems[locale].slice(0, 5).map((it, i) => (
                    <li
                      key={i}
                      className="border-t border-ink/15 last:border-b py-3 flex gap-3 items-baseline text-ink"
                    >
                      <span className="text-lime text-xs font-bold shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="body">{it}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {spotlight && (
              <div className="col-span-12 lg:col-span-7">
                <FullBleedShowcase
                  src={spotlight}
                  alt={`${mention.title} — spotlight`}
                  height="60vh"
                  focal="center"
                  notesOverlay={
                    mention.results && mention.results.length > 0 ? (
                      <NotesCard
                        back={locale === "es" ? "Notas" : "Notes"}
                        title={locale === "es" ? "resultados" : "results"}
                        rotate={-2}
                      >
                        <ul className="space-y-1.5">
                          {mention.results.slice(0, 3).map((r, i) => (
                            <li key={i}>
                              <span className="marker-hl marker-hl-lime">
                                {typeof r.value === "string" ? r.value : r.value[locale]}
                              </span>{" "}
                              {r.label[locale]}
                            </li>
                          ))}
                        </ul>
                      </NotesCard>
                    ) : undefined
                  }
                  notesSide="right"
                />
              </div>
            )}
          </div>
        )}

        {/* Mosaic */}
        {mosaicPhotos.length > 0 && (
          <div>
            <MarkerHeading
              as="h2"
              size="md"
              lead={locale === "es" ? "las" : "the"}
              italic={locale === "es" ? "piezas" : "pieces"}
              tone="lime"
              className="mb-8"
            />
            <PhotoMosaic photos={mosaicPhotos} alt={mention.title} cap={3} />
          </div>
        )}

        {/* Grouped decks */}
        {deckGroups.length > 0 && (
          <div>
            <MarkerHeading
              as="h2"
              size="md"
              lead={locale === "es" ? "los" : "the"}
              italic={locale === "es" ? "carruseles" : "carousels"}
              tone="pink"
              className="mb-8"
            />
            <PhotoStack groups={deckGroups} alt={mention.title} />
          </div>
        )}

        {/* Gallery */}
        {mainCarousel.length > 1 && (
          <div>
            <MarkerHeading
              as="h2"
              size="md"
              lead={locale === "es" ? "la" : "the"}
              italic={locale === "es" ? "galería" : "gallery"}
              tone="sky"
              className="mb-8"
            />
            <PhotoCarousel photos={mainCarousel} alt={mention.title} />
          </div>
        )}

        {/* Extended results */}
        {mention.results && mention.results.length > 3 && (
          <div>
            <MarkerHeading
              as="h2"
              size="md"
              lead={locale === "es" ? "los" : "the"}
              italic={locale === "es" ? "números" : "numbers"}
              tone="lime"
              className="mb-8"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {mention.results.map((s, i) => (
                <Stat key={i} stat={s} locale={locale} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
