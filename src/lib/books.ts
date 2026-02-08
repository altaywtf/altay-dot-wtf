import fs from "node:fs";
import { DATA_FOLDER_PATH } from "@/lib/utils/fs";
import { readMarkdownFile } from "@/lib/utils/md";

type GoogleBooksIndustryIdentifier = {
  identifier: string;
  type: string;
};

type Book = {
  title: string;
  authors: string[];
  identifiers: GoogleBooksIndustryIdentifier[];
  remoteCoverImage: { url: string };
  slug: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  dateRead: string;
  notes: { url: string };
  coverImage: {
    aspectRatio: number;
    blurhash: string;
    url: string;
  };
  path: string;
};

type BooksJSON = {
  books: Omit<Book, "path">[];
  updatedAt: string;
};

const readBooksJSON = (): BooksJSON => {
  const file = fs.readFileSync(`${DATA_FOLDER_PATH}/books.json`, "utf-8");
  return JSON.parse(file) as BooksJSON;
};

export const getBooks = (): Book[] =>
  readBooksJSON().books.map((book) => ({
    ...book,
    path: `/books/${book.slug}`,
  }));

export const getBook = (slug: string) => {
  const book = getBooks().find((book) => book.slug === slug);

  if (!book) {
    throw new Error(`Book not found: ${slug}.`);
  }

  return {
    book,
    markdown: readMarkdownFile(`${book.notes.url}.md`),
  };
};

export const getBooksWithMarkdown = () => getBooks().map((book) => getBook(book.slug));
