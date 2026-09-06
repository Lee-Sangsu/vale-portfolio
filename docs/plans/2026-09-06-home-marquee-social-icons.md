# Home Marquee and Social Icons Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restyle and reposition the existing featured-project marquee to match Figma node `507:174`, and replace temporary social labels with real accessible icons.

**Architecture:** Preserve the homepage's current data construction and the marquee's duplicated animation track. Limit changes to the two confirmed components plus homepage composition, using inline React SVG icons to avoid adding a dependency and responsive Tailwind classes to translate the desktop Figma measurements safely.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Node test runner, Playwright CLI.

---

### Task 1: Add focused regression coverage

**Files:**

- Create: `tests/home-marquee-social-icons.test.mjs`

1. Assert that `FeatureProjectsMarquee` is rendered immediately after `HomeAboutHero` and no longer after `WorkChapters`.
2. Assert the Figma-derived desktop heading, card dimensions, radius, gap, and overlay typography.
3. Assert that the marquee still duplicates items, preserves links, and hides duplicate items from assistive technology.
4. Assert that the about hero uses SVG glyphs with the existing Instagram, email, and LinkedIn labels and destinations, with no `IG`, `@`, or `in` text placeholders.
5. Run `node --test tests/home-marquee-social-icons.test.mjs` and confirm the assertions fail before implementation.

### Task 2: Replace social placeholders

**Files:**

- Modify: `src/components/site/HomeAboutHero.tsx`

1. Add compact Instagram, mail, and LinkedIn SVG components with `aria-hidden="true"`.
2. Render them inside the existing anchors without changing destinations.
3. Add consistent icon sizing, neutral styling, focus-visible rings, and existing hover lift behavior.
4. Run the focused test and confirm the icon assertions pass.

### Task 3: Restyle and reposition the marquee

**Files:**

- Modify: `src/components/site/FeatureProjectsMarquee.tsx`
- Modify: `src/app/[locale]/page.tsx`

1. Translate node `507:174` into the existing component: 1460px heading container, 48px desktop heading, 234×192px desktop cards, 12px corners, 22px gap, and Figma-aligned vertical spacing.
2. Keep the current localized label, project set, project links, image sources, animation duration, mask, hover pause, and image zoom.
3. Move the component call directly below `HomeAboutHero` and remove its old position below `WorkChapters`.
4. Run the focused test and confirm all assertions pass.

### Task 4: Verify the implementation

**Files:**

- Modify only if scoped verification exposes an issue.

1. Run `node --test tests/home-marquee-social-icons.test.mjs`.
2. Run `node --test tests/*.test.mjs`.
3. Run `npm run lint`.
4. Run `npm run typecheck`.
5. Run `npm run build`.
6. Start the app and inspect `/en` at desktop and mobile widths with Playwright screenshots and console checks.
7. Run `git diff --check` and review the scoped diff.
