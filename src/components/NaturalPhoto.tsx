import Image from "next/image";
import { getPhotoMeta } from "@/lib/photos";

/**
 * Renders an image at its REAL aspect ratio — no cropping, ever.
 * Server component: reads intrinsic dimensions at render time via sharp,
 * then hands them to Next's <Image> so we still get optimization.
 *
 * Pass `maxHeightVh` to cap the height of very tall portraits.
 */
export async function NaturalPhoto({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 80vw, 100vw",
  maxHeightVh,
  rounded = "rounded-2xl",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  maxHeightVh?: number;
  rounded?: string;
}) {
  const meta = await getPhotoMeta(src);

  return (
    <figure
      className={`relative bg-cream-deep overflow-hidden ${rounded} ${className}`}
      style={
        maxHeightVh
          ? { maxHeight: `${maxHeightVh}vh`, aspectRatio: `${meta.width} / ${meta.height}` }
          : { aspectRatio: `${meta.width} / ${meta.height}` }
      }
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-contain"
      />
    </figure>
  );
}
