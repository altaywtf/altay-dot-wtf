import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { bookmarksCopy } from 'config/copy'
import { fetchBookmarks, Bookmark } from 'api/bookmarks'
import { Box, Text, Link, Heading } from 'rebass'
import PageHeader from 'components/PageHeader'

export const getStaticProps: GetStaticProps<{ data: Bookmark[] }> = async () => ({
  props: { data: await fetchBookmarks() },
  revalidate: 60 * 60,
})

const BookmarksPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader {...bookmarksCopy} />

    <Box m={4} />

    <>
      {data.map((bookmark) => (
        <Box key={bookmark.url}>
          <Link href={bookmark.url} target="new" rel="noopener noreferrer">
            <Heading as="h3" fontSize={1}>
              {bookmark.title}
            </Heading>
          </Link>

          <Box m={1} />

          <Text as="blockquote" fontSize={0} color="textSecondary">
            {bookmark.description}
          </Text>

          <Box m={1} />

          <Text fontSize={0} color="textTertiary">
            {bookmark.host}
          </Text>

          <Box m={4} />
        </Box>
      ))}
    </>
  </>
)

export default BookmarksPage
