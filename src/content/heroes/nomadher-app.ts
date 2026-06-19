import type { Hero } from "../types";

export const nomadHerApp: Hero = {
  slug: "nomadher-app",
  chapter: "nomadher",
  number: "05",
  brand: "NomadHer",
  date: {
    en: "Oct 2025 – present",
    es: "Oct 2025 – presente",
  },
  location: "Sole UX/UI Designer",
  accent: "#244736",
  title: {
    en: "App NomadHer · Product Design",
    es: "App NomadHer · Product Design",
  },
  tagline: {
    en: "Redesigning a women-only travel community app, from research to shipped product, version 9.4.7 to 9.6.1.",
    es: "Rediseñando una app de comunidad de viaje para mujeres, de la investigación al producto vivo, versión 9.4.7 a 9.6.1.",
  },
  context: {
    en: "NomadHer is a women-only travel community app where members find travel buddies, join experiences, and build community across cities. I joined in October 2025 as the sole UX/UI designer. My job: turn a profile-and-feed app into a system where people actually connect, not just browse.",
    es: "NomadHer es una app de comunidad de viaje solo para mujeres, donde sus miembros encuentran travel buddies, se unen a experiencias y construyen comunidad entre ciudades. Entré en octubre de 2025 como la única UX/UI designer. Mi trabajo: convertir una app de perfiles y feed en un sistema donde la gente realmente se conecta, no solo navega.",
  },
  sections: [
    {
      title: { en: "The problem I mapped", es: "El problema que mapeé" },
      body: {
        en: "Through user interviews and behavior analysis, I found the same pattern repeated across screens: profiles get views, but not messages. People escape to WhatsApp because in-app conversation feels heavy. Travel Buddy posts blur into each other. Comments die. The Lounge feels separate from where the action actually happens. The root insight wasn't about UI polish, it was structural. People don't connect with people first. They connect with what those people are doing right now. That reframe became the spine of everything I redesigned.",
        es: "A través de entrevistas y análisis de comportamiento, encontré el mismo patrón repetido en todas las pantallas: los perfiles reciben vistas, pero no mensajes. La gente se va a WhatsApp porque la conversación in-app se siente pesada. Los Travel Buddy posts se confunden entre sí. Los comentarios mueren. El Lounge se siente separado de donde realmente pasa la acción. El insight raíz no era de pulido UI, era estructural. La gente no se conecta con personas primero. Se conecta con lo que esas personas están haciendo ahora mismo. Ese reframe se volvió la columna vertebral de todo lo que rediseñé.",
      },
    },
    {
      title: { en: "Three strategic bets", es: "Tres apuestas estratégicas" },
      bullets: {
        en: [
          "Currently Active · show who's online right now, not who's been online in the last week. Permission to reach out comes from believing the other person will actually reply.",
          "Small Meetups · make it dead-simple to create tiny, spontaneous plans. \"Coffee tomorrow AM in Hongdae.\" Three people = success. The app becomes a daily-use habit because there's always something happening today.",
          "Profile as connection surface · restructure the profile from information page to action trigger. Photo-led, scan-friendly, with status + intent visible in seconds.",
        ],
        es: [
          "Currently Active · mostrar quién está en línea ahora, no quién estuvo la semana pasada. El permiso para escribirle a alguien viene de creer que la otra persona va a responder.",
          "Small Meetups · que crear planes pequeños y espontáneos sea súper simple. \"Café mañana AM en Hongdae.\" Tres personas = éxito. La app se vuelve hábito diario porque siempre hay algo pasando hoy.",
          "Perfil como superficie de conexión · reestructurar el perfil de página de información a disparador de acción. Photo-led, fácil de escanear, con status e intención visibles en segundos.",
        ],
      },
    },
    {
      title: {
        en: "What I designed and shipped (v9.4.7 → v9.6.1)",
        es: "Lo que diseñé y lancé (v9.4.7 → v9.6.1)",
      },
      bullets: {
        en: [
          "Section unification across the app · one system instead of disconnected screens",
          "Header redesign · new structure across Lounge, Travel Buddy, Experiences, Profile",
          "Travel Buddy redesign · photo-led cards, Currently Active integration, Plans in flow",
          "Currently Active feature · green dot, in-city chips, prioritized at top of People",
          "Profile redesign · Hero, prompt card, quick facts, travel style, Now & Next, Open Invitation",
          "Settings redesign · restructured navigation, user ID with copy, premade contact templates",
          "Notification settings · granular controls grouped by intent (Travel Buddy, Meetups, Community, Perks)",
          "Comments UI in experiences · bottom sheet with reply threads, replacing the broken existing flow",
          "Lounge banners · zero-friction launchers (tap → 1-2 inputs → auto-creates the right post in the right place)",
        ],
        es: [
          "Unificación de secciones a través de la app · un sistema en vez de pantallas desconectadas",
          "Rediseño de headers · nueva estructura en Lounge, Travel Buddy, Experiences, Profile",
          "Rediseño de Travel Buddy · tarjetas photo-led, integración de Currently Active, planes en flujo",
          "Feature Currently Active · punto verde, chips de \"in city\", priorizado al tope de People",
          "Rediseño de perfil · Hero, prompt card, quick facts, travel style, Now & Next, Open Invitation",
          "Rediseño de settings · navegación reestructurada, user ID con botón de copia, templates de contacto pre-armados",
          "Notification settings · controles granulares agrupados por intención (Travel Buddy, Meetups, Community, Perks)",
          "UI de comentarios en experiences · bottom sheet con threads de respuesta, reemplazando el flujo roto existente",
          "Lounge banners · zero-friction launchers (tap → 1-2 inputs → crea automáticamente el post correcto en el lugar correcto)",
        ],
      },
    },
  ],
  status: {
    en: "Production as of v9.6.1. Currently Active live. Plans in flow live. Profile and Settings restructure shipped. Lounge banners shipped. AI personalization in design / pending dev capacity.",
    es: "En producción a partir de v9.6.1. Currently Active vivo. Planes en flujo vivos. Reestructura de perfil y settings lanzada. Lounge banners lanzados. AI personalization en diseño / pendiente de capacidad de dev.",
  },
  whatsNext: {
    en: "Measuring the bets · message-start rate, reply rate < 1h, meetup creation rate, profile completion rate. Baselines being established with Anna (data) so we can compare against post-launch behavior over the next 1-3 months.",
    es: "Medir las apuestas · tasa de inicio de mensaje, tasa de respuesta < 1h, tasa de creación de meetups, tasa de completitud de perfil. Estableciendo baselines con Anna (data) para comparar contra el comportamiento post-launch durante los próximos 1-3 meses.",
  },
  results: [
    {
      value: "9.4.7 → 9.6.1",
      label: { en: "versions shipped", es: "versiones lanzadas" },
    },
    { value: "9", label: { en: "redesigns shipped", es: "rediseños lanzados" } },
    { value: "1", label: { en: "sole designer", es: "sola diseñadora" } },
  ],
};
