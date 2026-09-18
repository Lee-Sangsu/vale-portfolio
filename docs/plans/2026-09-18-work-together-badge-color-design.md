# WorkTogether Badge Color Design

## Goal

Change the WorkTogether hand badge from black to the exact approved color `#7B173B` without altering its layout or behavior.

## Design

Use the component-local Tailwind arbitrary color utility `bg-[#7B173B]`. A shared color token would broaden this one-off change unnecessarily. Preserve the badge position, dimensions, emoji, rounding, shadow, responsive sizing, photo, form, and mailto behavior. Update the nearby source comment and existing regression test so they describe and enforce the approved burgundy color.

## Verification

Run the focused badge regression test red before the component change and green afterward. Then run the full Node test suite, lint, typecheck, production build, and inspect the rendered badge color in the local browser.
