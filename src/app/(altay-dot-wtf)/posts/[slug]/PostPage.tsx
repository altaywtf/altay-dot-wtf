'use client'

import { NextSeo } from 'next-seo'
import { Heading, Text, Box } from 'theme-ui'
import { getOpenGraphImage } from 'utils/openGraph'
import { formatDate } from 'utils/date'
import ArtificialBackButton from 'components/ArtificialBackButton'
import Markdown from 'components/Markdown'
import Backlinks from 'components/Backlinks'
import { postsCopy } from 'config'
import type { Post } from 'api/posts'
import type { Backlink } from 'api/backlinks'

export type PostPageProps = {
  data: {
    post: Post
    markdown: string
    backlinks: Backlink[]
  }
}

const PostPage: React.FC<PostPageProps> = ({ data: { post, markdown, backlinks } }) => (
  <>
    <NextSeo
      title={post.title}
      description={post.oneliner}
      openGraph={{
        title: post.title,
        description: post.oneliner,
        type: 'article',
        article: {
          authors: ['Altay Aydemir'],
          modifiedTime: post.date,
        },
        images: [
          getOpenGraphImage({
            type: 'post',
            title: post.title,
            oneliner: post.oneliner,
          }),
        ],
      }}
    />

    <ArtificialBackButton href="/posts" label={postsCopy.title} />

    <Box m={4} />

    <Heading as="h2">{post.title}</Heading>

    <Text color="textTertiary">
      {formatDate(post.date)}
      <Box sx={{ display: 'inline' }} mx={1}>
        ·
      </Box>
      {post.readingTime}
    </Text>

    <Box m={3} />

    <Markdown>{markdown}</Markdown>

    <Box m={5} />

    <Backlinks sourceType="post" sourceURL={post.url} backlinks={backlinks} />
  </>
)

export default PostPage
