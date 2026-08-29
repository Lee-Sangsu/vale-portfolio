# Projects Folder Flap Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the projects hero's flat folder layers with a JSX/CSS folder that opens its front flap downward on hover.

**Architecture:** Keep the existing photo pile and its per-card pop-out transforms unchanged. Replace the black back rectangle and `hero-folder.svg` image with a small JSX folder structure: a back panel with a tab and a separate, perspective-enabled front flap. The front flap shares the hero group's hover state, hinges from its bottom edge, and disables the transform under reduced motion.

**Tech Stack:** Next.js App Router, React JSX, Tailwind CSS v4, Node's built-in test runner.

---

### Task 1: Capture the folder structure and hover contract in a regression test

**Files:**
- Modify: `tests/public-assets-and-projects-pile.test.mjs`
- Modify: `src/app/[locale]/projects/page.tsx:248-282`

**Step 1: Write the failing test**

Add assertions that the projects hero contains a JSX folder back panel, a tab, a front flap with `origin-bottom`, perspective, a `group-hover:rotate-x-*` transform, and a reduced-motion override. Assert the old `hero-folder.svg` reference is absent.

**Step 2: Run test to verify it fails**

Run: `node --test tests/public-assets-and-projects-pile.test.mjs`

Expected: FAIL because the hero still references the SVG and lacks the flap-specific classes.

**Step 3: Write minimal implementation**

Replace the current black rear rectangle with a JSX back-panel element and tab. Replace the `<Image src="/pages/projects/hero-folder.svg" />` with a JSX front flap. Use `transform-gpu`, `origin-bottom`, perspective, `transition-transform duration-200 ease-in`, and a restrained negative X rotation on group hover. Keep it non-interactive and below the date badge/details.

**Step 4: Run test to verify it passes**

Run: `node --test tests/public-assets-and-projects-pile.test.mjs`

Expected: PASS.

**Step 5: Commit**

```bash
git add src/app/[locale]/projects/page.tsx tests/public-assets-and-projects-pile.test.mjs
git commit -m "feat: add projects folder flap"
```

### Task 2: Verify the interaction in the rendered route

**Files:**
- Verify: `src/app/[locale]/projects/page.tsx`

**Step 1: Run full automated verification**

Run: `node --test tests/*.mjs && npm run typecheck && npm run lint && npm run build`

Expected: all tests, typecheck, lint, and production build pass.

**Step 2: Run local visual verification**

Run: `npm run dev -- --port 3006`

Open `/es/projects`, hover the hero folder, and verify the front flap rotates downward while the cards remain individually animated upward and outward.

**Step 3: Commit any visual-only adjustment**

```bash
git add src/app/[locale]/projects/page.tsx
git commit -m "fix: tune projects folder flap"
```
