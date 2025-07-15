import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  outDir: "dist",
  clean: true,
  platform: "node",
  target: "es2022",
  format: ["cjs"],
  sourcemap: true,
  dts: false,
});
