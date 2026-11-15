/**
 * Shrinks heavy photos in public/portafolio (or any folder passed as an argument).
 *
 *   npm run images                       -> public/portafolio
 *   npm run images -- public/sobre-mi    -> another folder
 *
 * - JPG: max 2400 px wide, quality 82 (a 5520x3680 camera file of 11 MB becomes ~0.5 MB)
 * - PNG: max 2000 px wide, same format (keeps transparency)
 * - Only touches files over 1 MB or wider than the max; lighter files are left alone.
 * - The original is copied to `originales-pesados/` (ignored by git) before it is replaced.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const target = path.resolve(ROOT, process.argv[2] ?? "public/portafolio");
const BACKUP = path.join(ROOT, "originales-pesados");
const MAX = { jpg: 2400, png: 2000 };
const MIN_BYTES = 1024 * 1024;

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;
let saved = 0;

for await (const file of walk(target)) {
  const ext = path.extname(file).toLowerCase();
  const kind = ext === ".png" ? "png" : [".jpg", ".jpeg"].includes(ext) ? "jpg" : null;
  if (!kind) continue;

  const { size } = await fs.stat(file);
  const { width = 0 } = await sharp(file).metadata();
  if (size < MIN_BYTES && width <= MAX[kind]) continue;

  const pipeline = sharp(file).rotate().resize({ width: MAX[kind], withoutEnlargement: true });
  const output =
    kind === "jpg"
      ? await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer()
      : await pipeline.png({ compressionLevel: 9 }).toBuffer();

  if (output.length >= size) continue; // already lean

  const backupPath = path.join(BACKUP, path.relative(ROOT, file));
  await fs.mkdir(path.dirname(backupPath), { recursive: true });
  await fs.copyFile(file, backupPath);
  await fs.writeFile(file, output);
  saved += size - output.length;
  console.log(`${path.relative(ROOT, file)}: ${mb(size)} -> ${mb(output.length)}`);
}

console.log(saved ? `Listo. Ahorro total: ${mb(saved)}. Originales en originales-pesados/` : "Nada que optimizar.");
