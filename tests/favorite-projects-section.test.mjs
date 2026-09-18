import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const componentPath = new URL(
  "../src/components/site/FavoriteProjects.tsx",
  import.meta.url,
);
const homePagePath = new URL("../src/app/[locale]/page.tsx", import.meta.url);

test("FavoriteProjects renders the Figma labels after the Designing for section", () => {
  assert.equal(
    existsSync(componentPath),
    true,
    "FavoriteProjects component has not been created",
  );

  const component = readFileSync(componentPath, "utf8");
  const homePage = readFileSync(homePagePath, "utf8");

  for (const label of [
    "Fav projects",
    "Proyectos favoritos",
    "Global Youth:",
    "Women's Entrepreneurship Summit",
    "Misiones Internacionales",
    "Sejong Global Idea Hackathon",
    "Japan Airlines × NomadHer",
    "NomadHer app",
  ]) {
    assert.ok(
      component.includes(label),
      "missing required Figma copy",
    );
  }

  for (const label of [
    "Global Youth:",
    "Cumbre de Emprendimiento Femenino",
    "Misiones Internacionales",
    "Hackathon Global de Ideas Sejong",
    "Japan Airlines × NomadHer",
    "App NomadHer",
  ]) {
    assert.ok(component.includes(label), "missing required Figma copy");
  }

  const designingForIndex = homePage.indexOf(
    '{es ? "Diseño para" : "Designing for"}',
  );
  const designingForSectionEnd = homePage.indexOf("</section>", designingForIndex);
  const favoriteProjectsIndex = homePage.indexOf(
    "<FavoriteProjects locale={locale} />",
  );
  const workTogetherIndex = homePage.indexOf("<WorkTogether");

  assert.ok(designingForIndex >= 0, "missing Designing for heading");
  assert.ok(designingForSectionEnd > designingForIndex);
  assert.ok(favoriteProjectsIndex >= 0, "FavoriteProjects is not mounted");
  assert.ok(workTogetherIndex >= 0, "missing WorkTogether call site");
  assert.ok(designingForSectionEnd < favoriteProjectsIndex);
  assert.ok(favoriteProjectsIndex < workTogetherIndex);

  assert.match(component, /<section\b/);
  assert.match(
    component,
    /return\s*\([\s\S]*?<section\b[\s\S]*?(?:Fav projects|Proyectos favoritos|\{[^}]+\})/,
    "a Figma label must be rendered in the returned section markup",
  );
});

test("FavoriteProjects links each project through locale-aware navigation", () => {
  const component = readFileSync(componentPath, "utf8");

  assert.match(
    component,
    /import\s+\{\s*Link\s*\}\s+from\s+["']@\/i18n\/navigation["'];/,
    "project links must preserve the active locale",
  );

  const routes = [...component.matchAll(/href:\s*["']([^"']+)["']/g)].map(
    ([, route]) => route,
  );
  assert.deepEqual(routes, [
    "/work/global-youth-summit",
    "/work/misiones-internacionales",
    "/work/sejong-hackathon",
    "/work/jal-nomadher",
    "/work/nomadher-app",
  ]);

  assert.match(
    component,
    /PROJECTS\.map\([\s\S]*?<Link\b[\s\S]*?href=\{href\}/,
    "each project record must render as a Link",
  );
  assert.equal(
    (component.match(/<Link\b/g) ?? []).length,
    1,
    "the mapped project record should create exactly one link",
  );
});

test("FavoriteProjects keeps the Global Youth title in one two-line link", () => {
  const component = readFileSync(componentPath, "utf8");
  const linkClass = component.match(/<Link[\s\S]*?className=["']([^"']+)["']/)?.[1];

  assert.match(
    component,
    /en:\s*\[\s*["']Global Youth:["'],\s*["']Women's Entrepreneurship Summit["']\s*\]/,
  );
  assert.match(
    component,
    /es:\s*\[\s*["']Global Youth:["'],\s*["']Cumbre de Emprendimiento Femenino["']\s*\]/,
  );
  assert.match(
    component,
    /lines\[locale\]\.map\([\s\S]*?<span\b[^>]*className=["'][^"']*\bblock\b[^"']*["']/,
    "localized title lines must render as block spans inside the mapped link",
  );
  assert.ok(linkClass, "project Link is missing a className");
  assert.match(linkClass, /\bspace-y-2\b/);
  assert.match(linkClass, /\blg:space-y-3\b/);
});

test("FavoriteProjects restricts project hrefs to known hero slugs", () => {
  const component = readFileSync(componentPath, "utf8");

  assert.match(
    component,
    /import\s+type\s+\{[^}]*\bHeroSlug\b[^}]*\}\s+from\s+["']@\/content\/types["'];/,
  );
  assert.match(component, /href:\s*`\/work\/\$\{HeroSlug\}`/);
});

test("FavoriteProjects links have consistent hover and keyboard focus feedback", () => {
  const component = readFileSync(componentPath, "utf8");
  const linkClass = component.match(/<Link[\s\S]*?className=["']([^"']+)["']/)?.[1];

  assert.ok(linkClass, "project Link is missing a className");
  assert.match(linkClass, /\btransition-/);
  assert.match(linkClass, /\bhover:opacity-/);
  assert.match(linkClass, /\bhover:decoration-/);
  assert.match(linkClass, /\bfocus-visible:outline-/);
});
