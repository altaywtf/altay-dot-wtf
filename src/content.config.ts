import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./data/posts" }),
  schema: z.object({
    title: z.string(),
    oneliner: z.string(),
    date: z.string(),
  }),
});

const books = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./data/books" }),
  schema: z.object({}).passthrough().optional(),
});

const pages = defineCollection({
  loader: glob({ pattern: "*.md", base: "./data" }),
  schema: z.object({}).passthrough().optional(),
});

const dictionary = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./data/dictionary" }),
  schema: z.object({}).passthrough().optional(),
});

export const collections = { posts, books, pages, dictionary };
