import Image from "next/image";
import { contact } from "@/content/about";
import type { Locale } from "@/content/types";

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[17px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[16px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[17px]"
      fill="currentColor"
    >
      <path d="M6.5 8.4H3.3V19h3.2V8.4ZM4.9 3A1.9 1.9 0 1 0 5 6.8 1.9 1.9 0 0 0 4.9 3ZM20.7 13.1c0-3.2-1.7-4.9-4.1-4.9a3.6 3.6 0 0 0-3.3 1.8V8.4h-3.2V19h3.2v-5.2c0-1.4.3-2.8 2.1-2.8s1.9 1.6 1.9 2.9V19h3.3l.1-5.9Z" />
    </svg>
  );
}

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
    <section className="bg-white px-6 pt-24 pb-0 sm:px-8 sm:pt-32 lg:pt-[180px]">
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
              className="grid size-7 place-items-center rounded-md bg-[#2a2a2a] text-white transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#2a2a2a] focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <InstagramIcon />
            </a>
            <a
              href={`mailto:${contact.email}`}
              aria-label="Email"
              className="grid size-7 place-items-center rounded-full bg-[#25d368] text-white transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#25d368] focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <MailIcon />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid size-7 place-items-center rounded-[6px] bg-[#0a66c2] text-white transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        <div className="relative mx-auto aspect-[372/508] w-full max-w-[372px] lg:mx-0">
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
