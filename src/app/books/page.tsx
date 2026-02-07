import type { Metadata } from "next";
import Link from "next/link";
import { BackButton } from "@/components/back-button";
import { Book } from "@/components/book";
import { Page } from "@/components/page";
import { booksCopy } from "@/config/copy";
import { getBooks } from "@/lib/books";
import { getOpenGraphImage } from "@/lib/utils/open-graph";

export const generateMetadata = async (): Promise<Metadata> => ({
  openGraph: {
    description: booksCopy.description,
    images: getOpenGraphImage({
      title: booksCopy.title,
      type: "page",
    }),
    title: booksCopy.title,
  },
  title: booksCopy.title,
});

export default async function BooksPage() {
  const books = getBooks();

  return (
    <>
      <div className="mb-6">
        <BackButton />
      </div>

      <Page header={booksCopy}>
        <div className="flex flex-col gap-10">
          {books.map((book) => (
            <div className="flex flex-row gap-4" key={book.slug}>
              <Book.Cover book={book} />

              <div>
                <Link
                  className="font-medium text-amber-400 hover:text-amber-200"
                  href={book.path}
                >
                  <Book.Title authors={book.authors} title={book.title} />
                </Link>
                <Book.DateRead>{book.dateRead}</Book.DateRead>
                <Book.Rating rating={book.rating} />
                <Book.Quote>{book.quote}</Book.Quote>
              </div>
            </div>
          ))}
        </div>
      </Page>
    </>
  );
}
