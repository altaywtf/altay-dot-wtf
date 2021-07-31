import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { getBooks, Book } from 'api/books'
import { booksCopy } from 'config/copy'
import { Heading, Box, Flex, Text, Link } from 'rebass'
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
            <Box minWidth={[100, 130]}>
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
                  <Heading as="h3" fontSize={[1, 2]}>
                    {book.title} by {book.authors.join(', ')}
                  </Heading>
                </Link>
              </NextLink>

              <Box m={1} />
              <BookInfo short book={book} fontSize={0} spacing={1} />
              <Box m={1} />

              <Text fontSize={0} fontStyle="italic" color="textTertiary">
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
