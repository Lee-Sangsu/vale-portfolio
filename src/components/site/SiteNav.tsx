"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import clsx from "clsx";
import { motion } from "motion/react";

type Tone = "light" | "dark" | "onDark";

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
 * `tone="light"` is for the home/about heroes (bright sky → black logo).
 * `tone="dark"` is for white-background inner pages (black logo).
 * `tone="onDark"` is for very dark backgrounds (chapter heroes): negative, white logo.
 */
export function SiteNav({ tone = "dark" }: { tone?: Tone }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const other = routing.locales.find((l) => l !== locale)!;

  const light = tone === "light";
  const onDark = tone === "onDark";

  return (
    <nav className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
        {/* Logo */}
        <Link
          href="/"
          className={clsx(
            "font-display text-[28px] leading-none tracking-[0.02em] transition-opacity hover:opacity-70 sm:text-[34px]",
            onDark ? "text-white" : "text-black",
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

        {/* Right: lang toggle + contact CTA */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              startTransition(() => router.replace(pathname, { locale: other }))
            }
            aria-label={
              other === "es" ? "Cambiar idioma a español" : "Switch language to English"
            }
            className={clsx(
              "font-inter text-[14px] font-semibold transition-opacity hover:opacity-60",
              onDark ? "text-white" : light ? "text-black" : "text-ink2",
              pending && "opacity-40",
            )}
          >
            {locale === "en" ? "EN" : "ES"}
            <span className="opacity-40">/</span>
            {other === "en" ? "EN" : "ES"}
          </button>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            {/* Every page ends with the "Let's grab a coffee" block, so the CTA scrolls there instead of leaving the page. */}
            <a
              href="#contacto"
              className="rounded-full bg-[#111] px-[16px] py-[9px] font-inter text-[13px] font-semibold text-white transition-opacity hover:opacity-80 sm:px-[22px] sm:py-[11px] sm:text-[15px]"
            >
              {locale === "es" ? "Contacto" : "Contact"}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Mobile link row: the same white pill as desktop, scaled down and centered */}
      <div className="flex justify-center px-5 pb-2 md:hidden">
        <div className="flex items-center gap-[18px] rounded-full bg-white px-[22px] py-[9px] shadow-[0_4px_18px_rgba(0,0,0,0.08)]">
          {NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "whitespace-nowrap font-inter text-[13px] font-medium transition-colors",
                  active ? "text-nav" : "text-nav-dim",
                )}
              >
                {locale === "es" ? item.es : item.en}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
