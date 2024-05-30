import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import tailwind from "@astrojs/tailwind";
import expressiveCode from "astro-expressive-code";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://0nisec.blog",
  prefetch: {
    defaultStrategy: "hover"
  },
  trailingSlash: "ignore",
  integrations: [expressiveCode({
    themes: ["min-dark"]
  }), mdx(), sitemap(), tailwind()],
  markdown: {
    remarkPlugins: [[remarkToc, {
      heading: "table of contents"
    }]],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, {
      behavior: "append",
      properties: {
        className: "anchor"
      },
      content: {
        type: "element",
        tagName: "span",
        properties: {
          className: "icon icon-link"
        },
        children: [{
          type: "text",
          value: "#"
        }]
      }
    }]]
  },
  output: "hybrid",
  adapter: netlify()
});