import Image from "next/image";
import type { Locale } from "@/content/types";

const GALLERY_IMAGES = [
  {
    src: "/pages/about/figma/sneak-peek-01.png",
    frame:
      "aspect-[288/293] w-[72vw] max-w-[288px] lg:h-[293px] lg:w-[288px] lg:max-w-none",
    image: "!h-[211.21%] !top-[-78.68%] object-cover",
    sizes: "(min-width: 1024px) 288px, 72vw",
  },
  {
    src: "/pages/about/figma/sneak-peek-02.png",
    frame:
      "aspect-[286/373] w-[72vw] max-w-[286px] lg:h-[373px] lg:w-[286px] lg:max-w-none",
    image: "object-cover object-bottom",
    sizes: "(min-width: 1024px) 286px, 72vw",
  },
  {
    src: "/pages/about/figma/sneak-peek-03.png",
    frame:
      "aspect-[259/364] w-[68vw] max-w-[259px] lg:h-[364px] lg:w-[259px] lg:max-w-none",
    image: "object-cover",
    sizes: "(min-width: 1024px) 259px, 68vw",
  },
  {
    src: "/pages/about/figma/sneak-peek-04.png",
    frame:
      "aspect-[227/302] w-[62vw] max-w-[227px] lg:h-[302px] lg:w-[227px] lg:max-w-none",
    image: "object-cover",
    sizes: "(min-width: 1024px) 227px, 62vw",
  },
  {
    src: "/pages/about/figma/sneak-peek-05.png",
    frame:
      "aspect-[339/315] w-[78vw] max-w-[339px] lg:h-[315px] lg:w-[339px] lg:max-w-none",
    image: "object-cover",
    sizes: "(min-width: 1024px) 339px, 78vw",
  },
  {
    src: "/pages/about/figma/sneak-peek-06.png",
    frame:
      "aspect-[236/300] w-[64vw] max-w-[236px] lg:h-[300px] lg:w-[236px] lg:max-w-none",
    image: "object-cover object-bottom",
    sizes: "(min-width: 1024px) 236px, 64vw",
  },
] as const;

export function SneakPeek({ locale }: { locale: Locale }) {
  const es = locale === "es";

  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[1710px]">
        <h2 className="font-inter text-ink2 text-center text-[28px] font-semibold sm:text-[34px]">
          {es ? "Un adelanto de mi trabajo" : "Sneak peek of my works"}
        </h2>

        <div className="mt-14 flex snap-x snap-mandatory items-end gap-[23px] overflow-x-auto overscroll-x-contain scroll-smooth pb-5 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {GALLERY_IMAGES.map(({ src, frame, image, sizes }) => (
            <div
              key={src}
              className={`relative shrink-0 snap-center overflow-hidden rounded-[5px] shadow-[0_6px_14px_rgba(0,0,0,0.12)] lg:snap-start ${frame}`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes={sizes}
                className={image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
