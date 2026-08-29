import type {
  ChapterDetail,
  ChapterId,
  LocalizedString,
} from "./types";

const copy = (es: string): LocalizedString => ({ en: es, es });

export const chapterDetails: ChapterDetail[] = [
  {
    id: "nomadher",
    intro: copy(
      "NomadHer es una app donde mujeres que viajan encuentran travel buddies, se unen a experiencias y construyen comunidad entre ciudades. Entré a diseñar producto y me quedé sosteniendo el sistema visual, las campañas con aliados y los contenidos que mantienen viva la comunidad entre versiones.",
    ),
    role: copy("Founding Designer · octubre 2025 a presente"),
    accent: "#7b173b",
    cover: "work/nomadher-app/03 iPhone Mockups.png",
    impact: [
      { value: "21–23%", label: copy("retención de mes 1 en la app") },
      { value: "1,3M+", label: copy("vistas orgánicas en 8 meses") },
      { value: "31%", label: copy("tasa de apertura del newsletter") },
    ],
    responsibilities: [
      {
        title: copy("Producto y UX/UI"),
        body: copy("Arquitectura location first, flujos de conexión y features en producción de v9.4.7 a v9.6.4."),
      },
      {
        title: copy("Sistema visual"),
        body: copy("Una identidad que conecta app, App Store, redes, campañas y materiales de marca."),
      },
      {
        title: copy("Campañas y partnerships"),
        body: copy("Dirección creativa para aliados internacionales como Japan Airlines, entre Instagram, email y app."),
      },
      {
        title: copy("Contenido y comunidad"),
        body: copy("Pilares mensuales, programa de bloggers, embajadoras, análisis de campañas y newsletter."),
      },
      {
        title: copy("Eventos y experiencias"),
        body: copy("Concepto, logística y sistema de piezas físicas para experiencias de comunidad en Seúl."),
      },
      {
        title: copy("Producto interno"),
        body: copy("Reporting automatizado con datos de Meta para que el equipo consulte resultados sin reconstruir informes."),
      },
    ],
    projects: [
      {
        title: copy("Rediseño de la app"),
        label: copy("UX/UI"),
        date: copy("2026"),
        description: copy("De pantallas sueltas a un sistema: Travel Buddy, perfil, settings y Currently Active."),
        href: "/work/nomadher-app",
        image: "pages/chapters/nomadher-project-01.png",
      },
      {
        title: copy("Creator Call con JAL"),
        label: copy("Campaña"),
        date: copy("2026"),
        description: copy("Instagram, automatización y app funcionando como un solo funnel de campaña."),
        href: "/work/jal-nomadher",
        image: "pages/chapters/nomadher-project-02.png",
      },
      {
        title: copy("Sistema visual"),
        label: copy("Branding"),
        date: copy("2025 - 2026"),
        description: copy("La identidad que conecta app, redes y campañas en un mismo lenguaje."),
        image: "pages/chapters/nomadher-project-03.png",
      },
      {
        title: copy("Contenido y comunidad"),
        label: copy("Contenido"),
        date: copy("2025"),
        description: copy("Carruseles, reels y automatizaciones que sostienen la conversación cada semana."),
        image: "pages/chapters/nomadher-project-04.png",
      },
      {
        title: copy("Automatización ManyChat"),
        label: copy("Growth"),
        date: copy("2026"),
        description: copy("Comentarios que se vuelven conversaciones y links que llegan a cientos de aplicantes sin perder a nadie."),
        image: "pages/chapters/nomadher-project-05.png",
      },
      {
        title: copy("Análisis de contenido"),
        label: copy("Data"),
        date: copy("2026"),
        description: copy("Qué formatos funcionan de verdad en la comunidad, y la fórmula que se repite cuando algo despega."),
        image: "pages/chapters/nomadher-project-06.png",
      },
    ],
  },
  {
    id: "boost-lab",
    intro: copy(
      "BOOST LAB nació en Seúl en 2024 para que emprendedores crezcan con estructura, comunidad y una red que ya está en la sala. Diseñamos y ejecutamos summits, hackathons, workshops y misiones internacionales entre Corea y Latinoamérica.",
    ),
    role: copy("Co-fundadora · enero 2024 a presente"),
    accent: "#0f4f3c",
    cover: "work/global-youth-summit/_MG_3552.png",
    impact: [
      { value: "45+", label: copy("instituciones en la red entre Colombia y Corea") },
      { value: "400+", label: copy("asistentes en Global Youth Bogotá") },
      { value: "4,8 / 5", label: copy("calificación de asistentes del summit") },
    ],
    responsibilities: [
      {
        title: copy("Estrategia y concepto"),
        body: copy("Formatos que conectan retos reales, comunidad y aprendizaje aplicado."),
      },
      {
        title: copy("Alianzas y ecosistema"),
        body: copy("Relaciones con instituciones, universidades, speakers, sponsors y empresas de ambos continentes."),
      },
      {
        title: copy("Diseño de experiencias"),
        body: copy("Summits, workshops, hackathons y misiones de punta a punta."),
      },
      {
        title: copy("Identidad y campañas"),
        body: copy("Sistemas visuales, materiales, contenido y comunicación digital para convocar y mover comunidad."),
      },
      {
        title: copy("Programas y facilitación"),
        body: copy("Módulos, plantillas, actividades, mentoría y espacios de reflexión para cada formato."),
      },
      {
        title: copy("Operación en sitio"),
        body: copy("Producción, logística y coordinación de equipos para llevar el concepto al día D."),
      },
    ],
    projects: [
      {
        title: copy("Global Youth: Women’s Entrepreneurship Summit"),
        label: copy("Summit · Bogotá"),
        description: copy("El evento más grande de BOOST LAB, construido desde cero con una red de 45+ aliados."),
        href: "/work/global-youth-summit",
        image: "work/global-youth-summit/_MG_3552.png",
      },
      {
        title: copy("Sejong Global Idea Hackathon"),
        label: copy("Hackathon · Seúl"),
        description: copy("Dos días para transformar una idea en un pitch frente a jurado."),
        href: "/work/sejong-hackathon",
        image: "work/sejong-hackathon/IMG_3845.png",
      },
      {
        title: copy("Misiones Internacionales"),
        label: copy("Expansión internacional"),
        description: copy("Dos empresas latinoamericanas y dos rutas sectoriales dentro del ecosistema coreano."),
        href: "/work/misiones-internacionales",
        image: "work/misiones-internacionales/IMG_9755.png",
      },
      {
        title: copy("Seoul Women Entrepreneur Summit"),
        label: copy("Summit · Seúl"),
        description: copy("Un escenario internacional diseñado para que las mujeres sí estuvieran en la conversación."),
        href: "/work/women-entrepreneur-summit-seoul",
        image: "work/boost-lab/women-entrepreneur-summit-seoul/Group 2864.png",
      },
    ],
  },
  {
    id: "independent",
    intro: copy(
      "Branding, websites y estrategia de contenido para clientes en Colombia, Corea y España. El trabajo es entrar a la cabeza del cliente y salir con algo tangible: una marca, un sistema o una estrategia. Aquí también opero como consultora.",
    ),
    role: copy("Diseñadora independiente y consultora · 2025 a 2026"),
    accent: "#1c3d8f",
    cover: "work/independent/brujula-etica/Poster 1.png",
    impact: [
      { value: "3", label: copy("países y contextos de cliente") },
      { value: "70+", label: copy("piezas por edición para Brújula Ética") },
      { value: "6", label: copy("semanas para la estrategia y sistema de Serema") },
    ],
    responsibilities: [
      {
        title: copy("Estrategia de marca"),
        body: copy("Propuesta de valor, narrativa, posicionamiento y decisiones que ordenan lo que una marca cuenta."),
      },
      {
        title: copy("Identidad visual"),
        body: copy("Sistemas de marca pensados para verse consistentes en los canales donde realmente vive cada cliente."),
      },
      {
        title: copy("Web y contenido"),
        body: copy("Arquitectura, copy, SEO, diseño editorial y calendarios de contenido con un propósito comercial claro."),
      },
      {
        title: copy("Investigación"),
        body: copy("Lectura de competencia, regulación, público y contexto antes de convertir una intuición en una propuesta."),
      },
      {
        title: copy("Producto y herramientas"),
        body: copy("Sistemas internos y plantillas que ayudan a que el trabajo siga funcionando después de la entrega."),
      },
    ],
    projects: [
      {
        title: copy("Brújula Ética"),
        label: copy("Identidad y campaña"),
        description: copy("Un sistema visual joven para un podcast universitario binacional."),
        href: "/work/brujula-etica",
        image: "work/independent/brujula-etica/Poster 1.png",
      },
      {
        title: copy("Opuesto SAS"),
        label: copy("Marca, web y producto"),
        description: copy("De análisis competitivo a identidad, portafolio, sitio y herramienta interna."),
        href: "/work/opuesto-sas",
        image: "work/independent/opuesto-sas/Group 2412.png",
      },
      {
        title: copy("Serema Hotel"),
        label: copy("Estrategia de marca"),
        description: copy("Una narrativa y sistema comercial para un hotel que evoluciona mientras opera."),
      },
      {
        title: copy("Santa Juliana"),
        label: copy("Diseño editorial y digital"),
        description: copy("Del material disperso a un portafolio comercial listo para presentar."),
      },
    ],
  },
  {
    id: "n9ne",
    intro: copy(
      "N9NE fue una compañía que co-fundé con otras ocho personas de distintas partes del mundo. Empezó en Bilbao, se movió a Berlín y después a Seúl. Aquí aprendí a liderar equipos internacionales y proyectos que se mueven contigo entre países.",
    ),
    role: copy("Co-fundadora y líder de equipo · 2021 a septiembre 2024"),
    accent: "#5f3a74",
    cover: "work/n9ne/nobled-coffee/IMG_3839.png",
    impact: [
      { value: "59.000€", label: copy("generados por iniciativas de la compañía") },
      { value: "9", label: copy("personas y contextos internacionales en el equipo") },
      { value: "5+", label: copy("proyectos coordinados en simultáneo") },
    ],
    responsibilities: [
      {
        title: copy("Liderazgo de equipo"),
        body: copy("Coordinación de una compañía de nueve personas durante una transición organizacional y tres países."),
      },
      {
        title: copy("Estrategia y experimentación"),
        body: copy("Iniciativas en educación, bienestar y tecnología diseñadas y testeadas en contextos reales."),
      },
      {
        title: copy("Branding y producto"),
        body: copy("Identidades, servicios, experiencias de compra y productos digitales desde la investigación hasta el lanzamiento."),
      },
      {
        title: copy("Investigación cultural"),
        body: copy("Lectura de dinámicas locales para adaptar propuestas a nuevos mercados y necesidades."),
      },
    ],
    projects: [
      {
        title: copy("NOBLED Specialty Coffee"),
        label: copy("Branding y estrategia"),
        description: copy("Una marca de café colombiano y un modelo de suscripción para Berlín."),
        href: "/work/nobled-coffee",
        image: "work/n9ne/nobled-coffee/IMG_3839.png",
      },
      {
        title: copy("Eat’s Real"),
        label: copy("UX/UI y servicio"),
        description: copy("Una experiencia de pedidos para estudiantes internacionales en Seúl."),
      },
      {
        title: copy("Hola Guesthouse"),
        label: copy("Branding"),
        description: copy("Una identidad para que una guesthouse de Jeju hablara a visitantes internacionales."),
      },
    ],
  },
  {
    id: "ironhack",
    intro: copy(
      "Ironhack forma en UX/UI, análisis de datos y desarrollo web con bootcamps intensivos. Mi rol estaba entre los estudiantes y la operación: diseñar y mejorar la experiencia de atravesar el programa, desde la matrícula hasta el último día de clase.",
    ),
    role: copy("Program Manager Assistant · Berlín · marzo a septiembre 2023"),
    accent: "#f5263a",
    impact: [
      { value: "30+", label: copy("participantes por cohorte acompañada") },
      { value: "3", label: copy("eventos coordinados por bootcamp") },
      { value: "1", label: copy("operación existente mejorada desde la experiencia real de estudiantes") },
    ],
    responsibilities: [
      {
        title: copy("Experiencia estudiantil"),
        body: copy("Mejoras de acompañamiento, integración y feedback dentro de un formato educativo intensivo."),
      },
      {
        title: copy("Datos y seguimiento"),
        body: copy("Métricas de progreso, encuestas y evaluaciones para entender calidad y retención."),
      },
      {
        title: copy("Herramientas internas"),
        body: copy("Espacios y herramientas nuevas para estudiantes, equipo y necesidades concretas del campus."),
      },
      {
        title: copy("Eventos de campus"),
        body: copy("Encuentros, charlas y presentaciones finales con instructores y aliados externos."),
      },
    ],
    projects: [
      {
        title: copy("Experiencia estudiantil"),
        label: copy("Operación y servicio"),
        description: copy("Diseñar dentro de una operación viva, con estudiantes reales y restricciones reales."),
      },
      {
        title: copy("Herramientas de campus"),
        label: copy("Producto interno"),
        description: copy("Nuevos espacios y herramientas para hacer más claro el día a día del programa."),
      },
      {
        title: copy("Eventos y Demo Days"),
        label: copy("Experiencia"),
        description: copy("Logística y coordinación de los momentos que cierran cada bootcamp."),
      },
    ],
  },
  {
    id: "travelling-university",
    intro: copy(
      "Travelling University conecta talento de alto potencial con educación emprendedora global. Mi rol se enfocó en estrategia de marketing para Latinoamérica y en talent scouting entre dos continentes: cerrar la brecha entre jóvenes con potencial y programas que casi nunca llegan hasta ellos.",
    ),
    role: copy("Estrategia de marketing y talent scouting · febrero a septiembre 2025"),
    accent: "#124aa8",
    cover: "work/travelling-university/mentes-sin-fronteras/2. Overview + Vision.png",
    impact: [
      { value: "200", label: copy("colegios contactados en Colombia") },
      { value: "100.000+", label: copy("views en campañas de redes") },
      { value: "2", label: copy("continentes conectados por el scouting") },
    ],
    responsibilities: [
      {
        title: copy("Estrategia de mercado"),
        body: copy("Mensajes distintos para estudiantes y familias ante una decisión educativa que ambos toman juntos."),
      },
      {
        title: copy("Talent scouting"),
        body: copy("Mapeo de colegios, contacto directo, reuniones, comunidades y seguimiento en una base de datos propia."),
      },
      {
        title: copy("Marketing y contenido"),
        body: copy("Campañas visuales y contenido digital para hacer visibles programas internacionales en Latinoamérica."),
      },
      {
        title: copy("Experiencias educativas"),
        body: copy("Workshops, visitas, ferias y conversaciones uno a uno que abren posibilidades concretas."),
      },
    ],
    projects: [
      {
        title: copy("Mentes Sin Fronteras"),
        label: copy("Experiencia educativa"),
        description: copy("Un espacio para que jóvenes conecten propósito, educación y posibilidades globales."),
        href: "/work/mentes-sin-fronteras",
        image: "work/travelling-university/mentes-sin-fronteras/2. Overview + Vision.png",
      },
      {
        title: copy("Talent Scouting LATAM × Corea"),
        label: copy("Estrategia y ventas"),
        description: copy("Una red de colegios, familias y conversaciones para conectar talento con educación internacional."),
      },
    ],
  },
];

export function getChapterDetail(id: string) {
  return chapterDetails.find((chapter) => chapter.id === id as ChapterId);
}
