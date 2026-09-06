import type { Locale } from "@/content/types";
import { professionalSkills } from "@/content/about";
import { AppSwatchRow } from "@/components/site/AppSwatchRow";
import { NumberedAccordion, type AccordionItem } from "@/components/site/NumberedAccordion";
import { IpodCard } from "./IpodCard";

const SKILL_TITLES: Record<Locale, string[]> = {
  es: ["Estrategia & Marca", "Producto & UX/UI", "AI & Ejecución", "Equipos Globales"],
  en: ["Strategy & Brand", "Product & UX/UI", "AI & Delivery", "Global Teams"],
};

function getSkills(locale: Locale): AccordionItem[] {
  return SKILL_TITLES[locale].map((title, index) => ({
    title,
    body: professionalSkills[locale][index],
  }));
}

export function SkillsSection({ locale }: { locale: Locale }) {
  const es = locale === "es";

  return (
    <section className="bg-white px-6 py-20 sm:px-12 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-[1080px]">
        <AppSwatchRow className="mb-12 sm:mb-16" />

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,520px)_280px] lg:justify-center lg:gap-12">
          {/* Left: heading + intro + accordion */}
          <div>
            <h2 className="font-inter text-[36px] font-bold leading-tight text-ink2 sm:text-[48px]">
              {es ? "Habilidades" : "Skills"}
            </h2>
            <p className="mt-5 max-w-[420px] font-inter text-[17px] leading-[1.6] text-muted">
              {es
                ? "Diseñadora multidisciplinar: trabajo entre estrategia, producto y contenido para que las ideas se vuelvan reales."
                : "A multidisciplinary designer working across strategy, product and content to turn ideas into real things."}
            </p>

            <div className="mt-10 max-w-[520px]">
              <NumberedAccordion items={getSkills(locale)} defaultOpen={0} />
            </div>
          </div>

          {/* Right: decorative iPod */}
          <div className="flex justify-center">
            <IpodCard locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
