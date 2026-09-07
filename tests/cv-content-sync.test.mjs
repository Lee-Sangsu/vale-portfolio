import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const aboutContentUrl = new URL("../src/content/about.ts", import.meta.url);
const aboutHeroUrl = new URL(
  "../src/components/site/about/AboutHero.tsx",
  import.meta.url,
);
const skillsSectionUrl = new URL(
  "../src/components/site/about/SkillsSection.tsx",
  import.meta.url,
);
const journeySectionUrl = new URL(
  "../src/components/site/about/JourneySection.tsx",
  import.meta.url,
);
test("about content captures the latest bilingual CV facts", async () => {
  const source = await readFile(aboutContentUrl, "utf8");

  assert.match(source, /export const professionalPositioning/);
  assert.match(source, /product design, strategy and business growth/);
  assert.match(source, /diseño de producto, estrategia y business growth/);
  assert.match(source, /export const professionalSkills/);
  assert.match(source, /Founding Designer/);
  assert.match(source, /Creative Lead/);
  assert.match(source, /Oct 2025/);
  assert.match(source, /Jan 2024/);
  assert.match(source, /21–23%/);
  assert.match(source, /1\.3M/);
  assert.match(source, /1,3M/);
});

test("about content includes CV credentials and methods", async () => {
  const source = await readFile(aboutContentUrl, "utf8");

  assert.match(source, /export const credentials/);
  assert.match(source, /Entrepreneurial Leadership & Innovation/);
  assert.match(source, /Liderazgo Emprendedor e Innovación/);
  assert.match(source, /AI-enabled hybrid incubation program/);
  assert.match(source, /programa híbrido de incubación con AI/);
  assert.match(source, /Bridge for Billions/);
  assert.match(source, /Glocal Quest/);
  assert.match(source, /Coderhouse/);
  assert.match(source, /Spanish: native/);
  assert.match(source, /English: advanced/);
  assert.match(source, /Korean: basic/);
  assert.match(source, /Mailjet/);
  assert.match(source, /AI prototyping/);
});

test("existing About sections render the current localized content responsively", async () => {
  const [hero, skills, journey] = await Promise.all([
    readFile(aboutHeroUrl, "utf8"),
    readFile(skillsSectionUrl, "utf8"),
    readFile(journeySectionUrl, "utf8"),
  ]);

  assert.match(hero, /professionalPositioning/);
  assert.match(hero, /professionalPositioning\[locale\]/);
  assert.match(skills, /const SKILLS/);
  assert.match(skills, /SKILLS\[locale\]/);
  assert.match(journey, /const JOURNEY/);
  assert.match(journey, /JOURNEY\.map/);
  assert.match(journey, /flex-col/);
  assert.match(journey, /sm:flex-row/);
  assert.match(journey, /item\.date\[locale\]/);
  assert.match(journey, /item\.company\[locale\]/);
  assert.match(journey, /import \{ Link \} from "@\/i18n\/navigation"/);
  assert.match(journey, /<Link[\s\S]*href=\{item\.href\}/);
});

test("journey follows the latest CV order and localizes company names", async () => {
  const source = await readFile(aboutContentUrl, "utf8");
  const orderedCompanies = [
    'company: { en: "NomadHer", es: "NomadHer" }',
    'company: { en: "BOOST LAB", es: "BOOST LAB" }',
    'company: { en: "N9NE Team Company", es: "N9NE Team Company" }',
    'company: { en: "Travelling University", es: "Travelling University" }',
    'company: { en: "Independent", es: "Independiente" }',
    'company: { en: "Ironhack", es: "Ironhack" }',
  ];

  let previousIndex = -1;
  for (const company of orderedCompanies) {
    const index = source.indexOf(company);
    assert.ok(index > previousIndex, `${company} must follow the latest CV order`);
    previousIndex = index;
  }
});
