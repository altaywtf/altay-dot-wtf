import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { bookmarksCopy } from 'config/copy'
import { fetchBookmarks, Bookmark } from 'api/bookmarks'
import { Flex, Box, Link } from 'theme-ui'
import PageHeader from 'components/PageHeader'
import { CgArrowTopRight } from '@react-icons/all-files/cg/CgArrowTopRight'

export const getStaticProps: GetStaticProps<{ data: Bookmark[] }> = async () => ({
  props: {
    data: await fetchBookmarks(),
  },
  revalidate: 60 * 60,
})

const BookmarksPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader {...bookmarksCopy} />

    <Box m={4} />

    <>
      {data.map((bookmark) => (
        <Box key={bookmark.url} mb={4}>
          <Flex sx={{ alignItems: 'center', color: 'link', gap: 1 }}>
            <Link
              variant="links.title"
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {bookmark.title}
            </Link>

            <CgArrowTopRight />
          </Flex>

          <Box as="blockquote" my={1}>
            {bookmark.description}
          </Box>

          <Box sx={{ fontSize: 0, color: 'textSecondary' }}>{bookmark.host}</Box>
        </Box>
      ))}
    </>
  </>
)

export default BookmarksPage
