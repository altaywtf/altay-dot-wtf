'use client'

import { booksCopy } from 'config'
import { Box, Flex, Text, Link } from 'theme-ui'
import NextLink from 'next/link'
import Page from 'components/Page'
import BookCover from 'components/BookCover'
import BookInfo from 'components/BookInfo'
import type { Book } from 'api/books'

export type BooksPageProps = {
  data: {
    books: Book[]
  }
}

const BooksPage: React.FC<BooksPageProps> = ({ data }) => (
  <Page header={booksCopy}>
    {data.books.map((book) => (
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
