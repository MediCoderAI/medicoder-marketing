import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

export default defineConfig({
  site: "https://medicoder.ai",
  integrations: [svelte()],
});
