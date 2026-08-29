# Chapter Detail Information Architecture Design

## Goal

Introduce a chapter-detail experience that translates the supplied Figma design into the correct portfolio level. A chapter communicates combined impact and responsibilities; an individual project remains a separate case study.

## Information architecture

```
/projects
├── chapter cards → /chapters/[slug]
│   └── impact, responsibilities, and projects in that chapter
└── discipline filters
    └── individual project cards → /work/[slug]
        └── project-specific case study
```

The new route will support the six chapters defined in the approved content document: NomadHer, BOOST LAB, Diseño independiente, N9NE, Ironhack, and Travelling University.

## Content model

Create a localized, data-driven chapter-details source. Each entry contains:

- title, date range, location, role, accent color, and cover image;
- chapter introduction sourced from the approved document;
- three or fewer impact metrics, using document evidence where provided;
- responsibility cards summarizing the chapter-level scope;
- project references pointing to existing `/work/[slug]` case studies when available;
- safe fallback project cards for chapter work that has not yet been modelled as an individual route.

Content must use the supplied Markdown document as its authority. It must not fabricate project outcomes. The English copy is initially duplicated from the Spanish source as requested in the document.

## Figma translation

The chapter route follows the supplied Figma frame rather than reproducing its NomadHer wording literally:

1. Full-bleed hero with cover image, dark readability gradient, overlaid navigation, chapter label, title, introduction, and date pill.
2. Accent-colour chapter introduction panel with chapter impact metrics.
3. Editorial responsibilities grid, populated by chapter data instead of NomadHer-only responsibilities.
4. “Projects from this chapter” rail of cards, linking to available individual case studies.
5. Existing contact and footer components.

The existing `SiteNav`, `WorkTogether`, `SiteFooter`, and local project images are reused. No temporary Figma asset URL will be committed.

## Responsive behavior

- Desktop follows the Figma’s generous 96px-scale gutters and two-column sections.
- Tablet collapses the hero and chapter panel to readable single-column flow.
- Mobile uses 20px gutters, fluid title sizing, stacked metrics and responsibility cards, and a touch-scroll project rail.
- Hero media has a fixed responsive height and `next/image` sizing to avoid layout shift.

## Routing and resilience

- Static params cover every locale and chapter slug.
- Unknown chapter slugs call `notFound()`.
- Missing cover/media falls back to the first available project image or an accent surface.
- Chapter project links are only emitted for known project routes; unmodelled work remains visible as non-linkable context cards.

## Verification

- Add focused tests for chapter data/route static params and chapter-card link destinations.
- Run the full Node test suite, typecheck, lint, and production build.
- Check the chapter page in a browser at desktop and mobile viewport sizes, including a chapter with rich results (NomadHer/BOOST LAB) and one with sparse source material (Ironhack).
