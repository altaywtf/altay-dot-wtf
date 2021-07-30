import type { Book } from 'scripts/books/lib/types'
import Image from 'next/image'
import { Box } from 'rebass'

type Props = {
  book: Book
  width?: number
}

const BookCover: React.FC<Props> = ({ book, width = 144 }) => (
  <Box className="border-radius">
    <Image
      alt={book.title}
      src={book.coverImage.url}
      width={width}
      height={width / book.coverImage.aspectRatio}
      layout="responsive"
      placeholder="blur"
      blurDataURL={book.coverImage.blurhash}
    />
  </Box>
)

export default BookCover
