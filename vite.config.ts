// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isVercel = !!process.env.VERCEL;
const preset = process.env.NITRO_PRESET ?? (isVercel ? "vercel" : "cloudflare-module");

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
  // Force-enable nitro on non-sandbox builds (Vercel) and target the right preset.
  // For the `vercel` preset we let nitro use its default output dirs
  // (.vercel/output/*) so Vercel auto-detects the Build Output API v3.
  nitro:
    preset === "vercel"
      ? {
          preset: "vercel",
          output: {
            dir: ".vercel/output",
            serverDir: ".vercel/output/functions/server.func",
            publicDir: ".vercel/output/static",
          },
        }
      : { preset },
});
