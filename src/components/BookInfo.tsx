import type { Book } from 'api/books'
import { Box, Text } from 'theme-ui'
import StarRatingComponent from 'react-star-rating-component'
import { format } from 'date-fns'

type Props = {
  book: Book
}

const BookInfo: React.FC<Props> = ({ book }) => {
  const info = [
    {
      key: 'date',
      component: (
        <Text color="textTertiary">Read in {format(new Date(book.dateRead), 'MMMM yyyy')}</Text>
      ),
    },
    {
      key: 'rating',
      component: (
        <Box marginBottom={-1}>
          <StarRatingComponent
            name={`rating-${book.slug}`}
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
        <Box key={i.key} sx={{ marginY: 1 }}>
          {i.component}
        </Box>
      ))}
    </Box>
  )
}

export default BookInfo
