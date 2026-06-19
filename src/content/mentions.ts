import type { ChapterId, LocalizedString, LocalizedList, HeroSection, Stat } from "./types";

export type Mention = {
  id: string;
  chapter: ChapterId;
  title: string;
  brand: string;
  date: LocalizedString;
  location: string;
  tagline: LocalizedString;
  context: LocalizedString;
  myRole?: LocalizedString;
  roleItems?: LocalizedList;
  sections?: HeroSection[];
  results?: Stat[];
};

export const mentions: Mention[] = [
  // ===== BOOST LAB secondary events (4) =====
  {
    id: "trankition-13",
    chapter: "boost-lab",
    title: "Traction 13 · Website Design",
    brand: "BOOST LAB",
    date: { en: "2024", es: "2024" },
    location: "Seoul",
    tagline: {
      en: "A website designed for a program that was never launched: 13 days to go from idea to first sale, built around Define → Build → Sell.",
      es: "Un website diseñado para un programa que no llegó a lanzarse: 13 días para pasar de idea a primera venta, construido alrededor de Define → Build → Sell.",
    },
    context: {
      en: "Traction 13 was conceived as a 13-day hybrid sprint for students and early founders in Seoul. The idea: compress the full cycle of entrepreneurship into 13 focused days, Define the right problem, Build a buyable offer, Sell with a daily loop. The program was designed with AI co-pilots, in-person lab sessions, templates, and a showcase with prizes up to ₩1,000,000. It never launched. This is the website that would have sold it.",
      es: "Traction 13 fue concebido como un sprint híbrido de 13 días para estudiantes y founders en Seúl. La idea: comprimir el ciclo completo del emprendimiento en 13 días intensivos: Definir el problema correcto, Construir una oferta que se compra, Vender con un loop diario. El programa fue diseñado con co-pilotos de IA, sesiones de laboratorio presenciales, templates y una showcase con premios de hasta ₩1.000.000. Nunca se lanzó. Este es el sitio web que lo habría vendido.",
    },
    myRole: {
      en: "Full product design: information architecture, UX, UI, copywriting, and visual system.",
      es: "Diseño de producto completo: arquitectura de información, UX, UI, copywriting y sistema visual.",
    },
    roleItems: {
      en: [
        "Information architecture and page strategy from zero",
        "UI design: layout, typography, color system (black + orange + purple + white)",
        "Copywriting: hero tagline, section headers, CTAs, pricing table",
        "Pricing strategy design: scholarship tier, early bird, D-day",
        "AI Support section: UX for the dual AI model (instant guidance + on-demand assistants)",
        "Full-page design from header to footer, ready for development",
      ],
      es: [
        "Arquitectura de información y estrategia de página desde cero",
        "Diseño UI: layout, tipografía, sistema de color (negro + naranja + morado + blanco)",
        "Copywriting: tagline del hero, headers de sección, CTAs, tabla de precios",
        "Diseño de estrategia de precios: beca, early bird, D-day",
        "Sección AI Support: UX para el modelo dual de IA (guía instantánea + asistentes bajo demanda)",
        "Diseño de página completa de header a footer, lista para desarrollo",
      ],
    },
    sections: [
      {
        title: { en: "The concept", es: "El concepto" },
        body: {
          en: "The hero headline said it all: 'The Shortest Distance Between Idea and Sales.' Traction 13 wasn't a bootcamp or a course, it was a sprint, with a specific outcome promised at the end: market proof you could show. Define the who and the pain, build the offer, run the sales loop, pitch it on stage. Thirteen days.",
          es: "'The Shortest Distance Between Idea and Sales.' Traction 13 no era un bootcamp ni un curso, era un sprint, con un resultado específico prometido al final: prueba de mercado que puedas mostrar. Definir el quién y el dolor, construir la oferta, correr el loop de ventas, pitchearlo en escenario. Trece días.",
        },
      },
      {
        title: { en: "The design decisions", es: "Las decisiones de diseño" },
        bullets: {
          en: [
            "Bold condensed typography to communicate urgency and movement",
            "Black + orange as a signal: fast, direct, no wasted space",
            "Purple background for The Schedule: a deliberate pause that makes the section feel like a curriculum, not a sales page",
            "The AI Support section designed as a product UI within a marketing page: showing, not telling",
            "Pricing table as a decision moment, not an afterthought: tiered slots, clear scarcity",
          ],
          es: [
            "Tipografía condensada en negrita para comunicar urgencia y movimiento",
            "Negro + naranja como señal: rápido, directo, sin espacio desperdiciado",
            "Fondo morado para The Schedule: una pausa deliberada que hace que la sección se sienta como un currículo, no una página de ventas",
            "La sección AI Support diseñada como UI de producto dentro de una página de marketing: mostrando, no explicando",
            "La tabla de precios como momento de decisión, no como afterthought: slots por niveles, escasez clara",
          ],
        },
      },
    ],
  },
  {
    id: "wellness-workshop-seoul",
    chapter: "boost-lab",
    title: "Seoul Wellness Workshop",
    brand: "BOOST LAB",
    date: { en: "20 Apr 2024", es: "20 abr 2024" },
    location: "Seoul",
    tagline: {
      en: "Korea has a wellbeing problem. The Seoul Wellness Workshop was built to make space for the conversation that wasn't happening: how to sustain yourself while building something.",
      es: "Corea tiene un problema de bienestar. El Seoul Wellness Workshop fue construido para abrir la conversación que no estaba pasando: cómo sostenerse mientras construyes algo.",
    },
    context: {
      en: "The pace of work in Korea leaves little room for wellbeing. Burnout, mental health, and work-life balance are conversations that mostly happen in private. The workshop opened those conversations in a community setting, with entrepreneurs and professionals as the audience.",
      es: "El ritmo de trabajo en Corea deja poco espacio para el bienestar. El burnout, la salud mental y el balance vida-trabajo son conversaciones que en general pasan en privado. El workshop abrió esas conversaciones en formato comunitario, con emprendedores y profesionales como audiencia.",
    },
    roleItems: {
      en: [
        "Branding and visual identity for the event",
        "Marketing strategy and digital campaign",
        "Social media and community engagement",
      ],
      es: [
        "Branding e identidad visual del evento",
        "Estrategia de marketing y campaña digital",
        "Redes sociales y engagement de comunidad",
      ],
    },
    sections: [
      {
        title: { en: "Three pillars of the workshop", es: "Tres pilares del workshop" },
        bullets: {
          en: [
            "Building a healthy work-life balance",
            "Developing emotional intelligence",
            "Creating a supportive community of peers",
          ],
          es: [
            "Construir un balance vida-trabajo sostenible",
            "Desarrollar inteligencia emocional",
            "Crear una comunidad de pares que se sostiene",
          ],
        },
      },
      {
        title: { en: "Format", es: "Formato" },
        body: {
          en: "Interactive workshops · panel discussions · networking",
          es: "Workshops interactivos · paneles · networking",
        },
      },
    ],
  },
  {
    id: "youth-future-talent",
    chapter: "boost-lab",
    title: "Youth Future Talent",
    brand: "BOOST LAB",
    date: { en: "Jan – Aug 2024", es: "ene – ago 2024" },
    location: "Seoul",
    tagline: {
      en: "A leadership program for the next generation of global leaders, built around problem-solving, communication, and teamwork.",
      es: "Programa de liderazgo para la próxima generación de líderes globales, construido alrededor de problem-solving, comunicación y trabajo en equipo.",
    },
    context: {
      en: "Future leaders aren't trained in lectures. They're trained in the room, with peers, working on real problems. Youth Future Talent was an 8-month program that ran across multiple Seoul middle schools, designed to give student council members the tools to address complex challenges and drive change in their own communities.",
      es: "Los líderes del futuro no se forman en clases magistrales. Se forman en la sala, con pares, trabajando sobre problemas reales. Youth Future Talent fue un programa de 8 meses que corrió en distintos colegios de Seúl, diseñado para darle a estudiantes de consejo estudiantil las herramientas para abordar retos complejos y mover cambio en sus propias comunidades.",
    },
    roleItems: {
      en: [
        "Co-creation of curriculum and learning experiences",
        "Workshop design, interactive activities to foster critical thinking and teamwork",
        "Materials development, presentations, handouts, assessments",
        "Logistics coordination across schools",
      ],
      es: [
        "Co-creación del currículum y las experiencias de aprendizaje",
        "Diseño de workshops, actividades interactivas para fomentar pensamiento crítico y trabajo en equipo",
        "Desarrollo de materiales, presentaciones, handouts, evaluaciones",
        "Coordinación logística entre colegios",
      ],
    },
    sections: [
      {
        title: { en: "Three workshops, three formats", es: "Tres workshops, tres formatos" },
        bullets: {
          en: [
            "Suji High School · 15 students, focus on Sustainable Development Goals",
            "Byeolmuri High School · 12 students, community-focused problem solving",
            "Large-scale workshop · 80+ students from various schools, on self-leadership, teamwork, problem-solving, and global citizenship",
          ],
          es: [
            "Suji High School · 15 estudiantes, enfoque en Objetivos de Desarrollo Sostenible",
            "Byeolmuri High School · 12 estudiantes, problem solving aplicado a su comunidad",
            "Workshop a gran escala · 80+ estudiantes de varios colegios, sobre auto-liderazgo, trabajo en equipo, problem-solving y ciudadanía global",
          ],
        },
      },
      {
        title: {
          en: "What participants left with",
          es: "Con qué se fueron los participantes",
        },
        body: {
          en: "Practical skills in communication and critical thinking · a global mindset built through peer collaboration · the confidence to take action in their own communities.",
          es: "Habilidades prácticas en comunicación y pensamiento crítico · una mirada global construida a través de colaboración con pares · la confianza para mover cambio en sus propias comunidades.",
        },
      },
    ],
  },
  {
    id: "entrepreneur-summit-seoul",
    chapter: "boost-lab",
    title: "Entrepreneur Summit Seoul",
    brand: "BOOST LAB",
    date: { en: "22 Mar 2025", es: "22 mar 2025" },
    location: "Seoul",
    tagline: {
      en: "The first BOOST LAB summit. A response to a real gap: in Seoul, almost no events brought Korean and English-speaking entrepreneurs into the same room.",
      es: "El primer summit de BOOST LAB. Una respuesta a una brecha real: en Seúl, casi ningún evento juntaba a emprendedores coreanos y de habla inglesa en una misma sala.",
    },
    context: {
      en: "When BOOST LAB landed in Seoul, one thing was missing fast: a space where Korean and international entrepreneurs could actually share a room and a conversation. Most events were one or the other. The Entrepreneur Summit Seoul was built to be both, bilingual, mixed audience, focused on the topics founders actually care about.",
      es: "Cuando BOOST LAB aterrizó en Seúl, una cosa faltaba rápido: un espacio donde emprendedores coreanos e internacionales pudieran realmente compartir una sala y una conversación. La mayoría de eventos eran una cosa o la otra. El Entrepreneur Summit Seoul fue construido para ser ambos, bilingüe, audiencia mixta, enfocado en los temas que a los founders realmente les importan.",
    },
    roleItems: {
      en: [
        "Event concept and strategy",
        "Branding and visual identity",
        "Speaker curation across Korean and international ecosystems",
        "Marketing campaign and digital communications",
        "On-site logistics and execution",
      ],
      es: [
        "Concepto y estrategia del evento",
        "Branding e identidad visual",
        "Curaduría de speakers entre el ecosistema coreano y el internacional",
        "Campaña de marketing y comunicación digital",
        "Logística y ejecución en sitio",
      ],
    },
    sections: [
      {
        title: { en: "Why it mattered", es: "Por qué importó" },
        body: {
          en: "The summit ran fully bilingual, with speakers and attendees from both ecosystems sharing the same space for the first time. It set the precedent for everything BOOST LAB would build after, including the Women Entrepreneur Summit Seoul that followed three months later.",
          es: "El summit corrió 100% bilingüe, con speakers y asistentes de ambos ecosistemas compartiendo el mismo espacio por primera vez. Marcó el precedente de todo lo que BOOST LAB construiría después, incluyendo el Women Entrepreneur Summit Seoul que vino tres meses más tarde.",
        },
      },
    ],
  },
  {
    id: "women-entrepreneur-summit-seoul",
    chapter: "boost-lab",
    title: "Women Entrepreneur Summit Seoul",
    brand: "BOOST LAB",
    date: { en: "15 Jun 2024", es: "15 jun 2024" },
    location: "Seoul",
    tagline: {
      en: "The summit that came from a question: where are the women on these stages? Built three months after the Entrepreneur Summit Seoul, it became the precedent for the Bogotá edition that followed.",
      es: "El summit que nació de una pregunta: ¿dónde están las mujeres en estos escenarios? Construido tres meses después del Entrepreneur Summit Seoul, se volvió el precedente de la edición de Bogotá que vino después.",
    },
    context: {
      en: "After running the Entrepreneur Summit Seoul, one absence stood out: very few women on the speaker lists. Women Entrepreneur Summit Seoul was built as a direct response. The summit ran fully in English to break language barriers and create a truly international event, with a curated lineup of women leading innovation, social change, and creative ventures.",
      es: "Después de correr el Entrepreneur Summit Seoul, una ausencia se hizo evidente: muy pocas mujeres en las listas de speakers. Women Entrepreneur Summit Seoul fue construido como respuesta directa. El summit corrió 100% en inglés para romper la barrera del idioma y crear un evento verdaderamente internacional, con un lineup curado de mujeres liderando innovación, cambio social y proyectos creativos.",
    },
    roleItems: {
      en: [
        "Event strategy and conception",
        "Speaker recruitment and management",
        "Marketing campaign across social and email",
        "Logistics and on-site execution",
        "Panel content development and moderation",
      ],
      es: [
        "Estrategia y concepción del evento",
        "Reclutamiento y gestión de speakers",
        "Campaña de marketing en redes y email",
        "Logística y ejecución en sitio",
        "Desarrollo de contenido y moderación de paneles",
      ],
    },
    sections: [
      {
        title: { en: "Three challenges, three answers", es: "Tres retos, tres respuestas" },
        bullets: {
          en: [
            "Language barrier → fully English summit to enable a global audience and cross-cultural collaboration",
            "Gender bias in the entrepreneurial landscape → diverse panel actively curated to challenge norms and inspire new founders",
            "Limited resources → maximized through partnerships, volunteer support, and lean execution",
          ],
          es: [
            "Barrera del idioma → summit 100% en inglés para habilitar audiencia global y colaboración intercultural",
            "Sesgo de género en el ecosistema emprendedor → panel diverso curado activamente para desafiar normas e inspirar nuevas fundadoras",
            "Recursos limitados → maximizados a través de alianzas, apoyo voluntario y ejecución lean",
          ],
        },
      },
      {
        title: { en: "Partners", es: "Aliados" },
        body: {
          en: "Plooda · Front 1 · Social Table · Beyond 2024 · Mondragon Team Academy · Check'o · Seoul Startup",
          es: "Plooda · Front 1 · Social Table · Beyond 2024 · Mondragon Team Academy · Check'o · Seoul Startup",
        },
      },
    ],
    results: [
      { value: "120+", label: { en: "attendees", es: "asistentes" } },
      {
        value: { en: "42,000+", es: "42.000+" },
        label: {
          en: "views across digital campaign",
          es: "views en la campaña digital",
        },
      },
      {
        value: "—",
        label: {
          en: "diverse panel: tech founders, social entrepreneurs, creative leaders",
          es: "panel diverso: fundadoras de tech, emprendedoras sociales, líderes creativas",
        },
      },
    ],
  },

  // ===== N9NE projects (3) =====
  {
    id: "nobled-coffee",
    chapter: "n9ne",
    title: "NOBLED Specialty Coffee",
    brand: "N9NE",
    date: { en: "Jun – Jul 2023", es: "jun – jul 2023" },
    location: "Berlin",
    tagline: {
      en: "A coffee brand built around the stories of Colombian coffee farmers, designed to elevate the cup beyond product into experience.",
      es: "Una marca de café construida alrededor de las historias de los caficultores colombianos, diseñada para llevar la taza más allá del producto y volverla experiencia.",
    },
    context: {
      en: "Specialty coffee is a crowded category. NOBLED bet on a different angle: connecting consumers in Berlin directly with the artistry and stories behind Colombian farmers. The brand had to do two jobs at once, communicate craft, and build a sustainable business model around subscription.",
      es: "El café de especialidad es una categoría saturada. NOBLED apostó por un ángulo distinto: conectar a los consumidores en Berlín directamente con el arte y las historias de los caficultores colombianos. La marca tenía que hacer dos trabajos a la vez, comunicar oficio, y construir un modelo de negocio sostenible alrededor de la suscripción.",
    },
    myRole: {
      en: "Lead designer and strategist.",
      es: "Lead designer y estratega.",
    },
    roleItems: {
      en: [
        "Brand identity from the ground up: logo, color palette, typography, full brandbook",
        "User experience design for the platform",
        "Subscription-based business model: strategy and implementation",
      ],
      es: [
        "Identidad de marca desde cero: logo, paleta de color, tipografía, brandbook completo",
        "Diseño de experiencia de usuario para la plataforma",
        "Modelo de negocio basado en suscripción: estrategia e implementación",
      ],
    },
    results: [
      {
        value: "€400+",
        label: {
          en: "in subscription revenue in under a month",
          es: "en ingresos de suscripción en menos de un mes",
        },
      },
      {
        value: "—",
        label: {
          en: "cohesive visual identity across product and digital touchpoints",
          es: "identidad visual cohesiva traducida a producto y touchpoints digitales",
        },
      },
      {
        value: "—",
        label: {
          en: "subscription model validated as viable path to sustainable growth",
          es: "modelo de suscripción validado como camino viable hacia crecimiento sostenible",
        },
      },
    ],
  },
  {
    id: "eats-real",
    chapter: "n9ne",
    title: "Eat's Real",
    brand: "N9NE",
    date: { en: "Apr – May 2023", es: "abr – may 2023" },
    location: "Seoul",
    tagline: {
      en: "Eat smart, stay simple. A healthy lunch delivery service built for international students in Seoul, where eating well shouldn't depend on speaking Korean.",
      es: "Eat smart, stay simple. Un servicio de delivery de almuerzos saludables para estudiantes internacionales en Seúl, donde comer bien no debería depender de hablar coreano.",
    },
    context: {
      en: "International students in Seoul face the same problem every lunch: most healthy options are gated behind a language barrier. Eat's Real removed that barrier, connecting students with local restaurants offering balanced, affordable meals through a platform that didn't require speaking Korean to use it.",
      es: "Los estudiantes internacionales en Seúl enfrentan el mismo problema cada almuerzo: la mayoría de opciones saludables están bloqueadas por la barrera del idioma. Eat's Real removió esa barrera, conectando estudiantes con restaurantes locales que ofrecen comidas balanceadas y asequibles, a través de una plataforma que no requería hablar coreano para usarse.",
    },
    myRole: { en: "Lead designer y UX.", es: "Lead designer y UX." },
    roleItems: {
      en: [
        "UI design for the website: clear, visual-first, designed for non-Korean speakers",
        "UX flow design for both students and restaurant owners",
        "Brand identity contribution: marketing materials and color palette",
      ],
      es: [
        "Diseño de UI para el website: claro, visual-first, pensado para no-hispanohablantes de coreano",
        "Diseño de flujo UX tanto para estudiantes como para dueños de restaurantes",
        "Aporte a la identidad de marca: materiales de marketing y paleta de color",
      ],
    },
    sections: [
      {
        title: { en: "The design challenge", es: "El reto de diseño" },
        body: {
          en: "Designing for two audiences at once: students who want food fast without translation friction, and restaurant owners who needed simple tools to list and update their menus.",
          es: "Diseñar para dos audiencias a la vez: estudiantes que quieren comer rápido sin fricción de traducción, y dueños de restaurantes que necesitaban herramientas simples para listar y actualizar sus menús.",
        },
      },
    ],
  },
  {
    id: "hola-guesthouse-jeju",
    chapter: "n9ne",
    title: "Hola Guesthouse Jeju",
    brand: "N9NE",
    date: { en: "2023", es: "2023" },
    location: "Jeju",
    tagline: {
      en: "A guesthouse on Jeju Island designed as a home for international travelers, branded around hospitality, warmth, and cross-cultural ease.",
      es: "Una guesthouse en la isla de Jeju diseñada como un hogar para viajeros internacionales, con branding alrededor de la hospitalidad, la calidez y la facilidad intercultural.",
    },
    context: {
      en: "Hola Guesthouse aimed to be more than accommodation. The vision: a space where international travelers visiting Jeju could land and feel at home, in a context where most lodging options are designed for Korean travelers. The branding had to communicate that warmth at every touchpoint.",
      es: "Hola Guesthouse buscaba ser más que un alojamiento. La visión: un espacio donde los viajeros internacionales que visitan Jeju pudieran aterrizar y sentirse en casa, en un contexto donde la mayoría de opciones de hospedaje están diseñadas para viajeros coreanos. El branding tenía que comunicar esa calidez en cada touchpoint.",
    },
    roleItems: {
      en: [
        "Brand strategy: positioning, target audience, key messaging",
        "Visual identity design: logo, color palette, typography",
        "Brand guidelines: comprehensive system for consistent application across touchpoints",
      ],
      es: [
        "Estrategia de marca: posicionamiento, audiencia objetivo, mensaje clave",
        "Diseño de identidad visual: logo, paleta de color, tipografía",
        "Brand guidelines: sistema completo para aplicación consistente en touchpoints",
      ],
    },
    sections: [
      {
        title: { en: "What we delivered", es: "Lo que se entregó" },
        body: {
          en: "A complete brand system designed to feel like a house, not a hotel, built for international travelers to feel oriented and welcome from the first touchpoint.",
          es: "Un sistema de marca completo diseñado para sentirse como una casa, no un hotel, construido para que los viajeros internacionales se sientan orientados y bienvenidos desde el primer touchpoint.",
        },
      },
    ],
  },

  // ===== Independent design (5) =====
  {
    id: "serema-hotel",
    chapter: "independent",
    title: "Serema Hotel",
    brand: "Independent",
    date: { en: "Dec 2025", es: "dic 2025" },
    location: "Cartagena, Colombia",
    tagline: {
      en: "A boutique hotel near the sea, repositioned during a renovation: not 'luxury,' but comfort that evolves.",
      es: "Un hotel boutique cerca del mar, reposicionado durante una renovación: no 'lujo', sino confort que evoluciona.",
    },
    context: {
      en: "Serema is a boutique hotel in Cielo Mar, Cartagena, undergoing renovation while staying open. The brief: build a brand voice and content strategy that holds two audiences without splitting in half, corporate travelers who need a place that works, and travelers seeking a soft urban-beach pause. The challenge wasn't just design: it was finding a position that didn't lean into 'luxury' clichés the brand explicitly rejected.",
      es: "Serema es un hotel boutique en Cielo Mar, Cartagena, en proceso de renovación sin cerrar sus puertas. El brief: construir una voz de marca y una estrategia de contenido que sostuviera dos audiencias sin partirse a la mitad, viajeros corporativos que necesitan un lugar que funcione, y viajeros que buscan una pausa suave entre ciudad y playa. El reto no era solo de diseño: era encontrar un posicionamiento que no cayera en los clichés de 'lujo' que la marca explícitamente rechaza.",
    },
    myRole: {
      en: "Brand strategy and content design.",
      es: "Estrategia de marca y diseño de contenido.",
    },
    roleItems: {
      en: [
        "Core message and mantra: 'Confort que evoluciona'",
        "Tone of voice guide: voice archetype, principles, do's and don'ts, lexical substitutions",
        "Three communication pillars: Community, Institutional, Marketing",
        "4-week content matrix (3 posts/week + daily stories) with formats, hooks, and CTAs",
        "Bio architecture, Linktree structure, hashtag strategy",
      ],
      es: [
        "Mensaje central y mantra: 'Confort que evoluciona'",
        "Guía de tono de voz: arquetipo, principios, qué sí y qué no, sustituciones léxicas",
        "Tres pilares de comunicación: Comunidad, Institucional, Marketing",
        "Matriz de contenido de 4 semanas (3 posts/semana + stories diarias) con formatos, hooks y CTAs",
        "Arquitectura de bio, estructura de Linktree, estrategia de hashtags",
      ],
    },
    sections: [
      {
        title: {
          en: "A decision that holds the brand",
          es: "Una decisión que sostiene la marca",
        },
        body: {
          en: "Most boutique hotels reach for the same vocabulary: premium, exclusive, sophisticated. Serema rejects all three. The voice was built around substitutions: 'luxury' → 'carefully designed details,' 'exclusive' → 'intimate,' 'sophisticated' → 'harmonic.' That single decision filters every piece of content downstream.",
          es: "La mayoría de hoteles boutique reaching por el mismo vocabulario: premium, exclusivo, sofisticado. Serema rechaza los tres. La voz se construyó alrededor de sustituciones: 'lujo' → 'detalles cuidados', 'exclusivo' → 'íntimo', 'sofisticado' → 'armónico'. Esa sola decisión filtra cada pieza de contenido que viene después.",
        },
      },
      {
        title: { en: "Tone archetype", es: "Arquetipo de tono" },
        body: {
          en: "'The friend who does yoga before work.' Empathetic, practical, warm. Honest about what's improving and what's already ready. One CTA per piece. Inclusive by default.",
          es: "'La amiga que hace yoga antes del trabajo.' Empática, práctica, luminosa. Honesta sobre qué está mejorando y qué ya está listo. Un CTA por pieza. Inclusiva por defecto.",
        },
      },
    ],
  },
  {
    id: "opuesto-sas",
    chapter: "independent",
    title: "Opuesto SAS",
    brand: "Independent",
    date: { en: "Apr 2025", es: "abr 2025" },
    location: "Colombia",
    tagline: {
      en: "A construction company aiming to lead the Nariño region in Colombia, repositioned around the idea of trusted partner, not just builder.",
      es: "Una constructora con visión de liderar la región de Nariño en Colombia, reposicionada alrededor de la idea de socio de confianza, no solo constructor.",
    },
    context: {
      en: "Opuesto SAS has been building spaces for over five years, focused on materializing each client's personal vision from concept to keys. The brief: enter the Colombian market positioned as regional leaders in Nariño, with a brand system that communicates depth, 'more than a construction company, a trusted partner,' across every touchpoint.",
      es: "Opuesto SAS lleva más de cinco años construyendo espacios, enfocados en materializar la visión personal de cada cliente desde el concepto hasta las llaves. El brief: entrar al mercado colombiano posicionados como líderes regionales en Nariño, con un sistema de marca que comunicara profundidad, 'más que una constructora, un socio de confianza,' en cada touchpoint.",
    },
    myRole: { en: "Brand system and web.", es: "Sistema de marca y web." },
    roleItems: {
      en: [
        "Brandbook: core values, visual identity, typography, color",
        "Portfolio design to showcase past projects",
        "Website: design and structure",
        "Cohesive aesthetic across every touchpoint",
      ],
      es: [
        "Brandbook: valores, identidad visual, tipografía, color",
        "Diseño del portafolio para mostrar proyectos anteriores",
        "Sitio web: diseño y estructura",
        "Estética cohesiva en cada touchpoint",
      ],
    },
    sections: [
      {
        title: { en: "What we delivered", es: "Lo que se entregó" },
        body: {
          en: "A complete brand system that took Opuesto SAS from execution-focused construction company to a recognizable regional brand, with the digital infrastructure to compete for clients online.",
          es: "Un sistema de marca completo que llevó a Opuesto SAS de ser una constructora enfocada en ejecución a una marca regional reconocible, con la infraestructura digital para competir por clientes en línea.",
        },
      },
    ],
  },
  {
    id: "brujula-etica",
    chapter: "independent",
    title: "Brújula Ética",
    brand: "Pontificia Universidad Javeriana × Universidad Loyola",
    date: { en: "Oct 2025 + Jan 2026", es: "oct 2025 + ene 2026" },
    location: "Colombia × Spain",
    tagline: {
      en: "A podcast campaign on ethics, designed with a visual language built specifically to reach youth and university students.",
      es: "Una campaña de podcast sobre ética, diseñada con un lenguaje visual construido específicamente para llegar a jóvenes y estudiantes universitarios.",
    },
    context: {
      en: "Brújula Ética is a podcast series produced by Pontificia Universidad Javeriana (Colombia) and Universidad Loyola (Spain), available on Spotify. The brief was clear: the campaign needed to reach a young audience, university students in their late teens and early twenties, and that meant building a visual language designed specifically for that target. The strategy had to feel young, alive, and worth following on social media.",
      es: "Brújula Ética es una serie de podcast producida por la Pontificia Universidad Javeriana (Colombia) y la Universidad Loyola (España), disponible en Spotify. El reto: el tono institucional de ambas universidades no iba a llegar a la audiencia que la campaña buscaba alcanzar, estudiantes universitarios de finales de adolescencia y veintipocos. La estrategia visual tenía que sentirse joven, viva y digna de seguirse en redes.",
    },
    myRole: {
      en: "Visual strategy and full campaign design across two editions (Oct 2025 + Jan 2026).",
      es: "Estrategia visual y diseño completo de campaña en dos ediciones (oct 2025 + ene 2026).",
    },
    roleItems: {
      en: [
        "Bold visual identity for the campaign, designed for the young audience target",
        "5 podcast episode designs (visual identity per episode)",
        "5 social media post sets per episode + stories",
        "Series of posters for maximum reach and engagement",
        "Cohesive design language across the full campaign",
      ],
      es: [
        "Identidad visual con carácter, distinta al tono formal de las universidades",
        "5 diseños de episodios de podcast (identidad visual por episodio)",
        "5 sets de social media posts por episodio + stories",
        "Serie de posters para maximizar alcance y engagement",
        "Lenguaje de diseño cohesivo en toda la campaña",
      ],
    },
    sections: [
      {
        title: { en: "Why it mattered", es: "Por qué importó" },
        body: {
          en: "Inculcating ethics and entrepreneurship in young people is work that matters. The campaign existed to make those conversations reach the audience that needed them, in a format and language they actually consume. Working with Javeriana and Loyola on that target was a privilege, two universities with serious weight in their ecosystems, building something deliberately for the next generation.",
          es: "Inculcar la ética y el emprendimiento en los jóvenes es trabajo que importa. La campaña existe para que esas conversaciones lleguen a la audiencia que las necesita, en un formato y un lenguaje que efectivamente consumen. Trabajar con Javeriana y Loyola en ese objetivo fue un privilegio: dos universidades con peso serio en sus ecosistemas, construyendo algo deliberadamente para la próxima generación.",
        },
      },
    ],
  },
  {
    id: "teampreneurship-cooperative",
    chapter: "independent",
    title: "팀프러너십 교육협동조합",
    brand: "Independent",
    date: { en: "Sep 2025", es: "sep 2025" },
    location: "Korea",
    tagline: {
      en: "A Korean educational cooperative focused on team leadership and growth, branded with a logo inspired by Ssanghak Maedeup, traditional Korean knots that symbolize unity and shared success.",
      es: "Una cooperativa educativa coreana enfocada en liderazgo de equipos y crecimiento colectivo, con un logo inspirado en Ssanghak Maedeup, los nudos tradicionales coreanos que simbolizan unión y éxito compartido.",
    },
    context: {
      en: "The cooperative is rooted in Korea but operates with international reach. The brief asked for a logo that worked across very different contexts, from formal documents and signage to digital and merchandise, and that could speak to both Korean and international audiences without losing identity in either direction. The deeper ask: capture teampreneurship itself, leadership and team growth, visually.",
      es: "La cooperativa está arraigada en Corea pero opera con alcance internacional. El brief pedía un logo que funcionara en contextos muy distintos, desde documentos formales y señalética hasta digital y merchandise, y que hablara tanto a audiencias coreanas como internacionales sin perder identidad en ninguna de las dos. La pregunta más profunda: capturar teampreneurship mismo, liderazgo y crecimiento de equipo, visualmente.",
    },
    roleItems: {
      en: [
        "Brand strategy and positioning",
        "Visual identity: logo, color palette, typography",
        "Logo system designed for flexibility: printable, digital, scalable, multilingual context-ready",
        "Mood board and brand application examples",
        "Brand guidelines",
      ],
      es: [
        "Estrategia de marca y posicionamiento",
        "Identidad visual: logo, paleta de color, tipografía",
        "Sistema de logo diseñado para flexibilidad: imprimible, digital, escalable, listo para contexto multilingüe",
        "Mood board y ejemplos de aplicación de marca",
        "Brand guidelines",
      ],
    },
    sections: [
      {
        title: {
          en: "The concept behind the logo",
          es: "El concepto detrás del logo",
        },
        body: {
          en: "The logo is inspired by Ssanghak Maedeup (쌍학매듭), traditional Korean knots that symbolize the success and harmony of two parts coming together. The reinterpretation reads as a minimalist geometric form built around four nodes meeting at a central square, function and modernity holding the symbolism of tradition. Each element carries meaning: the knots represent teamwork and union; the central square represents shared success, clear, solid, divided equally. The cultural reading: the form evokes the values of cooperation, resilience, and collective action.",
          es: "El logo está inspirado en Ssanghak Maedeup (쌍학매듭), nudos tradicionales coreanos que simbolizan el éxito y la armonía de dos partes uniéndose. La reinterpretación se lee como una forma geométrica minimalista construida alrededor de cuatro nodos que se encuentran en un cuadrado central, funcionalidad y modernidad sosteniendo el simbolismo de la tradición. Cada elemento carga significado: los nudos representan trabajo en equipo y unión; el cuadrado central representa el éxito compartido, claro, sólido, dividido en partes iguales. La lectura cultural: la forma evoca los valores de cooperación, resiliencia y acción colectiva.",
        },
      },
    ],
  },
  {
    id: "santa-juliana",
    chapter: "independent",
    title: "Santa Juliana Reserva Natural",
    brand: "Independent",
    date: { en: "Jul 2025", es: "jul 2025" },
    location: "Colombia",
    tagline: {
      en: "Branding for a natural reserve and parcelación in Colombia, designed to communicate connection with nature, accessible luxury, and sustainable living.",
      es: "Branding para una reserva natural y parcelación en Colombia, diseñado para comunicar conexión con la naturaleza, lujo accesible y vida sostenible.",
    },
    context: {
      en: "Santa Juliana isn't just selling land, they're selling a way of life: living in balance with nature, with community and sustainability at the core. The brand had to feel rooted in nature itself, with elegance that felt aspirational without slipping into commercial sterility.",
      es: "Santa Juliana no vende solo terrenos, vende una forma de vida: vivir en equilibrio con la naturaleza, con comunidad y sostenibilidad en el centro. La marca tenía que sentirse arraigada en la naturaleza misma, con una elegancia aspiracional sin caer en la esterilidad comercial.",
    },
    roleItems: {
      en: [
        "Brand identity: logo, typography, color palette",
        "Brandbook with concept, personality, and tone of communication",
        "Brochure design to present the parcelación",
        "Visual system applied across collateral",
      ],
      es: [
        "Identidad de marca: logo, tipografía, paleta de color",
        "Brandbook con concepto, personalidad y tono de comunicación",
        "Diseño del brochure para presentar la parcelación",
        "Sistema visual aplicado a piezas de comunicación",
      ],
    },
  },

  // ===== Travelling University (2) =====
  {
    id: "mentes-sin-fronteras",
    chapter: "travelling-university",
    title: "Mentes Sin Fronteras",
    brand: "Travelling University × BOOST LAB",
    date: { en: "24 May 2025", es: "24 may 2025" },
    location: "Online",
    tagline: {
      en: "A free, day-long online event for Latin American entrepreneurs and students, focused on innovation, AI, and what it actually takes to launch.",
      es: "Un evento online gratuito de día completo para emprendedores y estudiantes latinoamericanos, enfocado en innovación, IA y lo que realmente cuesta lanzar.",
    },
    context: {
      en: "Mentes Sin Fronteras was built around a simple bet: that the people who most need access to global entrepreneurial education are often the ones with the least access to it. The event ran 100% online, 100% free, with a full day of keynotes, panels, and practical workshops, and a content-driven challenge (#MiIdeaGlobal) that asked participants to record a 1-minute pitch as part of the registration flow.",
      es: "Mentes Sin Fronteras se construyó alrededor de una apuesta simple: que las personas que más necesitan acceso a educación emprendedora global suelen ser las que menos acceso tienen a ella. El evento corrió 100% online, 100% gratuito, con un día completo de keynotes, paneles y workshops prácticos, además de un reto de contenido (#MiIdeaGlobal) que pedía a los participantes grabar un pitch de 1 minuto como parte del flujo de registro.",
    },
    myRole: {
      en: "Marketing strategy, talent attraction, and audience activation across LATAM.",
      es: "Estrategia de marketing, atracción de talento y activación de audiencia en LATAM.",
    },
    roleItems: {
      en: [
        "Pre-event campaign and registration flow",
        "LinkedIn and digital communications strategy",
        "Speaker and partner coordination across LATAM and Europe",
        "#MiIdeaGlobal participation challenge: pitch submission flow and selection",
        "Audience activation through Travelling University channels",
      ],
      es: [
        "Campaña pre-evento y flujo de registro",
        "Estrategia de LinkedIn y comunicación digital",
        "Coordinación de speakers y aliados entre LATAM y Europa",
        "Reto de participación #MiIdeaGlobal: flujo de envío de pitches y selección",
        "Activación de audiencia a través de los canales de Travelling University",
      ],
    },
    sections: [
      {
        title: { en: "The format", es: "El formato" },
        bullets: {
          en: [
            "Keynotes on innovation, AI, and the future of entrepreneurship",
            "Workshops for participants to start building their idea live",
            "Panels with founders who broke barriers in their own ecosystems",
            "Prizes including 1:1 mentorships with global founders, full access to the BOOST Elevate course, discounts on the BOOST LAB Korea mission, and 10 international microcredentials issued in blockchain by partner Caja Lab",
          ],
          es: [
            "Keynotes sobre innovación, IA y futuro emprendedor",
            "Workshops para que los participantes empezaran a construir su idea en vivo",
            "Paneles con fundadores que rompieron barreras en sus ecosistemas",
            "Premios que incluyeron mentorías 1:1 con fundadores globales, acceso completo al curso BOOST Elevate, descuentos para la misión emprendedora de BOOST LAB en Corea, y 10 microcredenciales internacionales emitidas en blockchain por nuestro aliado Caja Lab",
          ],
        },
      },
    ],
    results: [
      {
        value: "80",
        label: {
          en: "participants across LATAM and Europe",
          es: "participantes entre LATAM y Europa",
        },
      },
      {
        value: "10+",
        label: {
          en: "speakers and partners aligned around a shared goal: making entrepreneurial education accessible across borders",
          es: "speakers y aliados alineados alrededor de un objetivo compartido: hacer accesible la educación emprendedora cruzando fronteras",
        },
      },
    ],
  },
  {
    id: "talent-scouting",
    chapter: "travelling-university",
    title: "Talent Scouting · Latin America & Korea",
    brand: "Travelling University",
    date: { en: "Feb – Sep 2025", es: "feb – sep 2025" },
    location: "LATAM × Korea",
    tagline: {
      en: "Bridging the gap between high-potential talent and global entrepreneurial education, through direct outreach, institutional connections, and on-the-ground events.",
      es: "Cerrar la brecha entre talento de alto potencial y educación emprendedora global, a través de outreach directo, conexiones institucionales y eventos en terreno.",
    },
    context: {
      en: "Travelling University connects young entrepreneurs with international programs of formation. The talent scouting role exists to close the loop between the program and the people it's looking for. The work was split across two contexts with very different dynamics: Latin America (where the offer is global education for local talent) and Korea (where the offer is access to LATAM ecosystems for Korean and international talent). Both required different approaches, but the same underlying skill: identifying potential and building the path to it.",
      es: "Travelling University conecta a jóvenes emprendedores con programas internacionales de formación. El rol de talent scouting existe para cerrar el loop entre el programa y las personas que está buscando. El trabajo se dividió en dos contextos con dinámicas muy distintas: Latinoamérica (donde la oferta es educación global para talento local) y Corea (donde la oferta es acceso a ecosistemas LATAM para talento coreano e internacional). Ambos requerían enfoques distintos, pero la misma habilidad de fondo: identificar potencial y construir el camino para llegar a él.",
    },
    roleItems: {
      en: [
        "Strategic outreach to schools, counselors, and institutional partners across LATAM",
        "Market research and segmentation to design effective access routes",
        "Workshops and institute visits as touchpoints with potential candidates",
        "Major fairs and one-on-one calls for direct talent identification",
        "Content strategy on LinkedIn and Travelling University's digital channels",
        "Talent scouting in Korea, adapted to a different cultural and educational context",
      ],
      es: [
        "Outreach estratégico a colegios, consejeros y aliados institucionales en LATAM",
        "Investigación de mercado y segmentación para diseñar rutas de acceso efectivas",
        "Workshops y visitas a institutos como touchpoints con candidatos potenciales",
        "Ferias grandes y llamadas uno a uno para identificación directa de talento",
        "Estrategia de contenido en LinkedIn y los canales digitales de Travelling University",
        "Talent scouting en Corea, adaptado a un contexto cultural y educativo distinto",
      ],
    },
    sections: [
      {
        title: { en: "Highlights", es: "Highlights" },
        bullets: {
          en: [
            "Speaker at the CIS Conference (Council of International Schools) in Bogotá at Colegio Nueva Granada, 28 Feb 2025, on talent scouting for global entrepreneurial programs",
            "Active outreach across multiple high schools, universities, and institutional partners in Colombia",
            "Cross-cultural scouting across LATAM and Korea, with adapted strategies for each market",
          ],
          es: [
            "Speaker en la CIS Conference (Council of International Schools) en Bogotá en el Colegio Nueva Granada, 28 feb 2025, sobre talent scouting para programas emprendedores globales",
            "Outreach activo en colegios, universidades y aliados institucionales en Colombia",
            "Scouting transcultural entre LATAM y Corea, con estrategias adaptadas a cada mercado",
          ],
        },
      },
    ],
  },
];

export function getMentionsByChapter(chapterId: ChapterId): Mention[] {
  return mentions.filter((m) => m.chapter === chapterId);
}

export function getMention(id: string): Mention | undefined {
  return mentions.find((m) => m.id === id);
}
