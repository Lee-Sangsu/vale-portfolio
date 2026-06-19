import Image from "next/image";

/**
 * Single decorative SVG accent loaded from /public/Assets.
 * Used sparingly — see memory:feedback_visual_restraint.
 * One per section MAX.
 */
export function Decoration({
  src,
  alt = "",
  size = 36,
  className = "",
}: {
  src: string;
  alt?: string;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ width: size, height: "auto" }}
      className={`inline-block pointer-events-none select-none ${className}`}
      aria-hidden={alt === ""}
    />
  );
}

/* Encoded paths for the cool assets — folder name has a literal space.
   Centralising them here avoids re-typing the encoding at every call-site. */
export const DECO = {
  underlineSwosh:    "/Assets%20/High%20ligth%20text/Underline-swosh.svg",
  underlineSwoshes:  "/Assets%20/High%20ligth%20text/Underline-swoshes.svg",
  stars:             "/Assets%20/Icons%20/Stars.svg",
  bubble:            "/Assets%20/Icons%20/bubble%20.svg",
  bubble2:           "/Assets%20/Icons%20/Bubble%202.svg",
  exclamation:       "/Assets%20/Icons%20/Element-exclamation.svg",
  love:              "/Assets%20/Icons%20/Element-love.svg",
  happyFace:         "/Assets%20/Icons%20/Happy%20face.svg",
  star:              "/Assets%20/Assets%20Icons%20cool/star.svg",
  click:             "/Assets%20/Assets%20Icons%20cool/click.svg",
  plane:             "/Assets%20/Assets%20Icons%20cool/plane.svg",
  camera:            "/Assets%20/Assets%20Icons%20cool/camara.svg",
  laptop:            "/Assets%20/Assets%20Icons%20cool/laptop.svg",
  book:              "/Assets%20/Assets%20Icons%20cool/book.svg",
  flower:            "/Assets%20/Assets%20Icons%20cool/loto.svg",
  formBlob:          "/Assets%20/Forms/Vector.svg",
  formSquiggle:      "/Assets%20/Forms/Vector-1.svg",
} as const;
