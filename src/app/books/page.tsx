import { BackButton } from "@/components/back-button";
import { Page } from "@/components/page";
import { booksCopy } from "@/config";
import { getBooks } from "@/lib/books";
import { getOpenGraphImage } from "@/lib/utils/open-graph";
import type { Metadata } from "next";
import Link from "next/link";
import { Book } from "../../components/book";

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
        <BackButton href="/" label="altay.wtf" />
      </div>

      <Page header={booksCopy}>
        <div className="flex flex-col gap-10">
          {books.map((book) => (
            <div className="flex flex-row gap-4" key={book.slug}>
              <Link className="min-w-[96px] sm:min-w-[120px]" href={book.path}>
                <Book.Cover book={book} />
              </Link>
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
