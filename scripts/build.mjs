import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const entry = resolve(root, "src/css/fluxara.css");
const out = resolve(root, process.argv.includes("--out") ? process.argv[process.argv.indexOf("--out") + 1] : "dist/fluxara.css");
const minOut = out.replace(/\.css$/, ".min.css");

async function inlineCss(file, seen = new Set()) {
  const abs = resolve(file);
  if (seen.has(abs)) return "";
  seen.add(abs);
  const css = await readFile(abs, "utf8");
  const dir = dirname(abs);
  const chunks = [];
  const importPattern = /^\s*@import\s+["'](.+)["'];\s*$/gm;
  let cursor = 0;
  for (const match of css.matchAll(importPattern)) {
    chunks.push(css.slice(cursor, match.index));
    chunks.push(await inlineCss(resolve(dir, match[1]), seen));
    cursor = match.index + match[0].length;
  }
  chunks.push(css.slice(cursor));
  return chunks.join("\n");
}

function minify(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

const banner = "/* Fluxara v0.1.0 | MIT License | https://www.npmjs.com/package/fluxara */\n";
const css = `${banner}${(await inlineCss(entry)).trim()}\n`;
await mkdir(dirname(out), { recursive: true });
await writeFile(out, css);
await writeFile(minOut, `${banner}${minify(css)}\n`);
console.log(`Fluxara built: ${out}`);
