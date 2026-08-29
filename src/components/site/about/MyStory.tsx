import Image from "next/image";
import type { Locale } from "@/content/types";
import { aboutLong } from "@/content/about";

const COLLAGE_PHOTOS = {
  primary: "/pages/about/figma/story-collage-primary.png",
  reflection: "/pages/about/figma/story-collage-reflection.png",
  leftPortrait: "/pages/about/figma/story-collage-left-portrait.png",
  rightPortrait: "/pages/about/figma/story-collage-right-portrait.png",
  centerPhoto: "/pages/about/figma/story-collage-center-photo.png",
  leftTilt: "/pages/about/figma/story-collage-left-tilt.png",
  circle: "/pages/about/figma/story-collage-circle.png",
} as const;

type StoryPhotoName = keyof typeof COLLAGE_PHOTOS;

function StoryPhoto({
  name,
  className,
  imageClassName = "object-cover",
}: {
  name: StoryPhotoName;
  className: string;
  imageClassName?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="relative size-full">
        <Image
          src={COLLAGE_PHOTOS[name]}
          alt=""
          fill
          sizes="(min-width: 1024px) 45vw, 50vw"
          className={imageClassName}
        />
      </div>
    </div>
  );
}

export function MyStory({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const intro = `${aboutLong.paragraphs[1][locale]} ${aboutLong.paragraphs[2][locale]}`;

  return (
    <section id="story" className="scroll-mt-24 overflow-hidden bg-[#111] text-white">
      <div className="mx-auto max-w-[960px] px-5 pb-16 pt-20 text-center sm:px-8 sm:pb-24 sm:pt-24 lg:hidden">
        <Image
          src="/pages/about/figma/story-collage-doodle.svg"
          alt=""
          width={116}
          height={116}
          className="mx-auto size-[76px]"
        />

        <h2 className="font-inter mt-6 text-[34px] font-bold leading-none sm:text-[42px]">
          {es ? "Mi historia" : "My story"}
        </h2>

        <p className="font-inter mt-5 text-[17px] leading-[27px] text-[#c9cdd0] sm:text-[18px] sm:leading-[29px]">
          {intro}
        </p>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4">
          <StoryPhoto
            name="leftPortrait"
            className="row-span-2 aspect-[3/4] rounded-tl-[56%] rounded-tr-[44%]"
          />
          <StoryPhoto
            name="primary"
            className="aspect-[3/4] rounded-bl-[48%] rounded-tr-[48%]"
          />
          <StoryPhoto name="circle" className="aspect-square rounded-full" />
          <StoryPhoto
            name="leftTilt"
            className="aspect-[4/5] -rotate-[4deg] rounded-[40%]"
          />
          <StoryPhoto name="centerPhoto" className="aspect-[4/5] rounded-[42%]" />
          <StoryPhoto
            name="reflection"
            className="aspect-[3/4] rounded-tl-[48%] rounded-br-[48%]"
            imageClassName="-scale-y-100 rotate-180 object-cover"
          />
          <StoryPhoto
            name="rightPortrait"
            className="aspect-[3/4] rounded-tl-[46%] rounded-br-[46%]"
            imageClassName="-scale-y-100 rotate-180 object-cover"
          />
        </div>
      </div>

      <div className="relative mx-auto hidden w-full max-w-[1710px] lg:aspect-[1710/1219] lg:block">
        <div className="pointer-events-none absolute left-[46.61%] top-[5.91%] size-[6.78%]">
          <Image
            src="/pages/about/figma/story-collage-doodle.svg"
            alt=""
            fill
            sizes="116px"
          />
        </div>

        <h2 className="font-inter absolute left-1/2 top-[19.2%] -translate-x-1/2 text-center text-[clamp(32px,2.81vw,48px)] font-bold leading-none">
          {es ? "Mi historia" : "My story"}
        </h2>

        <p className="font-inter absolute left-1/2 top-[25.76%] w-[50.35%] -translate-x-1/2 text-center text-[clamp(15px,1.05vw,18px)] leading-[1.5] text-[#c9cdd0]">
          {intro}
        </p>

        <StoryPhoto
          name="primary"
          className="absolute bottom-[-5.82%] left-[58.19%] h-[84.82%] w-[45.32%]"
        />
        <StoryPhoto
          name="reflection"
          className="absolute bottom-[-8.61%] left-[52.16%] h-[47.25%] w-[25.26%]"
          imageClassName="-scale-y-100 rotate-180 object-cover"
        />
        <StoryPhoto
          name="leftPortrait"
          className="absolute left-0 top-[17.15%] h-[54.47%] w-[29.06%]"
        />
        <StoryPhoto
          name="rightPortrait"
          className="absolute bottom-[-14.52%] left-[66.49%] h-[62.67%] w-[33.51%]"
          imageClassName="-scale-y-100 rotate-180 object-cover"
        />
        <StoryPhoto
          name="centerPhoto"
          className="absolute bottom-[-1.31%] left-[17.19%] h-[53.08%] w-[37.6%]"
          imageClassName="object-cover object-left-top"
        />
        <StoryPhoto
          name="leftTilt"
          className="absolute bottom-[-6.94%] left-[-2.16%] h-[66.5%] w-[37.85%] rotate-[6.89deg]"
        />
        <StoryPhoto
          name="circle"
          className="absolute bottom-[32.32%] left-[66.49%] size-[9.24%] rounded-full"
          imageClassName="object-cover object-[36%_50%]"
        />
      </div>
    </section>
  );
}
