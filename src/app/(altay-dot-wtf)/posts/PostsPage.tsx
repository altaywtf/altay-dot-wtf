'use client'

import NextLink from 'next/link'
import { Box, Link } from 'theme-ui'
import Page from 'ui/Page'
import { formatDate } from 'lib/utils/date'
import { postsCopy } from 'config'
import type { Post } from 'lib/posts'

export type PostsPageProps = {
  data: {
    posts: Post[]
  }
}

const PostsPage: React.FC<PostsPageProps> = ({ data }) => (
  <Page header={postsCopy}>
    {data.posts.map((post) => (
      <Box key={post.slug} mb={4}>
        <Box>
          <Link as={NextLink} href={post.url} variant="links.title">
            {post.title}
          </Link>
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