"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import clsx from "clsx";

type Tone = "light" | "dark";

const NAV = [
  { href: "/", en: "Home", es: "Inicio" },
  { href: "/projects", en: "Portfolio", es: "Portafolio" },
  { href: "/about", en: "About", es: "Sobre mí" },
  { href: "/contact", en: "Contact", es: "Contacto" },
] as const;

/**
 * Pill navigation from the Figma "Portfolio" template.
 * - logo "Portfolio" (Quinn) on the left
 * - centered white pill with the four links
 * - dark EN/ES toggle on the right
 *
 * `tone="light"` is for the home hero (sits over the sky → white logo).
 * `tone="dark"` is for white-background inner pages.
 */
export function SiteNav({ tone = "dark" }: { tone?: Tone }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const other = routing.locales.find((l) => l !== locale)!;

  const light = tone === "light";

  return (
    <nav className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
        {/* Logo */}
        <Link
          href="/"
          className={clsx(
            "font-display text-[28px] leading-none tracking-[0.02em] transition-opacity hover:opacity-70 sm:text-[34px]",
            light ? "text-white" : "text-ink2",
          )}
        >
          Portfolio
        </Link>

        {/* Center pill */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[25px] rounded-full bg-white px-[40px] py-[11px] shadow-[0_4px_18px_rgba(0,0,0,0.08)] md:flex">
          {NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "font-inter text-[16px] font-medium transition-colors hover:text-nav",
                  active ? "text-nav" : "text-nav-dim",
                )}
              >
                {locale === "es" ? item.es : item.en}
              </Link>
            );
          })}
        </div>

        {/* Lang toggle */}
        <button
          type="button"
          onClick={() =>
            startTransition(() => router.replace(pathname, { locale: other }))
          }
          aria-label={
            other === "es" ? "Cambiar idioma a español" : "Switch language to English"
          }
          className={clsx(
            "rounded-full bg-[#111] px-[22px] py-[11px] font-inter text-[15px] font-semibold text-white transition-opacity hover:opacity-80",
            pending && "opacity-50",
          )}
        >
          {locale === "en" ? "EN" : "ES"}
          <span className="opacity-40">/</span>
          {other === "en" ? "EN" : "ES"}
        </button>
      </div>

      {/* Mobile link row */}
      <div className="flex items-center justify-center gap-6 pb-2 md:hidden">
        {NAV.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "font-inter text-[13px] font-medium",
                light ? "text-white/90" : active ? "text-nav" : "text-nav-dim",
              )}
            >
              {locale === "es" ? item.es : item.en}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
