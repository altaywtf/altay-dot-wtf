import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { SITE_URL } from 'config'
import { NextSeo } from 'next-seo'
import { Flex, Box, Heading, Text } from 'theme-ui'
import { getOpenGraphImage } from 'utils/openGraph'
import BookCover from 'components/BookCover'
import BookInfo from 'components/BookInfo'
import Markdown from 'components/Markdown'
import ArtificialBackButton from 'components/ArtificialBackButton'
import Backlinks from 'components/Backlinks'
import { booksCopy } from 'config/copy'
import { API_URL } from 'config'
import type { Book } from 'api/books'
import type { Backlink } from 'api/backlinks'

type ServerSideProps = {
  book: Book
  markdown: string
  backlinks: Backlink[]
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  const { book, markdown } = await fetch(`${API_URL}/books/${context.query.slug}`).then((res) =>
    res.json(),
  )

  const { backlinks } = await fetch(
    `${API_URL}/backlinks?type=books&slug=${context.query.slug}`,
  ).then((res) => res.json())

  return { props: { book, markdown, backlinks } }
}

const BookPage: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  book,
  markdown,
  backlinks,
}) => {
  const pageTitle = `${book.title} by ${book.authors.join(', ')}`

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={book.quote}
        openGraph={{
          title: pageTitle,
          description: book.quote,
          images: [
            getOpenGraphImage({
              type: 'book',
              title: book.title,
              author: book.authors.join(', '),
              coverImageURL: SITE_URL + book.coverImage.url,
            }),
          ],
        }}
      />

      <ArtificialBackButton href="/books" label={booksCopy.title} />

      <Box m={4} />

      <Flex sx={{ gap: 3 }}>
        <Box sx={{ minWidth: [120, 140] }}>
          <BookCover book={book} />
        </Box>

        <Box>
          <Heading as="h3">{pageTitle}</Heading>

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
}

export default BookPage
