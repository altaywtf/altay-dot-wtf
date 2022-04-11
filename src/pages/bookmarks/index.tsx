import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { bookmarksCopy } from 'config/copy'
import { fetchBookmarks, Bookmark } from 'api/bookmarks'
import { Flex, Box, Link, Text } from 'theme-ui'
import Page from 'components/Page'
import { CgArrowTopRight } from '@react-icons/all-files/cg/CgArrowTopRight'

export const getStaticProps: GetStaticProps<{ data: Bookmark[] }> = async () => ({
  props: { data: await fetchBookmarks() },
  revalidate: 60 * 60,
})

const BookmarksPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <Page header={bookmarksCopy}>
    {data.map((bookmark) => (
      <Box key={bookmark.url} mb={4}>
        <Box>
          <Link variant="links.title" href={bookmark.url} target="_blank" rel="noopener noreferrer">
            <Flex sx={{ alignItems: 'center', gap: 1 }}>
              {bookmark.title}

              <Text sx={{ flexShrink: 0, lineHeight: 1 }}>
                <CgArrowTopRight />
              </Text>
            </Flex>
          </Link>
        </Box>

        <Box as="blockquote">{bookmark.description}</Box>

        <Box sx={{ fontSize: 0, color: 'textSecondary' }}>{bookmark.host}</Box>
      </Box>
    ))}
  </Page>
)

export default BookmarksPage
