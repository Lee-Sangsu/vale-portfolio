import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("..", import.meta.url);
const projectsPage = await readFile(
  new URL("../src/app/[locale]/projects/page.tsx", import.meta.url),
  "utf8",
);

test("public assets are grouped by page, project, and shared purpose", () => {
  for (const directory of ["public/pages", "public/work", "public/shared"]) {
    assert.equal(existsSync(new URL(directory, root)), true, `${directory} is missing`);
  }

  for (const legacyDirectory of [
    "public/photos",
    "public/figma",
    "public/Assets ",
    "public/tools",
  ]) {
    assert.equal(
      existsSync(new URL(legacyDirectory, root)),
      false,
      `${legacyDirectory} should have been moved`,
    );
  }
});

const folderArt = await readFile(
  new URL("../src/components/site/ProjectsFolderArt.tsx", import.meta.url),
  "utf8",
);

const pileFiles = [
  "folder-tote.png",
  "folder-team.png",
  "folder-nobled.png",
  "folder-superalink.png",
  "folder-brujula.png",
  "folder-card.png",
  "folder-mic.png",
  "folder-people.png",
];

test("projects hero renders a custom pile of project photos", () => {
  const portfolioPileStart = projectsPage.indexOf("const portfolioPile = [");
  const portfolioPileEnd = projectsPage.indexOf("// Chapter cards", portfolioPileStart);
  const portfolioPileSource = projectsPage.slice(portfolioPileStart, portfolioPileEnd);

  assert.ok(portfolioPileStart >= 0 && portfolioPileEnd > portfolioPileStart);
  assert.match(projectsPage, /const portfolioPile = \[/);
  assert.match(projectsPage, /portfolioPile\.map/);
  assert.match(projectsPage, /from-\[#cf9bac\]/);

  // Eight photos, each a local PNG that exists, with its own hover spread.
  for (const file of pileFiles) {
    assert.ok(
      portfolioPileSource.includes(`pages/projects/hero-photos/${file}`),
      `pile is missing ${file}`,
    );
    assert.equal(
      existsSync(new URL(`public/pages/projects/hero-photos/${file}`, root)),
      true,
      `${file} is missing`,
    );
  }
  assert.equal((portfolioPileSource.match(/src: encodeAsset\(/g) ?? []).length, 8);
  assert.equal((portfolioPileSource.match(/hoverClass:/g) ?? []).length, 8);
  assert.equal(
    (
      portfolioPileSource.match(
        /className: "left-\[[^"]+\] top-\[[^"]+\] z-\[\d+\] w-\[[^"]+\]/g,
      ) ?? []
    ).length,
    8,
    "every photo is positioned by percentage inside the folder",
  );
  assert.equal(
    (portfolioPileSource.match(/group-hover:translate-|group-hover:-translate-/g) ?? [])
      .length >= 16,
    true,
    "every photo travels on both axes on hover",
  );
  assert.equal((portfolioPileSource.match(/group-hover:scale-\[1\.05\]/g) ?? []).length, 8);
  const delays = [...portfolioPileSource.matchAll(/delay-\[(\d+)ms\]/g)].map((m) =>
    Number(m[1]),
  );
  assert.equal(delays.length, 8);
  assert.ok(Math.max(...delays) <= 250, "staggered delays must stay snappy");

  // Photos keep their own aspect ratio and respect reduced motion.
  assert.match(portfolioPileSource, /w: \d+, h: \d+/);
  assert.match(projectsPage, /width=\{photo\.w\}/);
  assert.match(projectsPage, /height=\{photo\.h\}/);
  assert.match(projectsPage, /transition-transform duration-200 ease-in/);
  assert.match(projectsPage, /motion-reduce:transform-none/);
  assert.match(projectsPage, /group relative -mt-3 aspect-\[11\/7\]/);

  // Photos sit between the back panel and the front panel of the folder.
  const back = projectsPage.indexOf("<FolderBack");
  const pile = projectsPage.indexOf("portfolioPile.map");
  const front = projectsPage.indexOf("<FolderFront");
  assert.ok(back >= 0 && back < pile, "FolderBack must come before the photos");
  assert.ok(pile < front, "FolderFront must come after the photos");
  assert.match(projectsPage, /<FolderFront className="[^"]*z-\[45\]/);
  assert.match(projectsPage, /<WineCardBackground className="absolute inset-0 size-full" \/>/);
  assert.match(projectsPage, /absolute bottom-\[3%\] right-\[2%\] z-50/);

  assert.doesNotMatch(projectsPage, /data-projects-folder="flap"/);
  assert.doesNotMatch(projectsPage, /data-projects-folder="tab"/);
  assert.doesNotMatch(projectsPage, /w-\[min\(45vw,340px\)\]/);
  assert.doesNotMatch(projectsPage, /hero-folder\.svg/);
  assert.doesNotMatch(projectsPage, /Proyectos favoritos/);
  assert.doesNotMatch(projectsPage, /hero-pile\.png/);
});

test("projects hero folder is drawn from inline SVG pieces that swap on hover", () => {
  assert.match(
    projectsPage,
    /import \{\s*FolderBack,\s*FolderFront,\s*WineCardBackground,?\s*\} from "@\/components\/site\/ProjectsFolderArt"/,
  );
  assert.match(folderArt, /export function FolderBack/);
  assert.match(folderArt, /export function FolderFront/);
  assert.match(folderArt, /export function WineCardBackground/);

  // One shared 603x409 frame keeps back and fronts aligned.
  assert.equal((folderArt.match(/viewBox="0 0 603 409"/g) ?? []).length, 2);
  assert.match(folderArt, /data-projects-folder="back"/);
  assert.match(folderArt, /data-projects-folder=\{folder\}/);
  assert.match(folderArt, /folder="front-closed"/);
  assert.match(folderArt, /folder="front-open"/);
  assert.match(folderArt, /data-projects-folder="meta-bg"/);

  // Closed front fades out while the open front fades in on group-hover.
  assert.match(folderArt, /group-hover:opacity-0/);
  assert.match(folderArt, /absolute inset-0 size-full opacity-0[^"]*group-hover:opacity-100/);
  assert.match(folderArt, /motion-reduce:transition-none/);

  // Translucent grey fill keeps the photos visible; the front has a black outline.
  assert.match(folderArt, /const FILL = "#525252"/);
  assert.match(folderArt, /const OPACITY = 0\.45/);
  assert.match(folderArt, /stroke=\{INK\}/);
  assert.match(folderArt, /const INK = "black"/);

  // Every inline SVG is decorative.
  assert.equal(
    (folderArt.match(/<svg\b/g) ?? []).length,
    (folderArt.match(/aria-hidden="true"/g) ?? []).length,
  );
});
