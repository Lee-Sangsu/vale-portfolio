# Projects hero interaction alignment

## Scope

Refine only the `/[locale]/projects` portfolio-folder hero and the chapter filter controls. Preserve the existing route, content, category filtering, and project-card behavior.

## Approved design

- Recreate the Figma folder composition as eight independently positioned cards: the existing large photographs plus the smaller cards and the green accent card shown in the reference frame.
- The black folder and surrounding badge/location labels remain stationary on hover.
- Hovering the folder triggers small, staggered transforms on each photo card so it appears to pop out of the folder. `prefers-reduced-motion` keeps the composition static.
- Reduce the category chips and bring the card grid closer to the filter row while retaining button semantics, focus behavior, and horizontal scrolling on narrow viewports.

## Implementation notes

Keep the hero composition data on the server page as an ordered array of asset, dimensions, layering, static placement, and hover transform classes. Use explicit `group-hover` classes per card rather than a transform on the enclosing collage. Continue using locally stored assets; do not leave temporary Figma asset URLs in committed source.

## Verification

Add a focused source-level regression test for the eight-card composition and per-card hover behavior, then run the relevant Node tests, typecheck, lint, production build, and a browser check of `/es/projects`.
