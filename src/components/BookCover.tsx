import Image from 'next/legacy/image'
import { Box } from 'theme-ui'
import type { Book } from '../pages/api/books/_lib'

type Props = {
  book: Book
  width?: number
}

const BookCover: React.FC<Props> = ({ book, width = 144 }) => (
  <Box sx={{ borderRadius: 'default', overflow: 'hidden' }}>
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
