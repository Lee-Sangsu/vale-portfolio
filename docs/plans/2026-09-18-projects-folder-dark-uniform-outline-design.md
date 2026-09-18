# Projects Folder Dark Uniform Outline Design

## Scope

Refine only the large translucent folder in the projects hero. Preserve the photo pile, hover hinge, rotation, layering, year badge, metadata card, responsive sizing, and all unrelated page behavior.

## Approved visual treatment

- Darken both the rear folder panel and the hinged front flap with the same deeper translucent neutral gray.
- Remove the raised folder tip/tab from the front flap.
- Remove the two custom top-outline fragments that existed only to frame that tab.
- Give the front flap one continuous single-pixel border so the top, right, bottom, and left edges have identical width and color.
- Keep the rear panel's existing continuous single-pixel border.

## Considered approaches

1. **Shared darker translucent treatment with a continuous border — selected.** This preserves depth and photo visibility while directly fixing the uneven outline.
2. Use an opaque dark gray. This would hide too much of the underlying collage and change the established layered aesthetic.
3. Darken only the front flap. This would make the two halves read as mismatched materials.

## Verification

Update the source-level regression test to require the shared darker fill, absence of the tab and split outline nodes, and one continuous front-flap border. Run the focused test, the full test suite, typecheck, lint, production build, and visually inspect `/es/projects` at desktop and mobile widths.
