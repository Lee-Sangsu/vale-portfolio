# Move Work Chapters Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Render Work Chapters immediately below the localized “Designing for” homepage section.

**Architecture:** Preserve the existing server-page composition and the interactive `WorkChapters` client component. Change only sibling JSX order in the localized homepage and protect that order with a source-level regression test.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Node test runner

---

### Task 1: Protect and update homepage section order

**Files:**

- Modify: `tests/homepage-figma-refresh.test.mjs`
- Modify: `src/app/[locale]/page.tsx`

**Step 1: Write the failing test**

Add a test that locates the source indices of `<FeatureProjectsMarquee`, the “Designing for” section comment, `<WorkChapters`, and `<LogoMarquee`, then asserts that they appear in that order.

**Step 2: Run the focused test to verify it fails**

Run: `node --test tests/homepage-figma-refresh.test.mjs`

Expected: FAIL because `<WorkChapters>` currently appears before `<FeatureProjectsMarquee>` and the “Designing for” section.

**Step 3: Implement the minimal change**

Move the existing `<WorkChapters>` JSX block to immediately after the “Designing for” section closing tag and before `<LogoMarquee>`. Do not edit the component or its props.

**Step 4: Run focused and project verification**

Run:

```bash
node --test tests/homepage-figma-refresh.test.mjs
npm run lint
npm run typecheck
npm run build
```

Expected: all commands exit successfully.

**Step 5: Verify in the browser**

Open `/en` and confirm the visible order is Brands I work with, Designing for, Work chapters, then Brands I've worked with at desktop and mobile widths.

**Step 6: Commit**

```bash
git add tests/homepage-figma-refresh.test.mjs 'src/app/[locale]/page.tsx'
git commit -m "fix: move work chapters below design section"
```
