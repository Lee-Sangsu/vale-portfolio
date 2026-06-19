import { NaturalPhoto } from "./NaturalPhoto";

/**
 * Masonry-style photo layout — each tile renders at the image's REAL aspect.
 * Uses CSS columns so tiles flow naturally without forcing aspect ratios.
 * Server component; reads each photo's intrinsic dimensions via NaturalPhoto.
 */
export function PhotoMosaic({
  photos,
  alt,
  cap = 6,
  className = "",
}: {
  photos: string[];
  alt: string;
  /** Max photos to render. Past this, use a PhotoCarousel instead. */
  cap?: number;
  className?: string;
}) {
  if (photos.length === 0) return null;
  const slice = photos.slice(0, cap);

  return (
    <div
      className={`gap-3 sm:gap-4 columns-1 sm:columns-2 lg:columns-3 [&>*]:break-inside-avoid [&>*]:mb-3 sm:[&>*]:mb-4 ${className}`}
    >
      {slice.map((src, i) => (
        <NaturalPhoto
          key={src}
          src={src}
          alt={`${alt} — ${i + 1}`}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      ))}
    </div>
  );
}
