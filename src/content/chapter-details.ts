import type { ChapterDetail, ChapterId, LocalizedString } from "./types";

const bilingual = (es: string, en: string): LocalizedString => ({ en, es });

export const chapterDetails: ChapterDetail[] = [
  {
    id: "nomadher",
    intro: bilingual(
      "NomadHer es una app donde mujeres que viajan encuentran travel buddies, se unen a experiencias y construyen comunidad entre ciudades. Entré a diseñar producto y me quedé sosteniendo el sistema visual, las campañas con aliados y los contenidos que mantienen viva la comunidad entre versiones.",
      "NomadHer is a travel community app where women find travel buddies, join experiences and build community across cities. I joined to design the product and stayed to sustain the visual system, partner campaigns and content that keep the community alive between releases.",
    ),
    role: bilingual(
      "Founding Designer · octubre 2025 a presente",
      "Founding Designer · October 2025 to present",
    ),
    accent: "#7b173b",
    cover: "work/nomadher-app/03 iPhone Mockups.png",
    impact: [
      {
        value: "21–23%",
        label: bilingual(
          "retención de mes 1 en la app",
          "month-1 retention in the app",
        ),
      },
      {
        value: { en: "1.3M+", es: "1,3M+" },
        label: bilingual(
          "vistas orgánicas en 8 meses",
          "organic views in 8 months",
        ),
      },
      {
        value: "31%",
        label: bilingual(
          "tasa de apertura del newsletter",
          "newsletter open rate",
        ),
      },
    ],
    responsibilities: [
      {
        title: bilingual("Producto y UX/UI", "Product and UX/UI"),
        body: bilingual(
          "Arquitectura location first, flujos de conexión y features en producción de v9.4.7 a v9.6.4.",
          "Location-first architecture, connection flows and production features from v9.4.7 to v9.6.4.",
        ),
      },
      {
        title: bilingual("Sistema visual", "Visual system"),
        body: bilingual(
          "Una identidad que conecta app, App Store, redes, campañas y materiales de marca.",
          "An identity connecting the app, App Store, social media, campaigns and brand materials.",
        ),
      },
      {
        title: bilingual(
          "Campañas y partnerships",
          "Campaigns and partnerships",
        ),
        body: bilingual(
          "Dirección creativa para aliados internacionales como Japan Airlines, entre Instagram, email y app.",
          "Creative direction for international partners such as Japan Airlines across Instagram, email and the app.",
        ),
      },
      {
        title: bilingual("Contenido y comunidad", "Content and community"),
        body: bilingual(
          "Pilares mensuales, programa de bloggers, embajadoras, análisis de campañas y newsletter.",
          "Monthly content pillars, blogger and ambassador programs, campaign analysis and newsletter.",
        ),
      },
      {
        title: bilingual("Eventos y experiencias", "Events and experiences"),
        body: bilingual(
          "Concepto, logística y sistema de piezas físicas para experiencias de comunidad en Seúl.",
          "Concept, logistics and physical asset system for community experiences in Seoul.",
        ),
      },
      {
        title: bilingual("Producto interno", "Internal product"),
        body: bilingual(
          "Reporting automatizado con datos de Meta para que el equipo consulte resultados sin reconstruir informes.",
          "Automated reporting with Meta data so the team can consult results without rebuilding reports.",
        ),
      },
    ],
    projects: [
      {
        title: bilingual("Rediseño de la app", "App redesign"),
        label: bilingual("UX/UI", "UX/UI"),
        date: bilingual("2026", "2026"),
        description: bilingual(
          "De pantallas sueltas a un sistema: Travel Buddy, perfil, settings y Currently Active.",
          "From isolated screens to one system: Travel Buddy, profile, settings and Currently Active.",
        ),
        href: "/work/nomadher-app",
        image: "pages/chapters/nomadher-project-01.png",
      },
      {
        title: bilingual("Creator Call con JAL", "Creator Call with JAL"),
        label: bilingual("Campaña", "Campaign"),
        date: bilingual("2026", "2026"),
        description: bilingual(
          "Instagram, automatización y app funcionando como un solo funnel de campaña.",
          "Instagram, automation and the app working as a single campaign funnel.",
        ),
        href: "/work/jal-nomadher",
        image: "pages/chapters/nomadher-project-02.png",
      },
      {
        title: bilingual("Sistema visual", "Visual system"),
        label: bilingual("Branding", "Branding"),
        date: bilingual("2025 - 2026", "2025 - 2026"),
        description: bilingual(
          "La identidad que conecta app, redes y campañas en un mismo lenguaje.",
          "The identity connecting the app, social media and campaigns in one language.",
        ),
        image: "pages/chapters/nomadher-project-03.png",
      },
      {
        title: bilingual("Contenido y comunidad", "Content and community"),
        label: bilingual("Contenido", "Content"),
        date: bilingual("2025", "2025"),
        description: bilingual(
          "Carruseles, reels y automatizaciones que sostienen la conversación cada semana.",
          "Carousels, reels and automations that sustain the conversation every week.",
        ),
        image: "pages/chapters/nomadher-project-04.png",
      },
      {
        title: bilingual("Automatización ManyChat", "ManyChat automation"),
        label: bilingual("Growth", "Growth"),
        date: bilingual("2026", "2026"),
        description: bilingual(
          "Comentarios que se vuelven conversaciones y links que llegan a cientos de aplicantes sin perder a nadie.",
          "Comments becoming conversations and links reaching hundreds of applicants without losing anyone.",
        ),
        image: "pages/chapters/nomadher-project-05.png",
      },
      {
        title: bilingual("Análisis de contenido", "Content analysis"),
        label: bilingual("Data", "Data"),
        date: bilingual("2026", "2026"),
        description: bilingual(
          "Qué formatos funcionan de verdad en la comunidad, y la fórmula que se repite cuando algo despega.",
          "The formats that truly work for the community and the repeatable formula behind breakout content.",
        ),
        image: "pages/chapters/nomadher-project-06.png",
      },
    ],
  },
  {
    id: "boost-lab",
    intro: bilingual(
      "BOOST LAB nació en Seúl en 2024 para que emprendedores crezcan con estructura, comunidad y una red que ya está en la sala. Diseñamos y ejecutamos summits, hackathons, workshops y misiones internacionales entre Corea y Latinoamérica.",
      "BOOST LAB was born in Seoul in 2024 to help entrepreneurs grow with structure, community and a network already in the room. We design and run summits, hackathons, workshops and international missions between Korea and Latin America.",
    ),
    role: bilingual(
      "Liderazgo creativo · enero 2024 a presente",
      "Creative Lead · January 2024 to present",
    ),
    accent: "#0f4f3c",
    cover: "work/global-youth-summit/_MG_3552.png",
    impact: [
      {
        value: "45+",
        label: bilingual(
          "instituciones en la red entre Colombia y Corea",
          "institutions in the network across Colombia and Korea",
        ),
      },
      {
        value: "400+",
        label: bilingual(
          "asistentes en Global Youth Bogotá",
          "attendees at Global Youth Bogotá",
        ),
      },
      {
        value: { en: "4.8 / 5", es: "4,8 / 5" },
        label: bilingual(
          "calificación de asistentes del summit",
          "summit attendee rating",
        ),
      },
    ],
    responsibilities: [
      {
        title: bilingual("Estrategia y concepto", "Strategy and concept"),
        body: bilingual(
          "Formatos que conectan retos reales, comunidad y aprendizaje aplicado.",
          "Formats connecting real challenges, community and applied learning.",
        ),
      },
      {
        title: bilingual("Alianzas y ecosistema", "Partnerships and ecosystem"),
        body: bilingual(
          "Relaciones con instituciones, universidades, speakers, sponsors y empresas de ambos continentes.",
          "Relationships with institutions, universities, speakers, sponsors and companies across both continents.",
        ),
      },
      {
        title: bilingual("Diseño de experiencias", "Experience design"),
        body: bilingual(
          "Summits, workshops, hackathons y misiones de punta a punta.",
          "End-to-end summits, workshops, hackathons and international missions.",
        ),
      },
      {
        title: bilingual("Identidad y campañas", "Identity and campaigns"),
        body: bilingual(
          "Sistemas visuales, materiales, contenido y comunicación digital para convocar y mover comunidad.",
          "Visual systems, materials, content and digital communication that mobilize community.",
        ),
      },
      {
        title: bilingual(
          "Programas y facilitación",
          "Programs and facilitation",
        ),
        body: bilingual(
          "Módulos, plantillas, actividades, mentoría y espacios de reflexión para cada formato.",
          "Modules, templates, activities, mentoring and reflection spaces for every format.",
        ),
      },
      {
        title: bilingual("Operación en sitio", "On-site operations"),
        body: bilingual(
          "Producción, logística y coordinación de equipos para llevar el concepto al día D.",
          "Production, logistics and team coordination that carry the concept through event day.",
        ),
      },
    ],
    projects: [
      {
        title: bilingual(
          "Global Youth: Women’s Entrepreneurship Summit",
          "Global Youth: Women’s Entrepreneurship Summit",
        ),
        label: bilingual("Summit · Bogotá", "Summit · Bogotá"),
        description: bilingual(
          "El evento más grande de BOOST LAB, construido desde cero con una red de 45+ aliados.",
          "BOOST LAB's largest event, built from scratch with a network of 45+ partners.",
        ),
        href: "/work/global-youth-summit",
        image: "work/global-youth-summit/_MG_3552.png",
      },
      {
        title: bilingual(
          "Sejong Global Idea Hackathon",
          "Sejong Global Idea Hackathon",
        ),
        label: bilingual("Hackathon · Seúl", "Hackathon · Seoul"),
        description: bilingual(
          "Dos días para transformar una idea en un pitch frente a jurado.",
          "Two days to turn an idea into a pitch before a jury.",
        ),
        href: "/work/sejong-hackathon",
        image: "work/sejong-hackathon/IMG_3845.png",
      },
      {
        title: bilingual("Misiones Internacionales", "International Missions"),
        label: bilingual("Expansión internacional", "International expansion"),
        description: bilingual(
          "Dos empresas latinoamericanas y dos rutas sectoriales dentro del ecosistema coreano.",
          "Two Latin American companies and two industry-specific routes through the Korean ecosystem.",
        ),
        href: "/work/misiones-internacionales",
        image: "work/misiones-internacionales/IMG_9755.png",
      },
      {
        title: bilingual(
          "Seoul Women Entrepreneur Summit",
          "Seoul Women Entrepreneur Summit",
        ),
        label: bilingual("Summit · Seúl", "Summit · Seoul"),
        description: bilingual(
          "Un escenario internacional diseñado para que las mujeres sí estuvieran en la conversación.",
          "An international stage designed to ensure women were part of the conversation.",
        ),
        href: "/work/women-entrepreneur-summit-seoul",
        image: "work/boost-lab/women-entrepreneur-summit-seoul/Group 2864.png",
      },
    ],
  },
  {
    id: "independent",
    intro: bilingual(
      "Branding, websites y estrategia de contenido para clientes en Colombia, Corea y España. El trabajo es entrar a la cabeza del cliente y salir con algo tangible: una marca, un sistema o una estrategia. Aquí también opero como consultora.",
      "Branding, websites and content strategy for clients in Colombia, Korea and Spain. The work means entering the client's world and leaving with something tangible: a brand, a system or a strategy. I also work here as a consultant.",
    ),
    role: bilingual(
      "Diseñadora independiente y consultora · 2025 a 2026",
      "Independent designer and consultant · 2025 to 2026",
    ),
    accent: "#1c3d8f",
    cover: "work/independent/brujula-etica/Poster 1.png",
    impact: [
      {
        value: "3",
        label: bilingual(
          "países y contextos de cliente",
          "countries and client contexts",
        ),
      },
      {
        value: "70+",
        label: bilingual(
          "piezas por edición para Brújula Ética",
          "assets per Brújula Ética edition",
        ),
      },
      {
        value: "6",
        label: bilingual(
          "semanas para la estrategia y sistema de Serema",
          "weeks for Serema's strategy and system",
        ),
      },
    ],
    responsibilities: [
      {
        title: bilingual("Estrategia de marca", "Brand strategy"),
        body: bilingual(
          "Propuesta de valor, narrativa, posicionamiento y decisiones que ordenan lo que una marca cuenta.",
          "Value proposition, narrative, positioning and decisions that organize what a brand communicates.",
        ),
      },
      {
        title: bilingual("Identidad visual", "Visual identity"),
        body: bilingual(
          "Sistemas de marca pensados para verse consistentes en los canales donde realmente vive cada cliente.",
          "Brand systems designed to remain consistent across the channels where each client actually operates.",
        ),
      },
      {
        title: bilingual("Web y contenido", "Web and content"),
        body: bilingual(
          "Arquitectura, copy, SEO, diseño editorial y calendarios de contenido con un propósito comercial claro.",
          "Architecture, copy, SEO, editorial design and content calendars with a clear commercial purpose.",
        ),
      },
      {
        title: bilingual("Investigación", "Research"),
        body: bilingual(
          "Lectura de competencia, regulación, público y contexto antes de convertir una intuición en una propuesta.",
          "Reading competitors, regulations, audiences and context before turning an intuition into a proposal.",
        ),
      },
      {
        title: bilingual("Producto y herramientas", "Product and tools"),
        body: bilingual(
          "Sistemas internos y plantillas que ayudan a que el trabajo siga funcionando después de la entrega.",
          "Internal systems and templates that keep the work functioning after delivery.",
        ),
      },
    ],
    projects: [
      {
        title: bilingual("Brújula Ética", "Brújula Ética"),
        label: bilingual("Identidad y campaña", "Identity and campaign"),
        description: bilingual(
          "Un sistema visual joven para un podcast universitario binacional.",
          "A youthful visual system for a binational university podcast.",
        ),
        href: "/work/brujula-etica",
        image: "work/independent/brujula-etica/Poster 1.png",
      },
      {
        title: bilingual("Opuesto SAS", "Opuesto SAS"),
        label: bilingual("Marca, web y producto", "Brand, web and product"),
        description: bilingual(
          "De análisis competitivo a identidad, portafolio, sitio y herramienta interna.",
          "From competitive analysis to identity, portfolio, website and internal tool.",
        ),
        href: "/work/opuesto-sas",
        image: "work/independent/opuesto-sas/Group 2412.png",
      },
      {
        title: bilingual("Serema Hotel", "Serema Hotel"),
        label: bilingual("Estrategia de marca", "Brand strategy"),
        description: bilingual(
          "Una narrativa y sistema comercial para un hotel que evoluciona mientras opera.",
          "A narrative and commercial system for a hotel evolving while it operates.",
        ),
      },
      {
        title: bilingual("Santa Juliana", "Santa Juliana"),
        label: bilingual(
          "Diseño editorial y digital",
          "Editorial and digital design",
        ),
        description: bilingual(
          "Del material disperso a un portafolio comercial listo para presentar.",
          "From scattered material to a presentation-ready commercial portfolio.",
        ),
      },
    ],
  },
  {
    id: "n9ne",
    intro: bilingual(
      "N9NE fue una compañía que co-fundé con otras ocho personas de distintas partes del mundo. Empezó en Bilbao, se movió a Berlín y después a Seúl. Aquí aprendí a liderar equipos internacionales y proyectos que se mueven contigo entre países.",
      "N9NE was a company I co-founded with eight people from different parts of the world. It started in Bilbao, moved to Berlin and then Seoul. Here I learned to lead international teams and projects that move with you across countries.",
    ),
    role: bilingual(
      "Co-fundadora y líder de equipo · 2021 a septiembre 2024",
      "Co-founder and team lead · 2021 to September 2024",
    ),
    accent: "#5f3a74",
    cover: "work/n9ne/nobled-coffee/IMG_3839.png",
    impact: [
      {
        value: { en: "59,000€", es: "59.000€" },
        label: bilingual(
          "generados por iniciativas de la compañía",
          "generated by company initiatives",
        ),
      },
      {
        value: "9",
        label: bilingual(
          "personas y contextos internacionales en el equipo",
          "people from international contexts on the team",
        ),
      },
      {
        value: "5+",
        label: bilingual(
          "proyectos coordinados en simultáneo",
          "projects coordinated simultaneously",
        ),
      },
    ],
    responsibilities: [
      {
        title: bilingual("Liderazgo de equipo", "Team leadership"),
        body: bilingual(
          "Coordinación de una compañía de nueve personas durante una transición organizacional y tres países.",
          "Coordinating a nine-person company through an organizational transition across three countries.",
        ),
      },
      {
        title: bilingual(
          "Estrategia y experimentación",
          "Strategy and experimentation",
        ),
        body: bilingual(
          "Iniciativas en educación, bienestar y tecnología diseñadas y testeadas en contextos reales.",
          "Education, wellbeing and technology initiatives designed and tested in real contexts.",
        ),
      },
      {
        title: bilingual("Branding y producto", "Branding and product"),
        body: bilingual(
          "Identidades, servicios, experiencias de compra y productos digitales desde la investigación hasta el lanzamiento.",
          "Identities, services, shopping experiences and digital products from research through launch.",
        ),
      },
      {
        title: bilingual("Investigación cultural", "Cultural research"),
        body: bilingual(
          "Lectura de dinámicas locales para adaptar propuestas a nuevos mercados y necesidades.",
          "Reading local dynamics to adapt proposals to new markets and needs.",
        ),
      },
    ],
    projects: [
      {
        title: bilingual("NOBLED Specialty Coffee", "NOBLED Specialty Coffee"),
        label: bilingual("Branding y estrategia", "Branding and strategy"),
        description: bilingual(
          "Una marca de café colombiano y un modelo de suscripción para Berlín.",
          "A Colombian coffee brand and subscription model for Berlin.",
        ),
        href: "/work/nobled-coffee",
        image: "work/n9ne/nobled-coffee/IMG_3839.png",
      },
      {
        title: bilingual("Eat’s Real", "Eat’s Real"),
        label: bilingual("UX/UI y servicio", "UX/UI and service"),
        description: bilingual(
          "Una experiencia de pedidos para estudiantes internacionales en Seúl.",
          "An ordering experience for international students in Seoul.",
        ),
      },
      {
        title: bilingual("Hola Guesthouse", "Hola Guesthouse"),
        label: bilingual("Branding", "Branding"),
        description: bilingual(
          "Una identidad para que una guesthouse de Jeju hablara a visitantes internacionales.",
          "An identity helping a Jeju guesthouse speak to international visitors.",
        ),
      },
    ],
  },
  {
    id: "ironhack",
    intro: bilingual(
      "Ironhack forma en UX/UI, análisis de datos y desarrollo web con bootcamps intensivos. Mi rol estaba entre los estudiantes y la operación: diseñar y mejorar la experiencia de atravesar el programa, desde la matrícula hasta el último día de clase.",
      "Ironhack teaches UX/UI, data analytics and web development through intensive bootcamps. My role sat between students and operations: designing and improving the experience of moving through the program, from enrollment to the final day of class.",
    ),
    role: bilingual(
      "Program Manager Assistant · Berlín · marzo a septiembre 2023",
      "Program Manager Assistant · Berlin · March to September 2023",
    ),
    accent: "#f5263a",
    impact: [
      {
        value: "30+",
        label: bilingual(
          "participantes por cohorte acompañada",
          "participants supported per cohort",
        ),
      },
      {
        value: "3",
        label: bilingual(
          "eventos coordinados por bootcamp",
          "events coordinated per bootcamp",
        ),
      },
      {
        value: "1",
        label: bilingual(
          "operación existente mejorada desde la experiencia real de estudiantes",
          "live operation improved through real student experience",
        ),
      },
    ],
    responsibilities: [
      {
        title: bilingual("Experiencia estudiantil", "Student experience"),
        body: bilingual(
          "Mejoras de acompañamiento, integración y feedback dentro de un formato educativo intensivo.",
          "Improvements to support, integration and feedback within an intensive education format.",
        ),
      },
      {
        title: bilingual("Datos y seguimiento", "Data and tracking"),
        body: bilingual(
          "Métricas de progreso, encuestas y evaluaciones para entender calidad y retención.",
          "Progress metrics, surveys and evaluations used to understand quality and retention.",
        ),
      },
      {
        title: bilingual("Herramientas internas", "Internal tools"),
        body: bilingual(
          "Espacios y herramientas nuevas para estudiantes, equipo y necesidades concretas del campus.",
          "New spaces and tools for students, the team and concrete campus needs.",
        ),
      },
      {
        title: bilingual("Eventos de campus", "Campus events"),
        body: bilingual(
          "Encuentros, charlas y presentaciones finales con instructores y aliados externos.",
          "Meetups, talks and final presentations with instructors and external partners.",
        ),
      },
    ],
    projects: [
      {
        title: bilingual("Experiencia estudiantil", "Student experience"),
        label: bilingual("Operación y servicio", "Operations and service"),
        description: bilingual(
          "Diseñar dentro de una operación viva, con estudiantes reales y restricciones reales.",
          "Designing inside a live operation with real students and real constraints.",
        ),
      },
      {
        title: bilingual("Herramientas de campus", "Campus tools"),
        label: bilingual("Producto interno", "Internal product"),
        description: bilingual(
          "Nuevos espacios y herramientas para hacer más claro el día a día del programa.",
          "New spaces and tools making the program's day-to-day work clearer.",
        ),
      },
      {
        title: bilingual("Eventos y Demo Days", "Events and Demo Days"),
        label: bilingual("Experiencia", "Experience"),
        description: bilingual(
          "Logística y coordinación de los momentos que cierran cada bootcamp.",
          "Logistics and coordination for the moments that close each bootcamp.",
        ),
      },
    ],
  },
  {
    id: "travelling-university",
    intro: bilingual(
      "Travelling University conecta talento de alto potencial con educación emprendedora global. Mi rol se enfocó en estrategia de marketing para Latinoamérica y en talent scouting entre dos continentes: cerrar la brecha entre jóvenes con potencial y programas que casi nunca llegan hasta ellos.",
      "Travelling University connects high-potential talent with global entrepreneurial education. My role focused on marketing strategy for Latin America and talent scouting across two continents: closing the gap between young people with potential and programs that rarely reach them.",
    ),
    role: bilingual(
      "Estrategia de marketing y talent scouting · febrero a septiembre 2025",
      "Marketing strategy and talent scouting · February to September 2025",
    ),
    accent: "#124aa8",
    cover:
      "work/travelling-university/mentes-sin-fronteras/2. Overview + Vision.png",
    impact: [
      {
        value: "200",
        label: bilingual(
          "colegios contactados en Colombia",
          "schools contacted in Colombia",
        ),
      },
      {
        value: { en: "100,000+", es: "100.000+" },
        label: bilingual(
          "views en campañas de redes",
          "views across social campaigns",
        ),
      },
      {
        value: "2",
        label: bilingual(
          "continentes conectados por el scouting",
          "continents connected through talent scouting",
        ),
      },
    ],
    responsibilities: [
      {
        title: bilingual("Estrategia de mercado", "Market strategy"),
        body: bilingual(
          "Mensajes distintos para estudiantes y familias ante una decisión educativa que ambos toman juntos.",
          "Distinct messages for students and families facing an education decision they make together.",
        ),
      },
      {
        title: bilingual("Talent scouting", "Talent scouting"),
        body: bilingual(
          "Mapeo de colegios, contacto directo, reuniones, comunidades y seguimiento en una base de datos propia.",
          "School mapping, direct outreach, meetings, communities and follow-up in a purpose-built database.",
        ),
      },
      {
        title: bilingual("Marketing y contenido", "Marketing and content"),
        body: bilingual(
          "Campañas visuales y contenido digital para hacer visibles programas internacionales en Latinoamérica.",
          "Visual campaigns and digital content making international programs visible across Latin America.",
        ),
      },
      {
        title: bilingual("Experiencias educativas", "Educational experiences"),
        body: bilingual(
          "Workshops, visitas, ferias y conversaciones uno a uno que abren posibilidades concretas.",
          "Workshops, visits, fairs and one-to-one conversations that open concrete possibilities.",
        ),
      },
    ],
    projects: [
      {
        title: bilingual("Mentes Sin Fronteras", "Mentes Sin Fronteras"),
        label: bilingual("Experiencia educativa", "Educational experience"),
        description: bilingual(
          "Un espacio para que jóvenes conecten propósito, educación y posibilidades globales.",
          "A space where young people connect purpose, education and global possibilities.",
        ),
        href: "/work/mentes-sin-fronteras",
        image:
          "work/travelling-university/mentes-sin-fronteras/2. Overview + Vision.png",
      },
      {
        title: bilingual(
          "Talent Scouting LATAM × Corea",
          "Talent Scouting LATAM × Korea",
        ),
        label: bilingual("Estrategia y ventas", "Strategy and sales"),
        description: bilingual(
          "Una red de colegios, familias y conversaciones para conectar talento con educación internacional.",
          "A network of schools, families and conversations connecting talent with international education.",
        ),
      },
    ],
  },
];

export function getChapterDetail(id: string) {
  return chapterDetails.find((chapter) => chapter.id === (id as ChapterId));
}
