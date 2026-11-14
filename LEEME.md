# Dónde subir cada cosa

Todo lo que subes vive en la carpeta **`public/`**, ordenada por las páginas del sitio. En el Finder solo ves lo tuyo; el código está oculto (`Cmd + Shift + .` para verlo).

Las fotos se suben **tal cual** (sueltas en la carpeta). Mejor que pesen entre 300 KB y 1,5 MB cada una: si son muy grandes, el sitio carga lento.

## 1. Inicio (`public/inicio/`)

| Carpeta | Qué va ahí |
|---|---|
| `documentos/` | Los PDF: CV en español (`cv-es.pdf`), CV en inglés (`cv-en.pdf`) y Servicios creativos (`servicios-creativos.pdf`). Reemplaza el archivo con el mismo nombre. |
| `que-disfruto-hacer/` | Las fotos de "Qué disfruto hacer": una carpeta por categoría (`innovacion-estrategia`, `producto-ux-ui`, `branding-marketing`, `eventos-comunidad`). |
| `proyectos-favoritos/` | Las dos fotos de "Proyectos favoritos". |
| `hero/` | Tu foto principal y los folders de la portada. |

## 2. Portafolio (`public/portafolio/`)

**`capitulos/`** es donde subes las fotos de cada capítulo y de cada proyecto:

- `capitulos/<capítulo>/portada/` → la foto de arriba de la página del capítulo (y también de su tarjeta en Portafolio, si no hay foto en `tarjeta/`).
- `capitulos/<capítulo>/tarjeta/` → (opcional) otra foto solo para la tarjeta del capítulo en Portafolio. Si está vacía, se usa la de `portada/`.
- `capitulos/<capítulo>/proyectos/<proyecto>/` → una carpeta por proyecto, con estas subcarpetas:

| Subcarpeta | Qué va ahí |
|---|---|
| `portada/` | La foto de portada del proyecto (tarjeta y encabezado de su página). |
| `celular/` | Pantallas de app. Si el archivo ya es un mockup con fondo transparente (PNG o WebP con el celular incluido), se muestra tal cual; si es una pantalla sola, la página le pone el marco del celular. |
| `instagram/` | Posts, carruseles y stories. Para varios posts, crea una subcarpeta por post (`post-1/`, `post-2/`...): cada uno es un carrusel. |
| `grilla/` | La grilla del feed, entera y con su sombra. Si viene en varios pedazos, se pegan en orden (01, 02, 03…) como un solo feed. |
| `edicion-2/` | Una segunda edición del proyecto: dentro lleva sus propias `instagram/` (con `post-1/`, `post-2/`…), `afiches/` y `grilla/`. Se muestra como bloque "Segunda edición" después de la primera (`edicion-3/` funciona igual). |
| `moodboard/` | Propuestas de concepto (moodboards): se muestran como "Decisión creativa", arriba del contenido. La **última** es la elegida. |
| `presentacion/` | Láminas o diapositivas (ppt). |
| `afiches/` | Afiches y volantes en un slider (con flechas), cada uno en su proporción. |
| `web/` | Sitio web en un slider. Si el archivo ya es un mockup de computador con fondo transparente, se muestra tal cual; si es una captura sola, la página le pone el computador. |
| `visual/` | Todo lo demás: marca, eventos, impresos. Si hay **una sola foto**, se muestra entera arriba de la página (por ejemplo un collage ya armado). Con 8 o más fotos se arma solo un mosaico pegado. |
| `diario/` | El "Visual Diary" del final de la página: todas las fotos **y videos** (mp4) pegados en un collage, cada uno con su proporción. |

Usa solo las subcarpetas que apliquen a cada proyecto. La columna "Llenar primero" dice la principal según el tipo de página del proyecto.

Otras carpetas de Portafolio: `portada-carpeta/` (las 8 fotos de la carpeta del encabezado), `viajando-por-el-mundo/` (el collage de viajes) y `fotos-anteriores/` (fotos de la versión anterior; se pueden borrar cuando ya no hagan falta).

### 01-nomadher  (NomadHer)

| Proyecto | Carpeta | Llenar primero |
|---|---|---|
| Rediseño de la app | `nomadher-app` | `celular/` |
| Marca aplicada | `applied-brand` | `visual/` |
| Creator Call con JAL | `jal-nomadher` | `instagram/` |
| Contenido para Instagram | `instagram-content` | `instagram/` |
| Bloggers Program | `bloggers-program` | `instagram/` |
| Business decks | `business-decks` | `presentacion/` |
| Rediseño del website | `website-redesign` | `celular/` |
| Lounge: la ciudad como sala (dentro de nomadher-app) | `city-lounge` | `celular/` |
| Travel Buddy: de la pantalla al encuentro (dentro de nomadher-app) | `travel-buddy-meetups` | `celular/` |
| Niveles, badges y perks: reconocer a la comunidad (dentro de nomadher-app) | `levels-badges-perks` | `celular/` |
| She Can Travel Anywhere Seúl (dentro de applied-brand) | `she-can-travel-anywhere-seoul` | `visual/` |
| She Can Found Anywhere (dentro de applied-brand) | `she-can-found-anywhere` | `visual/` |
| She Can Create Anywhere (dentro de applied-brand) | `she-can-create-anywhere` | `visual/` |
| Wellness Creator Trip (dentro de applied-brand) | `wellness-creator-trip` | `visual/` |
| Campañas con partners (dentro de applied-brand) | `partner-campaigns` | `visual/` |

### 02-boost-lab  (BOOST LAB)

| Proyecto | Carpeta | Llenar primero |
|---|---|---|
| Global Youth: Women's Entrepreneurship Summit | `global-youth-summit` | `visual/` |
| Sejong Global Idea Hackathon | `sejong-hackathon` | `visual/` |
| Misiones Internacionales | `misiones-internacionales` | `visual/` |
| Seoul Women Entrepreneur Summit | `seoul-women-entrepreneur-summit` | `visual/` |
| Seoul Entrepreneur Summit | `seoul-entrepreneur-summit` | `visual/` |
| Ruta 8 | `ruta-8` | `visual/` |
| Seoul Wellness Workshop | `seoul-wellness-workshop` | `visual/` |
| Youth Future Talent | `youth-future-talent` | `visual/` |
| Talleres BOOST LAB | `boost-lab-workshops` | `visual/` |

### 03-independiente  (Diseño independiente)

| Proyecto | Carpeta | Llenar primero |
|---|---|---|
| Opuesto SAS | `opuesto-sas` | `visual/` |
| Brújula Ética | `brujula-etica` | `visual/` |
| Cooperativa Teampreneurship | `teampreneurship-cooperative` | `visual/` |

### 04-n9ne  (N9NE)

| Proyecto | Carpeta | Llenar primero |
|---|---|---|
| NOBLED Specialty Coffee | `nobled-coffee` | `visual/` |
| Eat's Real | `eats-real` | `visual/` |
| Hola Guesthouse | `hola-guesthouse-jeju` | `visual/` |

### 05-ironhack  (Ironhack) y 06-travelling-university  (Travelling University)

Estos dos capítulos no tienen proyectos: el caso vive en la misma página del capítulo.
Se llenan dos carpetas, directamente dentro del capítulo:

| Carpeta | Para qué |
|---|---|
| `portada/` | La foto grande de arriba de la página. |
| `destacada/` | Foto(s) que van grandes, de lado a lado, antes del Overview. |
| `visual/` | Collage del caso. Con 7 fotos: 01-03 arriba (anchas), 04-05 abajo a la izquierda (verticales, lado a lado), 06-07 abajo a la derecha (apiladas). Con 8 o más, las primeras 8 forman una cuadrícula arriba y el resto va en columnas. |
| `presentacion/` | Diapositivas de una presentación, con flechas para pasarlas. |
| `instagram/` | Un post completo de Instagram (la primera pieza grande y el resto apiladas). |

## 3. Sobre mí (`public/sobre-mi/`)

Todo viene de Figma y ya está armado: **no lo toques**.

## 4. Contacto (`public/contacto/`)

`anillo-de-fotos/` son las 14 fotos del círculo de la página de Contacto. El resto viene de Figma.

## 5. Compartido (`public/compartido/`)

| Carpeta | Qué va ahí |
|---|---|
| `marcas/` | Los logos de "Marcas con las que he colaborado". Lo que pongas aquí aparece solo en el carrusel. |
| `maleta/` | Los objetos de "¿Qué llevo en mi maleta?". |
| `retratos/` | Tus retratos y la foto del formulario "Tomémonos un café". |
| `logos-herramientas/` y `logos-habilidades/` | Logos de herramientas (Figma, Notion, etc.). |

## Fuera del proyecto: tu biblioteca de originales

`../portfolio-photos/` (junto a esta carpeta) guarda tus fotos originales por capítulo. **No está conectada al sitio:** para usar una foto, cópiala a la carpeta que toca de `public/`.

## Después de cambiar textos

Los textos de capítulos y proyectos están en `content/source/es/` y `content/source/en/`. Tras editarlos, pídele a Claude que regenere el sitio, o corre `npm run content`.
