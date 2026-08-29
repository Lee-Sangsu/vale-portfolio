# My Story Collage Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Match the About page's My Story section to Figma node `543:305`, including the exact photo set and a responsive mobile collage.

**Architecture:** Keep the server-rendered `MyStory` component and its existing localized copy. Replace only the photo layout with semantic image containers, preserve the current dot asset, and add seven immutable Figma exports under the existing `public/pages/about/figma/` convention. A source-level Node test guards the exact local-asset and responsive-layout contract.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS 4, next-intl, Node test runner.

---

### Task 1: Specify the Figma collage contract

**Files:**
- Create: `tests/my-story-collage.test.mjs`
- Modify: `src/components/site/about/MyStory.tsx`

**Step 1: Write the failing test**

Require seven durable local image paths in the existing Figma asset directory, the desktop artboard dimensions, mobile-specific layout classes, section clipping, and the existing locale-aware heading path.

**Step 2: Run test to verify it fails**

Run: `node --test tests/my-story-collage.test.mjs`

Expected: FAIL because the component still has the four-card `PHOTOS` grid.

**Step 3: Write minimal implementation**

Replace the grid with a named seven-image collage model. Keep the icon, heading, body content, and `id="story"`; add relative layout wrappers that follow the Figma placement on desktop and a two-column collage on mobile.

**Step 4: Run test to verify it passes**

Run: `node --test tests/my-story-collage.test.mjs`

Expected: PASS.

**Step 5: Commit**

Stage only `tests/my-story-collage.test.mjs` and `src/components/site/about/MyStory.tsx`, then commit with `feat: match my story collage to figma`.

### Task 2: Add exact Figma photo assets

**Files:**
- Create: `public/pages/about/figma/story-collage-*.png`
- Modify: `tests/my-story-collage.test.mjs`

**Step 1: Write the failing test**

Extend the collage test to verify that every named local Figma export exists.

**Step 2: Run test to verify it fails**

Run: `node --test tests/my-story-collage.test.mjs`

Expected: FAIL because the seven exports have not been committed locally.

**Step 3: Add exact assets**

Download the seven image URLs emitted by Figma node `543:305` without recompressing or altering their bytes. Save them with the names used by the component.

**Step 4: Run test to verify it passes**

Run: `node --test tests/my-story-collage.test.mjs`

Expected: PASS.

**Step 5: Commit**

Stage only the seven Figma exports and the test, then commit with `chore: add my story figma photo assets`.

### Task 3: Verify the completed section

**Files:**
- Verify only.

**Step 1: Run targeted test**

Run: `node --test tests/my-story-collage.test.mjs`

Expected: PASS.

**Step 2: Run static verification**

Run `npm run typecheck`, `npm run lint`, and `npm run build` separately.

Expected: all commands succeed.

**Step 3: Run browser verification**

Open `/es/about` at desktop and mobile widths. Confirm the local exports match the Figma collage, the copy is readable, no images leak outside the section, and the collage remains visually intentional on mobile.
