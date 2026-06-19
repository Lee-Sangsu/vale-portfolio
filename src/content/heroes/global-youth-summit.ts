import type { Hero } from "../types";

export const globalYouthSummit: Hero = {
  slug: "global-youth-summit",
  chapter: "boost-lab",
  number: "01",
  brand: "BOOST LAB",
  date: { en: "21 Sep 2024", es: "21 sep 2024" },
  location: "Bogotá",
  accent: "#b8410f",
  title: {
    en: "Global Youth: Women's Entrepreneurship Summit",
    es: "Global Youth: Women's Entrepreneurship Summit",
  },
  tagline: {
    en: "Free, inclusive summit built to close the entrepreneurship gender gap for young women and students in Colombia.",
    es: "Cumbre gratuita e inclusiva, diseñada para cerrar la brecha de género en el emprendimiento para mujeres jóvenes y estudiantes en Colombia.",
  },
  context: {
    en: "Young women in Colombia face three structural barriers when starting a business: capital, mentorship, and network. The summit was designed to remove all three at once: free, open, and with the network already in the room.",
    es: "Las mujeres jóvenes en Colombia enfrentan tres barreras estructurales al emprender: capital, mentoría y red. La cumbre fue diseñada para resolver las tres a la vez: gratuita, abierta y con la red activada en el lugar.",
  },
  role: {
    en: [
      "Event strategy and concept",
      "Speaker curation and management",
      "Partnership development with public and private institutions",
      "Marketing campaign and digital content",
      "On-site operations and execution",
    ],
    es: [
      "Estrategia y concepción del evento",
      "Curaduría y gestión de speakers",
      "Desarrollo de alianzas con instituciones públicas y privadas",
      "Campaña de marketing y contenido digital",
      "Operación y ejecución en sitio",
    ],
  },
  partners: [
    {
      title: { en: "Partners (44 total)", es: "Aliados (44 en total)" },
      items: [
        { name: "Bogotá Chamber of Commerce" },
        { name: "Universidad Externado de Colombia" },
        { name: "Invest in Bogotá" },
        { name: "Laboratoria" },
        { name: "Geek Girls LATAM" },
        {
          name: "+ leading Colombian universities",
          note: { en: "", es: "+ universidades colombianas" },
        },
      ],
    },
  ],
  speakers: [
    {
      name: "Andrea Padilla",
      role: {
        en: "Senator, Republic of Colombia",
        es: "Senadora, República de Colombia",
      },
    },
    {
      name: "Joanna Prieto",
      role: {
        en: "Co-founder, Geek Girls LATAM",
        es: "Co-fundadora, Geek Girls LATAM",
      },
    },
    {
      name: "Paola Andrea Franco",
      role: { en: "Director, Fondo Impacta", es: "Directora, Fondo Impacta" },
    },
    {
      name: "+ 15 leaders",
      role: {
        en: "across tech, policy, and impact",
        es: "en tecnología, política e impacto",
      },
    },
  ],
  workshops: {
    en: ["Innovation", "Wellbeing", "Agile methodologies"],
    es: ["Innovación", "Bienestar", "Metodologías ágiles"],
  },
  results: [
    { value: "400+", label: { en: "attendees", es: "asistentes" } },
    {
      value: "40",
      label: { en: "entrepreneurial stands", es: "stands de emprendedoras" },
    },
    {
      value: "44",
      label: { en: "strategic partners", es: "aliados estratégicos" },
    },
    { value: "18", label: { en: "speakers", es: "speakers" } },
    {
      value: { en: "142,473", es: "142.473" },
      label: { en: "campaign views", es: "views en campañas" },
    },
  ],
};
