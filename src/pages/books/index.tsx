import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { getBooks, Book } from 'api/books'
import { booksCopy } from 'config/copy'
import { Box, Flex, Text, Link } from 'theme-ui'
import NextLink from 'next/link'
import PageHeader from 'components/PageHeader'
import BookCover from 'components/BookCover'
import BookInfo from 'components/BookInfo'

export const getStaticProps: GetStaticProps<{ books: Book[] }> = () => ({
  props: {
    books: getBooks(),
  },
})

const BooksPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ books }) => (
  <>
    <PageHeader {...booksCopy} />

    <Box m={4} />

    <Box>
      {books.map((book) => (
        <Box key={book.slug}>
          <Flex>
            <Box sx={{ minWidth: [100, 130] }}>
              <NextLink href={book.notes.url} passHref>
                <a title={book.title}>
                  <BookCover book={book} />
                </a>
              </NextLink>
            </Box>

            <Box m={2} />

            <Box>
              <NextLink href={book.notes.url} passHref>
                <Link variant="links.title" title={book.title}>
                  {book.title} by {book.authors.join(', ')}
                </Link>
              </NextLink>

              <Box m={1} />
              <BookInfo book={book} />
              <Box m={1} />

              <Text sx={{ fontStyle: 'italic', color: 'textTertiary' }}>
                &quot;{book.quote}&quot;
              </Text>
            </Box>
          </Flex>

          <Box m={4} />
        </Box>
      ))}
    </Box>
  </>
)

export default BooksPage
