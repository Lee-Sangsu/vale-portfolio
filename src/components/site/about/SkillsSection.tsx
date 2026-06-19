import type { Locale } from "@/content/types";
import { AppSwatchRow } from "@/components/site/AppSwatchRow";
import { NumberedAccordion, type AccordionItem } from "@/components/site/NumberedAccordion";
import { IpodCard } from "./IpodCard";

const SKILLS: Record<Locale, AccordionItem[]> = {
  es: [
    {
      title: "Estrategia & Marca",
      body: "Branding, voz, sistemas visuales y dirección creativa para marcas y founders.",
    },
    {
      title: "Producto & UX/UI",
      body: "Diseño de app y web, research y sistemas de producto (NomadHer).",
    },
    {
      title: "Contenido & Redes",
      body: "Campañas, contenido editorial y social que sostiene la comunidad.",
    },
    {
      title: "Eventos & Comunidad",
      body: "Producción de eventos y comunidades con BOOST LAB.",
    },
  ],
  en: [
    {
      title: "Strategy & Brand",
      body: "Branding, voice, visual systems and creative direction for brands and founders.",
    },
    {
      title: "Product & UX/UI",
      body: "App and web design, research and product systems (NomadHer).",
    },
    {
      title: "Content & Social",
      body: "Campaigns, editorial and social content that keeps the community alive.",
    },
    {
      title: "Events & Community",
      body: "Event and community production with BOOST LAB.",
    },
  ],
};

export function SkillsSection({ locale }: { locale: Locale }) {
  const es = locale === "es";

  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[1200px]">
        <AppSwatchRow className="mb-12 sm:mb-16" />

        <div className="grid items-start gap-14 lg:grid-cols-[1fr_280px]">
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
              <NumberedAccordion items={SKILLS[locale]} defaultOpen={0} />
            </div>
          </div>

          {/* Right: decorative iPod */}
          <div className="flex justify-center lg:justify-end lg:pt-6">
            <IpodCard locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
