import type { ReactNode } from "react";

/**
 * iOS-Notes-app style card. Title bar with a back chevron + share/menu icons,
 * a yellow icon next to the section title, body text below.
 * Use as an overlay sticker (absolutely positioned over a photo) or inline.
 */
export function NotesCard({
  title,
  back = "Notes",
  yellowIcon = "✦",
  children,
  className = "",
  rotate,
  style,
}: {
  title: string;
  /** Text shown next to the back chevron at top-left. */
  back?: string;
  /** Tiny icon shown next to the section title (defaults to a small spark). */
  yellowIcon?: string;
  children: ReactNode;
  className?: string;
  rotate?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`bg-cream-deep rounded-2xl shadow-[0_18px_40px_-18px_rgba(0,0,0,0.25),0_6px_14px_-6px_rgba(0,0,0,0.15)] border border-ink/5 p-4 max-w-sm ${className}`}
      style={{
        transform: rotate !== undefined ? `rotate(${rotate}deg)` : undefined,
        ...style,
      }}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between mb-3 text-ink-soft">
        <span className="inline-flex items-center gap-1 text-xs">
          <span aria-hidden>‹</span>
          <span>{back}</span>
        </span>
        <span className="inline-flex items-center gap-3 text-xs">
          <span aria-hidden>↑</span>
          <span aria-hidden>···</span>
        </span>
      </div>
      {/* Title */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-ink font-medium text-sm">{title}</span>
        <span className="text-lime text-base leading-none" aria-hidden>
          {yellowIcon}
        </span>
      </div>
      {/* Body */}
      <div className="body text-ink leading-relaxed">{children}</div>
    </div>
  );
}
