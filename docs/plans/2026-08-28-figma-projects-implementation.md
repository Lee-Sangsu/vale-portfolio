# Figma Projects Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Match the Projects page hero and chapter browsing experience to Figma while adding functional, accessible category filters.

**Architecture:** Keep locale and asset selection on the server page. Pass a localized, serializable chapter-card model to a small client component that owns the selected category and renders the Figma-style cards. Use the existing project image manifest and local Figma-exported folder asset for stable imagery.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS 4, next-intl, Node test runner.

---

### Task 1: Define and test category filtering

**Files:**
- Create: `src/lib/project-categories.ts`
- Create: `tests/project-categories.test.mjs`

**Step 1: Write the failing test**

Cover these behaviours: `Capítulos` returns every chapter; each discipline returns only cards with that deliberate category; the mapping places NomadHer in UX/UI, Marketing y contenido, and Estrategia; unknown selections return no cards.

**Step 2: Run test to verify it fails**

Run: `node --test tests/project-categories.test.mjs`

Expected: FAIL because `project-categories.ts` does not exist.

**Step 3: Write minimal implementation**

Export category IDs, localized labels, a `CHAPTER_CATEGORIES` mapping keyed by `ChapterId`, and a pure filter helper. Assign categories from chapter intros and project lists, not runtime keyword matching.

**Step 4: Run test to verify it passes**

Run: `node --test tests/project-categories.test.mjs`

Expected: PASS.

**Step 5: Commit**

Stage only `src/lib/project-categories.ts` and `tests/project-categories.test.mjs`, then commit with `feat: add project category filtering`.

### Task 2: Build the interactive Figma-style card grid

**Files:**
- Create: `src/components/site/ProjectChapterGrid.tsx`
- Modify: `src/app/[locale]/projects/page.tsx:1-300`
- Test: `tests/project-categories.test.mjs`

**Step 1: Write the failing test**

Extend the fixture test so selecting `design` returns Independent design and N9NE, while selecting `chapters` retains fixture order.

**Step 2: Run test to verify it fails**

Run: `node --test tests/project-categories.test.mjs`

Expected: FAIL because the new filtering contract is not yet represented.

**Step 3: Write minimal implementation**

Create a `"use client"` grid that renders semantic filter buttons with `aria-pressed`, then the Figma card anatomy: 300px cover, card title, date/location, chapter intro, and dark rounded project pills. Update the server page to construct cards from existing chapters, covers, links, and localized intros, then render the grid in place of the old `ul`.

**Step 4: Run test to verify it passes**

Run: `node --test tests/project-categories.test.mjs`

Expected: PASS.

**Step 5: Commit**

Stage only the grid component, projects page, and tests, then commit with `feat: add filterable figma project cards`.

### Task 3: Recreate the folder hero and remove the legacy favourites grid

**Files:**
- Modify: `src/app/[locale]/projects/page.tsx:185-350`
- Add: `public/assets/pages/projects/hero-folder.svg`
- Modify: `tests/public-assets-and-projects-pile.test.mjs`

**Step 1: Write the failing test**

Extend the projects-page source test to require the stable folder asset, folder hover classes, reduced-motion safeguards, and absence of the old favourites heading.

**Step 2: Run test to verify it fails**

Run: `node --test tests/public-assets-and-projects-pile.test.mjs`

Expected: FAIL because the page does not yet use the Figma folder asset or remove the favourites section.

**Step 3: Write minimal implementation**

Download the folder SVG surfaced by Figma and commit unmodified bytes. Position it behind the existing photo stack, preserve the location label and year badge, add subtle hover translate/scale plus reduced-motion safeguards, and delete only the old favourites section.

**Step 4: Run test to verify it passes**

Run: `node --test tests/public-assets-and-projects-pile.test.mjs`

Expected: PASS.

**Step 5: Commit**

Stage only the hero asset, projects page, and test, then commit with `feat: align projects hero with figma`.

### Task 4: Verify the complete page

**Files:**
- Verify only.

**Step 1: Run targeted tests**

Run: `node --test tests/project-categories.test.mjs tests/public-assets-and-projects-pile.test.mjs`

Expected: PASS.

**Step 2: Run static verification**

Run `npm run typecheck`, `npm run lint`, and `npm run build` separately.

Expected: all commands succeed.

**Step 3: Run browser verification**

Open `/es/projects` and verify folder hover movement, category filtering, card links, responsive layout, and removal of the favourites grid.
