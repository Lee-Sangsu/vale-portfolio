# Home Visual Feedback Design

## Goal

Apply three confirmed homepage feedback items without changing surrounding content or interactions:

- vertically center the favorite-project list on desktop and add spacing between project names;
- change the WorkTogether hand badge background from green to black;
- make CategoryShowcase photos non-clickable while preserving category selection and the separate all-projects link.

## Design

`FavoriteProjects` keeps its existing responsive grid and mobile stacking. At the `lg` breakpoint, the grid will align both columns vertically at their centers instead of their starts. The project-name list will use a larger responsive `space-y` value so individual projects remain visually distinct.

`WorkTogether` keeps the badge size, position, emoji, shadow, and photo relationship. Only the badge fill utility changes to black.

`CategoryShowcase` keeps the three-photo fan, active-category image updates, responsive sizing, shadows, and image fade. Each project photo changes from a localized `Link` to a neutral `div`; link-specific accessibility labels, focus styles, hover lift, and hover zoom are removed so the photos no longer suggest navigation. The existing `/projects` call-to-action remains a `Link`.

## Verification

Source-level regression tests will cover the exact class and element contracts. Lint, TypeScript, the full Node test suite, and a production build will run before browser checks. Browser verification will inspect English and Spanish routes at desktop and mobile widths, including confirming that category photos are not anchors.
