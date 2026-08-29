# My Story Collage Design

## Goal

Replace the generic four-card photo grid in the About page's `MyStory` section with the Figma-approved editorial collage, using the exact image assets exported from node `543:305`.

## Confirmed design

- Desktop uses the 1710 × 1219 Figma composition: black background, centred icon, 48px title, 18px story copy, and seven deliberately clipped overlapping photographs.
- The title and copy stay localized through the existing `locale` prop and `aboutLong` content source.
- Each Figma source image is downloaded into `public/pages/about/figma/` rather than using short-lived Figma URLs.
- On narrow screens, the title and body remain first; the same seven images become a controlled two-column collage with the primary portrait retained as the visual anchor. Decorative overflow is clipped to the section.

## Constraints

- Modify only `MyStory` and its directly required test and asset files.
- Preserve the About page call site and all content/localization behavior outside this section.
- Keep static image rendering through Next.js `Image` with explicit layout containers and responsive `sizes`.
