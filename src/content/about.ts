import type { Localized, LocalizedString } from "./types";

export const masthead: LocalizedString = {
  en: "Design, product, strategy.",
  es: "Diseño, producto, estrategia.",
};

export const subhead: LocalizedString = {
  en: "5 years between Bilbao, Berlin, Bogotá and Seoul.",
  es: "5 años entre Bilbao, Berlín, Bogotá y Seúl.",
};

export const aboutShort: LocalizedString = {
  en: "I'm Valeria Jiménez, a designer in motion. Over 5 years I've built brands, products and communities across Bilbao, Berlin, Bogotá and Seoul, moving between product design, strategy and business growth. I like being part of design that becomes real.",
  es: "Soy Valeria Jiménez, diseñadora en movimiento. En 5 años he construido marcas, productos y comunidades entre Bilbao, Berlín, Bogotá y Seúl, moviéndome entre diseño de producto, estrategia y business growth. Me gusta ser parte del diseño que se vuelve real.",
};

export const professionalPositioning: LocalizedString = aboutShort;

export const professionalSkills: Localized<string[]> = {
  en: [
    "I combine strategic thinking and visual sensibility to design brands, digital products and experiences aligned with real business goals.",
    "I design end-to-end UX/UI products: research, design systems, flows and features shipped to production for mobile and web.",
    "I apply Design Thinking, Lean UX and Customer Journey Mapping alongside AI and low-code tools to move from idea to execution fast.",
    "I work with multidisciplinary teams bilingually across LATAM, Europe and Asia, leading branding, content and multichannel campaigns.",
  ],
  es: [
    "Combino pensamiento estratégico y sensibilidad visual para diseñar marcas, productos digitales y experiencias alineadas con objetivos reales de negocio.",
    "Diseño productos UX/UI de punta a punta: investigación, design systems, flujos y features en producción para mobile y web.",
    "Aplico Design Thinking, Lean UX y Customer Journey Mapping junto con AI y herramientas low-code para pasar de la idea a la ejecución rápido.",
    "Trabajo con equipos multidisciplinarios de forma bilingüe entre LATAM, Europa y Asia, liderando branding, contenido y campañas multicanal.",
  ],
};

type JourneyRole = {
  role: LocalizedString;
  company: LocalizedString;
  date: LocalizedString;
  href?: `/work/${string}`;
};

export const journeyRoles: JourneyRole[] = [
  {
    role: { en: "Founding Designer", es: "Founding Designer" },
    company: { en: "NomadHer", es: "NomadHer" },
    date: { en: "Oct 2025–Present", es: "Oct 2025–Presente" },
    href: "/work/nomadher-app",
  },
  {
    role: {
      en: "Creative Lead · Innovation, design & international expansion",
      es: "Liderazgo creativo · Innovación, diseño y expansión internacional",
    },
    company: { en: "BOOST LAB", es: "BOOST LAB" },
    date: { en: "Jan 2024–Present", es: "Ene 2024–Presente" },
    href: "/work/global-youth-summit",
  },
  {
    role: {
      en: "Co-founder & Team Lead",
      es: "Cofundadora y Team Lead",
    },
    company: { en: "N9NE Team Company", es: "N9NE Team Company" },
    date: { en: "2021–Sep 2024", es: "2021–Sep 2024" },
  },
  {
    role: {
      en: "Marketing Strategy & Talent Scouting",
      es: "Estrategia de marketing y scouting de talento",
    },
    company: { en: "Travelling University", es: "Travelling University" },
    date: { en: "Feb–Sep 2025", es: "Feb–Sep 2025" },
  },
  {
    role: {
      en: "Independent Designer · Brand, web & content strategy",
      es: "Diseño independiente · Marca, web y estrategia de contenido",
    },
    company: { en: "Independent", es: "Independiente" },
    date: { en: "2025–2026", es: "2025–2026" },
  },
  {
    role: {
      en: "Program Manager Assistant",
      es: "Program Manager Assistant",
    },
    company: { en: "Ironhack", es: "Ironhack" },
    date: { en: "Mar–Sep 2023", es: "Mar–Sep 2023" },
  },
];

export const profileMetrics: Localized<string[]> = {
  en: [
    "NomadHer month-1 retention: 21–23%",
    "NomadHer organic reach: 1.3M+ views in 8 months",
    "BOOST LAB events: 400+ attendees and 142,473 views per edition",
    "BOOST LAB network: 45+ institutions across Colombia and Korea",
  ],
  es: [
    "Retención mes 1 de NomadHer: 21–23%",
    "Alcance orgánico de NomadHer: +1,3M de vistas en 8 meses",
    "Eventos BOOST LAB: 400+ asistentes y 142.473 views por edición",
    "Red BOOST LAB: 45+ instituciones entre Colombia y Corea",
  ],
};

export const credentials = {
  education: {
    title: {
      en: "Entrepreneurial Leadership & Innovation (LEINN)",
      es: "Liderazgo Emprendedor e Innovación (LEINN)",
    },
    institution: "Mondragon Unibertsitatea",
    context: {
      en: "Bilbao · Berlin · Seoul · global year",
      es: "Bilbao · Berlín · Seúl · año global",
    },
    date: "2021–2026",
    thesis: {
      en: "AI-enabled hybrid incubation program for international entrepreneurs",
      es: "programa híbrido de incubación con AI para emprendedores internacionales",
    },
  },
  recognitions: {
    en: [
      "Mentor at Bridge for Billions, supporting early-stage ventures.",
      "Innovation workshops and talks for Universidad Externado and Banco Santander.",
      "Speaker at CIS Conference (Bogotá, 2025) on talent scouting for global programs.",
      "First place at Glocal Quest (KOSME, Korea, 2023) for a community Living Lab for rural youth.",
      "Top 10% at Coderhouse in Marketing, Community Management and Advertising.",
    ],
    es: [
      "Mentora en Bridge for Billions, acompañando ventures en etapa temprana.",
      "Talleres y ponencias de innovación para Universidad Externado y Banco Santander.",
      "Speaker en CIS Conference (Bogotá, 2025) sobre talent scouting para programas globales.",
      "Primer lugar en Glocal Quest (KOSME, Corea, 2023) por un Living Lab de innovación para jóvenes rurales.",
      "Top 10% de Coderhouse en Marketing, Community Management y Publicidad.",
    ],
  } satisfies Localized<string[]>,
  languages: {
    en: ["Spanish: native", "English: advanced", "Korean: basic"],
    es: ["Español: nativo", "Inglés: avanzado", "Coreano: básico"],
  } satisfies Localized<string[]>,
  methods: [
    "Figma",
    "Illustrator",
    "Canva",
    "CapCut",
    "Notion",
    "ManyChat",
    "Mailjet",
    "Design systems",
    "User research",
    "AI-assisted design",
    "AI prototyping",
  ],
  strengths: {
    en: ["Leadership", "Adaptability", "Creativity", "Teamwork"],
    es: ["Liderazgo", "Adaptabilidad", "Creatividad", "Trabajo en equipo"],
  } satisfies Localized<string[]>,
};

export const aboutLong: { paragraphs: LocalizedString[] } = {
  paragraphs: [
    {
      en: "I'm Valeria, a designer in motion.",
      es: "Soy Valeria, diseñadora en movimiento.",
    },
    {
      en: "Over 5 years I've built brands, products and communities across Bilbao, Berlin, Bogotá and Seoul, moving between product design, strategy and business growth.",
      es: "En 5 años he construido marcas, productos y comunidades entre Bilbao, Berlín, Bogotá y Seúl, moviéndome entre diseño de producto, estrategia y business growth.",
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
 * `icon` is the real logo under /public/shared/tool-logos/ (extensions vary by file).
 */
export const tools: { slug: string; label: string; icon: string }[] = [
  { slug: "figma", label: "Figma", icon: "/shared/tool-logos/figma.avif" },
  { slug: "illustrator", label: "Illustrator", icon: "/shared/tool-logos/illustrator.webp" },
  { slug: "photoshop", label: "Photoshop", icon: "/shared/tool-logos/photoshop.avif" },
  { slug: "framer", label: "Framer", icon: "/shared/tool-logos/framer.avif" },
  { slug: "canva", label: "Canva", icon: "/shared/tool-logos/canva.webp" },
  { slug: "notion", label: "Notion", icon: "/shared/tool-logos/notion.svg" },
  { slug: "capcut", label: "CapCut", icon: "/shared/tool-logos/capcut.avif" },
  { slug: "manychat", label: "ManyChat", icon: "/shared/tool-logos/manychat.webp" },
];
