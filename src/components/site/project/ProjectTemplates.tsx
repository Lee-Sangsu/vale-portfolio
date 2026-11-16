import Image from "next/image";
import type { Locale } from "@/content/types";
import { getImageAspect, getImageSize, getTransparentHole, hasTransparency } from "@/lib/image-aspect";
import { PostCarousel } from "./PostCarousel";
import { DiaryMarquee } from "./DiaryMarquee";
import { isVideoPath } from "@/lib/project-photos";
import { LaptopCarousel } from "./LaptopCarousel";
import { DiaryVideo } from "./DiaryVideo";
import { SlideCarousel } from "./SlideCarousel";

export type TemplateId = "app" | "instagram" | "ppt" | "visual";

/** Every kind of section a project page can show: the four page templates plus posters and website. */
export type GalleryId = TemplateId | "afiches" | "web" | "grilla" | "moodboard" | "edition" | "portafolio";

export type TemplatePhotos = {
  portada?: string;
  celular: string[];
  instagram: string[];
  presentacion: string[];
  visual: string[];
  afiches?: string[];
  web?: string[];
  grilla?: string[];
  moodboard?: string[];
  /** A second deck (the company portfolio...), shown as its own slider. */
  portafolio?: string[];
  /** Tall page screenshots that scroll inside the laptop of the same position in `web`. */
  webScreens?: string[];
  /** Instagram pieces grouped by post (one carousel each). */
  instagramPosts?: string[][];
  /** Everything for the "Visual Diary" section: photos and videos. */
  diario?: MediaItem[];
  /** Rows of the Visual Diary marquee (2 by default). */
  diaryRows?: number;
};

export type MediaItem = { src: string; kind: "image" | "video" };

/** Where the photos of each template go; shown as a hint while developing. */
export type UploadHints = Record<string, string>;

const SHOW_HINTS = process.env.NODE_ENV !== "production";

function EmptyHint({ path, label }: { path: string; label: string }) {
  if (!SHOW_HINTS) return null;
  return (
    <div className="font-inter rounded-[14px] border border-dashed border-[#c8c8c2] bg-[#fafaf8] px-6 py-10 text-center text-[14px] leading-relaxed text-[#6e726e]">
      {label}
      <br />
      <code className="text-[13px]">{path}</code>
    </div>
  );
}

function Photo({
  src,
  className = "",
  sizes,
  priority,
  fit = "object-cover",
}: {
  src: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  /** Tailwind object-fit / object-position classes. */
  fit?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-[#ecece7] ${className}`}>
      <Image src={src} alt="" fill sizes={sizes} priority={priority} className={fit} />
    </div>
  );
}

/** A phone mockup around a screenshot: dark bezel, rounded screen and a small camera island. */
function PhoneFrame({
  src,
  sizes,
  priority,
  className = "",
}: {
  src: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-[13%/6%] bg-[#10110d] p-[3.2%] shadow-[0_18px_40px_rgba(0,0,0,0.22)] ${className}`}
    >
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[10.5%/4.9%] bg-[#ecece7]">
        <Image src={src} alt="" fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
      <span
        aria-hidden="true"
        className="absolute top-[2.6%] left-1/2 h-[1.7%] w-[26%] -translate-x-1/2 rounded-full bg-[#10110d]"
      />
    </div>
  );
}

const COLLAGE_GAP = 6;
const COLLAGE_TARGET_HEIGHT = 420;

/**
 * Groups photos (in order) into rows so every row lands near the target height.
 * A row's height is (width - gaps) / sum of its aspect ratios, so wide photos make short rows and
 * tall ones make tall rows: the sizes vary with what each photo needs and nothing is cropped.
 */
function packRows(aspects: number[], width: number) {
  const n = aspects.length;
  const heightOf = (from: number, to: number) => {
    let sum = 0;
    for (let i = from; i < to; i++) sum += aspects[i];
    return (width - (to - from - 1) * COLLAGE_GAP) / sum;
  };
  const best: number[] = new Array(n + 1).fill(Infinity);
  const cut: number[] = new Array(n + 1).fill(0);
  best[0] = 0;
  for (let to = 1; to <= n; to++) {
    for (let from = Math.max(0, to - 4); from < to; from++) {
      const h = heightOf(from, to);
      const cost = best[from] + Math.abs(Math.log(h / COLLAGE_TARGET_HEIGHT));
      if (cost < best[to]) {
        best[to] = cost;
        cut[to] = from;
      }
    }
  }
  const rows: [number, number][] = [];
  for (let to = n; to > 0; to = cut[to]) rows.unshift([cut[to], to]);
  return rows;
}

/** Tight mosaic: photos and clips packed edge to edge with a thin gap, each in its own proportions and direction. */
async function TightCollage({ media, title }: { media: MediaItem[]; title: string }) {
  const items = await Promise.all(media.map(async (m) => ({ ...m, aspect: await getImageAspect(m.src) })));
  const rows = packRows(
    items.map((i) => i.aspect),
    1180,
  );
  return (
    <div role="group" aria-label={title} className="flex flex-col" style={{ gap: COLLAGE_GAP }}>
      {rows.map(([from, to]) => (
        <div key={from} className="flex flex-col sm:flex-row" style={{ gap: COLLAGE_GAP }}>
          {items.slice(from, to).map(({ src, kind, aspect }, i) => (
            <div
              key={src}
              className="relative overflow-hidden bg-[#ecece7] sm:min-w-0"
              style={{ flex: `${aspect} 1 0%`, aspectRatio: String(aspect) }}
            >
              {kind === "video" ? (
                <DiaryVideo src={src} label={title} />
              ) : (
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes={`(min-width: 1280px) ${Math.round((1180 * aspect) / items.slice(from, to).reduce((n, p) => n + p.aspect, 0))}px, 100vw`}
                  priority={from === 0 && i < 3}
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Hero media, one layout per Figma template:
 * - visual:    4×2 photo grid under the title
 * - app:       two overlapping phones next to the title
 * - instagram: photos in a ring around a soft glow
 * - ppt:       three tall slides next to the title
 * Returns null when there is nothing to show (the page falls back to the plain cover).
 */
export async function HeroMedia({
  template,
  photos,
  title,
}: {
  template: TemplateId;
  photos: TemplatePhotos;
  title: string;
}) {
  if (template === "app" && photos.celular.length) {
    const [first, second] = photos.celular;
    // Transparent PNG/WebP files are mockups that already carry their own phone frame and shadow: use them as they are.
    const framed = await hasTransparency(first);
    const aspects = await Promise.all([first, second].filter(Boolean).map((src) => getImageAspect(src)));
    return (
      <div
        role="img"
        aria-label={title}
        // Side by side, almost touching: the small one behind-left, the big one right. Height drives the size.
        className="mx-auto flex h-[min(88vw,560px)] w-full items-center justify-center gap-0 lg:h-[min(41vw,620px)]"
      >
        {framed ? (
          <>
            <div className="relative h-[80%] shrink-0" style={{ aspectRatio: String(aspects[0]) }}>
              <Image
                src={first}
                alt=""
                fill
                priority
                quality={92}
                sizes="(min-width: 1024px) 640px, 90vw"
                className="object-contain"
              />
            </div>
            {second ? (
              <div className="relative h-[97%] shrink-0" style={{ aspectRatio: String(aspects[1]) }}>
                <Image
                  src={second}
                  alt=""
                  fill
                  priority
                  quality={92}
                  sizes="(min-width: 1024px) 760px, 100vw"
                  className="object-contain"
                />
              </div>
            ) : null}
          </>
        ) : (
          <>
            <PhoneFrame src={first} sizes="260px" priority className="h-auto w-[36%] shrink-0" />
            {second ? <PhoneFrame src={second} sizes="320px" priority className="h-auto w-[44%] shrink-0" /> : null}
          </>
        )}
      </div>
    );
  }

  if (template === "instagram" && photos.instagram.length) {
    const ring = photos.instagram.slice(0, 7);
    const aspects = await Promise.all(ring.map((src) => getImageAspect(src)));
    // Tiles shrink a little as the ring fills up, so neighbours never overlap.
    const tileWidth = Math.min(18, 200 / ring.length);
    return (
      <div
        role="img"
        aria-label={title}
        className="relative mx-auto aspect-square w-full max-w-[620px]"
      >
        <style>{`
          @keyframes project-ring-spin { to { transform: rotate(360deg); } }
          @keyframes project-ring-unspin { to { transform: rotate(-360deg); } }
          @media (prefers-reduced-motion: no-preference) {
            .project-ring { animation: project-ring-spin 70s linear infinite; }
            .project-ring-photo { animation: project-ring-unspin 70s linear infinite; }
          }
        `}</style>
        <div
          aria-hidden="true"
          className="absolute inset-[4%] rounded-full bg-[radial-gradient(closest-side,rgba(255,177,219,0.6),rgba(255,177,219,0))]"
        />
        <div className="project-ring absolute inset-0">
          {ring.map((src, i) => {
            const angle = (i / ring.length) * Math.PI * 2 - Math.PI / 2;
            return (
              <div
                key={src}
                className="absolute"
                style={{
                  width: `${tileWidth}%`,
                  left: `${50 + 38 * Math.cos(angle)}%`,
                  top: `${50 + 38 * Math.sin(angle)}%`,
                  transform: `translate(-50%, -50%) rotate(${(angle * 180) / Math.PI + 90}deg)`,
                }}
              >
                <div
                  className="relative overflow-hidden rounded-[4px] bg-[#ecece7] shadow-[0_8px_20px_rgba(0,0,0,0.16)]"
                  style={{ aspectRatio: String(aspects[i]) }}
                >
                  <Image src={src} alt="" fill quality={92} sizes="240px" className="object-cover" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // A deck project can open with one picture of its own (a printed piece on a wall...) instead of the first slides.
  if (template === "ppt" && photos.visual.length === 1) {
    const [src] = photos.visual;
    const aspect = await getImageAspect(src);
    return (
      <div
        role="img"
        aria-label={title}
        className="relative mx-auto w-full overflow-hidden rounded-[18px] bg-[#ecece7] shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
        style={{ aspectRatio: String(aspect) }}
      >
        <Image src={src} alt="" fill priority quality={92} sizes="(min-width: 1024px) 1000px, 100vw" className="object-cover" />
      </div>
    );
  }

  if (template === "ppt" && photos.presentacion.length) {
    return (
      <div role="img" aria-label={title} className="flex gap-3 sm:gap-5">
        {photos.presentacion.slice(0, 3).map((src, i) => (
          <Photo
            key={src}
            src={src}
            sizes="(min-width: 1024px) 220px, 30vw"
            priority={i === 0}
            fit="object-cover object-top"
            className="aspect-[343/588] flex-1 rounded-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
          />
        ))}
      </div>
    );
  }

  // A single picture is a collage already composed by hand: show it whole, in its own proportions.
  if (template === "visual" && photos.visual.length === 1) {
    const [src] = photos.visual;
    const aspect = await getImageAspect(src);
    return (
      <div
        role="img"
        aria-label={title}
        className="relative mx-auto w-full overflow-hidden rounded-[20px] bg-[#ecece7]"
        style={{ aspectRatio: String(aspect) }}
      >
        <Image src={src} alt="" fill priority sizes="(min-width: 1280px) 1180px, 92vw" className="object-cover" />
      </div>
    );
  }

  if (template === "visual" && photos.visual.length >= 8) {
    return (
      <TightCollage
        media={photos.visual.slice(0, heroCollageCount(photos.visual.length)).map((src) => ({ src, kind: "image" as const }))}
        title={title}
      />
    );
  }

  // With a Visual Diary below, `visual/` is only the hero: a small hand-picked collage (2 to 7 photos) is fine.
  if (template === "visual" && photos.visual.length >= 2 && photos.diario?.length) {
    return <TightCollage media={photos.visual.map((src) => ({ src, kind: "image" as const }))} title={title} />;
  }

  return null;
}

/**
 * Photos the hero mosaic takes from `visual/` (01…06); everything after them goes to the gallery below.
 * When fewer than four would be left over, the mosaic keeps them all (up to 12) instead of leaving a thin gallery.
 */
const HERO_COLLAGE_COUNT = 6;
function heroCollageCount(total: number) {
  return total - HERO_COLLAGE_COUNT >= 4 ? HERO_COLLAGE_COUNT : Math.min(total, 12);
}

type Sized = { src: string; aspect: number };

/** Seven photos shaped wide ×3, tall ×2, wide ×2 (in that order) fit the seven-piece collage. */
function fitsSevenPieceCollage(items: Sized[]) {
  return (
    items.length === 7 &&
    items.slice(0, 3).every((i) => i.aspect > 1) &&
    items.slice(3, 5).every((i) => i.aspect < 1) &&
    items.slice(5).every((i) => i.aspect > 1)
  );
}

/**
 * Collage for exactly seven photos, in file order (01…07):
 *   01 02 03   three wide pieces across the top
 *   04 05      two tall pieces side by side on the left
 *   06 / 07    two wide pieces stacked on the right
 * Every photo keeps its own proportions; widths are solved so the bottom row has one common height.
 */
function SevenPieceCollage({ items }: { items: Sized[] }) {
  const GAP = "20px";
  const [a, b, c, p, q, r, t] = items;
  const topSum = a.aspect + b.aspect + c.aspect;
  const s = 1 / r.aspect + 1 / t.aspect; // stacked pair: total height per unit of width
  // Bottom row height h = (W - 2g + g/s) / (p + q + 1/s), with W = 100cqw
  const h = `calc((100cqw - 2 * ${GAP} + ${GAP} / ${s}) / ${p.aspect + q.aspect + 1 / s})`;
  const tile = (item: Sized, width: string) => (
    <div
      key={item.src}
      className="relative shrink-0 overflow-hidden rounded-[14px] bg-[#ecece7]"
      style={{ width, aspectRatio: String(item.aspect) }}
    >
      <Image src={item.src} alt="" fill sizes="(min-width: 1024px) 560px, 50vw" className="object-cover" />
    </div>
  );
  return (
    <div className="@container mt-10 hidden sm:block" style={{ containerType: "inline-size" }}>
      <div className="flex" style={{ gap: GAP }}>
        {[a, b, c].map((item) =>
          tile(item, `calc((100cqw - 2 * ${GAP}) * ${item.aspect / topSum})`),
        )}
      </div>
      <div className="flex items-start" style={{ gap: GAP, marginTop: GAP }}>
        {tile(p, `calc(${h} * ${p.aspect})`)}
        {tile(q, `calc(${h} * ${q.aspect})`)}
        <div className="flex flex-col" style={{ gap: GAP, width: `calc((${h} - ${GAP}) / ${s})` }}>
          {[r, t].map((item) => (
            <div
              key={item.src}
              className="relative w-full overflow-hidden rounded-[14px] bg-[#ecece7]"
              style={{ aspectRatio: String(item.aspect) }}
            >
              <Image src={item.src} alt="" fill sizes="(min-width: 1024px) 400px, 33vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Gallery shown after the Overview, one per template. */
export async function TemplateGallery({
  template,
  photos,
  locale,
  hints,
  title,
  body,
  labels,
  account,
  visualInHero = true,
}: {
  template: GalleryId;
  photos: TemplatePhotos;
  locale: Locale;
  hints: UploadHints;
  /** Overrides the section heading. */
  title?: string;
  /** Short text under the title (edition bands). */
  body?: string;
  /** One line under each moodboard proposal (its keywords). */
  labels?: string[];
  /** Account name shown on the Instagram posts. */
  account?: string;
  /** False when the visual photos are not in the page's hero (a project of another template), so all of them show here. */
  visualInHero?: boolean;
}) {
  const es = locale === "es";

  if (template === "afiches") {
    return (
      <section className="bg-white py-24 sm:py-40">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <h2 className="font-inter text-ink2 text-center text-[clamp(2.6rem,6vw,4.6rem)] leading-none font-bold">
            {title ?? (es ? "Afiches" : "Posters")}
          </h2>
          <div className="mt-6 sm:mt-10">
            <SlideCarousel
              slides={await Promise.all(
                (photos.afiches ?? []).map(async (src) => ({ src, aspect: await getImageAspect(src) })),
              )}
              previousLabel={es ? "Pieza anterior" : "Previous piece"}
              nextLabel={es ? "Pieza siguiente" : "Next piece"}
            />
          </div>
        </div>
      </section>
    );
  }

  if (template === "portafolio") {
    return (
      <section className="bg-white py-24 sm:py-40">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <h2 className="font-inter text-ink2 text-center text-[clamp(2.6rem,6vw,4.6rem)] leading-none font-bold">
            {title ?? (es ? "Portafolio" : "Portfolio")}
          </h2>
          <div className="mt-6 sm:mt-10">
            <SlideCarousel
              slides={await Promise.all(
                (photos.portafolio ?? []).map(async (src) => ({ src, aspect: await getImageAspect(src) })),
              )}
              previousLabel={es ? "Página anterior" : "Previous page"}
              nextLabel={es ? "Página siguiente" : "Next page"}
            />
          </div>
        </div>
      </section>
    );
  }

  if (template === "web") {
    return (
      <section className="bg-white py-24 sm:py-40">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <h2 className="font-inter text-ink2 text-center text-[clamp(2.6rem,6vw,4.6rem)] leading-none font-bold">
            {title ?? "Website"}
          </h2>
          <LaptopCarousel
            screens={await Promise.all(
              (photos.web ?? []).map(async (src, i) => {
                const screenshot = photos.webScreens?.[i];
                const hole = screenshot ? await getTransparentHole(src) : null;
                const size = screenshot ? await getImageSize(screenshot) : null;
                return {
                  src,
                  aspect: await getImageAspect(src),
                  framed: await hasTransparency(src),
                  scroll: screenshot && hole && size ? { src: screenshot, ...size, hole } : undefined,
                };
              }),
            )}
            previousLabel={es ? "Pantalla anterior" : "Previous screen"}
            nextLabel={es ? "Pantalla siguiente" : "Next screen"}
            scrollHint={
              es
                ? {
                    pointer: "Desplázate aquí para recorrer el sitio",
                    touch: "Desliza aquí para recorrer el sitio",
                    label: "Sitio web: desplázate para recorrerlo",
                  }
                : {
                    pointer: "Scroll here to explore the site",
                    touch: "Swipe here to explore the site",
                    label: "Website: scroll to explore it",
                  }
            }
          />
        </div>
      </section>
    );
  }

  if (template === "app") {
    const phones = photos.celular;
    // The hero already shows the first two screens: the fan only appears when there are more than that.
    if (phones.length > 0 && phones.length <= 2) return null;
    return (
      <section className="overflow-hidden bg-white py-24 sm:py-36">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <h2 className="font-inter text-ink2 text-[32px] leading-tight font-bold sm:text-[40px]">
            {es ? "Pantallas" : "Screens"}
          </h2>
          {phones.length ? (
            <ul className="mt-12 flex items-end justify-start gap-4 overflow-x-auto px-2 pt-8 pb-10 sm:justify-center sm:gap-0 sm:overflow-visible">
              {phones.map((src, i) => {
                const mid = (phones.length - 1) / 2;
                const offset = i - mid;
                return (
                  <li
                    key={src}
                    className="w-[150px] shrink-0 transition-transform duration-300 hover:z-10 hover:-translate-y-3 sm:-ml-6 sm:w-[19%] sm:max-w-[200px] sm:first:ml-0"
                    style={{
                      transform: `translateY(${Math.abs(offset) * 14}px) rotate(${offset * 4}deg)`,
                    }}
                  >
                    <PhoneFrame src={src} sizes="220px" />
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="mt-10">
              <EmptyHint
                path={hints.celular}
                label={es ? "Sube las pantallas de la app en:" : "Add the app screens in:"}
              />
            </div>
          )}
        </div>
      </section>
    );
  }

  if (template === "instagram") {
    const posts = photos.instagramPosts?.length ? photos.instagramPosts : photos.instagram.length ? [photos.instagram] : [];
    const total = posts.reduce((n, group) => n + group.length, 0);
    const aspects = await Promise.all(posts.map((group) => getImageAspect(group[0])));
    return (
      <section className="bg-white py-24 sm:py-36">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="text-center">
            <h2 className="font-inter text-ink2 text-[32px] leading-tight font-semibold">
              {title ?? "Social Media Carousel"}
            </h2>
            {total ? (
              <p className="font-inter mt-2 text-[14px] text-[#9aa09a]">
                {posts.length > 1
                  ? `${posts.length} ${es ? "posts" : "posts"} · ${total} ${es ? "piezas" : "slides"}`
                  : `${total} ${es ? "piezas" : "slides"}`}
              </p>
            ) : null}
          </div>
          {posts.length ? (
            (() => {
              // Still posts first, as a feed (one, two or three columns); reels in their own row below them.
              const indexed = posts.map((group, i) => ({ group, i }));
              const stills = indexed.filter(({ group }) => !(group.length === 1 && isVideoPath(group[0])));
              const reels = indexed.filter(({ group }) => group.length === 1 && isVideoPath(group[0]));
              const cols = (n: number) => (n >= 3 ? "md:grid-cols-3 md:gap-8" : n === 2 ? "md:grid-cols-2 md:gap-12" : "");
              const card = ({ group, i }: { group: string[]; i: number }, isReel: boolean) => (
                <PostCarousel
                  key={group[0]}
                  slides={group}
                  aspect={aspects[i]}
                  account={account ?? ""}
                  caption={
                    isReel
                      ? posts.length > 1
                        ? `${es ? "Post" : "Post"} ${i + 1} · Reel`
                        : "Reel"
                      : posts.length > 1
                        ? `${es ? "Post" : "Post"} ${i + 1} · ${group.length} ${es ? "piezas" : "slides"}`
                        : `${group.length} ${es ? "piezas" : "slides"}`
                  }
                  previousLabel={es ? "Pieza anterior" : "Previous slide"}
                  nextLabel={es ? "Pieza siguiente" : "Next slide"}
                  slideLabel={es ? "Ver pieza" : "Show slide"}
                />
              );
              return (
                <>
                  {stills.length ? (
                    <div className={`mt-12 grid gap-10 sm:mt-16 ${cols(stills.length)}`}>{stills.map((p) => card(p, false))}</div>
                  ) : null}
                  {reels.length ? (
                    <div className={`grid gap-10 ${stills.length ? "mt-10 md:mt-12" : "mt-12 sm:mt-16"} ${cols(reels.length)}`}>
                      {reels.map((p) => card(p, true))}
                    </div>
                  ) : null}
                </>
              );
            })()
          ) : (
            <div className="mt-10">
              <EmptyHint
                path={hints.instagram}
                label={es ? "Sube los posts y carruseles en:" : "Add the posts and carousels in:"}
              />
            </div>
          )}
        </div>
      </section>
    );
  }

  if (template === "edition") {
    return (
      <section className="bg-[#3a17b0] py-14 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 text-center sm:px-8">
          <h2 className="font-inter text-[clamp(2.2rem,5vw,3.6rem)] leading-none font-bold text-white">{title}</h2>
          {body ? (
            <p className="font-inter mx-auto mt-6 max-w-[640px] text-[17px] leading-[1.55] text-white/90">{body}</p>
          ) : null}
        </div>
      </section>
    );
  }

  if (template === "moodboard") {
    const boards = await Promise.all(
      (photos.moodboard ?? []).map(async (src) => ({ src, aspect: await getImageAspect(src) })),
    );
    const chosenIndex = boards.length - 1;
    const board = ({ src, aspect }: { src: string; aspect: number }, index: number) => {
      const chosen = index === chosenIndex && boards.length > 1;
      return (
        <figure key={src}>
          <div
            className="relative w-full overflow-hidden rounded-[10px] bg-[#ecece7] shadow-[0_10px_32px_rgba(0,0,0,0.16)]"
            style={{ aspectRatio: String(aspect) }}
          >
            <Image src={src} alt="" fill quality={92} sizes="(min-width: 1024px) 1200px, 92vw" className="object-cover" />
          </div>
          <figcaption className="font-inter text-ink2 mt-4 flex items-center gap-3 text-[15px] font-bold">
            {es ? `Propuesta ${index + 1}` : `Proposal ${index + 1}`}
            {labels?.[index] ? <span className="text-ink font-normal">· {labels[index]}</span> : null}
            {chosen ? (
              <span className="rounded-full bg-[#3a17b0] px-3 py-1 text-[12px] font-semibold text-white">
                {es ? "Elegida" : "Chosen"}
              </span>
            ) : null}
          </figcaption>
        </figure>
      );
    };
    return (
      <section className="bg-white py-24 sm:py-36">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <h2 className="font-inter text-ink2 text-center text-[clamp(2.6rem,6vw,4.6rem)] leading-none font-bold">
            {title ?? (es ? "Decisión creativa" : "Creative decision")}
          </h2>
          <p className="font-inter text-ink mx-auto mt-8 max-w-[640px] text-center text-[17px] leading-[1.55]">
            {es
              ? "Querían un diseño que atrajera al público joven. Se presentaron tres propuestas visuales y ellos escogieron la 3, de donde se desarrolló el concepto."
              : "They wanted a design that would attract a young audience. Three visual proposals were presented and they chose the third one, from which the concept was developed."}
          </p>
          <div className="mt-16 grid gap-10 sm:mt-20 md:grid-cols-2">
            {boards.slice(0, chosenIndex).map(board)}
          </div>
          {boards.length ? <div className="mt-10">{board(boards[chosenIndex], chosenIndex)}</div> : null}
        </div>
      </section>
    );
  }

  if (template === "grilla") {
    return (
      <section className="bg-white py-24 sm:py-40">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <h2 className="font-inter text-ink2 text-center text-[clamp(2.6rem,6vw,4.6rem)] leading-none font-bold">
            {title ?? (es ? "Grilla" : "Grid")}
          </h2>
          {/* Long feeds can arrive in several parts: they stack with no gap, as one continuous grid. */}
          <div className="mx-auto mt-16 max-w-[1000px] overflow-hidden rounded-[10px] bg-white shadow-[0_10px_32px_rgba(0,0,0,0.16)] sm:mt-24">
            {await Promise.all(
              (photos.grilla ?? []).map(async (src) => {
                const aspect = await getImageAspect(src);
                return (
                  <div key={src} className="relative w-full bg-[#ecece7]" style={{ aspectRatio: String(aspect) }}>
                    <Image
                      src={src}
                      alt=""
                      fill
                      quality={92}
                      sizes="(min-width: 1040px) 1000px, 92vw"
                      className="object-cover"
                    />
                  </div>
                );
              }),
            )}
          </div>
        </div>
      </section>
    );
  }

  if (template === "ppt") {
    return (
      <section className="bg-white py-24 sm:py-36">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <h2 className="font-inter text-ink2 text-[32px] leading-tight font-bold sm:text-[40px]">
            {title ?? (es ? "Las presentaciones" : "The decks")}
          </h2>
          {photos.presentacion.length ? (
            <SlideCarousel
              slides={await Promise.all(
                photos.presentacion.map(async (src) => ({ src, aspect: await getImageAspect(src) })),
              )}
              previousLabel={es ? "Diapositiva anterior" : "Previous slide"}
              nextLabel={es ? "Diapositiva siguiente" : "Next slide"}
            />
          ) : (
            <div className="mt-10">
              <EmptyHint
                path={hints.presentacion}
                label={es ? "Sube las diapositivas en:" : "Add the slides in:"}
              />
            </div>
          )}
        </div>
      </section>
    );
  }

  // visual: a project with a `diario/` folder shows everything (photos and videos) as its Visual Diary,
  // in two centered-title rows that drift sideways.
  if (photos.diario?.length) {
    const diaryItems = await Promise.all(
      photos.diario.map(async (m) => ({ ...m, aspect: await getImageAspect(m.src) })),
    );
    return (
      <section className="overflow-hidden bg-white py-24 sm:py-36">
        <div className="mx-auto max-w-[760px] px-5 text-center sm:px-8">
          <h2 className="font-inter text-ink2 text-[clamp(2.6rem,6vw,4.6rem)] leading-none font-bold">
            {title ?? "Visual Diary"}
          </h2>
          <p className="font-inter text-muted mx-auto mt-6 max-w-[520px] text-[16px] leading-[1.55] sm:text-[17px]">
            {es
              ? "Fotos y videos del proyecto, tal como pasaron."
              : "Photos and video from the project, as they happened."}
          </p>
        </div>
        <div className="mt-12 sm:mt-16">
          <DiaryMarquee items={diaryItems} label="Visual Diary" rows={photos.diaryRows ?? 2} />
        </div>
      </section>
    );
  }

  // visual: the first 8 photos live in the hero; the rest form a collage here.
  const used = !visualInHero ? 0 : photos.visual.length >= 8 ? heroCollageCount(photos.visual.length) : photos.visual.length === 1 ? 1 : 0;
  const rest = photos.visual.slice(used);
  if (!rest.length) {
    // The upload hint only makes sense while the project has nothing at all to show.
    const hasOtherMedia =
      photos.presentacion.length > 0 ||
      photos.instagram.length > 0 ||
      photos.celular.length > 0 ||
      (photos.afiches?.length ?? 0) > 0 ||
      (photos.web?.length ?? 0) > 0;
    return photos.visual.length || hasOtherMedia ? null : (
      <section className="bg-white pb-24 sm:pb-36">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <EmptyHint
            path={hints.visual}
            label={es ? "Sube las fotos del proyecto en:" : "Add the project photos in:"}
          />
        </div>
      </section>
    );
  }
  // Masonry: each photo goes to the shortest column, in file order, so neighbours in the
  // folder (01, 02...) land side by side and every column ends at about the same height.
  const sized = await Promise.all(rest.map(async (src) => ({ src, aspect: await getImageAspect(src) })));
  const columnsFor = (n: number) => {
    const cols: { src: string; aspect: number }[][] = Array.from({ length: n }, () => []);
    const heights = new Array(n).fill(0);
    for (const item of sized) {
      const target = heights.indexOf(Math.min(...heights));
      cols[target].push(item);
      heights[target] += 1 / item.aspect;
    }
    return cols;
  };
  const renderColumns = (n: number, className: string) => (
    <div className={`mt-10 gap-4 sm:gap-5 ${className}`}>
      {columnsFor(n).map((col, c) => (
        <div key={c} className="flex min-w-0 flex-1 flex-col gap-4 sm:gap-5">
          {col.map(({ src, aspect }) => (
            <div
              key={src}
              className="relative w-full overflow-hidden rounded-[14px] bg-[#ecece7]"
              style={{ aspectRatio: String(aspect) }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes={n === 3 ? "(min-width: 1024px) 400px, 33vw" : "50vw"}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
  return (
    <section className="bg-white py-24 sm:py-36">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <h2 className="font-inter text-ink2 text-[32px] leading-tight font-bold sm:text-[40px]">
          {title ?? (es ? "Galería" : "Gallery")}
        </h2>
        {fitsSevenPieceCollage(sized) ? (
          <>
            {renderColumns(2, "flex sm:hidden")}
            <SevenPieceCollage items={sized} />
          </>
        ) : (
          <>
            {renderColumns(2, "flex sm:hidden")}
            {renderColumns(3, "hidden sm:flex")}
          </>
        )}
      </div>
    </section>
  );
}
