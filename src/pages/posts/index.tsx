import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { postsCopy } from 'config/copy'
import NextLink from 'next/link'
import { Box, Link } from 'theme-ui'
import Page from 'components/Page'
import { formatDate } from 'utils/date'
import { API_URL } from 'config'
import type { Post } from 'api/posts'

export const getServerSideProps: GetServerSideProps<{ posts: Post[] }> = async () => {
  const { posts } = await fetch(`${API_URL}/posts`).then((res) => res.json())
  return { props: { posts } }
}

const PostsPage: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ posts }) => (
  <Page header={postsCopy}>
    {posts.map((post) => (
      <Box key={post.slug} mb={4}>
        <Box>
          <NextLink href={post.url} passHref legacyBehavior>
            <Link variant="links.title">{post.title}</Link>
          </NextLink>
        </Box>

        <Box>{post.oneliner}</Box>

        <Box sx={{ fontSize: 0, color: 'textSecondary' }}>
          {formatDate(post.date)}

          <Box sx={{ display: 'inline' }} mx={1}>
            ·
          </Box>
          {post.readingTime}
        </Box>
      </Box>
    ))}
  </Page>
)

export default PostsPage
