import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { getBooks, Book } from 'api/books'
import { booksCopy } from 'config/copy'
import { Box, Flex, Text, Link } from 'theme-ui'
import NextLink from 'next/link'
import Page from 'components/Page'
import BookCover from 'components/BookCover'
import BookInfo from 'components/BookInfo'

export const getStaticProps: GetStaticProps<{ books: Book[] }> = () => ({
  props: { books: getBooks() },
})

const BooksPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ books }) => (
  <Page header={booksCopy}>
    {books.map((book) => (
      <Box key={book.slug}>
        <Flex sx={{ gap: 3 }}>
          <Box sx={{ minWidth: [100, 130] }}>
            <NextLink href={book.notes.url} passHref legacyBehavior>
              <Link>
                <BookCover book={book} />
              </Link>
            </NextLink>
          </Box>

          <Box>
            <Box>
              <NextLink href={book.notes.url} passHref legacyBehavior>
                <Link variant="links.title">
                  {book.title} by {book.authors.join(', ')}
                </Link>
              </NextLink>
            </Box>

            <BookInfo book={book} />

            <Text sx={{ fontStyle: 'italic', color: 'textSecondary', fontSize: 0 }}>
              &quot;{book.quote}&quot;
            </Text>
          </Box>
        </Flex>

        <Box m={4} />
      </Box>
    ))}
  </Page>
)

export default BooksPage
