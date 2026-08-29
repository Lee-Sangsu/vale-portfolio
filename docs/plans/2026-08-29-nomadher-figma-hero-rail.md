# NomadHer Figma Hero and Rail Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Match the supplied Figma hero and six-card project rail for the NomadHer chapter without changing other chapter pages.

**Architecture:** Add the Figma hero sources and six rail images as immutable local assets. Extend the NomadHer chapter data to supply the six Figma cards, and add a NomadHer-only variant to the existing `ChapterProjectRail`; all other chapters continue rendering with the current generic rail and their existing content.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS v4, Node’s built-in test runner.

---

### Task 1: Add failing NomadHer source-contract tests

**Files:**
- Modify: `tests/chapter-page.test.mjs`
- Modify: `tests/chapter-project-rail.test.mjs`
- Modify: `tests/chapter-details.test.mjs`

**Step 1:** Assert the chapter page uses local Figma hero sources only for `nomadher`, and the rail receives its chapter identifier.

**Step 2:** Assert the rail exposes the Figma card structure and that NomadHer defines six cards.

**Step 3:** Run `node --test tests/chapter-page.test.mjs tests/chapter-project-rail.test.mjs tests/chapter-details.test.mjs` and confirm it fails before implementation.

### Task 2: Commit exact Figma assets locally

**Files:**
- Create: `public/pages/chapters/nomadher-hero-base.png`
- Create: `public/pages/chapters/nomadher-hero-overlay.png`
- Create: `public/pages/chapters/nomadher-project-01.png`
- Create: `public/pages/chapters/nomadher-project-02.png`
- Create: `public/pages/chapters/nomadher-project-03.png`
- Create: `public/pages/chapters/nomadher-project-04.png`
- Create: `public/pages/chapters/nomadher-project-05.png`
- Create: `public/pages/chapters/nomadher-project-06.png`

Download the exact image exports surfaced in Figma design context; do not use expiring remote URLs in application code.

### Task 3: Implement the NomadHer hero and project rail

**Files:**
- Modify: `src/app/[locale]/chapters/[slug]/page.tsx`
- Modify: `src/content/chapter-details.ts`
- Modify: `src/components/site/chapter/ChapterProjectRail.tsx`

**Step 1:** Select the two-layer Figma hero only when `slug === "nomadher"`; preserve the existing `detail.cover` fallback for every other chapter.

**Step 2:** Replace NomadHer’s project data with the six Figma card titles, categories, dates, descriptions, and local image paths. Preserve the two existing case-study destinations; leave Figma-only cards as non-links.

**Step 3:** Add a data-driven NomadHer rail variant that moves card copy above each image, uses the Figma card dimensions, pill styling, CTA treatment, and first-card lime surface. Preserve the current rail for non-NomadHer chapters.

### Task 4: Verify

**Files:**
- Verify only: changed page, rail, content, tests, and assets

Run the focused tests, full `node --test tests/*.test.mjs`, `npm run typecheck`, `npm run lint`, and `npm run build`. Inspect `/es/chapters/nomadher` at desktop and mobile widths, confirming the Figma hero and all six cards render without horizontal viewport overflow.
