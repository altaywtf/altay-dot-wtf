import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { getPosts, Post } from 'api/posts'
import { postsCopy } from 'config/copy'
import NextLink from 'next/link'
import { Box, Link } from 'theme-ui'
import Page from 'components/Page'
import { formatDate } from 'utils/date'

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = () => ({
  props: { posts: getPosts() },
})

const PostsPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }) => (
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
