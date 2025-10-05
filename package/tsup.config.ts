import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/components.tsx", "src/hooks.tsx", "src/icons.tsx", "src/index.tsx", "src/types.ts"],
  format: ["esm"],
  clean: true,
  dts: true,
  bundle: true,
  splitting: true,
  treeshake: "recommended",
  esbuildOptions: (options) => (options.chunkNames = "chunks/[name]-[hash]"),
});
