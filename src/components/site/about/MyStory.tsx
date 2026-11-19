import Image from "next/image";
import type { Locale } from "@/content/types";

const STORY_COPY = {
  en: [
    <>
      What has always driven me is one question:{" "}
      <strong className="font-semibold text-white">
        what can I build that does not exist yet, and whose life can it change?
      </strong>{" "}
      That curiosity has defined the career I chose, the teams I have joined,
      and the way I work to this day.
    </>,
    <>
      That path has led me to very different things: co-founding companies,
      connecting talent between Latin America and Korea, setting up an
      innovation lab in Seoul, creating brands for Colombian coffee growers in
      Berlin, and designing products for a global community of women travelers.
      The contexts could not be more different, yet the pattern has always been
      the same:{" "}
      <strong className="font-semibold text-white">
        understand quickly, propose, and execute
      </strong>
      .
    </>,
    <>
      <strong className="font-semibold text-white">
        Along the way, I found what truly drives me: creating.
      </strong>{" "}
      Every new proposal and every idea that starts from scratch fascinates me.
      Because to me, a project does not end when it is delivered; it ends when
      it changes something.
    </>,
  ],
  es: [
    <>
      Lo que siempre me ha movido es una pregunta:{" "}
      <strong className="font-semibold text-white">
        qué puedo construir que todavía no existe, y a quién puede cambiarle
        algo.
      </strong>{" "}
      Esa inquietud definió la carrera que escogí, los equipos a los que me he
      unido y la manera en que trabajo hasta hoy.
    </>,
    <>
      Por esa puerta entraron cosas muy distintas: co-fundar compañías, conectar
      talento entre Latinoamérica y Corea, montar un laboratorio de innovación
      en Seúl, crear marcas para cafeteros colombianos en Berlín y diseñar
      producto para una comunidad global de viajeras. Contextos que no se
      parecen en nada, y en todos el mismo patrón:{" "}
      <strong className="font-semibold text-white">
        entender rápido, proponer y ejecutar
      </strong>
      .
    </>,
    <>
      <strong className="font-semibold text-white">
        En el camino encontré lo que me mueve de verdad: crear.
      </strong>{" "}
      Cada propuesta nueva, cada idea que arranca de cero, me fascina. Porque
      para mí un proyecto no termina cuando se entrega; termina cuando cambia
      algo.
    </>,
  ],
} as const;

const COLLAGE_PHOTOS = {
  primary: "/sobre-mi/figma/story-collage-primary.png",
  reflection: "/sobre-mi/figma/story-collage-reflection.png",
  leftPortrait: "/sobre-mi/figma/story-collage-left-portrait.png",
  rightPortrait: "/sobre-mi/figma/story-collage-right-portrait.png",
  centerPhoto: "/sobre-mi/figma/story-collage-center-photo.png",
  leftTilt: "/sobre-mi/figma/story-collage-left-tilt.png",
  circle: "/sobre-mi/figma/story-collage-circle.png",
} as const;

type StoryPhotoName = keyof typeof COLLAGE_PHOTOS;

function StoryParagraphs({ locale }: { locale: Locale }) {
  return STORY_COPY[locale].map((paragraph, index) => (
    <p key={index} className={index === 0 ? undefined : "mt-4"}>
      {paragraph}
    </p>
  ));
}

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
          sizes="(min-width: 1024px) 45vw, 100vw"
          className={imageClassName}
        />
      </div>
    </div>
  );
}

/** The seven cut-outs in their Figma positions. Every offset is a percentage of the 1710×1219 frame,
 *  so the same collage scales from a phone to a wide monitor. */
function StoryCollage({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`aspect-[1710/1219] ${className}`}>
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
        className="absolute top-[17.15%] left-0 h-[54.47%] w-[29.06%]"
      />
      <StoryPhoto
        name="rightPortrait"
        className="absolute bottom-[-14.52%] left-[66.49%] h-[62.67%] w-[33.51%]"
        imageClassName="-scale-y-100 rotate-180 object-cover"
      />
      <StoryPhoto
        name="centerPhoto"
        className="absolute bottom-[-1.31%] left-[17.19%] h-[53.08%] w-[37.6%]"
        imageClassName="!bottom-auto !right-auto !left-0 !top-[-40.65%] !h-[140.66%] !w-[136.55%] max-w-none"
      />
      <StoryPhoto
        name="leftTilt"
        className="absolute bottom-[-6.94%] left-[-2.16%] h-[66.5%] w-[37.85%] rotate-[6.89deg]"
      />
      <StoryPhoto
        name="circle"
        className="absolute bottom-[31.4%] left-[65.6%] size-[11%] rounded-full"
        imageClassName="object-cover object-[36%_50%]"
      />
    </div>
  );
}

export function MyStory({ locale }: { locale: Locale }) {
  const es = locale === "es";

  return (
    <section
      id="story"
      className="scroll-mt-24 overflow-hidden bg-[#111] text-white"
    >
      <div className="lg:hidden">
        <div className="mx-auto max-w-[960px] px-5 pt-20 text-center sm:px-8 sm:pt-24">
          <Image
            src="/sobre-mi/figma/story-collage-doodle.svg"
            alt=""
            width={116}
            height={116}
            className="mx-auto size-[76px]"
          />

          <h2 className="font-inter mt-6 text-[34px] leading-none font-bold sm:text-[42px]">
            {es ? "Mi historia" : "My story"}
          </h2>

          <div className="font-inter mt-5 text-[17px] leading-[27px] text-[#c9cdd0] sm:text-[18px] sm:leading-[29px]">
            <StoryParagraphs locale={locale} />
          </div>
        </div>
        {/* Same collage as desktop, just smaller: the frame is full-bleed and keeps its ratio. */}
        <StoryCollage className="relative -mt-10 w-full overflow-hidden sm:-mt-4" />
      </div>

      <div className="relative hidden w-full lg:block lg:aspect-[1710/1260]">
        <div className="pointer-events-none absolute top-[4.7%] left-[46.61%] z-10 size-[116px]">
          <Image
            src="/sobre-mi/figma/story-collage-doodle.svg"
            alt=""
            fill
            sizes="116px"
          />
        </div>

        <h2 className="font-inter absolute top-[15.25%] left-1/2 z-10 -translate-x-1/2 text-center text-[clamp(32px,2.81vw,48px)] leading-none font-bold">
          {es ? "Mi historia" : "My story"}
        </h2>

        <div className="font-inter absolute top-[20.45%] left-1/2 z-10 w-[50.35%] max-w-[861px] -translate-x-1/2 text-center text-[clamp(12px,1.053vw,18px)] leading-[1.5] text-[#c9cdd0]">
          <StoryParagraphs locale={locale} />
        </div>

        <StoryCollage className="absolute inset-x-0 bottom-0" />
      </div>
    </section>
  );
}
