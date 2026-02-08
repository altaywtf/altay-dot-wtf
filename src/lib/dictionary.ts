import fs from "node:fs";
import matter from "gray-matter";
import { DATA_FOLDER_PATH } from "@/lib/utils/fs";
import { readMarkdownFile } from "@/lib/utils/md";

type DictionaryFrontMatter = {
  title: string;
  oneliner: string;
  date: string;
};

type DictionaryEntry = DictionaryFrontMatter & {
  slug: string;
  path: string;
};

export const getDictionaryEntry = (slug: string) => {
  const file = readMarkdownFile(`/dictionary/${slug}.md`);
  const { content: markdown, data } = matter(file);
  const frontMatter = data as DictionaryFrontMatter;

  const entry = {
    ...frontMatter,
    slug,
    path: `/dictionary/${slug}`,
  } satisfies DictionaryEntry;

  return { markdown, entry };
};

export const getDictionaryEntries = () => {
  const DICTIONARY_FOLDER_PATH = `${DATA_FOLDER_PATH}/dictionary`;

  const slugs = fs
    .readdirSync(DICTIONARY_FOLDER_PATH, "utf-8")
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(".md", ""));

  return slugs
    .map(getDictionaryEntry)
    .map((d) => d.entry)
    .sort((a, b) => (Date.parse(a.date) > Date.parse(b.date) ? -1 : 1));
};
