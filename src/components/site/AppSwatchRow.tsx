import clsx from "clsx";

/**
 * Row of app/tool icon chips (the Figma swatch row): a 72px field-grey tile
 * holding a 50px colored app icon with a monogram. Valeria's tool stack.
 */
const TILES = [
  { glyph: "F", bg: "#a259ff", fg: "#ffffff" },
  { glyph: "N", bg: "#ffffff", fg: "#111111", border: "#e2e2dc" },
  { glyph: "Lr", bg: "#001e36", fg: "#33b7ff" },
  { glyph: "Ae", bg: "#231650", fg: "#9999ff" },
  { glyph: "✂", bg: "#ffffff", fg: "#111111", border: "#e2e2dc" },
  { glyph: "Ai", bg: "#330000", fg: "#ff9a00" },
  { glyph: "Fr", bg: "#0a0a0a", fg: "#ffffff" },
  { glyph: "Ps", bg: "#001e36", fg: "#33aaff" },
];

export function AppSwatchRow({ className }: { className?: string }) {
  return (
    <div className={clsx("flex flex-wrap items-center justify-center gap-3 sm:gap-5", className)}>
      {TILES.map((t, i) => (
        <div
          key={i}
          className="flex size-[60px] items-center justify-center rounded-[16px] bg-[#edece7] sm:size-[72px] sm:rounded-[18px]"
        >
          <div
            className="flex size-[42px] items-center justify-center rounded-[10px] font-inter text-[15px] font-bold sm:size-[50px] sm:rounded-[12px] sm:text-[16px]"
            style={{
              backgroundColor: t.bg,
              color: t.fg,
              border: t.border ? `1px solid ${t.border}` : undefined,
            }}
          >
            {t.glyph}
          </div>
        </div>
      ))}
    </div>
  );
}
