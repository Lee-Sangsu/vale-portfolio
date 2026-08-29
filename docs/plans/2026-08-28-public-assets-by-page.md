# Public Assets by Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the flattened Projects hero collage with individual project-photo cards and arrange public assets by the page or project that owns them.

**Architecture:** Page artwork moves to `public/pages/<page>/`; project photography moves to `public/work/<project-slug>/`; shared decorations, client marks, and tool marks move to `public/shared/`. All application references are updated to the corresponding encoded URLs, retaining the central manifest as the source of project-media paths.

**Tech Stack:** Next.js App Router, TypeScript, `next/image`, Tailwind CSS, Node test runner.

---

### Task 1: Guard the asset organization and custom photo pile

**Files:**
- Create: `tests/public-assets-and-projects-pile.test.mjs`
- Modify: `src/app/[locale]/projects/page.tsx`
- Modify: `src/content/photo-manifest.ts`

**Step 1: Write the failing test**

Assert the public tree has `pages`, `work`, and `shared` directories; the previous `public/photos`, `public/figma`, `public/Assets `, and `public/tools` directories do not exist; and the Projects page includes individual `portfolioPile` cards rather than `hero-pile.png`.

**Step 2: Run test to verify it fails**

Run: `node --test tests/public-assets-and-projects-pile.test.mjs`

Expected: FAIL because the legacy asset directories and flattened Projects hero remain.

**Step 3: Implement the smallest passing change**

Move assets, update paths, and compose the hero from five project-cover cards with `Image fill` inside relative frames.

**Step 4: Run test to verify it passes**

Run: `node --test tests/public-assets-and-projects-pile.test.mjs`

Expected: PASS.

### Task 2: Update application references

**Files:**
- Modify: every TypeScript/TSX source file referencing an old public URL

**Step 1: Update static URLs and resolver folder arguments**

Keep encoded asset handling and dynamic image listing intact while pointing each call site at the new page, work, or shared location.

**Step 2: Check for stale paths**

Run: `rg -n '(/photos/|/figma/|/Assets |/tools/|"photos/)' src`

Expected: no matches.

### Task 3: Verify visual and production behavior

**Files:**
- Test: `tests/public-assets-and-projects-pile.test.mjs`

**Step 1: Run automated checks**

Run: `node --test tests/*.test.mjs && npm run lint && npm run typecheck && npm run build`

Expected: all checks pass.

**Step 2: Run visual browser check**

Open the Projects route in a local browser, capture a screenshot, and confirm that all five hero photo cards load, are visibly layered, and the responsive hero remains readable.
