# WorkTogether Route Copy Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Show coffee CTA headings on general pages and work-together CTA headings only on project and chapter detail routes.

**Architecture:** Keep `WorkTogether` as the single owner of localized contact copy. Add a narrow `variant` prop whose default preserves general-page call sites, and opt into the detail heading only at the two dynamic detail route families.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, next-intl, Node test runner

---

### Task 1: Add the route-specific WorkTogether heading contract

**Files:**
- Modify: `tests/work-together.test.mjs`
- Modify: `src/components/site/WorkTogether.tsx:7-42,75-77`
- Modify: `src/app/[locale]/work/[slug]/page.tsx:81,304`
- Modify: `src/app/[locale]/chapters/[slug]/page.tsx:200`

**Step 1: Write the failing test**

Extend `tests/work-together.test.mjs` with one test that asserts:

```js
assert.match(component, /coffeeTitle: "Tomémonos un café"/);
assert.match(component, /detailTitle: "¡Trabajemos juntas!"/);
assert.match(component, /coffeeTitle: "Let's grab a coffee"/);
assert.match(component, /detailTitle: "Let's work together"/);

for (const path of generalCallSitePaths) {
  const callSite = readFileSync(path, "utf8");
  assert.match(callSite, /<WorkTogether \/>/);
  assert.doesNotMatch(callSite, /<WorkTogether variant="detail" \/>/);
}

for (const path of detailCallSitePaths) {
  const callSite = readFileSync(path, "utf8");
  assert.match(callSite, /<WorkTogether variant="detail" \/>/);
  assert.doesNotMatch(callSite, /<WorkTogether \/>/);
}
```

Use these exact route groups:

```js
const generalCallSitePaths = [
  "src/app/[locale]/page.tsx",
  "src/app/[locale]/about/page.tsx",
  "src/app/[locale]/contact/page.tsx",
  "src/app/[locale]/projects/page.tsx",
];
const detailCallSitePaths = [
  "src/app/[locale]/work/[slug]/page.tsx",
  "src/app/[locale]/chapters/[slug]/page.tsx",
];
```

Also assert that `WorkTogether` defaults to `variant = "coffee"` and selects the detail title only when `variant === "detail"`.

**Step 2: Run the focused test to verify it fails**

Run: `node --test tests/work-together.test.mjs`

Expected: FAIL because the coffee/detail title fields, variant prop, and detail route opt-ins do not exist.

**Step 3: Implement the minimal component variant**

In `WorkTogether.tsx`, replace each locale's `title` with `coffeeTitle` and `detailTitle`:

```ts
es: {
  coffeeTitle: "Tomémonos un café",
  detailTitle: "¡Trabajemos juntas!",
  // existing fields unchanged
},
en: {
  coffeeTitle: "Let's grab a coffee",
  detailTitle: "Let's work together",
  // existing fields unchanged
},
```

Add the narrow prop and title selection:

```ts
type WorkTogetherVariant = "coffee" | "detail";

export function WorkTogether({
  variant = "coffee",
}: {
  variant?: WorkTogetherVariant;
}) {
  const locale = useLocale();
  const t = COPY[locale === "en" ? "en" : "es"];
  const title = variant === "detail" ? t.detailTitle : t.coffeeTitle;
```

Render `{title}` in the existing `<h2>` and leave all other component behavior unchanged.

Change every WorkTogether invocation in `src/app/[locale]/work/[slug]/page.tsx` and `src/app/[locale]/chapters/[slug]/page.tsx` to:

```tsx
<WorkTogether variant="detail" />
```

Do not change the four general-page invocations.

**Step 4: Run the focused test to verify it passes**

Run: `node --test tests/work-together.test.mjs`

Expected: PASS.

**Step 5: Run repository verification**

Run:

```bash
node --test tests/*.test.mjs
npm run typecheck
npm run lint
npm run build
```

Expected: all commands exit successfully with zero test failures and no lint/type errors.

**Step 6: Verify localized routes in a browser**

Check the rendered `<h2>` on:

- `/es/about` → `Tomémonos un café`
- `/en/about` → `Let's grab a coffee`
- `/es/work/jal-nomadher` → `¡Trabajemos juntas!`
- `/en/work/jal-nomadher` → `Let's work together`
- `/es/chapters/nomadher` → `¡Trabajemos juntas!`
- `/en/chapters/nomadher` → `Let's work together`

Confirm the subtitle and form remain present on every checked route.

**Step 7: Commit**

```bash
git add tests/work-together.test.mjs src/components/site/WorkTogether.tsx 'src/app/[locale]/work/[slug]/page.tsx' 'src/app/[locale]/chapters/[slug]/page.tsx'
git commit -m "fix: scope contact CTA copy by route"
```
