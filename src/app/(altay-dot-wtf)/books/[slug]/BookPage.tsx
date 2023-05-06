'use client'

import { booksCopy } from 'config'
import { Flex, Box, Heading, Text } from 'theme-ui'
import BookCover from 'ui/BookCover'
import BookInfo from 'ui/BookInfo'
import Markdown from 'ui/Markdown'
import ArtificialBackButton from 'ui/ArtificialBackButton'
import Backlinks from 'ui/Backlinks'
import type { Book } from 'lib/books'
import type { Backlink } from 'lib/backlinks'

export type BookPageProps = {
  data: {
    book: Book
    markdown: string
    backlinks: Backlink[]
  }
}

const BookPage: React.FC<BookPageProps> = ({ data: { book, markdown, backlinks } }) => (
  <>
    <ArtificialBackButton href="/books" label={booksCopy.title} />

    <Box m={4} />

    <Flex sx={{ gap: 3 }}>
      <Box sx={{ minWidth: [120, 140] }}>
        <BookCover book={book} />
      </Box>

      <Box>
        <Heading as="h3">{`${book.title} by ${book.authors.join(', ')}`}</Heading>

        <Box m={2} />
        <BookInfo book={book} />
        <Box m={1} />

        <Text sx={{ fontStyle: 'italic', color: 'textTertiary' }}>&quot;{book.quote}&quot;</Text>
      </Box>
    </Flex>

    <Box m={4} />

    <Markdown>{markdown}</Markdown>

    <Box m={6} />

    <Backlinks sourceType="book" sourceURL={book.notes.url} backlinks={backlinks} />
  </>
)

export default BookPage
