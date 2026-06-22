import Image from "next/image";
import type { Locale } from "@/content/types";
import { encodeAsset } from "@/content/photo-manifest";
import { SiteNav } from "./SiteNav";
import { WindowCard } from "./WindowCard";
import { FolderSticker } from "./FolderSticker";

const MAIN = "photos/1. Main ";

export function HomeHero({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const bio = es
    ? "Soy Valeria, diseñadora en movimiento. Me gusta que las cosas se vuelvan reales, que no se queden en el papel."
    : "I'm Valeria, a designer in motion. I like things to become real, not stay on paper.";

  const contactHref = `/${locale}/contact`;
  const projectsHref = `/${locale}/projects`;

  // Four floating folder stickers frame the portrait (desktop only), matching
  // the Figma hero (nodes 227:1157/1161/1165/1178): CV + Creative Services on
  // the left, Let's Collab + Strategic Consult on the right. Colors come from
  // the four folder SVG variants. Each points at a real page so none is a dead
  // link; phones get a single CTA button instead (the scatter doesn't fit).
  const folders = [
    {
      // pink folder (Folder 1-3 = #FFB1DB) — upper left
      src: encodeAsset(`${MAIN}/files/Folder 1-3.svg`)!,
      label: "CV",
      color: "#ffb1db",
      textColor: "#000",
      pos: "left-[15%] top-[19%]",
      rotate: -7,
      href: projectsHref,
    },
    {
      // dark blue folder (Folder 1 = #043C9F) — left middle
      src: encodeAsset(`${MAIN}/files/Folder 1.svg`)!,
      label: es ? "Servicios creativos" : "Creative Services",
      color: "#043c9f",
      textColor: "#fff",
      pos: "left-[23%] top-[47%]",
      rotate: 5,
      href: projectsHref,
    },
    {
      // light blue folder (Folder 1-1 = #ACD7E8) — upper right
      src: encodeAsset(`${MAIN}/files/Folder 1-1.svg`)!,
      label: es ? "Colaboremos" : "Let's Collab",
      color: "#acd7e8",
      textColor: "#000",
      pos: "left-[67%] top-[17%]",
      rotate: 4,
      href: contactHref,
    },
    {
      // wine folder (Folder 1-2 = #7B173B) — lower right
      src: encodeAsset(`${MAIN}/files/Folder 1-2.svg`)!,
      label: es ? "Consultoría" : "Strategic Consult",
      color: "#7b173b",
      textColor: "#fff",
      pos: "left-[73%] top-[49%]",
      rotate: -5,
      href: contactHref,
    },
  ];

  return (
    <section className="relative isolate min-h-[760px] overflow-hidden sm:min-h-[880px]">
      {/* Sky background — wide Sanssouci sky + cosmos scene (Figma node 227:1120).
          The wide 1710×952 source covers the hero vertically, so the bright sky
          stays up top and the flowers sit along the bottom edge as in the design. */}
      <Image
        src="/figma/home/sky.jpg"
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
          {folders.map((f, i) => (
            <div key={i} className={`absolute ${f.pos}`}>
              <FolderSticker
                src={f.src}
                label={f.label}
                color={f.color}
                textColor={f.textColor}
                rotate={f.rotate}
                href={f.href}
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
          <span className="relative bg-hero-lime px-2 box-decoration-clone">
            Valeria Jiménez
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={encodeAsset(`${MAIN}/Cursos.svg`)}
              alt=""
              className="absolute left-full bottom-1 h-[44px] w-auto sm:h-[64px]"
            />
          </span>
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

        {/* Mobile CTA — the floating folders are desktop-only, so phones get a
            plain button to the contact page. */}
        <a
          href={contactHref}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#043c9f] px-7 py-3 font-inter text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(4,60,159,0.35)] transition-transform hover:-translate-y-0.5 md:hidden"
        >
          {es ? "Colaboremos" : "Let's Collab"} <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
