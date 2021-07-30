import type { Book } from 'scripts/books/lib/types'
import Image from 'next/image'
import { Box } from 'rebass'

type Props = {
  book: Book
}

const MAX_WIDTH = 144

const BookCover: React.FC<Props> = ({ book }) => (
  <Box className="border-radius">
    <Image
      alt={book.title}
      src={book.coverImage.url}
      width={MAX_WIDTH}
      height={MAX_WIDTH / book.coverImage.aspectRatio}
      layout="responsive"
      placeholder="blur"
      blurDataURL={book.coverImage.blurhash}
    />
  </Box>
)

export default BookCover
