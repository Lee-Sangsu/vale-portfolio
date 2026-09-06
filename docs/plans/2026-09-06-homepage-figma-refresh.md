# Homepage Figma Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update the homepage hero and introduce Figma-matched about and category sections without disturbing later homepage behavior.

**Architecture:** Keep localization and page composition in the App Router page, add a small server-rendered `HomeAboutHero`, and retain `CategoryShowcase` as a client component for category selection. Store exact Figma image exports under `public/pages/home/figma` and render them with `next/image` using relative containers and explicit `sizes`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Node test runner, Playwright CLI.

---

### Task 1: Add regression coverage

**Files:**

- Create: `tests/homepage-figma-refresh.test.mjs`

1. Assert the requested English hero copy, light-blue title color, lime collaboration folder, and wider folder positions.
2. Assert the homepage renders `HomeAboutHero` before `CategoryShowcase`.
3. Assert `HomeAboutHero` includes localized copy, local Figma portrait, responsive two-column layout, and social links.
4. Assert `CategoryShowcase` retains `useState` selection while using four visible category rows, an overlapping three-image fan, and one CTA instead of the old project grid.
5. Run `node --test tests/homepage-figma-refresh.test.mjs` and confirm the new assertions fail for missing behavior.

### Task 2: Implement hero updates

**Files:**

- Modify: `src/components/site/HomeHero.tsx`

1. Preserve the current responsive heading sizing already present in the user's checkout.
2. Update the English introduction and localized heading.
3. Map title/folder colors to node `507:125` and move the two middle folders outward.
4. Run the focused test and confirm the hero assertions pass.

### Task 3: Add the about section

**Files:**

- Create: `src/components/site/HomeAboutHero.tsx`
- Add: `public/pages/home/figma/about-portrait.png`
- Modify: `src/app/[locale]/page.tsx`

1. Download the exact portrait asset exported from node `489:862`.
2. Implement localized text, social links, and responsive Figma geometry.
3. Insert the section after `CommunityStrip` and before `CategoryShowcase`.
4. Run the focused test and confirm the about assertions pass.

### Task 4: Restyle the category showcase

**Files:**

- Modify: `src/components/site/CategoryShowcase.tsx`

1. Render the Figma heading/intro/list/CTA hierarchy responsively.
2. Keep each category row as an accessible button and display every description.
3. Render three existing category project images in an overlapping fan, emphasizing the selected category's active set.
4. Remove the redundant lower project grid.
5. Run the focused test and confirm all assertions pass.

### Task 5: Verify the page

**Files:**

- Modify only if verification finds a scoped issue.

1. Run `node --test tests/*.test.mjs`.
2. Run `npm run lint`.
3. Run `npm run typecheck`.
4. Run `npm run build`.
5. Start the development server and inspect `/en` at desktop and mobile widths with screenshots and browser console checks.
6. Review `git diff --check` and the final scoped diff.
