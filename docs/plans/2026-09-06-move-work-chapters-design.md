# Move Work Chapters Design

## Goal

Move the existing Work Chapters section below the “I design for” section on the localized homepage.

## Structure

Keep every homepage section and all existing props unchanged. In `src/app/[locale]/page.tsx`, move the existing `<WorkChapters>` block from before `FeatureProjectsMarquee` to immediately after the “Designing for” `<section>` and before `LogoMarquee`.

## Behavior

The Work Chapters accordion, localization, imagery, links, and animations remain unchanged. The only user-visible change is the section’s vertical position on both `/en` and `/es`.

## Verification

Add a source-order regression assertion, run the focused Node test, then run lint, typecheck, the production build, and a browser check of `/en`.
