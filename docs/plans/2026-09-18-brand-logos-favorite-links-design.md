# Brand Logos and Favorite Project Links Design

## Goal

Align the Spanish and English home page with the section copy by showing brand logos in the existing marquee, and make every favorite-project title navigate to its matching project page.

## Marquee

Keep `FeatureProjectsMarquee` in its current home-page position and preserve its heading, spacing, edge mask, animation duration, hover pause, tile dimensions, and responsive behavior. Resolve the existing images in `public/shared/brands` through `listPhotos("shared/brands")`, duplicate that list for the seamless loop, and render each image with `object-contain` inside the existing neutral cards. The decorative logos use empty alt text; the section heading already provides the context. The existing `items` prop remains accepted so the dirty home-page call site does not need to be changed or merged over.

## Favorite project links

Represent favorite projects as localized records with a canonical `/work/<slug>` route. Render every record with the locale-aware `Link` helper. The Global Youth title remains visually split across two lines, but both lines are one link and one accessible click target. Add a restrained underline/opacity hover transition plus a visible keyboard focus ring without changing typography, ordering, alignment, or responsive spacing.

## Verification

Add source-level regression assertions for the logo source, contained image treatment, duplicate-list accessibility, all canonical favorite-project routes, the single two-line Global Youth link, and hover/focus classes. Run focused tests first, then the full test suite, typecheck, lint, production build, and a browser check at `/es` for layout, links, hover, focus, and animation.
