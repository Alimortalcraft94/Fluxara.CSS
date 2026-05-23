import { readFile, stat } from "node:fs/promises";

const required = [
  "package.json",
  "README.md",
  "LICENSE",
  "src/css/fluxara.css",
  "src/js/index.js",
  "bin/fluxara.mjs",
  "dist/fluxara.css",
  "dist/fluxara.min.css"
];

for (const file of required) {
  await stat(file);
}

const css = await readFile("dist/fluxara.css", "utf8");
for (const token of [".fx\\:grid", ".fx\\:p\\:4", ".fx\\:bg\\:brand", "@layer fluxara"]) {
  if (!css.includes(token)) {
    throw new Error(`Missing expected CSS token: ${token}`);
  }
}

console.log("Fluxara package check passed.");
