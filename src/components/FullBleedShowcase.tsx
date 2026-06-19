import Image from "next/image";
import type { ReactNode } from "react";
import { Decoration } from "./Decoration";

export type DesktopIcon = {
  src: string;
  label: string;
  side: "left" | "right";
  top: string;
};

/**
 * Full-bleed atmospheric photo + optional NotesCard overlay + optional
 * cluster of desktop icons (Explorer, photo dump folder) floating on the side.
 *
 * This is the Anna-Taylor "find your formula" pattern — a vibe section that
 * carries a single short message via the overlay card while the photo does
 * 90% of the emotional work.
 */
export function FullBleedShowcase({
  src,
  alt,
  height = "75vh",
  notesOverlay,
  notesSide = "right",
  desktopIcons,
  focal = "center",
  background = "cream",
}: {
  src: string;
  alt: string;
  /** CSS height value for the showcase strip. */
  height?: string;
  notesOverlay?: ReactNode;
  notesSide?: "left" | "right";
  desktopIcons?: DesktopIcon[];
  /** object-position value for the photo. */
  focal?: string;
  background?: "cream" | "sky";
}) {
  const bgClass = background === "sky" ? "bg-sky/30" : "bg-cream";
  return (
    <section
      className={`relative w-full ${bgClass} overflow-hidden`}
      style={{ height }}
      aria-label={alt}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: focal }}
      />

      {/* Desktop icon cluster */}
      {desktopIcons && desktopIcons.length > 0 && (
        <ul className="absolute inset-0 pointer-events-none">
          {desktopIcons.map((ic, i) => (
            <li
              key={ic.label + i}
              className="absolute flex flex-col items-center gap-1 pointer-events-auto"
              style={{
                top: ic.top,
                [ic.side]: "2.5rem",
              }}
            >
              <Decoration src={ic.src} size={48} className="opacity-95 drop-shadow-md" />
              <span className="text-[11px] font-medium text-white bg-ink/45 rounded px-1.5 py-0.5 backdrop-blur-sm">
                {ic.label}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Notes overlay */}
      {notesOverlay && (
        <div
          className="absolute z-10 max-w-sm"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            [notesSide]: "5%",
          }}
        >
          {notesOverlay}
        </div>
      )}
    </section>
  );
}
