import Image from "next/image";
import type { Locale, LocalizedString } from "@/content/types";
import { Link } from "@/i18n/navigation";

type JourneyItem = {
  role: LocalizedString;
  company: LocalizedString;
  date: LocalizedString;
  href?: `/work/${string}`;
};

const INTRO: LocalizedString = {
  en: "Five years designing brands, products, events and communities across Bilbao, Berlin, Bogotá and Seoul.",
  es: "Cinco años diseñando marcas, productos, eventos y comunidades entre Bilbao, Berlín, Bogotá y Seúl.",
};

const JOURNEY: JourneyItem[] = [
  {
    role: { en: "Product & design", es: "Producto y diseño" },
    company: { en: "NomadHer", es: "NomadHer" },
    date: { en: "Oct 2025 - present", es: "Oct 2025 - presente" },
    href: "/work/nomadher-app",
  },
  {
    role: { en: "Innovation & expansion", es: "Innovación y expansión" },
    company: { en: "BOOST LAB", es: "BOOST LAB" },
    date: { en: "2024 - present", es: "2024 - presente" },
    href: "/work/global-youth-summit",
  },
  {
    role: { en: "Branding & strategy", es: "Branding y estrategia" },
    company: { en: "Diseño independiente", es: "Diseño independiente" },
    date: { en: "2025 - 2026", es: "2025 - 2026" },
  },
  {
    role: { en: "LATAM talent scouting", es: "Talent scouting LATAM" },
    company: { en: "Travelling University", es: "Travelling University" },
    date: { en: "2024 - 2025", es: "2024 - 2025" },
  },
  {
    role: {
      en: "Creative direction & strategy",
      es: "Dirección creativa y estrategia",
    },
    company: { en: "N9NE", es: "N9NE" },
    date: { en: "2021 - 2024", es: "2021 - 2024" },
  },
  {
    role: {
      en: "Program Manager Assistant",
      es: "Program Manager Assistant",
    },
    company: { en: "Ironhack", es: "Ironhack" },
    date: { en: "2022 - 2023", es: "2022 - 2023" },
  },
];

export function JourneySection({ locale }: { locale: Locale }) {
  return (
    <section className="bg-white px-6 py-20 sm:px-12 sm:py-24 lg:h-[900px] lg:px-16 lg:py-0">
      <div className="relative mx-auto max-w-[1140px] lg:h-full">
        <div className="lg:absolute lg:top-[146px] lg:left-0 lg:w-[642px]">
          <h2 className="font-inter text-ink2 text-[38px] leading-[normal] font-bold sm:text-[48px] lg:text-[64px] lg:whitespace-nowrap">
            {locale === "es" ? "Descubre mi camino" : "Discover My Journey"}
          </h2>
          <p className="font-inter mt-4 max-w-[617px] text-[18px] leading-[normal] text-[#6e726e] lg:mt-[27px]">
            {INTRO[locale]}
          </p>

          <ul className="mt-14 lg:mt-[105px]">
            {JOURNEY.map((item) => (
              <li
                key={item.role.en}
                className="flex min-h-[74px] flex-col items-start gap-1 border-b border-[#e2e2dc] py-4 last:border-0 sm:flex-row sm:justify-between sm:gap-6 lg:py-0"
              >
                <span className="font-inter text-ink2 max-w-[407px] text-[21px] leading-[normal] font-medium sm:text-[24px]">
                  {item.role[locale]}
                </span>
                <span className="flex shrink-0 flex-col items-start pt-0.5 sm:items-end">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="font-inter text-[15px] leading-[normal] font-semibold text-[#1fa463] transition-opacity hover:opacity-75"
                    >
                      {item.company[locale]}
                    </Link>
                  ) : (
                    <span className="font-inter text-[15px] leading-[normal] font-semibold text-[#1fa463]">
                      {item.company[locale]}
                    </span>
                  )}
                  <span className="font-inter mt-1 text-[12px] leading-[normal] text-[#999]">
                    {item.date[locale]}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto mt-14 aspect-[372/493] w-full max-w-[372px] overflow-hidden rounded-[16px] shadow-[0_8px_22px_rgba(0,0,0,0.12)] lg:absolute lg:top-[240px] lg:right-[-94px] lg:mt-0 lg:aspect-auto lg:h-[493px] lg:w-[372px]">
          <Image
            src="/pages/about/figma/journey-portrait.jpg"
            alt="Valeria Jiménez traveling"
            fill
            sizes="(min-width: 1024px) 372px, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
