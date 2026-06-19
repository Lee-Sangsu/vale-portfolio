import Image from "next/image";
import type { Locale } from "@/content/types";
import { encodeAsset } from "@/content/photo-manifest";
import { SiteNav } from "./SiteNav";
import { WindowCard } from "./WindowCard";
import { FolderSticker } from "./FolderSticker";

const MAIN = "photos/1. Main ";

// ── Folder links ──────────────────────────────────────────────────────
// TODO(Valeria): replace the "#" placeholders with the real URLs:
//   CV               → your CV (PDF or Notion)
//   Creative Services → Notion/PDF with services + pricing
//   Strategic Consult → Calendly booking link
const FOLDER_LINKS = {
  cv: "#",
  services: "#",
  calendly: "#",
};

export function HomeHero({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const bio = es
    ? "Soy Valeria, diseñadora en movimiento. Me gusta que las cosas se vuelvan reales, que no se queden en el papel."
    : "I'm Valeria, a designer in motion. I like things to become real, not stay on paper.";

  const folders = [
    {
      // CV → pink folder (Folder 1-3 = #FFB1DB)
      src: encodeAsset(`${MAIN}/files/Folder 1-3.svg`)!,
      label: "CV",
      color: "#ffb1db",
      textColor: "#000",
      pos: "left-[1%] top-[18%]",
      rotate: 0,
      href: FOLDER_LINKS.cv,
      external: true,
    },
    {
      // Creative Services → dark blue folder (Folder 1 = #043C9F)
      src: encodeAsset(`${MAIN}/files/Folder 1.svg`)!,
      label: "Creative Services",
      color: "#043c9f",
      textColor: "#fff",
      pos: "left-[15%] top-[52%]",
      rotate: 0,
      href: FOLDER_LINKS.services,
      external: true,
    },
    {
      // Let's Collab → light blue folder (Folder 1-1 = #ACD7E8)
      src: encodeAsset(`${MAIN}/files/Folder 1-1.svg`)!,
      label: "Let's Collab",
      color: "#acd7e8",
      textColor: "#000",
      pos: "right-[15%] top-[15%]",
      rotate: 0,
      href: `/${locale}/contact`,
      external: false,
    },
    {
      // Strategic Consult → wine folder (Folder 1-2 = #7B173B)
      src: encodeAsset(`${MAIN}/files/Folder 1-2.svg`)!,
      label: "Strategic Consult",
      color: "#7b173b",
      textColor: "#fff",
      pos: "right-[1%] top-[47%]",
      rotate: 0,
      href: FOLDER_LINKS.calendly,
      external: true,
    },
  ];

  return (
    <section className="relative isolate min-h-[760px] overflow-hidden sm:min-h-[880px]">
      {/* Sky background */}
      <Image
        src="/figma/home/sky.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-bottom"
      />
      {/* Top gradient for nav legibility */}
      <div className="absolute inset-x-0 top-0 z-20 h-[160px] bg-gradient-to-b from-white/70 to-transparent" />

      <SiteNav tone="light" />

      {/* Floating folders (desktop) — inset to the ~350px content margin via a centered stage */}
      <div className="absolute inset-0 z-10 hidden md:block">
        <div className="relative mx-auto h-full max-w-[1280px]">
          {folders.map((f) => (
            <div key={f.label} className={`absolute ${f.pos}`}>
              <FolderSticker
                src={f.src}
                label={f.label}
                color={f.color}
                textColor={f.textColor}
                rotate={f.rotate}
                href={f.href}
                external={f.external}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Center stack */}
      <div className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center px-5 pb-16 pt-[120px] sm:pt-[150px]">
        {/* Browser window with portrait */}
        <WindowCard
          title="valejimenez.com"
          className="w-[300px] sm:w-[350px]"
          bodyClassName="relative aspect-[1050/1140]"
        >
          <Image
            src={encodeAsset(`${MAIN}/Val Hero.png`)!}
            alt="Valeria Jiménez"
            fill
            sizes="(min-width: 640px) 350px, 300px"
            quality={92}
            className="object-cover"
          />
        </WindowCard>

        {/* Name highlight + blinking text cursor */}
        <h1 className="relative mt-7 flex items-start justify-center font-heebo text-[44px] font-bold leading-none text-black sm:text-[64px]">
          <span className="bg-hero-lime px-2 box-decoration-clone">Valeria Jiménez</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={encodeAsset(`${MAIN}/Cursos.svg`)}
            alt=""
            className="ml-[3px] h-[44px] w-auto self-start sm:h-[62px]"
          />
        </h1>

        {/* Bio window */}
        <div className="mt-7 w-full max-w-[720px] overflow-hidden rounded-[10px] border-[0.6px] border-[#6e726e] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-2 bg-titlebar px-3 py-[10px]">
            <span className="flex gap-[6px]">
              <span className="size-[11px] rounded-full bg-[#ff5f57]" />
              <span className="size-[11px] rounded-full bg-[#febc2e]" />
              <span className="size-[11px] rounded-full bg-[#28c840]" />
            </span>
            <span className="w-[45px]" />
          </div>
          <p className="px-6 py-5 text-center font-inter text-[15px] leading-[23px] text-[#333] sm:text-[18px]">
            {bio}
          </p>
        </div>
      </div>
    </section>
  );
}
