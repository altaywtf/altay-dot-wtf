import type { InferGetStaticPropsType } from 'next'
import type { Book } from 'types'
import { NextSeo } from 'next-seo'
import { Flex, Box, Heading } from 'rebass'
import { getStaticPathsForContent, getStaticPropsForContentDetails } from 'core/api/page'
import { createOpenGraphImage } from 'core/api/openGraph'
import { useScrollToSource } from 'core/hooks/useScrollToSource'
import BookCover from 'components/Book/BookCover'
import BookInfo from 'components/Book/BookInfo'
import Markdown from 'components/Markdown'
import BackLinks from 'components/BackLinks'
import ArtificialBackButton from 'components/ArtificialBackButton'

export const getStaticPaths = getStaticPathsForContent('book')
export const getStaticProps = getStaticPropsForContentDetails<Book>('book')

const BookPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data, links }) => {
  useScrollToSource()

  return (
    <>
      <NextSeo
        title={data.meta.title}
        description={data.meta.oneliner}
        openGraph={{
          title: data.meta.title,
          description: data.meta.oneliner,
          images: [
            createOpenGraphImage({
              type: 'book',
              title: data.meta.title,
              author: data.meta.author,
              coverImageURL: data.meta.coverImage.remoteURL,
            }),
          ],
        }}
      />

      <ArtificialBackButton href="/books" label="Books" />

      <Box m={[3, 4]} />

      <Flex>
        <Box minWidth={[120, 140]}>
          <BookCover bookMeta={data.meta} />
        </Box>

        <Box m={2} />

        <Box>
          <Heading as="h1" fontSize={[1, 3]}>
            {data.meta.title} by {data.meta.author}
          </Heading>

          <Box m={2} />

          <BookInfo bookMeta={data.meta} spacing={[0, 1, 1]} fontSize={0} />
        </Box>
      </Flex>

      <Box m={3} />

      <Markdown>{data.markdown}</Markdown>

      <Box m={6} />

      {links.length > 0 ? <BackLinks type={data.type} data={links} slug={data.slug} /> : null}
    </>
  )
}

export default BookPage
