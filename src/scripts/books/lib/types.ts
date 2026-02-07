import type { GoogleBooksIndustryIdentifier } from "./fetchBooks";

export type BaseBook = {
  authors: string[];
  identifiers: GoogleBooksIndustryIdentifier[];
  remoteCoverImage: { url: string };
  title: string;
};

export type BaseBookWithMeta = BaseBook & {
  dateRead: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  slug: string;
};

export type Book = BaseBookWithMeta & {
  coverImage: {
    aspectRatio: number;
    blurhash: string;
    url: string;
  };
  notes: {
    url: string;
  };
};

export type BooksJSON = {
  books: Book[];
  updatedAt: string;
};

export const createBooksJSON = ({ books }: { books: Book[] }): BooksJSON => ({
  books,
  updatedAt: new Date().toISOString(),
});
