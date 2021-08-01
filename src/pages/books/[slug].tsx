import type { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from 'next'
import { Book, getBooks, getBook } from 'api/books'
import { SITE_URL } from 'config'
import { NextSeo } from 'next-seo'
import { Flex, Box, Heading, Text } from 'rebass'
import { getOpenGraphImage } from 'utils/openGraph'
import { useScrollToSource } from 'hooks/useScrollToSource'
import BookCover from 'components/BookCover'
import BookInfo from 'components/BookInfo'
import Markdown from 'components/Markdown'
import ArtificialBackButton from 'components/ArtificialBackButton'

export const getStaticPaths: GetStaticPaths = () => ({
  paths: getBooks().map((book) => ({ params: { slug: book.slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<{ book: Book; markdown: string }> = ({ params }) => ({
  props: getBook(params?.slug as string),
})

const BookPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ book, markdown }) => {
  useScrollToSource()

  const title = `${book.title} by ${book.authors.join(', ')}`

  return (
    <>
      <NextSeo
        title={title}
        description={book.quote}
        openGraph={{
          title: title,
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
        <Box minWidth={[120, 140]}>
          <BookCover book={book} />
        </Box>

        <Box m={2} />

        <Box>
          <Heading as="h1" fontSize={[2, 3]}>
            {title}
          </Heading>

          <Box m={2} />
          <BookInfo book={book} />
          <Box m={1} />

          <Text fontStyle="italic" color="textTertiary">
            &quot;{book.quote}&quot;
          </Text>
        </Box>
      </Flex>

      <Box m={4} />
      <Markdown>{markdown}</Markdown>
      <Box m={6} />
    </>
  )
}

export default BookPage
