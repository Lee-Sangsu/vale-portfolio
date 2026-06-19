import clsx from "clsx";

/**
 * macOS-style window card used across the hero and project pages.
 * Title bar (#efefec) with three dots + optional centered label, then a body.
 */
export function WindowCard({
  title,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-[14px] border border-win-border bg-white shadow-[0_12px_32px_rgba(0,0,0,0.14)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 bg-titlebar px-3 py-[10px]">
        <span className="flex gap-[6px]">
          <span className="size-[11px] rounded-full bg-[#ff5f57]" />
          <span className="size-[11px] rounded-full bg-[#febc2e]" />
          <span className="size-[11px] rounded-full bg-[#28c840]" />
        </span>
        {title && (
          <span className="flex-1 text-center font-inter text-[13px] font-medium text-[#555]">
            {title}
          </span>
        )}
        <span className="w-[45px]" />
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
