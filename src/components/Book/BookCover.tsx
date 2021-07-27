import type { Book } from 'types'
import Image from 'next/image'
import { Box } from 'rebass'

type Props = {
  bookMeta: Book['meta']
}

const MAX_WIDTH = 144

const BookCover: React.FC<Props> = ({ bookMeta }) => (
  <Box className="border-radius">
    <Image
      alt={bookMeta.title}
      src={bookMeta.coverImage.url}
      width={MAX_WIDTH}
      height={MAX_WIDTH / bookMeta.coverImage.aspectRatio}
      layout="responsive"
      placeholder="blur"
      blurDataURL={bookMeta.coverImage.blurhash}
    />
  </Box>
)

export default BookCover
