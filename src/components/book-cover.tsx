import type { Book } from "@/lib/books";

import Image from "next/legacy/image";

type Props = {
  book: Book;
  width?: number;
};

export const BookCover: React.FC<Props> = ({ book, width = 144 }) => (
  <div className="overflow-hidden rounded">
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
