# About Skills Logos and Metadata Design

## Scope

Implement the approved About-page changes without changing shared tool rows or unrelated sections:

- Restore the eight tool logos above the Skills content in the order shown in Figma.
- Keep the logo row static and centered on desktop.
- Animate it as a seamless horizontal marquee below the desktop breakpoint.
- Replace the About hero paragraph with a short localized tagline.
- Reuse the former hero paragraph as the localized About-page meta description.

## Skills logo row

Create a dedicated `SkillsLogoMarquee` component rather than changing `AppSwatchRow`, which is shared by other routes. It will reuse the existing local logo assets from `content/about.ts` and order them as Figma, ManyChat, Photoshop, CapCut, Framer, Illustrator, Canva, and Notion.

At `lg` and above, render a single centered 954px row with eight 72px rounded chips and 54px gaps. Below `lg`, render two identical groups in one track so a CSS translation can loop continuously without a visible jump. The duplicate group is hidden from assistive technology. Under `prefers-reduced-motion: reduce`, disable the animation and allow horizontal manual scrolling.

The row will sit 73px from the top of the desktop Skills section. The existing Skills content will retain its current 252px top position by replacing the former padding with the logo height and the remaining measured gap.

## Hero copy and metadata

Add a localized `aboutHeroTagline` content value:

- English: `Innovation, creativity and action`
- Spanish: `Innovación, creatividad y acción`

`AboutHero` will render this value. The existing `professionalPositioning` content remains unchanged and becomes the locale-specific `description` returned by the About route's `generateMetadata`. The page will also expose that description through Open Graph metadata.

## Verification

Add source-level regression tests for the logo order, responsive animation contract, hero tagline, and metadata wiring. Then run the complete Node test suite, TypeScript, lint, production build, and desktop/mobile browser checks for layout, animation, visible copy, and generated meta descriptions.
