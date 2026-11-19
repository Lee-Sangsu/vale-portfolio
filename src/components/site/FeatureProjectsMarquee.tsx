import Image from "next/image";
import { AutoStrip } from "@/components/site/AutoStrip";
import { listPhotos } from "@/lib/photos";

export type FeatureItem = { title: string; href: string; img: string };

/**
 * Auto-scrolling strip of brand logos.
 * Drifts on its own; hovering steers it and a drag moves it by hand (see AutoStrip).
 */
export function FeatureProjectsMarquee({
  label,
  durationSeconds = 55,
}: {
  items: FeatureItem[];
  label: string;
  durationSeconds?: number;
}) {
  const logos = listPhotos("compartido/marcas");

  if (logos.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto mb-7 max-w-[1460px] px-6 sm:px-8">
        <h2 className="font-inter text-[34px] leading-none font-bold text-[#2a2a2a] sm:text-[48px]">
          {label}
        </h2>
      </div>

      <div
        className="relative"
        style={
          {
            maskImage:
              "linear-gradient(to right, transparent 0, black 5%, black 95%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 5%, black 95%, transparent 100%)",
          } as React.CSSProperties
        }
      >
        <AutoStrip
          durationSeconds={durationSeconds}
          trackClassName="items-stretch gap-[22px]"
        >
          {logos.map((logo) => (
            <div
              key={logo}
              className="relative h-[172px] w-[210px] overflow-hidden rounded-[12px] bg-[#f3f2ee] sm:h-[192px] sm:w-[234px]"
            >
              <Image
                src={logo}
                alt=""
                fill
                sizes="(max-width: 639px) 210px, 234px"
                draggable={false}
                className="object-contain p-5 sm:p-6"
              />
            </div>
          ))}
        </AutoStrip>
      </div>
    </section>
  );
}
