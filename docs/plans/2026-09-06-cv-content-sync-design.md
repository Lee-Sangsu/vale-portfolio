# CV Content Sync Design

## Objective

Use the latest Spanish and English CV frames in Figma as the authoritative source for Valeria's professional details while preserving the portfolio website's existing visual identity and responsive behavior.

## Source of truth

- Latest Spanish frames: Figma nodes `489:162` and `489:277`.
- Latest English frames: Figma nodes `511:2` and `511:32`.
- Existing website components and tokens remain the visual source of truth.

## Approach

The update will synchronize biography, positioning, roles, dates, capabilities, tools, education, thesis, languages, recognitions, and selected verified metrics from the CV into reusable bilingual content. Existing page composition, navigation, portfolio chapters, imagery, and interaction patterns remain intact.

The About page will gain one compact credentials section for information not currently represented elsewhere. It will use the site's existing typography, borders, colors, and responsive spacing rather than imitate the A4 CV layout.

## Content architecture

- Keep shared bilingual profile data in `src/content/about.ts`.
- Render professional positioning through the existing About hero, skills, and journey components.
- Add a dedicated credentials component consuming structured education, recognition, language, and tool data.
- Update chapter summaries only where the latest CV supplies clearer or more current facts.
- Avoid duplicating long CV bullet lists across multiple pages.

## Responsive behavior

- Mobile remains single-column with readable line lengths and touch-safe spacing.
- Credential groups stack on small screens and form a balanced grid at larger breakpoints.
- Long English and Spanish labels wrap naturally without fixed heights.
- Existing responsive hero, navigation, and portfolio layouts are not restructured.

## Accessibility and quality

- Use semantic headings and lists for credentials.
- Preserve keyboard and screen-reader behavior of existing interactive components.
- Verify both locales at mobile and desktop widths.
- Add focused regression tests for bilingual source content and responsive class contracts, then run the full test, typecheck, lint, and production build suites.
