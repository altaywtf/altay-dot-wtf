import qs from "query-string";
import type { QueryBook } from "./fetchBooks";
import type { BaseBook } from "./types";

export const mapQueryBookToBaseBook = (queryBook: QueryBook): BaseBook => {
  const removeEdgeFromBookCover = (coverURL: string) => {
    const { query, url } = qs.parseUrl(coverURL);
    return qs.stringifyUrl({ query: { ...query, edge: undefined }, url });
  };

  return {
    authors: queryBook.volumeInfo.authors,
    identifiers: queryBook.volumeInfo.industryIdentifiers,
    remoteCoverImage: {
      url: removeEdgeFromBookCover(queryBook.volumeInfo.imageLinks.thumbnail),
    },
    title: queryBook.volumeInfo.title,
  };
};
