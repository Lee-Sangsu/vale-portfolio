import { NaturalPhoto } from "./NaturalPhoto";

/**
 * Frames a single photo as if it were a Mac browser window.
 * Title bar with the three traffic-light dots and a file/site name.
 * Photo is rendered at its natural aspect ratio (no crop).
 */
export function MacWindow({
  src,
  alt,
  title = "",
  className = "",
  maxHeightVh = 70,
  priority = false,
}: {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  maxHeightVh?: number;
  priority?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35),0_8px_20px_-8px_rgba(0,0,0,0.18)] border border-ink/10 ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-ink/10 bg-cream-deep">
        <span className="size-3 rounded-full bg-[#FF5F57]" aria-hidden />
        <span className="size-3 rounded-full bg-[#FEBC2E]" aria-hidden />
        <span className="size-3 rounded-full bg-[#28C840]" aria-hidden />
        {title && (
          <span className="kicker-muted text-[10px] ml-auto pr-2 tracking-wider">
            {title}
          </span>
        )}
      </div>
      {/* Photo */}
      <NaturalPhoto
        src={src}
        alt={alt}
        maxHeightVh={maxHeightVh}
        rounded=""
        priority={priority}
        className="border-0"
      />
    </div>
  );
}
