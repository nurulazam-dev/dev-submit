import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["esm", "cjs"], // Keep this as ESM
  target: "esnext",
  outDir: "dist",
  clean: true,
  bundle: true,
  splitting: false,
  sourcemap: true,
  // Add this banner to shim require() for CJS dependencies when building ESM
  banner: ({ format }) => {
    if (format === "esm") {
      return {
        js: `import { createRequire } from 'module'; const require = createRequire(import.meta.url);`,
      };
    }
    return {};
  },
});
