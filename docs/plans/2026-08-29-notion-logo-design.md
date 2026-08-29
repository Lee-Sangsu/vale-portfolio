# Notion logo correction

## Goal

Replace the incorrect CapCut image shown for the Notion tool with Notion's standard black-and-white app mark.

## Design

Keep `AppSwatchRow` unchanged. It already renders each tool from `src/content/about.ts`, so the correction is limited to the Notion asset and its referenced path. The existing image dimensions, accessible label, tile, hover treatment, and all other tool icons remain unchanged.

## Verification

Add a focused content test that asserts the Notion tool points to the dedicated Notion asset, then visually inspect the specified work route.
