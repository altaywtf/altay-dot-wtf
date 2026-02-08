import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export default defineConfig({
  site: "https://altay.wtf",
  output: "static",
  server: {
    port: 1994,
  },
  integrations: [mdx(), sitemap()],
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: "dark-plus" }]],
    remarkPlugins: [remarkGfm],
  },
});
