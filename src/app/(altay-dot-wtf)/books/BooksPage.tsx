'use client'

import { booksCopy } from 'config'
import { Box, Flex, Text, Link } from 'theme-ui'
import NextLink from 'next/link'
import Page from 'ui/Page'
import BookCover from 'ui/BookCover'
import BookInfo from 'ui/BookInfo'
import type { Book } from 'lib/books'

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
            <Link as={NextLink} href={book.notes.url}>
              <BookCover book={book} />
            </Link>
          </Box>

          <Box>
            <Box>
              <Link as={NextLink} href={book.notes.url} variant="links.title">
                {book.title} by {book.authors.join(', ')}
              </Link>
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
