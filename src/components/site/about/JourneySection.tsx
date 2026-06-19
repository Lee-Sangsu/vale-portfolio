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
    role: { en: "Product · UX/UI Designer", es: "Diseñadora de Producto · UX/UI" },
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
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-[1200px] items-start gap-12 lg:grid-cols-[409px_1fr] lg:gap-20">
        {/* Portrait */}
        <div className="relative mx-auto aspect-[409/494] w-full max-w-[409px] overflow-hidden rounded-[16px] shadow-[0_8px_22px_rgba(0,0,0,0.12)]">
          <Image
            src={encodeAsset("photos/about/Val.png")!}
            alt="Valeria Jiménez"
            fill
            sizes="(min-width: 1024px) 409px, 100vw"
            className="object-cover"
          />
        </div>

        {/* Heading + intro + roles */}
        <div>
          <h2 className="font-inter text-[40px] font-bold leading-[1.05] text-ink2 sm:text-[60px]">
            {es ? "Descubre mi camino" : "Discover My Journey"}
          </h2>
          <p className="mt-6 max-w-[440px] font-inter text-[17px] leading-[1.6] text-muted">
            {intro}
          </p>

          <ul className="mt-10 border-t border-win-border">
            {ROLES.map((r) => (
              <li
                key={r.role.en}
                className="flex flex-col gap-1 border-b border-win-border py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="font-inter text-[20px] font-medium text-ink2 sm:text-[24px]">
                  {r.role[locale]}
                </span>
                <span className="flex flex-col sm:items-end">
                  {r.href ? (
                    <a
                      href={r.href}
                      className="font-inter text-[15px] font-semibold text-green transition-opacity hover:opacity-75"
                    >
                      {r.company[locale]}
                    </a>
                  ) : (
                    <span className="font-inter text-[15px] font-semibold text-green">
                      {r.company[locale]}
                    </span>
                  )}
                  <span className="font-inter text-[12px] text-[#999]">{r.date}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
