# Chapter Detail Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Figma-aligned, responsive chapter-detail pages sourced from the approved portfolio content, while preserving individual `/work/[slug]` project case studies.

**Architecture:** Introduce a typed `chapter-details` content module for the six content chapters and render it through a server route at `/chapters/[slug]`. The route reuses site-wide navigation and footer components, renders the Figma’s hero/impact/responsibility/project-rail hierarchy, and only links cards for existing individual project routes.

**Tech Stack:** Next.js 16 App Router, React 19 Server and Client Components, TypeScript, Tailwind CSS v4, next-intl, next/image, Node’s built-in test runner.

---

### Task 1: Establish chapter-detail types and content

**Files:**
- Modify: `src/content/types.ts`
- Modify: `src/content/chapters.ts`
- Create: `src/content/chapter-details.ts`
- Modify: `src/content/index.ts`
- Create: `tests/chapter-details.test.mjs`

**Step 1: Write the failing test**

Create `tests/chapter-details.test.mjs` using `node:test` and `node:assert/strict`. Read `src/content/chapter-details.ts`, `src/content/chapters.ts`, and `src/content/types.ts`; assert that all six approved chapter slugs are present, `ironhack` belongs to `ChapterId`, and each chapter entry has its intro, impact, responsibilities, and projects fields.

**Step 2: Run test to verify it fails**

Run: `node --test tests/chapter-details.test.mjs`

Expected: FAIL because `src/content/chapter-details.ts` does not yet exist and `ironhack` is absent from the chapter type/data.

**Step 3: Write minimal implementation**

- Extend `ChapterId` with `ironhack` and add chapter-detail data types that keep every visible string localized.
- Add Ironhack and reorder `chapters` to the source-document order: NomadHer, BOOST LAB, Diseño independiente, N9NE, Ironhack, Travelling University.
- Create `chapter-details.ts` with source-document-derived Spanish content and matching initial English values, six entries, chapter imagery references, carefully selected verifiable impact metrics, responsibility cards, and project cards.
- Use only existing `/work/[slug]` hrefs; represent source-document work without a route as a visible non-linkable card.
- Export the content accessors from `src/content/index.ts`.

**Step 4: Run test to verify it passes**

Run: `node --test tests/chapter-details.test.mjs`

Expected: PASS with all content-contract assertions green.

**Step 5: Commit**

```bash
git add src/content/types.ts src/content/chapters.ts src/content/chapter-details.ts src/content/index.ts tests/chapter-details.test.mjs
git commit -m "feat: add chapter detail content"
```

### Task 2: Build an accessible responsive project rail

**Files:**
- Create: `src/components/site/chapter/ChapterProjectRail.tsx`
- Create: `tests/chapter-project-rail.test.mjs`

**Step 1: Write the failing test**

Create a source-level test that asserts the rail is a client component, provides named previous/next buttons, keeps a scrollable region, and renders a `Link` only when a project has an href.

**Step 2: Run test to verify it fails**

Run: `node --test tests/chapter-project-rail.test.mjs`

Expected: FAIL because the rail component does not exist.

**Step 3: Write minimal implementation**

Implement a small client component that:

- receives typed localized chapter projects;
- shows 400px Figma-proportioned cards at desktop width and `min(82vw, 400px)` cards on small screens;
- horizontally scrolls by one card when the accessible arrow controls are used;
- uses `next/image` when media exists and the chapter accent as the fallback surface;
- uses `Link` for routed project cards and a semantic non-linkable card for unmodelled projects.

**Step 4: Run test to verify it passes**

Run: `node --test tests/chapter-project-rail.test.mjs`

Expected: PASS with the interaction/accessibility contract present.

**Step 5: Commit**

```bash
git add src/components/site/chapter/ChapterProjectRail.tsx tests/chapter-project-rail.test.mjs
git commit -m "feat: add chapter project rail"
```

### Task 3: Add the Figma-aligned chapter route

**Files:**
- Create: `src/app/[locale]/chapters/[slug]/page.tsx`
- Modify: `src/components/site/SiteNav.tsx`
- Create: `tests/chapter-page.test.mjs`

**Step 1: Write the failing test**

Add assertions that the new route statically creates every locale/chapter pair, fetches a chapter detail by slug, handles an unknown slug with `notFound`, and renders the Figma hierarchy: media hero, accent impact panel, responsibilities, and project rail.

**Step 2: Run test to verify it fails**

Run: `node --test tests/chapter-page.test.mjs`

Expected: FAIL because the chapter route does not exist.

**Step 3: Write minimal implementation**

- Create the async App Router page with `generateStaticParams`, localized metadata, `setRequestLocale`, and `notFound` safeguards matching the repository’s existing dynamic pages.
- Render a 900px desktop hero that adapts through `clamp()` typography and shorter mobile height; use the chapter cover with a gradient overlay, title, description, and chapter/date pill.
- Render the Figma-aligned accent impact section, responsive responsibility grid, and `ChapterProjectRail`.
- Reuse `WorkTogether` and `SiteFooter` unchanged.
- Fix `SiteNav` so `tone="light"` actually gives the overlaid hero logo and mobile links a light foreground, preserving dark inner-page behavior.

**Step 4: Run test to verify it passes**

Run: `node --test tests/chapter-page.test.mjs`

Expected: PASS with all route and layout assertions green.

**Step 5: Commit**

```bash
git add src/app/[locale]/chapters/[slug]/page.tsx src/components/site/SiteNav.tsx tests/chapter-page.test.mjs
git commit -m "feat: add responsive chapter detail pages"
```

### Task 4: Direct portfolio chapter cards to chapter details

**Files:**
- Modify: `src/app/[locale]/projects/page.tsx`
- Modify: `src/lib/project-categories.mjs`
- Modify: `tests/chapter-details.test.mjs`

**Step 1: Write the failing test**

Extend the chapter-details test to assert that project-directory chapter cards use `/chapters/${c.id}`, still use their existing cover fallback, and include category mapping for Ironhack.

**Step 2: Run test to verify it fails**

Run: `node --test tests/chapter-details.test.mjs`

Expected: FAIL because card destinations still point to `/work/[slug]` and Ironhack has no category mapping.

**Step 3: Write minimal implementation**

- Change the `/projects` chapter-card href to `/chapters/${c.id}` and source its description from the approved chapter data.
- Keep the current cover lookup, falling back to the chapter detail’s configured image when hero/mention media are absent.
- Add an intentional Ironhack discipline mapping based on its document-supported student-experience, tooling, analytics, and event work.
- Do not change `/work/[slug]`; it remains the individual-project page.

**Step 4: Run test to verify it passes**

Run: `node --test tests/chapter-details.test.mjs`

Expected: PASS with the directory-to-chapter route contract verified.

**Step 5: Commit**

```bash
git add src/app/[locale]/projects/page.tsx src/lib/project-categories.mjs tests/chapter-details.test.mjs
git commit -m "feat: link portfolio chapters to chapter pages"
```

### Task 5: Verify the integrated experience

**Files:**
- Verify only: all files above

**Step 1: Run focused tests**

Run: `node --test tests/*.test.mjs`

Expected: PASS with no failed test files.

**Step 2: Run static checks**

Run: `npm run typecheck`

Expected: exit code 0.

Run: `npm run lint`

Expected: exit code 0.

**Step 3: Run the production build**

Run: `npm run build`

Expected: exit code 0 and chapter routes generated for both locales.

**Step 4: Perform browser checks**

Use `@playwright` to open `/es/chapters/nomadher`, `/en/chapters/boost-lab`, and `/es/chapters/ironhack` at desktop and mobile viewport sizes. Verify legible hero copy, no horizontal page overflow, working rail controls, functional project links, and the intentional non-linkable fallback cards.

**Step 5: Commit verification-only adjustments if needed**

```bash
git add <only files changed during verification>
git commit -m "fix: polish chapter detail responsiveness"
```
