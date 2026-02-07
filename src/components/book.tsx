import { format } from "date-fns";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Book as TBook } from "@/lib/books";

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
  variant?: "on-list" | "on-page";
}> = ({ book, width = 120, variant = "on-list" }) => {
  const height = Math.round(width / book.coverImage.aspectRatio);

  return (
    <Link
      href={
        variant === "on-list"
          ? book.path
          : `http://books.google.com/books?vid=${book.identifiers[0].identifier}`
      }
      target={variant === "on-list" ? undefined : "_blank"}
    >
      <div
        className="relative rounded-sm border border-solid border-neutral-800 overflow-hidden"
        style={{ width, height }}
      >
        <Image
          alt={book.title}
          blurDataURL={book.coverImage.blurhash}
          placeholder="blur"
          src={book.coverImage.url}
          quality={100}
          fill
          sizes="100%"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
    </Link>
  );
};

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
