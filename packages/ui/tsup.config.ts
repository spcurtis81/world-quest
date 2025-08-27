import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: false,
  clean: true,
  external: ["react", "react-dom", "react-hot-toast", "next/link"],
  target: "es2022",
});
