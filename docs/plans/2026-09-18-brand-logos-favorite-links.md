# Brand Logos and Favorite Project Links Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Show real brand logos in the existing home marquee and turn every favorite-project title into an interactive project link.

**Architecture:** Keep both existing section components and the home-page call site stable. `FeatureProjectsMarquee` will resolve the repository's shared brand assets server-side, while `FavoriteProjects` will replace parallel locale string arrays with localized link records and render them through the existing locale-aware navigation helper.

**Tech Stack:** Next.js 16 App Router, React 19 server components, next/image, next-intl navigation, Tailwind CSS 4, Node test runner.

---

### Task 1: Render brand logos in the existing marquee

**Files:**
- Modify: `tests/home-marquee-social-icons.test.mjs`
- Modify: `src/components/site/FeatureProjectsMarquee.tsx`

**Step 1: Write the failing test**

Replace the project-card expectations with assertions that the component calls `listPhotos("shared/brands")`, duplicates `logos`, marks the second copy hidden using `logos.length`, renders empty alternative text, and applies `object-contain`. Preserve assertions for the existing section layout, dimensions, gap, mask, pause behavior, and duration variable.

**Step 2: Run the test to verify it fails**

Run: `node --test tests/home-marquee-social-icons.test.mjs`

Expected: FAIL because `FeatureProjectsMarquee` still duplicates `items`, renders links and project titles, and uses `object-cover`.

**Step 3: Write the minimal implementation**

Import `listPhotos` from `@/lib/photos`, resolve `shared/brands`, duplicate the resulting list, and render the existing tile shell with a contained decorative image. Keep accepting the current `items` prop for call-site compatibility, while no longer rendering project links or title overlays.

**Step 4: Run the focused tests**

Run: `node --test tests/home-marquee-social-icons.test.mjs tests/logo-marquee.test.mjs`

Expected: PASS.

**Step 5: Commit**

```bash
git add tests/home-marquee-social-icons.test.mjs src/components/site/FeatureProjectsMarquee.tsx
git commit -m "feat: show logos in home brand marquee"
```

### Task 2: Link every favorite project

**Files:**
- Modify: `tests/favorite-projects-section.test.mjs`
- Modify: `src/components/site/FavoriteProjects.tsx`

**Step 1: Write the failing test**

Assert that the component imports the locale-aware `Link`, includes exactly the five canonical project routes, renders one link per project record, keeps the Global Youth title as two spans within one link, and includes hover plus focus-visible styles.

**Step 2: Run the test to verify it fails**

Run: `node --test tests/favorite-projects-section.test.mjs`

Expected: FAIL because the current list renders standalone paragraphs without routes or interaction states.

**Step 3: Write the minimal implementation**

Replace the locale-keyed string arrays with five project records containing `href` and localized line arrays. Map the records to `Link` elements, render each line as a block span, and add underline/opacity hover plus focus-visible ring classes while preserving existing typography and layout classes.

**Step 4: Run the focused test**

Run: `node --test tests/favorite-projects-section.test.mjs`

Expected: PASS.

**Step 5: Commit**

```bash
git add tests/favorite-projects-section.test.mjs src/components/site/FavoriteProjects.tsx
git commit -m "feat: link favorite project titles"
```

### Task 3: Verify the integrated home page

**Files:**
- Verify: `src/components/site/FeatureProjectsMarquee.tsx`
- Verify: `src/components/site/FavoriteProjects.tsx`

**Step 1: Run automated verification**

Run:

```bash
node --test tests/*.test.mjs
npm run typecheck
npm run lint
npm run build
```

Expected: all commands exit 0 with no test failures, type errors, lint errors, or build errors.

**Step 2: Run browser verification**

Start the production or development server and inspect `/es` at desktop and mobile widths. Confirm the brand marquee uses contained logos with the existing movement and sizing, each favorite-project name navigates to its locale-preserving project route, the Global Youth link has one two-line hit area, and hover/focus states are visible without causing layout shift.

**Step 3: Commit any verification-only adjustments**

Stage only the files changed by this plan and commit a narrowly scoped fix if browser verification identifies a defect.
