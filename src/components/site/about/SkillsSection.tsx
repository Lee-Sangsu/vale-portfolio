import type { Locale } from "@/content/types";
import { IpodCard } from "./IpodCard";
import { SkillsLogoMarquee } from "./SkillsLogoMarquee";
import { getSongPreviews } from "@/lib/song-previews";

type Skill = {
  title: string;
  body: string;
};

const INTRO: Record<Locale, string> = {
  en: "What isn't taught in a classroom and supports everything else.",
  es: "Lo que no se enseña en una clase y sostiene todo lo demás",
};

const SKILLS: Record<Locale, Skill[]> = {
  en: [
    {
      title: "Leadership & project management",
      body: "Cross-cultural teams, international coordination and end-to-end ownership, equally comfortable leading a team or carrying a project solo.",
    },
    {
      title: "Adaptability",
      body: "Switching industries, countries and languages without losing pace: every new context becomes familiar ground fast.",
    },
    {
      title: "Creativity & design",
      body: "Design as a native language: from concept and art to pieces that work.",
    },
    {
      title: "Innovation & entrepreneurship",
      body: "Founder mindset: spotting gaps and building from zero to launch.",
    },
  ],
  es: [
    {
      title: "Liderazgo y gestión de proyectos",
      body: "Equipos interculturales, coordinación internacional y responsabilidad de principio a fin, tanto liderando un equipo como llevando un proyecto en solitario.",
    },
    {
      title: "Adaptabilidad",
      body: "Cambio de industria, país e idioma sin perder el ritmo: cada contexto nuevo se convierte rápido en terreno familiar.",
    },
    {
      title: "Creatividad y diseño",
      body: "El diseño como lenguaje nativo: del concepto y el arte a piezas que funcionan.",
    },
    {
      title: "Innovación y emprendimiento",
      body: "Mentalidad fundadora: detectar oportunidades y construir desde cero hasta el lanzamiento.",
    },
  ],
};

const LANGUAGES: Record<Locale, string> = {
  en: "Languages: Native Spanish · Fluent English · Basic Korean",
  es: "Idiomas: Español nativo · Inglés fluido · Coreano básico",
};

export async function SkillsSection({ locale }: { locale: Locale }) {
  const skills = SKILLS[locale];
  const previews = await getSongPreviews();

  return (
    <section className="bg-white px-6 py-20 sm:px-12 sm:py-24 xl:h-[1200px] xl:px-16 xl:py-0">
      <div className="relative mx-auto max-w-[1076px] xl:h-full xl:pt-[73px]">
        <SkillsLogoMarquee locale={locale} />

        <div className="mt-14 max-w-[642px] sm:mt-16 xl:absolute xl:top-[252px] xl:left-0 xl:mt-0 xl:w-[642px]">
          <h2 className="font-inter text-ink2 text-[36px] leading-[normal] font-bold sm:text-[48px] xl:text-[64px]">
            {locale === "es" ? "Habilidades" : "Skills"}
          </h2>
          <p className="font-inter mt-5 max-w-[400px] text-[18px] leading-[normal] text-[#6e726e]">
            {INTRO[locale]}
          </p>

          <ol className="mt-10 sm:mt-12">
            {skills.map((skill, index) => (
              <li
                key={skill.title}
                className="border-b border-[#e2e2dc] py-7 first:pt-0 last:border-0 sm:py-8"
              >
                <h3 className="font-inter text-ink2 text-[22px] leading-[1.2] font-semibold sm:text-[28px] xl:whitespace-nowrap">
                  <span className="mr-2">{index + 1}.</span>
                  {skill.title}
                </h3>
                <p className="font-inter mt-3 max-w-[560px] text-[16px] leading-[1.55] text-[#4a4f4a]">
                  {skill.body}
                </p>
              </li>
            ))}
          </ol>

          <p className="font-inter mt-8 text-[14px] leading-[normal] text-[#111] xl:whitespace-nowrap">
            {LANGUAGES[locale]}
          </p>
        </div>

        <div className="mx-auto mt-28 flex w-full justify-center pb-8 xl:absolute xl:top-[463px] xl:left-[756px] xl:mt-0 xl:w-[160px] xl:pb-0 2xl:left-[885px]">
          <IpodCard
            locale={locale}
            tracks={skills.map((skill) => skill.title)}
            scale={1.45}
            previews={previews}
          />
        </div>
      </div>
    </section>
  );
}
