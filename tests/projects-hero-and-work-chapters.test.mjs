import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectsPage = await readFile(
  new URL("../src/app/[locale]/projects/page.tsx", import.meta.url),
  "utf8",
);
const workChapters = await readFile(
  new URL("../src/components/site/WorkChapters.tsx", import.meta.url),
  "utf8",
);

test("projects hero contains the PORTAfolio collage treatment", () => {
  assert.match(projectsPage, /PORTA/);
  assert.match(projectsPage, /folio/);
  assert.match(projectsPage, /from-\[#cf9bac\]/);
  assert.match(projectsPage, /BOG → BIO → BER → ICN/);
});

test("projects hero metadata keeps its content inside a rotated folder silhouette", () => {
  assert.match(
    projectsPage,
    /data-projects-folder="meta"[\s\S]*?className="absolute bottom-\[3%\] right-\[2%\] z-50 w-fit rotate-\[2deg\]"/,
  );
  assert.match(
    projectsPage,
    /aria-hidden="true"[\s\S]*?data-projects-folder="meta-tab"[\s\S]*?bg-\[#86143e\]/,
  );
  assert.match(
    projectsPage,
    /className="relative z-10 rounded-\[20px\] bg-\[#86143e\] px-4 py-3 font-inter text-\[0\.7rem\] leading-tight text-white shadow-lg sm:px-6 sm:py-5 sm:text-\[1\.15rem\]"/,
  );
  assert.match(
    projectsPage,
    /BOG → BIO → BER → ICN[\s\S]*?mt-2 border-t border-white\/60 pt-2">Vale Jimenez[\s\S]*?mt-2 border-t border-white\/60 pt-2">2021 - 2026/,
  );
});

test("filled work-chapter image stays inside a positioned container", () => {
  assert.doesNotMatch(workChapters, /relative[^"\n]*md:sticky/);
  assert.match(workChapters, /<div className="md:sticky md:top-24">/);
});
