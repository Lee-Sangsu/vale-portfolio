import type { Chapter, LocalizedString } from "./types";

export const chapters: Chapter[] = [
  {
    id: "n9ne",
    number: "01",
    title: { en: "N9NE", es: "N9NE" },
    dateRange: "2021–2024",
    location: { en: "Spain · Germany · Korea", es: "España · Alemania · Corea" },
    projects: {
      en: ["NOBLED Coffee", "Eat's Real", "Hola Guesthouse Jeju"],
      es: ["NOBLED Coffee", "Eat's Real", "Hola Guesthouse Jeju"],
    },
  },
  {
    id: "travelling-university",
    number: "02",
    title: {
      en: "Travelling University",
      es: "Travelling University",
    },
    dateRange: "Feb–Sep 2025",
    location: { en: "LATAM × Korea", es: "LATAM × Corea" },
    projects: {
      en: ["Mentes Sin Fronteras", "Talent Scouting LATAM × Korea"],
      es: ["Mentes Sin Fronteras", "Talent Scouting LATAM × Corea"],
    },
  },
  {
    id: "independent",
    number: "03",
    title: {
      en: "Independent design",
      es: "Diseño independiente",
    },
    dateRange: "2025–2026",
    location: { en: "Bogotá · Seoul", es: "Bogotá · Seúl" },
    projects: {
      en: [
        "Serema Hotel",
        "Opuesto SAS",
        "Brújula Ética",
        "팀프러너십",
        "Santa Juliana",
      ],
      es: [
        "Serema Hotel",
        "Opuesto SAS",
        "Brújula Ética",
        "팀프러너십",
        "Santa Juliana",
      ],
    },
  },
  {
    id: "boost-lab",
    number: "04",
    title: { en: "BOOST LAB", es: "BOOST LAB" },
    dateRange: "2024–present",
    location: { en: "Seoul ↔ LATAM", es: "Seúl ↔ LATAM" },
    projects: {
      en: ["Misiones", "Sejong Hackathon", "Bogotá Summit", "+ 4 events"],
      es: ["Misiones", "Sejong Hackathon", "Bogotá Summit", "+ 4 eventos"],
    },
    starred: true,
  },
  {
    id: "nomadher",
    number: "05",
    title: { en: "NomadHer", es: "NomadHer" },
    dateRange: "Oct 2025–present",
    location: { en: "Seoul · Global", es: "Seúl · Global" },
    projects: {
      en: ["App", "Japan Airlines"],
      es: ["App", "Japan Airlines"],
    },
    starred: true,
  },
];

export const chapterIntros: Record<Chapter["id"], LocalizedString> = {
  n9ne: {
    en: "N9NE was a company I co-founded with 8 other members from different parts of the world. It started in Bilbao in 2021. In 2022 we moved to Berlin, and in 2023 to Seoul, where I led the team for a year. We worked across diverse industries: fashion, sustainability, visual systems, strategy, education, technology. This is where my way of working with international teams and projects that move with you across countries was built.",
    es: "N9NE fue una compañía de la que fui co-fundadora, junto con otros 8 miembros de distintas partes del mundo. Empezó en Bilbao en 2021. En 2022 nos movimos a Berlín, y en 2023 a Seúl, donde fui líder de equipo durante un año. Trabajamos en industrias diversas: moda, sostenibilidad, sistemas visuales, estrategia, educación, tecnología. Aquí se construyó mi forma de trabajar con equipos internacionales y proyectos que se mueven con uno entre países.",
  },
  "travelling-university": {
    en: "I was part of Travelling University as Talent Scout and ambassador in Latin America. The role focused on marketing strategy for LATAM and talent scouting in both Latin America and Korea. The work: closing the gap between high-potential talent and global entrepreneurial education. Workshops, institute visits, fairs, one-on-one calls, spaces where future changemakers discover new possibilities.",
    es: "Fui parte de Travelling University como Talent Scout y embajadora en Latinoamérica. Mi rol se enfocó en estrategia de marketing para LATAM y talent scouting tanto en Latinoamérica como en Corea. El trabajo: cerrar la brecha entre talento de alto potencial y educación emprendedora global. Workshops, visitas a institutos, ferias, llamadas uno a uno, espacios donde futuros changemakers descubren nuevas posibilidades.",
  },
  independent: {
    en: "Branding, websites, social media strategy. The work is getting into the client's head and walking out with something tangible: a brand, a system, a strategy. Here I also operate as a consultant.",
    es: "Branding, websites, estrategia de redes. El trabajo es entrar a la cabeza del cliente y salir con algo tangible: una marca, un sistema, una estrategia. Aquí también opero como consultora.",
  },
  "boost-lab": {
    en: "BOOST LAB is an innovation and expansion lab. We design routes, experiences, events and communities so that entrepreneurs, companies and institutions grow with clarity, creativity and global vision. We work in lines like innovation routes, international missions, and growth tools for entrepreneurs. Born in Seoul in 2024.",
    es: "BOOST LAB es un laboratorio de innovación y expansión. Diseñamos rutas, experiencias, eventos y comunidades para que emprendedores, empresas e instituciones crezcan con claridad, creatividad y visión global. Trabajamos en líneas como rutas de innovación, misiones internacionales, y herramientas de crecimiento para emprendedores. Nació en Seúl en 2024.",
  },
  nomadher: {
    en: "NomadHer is a women-only travel community app. My role focuses on design and product: the app, the visual system, the campaigns and content that hold the community across versions. The work moves between Figma, marketing, and direct conversation with users.",
    es: "NomadHer es una app de comunidad de viaje para mujeres. Mi rol se enfoca en diseño y producto: la app, el sistema visual, las campañas y los contenidos que sostienen la comunidad entre versiones. El trabajo se mueve entre Figma, marketing y conversación directa con usuarias.",
  },
};

export function getChapter(id: Chapter["id"]) {
  return chapters.find((c) => c.id === id);
}
