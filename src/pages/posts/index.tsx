import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { getPosts, Post } from 'api/posts'
import { postsCopy } from 'config/copy'
import NextLink from 'next/link'
import { Box, Text, Link } from 'theme-ui'
import PageHeader from 'components/PageHeader'
import { formatDate } from 'utils/date'

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = () => ({
  props: {
    posts: getPosts(),
  },
})

const PostsPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }) => (
  <>
    <PageHeader {...postsCopy} />

    <Box m={4} />

    <>
      {posts.map((post) => (
        <Box key={post.slug} mb={4}>
          <Box>
            <NextLink href={post.url} passHref>
              <Link variant="links.title" title={post.title}>
                {post.title}
              </Link>
            </NextLink>
          </Box>

          <Box my={1}>{post.oneliner}</Box>

          <Box sx={{ fontSize: 0, color: 'textSecondary' }}>
            {formatDate(post.date)}

            <Box sx={{ display: 'inline' }} mx={1}>
              ·
            </Box>
            {post.readingTime}
          </Box>
        </Box>
      ))}
    </>
  </>
)

export default PostsPage
