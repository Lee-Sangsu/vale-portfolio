# About Skills iPod and Journey Spacing Design

## Scope

Rebuild the About Skills section from Figma node `514:73`, restoring the interactive iPod composition that was removed when the section was previously implemented from node `543:230`. Correct the desktop horizontal padding of the following Journey section using its Figma node `543:316`. Preserve the existing logo marquee behavior, bilingual routes, Journey content, links, and all unrelated About-page sections.

## Root cause

The current Skills implementation follows an older alternate node that intentionally excluded `IpodCard`, used a 48px desktop heading, and placed its content inside a centered 1140px container. The requested Figma node contains a 64px heading, different introductory copy, a compact iPod with five chrome stars, and a 1076px desktop reference width. The same 1140px container in Journey shifts its Figma content 32px left at a 1536px viewport.

## Skills composition

At wide desktop sizes, use a 1000px-tall section and a centered 1076px reference container. Keep the tool row at 73px from the section top. Place the Skills heading at 252px, use Figma's 64px desktop type, and reproduce the exact intro, four skill rows, dividers, and language footer. Position the iPod group to the right according to the Figma geometry.

Below the wide-desktop breakpoint, retain the existing horizontally animated logo row and pause control. Flow the heading, skill list, and iPod vertically so tablet and mobile layouts do not crop or hide the iPod. The iPod remains interactive on every viewport.

## Interactive iPod

Reuse the existing `IpodCard` state and controls, but restyle the shell to the Figma's 160×311px body, 82px screen, and 118px click wheel. The screen shows the current track in the compact Figma display. Menu returns to the first track; previous, next, play, and center controls continue changing the selection. Reuse the committed click-wheel SVGs and chrome-star PNG. Respect reduced-motion preferences by disabling continuous star rotation while keeping the controls usable.

The caption uses the Figma copy in each locale and explains that a song can be selected.

## Journey spacing

Keep the Journey section's existing 900px desktop height and internal vertical coordinates. Change its wide-desktop reference width from 1140px to 1076px so the heading begins at Figma's 230px coordinate and the portrait aligns with the reference. Below the wide-desktop breakpoint, retain the existing responsive flow and padding.

## Verification

Add regression coverage for the iPod's presence, interactive controls, exact Skills typography/copy/geometry, shared 1076px desktop alignment, and reduced-motion behavior. Run the focused and full Node suites, typecheck, lint, asset verification, production build, and browser checks at 1536px, tablet, and mobile widths. Confirm the iPod controls change the active track and that neither section creates horizontal page overflow.
