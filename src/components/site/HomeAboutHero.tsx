import Image from "next/image";
import { contact } from "@/content/about";
import type { Locale } from "@/content/types";

export function HomeAboutHero({ locale }: { locale: Locale }) {
  const es = locale === "es";

  const paragraphs = es
    ? [
        "Estudié Liderazgo, Emprendimiento e Innovación y me especializo en un diseño holístico: combino diseño de experiencias, marketing, diseño gráfico y desarrollo de negocio. He construido proyectos en Europa, Latinoamérica y Asia, con equipos y culturas que me han enseñado a ver el trabajo desde ángulos tan retadores como enriquecedores.",
        "Me encanta seguir aprendiendo, trabajar de forma práctica y creativa, y ver cómo las ideas se transforman en cosas que generan impacto. Mi sello en cada equipo: energía para arrancar y cumplimiento para cerrar.",
      ]
    : [
        "I studied Leadership, Entrepreneurship and Innovation and specialize in holistic design: combining experience design, marketing, graphic design and business development. I've built projects across Europe, Latin America and Asia with teams and cultures that taught me to see work from perspectives as challenging as they are enriching.",
        "I love to keep learning, work in a practical and creative way, and see ideas turn into things that make an impact. What I bring to every team: energy to get started and the follow-through to finish.",
      ];

  return (
    <section className="bg-white px-6 py-24 sm:px-8 sm:py-32 lg:py-[180px]">
      <div className="mx-auto grid max-w-[1250px] items-start gap-14 lg:grid-cols-[minmax(0,671px)_372px] lg:justify-between lg:gap-20">
        <div>
          <h2 className="font-inter text-[44px] leading-[1.04] font-bold text-[#2a2a2a] sm:text-[56px] lg:text-[64px]">
            {es ? "Diseñadora en movimiento" : "Designer in motion"}
          </h2>

          <div className="font-inter mt-10 max-w-[671px] space-y-7 text-[16px] leading-[1.55] text-[#6e726e] sm:text-[18px]">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-6">
            <a
              href={contact.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid size-7 place-items-center rounded-md bg-[#2a2a2a] text-[11px] font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              IG
            </a>
            <a
              href={`mailto:${contact.email}`}
              aria-label="Email"
              className="grid size-7 place-items-center rounded-full bg-[#25d368] text-[14px] font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              @
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="font-inter grid size-7 place-items-center rounded-[6px] bg-[#0a66c2] text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              in
            </a>
          </div>
        </div>

        <div className="relative mx-auto aspect-[372/508] w-full max-w-[372px] overflow-hidden rounded-[16px] shadow-[0_8px_22px_rgba(0,0,0,0.12)] lg:mx-0">
          <Image
            src="/pages/home/figma/about-portrait.png"
            alt="Valeria Jiménez"
            fill
            sizes="(max-width: 1023px) min(100vw - 48px, 372px), 372px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
