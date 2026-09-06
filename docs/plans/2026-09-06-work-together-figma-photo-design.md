# WorkTogether Figma Photo Design

## Goal

Use the image from Figma node `543:257` in every `WorkTogether` section and place the hand badge over the photo's bottom-right corner.

## Design

`WorkTogether` will own one committed image asset at `/shared/portraits/work-together.png`. The component's `photo` prop will be removed so every instance renders the same approved image, and existing call sites will be simplified to `<WorkTogether />`.

The existing photo dimensions, rounded corners, shadow, crop behavior, form content, colors, and submission behavior remain unchanged. Only the image source and the badge's horizontal anchor change; the badge keeps its current bottom offset and switches from `-left-5` to `-right-5`.

## Verification

A focused source-level regression test will assert the shared asset path, the bottom-right positioning, and the absence of per-page photo overrides. Type-checking, linting, asset verification, a production build, and browser screenshots of representative desktop and mobile routes will verify integration and layout.
