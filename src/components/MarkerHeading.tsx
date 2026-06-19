import type { ReactNode } from "react";

type Tone = "lime" | "sky" | "pink";

/**
 * The signature Anna-Taylor / Canva-template headline:
 *   first word in chunky sans + second word in Instrument Serif italic with
 *   a highlight marker block behind it + small blue dot accent at the end.
 *
 * Use for hero name, section headers ("about me", "top viewed content",
 * "find your formula"), and any title-with-personality moment.
 */
export function MarkerHeading({
  lead,
  italic,
  tone = "lime",
  size = "lg",
  showDot = true,
  className = "",
  as = "h2",
}: {
  lead: ReactNode;
  italic: ReactNode;
  tone?: Tone;
  /** xl = page hero (clamp 4-9rem). lg = section header (clamp 2-5rem). md = inline accent. */
  size?: "xl" | "lg" | "md" | "sm";
  showDot?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const Tag = as;
  const sizeClass = {
    xl: "text-[clamp(3.5rem,11vw,9rem)] leading-[0.95]",
    lg: "text-[clamp(2.5rem,6vw,5rem)] leading-[1.02]",
    md: "text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05]",
    sm: "text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.1]",
  }[size];

  const hl = {
    lime: "marker-hl-lime",
    sky: "marker-hl-sky",
    pink: "marker-hl-pink",
  }[tone];

  return (
    <Tag
      className={`font-display text-ink ${sizeClass} tracking-[-0.02em] ${className}`}
      style={{ fontWeight: 700 }}
    >
      <span>{lead}</span>{" "}
      <span className="inline-flex items-baseline gap-1.5 sm:gap-2">
        <span className={`serif-italic marker-hl ${hl}`}>{italic}</span>
        {showDot && (
          <span
            className="inline-block size-[0.5em] rounded-full bg-blue translate-y-[-0.05em]"
            aria-hidden
          />
        )}
      </span>
    </Tag>
  );
}
