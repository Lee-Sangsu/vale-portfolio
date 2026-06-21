import Image from "next/image";
import type { Locale } from "@/content/types";

/**
 * Decorative iPod card for the Skills section. Pure CSS card (bg #fafaf8,
 * border #e0e0da) with a grey screen and the two click-wheel images, ringed
 * by a handful of chrome puffy stars. Non-interactive by design.
 */
type Star = { className: string; size: number; rotate: number };

const STARS: Star[] = [
  { className: "-left-7 top-2", size: 58, rotate: -12 },
  { className: "-right-8 top-10", size: 65, rotate: 14 },
  { className: "-left-4 bottom-8", size: 36, rotate: 8 },
  { className: "-right-5 bottom-2", size: 48, rotate: -18 },
  { className: "left-1/2 -top-7 -translate-x-1/2", size: 26, rotate: 6 },
];

export function IpodCard({ locale }: { locale: Locale }) {
  const es = locale === "es";

  return (
    <div className="relative w-[200px]">
      {/* Chrome stars */}
      {STARS.map((s, i) => (
        <div
          key={i}
          className={`absolute z-10 ${s.className}`}
          style={{ transform: `rotate(${s.rotate}deg)` }}
        >
          <Image
            src="/figma/about/skills-red-star.png"
            alt=""
            width={s.size}
            height={s.size}
            className="h-auto drop-shadow-[0_4px_10px_rgba(0,0,0,0.18)]"
            style={{ width: s.size }}
          />
        </div>
      ))}

      {/* iPod body */}
      <div className="relative flex flex-col items-center gap-5 rounded-[18px] border border-[#e0e0da] bg-[#fafaf8] px-5 pb-6 pt-5 shadow-[0_8px_22px_rgba(0,0,0,0.12)]">
        {/* Screen */}
        <div className="flex h-[150px] w-full flex-col rounded-[6px] bg-[#8e9590] p-2 text-white/90">
          <div className="flex items-center justify-between text-[9px] font-semibold tracking-wide text-white/70">
            <span>{es ? "Música" : "MENU"}</span>
            <span aria-hidden="true">▶</span>
          </div>
          <div className="mt-2 flex flex-1 flex-col justify-center gap-[6px] px-1">
            {(es
              ? ["Estrategia & Marca", "Producto · UX", "Contenido & Redes", "Eventos"]
              : ["Strategy & Brand", "Product · UX", "Content & Social", "Events"]
            ).map((song, i) => (
              <span
                key={song}
                className={
                  "truncate text-[10px] " +
                  (i === 0
                    ? "rounded-[3px] bg-white/85 px-1 font-semibold text-[#3c423e]"
                    : "px-1 text-white/85")
                }
              >
                {song}
              </span>
            ))}
          </div>
        </div>

        {/* Click wheel */}
        <div className="relative size-[118px]">
          <Image
            src="/figma/about/ipod-clickwheel-outer.svg"
            alt=""
            fill
            sizes="118px"
            className="object-contain"
          />
          <span className="absolute left-1/2 top-2 -translate-x-1/2 text-[9px] font-semibold tracking-wide text-[#888]">
            MENU
          </span>
          <span aria-hidden="true" className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-[#888]">
            ◄◄
          </span>
          <span aria-hidden="true" className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-[#888]">
            ►►
          </span>
          <span aria-hidden="true" className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] text-[#888]">
            ►
          </span>
          <div className="absolute left-1/2 top-1/2 size-[46px] -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/figma/about/ipod-clickwheel-inner.svg"
              alt=""
              fill
              sizes="46px"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <p className="mt-3 text-center font-inter text-[13px] text-muted">
        {es ? "El iPod de Val · toca una canción" : "Val's iPod · click any song"}
      </p>
    </div>
  );
}
