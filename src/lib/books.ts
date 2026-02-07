import { readMarkdownFile } from "@/lib/utils/md";
import { readBooksJSON } from "@/scripts/books/lib/booksJSON";

export const getBooks = () =>
  readBooksJSON().books.map((book) => ({
    ...book,
    path: `/books/${book.slug}`,
  }));

export const getBook = (slug: string) => {
  const book = readBooksJSON().books.find((book) => book.slug === slug);

  if (!book) {
    throw new Error(`Book not found: ${slug}.`);
  }

  return {
    book: {
      ...book,
      path: `/books/${book.slug}`,
    },
    markdown: readMarkdownFile(`${book.notes.url}.md`),
  };
};

export const getBooksWithMarkdown = () =>
  getBooks().map((book) => getBook(book.slug));

export type Book = ReturnType<typeof getBook>["book"];
