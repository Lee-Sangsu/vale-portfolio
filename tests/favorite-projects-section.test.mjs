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
    "Global Youth: Cumbre de Emprendimiento Femenino",
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
