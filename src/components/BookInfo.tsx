import type { Book } from 'api/books'
import { Box, Text } from 'rebass'
import StarRatingComponent from 'react-star-rating-component'
import { format } from 'date-fns'

type Props = {
  book: Book
  spacing?: number | number[]
  fontSize?: number | number[]
}

const BookInfo: React.FC<Props> = ({ book, spacing, fontSize }) => {
  const info = [
    {
      key: 'date',
      component: (
        <Text color="textTertiary" fontSize={fontSize}>
          Read in {format(new Date(book.dateRead), 'MMMM yyyy')}
        </Text>
      ),
    },
    {
      key: 'rating',
      component: (
        <Box marginBottom={typeof spacing === 'number' ? -spacing : spacing?.map((s) => -s)}>
          <StarRatingComponent
            name="rating"
            value={book.rating}
            starCount={5}
            editing={false}
            starColor="#F7C744"
          />
        </Box>
      ),
    },
  ]

  return (
    <Box>
      {info.map((i) => (
        <Box key={i.key} sx={{ marginY: spacing }}>
          {i.component}
        </Box>
      ))}
    </Box>
  )
}

export default BookInfo
