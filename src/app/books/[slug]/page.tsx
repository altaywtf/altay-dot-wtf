import type { Backlink } from "@/lib/backlinks";
import type { Book } from "@/lib/books";

import { API_URL, booksCopy } from "@/config";
import { getOpenGraphImage } from "@/lib/utils/openGraph";
import ArtificialBackButton from "@/ui/ArtificialBackButton";
import Backlinks from "@/ui/Backlinks";
import Markdown from "@/ui/Markdown";
import type { Metadata } from "next";

import { BookCover } from "../components/BookCover";
import { BookReadDateAndRating } from "../components/BookReadDateAndRating";

type Props = {
  params: { slug: string };
};

const fetchData = async (
  slug: string,
): Promise<{
  backlinks: Backlink[];
  book: Book;
  markdown: string;
}> => {
  const { book, markdown } = await fetch(`${API_URL}/books/${slug}`).then(
    (res) => res.json(),
  );
  const { backlinks } = await fetch(
    `${API_URL}/backlinks?type=books&slug=${slug}`,
  ).then((res) => res.json());

  return {
    backlinks,
    book,
    markdown,
  };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { book } = await fetchData(params.slug);
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
  const { backlinks, book, markdown } = await fetchData(params.slug);

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

      <Backlinks
        backlinks={backlinks}
        sourceType="book"
        sourceURL={book.notes.url}
      />
    </div>
  );
};

export default BookPage;
