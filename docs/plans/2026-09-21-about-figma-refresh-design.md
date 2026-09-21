# About Figma Refresh Design

## Goal

Bring the About page's “My story” copy and “Sneak peek of my works” gallery in line with Figma nodes `523:1533` and `523:1480` while preserving all unrelated page behavior.

## Story section

Keep the existing responsive collage implementation and local imagery. Replace the short combined description with the three-paragraph narrative shown in Figma. The Spanish route uses the exact Figma copy; the English route uses a faithful translation. Bold emphasis is represented as structured localized segments so both languages retain the same editorial emphasis without embedding HTML strings.

## Sneak peek section

Replace the linked project-card carousel with six decorative Figma images. Desktop uses the node's varied widths, heights, five-pixel corner radius, shadow, and bottom alignment. Smaller viewports preserve the existing horizontal-scroll affordance, using fixed responsive card widths so the composition remains legible. The section heading and localization remain unchanged.

## Assets and accessibility

Download and commit the six exact Figma exports because temporary MCP asset URLs expire. The gallery is an editorial visual without captions or actions, so images use empty alt text and are grouped as decorative content. Existing story collage assets remain untouched.

## Verification

Add source-level regression tests for localized copy structure and the six-image gallery. Run the test through red/green, then typecheck, lint, build, and inspect `/en/about` and `/es/about` in a real browser at desktop and mobile widths.
