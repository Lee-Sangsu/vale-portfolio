# WorkTogether Route Copy Design

## Goal

Show the coffee invitation on general pages and reserve the work-together invitation for project and chapter detail pages.

## Design

`WorkTogether` will accept an optional `variant` prop with `"coffee"` as the default and `"detail"` as the only alternative. The component will select only its localized heading from that variant:

- General pages: `Tomémonos un café` in Spanish and `Let's grab a coffee` in English.
- Detail pages: `¡Trabajemos juntas!` in Spanish and `Let's work together` in English.

Only `src/app/[locale]/work/[slug]/page.tsx` and `src/app/[locale]/chapters/[slug]/page.tsx` will pass `variant="detail"`. Home, About, Contact, and Projects keep `<WorkTogether />`, so their route behavior remains the default. Existing subtitles, fields, placeholders, form submission, imagery, and styling remain unchanged.

## Verification

Extend the existing source-contract tests to assert both localized heading sets and the exact route split. Run the focused test before and after implementation, then run the full Node test suite, typecheck, lint, build, and browser checks on one general route and both detail route types in Spanish and English.
