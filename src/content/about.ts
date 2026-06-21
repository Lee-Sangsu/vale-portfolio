import type { LocalizedString } from "./types";

export const masthead: LocalizedString = {
  en: "Design, product, strategy.",
  es: "Diseño, producto, estrategia.",
};

export const subhead: LocalizedString = {
  en: "5 years between Bilbao, Berlin, Bogotá and Seoul.",
  es: "5 años entre Bilbao, Berlín, Bogotá y Seúl.",
};

export const aboutShort: LocalizedString = {
  en: "I'm Valeria, a designer in motion. I like things to become real, not stay on paper. If it can be automated, good. If it can ship today, better.",
  es: "Soy Valeria, diseñadora en movimiento. Me gusta que las cosas se vuelvan reales, que no se queden en el papel. Si se puede automatizar, bien. Si se puede ejecutar hoy, mejor.",
};

export const aboutLong: { paragraphs: LocalizedString[] } = {
  paragraphs: [
    {
      en: "I'm Valeria, a designer in motion.",
      es: "Soy Valeria, diseñadora en movimiento.",
    },
    {
      en: "For 5 years I've been designing brands, products, events and communities. I've worked with different teams, in different industries and in different countries, and across all of that I found the way I like to work: practical, creative, and focused on making things happen.",
      es: "Llevo 5 años diseñando marcas, productos, eventos y comunidades. He trabajado con diferentes equipos, en distintas industrias y en distintos países, y entre todo eso encontré la manera en que me gusta trabajar: práctica, creativa, y enfocada en que las cosas pasen.",
    },
    {
      en: "I like things to become real, not stay on paper. If it can be automated, good. If it can ship today, better.",
      es: "Me gusta que las cosas se vuelvan reales, que no se queden en el papel. Si se puede automatizar, bien. Si se puede ejecutar hoy, mejor.",
    },
    {
      en: "That's the coherence holding everything you'll see below.",
      es: "Esa es la coherencia que sostiene todo lo que verás a continuación.",
    },
  ],
};

export const yearMarker: LocalizedString = {
  en: "5 years · 4 cities · 1 voice",
  es: "5 años · 4 ciudades · 1 voz",
};

export const contact = {
  email: "valejimenezc2003@gmail.com",
  linkedin: "https://www.linkedin.com/in/valejimenezc",
  instagram: "https://www.instagram.com/valejimenez.cm/",
  instagramHandle: "@valejimenez.cm",
};

export const carryOn = {
  based: "Seoul · Bogotá",
  languages: "ES · EN · 한국어",
  roles: "Design · Product",
  available: "2026 →",
};

/**
 * Tools shown as a visual grid in the Skills + Contact sections.
 * `icon` is the real logo under /public/tools/ (extensions vary by file).
 */
export const tools: { slug: string; label: string; icon: string }[] = [
  { slug: "figma", label: "Figma", icon: "/tools/figma.avif" },
  { slug: "illustrator", label: "Illustrator", icon: "/tools/illustrator.webp" },
  { slug: "photoshop", label: "Photoshop", icon: "/tools/photoshop.avif" },
  { slug: "framer", label: "Framer", icon: "/tools/framer.avif" },
  { slug: "canva", label: "Canva", icon: "/tools/canva.webp" },
  { slug: "notion", label: "Notion", icon: "/tools/notion.png" },
  { slug: "capcut", label: "CapCut", icon: "/tools/capcut.avif" },
  { slug: "manychat", label: "ManyChat", icon: "/tools/manychat.webp" },
];
