import type { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from 'next'
import { Book, getBooks, getBook } from 'api/books'
import { SITE_URL } from 'config'
import { NextSeo } from 'next-seo'
import { Flex, Box, Heading, Text } from 'theme-ui'
import { getOpenGraphImage } from 'utils/openGraph'
import BookCover from 'components/BookCover'
import BookInfo from 'components/BookInfo'
import Markdown from 'components/Markdown'
import ArtificialBackButton from 'components/ArtificialBackButton'
import { Backlink, getBacklinks } from 'api/backlinks'
import Backlinks from 'components/Backlinks'

export const getStaticPaths: GetStaticPaths = () => ({
  paths: getBooks().map((book) => ({ params: { slug: book.slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<{
  book: Book
  markdown: string
  backlinks: Backlink[]
}> = ({ params }) => {
  const { book, markdown } = getBook(params?.slug as string)
  const backlinks = getBacklinks(book.notes.url)

  return {
    props: {
      book,
      markdown,
      backlinks,
    },
  }
}

const BookPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
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

      <ArtificialBackButton href="/books" label="Books" />

      <Box m={[3, 4]} />

      <Flex>
        <Box sx={{ minWidth: [120, 140] }}>
          <BookCover book={book} />
        </Box>

        <Box m={2} />

        <Box>
          <Heading as="h1" sx={{ fontSize: [2, 3] }}>
            {pageTitle}
          </Heading>

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
