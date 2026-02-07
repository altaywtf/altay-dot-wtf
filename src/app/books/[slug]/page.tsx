import type { Metadata } from "next";
import { BackButton } from "@/components/back-button";
import { Backlinks } from "@/components/backlinks";
import { Book } from "@/components/book";
import { Markdown } from "@/components/md";
import { booksCopy } from "@/config/copy";
import { getBook, getBooks } from "@/lib/books";
import { getOpenGraphImage } from "@/lib/utils/open-graph";

type Props = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () => {
  return getBooks().map((book) => ({ slug: book.slug }));
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;
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

const BookPage = async (props: Props) => {
  const params = await props.params;
  const { book, markdown } = getBook(params.slug);

  return (
    <div className="flex flex-col gap-6">
      <BackButton href="/books" label={booksCopy.title} />

      <div className="flex flex-row gap-4" key={book.slug}>
        <Book.Cover book={book} width={180} variant="on-page" />

        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">
            <Book.Title authors={book.authors} title={book.title} />
          </h1>
          <Book.DateRead>{book.dateRead}</Book.DateRead>
          <Book.Rating rating={book.rating} />
          <Book.Quote>{book.quote}</Book.Quote>
        </div>
      </div>

      <Markdown>{markdown}</Markdown>

      <Backlinks path={book.notes.url} />
    </div>
  );
};

export default BookPage;
