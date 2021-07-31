import type { Book } from 'api/books'
import { Box, Text, Link } from 'rebass'
import { CgArrowTopRight } from 'react-icons/cg'
import StarRatingComponent from 'react-star-rating-component'
import { format } from 'date-fns'

type Props = {
  book: Book
  short?: boolean
  spacing?: number | number[]
  fontSize?: number | number[]
}

const BookInfo: React.FC<Props> = ({ book, spacing, fontSize, short }) => {
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
    // {
    //   key: 'isbn',
    //   component: (
    //     <Link
    //       title="Open Open Library Page"
    //       href={`https://openlibrary.org/isbn/${book.identifier.value}`}
    //       target="_blank"
    //       rel="noopener"
    //       color="textTertiary"
    //       fontSize={fontSize}
    //       sx={{ display: 'inline-flex', alignItems: 'center' }}
    //     >
    //       <code>ISBN:{book.identifier.value}</code>
    //       <CgArrowTopRight />
    //     </Link>
    //   ),
    // },
  ]

  return (
    <Box>
      {info
        .filter((i) => (short ? i.key !== 'isbn' : true))
        .map((i) => (
          <Box key={i.key} sx={{ marginY: spacing }}>
            {i.component}
          </Box>
        ))}
    </Box>
  )
}

export default BookInfo
