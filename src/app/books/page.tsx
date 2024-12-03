import { ArtificialBackButton } from "@/components/artificial-back-button";
import { Page } from "@/components/page";
import { booksCopy } from "@/config";
import { getBooks } from "@/lib/books";
import { getOpenGraphImage } from "@/lib/utils/openGraph";
import type { Metadata } from "next";
import NextLink from "next/link";
import { BookCover } from "../../components/book-cover";
import { BookReadDateAndRating } from "../../components/book-read-date-and-rating";

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
        <ArtificialBackButton href="/" label="altay.wtf" />
      </div>

      <Page header={booksCopy}>
        <div className="flex flex-col gap-10">
          {books.map((book) => (
            <div className="flex flex-row gap-4" key={book.slug}>
              <NextLink
                className="min-w-[96px] sm:min-w-[120px]"
                href={book.path}
              >
                <BookCover book={book} />
              </NextLink>

              <div>
                <div>
                  <NextLink
                    className="font-medium text-amber-400 hover:text-amber-200"
                    href={book.path}
                  >
                    {book.title} by {book.authors.join(", ")}
                  </NextLink>
                </div>

                <BookReadDateAndRating book={book} />

                <p className="italic text-neutral-400">
                  &quot;{book.quote}&quot;
                </p>
              </div>
            </div>
          ))}
        </div>
      </Page>
    </>
  );
}
