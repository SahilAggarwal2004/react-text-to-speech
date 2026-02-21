import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/icons.tsx", "src/index.ts", "src/types.ts"],
  target: false,
});
