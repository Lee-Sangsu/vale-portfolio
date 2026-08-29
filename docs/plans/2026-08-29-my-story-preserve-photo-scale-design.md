# My Story collage: preserve photo scale

## Goal

Keep the desktop My Story section short while restoring the collage photos to their original Figma-scale dimensions. The complete collage should move upward as one layer and remain bottom-aligned with the section. The mobile layout must remain unchanged.

## Scope

- Change only the desktop (`lg`) photo-layer sizing and positioning in `MyStory`.
- Keep the short desktop content canvas at `1710 / 1000` so the section does not regain the removed empty space.
- Preserve the existing text, image assets, photo geometry, rotations, crops, and accessibility behavior.
- Leave the mobile grid and its responsive breakpoints untouched.

## Design

The desktop content canvas remains the 1000-unit-high frame that places the title and paragraph. Replace the photo layer's `inset-0` bounds with a separate, bottom-anchored `1710 / 1219` coordinate canvas. Each existing percentage-based photo frame will therefore calculate against its original height, retaining its intended dimensions. Its bottom anchor causes the full collage to rise above the shorter section; section overflow continues to trim the intended lower overhang at one shared bottom edge.

## Verification

- Update the source-level collage test to require the short outer canvas and restored, bottom-anchored photo canvas.
- Run the focused My Story test first, then the full test suite, lint, typecheck, and production build.
- Inspect `/en/about` at desktop and mobile widths to verify scale, common bottom edge, text layering, and unchanged mobile grid.
