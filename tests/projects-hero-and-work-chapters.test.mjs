import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectsPage = await readFile(
  new URL("../src/app/[locale]/projects/page.tsx", import.meta.url),
  "utf8",
);

test("projects hero contains the PORTAfolio collage treatment", () => {
  assert.match(projectsPage, /PORTA/);
  assert.match(projectsPage, /folio/);
  assert.match(projectsPage, /from-\[#cf9bac\]/);
  assert.match(projectsPage, /BOG → BIO → BER → ICN/);
});

test("projects hero metadata keeps its content inside a rotated folder silhouette", () => {
  // The meta card is a wine folder (WineCardBackground) tilted 2deg, with the route, name and years inside.
  assert.match(
    projectsPage,
    /data-projects-folder="meta"[\s\S]*?className="absolute bottom-\[3%\] right-\[2%\] z-50 [^"]*rotate-\[2deg\][^"]*"/,
  );
  assert.match(projectsPage, /data-projects-folder="meta"[\s\S]*?<WineCardBackground className="absolute inset-0 size-full" \/>/);
  assert.match(
    projectsPage,
    /BOG → BIO → BER → ICN[\s\S]*?border-t border-white\/60[^"]*">Vale Jimenez[\s\S]*?border-t border-white\/60[^"]*">2021 - 2026/,
  );
});
