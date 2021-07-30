import type { Book } from 'scripts/books/lib/types'
import NextLink from 'next/link'
import { Heading, Box, Flex, Text, Link } from 'rebass'
import BookCover from './BookCover'
import BookInfo from './BookInfo'

type Props = {
  data: Book[]
}

const BookList: React.FC<Props> = ({ data }) => (
  <Box>
    {data.map((book) => (
      <Box key={book.slug}>
        <Flex>
          <Box minWidth={[100, 120]}>
            <NextLink href={book.notes.url} passHref>
              <a title={book.title}>
                <BookCover book={book} />
              </a>
            </NextLink>
          </Box>

          <Box m={2} />

          <Box>
            <NextLink href={book.notes.url} passHref>
              <Link title={book.title}>
                <Heading as="h3" fontSize={[0, 1]}>
                  {book.title} by {book.authors.join(', ')}
                </Heading>
              </Link>
            </NextLink>

            <Box my={1}>
              <BookInfo short book={book} fontSize={0} spacing={1} />
            </Box>

            <Text fontSize={0} fontStyle="italic" color="textTertiary">
              &quot;{book.quote}&quot;
            </Text>
          </Box>
        </Flex>

        <Box m={5} />
      </Box>
    ))}
  </Box>
)

export default BookList
