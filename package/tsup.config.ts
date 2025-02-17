import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx", "src/icons.tsx", "src/types.ts"],
  format: ["esm"],
  clean: true,
  dts: true,
  bundle: true,
  splitting: true,
  treeshake: "recommended",
  esbuildOptions: (options) => options.chunkNames = "chunks/[name]-[hash]",
});
