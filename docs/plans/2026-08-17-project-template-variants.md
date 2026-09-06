# Project Template Variants Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Render each featured project with the Figma template that matches its discipline while preserving the site's existing content and navigation.

**Architecture:** Add a small, typed resolver that maps featured project slugs to the UX/UI, campaign/brand, or marketing/social template. Refactor the work-detail route into shared sections plus three visual hero/gallery variants, all driven by the existing `Hero` content and photo manifest. Keep the projects index as the stable entry point and make its featured cards point to those detail routes.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS 4, Node's built-in test runner.

---

### Task 1: Define template selection

**Files:**
- Create: `src/lib/project-template.js`
- Create: `tests/project-template.test.mjs`

**Step 1: Write the failing test**

Assert that `nomadher-app` selects `ux-ui`, `jal-nomadher` selects `marketing-social`, and the three BOOST LAB project slugs select `campaign-brand`.

**Step 2: Run test to verify it fails**

Run: `node --test tests/project-template.test.mjs`

Expected: FAIL because the resolver module does not exist.

**Step 3: Write minimal implementation**

Export `getProjectTemplate(slug)` from the resolver and return the intended template key for each featured project.

**Step 4: Run test to verify it passes**

Run: `node --test tests/project-template.test.mjs`

Expected: PASS.

### Task 2: Implement the three Figma page variants

**Files:**
- Modify: `src/app/[locale]/work/[slug]/page.tsx`

**Step 1: Adapt the existing generic detail renderer**

Use the resolver to choose the hero treatment, media composition, and project-specific showcase while retaining the localized data, shared overview, footer, contact CTA, and responsive behavior.

**Step 2: Match the design groups**

- UX/UI: overlapping device-style artwork, title/description split, purpose strip, and visual diary.
- Campaign/brand: three-image editorial hero, visual-identity feature panel, and content gallery.
- Marketing/social: centered title, project rosette, three-card overview, and social-media showcase.

**Step 3: Verify static rendering**

Run: `npm run typecheck`

Expected: PASS.

### Task 3: Align the projects index with the detail variants

**Files:**
- Modify: `src/app/[locale]/projects/page.tsx`

**Step 1: Verify featured project links**

Ensure each primary card uses its localized `/work/[slug]` route so the matching template is reachable from the portfolio index.

**Step 2: Verify quality gates**

Run: `node --test tests/project-template.test.mjs`, `npm run lint`, `npm run typecheck`, and `npm run build`.

Expected: all commands exit successfully.
