import type { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from 'next'
import type { Book } from 'types'
import { SITE_URL } from 'config'
import { NextSeo } from 'next-seo'
import { Flex, Box, Heading, Text } from 'rebass'
import { getOpenGraphImage } from 'core/api/openGraph'
import { useScrollToSource } from 'core/hooks/useScrollToSource'
import BookCover from 'components/Book/BookCover'
import BookInfo from 'components/Book/BookInfo'
import Markdown from 'components/Markdown'
import ArtificialBackButton from 'components/ArtificialBackButton'
import { readBooksJSON } from 'scripts/books/lib/booksJSON'
import { readMarkdownFile } from 'core/api/fs'

export const getStaticPaths: GetStaticPaths = () => ({
  paths: readBooksJSON().books.map((book) => ({ params: { slug: book.slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<{ data: Book; markdown: string }> = ({ params }) => {
  const book = readBooksJSON().books.find((book) => book.slug === params?.slug)

  if (!book) {
    throw new Error(`Book not found ${params}`)
  }

  return {
    props: {
      data: book,
      markdown: readMarkdownFile('books', book.slug),
    },
  }
}

const BookPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data, markdown }) => {
  useScrollToSource()

  const title = `${data.title} by ${data.authors.join(', ')}`

  return (
    <>
      <NextSeo
        title={title}
        description={data.quote}
        openGraph={{
          title: title,
          description: data.quote,
          images: [
            getOpenGraphImage({
              type: 'book',
              title: data.title,
              author: data.authors.join(', '),
              coverImageURL: SITE_URL + data.coverImage.url,
            }),
          ],
        }}
      />

      <ArtificialBackButton href="/books" label="Books" />

      <Box m={[3, 4]} />

      <Flex>
        <Box minWidth={[120, 140]}>
          <BookCover book={data} />
        </Box>

        <Box m={2} />

        <Box>
          <Heading as="h1" fontSize={[2, 3]}>
            {title}
          </Heading>

          <Box m={2} />

          <BookInfo book={data} spacing={1} fontSize={0} />

          <Box m={1} />

          <Text fontSize={0} fontStyle="italic" color="textTertiary">
            &quot;{data.quote}&quot;
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
