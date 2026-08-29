import type { Chapter, LocalizedString } from "./types";

export const chapters: Chapter[] = [
  {
    id: "nomadher",
    number: "01",
    title: { en: "NomadHer", es: "NomadHer" },
    dateRange: "Oct 2025–present",
    location: { en: "Seoul · Global", es: "Seúl · Global" },
    projects: {
      en: ["App redesign", "Visual system", "Japan Airlines", "Community"],
      es: ["Rediseño de la app", "Sistema visual", "Japan Airlines", "Comunidad"],
    },
    starred: true,
  },
  {
    id: "boost-lab",
    number: "02",
    title: { en: "BOOST LAB", es: "BOOST LAB" },
    dateRange: "2024–present",
    location: { en: "Korea ↔ Colombia", es: "Corea ↔ Colombia" },
    projects: {
      en: ["Global Youth", "Summits", "Sejong", "International Missions"],
      es: ["Global Youth", "Summits", "Sejong", "Misiones Internacionales"],
    },
    starred: true,
  },
  {
    id: "independent",
    number: "03",
    title: {
      en: "Independent design",
      es: "Diseño independiente",
    },
    dateRange: "2025–2026",
    location: { en: "Colombia · Korea · Spain", es: "Colombia · Corea · España" },
    projects: {
      en: ["Serema Hotel", "Opuesto SAS", "Brújula Ética", "Santa Juliana"],
      es: ["Serema Hotel", "Opuesto SAS", "Brújula Ética", "Santa Juliana"],
    },
  },
  {
    id: "n9ne",
    number: "04",
    title: { en: "N9NE", es: "N9NE" },
    dateRange: "2021–2024",
    location: { en: "Spain · Germany · Korea", es: "España · Alemania · Corea" },
    projects: {
      en: ["NOBLED Coffee", "Eat's Real", "Hola Guesthouse Jeju"],
      es: ["NOBLED Coffee", "Eat's Real", "Hola Guesthouse Jeju"],
    },
  },
  {
    id: "ironhack",
    number: "05",
    title: { en: "Ironhack", es: "Ironhack" },
    dateRange: "Mar–Sep 2023",
    location: { en: "Berlin · Germany", es: "Berlín · Alemania" },
    projects: {
      en: ["Student experience", "Internal tools", "Campus events"],
      es: ["Experiencia estudiantil", "Herramientas internas", "Eventos de campus"],
    },
  },
  {
    id: "travelling-university",
    number: "06",
    title: {
      en: "Travelling University",
      es: "Travelling University",
    },
    dateRange: "Feb–Sep 2025",
    location: { en: "LATAM × Korea", es: "LATAM × Corea" },
    projects: {
      en: ["Talent Scouting LATAM × Korea", "Mentes Sin Fronteras"],
      es: ["Talent Scouting LATAM × Corea", "Mentes Sin Fronteras"],
    },
  },
];

export const chapterIntros: Record<Chapter["id"], LocalizedString> = {
  nomadher: {
    en: "NomadHer is a travel community app where women find travel buddies, join experiences, and build community across cities.",
    es: "NomadHer es una app donde mujeres que viajan encuentran travel buddies, se unen a experiencias y construyen comunidad entre ciudades.",
  },
  "boost-lab": {
    en: "BOOST LAB was born in Seoul in 2024 to design and execute innovation experiences for entrepreneurs, companies, and institutions across Korea and Latin America.",
    es: "BOOST LAB nació en Seúl en 2024 para diseñar y ejecutar experiencias de innovación para emprendedores, empresas e instituciones entre Corea y Latinoamérica.",
  },
  independent: {
    en: "Branding, websites, and content strategy for clients across three countries. The work turns a client’s context into a tangible brand, system, or strategy.",
    es: "Branding, websites y estrategia de contenido para clientes en tres países. El trabajo convierte el contexto del cliente en una marca, sistema o estrategia tangible.",
  },
  n9ne: {
    en: "N9NE was a company I co-founded with 8 other members from different parts of the world. It started in Bilbao in 2021. In 2022 we moved to Berlin, and in 2023 to Seoul, where I led the team for a year. We worked across diverse industries: fashion, sustainability, visual systems, strategy, education, technology. This is where my way of working with international teams and projects that move with you across countries was built.",
    es: "N9NE fue una compañía de la que fui co-fundadora, junto con otros 8 miembros de distintas partes del mundo. Empezó en Bilbao en 2021. En 2022 nos movimos a Berlín, y en 2023 a Seúl, donde fui líder de equipo durante un año. Trabajamos en industrias diversas: moda, sostenibilidad, sistemas visuales, estrategia, educación, tecnología. Aquí se construyó mi forma de trabajar con equipos internacionales y proyectos que se mueven con uno entre países.",
  },
  ironhack: {
    en: "At Ironhack I improved a live student experience: support, feedback, internal tools, and campus events inside an intensive technology bootcamp.",
    es: "En Ironhack mejoré una experiencia estudiantil ya en marcha: acompañamiento, feedback, herramientas internas y eventos de campus dentro de un bootcamp intensivo de tecnología.",
  },
  "travelling-university": {
    en: "Travelling University connects high-potential talent with global entrepreneurial education through Latin American marketing strategy and talent scouting across two continents.",
    es: "Travelling University conecta talento de alto potencial con educación emprendedora global a través de estrategia de marketing para Latinoamérica y talent scouting entre dos continentes.",
  },
};

export function getChapter(id: Chapter["id"]) {
  return chapters.find((c) => c.id === id);
}
