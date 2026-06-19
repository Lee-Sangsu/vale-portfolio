import clsx from "clsx";

/**
 * Floating folder sticker from the hero: a folder graphic with a small
 * colored label tab underneath. Optionally links somewhere (CV, Notion,
 * Calendly, /contact...).
 */
export function FolderSticker({
  src,
  label,
  color,
  textColor = "#fff",
  className,
  rotate = 0,
  href,
  external,
}: {
  src: string;
  label: string;
  color: string;
  textColor?: string;
  className?: string;
  rotate?: number;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="h-auto w-[64px] drop-shadow-[0_6px_12px_rgba(0,0,0,0.15)] sm:w-[80px]"
      />
      <span
        className="px-3 py-[2px] font-heebo text-[12px] uppercase leading-[1.6] sm:text-[14px]"
        style={{ backgroundColor: color, color: textColor }}
      >
        {label}
      </span>
    </>
  );

  const cls = clsx(
    "flex w-fit flex-col items-center gap-[10px] transition-transform duration-200",
    href && "pointer-events-auto cursor-pointer hover:-translate-y-1 hover:scale-[1.03]",
    className,
  );
  const style = { transform: `rotate(${rotate}deg)` };

  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className={cls}
        style={style}
        aria-label={label}
      >
        {inner}
      </a>
    );
  }

  return (
    <div className={cls} style={style}>
      {inner}
    </div>
  );
}
