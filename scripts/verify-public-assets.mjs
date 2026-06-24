import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const sourceDirs = ["src"];
const assetExt = /\.(?:png|jpe?g|webp|avif|gif|svg|ico)$/i;
const assetPathPattern =
  /(?<quote>["'`])(?<path>\/?(?:figma|photos|tools|Assets%20|Assets\/)[^"'`]*?\.(?:png|jpe?g|webp|avif|gif|svg|ico))\k<quote>/gi;

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(abs);
    if (!/\.(?:ts|tsx|js|jsx|css|mdx?)$/i.test(entry.name)) return [];
    return [abs];
  });
}

function toPublicPath(raw) {
  if (!assetExt.test(raw)) return undefined;
  const withoutQuery = raw.split(/[?#]/, 1)[0];
  const normalized = withoutQuery.startsWith("/") ? withoutQuery.slice(1) : withoutQuery;
  return decodeURIComponent(normalized);
}

function isIgnored(relPath) {
  try {
    execFileSync("git", ["check-ignore", "-q", relPath], { cwd: root });
    return true;
  } catch {
    return false;
  }
}

const references = new Map();

for (const dir of sourceDirs) {
  for (const file of walk(path.join(root, dir))) {
    const text = fs.readFileSync(file, "utf8");
    for (const match of text.matchAll(assetPathPattern)) {
      const publicPath = toPublicPath(match.groups.path);
      if (!publicPath) continue;
      if (!references.has(publicPath)) references.set(publicPath, []);
      references.get(publicPath).push(path.relative(root, file));
    }
  }
}

const missing = [];
const ignored = [];

for (const [publicPath, files] of [...references.entries()].sort()) {
  const relPath = path.join("public", publicPath);
  const absPath = path.join(publicDir, publicPath);
  if (!fs.existsSync(absPath)) {
    missing.push({ publicPath, files });
    continue;
  }
  if (isIgnored(relPath)) {
    ignored.push({ publicPath, files });
  }
}

if (missing.length || ignored.length) {
  if (missing.length) {
    console.error("Missing referenced public assets:");
    for (const item of missing) {
      console.error(`- /${item.publicPath} (${[...new Set(item.files)].join(", ")})`);
    }
  }
  if (ignored.length) {
    console.error("Referenced public assets ignored by git:");
    for (const item of ignored) {
      console.error(`- /${item.publicPath} (${[...new Set(item.files)].join(", ")})`);
    }
  }
  process.exit(1);
}

console.log(`Verified ${references.size} referenced public assets.`);
