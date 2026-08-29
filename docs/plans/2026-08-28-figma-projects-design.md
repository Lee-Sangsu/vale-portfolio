# Figma projects page alignment

## Scope

Align the `/[locale]/projects` page with Figma node `656:272` while preserving the rest of the page and its routes.

## Design

- Rework the hero photo pile into a folder composition that holds the existing portfolio images. Hovering the group should lift and scale it subtly, while `prefers-reduced-motion` disables the motion.
- Replace the current chapter tiles with Figma-style two-column cards: 300px cover, descriptive card body, and pills. Keep existing chapter destinations.
- Introduce an accessible client-side category filter with `Capítulos`, `Diseño gráfico`, `UX/UI`, `Eventos`, `Marketing y contenido`, and `Estrategia`. `Capítulos` shows all cards; cards appear in every discipline that accurately describes their work.
- Remove the isolated `Proyectos favoritos` auto-grid section only.

## Data flow

The server page keeps locale resolution and chapter/cover lookup. It passes serializable card data plus a deliberate category mapping to a small client component, which owns selected-filter state and only filters the rendered cards.

## Verification

- Add a node test for category mapping and filter results.
- Run targeted tests, typecheck, lint, production build, and a browser check of the Spanish projects route.
