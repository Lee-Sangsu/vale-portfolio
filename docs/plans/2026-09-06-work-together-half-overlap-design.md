# WorkTogether Half-Overlap Badge Design

## Goal

Place the WorkTogether hand badge over the photo's bottom-left corner with exactly half of the badge overlapping the image in both dimensions.

## Design

Keep the existing `Image` configuration (`fill` and `object-cover`) so the approved photo continues to fill its fixed, rounded frame. Anchor the badge at `left-0 bottom-0`, then apply `-translate-x-1/2 translate-y-1/2`. This percentage-based positioning responds automatically to the current 72px mobile and 83px desktop badge sizes.

No form, copy, color, image asset, or page-level behavior changes are in scope.

## Verification

Update the existing WorkTogether source-level regression test to require the new bottom-left anchor and both transforms. Run the focused test, type-check, lint, build, and desktop/mobile browser checks.
