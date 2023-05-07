import Image from 'next/legacy/image'
import type { Book } from 'lib/books'

type Props = {
  book: Book
  width?: number
}

export const BookCover: React.FC<Props> = ({ book, width = 144 }) => (
  <div className="overflow-hidden rounded">
    <Image
      alt={book.title}
      src={book.coverImage.url}
      width={width}
      height={width / book.coverImage.aspectRatio}
      layout="responsive"
      placeholder="blur"
      blurDataURL={book.coverImage.blurhash}
    />
  </div>
)
