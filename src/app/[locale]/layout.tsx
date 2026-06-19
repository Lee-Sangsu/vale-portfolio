import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat, Geist, Instrument_Serif, Inter, Heebo } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const quinn = localFont({
  src: "../../fonts/Quinn-Bold.otf",
  variable: "--font-quinn",
  display: "swap",
  weight: "700",
  style: "normal",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter-raw",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const heebo = Heebo({
  variable: "--font-heebo-raw",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700", "800"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "site" });
  return {
    title: {
      default: t("title"),
      template: `%s · ${t("logo")}`,
    },
    description: t("description"),
    metadataBase: new URL("https://valeria.archive"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${quinn.variable} ${montserrat.variable} ${geist.variable} ${instrumentSerif.variable} ${inter.variable} ${heebo.variable} h-full bg-white`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
