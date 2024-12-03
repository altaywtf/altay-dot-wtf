import type { Book as TBook } from "@/lib/books";
import { format } from "date-fns";
import { Star } from "lucide-react";
import Image from "next/legacy/image";

const Title: React.FC<{
  title: string;
  authors: string[];
}> = ({ title, authors }) => (
  <span>
    {title} by {authors.join(", ")}
  </span>
);

const Quote: React.FC<{
  children: string;
}> = ({ children }) => (
  <p className="italic text-neutral-400">&quot;{children}&quot;</p>
);

const Cover: React.FC<{
  book: TBook;
  width?: number;
}> = ({ book, width = 144 }) => (
  <div className="overflow-hidden rounded border border-solid border-neutral-800">
    <Image
      alt={book.title}
      blurDataURL={book.coverImage.blurhash}
      height={width / book.coverImage.aspectRatio}
      layout="responsive"
      placeholder="blur"
      src={book.coverImage.url}
      width={width}
    />
  </div>
);

const Rating: React.FC<{
  max?: number;
  rating: number;
}> = ({ max = 5, rating }) => (
  <div>
    {Array.from({ length: max }).map((_, i) => (
      <Star
        className={`inline-block ${
          i < rating ? "fill-amber-400" : "fill-neutral-700"
        }`}
        // biome-ignore lint/suspicious/noArrayIndexKey: <no better way :D>
        key={i}
        strokeWidth={0}
        fontSize={14}
      />
    ))}
  </div>
);

const DateRead: React.FC<{
  children: string;
}> = ({ children }) => (
  <p className="text-neutral-400">
    Read in {format(new Date(children), "MMMM yyyy")}
  </p>
);

export const Book = {
  Cover,
  DateRead,
  Rating,
  Title,
  Quote,
};
