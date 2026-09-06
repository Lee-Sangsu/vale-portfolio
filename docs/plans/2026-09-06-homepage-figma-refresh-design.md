# Homepage Figma Refresh Design

## Goal

Bring the homepage hero and the next two content sections in line with Figma nodes `507:125`, `489:862`, and `489:847`, while retaining locale support, working links, and category selection behavior.

## Structure

The page keeps `HomeHero` first. A new localized `HomeAboutHero` section follows the existing community strip, and `CategoryShowcase` moves below it. Later homepage sections remain in their current order.

## Hero

- Move Creative Services and Let's Collab farther from the portrait on desktop.
- Use the Figma palette: pink CV, dark-blue Creative Services, lime Let's Collab, wine Strategic Consult, and light-blue title highlight.
- Change the English heading to “Hi I'm Valeria” and use the supplied English introduction verbatim. Keep an equivalent Spanish presentation for `/es`.

## About section

Create a server component matching the responsive two-column layout in node `489:862`: large heading and two paragraphs on the left, social links below, and the exported Figma portrait on the right. Stack the layout on narrow screens.

## Category showcase

Adapt the existing client component to node `489:847`: large heading and introduction, four always-visible category rows, a lime CTA, and a three-card overlapping image fan. Category buttons remain interactive and update which project image is emphasized. Remove the separate project-card grid because the Figma composition represents those projects in the overlapping fan.

## Verification

Add source-level regression tests for copy, component ordering, palette, responsive structure, local assets, and retained category interaction. Run the focused tests, full Node test suite, lint, typecheck, production build, and browser screenshots at desktop and mobile widths.
