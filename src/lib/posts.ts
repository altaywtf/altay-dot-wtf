import fs from "node:fs";
import matter from "gray-matter";
import readingTime from "reading-time";
import { DATA_FOLDER_PATH } from "@/lib/utils/fs";
import { readMarkdownFile } from "@/lib/utils/md";

type PostFrontMatter = {
  date: string;
  oneliner: string;
  title: string;
};

type Post = PostFrontMatter & {
  readingTime: string;
  slug: string;
  path: string;
};

export const getPost = (slug: string) => {
  const file = readMarkdownFile(`/posts/${slug}.md`);
  const { content: markdown, data } = matter(file);
  const frontMatter = data as PostFrontMatter;
  const readingTimeInMins = readingTime(markdown).minutes;

  const post = {
    ...frontMatter,
    readingTime:
      readingTimeInMins <= 1 ? "1 min read" : `${Math.floor(readingTimeInMins)} mins read`,
    slug,
    path: `/posts/${slug}`,
  } satisfies Post;

  return { markdown, post };
};

export const getPosts = () => {
  const NOTES_FOLDER_PATH = `${DATA_FOLDER_PATH}/posts`;

  const slugs = fs
    .readdirSync(NOTES_FOLDER_PATH, "utf-8")
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.split(".md"))
    .map(([fileName]) => fileName);

  return slugs
    .map(getPost)
    .map((n) => n.post)
    .sort((a, b) => (Date.parse(a.date) > Date.parse(b.date) ? -1 : 1));
};

export const getPostsWithMarkdown = () => getPosts().map((post) => getPost(post.slug));
