import { build, context } from "esbuild";
import { cpSync, mkdirSync, rmSync } from "node:fs";
import process from "node:process";

const watch = process.argv.includes("--watch");

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });
cpSync("public", "dist", { recursive: true });

const options = {
  entryPoints: { content: "src/content.ts" },
  outdir: "dist",
  bundle: true,
  format: "iife",
  target: "firefox115",
  sourcemap: true,
  logLevel: "info",
};

if (watch) {
  const ctx = await context(options);
  await ctx.watch();
} else {
  await build(options);
}