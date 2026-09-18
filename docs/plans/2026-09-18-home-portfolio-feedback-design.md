# Home and Portfolio Feedback Design

## Goal

Apply the outstanding annotated feedback without changing unrelated layout, copy, routes, or interactions.

## Confirmed baseline

- `CategoryShowcase` already renders its three photos as static, non-linked images; preserve it.
- The large projects hero folder is already darker, rotated by `-2deg`, and correctly layered around the photo pile; preserve it.
- The Chapters travel collage already uses `mx-auto`; preserve its centered placement.
- A later concurrent commit changed the WorkTogether hand badge back to burgundy, so this task will restore the requested black background.

## Changes

### WorkTogether hand badge

Keep the badge geometry, emoji, shadow, and overlap unchanged. Change only its background utility to `bg-black`.

### Brand logo marquee

Keep `FeatureProjectsMarquee` in its current home-page position and preserve its heading, spacing, edge mask, animation duration, hover pause, tile dimensions, and responsive behavior. Resolve the existing images in `public/shared/brands` through `listPhotos("shared/brands")`, duplicate that list for the seamless loop, and render each image with `object-contain` inside the existing neutral cards. The logos are decorative within the explicitly named brand section, so use empty alt text and hide the repeated moving strip from assistive technology. Keep accepting the current `items` prop so the home-page call site and its in-progress localized label remain untouched.

### Favorite Global Youth link

Treat `Global Youth:` plus the localized summit title as one project record and one locale-aware link to `/work/global-youth-summit`. Render the two title lines as block spans inside the same link. Add a restrained underline/opacity hover treatment and a visible focus ring. Leave every other favorite-project label as non-linked text and preserve ordering, typography, alignment, and spacing.

### Projects metadata folder

Adapt the Figma node `563:5` into the existing stack instead of pasting generated code or using expiring assets. Preserve the current burgundy color, copy, position, responsive text sizing, and separators. Add a compact top-right folder tab behind the main card, slightly rotate the full label, and keep it above the large folder/photo layers. Use CSS and existing Tailwind conventions because the reference vectors describe only the card silhouette and linework.

## Verification

Add source-level regression tests for each changed behavior, including negative assertions that protect the already-correct items. Run each focused test red then green, followed by the full Node test suite, TypeScript, ESLint, production build, and browser checks at `/es` and `/es/projects` on desktop and mobile widths.
