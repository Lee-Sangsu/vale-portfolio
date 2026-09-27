import Image from "next/image";
import type { Locale } from "@/content/types";
import { Link } from "@/i18n/navigation";

const GLOBAL_YOUTH: Record<
  Locale,
  { firstLine: string; secondLine: string }
> = {
  en: {
    firstLine: "Global Youth:",
    secondLine: "Women's Entrepreneurship Summit",
  },
  es: {
    firstLine: "Global Youth:",
    secondLine: "Cumbre de Emprendimiento Femenino",
  },
};

const PROJECTS: Record<Locale, string[]> = {
  en: [
    "Misiones Internacionales",
    "Sejong Global Idea Hackathon",
    "Japan Airlines × NomadHer",
    "NomadHer app",
  ],
  es: [
    "Misiones Internacionales",
    "Hackathon Global de Ideas Sejong",
    "Japan Airlines × NomadHer",
    "App NomadHer",
  ],
};

export function FavoriteProjects({ locale }: { locale: Locale }) {
  const isSpanish = locale === "es";
  const globalYouth = GLOBAL_YOUTH[locale];

  return (
    <section className="bg-white px-6 py-24 sm:px-8 sm:py-32 lg:py-[180px]">
      <div className="mx-auto grid max-w-[1250px] gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:items-center lg:gap-20">
        <div>
          <h2 className="font-inter text-[48px] leading-[0.98] font-bold tracking-[-0.045em] text-[#2a2a2a] sm:text-[56px] lg:text-[64px]">
            {isSpanish ? "Proyectos favoritos" : "Fav projects"}
          </h2>

          <div className="relative mt-16 h-[288px] w-full max-w-[480px] sm:mt-20 sm:h-[380px] lg:h-[430px]">
            <div className="absolute top-[8%] left-[3%] aspect-[6/5] w-[75%] max-w-[290px] -rotate-[4deg] overflow-hidden shadow-[0_14px_30px_rgba(0,0,0,0.16)] lg:h-[242px] lg:w-[290px]">
              <Image
                src="/pages/home/favorite-projects/city-photo.jpeg"
                alt=""
                fill
                sizes="(max-width: 639px) min(290px, calc((100vw - 48px) * 0.75)), 290px"
                className="object-cover"
              />
            </div>
            <div className="absolute right-[2%] bottom-[4%] aspect-[17/15] w-[71%] rotate-[5deg] overflow-hidden shadow-[0_18px_34px_rgba(0,0,0,0.18)] lg:h-[300px] lg:w-[340px]">
              <Image
                src="/pages/home/favorite-projects/workshop-photo.jpeg"
                alt=""
                fill
                sizes="(max-width: 639px) min(341px, calc((100vw - 48px) * 0.71)), (max-width: 1023px) 341px, 340px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="font-inter space-y-6 text-right text-[18px] leading-[1.1] font-bold tracking-[-0.025em] text-[#2a2a2a] sm:text-[25px] lg:mt-3 lg:space-y-9 lg:text-[30px]">
          <Link
            href="/work/global-youth-summit"
            className="ml-auto block w-fit rounded-sm uppercase underline-offset-4 transition-opacity hover:opacity-70 hover:underline focus-visible:ring-2 focus-visible:ring-[#2a2a2a] focus-visible:ring-offset-4 focus-visible:outline-none"
          >
            <span className="block">{globalYouth.firstLine}</span>
            <span className="block">{globalYouth.secondLine}</span>
          </Link>
          {PROJECTS[locale].map((project) => (
            <p key={project} className="uppercase">
              {project}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
