# Figma Portfolio Content Sync Design

## Goal

Complete the empty and duplicated project and chapter content in the existing Figma portfolio without redesigning its visual system.

## Source of truth

The live portfolio content in `src/content/chapters.ts` and `src/content/chapter-details.ts` is authoritative for chapter names, dates, locations, introductions, responsibilities, metrics, projects, and links. Existing public project images are authoritative for cover imagery. Unsupported outcomes must not be invented.

## Scope

- Preserve the current portfolio and chapter compositions, typography, spacing, colors, card geometry, and navigation.
- Correct the six chapter cards to NomadHer, BOOST LAB, Independent Design, N9NE, Ironhack, and Travelling University.
- Replace missing chapter-card covers with relevant imagery already used by the live portfolio.
- Replace the duplicated BOOST LAB chapter placeholder with BOOST LAB content and imagery.
- Create content-complete chapter-frame variants for Independent Design, N9NE, Ironhack, and Travelling University by duplicating the existing chapter composition and changing only content-driven properties.
- Populate project rails with the project titles, labels, dates, descriptions, and images available in the live portfolio.
- Keep cards without a modeled case-study route as visual context rather than inventing destinations.

## Out of scope

- Rebuilding the design system or introducing new component variants.
- Changing the established art direction, layout, interaction model, or responsive strategy.
- Editing application code or changing live portfolio content.
- Fabricating metrics, project outcomes, clients, dates, or case studies.

## Quality checks

- Every chapter uses unique, correct content rather than copied NomadHer text.
- The portfolio index contains all six canonical chapters with real covers and consistent naming.
- Text remains within its existing bounds and no content overlaps or clips.
- Chapter frames retain the current structure and remain visually consistent with NomadHer.
- A final screenshot review verifies the index and every completed chapter frame.
