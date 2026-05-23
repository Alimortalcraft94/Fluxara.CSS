#!/usr/bin/env node
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const command = process.argv[2] ?? "help";

function arg(name, fallback) {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1] ?? fallback;
}

async function init() {
  const target = resolve("fluxara.config.mjs");
  const content = `import { defineFluxaraConfig } from "fluxara";

export default defineFluxaraConfig({
  content: ["./src/**/*.{html,js,jsx,ts,tsx,vue,svelte}"],
  output: "dist/fluxara.css"
});
`;
  await writeFile(target, content, { flag: "wx" }).catch((error) => {
    if (error.code === "EEXIST") throw new Error("fluxara.config.mjs already exists.");
    throw error;
  });
  console.log("Created fluxara.config.mjs");
}

async function build() {
  const out = resolve(arg("--out", "dist/fluxara.css"));
  await mkdir(dirname(out), { recursive: true });
  const source = resolve(root, "dist/fluxara.css");
  try {
    await copyFile(source, out);
  } catch {
    await new Promise((resolvePromise, reject) => {
      const child = spawn(process.execPath, [resolve(root, "scripts/build.mjs")], { stdio: "inherit" });
      child.on("exit", (code) => code === 0 ? resolvePromise() : reject(new Error(`build failed with ${code}`)));
    });
    await copyFile(source, out);
  }
  console.log(`Wrote ${out}`);
}

async function tokens() {
  const css = await readFile(resolve(root, "src/css/core/tokens.css"), "utf8");
  const names = [...css.matchAll(/--fx-[\w-]+/g)].map((match) => match[0]);
  console.log([...new Set(names)].sort().join("\n"));
}

try {
  if (command === "init") await init();
  else if (command === "build") await build();
  else if (command === "tokens") await tokens();
  else {
    console.log(`Fluxara

Usage:
  fluxara init
  fluxara build --out dist/fluxara.css
  fluxara tokens
`);
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
