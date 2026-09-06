import type { Locale } from "@/content/types";

type Skill = {
  title: string;
  body: string;
};

const INTRO: Record<Locale, string> = {
  en: "A multidisciplinary designer working across strategy, product, and content to turn ideas into real things",
  es: "Diseñadora multidisciplinar que trabaja entre estrategia, producto y contenido para convertir ideas en cosas reales",
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

export function SkillsSection({ locale }: { locale: Locale }) {
  const skills = SKILLS[locale];

  return (
    <section className="bg-white px-6 py-20 sm:px-12 sm:py-24 lg:min-h-[920px] lg:px-16 lg:py-0">
      <div className="mx-auto max-w-[1140px] lg:pt-[252px]">
        <div className="max-w-[560px] lg:hidden">
          <h2 className="font-inter text-ink2 text-[36px] leading-[normal] font-bold sm:text-[48px]">
            {locale === "es" ? "Habilidades" : "Skills"}
          </h2>
          <p className="font-inter mt-5 max-w-[400px] text-[18px] leading-[normal] text-[#6e726e]">
            {INTRO[locale]}
          </p>

          <ol className="mt-10 sm:mt-[41px]">
            {skills.map((skill, index) => (
              <li
                key={skill.title}
                className="border-b border-[#e2e2dc] py-5 first:pt-0 last:border-0"
              >
                <h3 className="font-inter text-ink2 text-[21px] leading-[normal] font-medium sm:text-[24px]">
                  {index + 1}. {skill.title}
                </h3>
                <p className="font-inter mt-1 max-w-[560px] text-[14px] leading-[normal] text-[#6e736e]">
                  {skill.body}
                </p>
              </li>
            ))}
          </ol>

          <p className="font-inter mt-5 text-[14px] leading-[normal] text-[#111]">
            {LANGUAGES[locale]}
          </p>
        </div>

        <div className="relative hidden h-[597px] w-[560px] lg:block">
          <h2 className="font-inter text-ink2 absolute top-0 left-0 text-[48px] leading-[normal] font-bold">
            {locale === "es" ? "Habilidades" : "Skills"}
          </h2>
          <p className="font-inter absolute top-[78px] left-0 w-[400px] text-[18px] leading-[normal] text-[#6e726e]">
            {INTRO[locale]}
          </p>

          <ol>
            {skills.map((skill, index) => {
              const top = [189, 294, 399, 487][index];

              return (
                <li
                  key={skill.title}
                  className="absolute left-0 w-[560px]"
                  style={{ top }}
                >
                  <h3 className="font-inter text-ink2 text-[24px] leading-[normal] font-medium whitespace-nowrap">
                    {index + 1}. {skill.title}
                  </h3>
                  <p className="font-inter mt-1 w-[560px] text-[14px] leading-[normal] text-[#6e736e]">
                    {skill.body}
                  </p>
                </li>
              );
            })}
          </ol>

          {[274, 379, 430, 467].map((top) => (
            <div
              key={top}
              aria-hidden="true"
              className="absolute left-0 h-px w-[492px] bg-[#e2e2dc]"
              style={{ top }}
            />
          ))}

          <p className="font-inter absolute top-[579px] left-0 text-[14px] leading-[normal] whitespace-nowrap text-[#111]">
            {LANGUAGES[locale]}
          </p>
        </div>
      </div>
    </section>
  );
}
