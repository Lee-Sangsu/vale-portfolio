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

test("FavoriteProjects links the complete localized Global Youth title only", () => {
  const component = readFileSync(componentPath, "utf8");

  assert.match(
    component,
    /import\s+\{\s*Link\s*\}\s+from\s+["']@\/i18n\/navigation["'];/,
    "the project link must use locale-aware navigation",
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

  const globalYouthLink = component.match(
    /<Link\s+href="\/work\/global-youth-summit"([\s\S]*?)<\/Link>/,
  );
  assert.ok(globalYouthLink, "expected one link for the complete Global Youth title");
  assert.equal(
    (globalYouthLink[0].match(/<span\s+className="block">/g) ?? []).length,
    2,
    "the linked title must render as exactly two block lines",
  );
  assert.match(globalYouthLink[0], /\{globalYouth\.firstLine\}/);
  assert.match(globalYouthLink[0], /\{globalYouth\.secondLine\}/);
  assert.match(globalYouthLink[1], /hover:underline/);
  assert.match(globalYouthLink[1], /hover:opacity-/);
  assert.match(globalYouthLink[1], /focus-visible:ring-/);
  assert.match(globalYouthLink[1], /focus-visible:outline-none/);

  assert.equal(
    (component.match(/\bhref=/g) ?? []).length,
    1,
    "no other favorite project may become a link",
  );

  const staticProjects = component.match(
    /\{PROJECTS\[locale\]\.map\(\(project\) => \(([\s\S]*?)\)\)\}/,
  );
  assert.ok(staticProjects, "expected the remaining projects to stay in the list");
  assert.match(staticProjects[1], /^\s*<p\b/);
  assert.doesNotMatch(staticProjects[1], /<Link\b|href=/);

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
