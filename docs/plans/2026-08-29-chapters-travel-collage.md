# Chapters Travel Collage Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add the Figma travel-photo collage above the Projects page’s Chapters heading without changing the existing grid or localized copy.

**Architecture:** Keep the Projects page as a Server Component and render the decorative collage directly in its chapters section. Store the three source images from the referenced Figma node in `public/pages/projects/figma/` and resolve them through the existing `encodeAsset` helper, so the deployed site does not depend on expiring Figma URLs.

**Tech Stack:** Next.js App Router, React Server Components, TypeScript, Tailwind CSS v4, Node’s built-in test runner.

---

### Task 1: Add an automated source-level regression test

**Files:**
- Create: `tests/projects-chapters-travel-collage.test.mjs`

**Step 1: Write the failing test**

Assert that `src/app/[locale]/projects/page.tsx` includes the three committed collage assets, the localized travel caption, and the collage before the `Capítulos` / `Chapters` heading.

**Step 2: Run test to verify it fails**

Run: `node --test tests/projects-chapters-travel-collage.test.mjs`

Expected: FAIL because the collage and asset references are absent.

### Task 2: Commit the Figma source assets

**Files:**
- Create: `public/pages/projects/figma/chapters-travel-1.jpeg`
- Create: `public/pages/projects/figma/chapters-travel-2.jpeg`
- Create: `public/pages/projects/figma/chapters-travel-3.jpeg`

**Step 1: Download exact Figma image bytes**

Save the three images surfaced by Figma’s design context using the supplied asset URLs. Do not hand-draw substitute images.

### Task 3: Render the responsive collage

**Files:**
- Modify: `src/app/[locale]/projects/page.tsx:20-25`
- Modify: `src/app/[locale]/projects/page.tsx:304-314`

**Step 1: Add a local asset resolver**

Resolve the three committed travel photos using the established `encodeAsset` pattern.

**Step 2: Add the collage above the existing heading**

Render a centered, fixed-ratio composition with three `next/image` photos, matching Figma’s rotations, white location stickers, caption, and accent-colored handle. Scale the composition down on narrow screens; keep the existing Chapters heading, description, and grid unchanged.

**Step 3: Verify the test passes**

Run: `node --test tests/projects-chapters-travel-collage.test.mjs`

Expected: PASS.

### Task 4: Verify the route and quality gates

**Files:**
- Verify only: `src/app/[locale]/projects/page.tsx`

**Step 1: Run static checks**

Run: `npm run typecheck && npm run lint && npm run build`

Expected: all commands exit successfully.

**Step 2: Inspect the rendered route**

Run the local server and capture `/es/project` at desktop and mobile widths. Confirm the collage is immediately above the Chapters heading, has no horizontal overflow, and leaves the grid and its labels intact.
