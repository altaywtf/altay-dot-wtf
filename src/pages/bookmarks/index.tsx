import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { bookmarksCopy } from 'config/copy'
import { fetchBookmarks, Bookmark } from 'api/bookmarks'
import { Box, Link } from 'theme-ui'
import Page from 'components/Page'
import IconBaseline from 'components/IconBaseline'
import { CgArrowTopRight } from '@react-icons/all-files/cg/CgArrowTopRight'

export const getStaticProps: GetStaticProps<{ data: Bookmark[] }> = async () => ({
  props: { data: await fetchBookmarks() },
  revalidate: 60 * 60,
})

const BookmarksPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <Page header={bookmarksCopy}>
    {data.map((bookmark) => (
      <Box key={bookmark.url} mb={4}>
        <Link variant="links.title" href={bookmark.url} target="_blank" rel="noopener noreferrer">
          {bookmark.title}

          <IconBaseline>
            <CgArrowTopRight />
          </IconBaseline>
        </Link>

        <Box as="blockquote">{bookmark.description}</Box>

        <Box sx={{ fontSize: 0, color: 'textSecondary' }}>{bookmark.host}</Box>
      </Box>
    ))}
  </Page>
)

export default BookmarksPage
