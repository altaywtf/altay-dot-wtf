import "dotenv/config";
import inquirer from "inquirer";
import slugify from "slugify";
import { addBookToBooksJSON } from "./lib/booksJSON";
import { fetchBooksByQuery } from "./lib/fetchBooks";
import { createBookCoverImage } from "./lib/image";
import { createBookNotes } from "./lib/notes";
import type { BaseBook, BaseBookWithMeta, Book } from "./lib/types";

const runAskBookQueryStep = async (): Promise<string> => {
  const { query } = await inquirer.prompt<{ query: string }>([
    {
      name: "query",
      type: "input",
      message: "Enter search query:",
    },
  ]);

  return query;
};

const runSearchAndChooseStep = async (query: string) => {
  const data = await fetchBooksByQuery(query);

  const { bookIndex } = await inquirer.prompt<{ bookIndex: number }>([
    {
      choices: data.flatMap((item, index) => [
        {
          name: `${index}. ${item.title} by ${item.authors.join(", ")} \n [${
            item.remoteCoverImage.url
          }]`,
          value: index,
        },
        new inquirer.Separator(),
      ]),
      name: "bookIndex",
      type: "list",
      message: "Select a book:",
    },
  ]);

  return data[bookIndex];
};

const runGetBaseBookMetaStep = async (baseBook: BaseBook): Promise<BaseBookWithMeta> => {
  const { dateRead, quote, rating, remoteCoverImageURL, slug, title } = await inquirer.prompt<
    BaseBookWithMeta & { remoteCoverImageURL: string }
  >([
    {
      default: baseBook.title,
      name: "title",
      type: "input",
      message: "Book title:",
    },
    {
      default: slugify(baseBook.title, { lower: true }),
      name: "slug",
      type: "input",
      message: "Slug:",
    },
    {
      default: baseBook.remoteCoverImage.url,
      name: "remoteCoverImageURL",
      type: "input",
      message: "Cover image URL:",
    },
    {
      name: "rating",
      type: "number",
      message: "Rating:",
    },
    {
      name: "quote",
      type: "input",
      message: "Quote:",
    },
    {
      name: "dateRead",
      type: "input",
      message: "Date read:",
    },
  ]);

  return {
    ...baseBook,
    dateRead,
    quote,
    rating,
    remoteCoverImage: { url: remoteCoverImageURL },
    slug,
    title,
  };
};

const runCreateBookFromBaseBookWithMetaStep = async (
  baseBookWithMeta: BaseBookWithMeta,
): Promise<Book> => {
  return {
    ...baseBookWithMeta,
    coverImage: await createBookCoverImage(baseBookWithMeta),
    notes: createBookNotes(baseBookWithMeta),
  };
};

const main = async () => {
  const query = await runAskBookQueryStep();
  const baseBook = await runSearchAndChooseStep(query);
  const baseBookWithMeta = await runGetBaseBookMetaStep(baseBook);
  const book = await runCreateBookFromBaseBookWithMetaStep(baseBookWithMeta);
  const booksJSON = addBookToBooksJSON(book);
  console.log(`${book.title} has been added, we have ${booksJSON.books.length} books(s) now.`);
};

main();
