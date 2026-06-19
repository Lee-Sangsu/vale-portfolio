import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/content/types";
import { SiteNav } from "@/components/site/SiteNav";
import { AppSwatchRow } from "@/components/site/AppSwatchRow";
import { WorkTogether } from "@/components/site/WorkTogether";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PhotoRing } from "@/components/site/contact/PhotoRing";
import { contact, aboutLong } from "@/content/about";
import { encodeAsset } from "@/content/photo-manifest";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const es = locale === "es";

  const portrait = encodeAsset("photos/about/Val.png")!;
  const bio = [aboutLong.paragraphs[1], aboutLong.paragraphs[2]];

  return (
    <main className="bg-white">
      {/* ── Photo ring + page title ─────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pb-12 pt-28 sm:px-8 sm:pt-32 md:pb-20 md:pt-40">
        <SiteNav tone="dark" />

        {/* Title sits top-left, overlapping the empty center of the ring */}
        <div className="mx-auto max-w-[1400px]">
          <h1 className="relative z-10 font-inter text-[36px] font-semibold leading-none text-[#111] sm:text-[46px]">
            {es ? "Contacto" : "Contact"}
          </h1>
        </div>

        <div className="mx-auto mt-8 max-w-[1400px] md:mt-2">
          <PhotoRing />
        </div>
      </section>

      {/* ── About hero: name + bio + Instagram + portrait ───────── */}
      <section className="px-5 py-12 sm:px-8 md:py-20">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-12 md:flex-row md:items-start md:justify-between md:gap-16">
          {/* Left column */}
          <div className="max-w-[440px]">
            <h2 className="font-inter text-[46px] font-bold leading-[1.04] text-ink2 sm:text-[60px] lg:text-[74px] lg:leading-[78px]">
              Valeria
              <br />
              Jiménez
            </h2>

            <div className="mt-8 flex max-w-[387px] flex-col gap-4">
              {bio.map((p, i) => (
                <p key={i} className="font-inter text-[16px] leading-[24px] text-ink sm:text-[17px]">
                  {es ? p.es : p.en}
                </p>
              ))}
            </div>

            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="mt-8 inline-flex transition-opacity hover:opacity-70"
            >
              <Image
                src="/figma/contact/instagram-icon.svg"
                alt="Instagram"
                width={28}
                height={28}
              />
            </a>
          </div>

          {/* Right column: portrait card */}
          <div className="relative mx-auto h-[393px] w-[275px] shrink-0 overflow-hidden rounded-[16px] shadow-[0_8px_22px_rgba(0,0,0,0.12)] md:mx-0">
            <Image
              src={portrait}
              alt="Valeria Jiménez"
              fill
              sizes="275px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Tool swatch row ─────────────────────────────────────── */}
      <section className="px-5 pb-16 sm:px-8 md:pb-24">
        <AppSwatchRow className="mx-auto max-w-[960px]" />
      </section>

      {/* ── Recurring contact block + footer ────────────────────── */}
      <WorkTogether photo={portrait} />
      <SiteFooter />
    </main>
  );
}
