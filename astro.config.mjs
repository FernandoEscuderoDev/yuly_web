import { defineConfig } from "astro/config";

import sanity from "@sanity/astro";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: "1q969eeu",
      dataset: "production",
      studioBasePath: "/admin",
      useCdn: false,
    }),
    react(),
    tailwind(),
    icon(),
  ],
  output: "server",
  adapter: netlify({assets: false}),
});
