import Image from "next/image";
import type { Locale } from "@/content/types";
import { aboutLong } from "@/content/about";
import { encodeAsset } from "@/content/photo-manifest";

type Role = {
  role: { en: string; es: string };
  company: { en: string; es: string };
  href?: string;
  date: string;
};

const ROLES: Role[] = [
  {
    role: {
      en: "Product · UX/UI Designer",
      es: "Diseñadora de Producto · UX/UI",
    },
    company: { en: "NomadHer", es: "NomadHer" },
    href: "/work/nomadher-app",
    date: "Oct 2025 →",
  },
  {
    role: { en: "Innovation Lead", es: "Innovation Lead" },
    company: { en: "BOOST LAB", es: "BOOST LAB" },
    href: "/work/global-youth-summit",
    date: "2024 →",
  },
  {
    role: { en: "Designer & Consultant", es: "Diseñadora & Consultora" },
    company: { en: "Independent", es: "Independiente" },
    date: "2025 → 2026",
  },
  {
    role: { en: "Talent Scout & Ambassador", es: "Talent Scout & Ambassador" },
    company: { en: "Travelling University", es: "Travelling University" },
    date: "2025",
  },
  {
    role: { en: "Co-founder & Team Lead", es: "Co-fundadora & Team Lead" },
    company: { en: "N9NE", es: "N9NE" },
    date: "2021 → 2024",
  },
];

export function JourneySection({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const intro = aboutLong.paragraphs[1][locale];

  return (
    <section className="bg-white px-6 py-20 sm:px-12 sm:py-24 lg:px-16">
      <div className="mx-auto grid max-w-[1080px] items-start gap-10 lg:grid-cols-[360px_1fr] lg:gap-14">
        {/* Portrait */}
        <div className="relative mx-auto aspect-[409/494] w-full max-w-[360px] overflow-hidden rounded-[16px] shadow-[0_8px_22px_rgba(0,0,0,0.12)]">
          <Image
            src={encodeAsset("photos/about/Val.png")!}
            alt="Valeria Jiménez"
            fill
            sizes="(min-width: 1024px) 360px, 100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Heading + intro + roles */}
        <div>
          <h2 className="font-inter text-ink2 text-[34px] leading-[1.08] font-bold sm:text-[48px]">
            {es ? "Descubre mi camino" : "Discover My Journey"}
          </h2>
          <p className="font-inter text-muted mt-5 max-w-[440px] text-[16px] leading-[1.55]">
            {intro}
          </p>

          <ul className="border-win-border mt-8 border-t">
            {ROLES.map((r) => (
              <li
                key={r.role.en}
                className="border-win-border flex flex-col gap-1 border-b py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-5"
              >
                <span className="font-inter text-ink2 text-[18px] font-medium sm:text-[20px]">
                  {r.role[locale]}
                </span>
                <span className="flex flex-col sm:items-end">
                  {r.href ? (
                    <a
                      href={r.href}
                      className="font-inter text-green text-[14px] font-semibold transition-opacity hover:opacity-75"
                    >
                      {r.company[locale]}
                    </a>
                  ) : (
                    <span className="font-inter text-green text-[14px] font-semibold">
                      {r.company[locale]}
                    </span>
                  )}
                  <span className="font-inter text-[12px] text-[#999]">
                    {r.date}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
