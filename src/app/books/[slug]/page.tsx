import { ArtificialBackButton } from "@/components/artificial-back-button";
import { Backlinks } from "@/components/backlinks";
import { Markdown } from "@/components/md";
import { booksCopy } from "@/config";
import { getBook } from "@/lib/books";
import { getOpenGraphImage } from "@/lib/utils/openGraph";
import type { Metadata } from "next";

import { BookCover } from "../../../components/book-cover";
import { BookReadDateAndRating } from "../../../components/book-read-date-and-rating";

type Props = {
  params: { slug: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { book } = getBook(params.slug);
  const title = `${book.title} by ${book.authors.join(", ")}`;

  return {
    description: book.quote,
    openGraph: {
      description: book.quote,
      images: getOpenGraphImage({
        author: book.authors.join(", "),
        coverImagePath: book.coverImage.url,
        title: book.title,
        type: "book",
      }),
      title,
    },
    title,
  };
};

const BookPage = async ({ params }: Props) => {
  const { book, markdown } = getBook(params.slug);

  return (
    <div className="flex flex-col gap-6">
      <ArtificialBackButton href="/books" label={booksCopy.title} />

      <div className="flex flex-row gap-4" key={book.slug}>
        <div className="min-w-[96px] sm:min-w-[128px] md:min-w-[160px]">
          <BookCover book={book} />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">
            {book.title} by {book.authors.join(", ")}
          </h1>

          <BookReadDateAndRating book={book} />

          <p className="italic text-neutral-400">&quot;{book.quote}&quot;</p>
        </div>
      </div>

      <Markdown>{markdown}</Markdown>

      <Backlinks path={book.notes.url} />
    </div>
  );
};

export default BookPage;
