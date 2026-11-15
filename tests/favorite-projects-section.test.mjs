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
    "Cumbre de Emprendimiento Femenino",
    "Misiones Internacionales",
    "Hackathon Global de Ideas Sejong",
    "Japan Airlines × NomadHer",
    "App NomadHer",
  ]) {
    assert.ok(component.includes(label), "missing required Figma copy");
  }

  const designingForIndex = homePage.indexOf(
    '{es ? "Diseñando para" : "Designing for"}',
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

test("FavoriteProjects links all five project names to their work pages", () => {
  const component = readFileSync(componentPath, "utf8");

  assert.match(
    component,
    /import\s+\{\s*Link\s*\}\s+from\s+["']@\/i18n\/navigation["'];/,
    "the project links must use locale-aware navigation",
  );
  assert.equal(
    (component.match(/\/work\/global-youth-summit/g) ?? []).length,
    1,
    "the Global Youth destination must appear exactly once",
  );

  for (const line of [
    "Global Youth:",
    "Women's Entrepreneurship Summit",
    "Cumbre de Emprendimiento Femenino",
  ]) {
    assert.ok(component.includes(line), `missing localized link line: ${line}`);
  }

  // All links share one class constant instead of inline class names.
  const linkClass = component.match(/const LINK_CLASS =\s*"([^"]+)"/);
  assert.ok(linkClass, "expected a shared LINK_CLASS constant");
  assert.match(linkClass[1], /hover:underline/);
  assert.match(linkClass[1], /hover:opacity-/);
  assert.match(linkClass[1], /focus-visible:ring-/);
  assert.match(linkClass[1], /focus-visible:outline-none/);

  const globalYouthLink = component.match(
    /<Link\s+href="\/work\/global-youth-summit"\s+className=\{LINK_CLASS\}\s*>([\s\S]*?)<\/Link>/,
  );
  assert.ok(globalYouthLink, "expected one link for the complete Global Youth title");
  assert.equal(
    (globalYouthLink[0].match(/<span\s+className="block">/g) ?? []).length,
    2,
    "the linked title must render as exactly two block lines",
  );
  assert.match(globalYouthLink[0], /\{globalYouth\.firstLine\}/);
  assert.match(globalYouthLink[0], /\{globalYouth\.secondLine\}/);

  // The other four projects are links built from PROJECTS, each to /work/<slug>.
  const projectLinks = component.match(
    /\{PROJECTS\[locale\]\.map\(\(project\) => \(([\s\S]*?)\)\)\}/,
  );
  assert.ok(projectLinks, "expected the remaining projects to be mapped");
  assert.match(projectLinks[1], /^\s*<Link\b/);
  assert.match(projectLinks[1], /href=\{`\/work\/\$\{project\.slug\}`\}/);
  assert.match(projectLinks[1], /className=\{LINK_CLASS\}/);
  assert.doesNotMatch(projectLinks[1], /<p\b/);

  for (const slug of [
    "misiones-internacionales",
    "sejong-hackathon",
    "jal-nomadher",
    "nomadher-app",
  ]) {
    assert.equal(
      (component.match(new RegExp(`slug: "${slug}"`, "g")) ?? []).length,
      2,
      `${slug} must be declared once per locale`,
    );
  }

  assert.equal(
    (component.match(/\bclassName=\{LINK_CLASS\}/g) ?? []).length,
    2,
    "exactly two link elements (Global Youth + the mapped projects) share LINK_CLASS",
  );

  for (const label of [
    "Misiones Internacionales",
    "Sejong Global Idea Hackathon",
    "Hackathon Global de Ideas Sejong",
    "Japan Airlines × NomadHer",
    "NomadHer app",
    "App NomadHer",
  ]) {
    assert.ok(component.includes(label), `missing static project label: ${label}`);
  }
});
