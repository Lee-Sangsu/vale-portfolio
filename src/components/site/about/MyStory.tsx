import Image from "next/image";
import type { Locale } from "@/content/types";
import { aboutLong } from "@/content/about";

const PHOTOS = [
  "/figma/about/story-1.webp",
  "/figma/about/story-2.webp",
  "/figma/about/story-3.webp",
  "/figma/about/story-4.webp",
];

export function MyStory({ locale }: { locale: Locale }) {
  const es = locale === "es";
  // paragraphs[1] + [2] combined for the intro
  const intro = `${aboutLong.paragraphs[1][locale]} ${aboutLong.paragraphs[2][locale]}`;

  return (
    <section
      id="story"
      className="scroll-mt-24 bg-[#111] px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center text-center">
        {/* Dot */}
        <Image
          src="/figma/about/mystory-ellipse-dot.svg"
          alt=""
          width={54}
          height={54}
          className="size-[54px] rounded-full"
        />

        <h2 className="font-inter mt-6 text-[28px] font-semibold text-white sm:text-[32px]">
          {es ? "Mi historia" : "My story"}
        </h2>

        <p className="font-inter mt-5 max-w-[780px] text-[17px] leading-[27px] text-[#c9cdd0]">
          {intro}
        </p>

        {/* Photo row */}
        <div className="mt-12 grid w-full grid-cols-2 gap-4 sm:gap-[18px] lg:grid-cols-4">
          {PHOTOS.map((p) => (
            <div
              key={p}
              className="relative aspect-[360/420] overflow-hidden rounded-[14px]"
            >
              <Image
                src={p}
                alt=""
                fill
                sizes="(min-width: 1024px) 290px, (min-width: 640px) 45vw, 45vw"
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
