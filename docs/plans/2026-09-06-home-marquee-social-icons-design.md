# Home Marquee and Social Icons Design

## Goal

Apply the presentation of Figma node `507:174` to the existing featured-project marquee, place it directly below the “Designer in motion” section, and replace the temporary `IG`, `@`, and `in` labels with recognizable social icons.

## Scope

- Keep the existing featured-project data, links, marquee motion, localization, and surrounding homepage sections.
- Move `FeatureProjectsMarquee` from below `WorkChapters` to immediately after `HomeAboutHero`.
- Match the Figma section's white background, wide heading container, 48px desktop heading, 234×192px desktop cards, 12px corners, 22px track rhythm, and bottom-left white overlay text.
- Preserve responsive behavior by scaling typography and cards down on narrow screens while retaining horizontal motion and readable overlays.
- Keep the existing Instagram, email, and LinkedIn destinations and accessible labels, but render recognizable icon glyphs instead of letter placeholders.

## Component Approach

`FeatureProjectsMarquee` remains a reusable server component. Its public props and duplicated-list animation strategy stay unchanged; only its visual hierarchy and dimensions change. `HomeAboutHero` keeps the same markup and links, with small inline icon components so no new runtime dependency is required.

## Accessibility and Interaction

The marquee links keep their project titles as image alt text and visible labels. Duplicate marquee items remain hidden from assistive technology. Social anchors retain explicit `aria-label` values, visible focus rings, safe external-link attributes, and hover/focus feedback that does not shift surrounding layout.

## Verification

Add focused source-level regression tests for the homepage ordering, Figma-derived marquee geometry, preserved data flow, and icon markup. Then run the focused tests, full tests, lint, typecheck, production build, and desktop/mobile browser checks on `/en`.
