import Image from "next/image";
import clsx from "clsx";

const STARS = [
  "/figma/project/star-1.svg",
  "/figma/project/star-2.svg",
  "/figma/project/star-3.svg",
];

type Tile = { src: string; wide: boolean };

function Row({
  tiles,
  withStars = false,
}: {
  tiles: Tile[];
  withStars?: boolean;
}) {
  return (
    <div className="-mx-5 overflow-x-auto pb-2 sm:-mx-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max gap-4 px-5 sm:px-8">
        {tiles.map((t, i) => (
          <div
            key={i}
            className={clsx(
              "relative h-[220px] shrink-0 overflow-hidden rounded-[14px] shadow-[0_6px_14px_rgba(0,0,0,0.12)] sm:h-[300px] lg:h-[350px]",
              t.wide
                ? "w-[320px] sm:w-[460px] lg:w-[584px]"
                : "w-[200px] sm:w-[240px] lg:w-[280px]",
            )}
          >
            <Image
              src={t.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 584px, 320px"
              className="object-cover"
            />
            {withStars && i < STARS.length ? (
              <Image
                src={STARS[i]}
                alt=""
                width={18}
                height={18}
                className="absolute left-3 top-3 select-none"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Two staggered horizontal-scroll rows of project photography. Tiles mix
 * narrow (280px) and wide (584px) widths. Three small star sparkles accent
 * the top row only (one sticker accent per moment, used sparingly).
 */
export function VisualDiary({
  heading,
  subtitle,
  photos,
}: {
  heading: string;
  subtitle: string;
  photos: string[];
}) {
  if (!photos.length) return null;

  // Split into two rows, alternating wide/narrow for an editorial rhythm.
  const tiles: Tile[] = photos.map((src, i) => ({ src, wide: i % 3 === 1 }));
  const mid = Math.ceil(tiles.length / 2);
  const row1 = tiles.slice(0, mid);
  const row2 = tiles.slice(mid).length ? tiles.slice(mid) : tiles.slice(0, mid);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto mb-10 max-w-[700px] px-5 text-center sm:mb-14 sm:px-8">
        <h2 className="font-inter text-[36px] font-bold leading-tight text-ink2 sm:text-[60px]">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-[560px] font-inter text-[16px] leading-[23px] text-muted sm:text-[17px]">
          {subtitle}
        </p>
      </div>

      <div className="mx-auto flex max-w-[1500px] flex-col gap-5 sm:gap-8">
        <Row tiles={row1} withStars />
        <Row tiles={row2} />
      </div>
    </section>
  );
}
