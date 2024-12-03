import { getBooksWithMarkdown } from "@/lib/books";
import { getPostsWithMarkdown } from "@/lib/posts";
import { hasLink } from "@/lib/utils/md";

type Backlink = {
  title: string;
  type: "book" | "post";
  path: string;
};

export const getBacklinks = (path: string): Backlink[] => {
  const posts: Backlink[] = getPostsWithMarkdown()
    .filter(({ markdown }) => hasLink(markdown, path))
    .map(({ post }) => ({
      title: post.title,
      type: "post",
      path: post.path,
    }));

  const books: Backlink[] = getBooksWithMarkdown()
    .filter(({ markdown }) => hasLink(markdown, path))
    .map(({ book }) => ({
      title: `${book.title} by ${book.authors.join(", ")}`,
      type: "book",
      path: book.notes.url,
    }));

  return [...posts, ...books];
};
